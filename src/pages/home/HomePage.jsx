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
    return <div className="p-6">Loading spots...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Daily Hangout Spots</h1>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Cari spot, lokasi, atau tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={wifiOnly}
            onChange={(e) => setWifiOnly(e.target.checked)}
          />
          WiFi
        </label>
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500">Tidak ada spot yang cocok</p>
      )}

      {filtered.map((spot) => (
        <div key={spot.id} className="border p-4 rounded">
          <h2 className="font-semibold">{spot.name}</h2>
          <p className="text-sm">{spot.description}</p>
          <p className="text-xs text-gray-500">{spot.location}</p>

          <div className="text-xs mt-2 flex gap-2 flex-wrap">
            {spot.wifi && <span>📶 WiFi</span>}
            {spot.tags?.map((tag) => (
              <span key={tag} className="bg-gray-100 px-2 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
