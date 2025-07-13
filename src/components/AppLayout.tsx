import { GlassNavigation } from "./GlassNavigation";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Glass Navigation Overlay */}
      <GlassNavigation />
      
      {/* Main Content - Full Width */}
      <main className="min-h-screen">
        <div className="p-8 pt-24">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;