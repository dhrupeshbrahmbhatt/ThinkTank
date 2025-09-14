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
        <div className="min-h-screen bg-gradient-to-br from-secondary-snow to-primary-silver flex">
            {/* Left Content Section */}
            <motion.div 
                className="flex-1 flex items-center justify-center px-12 lg:px-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-lg">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold text-primary-space-gray mb-6 leading-tight">
                            Create Your
                            <span className="block text-accent-apple-blue">AI Portfolio</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        className="text-xl text-gray-600 mb-8 leading-relaxed"
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
                            <div className="w-12 h-12 bg-accent-apple-blue rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-space-gray">AI-Powered Design</h3>
                                <p className="text-gray-600">Intelligent layouts that adapt to your content</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent-forest-green rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-space-gray">Secure & Professional</h3>
                                <p className="text-gray-600">Enterprise-grade security for your portfolio</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent-sunset-orange rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-space-gray">Loved by Creators</h3>
                                <p className="text-gray-600">Join thousands of satisfied users</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Form Section */}
            <motion.div 
                className="flex-1 flex items-center justify-center px-8 lg:px-12"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md">
                    <motion.div 
                        className="bg-white rounded-3xl shadow-apple-lg p-8 border border-gray-100"
                        whileHover={{ 
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-display font-bold text-primary-space-gray mb-2">
                                Get Started
                            </h2>
                            <p className="text-gray-600">Create your account in seconds</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <motion.input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-apple-blue focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your full name"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'name' ? '#007AFF' : '#E5E5E7'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-apple-blue focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'email' ? '#007AFF' : '#E5E5E7'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <motion.input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-apple-blue focus:border-transparent transition-all duration-200"
                                    placeholder="Create a password"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'password' ? '#007AFF' : '#E5E5E7'
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <motion.input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-apple-blue focus:border-transparent transition-all duration-200"
                                    placeholder="Confirm your password"
                                    whileFocus={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    animate={{
                                        borderColor: focusedField === 'confirmPassword' ? '#007AFF' : '#E5E5E7'
                                    }}
                                />
                            </motion.div>

                            {error && (
                                <motion.div
                                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
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
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-accent-apple-blue text-white'
                                }`}
                                whileHover={!isSubmitting ? { 
                                    backgroundColor: '#0066CC',
                                    scale: 1.02,
                                    boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
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
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <motion.a 
                                    href="/signin" 
                                    className="text-accent-apple-blue font-semibold"
                                    whileHover={{ 
                                        color: '#0066CC',
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
