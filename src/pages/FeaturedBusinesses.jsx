import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { Search, MapPin, Star, Award, CheckCircle } from 'lucide-react'

export const FeaturedBusinesses = () => {
  const { businesses } = useAppStore()
  
  // Filter for featured only
  const featuredOnly = useMemo(() => businesses.filter(b => b.featured), [businesses])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = ['MSME', 'Service Provider', 'Manufacturer', 'Tech Startup', 'Consultant']

  const filteredFeatured = useMemo(() => {
    return featuredOnly.filter((biz) => {
      const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            biz.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || biz.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [featuredOnly, searchTerm, selectedCategory])

  return (
    <div className="space-y-12 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary/20 text-secondary dark:text-secondary-light text-sm font-bold uppercase tracking-wider">
          <Award size={14} /> Gold Partners & Sponsors
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Premium <span className="text-gradient">Business Showcase</span>
        </h1>
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
          Meet our Business Partners and Growth Members. These companies form the backbone of our ecosystem, delivering high-tolerance engineering products, organic food distribution, and cutting-edge software solutions.
        </p>
      </div>

      {/* Mini search filters */}
      <div className="p-4 rounded-2xl glass-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search premium partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Premium Spotlight list */}
      {filteredFeatured.length > 0 ? (
        <div className="space-y-8">
          {filteredFeatured.map((biz) => (
            <div 
              key={biz.id}
              className="p-8 rounded-3xl glass-card border-2 border-secondary/35 dark:border-secondary/20 flex flex-col lg:flex-row gap-8 items-stretch relative overflow-hidden shadow-lg hover:border-secondary transition-all"
            >
              {/* Premium Corner design */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className="absolute top-4 -right-8 bg-secondary text-white font-extrabold text-[10px] uppercase tracking-widest text-center py-1 w-28 rotate-45 shadow-md">
                  Partner
                </div>
              </div>

              {/* Logo block */}
              <div className="lg:w-1/4 flex flex-col justify-between items-center text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/55 dark:border-slate-800/40 shrink-0">
                <div className="space-y-4 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${biz.logoColor} flex items-center justify-center text-white font-black text-3xl shadow-md`}>
                    {biz.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white font-sora leading-tight">{biz.name.split(' ')[0]}</h3>
                    <span className="text-sm uppercase font-bold text-slate-400 mt-1 block">Zone: {biz.city}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 w-full">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500">
                    <MapPin size={12} className="text-secondary" /> {biz.city}, MH
                  </div>
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Star size={12} className="fill-amber-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{biz.rating}</span>
                  </div>
                </div>
              </div>

              {/* Info block */}
              <div className="lg:w-3/4 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-sm font-extrabold uppercase bg-secondary/15 text-secondary dark:text-secondary-light px-2.5 py-1 rounded-full border border-secondary/25">
                      {biz.category}
                    </span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      {biz.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-sora text-slate-955 dark:text-white mb-2">{biz.name}</h3>
                  <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-medium mb-4">{biz.description}</p>
                  
                  {/* Specialties grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                    {biz.services.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-semibold bg-slate-100/60 dark:bg-slate-900/60 p-2 rounded-lg">
                        <CheckCircle size={10} className="text-emerald-500" /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm text-slate-400 font-medium">B2B Sourcing Verified Lead Member</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link
                      to={`/directory/${biz.id}`}
                      className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-all shadow-inner"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/directory/${biz.id}#inquiry`}
                      className="w-full sm:w-auto text-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-secondary hover:bg-secondary-light transition-all"
                    >
                      Send Inquiry
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl glass-card text-center max-w-lg mx-auto space-y-4">
          <p className="text-lg font-bold font-sora text-slate-900 dark:text-white">No Partners Match</p>
          <p className="text-sm text-slate-500">We couldn't find any premium members matching the selected category/keyword filters.</p>
        </div>
      )}

      {/* Become featured card */}
      <section className="p-10 rounded-3xl bg-gradient-to-r from-primary to-primary-light text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-sora">Want Your Business Displayed Here?</h3>
          <p className="text-sm text-slate-200 max-w-xl">Upgrade to a Growth or Business Partner membership plan and secure homepage promotions, spotlight articles, and priority lead distributions.</p>
        </div>
        <Link
          to="/membership"
          className="px-6 py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold text-sm rounded-xl uppercase tracking-wider shadow-md shrink-0"
        >
          View Plans
        </Link>
      </section>

    </div>
  )
}
