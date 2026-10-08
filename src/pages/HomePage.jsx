import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import CountUp from '../components/CountUp';
import { useState, useEffect } from 'react';

export default function HomePage() {
  // The hero paints from a 17 KB poster image. The 649 KB video is only
  // fetched once the browser is idle, so it never competes with the LCP text.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // An autoplaying background video is motion; honour the OS setting.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = schedule(() => setShowVideo(true));
    return () => cancel(id);
  }, []);

  return (
    <>
      {/* Hero. Previously six effects competed here: a multiply scrim, a
          colour-blend wash, a fade, particles, a glass badge and a glass stat
          pill. It is now one flat ink scrim plus the bottom fade, so the
          typography carries the fold. */}
      <section className="on-dark surface-ink relative overflow-hidden min-h-[92vh] flex items-end px-6 md:px-10 lg:px-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_poster.webp"
            alt=""
            aria-hidden="true"
            width="1152"
            height="648"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          {showVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/hero_poster.webp"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero_video.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 ink-scrim pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 ink-fade pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          <ParticleBackground />
        </div>

        {/* Asymmetric and bottom-aligned rather than a centred stack. */}
        <div className="relative z-20 w-full max-w-7xl mx-auto pb-16 md:pb-24 pt-40">
          <div className="max-w-4xl">
            <h1 className="font-headline text-[clamp(2.75rem,8vw,5.5rem)] font-bold text-white leading-[1.02] tracking-[-0.03em] text-balance">
              We build software
              <br />
              people can trust.
            </h1>
            <p className="mt-8 text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty">
              LoopLab is a Sri Lankan software studio. We build web and mobile
              products, applied machine learning, and research systems, and we
              explain exactly how each one works.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/services">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-base hover:bg-primary-container transition-colors">
                  What we do
                </button>
              </Link>
              <Link to="/contact">
                <button className="text-white px-8 py-4 rounded-lg font-bold text-base border border-white/25 hover:bg-white/10 transition-colors">
                  Start a project
                </button>
              </Link>
            </div>
          </div>

          {/* Plain type instead of a glass pill. */}
          <dl className="mt-16 md:mt-20 flex flex-wrap gap-x-16 gap-y-8 border-t border-white/15 pt-8">
            <div>
              <dt className="text-white/50 text-xs font-bold uppercase tracking-widest">Clients served</dt>
              <dd className="font-headline text-3xl md:text-4xl font-bold text-white mt-1.5">
                <CountUp end={50} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-white/50 text-xs font-bold uppercase tracking-widest">Neural support</dt>
              <dd className="font-headline text-3xl md:text-4xl font-bold text-white mt-1.5">
                <CountUp end={24} suffix="/7" />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* What we do. An asymmetric split with one dominant panel, rather than
          three equal cards each with a rounded icon tile above the heading. */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-[-0.02em] text-balance">
              Three things we are good at
            </h2>
            <p className="text-on-surface-variant mt-5 text-lg leading-relaxed text-pretty">
              We work across the gap between a research idea and something that
              runs in production.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Dominant panel */}
            <Link
              to="/projects"
              className="on-dark surface-ink group lg:col-span-7 rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[22rem] hover:[background-color:var(--ink-soft)] transition-colors"
            >
              <span className="material-symbols-outlined text-4xl text-primary-fixed-dim" aria-hidden="true">psychology</span>
              <div>
                <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4 tracking-[-0.02em]">
                  Applied machine learning
                </h3>
                <p className="text-white/65 leading-relaxed max-w-md text-pretty">
                  Forecasting, computer vision and classification models, built
                  to run against real data rather than a demo notebook.
                </p>
                <span className="inline-flex items-center gap-2 mt-7 font-bold text-white">
                  See our work
                  <span aria-hidden="true" className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </Link>

            {/* Two supporting items, laid out horizontally and separated by a
                hairline rather than repeating the card shape. */}
            <div className="lg:col-span-5 bg-surface-container-low rounded-2xl divide-y divide-outline-variant/40">
              {[
                {
                  icon: 'architecture',
                  title: 'Web & mobile engineering',
                  desc: 'React, Flutter and Django systems that other engineers can pick up and maintain.',
                },
                {
                  icon: 'science',
                  title: 'Research & mentorship',
                  desc: 'Academic and R&D project support, delivered with documentation you can defend.',
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to="/services"
                  className="group flex gap-5 p-8 md:p-10 hover:bg-surface-container transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-3xl text-primary shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-headline text-xl font-bold mb-2 flex items-center gap-2">
                      {item.title}
                      <span aria-hidden="true" className="material-symbols-outlined text-base text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed text-pretty">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section: Smart Agriculture */}
      <section className="py-20 md:py-32 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            <div className="flex-1 relative order-2 md:order-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="pt-0 sm:pt-12">
                  <img loading="lazy"
                    alt="Smart Farming"
                    className="rounded-3xl shadow-lg w-full h-[250px] sm:h-[400px] object-cover"
                    src="/smart_farming.webp"
                  />
                </div>
                <div>
                  <img loading="lazy"
                    alt="Data Monitoring"
                    className="rounded-3xl shadow-lg w-full h-[250px] sm:h-[400px] object-cover"
                    src="/data_monitoring.webp"
                  />
                </div>
              </div>
              <div className="absolute -z-10 -right-10 md:-right-20 top-20 w-40 h-40 md:w-80 md:h-80 border-[20px] md:border-[40px] border-tertiary-fixed-dim/20 rounded-full"></div>
            </div>
            <div className="flex-1 order-1 md:order-2 space-y-6 text-center md:text-left">
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-[-0.02em] text-on-surface leading-tight text-balance">
                What we are building next
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed text-pretty">
                Agriculture is where we think our machine learning work matters
                most. We are early: these are research directions we are
                actively prototyping, not products you can buy yet.
              </p>
              <div className="space-y-4 pt-4 text-left max-w-lg mx-auto md:mx-0">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-primary"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span></div>
                  <div>
                    <p className="font-bold text-on-surface">Predictive harvest timing</p>
                    <p className="text-on-surface-variant text-sm">Models that estimate the best picking window from climate data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-primary"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span></div>
                  <div>
                    <p className="font-bold text-on-surface">Closed-loop nutrient tracking</p>
                    <p className="text-on-surface-variant text-sm">Automated systems that recycle nutrients rather than discard them.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The one fully drenched block on the page: primary carries the whole
          surface rather than appearing as a 10% tint. */}
      <section className="on-dark py-24 md:py-36 bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl">
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-balance">
              We are hiring engineers and researchers.
            </h2>
            <p className="mt-6 text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty">
              Small team, real ownership, and work you are allowed to explain in
              public. Open roles are listed as they come up.
            </p>
            <Link to="/careers" className="inline-block mt-10">
              <button className="bg-white text-primary px-9 py-4 rounded-lg font-bold text-lg hover:bg-primary-fixed transition-colors active:scale-95">
                See open roles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
