import { PortfolioData } from "@/types/portfolio";
import { User, MapPin, Briefcase, Zap, Terminal } from "lucide-react";
import MediaRenderer from "../MediaRenderer";

interface AboutTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

const defaultCards = [
  { title: "Precision UI", description: "Pixel-perfect implementations with highly responsive and cinematic behaviors." },
  { title: "Robust Systems", description: "Scalable backend architectures ensuring seamless data flow and performance." }
];

export default function AboutTab({ data, setData }: AboutTabProps) {
  const cards = data.about.summaryCards || defaultCards;

  const handleCardChange = (index: number, field: 'title' | 'description', value: string) => {
    const newCards = JSON.parse(JSON.stringify(cards));
    newCards[index][field] = value;
    setData({ ...data, about: { ...data.about, summaryCards: newCards } });
  };
  // Also updating Hero Section in this tab for simplicity, or we can make a separate tab.
  // The plan specified "About Tab: Broken down into modular cards (Identity, Bio, Specialization)".
  // Let's include Hero in this tab since it's related to Identity, or we can keep it separate.
  // The sidebar has a "Hero Section" tab. I'll make a separate HeroTab or combine them.
  // Let's combine Hero into About for less files, or create a simple Hero component inline.
  // The Sidebar has "Hero Section" as a tab. Let's stick to the sidebar layout! We can export two components from this file or just make AboutTab handle About.

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">
            Identity Config
          </h2>
          <p className="text-white/40 text-sm font-mono">
            Personal details and specialization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <User size={100} />
            </div>
            <h3 className="text-sm font-orbitron font-bold text-neon-cyan uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
              <Terminal size={16} /> Basic Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Designation (Name)
                </label>
                <input
                  type="text"
                  value={data.about.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, name: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1 flex items-center gap-1">
                  <Briefcase size={12} /> Role
                </label>
                <input
                  type="text"
                  value={data.about.role}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, role: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1 flex items-center gap-1">
                  <MapPin size={12} /> Coordinates (Location)
                </label>
                <input
                  type="text"
                  value={data.about.location}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, location: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1 flex items-center gap-1">
                  <Zap size={12} /> Status
                </label>
                <input
                  type="text"
                  value={data.about.status}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, status: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-orbitron font-bold text-electric-purple uppercase tracking-widest mb-6 relative z-10">
              Core Details
            </h3>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  value={data.about.specialization}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, specialization: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Biography / System Log
                </label>
                <textarea
                  rows={5}
                  value={data.about.bio}
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, bio: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">
                  Avatar / Visual ID URL
                </label>
                <input
                  type="text"
                  value={data.about.avatarUrl || ""}
                  placeholder="https://..."
                  onChange={(e) =>
                    setData({
                      ...data,
                      about: { ...data.about, avatarUrl: e.target.value },
                    })
                  }
                  className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>
          </div>

          {/* Operational Summary Cards */}
          <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-orbitron font-bold text-neon-cyan uppercase tracking-widest mb-6 relative z-10">
              Operational Summary Cards
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {cards.map((card, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xs font-mono text-white/70 uppercase border-b border-white/10 pb-2">Card {index + 1}</h4>
                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/50 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={card.description}
                      onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-6 relative">
          <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
            Live Preview
          </h3>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 bg-black/50 border border-neon-cyan/50 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,245,255,0.2)] rounded-sm">
              {data.about.avatarUrl ? (
                <MediaRenderer
                  url={data.about.avatarUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                />
              ) : (
                <User className="w-12 h-12 text-neon-cyan/80" />
              )}
              <div className="absolute inset-0 bg-neon-cyan/10 animate-pulse mix-blend-overlay"></div>
            </div>

            <div>
              <h4 className="font-orbitron font-bold text-xl text-white tracking-widest uppercase">
                {data.about.name || "DESIGNATION"}
              </h4>
              <p className="text-neon-cyan font-mono text-xs mt-1">
                {data.about.role || "ROLE"}
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

            <div className="flex flex-col items-center gap-2 w-full text-xs font-mono text-white/50">
              <span className="flex items-center gap-2">
                <MapPin size={12} /> {data.about.location || "UNKNOWN"}
              </span>
              <span className="flex items-center gap-2">
                <Zap size={12} /> {data.about.status || "UNKNOWN"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
