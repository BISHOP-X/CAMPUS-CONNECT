import { useState } from "react";
import { LogoIntro } from "@/components/LogoIntro";
import { Onboarding } from "@/components/Onboarding";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!showOnboarding) {
    return <LogoIntro onComplete={() => setShowOnboarding(true)} />;
  }

  return <Onboarding />;
};

export default Index;
