import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Downloader from '../components/Downloader';

const FAQ = [
  { q: 'Is it free to download Facebook videos?', a: 'Yes. StoryDownloader is completely free with no account or payment required.' },
  { q: 'Can I download private Facebook videos?', a: 'No. Only publicly accessible videos and reels are supported.' },
  { q: 'Do fb.watch short links work?', a: 'Yes. Both full Facebook URLs and fb.watch short links are supported.' },
  { q: 'Will there be a watermark?', a: 'No. You receive the original file from Facebook\'s servers with no watermarks added.' },
  { q: 'Does it work on mobile?', a: 'Yes. Works on all modern browsers on iOS and Android without any app installation.' },
];

export default function FacebookVideoDownloader() {
  return (
    <>
      <SEO
        title="Facebook Video Downloader — Free HD, No Login Required"
        description="Download Facebook videos and Reels online free in HD quality. Supports fb.watch links. No login, no watermark, works on all devices."
        keywords="facebook video downloader, fb story downloader, download facebook reels, facebook reel downloader, fb video saver, download fb live video, facebook story saver"
        canonical="https://storydownloader.app/facebook-video-downloader"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Facebook Video Downloader',
          operatingSystem: 'Web',
          applicationCategory: 'MultimediaApplication',
          description: 'Download Facebook videos and Reels free in HD quality.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Facebook Video Downloader
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Download any public Facebook video or Reel in HD quality — free, no login, no watermark. Supports fb.watch links.
        </p>
      </div>

      {/* Embedded Tool */}
      <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        <Downloader embedded />
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-6">
        {['🔒 No login required', '💸 100% free', '📱 Works on all devices', '🚫 No watermark'].map(t => (
          <span key={t} className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">{t}</span>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">

        {/* About */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">How to Download Facebook Videos & Reels</h2>
          <p className="text-slate-600 leading-relaxed">
            Facebook doesn't offer a direct download option for most public videos. StoryDownloader fetches the
            direct media URL from Facebook's CDN and returns it to you instantly — no software, no extensions,
            no login needed. Works with Facebook videos, Reels, and fb.watch short links.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              'Find the public Facebook video or Reel you want to save.',
              'Click the three-dot menu (⋯) and select Copy Link.',
              'Paste the link into the tool above and click Download Now.',
              'Preview the video and click Save to Device.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                <p className="text-slate-600 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Why Use StoryDownloader for Facebook?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Fast & Reliable', desc: 'Download links generated in under 4 seconds.' },
              { icon: '🎥', title: 'HD Quality', desc: 'Original quality video, no compression.' },
              { icon: '🔗', title: 'fb.watch Support', desc: 'Short links and full URLs both work.' },
              { icon: '🌍', title: 'Any Device', desc: 'Works on iOS, Android, and desktop browsers.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 mb-1">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-lg font-black text-slate-900 mb-3">Also Supported</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/instagram-story-downloader" className="text-sm font-bold text-indigo-600 hover:underline">Instagram Story Downloader →</Link>
            <Link to="/youtube-shorts-downloader" className="text-sm font-bold text-indigo-600 hover:underline">YouTube Shorts Downloader →</Link>
            <Link to="/blog" className="text-sm font-bold text-indigo-600 hover:underline">Read our guides →</Link>
          </div>
        </section>

      </div>
    </>
  );
}
