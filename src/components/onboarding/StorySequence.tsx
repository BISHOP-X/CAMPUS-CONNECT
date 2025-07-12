import { motion } from "framer-motion";

interface StorySequenceProps {
  onComplete: () => void;
}

export function StorySequence({ onComplete }: StorySequenceProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Clean, professional background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
        
        {/* Minimal professional elements */}
        <motion.div
          className="absolute top-24 left-20 w-px h-20 bg-gradient-to-b from-blue-200 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-24 w-12 h-px bg-gradient-to-r from-blue-200 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
        />
        
        {/* Subtle dot accent */}
        <motion.div
          className="absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full bg-blue-300/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="w-full max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white rounded-3xl p-12 sm:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60">
          {/* Professional typography */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 1, 0.81, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-[1.1] mb-12"
          >
            Do you want to be able to{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="font-medium text-blue-600 relative"
            >
              connect
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-blue-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              />
            </motion.span>
            ?
          </motion.h1>

          {/* Professional interaction hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="text-sm text-slate-500 font-medium tracking-wide"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              />
              Continue
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Invisible interaction area */}
      <motion.div
        className="absolute inset-0 cursor-pointer"
        onClick={onComplete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileTap={{ scale: 0.995 }} // Subtle feedback
      />
    </div>
  );
}
