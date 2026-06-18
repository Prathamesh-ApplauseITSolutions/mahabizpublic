import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { Search, Tag, Calendar, User, Clock, ArrowRight } from 'lucide-react'

export const Blog = () => {
  const { blogs } = useAppStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    'Business Tips', 
    'Marketing Insights', 
    'Entrepreneur Stories', 
    'Industry News', 
    'MSME Updates', 
    'Startup Articles'
  ]

  // Filter Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [blogs, searchTerm, selectedCategory])

  // Top/Featured Article (use the first one)
  const featuredPost = blogs[0]

  return (
    <div className="space-y-16 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Business <span className="text-gradient">Insights & News</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-outfit">
          Stay informed on Maharashtra MSME policies, compliance updates, local marketing tactics, and scale-up strategies.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featuredPost && searchTerm === '' && selectedCategory === '' && (
        <section className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Box */}
            <div className={`lg:col-span-5 h-64 rounded-2xl bg-gradient-to-br ${featuredPost.imageColor} p-8 flex flex-col justify-between text-white shrink-0`}>
              <span className="text-sm font-extrabold uppercase bg-white/20 px-3 py-1 rounded-full border border-white/20 self-start backdrop-blur-sm">
                Featured Article
              </span>
              <div>
                <p className="text-sm text-slate-200 font-semibold flex items-center gap-1.5"><Clock size={12} /> {featuredPost.readTime}</p>
              </div>
            </div>

            {/* Content Box */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-sm font-extrabold uppercase bg-secondary/10 text-secondary dark:text-secondary-light px-2.5 py-1 rounded-full border border-secondary/20">
                {featuredPost.category}
              </span>
              
              <h2 className="text-2xl font-bold font-sora text-slate-950 dark:text-white leading-tight">
                {featuredPost.title}
              </h2>
              
              <p className="text-sm md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 font-semibold border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="flex items-center gap-1.5"><User size={12} /> {featuredPost.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {featuredPost.date}</span>
              </div>

              <div className="pt-2">
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-secondary-dark group"
                >
                  Read Full Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Filter Row */}
      <section className="p-4 rounded-2xl glass-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-secondary"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-200 border border-slate-200 dark:border-slate-850 focus:outline-none text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </section>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredBlogs.map((post) => (
            <div 
              key={post.id}
              className="p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between h-full min-h-[380px] text-left relative"
            >
              <div>
                <div className={`h-32 rounded-xl bg-gradient-to-br ${post.imageColor} mb-4 relative overflow-hidden flex items-center justify-center text-white/10`}>
                  <Tag size={32} />
                  <span className="absolute bottom-2 right-2 text-sm font-bold uppercase bg-slate-900/40 px-2 py-0.5 rounded text-white">{post.readTime}</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/60">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-sora leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>

              <div>
                <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-4 mb-4 flex justify-between text-sm text-slate-400 font-semibold uppercase tracking-wider">
                  <span>👤 {post.author.split(' ')[0]}</span>
                  <span>📅 {post.date.split(',')[0]}</span>
                </div>

                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-secondary-dark group"
                >
                  Read More <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="p-16 rounded-3xl glass-card text-center max-w-lg mx-auto space-y-4">
          <p className="text-lg font-bold font-sora text-slate-900 dark:text-white">No Articles Found</p>
          <p className="text-sm text-slate-500">No blog posts match your search or category filter. Try widening your filters.</p>
        </div>
      )}

    </div>
  )
}
