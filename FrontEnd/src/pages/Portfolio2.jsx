import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Portfolio2Provider, usePortfolio2 } from '../context/Portfolio2Context';
import MinimalNavigation from '../Components/MinimalNavigation';
import HeroSection from '../Components/MinimalHeroSection';
import AboutSection from '../Components/MinimalAboutSection';
import SkillsSection from '../Components/MinimalSkillsSection';
import ProjectsSection from '../Components/MinimalProjectsSection';
import ContactSection from '../Components/MinimalContactSection';
import CursorFollower from '../Components/CursorFollower';

const Portfolio2Content = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showSaveIndicator, setShowSaveIndicator] = useState(false);
    const { scrollYProgress } = useScroll();
    const { isEditMode, toggleEditMode, exportData, resetToDefault, clearAllData } = usePortfolio2();
    
    // Track mouse movement for subtle interactions
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Show save indicator when data changes
    useEffect(() => {
        setShowSaveIndicator(true);
        const timer = setTimeout(() => {
            setShowSaveIndicator(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [isEditMode]);

    const handleExport = () => {
        exportData();
        setShowSaveIndicator(true);
        setTimeout(() => setShowSaveIndicator(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-light overflow-x-hidden">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Edit Mode Toggle */}
            <motion.button
                onClick={toggleEditMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`fixed top-20 right-6 z-50 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isEditMode 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                }`}
            >
                {isEditMode ? '✕ Exit Edit' : '✏️ Edit Mode'}
            </motion.button>

            {/* Edit Mode Indicator */}
            {isEditMode && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-20 left-6 z-50 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                    🎨 Edit Mode Active - Click on text to edit
                </motion.div>
            )}

            {/* Save Indicator */}
            <AnimatePresence>
                {showSaveIndicator && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-32 right-6 z-50 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                        💾 Data Saved Automatically
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Additional Controls */}
            {isEditMode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2"
                >
                    <motion.button
                        onClick={handleExport}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-green-600"
                    >
                        📥 Export Data
                    </motion.button>
                    <motion.button
                        onClick={resetToDefault}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600"
                    >
                        🔄 Reset to Default
                    </motion.button>
                    <motion.button
                        onClick={clearAllData}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-red-600"
                    >
                        🗑️ Clear All Data
                    </motion.button>
                </motion.div>
            )}

            {/* Navigation */}
            <MinimalNavigation 
                activeSection={activeSection}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {/* Hero Section */}
            <HeroSection mousePosition={mousePosition} />

            {/* About Section */}
            <AboutSection />

            {/* Skills Section */}
            <SkillsSection />

            {/* Projects Section */}
            <ProjectsSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Cursor Follower */}
            <CursorFollower mousePosition={mousePosition} />
        </div>
    );
};

const Portfolio2 = () => {
    return (
        <Portfolio2Provider>
            <Portfolio2Content />
        </Portfolio2Provider>
    );
};

export default Portfolio2;