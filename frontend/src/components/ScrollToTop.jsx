import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show/hide back-to-top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show button after scrolling 40% of page
      if (scrolled > totalHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-50 p-4 rounded-2xl bg-indigo-600 text-white shadow-2xl hover:bg-indigo-500 transition-all duration-300 animate-fade-up ring-4 ring-indigo-500/20 group"
      aria-label="Scroll to top"
    >
      <svg 
        className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth={3} 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
      
      {/* Decorative pulse effect */}
      <span className="absolute inset-0 rounded-2xl bg-indigo-400 animate-ping opacity-20 pointer-events-none" />
    </button>
  );
}
