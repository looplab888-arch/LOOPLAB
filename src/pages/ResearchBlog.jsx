import { Link } from 'react-router-dom';

export default function ResearchBlog() {


  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
      
      {/* Generated Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/blog_maintenance_bg_1777801436349.webp" 
          alt="System Maintenance" 
          className="w-full h-full object-cover opacity-40 mix-blend-plus-lighter"
        />
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm"></div>
      </div>

      <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/20 p-12 md:p-24 rounded-3xl max-w-4xl w-full relative overflow-hidden shadow-2xl hover:border-primary/40 transition-all duration-500 z-10">
                
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-24 h-24 bg-surface rounded-full flex items-center justify-center text-primary shadow-inner border border-primary/20 z-10">
              <span className="material-symbols-outlined text-6xl animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1", animationDuration: '4s' }}>settings</span>
            </div>
          </div>
          
          <span className="inline-block py-1 px-3 rounded-full bg-primary-container text-on-primary-container text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            System Update
          </span>
          
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-on-surface tracking-tight drop-shadow-sm">
            Upgrading the <span className="text-primary italic">Lab</span>
          </h1>
          
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm">
            Our research and insights platform is currently undergoing deep architectural maintenance. We're integrating new models and expanding our database. The network will resume operations shortly.
          </p>
          
          <Link to="/">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(97,51,128,0.4)] hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 flex items-center gap-3 mx-auto">
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_back</span>
              Return to Core Network
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
