import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Instagram Downloader', to: '/instagram-story-downloader' },
  { label: 'YouTube Shorts Downloader', to: '/youtube-shorts-downloader' },
  { label: 'Facebook Video Downloader', to: '/facebook-video-downloader' },
];

export default function Footer() {
  return (
    <footer className="mt-auto py-8 sm:py-10 bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-5 sm:gap-6">

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-white/10" />

        {/* Copyright */}
        <p className="text-xs font-medium opacity-60 text-center">
          © {new Date().getFullYear()} StoryDownloader. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-[10px] leading-relaxed opacity-40 max-w-2xl mx-auto text-center px-2">
          StoryDownloader is an independent utility and is not affiliated with YouTube, Instagram, Facebook, or Meta.
          All trademarks belong to their respective owners. This tool only provides access to publicly available content
          and does not host or store any media on its servers.
        </p>
      </div>
    </footer>
  );
}
