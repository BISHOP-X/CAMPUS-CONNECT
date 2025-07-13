import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface UniversityFormProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateData: (data: { university: string }) => void;
  firstName: string;
  initialValue?: string;
}

interface University {
  name: string;
  country: string;
  domain: string;
  web_page: string;
}

export function UniversityForm({ onNext, onBack, onUpdateData, firstName, initialValue = "" }: UniversityFormProps) {
  const [university, setUniversity] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [apiStatus, setApiStatus] = useState<string>(''); // For debugging

  // Test API function for debugging
  const testAPI = async () => {
    try {
      console.log('Testing API...');
      const response = await fetch('https://universities.hipolabs.com/search?name=harvard');
      const data = await response.json();
      console.log('API Test Result:', data);
      setApiStatus(`API Working: Found ${data.length} results for Harvard`);
    } catch (error) {
      console.error('API Test Failed:', error);
      setApiStatus(`API Failed: ${error}`);
    }
  };

  // Test API on component mount
  useEffect(() => {
    testAPI();
  }, []);

  // Search universities as user types
  useEffect(() => {
    const searchUniversities = async () => {
      if (university.length > 2) {
        setIsLoading(true);
        try {
          console.log('Searching for:', university);
          // Simple API call - exactly as documented
          const response = await fetch(
            `https://universities.hipolabs.com/search?name=${encodeURIComponent(university)}`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const results = await response.json();
          console.log('API Response:', results);
          
          // Take first 8 results directly
          setSuggestions(results.slice(0, 8));
          setShowSuggestions(true);
          setSelectedSuggestionIndex(-1);
        } catch (error) {
          console.error('University search failed:', error);
          // Simple fallback suggestions
          const fallbackSuggestions = [
            { 
              name: `${university} University`, 
              country: 'United States', 
              domain: `${university.toLowerCase().replace(/\s+/g, '')}.edu`,
              web_page: `https://${university.toLowerCase().replace(/\s+/g, '')}.edu`
            },
            { 
              name: `University of ${university}`, 
              country: 'United States', 
              domain: `u${university.toLowerCase().replace(/\s+/g, '')}.edu`,
              web_page: `https://u${university.toLowerCase().replace(/\s+/g, '')}.edu`
            }
          ];
          setSuggestions(fallbackSuggestions);
          setShowSuggestions(true);
          setSelectedSuggestionIndex(-1);
        }
        setIsLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    const timeoutId = setTimeout(searchUniversities, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [university]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (university.trim()) {
      onUpdateData({ university: university.trim() });
      onNext();
    }
  };

  const handleSuggestionClick = (selectedUniversity: University) => {
    setUniversity(selectedUniversity.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    // Update the form data immediately when a suggestion is selected
    onUpdateData({ university: selectedUniversity.name });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const canProceed = university.trim().length > 0;

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
            className="h-12 w-auto logo-image"
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
            Great to meet you, {firstName}!
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Which university do you attend?
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
          {/* University Input with Search */}
          <div className="space-y-3 relative">
            <label 
              htmlFor="university" 
              className="block text-sm font-medium text-slate-700"
            >
              Your University
            </label>
            <div className="relative">
              <motion.input
                id="university"
                type="text"
                value={university}
                onChange={(e) => {
                  setUniversity(e.target.value);
                  setSelectedSuggestionIndex(-1);
                  console.log('Input changed to:', e.target.value);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (university.length > 2 && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking
                  setTimeout(() => {
                    setShowSuggestions(false);
                    setSelectedSuggestionIndex(-1);
                  }, 300);
                }}
                placeholder="Start typing your university name..."
                className="w-full px-4 py-4 text-lg border-2 border-slate-200 rounded-xl
                         focus:border-[#2563eb] focus:ring-0 focus:outline-none
                         transition-all duration-200 placeholder:text-slate-400
                         bg-white/80 backdrop-blur-sm"
                autoComplete="organization"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2563eb]"></div>
                </div>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-64 overflow-y-auto backdrop-blur-sm"
                style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={`${suggestion.name}-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                      className={`w-full px-4 py-3 text-left transition-colors duration-150 border-b border-slate-100 last:border-b-0
                               focus:outline-none active:bg-blue-100 ${
                                 index === selectedSuggestionIndex
                                   ? 'bg-blue-50 text-[#2563eb]'
                                   : 'hover:bg-blue-50 hover:text-[#2563eb]'
                               }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <div className="font-medium text-slate-900 leading-tight">{suggestion.name}</div>
                      <div className="text-sm text-slate-500 mt-1">
                        {suggestion.country}
                        {suggestion.domain && (
                          <span className="text-xs text-slate-400 ml-2">• {suggestion.domain}</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
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
              {canProceed ? "Continue" : "Enter your university"}
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
              Step 2 of 7 • This helps us connect you with peers at your institution
            </p>
            {/* Debug info */}
            {apiStatus && (
              <p className="text-xs text-blue-600 mt-2">
                Debug: {apiStatus}
              </p>
            )}
          </motion.div>
        </motion.form>

        {/* Global Collaboration Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="space-y-4"
        >
          {/* What You Can Do */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Global Academic Collaboration</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Your university opens doors to a worldwide network of academic collaboration and knowledge sharing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Share Materials */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">📚</span>
                  <h4 className="font-semibold text-slate-900 text-sm">Share Study Materials</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exchange notes, research papers, and resources with students worldwide studying the same subjects
                </p>
              </div>

              {/* Multi-University Groups */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🌍</span>
                  <h4 className="font-semibold text-slate-900 text-sm">Multi-University Groups</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Join study groups with students from Harvard, MIT, Oxford, and universities across the globe
                </p>
              </div>

              {/* Find Perfect Partners */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h4 className="font-semibold text-slate-900 text-sm">Perfect Collaboration Partners</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Search by exact school, discipline, and interests to find ideal project collaborators
                </p>
              </div>

              {/* Cross-Cultural Projects */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">🚀</span>
                  <h4 className="font-semibold text-slate-900 text-sm">Cross-Cultural Innovation</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Build international projects with diverse perspectives from students around the world
                </p>
              </div>
            </div>
          </div>

          {/* Example Scenario */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-[#2563eb] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Example:</span> Need a design partner for your startup? Search for "Product Design students at RISD interested in Tech Startups" and connect instantly with the perfect collaborator.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
