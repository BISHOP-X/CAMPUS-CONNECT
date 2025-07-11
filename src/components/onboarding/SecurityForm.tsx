import { useState } from "react";
import { motion } from "framer-motion";
import { OnboardingContainer } from "./OnboardingContainer";

interface SecurityFormProps {
  onNext: () => void;
  onBack?: () => void;
  onUpdateData: (data: { email: string; password: string }) => void;
  firstName: string;
  initialValue?: { email: string; password: string };
}

export function SecurityForm({ onNext, onBack, onUpdateData, firstName, initialValue }: SecurityFormProps) {
  const [email, setEmail] = useState(initialValue?.email || "");
  const [password, setPassword] = useState(initialValue?.password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain uppercase, lowercase, and number";
    }
    return "";
  };

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      onUpdateData({ email, password });
      onNext();
    }
  };

  const canProceed = email.trim() && password.trim() && !emailError && !passwordError;

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
            Secure your account, {firstName}
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Create your Campus Connect account to get started
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
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-2"
          >
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <motion.input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your.email@university.edu"
                whileFocus={{ scale: 1.01 }}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                          ${emailError
                            ? 'border-red-300 bg-red-50 focus:border-red-400'
                            : email && !emailError
                            ? 'border-green-300 bg-green-50 focus:border-green-400'
                            : 'border-slate-200 bg-white/80 focus:border-[#2563eb]'
                          }`}
              />
              {/* Email validation icon */}
              {email && (
                <div className={`absolute right-4 top-1/2 transform -translate-y-1/2
                              ${emailError ? 'text-red-500' : 'text-green-500'}`}>
                  {emailError ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {emailError}
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-2"
          >
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
                whileFocus={{ scale: 1.01 }}
                className={`w-full px-4 py-4 pr-12 text-lg border-2 rounded-xl transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2
                          ${passwordError
                            ? 'border-red-300 bg-red-50 focus:border-red-400'
                            : password && !passwordError
                            ? 'border-green-300 bg-green-50 focus:border-green-400'
                            : 'border-slate-200 bg-white/80 focus:border-[#2563eb]'
                          }`}
              />
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {passwordError}
              </motion.p>
            )}

            {/* Password Strength Indicator */}
            {password && !passwordError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Password strength:</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength <= 2 ? 'text-red-600' : 
                    passwordStrength === 3 ? 'text-yellow-600' : 
                    passwordStrength === 4 ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        index < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

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
              {canProceed ? "Create Account" : "Complete all fields"}
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
              Step 6 of 7 • Almost done! Your account will be created securely
            </p>
          </motion.div>
        </motion.form>

        {/* Security Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[#2563eb] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-700">
                <span className="font-medium">Your data is secure:</span> We use industry-standard encryption to protect your information. Your password is hashed and never stored in plain text. We'll never share your email with third parties.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </OnboardingContainer>
  );
}
