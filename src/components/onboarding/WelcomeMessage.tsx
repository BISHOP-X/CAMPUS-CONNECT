import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface WelcomeMessageProps {
  onComplete: () => void;
  firstName: string;
}

export function WelcomeMessage({ onComplete, firstName }: WelcomeMessageProps) {
  return (
    <OnboardingContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.21, 1, 0.81, 1] }}
        className="space-y-12"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-24 h-24 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,99,235,0.3)]"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            
            {/* Celebration particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 60]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.8 + (i * 0.1),
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#2563eb] rounded-full"
                style={{ transformOrigin: '0 0' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-light text-slate-900">
              Welcome to Campus Connect, {firstName}!
            </h1>
            <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
              You're all set to explore a world of academic connections and opportunities
            </p>
          </div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center space-x-8 py-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2563eb]">2,847</div>
              <div className="text-sm text-slate-500">Students Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2563eb]">127</div>
              <div className="text-sm text-slate-500">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#2563eb]">23</div>
              <div className="text-sm text-slate-500">Countries</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Personal Message from Wisdom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <div className="space-y-6">
            {/* Developer Avatar */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">W</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">A Note from Wisdom</h3>
                <p className="text-sm text-slate-500">Founder & Developer</p>
              </div>
            </div>

            {/* Personal Message */}
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p className="text-base">
                I built Campus Connect because I've always dreamed of connecting with students from any university, any department, anywhere in the world.
              </p>
              <p className="text-base">
                I thought - how amazing would it be to collaborate with a software engineering major at UC Berkeley, or team up with a mechanical engineer from Harvard on a project? No boundaries, no limits - just brilliant minds working together.
              </p>
              <p className="text-base">
                Imagine sharing study materials across universities, joining multi-university study groups with students from Oxford and MIT, or searching for the perfect collaboration partner by their exact school, discipline, and interests. Picture finding that ideal design student from RISD for your startup, or that brilliant data scientist from Stanford for your research project.
              </p>
              <p className="text-base">
                Maybe it's a little naive, but I believe the best ideas happen when diverse perspectives collide across continents. That's why Campus Connect exists - to make those global academic connections possible.
              </p>
              <p className="text-base">
                Thanks for being part of this journey. I hope this platform opens doors you never knew existed and helps you build the collaborations that will shape your future.
              </p>
              <div className="pt-2">
                <p className="text-base font-medium text-[#2563eb]">
                  Enjoy exploring,<br />
                  Wisdom ✨
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="space-y-6"
        >
          {/* Primary Action */}
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-xl text-lg font-medium
                       shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]
                       transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
          >
            Start Exploring Campus Connect
          </motion.button>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium
                         hover:bg-slate-50 hover:border-slate-300 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
            >
              🎯 Set Up My Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium
                         hover:bg-slate-50 hover:border-slate-300 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
            >
              🌍 Explore Universities
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-slate-500">
            🎉 You're student #{Math.floor(Math.random() * 100) + 2800} to join Campus Connect
          </p>
          <p className="text-xs text-slate-400">
            Global connections unlock when we reach 10,000 students worldwide
          </p>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
