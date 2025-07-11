import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OnboardingContainerProps {
  children: ReactNode;
  className?: string;
}

// Professional, minimal animated background
const AnimatedBackground = () => {
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
      
      {/* Subtle geometric elements - professional and minimal */}
      <motion.div
        className="absolute top-20 left-16 w-1 h-32 bg-gradient-to-b from-blue-100 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-blue-100 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />
      
      <motion.div
        className="absolute bottom-32 left-12 w-2 h-2 rounded-full bg-blue-200/60"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      />
      
      <motion.div
        className="absolute bottom-20 right-16 w-16 h-16 border border-slate-200/60 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
};

export function OnboardingContainer({ children, className = "" }: OnboardingContainerProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  
  return (
    <div className="h-screen w-screen fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-auto">
      <AnimatedBackground />
      
      <motion.div
        className={`w-full max-w-lg mx-auto text-center relative z-10 ${className}`}
        initial={{ 
          opacity: 0,
          y: prefersReducedMotion ? 0 : 24 
        }}
        animate={{ 
          opacity: 1,
          y: 0 
        }}
        exit={{ 
          opacity: 0,
          y: prefersReducedMotion ? 0 : -24 
        }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.6,
          ease: [0.21, 1, 0.81, 1] // Professional easing curve
        }}
      >
        {/* Clean, professional content container with viewport constraints */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 max-h-[calc(100vh-3rem)] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
