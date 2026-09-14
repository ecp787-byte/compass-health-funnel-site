import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DrawPath, useMotionSafe, EASE } from '../motion/primitives.jsx';

// The hero's visual anchor: the same 8-facet star/ring mark as the logo
// (CompassMark.jsx), scaled up and brought to life - it draws its orbit
// ring, sets waypoint dots around it in sequence, then the needle settles
// from an offset angle into true north. After that it gives a few degrees
// of lean toward the cursor, like a needle finding its bearing. This is the
// one place on the page where the "navigation" concept in Compass Health's
// name is actually shown, not just implied by the wordmark.
const NAVY = '#0C2C47';
const RING_R = 66;
const WAYPOINTS = [
  { angle: -90, delay: 1.0 }, // N
  { angle: 0, delay: 1.12 }, // E
  { angle: 90, delay: 1.24 }, // S
  { angle: 180, delay: 1.36 }, // W
];

export default function HeroCompass({ className = '' }) {
  const safe = useMotionSafe();
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState(0);

  function handleMove(e) {
    if (!safe) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt(Math.max(-1, Math.min(1, relX)) * 7);
  }
  function handleLeave() {
    setTilt(0);
  }

  return (
    <div
      ref={wrapRef}
      className={`hero-compass ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="hero-compass-svg">
        <defs>
          <radialGradient id="heroTealFacet" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#14607A" />
            <stop offset="100%" stopColor="#8FD3D8" />
          </radialGradient>
        </defs>

        {/* orbit ring, drawn on load */}
        <DrawPath
          d={`M 100 ${100 - RING_R} A ${RING_R} ${RING_R} 0 1 1 99.99 ${100 - RING_R}`}
          fill="none"
          stroke={NAVY}
          strokeOpacity={0.16}
          strokeWidth={1.25}
          delay={0.15}
          duration={1.3}
        />

        {/* bearing ticks - small marks at 30-degree intervals, very quiet */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const inner = RING_R - 5;
          const outer = RING_R + 5;
          const x1 = 100 + inner * Math.cos(angle);
          const y1 = 100 + inner * Math.sin(angle);
          const x2 = 100 + outer * Math.cos(angle);
          const y2 = 100 + outer * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeOpacity={0.08} strokeWidth={1} />
          );
        })}

        {/* waypoint dots, appear in sequence after the ring draws */}
        {WAYPOINTS.map((w, i) => {
          const rad = (w.angle * Math.PI) / 180;
          const cx = 100 + RING_R * Math.cos(rad);
          const cy = 100 + RING_R * Math.sin(rad);
          return safe ? (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={3.2}
              fill="#4fa0ac"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: w.delay, ease: EASE }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ) : (
            <circle key={i} cx={cx} cy={cy} r={3.2} fill="#4fa0ac" />
          );
        })}

        {/* the needle/star - settles from an offset angle, then leans
            gently toward the cursor */}
        <motion.g
          initial={safe ? { rotate: -13, opacity: 0, scale: 0.92 } : false}
          animate={safe ? { rotate: tilt, opacity: 1, scale: 1 } : undefined}
          transition={
            safe
              ? {
                  rotate: { type: 'spring', stiffness: 55, damping: 11, mass: 0.6 },
                  opacity: { duration: 0.6, delay: 0.55, ease: EASE },
                  scale: { duration: 0.6, delay: 0.55, ease: EASE },
                }
              : undefined
          }
          style={{ transformOrigin: '100px 100px' }}
        >
          <g transform="translate(100,100) scale(1.2) translate(-50,-50)">
            <polygon points="50,50 42.22,42.22 50,4" fill={NAVY} />
            <polygon points="50,50 50,4 57.78,42.22" fill="url(#heroTealFacet)" />
            <polygon points="50,50 57.78,42.22 96,50" fill={NAVY} />
            <polygon points="50,50 96,50 57.78,57.78" fill="url(#heroTealFacet)" />
            <polygon points="50,50 57.78,57.78 50,96" fill={NAVY} />
            <polygon points="50,50 50,96 42.22,57.78" fill="url(#heroTealFacet)" />
            <polygon points="50,50 42.22,57.78 4,50" fill="url(#heroTealFacet)" />
            <polygon points="50,50 4,50 42.22,42.22" fill={NAVY} />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
