export default function BrandLoader({ label = 'Loading your next page' }) {
  return <div className="brand-loader" role="status" aria-live="polite">
    <svg className="loader-loop" width="76" height="40" viewBox="0 0 76 40" fill="none" aria-hidden="true">
      <path d="M38 20C25-1 4 0 4 20s21 21 34 0S72 0 72 20 51 41 38 20Z" stroke="currentColor" strokeWidth="3"/>
    </svg>
    <span className="loader-label">{label}</span>
    <div className="loader-track" aria-hidden="true"><span/></div>
    <small>Precision in every cycle.</small>
  </div>;
}
