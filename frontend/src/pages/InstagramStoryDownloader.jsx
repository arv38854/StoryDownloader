import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Downloader from '../components/Downloader';

const FAQ = [
  { q: 'Can I download Instagram Stories for free?', a: 'Yes. StoryDownloader is 100% free with no signup required.' },
  { q: 'Do I need to log in to Instagram?', a: 'No. We never ask for your Instagram credentials. Only the public URL is needed.' },
  { q: 'Can I download private Instagram content?', a: 'No. Only publicly available posts and reels are supported.' },
  { q: 'Will there be a watermark on the downloaded video?', a: 'No. You get the original file directly from Instagram\'s servers with no watermarks.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes. The tool works on all modern mobile browsers without any app installation.' },
];

export default function InstagramStoryDownloader() {
  return (
    <>
      <SEO
        title="Instagram Story & Reel Downloader — Free HD, No Login"
        description="Download Instagram Reels, Stories, and videos online free in HD quality. No login required, no watermark, works on all devices."
        canonical="https://storydownloader.app/instagram-story-downloader"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Instagram Story Downloader',
          operatingSystem: 'Web',
          applicationCategory: 'MultimediaApplication',
          description: 'Download Instagram Reels, Stories, and videos free in HD quality.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Instagram Story & Reel Downloader
        </h1>
        <p className="text-pink-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Download any public Instagram Reel, Story, or video in HD quality — free, no login, no watermark.
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
          <h2 className="text-2xl font-black text-slate-900 mb-4">How to Download Instagram Reels & Stories</h2>
          <p className="text-slate-600 leading-relaxed">
            Instagram doesn't provide a native download button for Reels or Stories. StoryDownloader solves this by
            fetching the direct media URL from Instagram's CDN and returning it to you instantly. No software, no
            extensions, no login — just paste the link and download.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              'Open Instagram and find the Reel or post you want to save.',
              'Tap the share icon and select Copy Link.',
              'Paste the link into the tool above and click Download Now.',
              'Preview the video and tap Save to Device.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-pink-600 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                <p className="text-slate-600 pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Why Use StoryDownloader for Instagram?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Instant Download', desc: 'Get your file in under 4 seconds.' },
              { icon: '🎥', title: 'HD Quality', desc: 'Original quality, no re-encoding.' },
              { icon: '🚫', title: 'No Watermark', desc: 'Clean files, no branding added.' },
              { icon: '🌍', title: 'Any Device', desc: 'Works on iOS, Android, and desktop.' },
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
            <Link to="/youtube-shorts-downloader" className="text-sm font-bold text-indigo-600 hover:underline">YouTube Shorts Downloader →</Link>
            <Link to="/facebook-video-downloader" className="text-sm font-bold text-indigo-600 hover:underline">Facebook Video Downloader →</Link>
            <Link to="/blog" className="text-sm font-bold text-indigo-600 hover:underline">Read our guides →</Link>
          </div>
        </section>

      </div>
    </>
  );
}
