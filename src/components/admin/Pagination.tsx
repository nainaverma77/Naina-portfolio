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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-white/60 pt-4">
      <div className="text-xs text-gray-600 font-inter">
        Showing{" "}
        <span className="text-gray-800">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="text-gray-800">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="text-gray-800">{totalItems}</span> entries
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-white/40 border border-white/60 rounded px-2 py-1 text-xs text-gray-800 outline-none focus:border-neon-cyan"
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
            className="p-1 rounded bg-white/30 border border-white/40 text-gray-600 hover:text-rose-500 hover:border-rose-400 disabled:opacity-30 disabled:hover:text-gray-600 disabled:hover:border-white/40 transition-colors"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded bg-white/30 border border-white/40 text-gray-600 hover:text-rose-500 hover:border-rose-400 disabled:opacity-30 disabled:hover:text-gray-600 disabled:hover:border-white/40 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs font-sans px-3 text-gray-800/80">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-white/30 border border-white/40 text-gray-600 hover:text-rose-500 hover:border-rose-400 disabled:opacity-30 disabled:hover:text-gray-600 disabled:hover:border-white/40 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded bg-white/30 border border-white/40 text-gray-600 hover:text-rose-500 hover:border-rose-400 disabled:opacity-30 disabled:hover:text-gray-600 disabled:hover:border-white/40 transition-colors"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
