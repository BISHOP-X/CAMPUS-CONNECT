import { useState } from "react";
import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface LevelFormProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateData: (data: { level: string }) => void;
  firstName: string;
  initialValue?: string;
}

const academicLevels = [
  {
    id: "freshman",
    label: "Freshman",
    description: "1st year undergraduate",
    icon: "🌱"
  },
  {
    id: "sophomore", 
    label: "Sophomore",
    description: "2nd year undergraduate",
    icon: "🌿"
  },
  {
    id: "junior",
    label: "Junior", 
    description: "3rd year undergraduate",
    icon: "🌳"
  },
  {
    id: "senior",
    label: "Senior",
    description: "4th year undergraduate", 
    icon: "🎓"
  },
  {
    id: "graduate",
    label: "Graduate Student",
    description: "Master's or PhD program",
    icon: "🔬"
  },
  {
    id: "postgrad",
    label: "Post-Graduate",
    description: "Post-doc or research",
    icon: "👨‍🎓"
  },
  {
    id: "other",
    label: "Other",
    description: "Non-traditional student",
    icon: "📚"
  }
];

export function LevelForm({ onNext, onBack, onUpdateData, firstName, initialValue = "" }: LevelFormProps) {
  const [selectedLevel, setSelectedLevel] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLevel) {
      onUpdateData({ level: selectedLevel });
      onNext();
    }
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const canProceed = selectedLevel.length > 0;

  return (
    <OnboardingContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.21, 1, 0.81, 1] }}
        className="space-y-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/CAMPUSCONNECT.png" 
            alt="Campus Connect Logo"
            className="h-12 w-auto"
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900">
            What's your academic level, {firstName}?
          </h1>
          <p className="text-lg text-slate-600 font-light">
            This helps us connect you with peers at a similar stage
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Level Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {academicLevels.map((level, index) => (
              <motion.button
                key={level.id}
                type="button"
                onClick={() => handleLevelSelect(level.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                          ${selectedLevel === level.id 
                            ? 'border-[#2563eb] bg-blue-50 shadow-[0_4px_12px_rgba(37,99,235,0.15)]' 
                            : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md'
                          }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-200
                              ${selectedLevel === level.id 
                                ? 'border-[#2563eb] bg-[#2563eb]' 
                                : 'border-slate-300'
                              }`}>
                  {selectedLevel === level.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full rounded-full bg-white flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
                    </motion.div>
                  )}
                </div>

                {/* Level Content */}
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{level.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors duration-200
                                  ${selectedLevel === level.id ? 'text-[#2563eb]' : 'text-slate-900'}`}>
                      {level.label}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {level.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex gap-4">
            {/* Back Button */}
            {onBack && (
              <motion.button
                type="button"
                onClick={onBack}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 px-8 rounded-xl text-lg font-medium
                          bg-slate-100 text-slate-700 hover:bg-slate-200
                          transition-all duration-300 min-h-[52px]
                          focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
                          flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </motion.button>
            )}

            {/* Continue Button */}
            <motion.button
              type="submit"
              disabled={!canProceed}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileTap={{ scale: 0.98 }}
              className={`${onBack ? 'flex-1' : 'w-full'} py-4 px-8 rounded-xl text-lg font-medium
                         transition-all duration-300 min-h-[52px]
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                         ${canProceed 
                           ? 'bg-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]' 
                           : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                         }`}
            >
              {canProceed ? "Continue" : "Select your academic level"}
            </motion.button>
          </div>

          {/* Progress Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500">
              Step 4 of 7 • We'll match you with students at similar academic stages
            </p>
          </motion.div>
        </motion.form>

        {/* Educational Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[#2563eb] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-700">
                <span className="font-medium">Level-based connections:</span> Find study partners facing similar academic challenges, join groups for your year, and get advice from students who've been in your shoes.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
