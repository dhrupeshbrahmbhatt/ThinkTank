import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 px-4">
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
                            About Me
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-purple-300">
                            Passionate Developer & Problem Solver
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            As a fresh graduate with a strong foundation in computer science, I'm passionate about 
                            creating innovative solutions that make a difference. My journey in programming started 
                            with curiosity and has evolved into a deep love for crafting elegant, efficient code.
                        </p>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            I specialize in modern web technologies and am always eager to learn new frameworks 
                            and tools. My goal is to contribute to meaningful projects while continuously growing 
                            as a developer.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                                <h4 className="font-semibold text-purple-300 mb-2">Education</h4>
                                <p className="text-sm text-gray-400">Computer Science Graduate</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                                <h4 className="font-semibold text-purple-300 mb-2">Focus</h4>
                                <p className="text-sm text-gray-400">Full Stack Development</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 rounded-2xl backdrop-blur-sm">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-purple-300">Core Values</h4>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                            Clean, maintainable code
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                            User-centered design
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                            Continuous learning
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                            Collaborative teamwork
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
