'use client';

import { motion } from 'framer-motion';
import { Card } from './Card';

export default function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
			<div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 opacity-10" />
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
			</div>

			<div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 max-w-6xl w-full">
				{/* Card - appears above on mobile, left on desktop */}
				<div className="flex-shrink-0">
			<Card />
				</div>

				{/* Terminal section */}
				<div className="w-full max-w-2xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="bg-black/50 backdrop-blur-lg rounded-lg border border-gray-800 p-6"
				>
					<div className="flex items-center gap-2 mb-4">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<div className="w-3 h-3 rounded-full bg-yellow-500" />
						<div className="w-3 h-3 rounded-full bg-green-500" />
					</div>
					<div className="font-mono">
						<p className="text-green-500">$ whoami</p>
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">Harsh_w/n</h1>
							<p className="text-gray-400 mb-2">Backend Developer</p>
						<p className="text-green-500">$ skills</p>
						<div className="flex flex-wrap gap-2 mt-2">
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">Node.js</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">Python</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">NextJS</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">React</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">AWS</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">Docker</span>
								<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20 text-sm">Kubernetes</span>
							</div>
						</div>
					</motion.div>
					</div>
			</div>
		</section>
	);
}
