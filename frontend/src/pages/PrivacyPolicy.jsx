import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read StoryDownloader's privacy policy. We do not collect, store, or share any personal data. No login required, no media stored on our servers."
        canonical="https://storydownloader.app/privacy"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-indigo-300 text-sm font-medium">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="prose prose-slate max-w-none space-y-10">

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">1</span>
                Information We Collect
              </h2>
              <p className="text-slate-600 leading-relaxed">
                StoryDownloader does not collect, store, or share any personal information. We do not require account
                registration or login. The URLs you paste are only used in real-time to fetch media and are
                <strong className="text-slate-800"> never saved on our servers</strong>.
              </p>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">2</span>
                Media Files
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We do not download, store, or host any media files. Our service only retrieves and returns
                direct CDN links from the original platform. All media remains on the respective platform's servers.
              </p>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">3</span>
                Cookies
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We do not use tracking cookies or analytics. No third-party advertising cookies are placed on your device.
                Our site is completely cookie-free.
              </p>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">4</span>
                Third-Party Services
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our service interacts with third-party platforms (Instagram, Facebook, YouTube) solely to retrieve
                publicly available media. We are not affiliated with, endorsed by, or connected to these platforms.
              </p>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">5</span>
                Changes to This Policy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Continued use of the service after changes
                constitutes acceptance of the updated policy. We encourage you to review this page periodically.
              </p>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">6</span>
                Contact
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please visit our{' '}
                <a href="/contact" className="text-indigo-600 font-semibold hover:underline">Contact page</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
