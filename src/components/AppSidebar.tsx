import { LayoutDashboard, Users, MessageSquare, GraduationCap, Users2, Trophy, Calendar, BookOpen } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

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
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";
  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `${isActive 
      ? "bg-primary text-white font-medium shadow-sm" 
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-800"
    } transition-all duration-200 [&>*]:text-inherit !text-slate-700`;

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-60"} bg-white border-r border-slate-200`} collapsible="icon">
      <SidebarContent className="bg-white">
        {/* Logo Section */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-slate-800">Campus Connect</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="bg-white">
          <SidebarGroupLabel className="text-slate-700 font-medium uppercase text-xs tracking-wide !text-slate-700">Navigation</SidebarGroupLabel>
          <SidebarGroupContent className="bg-white">
            <SidebarMenu className="bg-white">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="bg-white">
                  <SidebarMenuButton asChild className="bg-white hover:bg-slate-100 data-[active=true]:bg-primary data-[active=true]:text-white">
                    <NavLink
                      to={item.url}
                      end
                      className={getNavClassName}
                    >
                      <item.icon className="h-4 w-4 text-inherit" />
                      {!collapsed && <span className="text-inherit">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}