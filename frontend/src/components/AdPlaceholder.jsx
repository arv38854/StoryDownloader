import { useEffect } from 'react';

/**
 * AdPlaceholder — swap the inner div for a real <ins class="adsbygoogle"> tag after AdSense approval.
 *
 * sizes:
 *   "banner"      → 728×90 desktop / 320×50 mobile  (top/bottom strip)
 *   "rectangle"   → 336×280 desktop / 300×250 mobile (in-content)
 *   "large"       → 300×600 desktop only             (sidebar / between sections)
 */
export default function AdPlaceholder({ size = 'rectangle', className = '', slotId = '' }) {
  const config = {
    banner: {
      label: 'Advertisement · 728×90 / 320×50',
      desktop: 'hidden sm:flex h-[90px] w-full max-w-[728px]',
      mobile: 'flex sm:hidden h-[50px] w-full max-w-[320px]',
    },
    rectangle: {
      label: 'Advertisement · 336×280',
      desktop: 'flex h-[280px] w-full max-w-[336px]',
      mobile: null,
    },
    large: {
      label: 'Advertisement · 300×600',
      desktop: 'hidden sm:flex h-[600px] w-full max-w-[300px]',
      mobile: null,
    },
  }[size] ?? {};

  // Initialize AdSense on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center gap-1.5 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        Advertisement
      </span>

      {/* If a slotId is provided, we render the real AdSense <ins> unit */}
      {slotId ? (
        <div className="w-full flex justify-center overflow-hidden">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9550860412443616"
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* Fallback placeholder if no slotId is provided yet */
        <>
          {config.desktop && (
            <div className={`${config.desktop} bg-slate-100 border border-dashed border-slate-300 rounded-xl items-center justify-center mx-auto`}>
              <span className="text-slate-400 text-xs font-medium">{config.label}</span>
            </div>
          )}
          {config.mobile && (
            <div className={`${config.mobile} bg-slate-100 border border-dashed border-slate-300 rounded-xl items-center justify-center mx-auto`}>
              <span className="text-slate-400 text-xs font-medium">Ad · 320×50</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
