import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await login({
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                // Login successful, redirect to dashboard
                console.log('✅ Login successful, redirecting to dashboard');
                navigate("/dashboard");
            } else {
                setError(result.message || "Login failed");
            }
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex">
            {/* macOS Sonoma Evening Background */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat" 
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')` 
                }} 
            />
            <div className="fixed inset-0 bg-black/10" />
            {/* Left Form Section */}
            <motion.div 
                className="flex-1 flex items-center justify-center px-8 lg:px-12 relative z-10"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md">
                    <motion.div 
                        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                        whileHover={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-white/80">Sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white mb-2">
                                    Email Address
                                </label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
                                    placeholder="Enter your email"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'email' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white mb-2">
                                    Password
                                </label>
                                <motion.input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
                                    placeholder="Enter your password"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'password' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </motion.div>

                            <motion.div 
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="flex items-center">
                                    <motion.input 
                                        type="checkbox" 
                                        className="rounded border-white/30 text-blue-400 focus:ring-blue-400 bg-white/10"
                                        whileTap={{ scale: 0.95 }}
                                    />
                                    <span className="ml-2 text-sm text-white/80">Remember me</span>
                                </label>
                                <motion.a 
                                    href="#" 
                                    className="text-sm text-blue-300 font-semibold"
                                    whileHover={{ 
                                        color: '#93C5FD',
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    Forgot password?
                                </motion.a>
                            </motion.div>

                            {error && (
                                <motion.div
                                    className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-xl text-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                                    isSubmitting 
                                        ? 'bg-white/20 backdrop-blur-sm cursor-not-allowed text-white/60' 
                                        : 'bg-blue-500/80 backdrop-blur-sm text-white border border-blue-400/30'
                                }`}
                                whileHover={!isSubmitting ? { 
                                    backgroundColor: 'rgba(59, 130, 246, 0.9)',
                                    scale: 1.02,
                                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                                } : {}}
                                whileTap={!isSubmitting ? { 
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </motion.button>

                            <motion.div 
                                className="relative my-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/10 backdrop-blur-sm text-white/80 rounded-lg">Or continue with</span>
                                </div>
                            </motion.div>

                            <motion.button
                                type="button"
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2"
                                whileHover={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    scale: 1.02,
                                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
                                }}
                                whileTap={{ 
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Google</span>
                            </motion.button>
                        </form>

                        <motion.div 
                            className="mt-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            <p className="text-white/80">
                                Don't have an account?{' '}
                                <motion.a 
                                    href="/signup" 
                                    className="text-blue-300 font-semibold"
                                    whileHover={{ 
                                        color: '#93C5FD',
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    Sign Up
                                </motion.a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Content Section */}
            <motion.div 
                className="flex-1 flex items-center justify-center px-12 lg:px-16 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                            Welcome to
                            <span className="block text-accent-apple-blue">ThinkTank</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        className="text-xl text-gray-300 mb-8 leading-relaxed"
                        variants={itemVariants}
                    >
                        Your AI-powered portfolio builder. Create stunning, professional portfolios 
                        that showcase your work and tell your story.
                    </motion.p>

                    <motion.div 
                        className="space-y-6"
                        variants={itemVariants}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent-apple-blue rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Smart Templates</h3>
                                <p className="text-gray-300">AI-curated designs that adapt to your style</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent-forest-green rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Performance Analytics</h3>
                                <p className="text-gray-300">Track views and engagement metrics</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent-sunset-orange rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Mobile Optimized</h3>
                                <p className="text-gray-300">Perfect on every device and screen size</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                        variants={itemVariants}
                        whileHover={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 bg-accent-apple-blue rounded-full border-2 border-white"></div>
                                <div className="w-10 h-10 bg-accent-forest-green rounded-full border-2 border-white"></div>
                                <div className="w-10 h-10 bg-accent-sunset-orange rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <p className="text-white font-semibold">Join 10,000+ creators</p>
                                <p className="text-gray-300 text-sm">Building amazing portfolios daily</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signin;
