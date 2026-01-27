import { useEffect, useState } from "react";
import {
  fetchSpotSubmissions,
  approveSpotSubmission,
  rejectSpotSubmission,
} from "../../services/adminSubmissionService";

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-heading text-2xl text-deepolive">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16 max-sm:px-5 max-sm:py-8">
        <h1 className="font-heading font-black text-5xl text-deepolive mb-8 max-sm:text-3xl">
          Review Spot
        </h1>

        {submissions.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl">
            <p className="font-body text-lg text-slate-600">
              Tidak ada submission saat ini
            </p>
          </div>
        )}

        {submissions.length > 0 && (
          <div className="overflow-x-auto border-2 border-slate-300 rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-deepolive text-warmcream">
                  <th className="font-heading text-left px-6 py-4 max-sm:px-4">
                    Nama Spot
                  </th>
                  <th className="font-heading text-left px-6 py-4 max-sm:hidden">
                    Deskripsi
                  </th>
                  <th className="font-heading text-left px-6 py-4 max-sm:hidden">
                    Lokasi
                  </th>
                  <th className="font-heading text-left px-6 py-4 max-sm:hidden">
                    Oleh
                  </th>
                  <th className="font-heading text-left px-6 py-4 max-sm:px-4">
                    Status
                  </th>
                  <th className="font-heading text-left px-6 py-4 max-sm:px-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, index) => (
                  <tr
                    key={s.id}
                    className={`bg-slate-50 border-b border-slate-300 ${
                      index === submissions.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="font-body px-6 py-5 max-sm:px-4">
                      <div className="font-bold text-deepolive text-lg max-sm:text-base">
                        {s.name}
                      </div>
                      <div className="text-sm text-slate-600 mt-1 sm:hidden">
                        {s.description}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 sm:hidden">
                        📍 {s.location}
                      </div>
                    </td>
                    <td className="font-body px-6 py-5 text-slate-700 max-sm:hidden">
                      {s.description}
                    </td>
                    <td className="font-body px-6 py-5 text-slate-600 max-sm:hidden">
                      📍 {s.location}
                    </td>
                    <td className="font-body px-6 py-5 text-slate-600">
                      {s.createdByEmail ?? "-"}
                    </td>
                    <td className="font-body px-6 py-5 max-sm:px-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                          s.status === "approved"
                            ? "bg-softolive text-white"
                            : s.status === "rejected"
                              ? "bg-rusticbrown text-white"
                              : "bg-carameltan text-deepolive"
                        }`}
                      >
                        {s.status === "approved"
                          ? "Disetujui"
                          : s.status === "rejected"
                            ? "Ditolak"
                            : "Pending"}
                      </span>
                    </td>
                    <td className="font-body px-6 py-5 max-sm:px-4">
                      <div className="flex gap-2 max-sm:flex-col">
                        <button
                          onClick={() => handleApprove(s)}
                          disabled={s.status === "approved"}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors max-sm:text-xs ${
                            s.status === "approved"
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-softolive text-white hover:bg-deepolive"
                          }`}
                        >
                          Setuju
                        </button>

                        <button
                          onClick={() => handleReject(s.id)}
                          disabled={s.status === "rejected"}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors max-sm:text-xs ${
                            s.status === "rejected"
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-rusticbrown text-white hover:bg-red-700"
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
        )}
      </div>
    </div>
  );
}
