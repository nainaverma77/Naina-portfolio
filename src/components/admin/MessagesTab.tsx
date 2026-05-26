"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Download,
  RefreshCw,
  AlertCircle,
  Trash2,
  Eye,
} from "lucide-react";
import { Message } from "@/types/portfolio";
import { fetchMessages, removeContactMessage } from "@/app/actions";
import Pagination from "./Pagination";
import Modal from "./Modal";

export default function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchMessages();
      if (res.success && res.data) {
        setMessages(
          res.data.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          ),
        );
      } else {
        setError(res.error || "Failed to load messages");
      }
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMessages();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadMessages]);

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessageToDelete(id);
  };

  const confirmDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await removeContactMessage(id);
      if (res.success) {
        setMessages(messages.filter((m) => m.id !== id));
      } else {
        setError(res.error || "Failed to delete message");
      }
    } catch (error) {
      setError("Error deleting message");
    } finally {
      setDeletingId(null);
      setMessageToDelete(null);
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) return;

    const headers = ["Date", "Name", "Email", "Message"];
    const rows = messages.map((msg) => [
      new Date(msg.timestamp).toLocaleString().replace(/,/g, ""),
      `"${msg.name.replace(/"/g, '""')}"`,
      `"${msg.email.replace(/"/g, '""')}"`,
      `"${msg.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `anikesh_os_messages_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const paginatedMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Mail className="text-rose-500" /> Secure Inbox
          </h2>
          <p className="text-gray-600 font-sans text-sm">
            Review direct messages from the comm-link.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={loadMessages}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-white/60 rounded-md text-gray-700 hover:text-gray-800 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            onClick={handleExportCSV}
            disabled={messages.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-rose-500 rounded-md hover:bg-neon-cyan/20 transition-colors shadow-[0_0_15px_rgba(0,245,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="cyber-border bg-dark-gray/50 border-white/60 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center text-rose-500">
            <RefreshCw size={24} className="animate-spin" />
          </div>
        ) : error ? (
          <div className="p-12 flex flex-col items-center justify-center text-red-400 gap-3">
            <AlertCircle size={32} />
            <p>{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-sans">
            <p>No transmissions intercepted yet.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col h-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/30 border-b border-white/60 font-serif text-xs tracking-widest text-gray-600 uppercase">
                    <th className="p-4 pl-6 font-normal">Timestamp</th>
                    <th className="p-4 font-normal">Identity</th>
                    <th className="p-4 font-normal">Vector (Email)</th>
                    <th className="p-4 font-normal w-1/2">Payload (Snippet)</th>
                    <th className="p-4 pr-6 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-inter text-sm divide-y divide-white/10">
                  {paginatedMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className="hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <td className="p-4 pl-6 text-gray-500 font-sans text-xs whitespace-nowrap">
                        {new Date(msg.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-800/90 font-medium">
                        {msg.name}
                      </td>
                      <td
                        className="p-4 text-rose-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:underline"
                        >
                          {msg.email}
                        </a>
                      </td>
                      <td className="p-4 text-gray-700">
                        <div className="line-clamp-1 group-hover:text-gray-800 transition-colors duration-300">
                          {msg.message}
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 lg:opacity-100 group-hover:opacity-100 transition-opacity">
                          <button
                            className="text-gray-600 hover:text-rose-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMessage(msg);
                            }}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(msg.id, e)}
                            className="text-gray-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/20">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(num) => {
                  setItemsPerPage(num);
                  setCurrentPage(1);
                }}
                totalItems={messages.length}
              />
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="TRANSMISSION DETAILS"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/30 p-4 rounded-md border border-white/40">
                <p className="text-[10px] font-serif tracking-widest text-gray-500 uppercase mb-1">
                  Identity
                </p>
                <p className="text-gray-800/90 font-medium">
                  {selectedMessage.name}
                </p>
              </div>
              <div className="bg-white/30 p-4 rounded-md border border-white/40">
                <p className="text-[10px] font-serif tracking-widest text-gray-500 uppercase mb-1">
                  Timestamp
                </p>
                <p className="text-gray-700 font-sans text-sm">
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white/30 p-4 rounded-md border border-white/40">
              <p className="text-[10px] font-serif tracking-widest text-gray-500 uppercase mb-1">
                Return Vector
              </p>
              <a
                href={`mailto:${selectedMessage.email}`}
                className="text-rose-500 hover:underline"
              >
                {selectedMessage.email}
              </a>
            </div>

            <div className="bg-white/30 p-4 rounded-md border border-white/40">
              <p className="text-[10px] font-serif tracking-widest text-gray-500 uppercase mb-2">
                Decrypted Payload
              </p>
              <p className="text-gray-800/80 whitespace-pre-wrap font-inter leading-relaxed">
                {selectedMessage.message}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!messageToDelete}
        onClose={() => !deletingId && setMessageToDelete(null)}
        title="CONFIRM DELETION"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center text-center p-4">
            <AlertCircle
              size={48}
              className="text-red-500/80 mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            />
            <p className="text-gray-800/80 font-inter mb-8">
              Are you sure you want to permanently delete this intercepted
              transmission?
              <br />
              <span className="text-red-400/80 text-sm">
                This action cannot be undone.
              </span>
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setMessageToDelete(null)}
                disabled={!!deletingId}
                className="flex-1 py-3 px-4 border border-white/60 rounded-md text-gray-700 hover:text-gray-800 hover:bg-white/5 transition-colors font-sans uppercase text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  messageToDelete && confirmDelete(messageToDelete)
                }
                disabled={!!deletingId}
                className="flex-1 py-3 px-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/20 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.1)] font-sans uppercase text-sm disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {!!deletingId ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    DELETING...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    CONFIRM DELETE
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
