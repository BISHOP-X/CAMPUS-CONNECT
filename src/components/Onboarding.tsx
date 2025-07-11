import { AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingContainer } from "./onboarding/OnboardingContainer";
import { NameForm } from "./onboarding/NameForm";
import { UniversityForm } from "./onboarding/UniversityForm";
import { DisciplineForm } from "./onboarding/DisciplineForm";
import { LevelForm } from "./onboarding/LevelForm";
import { GoalsForm } from "./onboarding/GoalsForm";
import { SecurityForm } from "./onboarding/SecurityForm";
import { WelcomeMessage } from "./onboarding/WelcomeMessage";
import { motion } from "framer-motion";

export function Onboarding() {
  const { currentStep, nextStep, prevStep, updateData, data, progress, canGoBack } = useOnboarding();

  // Mobile-first progress indicator (always visible)
  const ProgressBar = () => (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: currentStep.startsWith("form") ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );

  return (
    <>
      <ProgressBar />
      
      <AnimatePresence mode="wait">
        {/* Name Form */}
        {currentStep === "form-name" && (
          <motion.div key="form-name">
            <NameForm 
              onNext={nextStep}
              onUpdateData={updateData}
              initialFirstName={data.firstName || ""}
              initialLastName={data.lastName || ""}
            />
          </motion.div>
        )}

        {/* University Form */}
        {currentStep === "form-university" && (
          <motion.div key="form-university">
            <UniversityForm 
              onNext={nextStep}
              onBack={canGoBack ? prevStep : undefined}
              onUpdateData={updateData}
              firstName={data.firstName || ""}
              initialValue={data.university || ""}
            />
          </motion.div>
        )}

        {/* Discipline Form */}
        {currentStep === "form-discipline" && (
          <motion.div key="form-discipline">
            <DisciplineForm 
              onNext={nextStep}
              onBack={canGoBack ? prevStep : undefined}
              onUpdateData={updateData}
              firstName={data.firstName || ""}
              initialValue={{
                major: data.major || "",
                secondMajor: data.secondMajor || ""
              }}
            />
          </motion.div>
        )}

        {/* Level Form */}
        {currentStep === "form-level" && (
          <motion.div key="form-level">
            <LevelForm 
              onNext={nextStep}
              onBack={canGoBack ? prevStep : undefined}
              onUpdateData={updateData}
              firstName={data.firstName || ""}
              initialValue={data.level || ""}
            />
          </motion.div>
        )}

        {/* Goals Form */}
        {currentStep === "form-goals" && (
          <motion.div key="form-goals">
            <GoalsForm 
              onNext={nextStep}
              onBack={canGoBack ? prevStep : undefined}
              onUpdateData={updateData}
              firstName={data.firstName || ""}
              initialValue={data.goals || []}
            />
          </motion.div>
        )}

        {/* Security Form */}
        {currentStep === "form-security" && (
          <motion.div key="form-security">
            <SecurityForm 
              onNext={nextStep}
              onBack={canGoBack ? prevStep : undefined}
              onUpdateData={updateData}
              firstName={data.firstName || ""}
              initialValue={{
                email: data.email || "",
                password: data.password || ""
              }}
            />
          </motion.div>
        )}

        {/* Welcome Message */}
        {currentStep === "welcome-complete" && (
          <motion.div key="welcome-complete">
            <WelcomeMessage 
              onComplete={() => {
                // TODO: Navigate to main app
                console.log("Onboarding complete!", data);
              }}
              firstName={data.firstName || ""}
            />
          </motion.div>
        )}

        {/* Other form steps will be added next */}
        {!["form-name", "form-university", "form-discipline", "form-level", "form-goals", "form-security"].includes(currentStep) && currentStep.startsWith("form") && (
          <motion.div key="form-placeholder">
            <OnboardingContainer>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <h2 className="text-xl text-foreground">
                  Form steps coming next...
                </h2>
                <p className="text-muted-foreground">
                  Current step: {currentStep}
                </p>
                <button 
                  onClick={nextStep}
                  className="bg-[#2563eb] text-white px-6 py-3 rounded-lg"
                >
                  Continue
                </button>
              </motion.div>
            </OnboardingContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
