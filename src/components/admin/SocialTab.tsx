import { useState } from "react";
import { PortfolioData, SocialLink } from "@/types/portfolio";
import { Plus, Trash2, GripVertical, Check, X } from "lucide-react";
import { motion, Reorder } from "framer-motion";

interface SocialTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function SocialTab({ data, setData }: SocialTabProps) {
  const handleAdd = () => {
    const newLink: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: "New Platform",
      url: "",
      enabled: true,
    };
    setData({ ...data, socials: [...data.socials, newLink] });
  };

  const handleDelete = (id: string) => {
    setData({ ...data, socials: data.socials.filter((s) => s.id !== id) });
  };

  const handleUpdate = (id: string, field: keyof SocialLink, value: any) => {
    setData({
      ...data,
      socials: data.socials.map((s) =>
        s.id === id ? { ...s, [field]: value } : s,
      ),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">
            Comm Links
          </h2>
          <p className="text-white/40 text-sm font-mono">
            Manage social and external transmissions
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan px-3 py-1.5 rounded transition-all"
        >
          <Plus size={16} /> Add Link
        </button>
      </div>

      <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
        {data.socials.length === 0 ? (
          <div className="text-center py-12 text-white/40 font-mono text-sm">
            NO_LINKS_CONFIGURED
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={data.socials}
            onReorder={(newOrder) => setData({ ...data, socials: newOrder })}
            className="space-y-3"
          >
            {data.socials.map((social) => (
              <Reorder.Item
                key={social.id}
                value={social}
                className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-lg p-3 group hover:border-white/20 transition-colors"
              >
                <div className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 p-2">
                  <GripVertical size={16} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 items-center">
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) =>
                        handleUpdate(social.id, "platform", e.target.value)
                      }
                      placeholder="Platform (e.g. GitHub)"
                      className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                    />
                  </div>

                  <div className="md:col-span-7">
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) =>
                        handleUpdate(social.id, "url", e.target.value)
                      }
                      placeholder="https://..."
                      className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        handleUpdate(social.id, "enabled", !social.enabled)
                      }
                      className={`flex-1 md:flex-none flex justify-center p-2 rounded text-xs font-bold transition-all ${
                        social.enabled
                          ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                          : "bg-white/10 text-white/30 border border-white/10 hover:bg-white/20"
                      }`}
                      title={social.enabled ? "Disable" : "Enable"}
                    >
                      {social.enabled ? <Check size={16} /> : <X size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(social.id)}
                      className="p-2 rounded bg-black/40 border border-white/5 text-red-400/70 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  );
}
