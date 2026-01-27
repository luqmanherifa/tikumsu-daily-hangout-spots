import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import {
  submitSpot,
  fetchUserSubmissions,
} from "../../services/submissionService";

export default function UserDashboardPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [wifi, setWifi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadSubmissions = async () => {
    if (!auth.currentUser) return;
    const data = await fetchUserSubmissions(auth.currentUser.uid);
    setSubmissions(data);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitSpot(
        {
          name,
          description,
          location,
          wifi,
          tags: [],
          topMenus: [],
          busyTimes: [],
          adminNote: "",
        },
        auth.currentUser,
      );

      await loadSubmissions();

      setName("");
      setDescription("");
      setLocation("");
      setWifi(false);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16 max-sm:px-5 max-sm:py-8">
        <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <h1 className="font-heading font-black text-5xl text-deepolive max-sm:text-3xl">
            Spot Saya
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-deepolive text-warmcream font-body font-medium px-6 py-3 rounded-lg hover:bg-softolive transition-colors max-sm:w-full"
          >
            + Tambah Spot
          </button>
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl">
            <p className="font-body text-lg text-slate-600 mb-2">
              Belum ada submission
            </p>
            <p className="font-body text-sm text-slate-500">
              Klik tombol "Tambah Spot" untuk mulai submit
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
                  <th className="font-heading text-left px-6 py-4 max-sm:px-4">
                    Status
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 max-sm:p-6">
            <h2 className="font-heading font-bold text-3xl text-deepolive mb-6 max-sm:text-2xl">
              Tambah Spot Baru
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className="w-full border-2 border-slate-300 px-4 py-3 rounded-lg font-body text-lg focus:outline-none focus:border-deepolive max-sm:text-base"
                  placeholder="Nama spot..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <textarea
                  className="w-full border-2 border-slate-300 px-4 py-3 rounded-lg font-body text-lg focus:outline-none focus:border-deepolive resize-none max-sm:text-base"
                  placeholder="Deskripsi singkat..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  className="w-full border-2 border-slate-300 px-4 py-3 rounded-lg font-body text-lg focus:outline-none focus:border-deepolive max-sm:text-base"
                  placeholder="Lokasi..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <label className="flex items-center gap-3 font-body text-deepolive cursor-pointer">
                <input
                  type="checkbox"
                  checked={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
                  className="w-5 h-5 cursor-pointer accent-deepolive"
                />
                <span className="text-lg max-sm:text-base">Ada WiFi</span>
              </label>

              <div className="flex gap-3 pt-4 max-sm:flex-col">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border-2 border-slate-300 text-slate-700 font-body font-medium px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-deepolive text-warmcream font-body font-medium px-6 py-3 rounded-lg hover:bg-softolive transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Mengirim..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
