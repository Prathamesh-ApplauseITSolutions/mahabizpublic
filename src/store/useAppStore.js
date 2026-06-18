import { create } from 'zustand'

// Helper to check initial theme
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  return 'light'
}

export const useAppStore = create((set, get) => ({
  theme: getInitialTheme(),
  
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme: nextTheme })
  },
  
  submissions: [],
  
  submitLead: async (type, data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const newSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      data,
      date: new Date().toISOString()
    }
    set((state) => ({
      submissions: [...state.submissions, newSubmission]
    }))
    console.log(`[Lead Capture: ${type}]`, data)
    return true
  },

  businesses: [
    {
      id: 'biz-1',
      name: 'Sahyadri Engineering Works',
      category: 'Manufacturer',
      industry: 'Heavy Machinery & Metal Fabrication',
      city: 'Pune',
      services: ['CNC Machining', 'Laser Cutting', 'Custom Gear Manufacturing', 'Industrial Fabrications'],
      description: 'Leading MSME manufacturer of precision automobile and heavy industrial components in Bhosari MIDC, Pune.',
      about: 'Established in 2008, Sahyadri Engineering Works has evolved from a small workshop into a state-of-the-art manufacturing facility. Serving global automotive and infrastructure companies, we specialize in high-tolerance engineering products built under strict quality guidelines.',
      featured: true,
      logoColor: 'from-blue-600 to-indigo-800',
      email: 'contact@sahyadriworks.com',
      phone: '+91 20 2712 9845',
      website: 'www.sahyadriworks.com',
      rating: 4.8,
      reviewsCount: 34,
      galleryColors: ['from-blue-500 to-cyan-500', 'from-slate-600 to-slate-800', 'from-zinc-500 to-neutral-700'],
      videoPlaceholder: 'Industrial CNC Machining Showcase - Pune MIDC',
      testimonials: [
        { name: 'Vijay Kadam', role: 'Operations Head, Tata Motors Vendor Network', content: 'Sahyadri Works consistently delivers high-tolerance components on time. Their engineering standards are exceptional.' },
        { name: 'Anjali Deshmukh', role: 'Procurement Specialist, Forbes Marshall', content: 'Incredible customer support and rigid quality control. Highly recommended for heavy engineering outsourcing.' }
      ]
    },
    {
      id: 'biz-2',
      name: 'MahaAgro Organics Pvt Ltd',
      category: 'MSME',
      industry: 'Food & Agriculture',
      city: 'Nagpur',
      services: ['Cold Press Oil Processing', 'Organic Fertilizer Distribution', 'Export Packaging', 'Farmer Network Sourcing'],
      description: 'Nagpur\'s award-winning premium organic agricultural processor exporting cold-pressed oils & spices worldwide.',
      about: 'MahaAgro Organics bridges the gap between rural farmers in Vidarbha and global consumers. By leveraging cold-pressed extraction technology, we retain maximum nutritional value in oilseeds, supporting over 1,200 local farmers through fair-trade practices.',
      featured: true,
      logoColor: 'from-emerald-600 to-teal-800',
      email: 'info@mahaagro.org',
      phone: '+91 712 254 8922',
      website: 'www.mahaagro.org',
      rating: 4.9,
      reviewsCount: 52,
      galleryColors: ['from-emerald-400 to-green-500', 'from-amber-600 to-yellow-500', 'from-teal-500 to-green-700'],
      videoPlaceholder: 'Organic Sourcing & Extraction Process Walkthrough - Nagpur',
      testimonials: [
        { name: 'Milind Somani', role: 'Director, Vidarbha Agro Association', content: 'MahaAgro has revolutionized seed sourcing in our district. Farmers receive 20% higher returns.' }
      ]
    },
    {
      id: 'biz-3',
      name: 'Decent Cleaners & Laundries',
      category: 'Service Provider',
      industry: 'Retail & Consumer Services',
      city: 'Mumbai',
      services: ['Eco-friendly Dry Cleaning', 'Steam Ironing', 'Premium Leather Care', 'Express Doorstep Delivery'],
      description: 'Premium dry cleaning and eco-friendly garment care service with 15 outlets across Mumbai and Thane.',
      about: 'Decent Cleaners provides professional garment care services utilizing European eco-friendly detergents. We protect your clothes and the environment, serving busy corporate professionals and luxury boutiques with premium care and free home pickup/delivery.',
      featured: false,
      logoColor: 'from-cyan-500 to-blue-600',
      email: 'care@decentcleaners.in',
      phone: '+91 22 2514 6399',
      website: 'www.decentcleaners.in',
      rating: 4.5,
      reviewsCount: 128,
      galleryColors: ['from-sky-400 to-blue-500', 'from-teal-400 to-emerald-500'],
      videoPlaceholder: 'Eco-friendly Dry Cleaning Technology in Action',
      testimonials: [
        { name: 'Rohit Sharma', role: 'Corporate VP, Bandra Kurla Complex', content: 'Their express delivery is a lifesaver. Suit dry cleaning is flawless every single time.' }
      ]
    },
    {
      id: 'biz-4',
      name: 'Narmada Textiles',
      category: 'Manufacturer',
      industry: 'Textiles & Apparel',
      city: 'Kolhapur',
      services: ['Bulk Fabric Dyeing', 'Powerloom Weaving', 'Traditional Kolhapuri Saree Weaving', 'Wholesale Distribution'],
      description: 'Heritage manufacturer of cotton fabrics and traditional handwoven textiles with modern production hubs.',
      about: 'Operating since 1982, Narmada Textiles blends Maharashtrian textile heritage with modern production machinery. We produce high-grade cotton fabrics for garment exporters and premium retail outlets, maintaining eco-friendly dyeing certificates.',
      featured: false,
      logoColor: 'from-orange-500 to-red-600',
      email: 'sales@narmadatextiles.com',
      phone: '+91 231 265 4120',
      website: 'www.narmadatextiles.com',
      rating: 4.6,
      reviewsCount: 19,
      galleryColors: ['from-rose-500 to-orange-500', 'from-purple-500 to-pink-500'],
      videoPlaceholder: 'Weaving Cotton on Modern Powerlooms - Ichalkaranji Hub',
      testimonials: [
        { name: 'Sneha Patil', role: 'Owner, Patil Boutique Pune', content: 'Their handwoven collection has authentic quality. Excellent wholesale rates.' }
      ]
    },
    {
      id: 'biz-5',
      name: 'Vedic Wellness Hub',
      category: 'Consultant',
      industry: 'Healthcare & Wellness',
      city: 'Nashik',
      services: ['Corporate Wellness Programs', 'Ayurvedic Diet Consultation', 'Stress Management Workshops', 'Yoga Therapy'],
      description: 'Expert Ayurvedic lifestyle consulting and stress relief programs for corporate employees and individuals.',
      about: 'Led by seasoned Vaidyas, Vedic Wellness Hub conducts scientific research-backed Ayurvedic therapies and corporate wellness modules. We address lifestyle disorders like hypertension, stress, and insomnia through natural therapeutic systems.',
      featured: true,
      logoColor: 'from-yellow-500 to-emerald-600',
      email: 'dr.shastri@vedicwellness.in',
      phone: '+91 253 231 8741',
      website: 'www.vedicwellness.in',
      rating: 4.9,
      reviewsCount: 41,
      galleryColors: ['from-amber-400 to-emerald-500', 'from-orange-400 to-teal-500'],
      videoPlaceholder: 'Ayurvedic Corporate Stress Management Workshop - Nashik',
      testimonials: [
        { name: 'Rajesh Nair', role: 'HR Director, TechMahindra', content: 'The wellness workshops significantly improved team productivity and mental health scores.' }
      ]
    },
    {
      id: 'biz-6',
      name: 'Vidyut Tech Solutions',
      category: 'Tech Startup',
      industry: 'Information Technology',
      city: 'Thane',
      services: ['Custom ERP Software', 'IoT Smart Energy Monitors', 'MSME Cloud Migration', 'Android/iOS App Development'],
      description: 'Thane-based software startup building affordable automation and IoT products for Indian MSMEs.',
      about: 'Vidyut Tech Solutions was incubated in 2022 to digitize small manufacturing industries in Maharashtra. Our custom ERP solutions and smart IoT devices monitor energy consumption and shop floor efficiency, saving companies up to 18% in operating costs.',
      featured: true,
      logoColor: 'from-violet-600 to-purple-800',
      email: 'hello@vidyuttech.co.in',
      phone: '+91 22 2845 1902',
      website: 'www.vidyuttech.co.in',
      rating: 4.7,
      reviewsCount: 15,
      galleryColors: ['from-violet-500 to-blue-500', 'from-indigo-600 to-pink-500'],
      videoPlaceholder: 'IoT Energy Monitoring Device Demo for MSMEs',
      testimonials: [
        { name: 'Kiran Gokhale', role: 'MD, Gokhale Plastics', content: 'Vidyut\'s IoT integration reduced our factory energy bill by 15% in just three months.' }
      ]
    },
    {
      id: 'biz-7',
      name: 'Ajanta Food Products',
      category: 'Retailer',
      industry: 'Food & Agriculture',
      city: 'Aurangabad',
      services: ['Wholesale Spice Blends', 'Traditional Maharashtrian Pickles', 'Direct-to-Home Delivery', 'B2B Restaurant Supply'],
      description: 'Premium retailer and B2B distributor of authentic Marathwada spices, pickles, and dry food ingredients.',
      about: 'AJANTA brings the rich, authentic flavors of Maharashtra directly to retail shelves and restaurant kitchens. Founded as a home-kitchen business in Aurangabad, we have grown into a high-capacity food processing and retail brand serving thousands of households.',
      featured: false,
      logoColor: 'from-red-500 to-amber-600',
      email: 'ajantaspices@gmail.com',
      phone: '+91 240 248 1192',
      website: 'www.ajantafoods.co.in',
      rating: 4.6,
      reviewsCount: 22,
      galleryColors: ['from-orange-500 to-amber-600', 'from-red-600 to-rose-700'],
      videoPlaceholder: 'Authentic Spice Grinding Process - Aurangabad Facility',
      testimonials: [
        { name: 'Chef Mandar', role: 'Executive Chef, Rama International', content: 'Their Marathwada Kala Masala is unmatched in authenticity. Fantastic aroma and consistency.' }
      ]
    }
  ],

  events: [
    {
      id: 'event-1',
      name: 'MahaBiz Connect Summit 2026',
      date: 'July 15, 2026',
      time: '10:00 AM - 5:00 PM',
      location: 'Pune',
      address: 'JW Marriott Hotel, Senapati Bapat Road, Pune',
      type: 'upcoming',
      description: 'The largest business growth networking event of 2026. Featuring panels on MSME growth, funding for startups, technology integration, and B2B networking match-ups.',
      imageColor: 'from-blue-600 via-indigo-700 to-purple-800',
      registrants: 420
    },
    {
      id: 'event-2',
      name: 'MSME Digital Transformation Workshop',
      date: 'August 08, 2026',
      time: '02:00 PM - 06:00 PM',
      location: 'Nagpur',
      address: 'Chitnavis Centre, Civil Lines, Nagpur (and Streamed Online)',
      type: 'upcoming',
      description: 'Learn how to transition your offline business to online. Expert speakers will cover setting up digital payments, low-cost ERP tools, basic search optimization, and social media selling.',
      imageColor: 'from-emerald-500 via-teal-600 to-cyan-700',
      registrants: 180
    },
    {
      id: 'event-3',
      name: 'Mumbai B2B Networking Meet',
      date: 'May 10, 2026',
      time: '06:00 PM - 09:00 PM',
      location: 'Mumbai',
      address: 'MCA Club, Bandra Kurla Complex, Mumbai',
      type: 'past',
      description: 'An exclusive networking evening for Business Partners and Growth Members to exchange leads, discover potential partnerships, and discuss joint ventures.',
      imageColor: 'from-rose-500 via-pink-600 to-red-700',
      registrants: 150
    },
    {
      id: 'event-4',
      name: 'Maharashtra Startup Showcase 2026',
      date: 'April 22, 2026',
      time: '11:00 AM - 4:00 PM',
      location: 'Pune',
      address: 'COEP Technological University Auditorium, Pune',
      type: 'past',
      description: 'Over 30 startups presented their innovations to venture capitalists, angel investors, and government representatives. Leading to multiple MOU signings.',
      imageColor: 'from-amber-500 via-orange-600 to-red-700',
      registrants: 320
    }
  ],

  blogs: [
    {
      id: 'blog-1',
      title: 'Navigating MSME Schemes in Maharashtra for 2026',
      excerpt: 'Discover the latest subsidies, financial grants, and technology upgradation benefits provided by the Government of Maharashtra for MSMEs.',
      content: 'Small and Medium Enterprises are the backbone of Maharashtra\'s economy. For 2026, the state government has introduced revamped credit schemes, electricity subsidies for rural industries, and patent registration grants. Under the PSI (Package Scheme of Incentives), manufacturers can avail of SGST refunds up to 100% depending on the region. In this article, we break down step-by-step how to check eligibility and register on the MahaSwayam & Udyam portals to claim these benefits.',
      category: 'MSME Updates',
      date: 'June 10, 2026',
      readTime: '6 min read',
      author: 'Milind Deshpande (MSME Advisor)',
      imageColor: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'blog-2',
      title: '5 Low-Cost Marketing Strategies for Small Businesses',
      excerpt: 'Grow your local customer base without blowing your budget. Learn practical digital marketing tips tailored for Indian retailers and service providers.',
      content: 'You don\'t need a million-dollar ad budget to drive store visits or digital enquiries. By utilizing Google Business Profile optimization, local SEO keywords targeting your city (e.g. "dry cleaners in Bandra"), and running highly targeted WhatsApp broadcast campaigns, you can increase brand awareness locally. We also share how micro-influencer partnerships in Maharashtra\'s tier-2 cities can drive significant retail traffic at a fraction of standard cost.',
      category: 'Marketing Insights',
      date: 'June 05, 2026',
      readTime: '4 min read',
      author: 'Riya Sen (Growth Architect)',
      imageColor: 'from-orange-500 to-pink-600'
    },
    {
      id: 'blog-3',
      title: 'From Bhosari Workshop to Exporting Gearboxes globally',
      excerpt: 'Read the inspiring entrepreneur story of Dilip Kulkarni and how he transformed his metal workshop into an international component exporter.',
      content: 'Dilip Kulkarni started with a single power lathe in a rented shed in Bhosari, Pune in 1995. Today, his firm Kulkarni Gears exports precision gear assemblies to Germany, Japan, and Italy. Dilip shares his trials with quality certificates, the pivotal moment of securing bank financing, and how networking through ecosystem hubs like MahaBiz Connect helped him source raw material at optimal pricing and land his first international client.',
      category: 'Entrepreneur Stories',
      date: 'May 28, 2026',
      readTime: '8 min read',
      author: 'Ecosystem Success Team',
      imageColor: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'blog-4',
      title: 'Understanding GST Compliance and E-Invoicing for Startups',
      excerpt: 'A comprehensive, simplified guide explaining the latest e-invoicing limits and direct compliance rules for newly registered companies.',
      content: 'With e-invoicing rules extending to smaller thresholds, it is essential for tech startups and small manufacturers to automate invoice filing. We explore the legal compliance, automated ERP setups, input tax credits (ITC), and how to avoid heavy penalties by keeping records synced on a monthly basis.',
      category: 'Business Tips',
      date: 'May 15, 2026',
      readTime: '5 min read',
      author: 'CA Amit Joshi',
      imageColor: 'from-violet-500 to-purple-600'
    }
  ],

  stories: [
    {
      id: 'story-1',
      title: 'Scaling Nagpur Orange Exports by 150%',
      businessName: 'MahaAgro Organics Pvt Ltd',
      excerpt: 'How local organic producer secured international B2B connections and doubled their network size within 6 months.',
      content: 'MahaAgro Organics had premium cold-pressed oils and high-grade fruits but lacked distribution pipelines beyond Vidarbha. By joining MahaBiz Connect as a Business Partner, they were featured on the homepage and connected with cold-storage developers in Thane and export agents in Mumbai. Within six months, they signed a joint venture to export oranges to Middle East markets, doubling the income of their linked local farmers.',
      author: 'Amit & Sunil Gokhale (Founders)',
      imageColor: 'from-emerald-600 to-teal-800'
    },
    {
      id: 'story-2',
      title: 'Digitizing 80+ Local Retailers in Nashik',
      businessName: 'Vidyut Tech Solutions',
      excerpt: 'How a software startup launched an MSME billing and smart tracking app, scaling through ecosystem referrals.',
      content: 'Vidyut Tech Solutions developed a low-cost, offline-first billing app for grocery stores. Through MahaBiz Connect networking meets, they connected with the Nashik Merchants Association. This referral opened up a pilot program with 80 retailers, which led to seed funding from regional angel investors who attended the Pune Startup Showcase.',
      author: 'Priyanka Kulkarni (CEO)',
      imageColor: 'from-violet-600 to-purple-800'
    },
    {
      id: 'story-3',
      title: 'Procuring high-volume components with zero rejects',
      businessName: 'Sahyadri Engineering Works',
      excerpt: 'How a manufacturing shop floor upgraded its tooling capacity and met strict automotive supply benchmarks.',
      content: 'Sahyadri Engineering wanted to transition from local supply to direct tier-1 automotive manufacturing. Through a Business Consultation booked on MahaBiz Connect, they connected with quality assurance advisors who helped overhaul their testing protocols. They subsequently landed a multi-year manufacturing contract with a major automaker, registering zero rejects for three consecutive quarters.',
      author: 'Sanjay Deshpande (Managing Director)',
      imageColor: 'from-blue-600 to-indigo-800'
    }
  ]
}))
