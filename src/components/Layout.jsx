import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.webp';

export default function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname === '/candidate-dashboard';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(location.pathname);
  const menuToggleRef = useRef(null);

  // Close the mobile menu on navigation so it never survives a route change,
  // including browser back/forward. Adjusting during render rather than in an
  // effect avoids a cascading re-render.
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/careers', label: 'Careers' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to) => location.pathname === to;

  // Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      {!isDashboard && (
        <nav aria-label="Main" className="sticky top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30">
          <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-full">
            <div className="navbar-brand">
              <Link to="/" aria-label="LoopLab home">
                <span className="logo-clip">
                  <img
                    src={logo}
                    alt="LoopLab"
                    width="132"
                    height="132"
                    fetchPriority="high"
                    decoding="async"
                    className="logo"
                  />
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  className={`font-label text-md font-bold transition-all ${isActive(link.to)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/careers">
                <button className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-bold tracking-tight hover:scale-95 duration-200 transition-all shadow-md">
                  Join Our Team
                </button>
              </Link>
            </div>

            {/* Mobile Loop Button */}
            <div className="md:hidden flex items-center">
              <button
                ref={menuToggleRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="text-primary group bg-primary/10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors hover:bg-primary/20"
              >
                <span aria-hidden="true" className={`material-symbols-outlined text-3xl transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-[360deg] scale-90' : 'hover:rotate-180 scale-100'}`}>
                  {isMobileMenuOpen ? 'close' : 'all_inclusive'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-surface shadow-lg border-t border-outline-variant/30 flex flex-col pt-2 pb-6 px-4 gap-4 z-40">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg font-label text-md font-bold transition-all ${isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-outline-variant/30 px-4">
                <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-3 rounded-lg bg-primary text-on-primary font-bold tracking-tight shadow-md">
                    Join Our Team
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}

      <main id="main-content" className="flex-1">{children}</main>

      {!isDashboard && (
        <footer className="on-dark surface-ink w-full mt-auto py-14 relative overflow-hidden border-t border-white/10">
          <div className="px-6 md:px-8 max-w-7xl mx-auto font-body relative z-10 w-full">
            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 mb-10">
              {/* Brand Section */}
              <div className="space-y-5 lg:w-[35%] xl:w-[30%] lg:pr-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">all_inclusive</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white font-headline">LoopLab</span>
                </div>
                <p className="text-white/50 leading-relaxed text-sm font-medium pt-1">
                  Empowering the future with precision engineering and innovative digital solutions. We transform complex problems into beautiful, scalable realities.
                </p>
                <div className="flex gap-4 pt-2">
                  <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#0077b5] hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(0,119,181,0.4)] transition-all duration-300 border border-white/10" 
                     href="https://www.linkedin.com/company/looplab888/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     title="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between lg:w-[65%] xl:w-[70%] gap-12 sm:gap-8 pt-4 lg:pt-0">
                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-widest text-[11px] mb-4">Exploration</h4>
                  <ul className="space-y-2.5 text-left">
                    {['Services', 'Projects', 'Careers', 'Blog'].map((item) => (
                      <li key={item}>
                        <Link 
                          className="text-white/70 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 py-1.5 transition-all duration-300 text-sm font-medium group" 
                          to={`/${item.toLowerCase()}`}
                        >
                          <span className="w-1 h-1 rounded-full bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim transition-colors"></span>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase tracking-widest text-[11px] mb-4 text-left">Legal</h4>
                  <ul className="space-y-2.5 text-left">
                    <li>
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 py-1.5 transition-all duration-300 text-sm font-medium group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim transition-colors"></span>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 py-1.5 transition-all duration-300 text-sm font-medium group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary-fixed-dim/0 group-hover:bg-primary-fixed-dim transition-colors"></span>
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 lg:max-w-xs">
                  <h4 className="font-bold text-white uppercase tracking-widest text-[11px] mb-4 text-left">Headquarters</h4>
                  <div className="space-y-4 text-sm text-white/60 font-medium text-left">
                    <p className="flex items-start gap-2.5 group">
                      <span className="material-symbols-outlined text-primary-fixed-dim text-lg mt-0.5 group-hover:scale-110 transition-transform">location_on</span>
                      <span className="leading-relaxed">No. 74/1, Neelammahara,<br/>Buthpitiya, Mahara</span>
                    </p>
                    <p className="flex items-center pt-1">
                       <Link to="/contact" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold border-b border-primary-fixed-dim/40 hover:border-primary-fixed-dim py-1 group">
                         Reach out to our team 
                         <span className="material-symbols-outlined text-[13px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                       </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 font-medium tracking-wide">
              <p>© {new Date().getFullYear()} LoopLab (PVT) LTD. All rights reserved. Precision in every cycle.</p>
              <div className="flex gap-8">
                <Link to="/about" className="hover:text-white transition-colors py-1.5">About Us</Link>
                <Link to="/contact" className="hover:text-white transition-colors py-1.5">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
