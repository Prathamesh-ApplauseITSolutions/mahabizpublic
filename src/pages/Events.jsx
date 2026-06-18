import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { Calendar, MapPin, Clock, Users, Award, Image, CheckCircle } from 'lucide-react'

export const Events = () => {
  const { events } = useAppStore()
  const upcomingEvents = events.filter(e => e.type === 'upcoming')
  const pastEvents = events.filter(e => e.type === 'past')

  const [activeTab, setActiveTab] = useState('upcoming')

  const galleryColors = [
    'from-blue-600 via-indigo-700 to-purple-800',
    'from-emerald-500 via-teal-600 to-cyan-700',
    'from-rose-500 via-pink-600 to-red-700',
    'from-amber-500 via-orange-600 to-red-700'
  ]

  return (
    <div className="space-y-24 py-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
          Networking Hub
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-sora">
          Ecosystem <span className="text-gradient">Business Events</span>
        </h1>
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-outfit">
          Attend our industrial networking summits, tech workshops, and local referral exchange meets. Learn, showcase your brand, and connect with top buyers.
        </p>
      </section>

      {/* Tabs selector */}
      <section className="flex justify-center border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'upcoming' 
                ? 'border-b-2 border-secondary text-secondary font-black' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            Upcoming Events ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'past' 
                ? 'border-b-2 border-secondary text-secondary font-black' 
                : 'text-slate-400 hover:text-slate-655'
            }`}
          >
            Past Events ({pastEvents.length})
          </button>
        </div>
      </section>

      {/* Event Cards Grid */}
      <section>
        {activeTab === 'upcoming' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((evt) => (
              <div 
                key={evt.id}
                className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header: Date Badge & Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-150/50 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/30 text-secondary font-bold text-xs uppercase tracking-wider">
                      <Calendar size={13} className="text-secondary" />
                      <span>{evt.date}</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-md">
                      Registering Open
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold font-sora text-slate-900 dark:text-white leading-snug group-hover:text-secondary transition-colors mb-3">
                    {evt.name}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400 dark:text-slate-500" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-secondary" />
                      <span>{evt.location} MIDC Chapter</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-outfit mb-4">
                    {evt.description}
                  </p>

                  {/* Venue Address */}
                  <div className="flex items-start gap-2 text-xs text-slate-750 dark:text-slate-350 font-semibold bg-slate-100/50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/35 dark:border-slate-800/40">
                    <MapPin size={14} className="text-secondary shrink-0 mt-0.5" />
                    <span className="leading-snug">{evt.address}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-slate-150/60 dark:border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Users size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {evt.registrants} slots reserved
                    </span>
                  </div>
                  <Link
                    to={`/apply/consultation?event=${evt.id}`}
                    className="px-5 py-2.5 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-xl shadow-md transition-all hover:scale-[1.02] transform"
                  >
                    Book Ticket
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((evt) => (
              <div 
                key={evt.id}
                className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group flex flex-col justify-between opacity-90 hover:opacity-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-400 dark:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header: Date Badge & Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/30 text-slate-500 dark:text-slate-450 font-bold text-xs uppercase tracking-wider">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{evt.date}</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-205 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      Concluded
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold font-sora text-slate-800 dark:text-slate-200 leading-snug mb-3">
                    {evt.name}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-405 dark:text-slate-450 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{evt.location} Chapter</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-outfit">
                    {evt.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-slate-150/60 dark:border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                    <Users size={14} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Attended by {evt.registrants} delegates
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sponsor Opportunities Section */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="lg:col-span-8 space-y-3 z-10">
          <h3 className="text-2xl font-bold font-sora flex items-center gap-2"><Award className="text-secondary" /> Sponsor Opportunities</h3>
          <p className="text-sm text-slate-400 max-w-xl">Get premium promotion at our summits. Display your factory logos on physical flyers, booklets, banners, and deliver elevator pitches to 200+ VIP attendees.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300 font-semibold pt-1">
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-secondary" /> Primary Logo Branding</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-secondary" /> Elevator Pitch (3 mins)</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-secondary" /> Brochure Placement</span>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-end z-10 w-full sm:w-auto">
          <Link
            to="/apply/partner"
            className="w-full sm:w-auto text-center px-6 py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold text-sm rounded-xl uppercase tracking-wider"
          >
            Apply for Sponsorship
          </Link>
        </div>
      </section>

      {/* Event Gallery */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-sora text-slate-900 dark:text-white flex items-center gap-1.5"><Image size={20} className="text-secondary" /> Connect Events Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryColors.map((color, idx) => (
            <div key={idx} className={`aspect-video rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center text-white/50 relative overflow-hidden group shadow-inner`}>
              <Users size={24} className="group-hover:scale-110 transition-transform text-white/50" />
              <span className="absolute bottom-2 left-2 text-sm uppercase font-bold tracking-widest text-white/80">Summit Snapshot {idx + 1}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
