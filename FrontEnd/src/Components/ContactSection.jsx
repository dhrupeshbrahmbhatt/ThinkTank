import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 px-4 bg-black/20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Let's Connect
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                        or just have a chat about technology and development.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-semibold text-purple-300 mb-6">Get In Touch</h3>
                        
                        <div className="space-y-4">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                            >
                                <span className="text-2xl">📧</span>
                                <div>
                                    <p className="text-purple-300 font-semibold">Email</p>
                                    <p className="text-gray-400">john.doe@example.com</p>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                            >
                                <span className="text-2xl">📱</span>
                                <div>
                                    <p className="text-purple-300 font-semibold">Phone</p>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                            >
                                <span className="text-2xl">📍</span>
                                <div>
                                    <p className="text-purple-300 font-semibold">Location</p>
                                    <p className="text-gray-400">San Francisco, CA</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex space-x-4 pt-6">
                            {[
                                { icon: "💼", label: "LinkedIn", href: "#" },
                                { icon: "🐙", label: "GitHub", href: "#" },
                                { icon: "🐦", label: "Twitter", href: "#" }
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-xl hover:bg-purple-500/20 transition-colors"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <form className="space-y-6">
                            <div>
                                <label className="block text-purple-300 mb-2">Name</label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-purple-300 mb-2">Email</label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="email"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-purple-300 mb-2">Message</label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.02 }}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none transition-colors text-white resize-none"
                                    placeholder="Tell me about your project..."
                                ></motion.textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold transition-all duration-200"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
