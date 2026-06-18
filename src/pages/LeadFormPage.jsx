import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppStore } from '../store/useAppStore'
import { 
  Building2, 
  Sparkles, 
  HelpCircle, 
  Megaphone, 
  Users, 
  Send, 
  Loader2, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

// Master Zod Validation Schema for all forms
const leadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit Indian phone number.' }),
  businessName: z.string().min(2, { message: 'Business Name must be at least 2 characters.' }),
  
  // Dynamic Option Fields
  membershipPlan: z.string().optional(),
  businessCategory: z.string().optional(),
  locationCity: z.string().optional(),
  industryType: z.string().optional(),
  websiteUrl: z.string().optional(),
  consultationTopic: z.string().optional(),
  partnershipType: z.string().optional(),
  adBudget: z.string().optional(),
  
  message: z.string().min(10, { message: 'Please write a brief summary (minimum 10 characters).' })
})

export const LeadFormPage = () => {
  const { formType } = useParams()
  const [searchParams] = useSearchParams()
  const { submitLead } = useAppStore()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Determine Form Type Properties
  let formTitle = "Apply Now"
  let formSubtitle = "Submit your application to join MahaBiz."
  let formIcon = <Building2 size={24} className="text-secondary" />

  const planParam = searchParams.get('plan') || 'growth'

  switch(formType) {
    case 'become-member':
      formTitle = "Become a Member"
      formSubtitle = "Enroll in our business networking and visibility tiers."
      formIcon = <Sparkles size={24} className="text-secondary" />
      break
    case 'get-featured':
      formTitle = "Get Your Business Featured"
      formSubtitle = "Showcase your brand spotlight and profile on the homepage."
      formIcon = <Building2 size={24} className="text-secondary" />
      break
    case 'consultation':
      formTitle = "Book a Free Growth Consultation"
      formSubtitle = "Schedule a 1-on-1 strategic growth and compliance session."
      formIcon = <HelpCircle size={24} className="text-secondary" />
      break
    case 'advertise':
      formTitle = "Advertise With Us"
      formSubtitle = "Place your banner ads and sponsor flyers in our newsletters."
      formIcon = <Megaphone size={24} className="text-secondary" />
      break
    case 'partner':
      formTitle = "Partner With Us"
      formSubtitle = "Collaborate as an association, sponsor, or corporate vendor."
      formIcon = <Users size={24} className="text-secondary" />
      break
  }

  // React Hook Form
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      membershipPlan: planParam
    }
  })

  // Update default value if search param changes
  useEffect(() => {
    if (formType === 'become-member') {
      setValue('membershipPlan', planParam)
    }
  }, [planParam, formType, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await submitLead(`Lead Form: ${formTitle}`, data)
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 8000)
    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 py-16 pb-24 max-w-3xl mx-auto px-4 sm:px-6 text-left">
      
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-secondary transition-colors"
      >
        <ArrowLeft size={12} /> Back to Home
      </Link>

      <div className="p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 space-y-6 relative overflow-hidden shadow-lg">
        
        {/* Banner graphic */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-secondary" />

        {/* Title */}
        <div className="flex items-center gap-3 border-b border-slate-150 dark:border-slate-800/80 pb-6">
          <div className="p-3 bg-secondary/10 rounded-2xl">
            {formIcon}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold font-sora text-slate-955 dark:text-white leading-tight">
              {formTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {formSubtitle}
            </p>
          </div>
        </div>

        {/* Form or Success State */}
        {success ? (
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="mx-auto text-emerald-500 animate-bounce" size={48} />
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-sora text-slate-900 dark:text-white">Application Received!</h3>
              <p className="text-sm text-slate-505 leading-relaxed max-w-md mx-auto">
                Thank you for submitting your details. Our ecosystem relations team is reviewing your details and will get in touch with you via WhatsApp/Email within 24 hours.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-4">
              <Link 
                to="/directory" 
                className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white text-sm font-bold rounded-xl"
              >
                Go to Directory
              </Link>
              <Link 
                to="/" 
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm sm:text-sm">
            
            {/* Core Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Contact Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Contact Person *</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                />
                {errors.name && <p className="text-sm text-red-500 font-semibold">{errors.name.message}</p>}
              </div>

              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Business Name *</label>
                <input
                  type="text"
                  placeholder="Enter Registered Company Name"
                  {...register('businessName')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                />
                {errors.businessName && <p className="text-sm text-red-500 font-semibold">{errors.businessName.message}</p>}
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  {...register('phone')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                />
                {errors.phone && <p className="text-sm text-red-500 font-semibold">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. contact@business.com"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                />
                {errors.email && <p className="text-sm text-red-500 font-semibold">{errors.email.message}</p>}
              </div>

            </div>

            {/* Dynamic Type-specific fields */}
            
            {formType === 'become-member' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                <div className="space-y-1.5 text-sm">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Select Membership Tier</label>
                  <select
                    {...register('membershipPlan')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  >
                    <option value="community">Community Member (₹999 / Year)</option>
                    <option value="growth">Growth Member (₹4,999 / Year)</option>
                    <option value="partner">Business Partner (₹14,999 / Year)</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 text-sm">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">City Location (MH)</label>
                  <select
                    {...register('locationCity')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Nashik">Nashik</option>
                    <option value="Aurangabad">Aurangabad</option>
                    <option value="Thane">Thane</option>
                    <option value="Kolhapur">Kolhapur</option>
                  </select>
                </div>
              </div>
            )}

            {formType === 'get-featured' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
                
                <div className="space-y-1.5 text-sm">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Business Category</label>
                  <select
                    {...register('businessCategory')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  >
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="MSME">MSME</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Tech Startup">Tech Startup</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Industry Cluster</label>
                  <input
                    type="text"
                    placeholder="e.g. Metal Machining"
                    {...register('industryType')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-800 dark:text-white border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Website / Catalog URL</label>
                  <input
                    type="text"
                    placeholder="e.g. www.company.com"
                    {...register('websiteUrl')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-800 dark:text-white border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  />
                </div>

              </div>
            )}

            {formType === 'consultation' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-sm space-y-1.5">
                <label className="font-extrabold text-slate-450 uppercase tracking-widest">Select Consultation Topic</label>
                <select
                  {...register('consultationTopic')}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                >
                  <option value="marketing">Digital Marketing & Local SEO Sourcing</option>
                  <option value="webdev">Premium Website & Catalogue Development</option>
                  <option value="leads">B2B Lead Sourcing Match Desk</option>
                  <option value="subsidies">Maharashtra State Government Subsidies & PSI Compliance</option>
                  <option value="scaling">Transitioning from Shop Floor to SME Organization</option>
                </select>
              </div>
            )}

            {formType === 'advertise' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-sm">
                
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Monthly Marketing Budget</label>
                  <select
                    {...register('adBudget')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  >
                    <option value="10-25k">₹10,000 - ₹25,000</option>
                    <option value="25-50k">₹25,000 - ₹50,000</option>
                    <option value="50-100k">₹50,000 - ₹1,00,000</option>
                    <option value="100k+">Above ₹1,00,00,000</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-450 uppercase tracking-widest">Select Promotion Channel</label>
                  <select
                    {...register('partnershipType')}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                  >
                    <option value="banner">Homepage Featured Banners</option>
                    <option value="newsletter">Dedicated MSME Newsletter ads</option>
                    <option value="brochure">Event brochures & physical banner kits</option>
                    <option value="bundle">Full Omni-channel bundle pack</option>
                  </select>
                </div>

              </div>
            )}

            {formType === 'partner' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 text-sm space-y-1.5">
                <label className="font-extrabold text-slate-450 uppercase tracking-widest">Partnership Objective</label>
                <select
                  {...register('partnershipType')}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:outline-none text-sm"
                >
                  <option value="association">Industrial Association Collaboration (MIDC)</option>
                  <option value="summit-sponsor">B2B Connect Summit Title Sponsor</option>
                  <option value="academic">Academic / Technical Internship Program partner</option>
                  <option value="vendor-procure">Large corporate Procurement Partnership</option>
                </select>
              </div>
            )}

            {/* General Message */}
            <div className="space-y-1.5">
              <label className="text-sm font-extrabold text-slate-450 uppercase tracking-widest">Describe Your Request / Capacity Details *</label>
              <textarea
                placeholder="Give a summary of your operations, products, or query details..."
                rows={5}
                {...register('message')}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-secondary transition-colors text-slate-900 dark:text-white placeholder-slate-400 resize-none"
              />
              {errors.message && <p className="text-sm text-red-500 font-semibold">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} Submit Application
            </button>
          </form>
        )}

      </div>

    </div>
  )
}
