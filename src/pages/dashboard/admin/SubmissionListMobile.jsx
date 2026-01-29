export default function SubmissionListMobile({
  submissions,
  onViewDetail,
  onApprove,
  onReject,
}) {
  return (
    <div className="sm:hidden space-y-3">
      {submissions.map((s) => (
        <div
          key={s.id}
          className="bg-white border border-slate-200 rounded-xl p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-heading font-bold text-base text-deepolive tracking-tight mb-1">
                {s.name}
              </h3>
              {s.wifi === "Ada" && (
                <span className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
                  WiFi
                </span>
              )}
            </div>
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide ml-2 ${
                s.status === "approved"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : s.status === "rejected"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {s.status === "approved"
                ? "Disetujui"
                : s.status === "rejected"
                  ? "Ditolak"
                  : "Pending"}
            </span>
          </div>

          <p className="font-body text-sm text-slate-600 mb-2 tracking-wide leading-relaxed">
            {s.description}
          </p>

          <p className="font-body text-xs text-slate-500 mb-1 tracking-wide">
            📍 {s.location}
          </p>

          <p className="font-body text-xs text-slate-500 mb-3 tracking-wide">
            Oleh: {s.createdByEmail ?? "-"}
          </p>

          <div className="flex gap-2 mb-2">
            <button
              onClick={() => onViewDetail(s)}
              className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:border-softolive hover:text-softolive transition-colors tracking-wide"
            >
              Detail
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onApprove(s)}
              disabled={s.status === "approved"}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-colors tracking-wide ${
                s.status === "approved"
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Setuju
            </button>

            <button
              onClick={() => onReject(s.id)}
              disabled={s.status === "rejected"}
              className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition-colors tracking-wide ${
                s.status === "rejected"
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Tolak
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}