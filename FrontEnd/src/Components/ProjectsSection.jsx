import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "🛒",
            github: "#",
            live: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            tech: ["React", "Socket.io", "Express", "PostgreSQL"],
            image: "📋",
            github: "#",
            live: "#"
        },
        {
            title: "Weather Dashboard",
            description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
            tech: ["JavaScript", "API Integration", "Chart.js", "CSS"],
            image: "🌤️",
            github: "#",
            live: "#"
        }
    ];

    return (
        <section id="projects" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 group"
                        >
                            <div className="p-6">
                                <div className="text-6xl mb-4 text-center">{project.image}</div>
                                <h3 className="text-xl font-semibold mb-3 text-purple-300 group-hover:text-purple-200 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <motion.a
                                        href={project.github}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-center text-sm transition-colors"
                                    >
                                        GitHub
                                    </motion.a>
                                    <motion.a
                                        href={project.live}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-center text-sm transition-all"
                                    >
                                        Live Demo
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
