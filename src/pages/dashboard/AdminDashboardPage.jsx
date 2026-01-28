import { useEffect, useState } from "react";
import {
  fetchSpotSubmissions,
  approveSpotSubmission,
  rejectSpotSubmission,
} from "../../services/adminSubmissionService";

const FORM_CONFIG = [
  {
    key: "kebutuhan",
    label: "Kebutuhan",
    question: "Tempat ini biasanya digunakan untuk apa?",
    type: "multi",
  },
  {
    key: "waktu",
    label: "Waktu",
    question: "Waktu yang paling sesuai untuk tempat ini?",
    type: "multi",
  },
  {
    key: "suasana",
    label: "Suasana",
    question: "Bagaimana suasana tempat ini secara umum?",
    type: "single",
  },
  {
    key: "durasi",
    label: "Durasi",
    question: "Berapa lama biasanya orang berada di tempat ini?",
    type: "single",
  },
  {
    key: "biaya",
    label: "Biaya",
    question: "Bagaimana perkiraan biaya di tempat ini?",
    type: "single",
  },
  {
    key: "aktivitas",
    label: "Aktivitas",
    question: "Aktivitas apa yang paling sesuai di tempat ini?",
    type: "multi",
  },
  {
    key: "kepadatan",
    label: "Kepadatan",
    question: "Seberapa padat tempat ini biasanya?",
    type: "single",
  },
  {
    key: "fleksibilitas",
    label: "Fleksibilitas",
    question: "Seberapa praktis tempat ini untuk datang dan pergi?",
    type: "single",
  },
  {
    key: "polaKunjungan",
    label: "Pola Kunjungan",
    question: "Bagaimana pola kunjungan yang umum di tempat ini?",
    type: "single",
  },
  {
    key: "kenyamanan",
    label: "Kenyamanan",
    question: "Bagaimana tingkat kenyamanan untuk duduk dan beraktivitas?",
    type: "single",
  },
  {
    key: "tipeKunjungan",
    label: "Tipe Kunjungan",
    question: "Tempat ini masuk akal untuk berapa orang?",
    type: "multi",
  },
];

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [detailModal, setDetailModal] = useState(null);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await fetchSpotSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleApprove = async (submission) => {
    await approveSpotSubmission(submission);
    alert("Spot telah disetujui");
    loadSubmissions();
  };

  const handleReject = async (id) => {
    await rejectSpotSubmission(id);
    alert("Spot telah ditolak");
    loadSubmissions();
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-3 border-softolive border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="font-body text-sm text-slate-600 tracking-wide">
            Memuat submissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 max-sm:px-4 max-sm:py-6">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-deepolive mb-1 tracking-tight max-sm:text-2xl">
            Review Submission
          </h1>
          <p className="font-body text-sm text-slate-600 tracking-wide">
            Kelola dan review submission dari komunitas
          </p>
        </div>

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
              Pending
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

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 max-sm:gap-1.5">
          <button
            onClick={() => setFilter("all")}
            className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
              filter === "all"
                ? "bg-softolive text-white"
                : "bg-white text-slate-600 border border-slate-300 hover:border-softolive"
            }`}
          >
            Semua ({stats.total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
              filter === "pending"
                ? "bg-amber-500 text-white"
                : "bg-white text-slate-600 border border-slate-300 hover:border-amber-500"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
              filter === "approved"
                ? "bg-green-600 text-white"
                : "bg-white text-slate-600 border border-slate-300 hover:border-green-600"
            }`}
          >
            Disetujui ({stats.approved})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors tracking-wide whitespace-nowrap ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-slate-600 border border-slate-300 hover:border-red-600"
            }`}
          >
            Ditolak ({stats.rejected})
          </button>
        </div>

        {filteredSubmissions.length === 0 && (
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
        )}

        {filteredSubmissions.length > 0 && (
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
                  {filteredSubmissions.map((s, index) => (
                    <tr
                      key={s.id}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        index === filteredSubmissions.length - 1
                          ? "border-b-0"
                          : ""
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
                        <div className="line-clamp-1">
                          {s.createdByEmail ?? "-"}
                        </div>
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
                            onClick={() => setDetailModal(s)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:border-softolive hover:text-softolive transition-colors tracking-wide"
                          >
                            Detail
                          </button>

                          <button
                            onClick={() => handleApprove(s)}
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
                            onClick={() => handleReject(s.id)}
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
        )}

        {filteredSubmissions.length > 0 && (
          <div className="sm:hidden space-y-3">
            {filteredSubmissions.map((s) => (
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
                    onClick={() => setDetailModal(s)}
                    className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:border-softolive hover:text-softolive transition-colors tracking-wide"
                  >
                    Detail
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(s)}
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
                    onClick={() => handleReject(s.id)}
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
        )}

        {filteredSubmissions.length > 0 && (
          <div className="text-center pt-4">
            <p className="font-body text-xs text-slate-500 tracking-wide">
              Menampilkan {filteredSubmissions.length} dari {stats.total}{" "}
              submission
            </p>
          </div>
        )}
      </div>

      {detailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 border border-slate-200 max-sm:p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="font-heading font-bold text-2xl text-deepolive mb-2 tracking-tight max-sm:text-xl">
                  Detail Submission
                </h2>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide inline-block ${
                    detailModal.status === "approved"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : detailModal.status === "rejected"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {detailModal.status === "approved"
                    ? "Disetujui"
                    : detailModal.status === "rejected"
                      ? "Ditolak"
                      : "Pending"}
                </span>
              </div>
              <button
                onClick={() => setDetailModal(null)}
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
                      {detailModal.name}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                      Deskripsi
                    </p>
                    <p className="font-body text-sm text-slate-600 tracking-wide leading-relaxed">
                      {detailModal.description}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                      Lokasi
                    </p>
                    <p className="font-body text-sm text-slate-600 tracking-wide">
                      📍 {detailModal.location}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                      Disubmit oleh
                    </p>
                    <p className="font-body text-sm text-slate-600 tracking-wide">
                      {detailModal.createdByEmail ?? "-"}
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
                      {detailModal.wifi || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-slate-500 tracking-wide mb-0.5">
                      Stopkontak
                    </p>
                    <p className="font-body text-sm text-slate-600 tracking-wide">
                      {detailModal.stopkontak || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {FORM_CONFIG.map((field) => {
                const value = detailModal[field.key];
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
                onClick={() => setDetailModal(null)}
                className="flex-1 border border-slate-300 text-slate-700 font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors tracking-wide"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleApprove(detailModal);
                  setDetailModal(null);
                }}
                disabled={detailModal.status === "approved"}
                className={`flex-1 font-body font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors tracking-wide ${
                  detailModal.status === "approved"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Setuju
              </button>
              <button
                onClick={() => {
                  handleReject(detailModal.id);
                  setDetailModal(null);
                }}
                disabled={detailModal.status === "rejected"}
                className={`flex-1 font-body font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors tracking-wide ${
                  detailModal.status === "rejected"
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
