import { Children, cloneElement } from 'react';
import { NavLink } from 'react-router-dom';

export default function LegalLayout({ title, children }) {
  const sections = Children.toArray(children);
  const topics = sections.map((section, index) => ({
    id: `legal-section-${index + 1}`,
    title: Children.toArray(section.props.children).find(child => child.type === 'h2')?.props.children,
  }));

  return <div className="legal-page">
    <header className="legal-hero">
      <p>LoopLab / Legal</p>
      <h1>Legal notes</h1>
      <span>Last updated: April 2026</span>
    </header>
    <div className="legal-layout wrap">
      <nav className="legal-navigation" aria-label="Legal documents">
        <h2>Your agreements</h2>
        <NavLink to="/terms-of-service">Terms of service</NavLink>
        <h2>Privacy and data</h2>
        <NavLink to="/privacy-policy">Privacy policy</NavLink>
        <p>Have a question?</p>
        <NavLink to="/contact">Contact LoopLab ↗</NavLink>
      </nav>
      <article className="legal-document">
        <p className="legal-breadcrumb">Legal notes <span>/</span> {title}</p>
        <h2 className="legal-title">{title}</h2>
        {sections.map((section, index) => cloneElement(section, { id: topics[index].id }))}
      </article>
      <nav className="legal-toc" aria-label="On this page">
        <h2>On this page</h2>
        {topics.map(topic => <a key={topic.id} href={`#${topic.id}`}>{topic.title}</a>)}
      </nav>
    </div>
  </div>;
}
