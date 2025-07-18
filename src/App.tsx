import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { useAppPreloader } from "./hooks/useAppPreloader";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Rankings from "./pages/Rankings";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Start preloading critical data immediately
  useAppPreloader();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Protected App Routes */}
            <Route path="/dashboard" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/discover" element={
              <AppLayout>
                <Discover />
              </AppLayout>
            } />
            <Route path="/messages" element={
              <AppLayout>
                <Messages />
              </AppLayout>
            } />
            <Route path="/profile/:username" element={
              <AppLayout>
                <Profile />
              </AppLayout>
            } />
            <Route path="/groups" element={
              <AppLayout>
                <Groups />
              </AppLayout>
            } />
            <Route path="/rankings" element={
              <AppLayout>
                <Rankings />
              </AppLayout>
            } />
            <Route path="/events" element={
              <AppLayout>
                <Events />
              </AppLayout>
            } />
            <Route path="/resources" element={
              <AppLayout>
                <Resources />
              </AppLayout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PWAInstallPrompt />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
