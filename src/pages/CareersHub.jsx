import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Arrow } from '../components/StudioUI';
import InterfaceIcon from '../components/InterfaceIcon';

const CAREERS_EMAIL = 'careerslooplab@gmail.com';
const DEFAULT_MAILTO_SUBJECT = encodeURIComponent('Application: [Role Name] - [Your Full Name]');
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

/* ─── Job Detail Modal ─── */
function JobDetailModal({ job, onClose, imsUrl }) {
  const colors = getCategoryStyle(job.category);
  const tags = job.tags ? job.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  const closeButtonRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const dialog = closeButtonRef.current?.closest('[role="dialog"]');
        const controls = dialog?.querySelectorAll('button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog so keyboard users are not left behind it.
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = previousOverflow;
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
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
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

export default function CareersHub() {
 const [jobs,setJobs]=useState([]), [loading,setLoading]=useState(true), [error,setError]=useState(null);
 const [search,setSearch]=useState(''), [category,setCategory]=useState(''), [location,setLocation]=useState('');
 const [activeJob,setActiveJob]=useState(null), [retry,setRetry]=useState(0), [copyStatus,setCopyStatus]=useState('');
 const origin = useRef(null);
 const IMS_URL=(import.meta.env.VITE_IMS_URL||'http://localhost:5173').replace(/\/+$/, '');
 useEffect(()=>{
   let alive=true;
   api.get('/job-posts/?status=Live').then(data=>{if(alive){setJobs(data.items||[]);setError(null);}}).catch(()=>{if(alive)setError('Our recruitment portal is being updated. We are accepting CVs and resumes directly by email while the openings feed is unavailable.');}).finally(()=>{if(alive)setLoading(false);});
   return ()=>{alive=false;};
 },[retry]);
 const filtered=jobs.filter(j=>(!category||j.category===category)&&(!location||j.location===location)&&(!search.trim()||[j.title,j.description,j.category,j.tags].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase().trim())));
 const clear=()=>{setSearch('');setCategory('');setLocation('');};
 const copy=async()=>{try{await navigator.clipboard.writeText(CAREERS_EMAIL);setCopyStatus('Email copied');}catch{setCopyStatus('Could not copy. Select the email address below.');}};
 const closeJob=()=>{setActiveJob(null);origin.current?.focus();};
 return <div className="careers-page">
  {activeJob&&<JobDetailModal job={activeJob} onClose={closeJob} imsUrl={IMS_URL}/>}
  <section className="page-intro wrap"><h1>Find your place.<br /><span>Make your mark.</span></h1><div className="intro-split"><p>Curious minds. Thoughtful builders. Join us in turning difficult problems into software that matters.</p><a href={DEFAULT_MAILTO_HREF} className="button primary">Email your CV <Arrow /></a></div></section>
  <section className="careers-banner wrap"><div><h2>Bring curiosity.<br />Build with care.</h2><p>We value people who ask thoughtful questions, share what they learn, and care about the details.</p><span>Engineering · Design · Applied AI · Research</span></div><img src="/images/careers-build-together.png" alt="Concept illustration of collaborative building blocks and ascending paths" width="1200" height="800"/></section>
  <section className="careers-email wrap"><div><h2>We’re accepting<br />applications by email.</h2><p>The recruitment portal is being updated. Send your CV directly to our team and tell us which role you are interested in.</p><a href={DEFAULT_MAILTO_HREF}>{CAREERS_EMAIL}</a></div><dl className="application-guide"><div><dt>Email subject</dt><dd>Application: [Role Name] - [Your Full Name]</dd></div><div><dt>What to include</dt><dd>Attach your CV or resume as a PDF. Include links to your portfolio, GitHub, or LinkedIn, and a way to contact you.</dd></div></dl><div><a className="button primary" href={DEFAULT_MAILTO_HREF}>Email your CV directly <Arrow /></a><button className="text-link" onClick={copy}><InterfaceIcon name={copyStatus === 'Email copied' ? 'check' : 'copy'} />Copy email address</button><p role="status" className="copy-status">{copyStatus}</p><p className="email-help">Your email app will open with a draft.<br />Attach your CV before sending.</p></div></section>
  <section className="careers-openings wrap" id="open-roles"><div className="section-heading"><h2>Open possibilities.</h2><p>Explore current roles.<br />Find the work that fits your skills.</p></div>{!error && <div className="careers-filters"><label>Search opportunities<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Role, skill, or keyword"/></label><label>Discipline<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">All disciplines</option>{[...new Set(jobs.map(j=>j.category).filter(Boolean))].map(c=><option key={c}>{c}</option>)}</select></label><label>Location<select value={location} onChange={e=>setLocation(e.target.value)}><option value="">All locations</option>{[...new Set(jobs.map(j=>j.location).filter(Boolean))].map(l=><option key={l}>{l}</option>)}</select></label></div>}
   {(search||category||location)&&<button className="text-link" onClick={clear}>Clear filters</button>}
   <div aria-live="polite" aria-busy={loading}>
   {loading?<div className="careers-loading" role="status"><span>Loading current opportunities...</span><div/><div/></div>:error?<div className="careers-empty"><span className="material-symbols-outlined" aria-hidden="true">cloud_off</span><h3>Email applications are open.</h3><p>{error}</p><a href={DEFAULT_MAILTO_HREF} className="button primary">Send your CV by email <Arrow /></a><button className="text-link feed-retry" onClick={()=>{setLoading(true);setError(null);setRetry(x=>x+1);}}><InterfaceIcon name="refresh" />Check the openings feed again</button></div>:filtered.length===0?<div className="careers-empty"><h3>{jobs.length?'No matching roles.':'No open roles listed right now.'}</h3><p>{jobs.length?'Try another keyword or clear your filters.':'You can still introduce yourself by email. Tell us about your interests and the work you would like to do.'}</p>{jobs.length>0&&<button onClick={clear} className="button dark">Clear filters</button>}</div>:<ul className="career-results">{filtered.map(job=><li key={job.id}><button onClick={e=>{origin.current=e.currentTarget;setActiveJob(job);}}><span className="role-category">{job.category||'General'}<small>{job.location||'Location to be confirmed'}</small></span><span className="role-summary"><strong>{job.title}</strong><span>{job.description}</span><small>{[job.stipend_range,job.capacity?`${job.capacity} opening${job.capacity===1?'':'s'}`:''].filter(Boolean).join(' · ')}</small></span><span className="role-action">View role <Arrow /></span></button></li>)}</ul>}
   </div>
  </section>

 </div>;
}

