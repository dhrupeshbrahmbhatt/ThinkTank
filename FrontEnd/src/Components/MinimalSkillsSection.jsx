import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio2 } from '../context/Portfolio2Context';
import EditableText from './EditableText';

const SkillsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { portfolioData, isEditMode, updateSkill, addSkill, removeSkill } = usePortfolio2();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <section ref={ref} id="skills" className="py-32 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
                        Skills & Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mt-4 mb-6">
                        What I bring to the table
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {portfolioData.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative group"
                        >
                            {isEditMode && (
                                <motion.button
                                    onClick={() => removeSkill(index)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    ×
                                </motion.button>
                            )}
                            
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-gray-900">
                                    <EditableText
                                        value={skill.name}
                                        onChange={(value) => updateSkill(index, 'name', value)}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Skill name"
                                    />
                                </h3>
                                <span className="text-sm text-gray-500">
                                    <EditableText
                                        value={skill.level.toString()}
                                        onChange={(value) => updateSkill(index, 'level', parseInt(value) || 0)}
                                        isEditMode={isEditMode}
                                        className="inline-block w-8"
                                        placeholder="90"
                                    />%
                                </span>
                            </div>
                            
                            <div className="mb-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                        transition={{ 
                                            duration: 1.5, 
                                            delay: index * 0.1,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className="bg-blue-500 h-1.5 rounded-full"
                                    />
                                </div>
                            </div>
                            
                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                                <EditableText
                                    value={skill.category}
                                    onChange={(value) => updateSkill(index, 'category', value)}
                                    isEditMode={isEditMode}
                                    className="inline-block"
                                    placeholder="Category"
                                />
                            </span>
                        </motion.div>
                    ))}
                    
                    {/* Add Skill Button */}
                    {isEditMode && (
                        <motion.button
                            onClick={addSkill}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-6 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors duration-200"
                        >
                            <span className="text-2xl mr-2">+</span>
                            Add Skill
                        </motion.button>
                    )}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        I'm constantly learning and adapting to new technologies. 
                        My focus is on creating efficient, scalable solutions that deliver exceptional user experiences.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;
