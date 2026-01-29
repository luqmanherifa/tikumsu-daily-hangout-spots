import {
  SearchIcon,
  WifiIcon,
  PlugIcon,
  ChevronDownIcon,
  TargetIcon,
  ClockIcon,
  QuietIcon,
  SparklesIcon,
  UserGroupIcon,
  TimerIcon,
  MoneyIcon,
  PeopleGroupIcon,
  DoorOpenIcon,
  RepeatIcon,
  CouchIcon,
} from "../../components/icons";

export default function HomeSearch({
  filters,
  showFilters,
  setShowFilters,
  handleFilterChange,
  toggleMultiFilter,
  clearAllFilters,
  hasActiveFilters,
  filterOptions,
}) {
  return (
    <div className="bg-slate-50 border-b border-slate-200" id="spots">
      <div className="max-w-7xl mx-auto px-6 py-6 max-sm:px-4 max-sm:py-5">
        <div className="flex gap-3 items-center mb-4 max-sm:flex-col max-sm:items-stretch">
          <div className="flex-1 relative">
            <input
              className="w-full bg-white border border-slate-300 px-4 py-3 font-body text-sm focus:outline-none focus:border-softolive rounded-lg tracking-wide transition-colors placeholder:text-slate-400"
              placeholder="Cari nama atau lokasi spot..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon className="w-4 h-4" />
            </span>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 bg-white border border-slate-300 px-4 py-3 rounded-lg hover:border-softolive transition-colors font-body text-sm font-medium tracking-wide ${
              hasActiveFilters()
                ? "border-softolive text-softolive"
                : "text-slate-700"
            }`}
          >
            Filter
            {hasActiveFilters() && (
              <span className="bg-softolive text-white text-xs px-1.5 py-0.5 rounded-full">
                {[
                  filters.wifiOnly ? 1 : 0,
                  filters.stopkontak ? 1 : 0,
                  filters.suasana.length,
                  filters.kebutuhan.length,
                  filters.waktu.length,
                  filters.aktivitas.length,
                  filters.tipeKunjungan.length,
                  filters.durasi.length,
                  filters.biaya.length,
                  filters.kepadatan.length,
                  filters.fleksibilitas.length,
                  filters.polaKunjungan.length,
                  filters.kenyamanan.length,
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
            <ChevronDownIcon
              className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange("wifiOnly", !filters.wifiOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.wifiOnly
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-white text-slate-600 border border-slate-300 hover:border-softolive"
            }`}
          >
            <WifiIcon className="w-3.5 h-3.5" />
            WiFi
          </button>

          <button
            onClick={() =>
              handleFilterChange("stopkontak", !filters.stopkontak)
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.stopkontak
                ? "bg-amber-100 text-amber-700 border border-amber-300"
                : "bg-white text-slate-600 border border-slate-300 hover:border-softolive"
            }`}
          >
            <PlugIcon className="w-3.5 h-3.5" />
            Stopkontak
          </button>

          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 border border-red-300 hover:bg-red-50 transition-colors"
            >
              Reset Semua
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <TargetIcon className="w-4 h-4 text-softolive" />
                  Cocok untuk
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.kebutuhan.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("kebutuhan", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.kebutuhan.includes(option)
                          ? "bg-softolive/20 text-softolive border border-softolive"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <ClockIcon className="w-4 h-4 text-blue-600" />
                  Waktu
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.waktu.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("waktu", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.waktu.includes(option)
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <QuietIcon className="w-4 h-4 text-purple-600" />
                  Suasana
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.suasana.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("suasana", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.suasana.includes(option)
                          ? "bg-purple-100 text-purple-700 border border-purple-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <SparklesIcon className="w-4 h-4 text-yellow-600" />
                  Aktivitas
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.aktivitas.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("aktivitas", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.aktivitas.includes(option)
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <UserGroupIcon className="w-4 h-4 text-slate-600" />
                  Untuk siapa
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.tipeKunjungan.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("tipeKunjungan", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.tipeKunjungan.includes(option)
                          ? "bg-slate-200 text-slate-700 border border-slate-400"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <TimerIcon className="w-4 h-4 text-slate-600" />
                  Durasi
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.durasi.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("durasi", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.durasi.includes(option)
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <MoneyIcon className="w-4 h-4 text-green-600" />
                  Biaya
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.biaya.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("biaya", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.biaya.includes(option)
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <PeopleGroupIcon className="w-4 h-4 text-slate-600" />
                  Kepadatan
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.kepadatan.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("kepadatan", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.kepadatan.includes(option)
                          ? "bg-orange-100 text-orange-700 border border-orange-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <DoorOpenIcon className="w-4 h-4 text-slate-600" />
                  Fleksibilitas
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.fleksibilitas.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("fleksibilitas", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.fleksibilitas.includes(option)
                          ? "bg-teal-100 text-teal-700 border border-teal-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <RepeatIcon className="w-4 h-4 text-slate-600" />
                  Pola Kunjungan
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.polaKunjungan.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("polaKunjungan", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.polaKunjungan.includes(option)
                          ? "bg-pink-100 text-pink-700 border border-pink-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-sm font-semibold text-slate-700 mb-2">
                  <CouchIcon className="w-4 h-4 text-green-600" />
                  Kenyamanan
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.kenyamanan.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMultiFilter("kenyamanan", option)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filters.kenyamanan.includes(option)
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-softolive"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
