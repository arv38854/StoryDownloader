import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Downloader from '../components/Downloader';

const FAQ = [
  { q: 'Is it free to download YouTube Shorts?', a: 'Yes. StoryDownloader is 100% free — no account, no payment, no limits.' },
  { q: 'Do I need a YouTube account?', a: 'No. You only need the public URL of the Short.' },
  { q: 'Will there be a watermark on the video?', a: 'No. We return the original file with no watermarks added.' },
  { q: 'Does it work for regular YouTube videos?', a: 'Currently our tool is optimized for YouTube Shorts (youtube.com/shorts/... URLs).' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes. Works on all modern mobile browsers without any app installation.' },
];

export default function YoutubeShortDownloader() {
  return (
    <>
      <SEO
        title="YouTube Shorts Downloader — Free HD, No Watermark"
        description="Download YouTube Shorts in HD quality for free. No login, no watermark, no app needed. Works on all devices instantly."
        canonical="https://storydownloader.app/youtube-shorts-downloader"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'YouTube Shorts Downloader',
          operatingSystem: 'Web',
          applicationCategory: 'MultimediaApplication',
          description: 'Download YouTube Shorts free in HD quality with no watermark.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          YouTube Shorts Downloader
        </h1>
        <p className="text-red-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Download any YouTube Short in HD quality — free, no login, no watermark. No YouTube Premium needed.
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
          <h2 className="text-2xl font-black text-slate-900 mb-4">How to Download YouTube Shorts</h2>
          <p className="text-slate-600 leading-relaxed">
            YouTube only allows downloads for Premium subscribers, and even then files are locked inside the app.
            StoryDownloader fetches the direct media stream from YouTube's servers and gives you an actual
            downloadable file — free, in HD, with no watermark. No app, no extension, no login required.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              'Open YouTube and find the Short you want to download.',
              'Tap Share and select Copy Link. The URL will look like youtube.com/shorts/XXXXX.',
              'Paste the link into the tool above and click Download Now.',
              'Preview the video and click Save to Device.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-red-600 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                <p className="text-slate-600 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Why Use StoryDownloader for YouTube Shorts?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Instant Results', desc: 'Download link ready in under 4 seconds.' },
              { icon: '🎥', title: 'HD Quality', desc: 'Up to 1080p, original quality, no compression.' },
              { icon: '💰', title: 'No Premium Needed', desc: 'Free alternative to YouTube Premium downloads.' },
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
            <Link to="/facebook-video-downloader" className="text-sm font-bold text-indigo-600 hover:underline">Facebook Video Downloader →</Link>
            <Link to="/blog" className="text-sm font-bold text-indigo-600 hover:underline">Read our guides →</Link>
          </div>
        </section>

      </div>
    </>
  );
}
