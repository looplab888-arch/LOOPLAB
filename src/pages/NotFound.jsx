import { Link } from 'react-router-dom';
import { Arrow } from '../components/StudioUI';

export default function NotFound() {
  return <section className="not-found wrap">
    <div className="lost-route" aria-hidden="true"><span>404</span><svg viewBox="0 0 500 160" fill="none"><path d="M15 120h90a35 35 0 0 0 35-35V60a35 35 0 0 1 35-35h95a35 35 0 0 1 35 35v40"/><path className="route-dashed" d="M305 100v10a35 35 0 0 0 35 35h140"/><circle cx="15" cy="120" r="6"/><circle cx="305" cy="100" r="9"/></svg></div>
    <div><p className="not-found-code">Page not found · 404</p><h1>A little out<br />of the loop.</h1><p>This address doesn’t lead to a page. It may have moved, or the link may be incomplete.</p><div className="hero-actions"><Link to="/" className="button primary">Back to home <Arrow /></Link><Link to="/projects" className="text-link">Explore our work <Arrow /></Link></div></div>
  </section>;
}
