import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, ProductIcon } from './StudioUI';

const options = [
  { title: 'A better website', category: 'Web presence', icon: 'language', description: 'A clear home for your business, your work, and your next customer.', detail: 'Websites / Portfolios' },
  { title: 'Smarter operations', category: 'Business systems', icon: 'point_of_sale', description: 'Software shaped around the way your team sells, teaches, and works.', detail: 'LMS / POS / Custom systems' },
  { title: 'An AI-powered product', category: 'Applied AI', icon: 'neurology', description: 'Turn a useful idea and the right data into practical product features.', detail: 'Applied AI / Automation' },
];

export default function ProjectStarter() {
  const [selected, setSelected] = useState(0);
  const option = options[selected];
  return <aside className="project-starter" aria-labelledby="starter-heading">
    <h2 id="starter-heading">What are we building?</h2>
    <div className="starter-choices" role="group" aria-label="Choose your project direction">
      {options.map((item, index) => <button key={item.category} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.title}<span aria-hidden="true">{index === selected ? '−' : '+'}</span></button>)}
    </div>
    <div className="starter-answer" aria-live="polite">
      <ProductIcon name={option.icon} />
      <p>{option.description}</p>
      <span>{option.detail}</span>
    </div>
    <Link className="starter-link" to={`/packages?category=${encodeURIComponent(option.category)}`}>Explore this direction <Arrow /></Link>
  </aside>;
}
