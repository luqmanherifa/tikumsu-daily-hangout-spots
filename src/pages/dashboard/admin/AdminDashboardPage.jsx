import { useEffect, useState } from "react";
import {
  fetchSpotSubmissions,
  approveSpotSubmission,
  rejectSpotSubmission,
} from "../../../services/adminSubmissionService";
import AdminHeader from "./AdminHeader";
import StatsCards from "./StatsCards";
import FilterTabs from "./FilterTabs";
import AdminEmptyState from "./AdminEmptyState.jsx";
import SubmissionTableDesktop from "./SubmissionTableDesktop";
import SubmissionListMobile from "./SubmissionListMobile";
import AdminDetailModal from "./AdminDetailModal";

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
        <AdminHeader />

        <StatsCards stats={stats} />

        <FilterTabs filter={filter} onFilterChange={setFilter} stats={stats} />

        {filteredSubmissions.length === 0 && (
          <AdminEmptyState filter={filter} />
        )}

        {filteredSubmissions.length > 0 && (
          <>
            <SubmissionTableDesktop
              submissions={filteredSubmissions}
              onViewDetail={setDetailModal}
              onApprove={handleApprove}
              onReject={handleReject}
            />

            <SubmissionListMobile
              submissions={filteredSubmissions}
              onViewDetail={setDetailModal}
              onApprove={handleApprove}
              onReject={handleReject}
            />

            <div className="text-center pt-4">
              <p className="font-body text-xs text-slate-500 tracking-wide">
                Menampilkan {filteredSubmissions.length} dari {stats.total}{" "}
                submission
              </p>
            </div>
          </>
        )}
      </div>

      <AdminDetailModal
        submission={detailModal}
        onClose={() => setDetailModal(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        formConfig={FORM_CONFIG}
      />
    </div>
  );
}
