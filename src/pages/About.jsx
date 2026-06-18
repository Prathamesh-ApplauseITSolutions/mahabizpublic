import { Link } from 'react-router-dom'
import { 
  Compass, 
  Eye, 
  ShieldCheck, 
  Layers, 
  Users, 
  Zap, 
  Target 
} from 'lucide-react'

export const About = () => {
  const timelineEvents = [
    {
      year: "2023",
      title: "Founding & Incubation",
      desc: "MahaBiz Connect was founded by regional industry leaders and tech entrepreneurs in Pune. The goal was to build an active digital bridge for Maharashtra's MSMEs who were struggling with traditional static directory catalogs."
    },
    {
      year: "2024",
      title: "Regional Network Expansion",
      desc: "Expanded operations into Nagpur, Nashik, and Aurangabad, connecting over 500 manufacturers and launching regional B2B networking meetings that generated over ₹2.5 Crores in business value exchange."
    },
    {
      year: "2025",
      title: "Ecosystem Digitization",
      desc: "Launched our premium directory search system, matching buyers directly with localized service providers and introducing structured consultation modules and digital marketing support services."
    },
    {
      year: "2026",
      title: "National & Global Connections",
      desc: "Today, we support over 1,200 businesses. Our focus is connecting Maharashtra's producers directly with international export markets and providing tier-1 supply-chain introductions."
    }
  ]

  return (
    <div className="space-y-24 py-16 pb-20">
      
      {/* Hero Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          Who We Are
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-sora">
          Accelerating Maharashtra's <span className="text-gradient">Industrial Growth</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
          MahaBiz Connect is not just a listing website. We are a dynamic business growth ecosystem dedicated to digitising and connecting MSMEs, retailers, and service providers across Maharashtra.
        </p>
      </section>

      {/* Vision, Mission, Values */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Vision */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between h-[320px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-secondary" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sora text-slate-950 dark:text-white">Our Vision</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To establish Maharashtra as the most interconnected, technologically advanced, and collaborative MSME hub in Asia, driving sustainable GDP growth through local industries.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between h-[320px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary dark:text-blue-400 flex items-center justify-center mb-6">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sora text-slate-950 dark:text-white">Our Mission</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To empower 10,000+ businesses in Maharashtra with robust digital tools, qualified lead acquisition channels, high-impact regional networks, and strategic growth consultations.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between h-[320px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-accent" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent-dark dark:text-accent flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sora text-slate-950 dark:text-white">Core Values</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We act with integrity, foster collaborative networks, prioritize MSME innovation, and execute results that directly improve the commercial bottom-lines of our members.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Company Story Timeline */}
      <section className="bg-slate-100/40 dark:bg-slate-900/30 py-20 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold font-sora">Company Story</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Growth Timeline</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              From our humble beginnings to pioneering digital business ecosystems, here is a glance at our milestones.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-slate-300 dark:border-slate-700 ml-4 md:ml-32 space-y-12">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-6 md:pl-8">
                {/* Year Indicator on Left for desktop */}
                <div className="hidden md:block absolute -left-32 top-1 w-24 text-right font-black text-2xl text-primary dark:text-white font-sora">
                  {evt.year}
                </div>
                {/* Timeline Dot */}
                <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-secondary border-4 border-white dark:border-slate-950 shadow-md" />
                
                {/* Mobile Year label */}
                <span className="md:hidden block font-extrabold text-sm text-secondary uppercase tracking-widest mb-1">{evt.year}</span>
                
                <div className="p-6 rounded-2xl glass-card text-left">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sora">{evt.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why MahaBiz Connect & Growth Strategy */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left text column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold font-sora">Why We Do It</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sora">
              Growth Strategy Designed for Maharashtra
            </h3>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In Maharashtra, economic activity is heavily localized within industrial clusters (MIDCs) across Pune, Thane, Nagpur, Nashik, and Aurangabad. MahaBiz Connect bridges these clusters digitally. 
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="p-2.5 h-10 w-10 bg-secondary/15 text-secondary rounded-lg shrink-0 flex items-center justify-center">
                <Layers size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white font-sora">Cluster-to-Cluster Synergy</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">We facilitate B2B product supply chains between heavy fabrication units in Pune and manufacturing suppliers in Thane.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2.5 h-10 w-10 bg-primary/15 text-primary dark:text-blue-300 rounded-lg shrink-0 flex items-center justify-center">
                <Users size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white font-sora">Direct Executive Network</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Our platform actively connects decision makers directly through curated WhatsApp communities and closed-door B2B tables.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2.5 h-10 w-10 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0 flex items-center justify-center">
                <Zap size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white font-sora">Subsidies & Compliance Education</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">We provide resources regarding state Package Incentives, Udyam compliance, patent funding, and green technology subsidies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Impact Goals column */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 text-white space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          
          <h4 className="text-xl font-bold font-sora flex items-center gap-2">
            <Target className="text-secondary" /> Our Impact Goals (By 2028)
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            We operate with clear, measurable benchmarks to elevate local industries and create sustainable business outcomes.
          </p>

          <div className="border-t border-slate-800 pt-6 space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-2">
                <span>10,000+ MSMEs Connected</span>
                <span className="text-secondary">12% Complete</span>
              </div>
              <div className="w-full bg-slate-855 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-2">
                <span>₹50 Cr+ Business Value Shared</span>
                <span className="text-secondary">8% Complete</span>
              </div>
              <div className="w-full bg-slate-855 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-wider mb-2">
                <span>50+ Industrial Associations Integrated</span>
                <span className="text-secondary">20% Complete</span>
              </div>
              <div className="w-full bg-slate-855 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Link
              to="/apply/become-member"
              className="px-6 py-3 bg-secondary hover:bg-secondary-light transition-colors rounded-xl text-sm font-bold uppercase tracking-wider"
            >
              Collaborate With Us
            </Link>
          </div>
        </div>

      </section>

    </div>
  )
}
