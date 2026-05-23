import { PortfolioData } from "@/types/portfolio";
import { Settings, Shield, Globe, Monitor, AlertTriangle } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";

interface SettingsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function SettingsTab({ data, setData }: SettingsTabProps) {
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showModal = (title: string, message: string) => {
    setModalState({ isOpen: true, title, message });
  };

  const handleReset = () => {
    if (resetConfirmation === "I want to reset this") {
      setData({
        hero: { heading: "", subtitle: "" },
        about: {
          name: "",
          role: "",
          status: "",
          location: "",
          specialization: "",
          bio: "",
          avatarUrl: "",
        },
        skills: [
          { name: "React / Next.js", level: 90, visible: true },
          { name: "TypeScript", level: 85, visible: true },
          { name: "Node.js", level: 80, visible: true },
          { name: "Tailwind CSS", level: 95, visible: true },
          { name: "Python", level: 75, visible: false },
          { name: "Docker", level: 70, visible: false },
          { name: "Figma", level: 60, visible: false },
          { name: "SQL / PostgreSQL", level: 85, visible: false },
        ],
        projects: [],
        socials: [],
        experience: [],
        education: [],
        testimonials: [],
        settings: {
          theme: "cyberpunk",
          animationsEnabled: true,
          seoTitle: "ANIKESH.OS | Developer Portfolio",
          seoDescription: "Cyberpunk Developer Portfolio",
          githubUsername: "",
        },
        stats: { repos: 0, commits: 0, prs: 0 },
      });
      setResetConfirmation("");
      showModal("System Reset Complete", "System has been reset. Please hit 'Save Changes' to apply.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">
            System Config
          </h2>
          <p className="text-white/40 text-sm font-mono">
            Global settings and integrations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Monitor size={16} className="text-neon-cyan" /> Appearance
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Theme / Base Color System
              </label>
              <select
                value={data.settings.theme}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: { ...data.settings, theme: e.target.value },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 appearance-none"
              >
                <option value="cyberpunk">Cyberpunk (Dark + Neon)</option>
                <option value="dark">Deep Space (Pure Dark)</option>
                <option value="light" disabled>
                  Light Mode (Unavailable)
                </option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-3 bg-black/30 border border-white/5 rounded hover:bg-black/50 transition-colors">
              <input
                type="checkbox"
                checked={data.settings.animationsEnabled}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      animationsEnabled: e.target.checked,
                    },
                  })
                }
                className="accent-neon-cyan w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="block text-sm font-mono text-white">
                  Enable Particles & Animations
                </span>
                <span className="block text-xs text-white/30">
                  May affect performance on low-end nodes
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* SEO / Meta */}
        <div className="bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Globe size={16} className="text-electric-purple" /> SEO / Meta Data
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Global Site Title
              </label>
              <input
                type="text"
                value={data.settings.seoTitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: { ...data.settings, seoTitle: e.target.value },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Global Meta Description
              </label>
              <textarea
                rows={3}
                value={data.settings.seoDescription}
                onChange={(e) =>
                  setData({
                    ...data,
                    settings: {
                      ...data.settings,
                      seoDescription: e.target.value,
                    },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="md:col-span-2 bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Globe size={16} className="text-neon-cyan" /> Resume Management
          </h3>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-white/60 font-mono">
                Upload your latest resume in PDF format. This will be available
                for download on the main portfolio page.
              </p>
              {data.settings.resumeUrl && (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-mono text-neon-cyan/80 bg-neon-cyan/10 border border-neon-cyan/20 p-2 rounded inline-flex items-center gap-2 w-fit">
                    ✓ Current Resume:{" "}
                    <a
                      href={data.settings.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-white"
                    >
                      resume.pdf
                    </a>
                  </div>
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        settings: { ...data.settings, resumeUrl: undefined },
                      })
                    }
                    className="text-xs font-mono text-red-400 hover:text-red-300 bg-red-400/10 border border-red-400/20 px-2 py-1.5 rounded transition-colors w-fit"
                  >
                    Delete / Hide Resume
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1">
              <form
                action={async (formData) => {
                  const { uploadResume } = await import("@/app/actions");
                  const res = await uploadResume(formData);
                  if (res.success) {
                    setData({
                      ...data,
                      settings: { ...data.settings, resumeUrl: "/resume.pdf" },
                    });
                    showModal("Upload Success", "Resume uploaded successfully!");
                  } else {
                    showModal("Upload Error", "Failed to upload: " + res.error);
                  }
                }}
                className="flex flex-col gap-3 w-full"
              >
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  required
                  className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-mono file:bg-neon-cyan/20 file:text-neon-cyan hover:file:bg-neon-cyan/30 cursor-pointer"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-md hover:bg-neon-cyan/20 transition-colors shadow-[0_0_15px_rgba(0,245,255,0.1)] text-sm font-mono w-fit"
                >
                  Upload PDF
                </button>
                <p className="text-[10px] text-white/30 italic">
                  Note: File uploads to the local server work during dev/build.
                  On Vercel, this is read-only.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* System Analytics Stats */}
        <div className="md:col-span-2 bg-[#0B1220]/50 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-orbitron font-bold text-white/70 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Monitor size={16} className="text-neon-cyan" /> System Analytics Stats
          </h3>
          <p className="text-sm text-white/60 font-mono mb-4">
            Enter a GitHub username to automatically fetch stats, or manually override the numbers below if auto-sync is disabled.
          </p>
          <div className="mb-6">
            <label className="block text-xs font-mono text-white/50 mb-1">
              GitHub Username (Auto-Sync)
            </label>
            <input
              type="text"
              value={data.settings.githubUsername || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  settings: { ...data.settings, githubUsername: e.target.value },
                })
              }
              placeholder="e.g. Anikesh07"
              className="w-full md:w-1/2 bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Total Repos
              </label>
              <input
                type="number"
                value={data.stats?.repos || 0}
                disabled={!!data.settings.githubUsername}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats!, repos: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Total Commits
              </label>
              <input
                type="number"
                value={data.stats?.commits || 0}
                disabled={!!data.settings.githubUsername}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats!, commits: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/50 mb-1">
                Pull Requests
              </label>
              <input
                type="number"
                value={data.stats?.prs || 0}
                disabled={!!data.settings.githubUsername}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats!, prs: parseInt(e.target.value) || 0 },
                  })
                }
                className="w-full bg-black/50 border border-white/10 rounded p-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="md:col-span-2 bg-black/40 border border-red-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
          <h3 className="text-sm font-orbitron font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield size={16} /> Security Settings
          </h3>
          <p className="text-sm text-white/60 font-mono mb-4">
            Admin access is currently protected via secure HTTP-only cookies.
            Credentials are stored in `.env.local` and never exposed to the
            client.
          </p>
          <button
            disabled
            className="px-4 py-2 bg-white/5 text-white/30 border border-white/10 rounded text-sm cursor-not-allowed"
          >
            Change Admin Password (CLI Only)
          </button>
        </div>

        {/* Danger Zone */}
        <div className="md:col-span-2 bg-black/40 border border-red-500/40 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
          <h3 className="text-sm font-orbitron font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertTriangle size={16} /> Danger Zone
          </h3>
          <p className="text-sm text-white/60 font-mono mb-4">
            This action will wipe all your configured portfolio data, including projects, skills, and about sections. This cannot be undone once saved.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/50 mb-2">
                Type <span className="text-red-400 font-bold">"I want to reset this"</span> to confirm:
              </label>
              <input
                type="text"
                value={resetConfirmation}
                onChange={(e) => setResetConfirmation(e.target.value)}
                placeholder="I want to reset this"
                className="w-full md:w-1/2 bg-black/50 border border-red-500/30 rounded p-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              onClick={handleReset}
              disabled={resetConfirmation !== "I want to reset this"}
              className="px-6 py-2.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded-md font-orbitron font-bold tracking-widest text-sm hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              RESET SYSTEM
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
      >
        <p className="text-white/70 font-mono text-sm">{modalState.message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setModalState({ ...modalState, isOpen: false })}
            className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded hover:bg-neon-cyan hover:text-black transition-colors font-orbitron text-sm tracking-wider"
          >
            ACKNOWLEDGE
          </button>
        </div>
      </Modal>
    </div>
  );
}
