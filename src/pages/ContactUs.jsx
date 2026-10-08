import { useState } from 'react';

// One source of truth for the number: E.164 for links, spaced for reading.
const PHONE_E164 = '+94701857206';
const PHONE_DISPLAY = '+94 70 185 7206';
const WHATSAPP_URL = `https://wa.me/${PHONE_E164.replace('+', '')}`;
const EMAIL = 'looplab888@gmail.com';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Using Formspree ID from .env file
      const formId = import.meta.env.VITE_FORMSPREE_ID;
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Message from ${formData.name}: ${formData.subject}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-16 md:pb-24 px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-12 md:mb-20 text-center md:text-left">
        <h1 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.025em] text-on-surface mb-6 text-balance">Get in touch</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto md:mx-0 text-base sm:text-lg leading-relaxed text-pretty">
          Tell us what you are trying to build. If we are not the right fit we
          will say so, and point you somewhere better.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-4 space-y-4">
          {/* WhatsApp first: it is the fastest route to a reply, and it is the
              one channel people will actually use from a phone. */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl bg-[#25D366] text-[#0b2e18] hover:bg-[#1eb958] transition-colors"
          >
            <WhatsAppIcon className="w-8 h-8 shrink-0" />
            <span className="min-w-0">
              <span className="block font-headline font-bold text-lg leading-tight">Message us on WhatsApp</span>
              <span className="block text-sm font-medium opacity-80">{PHONE_DISPLAY}</span>
            </span>
            <span aria-hidden="true" className="material-symbols-outlined ml-auto shrink-0 group-hover:translate-x-1 transition-transform">arrow_outward</span>
          </a>

          {/* Every detail is a real link rather than text you have to retype. */}
          <ul className="bg-surface-container-low rounded-2xl border border-outline-variant/30 divide-y divide-outline-variant/30 overflow-hidden">
            {[
              { icon: 'call', label: 'Call us', value: PHONE_DISPLAY, href: `tel:${PHONE_E164}` },
              { icon: 'alternate_email', label: 'Email us', value: EMAIL, href: `mailto:${EMAIL}` },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="group flex items-center gap-4 p-5 hover:bg-surface-container transition-colors">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary shrink-0">{item.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-sm text-on-surface-variant">{item.label}</span>
                    <span className="block font-bold text-on-surface break-words">{item.value}</span>
                  </span>
                  <span aria-hidden="true" className="material-symbols-outlined ml-auto shrink-0 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-4 p-5">
              <span aria-hidden="true" className="material-symbols-outlined text-primary shrink-0">location_on</span>
              <span>
                <span className="block text-sm text-on-surface-variant">Office</span>
                <span className="block font-bold text-on-surface leading-relaxed">
                  No. 74/1, Neelammahara,<br />Buthpitiya, Mahara
                </span>
              </span>
            </li>
          </ul>

          <p className="text-sm text-on-surface-variant px-1 text-pretty">
            We reply to everything, usually within one working day.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl border border-outline-variant/10 relative overflow-hidden">
            {status === 'success' ? (
              <div role="status" className="py-8 sm:py-12 flex flex-col items-center text-center space-y-8 ll-fade-zoom-in">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 relative">
                  <div aria-hidden="true" className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                  <span aria-hidden="true" className="material-symbols-outlined text-4xl sm:text-5xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <h2 className="font-headline text-2xl sm:text-4xl font-bold text-on-surface mb-4">Message sent</h2>
                  <p className="text-on-surface-variant text-base sm:text-lg max-w-sm mx-auto text-pretty">
                    Thanks for getting in touch. We read everything and usually
                    reply within one working day.
                  </p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="w-full sm:w-auto bg-surface-container-low text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all shadow-sm border border-primary/20"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Name</label>
                    <input
                      required
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-transparent rounded-xl p-4 focus:border-primary/30 transition-all"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                    <input
                      required
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-transparent rounded-xl p-4 focus:border-primary/30 transition-all"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Subject</label>
                  <input
                    required
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-transparent rounded-xl p-4 focus:border-primary/30 transition-all"
                    placeholder="Inquiry about..."
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Message</label>
                  <textarea
                    required
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-transparent rounded-xl p-4 focus:border-primary/30 resize-none transition-all"
                    placeholder="How can we help you?"
                    rows={5}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div role="alert" className="bg-error-container text-on-error-container p-4 rounded-xl text-sm font-medium flex items-center gap-3 ll-fade-slide-down">
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">error</span>
                    Something went wrong. Please try again, or email us directly at{' '}
                    <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 font-bold">{EMAIL}</a>.
                  </div>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-on-primary py-5 rounded-2xl font-headline font-bold text-lg hover:shadow-2xl hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:pointer-events-none"
                  type="submit"
                >
                  {status === 'submitting' ? (
                    <>
                      <div aria-hidden="true" className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <span aria-hidden="true" className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <section className="mt-16 md:mt-24">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl sm:rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low border border-outline-variant/10">
          <iframe
            title="Map showing the LoopLab office in Mahara, Sri Lanka"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63383.769104953535!2d79.8416537046432!3d6.832234802946894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bbec8dcb3cf%3A0xc4098ad103334b6b!2sLoopLab!5e0!3m2!1sen!2slk!4v1775747899895!5m2!1sen!2slk"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-[8px] sm:border-[12px] border-white/5 rounded-3xl sm:rounded-3xl"></div>
        </div>
      </section>
    </div>
  );
}

