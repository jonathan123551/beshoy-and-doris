import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChurchEntrance() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const inner = sectionRef.current.querySelector('.entrance-inner');
      const door = sectionRef.current.querySelector('.entrance-door');
      const glow = sectionRef.current.querySelector('.entrance-glow');
      const vignette = sectionRef.current.querySelector('.entrance-vignette');
      const fade = sectionRef.current.querySelector('.entrance-fade');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: inner,
        },
      });

      // Door scales up - walking toward it
      tl.fromTo(
        door,
        { scale: 1, opacity: 1 },
        { scale: 8, opacity: 1, ease: 'power1.in' },
        0
      );

      // Glow intensifies
      tl.fromTo(glow, { opacity: 0.15 }, { opacity: 0.6 }, 0);

      // Vignette darkens
      tl.fromTo(vignette, { opacity: 0.3 }, { opacity: 0.9 }, 0.3);

      // Final fade to black
      tl.fromTo(fade, { opacity: 0 }, { opacity: 1 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '250vh',
        background: '#0B0A09',
      }}
    >
      <div
        className="entrance-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0B0A09',
        }}
      >
        {/* Door opening */}
        <div
          className="entrance-door"
          style={{
            position: 'relative',
            width: '15vw',
            minWidth: '60px',
            height: '35vh',
            background: 'linear-gradient(180deg, rgba(244, 239, 230, 0.06) 0%, rgba(199, 166, 106, 0.04) 100%)',
            borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
            border: '1px solid rgba(199, 166, 106, 0.08)',
            borderBottom: 'none',
            zIndex: 2,
          }}
        >
          {/* Inner glow */}
          <div
            className="entrance-glow"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 60%, rgba(199, 166, 106, 0.15) 0%, transparent 70%)',
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* Vignette overlay */}
        <div
          className="entrance-vignette"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 20%, #0B0A09 80%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Final fade to black */}
        <div
          className="entrance-fade"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0B0A09',
            zIndex: 4,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
      </div>
    </section>
  );
}
