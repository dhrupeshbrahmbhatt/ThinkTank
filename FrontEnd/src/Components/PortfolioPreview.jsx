import React from 'react';
import { motion } from 'framer-motion';

const PortfolioPreview = ({ portfolioData }) => {
    const { name, githubLink, linkedinLink, position } = portfolioData;
    
    const getPositionDetails = (pos) => {
        const positions = {
            'student': { title: 'Student', color: 'from-blue-400 to-blue-600', icon: '🎓' },
            'fresher': { title: 'Fresh Graduate', color: 'from-green-400 to-green-600', icon: '🌱' },
            'junior': { title: 'Junior Developer', color: 'from-purple-400 to-purple-600', icon: '💻' },
            'mid': { title: 'Mid-level Developer', color: 'from-orange-400 to-orange-600', icon: '🚀' },
            'senior': { title: 'Senior Developer', color: 'from-red-400 to-red-600', icon: '⭐' },
            'lead': { title: 'Tech Lead', color: 'from-yellow-400 to-yellow-600', icon: '👑' }
        };
        return positions[pos] || positions.student;
    };

    const positionInfo = getPositionDetails(position);

    return (
        <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className={`w-24 h-24 bg-gradient-to-br ${positionInfo.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                    <span className="text-4xl">{positionInfo.icon}</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
                <p className="text-xl text-blue-300 font-semibold">{positionInfo.title}</p>
            </motion.div>

            {/* Social Links */}
            <motion.div
                className="flex justify-center space-x-6 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* GitHub Link */}
                <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-gray-800/80 transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                </motion.a>

                {/* LinkedIn Link */}
                <motion.a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-blue-700/80 transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                </motion.a>
            </motion.div>

            {/* Portfolio Sections */}
            <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                {/* About Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <span className="mr-2">👋</span>
                        About Me
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                        {position === 'student' && `I'm a passionate student exploring the world of technology and software development. Always eager to learn new skills and work on exciting projects.`}
                        {position === 'fresher' && `Recent graduate with a strong foundation in software development. Excited to start my professional journey and contribute to innovative projects.`}
                        {position === 'junior' && `Junior developer with 1-2 years of experience building web applications. Passionate about clean code and continuous learning.`}
                        {position === 'mid' && `Experienced developer with 3-5 years in the industry. Skilled in full-stack development and team collaboration.`}
                        {position === 'senior' && `Senior developer with 5+ years of experience leading projects and mentoring teams. Expert in scalable architecture and best practices.`}
                        {position === 'lead' && `Technical leader with extensive experience in software architecture, team management, and strategic technology decisions.`}
                    </p>
                </div>

                {/* Skills Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">🛠️</span>
                        Skills & Technologies
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'HTML/CSS'].map((skill, index) => (
                            <motion.div
                                key={skill}
                                className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-center text-white/90 border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                            >
                                {skill}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Projects Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">🚀</span>
                        Featured Projects
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2">Portfolio Website</h4>
                            <p className="text-white/70 text-sm mb-3">
                                A responsive portfolio website built with React and modern web technologies.
                            </p>
                            <div className="flex space-x-2">
                                <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs">React</span>
                                <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs">CSS3</span>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2">Web Application</h4>
                            <p className="text-white/70 text-sm mb-3">
                                Full-stack web application with user authentication and real-time features.
                            </p>
                            <div className="flex space-x-2">
                                <span className="bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded text-xs">JavaScript</span>
                                <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs">Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center">
                        <span className="mr-2">📧</span>
                        Let's Connect
                    </h3>
                    <p className="text-white/80 mb-4">
                        Interested in collaborating or have a project in mind? Let's talk!
                    </p>
                    <motion.button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioPreview;
