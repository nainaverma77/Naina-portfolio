import { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import { Activity, Database, Code2, Globe, Users } from "lucide-react";

export default function OverviewTab({ data }: { data: PortfolioData }) {
  const stats = [
    {
      label: "Active Projects",
      value: data.projects?.length || 0,
      icon: Database,
      color: "text-rose-500",
    },
    {
      label: "Core Skills",
      value: data.skills?.length || 0,
      icon: Code2,
      color: "text-green-600",
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
      color: "text-gray-800",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2 uppercase tracking-widest drop-shadow-sm">
          System Overview
        </h2>
        <p className="text-gray-500 text-sm font-sans tracking-wider">
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
            className="bg-white/40 backdrop-blur border border-white/60 rounded-xl p-6 relative overflow-hidden group hover:border-rose-400 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-xs font-serif tracking-widest uppercase mb-2">
                  {stat.label}
                </p>
                <h3
                  className={`text-3xl font-bold font-sans ${stat.color} drop-shadow-sm`}
                >
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-white/30 rounded-lg border border-white/40">
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
        {/* Hover Glow */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Mock Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white/40 backdrop-blur border border-white/60 rounded-xl p-6 relative">
          <h3 className="text-sm font-serif font-bold text-gray-700 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={16} className="text-rose-500" /> Network Traffic
          </h3>
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {[30, 45, 25, 60, 40, 80, 55, 90, 75, 45, 60, 85].map(
              (height, i) => (
                <div key={i} className="w-full relative group">
                  <div
                    className="w-full bg-gradient-to-t from-pink-400/20 to-pink-400/5 border-t border-rose-400 rounded-t-sm transition-all duration-300 group-hover:from-pink-400/40 group-hover:to-pink-400/10 group-hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]"
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
        <div className="bg-white/40 backdrop-blur border border-white/60 rounded-xl p-6">
          <h3 className="text-sm font-serif font-bold text-gray-700 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Users size={16} className="text-green-600" /> Recent Access
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
                className="flex flex-col border-b border-white/40 pb-3 last:border-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-sans text-rose-500">
                    {log.ip}
                  </span>
                  <span className="text-[10px] text-gray-400">{log.time}</span>
                </div>
                <span className="text-[11px] font-serif tracking-wider text-gray-800/60">
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
