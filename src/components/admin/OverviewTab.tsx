import { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import { Activity, Database, Code2, Globe, Users } from "lucide-react";

export default function OverviewTab({ data }: { data: PortfolioData }) {
  const stats = [
    {
      label: "Active Projects",
      value: data.projects?.length || 0,
      icon: Database,
      color: "text-neon-cyan",
    },
    {
      label: "Core Skills",
      value: data.skills?.length || 0,
      icon: Code2,
      color: "text-electric-purple",
    },
    {
      label: "Comm Links",
      value: data.socials?.length || 0,
      icon: Globe,
      color: "text-green-400",
    },
    {
      label: "System Status",
      value: "ONLINE",
      icon: Activity,
      color: "text-white",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          System Overview
        </h2>
        <p className="text-white/40 text-sm font-mono tracking-wider">
          PRIMARY DASHBOARD / ANALYTICS
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-neon-cyan/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-white/40 text-xs font-orbitron tracking-widest uppercase mb-2">
                  {stat.label}
                </p>
                <h3
                  className={`text-3xl font-bold font-mono ${stat.color} drop-shadow-[0_0_10px_currentColor]`}
                >
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
            {/* Hover Glow */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Mock Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={16} className="text-neon-cyan" /> Network Traffic
          </h3>
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {[30, 45, 25, 60, 40, 80, 55, 90, 75, 45, 60, 85].map(
              (height, i) => (
                <div key={i} className="w-full relative group">
                  <div
                    className="w-full bg-gradient-to-t from-neon-cyan/20 to-neon-cyan/5 border-t border-neon-cyan/50 rounded-t-sm transition-all duration-300 group-hover:from-neon-cyan/40 group-hover:to-neon-cyan/10 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ),
            )}
          </div>
          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "100% 25px",
            }}
          />
        </div>

        {/* Activity Feed */}
        <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Users size={16} className="text-electric-purple" /> Recent Access
            Logs
          </h3>
          <div className="space-y-4">
            {[
              {
                ip: "192.168.1.1",
                action: "PORTFOLIO_VIEW",
                time: "2 mins ago",
              },
              {
                ip: "45.33.12.9",
                action: "PROJECT_DOWNLOAD",
                time: "15 mins ago",
              },
              { ip: "ADMIN_NODE", action: "SYSTEM_UPDATE", time: "1 hour ago" },
              {
                ip: "88.102.5.3",
                action: "PORTFOLIO_VIEW",
                time: "3 hours ago",
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex flex-col border-b border-white/5 pb-3 last:border-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono text-neon-cyan">
                    {log.ip}
                  </span>
                  <span className="text-[10px] text-white/30">{log.time}</span>
                </div>
                <span className="text-[11px] font-orbitron tracking-wider text-white/60">
                  {log.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
