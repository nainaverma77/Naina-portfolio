import {
  LayoutDashboard,
  Rocket,
  Code2,
  User,
  Globe,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Mail,
  BookOpen,
  Shield,
} from "lucide-react";

export type TabType =
  | "overview"
  | "hero"
  | "about"
  | "skills"
  | "education"
  | "projects"
  | "socials"
  | "messages"
  | "settings"
  | "access";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const navItems = [
    { id: "overview", label: "Garden Overview", icon: LayoutDashboard },
    { id: "hero", label: "Garden Entrance", icon: Rocket },
    { id: "about", label: "Gardener Profile", icon: User },
    { id: "skills", label: "Core Cultivation", icon: Code2 },
    { id: "education", label: "Growth Records", icon: BookOpen },
    { id: "projects", label: "Harvested Projects", icon: LayoutDashboard },
    { id: "socials", label: "Botanical Links", icon: Globe },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "settings", label: "Greenhouse Config", icon: Settings },
    { id: "access", label: "Access Control", icon: Shield },
  ] as const;

  return (
    <div
      className={`relative transition-all duration-300 h-full bg-white/50 border-r border-white/40 flex flex-col z-20 ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/40">
        {!isCollapsed && (
          <h1 className="font-serif font-bold text-gray-800 tracking-widest text-lg">
            NAINA&apos;S <span className="text-rose-500">GARDEN</span>
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="mx-auto" />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-300 font-inter text-sm
                ${
                  isActive
                    ? "bg-rose-100 text-rose-500 shadow-[inset_4px_0_0_0_#F43F5E]"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-800"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon
                size={18}
                className={isActive ? "text-rose-500" : ""}
              />
              {!isCollapsed && (
                <span className="tracking-wide">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/40">
        <button
          onClick={async () => {
            const { logout } = await import("@/app/actions");
            await logout();
            window.location.reload();
          }}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all font-inter text-sm ${isCollapsed ? "justify-center" : ""}`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && (
            <span className="tracking-wide">Terminate Session</span>
          )}
        </button>
      </div>
    </div>
  );
}
