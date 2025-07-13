import { LayoutDashboard, Users, MessageSquare, GraduationCap, Users2, Trophy, Calendar, BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Discover",
    url: "/discover", 
    icon: Users,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users2,
  },
  {
    title: "Rankings",
    url: "/rankings",
    icon: Trophy,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <div className="w-20 min-h-screen bg-white border-r border-slate-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={`group flex items-center justify-center w-14 h-14 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:scale-105'
                  }`}
                  title={item.title}
                >
                  <item.icon className="w-6 h-6" />
                  {isActive && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-full"></div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}