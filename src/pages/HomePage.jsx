import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Reveal } from '../components/StudioUI';
import { projects } from '../projects';
import ScrollArtwork from '../components/ScrollArtwork';
import ProjectStarter from '../components/ProjectStarter';
const stages = [
 ['Understand', 'First, the right questions.', 'We work through your goals, your users, and the problem your product needs to solve. Clear scope starts here.'],
 ['Design', 'Make the idea tangible.', 'We map the experience and shape the interface so you can review how your product will work before development.'],
 ['Build', 'Turn decisions into software.', 'We develop, test, and review the product in focused steps, keeping you close to the work.'],
 ['Launch', 'Ready for the real world.', 'We prepare the release and documentation, then agree on the support your product needs next.'],
];
export default function HomePage() {
 const [stage, setStage] = useState(0);
 return <>
  <section className="studio-hero hero-rebalanced wrap">
   <div className="hero-composition">
    <div className="hero-copy">
     <h1 className="hero-title">Big ideas.<br />Built right.</h1>
     <p>Thoughtful design. Serious engineering.<br />We turn your next big idea into software people love to use.</p>
     <div className="hero-actions"><Link to="/contact" className="button primary">Build with LoopLab <Arrow /></Link><a className="text-link" href="#selected-work">Explore our work <Arrow /></a></div>
    </div>
    <ScrollArtwork />
   </div>
   <ProjectStarter />
  </section>
  <section className="studio-intro wrap"><Reveal><h2>Small studio.<br />Wide perspective.</h2></Reveal><Reveal delay={80}><p>We bring design, software engineering, and applied AI into the same conversation. So your website, app, or business system feels considered at every step.</p><Link to="/about" className="text-link">Meet the people behind it <Arrow /></Link></Reveal></section>
  <section id="selected-work" className="work-section on-dark"><div className="wrap"><div className="section-heading"><Reveal><h2>The work<br /><span>speaks for itself.</span></h2></Reveal><Link to="/projects" className="button outline-light">Explore all projects <Arrow /></Link></div><div className="project-grid">{projects.slice(0,4).map((project,i) => <Reveal key={project.id} delay={i%2*80} className="project-tile"><Link to={`/projects#${project.id}`} className={`project-image ${project.id}`}><img src={project.image} alt={project.title + (project.real ? ' interface' : ' concept artwork')} width="1024" height="1024" loading="lazy" /><span className="image-action"><Arrow /></span></Link><div className="project-meta"><h3><Link to={`/projects#${project.id}`}>{project.title}</Link></h3><span>{project.category}</span></div><p>{project.description}</p><span className="project-caption">{project.real ? project.status : 'Illustrative project artwork'}</span></Reveal>)}</div></div></section>
  <section className="services-section wrap"><Reveal className="section-heading"><h2>Your ambition.<br />Our skill set.</h2><p>One team to connect the dots.<br />Built around what your business needs.</p></Reveal><div className="service-rows">{[['Web & mobile','Websites that earn attention. Applications that make everyday work easier.','React · Flutter · Django'],['Business systems','Bring your operations together with software built around your processes.','LMS · POS · Custom platforms'],['Applied AI','Make your data useful through forecasting, computer vision, and intelligent tools.','Machine learning · NLP · Automation'],['Research & development','Explore difficult questions with structured experiments and clear documentation.','Prototyping · Research · Mentorship']].map(([title,desc,tags],i)=><Reveal key={title} delay={i*50}><Link to="/services" className="service-row"><h3>{title}</h3><div><p>{desc}</p><span>{tags}</span></div><Arrow /></Link></Reveal>)}</div></section>
  <section className="process-section"><div className="wrap process-grid"><div><h2>In the loop.<br />At every step.</h2><p>Good collaboration makes better software. Here’s how an idea moves forward with us.</p><div className="stage-tabs" role="group" aria-label="Explore our process">{stages.map(([name],i)=><button key={name} aria-pressed={stage===i} onClick={()=>setStage(i)}>{name}</button>)}</div></div><div className="stage-content" key={stage} aria-live="polite"><h3>{stages[stage][1]}</h3><p>{stages[stage][2]}</p><span className="stage-loop" aria-hidden="true">∞</span></div></div></section>
  <section className="packages-teaser wrap"><Reveal><h2>Find your<br />starting point.</h2><p>A first website. An online store. A system built around your team. Explore the possibilities, then we’ll shape the scope together.</p><Link className="button primary" to="/packages">Explore packages <Arrow /></Link></Reveal><Reveal className="package-list">{['Websites & portfolios','E-commerce experiences','LMS & business systems','AI-powered products'].map(x=><Link key={x} to="/packages">{x}<Arrow /></Link>)}<p>Monthly and full-project options to discuss.<br />Every quote starts with your requirements.</p></Reveal></section>
 </>;
}




