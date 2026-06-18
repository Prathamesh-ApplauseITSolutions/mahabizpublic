import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import ConstellationCanvas from '../components/ConstellationCanvas'
import {
  ArrowRight,
  Users,
  Building,
  TrendingUp,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Target,
  Award,
  Eye,
  UserPlus,
  Handshake,
  BookOpen,
  Globe,
  Sparkles,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react'
import mhMap from '../assets/images/mh_map.png'

// Simple Counter component for stats
const AnimatedCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return

    // speed up counter
    const duration = 2000
    const increment = Math.ceil(end / (duration / 30))

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        clearInterval(timer)
        setCount(end)
      } else {
        setCount(start)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center py-4 px-2 sm:py-5 sm:px-4 text-center rounded-2xl glass-card relative overflow-hidden group min-w-0">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-xl sm:text-2xl lg:text-3xl font-black text-primary dark:text-white mb-1 font-sora">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-405 tracking-wider uppercase break-words w-full">
        {label}
      </span>
    </div>
  )
}

export const Home = () => {
  const { businesses, events } = useAppStore()
  const featuredBusinesses = businesses.filter(b => b.featured)
  const upcomingEvents = events.filter(e => e.type === 'upcoming')

  // Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonials = [
    {
      quote: "MahaBiz Connect transformed how we acquire corporate leads. Through their B2B summits, we signed contracts that expanded our metalwork facility by 45%.",
      author: "Sanjay Deshpande",
      role: "MD, Sahyadri Engineering Works",
      rating: 5,
      avatarColor: "bg-blue-600"
    },
    {
      quote: "Being featured on the homepage as a Partner Member helped us connect directly with buyers in Mumbai and export agents. Our organic orange sales scaled by 150%.",
      author: "Sunil Gokhale",
      role: "Founder, MahaAgro Organics Nagpur",
      rating: 5,
      avatarColor: "bg-emerald-600"
    },
    {
      quote: "The digital marketing consultations and local SEO support we received gave our wellness brand nationwide visibility. An absolute game-changer for MSMEs.",
      author: "Dr. Shastri",
      role: "Vedic Wellness Hub Nashik",
      rating: 5,
      avatarColor: "bg-amber-600"
    }
  ]

  // Carousel ref for businesses
  const carouselRef = useRef(null)

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const offset = direction === 'left' ? -clientWidth : clientWidth
      carouselRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' })
    }
  }

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="space-y-12 sm:space-y-24 pb-12 sm:pb-20">

      {/* 1. HERO SECTION */}
      <section className="relative z-[1] min-h-[75vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden py-10 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/95 dark:bg-slate-950/95">
        {/* Constellation Network Background */}
        <ConstellationCanvas />

        {/* Abstract Soft Glow Blobs (above canvas, below content) */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-[1]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 dark:bg-secondary/15 rounded-full blur-3xl z-[1]" />

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="hero-badge-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary dark:text-blue-200 text-sm font-bold uppercase tracking-wider">
              <Zap size={14} className="text-secondary shrink-0 drop-shadow-sm" /> Maharashtra's Leading Business Ecosystem
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white font-sora break-words">
              Connecting Maharashtra's <span className="text-gradient">Businesses</span> with Opportunities
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-305 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-outfit">
              Helping startups, MSMEs, small businesses, and manufacturers gain global visibility, generate verified leads, build strategic networks, and accelerate revenue growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/apply/become-member"
                className="w-full sm:w-auto px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-primary to-primary-light hover:from-secondary hover:to-secondary-light transition-all shadow-md sm:shadow-lg shadow-primary/20 hover:shadow-secondary/25 hover:scale-[1.03] transform text-center whitespace-nowrap"
              >
                Join MahaBiz
              </Link>
              <Link
                to="/apply/get-featured"
                className="w-full sm:w-auto px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-slate-700 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-secondary transition-all shadow-sm hover:scale-[1.03] transform text-center whitespace-nowrap"
              >
                Get Your Business Featured
              </Link>
              <Link
                to="/apply/consultation"
                className="w-full sm:w-auto px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-secondary dark:text-secondary-light hover:text-white bg-secondary/10 dark:bg-secondary/15 hover:bg-secondary transition-all text-center whitespace-nowrap"
              >
                Book Consultation..
              </Link>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src={mhMap}
              alt="MahaBiz Maharashtra business network map"
              className="w-full max-w-3xl h-auto rounded-[2rem] shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* 2. BUSINESS STATISTICS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          <AnimatedCounter value={1200} label="Businesses Connected" suffix="+" />
          <AnimatedCounter value={850} label="Ecosystem Members" />
          <AnimatedCounter value={75} label="Events Conducted" suffix="+" />
          <AnimatedCounter value={42} label="Business Categories" />
          <AnimatedCounter value={3200} label="Opportunities Shared" suffix="+" />
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold">Services We Offer</h2>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
            Empowering Your Business at Every Stage
          </h3>
          <p className="text-lg text-slate-650 dark:text-slate-400 leading-relaxed font-outfit">
            We provide strategic business growth solutions to boost your brand presence, generate quality leads, and open networking pipelines.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Business Promotion", desc: "Gain massive visibility via business spotlights, featured banners, search listings, and customized entrepreneur stories.", icon: <Building className="w-5 h-5" /> },
            { title: "Lead Generation", desc: "Connect with verified buyers and corporate vendors through dynamic lead matching and target campaign setups.", icon: <TrendingUp className="w-5 h-5" /> },
            { title: "Business Networking", desc: "Access closed group networking meetings, offline B2B summits, and cross-district referral exchanges.", icon: <Users className="w-5 h-5" /> },
            { title: "Digital Marketing", desc: "Propel your local presence through search engine optimization, Google Ads, brand campaigns, and social media audits.", icon: <Zap className="w-5 h-5" /> },
            { title: "Website Development", desc: "Deploy super-fast, responsive corporate websites, high-converting landing pages, and customized e-commerce stores.", icon: <Target className="w-5 h-5" /> },
            { title: "Business Consulting", desc: "Engage in 1-on-1 strategic growth advice covering compliance, scaling opportunities, and operational upgrade advice.", icon: <Award className="w-5 h-5" /> }
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 text-left"
            >
              {/* Visual Accent top border bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/40 via-secondary to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-secondary group-hover:bg-gradient-to-tr group-hover:from-secondary group-hover:to-secondary-light group-hover:text-white transition-all shadow-inner mb-6">
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 font-sora text-slate-900 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-light transition-colors">{service.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-outfit">{service.desc}</p>
              </div>

              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-secondary-dark mt-6 group/link">
                Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY JOIN MAHABIZ CONNECT */}
      <section className="bg-slate-100/40 dark:bg-slate-900/30 py-16 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold font-sora">Core Benefits</h2>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              Why Businesses Thrive With MahaBiz Connect
            </h3>
            <p className="text-lg text-slate-650 dark:text-slate-400 leading-relaxed font-outfit">
              Traditional business directories are passive. MahaBiz Connect is an active catalyst designed to stimulate commerce, trust, and development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "More Visibility", text: "Rank higher on Google searches and get highlighted inside regional directories.", icon: <Eye className="w-5 h-5" /> },
              { title: "More Customers", text: "Secure warm lead referrals directly matched to your industry sector and capacity.", icon: <UserPlus className="w-5 h-5" /> },
              { title: "More Referrals", text: "Leverage standard trust-networks and warm B2B referrals across key Maharashtra cities.", icon: <Handshake className="w-5 h-5" /> },
              { title: "Better Networking", text: "Mingle with top executives and decision makers in private monthly business meets.", icon: <Users className="w-5 h-5" /> },
              { title: "Growth Support", text: "Unlock guidance on business financing, subsidies, Udyam compliance, and scaling hurdles.", icon: <Target className="w-5 h-5" /> },
              { title: "Learning Hours", text: "Access exclusive workshops on financial accounting, automation, and exports.", icon: <BookOpen className="w-5 h-5" /> },
              { title: "Digital Presence", text: "Achieve ready-made online presence with a dedicated business profile page and custom URLs.", icon: <Globe className="w-5 h-5" /> },
              { title: "Brand Building", text: "Establish authority with success story writeups, spotlight badges, and news coverage.", icon: <Sparkles className="w-5 h-5" /> }
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Visual Accent top border bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/40 via-secondary to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-secondary group-hover:bg-gradient-to-tr group-hover:from-secondary group-hover:to-secondary-light group-hover:text-white transition-all shadow-inner">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 font-sora text-slate-900 dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-light transition-colors">{benefit.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-outfit">{benefit.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FEATURED BUSINESSES */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-base uppercase tracking-widest text-secondary font-bold">Featured Listings</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sora">
              Meet Our Premium Partners
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full transition-colors shadow-sm cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full transition-colors shadow-sm cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto py-4 pb-8 px-2 -mx-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="w-full sm:w-[320px] shrink-0 snap-start p-6 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between h-[380px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Logo and Header details */}
                <div className="flex gap-4 items-center mb-5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 flex items-center justify-center text-primary dark:text-blue-300 font-black text-xl shadow-sm shrink-0">
                    {biz.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light px-2.5 py-1 rounded-md border border-secondary/20 block w-fit mb-1">
                      {biz.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                      📍 {biz.city}
                    </span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  <Star size={13} className="fill-amber-500 stroke-none" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{biz.rating}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">({biz.reviewsCount} reviews)</span>
                </div>

                {/* Business Name */}
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sora leading-tight group-hover:text-secondary transition-colors line-clamp-1">
                  {biz.name}
                </h4>

                {/* Business Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-outfit line-clamp-3">
                  {biz.description}
                </p>
              </div>

              <div>
                {/* Footer details: Industry and partner status */}
                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 mb-4 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="line-clamp-1 max-w-[170px]">{biz.industry}</span>
                  <span className="text-primary dark:text-blue-300 font-extrabold text-[9px] bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
                    Partner
                  </span>
                </div>

                {/* Profile CTA */}
                <Link
                  to={`/directory/${biz.id}`}
                  className="block w-full text-center py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:scale-[1.02] transform"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. UPCOMING EVENTS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold">Industry Networks</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sora">
            Upcoming Connect Events
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Secure your slot at our next offline business meet or online training workshop to build ties with leading experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header elements: Date badge & Event Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-150/50 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/30 text-secondary font-bold text-xs uppercase tracking-wider">
                    <Calendar size={13} className="text-secondary" />
                    <span>{evt.date}</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary dark:text-blue-300 bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-md">
                    Upcoming Event
                  </span>
                </div>

                {/* Event Details */}
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white font-sora leading-snug group-hover:text-secondary transition-colors mb-3">
                  {evt.name}
                </h4>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400 dark:text-slate-500" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-secondary" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-outfit line-clamp-3">
                  {evt.description}
                </p>
              </div>

              {/* Footer row */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 dark:text-slate-400">
                  <Users size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    {evt.registrants} Slots Booked
                  </span>
                </div>
                <Link
                  to="/events"
                  className="px-3 py-2 sm:px-5 sm:py-2.5 bg-primary hover:bg-secondary text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all shadow-md hover:scale-[1.02] transform text-center whitespace-nowrap"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-10 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 text-center relative overflow-hidden shadow-sm">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

          <div className="space-y-6 relative z-10">
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold font-sora">Success Stories</h2>

            <div className="min-h-[140px] flex items-center justify-center">
              <p className="text-lg md:text-xl font-light italic leading-relaxed text-slate-800 dark:text-slate-200 font-sora">
                "{testimonials[activeTestimonial].quote}"
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 pt-4 border-t border-slate-150 dark:border-slate-800/60 max-w-xs mx-auto">
              <div className={`w-12 h-12 rounded-full ${testimonials[activeTestimonial].avatarColor} flex items-center justify-center font-bold text-lg text-white shadow-sm border border-white/10`}>
                {testimonials[activeTestimonial].author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-sora">{testimonials[activeTestimonial].author}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="flex gap-1 text-amber-500 mt-1">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 stroke-none" />
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 pt-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${index === activeTestimonial ? 'bg-secondary w-5' : 'bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEMBERSHIP PLANS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold font-sora">Join Our Network</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-sora">
            Select Your Membership Plan
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Unleash the full power of MahaBiz Connect. Choose a package tailored for your business scale and reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Card 1: Community */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border border-slate-200/50 dark:border-slate-800/40 relative h-full group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sora mb-2 group-hover:text-secondary transition-colors">Community Member</h4>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹999</span>
                  <span className="text-sm text-slate-500 font-semibold">/ Year</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Best for small retail stores, individual consultants, and professionals.</p>
              </div>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Premium Business Listing</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Access to Community Forums</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Regular MSME Scheme Updates</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Networking WhatsApp Group</li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                to="/apply/become-member?plan=community"
                className="block w-full text-center py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:scale-[1.02] transform"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Card 2: Growth */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border-2 border-secondary dark:border-secondary relative h-full shadow-lg group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3.5 py-1.5 bg-secondary text-white font-extrabold text-sm tracking-widest uppercase rounded-full shadow-md group-hover:-translate-y-2 transition-transform duration-300">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sora mb-2 group-hover:text-secondary transition-colors">Growth Member</h4>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹4,999</span>
                  <span className="text-sm text-slate-500 font-semibold">/ Year</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ideal for growing MSMEs, startups, and specialized service firms.</p>
              </div>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-350">
                <li className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white"><CheckCircle size={16} className="text-secondary shrink-0" /> Everything in Community</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary shrink-0" /> Featured Search Listings</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary shrink-0" /> Dedicated Business Spotlights</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary shrink-0" /> High-Value Referral Exchanges</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary shrink-0" /> 20% Discount on B2B summits</li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                to="/apply/become-member?plan=growth"
                className="block w-full text-center py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-secondary to-secondary-light hover:from-primary hover:to-primary transition-all shadow-md shadow-secondary/25 hover:scale-[1.02] transform"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Card 3: Partner */}
          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between border border-slate-200/50 dark:border-slate-800/40 relative h-full group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sora mb-2 group-hover:text-secondary transition-colors">Business Partner</h4>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">₹14,999</span>
                  <span className="text-sm text-slate-500 font-semibold">/ Year</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tailored for large manufacturers, corporate vendors, and associations.</p>
              </div>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-305">
                <li className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Everything in Growth</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Premium Promotion Packages</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Homepage Featured Carousel</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Dedicated Interview Features</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Priority B2B Sourcing Referrals</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500 shrink-0" /> Direct Lead-Sharing Access</li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                to="/apply/become-member?plan=partner"
                className="block w-full text-center py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:scale-[1.02] transform"
              >
                Become a Partner
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-primary to-primary-light text-white text-center space-y-6 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-2xl" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-2xl" />

          <h3 className="text-3xl md:text-4xl font-extrabold font-sora">Ready to Grow Your Business?</h3>
          <p className="text-slate-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Join thousands of manufacturers, retailers, startups, and service providers who have digitised, built networks, and scaled operations across Maharashtra.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/apply/become-member"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold text-slate-900 bg-white hover:bg-secondary hover:text-white transition-all shadow-md transform hover:scale-[1.02] text-center whitespace-nowrap"
            >
              Become a Member
            </Link>
            <Link
              to="/apply/get-featured"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-secondary hover:bg-secondary-dark transition-all shadow-md transform hover:scale-[1.02] text-center border border-white/10 whitespace-nowrap"
            >
              Get Featured
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
