import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { useState, useEffect } from "react";

export function PWAInstallPrompt() {
  const { isInstallable, installApp } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Debug logging
  console.log('PWA Install Prompt Component State:', {
    isInstallable,
    isDismissed,
    showPrompt
  });

  // Show prompt after 3 seconds delay
  useEffect(() => {
    if (isInstallable && !isDismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isDismissed]);

  if (!isInstallable || isDismissed || !showPrompt) return null;

  const handleInstall = async () => {
    console.log('🎯 PWA Install Button Clicked');
    const success = await installApp();
    if (!success) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6">
            <div className="flex items-start space-x-4">
              {/* App Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-white">CC</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Install Campus Connect
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get the full app experience with offline access and quick launch from your home screen.
                </p>
                
                {/* Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    onClick={handleInstall}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white px-4 py-2.5 rounded-xl text-sm font-medium
                               shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]
                               transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                  >
                    📱 Install
                  </motion.button>
                  <motion.button
                    onClick={handleDismiss}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 
                               transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                  >
                    Later
                  </motion.button>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
