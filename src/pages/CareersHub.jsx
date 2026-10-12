import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

const CAREERS_EMAIL = 'careers@looplab.lk';
const DEFAULT_MAILTO_SUBJECT = encodeURIComponent('Job Application - LoopLab');
const DEFAULT_MAILTO_BODY = encodeURIComponent(
  'Hello LoopLab Hiring Team,\n\nPlease find attached my CV/Resume for your review.\n\nPosition of Interest: \nFull Name: \nContact Number: \nLinkedIn / Portfolio: \n\nThank you!'
);
const DEFAULT_MAILTO_HREF = `mailto:${CAREERS_EMAIL}?subject=${DEFAULT_MAILTO_SUBJECT}&body=${DEFAULT_MAILTO_BODY}`;

/**
 * Category chip colours.
 *
 * Categories come from the IMS, so a hardcoded map goes stale the moment
 * someone adds one: every unlisted category collapsed to a single fallback and
 * they all looked alike. Instead a category name is hashed into this fixed
 * palette.
 *
 * This is deterministic, not random. The same category always resolves to the
 * same colour, on every render, for every visitor, with no stored state. New
 * categories get a sensible colour with no code change.
 *
 * The ten hues are evenly spaced and share a lightness and chroma, so the chips
 * read as one family rather than as stock Tailwind colours. Every pair is
 * contrast-checked: text on chip is 6.5-7.5:1, the dot against the chip is
 * 3.6-4.4:1. The category name is always shown as text beside the dot, so
 * colour never carries meaning on its own.
 */
const CATEGORY_PALETTE = [
  { bg: '#f6e5ff', text: '#60387b', dot: '#8b55b0' }, // plum
  { bg: '#ffe2f6', text: '#742f60', dot: '#a74a8c' }, // rose
  { bg: '#e0edff', text: '#32488b', dot: '#4d6bc5' }, // indigo
  { bg: '#cef4ff', text: '#00587c', dot: '#0080b0' }, // azure
  { bg: '#cbf7f6', text: '#005f60', dot: '#008a8c' }, // cyan
  { bg: '#d1f7e7', text: '#006041', dot: '#008b61' }, // teal
  { bg: '#def5d8', text: '#255b17', dot: '#3c852b' }, // fern
  { bg: '#f6edcc', text: '#614a00', dot: '#8c6e00' }, // olive
  { bg: '#ffe6d1', text: '#7b3700', dot: '#af5500' }, // amber
  { bg: '#ffe2de', text: '#802e2b', dot: '#b74844' }, // clay
];

/** FNV-1a: small, stable, and spreads short strings evenly across the palette. */
function hashCategory(name) {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) % CATEGORY_PALETTE.length;
}

function getCategoryStyle(cat) {
  return CATEGORY_PALETTE[hashCategory(cat || 'General')];
}

function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7)  return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl ambient-shadow animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="h-5 w-28 bg-surface-container rounded-full" />
        <div className="h-5 w-16 bg-surface-container rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-surface-container rounded-lg mb-3" />
      <div className="h-4 w-full bg-surface-container rounded mb-2" />
      <div className="h-4 w-5/6 bg-surface-container rounded mb-8" />
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-surface-container rounded" />
        <div className="h-8 w-28 bg-surface-container rounded-lg" />
      </div>
    </div>
  );
}

/* ─── Job Detail Modal ─── */
function JobDetailModal({ job, onClose, imsUrl }) {
  const colors = getCategoryStyle(job.category);
  const tags = job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const closeButtonRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog so keyboard users are not left behind it.
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleApply = () => {
    // The IMS reads ?tab=intern to select the Intern tab. imsUrl arrives already
    // normalised; URLSearchParams also encodes returnTo properly.
    const query = new URLSearchParams({
      tab: 'intern',
      returnTo: `/jobs/${job.id}`,
    });
    window.location.href = `${imsUrl}/login?${query}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
        className="relative bg-surface w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.22s cubic-bezier(.25,.8,.25,1)' }}
      >
        {/* Header sits on the page surface rather than a solid primary band, so
            the role title is the loudest thing in the dialog and the facts read
            as a definition list instead of a row of washed-out white labels. */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-6 border-b border-outline-variant/40 shrink-0">
          <div className="flex items-start gap-4 mb-5">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-1.5"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
              {job.category || 'General'}
            </span>
            <span className="text-sm text-on-surface-variant">Posted {timeAgo(job.created_at)}</span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="ml-auto -mt-1 -mr-1 w-10 h-10 shrink-0 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-colors"
              aria-label="Close job details"
            >
              <span aria-hidden="true" className="material-symbols-outlined">close</span>
            </button>
          </div>

          <h2 id="job-modal-title" className="font-headline text-2xl md:text-3xl font-bold leading-tight tracking-[-0.02em] text-on-surface text-balance">
            {job.title}
          </h2>

          {(job.location || job.stipend_range || job.capacity) && (
            <dl className="flex flex-wrap gap-x-8 gap-y-3 mt-5">
              {job.location && (
                <div>
                  <dt className="text-xs text-on-surface-variant">Location</dt>
                  <dd className="font-bold text-on-surface">{job.location}</dd>
                </div>
              )}
              {job.stipend_range && (
                <div>
                  <dt className="text-xs text-on-surface-variant">Stipend</dt>
                  <dd className="font-bold text-on-surface">{job.stipend_range}</dd>
                </div>
              )}
              {job.capacity && (
                <div>
                  <dt className="text-xs text-on-surface-variant">Openings</dt>
                  <dd className="font-bold text-on-surface tabular-nums">{job.capacity}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-7 space-y-7">

          {/* Description */}
          {job.description && (
            <section>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-3">
                About This Role
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </section>
          )}

          {/* Requirements */}
          {job.requirements && (
            <section>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-3">
                Requirements
              </h3>
              <div className="text-on-surface-variant text-sm leading-relaxed">
                {job.requirements.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} className="flex gap-2.5 mb-2">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span>{line.replace(/^[-•*]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-3">
                Skills &amp; Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-full border border-outline-variant/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-outline-variant/40 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-outline text-center sm:text-left">
            Portal updating? Email CV to{' '}
            <a
              href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Job Application: ${job.title}`)}`}
              className="text-primary font-semibold underline underline-offset-2 hover:opacity-80"
            >
              {CAREERS_EMAIL}
            </a>
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Job Application: ${job.title}`)}`}
              className="px-5 py-3 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all text-center flex-1 sm:flex-initial"
            >
              Email CV Directly
            </a>
            <button
              id={`modal-apply-${job.id}`}
              onClick={handleApply}
              className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm flex-1 sm:flex-initial"
            >
              Apply via Portal
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Page ─── */
export default function CareersHub() {
  const [jobs, setJobs]               = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [activeJob, setActiveJob]     = useState(null);
  const [copied, setCopied]           = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CAREERS_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Trailing slashes in VITE_IMS_URL produced a "//login" path that the IMS
  // router does not match, so the Intern tab was never selected. Normalise here
  // and every link below is built from a clean base.
  const IMS_URL = (import.meta.env.VITE_IMS_URL || 'http://localhost:5173').replace(/\/+$/, '');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); setError(null);
        const data = await api.get('/job-posts/?status=Live');
        setJobs(data.items || []);
        setFiltered(data.items || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load current openings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(j =>
        j.title?.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q) ||
        j.category?.toLowerCase().includes(q) ||
        j.tags?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) result = result.filter(j => j.category === selectedCategory);
    if (selectedLocation)  result = result.filter(j => j.location?.toLowerCase().includes(selectedLocation.toLowerCase()));
    setFiltered(result);
  }, [search, selectedCategory, selectedLocation, jobs]);

  const categories = [...new Set(jobs.map(j => j.category).filter(Boolean))];
  const locations  = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const clearFilters = useCallback(() => { setSearch(''); setSelectedCategory(''); setSelectedLocation(''); }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

      {/* Modal */}
      {activeJob && (
        <JobDetailModal job={activeJob} onClose={() => setActiveJob(null)} imsUrl={IMS_URL} />
      )}

      {/* Hero */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6">
              Shape the future of <span className="text-primary italic">Digital Cycles.</span>
            </h1>
            <p className="text-lg text-on-surface-variant font-light max-w-xl">
              Join LoopLab and help build the next generation of intelligent systems. We hire curious, driven people who care about real impact.
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-36 h-36 shrink-0">
            <div className="w-36 h-36 rounded-full border-4 border-primary-container border-t-transparent animate-spin flex items-center justify-center" style={{ animationDuration: '3500ms' }}>
              <div className="w-24 h-24 rounded-full border-4 border-secondary-container border-b-transparent animate-spin flex items-center justify-center" style={{ animationDuration: '2200ms' }}>
                <span className="material-symbols-outlined text-primary text-4xl">cycle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-surface-container-low rounded-2xl p-5 flex flex-wrap gap-4 items-center ambient-shadow">
          <div className="flex-1 min-w-[220px] relative">
            <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">search</span>
            <input
              id="job-search"
              aria-label="Search roles, skills, or keywords"
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest rounded-xl border-none text-on-surface"
              placeholder="Search roles, skills, or keywords…"
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select id="filter-category" aria-label="Filter by category" className="bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface-variant min-w-[160px]" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select id="filter-location" aria-label="Filter by location" className="bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface-variant min-w-[140px]" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          {(search || selectedCategory || selectedLocation) && (
            <button type="button" id="clear-filters" className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline" onClick={clearFilters}>
              <span aria-hidden="true" className="material-symbols-outlined text-base">close</span>Clear
            </button>
          )}
        </div>
      </header>

      {/* Portal Deployment and Direct Email Application Notice */}
      <div className="mb-10 bg-surface-container-low border border-primary/25 rounded-2xl p-6 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ambient-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Direct Application Notice
              </span>
              <span className="text-xs text-on-surface-variant font-medium">Recruitment portal updating</span>
            </div>
            <h2 className="text-lg font-bold text-on-surface">
              We are actively hiring! Send your CV directly via email
            </h2>
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Our automated portal is undergoing scheduled deployment. You can send your resume/CV directly to{' '}
              <a
                href={DEFAULT_MAILTO_HREF}
                className="text-primary font-semibold underline underline-offset-2 hover:opacity-80"
              >
                {CAREERS_EMAIL}
              </a>
              . Our recruitment team reviews every submission promptly.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href={DEFAULT_MAILTO_HREF}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 text-sm flex-1 sm:flex-initial whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send CV via Email
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 text-on-surface font-semibold rounded-xl hover:bg-surface-container transition-all text-sm flex-1 sm:flex-initial whitespace-nowrap"
            title="Copy email address"
          >
            {copied ? (
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            )}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Job listings - Expanded to full width */}
        <div className="lg:col-span-12 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-headline text-2xl font-bold">
              Open Positions
              <span className="text-on-surface-variant font-normal ml-2 text-xl tabular-nums">{!loading && `(${filtered.length})`}</span>
            </h2>
            {!loading && !error && jobs.length > 0 && (
              <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-[color:var(--success)]" />
                Live from IMS
              </span>
            )}
          </div>

          {/* Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(n => <SkeletonCard key={n} />)}
            </div>
          )}

          {/* Direct Email Application Fallback (When API is updating/deploying) */}
          {!loading && error && (
            <div className="py-12 px-6 sm:px-10 bg-surface-container-low rounded-3xl border border-outline-variant/30 text-center max-w-3xl mx-auto ambient-shadow">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-3">
                Direct Submission Open
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface mb-3">
                Recruitment Portal Updating
              </h3>
              <p className="text-on-surface-variant max-w-xl mx-auto mb-6 text-sm sm:text-base leading-relaxed">
                Our openings catalog is currently updating while backend services are being deployed. Do not wait for the catalog to finish deploying: our hiring team is actively accepting applications by email.
              </p>

              {/* Guidelines Box */}
              <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 mb-8 text-left max-w-xl mx-auto space-y-3">
                <div className="text-xs font-bold text-outline uppercase tracking-wider">
                  How to Submit Your Application
                </div>
                <div className="space-y-3 text-sm text-on-surface">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">alternate_email</span>
                    <div>
                      <span className="text-on-surface-variant text-xs block">Email Address</span>
                      <strong className="text-on-surface font-mono text-sm">{CAREERS_EMAIL}</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <div>
                      <span className="text-on-surface-variant text-xs block">Subject Line Format</span>
                      <span className="text-on-surface font-medium">Application: [Role Name] - [Your Full Name]</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <div>
                      <span className="text-on-surface-variant text-xs block">Attachments &amp; Links</span>
                      <span className="text-on-surface-variant">Attach your Resume/CV (PDF) and include links to your Portfolio, GitHub, or LinkedIn.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={DEFAULT_MAILTO_HREF}
                  className="px-8 py-3.5 bg-primary text-on-primary font-bold rounded-xl shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Email Your CV Directly
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-6 py-3.5 bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-semibold rounded-xl hover:bg-surface-container transition-all inline-flex items-center gap-2"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  )}
                  {copied ? 'Copied Email!' : 'Copy Email Address'}
                </button>
              </div>

              <div className="mt-8 pt-5 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Check if live openings feed has restored
                </button>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-outline mb-4 block">search_off</span>
              {jobs.length === 0 ? (
                <><p className="text-on-surface-variant font-medium">No openings right now.</p><p className="text-sm text-outline mt-2">Check back soon or submit your CV below.</p></>
              ) : (
                <><p className="text-on-surface-variant font-medium">No results match your filters.</p><button className="mt-4 text-sm text-primary font-semibold hover:underline" onClick={clearFilters}>Clear all filters</button></>
              )}
            </div>
          )}

          {/* Full-width rows rather than a two-up card grid: openings are scanned
              down the title column, and the meta stays on one line instead of
              being squeezed into a card footer. Each row is a real <button>, so
              it is reachable by keyboard; it was previously a div with onClick. */}
          {!loading && !error && filtered.length > 0 && (
            <ul className="rounded-2xl border border-outline-variant/40 divide-y divide-outline-variant/40 overflow-hidden bg-surface-container-lowest">
              {filtered.map(job => {
                const colors = getCategoryStyle(job.category);
                const tags = job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                const meta = [
                  job.location && { icon: 'location_on', text: job.location },
                  job.stipend_range && { icon: 'payments', text: job.stipend_range },
                  job.capacity && {
                    icon: 'group',
                    text: `${job.capacity} ${job.capacity === 1 ? 'opening' : 'openings'}`,
                  },
                ].filter(Boolean);

                return (
                  <li key={job.id}>
                    <button
                      type="button"
                      id={`job-card-${job.id}`}
                      onClick={() => setActiveJob(job)}
                      className="group w-full text-left p-6 sm:p-8 hover:bg-surface-container-low transition-colors flex flex-col sm:flex-row sm:items-center gap-5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full tracking-wider inline-flex items-center gap-1.5"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.dot }} />
                            {job.category || 'General'}
                          </span>
                          <span className="text-xs text-on-surface-variant">Posted {timeAgo(job.created_at)}</span>
                        </div>

                        <h3 className="font-headline text-xl sm:text-2xl font-bold leading-snug tracking-[-0.01em] group-hover:text-primary transition-colors text-balance">
                          {job.title}
                        </h3>

                        {job.description && (
                          <p className="text-on-surface-variant mt-2 line-clamp-2 max-w-2xl text-pretty">
                            {job.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-on-surface-variant">
                          {meta.map(m => (
                            <span key={m.icon} className="inline-flex items-center gap-1.5">
                              <span aria-hidden="true" className="material-symbols-outlined text-base text-primary">{m.icon}</span>
                              {m.text}
                            </span>
                          ))}
                          {tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-surface-container px-2.5 py-1 rounded-md">{tag}</span>
                          ))}
                        </div>
                      </div>

                      <span className="shrink-0 inline-flex items-center gap-2 font-bold text-primary sm:justify-end">
                        View role
                        <span aria-hidden="true" className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Sidebar - Commented out as requested
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-surface-container-low rounded-2xl p-8 ambient-shadow overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="font-headline text-2xl font-bold mb-2">Can&apos;t find a fit?</h2>
                <p className="text-on-surface-variant text-sm mb-6">Submit your CV to our general talent pool. We&apos;ll reach out when a matching cycle opens.</p>
                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest mb-2">Full Name</label>
                    <input className="w-full px-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="Jane Doe" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest mb-2">Email Address</label>
                    <input className="w-full px-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="jane@company.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest mb-2">Upload CV</label>
                    <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary text-4xl mb-3 block">cloud_upload</span>
                      <p className="text-sm text-on-surface-variant"><span className="font-bold text-primary">Click to upload</span> or drag &amp; drop</p>
                      <p className="text-xs text-outline mt-1">PDF, DOCX (Max 10MB)</p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-xl shadow-primary/20 hover:opacity-90 transition-opacity" type="submit">Submit Application</button>
                </form>
              </div>
            </div>
          </div>
        </aside>
        */}
      </div>
    </div>
  );
}
