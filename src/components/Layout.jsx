import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
const logo = '/images/looplab-refined.png';
import { Arrow } from './StudioUI';
import '../studio.css';
const links = [['/projects', 'Our work'], ['/services', 'Services'], ['/about', 'The studio'], ['/packages', 'Packages']];
export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const toggle = useRef(null);
  if (menuPath !== pathname) { setMenuPath(pathname); setOpen(false); }
  useEffect(() => {
    if (!open) return;
    const close = e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  const dashboard = pathname === '/candidate-dashboard';
  return <div className="studio-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    {!dashboard && <header className="studio-header">
      <Link to="/" aria-label="LoopLab home" className="brand-mark"><img src={logo} alt="LoopLab" width="140" height="140" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([url, label]) => <NavLink key={url} to={url}>{label}</NavLink>)}</nav>
      <Link className="button dark header-cta" to="/contact">Let’s talk <Arrow /></Link>
      <button ref={toggle} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav"><span className="menu-label">{open ? 'Close' : 'Menu'}</span><svg className="menu-glyph" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path className="menu-line first" d="M5 10h20"/><path className="menu-line second" d="M10 20h15"/></svg></button>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links, ['/contact', 'Start a project'], ['/careers', 'Careers'], ['/blog', 'Insights']].map(([url, label]) => <NavLink key={url} to={url}>{label}<Arrow /></NavLink>)}</nav>}
    </header>}
    <main id="main-content" key={pathname} className="route-view">{children}</main>
    {!dashboard && <footer className="studio-footer on-dark"><div className="footer-top"><div><h2>Good things start<br />with a conversation.</h2><Link to="/contact" className="button pale">Tell us your idea <Arrow /></Link></div><div className="footer-contact"><a href="mailto:looplab888@gmail.com">looplab888@gmail.com</a><a href="tel:+94701857206">+94 70 185 7206</a><p>Based in Sri Lanka.<br />Building for what’s next.</p></div></div><div className="footer-links">{[...links, ['/careers', 'Careers'], ['/blog', 'Insights']].map(([url, label]) => <Link to={url} key={url}>{label}</Link>)}</div><div className="footer-wordmark" aria-hidden="true">LoopLab<span>®</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LoopLab (PVT) LTD</span><span>Precision in every cycle.</span><div><Link to="/privacy-policy">Privacy</Link><Link to="/terms-of-service">Terms</Link></div></div></footer>}
  </div>;
}


