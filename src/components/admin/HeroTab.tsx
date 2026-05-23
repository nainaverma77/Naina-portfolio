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
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase">
            Hero Section
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Main landing page configuration
          </p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur border border-white/60 rounded-xl p-6 relative overflow-hidden max-w-3xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket size={100} />
        </div>
        <h3 className="text-sm font-serif font-bold text-rose-500 uppercase tracking-widest mb-6 relative z-10">
          Landing Transmission
        </h3>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-sans text-gray-600 mb-1">
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
              className="w-full bg-white/40 border border-white/60 rounded p-3 text-lg font-bold text-gray-800 focus:outline-none focus:border-rose-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
            />
            <p className="text-[10px] text-gray-400 mt-1 font-sans">
              Will be rendered with cyberpunk typography
            </p>
          </div>

          <div>
            <label className="block text-xs font-sans text-gray-600 mb-1">
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
              className="w-full bg-white/40 border border-white/60 rounded p-3 text-sm text-gray-800 focus:outline-none focus:border-rose-400 resize-none shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
