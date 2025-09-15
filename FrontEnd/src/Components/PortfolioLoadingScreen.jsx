import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioLoadingScreen = ({ isVisible, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const steps = [
        {
            title: "Fetching Data from Backend",
            description: "Retrieving your portfolio information...",
            icon: "🔄",
            duration: 1500
        },
        {
            title: "Generating Portfolio Style",
            description: "Creating your unique design theme...",
            icon: "🎨",
            duration: 2000
        },
        {
            title: "Personalizing Content",
            description: "Customizing with your personal touch...",
            icon: "✨",
            duration: 2000
        },
        {
            title: "Making it Elegant",
            description: "Adding final polish and refinements...",
            icon: "💎",
            duration: 1500
        },
        {
            title: "Portfolio Ready!",
            description: "Your beautiful portfolio is complete",
            icon: "🚀",
            duration: 1000
        }
    ];

    useEffect(() => {
        if (!isVisible) return;

        let stepTimer;
        let progressTimer;
        let startTime = Date.now();
        const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

        const startStep = (stepIndex) => {
            if (stepIndex >= steps.length) {
                setProgress(100);
                setTimeout(() => {
                    onComplete();
                }, 500);
                return;
            }

            setCurrentStep(stepIndex);
            const stepDuration = steps[stepIndex].duration;
            
            // Progress animation for current step
            let stepProgress = 0;
            const progressInterval = 50;
            const progressIncrement = (100 / stepDuration) * progressInterval;

            progressTimer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const overallProgress = Math.min((elapsed / totalDuration) * 100, 100);
                setProgress(overallProgress);

                if (overallProgress >= 100) {
                    clearInterval(progressTimer);
                }
            }, progressInterval);

            stepTimer = setTimeout(() => {
                clearInterval(progressTimer);
                startStep(stepIndex + 1);
            }, stepDuration);
        };

        startStep(0);

        return () => {
            clearTimeout(stepTimer);
            clearInterval(progressTimer);
        };
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </motion.div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Creating Your Portfolio
                        </h2>
                        <p className="text-gray-600">
                            Please wait while we craft something amazing
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Current Step */}
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <div className="text-4xl mb-4">
                            {steps[currentStep]?.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {steps[currentStep]?.title}
                        </h3>
                        <p className="text-gray-600">
                            {steps[currentStep]?.description}
                        </p>
                    </motion.div>

                    {/* Steps Indicator */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {steps.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                                animate={{
                                    scale: index === currentStep ? 1.2 : 1
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PortfolioLoadingScreen;
