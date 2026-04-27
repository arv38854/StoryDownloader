import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Story Downloader"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        canonical={`https://storydownloader.app/blog/${post.slug}`}
        type="article"
        structuredData={structuredData}
      />

      <div className="mb-16">
        <Link to="/blog" className="text-sm font-black text-indigo-600 hover:text-indigo-800 mb-10 inline-flex items-center gap-2 group transition">
          <span className="w-8 h-8 flex items-center justify-center bg-indigo-500/10 rounded-lg group-hover:-translate-x-1 transition">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </span>
          Back to Knowledge Base
        </Link>
        <div className="flex gap-3 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 leading-tight premium-gradient-text tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest pb-10 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <span>Updated on {new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Ad 1: Top banner — above article content */}
      <div className="mb-8">
        <AdPlaceholder size="banner" />
      </div>

      <div className="ultra-glass rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 mb-8 shadow-2xl">
        <div 
          className="prose max-w-none prose-h2:text-3xl prose-h2:font-black prose-h2:mt-16 prose-h2:mb-6 prose-p:text-slate-600 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8 prose-a:text-indigo-600 prose-a:font-bold prose-li:text-slate-600 prose-strong:text-slate-900 prose-code:text-indigo-600 prose-code:bg-indigo-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-img:rounded-[2rem]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Ad 2: Mid-article — after content block */}
      <div className="mb-8">
        <AdPlaceholder size="rectangle" />
      </div>

      {/* Ad 3: Pre-CTA — before the Try Now block */}
      <div className="mb-8">
        <AdPlaceholder size="banner" />
      </div>

      {/* Try Now CTA */}
      <div className="bg-indigo-600 rounded-[1.5rem] sm:rounded-[3rem] p-7 sm:p-12 md:p-16 flex flex-col md:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10 shadow-2xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition duration-700" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black mb-2 sm:mb-4 leading-tight tracking-tight">Ready to try it yourself?</h2>
          <p className="text-indigo-100 text-sm sm:text-lg font-medium opacity-80">Use our free downloader — no sign-up, no hassle.</p>
        </div>
        <Link 
          to="/"
          className="relative z-10 shrink-0 bg-white text-indigo-600 hover:bg-indigo-50 font-black px-7 sm:px-12 py-4 sm:py-5 rounded-[1.25rem] sm:rounded-[1.5rem] transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Go to Tool
        </Link>
      </div>
    </div>
  );
}

