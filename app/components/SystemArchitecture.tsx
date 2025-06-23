'use client';

import { motion } from 'framer-motion';

export default function SystemArchitecture() {
	return (
		<section className="py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12 text-center">
					Experience
				</motion.h2>

				<div className="grid grid-cols-1 gap-8">
					{[
						{
							title: 'PluginLive - Full Stack Developer',
							description: 'Designed and implemented Assessment module from scratch with AI generation and evaluation',
							details: [
								' Developed a comprehensive Assessment module for the core platform using Node.js, Prisma ORM, PostgreSQL, React, and Docker, enabling seamless online examination functionality',
								' Architected and implemented end-to-end proctoring system with real-time monitoring capabilities, including webcam/screen recording, browser lockdown, and anti-cheating detection',
								' Integrated Oracle Object Storage for secure file management and developed responsive frontend interfaces for the complete assessment workflow, supporting 1000+ concurrent users',
								' Optimized database queries using Prisma, reducing assessment loading times by 50% and improving overall platform performance',
							],
							tech: ['Node.js', 'Prisma', 'PostgreSQL', 'React', 'Docker'],
						},
						// {
						// 	title: 'Real-time Data Processing Pipeline',
						// 	description: 'Built a robust data processing pipeline handling 5TB+ daily data with sub-second latency',
						// 	details: [
						// 		'Implemented stream processing with Apache Flink',
						// 		'Designed fault-tolerant architecture with automatic failover',
						// 		'Optimized data throughput by 60%',
						// 		'Implemented comprehensive monitoring with Prometheus & Grafana',
						// 	],
						// 	tech: ['Apache Flink', 'AWS Kinesis', 'Prometheus', 'Grafana', 'Python', 'PostgreSQL'],
						// },
					].map((project, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
							className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-800"
						>
							<h3 className="text-2xl font-bold mb-4">{project.title}</h3>
							<p className="text-gray-400 mb-6">{project.description}</p>
							<div className="mb-6">
								<h4 className="text-lg font-semibold mb-2">Key Achievements:</h4>
								<ul className="list-disc list-inside space-y-2 text-gray-300">
									{project.details.map((detail, i) => (
										<li key={i}>{detail}</li>
									))}
								</ul>
							</div>
							<div className="flex flex-wrap gap-2">
								{project.tech.map((tech, i) => (
									<span key={i} className="text-sm px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
										{tech}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
