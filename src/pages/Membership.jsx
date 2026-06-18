import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react'

export const Membership = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const comparisonRows = [
    { feature: "Business Directory Listing", community: true, growth: true, partner: true },
    { feature: "Access to Community Update Groups", community: true, growth: true, partner: true },
    { feature: "Event Registration Discounts", community: "Basic Updates", growth: "20% Discount", partner: "100% Free VIP Pass" },
    { feature: "Featured Search Results", community: false, growth: true, partner: true },
    { feature: "Homepage Promotion Feature", community: false, growth: false, partner: "Yes (Carousel)" },
    { feature: "Dedicated Spotlight / Interview", community: false, growth: "Spotlight Card", partner: "Full Interview Article" },
    { feature: "B2B Sourcing Leads Sourced", community: false, growth: "Weekly digest", partner: "Realtime match alerts" },
    { feature: "1-on-1 Marketing Consults", community: false, growth: "1 session / Year", partner: "4 sessions / Year" },
    { feature: "Social Media Campaign Postings", community: false, growth: "1 campaign", partner: "Monthly campaign push" }
  ]

  const faqs = [
    {
      q: "What is the membership duration?",
      a: "All membership plans (Community, Growth, and Partner) are billed annually and valid for 365 days from the date of payment verification."
    },
    {
      q: "Can I upgrade my plan mid-year?",
      a: "Yes! You can upgrade from Community to Growth or Partner at any time by paying the prorated difference for the remaining months of your membership term."
    },
    {
      q: "How are B2B leads shared with Partner Members?",
      a: "When buyers submit sourcing inquiries via our consulting desks or business profile forms, our algorithm matches requirements with partner capabilities. Partners receive an automated SMS & Email lead alert immediately."
    },
    {
      q: "Is there a refund policy?",
      a: "Since our services involve immediate directory placement and marketing setup costs, we do not provide refunds once a membership profile has been verified and published."
    },
    {
      q: "Are government MSME certificate applications included?",
      a: "Our Business Consulting desk provides guidance, links, and documents for Udyam registrations, but direct submission filing assistance is part of our dedicated corporate services."
    }
  ]

  return (
    <div className="space-y-24 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          Pricing Plans
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Ecosystem <span className="text-gradient">Membership Plans</span>
        </h1>
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-outfit">
          Maximize your business visibility and lead acquisition capacity by enrolling in our membership structure. Select the right tier matching your targets.
        </p>
      </section>

      {/* Pricing Cards (re-styled for detail) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Tier 1: Community */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border border-slate-200/50 dark:border-slate-800/40 relative h-full">
          <div className="space-y-6">
            <div>
              <span className="text-sm font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full border">Basic Tier</span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-sora mt-4">Community Member</h4>
              <div className="flex items-baseline gap-1.5 my-3">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹999</span>
                <span className="text-sm text-slate-500 font-semibold">/ Year</span>
              </div>
              <p className="text-sm text-slate-550 dark:text-slate-400">Perfect for small retailers, local service providers, and startup consultants.</p>
            </div>
            
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-6 space-y-3">
              <span className="text-sm font-bold uppercase text-slate-450 tracking-wider">Included Perks:</span>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-350">
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Premium Business Directory Listing</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Community Forums & Updates</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> MSME Scheme Newsletters</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Local Whatsapp Groups access</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/apply/become-member?plan=community"
              className="block w-full text-center py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:scale-[1.02] transform"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Tier 2: Growth */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border-2 border-secondary dark:border-secondary relative h-full shadow-lg">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3.5 py-1.5 bg-secondary text-white font-extrabold text-sm tracking-widest uppercase rounded-full shadow-md">
            Recommended
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-sm font-extrabold uppercase bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20">Growth Booster</span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-sora mt-4">Growth Member</h4>
              <div className="flex items-baseline gap-1.5 my-3">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹4,999</span>
                <span className="text-sm text-slate-500 font-semibold">/ Year</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ideal for growing MSMEs, startups, and specialized service firms.</p>
            </div>
            
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-6 space-y-3">
              <span className="text-sm font-bold uppercase text-slate-450 tracking-wider">Everything in Community plus:</span>
              <ul className="space-y-3 text-sm text-slate-650 dark:text-slate-300">
                <li className="flex items-center gap-2.5"><Check size={14} className="text-secondary shrink-0" /> Highlighted Directory Placement</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-secondary shrink-0" /> Spotlight Article Showcase</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-secondary shrink-0" /> Custom B2B Lead Sourcing Digest</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-secondary shrink-0" /> 1-on-1 Marketing Consult Slot</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-secondary shrink-0" /> 20% Off B2B Summit Tickets</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/apply/become-member?plan=growth"
              className="block w-full text-center py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-primary hover:to-primary transition-all shadow-md shadow-secondary/25 hover:scale-[1.02] transform"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Tier 3: Partner */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border border-slate-200/50 dark:border-slate-800/40 relative h-full">
          <div className="space-y-6">
            <div>
              <span className="text-sm font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full border">Enterprise VIP</span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-sora mt-4">Business Partner</h4>
              <div className="flex items-baseline gap-1.5 my-3">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹14,999</span>
                <span className="text-sm text-slate-500 font-semibold">/ Year</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Built for high-volume manufacturers, wholesale distributors, and suppliers.</p>
            </div>
            
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-6 space-y-3">
              <span className="text-sm font-bold uppercase text-slate-450 tracking-wider">Everything in Growth plus:</span>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-350">
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Homepage Carousel Spotlight Listing</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Full-page Executive Interview Feature</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Immediate B2B Sourcing SMS Alerts</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> 4 Corporate Strategy Sessions</li>
                <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Free VIP Entry to all Summits</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/apply/become-member?plan=partner"
              className="block w-full text-center py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:scale-[1.02] transform"
            >
              Partner With Us
            </Link>
          </div>
        </div>

      </section>

      {/* Comparison Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-sora text-slate-900 dark:text-white">Feature Comparison Table</h2>
        
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
          <table className="w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900/80 font-bold uppercase tracking-wider text-sm border-b border-slate-200 dark:border-slate-800 text-slate-505">
                <th className="p-4 md:p-6">Ecosystem Features</th>
                <th className="p-4 text-center">Community</th>
                <th className="p-4 text-center">Growth</th>
                <th className="p-4 text-center">Partner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                  <td className="p-4 md:p-6 font-semibold text-slate-900 dark:text-white">{row.feature}</td>
                  
                  {/* Community Value */}
                  <td className="p-4 text-center text-sm">
                    {typeof row.community === 'boolean' 
                      ? (row.community ? <Check size={18} className="text-emerald-500 mx-auto" /> : <X size={18} className="text-slate-300 dark:text-slate-700 mx-auto" />)
                      : <span className="font-medium">{row.community}</span>
                    }
                  </td>

                  {/* Growth Value */}
                  <td className="p-4 text-center text-sm">
                    {typeof row.growth === 'boolean' 
                      ? (row.growth ? <Check size={18} className="text-secondary mx-auto" /> : <X size={18} className="text-slate-300 dark:text-slate-700 mx-auto" />)
                      : <span className="font-medium text-secondary">{row.growth}</span>
                    }
                  </td>

                  {/* Partner Value */}
                  <td className="p-4 text-center text-sm">
                    {typeof row.partner === 'boolean' 
                      ? (row.partner ? <Check size={18} className="text-emerald-500 mx-auto" /> : <X size={18} className="text-slate-300 dark:text-slate-700 mx-auto" />)
                      : <span className="font-bold text-emerald-600 dark:text-emerald-400">{row.partner}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section (Accordion) */}
      <section className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold font-sora text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/30 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white font-sora text-sm md:text-base cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/20"
              >
                <span className="flex items-center gap-2"><HelpCircle size={16} className="text-secondary shrink-0" /> {faq.q}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-sm md:text-sm text-slate-650 dark:text-slate-400 leading-relaxed animate-in slide-in-from-top-1 duration-150 border-t border-slate-100 dark:border-slate-850">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="p-10 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="space-y-2 z-10">
          <h3 className="text-2xl font-bold font-sora flex items-center gap-1.5"><ShieldCheck className="text-secondary" /> Secured Payment Guarantee</h3>
          <p className="text-sm text-slate-400 max-w-xl">All membership applications go through manual KYC verification within 24 hours. Your transaction details are protected under standard industrial gateways (Razorpay, UPI).</p>
        </div>
        <Link
          to="/apply/become-member"
          className="px-8 py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold text-sm rounded-xl uppercase tracking-wider shadow-md shrink-0 z-10"
        >
          Proceed to Sign Up
        </Link>
      </section>

    </div>
  )
}
