"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

export function ThreeDCard({
  title,
  description,
  image,
  link,
}: {
  title:string;
  description:string;
  image:string;
  link:string;
}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-300 text-sm max-w-sm mt-2"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href={link}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white"
          >
            View Project →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
