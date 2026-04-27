import { useState, useEffect } from 'react';

function SideAd({ side }) {
  const [visible, setVisible] = useState(false);

  // Show after scrolling 100px so it doesn't flash on page load
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`
        fixed top-1/2 -translate-y-1/2 z-40
        hidden xl:flex flex-col items-center gap-1.5
        transition-all duration-500
        ${side === 'left' ? 'left-4 2xl:left-8' : 'right-4 2xl:right-8'}
        ${visible ? 'opacity-100 translate-x-0' : side === 'left' ? 'opacity-0 -translate-x-4' : 'opacity-0 translate-x-4'}
      `}
    >
      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
        Ad
      </span>

      {/* ── Replace this div with your AdSense <ins> tag after approval ── */}
      <div className="w-[160px] h-[600px] bg-white/60 backdrop-blur-sm border border-dashed border-slate-300 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2">
        <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span className="text-slate-300 text-[10px] font-semibold text-center leading-tight px-2">
          160×600
        </span>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <>
      <SideAd side="left" />
      <SideAd side="right" />
    </>
  );
}
