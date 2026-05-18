import { useState } from 'react';
import { Link } from 'react-router-dom';
import { detectPlatform } from '../utils/detectPlatform';
import SEO from './SEO';
import AdPlaceholder from './AdPlaceholder';

const ICONS = {
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
};

const COLORS = {
  youtube: 'text-red-500',
  instagram: 'text-pink-500',
  facebook: 'text-blue-500',
};

const LABELS = {
  youtube: 'YouTube Shorts',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export default function Downloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const detectedPlatform = url.trim() ? detectPlatform(url.trim()) : null;

  const STAGES = [
    'Detecting platform...',
    'Fetching media info...',
    'Extracting download link...',
    'Almost ready...',
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoadingStage(0);

    if (!url.trim()) {
      setError('Please paste a URL first.');
      return;
    }

    setLoading(true);

    // Cycle through stage messages every 1.5s for perceived progress
    let stage = 0;
    const stageTimer = setInterval(() => {
      stage = Math.min(stage + 1, STAGES.length - 1);
      setLoadingStage(stage);
    }, 1500);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/fetch/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to fetch media.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      clearInterval(stageTimer);
      setLoading(false);
    }
  }

  function handleChange(e) {
    setUrl(e.target.value);
    setError('');
    setResult(null);
  }

  return (
    <div className="min-h-screen text-slate-900 flex flex-col items-center relative overflow-hidden">
      <SEO
        title="Free Instagram, Facebook & YouTube Video Downloader | StoryDownloader"
        description="Free Instagram Reel downloader, Facebook video downloader & YouTube Shorts downloader. Download HD videos instantly — no login, no watermark, no app needed."
        keywords="story downloader, instagram story downloader, facebook video downloader, youtube shorts downloader, ig story viewer, download instagram stories, save ig story, fb reel downloader, download youtube shorts, story saver, free video downloader, download instagram reels free, save instagram stories, free video downloader no watermark"
        canonical="https://free-story-downloader.vercel.app"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'StoryDownloader',
          operatingSystem: 'Web',
          applicationCategory: 'MultimediaApplication',
          description: 'Free Instagram Reel downloader, Facebook video downloader & YouTube Shorts downloader. No login, no watermark.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          url: 'https://free-story-downloader.vercel.app',
        }}
      />

      <div className="absolute top-20 left-[10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-premium-float" />
      <div className="absolute top-60 right-[15%] w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-premium-float" style={{ animationDelay: '2s' }} />

      {/* Abstract Decorative Shapes */}
      <div className="absolute top-[15%] left-[5%] w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400/10 to-violet-400/10 blur-2xl animate-premium-float pointer-events-none hidden lg:block" />
      <div className="absolute top-[25%] right-[5%] w-56 h-56 rounded-[40%] bg-gradient-to-br from-pink-400/8 to-indigo-400/8 blur-3xl animate-premium-float pointer-events-none hidden lg:block" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[50%] left-[3%] w-24 h-24 rounded-full bg-gradient-to-br from-violet-400/10 to-blue-400/10 blur-2xl animate-premium-float pointer-events-none hidden lg:block" style={{ animationDelay: '5s' }} />

      {/* Hero Header */}
      <div className="pt-8 pb-6 text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Pro Media Retrieval
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 sm:mb-4 premium-gradient-text leading-tight">
          Instagram, Facebook &amp; YouTube
          <span className="block text-indigo-600">Video Downloader</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-2">
          Free <strong className="text-indigo-900">Instagram Reel downloader</strong>, <strong className="text-red-600">YouTube Shorts downloader</strong> &amp; <strong className="text-blue-600">Facebook video downloader</strong> — HD quality, no login.
        </p>
      </div>

      {/* Platform quick-links */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 mb-8 relative z-10 px-4">
        {['youtube', 'instagram', 'facebook'].map((p) => (
          <div key={p} className={`flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl ultra-glass transform hover:scale-105 transition-all duration-300 cursor-default group ${COLORS[p]}`}>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white shadow-sm ring-1 ring-black/[0.05]">
              {ICONS[p]}
            </div>
            <span className="text-slate-700 text-xs sm:text-sm font-bold tracking-tight group-hover:text-indigo-600 transition">{LABELS[p]}</span>
          </div>
        ))}
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-2xl px-3 sm:px-4 relative z-10 mb-10 sm:mb-16">
        <div className="ultra-glass rounded-[1.5rem] sm:rounded-[2rem] p-1 shadow-2xl relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-[1.25rem] sm:rounded-[1.75rem] p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group/input">
                <input
                  type="url"
                  value={url}
                  onChange={handleChange}
                  placeholder="Paste your video link here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 pr-14 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all duration-500 hover:border-slate-300"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   {detectedPlatform && (
                    <span className={`${COLORS[detectedPlatform]} animate-in zoom-in-50`}>
                      {ICONS[detectedPlatform]}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full premium-gradient-primary text-white font-bold py-3.5 sm:py-4 rounded-2xl shadow-xl premium-button-glow transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg transition-all duration-300"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="text-base">{STAGES[loadingStage]}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download Now
                  </>
                )}
              </button>

              {loading && (
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-[1500ms] ease-out"
                    style={{ width: `${((loadingStage + 1) / 4) * 100}%` }}
                  />
                </div>
              )}
            </form>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {[
                { icon: '🔓', text: 'No login required' },
                { icon: '💸', text: '100% free' },
                { icon: '📱', text: 'Works on all devices' },
              ].map(({ icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-full">
                  <span>{icon}</span>{text}
                </span>
              ))}
            </div>

            {error && (
              <div className="mt-6 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold rounded-2xl px-6 py-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                {error}
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-5 duration-700 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] ${COLORS[result.platform]}`}>
                  <div className="p-1.5 rounded-md bg-white shadow-sm ring-1 ring-black/[0.05]">
                    {ICONS[result.platform]}
                  </div>
                  <span>High Quality Found</span>
                </div>

                <div className="relative group/preview rounded-2xl overflow-hidden shadow-2xl bg-slate-200 ring-1 ring-black/[0.05]">
                  {result.mediaType === 'video' ? (
                    <video
                      src={result.downloadUrl}
                      controls
                      className="w-full max-h-[400px] object-contain bg-black"
                      aria-label={`${result.platform} video preview`}
                    />
                  ) : (
                    <img
                      src={result.downloadUrl}
                      alt={`${result.platform} media download preview — free ${result.platform} downloader`}
                      className="w-full max-h-[400px] object-contain"
                    />
                  )}
                </div>

                <a
                  href={`${import.meta.env.VITE_API_URL || ''}/fetch/download?url=${encodeURIComponent(result.downloadUrl)}&filename=${result.platform}-${Date.now()}.${result.mediaType === 'video' ? 'mp4' : 'jpg'}`}
                  target="_self"
                  rel="noopener noreferrer"
                  download
                  className="w-full bg-slate-900 text-white hover:bg-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group/dl premium-button-glow"
                >
                  Save to Device
                  <svg className="w-5 h-5 transform group-hover/dl:translate-y-1 transition" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </a>

                {/* ── Ad 1: After result / Save button ── */}
                <AdPlaceholder size="rectangle" className="mt-2" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Ad 2: Between tool card & About section ── */}
      <div className="w-full max-w-4xl px-6 mb-10 relative z-10">
        <AdPlaceholder size="banner" />
      </div>

      {/* ── About Tool ── */}
      <section className="w-full max-w-4xl px-4 sm:px-6 mb-12 sm:mb-20 relative z-10">
        <div className="ultra-glass rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">Free Instagram, Facebook &amp; YouTube Video Downloader</h2>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            StoryDownloader is a free <strong className="text-slate-800">Instagram Reel downloader</strong>, <strong className="text-slate-800">Facebook video downloader</strong>, and <strong className="text-slate-800">YouTube Shorts downloader</strong> — all in one tool.
            No login, no watermark, no app needed. Just paste any public video link and download it in HD quality in seconds.
            Works on all devices — iPhone, Android, Windows, and Mac — directly from your browser.
            We never store your URLs or media files. Your privacy is fully protected.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/instagram-story-downloader" className="text-xs font-bold text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full hover:bg-pink-100 transition">Instagram Reel Downloader →</Link>
            <Link to="/youtube-shorts-downloader" className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full hover:bg-red-100 transition">YouTube Shorts Downloader →</Link>
            <Link to="/facebook-video-downloader" className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">Facebook Video Downloader →</Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full max-w-4xl px-4 sm:px-6 mb-12 sm:mb-20 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { step: '1', icon: '🔗', title: 'Copy the URL', desc: 'Open Instagram, YouTube, or Facebook and copy the link of the public video or reel you want to save.' },
            { step: '2', icon: '📋', title: 'Paste & Submit', desc: 'Paste the URL into the input field above and click the Download Now button.' },
            { step: '3', icon: '⬇️', title: 'Download', desc: 'Preview the media and tap "Save to Device" to download it directly to your phone or computer.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="ultra-glass rounded-[1.5rem] p-5 sm:p-7 flex flex-row sm:flex-col items-start gap-4 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center shrink-0">{step}</div>
              <div>
                <div className="text-xl sm:text-2xl mb-1 sm:mb-0">{icon}</div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full max-w-4xl px-4 sm:px-6 mb-12 sm:mb-20 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight text-center">Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Get your download link in under 4 seconds, every time.' },
            { icon: '💰', title: 'Completely Free', desc: 'No subscriptions, no hidden fees. Free forever.' },
            { icon: '🌐', title: 'Multi-Platform', desc: 'Supports Instagram, YouTube Shorts, and Facebook in one tool.' },
            { icon: '🔒', title: 'No Login Needed', desc: 'No account, no signup. Just paste and download.' },
            { icon: '📱', title: 'All Devices', desc: 'Works perfectly on mobile, tablet, and desktop browsers.' },
            { icon: '🛁', title: 'No Watermarks', desc: 'Download clean original files with no added watermarks.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="ultra-glass rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-6">
              <div className="text-xl sm:text-2xl mb-2 sm:mb-3">{icon}</div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1">{title}</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full max-w-4xl px-4 sm:px-6 mb-12 sm:mb-20 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-3 sm:space-y-4">
          {[
            { q: 'Is StoryDownloader safe to use?', a: 'Yes. We never ask for your social media credentials. We only process publicly available URLs and return a direct CDN link. No data is stored on our servers.' },
            { q: 'Is it completely free?', a: 'Absolutely. StoryDownloader is 100% free with no hidden charges, no premium tiers, and no signup required.' },
            { q: 'Can I download private content?', a: 'No. Our Instagram reel downloader, Facebook video downloader, and YouTube Shorts downloader only work with publicly accessible content.' },
            { q: 'Which platforms are supported?', a: 'We support Instagram Reels & posts (instagram reel downloader), YouTube Shorts (youtube shorts downloader), and Facebook videos & reels (facebook video downloader).' },
            { q: 'Does it work on mobile?', a: 'Yes. Our free video downloader is fully responsive and works on all modern browsers on iOS and Android devices — no app needed.' },
            { q: 'Is there a watermark on downloaded videos?', a: 'No. We return the original file directly from the platform CDN — no watermarks, no re-encoding, no quality loss.' },
          ].map(({ q, a }) => (
            <div key={q} className="ultra-glass rounded-[1.25rem] sm:rounded-[1.5rem] p-4 sm:p-6">
              <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1.5 sm:mb-2">{q}</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad 3: Between FAQ & Blog section ── */}
      <div className="w-full max-w-4xl px-6 mb-10 relative z-10">
        <AdPlaceholder size="rectangle" />
      </div>

      {/* Wave Section Divider */}
      <div className="w-full relative -mb-1 pointer-events-none">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-24 md:h-32 fill-indigo-950">
          <path d="M0,80L48,85.3C96,91,192,101,288,117.3C384,133,480,155,576,144C672,133,768,85,864,80C960,75,1056,112,1152,122.7C1248,133,1344,117,1392,106.7L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
        </svg>
      </div>

      <div className="w-full bg-indigo-950 pt-12 pb-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
              <div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 tracking-tight">Featured Guides</h2>
                <p className="text-indigo-300 text-sm sm:text-base font-medium">Master social media saving with our expert tutorials.</p>
              </div>
              <Link to="/blog" className="shrink-0 bg-white/10 hover:bg-white/20 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all flex items-center gap-2 sm:gap-3 backdrop-blur-xl border border-white/10 group text-sm sm:text-base">
                Browse Repository 
                <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              <article className="ultra-glass-dark p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] transition-all duration-500 hover:ring-2 hover:ring-indigo-500/50 flex flex-col group">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black">Meta / Instagram</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-white leading-tight">
                    <Link to="/blog/how-to-download-instagram-reels" className="hover:text-indigo-400 transition">Save Instagram Reels natively in 4K Quality</Link>
                  </h3>
                  <p className="text-indigo-200/70 text-sm mb-10 leading-relaxed font-medium">Learn the industry-standard method to bypass compression and fetch high-bitrate video files directly.</p>
                  <div className="mt-auto">
                    <Link to="/blog/how-to-download-instagram-reels" className="inline-flex items-center gap-3 bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black text-xs hover:bg-indigo-50 transition shadow-2xl premium-button-glow group/btn">
                      Read Guide 
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3" /></svg>
                    </Link>
                  </div>
              </article>

              <article className="ultra-glass-dark p-10 rounded-[2.5rem] transition-all duration-500 hover:ring-2 hover:ring-indigo-500/50 flex flex-col group">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black">Google / YouTube</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-white leading-tight">
                    <Link to="/blog/why-youtube-shorts-downloader-is-essential" className="hover:text-indigo-400 transition">Why Shorts are better downloaded than shared</Link>
                  </h3>
                  <p className="text-indigo-200/70 text-sm mb-10 leading-relaxed font-medium">Discover how to retain maximum audio fidelity and frame depth when archiving YouTube Shorts.</p>
                  <div className="mt-auto">
                    <Link to="/blog/why-youtube-shorts-downloader-is-essential" className="inline-flex items-center gap-3 bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black text-xs hover:bg-indigo-50 transition shadow-2xl premium-button-glow group/btn">
                      Read Guide 
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3" /></svg>
                    </Link>
                  </div>
              </article>

              <article className="ultra-glass-dark p-10 rounded-[2.5rem] transition-all duration-500 hover:ring-2 hover:ring-indigo-500/50 flex flex-col group">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black">Meta / Facebook</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-2xl font-black mb-6 text-white leading-tight">
                    <Link to="/blog/download-facebook-videos-securely" className="hover:text-indigo-400 transition">Fetching HD Facebook Videos & Reels</Link>
                  </h3>
                  <p className="text-indigo-200/70 text-sm mb-10 leading-relaxed font-medium">Access high-definition Facebook media without any third-party software securely and effortlessly.</p>
                  <div className="mt-auto">
                    <Link to="/blog/download-facebook-videos-securely" className="inline-flex items-center gap-3 bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black text-xs hover:bg-indigo-50 transition shadow-2xl premium-button-glow group/btn">
                      Read Guide 
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3" /></svg>
                    </Link>
                  </div>
              </article>
          </div>
        </div>
      </div>
    </div>
  );
}
