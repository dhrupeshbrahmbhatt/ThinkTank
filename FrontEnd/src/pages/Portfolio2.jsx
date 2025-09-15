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
    const { scrollYProgress } = useScroll();
    const { isEditMode, toggleEditMode } = usePortfolio2();
    
    // Track mouse movement for subtle interactions
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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