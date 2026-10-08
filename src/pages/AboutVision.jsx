import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';

export default function AboutVision() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 md:px-8 pt-16 md:pt-24 pb-16 lg:pb-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="font-headline text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold tracking-[-0.025em] leading-[1.05] mb-8 text-balance">
              We would rather explain the work than oversell it
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 text-pretty">
              LoopLab is a software studio in Colombo. We build web and mobile
              products, applied machine learning, and research systems, for
              companies and for students working on serious technical projects.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 text-pretty">
              The part we care about most is the handover. You should finish a
              project understanding how it works well enough to explain it to
              someone else, because that is the difference between owning
              software and renting it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/services">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all">
                  Our Services <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img loading="lazy"
                className="w-full h-full object-cover"
                alt="Ethical Technology and Innovation"
                src="/ethical_tech_mission_1777800215876.webp"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 py-12 md:py-16 bg-surface-container-low border-y border-outline-variant/20">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto text-center">
          <div>
            <dd className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
              <CountUp end={50} duration={2} suffix="+" />
            </dd>
            <dt className="text-on-surface-variant font-medium">Clients Served</dt>
          </div>
          <div>
            <dd className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
              <CountUp end={24} duration={2} suffix="/7" />
            </dd>
            <dt className="text-on-surface-variant font-medium">Neural Support</dt>
          </div>
        </dl>
      </section>

      {/* What We Offer */}
      <section className="px-6 md:px-8 py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-balance">What we offer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Custom Web & Mobile Development', icon: 'devices', desc: 'Crafting high-performance, scalable applications tailored to your business needs.' },
              { title: 'AI & Machine Learning Solutions', icon: 'psychology', desc: 'Implementing intelligent systems that automate processes and provide deep insights.' },
              { title: 'Automation & Digital Transformation', icon: 'auto_mode', desc: 'Modernizing legacy workflows with cutting-edge digital ecosystems.' },
              { title: 'Research & Academic Project Development', icon: 'science', desc: 'Bridging the gap between academic research and real-world implementation.' },
              { title: 'Technical Mentorship & Guidance', icon: 'school', desc: 'Empowering individuals with the knowledge to understand and explain their solutions.' },
            ].map((service) => (
              <div key={service.title} className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">{service.icon}</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-on-surface-variant text-base leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 md:px-8 py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-[-0.02em] text-balance">How we work</h2>
              <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
                We follow a structured methodology to ensure every project meets industry standards and ethical requirements.
              </p>
              <div className="space-y-6">
                {[
                  'Requirement Analysis',
                  'Ethical Review',
                  'Solution Design',
                  'Development & Testing',
                  'Delivery with Full Documentation'
                ].map((step, idx) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-on-surface text-lg">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border border-outline-variant/10 shadow-xl">
              <h3 className="font-headline text-xl font-bold mb-6">What you get from us</h3>
              <ul className="space-y-6">
                {[
                  { icon: 'verified', text: 'Original and plagiarism-free work' },
                  { icon: 'settings_suggest', text: 'Industry-standard practices' },
                  { icon: 'description', text: 'Clear documentation and explanation' },
                  { icon: 'lock', text: 'Data privacy and confidentiality' },
                  { icon: 'neurology', text: 'Ethical and responsible AI usage' },
                ].map((item) => (
                  <li key={item.text} className="flex gap-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    <span className="font-medium text-on-surface-variant">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics Callout */}
      <section className="px-6 md:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <span className="material-symbols-outlined text-9xl">gavel</span>
             </div>
             <h3 className="font-headline text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-3">
               <span className="material-symbols-outlined text-primary">warning</span>
               Important Note
             </h3>
             <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-3xl mx-auto italic">
               "LOOPLAB does NOT promote academic dishonesty. We guide and support learning, ensuring clients understand and can explain their solutions."
             </p>
          </div>
        </div>
      </section>

      {/* Corporate Registration */}
      {/*
      <section className="px-6 md:px-8 py-16 md:py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-surface-container-lowest p-6 sm:p-10 lg:p-16 rounded-3xl sm:rounded-3xl shadow-2xl border border-outline-variant/10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative overflow-hidden backdrop-blur-xl hover:border-primary/20 transition-colors duration-500">
            <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-[-0.02em] text-balance">We are a registered company</h2>
              <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-10 mx-auto lg:mx-0 max-w-xl">
                LoopLab (Private) Limited is officially recognized and incorporated as a Private Company with Limited Liability under the Companies Act No. 7 of 2007.
              </p>
              <div className="bg-surface-container/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-inner">
                <ul className="space-y-6">
                  <li className="flex flex-col sm:flex-row justify-between items-center border-b border-outline-variant/10 pb-4 gap-2">
                    <span className="font-medium text-on-surface-variant flex items-center gap-3 text-sm sm:text-base"><span className="material-symbols-outlined text-primary text-[20px]">event_available</span> Incorporated</span>
                    <span className="font-bold text-on-surface text-base sm:text-lg">18 February 2026</span>
                  </li>
                  <li className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="font-medium text-on-surface-variant flex items-center gap-3 text-sm sm:text-base"><span className="material-symbols-outlined text-primary text-[20px]">location_on</span> Jurisdiction</span>
                    <span className="font-bold text-on-surface text-base sm:text-lg">Colombo, Sri Lanka</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex justify-center relative z-10">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 bg-white/40 backdrop-blur-sm p-4 hover:border-primary/30 transition-all duration-500 max-w-[400px]">
                <img loading="lazy" src="/company_certificate.webp" alt="LoopLab Certificate" className="w-full h-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Leadership Section */}
      {/*
      <section className="px-6 md:px-8 py-16 md:py-24 bg-surface-container relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-tertiary-container/30 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-[-0.02em] text-balance">The people behind it</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-pretty">Three founders. You will work with us directly, not through an account manager.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[
              { name: 'Dinusha Madhujith', role: 'Chief Executive Officer & Founder', img: '/founder_dinusha.webp' },
              { name: 'Pawani Nimasha', role: 'Director of Social Impact & Founder', img: '/founder_pawani.webp' },
              { name: 'Viraj Induruwa', role: 'Chief Technology Officer & Founder', img: '/founder_viraj.webp' },
            ].map((person) => (
              <div key={person.name} className="group relative bg-surface-container-lowest p-5 lg:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-outline-variant/20 hover:-translate-y-2 hover:border-primary/40 overflow-hidden">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-8 relative">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-color z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                  <img loading="lazy" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" src={person.img} alt={person.name} />
                </div>
                
                <h4 className="font-headline text-2xl font-bold mb-2 text-on-surface">{person.name}</h4>
                <p className="text-primary font-semibold text-sm tracking-wide uppercase">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Final Quote */}
      <section className="px-6 md:px-8 py-24 text-center bg-surface-container-low border-t border-outline-variant/10">
         <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface leading-tight">
              At LOOPLAB, we build technology that is not only functional - but <span className="text-primary italic">meaningful, ethical, and impactful</span>.
            </h2>
         </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-16 md:py-24 text-center bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Build the Core with Us</h2>
          <p className="text-on-surface-variant text-base sm:text-lg mb-10">
            We're looking for thinkers, dreamers, and relentless problem-solvers. If you want to define the future of technology, your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/careers" className="w-full sm:w-auto">
              <button className="w-full bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">Join Our Team</button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full bg-surface-container text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-high transition-all">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
