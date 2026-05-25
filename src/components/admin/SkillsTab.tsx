import { useState, useMemo } from "react";
import { PortfolioData, Skill } from "@/types/portfolio";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import Pagination from "./Pagination";
import Modal from "./Modal";
import { motion } from "framer-motion";

interface SkillsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function SkillsTab({ data, setData }: SkillsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [editingSkill, setEditingSkill] = useState<{
    skill: Skill;
    index: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering
  const filteredSkills = useMemo(() => {
    return data.skills.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data.skills, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (skill: Skill, realIndex: number) => {
    setEditingSkill({ skill: { ...skill }, index: realIndex });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingSkill({
      skill: { name: "", level: 50 },
      index: -1,
    });
    setIsModalOpen(true);
  };

  const handleSaveSkill = () => {
    if (!editingSkill) return;

    const newSkills = [...data.skills];
    if (editingSkill.index >= 0) {
      newSkills[editingSkill.index] = editingSkill.skill;
    } else {
      newSkills.unshift(editingSkill.skill); // Add to beginning
    }

    setData({ ...data, skills: newSkills });
    setIsModalOpen(false);
  };

  const handleDelete = (realIndex: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(realIndex, 1);
    setData({ ...data, skills: newSkills });
  };

  // Find original index in data.skills for operations
  const getOriginalIndex = (skill: Skill) =>
    data.skills.findIndex((s) => s === skill);

  const toggleVisibility = (realIndex: number) => {
    const newSkills = [...data.skills];
    newSkills[realIndex] = {
      ...newSkills[realIndex],
      visible: newSkills[realIndex].visible === false ? true : false,
    };
    setData({ ...data, skills: newSkills });
  };

  const loadDefaultSkills = () => {
    const defaultSkills = [
      { name: "React / Next.js", level: 90, visible: true },
      { name: "TypeScript", level: 85, visible: true },
      { name: "Node.js", level: 80, visible: true },
      { name: "Tailwind CSS", level: 95, visible: true },
      { name: "Python", level: 75, visible: false },
      { name: "Docker", level: 70, visible: false },
      { name: "Figma", level: 60, visible: false },
      { name: "SQL / PostgreSQL", level: 85, visible: false },
    ];
    setData({ ...data, skills: defaultSkills });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase">
            Core Modules
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Manage technical proficiencies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500"
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/40 border border-white/60 rounded px-3 py-1.5 pl-9 text-sm text-gray-800 focus:outline-none focus:border-rose-400 w-48 lg:w-64"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 text-sm bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/30 text-rose-500 px-3 py-1.5 rounded transition-all"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="bg-white/40 backdrop-blur border border-white/60 rounded-xl p-6 min-h-[500px] flex flex-col justify-between">
        {paginatedSkills.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 font-sans text-sm gap-6">
            <span>NO_MODULES_FOUND</span>
            <button
              onClick={loadDefaultSkills}
              className="px-6 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-rose-500 rounded-md hover:bg-neon-cyan/20 transition-all font-serif text-sm tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.1)]"
            >
              LOAD DEFAULT MODULES
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedSkills.map((skill, i) => {
              const origIndex = getOriginalIndex(skill);
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={`${skill.name}-${i}`}
                  className={`bg-white/30 border border-white/40 rounded-lg p-4 group transition-all relative overflow-hidden ${
                    skill.visible === false ? "opacity-40 grayscale hover:opacity-70" : "hover:border-white/20"
                  }`}
                >
                  {/* Power Bar Background */}
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neon-cyan/50 to-electric-purple/50 opacity-20"
                    style={{ width: `${skill.level}%` }}
                  />

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-bold text-gray-800 tracking-wider truncate pr-4">
                      {skill.name}
                    </h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 bg-white/80 rounded p-1">
                      <button
                        onClick={() => toggleVisibility(origIndex)}
                        className={`p-1 transition-colors ${skill.visible !== false ? "text-rose-500/50 hover:text-rose-500" : "text-gray-400 hover:text-gray-800"}`}
                      >
                        {skill.visible !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>
                      <button
                        onClick={() => handleEdit(skill, origIndex)}
                        className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(origIndex)}
                        className="p-1 text-red-400/50 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-gray-500">
                      Proficiency
                    </span>
                    <span className="text-xs font-sans text-rose-500">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/40 rounded-full h-1.5 mt-2 border border-white/40 overflow-hidden">
                    <div
                      className="bg-neon-cyan h-1.5 rounded-full shadow-[0_0_10px_#00F5FF]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(n) => {
            setItemsPerPage(n);
            setCurrentPage(1);
          }}
          totalItems={filteredSkills.length}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingSkill?.index === -1
            ? "Initialize New Module"
            : `Edit Module: ${editingSkill?.skill.name}`
        }
      >
        {editingSkill && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1">
                Module Designation (Name)
              </label>
              <input
                type="text"
                value={editingSkill.skill.name}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    skill: { ...editingSkill.skill, name: e.target.value },
                  })
                }
                className="w-full bg-white/40 border border-white/60 rounded p-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400"
              />
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/30 border border-white/40 rounded hover:bg-white/40 transition-colors w-fit">
              <input
                type="checkbox"
                checked={editingSkill.skill.visible !== false}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    skill: { ...editingSkill.skill, visible: e.target.checked },
                  })
                }
                className="accent-neon-cyan w-4 h-4 cursor-pointer"
              />
              <span className="block text-sm font-sans text-gray-800/80">
                Visible on Portfolio
              </span>
            </label>

            <div>
              <label className="block text-xs font-sans text-gray-600 mb-1 flex justify-between">
                <span>Power Level</span>
                <span className="text-rose-500">
                  {editingSkill.skill.level}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={editingSkill.skill.level}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    skill: {
                      ...editingSkill.skill,
                      level: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full accent-neon-cyan cursor-pointer bg-gray-300 rounded-full h-2 shadow-inner appearance-auto"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-white/60">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded text-sm text-gray-700 hover:text-gray-800 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSkill}
                disabled={!editingSkill.skill.name.trim()}
                className="px-6 py-2 rounded text-sm font-bold bg-neon-cyan/20 text-rose-500 border border-rose-400 hover:bg-neon-cyan/30 transition-all shadow-[0_0_10px_rgba(0,245,255,0.1)] disabled:opacity-50"
              >
                Save Module
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
