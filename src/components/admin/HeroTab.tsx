import { PortfolioData } from "@/types/portfolio";
import { Rocket } from "lucide-react";

interface HeroTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function HeroTab({ data, setData }: HeroTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">
            Hero Section
          </h2>
          <p className="text-white/40 text-sm font-mono">
            Main landing page configuration
          </p>
        </div>
      </div>

      <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden max-w-3xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket size={100} />
        </div>
        <h3 className="text-sm font-orbitron font-bold text-neon-cyan uppercase tracking-widest mb-6 relative z-10">
          Landing Transmission
        </h3>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Primary Heading
            </label>
            <input
              type="text"
              value={data.hero.heading}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, heading: e.target.value },
                })
              }
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-lg font-bold text-white focus:outline-none focus:border-neon-cyan/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
            />
            <p className="text-[10px] text-white/30 mt-1 font-mono">
              Will be rendered with cyberpunk typography
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/50 mb-1">
              Subtitle / Descriptor
            </label>
            <textarea
              rows={3}
              value={data.hero.subtitle}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, subtitle: e.target.value },
                })
              }
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm text-white focus:outline-none focus:border-neon-cyan/50 resize-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
