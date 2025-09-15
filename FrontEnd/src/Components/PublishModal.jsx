import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PublishModal = ({ isOpen, onClose, onPublish }) => {
    const [freeUrl, setFreeUrl] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [enableSSL, setEnableSSL] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const [showCustomDomain, setShowCustomDomain] = useState(false);

    // Generate random free URL on modal open
    useEffect(() => {
        if (isOpen && !freeUrl) {
            const adjectives = ['amazing', 'creative', 'modern', 'elegant', 'stunning', 'brilliant', 'awesome', 'fantastic'];
            const nouns = ['portfolio', 'showcase', 'profile', 'site', 'space', 'hub', 'studio'];
            const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomNum = Math.floor(Math.random() * 999) + 1;
            setFreeUrl(`${randomAdj}-${randomNoun}-${randomNum}`);
        }
    }, [isOpen, freeUrl]);

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            await onPublish({
                freeUrl,
                customDomain,
                enableSSL
            });
            onClose();
        } catch (error) {
            console.error('Publishing failed:', error);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleClose = () => {
        if (!isPublishing) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Solid backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gray-900"
                    onClick={handleClose}
                />
                
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Publish Your Portfolio
                        </h2>
                        <p className="text-gray-600">
                            Share your amazing work with the world
                        </p>
                        <button
                            onClick={handleClose}
                            disabled={isPublishing}
                            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 disabled:opacity-50"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-6 mt-[30rem]">
                        {/* Free URL Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Your Free Portfolio URL</h3>
                                    <p className="text-sm text-gray-600">Ready to publish instantly</p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={freeUrl}
                                            onChange={(e) => setFreeUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))}
                                            placeholder="your-name-portfolio"
                                            className="w-full px-3 py-2 border-0 bg-transparent text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                            disabled={isPublishing}
                                        />
                                    </div>
                                    <span className="text-blue-600 font-medium">.thinktank.dev</span>
                                    <button
                                        onClick={() => {
                                            const adjectives = ['amazing', 'creative', 'modern', 'elegant', 'stunning', 'brilliant', 'awesome', 'fantastic'];
                                            const nouns = ['portfolio', 'showcase', 'profile', 'site', 'space', 'hub', 'studio'];
                                            const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
                                            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
                                            const randomNum = Math.floor(Math.random() * 999) + 1;
                                            setFreeUrl(`${randomAdj}-${randomNoun}-${randomNum}`);
                                        }}
                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                        title="Generate random URL"
                                    >
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-600 font-medium">Available</span>
                                    <span className="text-gray-500">• Free SSL included</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-800 font-medium">
                                    🚀 Your portfolio will be live at: 
                                    <span className="font-mono ml-1">{freeUrl}.thinktank.dev</span>
                                </p>
                            </div>
                        </div>

                        {/* Custom Domain Section */}
                        <div className="border-t border-gray-200 pt-6">
                            <button
                                onClick={() => setShowCustomDomain(!showCustomDomain)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900">Custom Domain</h3>
                                        <p className="text-sm text-gray-600">Use your own domain (Pro feature)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">PRO</span>
                                    <svg 
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showCustomDomain ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {showCustomDomain && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Domain
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={customDomain}
                                                    onChange={(e) => setCustomDomain(e.target.value)}
                                                    placeholder="www.yourdomain.com"
                                                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 bg-white"
                                                    disabled={isPublishing}
                                                />
                                                <div className="absolute right-3 top-3">
                                                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SSL Toggle */}
                                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-purple-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">SSL Certificate</h4>
                                                    <p className="text-sm text-gray-600">Secure your site with HTTPS</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setEnableSSL(!enableSSL)}
                                                disabled={isPublishing}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 ${
                                                    enableSSL ? 'bg-purple-500' : 'bg-gray-300'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                                        enableSSL ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="p-3 bg-purple-100 rounded-lg border border-purple-200">
                                            <p className="text-sm text-purple-800">
                                                <span className="font-medium">💎 Pro Feature:</span> Custom domains require a Pro subscription starting at $9/month
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={handleClose}
                            disabled={isPublishing}
                            className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing || !freeUrl.trim()}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            {isPublishing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing Your Portfolio...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Publish Portfolio
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PublishModal;
