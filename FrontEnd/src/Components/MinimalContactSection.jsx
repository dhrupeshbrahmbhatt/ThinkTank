import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio2 } from '../context/Portfolio2Context';
import EditableText from './EditableText';

const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { portfolioData, isEditMode, updateContact, updateSocial } = usePortfolio2();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <section ref={ref} id="contact" className="py-32 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-500 text-sm font-medium tracking-wide uppercase">
                        <EditableText
                            value={portfolioData.contact.subtitle}
                            onChange={(value) => updateContact('subtitle', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Contact subtitle"
                        />
                    </span>
                    <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mt-4 mb-6">
                        <EditableText
                            value={portfolioData.contact.title}
                            onChange={(value) => updateContact('title', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Contact title"
                        />
                    </h2>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        <EditableText
                            value={portfolioData.contact.description}
                            onChange={(value) => updateContact('description', value)}
                            isEditMode={isEditMode}
                            className="inline-block"
                            placeholder="Contact description"
                            multiline={true}
                        />
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-12"
                >
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-medium text-gray-900 mb-6">
                                Contact Information
                            </h3>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-blue-500 text-lg">📧</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Email</p>
                                <p className="text-gray-600">
                                    <EditableText
                                        value={portfolioData.contact.email}
                                        onChange={(value) => updateContact('email', value)}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="your.email@example.com"
                                    />
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-blue-500 text-lg">📱</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Phone</p>
                                <p className="text-gray-600">
                                    <EditableText
                                        value={portfolioData.contact.phone}
                                        onChange={(value) => updateContact('phone', value)}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-blue-500 text-lg">📍</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Location</p>
                                <p className="text-gray-600">
                                    <EditableText
                                        value={portfolioData.contact.location}
                                        onChange={(value) => updateContact('location', value)}
                                        isEditMode={isEditMode}
                                        className="inline-block"
                                        placeholder="Your City, Country"
                                    />
                                </p>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="pt-6">
                            <p className="text-gray-600 mb-4">Find me on</p>
                            <div className="flex space-x-4">
                                {portfolioData.contact.social.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={isEditMode ? "#" : social.href}
                                        whileHover={{ 
                                            scale: 1.1, 
                                            y: -2,
                                            backgroundColor: "rgb(239 246 255)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-lg hover:border-blue-200 transition-colors duration-200"
                                        title={isEditMode ? `Edit ${social.name}` : social.name}
                                    >
                                        {isEditMode ? (
                                            <EditableText
                                                value={social.href}
                                                onChange={(value) => updateSocial(index, 'href', value)}
                                                isEditMode={isEditMode}
                                                className="text-xs w-8 text-center"
                                                placeholder="URL"
                                            />
                                        ) : (
                                            social.icon
                                        )}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants}>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <motion.input
                                    whileFocus={{ 
                                        scale: 1.01,
                                        borderColor: "rgb(59 130 246)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    type="text"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Your name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <motion.input
                                    whileFocus={{ 
                                        scale: 1.01,
                                        borderColor: "rgb(59 130 246)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    type="email"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Subject
                                </label>
                                <motion.input
                                    whileFocus={{ 
                                        scale: 1.01,
                                        borderColor: "rgb(59 130 246)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    type="text"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    placeholder="Project inquiry"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <motion.textarea
                                    whileFocus={{ 
                                        scale: 1.01,
                                        borderColor: "rgb(59 130 246)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                                    placeholder="Tell me about your project..."
                                ></motion.textarea>
                            </div>
                            
                            <motion.button
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-300"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
