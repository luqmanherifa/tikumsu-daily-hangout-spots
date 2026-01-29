export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8 max-sm:grid-cols-2 max-sm:gap-3">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4">
        <p className="font-body text-xs text-slate-600 mb-1 tracking-wide">
          Total
        </p>
        <p className="font-heading font-bold text-2xl text-deepolive tracking-tight">
          {stats.total}
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
        <p className="font-body text-xs text-amber-800 mb-1 tracking-wide">
          Menunggu
        </p>
        <p className="font-heading font-bold text-2xl text-amber-700 tracking-tight">
          {stats.pending}
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
        <p className="font-body text-xs text-green-800 mb-1 tracking-wide">
          Disetujui
        </p>
        <p className="font-heading font-bold text-2xl text-green-700 tracking-tight">
          {stats.approved}
        </p>
      </div>
      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
        <p className="font-body text-xs text-red-800 mb-1 tracking-wide">
          Ditolak
        </p>
        <p className="font-heading font-bold text-2xl text-red-700 tracking-tight">
          {stats.rejected}
        </p>
      </div>
    </div>
  );
}
