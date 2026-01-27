import { useEffect, useState } from "react";
import { fetchApprovedSpots, filterSpots } from "../../services/spotService";

export default function HomePage() {
  const [spots, setSpots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [wifiOnly, setWifiOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpots = async () => {
      setLoading(true);
      const data = await fetchApprovedSpots();
      setSpots(data);
      setFiltered(data);
      setLoading(false);
    };

    loadSpots();
  }, []);

  useEffect(() => {
    setFiltered(filterSpots(spots, { search, wifiOnly }));
  }, [search, wifiOnly, spots]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warmcream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-deepolive border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-heading text-xl text-deepolive tracking-tight">
            Memuat spot...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmcream">
      <div className="bg-deepolive text-warmcream border-b-4 border-softolive">
        <div className="max-w-7xl mx-auto px-8 py-16 max-sm:px-5 max-sm:py-10">
          <h1 className="font-heading font-black text-5xl mb-4 leading-tight tracking-tight max-sm:text-3xl">
            Mau nongkrong
            <br />
            dimana hari ini?
          </h1>
          <p className="font-body text-base max-w-2xl tracking-wide text-warmcream/90 max-sm:text-sm">
            Direktori tempat hangout di kotamu. Cari spot yang cocok buat ngopi,
            makan, atau kerja.
          </p>
        </div>
      </div>

      <div className="bg-white border-b-2 border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6 max-sm:px-5 max-sm:py-5">
          <div className="flex gap-4 items-center max-sm:flex-col max-sm:items-stretch">
            <div className="flex-1 relative">
              <input
                className="w-full bg-slate-50 border-2 border-slate-200 px-5 py-3.5 font-body text-base focus:outline-none focus:border-softolive focus:bg-white rounded-xl tracking-wide transition-colors max-sm:text-sm"
                placeholder="Cari spot atau lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
            </div>

            <label className="flex items-center gap-3 bg-softolive text-warmcream px-5 py-3.5 cursor-pointer rounded-xl hover:bg-deepolive transition-colors border-2 border-softolive max-sm:justify-center">
              <input
                type="checkbox"
                checked={wifiOnly}
                onChange={(e) => setWifiOnly(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-rusticbrown"
              />
              <span className="font-body text-sm font-medium tracking-wide max-sm:text-xs">
                WiFi tersedia
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12 max-sm:px-5 max-sm:py-8">
        {filtered.length > 0 && (
          <div className="mb-8">
            <p className="font-body text-sm text-slate-600 tracking-wide">
              Menampilkan{" "}
              <span className="font-semibold text-deepolive">
                {filtered.length}
              </span>{" "}
              tempat
              {wifiOnly && " dengan WiFi"}
              {search && ` untuk "${search}"`}
            </p>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-heading font-bold text-2xl text-deepolive mb-2 tracking-tight">
              Tidak ada hasil
            </p>
            <p className="font-body text-sm text-slate-600 tracking-wide">
              Coba kata kunci lain atau hapus filter WiFi
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {filtered.map((spot) => (
            <div
              key={spot.id}
              className="bg-white border-2 border-slate-200 p-6 rounded-2xl hover:border-softolive transition-all cursor-pointer group max-sm:p-5"
            >
              <div className="mb-4">
                <h2 className="font-heading font-bold text-2xl text-deepolive mb-2 tracking-tight group-hover:text-softolive transition-colors max-sm:text-xl">
                  {spot.name}
                </h2>
                <p className="font-body text-sm text-slate-600 tracking-wide leading-relaxed max-sm:text-xs">
                  {spot.description}
                </p>
              </div>

              <div className="mb-4 pb-4 border-b border-slate-200">
                <p className="font-body text-sm text-slate-700 tracking-wide flex items-center gap-2">
                  <span className="text-base">📍</span>
                  {spot.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {spot.wifi && (
                  <span className="font-body text-xs bg-softolive text-warmcream px-3 py-1.5 rounded-lg font-medium tracking-wide">
                    WiFi
                  </span>
                )}
                {spot.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs bg-carameltan/20 text-deepolive px-3 py-1.5 rounded-lg font-medium tracking-wide border border-carameltan/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
