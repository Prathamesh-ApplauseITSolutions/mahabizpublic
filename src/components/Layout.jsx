import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import ConstellationCanvas from './ConstellationCanvas'
import {
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ChevronRight,
  Send
} from 'lucide-react'
import mahabizLogo from '../assets/images/mahabiz_logo.png'
import mahabizLogoWhite from '../assets/images/white_transparent.png'
import mahabizLogoDark from '../assets/images/mahabiz_logo_darkmode.png'

export const Layout = ({ children }) => {
  const { theme, toggleTheme } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const location = useLocation()

  // Apply theme class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Close mobile menu on route change and scroll to top
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMobileMenuOpen(false)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => cancelAnimationFrame(handle)
  }, [location.pathname])

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSuccess(false), 4000)
    }
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Directory', path: '/directory' },
    { name: 'Featured', path: '/featured' },
    { name: 'Membership', path: '/membership' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Stories', path: '/stories' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip gradient-mesh text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">

      {/* Global Subtle Constellation Background (all pages except Home hero) */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <ConstellationCanvas variant="subtle" className="w-full h-full" />
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/40 glass-panel shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={theme === 'dark' ? mahabizLogoDark : mahabizLogo} alt="MahaBiz Connect logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg leading-tight text-primary dark:text-white tracking-wide whitespace-nowrap">
                MahaBiz<span className="text-secondary">Connect</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase whitespace-nowrap">
                Growth Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all ${isActive
                    ? 'text-secondary dark:text-secondary-light bg-slate-100/55 dark:bg-slate-800/60'
                    : 'text-slate-650 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100/40 dark:hover:bg-slate-800/30'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-inner"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* CTA Button */}
            <Link
              to="/apply/become-member"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-light hover:from-secondary hover:to-secondary-light transition-all shadow-md shadow-primary/10 hover:shadow-secondary/15 hover:scale-[1.02] transform"
            >
              Join MahaBiz
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg animate-in slide-in-from-top duration-200 max-h-[calc(100vh-80px)] overflow-y-auto shadow-inner">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${isActive
                      ? 'text-secondary dark:text-secondary bg-slate-100 dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="my-2 border-t border-slate-200/50 dark:border-slate-700/50" />

              <button
                onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
              >
                <span>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <Link
                to="/apply/become-member"
                className="block px-4 py-2.5 rounded-lg text-base font-bold text-secondary dark:text-secondary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join MahaBiz
              </Link>
              <Link
                to="/apply/consultation"
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT SPACE WITH ROUTING TRANSITION */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Banner */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 lg:mb-16">
            <div className="md:w-1/2">
              <h4 className="text-white font-bold text-lg mb-2 font-sora">Stay Updated</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Subscribe to our newsletter for MSME scheme updates, business growth tips, and networking event alerts.
              </p>
            </div>
            <div className="md:w-1/2 w-full flex justify-end">
              <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 w-full min-w-0 px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-secondary hover:bg-secondary-light text-white rounded-xl transition-colors shadow-md shadow-secondary/15 flex items-center justify-center shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send size={18} />
                  </button>
                </div>
                {newsletterSuccess && (
                  <p className="text-sm text-green-400 font-medium animate-pulse mt-2 pl-2">
                    Thank you! You have subscribed successfully.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src={mahabizLogoWhite} alt="MahaBiz Connect logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                <span className="font-bold text-lg text-white tracking-wide">
                  MahaBiz<span className="text-secondary">Connect</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                Maharashtra's leading business growth ecosystem helping MSMEs, startups, and service providers connect, promote, and scale their businesses across global markets.
              </p>
              <div className="text-[10px] sm:text-sm uppercase font-extrabold tracking-widest text-slate-400 bg-slate-800/80 inline-block px-2 sm:px-3 py-1.5 rounded-md border border-slate-700 whitespace-nowrap">
                CONNECT • PROMOTE • GROW
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 tracking-wide relative before:absolute before:-bottom-2 before:left-0 before:w-8 before:h-[2px] before:bg-secondary">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> About Our Mission
                  </Link>
                </li>
                <li>
                  <Link to="/directory" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> Business Directory
                  </Link>
                </li>
                <li>
                  <Link to="/featured" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> Featured Members
                  </Link>
                </li>
                <li>
                  <Link to="/membership" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> Membership Plans
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> Upcoming Events
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-secondary transition-colors" /> Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 tracking-wide relative before:absolute before:-bottom-2 before:left-0 before:w-8 before:h-[2px] before:bg-secondary">
                Our Services
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    Business Promotion & Spotlights
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    Digital Marketing & SEO
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    Premium Website Development
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    MSME Lead Generation
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    B2B Networking Meets
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-secondary transition-colors flex items-center gap-1">
                    1-on-1 Business Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div>
              <h4 className="text-white font-bold text-base mb-6 tracking-wide relative before:absolute before:-bottom-2 before:left-0 before:w-8 before:h-[2px] before:bg-secondary">
                Contact Us
              </h4>
              <div className="space-y-4 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-secondary" />
                  </div>
                  <span>+91 22 4590 1200</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-secondary" />
                  </div>
                  <span>support@mahabizconnect.in</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-secondary" />
                  </div>
                  <span className="leading-relaxed">MahaBiz Chambers, Senapati Bapat Road, Shivajinagar, Pune, Maharashtra 411016</span>
                </div>
              </div>
              <div className="pt-8 flex flex-wrap gap-4 sm:gap-6 text-sm text-secondary">
                <a href="#" className="hover:text-white transition-colors font-medium">Facebook</a>
                <a href="#" className="hover:text-white transition-colors font-medium">Instagram</a>
                {/* <a href="#" className="hover:text-white transition-colors font-medium">LinkedIn</a> */}
                <a href="#" className="hover:text-white transition-colors font-medium">YouTube</a>
              </div>
            </div>
          </div>

          {/* Socials & Copyright */}
          <div className="border-t border-slate-800 pt-8 mt-8 text-center text-sm text-slate-500">
            © 2026 MahaBiz Connect.All Rights Reserved. <br /> Designed by <a href="https://codevergeitsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors font-medium">Codeverge It Solutions</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919999999999?text=Hi!%20I%20am%20interested%20in%20MahaBiz%20Connect%20membership%20and%20growth%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-8 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 ml-[1px] mt-[1px]"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>



      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 md:bottom-28 right-6 z-35 p-3 rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-650 text-white transition-all shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

    </div>
  )
}
