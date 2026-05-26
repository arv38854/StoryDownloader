import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-900 text-white px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
      <p className="text-sm text-slate-300 text-center sm:text-left max-w-2xl">
        We use cookies to serve personalised ads via Google AdSense and to improve your experience.{' '}
        <Link to="/privacy" className="text-indigo-400 underline hover:text-indigo-300">Learn more</Link>.
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition"
      >
        Accept & Close
      </button>
    </div>
  );
}
