import { useRef, useEffect } from 'react';

const COLORS = ['#7A4B9A', '#A05FB5', '#4A90E2', '#8c60ba'];
const BURST_COLORS = ['#A05FB5', '#7A4B9A', '#4A90E2'];

// Screen area per particle, and a hard ceiling. The previous value of 4000 put
// ~520 particles on a 1080p hero, each drawn with ctx.shadowBlur.
const AREA_PER_PARTICLE = 14000;
const MAX_PARTICLES = 140;

// Each particle used to be an arc() with shadowBlur set, which is one of the
// most expensive canvas 2D operations there is. Instead every colour is
// rendered once into a small offscreen canvas and then blitted with drawImage.
const SPRITE_SIZE = 24;
const SPRITE_CORE = 4;
const spriteCache = new Map();

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function spriteFor(color) {
  let sprite = spriteCache.get(color);
  if (sprite) return sprite;

  sprite = document.createElement('canvas');
  sprite.width = sprite.height = SPRITE_SIZE;
  const g = sprite.getContext('2d');
  const c = SPRITE_SIZE / 2;
  const gradient = g.createRadialGradient(c, c, 0, c, c, c);
  gradient.addColorStop(0, hexToRgba(color, 1));
  gradient.addColorStop(SPRITE_CORE / SPRITE_SIZE, hexToRgba(color, 0.85));
  gradient.addColorStop(1, hexToRgba(color, 0));
  g.fillStyle = gradient;
  g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

  spriteCache.set(color, sprite);
  return sprite;
}

class Particle {
  constructor(x, y, dx, dy, radius, color, isBurst = false) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.isBurst = isBurst;
    this.life = isBurst ? 100 : Infinity;
    this.friction = 0.94;
  }

  draw(ctx) {
    const sprite = spriteFor(this.color);
    const size = this.radius * (SPRITE_SIZE / SPRITE_CORE);
    ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
  }

  update(ctx, width, height, mouse) {
    if (this.isBurst) {
      this.dx *= this.friction;
      this.dy *= this.friction;
      this.x += this.dx;
      this.y += this.dy;
      this.life--;
      this.radius = Math.max(0, this.radius - 0.05);
      this.draw(ctx);
      return;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Screen wrapping
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    else if (this.y < 0) this.y = height;

    // Anti-gravity repulsion from the cursor
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.hypot(dx, dy);

      if (distance < mouse.radius && distance > 0) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * 5;
        this.y -= (dy / distance) * force * 5;
      }
    }

    this.draw(ctx);
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let particles = [];
    let running = false;

    // Users who ask for reduced motion get a single static frame instead of the
    // drift, the cursor repulsion, and the click bursts.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 2;
        particles.push(new Particle(
          x,
          y,
          Math.cos(angle) * velocity,
          Math.sin(angle) * velocity,
          Math.random() * 3 + 1,
          BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
          true
        ));
      }
      start();
    };

    const init = () => {
      particles = [];
      const count = Math.min(
        MAX_PARTICLES,
        Math.floor((canvas.width * canvas.height) / AREA_PER_PARTICLE)
      );
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          Math.random() * 2 + 0.5,
          COLORS[Math.floor(Math.random() * COLORS.length)]
        ));
      }
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.draw(ctx));
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(ctx, canvas.width, canvas.height, mouse);
        if (p.isBurst && p.life <= 0) particles.splice(i, 1);
      }
      animationFrameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      animationFrameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      init();
      if (prefersReducedMotion) drawStaticFrame();
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('click', handleClick);
    }
    window.addEventListener('resize', resize);

    // Stop burning frames once the hero scrolls away, or the tab goes to the
    // background. Previously the loop ran for the whole session.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    // Wait for DOM layout to complete before setting size
    const timer = setTimeout(() => {
      resize();
      if (!prefersReducedMotion) start();
    }, 0);

    return () => {
      clearTimeout(timer);
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
