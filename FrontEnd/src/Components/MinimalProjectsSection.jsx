import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A modern, responsive e-commerce solution built with React and Node.js. Features include real-time inventory, secure payments, and an intuitive admin dashboard.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "Web Application",
            year: "2024"
        },
        {
            title: "Design System",
            description: "Comprehensive design system and component library for a fintech startup. Includes 50+ components, design tokens, and detailed documentation.",
            tech: ["React", "Storybook", "Figma", "TypeScript"],
            category: "Design System",
            year: "2024"
        },
        {
            title: "Analytics Dashboard",
            description: "Real-time analytics dashboard for tracking user behavior and business metrics. Features interactive charts and customizable widgets.",
            tech: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
            category: "Dashboard",
            year: "2023"
        },
        {
            title: "Mobile Banking App",
            description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
            tech: ["React Native", "Firebase", "Node.js", "JWT"],
            category: "Mobile App",
            year: "2023"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <section ref={ref} id="work" className="py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center mb-20"
                >
                    <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
                        Featured Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mt-4 mb-6">
                        Selected projects
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-24"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${
                                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                            }`}
                        >
                            {/* Project Info */}
                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>{project.category}</span>
                                    <span>•</span>
                                    <span>{project.year}</span>
                                </div>
                                
                                <h3 className="text-3xl font-light text-gray-900">
                                    {project.title}
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex gap-4 pt-4">
                                    <motion.button
                                        whileHover={{ 
                                            scale: 1.02,
                                            backgroundColor: "rgb(59 130 246)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        View Project
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ 
                                            scale: 1.02,
                                            borderColor: "rgb(59 130 246)",
                                            color: "rgb(59 130 246)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200"
                                    >
                                        Source Code
                                    </motion.button>
                                </div>
                            </div>

                            {/* Project Visual */}
                            <motion.div 
                                className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                                    <div className="w-full h-full bg-white m-4 rounded-lg shadow-sm flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
                                            </div>
                                            <p className="text-gray-500 text-sm">Project Preview</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Floating accent */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.5
                                    }}
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-lg opacity-80"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center mt-20 pt-16 border-t border-gray-200"
                >
                    <h3 className="text-2xl font-light text-gray-900 mb-4">
                        Interested in working together?
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        I'm always open to discussing new opportunities and interesting projects.
                    </p>
                    <motion.button
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-300"
                    >
                        Let's Talk
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
