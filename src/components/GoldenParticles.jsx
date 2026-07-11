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
      duration: 16 + Math.random() * 20, // Slower, more organic
      // Mix of types: petals, dust, bokeh
      isPetal: type < 0.35,
      isBokeh: type >= 0.35 && type < 0.65,
      isDust: type >= 0.65,
      size: type < 0.35 ? (8 + Math.random() * 10) : (type < 0.65 ? (6 + Math.random() * 14) : (2 + Math.random() * 3)),
      opacity: type < 0.35 ? (0.3 + Math.random() * 0.4) : (type < 0.65 ? (0.2 + Math.random() * 0.3) : (0.4 + Math.random() * 0.5)),
      blur: type < 0.65 ? (0.5 + Math.random() * 2) : 0,
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
          x: `+=${(Math.random() - 0.5) * 120}`,
          duration: p.duration * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: p.delay,
        });

        // Rotation for petals
        if (p.isPetal) {
          gsap.to(el, {
            rotation: `+=${180 + Math.random() * 360}`,
            duration: p.duration * 1.2,
            repeat: -1,
            ease: 'none',
            delay: p.delay,
          });
        }

        // Scale pulse for bokeh
        if (p.isBokeh) {
          gsap.to(el, {
            scale: 1.4,
            duration: 4 + Math.random() * 4,
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
        // Petal shape (Blush/Champagne tones)
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
                height: `${p.size * 1.5}px`,
                borderRadius: '50% 0 50% 0',
                background: `linear-gradient(135deg, rgba(232, 200, 200, 0.6), rgba(214, 181, 122, 0.4))`,
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
                border: `1.5px solid rgba(199, 154, 139, 0.25)`,
                filter: `blur(${p.blur}px)`,
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            />
          );
        }

        // Warm light dust
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
              background: `radial-gradient(circle, rgba(214, 181, 122, 0.9) 0%, rgba(232, 200, 200, 0.4) 60%, transparent 100%)`,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
}
