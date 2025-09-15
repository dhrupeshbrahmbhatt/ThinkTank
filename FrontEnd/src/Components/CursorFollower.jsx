import React from 'react';
import { motion } from 'framer-motion';

const CursorFollower = ({ mousePosition }) => {
    return (
        <motion.div
            className="fixed pointer-events-none z-50 mix-blend-difference"
            animate={{
                x: mousePosition.x - 8,
                y: mousePosition.y - 8,
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        >
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
        </motion.div>
    );
};

export default CursorFollower;
