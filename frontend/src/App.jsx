import { Routes, Route, Link } from 'react-router-dom';
import Downloader from './components/Downloader';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import InstagramStoryDownloader from './pages/InstagramStoryDownloader';
import FacebookVideoDownloader from './pages/FacebookVideoDownloader';
import YoutubeShortDownloader from './pages/YoutubeShortDownloader';
import TermsOfService from './pages/TermsOfService';

import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto ultra-glass rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <Link to="/" className="text-lg sm:text-2xl font-black tracking-tighter text-slate-900 hover:opacity-80 transition group">
          Story<span className="text-indigo-600 group-hover:text-indigo-500 transition">Downloader</span>
        </Link>
        <div className="flex gap-4 sm:gap-8 items-center">
          <Link to="/" className="text-xs sm:text-sm font-black text-slate-600 hover:text-indigo-600 transition uppercase tracking-widest">Tool</Link>
          <Link to="/blog" className="text-xs sm:text-sm font-black text-slate-600 hover:text-indigo-600 transition uppercase tracking-widest">Blog</Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo-500/30">
      {/* Premium Cosmic Mesh Background */}
      <div className="mesh-cosmic" />
      
      <Navbar />
      <Sidebar />
      <ScrollToTop />
      
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Downloader />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/instagram-story-downloader" element={<InstagramStoryDownloader />} />
          <Route path="/facebook-video-downloader" element={<FacebookVideoDownloader />} />
          <Route path="/youtube-shorts-downloader" element={<YoutubeShortDownloader />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

