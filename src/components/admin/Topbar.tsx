import { Save, Search, ExternalLink, Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface TopbarProps {
  onSave: () => void;
  isSaving: boolean;
  saveMessage: string;
}

export default function Topbar({ onSave, isSaving, saveMessage }: TopbarProps) {
  const [sysTime, setSysTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setSysTime(
        `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-16 bg-[#0B1220]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-10 sticky top-0">
      {/* Left side - Search */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md hidden md:block group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-cyan transition-colors"
          />
          <input
            type="text"
            placeholder="Search system..."
            className="w-full bg-black/40 border border-white/10 rounded-md py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-6">
        {/* System Time */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-electric-purple/80">
          <Activity size={14} className="animate-pulse" />
          <span>T-{sysTime}</span>
        </div>

        {/* Save State */}
        {saveMessage && (
          <span
            className={`text-xs font-mono tracking-widest uppercase ${saveMessage.includes("Error") ? "text-red-400" : "text-neon-cyan"}`}
          >
            {saveMessage}
          </span>
        )}

        {/* Global Save Button */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-gradient-to-r from-neon-cyan/20 to-transparent border border-neon-cyan/50 hover:bg-neon-cyan/30 text-neon-cyan px-5 py-1.5 rounded text-sm font-orbitron font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.1)] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save System"}
        </button>

        {/* Live Site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          title="View Live Site"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
