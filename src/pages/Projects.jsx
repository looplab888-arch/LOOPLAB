import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.025em] text-on-surface mb-6 leading-[1.05] text-balance">
              Things we have actually shipped
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
              A sales incentive platform in active development, plus the
              healthcare, vision and mobile models we have delivered.
            </p>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-24 px-8 bg-surface">
         <div className="max-w-7xl mx-auto">
            <div className="mb-12">
               <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block">Ongoing Development</span>
               <h2 className="font-headline text-4xl font-bold">Sales Incentive System</h2>
               <p className="text-on-surface-variant text-lg mt-4 max-w-3xl">A comprehensive 9-module incentive calculation logic system meant to optimize operational efficiency and dynamic commissions tracking.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* This is progress data, so it is drawn as progress. It was
                    previously two cards distinguished only by a thick coloured
                    left border, which carried no information. */}
                <div>
                   <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-headline text-2xl font-bold text-on-surface">Module progress</h3>
                      <p className="font-headline text-2xl font-bold text-primary tabular-nums">3<span className="text-on-surface-variant font-medium"> / 9</span></p>
                   </div>

                   <div
                      className="h-2.5 w-full rounded-full bg-surface-container-highest overflow-hidden"
                      role="progressbar"
                      aria-valuenow={3}
                      aria-valuemin={0}
                      aria-valuemax={9}
                      aria-label="Modules completed out of nine"
                   >
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(3 / 9) * 100}%` }} />
                   </div>

                   <dl className="mt-8 space-y-6">
                      <div>
                         <dt className="font-bold text-on-surface mb-2">Live and tested</dt>
                         <dd className="flex gap-2 flex-wrap">
                            {['Sales Incentive', 'Dealer Commission', 'Manager Incentive'].map((m) => (
                               <span key={m} className="bg-primary/10 text-primary px-3 py-1.5 rounded-md text-xs font-bold">{m}</span>
                            ))}
                         </dd>
                      </div>
                      <div>
                         <dt className="font-bold text-on-surface mb-2">In development</dt>
                         <dd className="text-on-surface-variant leading-relaxed">
                            The remaining six modules are in build and test.
                         </dd>
                      </div>
                   </dl>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                    <img loading="lazy" alt="Sales Framework" className="w-full object-cover aspect-square md:aspect-auto" src="/projects_hero_1775744290672.webp" />
                </div>
            </div>
         </div>
      </section>

      {/* Completed Portfolio */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-4xl font-bold mb-12 border-b border-outline-variant/20 pb-6">Completed Projects & AI Models</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Healthcare AI Admin */}
               <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm hover:shadow-md transition-all md:flex gap-8 items-center border border-outline-variant/10">
                  <div className="flex-1 mb-6 md:mb-0">
                     <div className="bg-tertiary/10 w-max px-3 py-1 rounded-full mb-4">
                        <p className="text-tertiary text-xs font-bold tracking-widest uppercase">Healthcare Strategy</p>
                     </div>
                     <h3 className="font-headline text-3xl font-bold mb-4">Hospital AI Admin Panel</h3>
                     <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Integrated an administrative suite backed by predictive forecasting models to optimize hospital resource management and drug pipelines.</p>
                     <p className="text-xs font-bold text-primary mb-3 uppercase tracking-widest">Integrated Models:</p>
                     <ul className="text-sm font-semibold text-on-surface-variant space-y-3 mb-4">
                        <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px] text-success font-bold">done</span> Drug Expiry Prediction</li>
                        <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px] text-success font-bold">done</span> Drug Buying Forecasting</li>
                        <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px] text-success font-bold">done</span> Patient Forecasting</li>
                        <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px] text-success font-bold">done</span> Medical Equipment Buying Models</li>
                     </ul>
                  </div>
                  <div className="w-full md:w-72 h-72 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                     <img loading="lazy" alt="Healthcare Admin Panel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="/projects_completed_1775744418460.webp" />
                  </div>
               </div>

               {/* YOLO Projects */}
               <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all group overflow-hidden flex flex-col">
                  <div className="h-48 w-full overflow-hidden shrink-0">
                     <img loading="lazy" alt="YOLO Systems" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/services_hero_1775744004322.webp" />
                  </div>
                  <div className="p-8 grow flex flex-col">
                     <span className="material-symbols-outlined text-4xl mb-3 text-on-surface">visibility</span>
                     <h3 className="font-headline text-2xl font-bold mb-2">YOLO Vision Systems</h3>
                     <p className="text-on-surface-variant text-sm mb-4">Real-time object detection and alerting nodes.</p>
                     <ul className="space-y-3 mt-auto">
                        <li className="font-bold text-xs bg-surface-container px-3 py-2 rounded-lg text-primary text-center">Patient Monitoring</li>
                        <li className="font-bold text-xs bg-surface-container px-3 py-2 rounded-lg text-primary text-center">Patient Alerting</li>
                     </ul>
                  </div>
               </div>

               {/* Gem App */}
               <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all group overflow-hidden flex flex-col">
                  <div className="h-48 w-full overflow-hidden shrink-0 border-b border-surface-variant">
                     <img loading="lazy" alt="Gem App" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/proj_gemtech_1775745712003.webp" />
                  </div>
                  <div className="p-8 grow flex flex-col">
                     <h3 className="font-headline text-2xl font-bold mb-3 mt-2">GemTech App</h3>
                     <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">A complete Flutter mobile application fueled by AI models to identify and predict structures.</p>
                     <div className="space-y-2 mt-auto text-[11px] font-bold text-secondary text-center">
                        <div className="bg-secondary/10 px-3 py-2 rounded-lg">Gem Cut Type Recommendation</div>
                        <div className="bg-secondary/10 px-3 py-2 rounded-lg">Gem Stone Prediction</div>
                     </div>
                  </div>
               </div>

               {/* Classification AI */}
               <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all group overflow-hidden flex flex-col">
                  <div className="h-48 w-full overflow-hidden shrink-0 border-b border-surface-variant">
                     <img loading="lazy" alt="Cognitive Bots" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/proj_cognitive_1775745549923.webp" />
                  </div>
                  <div className="p-8 grow flex flex-col">
                     <h3 className="font-headline text-2xl font-bold mb-3 mt-2">Cognitive Bots</h3>
                     <p className="text-on-surface-variant text-sm mt-2 leading-relaxed"><b>AI Chatbot</b> designed to securely interact, detect, and classify user stress levels based on NLP inputs.</p>
                  </div>
               </div>

               {/* Image AI */}
               <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all group overflow-hidden flex flex-col">
                  <div className="h-48 w-full overflow-hidden shrink-0 border-b border-surface-variant">
                     <img loading="lazy" alt="Fidelity Engine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/proj_fidelity_1775745441889.webp" />
                  </div>
                  <div className="p-8 grow flex flex-col">
                     <h3 className="font-headline text-2xl font-bold mb-3 mt-2">Fidelity Engine</h3>
                     <p className="text-on-surface-variant text-sm mt-2 leading-relaxed"><b>Real vs Fake Image Detection</b> system utilizing deep convolutional networks to differentiate digital media.</p>
                  </div>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}
