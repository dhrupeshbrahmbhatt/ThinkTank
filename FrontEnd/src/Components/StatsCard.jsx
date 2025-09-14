import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ 
    title, 
    value, 
    icon, 
    change = null, 
    changeType = "positive",
    delay = 0 
}) => {
    return (
        <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transition: { duration: 0.3 }
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/70 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{value}</p>
                    {change && (
                        <div className={`flex items-center mt-2 text-sm ${
                            changeType === 'positive' ? 'text-green-300' : 'text-red-300'
                        }`}>
                            <svg className={`w-4 h-4 mr-1 ${changeType === 'positive' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                            {change}
                        </div>
                    )}
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
