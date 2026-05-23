"use client";

import { useState } from "react";
import { PortfolioData, Education } from "@/types/portfolio";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  EyeOff,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";

interface EducationTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function EducationTab({ data, setData }: EducationTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Education>>({});

  const handleAdd = () => {
    const newEd: Education = {
      id: "edu_" + Date.now().toString(),
      degree: "New Degree / Certification",
      institution: "Institution Name",
      timeline: "YYYY - YYYY",
      summary: "Description of studies or achievements...",
      visible: true,
    };

    setData({
      ...data,
      education: [...(data.education || []), newEd],
    });

    setEditingId(newEd.id);
    setEditForm(newEd);
  };

  const handleSave = () => {
    if (!editingId) return;

    setData({
      ...data,
      education: data.education.map((ed) =>
        ed.id === editingId ? ({ ...ed, ...editForm } as Education) : ed,
      ),
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    setData({
      ...data,
      education: data.education.filter((ed) => ed.id !== id),
    });
  };

  const handleToggleVisible = (id: string, currentVisible: boolean) => {
    setData({
      ...data,
      education: data.education.map((ed) =>
        ed.id === id ? { ...ed, visible: !currentVisible } : ed,
      ),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800 tracking-widest uppercase flex items-center gap-2">
            <BookOpen className="text-green-600" /> Academic Records
          </h2>
          <p className="text-gray-500 text-sm font-sans">
            Manage education and certification history
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/30 text-green-600 rounded-md hover:bg-electric-purple/20 transition-colors shadow-[0_0_15px_rgba(160,32,240,0.1)] text-sm font-sans"
        >
          <Plus size={16} /> Add Record
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {!data.education || data.education.length === 0 ? (
          <div className="bg-white/40 border border-white/60 rounded-xl p-8 text-center">
            <GraduationCap className="mx-auto text-gray-800/20 mb-3" size={32} />
            <p className="text-gray-500 font-sans text-sm">
              No academic records found.
            </p>
          </div>
        ) : (
          data.education.map((ed) => (
            <div
              key={ed.id}
              className={`bg-white/40 backdrop-blur border rounded-xl overflow-hidden transition-all ${ed.visible !== false ? "border-electric-purple/20" : "border-white/40 opacity-60"}`}
            >
              {editingId === ed.id ? (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-gray-600 mb-1">
                        Degree / Certification
                      </label>
                      <input
                        type="text"
                        value={editForm.degree || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, degree: e.target.value })
                        }
                        className="w-full bg-white/40 border border-white/60 rounded p-2 text-sm text-gray-800 focus:outline-none focus:border-electric-purple/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-gray-600 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={editForm.institution || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            institution: e.target.value,
                          })
                        }
                        className="w-full bg-white/40 border border-white/60 rounded p-2 text-sm text-gray-800 focus:outline-none focus:border-electric-purple/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-sans text-gray-600 mb-1">
                        Timeline (e.g., 2020 - 2024)
                      </label>
                      <input
                        type="text"
                        value={editForm.timeline || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, timeline: e.target.value })
                        }
                        className="w-full bg-white/40 border border-white/60 rounded p-2 text-sm text-gray-800 focus:outline-none focus:border-electric-purple/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-sans text-gray-600 mb-1">
                        Summary / Achievements
                      </label>
                      <textarea
                        value={editForm.summary || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, summary: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-white/40 border border-white/60 rounded p-2 text-sm text-gray-800 focus:outline-none focus:border-electric-purple/50 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/60">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-sans text-gray-800/60 hover:text-gray-800 transition-colors"
                    >
                      <X size={14} /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-sans bg-electric-purple text-gray-800 rounded hover:bg-electric-purple/80 transition-colors shadow-[0_0_10px_rgba(160,32,240,0.5)]"
                    >
                      <Check size={14} /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-serif font-bold text-lg ${ed.visible !== false ? "text-gray-800" : "text-gray-600"}`}
                      >
                        {ed.degree}
                      </h3>
                      {ed.visible === false && (
                        <span className="text-[10px] font-sans bg-white/10 text-gray-800/60 px-2 py-0.5 rounded">
                          HIDDEN
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                      <span className="flex items-center gap-1.5 text-green-600">
                        <GraduationCap size={14} /> {ed.institution}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500 font-sans">
                        <Calendar size={14} /> {ed.timeline}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-800/60 line-clamp-2 pr-4">
                      {ed.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() =>
                        handleToggleVisible(ed.id, ed.visible !== false)
                      }
                      className="p-2 bg-white/30 border border-white/40 rounded text-gray-600 hover:text-gray-800 transition-colors"
                      title={
                        ed.visible !== false
                          ? "Hide on profile"
                          : "Show on profile"
                      }
                    >
                      {ed.visible !== false ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(ed.id);
                        setEditForm(ed);
                      }}
                      className="p-2 bg-white/30 border border-white/40 rounded text-gray-600 hover:text-rose-500 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(ed.id)}
                      className="p-2 bg-white/30 border border-white/40 rounded text-gray-600 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
