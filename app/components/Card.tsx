"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

export function Card() {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] w-40 h-40 sm:max-w-sm sm:w-auto sm:h-auto bg-white dark:bg-zinc-900">
        <img
          src={`/mog.jpg`}
          alt="mog"
          height="500"
          width="500"
          className="w-full h-full sm:w-auto sm:h-auto object-cover sm:object-contain rounded-3xl"
        />
      </BackgroundGradient>
    </div>
  );
}
