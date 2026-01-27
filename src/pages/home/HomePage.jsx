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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-heading text-2xl text-deepolive">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-deepolive text-warmcream">
        <div className="max-w-7xl mx-auto px-8 py-20 max-sm:px-5 max-sm:py-12">
          <h1 className="font-heading font-black text-6xl mb-4 leading-tight max-sm:text-4xl">
            Mau nongkrong
            <br />
            dimana hari ini?
          </h1>
          <p className="font-body text-xl max-w-2xl max-sm:text-base">
            Direktori tempat hangout di kotamu. Cari spot yang cocok buat ngopi,
            makan, atau kerja.
          </p>
        </div>
      </div>

      <div className="bg-warmcream">
        <div className="max-w-7xl mx-auto px-8 py-8 max-sm:px-5 max-sm:py-6">
          <div className="flex gap-4 items-center max-sm:flex-col max-sm:items-stretch">
            <input
              className="flex-1 bg-white px-6 py-4 font-body text-lg focus:outline-none rounded-lg max-sm:text-base"
              placeholder="Cari spot atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <label className="flex items-center gap-3 bg-softolive text-warmcream px-6 py-4 cursor-pointer rounded-lg max-sm:justify-center">
              <input
                type="checkbox"
                checked={wifiOnly}
                onChange={(e) => setWifiOnly(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="font-body text-lg max-sm:text-base">
                WiFi tersedia
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 max-sm:px-5 max-sm:py-10">
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-heading text-3xl text-slate-800 mb-3">
              Tidak ada hasil
            </p>
            <p className="font-body text-slate-600">Coba kata kunci lain</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-5">
          {filtered.map((spot) => (
            <div
              key={spot.id}
              className="bg-deepolive text-warmcream p-8 rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer max-sm:p-6"
            >
              <h2 className="font-heading font-bold text-3xl mb-3 max-sm:text-2xl">
                {spot.name}
              </h2>

              <p className="font-body text-lg mb-4 leading-relaxed max-sm:text-base">
                {spot.description}
              </p>

              <p className="font-body text-carameltan mb-6 max-sm:mb-4">
                📍 {spot.location}
              </p>

              <div className="flex flex-wrap gap-2">
                {spot.wifi && (
                  <span className="font-body text-sm bg-rusticbrown text-warmcream px-4 py-2 rounded-full">
                    WiFi
                  </span>
                )}
                {spot.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-sm bg-carameltan text-deepolive px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-slate-200">
            <p className="font-body text-center text-slate-600 text-lg">
              {filtered.length} tempat ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
