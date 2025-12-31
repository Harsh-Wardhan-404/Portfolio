"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  gradientColors?: [string, string, string];
  overlayImage?: string;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  gradientColors = ["#A97CF8", "#F38CB8", "#FDCC92"],
  overlayImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isOverlayLoaded, setIsOverlayLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const hasScratchedRef = useRef(false);
  // const baseImageDataRef = useRef<ImageData | null>(null);
  const isInitializedRef = useRef(false);

  const controls = useAnimation();

  // Initialize canvas and draw base image only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Don't reinitialize if already initialized and user has scratched
    if (isInitializedRef.current && hasScratchedRef.current) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up high DPI canvas only if not already set
    if (!isInitializedRef.current) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    if (overlayImage && !isInitializedRef.current) {
      // Load and draw the overlay image only on first load
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Double check we haven't scratched while image was loading
        if (hasScratchedRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          const dpr = window.devicePixelRatio || 1;
          
          // Only reset canvas if we haven't scratched
          if (!hasScratchedRef.current) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            
            // Make canvas background transparent so gradient border shows through
            // The BackgroundGradient has p-[4px] which creates the border effect
            ctx.clearRect(0, 0, width, height);

            // Create rounded rectangle clipping path to match the card's rounded corners
            const borderRadius = 32;
            ctx.beginPath();
            ctx.roundRect(0, 0, width, height, borderRadius);
            ctx.clip();
            
            // Account for BackgroundGradient's 4px padding on all sides
            // This matches the inner content area where the image should be
            const borderPadding = 4;
            const innerWidth = width - (borderPadding * 2);
            const innerHeight = height - (borderPadding * 2);
            
            // Draw image to fill the inner area (matching the BackgroundGradient's content area)
            const imgAspect = img.width / img.height;
            const innerAspect = innerWidth / innerHeight;
            
            let drawWidth = innerWidth;
            let drawHeight = innerHeight;
            let drawX = borderPadding;
            let drawY = borderPadding;
            
            if (imgAspect > innerAspect) {
              // Image is wider - scale to cover inner height, crop width
              drawHeight = innerHeight;
              drawWidth = innerHeight * imgAspect;
              drawX = borderPadding + (innerWidth - drawWidth) / 2;
            } else {
              // Image is taller - scale to cover inner width, crop height
              drawWidth = innerWidth;
              drawHeight = innerWidth / imgAspect;
              drawY = borderPadding + (innerHeight - drawHeight) / 2;
            }
            
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            imageRef.current = img;
            isInitializedRef.current = true;
            setIsOverlayLoaded(true); // Mark overlay as loaded
          }
        }
      };
      img.onerror = () => {
        // If overlay fails to load, still show the background
        setIsOverlayLoaded(true);
      };
      img.src = overlayImage;
    } else if (!overlayImage && !isInitializedRef.current) {
      // Use gradient as before
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height,
      );
      gradient.addColorStop(0, gradientColors[0]);
      gradient.addColorStop(0.5, gradientColors[1]);
      gradient.addColorStop(1, gradientColors[2]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      isInitializedRef.current = true;
      setIsOverlayLoaded(true); // No overlay, so mark as loaded
    }
  }, [gradientColors, overlayImage, width, height]);

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleDocumentMouseUp = () => {
      setIsScratching(false);
      checkCompletion();
    };

    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
      checkCompletion();
    };

    document.addEventListener("mousedown", handleDocumentMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchstart", handleDocumentTouchMove);
    document.addEventListener("touchmove", handleDocumentTouchMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchstart", handleDocumentTouchMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [isScratching]);

  const handleMouseDown = () => setIsScratching(true);

  const handleTouchStart = () => setIsScratching(true);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      hasScratchedRef.current = true;
      const rect = canvas.getBoundingClientRect();
      // Coordinates are in logical space since we scaled the context
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const startAnimation = async () => {
    await controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    // Call onComplete after animation finishes
    if (onComplete) {
      onComplete();
    }
  };

  const checkCompletion = () => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }

      const percentage = (clearPixels / totalPixels) * 100;

      if (percentage >= minScratchPercentage) {
        setIsComplete(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimation();
      }
    }
  };

  return (
    <motion.div
      className={cn("relative select-none", className)}
      style={{
        width,
        height,
        cursor:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto",
      }}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-20 rounded-[37px] pointer-events-auto overflow-hidden"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></canvas>
      <div 
        className={cn(
          "relative z-10",
          !isOverlayLoaded && "opacity-0"
        )}
        style={{
          transition: "opacity 0.2s ease-in-out"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
