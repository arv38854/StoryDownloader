import { useEffect } from 'react';

/**
 * AdPlaceholder — renders a real Google AdSense auto ad unit.
 * Pass slotId for a specific ad slot, or omit for auto ads.
 */
export default function AdPlaceholder({ className = '', slotId = '' }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center gap-1 my-4 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px', width: '100%' }}
        data-ad-client="ca-pub-9550860412443616"
        data-ad-slot={slotId || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
