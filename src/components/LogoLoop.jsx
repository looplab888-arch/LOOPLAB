import { motion as Motion } from 'motion/react';

export default function LogoLoop({ items, speed = 30 }) {
  // Double the items to create a seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Gradient Mask for smooth fade at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>

      <Motion.div
        className="flex gap-8 items-center"
        animate={{
          x: [0, -100 * items.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-8 py-5 bg-surface-container-lowest border border-outline-variant/10 shadow-sm rounded-2xl hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default group"
          >
            <img
              loading="lazy"
              src={item.icon}
              alt={item.name}
              className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="text-lg font-bold text-on-surface-variant group-hover:text-primary transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </Motion.div>
    </div>
  );
}
