'use client';

import HeroSection from './components/HeroSection';
import SystemArchitecture from './components/SystemArchitecture';
// import TechnicalMetrics from './components/TechnicalMetrics';
import ContactSection from './components/ContactSection';
// import { ProjectCard } from './components/ProjectCard'; 
// import dynamic from 'next/dynamic';
import { ThreeDCard } from './components/ThreeDcard';



const projects = [
	{
		title: "Picasso",
		description: "A beautiful real-time collaborative drawing platform where ideas come to life.",
		image: "/picasso.png",
		link: "https://github.com/Harsh-Wardhan-404/Picasso"
	},
	{
		title: "AI English Assessment",
		description: "An AI-powered system to assess and improve English communication skills.",
		image: "/assessment.png",
		link: "https://github.com/Harsh-Wardhan-404/AI-driven-English-communication-assessment-system"
	},
	{
		title: "Multiplayer Chess",
		description: "A real-time online multiplayer chess game with classic gameplay.",
		image: "/chess.png",
		link: "https://github.com/Harsh-Wardhan-404/multiplayer-chess"
	},
]

export default function BackendPortfolio() {
	return (
		<main className="min-h-screen bg-[#1A1A1A] text-white overflow-x-hidden">
			<HeroSection />
			<SystemArchitecture />
			{/* <TechnicalMetrics /> */}
			<div className="py-10">
				<h2 className="text-4xl font-bold text-center mb-8">My Projects</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
					{projects.map((project, i) => (
						<ThreeDCard 
							key={i}
							title={project.title}
							description={project.description}
							image={project.image}
							link={project.link}
						/>
					))}
				</div>
			</div>
			<ContactSection />
		</main>
	);
}
