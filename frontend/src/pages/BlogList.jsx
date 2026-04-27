import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

export default function BlogList() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
      <SEO
        title="Blog — Story Downloader Tips, Guides & Fixes"
        description="Read expert guides on how to download Instagram Reels, YouTube Shorts, and Facebook videos. Tips, fixes, and tutorials for the best story downloader experience."
        keywords="story downloader blog, instagram downloader guide, youtube shorts download tips, facebook video download, social media video downloader"
        canonical="https://storydownloader.app/blog"
      />
      
      {/* Page Header */}
      <div className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6 premium-gradient-text tracking-tight">Our Blog</h1>
        <p className="text-slate-500 text-lg font-medium">Master the art of social media media retrieval with our expert guides.</p>
      </div>

      {/* Article Grid */}
      <div className="grid gap-10 md:grid-cols-2">
        {blogPosts.map(post => (
          <article key={post.id} className="ultra-glass rounded-[2.5rem] p-10 flex flex-col group transition-all duration-500 hover:ring-2 hover:ring-indigo-500/30">
            <div className="flex gap-4 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-black tracking-[0.3em] text-indigo-600 bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-black mb-6 text-slate-900 leading-tight flex-1">
              <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600 transition-colors duration-300">{post.title}</Link>
            </h2>
            <p className="text-slate-500 text-base mb-8 leading-relaxed font-medium line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                   <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="text-sm font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-2 group/link px-4 py-2 rounded-xl bg-indigo-500/5 border border-indigo-500/10 transition">
                Read More 
                <span className="transform group-hover/link:translate-x-1 transition">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

