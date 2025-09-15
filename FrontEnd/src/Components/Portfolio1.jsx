import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import FloatingElements from './FloatingElements';

const Portfolio1 = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Navigation items
    const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
            {/* Navigation */}
            <Navigation 
                navItems={navItems} 
                activeSection={activeSection}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {/* Hero Section */}
            <HeroSection opacity={opacity} />

            {/* About Section */}
            <AboutSection />

            {/* Skills Section */}
            <SkillsSection />

            {/* Projects Section */}
            <ProjectsSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Floating Elements */}
            <FloatingElements />
        </div>
    );
};

export default Portfolio1;
