import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PARTICLE_COUNT = 24;

function createParticles() {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const type = Math.random();
    particles.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      duration: 14 + Math.random() * 18,
      // Mix of types: petals, dust, bokeh
      isPetal: type < 0.3,
      isBokeh: type >= 0.3 && type < 0.55,
      isDust: type >= 0.55,
      size: type < 0.3 ? (6 + Math.random() * 8) : (type < 0.55 ? (4 + Math.random() * 10) : (1.5 + Math.random() * 2.5)),
      opacity: type < 0.3 ? (0.04 + Math.random() * 0.06) : (type < 0.55 ? (0.03 + Math.random() * 0.05) : (0.08 + Math.random() * 0.12)),
      blur: type < 0.55 ? (0.5 + Math.random() * 2) : 0,
      rotation: Math.random() * 360,
    });
  }
  return particles;
}

const particleData = createParticles();

export default function AtmosphericParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll('.ap');
      els.forEach((el, i) => {
        const p = particleData[i];
        gsap.set(el, { y: '110vh', opacity: 0, rotation: p.rotation });

        // Rise upward
        gsap.to(el, {
          y: '-10vh',
          opacity: p.opacity,
          duration: p.duration,
          delay: p.delay,
          repeat: -1,
          ease: 'none',
          onRepeat: () => {
            gsap.set(el, { y: '110vh', x: (Math.random() - 0.5) * 40 });
          },
        });

        // Horizontal sway
        gsap.to(el, {
          x: `+=${(Math.random() - 0.5) * 100}`,
          duration: p.duration * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: p.delay,
        });

        // Rotation for petals
        if (p.isPetal) {
          gsap.to(el, {
            rotation: `+=${180 + Math.random() * 360}`,
            duration: p.duration,
            repeat: -1,
            ease: 'none',
            delay: p.delay,
          });
        }

        // Scale pulse for bokeh
        if (p.isBokeh) {
          gsap.to(el, {
            scale: 1.3,
            duration: 3 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: p.delay,
          });
        }
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
      {particleData.map((p) => {
        // Petal shape
        if (p.isPetal) {
          return (
            <span
              key={p.id}
              className="ap"
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                bottom: '-20px',
                width: `${p.size}px`,
                height: `${p.size * 1.4}px`,
                borderRadius: '50% 0 50% 0',
                background: `linear-gradient(135deg, rgba(233, 222, 208, 0.5), rgba(214, 181, 122, 0.3))`,
                filter: `blur(${p.blur}px)`,
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            />
          );
        }

        // Bokeh circle
        if (p.isBokeh) {
          return (
            <span
              key={p.id}
              className="ap"
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                bottom: '-20px',
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                background: 'transparent',
                border: `1px solid rgba(214, 181, 122, 0.15)`,
                filter: `blur(${p.blur}px)`,
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            />
          );
        }

        // Golden dust
        return (
          <span
            key={p.id}
            className="ap"
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(214, 181, 122, 0.8) 0%, rgba(207, 174, 112, 0.2) 70%, transparent 100%)`,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
}
