import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PortfolioPreview from '../Components/PortfolioPreview';

const PortfolioGenerator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        githubLink: '',
        linkedinLink: '',
        position: 'student'
    });
    const [generatedPortfolio, setGeneratedPortfolio] = useState(null);

    const positions = [
        { value: 'student', label: 'Student', icon: '🎓' },
        { value: 'fresher', label: 'Fresher', icon: '🌱' },
        { value: 'junior', label: 'Junior Developer (1-2 years)', icon: '💻' },
        { value: 'mid', label: 'Mid-level Developer (3-5 years)', icon: '🚀' },
        { value: 'senior', label: 'Senior Developer (5+ years)', icon: '⭐' },
        { value: 'lead', label: 'Tech Lead/Manager', icon: '👑' }
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Redirect to portfolio-generator/banner route
        navigate('/portfolio-generator/banner');
    };

    const isFormValid = formData.name && formData.githubLink && formData.linkedinLink;

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background with same pattern as home */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                }}
            />
            <div className="fixed inset-0 bg-black/10" />

            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute right-0 top-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Navigation */}
            <motion.nav 
                className="bg-white/20 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div 
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div 
                                className="w-8 h-8 bg-gradient-to-br from-accent-apple-blue to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <span className="text-white font-bold text-sm">TT</span>
                            </motion.div>
                            <span className="text-xl font-display font-bold text-white">ThinkTank</span>
                        </motion.div>

                        <motion.button
                            onClick={() => navigate('/')}
                            className="text-white/90 px-4 py-2 rounded-xl font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20"
                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            ← Back to Home
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                        Portfolio
                        <span className="block text-blue-300">Generator</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Create your stunning portfolio in minutes. Just provide your details and let AI do the magic.
                    </p>
                </motion.div>

                {!generatedPortfolio ? (
                    <motion.div
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <label className="block text-white font-semibold mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </motion.div>

                            {/* GitHub Link */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <label className="block text-white font-semibold mb-2">
                                    GitHub Profile *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </div>
                                    <input
                                        type="url"
                                        name="githubLink"
                                        value={formData.githubLink}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/yourusername"
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* LinkedIn Link */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <label className="block text-white font-semibold mb-2">
                                    LinkedIn Profile *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </div>
                                    <input
                                        type="url"
                                        name="linkedinLink"
                                        value={formData.linkedinLink}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourusername"
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Position Selection */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <label className="block text-white font-semibold mb-4">
                                    Current Position *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {positions.map((pos) => (
                                        <motion.label
                                            key={pos.value}
                                            className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                                formData.position === pos.value
                                                    ? 'bg-blue-500/30 border-2 border-blue-400/50'
                                                    : 'bg-white/10 border border-white/20 hover:bg-white/15'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <input
                                                type="radio"
                                                name="position"
                                                value={pos.value}
                                                checked={formData.position === pos.value}
                                                onChange={handleInputChange}
                                                className="sr-only"
                                            />
                                            <span className="text-2xl mr-3">{pos.icon}</span>
                                            <span className="text-white font-medium">{pos.label}</span>
                                        </motion.label>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Generate Button */}
                            <motion.div
                                className="pt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                                        isFormValid
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/25'
                                            : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                                    }`}
                                    whileHover={isFormValid ? { scale: 1.02, y: -2 } : {}}
                                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                                >
                                    🚀 Generate My Portfolio
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                ) : (
                    /* Success State */
                    <motion.div
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>

                        <h2 className="text-3xl font-bold text-white mb-4">
                            🎉 Portfolio Generated Successfully!
                        </h2>
                        <p className="text-white/80 mb-8">
                            Your beautiful portfolio is ready and deployed at:
                        </p>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                            <p className="text-blue-300 font-mono text-lg break-all">
                                {generatedPortfolio.portfolioUrl}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="bg-blue-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg border border-white/20"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Portfolio
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    setGeneratedPortfolio(null);
                                    setFormData({ name: '', githubLink: '', linkedinLink: '', position: 'student' });
                                }}
                                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Create Another
                            </motion.button>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default PortfolioGenerator;
