import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import {
  Search,
  MapPin,
  Tag,
  Briefcase,
  Star,
  SlidersHorizontal,
  X
} from 'lucide-react'

export const Directory = () => {
  const { businesses } = useAppStore()

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [servicesQuery, setServicesQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Categories & Cities derived from database
  const categories = ['MSME', 'Service Provider', 'Retailer', 'Manufacturer', 'Tech Startup', 'Consultant']
  const cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur']
  const industries = useMemo(() => {
    const set = new Set(businesses.map(b => b.industry))
    return Array.from(set)
  }, [businesses])

  // Filter Logic
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        biz.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === '' || biz.category === selectedCategory

      const matchesLocation = selectedLocation === '' || biz.city === selectedLocation

      const matchesIndustry = selectedIndustry === '' || biz.industry === selectedIndustry

      const matchesServices = servicesQuery === '' || biz.services.some(srv =>
        srv.toLowerCase().includes(servicesQuery.toLowerCase())
      )

      return matchesSearch && matchesCategory && matchesLocation && matchesIndustry && matchesServices
    })
  }, [businesses, searchTerm, selectedCategory, selectedLocation, selectedIndustry, servicesQuery])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedLocation('')
    setSelectedIndustry('')
    setServicesQuery('')
  }

  const isFiltered = searchTerm !== '' ||
    selectedCategory !== '' ||
    selectedLocation !== '' ||
    selectedIndustry !== '' ||
    servicesQuery !== ''

  return (
    <div className="space-y-12 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Business <span className="text-gradient">Growth Directory</span>
        </h1>
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-outfit">
          Connect directly with verified manufacturers, MSMEs, retailers, startups, and service providers across Maharashtra's industrial clusters.
        </p>
      </div>

      {/* Modern Filter Panel */}
      <div className="p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6 text-left">

        {/* Main Search Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by business name or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-sm shadow-inner"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${showFilters
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-305'
                }`}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            {isFiltered && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                <X size={16} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Detailed Filters */}
        {(showFilters || isFiltered) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/40 animate-in fade-in duration-200">

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Tag size={12} /> Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Location Select */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> City/Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
              >
                <option value="">All Cities</option>
                {cities.map(ct => <option key={ct} value={ct}>{ct}</option>)}
              </select>
            </div>

            {/* Industry Select */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Briefcase size={12} /> Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
              >
                <option value="">All Industries</option>
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>

            {/* Services search */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Search size={12} /> Search Services</label>
              <input
                type="text"
                placeholder="e.g. Laser Cutting, ERP"
                value={servicesQuery}
                onChange={(e) => setServicesQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
              />
            </div>

          </div>
        )}
      </div>

      {/* Directory Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between h-[360px] text-left relative overflow-hidden group"
            >
              {/* Featured Ribbon */}
              {/* {biz.featured && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                  <div className="absolute top-4 -right-8 bg-secondary text-white font-extrabold text-[10px] uppercase tracking-widest text-center py-1 w-28 rotate-45 shadow-md">
                    Featured
                  </div>
                </div>
              )} */}

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${biz.logoColor} flex items-center justify-center text-white font-black text-xl shadow-md`}>
                    {biz.name.charAt(0)}
                  </div>
                  <span className="text-sm font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/60">
                    {biz.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  <Star size={14} className="fill-amber-500" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-350">{biz.rating}</span>
                  <span className="text-sm text-slate-405">({biz.reviewsCount} reviews)</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sora leading-snug line-clamp-1">{biz.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-405 line-clamp-3 leading-relaxed mb-4">{biz.description}</p>
              </div>

              <div>
                <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-4 mb-4 flex justify-between text-sm text-slate-400 font-semibold uppercase tracking-wider">
                  <span className="truncate max-w-[150px]">{biz.industry.split(' ')[0]}</span>
                  <span>📍 {biz.city}</span>
                </div>

                <Link
                  to={`/directory/${biz.id}`}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary transition-all shadow-inner"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl glass-card text-center space-y-4 max-w-lg mx-auto">
          <p className="text-lg font-bold font-sora text-slate-900 dark:text-white font-sora">No Businesses Found</p>
          <p className="text-sm text-slate-500">We couldn't find any listings matching your filter criteria. Try adjusting the keywords or filters.</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  )
}
