import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: [
                { name: "React", level: 85, icon: "⚛️" },
                { name: "JavaScript", level: 80, icon: "🟨" },
                { name: "TypeScript", level: 75, icon: "🔷" },
                { name: "CSS/Tailwind", level: 90, icon: "🎨" },
                { name: "HTML5", level: 95, icon: "🌐" }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", level: 80, icon: "🟢" },
                { name: "Express", level: 75, icon: "🚀" },
                { name: "MongoDB", level: 70, icon: "🍃" },
                { name: "PostgreSQL", level: 65, icon: "🐘" },
                { name: "REST APIs", level: 85, icon: "🔗" }
            ]
        },
        {
            title: "Tools & Others",
            skills: [
                { name: "Git", level: 85, icon: "📚" },
                { name: "Docker", level: 60, icon: "🐳" },
                { name: "AWS", level: 55, icon: "☁️" },
                { name: "Figma", level: 70, icon: "🎯" },
                { name: "VS Code", level: 95, icon: "💻" }
            ]
        }
    ];

    return (
        <section id="skills" className="py-20 px-4 bg-black/20">
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
                            Skills & Technologies
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10"
                        >
                            <h3 className="text-xl font-semibold mb-6 text-purple-300 text-center">
                                {category.title}
                            </h3>
                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                                        viewport={{ once: true }}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-gray-300">
                                                <span className="mr-2">{skill.icon}</span>
                                                {skill.name}
                                            </span>
                                            <span className="text-sm text-purple-400">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                                viewport={{ once: true }}
                                                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
