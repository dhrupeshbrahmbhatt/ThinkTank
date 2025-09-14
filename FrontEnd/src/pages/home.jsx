import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ParallaxHero from "../Components/ParallaxHero";

const Home = () => {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const handleLogout = async () => {
        await logout();
        navigate("/signin");
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-secondary-snow to-primary-silver flex items-center justify-center">
                <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-8 h-8 border-3 border-accent-apple-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-primary-space-gray font-medium">Loading...</span>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* macOS Sonoma Evening Background */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            />
            
            {/* Subtle Overlay for Better Readability */}
            <div className="fixed inset-0 bg-black/10" />

            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    style={{
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02,
                    }}
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
                    style={{
                        x: mousePosition.x * -0.01,
                        y: mousePosition.y * 0.01,
                    }}
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
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div 
                                className="w-8 h-8 bg-gradient-to-br from-accent-apple-blue to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span className="text-white font-bold text-sm">TT</span>
                            </motion.div>
                            <span className="text-xl font-display font-bold text-white">ThinkTank</span>
                        </motion.div>

                        <motion.div 
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <span className="text-white/90 font-medium">Welcome, {user?.name}</span>
                                    <motion.button
                                        onClick={handleLogout}
                                        className="bg-accent-apple-blue text-white px-4 py-2 rounded-xl font-medium shadow-lg"
                                        whileHover={{ 
                                            backgroundColor: '#0066CC', 
                                            scale: 1.05,
                                            boxShadow: '0 8px 25px rgba(0, 122, 255, 0.3)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        Logout
                                    </motion.button>
                                </>
                            ) : (
                                <div className="flex space-x-3">
                                    <motion.button
                                        onClick={() => navigate("/signin")}
                                        className="text-white/90 px-4 py-2 rounded-xl font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm"
                                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Sign In
                                    </motion.button>
                                    <motion.button
                                        onClick={() => navigate("/signup")}
                                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-medium shadow-lg border border-white/30"
                                        whileHover={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                                            scale: 1.05,
                                            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        Sign Up
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.nav>

            {/* Parallax Hero Section - Positioned in Middle */}
            <ParallaxHero 
                backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                title="ThinkTank Portfolio"
                subtitle="AI-Powered. One-Click Published. Beautifully Crafted."
                description="Transform your GitHub and LinkedIn profiles into stunning portfolios with the power of artificial intelligence. No coding required, just pure innovation."
                ctaText={isAuthenticated ? "Continue to Dashboard" : "Start Creating Free"}
                onCtaClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
            />

            {/* One-Click Publish Section */}
            <motion.section 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                            One-Click
                            <span className="block text-blue-300">Publish</span>
                        </h2>
                        <p className="text-xl text-white/80 mb-8 leading-relaxed">
                            Deploy your portfolio instantly to the web with our seamless publishing system. 
                            No hosting headaches, no complex configurations.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white/90">Custom domain support</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white/90">SSL certificates included</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white/90">Global CDN distribution</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-white/30 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/30 rounded w-1/2"></div>
                                    <div className="h-4 bg-white/30 rounded w-5/6"></div>
                                    <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-green-300 font-medium">Published successfully!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Domain</span>
                                    <span className="text-gray-800 font-medium">yourname.thinktank.dev</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">SSL</span>
                                    <span className="text-accent-forest-green font-medium">Auto-configured</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Analytics Section */}
            <motion.section 
                className="py-20 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <motion.h2 
                            className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            Powerful
                            <span className="block text-blue-300">Analytics</span>
                        </motion.h2>
                        <motion.p 
                            className="text-xl text-white/80 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Track your portfolio's performance with detailed insights and visitor analytics.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Visitor Insights",
                                value: "2,847",
                                change: "+23%",
                                icon: "👥",
                                description: "Monthly unique visitors"
                            },
                            {
                                title: "Engagement Rate",
                                value: "68%",
                                change: "+12%",
                                icon: "📊",
                                description: "Average time on site"
                            },
                            {
                                title: "Portfolio Views",
                                value: "5,234",
                                change: "+45%",
                                icon: "👁️",
                                description: "Total project views"
                            }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <span className="text-green-300 text-sm font-semibold bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-green-400/30">
                                        {stat.change}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-white/90 font-medium mb-2">{stat.title}</p>
                                <p className="text-white/70 text-sm">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Real-time Dashboard
                                </h3>
                                <p className="text-white-600 mb-6">
                                    Monitor your portfolio's performance with live analytics, 
                                    visitor tracking, and detailed engagement metrics.
                                </p>
                                <div className="space-y-3">
                                    {[
                                        "Live visitor tracking",
                                        "Geographic insights",
                                        "Device & browser analytics",
                                        "Performance optimization tips"
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 * index }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="w-2 h-2 bg-accent-apple-blue rounded-full"></div>
                                            <span className="text-gray-800">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold">Analytics Dashboard</h4>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Live visitors</span>
                                            <span className="text-green-400 font-semibold">23</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div 
                                                className="bg-accent-apple-blue h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "68%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                viewport={{ once: true }}
                                            ></motion.div>
                                        </div>
                                        <div className="text-sm text-gray-400">68% engagement rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Grid */}
            <motion.section 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-16 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <motion.h2 
                        className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Everything You Need
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            title: "AI-Powered Design",
                            description: "Intelligent layouts that adapt to your content and style preferences automatically.",
                            color: "accent-apple-blue"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            ),
                            title: "Secure Hosting",
                            description: "Enterprise-grade security with SSL certificates and global CDN distribution.",
                            color: "accent-forest-green"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            ),
                            title: "Advanced Analytics",
                            description: "Comprehensive insights into visitor behavior and portfolio performance.",
                            color: "accent-sunset-orange"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            ),
                            title: "Responsive Design",
                            description: "Beautiful portfolios that look perfect on every device and screen size.",
                            color: "accent-apple-blue"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            ),
                            title: "SEO Optimized",
                            description: "Built-in SEO optimization to help your portfolio rank higher in search results.",
                            color: "accent-forest-green"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            ),
                            title: "Customizable",
                            description: "Extensive customization options to match your personal brand and style.",
                            color: "accent-sunset-orange"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <motion.button 
                                className="w-full bg-blue-500/80 backdrop-blur-sm hover:bg-blue-600/80 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Generate My Portfolio
                            </motion.button>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/80 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* GitHub/LinkedIn Integration Section */}
            <motion.section 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-16 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <motion.h2 
                        className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Connect.
                        <span className="block text-blue-300">
                            AI Creates.
                        </span>
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Simply connect your GitHub and LinkedIn profiles. Our AI analyzes your projects, 
                        experience, and achievements to create a stunning portfolio automatically. 
                        <span className="text-blue-300 font-semibold">It's like magic.</span>
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left side - Connection Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                Connect Your Profiles
                            </h3>
                            
                            <div className="space-y-4">
                                {/* GitHub Connection */}
                                <motion.div 
                                    className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">GitHub</p>
                                            <p className="text-sm text-white/70">Projects & repositories</p>
                                        </div>
                                    </div>
                                    <motion.div 
                                        className="w-6 h-6 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                </motion.div>

                                {/* LinkedIn Connection */}
                                <motion.div 
                                    className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">LinkedIn</p>
                                            <p className="text-sm text-white/70">Experience & skills</p>
                                        </div>
                                    </div>
                                    <motion.div 
                                        className="w-6 h-6 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    >
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            </div>

                            <motion.div 
                                className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">AI Processing</p>
                                        <p className="text-sm text-white/70">Analyzing your data...</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side - AI Magic */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-white mb-8">
                                AI Transforms Your Data Into
                                <span className="block text-blue-300">Portfolio Magic</span>
                            </h3>

                            {[
                                {
                                    icon: "🔍",
                                    title: "Smart Analysis",
                                    description: "AI scans your GitHub repositories, commit history, and project descriptions"
                                },
                                {
                                    icon: "🧠",
                                    title: "Intelligent Extraction",
                                    description: "Extracts skills, technologies, and achievements from your LinkedIn profile"
                                },
                                {
                                    icon: "✨",
                                    title: "Automatic Generation",
                                    description: "Creates compelling project descriptions and professional summaries"
                                },
                                {
                                    icon: "🎨",
                                    title: "Beautiful Design",
                                    description: "Applies the perfect layout and styling based on your content"
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                >
                                    <div className="text-2xl">{step.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                                        <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Data Flow Visualization */}
                <motion.div 
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-8">
                        From Social Profiles to Stunning Portfolio
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        {[
                            { icon: "🔗", title: "Connect", desc: "Link profiles" },
                            { icon: "🤖", title: "AI Analyze", desc: "Extract data" },
                            { icon: "⚡", title: "Generate", desc: "Create portfolio" },
                            { icon: "🚀", title: "Publish", desc: "Go live instantly" }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                viewport={{ once: true }}
                            >
                                <motion.div 
                                    className="w-16 h-16 bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-2xl border border-white/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    {step.icon}
                                </motion.div>
                                <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                                <p className="text-sm text-white/70">{step.desc}</p>
                                {index < 3 && (
                                    <motion.div 
                                        className="hidden md:block absolute top-8 left-full w-6 h-0.5 bg-gradient-to-r from-blue-400/60 to-transparent"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.2 * index }}
                                        viewport={{ once: true }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-2xl text-center">
                    <motion.h2 
                        className="text-4xl lg:text-5xl font-display font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Ready to Build Your
                        <span className="block text-blue-300">Dream Portfolio?</span>
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Join thousands of creators who have already built stunning portfolios 
                        with ThinkTank. Start your journey today.
                    </motion.p>

                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500/80 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl border border-white/20"
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Get Started Free
                        </motion.button>
                        
                        <motion.button
                            className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-semibold text-lg border border-white/20"
                            whileHover={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                scale: 1.05,
                                y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            View Examples
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <motion.div 
                            className="col-span-1 md:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <motion.div 
                                    className="w-10 h-10 bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl border border-white/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="text-white font-bold">TT</span>
                                </motion.div>
                                <span className="text-2xl font-display font-bold text-white">ThinkTank</span>
                            </div>
                            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
                                The most intuitive AI-powered portfolio generator. Connect your GitHub and LinkedIn, 
                                let AI create magic, and publish with one click.
                            </p>
                            <div className="flex space-x-4">
                                {[
                                    { icon: "🐙", name: "GitHub", href: "#" },
                                    { icon: "💼", name: "LinkedIn", href: "#" },
                                    { icon: "🐦", name: "Twitter", href: "#" },
                                    { icon: "📧", name: "Email", href: "#" }
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 hover:bg-blue-500/80 hover:text-white transition-all duration-300 border border-white/20"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        title={social.name}
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-semibold text-white mb-4">Product</h3>
                            <ul className="space-y-3">
                                {[
                                    "Portfolio Generator",
                                    "AI Features",
                                    "Templates",
                                    "Analytics",
                                    "Publishing",
                                    "Custom Domains"
                                ].map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-200">
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Company Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-semibold text-white mb-4">Company</h3>
                            <ul className="space-y-3">
                                {[
                                    "About Us",
                                    "Careers",
                                    "Blog",
                                    "Press",
                                    "Contact",
                                    "Support"
                                ].map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-200">
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <motion.div 
                        className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                            <p className="text-white/70 text-sm">
                                © 2024 ThinkTank. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="text-white/70 hover:text-blue-300 text-sm transition-colors duration-200"
                                        whileHover={{ y: -1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                        
                        <motion.div 
                            className="flex items-center space-x-2 text-sm text-white/70"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <span>Made with</span>
                            <motion.span 
                                className="text-red-400"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                ❤️
                            </motion.span>
                            <span>by ThinkTank Team</span>
                        </motion.div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
};

export default Home;