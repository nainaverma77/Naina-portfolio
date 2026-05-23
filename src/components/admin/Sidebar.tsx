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
  | "settings";

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
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "hero", label: "Hero Section", icon: Rocket },
    { id: "about", label: "Identity", icon: User },
    { id: "skills", label: "Skills Core", icon: Code2 },
    { id: "education", label: "Academic Records", icon: BookOpen },
    { id: "projects", label: "Mission Log", icon: LayoutDashboard },
    { id: "socials", label: "Comm Links", icon: Globe },
    { id: "messages", label: "Secure Inbox", icon: Mail },
    { id: "settings", label: "System Config", icon: Settings },
  ] as const;

  return (
    <div
      className={`relative transition-all duration-300 h-full bg-[#050505] border-r border-white/5 flex flex-col z-20 ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
        {!isCollapsed && (
          <h1 className="font-orbitron font-bold text-white tracking-widest text-lg">
            SYS<span className="text-neon-cyan">OP</span>
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/40 hover:text-white transition-colors"
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
                    ? "bg-neon-cyan/10 text-neon-cyan shadow-[inset_2px_0_0_0_#00F5FF]"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon
                size={18}
                className={isActive ? "drop-shadow-[0_0_5px_#00F5FF]" : ""}
              />
              {!isCollapsed && (
                <span className="tracking-wide">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5">
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
