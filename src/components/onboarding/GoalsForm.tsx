import { useState } from "react";
import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface GoalsFormProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateData: (data: { goals: string[] }) => void;
  firstName: string;
  initialValue?: string[];
}

const goalOptions = [
  {
    id: "study_groups",
    label: "Join Study Groups",
    description: "Find peers to study and learn together",
    icon: "👥",
    category: "Academic"
  },
  {
    id: "networking",
    label: "Professional Networking", 
    description: "Connect with industry professionals",
    icon: "🤝",
    category: "Career"
  },
  {
    id: "events",
    label: "Campus Events",
    description: "Discover and attend university events",
    icon: "🎉",
    category: "Social"
  },
  {
    id: "research",
    label: "Research Opportunities",
    description: "Find research projects and labs",
    icon: "🔬",
    category: "Academic"
  },
  {
    id: "clubs",
    label: "Student Organizations",
    description: "Join clubs and societies",
    icon: "🏛️",
    category: "Social"
  },
  {
    id: "internships",
    label: "Internships & Jobs",
    description: "Discover career opportunities",
    icon: "💼",
    category: "Career"
  },
  {
    id: "mentorship",
    label: "Find Mentors",
    description: "Connect with experienced students",
    icon: "🎯",
    category: "Academic"
  },
  {
    id: "sports",
    label: "Sports & Recreation",
    description: "Join intramural and fitness activities",
    icon: "⚽",
    category: "Recreation"
  },
  {
    id: "volunteering",
    label: "Volunteer Work",
    description: "Community service opportunities",
    icon: "💚",
    category: "Service"
  },
  {
    id: "entrepreneurship",
    label: "Startup & Innovation",
    description: "Launch projects and startups",
    icon: "🚀",
    category: "Career"
  },
  {
    id: "cultural",
    label: "Cultural Activities",
    description: "Arts, music, and cultural events",
    icon: "🎭",
    category: "Social"
  },
  {
    id: "wellness",
    label: "Mental & Physical Wellness",
    description: "Health and wellbeing resources",
    icon: "🧘",
    category: "Wellness"
  }
];

export function GoalsForm({ onNext, onBack, onUpdateData, firstName, initialValue = [] }: GoalsFormProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoals.length > 0) {
      onUpdateData({ goals: selectedGoals });
      onNext();
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const canProceed = selectedGoals.length > 0;

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
            What are your goals, {firstName}?
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Select all that interest you - we'll personalize your experience
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Selected Goals Counter */}
          {selectedGoals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-[#2563eb] rounded-full text-sm font-medium">
                <span className="mr-2">✨</span>
                {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected
              </div>
            </motion.div>
          )}

          {/* Goals Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goalOptions.map((goal, index) => (
              <motion.button
                key={goal.id}
                type="button"
                onClick={() => handleGoalToggle(goal.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                          ${selectedGoals.includes(goal.id)
                            ? 'border-[#2563eb] bg-blue-50 shadow-[0_4px_12px_rgba(37,99,235,0.15)]' 
                            : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md'
                          }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-md border-2 transition-all duration-200
                              ${selectedGoals.includes(goal.id)
                                ? 'border-[#2563eb] bg-[#2563eb]' 
                                : 'border-slate-300'
                              }`}>
                  {selectedGoals.includes(goal.id) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                                 ${selectedGoals.includes(goal.id) 
                                   ? 'bg-[#2563eb] text-white' 
                                   : 'bg-slate-100 text-slate-600'
                                 }`}>
                    {goal.category}
                  </span>
                </div>

                {/* Goal Content */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{goal.icon}</div>
                    <h3 className={`text-base font-semibold transition-colors duration-200
                                  ${selectedGoals.includes(goal.id) ? 'text-[#2563eb]' : 'text-slate-900'}`}>
                      {goal.label}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {goal.description}
                  </p>
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
                transition={{ duration: 0.6, delay: 1.0 }}
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
              transition={{ duration: 0.6, delay: 1.0 }}
              whileTap={{ scale: 0.98 }}
              className={`${onBack ? 'flex-1' : 'w-full'} py-4 px-8 rounded-xl text-lg font-medium
                         transition-all duration-300 min-h-[52px]
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                         ${canProceed 
                           ? 'bg-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]' 
                           : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                         }`}
            >
              {canProceed ? `Continue with ${selectedGoals.length} goal${selectedGoals.length !== 1 ? 's' : ''}` : "Select at least one goal"}
            </motion.button>
          </div>

          {/* Progress Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500">
              Step 5 of 7 • We'll customize your feed based on your interests
            </p>
          </motion.div>
        </motion.form>

        {/* Educational Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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
                <span className="font-medium">Personalized experience:</span> Your goals help us show relevant opportunities, connect you with like-minded students, and suggest activities that match your interests. You can always update these later!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
