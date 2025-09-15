import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio2 } from '../context/Portfolio2Context';
import EditableText from './EditableText';

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { portfolioData, isEditMode, updateAbout, updateAboutParagraph, updateAboutValue } = usePortfolio2();

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
        <section ref={ref} id="about" className="py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left Column - Text */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
                                About Me
                            </span>
                            <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mt-4 mb-6">
                                <EditableText
                                    value={portfolioData.about.subtitle}
                                    onChange={(value) => updateAbout('subtitle', value)}
                                    isEditMode={isEditMode}
                                    className="inline-block"
                                    placeholder="About subtitle"
                                />
                            </h2>
                        </motion.div>

                        <motion.p 
                            variants={itemVariants}
                            className="text-lg text-gray-600 leading-relaxed"
                        >
                            <EditableText
                                value={portfolioData.about.paragraphs[0]}
                                onChange={(value) => updateAboutParagraph(0, value)}
                                isEditMode={isEditMode}
                                className="inline-block"
                                placeholder="First paragraph"
                                multiline={true}
                            />
                        </motion.p>

                        <motion.p 
                            variants={itemVariants}
                            className="text-lg text-gray-600 leading-relaxed"
                        >
                            <EditableText
                                value={portfolioData.about.paragraphs[1]}
                                onChange={(value) => updateAboutParagraph(1, value)}
                                isEditMode={isEditMode}
                                className="inline-block"
                                placeholder="Second paragraph"
                                multiline={true}
                            />
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-8 pt-8"
                        >
                            <div>
                                <h4 className="text-2xl font-light text-gray-900 mb-2">
                                    <EditableText
                                        value={portfolioData.about.stats[0].value}
                                        onChange={(value) => updateAbout('stats', portfolioData.about.stats.map((stat, i) => i === 0 ? {...stat, value} : stat))}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Stat value"
                                    />
                                </h4>
                                <p className="text-gray-600">
                                    <EditableText
                                        value={portfolioData.about.stats[0].label}
                                        onChange={(value) => updateAbout('stats', portfolioData.about.stats.map((stat, i) => i === 0 ? {...stat, label: value} : stat))}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Stat label"
                                    />
                                </p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-light text-gray-900 mb-2">
                                    <EditableText
                                        value={portfolioData.about.stats[1].value}
                                        onChange={(value) => updateAbout('stats', portfolioData.about.stats.map((stat, i) => i === 1 ? {...stat, value} : stat))}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Stat value"
                                    />
                                </h4>
                                <p className="text-gray-600">
                                    <EditableText
                                        value={portfolioData.about.stats[1].label}
                                        onChange={(value) => updateAbout('stats', portfolioData.about.stats.map((stat, i) => i === 1 ? {...stat, label: value} : stat))}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Stat label"
                                    />
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Visual */}
                    <motion.div 
                        variants={itemVariants}
                        className="relative"
                    >
                        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96">
                            {/* Placeholder for profile image or visual element */}
                            <div className="w-full h-full bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-3xl">👨‍💻</span>
                                    </div>
                                    <p className="text-gray-500 text-sm">Profile Image</p>
                                </div>
                            </div>
                            
                            {/* Floating Elements */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-xl opacity-80"
                            />
                            
                            <motion.div
                                animate={{
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-400 rounded-lg opacity-60"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-24 grid md:grid-cols-3 gap-8"
                >
                    {portfolioData.about.values.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="text-center p-6"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                <EditableText
                                    value={value.title}
                                    onChange={(newValue) => updateAboutValue(index, 'title', newValue)}
                                    isEditMode={isEditMode}
                                    className="inline-block"
                                    placeholder="Value title"
                                />
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                <EditableText
                                    value={value.description}
                                    onChange={(newValue) => updateAboutValue(index, 'description', newValue)}
                                    isEditMode={isEditMode}
                                    className="inline-block"
                                    placeholder="Value description"
                                    multiline={true}
                                />
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
