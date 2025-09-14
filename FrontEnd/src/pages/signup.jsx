import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const { register } = useAuth();
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
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            if (result.success) {
                // Registration successful, redirect to home
                navigate("/");
            } else {
                setError(result.message || "Registration failed");
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
        hidden: { opacity: 0, x: 50 },
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
            {/* Background */}
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')` }} />
            <div className="fixed inset-0 bg-black/10" />
            {/* Left Content Section */}
            <motion.div 
                className="flex-1 flex items-center justify-center px-12 lg:px-16 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            Create Your
                            <span className="block text-blue-300">AI Portfolio</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        className="text-xl text-white/80 mb-8 leading-relaxed"
                        variants={itemVariants}
                    >
                        Build stunning portfolios with the power of AI. No coding required, 
                        just your creativity and our intelligent design system.
                    </motion.p>

                    <motion.div 
                        className="space-y-6"
                        variants={itemVariants}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">AI-Powered Design</h3>
                                <p className="text-white/70">Intelligent layouts that adapt to your content</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Secure & Professional</h3>
                                <p className="text-white/70">Enterprise-grade security for your portfolio</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Loved by Creators</h3>
                                <p className="text-white/70">Join thousands of satisfied users</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Form Section */}
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
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">
                                Get Started
                            </h2>
                            <p className="text-white/80">Create your account in seconds</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    Full Name
                                </label>
                                <motion.input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
                                    placeholder="Enter your full name"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'name' ? '#60A5FA' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white/90 mb-2">
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
                                        borderColor: focusedField === 'email' ? '#60A5FA' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white/90 mb-2">
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
                                    placeholder="Create a password"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'password' ? '#60A5FA' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-white/90 mb-2">
                                    Confirm Password
                                </label>
                                <motion.input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-white placeholder-white/60"
                                    placeholder="Confirm your password"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'confirmPassword' ? '#60A5FA' : 'rgba(255, 255, 255, 0.2)'
                                    }}
                                />
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
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-200 border border-white/20 ${
                                    isSubmitting 
                                        ? 'bg-gray-500/50 backdrop-blur-sm cursor-not-allowed text-white/60' 
                                        : 'bg-blue-500/80 backdrop-blur-sm text-white'
                                }`}
                                whileHover={!isSubmitting ? { 
                                    backgroundColor: 'rgba(59, 130, 246, 0.9)',
                                    scale: 1.02,
                                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                                } : {}}
                                whileTap={!isSubmitting ? { 
                                    scale: 0.98,
                                    transition: { duration: 0.1 }
                                } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </motion.button>
                        </form>

                        <motion.div 
                            className="mt-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <p className="text-white/80">
                                Already have an account?{' '}
                                <motion.a 
                                    href="/signin" 
                                    className="text-blue-300 font-semibold"
                                    whileHover={{ 
                                        color: '#93C5FD',
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    Sign In
                                </motion.a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
