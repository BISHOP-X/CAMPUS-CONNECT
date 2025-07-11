import { useState, useCallback } from "react";

type OnboardingStep = 
  | "form-name"            // "What should we call you?"
  | "form-university"      // "Which university?"
  | "form-discipline"      // "Your field of study?"
  | "form-level"           // "Academic level?"
  | "form-goals"           // "What are you looking to achieve?"
  | "form-security"        // "Secure your account"
  | "welcome-complete";    // "Welcome to your network!"

interface OnboardingData {
  firstName: string;
  lastName: string;
  university: string;
  major: string;
  secondMajor?: string;
  level: string;
  goals: string[];
  email: string;
  password: string;
}

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("form-name");
  const [data, setData] = useState<Partial<OnboardingData>>({
    goals: [],
    major: "",
    secondMajor: ""
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Mobile-first: Quick transitions to avoid fatigue
  const nextStep = useCallback(() => {
    setIsAnimating(true);
    
    // Quick animation on mobile
    const animationDuration = window.innerWidth < 768 ? 200 : 300;
    
    setTimeout(() => {
      setCurrentStep(prevStep => {
        switch (prevStep) {
          case "form-name": return "form-university";
          case "form-university": return "form-discipline";
          case "form-discipline": return "form-level";
          case "form-level": return "form-goals";
          case "form-goals": return "form-security";
          case "form-security": return "welcome-complete";
          default: return prevStep;
        }
      });
      setIsAnimating(false);
    }, animationDuration);
  }, []);

  const prevStep = useCallback(() => {
    setIsAnimating(true);
    
    // Quick animation on mobile
    const animationDuration = window.innerWidth < 768 ? 200 : 300;
    
    setTimeout(() => {
      setCurrentStep(prevStep => {
        switch (prevStep) {
          case "form-university": return "form-name";
          case "form-discipline": return "form-university";
          case "form-level": return "form-discipline";
          case "form-goals": return "form-level";
          case "form-security": return "form-goals";
          case "welcome-complete": return "form-security";
          default: return prevStep;
        }
      });
      setIsAnimating(false);
    }, animationDuration);
  }, []);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case "form-name": return !!data.firstName?.trim() && !!data.lastName?.trim();
      case "form-university": return !!data.university;
      case "form-discipline": return !!data.major;
      case "form-level": return !!data.level;
      case "form-goals": return (data.goals?.length ?? 0) > 0;
      case "form-security": return !!data.email?.trim() && !!data.password?.trim();
      default: return true;
    }
  }, [currentStep, data]);

  const canGoBack = useCallback(() => {
    return currentStep !== "form-name";
  }, [currentStep]);

  // Calculate progress (mobile-friendly indicator)
  const getProgress = useCallback(() => {
    const steps = [
      "form-name", "form-university", "form-discipline", "form-level",
      "form-goals", "form-security", "welcome-complete"
    ];
    return (steps.indexOf(currentStep) + 1) / steps.length * 100;
  }, [currentStep]);

  return {
    currentStep,
    data,
    isAnimating,
    nextStep,
    prevStep,
    updateData,
    canProceed: canProceed(),
    canGoBack: canGoBack(),
    progress: getProgress()
  };
}
