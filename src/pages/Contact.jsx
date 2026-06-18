import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppStore } from '../store/useAppStore'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  MessageSquare
} from 'lucide-react'

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

// Zod Schema for Contact Form
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit Indian phone number.' }),
  businessName: z.string().min(2, { message: 'Business Name must be at least 2 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
})

export const Contact = () => {
  const { submitLead } = useAppStore()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await submitLead('General Inquiry', data)
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-16 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-outfit">
          Have queries about membership plans, lead matching services, event sponsorships, or advertising slots? Let us know.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Contact Info & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Quick info */}
          <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
            <h3 className="text-xl font-bold font-sora text-slate-950 dark:text-white">Quick Contact Info</h3>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg"><Phone size={18} /></div>
                <div>
                  <p className="text-sm uppercase font-bold text-slate-400">Call Support Desk</p>
                  <p className="font-semibold text-slate-850 dark:text-slate-250">+91 22 4590 1200</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg"><Mail size={18} /></div>
                <div>
                  <p className="text-sm uppercase font-bold text-slate-400">Email Inquiry Desk</p>
                  <p className="font-semibold text-slate-850 dark:text-slate-250">support@mahabizconnect.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-secondary rounded-lg mt-0.5"><MapPin size={18} /></div>
                <div>
                  <p className="text-sm uppercase font-bold text-slate-400">Registered Chambers Office</p>
                  <p className="font-semibold text-slate-850 dark:text-slate-250">MahaBiz Chambers, Senapati Bapat Road, Shivajinagar, Pune, MH 411016</p>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="pt-6 border-t border-slate-150 dark:border-slate-800/80">
              <p className="text-sm uppercase font-bold text-slate-400 mb-3 text-center lg:text-left">Connect with our Social channels</p>
              <div className="flex gap-4 justify-center lg:justify-start text-slate-500 dark:text-slate-400">
                <a href="#" className="hover:text-secondary transition-colors"><FacebookIcon /></a>
                <a href="#" className="hover:text-secondary transition-colors"><InstagramIcon /></a>
                <a href="#" className="hover:text-secondary transition-colors"><LinkedinIcon /></a>
                <a href="#" className="hover:text-secondary transition-colors"><YoutubeIcon /></a>
              </div>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href="tel:+912245901200"
              className="flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-md hover:bg-primary-dark transition-all"
            >
              <Phone size={16} /> Call Us Now
            </a>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20have%20an%20enquiry%20regarding%20MahaBiz%20Connect%20sponsorships."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-md hover:bg-green-600 transition-all"
            >
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>

          {/* Google Map mock */}
          <div className="p-4 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Office Map Location</h4>
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-850 border border-slate-250 dark:border-slate-800 flex flex-col items-center justify-center text-center p-6 text-slate-400 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-secondary/15 rounded-full blur-xl animate-ping" />
              <MapPin size={32} className="text-secondary mb-2 z-10" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 z-10">Google Map Location Placeholder</span>
              <span className="text-sm text-slate-500 z-10">Senapati Bapat Road, Pune, Maharashtra 411016</span>
            </div>
          </div>

        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-sora text-slate-950 dark:text-white">Submit an Enquiry</h3>
            <p className="text-sm text-slate-550">Fill in the detailed form. Our team responds within 2 business hours.</p>
          </div>

          {success ? (
            <div className="p-8 bg-green-500/10 border border-green-500/20 text-green-600 rounded-3xl text-sm text-center font-semibold animate-pulse space-y-2">
              <p className="text-lg">Thank You!</p>
              <p className="text-sm text-slate-550">Your inquiry has been captured. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-905 dark:text-white placeholder-slate-400 text-sm sm:text-sm"
                  />
                  {errors.name && <p className="text-sm text-red-500 font-semibold">{errors.name.message}</p>}
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Business Name *</label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    {...register('businessName')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-905 dark:text-white placeholder-slate-400 text-sm sm:text-sm"
                  />
                  {errors.businessName && <p className="text-sm text-red-500 font-semibold">{errors.businessName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-905 dark:text-white placeholder-slate-400 text-sm sm:text-sm"
                  />
                  {errors.phone && <p className="text-sm text-red-500 font-semibold">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. sales@company.com"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-905 dark:text-white placeholder-slate-400 text-sm sm:text-sm"
                  />
                  {errors.email && <p className="text-sm text-red-500 font-semibold">{errors.email.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Message *</label>
                <textarea
                  placeholder="Detail your request..."
                  rows={6}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-905 dark:text-white placeholder-slate-400 resize-none text-sm sm:text-sm"
                />
                {errors.message && <p className="text-sm text-red-500 font-semibold">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm sm:text-sm"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Submit Message
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  )
}
