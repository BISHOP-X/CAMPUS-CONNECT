import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";
import { useState } from "react";
import { LOGO_URL } from "../../lib/images";

interface NameFormProps {
  onNext: () => void;
  onUpdateData: (data: { firstName: string; lastName: string }) => void;
  initialFirstName?: string;
  initialLastName?: string;
}

export function NameForm({ onNext, onUpdateData, initialFirstName = "", initialLastName = "" }: NameFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      onUpdateData({ 
        firstName: firstName.trim(), 
        lastName: lastName.trim() 
      });
      onNext();
    }
  };

  const canProceed = firstName.trim().length > 0 && lastName.trim().length > 0;

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
            src={LOGO_URL} 
            alt="Campus Connect Logo"
            className="h-12 w-auto logo-image"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900">
            What should we call you?
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Let's start with your name
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
          {/* Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0">
            {/* First Name */}
            <div className="space-y-3">
              <label 
                htmlFor="firstName" 
                className="block text-sm font-medium text-slate-700"
              >
                First Name
              </label>
              <motion.input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl
                         focus:border-[#2563eb] focus:ring-0 focus:outline-none
                         transition-all duration-200 placeholder:text-slate-400
                         bg-white/80 backdrop-blur-sm"
                autoComplete="given-name"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-3">
              <label 
                htmlFor="lastName" 
                className="block text-sm font-medium text-slate-700"
              >
                Last Name
              </label>
              <motion.input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl
                         focus:border-[#2563eb] focus:ring-0 focus:outline-none
                         transition-all duration-200 placeholder:text-slate-400
                         bg-white/80 backdrop-blur-sm"
                autoComplete="family-name"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Continue Button */}
          <motion.button
            type="submit"
            disabled={!canProceed}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-8 rounded-xl text-lg font-medium
                       transition-all duration-300 min-h-[52px]
                       focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                       ${canProceed 
                         ? 'bg-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]' 
                         : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                       }`}
          >
            {canProceed ? "Continue" : "Enter your first and last name"}
          </motion.button>

          {/* Progress Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500">
              Step 1 of 7 • This helps us personalize your experience
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </OnboardingContainer>
  );
}
