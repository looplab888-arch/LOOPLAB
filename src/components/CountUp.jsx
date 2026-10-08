import { useEffect, useRef, useState } from 'react';

// Plain requestAnimationFrame rather than the `motion` library. CountUp renders
// on the homepage, so importing motion here pulled ~120 KB into the critical
// path for what is a single tweened integer. motion is still used by LogoLoop,
// which lives in the lazily loaded Services chunk.
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CountUp({ end, duration = 2, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  // Seeded rather than animated-to, so reduced-motion users see the final
  // number on first paint instead of a flash of zero.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? end : 0));

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frameId = null;
    let startTime = null;

    const step = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      setValue(Math.round(easeOut(progress) * end));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      observer?.disconnect(); // run once, matching the previous behaviour
      frameId = requestAnimationFrame(step);
    };

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => entry.isIntersecting && start())
        : null;

    observer ? observer.observe(node) : start();

    // Failing to observe must not leave a "0" on screen where a real figure
    // belongs. IntersectionObserver depends on the compositor, so it can stay
    // silent in prerenderers, headless renderers and background tabs.
    const safetyTimer = setTimeout(start, 2000);

    return () => {
      clearTimeout(safetyTimer);
      observer?.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  );
}
