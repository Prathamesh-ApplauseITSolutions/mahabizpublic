import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Quote, X } from 'lucide-react'

export const SuccessStories = () => {
  const { stories } = useAppStore()
  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <div className="space-y-16 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          Impact & Achievements
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Member <span className="text-gradient">Success Stories</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-outfit">
          Read inspiring stories of how manufacturers, retailers, and software startups scaled operations by connecting through MahaBiz Connect.
        </p>
      </div>

      {/* Stories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div 
            key={story.id}
            className="p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between min-h-[220px] text-left relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div>
              {/* Top Business Logo/Badge */}
              <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${story.imageColor} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                  <Quote size={14} className="text-white fill-white" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {story.businessName}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sora line-clamp-2 leading-snug">
                {story.title}
              </h3>
              <p className="text-sm text-slate-550 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                {story.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
              <span className="text-xs text-slate-400 font-semibold">By {story.author}</span>
              <button
                onClick={() => setSelectedStory(story)}
                className="text-sm font-bold text-secondary hover:text-secondary-dark hover:underline cursor-pointer transition-colors"
              >
                Read Case Study →
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Story Detail Overlay Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 cursor-pointer"
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            {/* Banner color */}
            <div className={`h-32 bg-gradient-to-r ${selectedStory.imageColor} p-6 flex flex-col justify-end text-white`}>
              <span className="text-sm font-extrabold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded border border-white/20 self-start backdrop-blur-sm">
                Case Study
              </span>
              <h4 className="text-2xl font-black font-sora text-white mt-1 leading-tight">{selectedStory.businessName}</h4>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
              <h3 className="text-xl font-bold font-sora text-slate-900 dark:text-white leading-tight">
                {selectedStory.title}
              </h3>
              <p className="text-sm text-slate-400 font-semibold">Author: {selectedStory.author}</p>
              
              <div className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-800 dark:text-white">{selectedStory.excerpt}</p>
                <p>{selectedStory.content}</p>
                <p>
                  By participating in regional chapters, the business established trust protocols and reached client pools that were previously inaccessible. Today, they represent the peak potential of Maharashtrian MSME drive and scalability.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-855 p-4 flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-xl cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
