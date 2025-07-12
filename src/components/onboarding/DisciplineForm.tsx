import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface DisciplineFormProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateData: (data: { major: string; secondMajor?: string }) => void;
  firstName: string;
  initialValue?: { major?: string; secondMajor?: string };
}

interface Major {
  code: string;
  name: string;
  category: string;
}

export function DisciplineForm({ onNext, onBack, onUpdateData, firstName, initialValue }: DisciplineFormProps) {
  const [major, setMajor] = useState(initialValue?.major || "");
  const [secondMajor, setSecondMajor] = useState(initialValue?.secondMajor || "");
  const [hasDoubleMajor, setHasDoubleMajor] = useState(!!initialValue?.secondMajor);
  const [showMajorSuggestions, setShowMajorSuggestions] = useState(false);
  const [showSecondMajorSuggestions, setShowSecondMajorSuggestions] = useState(false);
  const [allMajors, setAllMajors] = useState<Major[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load majors from FiveThirtyEight dataset
  useEffect(() => {
    const loadMajors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/fivethirtyeight/data/master/college-majors/majors-list.csv'
        );
        const csvText = await response.text();
        
        // Parse CSV (skip header row)
        const lines = csvText.trim().split('\n').slice(1);
        const majors: Major[] = lines.map(line => {
          const [code, name, category] = line.split(',');
          return {
            code: code.trim(),
            name: name.trim(),
            category: category.trim()
          };
        }).filter(major => major.name && !major.name.includes('MISCELLANEOUS')); // Filter out miscellaneous entries
        
        // Add popular modern majors that might not be in the dataset
        const additionalMajors: Major[] = [
          { code: "2103", name: "SOFTWARE ENGINEERING", category: "Computers & Mathematics" },
          { code: "2104", name: "DATA SCIENCE", category: "Computers & Mathematics" },
          { code: "2108", name: "CYBERSECURITY", category: "Computers & Mathematics" },
          { code: "2109", name: "ARTIFICIAL INTELLIGENCE", category: "Computers & Mathematics" },
          { code: "6220", name: "DIGITAL MARKETING", category: "Business" },
          { code: "6221", name: "ENTREPRENEURSHIP", category: "Business" },
          { code: "6222", name: "BUSINESS ANALYTICS", category: "Business" },
          { code: "1905", name: "SOCIAL MEDIA MANAGEMENT", category: "Communications & Journalism" },
          { code: "1906", name: "DIGITAL COMMUNICATIONS", category: "Communications & Journalism" },
          { code: "4008", name: "ENVIRONMENTAL STUDIES", category: "Interdisciplinary" },
          { code: "4009", name: "SUSTAINABILITY", category: "Interdisciplinary" },
          { code: "6008", name: "GAME DESIGN", category: "Arts" },
          { code: "6009", name: "UX/UI DESIGN", category: "Arts" },
          { code: "6010", name: "DIGITAL MEDIA", category: "Arts" },
          { code: "5508", name: "DATA ANALYTICS", category: "Social Science" },
          { code: "6111", name: "SPORTS MEDICINE", category: "Health" },
          { code: "6112", name: "PHYSICAL THERAPY", category: "Health" },
          { code: "2420", name: "RENEWABLE ENERGY ENGINEERING", category: "Engineering" },
          { code: "2421", name: "ROBOTICS ENGINEERING", category: "Engineering" },
          { code: "5509", name: "FORENSIC SCIENCE", category: "Physical Sciences" }
        ];
        
        // Combine original majors with additional ones
        const combinedMajors = [...majors, ...additionalMajors];
        setAllMajors(combinedMajors);
      } catch (error) {
        console.log('Failed to load majors, using fallback data');
        // Fallback to basic list if API fails
        setAllMajors([
          { code: "2102", name: "COMPUTER SCIENCE", category: "Computers & Mathematics" },
          { code: "2103", name: "SOFTWARE ENGINEERING", category: "Computers & Mathematics" },
          { code: "2104", name: "DATA SCIENCE", category: "Computers & Mathematics" },
          { code: "2108", name: "CYBERSECURITY", category: "Computers & Mathematics" },
          { code: "6200", name: "GENERAL BUSINESS", category: "Business" },
          { code: "6221", name: "ENTREPRENEURSHIP", category: "Business" },
          { code: "5200", name: "PSYCHOLOGY", category: "Psychology & Social Work" },
          { code: "2400", name: "GENERAL ENGINEERING", category: "Engineering" },
          { code: "2421", name: "ROBOTICS ENGINEERING", category: "Engineering" },
          { code: "3600", name: "BIOLOGY", category: "Biology & Life Science" },
          { code: "3301", name: "ENGLISH LANGUAGE AND LITERATURE", category: "Humanities & Liberal Arts" },
          { code: "3700", name: "MATHEMATICS", category: "Computers & Mathematics" },
          { code: "5501", name: "ECONOMICS", category: "Social Science" },
          { code: "5506", name: "POLITICAL SCIENCE AND GOVERNMENT", category: "Social Science" },
          { code: "1901", name: "COMMUNICATIONS", category: "Communications & Journalism" },
          { code: "6008", name: "GAME DESIGN", category: "Arts" },
          { code: "6009", name: "UX/UI DESIGN", category: "Arts" },
          { code: "4008", name: "ENVIRONMENTAL STUDIES", category: "Interdisciplinary" },
          { code: "6111", name: "SPORTS MEDICINE", category: "Health" },
          { code: "5509", name: "FORENSIC SCIENCE", category: "Physical Sciences" }
        ]);
      }
      setIsLoading(false);
    };

    loadMajors();
  }, []);

  const getMajorSuggestions = (input: string) => {
    if (input.length < 2) return [];
    return allMajors.filter(m => 
      m.name.toLowerCase().includes(input.toLowerCase()) ||
      m.category.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 8); // Show top 8 results
  };

  const formatMajorName = (name: string) => {
    // Convert "COMPUTER SCIENCE" to "Computer Science"
    return name.split(' ')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (major.trim()) {
      const data: { major: string; secondMajor?: string } = { 
        major: major.trim() 
      };
      if (hasDoubleMajor && secondMajor.trim()) {
        data.secondMajor = secondMajor.trim();
      }
      onUpdateData(data);
      onNext();
    }
  };

  const handleMajorSuggestionClick = (selectedMajor: Major) => {
    const formattedName = formatMajorName(selectedMajor.name);
    setMajor(formattedName);
    setShowMajorSuggestions(false);
  };

  const handleSecondMajorSuggestionClick = (selectedMajor: Major) => {
    const formattedName = formatMajorName(selectedMajor.name);
    setSecondMajor(formattedName);
    setShowSecondMajorSuggestions(false);
  };

  const canProceed = major.trim().length > 0 && (!hasDoubleMajor || secondMajor.trim().length > 0);

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
            What's your field of study, {firstName}?
          </h1>
          <p className="text-lg text-slate-600 font-light">
            This helps us connect you with students in similar disciplines
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
          {/* Primary Major Input */}
          <div className="space-y-3 relative">
            <label 
              htmlFor="major" 
              className="block text-sm font-medium text-slate-700"
            >
              Your Major
            </label>
            <div className="relative">
              <motion.input
                id="major"
                type="text"
                value={major}
                onChange={(e) => {
                  setMajor(e.target.value);
                  setShowMajorSuggestions(e.target.value.length > 1);
                }}
                onFocus={() => major.length > 1 && setShowMajorSuggestions(true)}
                onBlur={() => setTimeout(() => setShowMajorSuggestions(false), 300)}
                placeholder={isLoading ? "Loading majors..." : "e.g., Computer Science, Biology, Business..."}
                disabled={isLoading}
                className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl
                         focus:border-[#2563eb] focus:ring-0 focus:outline-none
                         transition-all duration-200 placeholder:text-slate-400
                         bg-white/80 backdrop-blur-sm"
                autoComplete="organization-title"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Major Suggestions Dropdown */}
            {showMajorSuggestions && getMajorSuggestions(major).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
              >
                {getMajorSuggestions(major).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onMouseDown={() => handleMajorSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 hover:text-[#2563eb] 
                             transition-colors duration-150 border-b border-slate-100 last:border-b-0
                             focus:outline-none focus:bg-blue-50"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="font-medium text-slate-900">{formatMajorName(suggestion.name)}</div>
                    <div className="text-xs text-slate-500">{suggestion.category}</div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Double Major Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-3"
          >
            <motion.button
              type="button"
              onClick={() => {
                setHasDoubleMajor(!hasDoubleMajor);
                if (!hasDoubleMajor) setSecondMajor("");
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 ${
                hasDoubleMajor ? 'bg-[#2563eb]' : 'bg-slate-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  hasDoubleMajor ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
            <label className="text-sm font-medium text-slate-700">
              I have a double major
            </label>
          </motion.div>

          {/* Second Major Input (if enabled) */}
          {hasDoubleMajor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 relative"
            >
              <label 
                htmlFor="secondMajor" 
                className="block text-sm font-medium text-slate-700"
              >
                Your Second Major
              </label>
              <div className="relative">
                <motion.input
                  id="secondMajor"
                  type="text"
                  value={secondMajor}
                  onChange={(e) => {
                    setSecondMajor(e.target.value);
                    setShowSecondMajorSuggestions(e.target.value.length > 1);
                  }}
                  onFocus={() => secondMajor.length > 1 && setShowSecondMajorSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSecondMajorSuggestions(false), 300)}
                  placeholder={isLoading ? "Loading majors..." : "e.g., Mathematics, Economics, Art..."}
                  disabled={isLoading}
                  className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl
                           focus:border-[#2563eb] focus:ring-0 focus:outline-none
                           transition-all duration-200 placeholder:text-slate-400
                           bg-white/80 backdrop-blur-sm"
                  autoComplete="organization-title"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Second Major Suggestions Dropdown */}
              {showSecondMajorSuggestions && getMajorSuggestions(secondMajor).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
                >
                  {getMajorSuggestions(secondMajor).map((suggestion, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onMouseDown={() => handleSecondMajorSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 hover:text-[#2563eb] 
                               transition-colors duration-150 border-b border-slate-100 last:border-b-0
                               focus:outline-none focus:bg-blue-50"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <div className="font-medium text-slate-900">{formatMajorName(suggestion.name)}</div>
                      <div className="text-xs text-slate-500">{suggestion.category}</div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="flex gap-4">
            {/* Back Button */}
            {onBack && (
              <motion.button
                type="button"
                onClick={onBack}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
              whileTap={{ scale: 0.98 }}
              className={`${onBack ? 'flex-1' : 'w-full'} py-4 px-8 rounded-xl text-lg font-medium
                         transition-all duration-300 min-h-[52px]
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                         ${canProceed 
                           ? 'bg-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]' 
                           : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                         }`}
            >
              {canProceed ? "Continue" : 
               hasDoubleMajor ? "Enter both majors" : "Enter your major"}
            </motion.button>
          </div>

          {/* Progress Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-slate-500">
              Step 3 of 7 • We'll match you with study groups and academic events
            </p>
          </motion.div>
        </motion.form>

        {/* Educational Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
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
                <span className="font-medium">Academic connections:</span> We'll help you find study partners, join major-specific groups, and discover research opportunities in your field. Choose from 170+ official academic disciplines.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
