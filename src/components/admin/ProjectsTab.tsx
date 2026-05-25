import { useState, useMemo } from "react";
import { PortfolioData, Project } from "@/types/portfolio";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Pin,
} from "lucide-react";
import Pagination from "./Pagination";
import Modal from "./Modal";
import { motion } from "framer-motion";

interface ProjectsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  onSyncGithub: (username: string) => Promise<void>;
  isSyncing: boolean;
}

export default function ProjectsTab({
  data,
  setData,
  onSyncGithub,
  isSyncing,
}: ProjectsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [githubUsername, setGithubUsername] = useState(
    data.socials
      ?.find((s) => s.platform.toLowerCase() === "github")
      ?.url?.split("/")
      .pop() || "",
  );

  // Modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering
  const filteredProjects = useMemo(() => {
    const filtered = data.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tech.join(" ").toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [data.projects, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject({
      id: `M-${Math.floor(Math.random() * 1000)}`,
      name: "New Project",
      description: "",
      tech: [],
      status: "IN PROGRESS",
      links: { github: "#", live: "#" },
      imageUrl: "",
      visible: true,
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    // Clean tech array
    const cleanedProject = {
      ...editingProject,
      tech:
        typeof editingProject.tech === "string"
          ? (editingProject.tech as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : editingProject.tech,
    };

    const isExisting = data.projects.some((p) => p.id === cleanedProject.id);
    const newProjects = isExisting
      ? data.projects.map((p) =>
          p.id === cleanedProject.id ? cleanedProject : p,
        )
      : [cleanedProject, ...data.projects];

    setData({ ...data, projects: newProjects });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const toggleVisibility = (id: string) => {
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, visible: p.visible === false ? true : false } : p,
      ),
    });
  };

  const togglePin = (id: string) => {
    setData({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, pinned: !p.pinned } : p,
      ),
    });
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("live") || s.includes("completed"))
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (s.includes("progress") || s.includes("sync"))
      return "bg-neon-cyan/20 text-rose-500 border-neon-cyan/30";
    if (s.includes("archived"))
      return "bg-white/10 text-gray-600 border-white/20";
    return "bg-electric-purple/20 text-green-600 border-electric-purple/30";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase">
            Mission Log
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Manage and synchronize projects
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/40 border border-white/60 rounded px-3 py-1.5 pl-9 text-sm text-gray-800 focus:outline-none focus:border-rose-400 w-48"
            />
          </div>

          <div className="flex items-center gap-2 border border-white/60 rounded p-1 bg-white/30">
            <input
              type="text"
              placeholder="GitHub User"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="bg-transparent border-none text-xs text-gray-800 px-2 py-1 w-24 focus:outline-none"
            />
            <button
              onClick={() => onSyncGithub(githubUsername)}
              disabled={isSyncing || !githubUsername}
              className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded disabled:opacity-50 text-gray-800 transition-colors"
            >
              <RefreshCw
                size={12}
                className={isSyncing ? "animate-spin text-rose-500" : ""}
              />{" "}
              Sync
            </button>
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 text-sm bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-rose-500 px-3 py-1.5 rounded transition-all"
          >
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white/40 backdrop-blur border border-white/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 border-b border-white/60 font-serif text-xs tracking-wider uppercase text-gray-600">
                <th className="p-4 font-normal">Visibility</th>
                <th className="p-4 font-normal">ID</th>
                <th className="p-4 font-normal">Project Name</th>
                <th className="p-4 font-normal">Category</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal">Tech</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500 font-sans text-sm"
                  >
                    NO_RECORDS_FOUND
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={project.id}
                    className="border-b border-white/40 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 w-12 text-center">
                      <button
                        onClick={() => toggleVisibility(project.id)}
                        className={`p-1.5 rounded-md transition-colors ${project.visible !== false ? "bg-neon-cyan/10 text-rose-500 border border-neon-cyan/20" : "bg-white/40 text-gray-400 border border-white/60"}`}
                      >
                        {project.visible !== false ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}
                      </button>
                    </td>
                    <td className="p-4 font-sans text-xs text-gray-500">
                      {project.id}
                    </td>
                    <td className="p-4 font-bold text-gray-800 group-hover:text-rose-500 transition-colors">
                      {project.name}
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-sans border border-electric-purple/30 bg-electric-purple/10 text-green-600 px-2 py-0.5 rounded">
                        {project.category || "AUTO"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-serif border px-2 py-0.5 rounded ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-gray-800/60 truncate max-w-[150px]">
                      {project.tech.slice(0, 3).join(", ")}
                      {project.tech.length > 3 &&
                        ` +${project.tech.length - 3}`}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => togglePin(project.id)}
                          className={`p-1.5 rounded transition-all ${project.pinned ? "bg-neon-cyan/20 text-rose-500 border border-neon-cyan/30" : "bg-white/30 border border-white/40 text-gray-800/60 hover:text-gray-800 hover:border-white/20"}`}
                          title={project.pinned ? "Unpin Project" : "Pin Project"}
                        >
                          <Pin size={14} className={project.pinned ? "fill-rose-500" : ""} />
                        </button>
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-1.5 rounded bg-white/30 border border-white/40 text-gray-800/60 hover:text-gray-800 hover:border-white/20 transition-all"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded bg-white/30 border border-white/40 text-red-400/70 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(n) => {
              setItemsPerPage(n);
              setCurrentPage(1);
            }}
            totalItems={filteredProjects.length}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingProject?.id.startsWith("M-")
            ? "Create New Project"
            : `Edit Project: ${editingProject?.name}`
        }
      >
        {editingProject && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  Project ID
                </label>
                <input
                  type="text"
                  value={editingProject.id}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, id: e.target.value })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1">
                Important Details / Technical Specs
              </label>
              <textarea
                rows={3}
                value={editingProject.importantDetails || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    importantDetails: e.target.value,
                  })
                }
                placeholder="Optional deep dive details..."
                className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1">
                Project Image URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={editingProject.imageUrl || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    imageUrl: e.target.value,
                  })
                }
                className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={editingProject.category || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      category: e.target.value || undefined,
                    })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400 appearance-none"
                >
                  <option value="">Auto (Infer from Tech)</option>
                  <option value="WEB">WEB</option>
                  <option value="AI">AI</option>
                  <option value="UI">UI/UX</option>
                  <option value="EXP">EXP</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  value={editingProject.status}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      status: e.target.value,
                    })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={
                  typeof editingProject.tech === "string"
                    ? editingProject.tech
                    : editingProject.tech.join(", ")
                }
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tech: e.target.value as any,
                  })
                }
                className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  GitHub Link
                </label>
                <input
                  type="text"
                  value={editingProject.links.github}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      links: {
                        ...editingProject.links,
                        github: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-gray-600 mb-1">
                  Live Link
                </label>
                <input
                  type="text"
                  value={editingProject.links.live}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      links: { ...editingProject.links, live: e.target.value },
                    })
                  }
                  className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/30 border border-white/40 rounded hover:bg-white/40 transition-colors">
                <input
                  type="checkbox"
                  checked={editingProject.pinned || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      pinned: e.target.checked,
                    })
                  }
                  className="accent-neon-cyan w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-sans text-gray-800">
                    Pin Project
                  </span>
                  <span className="block text-[10px] text-gray-500">
                    Show first in public view
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/30 border border-white/40 rounded hover:bg-white/40 transition-colors">
                <input
                  type="checkbox"
                  checked={editingProject.hideCode || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      hideCode: e.target.checked,
                    })
                  }
                  className="accent-neon-cyan w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="block text-sm font-sans text-gray-800">
                    Hide Source Code
                  </span>
                  <span className="block text-[10px] text-gray-500">
                    Disable GitHub and code links
                  </span>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-white/60">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded text-sm text-gray-700 hover:text-gray-800 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-6 py-2 rounded text-sm font-bold bg-neon-cyan/20 text-rose-500 border border-rose-400 hover:bg-neon-cyan/30 transition-all shadow-[0_0_10px_rgba(0,245,255,0.1)]"
              >
                Apply Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
