import { useState } from 'react';
import SEO from '../components/SEO';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Wire to Formspree / EmailJS in production: https://formspree.io
    setSubmitted(true);
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Have a question or feedback about StoryDownloader? Get in touch with us. We're happy to help with any issues or suggestions."
        canonical="https://storydownloader.app/contact"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Contact Us</h1>
          <p className="text-indigo-300 text-base font-medium">Have a question or feedback? We'd love to hear from you.</p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-6 py-14">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-6 py-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-bold text-xl mb-1">Message Sent!</p>
              <p className="text-sm text-green-600">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition text-sm"
              >
                Send Message
              </button>
            </form>
          )}

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Email Support</h3>
              <p className="text-slate-500 text-xs">We typically respond within 24 hours on business days.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <div className="text-2xl mb-2">🐛</div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Report a Bug</h3>
              <p className="text-slate-500 text-xs">Found something broken? Let us know and we'll fix it fast.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
