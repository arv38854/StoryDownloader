import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const STATS = [
  { value: '3', label: 'Platforms Supported' },
  { value: '0', label: 'Files Stored' },
  { value: '100%', label: 'Free Forever' },
  { value: '<4s', label: 'Avg Response Time' },
];

const PRINCIPLES = [
  { icon: '🔒', title: 'No Login Required', desc: 'Paste a link and download. No account, no signup, no friction.' },
  { icon: '🚫', title: 'Zero Storage', desc: 'We never store your media. Only direct CDN links are returned.' },
  { icon: '🌍', title: 'Public Content Only', desc: 'We only support publicly available content — always ethical.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Built serverless for sub-4-second response times globally.' },
];

export default function AboutUs() {
  return (
    <>
      <SEO
        title="About Us"
        description="StoryDownloader is a free tool to download public Instagram reels, Facebook videos, and YouTube Shorts instantly. No login, no storage, no tracking."
        canonical="https://storydownloader.app/about"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About StoryDownloader</h1>
          <p className="text-indigo-300 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            A free, fast, and privacy-first tool to save public media from Instagram, Facebook, and YouTube.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-indigo-600 py-8 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-indigo-200 text-xs font-semibold mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">

          {/* What is it */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is StoryDownloader?</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              StoryDownloader is a free, lightweight web tool that lets you download publicly available media from
              <strong className="text-slate-800"> Instagram</strong>, <strong className="text-slate-800">Facebook</strong>,
              and <strong className="text-slate-800">YouTube Shorts</strong> — instantly, with no signup required.
              Just paste a link, and we return the direct download URL in under 2 seconds.
            </p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-base">
              We believe saving content you love should be simple and fast. Our goal is to provide a clean,
              no-nonsense tool that works in seconds — no bloat, no tracking. Built by developers,
              for everyone. The site is supported by non-intrusive Google ads that keep it free forever.
            </p>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: '01', text: 'Paste a public Instagram, Facebook, or YouTube Shorts link' },
                { step: '02', text: 'We automatically detect the platform from the URL' },
                { step: '03', text: 'Our server fetches the direct media CDN URL in real-time' },
                { step: '04', text: 'You download it directly — we never store anything' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 text-white text-xs font-black flex items-center justify-center">{step}</span>
                  <p className="text-slate-700 font-medium leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Principles */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map(({ icon, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl mb-2">{icon}</div>
                  <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-amber-900 mb-2">⚠️ Disclaimer</h2>
            <p className="text-amber-800 text-sm leading-relaxed">
              StoryDownloader is an independent utility and is not affiliated with YouTube, Instagram, Facebook, or Meta.
              Please only download content you have the legal right to use. Respect copyright and platform terms of service.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition text-sm"
            >
              Try StoryDownloader Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
