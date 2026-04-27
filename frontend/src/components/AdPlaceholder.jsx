/**
 * AdPlaceholder — swap the inner div for a real <ins class="adsbygoogle"> tag after AdSense approval.
 *
 * sizes:
 *   "banner"      → 728×90 desktop / 320×50 mobile  (top/bottom strip)
 *   "rectangle"   → 336×280 desktop / 300×250 mobile (in-content)
 *   "large"       → 300×600 desktop only             (sidebar / between sections)
 */
export default function AdPlaceholder({ size = 'rectangle', className = '' }) {
  const config = {
    banner: {
      label: 'Advertisement · 728×90 / 320×50',
      desktop: 'hidden sm:flex h-[90px] max-w-[728px]',
      mobile: 'flex sm:hidden h-[50px] max-w-[320px]',
    },
    rectangle: {
      label: 'Advertisement · 336×280',
      desktop: 'flex h-[280px] max-w-[336px]',
      mobile: null,
    },
    large: {
      label: 'Advertisement · 300×600',
      desktop: 'hidden sm:flex h-[600px] max-w-[300px]',
      mobile: null,
    },
  }[size] ?? {};

  return (
    <div className={`w-full flex flex-col items-center gap-1.5 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        Advertisement
      </span>

      {/* Desktop unit */}
      {config.desktop && (
        <div className={`${config.desktop} w-full bg-slate-100 border border-dashed border-slate-300 rounded-xl items-center justify-center mx-auto`}>
          {/* ── Replace this div with your AdSense <ins> tag ── */}
          <span className="text-slate-400 text-xs font-medium">{config.label}</span>
        </div>
      )}

      {/* Mobile unit (banner only) */}
      {config.mobile && (
        <div className={`${config.mobile} w-full bg-slate-100 border border-dashed border-slate-300 rounded-xl items-center justify-center mx-auto`}>
          <span className="text-slate-400 text-xs font-medium">Ad · 320×50</span>
        </div>
      )}
    </div>
  );
}
