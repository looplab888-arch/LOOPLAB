import { memo, useRef } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
const ScrollArtwork = memo(function ScrollArtwork() {
 const ref = useRef(null);
 const reduced = useReducedMotion();
 const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
 const transform = useTransform(scrollYProgress, [0, .45, 1], ['translateY(12px)', 'translateY(0px)', 'translateY(-12px)']);
 return <Motion.figure ref={ref} className="hero-artwork" style={{ transform: reduced ? 'none' : transform }}><img src="/images/loop-sculpture.webp" alt="Sculptural purple and silver loop inspired by LoopLab" width="1200" height="800" fetchPriority="high" /><figcaption>Precision in every cycle.</figcaption></Motion.figure>;
});
export default ScrollArtwork;

