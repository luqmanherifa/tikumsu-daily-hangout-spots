export default function FilterTabs({ filter, onFilterChange, stats }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 max-sm:gap-1.5">
      <button
        onClick={() => onFilterChange("all")}
        className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
          filter === "all"
            ? "bg-softolive text-white"
            : "bg-white text-slate-600 border border-slate-300 hover:border-softolive"
        }`}
      >
        Semua ({stats.total})
      </button>
      <button
        onClick={() => onFilterChange("pending")}
        className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
          filter === "pending"
            ? "bg-amber-500 text-white"
            : "bg-white text-slate-600 border border-slate-300 hover:border-amber-500"
        }`}
      >
        Menunggu ({stats.pending})
      </button>
      <button
        onClick={() => onFilterChange("approved")}
        className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
          filter === "approved"
            ? "bg-green-600 text-white"
            : "bg-white text-slate-600 border border-slate-300 hover:border-green-600"
        }`}
      >
        Disetujui ({stats.approved})
      </button>
      <button
        onClick={() => onFilterChange("rejected")}
        className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
          filter === "rejected"
            ? "bg-red-600 text-white"
            : "bg-white text-slate-600 border border-slate-300 hover:border-red-600"
        }`}
      >
        Ditolak ({stats.rejected})
      </button>
    </div>
  );
}
