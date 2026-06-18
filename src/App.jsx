import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Directory } from './pages/Directory'
import { BusinessProfile } from './pages/BusinessProfile'
import { FeaturedBusinesses } from './pages/FeaturedBusinesses'
import { Membership } from './pages/Membership'
import { Events } from './pages/Events'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { SuccessStories } from './pages/SuccessStories'
import { Contact } from './pages/Contact'
import { LeadFormPage } from './pages/LeadFormPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/directory/:id" element={<BusinessProfile />} />
          <Route path="/featured" element={<FeaturedBusinesses />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/stories" element={<SuccessStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply/:formType" element={<LeadFormPage />} />
          <Route path="*" element={
            <div className="max-w-md mx-auto py-24 text-center space-y-4">
              <h2 className="text-2xl font-bold font-sora">404 - Page Not Found</h2>
              <p className="text-slate-500">The page you are trying to visit does not exist.</p>
              <LinkToHome />
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

// Simple Helper for 404
const LinkToHome = () => {
  return (
    <a href="/" className="inline-block px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl">
      Go to Home
    </a>
  )
}

export default App
