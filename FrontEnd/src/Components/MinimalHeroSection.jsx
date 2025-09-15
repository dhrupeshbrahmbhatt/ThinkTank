import React, { useRef } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { usePortfolio2 } from '../context/Portfolio2Context';
import EditableText from './EditableText';

const HeroSection = ({ mousePosition }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { portfolioData, isEditMode, updatePersonal } = usePortfolio2();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Subtle mouse parallax effect
    const mouseX = mousePosition.x / window.innerWidth - 0.5;
    const mouseY = mousePosition.y / window.innerHeight - 0.5;

    return (
        <section 
            ref={ref}
            id="home" 
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        >
            <motion.div 
                style={{ y, opacity }}
                className="text-center px-6 max-w-4xl mx-auto relative z-10"
            >
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-6"
                >
                    <EditableText
                        value={portfolioData.personal.greeting}
                        onChange={(value) => updatePersonal('greeting', value)}
                        isEditMode={isEditMode}
                        className="text-blue-500 text-sm font-medium tracking-wide uppercase"
                        placeholder="Greeting text"
                    />
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-thin text-gray-900 mb-8 leading-none"
                >
                    <EditableText
                        value={portfolioData.personal.name}
                        onChange={(value) => updatePersonal('name', value)}
                        isEditMode={isEditMode}
                        className="inline-block"
                        placeholder="Your Name"
                    />
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-12"
                >
                    <h2 className="text-xl md:text-2xl text-gray-600 font-light mb-4">
                        <EditableText
                            value={portfolioData.personal.title}
                            onChange={(value) => updatePersonal('title', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Your Title"
                        />
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    <EditableText
                        value={portfolioData.personal.description}
                        onChange={(value) => updatePersonal('description', value)}
                        isEditMode={isEditMode}
                        className="inline-block"
                        placeholder="Your description"
                        multiline={true}
                    />
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-300"
                    >
                        <EditableText
                            value="View My Work"
                            onChange={(value) => updatePersonal('cta1', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Button 1 text"
                        />
                    </motion.button>
                    <motion.button
                        whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(59, 130, 246, 0.05)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-blue-500 transition-colors duration-300"
                    >
                        <EditableText
                            value="Get In Touch"
                            onChange={(value) => updatePersonal('cta2', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Button 2 text"
                        />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                style={{
                    x: mouseX * 20,
                    y: mouseY * 20,
                }}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                style={{
                    x: mouseX * -15,
                    y: mouseY * -15,
                }}
                className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-200 rounded-full opacity-40 blur-xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
