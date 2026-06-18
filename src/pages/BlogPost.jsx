import { useParams, Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react'

export const BlogPost = () => {
  const { id } = useParams()
  const { blogs } = useAppStore()

  const post = blogs.find(b => b.id === id)

  if (!post) {
    return (
      <div className="max-w-lg mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold font-sora">Article Not Found</h2>
        <p className="text-slate-500">The article you are trying to read does not exist or has been removed.</p>
        <Link to="/blog" className="inline-block px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl">
          Back to Blogs
        </Link>
      </div>
    )
  }

  // Related articles (randomly select 2 others)
  const relatedPosts = blogs.filter(b => b.id !== post.id).slice(0, 2)

  return (
    <div className="max-w-4xl mx-auto py-16 pb-24 px-4 sm:px-6 lg:px-8 text-left space-y-8">
      
      {/* Back Link */}
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-secondary transition-colors"
      >
        <ArrowLeft size={14} /> Back to Insights
      </Link>

      {/* Article Meta */}
      <div className="space-y-4">
        <span className="text-sm font-extrabold uppercase bg-secondary/15 text-secondary dark:text-secondary-light px-2.5 py-1 rounded-full border border-secondary/25">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-905 dark:text-white font-sora leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 font-semibold border-y border-slate-100 dark:border-slate-800 py-4">
          <span className="flex items-center gap-1.5"><User size={14} className="text-secondary" /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-secondary" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-secondary" /> {post.readTime}</span>
        </div>
      </div>

      {/* Visual Image Header */}
      <div className={`h-64 sm:h-80 rounded-3xl bg-gradient-to-br ${post.imageColor} relative overflow-hidden flex items-center justify-center text-white/10 shadow-inner`}>
        <Tag size={64} />
      </div>

      {/* Article Content */}
      <article className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 text-slate-700 dark:text-slate-350 space-y-6 leading-relaxed font-outfit text-sm sm:text-base">
        <p className="font-semibold text-slate-900 dark:text-white text-base">
          {post.excerpt}
        </p>
        <p>
          {post.content}
        </p>
        <p>
          In today's highly competitive industrial landscape, MSMEs and startups must build solid digital foundations. By adopting automated billing, cloud accounting, and digital CRM tools, businesses can streamline daily processes. Leveraging local and state Package Schemes of Incentives (PSI) can help secure key power, tax, and registration subsidies.
        </p>
        <p>
          At MahaBiz Connect, we facilitate these digitisation steps. From professional website development to B2B listing catalogs, we map out clear growth avenues. Contact our support desk to discover how you can get featured in our next regional summit.
        </p>
      </article>

      {/* Related Articles */}
      <section className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xl font-bold font-sora text-slate-900 dark:text-white">Related Articles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedPosts.map(rel => (
            <Link 
              key={rel.id}
              to={`/blog/${rel.id}`}
              className="p-5 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 block space-y-3 hover:-translate-y-0.5 transition-transform"
            >
              <span className="text-sm font-extrabold uppercase bg-slate-100 dark:bg-slate-850 text-slate-500 px-2 py-0.5 rounded border">
                {rel.category}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white font-sora text-sm line-clamp-1 leading-snug">{rel.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
