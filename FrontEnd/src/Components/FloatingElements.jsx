import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        y: [null, -20, 20, -20],
                        x: [null, Math.random() * 50 - 25, Math.random() * 50 - 25],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Geometric Shapes */}
            <motion.div
                className="absolute top-20 right-20 w-20 h-20 border border-purple-400/30 rotate-45"
                animate={{
                    rotate: [45, 225, 45],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-20 left-20 w-16 h-16 border border-pink-400/30 rounded-full"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-sm"
                animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default FloatingElements;
