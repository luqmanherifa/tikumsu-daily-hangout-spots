export default function AdminEmptyState({ filter }) {
  return (
    <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
      <div className="text-5xl mb-3">📋</div>
      <p className="font-heading font-bold text-xl text-deepolive mb-2 tracking-tight">
        Tidak ada submission
      </p>
      <p className="font-body text-sm text-slate-600 tracking-wide">
        {filter === "all"
          ? "Belum ada submission masuk"
          : `Tidak ada submission dengan status ${
              filter === "pending"
                ? "pending"
                : filter === "approved"
                  ? "disetujui"
                  : "ditolak"
            }`}
      </p>
    </div>
  );
}
