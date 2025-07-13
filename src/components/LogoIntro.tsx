import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./logo-styles.css";
import { LOGO_URL } from "../lib/images";

interface LogoIntroProps {
  onComplete: () => void;
}

type Phase = "logo" | "welcome" | "setup" | "complete";

export function LogoIntro({ onComplete }: LogoIntroProps) {
  const [phase, setPhase] = useState<Phase>("logo");
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    if (phase === "logo") {
      // Simple auto-progression after 3.5 seconds
      const timer = setTimeout(() => {
        setPhase("welcome");
      }, 3500);
      return () => clearTimeout(timer);
    }
    
    if (phase === "welcome" || phase === "setup") {
      // Reset button state first, then show button after content settles
      setShowButton(false);
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 1700);
      return () => clearTimeout(buttonTimer);
    }
  }, [phase]);

  const handleNext = () => {
    setShowButton(false);
    
    if (phase === "welcome") {
      setTimeout(() => setPhase("setup"), 1200); // Increased to match exit animation
    } else if (phase === "setup") {
      setTimeout(() => {
        setPhase("complete");
        // Delay onComplete to allow exit animation to finish
        setTimeout(onComplete, 1200);
      }, 1200); // Increased to match exit animation
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      <AnimatePresence mode="wait">
        {/* Logo Phase */}
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* Simple, direct image loading */}
            <motion.img 
              src={LOGO_URL}
              alt="Campus Connect" 
              className="max-w-sm w-full h-auto logo-image"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ 
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
            />
            <motion.p 
              className="text-slate-600 text-sm tracking-wide font-light"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              Connecting Academic Excellence
            </motion.p>
          </motion.div>
        )}

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="min-h-screen flex items-center justify-center bg-white p-4"
          >
            <div className="w-full max-w-md mx-auto">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-center mb-8"
              >
                <img 
                  src={LOGO_URL}
                  alt="Campus Connect Logo"
                  className="h-12 w-auto logo-image"
                />
              </motion.div>

              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ delay: 0.3, duration: 1.0 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 backdrop-blur-sm"
                style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                {/* Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border border-blue-100">
                    <span className="text-4xl">👋</span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-center space-y-4"
                >
                  <h1 className="text-3xl font-light text-slate-900">Welcome!</h1>
                  <p className="text-lg text-slate-600 font-light leading-relaxed">
                    Ready to connect with brilliant minds from universities worldwide?
                  </p>
                </motion.div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="flex justify-center mt-6 space-x-2"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Continue Button */}
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full mt-6 py-4 px-8 bg-[#2563eb] text-white rounded-xl font-medium text-lg
                         hover:bg-[#1d4ed8] hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Setup Phase */}
        {phase === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="min-h-screen flex items-center justify-center bg-white p-4"
          >
            <div className="w-full max-w-md mx-auto">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-center mb-8"
              >
                <img 
                  src={LOGO_URL}
                  alt="Campus Connect Logo"
                  className="h-12 w-auto logo-image"
                />
              </motion.div>

              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ delay: 0.3, duration: 1.0 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 backdrop-blur-sm"
                style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                {/* Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center border border-green-100">
                    <span className="text-4xl">🌍</span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-center space-y-4"
                >
                  <h1 className="text-3xl font-light text-slate-900">Let's Get You Connected</h1>
                  <p className="text-lg text-slate-600 font-light leading-relaxed">
                    Join thousands of students collaborating across continents and disciplines
                  </p>
                </motion.div>

                {/* Features preview */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="mt-6 space-y-3"
                >
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Find study partners worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Share knowledge across universities</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Collaborate on global projects</span>
                  </div>
                </motion.div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="flex justify-center mt-6 space-x-2"
                >
                  <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Get Started Button */}
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full mt-6 py-4 px-8 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-xl font-medium text-lg
                         hover:from-[#1d4ed8] hover:to-[#1e40af] hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
