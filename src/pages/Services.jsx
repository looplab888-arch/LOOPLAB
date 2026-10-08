import { Link } from 'react-router-dom';
import LogoLoop from '../components/LogoLoop';

export default function Services() {
  const techStack = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' }
  ];

  const services = [
    {
      title: 'Custom Web & Mobile Development',
      icon: 'devices',
      desc: 'End-to-end development of robust, scalable applications using modern frameworks like React and Flutter.'
    },
    {
      title: 'AI & Machine Learning Solutions',
      icon: 'psychology',
      desc: 'Building intelligent systems, neural networks, and predictive models to drive data-driven decision making.'
    },
    {
      title: 'Automation & Digital Transformation',
      icon: 'auto_mode',
      desc: 'Streamlining business processes through intelligent automation and modernization of digital workflows.'
    },
    {
      title: 'Research & Academic Project Development',
      icon: 'science',
      desc: 'Providing high-quality, original support for technical research and complex academic project implementation.'
    },
    {
      title: 'Technical Mentorship & Guidance',
      icon: 'school',
      desc: 'Expert-led sessions to help you understand, build, and explain complex technological solutions.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.025em] text-on-surface mb-6 leading-[1.05] text-balance">
              Software for real problems, not demos
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed mx-auto lg:mx-0 text-pretty">
              Five things we do well. If your project needs something outside
              this list, tell us anyway and we will point you in the right
              direction.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/contact">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-colors">Start a Project</button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg relative z-10">
              <img loading="lazy" alt="Our Services" className="w-full h-full object-cover" src="/services_hero_1775744004322.webp" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Loop */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 mb-8 text-center lg:text-left">
          <h2 className="font-headline text-3xl font-bold mb-2">Our Technology Stack</h2>
          <p className="text-on-surface-variant">We use industry-leading frameworks and platforms to ensure maximum efficiency.</p>
        </div>
        {/* Desktop View */}
        <div className="hidden md:block">
          <LogoLoop items={techStack} speed={40} />
        </div>

        {/* Mobile View - Bento Grid */}
        <div className="md:hidden px-6 max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-3 auto-rows-[120px]">
            {techStack.map((tech, index) => {
              // Create dynamic bento layout spans
              let spanClass = "col-span-1 row-span-1";
              if (index === 0 || index === 3 || index === 9) {
                spanClass = "col-span-2 row-span-1"; // Wide items
              } else if (index === 4) {
                spanClass = "col-span-1 row-span-2"; // Tall item
              }
              
              return (
                <div key={tech.name} className={`group bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-primary/30 active:border-primary/30 hover:shadow-md transition-all ${spanClass}`}>
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-active:scale-110" />
                  <span className="text-xs font-bold tracking-wide text-on-surface-variant group-hover:text-primary group-active:text-primary transition-colors text-center">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* An indexed list rather than five identical cards with a rounded icon
          tile above each heading. The numbers earn their place here: this is
          the studio's actual list of five practice areas. */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-surface">
         <div className="max-w-5xl mx-auto">
            <ol className="divide-y divide-outline-variant/40 border-y border-outline-variant/40">
              {services.map((service, i) => (
                <li key={service.title} className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_1fr_auto] gap-x-6 gap-y-3 py-8 md:py-10 items-baseline group">
                  <span className="font-headline text-2xl md:text-3xl font-bold text-outline tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3 text-balance">
                      {service.title}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed max-w-2xl text-pretty">{service.desc}</p>
                  </div>
                  <span aria-hidden="true" className="hidden md:block material-symbols-outlined text-3xl text-primary self-center opacity-40 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </span>
                </li>
              ))}
            </ol>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 md:p-16 text-center text-on-primary relative overflow-hidden shadow-2xl shadow-primary/30">
                    <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">Ready to build your next big idea?</h2>
            <p className="text-on-primary-container/80 text-xl mb-12 max-w-2xl mx-auto">Partner with our labs to transform your idea into a high-precision, robust reality.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-on-primary-container transition-colors">Start a Project</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
