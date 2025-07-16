import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { DownloadAppModal } from "./DownloadAppModal";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Users2, 
  Trophy, 
  Calendar, 
  BookOpen, 
  Menu, 
  X,
  GraduationCap,
  User,
  Download
} from "lucide-react";
import "./GlassNavigation.css";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & quick stats"
  },
  {
    title: "Discover",
    url: "/discover", 
    icon: Users,
    description: "Find students worldwide"
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
    description: "Chat & conversations"
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users2,
    description: "Study groups & teams"
  },
  {
    title: "Rankings",
    url: "/rankings",
    icon: Trophy,
    description: "Leaderboards & achievements"
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
    description: "Campus events & meetups"
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen,
    description: "Study materials & tools"
  },
  {
    title: "Download App",
    url: "#download",
    icon: Download,
    description: "Get the mobile app",
    isDownload: true
  },
];

export function GlassNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const location = useLocation();

  const closeNav = () => {
    setIsClosing(true);
    // Allow exit animation to complete before hiding
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // Match the exit animation duration
  };

  return (
    <>
      {/* Hamburger Button - Top Left (only show when menu closed) */}
      {!isOpen && !isClosing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg hover:bg-white/90 transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </motion.button>
      )}

      {/* Glass Overlay */}
      <AnimatePresence>
        {(isOpen || isClosing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              onClick={closeNav}
            />
            
            {/* Navigation Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ 
                opacity: isClosing ? 0 : 1, 
                scale: isClosing ? 0.9 : 1, 
                y: isClosing ? -40 : 0 
              }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: isClosing ? 0 : (isOpen ? 0.1 : 0)
              }}
              className="absolute inset-4 bg-gradient-to-br from-white/25 via-white/20 to-white/15 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl flex flex-col max-h-full"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Header - Fixed at top */}
              <div className="flex-shrink-0 p-8 border-b border-white/30 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/20">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white drop-shadow-sm">Campus Connect</h1>
                      <p className="text-white/80 text-sm font-medium">Global Student Network</p>
                    </div>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ 
                      opacity: isClosing ? 0 : 1, 
                      rotate: isClosing ? 90 : 0,
                      scale: isClosing ? 0.8 : 1
                    }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ delay: isClosing ? 0 : 0.2, duration: 0.3 }}
                    onClick={closeNav}
                    className="w-12 h-12 bg-white/15 border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/25 transition-all duration-200 shadow-lg"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* User Profile */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isClosing ? 0 : 1, 
                    y: isClosing ? -20 : 0 
                  }}
                  transition={{ delay: isClosing ? 0 : 0.3, duration: 0.4 }}
                  className="flex items-center space-x-3 p-4 bg-white/15 rounded-2xl border border-white/30 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">John Doe</p>
                    <p className="text-white/80 text-sm">Computer Science • MIT</p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Items - Scrollable */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-8 min-h-0 glass-nav-scroll"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
                    {navigationItems.map((item, index) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ 
                            opacity: isClosing ? 0 : 1, 
                            y: isClosing ? -30 : 0 
                          }}
                          transition={{ 
                            delay: isClosing ? 0 : 0.4 + (index * 0.08), 
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          {item.isDownload ? (
                            <button
                              onClick={() => {
                                setShowDownloadModal(true);
                                closeNav();
                              }}
                              className="group block p-6 rounded-2xl border transition-all duration-300 w-full text-left bg-white/12 border-white/25 text-white/90 hover:bg-white/20 hover:border-white/40 hover:shadow-xl"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/20 group-hover:bg-white/30 shadow-md">
                                  <item.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                  <p className="text-sm opacity-80">{item.description}</p>
                                </div>
                              </div>
                            </button>
                          ) : (
                            <NavLink
                              to={item.url}
                              onClick={closeNav}
                              className={`group block p-6 rounded-2xl border transition-all duration-300 ${
                                isActive
                                  ? 'bg-blue-500/35 border-blue-400/60 text-white shadow-xl ring-2 ring-blue-400/30' 
                                  : 'bg-white/12 border-white/25 text-white/90 hover:bg-white/20 hover:border-white/40 hover:shadow-xl'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                  isActive 
                                    ? 'bg-blue-500/50 shadow-lg ring-2 ring-blue-400/30' 
                                    : 'bg-white/20 group-hover:bg-white/30 shadow-md'
                                }`}>
                                  <item.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                  <p className="text-sm opacity-80">{item.description}</p>
                                </div>
                                {isActive && (
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3 h-3 bg-blue-300 rounded-full shadow-lg ring-2 ring-blue-400/50"
                                  />
                                )}
                              </div>
                            </NavLink>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              {/* Footer - Fixed at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isClosing ? 0 : 1, 
                  y: isClosing ? 20 : 0 
                }}
                transition={{ delay: isClosing ? 0 : 0.6, duration: 0.4 }}
                className="flex-shrink-0 p-6 border-t border-white/30 bg-gradient-to-r from-white/20 to-white/15 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between text-white/90 text-sm">
                  <span className="font-semibold">Version 2.1.0</span>
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full shadow-lg ring-2 ring-green-400/30"
                    />
                    <span className="font-medium">Online</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Download App Modal */}
      <DownloadAppModal 
        open={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
      />
    </>
  );
}
