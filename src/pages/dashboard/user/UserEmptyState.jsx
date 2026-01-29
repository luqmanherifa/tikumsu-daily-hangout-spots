export default function UserEmptyState({ onAddSpot, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
        <div className="inline-block w-10 h-10 border-3 border-softolive border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-body text-sm text-slate-600 tracking-wide">
          Memuat data...
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <p className="font-heading font-bold text-xl text-deepolive mb-2 tracking-tight">
        Belum ada spot
      </p>
      <p className="font-body text-sm text-slate-600 mb-5 tracking-wide">
        Bagikan spot favoritmu ke komunitas
      </p>
      <button
        onClick={onAddSpot}
        className="bg-softolive text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-deepolive transition-colors tracking-wide inline-block"
      >
        Tambah Spot Pertama
      </button>
    </div>
  );
}
