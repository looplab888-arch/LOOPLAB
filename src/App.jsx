import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';

// Only the landing page ships in the initial bundle. Everything else is fetched
// on navigation, which keeps the first load down to what the hero actually needs.
const AboutVision = lazy(() => import('./pages/AboutVision'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const CareersHub = lazy(() => import('./pages/CareersHub'));
const CandidateDashboard = lazy(() => import('./pages/CandidateDashboard'));
const OAuthCallback = lazy(() => import('./pages/OAuthCallback'));
const ResearchBlog = lazy(() => import('./pages/ResearchBlog'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div
        aria-hidden="true"
        className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutVision />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/careers" element={<CareersHub />} />
            <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route path="/blog" element={<ResearchBlog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
