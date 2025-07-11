import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Global Header with Sidebar Trigger */}
        <header className="fixed top-0 left-0 right-0 h-12 bg-background border-b border-border flex items-center z-50 md:hidden">
          <SidebarTrigger className="ml-4" />
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-xs text-primary-foreground font-bold">CC</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Campus Connect</span>
          </div>
        </header>

        {/* Desktop/Tablet Layout */}
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
            <div className="p-6 page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;