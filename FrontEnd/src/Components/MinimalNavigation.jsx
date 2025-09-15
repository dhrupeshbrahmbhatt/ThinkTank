import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio2 } from '../context/Portfolio2Context';
import PublishModal from './PublishModal';

const MinimalNavigation = ({ activeSection, isMenuOpen, setIsMenuOpen }) => {
    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' }
    ];

    const { isEditMode, toggleEditMode, exportData } = usePortfolio2();
    const [showPublishModal, setShowPublishModal] = useState(false);

    const handlePublish = async (publishData) => {
        console.log('Publishing portfolio with:', publishData);
        // Here you would integrate with your publishing service
        // For now, we'll just log the data
        alert(`Portfolio will be published to:\nFree URL: ${publishData.freeUrl}.portfolio.dev\nCustom Domain: ${publishData.customDomain || 'None'}\nSSL: ${publishData.enableSSL ? 'Enabled' : 'Disabled'}`);
    };

    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl font-medium text-gray-900"
                    >
                        Alex Chen
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                whileHover={{ 
                                    y: -2,
                                    transition: { duration: 0.2 }
                                }}
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-medium relative"
                            >
                                {item.name}
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                        
                        {/* Edit Mode Toggle */}
                        <motion.button
                            onClick={toggleEditMode}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isEditMode 
                                    ? 'bg-blue-500 text-white shadow-lg' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {isEditMode ? 'Exit Edit' : 'Edit'}
                        </motion.button>
                        
                        {/* Save Button - only show in edit mode */}
                        {isEditMode && (
                            <motion.button
                                onClick={exportData}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 shadow-lg"
                            >
                                Save
                            </motion.button>
                        )}
                        
                        {/* Publish Button */}
                        <motion.button
                            onClick={() => setShowPublishModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-all duration-200 shadow-lg"
                        >
                            Publish
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                            <motion.div
                                animate={{ 
                                    rotate: isMenuOpen ? 45 : 0, 
                                    y: isMenuOpen ? 6 : 0,
                                    opacity: isMenuOpen ? 1 : 1
                                }}
                                transition={{ duration: 0.3 }}
                                className="w-5 h-0.5 bg-gray-900 rounded-full"
                            />
                            <motion.div
                                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                transition={{ duration: 0.2 }}
                                className="w-5 h-0.5 bg-gray-900 rounded-full"
                            />
                            <motion.div
                                animate={{ 
                                    rotate: isMenuOpen ? -45 : 0, 
                                    y: isMenuOpen ? -6 : 0 
                                }}
                                transition={{ duration: 0.3 }}
                                className="w-5 h-0.5 bg-gray-900 rounded-full"
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.3, 
                                        delay: index * 0.05,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg font-medium py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Publish Modal */}
            <PublishModal
                isOpen={showPublishModal}
                onClose={() => setShowPublishModal(false)}
                onPublish={handlePublish}
            />
        </motion.nav>
    );
};

export default MinimalNavigation;
