import { useEffect, useState } from "react";
import { fetchApprovedSpots, advancedFilter } from "../../services/spotService";
import { useAuthUser } from "../../lib/useAuthUser";
import HomeHero from "./HomeHero";
import HomeSearch from "./HomeSearch";
import HomeSpot from "./HomeSpot";
import HomeCommunity from "./HomeCommunity";

export default function HomePage() {
  const { user } = useAuthUser();
  const [spots, setSpots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    wifiOnly: false,
    stopkontak: false,
    suasana: [],
    kebutuhan: [],
    waktu: [],
    aktivitas: [],
    tipeKunjungan: [],
    durasi: [],
    biaya: [],
    kepadatan: [],
    fleksibilitas: [],
    polaKunjungan: [],
    kenyamanan: [],
  });

  const filterOptions = {
    suasana: ["Sepi", "Sedang", "Ramai"],
    kebutuhan: [
      "Ngopi cepat",
      "Makan ringan",
      "Makan utama",
      "Bekerja sebentar",
      "Nongkrong santai",
      "Menunggu",
      "Istirahat singkat",
    ],
    waktu: ["Pagi", "Siang", "Sore", "Malam", "Larut malam"],
    aktivitas: ["Fokus", "Mengobrol", "Santai", "Menunggu", "Transit"],
    tipeKunjungan: ["Sendiri", "Berdua", "Kelompok kecil", "Kelompok besar"],
    durasi: ["Singkat", "Sedang", "Lama"],
    biaya: ["Murah", "Sedang", "Tinggi"],
    kepadatan: ["Longgar", "Normal", "Padat"],
    fleksibilitas: ["Praktis", "Standar", "Formal"],
    polaKunjungan: ["Datang–pergi", "Duduk singkat", "Duduk lama"],
    kenyamanan: ["Dasar", "Cukup", "Nyaman"],
  };

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
    setFiltered(advancedFilter(spots, filters));
  }, [filters, spots]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMultiFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      wifiOnly: false,
      stopkontak: false,
      suasana: [],
      kebutuhan: [],
      waktu: [],
      aktivitas: [],
      tipeKunjungan: [],
      durasi: [],
      biaya: [],
      kepadatan: [],
      fleksibilitas: [],
      polaKunjungan: [],
      kenyamanan: [],
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.wifiOnly ||
      filters.stopkontak ||
      filters.suasana.length > 0 ||
      filters.kebutuhan.length > 0 ||
      filters.waktu.length > 0 ||
      filters.aktivitas.length > 0 ||
      filters.tipeKunjungan.length > 0 ||
      filters.durasi.length > 0 ||
      filters.biaya.length > 0 ||
      filters.kepadatan.length > 0 ||
      filters.fleksibilitas.length > 0 ||
      filters.polaKunjungan.length > 0 ||
      filters.kenyamanan.length > 0
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeHero user={user} spots={spots} loading={loading} />

      <HomeSearch
        filters={filters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        handleFilterChange={handleFilterChange}
        toggleMultiFilter={toggleMultiFilter}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
        filterOptions={filterOptions}
      />

      <HomeSpot
        filtered={filtered}
        loading={loading}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        clearAllFilters={clearAllFilters}
      />

      <HomeCommunity user={user} spots={spots} loading={loading} />
    </div>
  );
}
