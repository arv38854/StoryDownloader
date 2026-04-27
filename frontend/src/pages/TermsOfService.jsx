import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SECTIONS = [
  {
    n: '1',
    title: 'Acceptance of Terms',
    body: 'By accessing or using StoryDownloader, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.',
  },
  {
    n: '2',
    title: 'Use of the Service',
    body: 'StoryDownloader is provided for personal, non-commercial use only. You may use this tool solely to download publicly available media content for lawful purposes. You must not use this service to download, reproduce, or distribute content that infringes on any third-party intellectual property rights.',
  },
  {
    n: '3',
    title: 'Public Content Only',
    body: 'This tool only supports publicly accessible content. We do not provide any means to access private, restricted, or password-protected content. You are solely responsible for ensuring you have the right to download any content you retrieve using this service.',
  },
  {
    n: '4',
    title: 'No Data Storage',
    body: 'We do not store, log, or retain any URLs you submit, any media files retrieved, or any personal information. All processing happens in real-time and nothing is saved on our servers.',
  },
  {
    n: '5',
    title: 'Intellectual Property',
    body: 'All media downloaded through StoryDownloader remains the intellectual property of its original creators and the respective platforms (Instagram, YouTube, Facebook). Downloading content does not transfer any ownership or rights to you. Always respect copyright law and the terms of service of the originating platform.',
  },
  {
    n: '6',
    title: 'Disclaimer of Warranties',
    body: 'StoryDownloader is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability, accuracy, or fitness for a particular purpose. The service may be affected by changes to third-party platform APIs at any time.',
  },
  {
    n: '7',
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, StoryDownloader and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the service.',
  },
  {
    n: '8',
    title: 'Third-Party Platforms',
    body: 'StoryDownloader is an independent utility and is not affiliated with, endorsed by, or connected to YouTube, Instagram, Facebook, or Meta Platforms, Inc. All trademarks belong to their respective owners.',
  },
  {
    n: '9',
    title: 'Changes to Terms',
    body: 'We reserve the right to update these Terms at any time. Continued use of the service after changes are posted constitutes your acceptance of the revised Terms.',
  },
  {
    n: '10',
    title: 'Contact',
    body: null,
    isContact: true,
  },
];

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read StoryDownloader's Terms of Service. Learn about acceptable use, intellectual property, disclaimers, and your responsibilities when using our free media downloader tool."
        canonical="https://storydownloader.app/terms"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Terms of Service</h1>
          <p className="text-indigo-300 text-sm font-medium">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
          {SECTIONS.map(({ n, title, body, isContact }) => (
            <section key={n}>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black shrink-0">
                  {n}
                </span>
                {title}
              </h2>
              {isContact ? (
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about these Terms, please visit our{' '}
                  <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">
                    Contact page
                  </Link>.
                </p>
              ) : (
                <p className="text-slate-600 leading-relaxed">{body}</p>
              )}
              <div className="mt-10 h-px bg-slate-100" />
            </section>
          ))}

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition text-sm"
            >
              Back to Tool
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
