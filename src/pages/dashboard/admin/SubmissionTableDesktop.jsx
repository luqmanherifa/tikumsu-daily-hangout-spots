export default function SubmissionTableDesktop({
  submissions,
  onViewDetail,
  onApprove,
  onReject,
}) {
  return (
    <div className="hidden sm:block bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Nama Spot
              </th>
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Deskripsi
              </th>
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Lokasi
              </th>
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Oleh
              </th>
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Status
              </th>
              <th className="font-body font-semibold text-xs text-left px-4 py-3 tracking-wide text-slate-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, index) => (
              <tr
                key={s.id}
                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                  index === submissions.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="font-body px-4 py-3">
                  <div className="font-semibold text-deepolive text-sm tracking-wide mb-1">
                    {s.name}
                  </div>
                  {s.wifi === "Ada" && (
                    <span className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
                      WiFi
                    </span>
                  )}
                </td>
                <td className="font-body px-4 py-3 text-slate-600 text-sm tracking-wide max-w-xs">
                  <div className="line-clamp-2">{s.description}</div>
                </td>
                <td className="font-body px-4 py-3 text-slate-600 text-sm tracking-wide">
                  <div className="line-clamp-1">📍 {s.location}</div>
                </td>
                <td className="font-body px-4 py-3 text-slate-600 text-sm tracking-wide">
                  <div className="line-clamp-1">{s.createdByEmail ?? "-"}</div>
                </td>
                <td className="font-body px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide inline-block ${
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
                </td>
                <td className="font-body px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetail(s)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:border-softolive hover:text-softolive transition-colors tracking-wide"
                    >
                      Detail
                    </button>

                    <button
                      onClick={() => onApprove(s)}
                      disabled={s.status === "approved"}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors tracking-wide ${
                        s.status === "approved"
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                          : "bg-green-600 text-white hover:bg-green-700 border border-green-600"
                      }`}
                    >
                      Setuju
                    </button>

                    <button
                      onClick={() => onReject(s.id)}
                      disabled={s.status === "rejected"}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors tracking-wide ${
                        s.status === "rejected"
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                          : "bg-red-600 text-white hover:bg-red-700 border border-red-600"
                      }`}
                    >
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}