import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: PaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-white/10 pt-4">
      <div className="text-xs text-white/50 font-inter">
        Showing{" "}
        <span className="text-white">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="text-white">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="text-white">{totalItems}</span> entries
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-neon-cyan"
          >
            {[5, 10, 25, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-1 rounded bg-black/40 border border-white/5 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/50 disabled:opacity-30 disabled:hover:text-white/50 disabled:hover:border-white/5 transition-colors"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded bg-black/40 border border-white/5 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/50 disabled:opacity-30 disabled:hover:text-white/50 disabled:hover:border-white/5 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs font-mono px-3 text-white/80">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-black/40 border border-white/5 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/50 disabled:opacity-30 disabled:hover:text-white/50 disabled:hover:border-white/5 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-black/40 border border-white/5 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/50 disabled:opacity-30 disabled:hover:text-white/50 disabled:hover:border-white/5 transition-colors"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
