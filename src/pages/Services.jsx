import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Building, 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  Award,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

export const Services = () => {
  const [activeTab, setActiveTab] = useState("business-promotion");

  const servicesList = [
    {
      id: "business-promotion",
      title: "Business Promotion",
      icon: <Building className="w-8 h-8" />,
      tagline: "Increase your brand visibility across Maharashtra",
      desc: "We place your brand in front of active B2B buyers and decision makers. Rather than just placing you in a directory list, we create detailed spotlights and writeups.",
      subservices: [
        "Business Spotlight: Deep-dive article showcasing your factory/office.",
        "Product Showcase: Dedicated gallery and detail pages for your products.",
        "Entrepreneur Stories: Inspirational profiles shared across our ecosystem.",
        "Sponsored Campaigns: Prominent banner spots on home page and emails."
      ],
      colorClass: "from-blue-600 to-indigo-800",
      ctaLink: "/apply/get-featured"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      icon: <Zap className="w-8 h-8" />,
      tagline: "Performance marketing that drives commercial intent",
      desc: "Our localized marketing services ensure you get found by clients in Pune, Mumbai, Nagpur, and beyond. We audit, strategy, and execute performance campaigns.",
      subservices: [
        "Search Engine Optimization (SEO): Ranking for terms like 'fabrication Pune'.",
        "Social Media Marketing: Professional B2B LinkedIn and Facebook management.",
        "Google & Meta Ads: High-converting regional pay-per-click setups.",
        "Brand Promotion: Custom newsletters sent to 5,000+ business owners."
      ],
      colorClass: "from-orange-500 to-red-600",
      ctaLink: "/apply/consultation?service=marketing"
    },
    {
      id: "website-development",
      title: "Website Development",
      icon: <Target className="w-8 h-8" />,
      tagline: "Sleek, responsive websites with premium modern speed",
      desc: "An outdated site drives away potential corporate clients. We design high-speed, modern, premium React/Vite/Tailwind platforms tailored to convert.",
      subservices: [
        "Business Websites: Complete multi-page sites with CMS options.",
        "Corporate Portals: Premium designs for large manufacturing concerns.",
        "E-Commerce Stores: Integrated catalogues with modern cart setups.",
        "Landing Pages: High-speed single-page setups optimized for ads."
      ],
      colorClass: "from-violet-600 to-purple-800",
      ctaLink: "/apply/consultation?service=webdev"
    },
    {
      id: "lead-generation",
      title: "Lead Generation",
      icon: <TrendingUp className="w-8 h-8" />,
      tagline: "Warm B2B leads matched to your industrial capacity",
      desc: "Stop cold calling. Get connected directly to companies looking for your services. We route verified purchase requests directly to suitable suppliers.",
      subservices: [
        "Business Leads: Custom sourcing requests match-made weekly.",
        "Customer Acquisition: Campaign management to attract active clients.",
        "Campaign Audits: Reviewing your current lead sources and conversion rates."
      ],
      colorClass: "from-emerald-500 to-teal-700",
      ctaLink: "/apply/consultation?service=leads"
    },
    {
      id: "networking-services",
      title: "Networking Services",
      icon: <Users className="w-8 h-8" />,
      tagline: "Build high-impact relationships with industrial peers",
      desc: "Access closed networking pools. Mingle with owners of heavy engineering shops, agricultural exporters, tech founders, and advisors.",
      subservices: [
        "Business Meets: Monthly local breakfast meetings in major cities.",
        "Referral Programs: Structured systems to exchange contacts safely.",
        "Partnership Programs: Joint-venture opportunities between member firms."
      ],
      colorClass: "from-amber-500 to-yellow-600",
      ctaLink: "/apply/partner"
    },
    {
      id: "business-consulting",
      title: "Business Consulting",
      icon: <Award className="w-8 h-8" />,
      tagline: "1-on-1 strategic growth advisory sessions",
      desc: "Navigate regulatory frameworks and identify expansion pathways. Engage seasoned business mentors to solve operational blockades.",
      subservices: [
        "MSME Subsidies: Assistance with PSI scheme filing and Udyam filings.",
        "Scaling Audits: Process review to transition from small shops to corporations.",
        "Tooling & QA consultation: Industrial standard certifications guidance."
      ],
      colorClass: "from-cyan-500 to-blue-600",
      ctaLink: "/apply/consultation?service=consulting"
    }
  ]

  return (
    <div className="space-y-24 py-16 pb-20">
      
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          What We Do
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-sora">
          Ecosystem <span className="text-gradient">Growth Services</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
          We combine tech development, networking access, and marketing support to deliver custom growth pipelines for MSMEs, startups, and service providers.
        </p>
      </section>

      {/* Services Interactive Layout */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar Tabs */}
          <div className="w-full lg:w-4/12 flex flex-col gap-3 shrink-0">
            {servicesList.map((service, index) => {
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`p-4 rounded-2xl flex items-center gap-4 text-left transition-all border group cursor-pointer ${
                    isActive 
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-lg transform scale-[1.02] z-10' 
                      : 'bg-transparent border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                    isActive 
                      ? `bg-gradient-to-br ${service.colorClass} text-white shadow-inner` 
                      : 'bg-slate-100 dark:bg-slate-850 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}>
                    <div className="[&>svg]:w-6 [&>svg]:h-6">
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">
                      Module 0{index + 1}
                    </div>
                    <div className={`text-base font-bold font-sora ${
                      isActive 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                    }`}>
                      {service.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-8/12">
            {(() => {
              const activeService = servicesList.find(s => s.id === activeTab) || servicesList[0];
              return (
                <div 
                  key={activeService.id} 
                  className="p-8 lg:p-12 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${activeService.colorClass} opacity-10 rounded-full blur-3xl pointer-events-none`} />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col gap-4 mb-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeService.colorClass} text-white flex items-center justify-center shadow-lg mb-2`}>
                        <div className="[&>svg]:w-8 [&>svg]:h-8">
                          {activeService.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold font-sora mb-3 text-slate-900 dark:text-white">
                          {activeService.title}
                        </h3>
                        <p className="text-sm md:text-base text-secondary font-bold uppercase tracking-wide">
                          {activeService.tagline}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-650 dark:text-slate-350 leading-relaxed font-outfit mb-10">
                      {activeService.desc}
                    </p>

                    <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-6">
                      Core Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                      {activeService.subservices.map((sub, sIdx) => {
                        const [title, details] = sub.split(':')
                        return (
                          <div key={sIdx} className="flex gap-3 items-start bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                            <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                              <strong className="text-slate-900 dark:text-white font-bold">{title}</strong>
                              <span className="leading-relaxed">{details}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <Link
                      to={activeService.ctaLink}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${activeService.colorClass} text-white transition-all rounded-2xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transform w-full sm:w-auto`}
                    >
                      Get Started with {activeService.title}
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* FAQs Service specific */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 bg-slate-100/40 dark:bg-slate-900/30 p-12 rounded-3xl border border-slate-200/50 dark:border-slate-800/40">
        <HelpCircle className="mx-auto text-secondary" size={40} />
        <h3 className="text-2xl font-bold font-sora text-slate-900 dark:text-white">Need a Customized Service Plan?</h3>
        <p className="text-sm text-slate-650 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Not sure whether you need SEO or a fresh website? Or do you want to bundle Lead Generation with Business Promotion? Book a free 15-minute consulting slot with our ecosystem managers. We will review your current capacity and map a direct strategy.
        </p>
        <div>
          <Link
            to="/apply/consultation"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-light hover:scale-102 transition-transform text-white font-bold rounded-2xl text-sm shadow-md"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>

    </div>
  )
}
