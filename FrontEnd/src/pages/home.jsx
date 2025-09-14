import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/signin");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-secondary-snow to-primary-silver flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border-3 border-accent-apple-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-primary-space-gray font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-snow to-primary-silver">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-8 h-8 bg-accent-apple-blue rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">TT</span>
                            </div>
                            <span className="text-xl font-display font-bold text-primary-space-gray">ThinkTank</span>
                        </motion.div>

                        <motion.div 
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <span className="text-gray-700">Welcome, {user?.name}</span>
                                    <motion.button
                                        onClick={handleLogout}
                                        className="bg-accent-apple-blue text-white px-4 py-2 rounded-lg font-medium"
                                        whileHover={{ backgroundColor: '#0066CC', scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Logout
                                    </motion.button>
                                </>
                            ) : (
                                <div className="flex space-x-3">
                                    <motion.button
                                        onClick={() => navigate("/signin")}
                                        className="text-primary-space-gray px-4 py-2 rounded-lg font-medium"
                                        whileHover={{ backgroundColor: '#F5F5F7' }}
                                    >
                                        Sign In
                                    </motion.button>
                                    <motion.button
                                        onClick={() => navigate("/signup")}
                                        className="bg-accent-apple-blue text-white px-4 py-2 rounded-lg font-medium"
                                        whileHover={{ backgroundColor: '#0066CC', scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Sign Up
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl lg:text-7xl font-display font-bold text-primary-space-gray mb-6 leading-tight">
                        Build Your
                        <span className="block text-accent-apple-blue">AI Portfolio</span>
                    </h1>
                    
                    <motion.p 
                        className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Create stunning, professional portfolios with the power of AI. 
                        No coding required - just your creativity and our intelligent design system.
                    </motion.p>

                    {!isAuthenticated && (
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.button
                                onClick={() => navigate("/signup")}
                                className="bg-accent-apple-blue text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
                                whileHover={{ 
                                    backgroundColor: '#0066CC',
                                    scale: 1.05,
                                    boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started Free
                            </motion.button>
                            
                            <motion.button
                                onClick={() => navigate("/signin")}
                                className="bg-white text-primary-space-gray px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 shadow-lg"
                                whileHover={{ 
                                    backgroundColor: '#F5F5F7',
                                    scale: 1.05,
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign In
                            </motion.button>
                        </motion.div>
                    )}

                    {isAuthenticated && (
                        <motion.div 
                            className="bg-white rounded-3xl shadow-apple-lg p-8 max-w-md mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-primary-space-gray mb-4">
                                Welcome back, {user?.name}!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Ready to continue building your amazing portfolio?
                            </p>
                            <motion.button
                                className="w-full bg-accent-apple-blue text-white py-3 px-6 rounded-xl font-semibold"
                                whileHover={{ 
                                    backgroundColor: '#0066CC',
                                    scale: 1.02
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Continue to Dashboard
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Features Section */}
                <motion.div 
                    className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="bg-white rounded-2xl p-8 shadow-apple border border-gray-100">
                        <div className="w-12 h-12 bg-accent-apple-blue rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-space-gray mb-3">AI-Powered Design</h3>
                        <p className="text-gray-600">Intelligent layouts that adapt to your content and style preferences.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-apple border border-gray-100">
                        <div className="w-12 h-12 bg-accent-forest-green rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-space-gray mb-3">Secure & Professional</h3>
                        <p className="text-gray-600">Enterprise-grade security with professional templates and hosting.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-apple border border-gray-100">
                        <div className="w-12 h-12 bg-accent-sunset-orange rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-space-gray mb-3">Loved by Creators</h3>
                        <p className="text-gray-600">Join thousands of satisfied users building amazing portfolios.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
    