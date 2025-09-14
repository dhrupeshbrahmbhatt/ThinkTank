import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({ 
    title, 
    description, 
    icon, 
    onClick, 
    gradient = "from-blue-500/20 to-purple-500/20",
    iconBg = "bg-blue-500/80",
    delay = 0,
    children 
}) => {
    return (
        <motion.div
            className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl cursor-pointer group hover:bg-white/15 transition-all duration-300`}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={onClick}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 ${iconBg} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {title}
                </h3>
                
                <p className="text-white/80 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300">
                    {description}
                </p>

                {/* Additional content */}
                {children && (
                    <div className="mt-4">
                        {children}
                    </div>
                )}

                {/* Action indicator */}
                <div className="flex items-center text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                    <span>Click to explore</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardCard;
