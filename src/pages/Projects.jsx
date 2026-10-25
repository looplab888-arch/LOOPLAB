import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Arrow, Reveal } from '../components/StudioUI';
import { projects } from '../projects';
export default function Projects() {
 const [filter,setFilter]=useState('All work');
 const { hash } = useLocation();
 useEffect(() => {
   if (!hash) return;
   const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' }));
   return () => cancelAnimationFrame(frame);
 }, [hash]);
 return <><section className="page-intro wrap"><h1>Ideas, made real.</h1><p>Business platforms, mobile products, and applied AI. Explore the problems we’ve been working on.</p></section><section className="wrap portfolio-page"><div className="filter-bar" role="group" aria-label="Filter projects">{['All work','Business systems','Applied AI','Computer vision'].map(x=><button key={x} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="project-grid">{projects.filter(p=>filter==='All work'||p.category===filter).map(p=><Reveal className="portfolio-detail" key={p.id}><article id={p.id}><div className={`project-image ${p.id}`}><img src={p.image} alt={p.title+(p.real?' interface':' concept artwork')} loading="lazy" width="1024" height="1024" /></div><div className="project-meta"><h2>{p.title}</h2><span>{p.status}</span></div><p>{p.description}</p><details><summary>Project overview</summary><p>{p.detail}</p><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><Link className="text-link" to={`/contact?project=${encodeURIComponent(p.title)}`}>Discuss a similar project <Arrow /></Link></details><small>{p.real?'Supplied project screenshot':'Illustrative artwork, not a live product screenshot'}</small></article></Reveal>)}</div></section></>;
}
