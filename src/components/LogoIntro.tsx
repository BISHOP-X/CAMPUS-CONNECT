import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LogoIntroProps {
  onComplete: () => void;
}

type Phase = "logo" | "welcome" | "setup" | "complete";

export function LogoIntro({ onComplete }: LogoIntroProps) {
  const [phase, setPhase] = useState<Phase>("logo");
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    if (phase === "logo") {
      // Logo auto-progression after 3.5 seconds
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
      }, 1700); // 1.2s fade + 0.5s delay
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 1.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <img 
              src="/CAMPUSCONNECT.png" 
              alt="Campus Connect" 
              className="max-w-sm w-full h-auto"
            />
                <motion.p 
            className="text-slate-600 text-sm tracking-wide font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.8, duration: 1.2 }}
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
            className="flex flex-col items-center justify-center h-screen relative"
          >
            <motion.img 
              src="/WELCOME.png"
              alt="Welcome"
              className="max-w-lg w-full h-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3, duration: 1.0 }}
            />

            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-12 h-12 bg-blue-500 text-white rounded-full font-medium
                       hover:bg-blue-600 hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl flex items-center justify-center
                       absolute bottom-20"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
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
            className="flex flex-col items-center justify-center h-screen relative"
          >
            <motion.img 
              src="/CONNECT.png"
              alt="Let's get you connected"
              className="max-w-lg w-full h-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3, duration: 1.0 }}
            />

            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium tracking-wide
                       hover:bg-blue-600 hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl absolute bottom-20"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
