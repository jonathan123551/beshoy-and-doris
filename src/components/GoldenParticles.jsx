import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 28;

function createParticleData() {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 15,
      size: 1.5 + Math.random() * 3,
      opacity: 0.08 + Math.random() * 0.18,
      blur: Math.random() > 0.6 ? (1 + Math.random() * 2) : 0,
    });
  }
  return particles;
}

const particleData = createParticleData();

export default function GoldenParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll('.gp');
      els.forEach((el, i) => {
        const p = particleData[i];
        gsap.set(el, { y: '110vh', opacity: 0 });
        gsap.to(el, {
          y: '-10vh',
          opacity: p.opacity,
          duration: p.duration,
          delay: p.delay,
          repeat: -1,
          ease: 'none',
          onRepeat: () => {
            gsap.set(el, { 
              x: (Math.random() - 0.5) * 60,
              y: '110vh',
            });
          },
        });
        // Subtle horizontal drift
        gsap.to(el, {
          x: `+=${(Math.random() - 0.5) * 80}`,
          duration: p.duration * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: p.delay,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {particleData.map((p) => (
        <span
          key={p.id}
          className="gp"
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(212, 184, 122, 0.9) 0%, rgba(201, 169, 110, 0.3) 70%, transparent 100%)`,
            filter: p.blur > 0 ? `blur(${p.blur}px)` : 'none',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}
