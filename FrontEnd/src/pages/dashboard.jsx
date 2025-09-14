import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../Components/DashboardCard";
import StatsCard from "../Components/StatsCard";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Log all data from backend
    console.log('🎯 Dashboard - User Data:', user);
    console.log('🎯 Dashboard - Auth State:', { user, isAuthenticated: !!user });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
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

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Parallax Background - Same as Home */}
            <motion.div 
                className="fixed inset-0 scale-110"
                style={{ y: backgroundY }}
            >
                <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat" 
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                    }} 
                />
                {/* Steve Jobs Style Translucent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-purple-900/50" />
                <div className="absolute inset-0 backdrop-blur-[1px]" />
            </motion.div>

            {/* Floating Particles - Apple Style */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Header - Enhanced Steve Jobs Style */}
            <motion.header 
                className="relative z-10 bg-white/5 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <motion.div 
                                className="w-12 h-12 bg-gradient-to-br from-blue-400/80 to-purple-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-xl"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-white font-bold text-xl">T</span>
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold text-white drop-shadow-lg">ThinkTank</h1>
                                <p className="text-white/80 text-sm font-medium">Student Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-white font-semibold drop-shadow-md">Welcome back, {user?.name || 'Student'}!</p>
                                <p className="text-white/80 text-sm font-medium">{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}</p>
                            </div>
                            <motion.button
                                onClick={handleLogout}
                                className="bg-white/8 backdrop-blur-2xl border border-white/20 text-white px-6 py-3 rounded-2xl font-medium shadow-xl"
                                whileHover={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    scale: 1.05,
                                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content - Enhanced Parallax */}
            <motion.main 
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                style={{ y: parallaxY }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Welcome Section - Steve Jobs Style */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl"
                        style={{
                            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                        }}
                        whileHover={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <motion.h2 
                                    className="text-4xl font-bold text-white mb-3 drop-shadow-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}! ✨
                                </motion.h2>
                                <motion.p 
                                    className="text-white/90 text-xl font-medium leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    Ready to boost your career with AI-powered tools? Let's get started!
                                </motion.p>
                            </div>
                            <motion.div 
                                className="w-28 h-28 bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/20 shadow-xl"
                                animate={{ 
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <svg className="w-14 h-14 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Stats Overview */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-white mb-6">Your Progress</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatsCard
                                title="Portfolios Created"
                                value="3"
                                change="+2 this month"
                                changeType="positive"
                                delay={0.1}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                }
                            />
                            <StatsCard
                                title="ATS Score"
                                value="85%"
                                change="+12% improved"
                                changeType="positive"
                                delay={0.2}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                }
                            />
                            <StatsCard
                                title="Profile Views"
                                value="1,247"
                                change="+23% this week"
                                changeType="positive"
                                delay={0.3}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                }
                            />
                            <StatsCard
                                title="Skills Added"
                                value="24"
                                change="+5 new skills"
                                changeType="positive"
                                delay={0.4}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                }
                            />
                        </div>
                    </motion.div>

                    {/* Main Features */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-white mb-6">Core Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardCard
                                title="Resume ATS Score Check"
                                description="Analyze your resume against ATS systems and get detailed feedback to improve your chances of getting noticed by recruiters."
                                gradient="from-blue-500/20 to-cyan-500/20"
                                iconBg="bg-blue-500/80"
                                delay={0.1}
                                onClick={() => navigate("/ats-checker")}
                                icon={
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                }
                            >
                                <div className="flex items-center space-x-2 text-white/70 text-xs">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Last scan: 85% match</span>
                                </div>
                            </DashboardCard>

                            <DashboardCard
                                title="AI Portfolio Generator"
                                description="Create stunning, professional portfolios using AI. Showcase your projects, skills, and achievements with beautiful templates."
                                gradient="from-purple-500/20 to-pink-500/20"
                                iconBg="bg-purple-500/80"
                                delay={0.2}
                                onClick={() => navigate("/portfolio-generator")}
                                icon={
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                }
                            >
                                <div className="flex items-center space-x-2 text-white/70 text-xs">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>3 portfolios created</span>
                                </div>
                            </DashboardCard>

                            <DashboardCard
                                title="Skill Assessment"
                                description="Take AI-powered skill assessments to identify your strengths and areas for improvement. Get personalized learning recommendations."
                                gradient="from-green-500/20 to-emerald-500/20"
                                iconBg="bg-green-500/80"
                                delay={0.3}
                                onClick={() => navigate("/skill-assessment")}
                                icon={
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                }
                            >
                                <div className="flex items-center space-x-2 text-white/70 text-xs">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Next: JavaScript Assessment</span>
                                </div>
                            </DashboardCard>
                        </div>
                    </motion.div>

                    {/* Additional Tools */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-white mb-6">Additional Tools</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <DashboardCard
                                title="Interview Prep"
                                description="Practice with AI-powered mock interviews and get real-time feedback."
                                gradient="from-orange-500/20 to-red-500/20"
                                iconBg="bg-orange-500/80"
                                delay={0.1}
                                onClick={() => navigate("/interview-prep")}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                }
                            />

                            <DashboardCard
                                title="Job Matcher"
                                description="Find jobs that match your skills and preferences using AI algorithms."
                                gradient="from-indigo-500/20 to-blue-500/20"
                                iconBg="bg-indigo-500/80"
                                delay={0.2}
                                onClick={() => navigate("/job-matcher")}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                }
                            />

                            <DashboardCard
                                title="Learning Path"
                                description="Get personalized learning recommendations based on your career goals."
                                gradient="from-teal-500/20 to-cyan-500/20"
                                iconBg="bg-teal-500/80"
                                delay={0.3}
                                onClick={() => navigate("/learning-path")}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                }
                            />

                            <DashboardCard
                                title="Career Analytics"
                                description="Track your career progress with detailed analytics and insights."
                                gradient="from-rose-500/20 to-pink-500/20"
                                iconBg="bg-rose-500/80"
                                delay={0.4}
                                onClick={() => navigate("/analytics")}
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                }
                            />
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
                        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                            <div className="space-y-4">
                                {[
                                    { action: "Completed ATS scan", time: "2 hours ago", icon: "📄", color: "text-blue-300" },
                                    { action: "Updated portfolio", time: "1 day ago", icon: "🎨", color: "text-purple-300" },
                                    { action: "Took JavaScript assessment", time: "3 days ago", icon: "💡", color: "text-green-300" },
                                    { action: "Applied to 5 jobs", time: "1 week ago", icon: "🎯", color: "text-orange-300" }
                                ].map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/8 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/10"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                                    >
                                        <span className="text-2xl">{activity.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{activity.action}</p>
                                            <p className={`text-sm ${activity.color}`}>{activity.time}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default Dashboard;
