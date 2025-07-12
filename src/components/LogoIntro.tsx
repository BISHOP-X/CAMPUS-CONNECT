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
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the logo image to prevent glitches
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = LOGO_URL;
  }, []);
  
  useEffect(() => {
    if (phase === "logo" && imageLoaded) {
      // Logo auto-progression after 3.5 seconds, but only after image loads
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
  }, [phase, imageLoaded]);

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
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.8 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            <motion.img 
              src={LOGO_URL}
              alt="Campus Connect" 
              className="max-w-sm w-full h-auto logo-image"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                scale: imageLoaded ? 1 : 0.9, 
                y: imageLoaded ? 0 : 20 
              }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ 
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay: imageLoaded ? 0.2 : 0
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                perspective: 1000
              }}
            />
            {imageLoaded && (
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
            )}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3, duration: 1.0 }}
              className="flex flex-col items-center space-y-6 text-center max-w-lg"
            >
              <div className="text-8xl mb-4">👋</div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome!</h1>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                Ready to connect with brilliant minds from universities worldwide?
              </p>
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3, duration: 1.0 }}
              className="flex flex-col items-center space-y-6 text-center max-w-lg"
            >
              <div className="text-8xl mb-4">🌍</div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Let's Get You Connected</h1>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                Join thousands of students collaborating across continents and disciplines
              </p>
            </motion.div>

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
