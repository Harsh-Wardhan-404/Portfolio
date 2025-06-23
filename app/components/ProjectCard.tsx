// "use client";
// import React from "react";
// import { PinContainer } from "./ui/3d-pin";
// import Image from "next/image";

// export function ProjectCard({
//     title,
//     description,
//     image,
//     link,
// }: {
//     title: string;
//     description: string;
//     image: string;
//     link: string;
// }) {
//     return (
//         <div className="h-[30rem] w-full flex items-center justify-center">
//             <PinContainer
//                 title={title}
//                 // Remove the href from here to prevent the outer <a> tag
//                 href=""
//             >
//                 <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[25rem] h-[25rem]">
//                     <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
//                         {title}
//                     </h3>
//                     <div className="text-base !m-0 !p-0 font-normal">
//                         <span className="text-slate-500">{description}</span>
//                     </div>
//                     <div className="flex flex-1 w-full rounded-lg mt-4 relative">
//                         <Image
//                             src={image}
//                             alt={title}
//                             layout="fill"
//                             objectFit="cover"
//                             className="rounded-lg"
//                         />
//                     </div>
//                     {/* Add a separate button here if you need the link functionality */}
//                     <a
//                         href={link}
//                         className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         View Project
//                     </a>
//                 </div>
//             </PinContainer>
//         </div>
//     );
// }