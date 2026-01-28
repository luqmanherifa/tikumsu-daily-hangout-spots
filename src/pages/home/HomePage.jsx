import { useEffect, useState } from "react";
import { fetchApprovedSpots, filterSpots } from "../../services/spotService";

const SPOT_IMAGES = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop", // cafe
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", // restaurant
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop", // coworking
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop", // coffee
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop", // cafe interior
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop", // cafe outdoor
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop", // workspace
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=300&fit=crop", // bar
];

const getRandomImage = () => {
  return SPOT_IMAGES[Math.floor(Math.random() * SPOT_IMAGES.length)];
};

export default function HomePage() {
  const [spots, setSpots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [wifiOnly, setWifiOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageMap, setImageMap] = useState({});

  useEffect(() => {
    const loadSpots = async () => {
      setLoading(true);
      const data = await fetchApprovedSpots();
      setSpots(data);
      setFiltered(data);

      const images = {};
      data.forEach((spot) => {
        images[spot.id] = getRandomImage();
      });
      setImageMap(images);

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
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-3 border-softolive border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="font-body text-sm text-slate-600 tracking-wide">
            Memuat spot...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-softolive to-deepolive text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 max-sm:px-4 max-sm:py-10">
          <h1 className="font-heading font-bold text-4xl mb-3 leading-tight tracking-tight max-sm:text-2xl">
            Cari tempat nongkrong hari ini
          </h1>
          <p className="font-body text-base max-w-2xl tracking-wide text-white/90 max-sm:text-sm">
            Temukan spot yang cocok untuk ngopi, makan, atau kerja di kotamu
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 max-sm:px-4 max-sm:py-4">
          <div className="flex gap-3 items-center max-sm:flex-col max-sm:items-stretch">
            <div className="flex-1 relative">
              <input
                className="w-full bg-white border border-slate-300 px-4 py-2.5 font-body text-sm focus:outline-none focus:border-softolive rounded-lg tracking-wide transition-colors placeholder:text-slate-400"
                placeholder="Cari nama spot atau lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>
            </div>

            <label className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2.5 cursor-pointer rounded-lg hover:border-softolive transition-colors max-sm:justify-center">
              <input
                type="checkbox"
                checked={wifiOnly}
                onChange={(e) => setWifiOnly(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-softolive"
              />
              <span className="font-body text-sm font-medium tracking-wide text-slate-700">
                Ada WiFi
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 max-sm:px-4 max-sm:py-6">
        {filtered.length > 0 && (
          <div className="mb-6">
            <p className="font-body text-sm text-slate-600 tracking-wide">
              Ditemukan{" "}
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
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-heading font-bold text-xl text-deepolive mb-2 tracking-tight">
              Tidak ada hasil
            </p>
            <p className="font-body text-sm text-slate-600 tracking-wide">
              Coba kata kunci lain atau hapus filter
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((spot) => (
            <div
              key={spot.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-softolive transition-all cursor-pointer group"
            >
              <div className="w-full h-48 bg-slate-100 overflow-hidden">
                <img
                  src={imageMap[spot.id] || SPOT_IMAGES[0]}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h2 className="font-heading font-bold text-lg text-deepolive mb-2 tracking-tight group-hover:text-softolive transition-colors line-clamp-1">
                  {spot.name}
                </h2>
                <p className="font-body text-xs text-slate-600 tracking-wide leading-relaxed mb-3 line-clamp-2">
                  {spot.description}
                </p>

                <div className="mb-3 pb-3 border-b border-slate-200">
                  <p className="font-body text-xs text-slate-700 tracking-wide flex items-start gap-1.5">
                    <span className="text-sm mt-0.5">📍</span>
                    <span className="line-clamp-1">{spot.location}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  {spot.kebutuhan && spot.kebutuhan.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {spot.kebutuhan.slice(0, 2).map((item) => (
                        <span
                          key={item}
                          className="font-body text-xs bg-softolive/10 text-softolive px-2.5 py-1 rounded-md font-medium tracking-wide border border-softolive/20"
                        >
                          {item}
                        </span>
                      ))}
                      {spot.kebutuhan.length > 2 && (
                        <span className="font-body text-xs text-slate-500 px-1 py-1 font-medium">
                          +{spot.kebutuhan.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {spot.wifi === "Ada" && (
                      <span className="font-body text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium tracking-wide border border-blue-200">
                        WiFi
                      </span>
                    )}
                    {spot.stopkontak === "Ada" && (
                      <span className="font-body text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-medium tracking-wide border border-amber-200">
                        Stopkontak
                      </span>
                    )}
                    {spot.biaya && (
                      <span className="font-body text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium tracking-wide border border-slate-200">
                        {spot.biaya}
                      </span>
                    )}
                    {spot.suasana && (
                      <span className="font-body text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md font-medium tracking-wide border border-purple-200">
                        {spot.suasana}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
