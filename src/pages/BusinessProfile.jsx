import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppStore } from '../store/useAppStore'
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Star, 
  Check, 
  Video, 
  Image, 
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react'

// Zod Schema for Inquiry Form
const inquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit Indian phone number.' }),
  businessName: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
})

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.046 0 12 0 12s0 3.954.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.954 24 12 24 12s0-3.954-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

export const BusinessProfile = () => {
  const { id } = useParams()
  const { businesses, submitLead } = useAppStore()
  const [inquirySuccess, setInquirySuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Find business details
  const biz = businesses.find(b => b.id === id)

  // Form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(inquirySchema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await submitLead(`Business Inquiry: ${biz?.name}`, data)
      setInquirySuccess(true)
      reset()
      setTimeout(() => setInquirySuccess(false), 5000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!biz) {
    return (
      <div className="max-w-lg mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold font-sora">Business Profile Not Found</h2>
        <p className="text-slate-500">The profile you are trying to view does not exist or has been removed.</p>
        <Link to="/directory" className="inline-block px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl">
          Back to Directory
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24 text-left">
      
      {/* 1. BUSINESS BANNER */}
      <section className="relative h-60 md:h-80 bg-slate-900 overflow-hidden">
        {/* Abstract Background Design */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${biz.logoColor} opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-transparent to-transparent" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 w-full">
            {/* Logo box */}
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr ${biz.logoColor} flex items-center justify-center text-white font-black text-3xl md:text-5xl shadow-2xl border-4 border-white dark:border-slate-950 shrink-0`}>
              {biz.name.charAt(0)}
            </div>

            {/* Title Details */}
            <div className="space-y-2 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-full shadow-md">
                  {biz.category}
                </span>
                {biz.featured && (
                  <span className="text-sm font-bold uppercase tracking-widest bg-white/20 text-accent px-2.5 py-1 rounded-full border border-accent/20 backdrop-blur-sm">
                    Premium Partner
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold font-sora leading-tight">{biz.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-secondary" /> {biz.city}, Maharashtra</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" /> {biz.rating} ({biz.reviewsCount} Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Business Details */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Business Overview */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-4">
            <h2 className="text-xl font-bold font-sora text-slate-950 dark:text-white pb-2 border-b border-slate-200/55 dark:border-slate-800/40">
              About the Business
            </h2>
            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-medium">
              {biz.description}
            </p>
            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
              {biz.about}
            </p>
          </div>

          {/* Services Provided */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h2 className="text-xl font-bold font-sora text-slate-950 dark:text-white pb-2 border-b border-slate-200/55 dark:border-slate-800/40">
              Services & Specialties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {biz.services.map((srv, idx) => (
                <div key={idx} className="flex gap-2 items-center p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                  <Check size={16} className="text-secondary shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-300">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h2 className="text-xl font-bold font-sora text-slate-955 dark:text-white pb-2 border-b border-slate-200/55 dark:border-slate-800/40">
              Work Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {biz.galleryColors.map((color, idx) => (
                <div key={idx} className={`aspect-video rounded-xl bg-gradient-to-br ${color} relative overflow-hidden shadow-inner flex items-center justify-center text-white/40 group`}>
                  <Image size={24} className="group-hover:scale-110 transition-transform text-white/50" />
                  <span className="absolute bottom-2 left-2 text-sm uppercase font-bold tracking-widest text-white/80">Project {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Showcase */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h2 className="text-xl font-bold font-sora text-slate-955 dark:text-white pb-2 border-b border-slate-200/55 dark:border-slate-800/40">
              Video Walkthrough
            </h2>
            <div className="aspect-video w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 flex flex-col items-center justify-center text-center p-6 text-slate-400 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <div className="p-4 rounded-full bg-secondary text-white shadow-xl hover:scale-110 transition-all z-10 mb-3 cursor-pointer">
                <Video size={28} />
              </div>
              <span className="text-sm font-bold text-white z-10">{biz.videoPlaceholder}</span>
              <span className="text-sm text-slate-300 z-10 mt-1">Ecosystem Video Showcase</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h2 className="text-xl font-bold font-sora text-slate-955 dark:text-white pb-2 border-b border-slate-200/55 dark:border-slate-800/40">
              Client Reviews
            </h2>
            <div className="space-y-6">
              {biz.testimonials.map((t, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/55 dark:border-slate-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sora">{t.name}</h4>
                      <p className="text-sm text-slate-550 font-semibold">{t.role}</p>
                    </div>
                    <div className="flex text-amber-500"><Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /> <Star size={12} className="fill-amber-500" /></div>
                  </div>
                  <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Contact Details & Inquiry Form */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
          
          {/* Contact Details */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-4">
            <h3 className="text-lg font-bold font-sora text-slate-955 dark:text-white mb-2">Contact Info</h3>
            
            <div className="space-y-3.5 text-sm text-slate-650 dark:text-slate-350">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg"><Phone size={16} /></div>
                <span>{biz.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg"><Mail size={16} /></div>
                <span className="break-all">{biz.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg"><Globe size={16} /></div>
                <a href={`https://${biz.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{biz.website}</a>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg mt-0.5"><MapPin size={16} /></div>
                <span>MIDC Zone, {biz.city}, Maharashtra</span>
              </div>
            </div>

            {/* Social handles */}
            <div className="flex gap-4 pt-4 border-t border-slate-150 dark:border-slate-800/80 justify-center text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-secondary transition-colors"><FacebookIcon /></a>
              <a href="#" className="hover:text-secondary transition-colors"><InstagramIcon /></a>
              <a href="#" className="hover:text-secondary transition-colors"><LinkedinIcon /></a>
              <a href="#" className="hover:text-secondary transition-colors"><YoutubeIcon /></a>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="p-6 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-4" id="inquiry">
            <h3 className="text-lg font-bold font-sora text-slate-955 dark:text-white flex items-center gap-1.5"><MessageSquare size={18} className="text-secondary" /> Send Inquiry</h3>
            <p className="text-sm text-slate-550 dark:text-slate-400">Submit your B2B sourcing requirements directly to {biz.name}.</p>
            
            {inquirySuccess ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-2xl text-sm text-center font-medium animate-pulse space-y-1">
                <p className="font-bold">Inquiry Sent Successfully!</p>
                <p className="text-sm text-slate-500">The business team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
                {/* Name */}
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    {...register('name')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  />
                  {errors.name && <p className="text-sm text-red-500 font-semibold">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    {...register('email')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  />
                  {errors.email && <p className="text-sm text-red-500 font-semibold">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <input
                    type="tel"
                    placeholder="Phone Number (10 digits) *"
                    required
                    {...register('phone')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  />
                  {errors.phone && <p className="text-sm text-red-500 font-semibold">{errors.phone.message}</p>}
                </div>

                {/* Business Name */}
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    {...register('businessName')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <textarea
                    placeholder="Sourcing details/requirements... *"
                    rows={4}
                    required
                    {...register('message')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400 resize-none"
                  />
                  {errors.message && <p className="text-sm text-red-500 font-semibold">{errors.message.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </section>
      
      {/* MOBILE STICKY CONTACT CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 h-14 bg-gradient-to-r from-primary to-primary-light border-t border-slate-750 flex items-center px-4 justify-between shadow-2xl">
        <div className="text-white text-sm font-bold font-sora">
          Interested in B2B Sourcing?
        </div>
        <a
          href="#inquiry"
          className="px-4 py-2 bg-secondary text-white text-sm font-bold rounded-xl transition-colors shadow-md"
        >
          Send Inquiry
        </a>
      </div>

    </div>
  )
}
