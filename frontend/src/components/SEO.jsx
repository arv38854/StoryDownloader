import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'StoryDownloader';
const SITE_URL = 'https://free-story-downloader.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image,
  keywords,
  author = 'StoryDownloader',
  twitterSite = '@storydownloader',
  noIndex = false,
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Free Instagram, YouTube & Facebook Downloader`;
  const metaImage = image || DEFAULT_IMAGE;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* ── Structured Data (JSON-LD) ── */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
