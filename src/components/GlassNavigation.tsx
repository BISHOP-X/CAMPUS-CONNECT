import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
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
  User
} from "lucide-react";

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
];

export function GlassNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeNav = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - Top Left (only show when menu closed) */}
      {!isOpen && (
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
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-lg"
              onClick={closeNav}
            />
            
            {/* Navigation Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -40 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: isOpen ? 0.1 : 0
              }}
              className="absolute inset-4 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Header */}
                <div className="p-8 border-b border-white/10 sticky top-0 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">Campus Connect</h1>
                        <p className="text-white/70 text-sm">Global Student Network</p>
                      </div>
                    </div>
                    <motion.button
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      onClick={closeNav}
                      className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>

                  {/* User Profile */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-white/70 text-sm">Computer Science • MIT</p>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Items */}
                <div className="p-8 pb-24">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {navigationItems.map((item, index) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.4 + (index * 0.08), 
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          <NavLink
                            to={item.url}
                            onClick={closeNav}
                            className={`group block p-6 rounded-2xl border transition-all duration-300 ${
                              isActive
                                ? 'bg-blue-500/25 border-blue-400/40 text-white shadow-lg'
                                : 'bg-white/8 border-white/15 text-white/90 hover:bg-white/15 hover:border-white/25 hover:shadow-lg'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isActive 
                                  ? 'bg-blue-500/40 shadow-md' 
                                  : 'bg-white/10 group-hover:bg-white/20'
                              }`}>
                                <item.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                <p className="text-sm opacity-70">{item.description}</p>
                              </div>
                              {isActive && (
                                <motion.div 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-3 h-3 bg-blue-400 rounded-full shadow-lg"
                                />
                              )}
                            </div>
                          </NavLink>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer - Fixed at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="p-6 border-t border-white/10 bg-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span>Version 2.1.0</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
