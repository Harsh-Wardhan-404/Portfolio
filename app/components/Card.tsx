"use client";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { ScratchToReveal } from "./ui/Scratch";

export function Card() {
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 640) {
        // Mobile: 160px (w-40 = 10rem = 160px)
        setDimensions({ width: 160, height: 160 });
      } else {
        // Desktop: 384px (max-w-sm = 24rem = 384px)
        setDimensions({ width: 384, height: 384 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="w-40 h-40 sm:max-w-sm sm:w-auto sm:h-auto">
      <ScratchToReveal
        width={dimensions.width}
        height={dimensions.height}
        minScratchPercentage={50}
        overlayImage="/mog.jpg"
        className="w-full h-full"
      >
        <BackgroundGradient className="rounded-[32px] w-full h-full bg-white dark:bg-zinc-900">
          <img
            src={`/pfp.png`}
            alt="revealed"
            height="500"
            width="500"
            className="object-cover rounded-[32px]"
          />
        </BackgroundGradient>
      </ScratchToReveal>
    </div>
  );
}
