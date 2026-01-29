export default function AdminDetailModal({
  submission,
  onClose,
  onApprove,
  onReject,
  formConfig,
}) {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 border border-slate-200 max-sm:p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="font-heading font-bold text-2xl text-deepolive mb-2 tracking-tight max-sm:text-xl">
              Detail Submission
            </h2>
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide inline-block ${
                submission.status === "approved"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : submission.status === "rejected"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {submission.status === "approved"
                ? "Disetujui"
                : submission.status === "rejected"
                  ? "Ditolak"
                  : "Pending"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-body font-semibold text-sm text-slate-700 mb-3 tracking-wide">
              Informasi Dasar
            </h3>
            <div className="space-y-2">
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  Nama Spot
                </p>
                <p className="font-body text-sm text-deepolive tracking-wide">
                  {submission.name}
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  Deskripsi
                </p>
                <p className="font-body text-sm text-slate-600 tracking-wide leading-relaxed">
                  {submission.description}
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  Lokasi
                </p>
                <p className="font-body text-sm text-slate-600 tracking-wide">
                  📍 {submission.location}
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  Disubmit oleh
                </p>
                <p className="font-body text-sm text-slate-600 tracking-wide">
                  {submission.createdByEmail ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-body font-semibold text-sm text-slate-700 mb-3 tracking-wide">
              Fasilitas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  WiFi
                </p>
                <p className="font-body text-sm text-slate-600 tracking-wide">
                  {submission.wifi || "-"}
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                  Stopkontak
                </p>
                <p className="font-body text-sm text-slate-600 tracking-wide">
                  {submission.stopkontak || "-"}
                </p>
              </div>
            </div>
          </div>

          {formConfig.map((field) => {
            const value = submission[field.key];
            if (!value || (Array.isArray(value) && value.length === 0))
              return null;

            return (
              <div
                key={field.key}
                className="border-b border-slate-200 pb-4 last:border-b-0"
              >
                <h3 className="font-body font-semibold text-sm text-slate-700 mb-1 tracking-wide">
                  {field.label}
                </h3>
                <p className="font-body text-xs text-slate-500 tracking-wide mb-2">
                  {field.question}
                </p>
                {Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-1.5">
                    {value.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md tracking-wide border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-sm text-slate-600 tracking-wide">
                    {value}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 pt-5 border-t border-slate-200 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-slate-300 text-slate-700 font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors tracking-wide"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onApprove(submission);
              onClose();
            }}
            disabled={submission.status === "approved"}
            className={`flex-1 font-body font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors tracking-wide ${
              submission.status === "approved"
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Setuju
          </button>
          <button
            onClick={() => {
              onReject(submission.id);
              onClose();
            }}
            disabled={submission.status === "rejected"}
            className={`flex-1 font-body font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors tracking-wide ${
              submission.status === "rejected"
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
}
