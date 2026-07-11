import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CelebrationTransition() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const line1 = sectionRef.current.querySelector('.ct-1');
      const line2 = sectionRef.current.querySelector('.ct-2');
      const inner = sectionRef.current.querySelector('.ct-inner');
      const warmFlash = sectionRef.current.querySelector('.ct-flash');

      const mm = gsap.matchMedia();

      mm.add({
        isMobile: '(max-width: 768px)',
        isDesktop: '(min-width: 769px)',
      }, (context) => {
        const { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: inner,
          },
        });

        // "And then…" appears immediately
        tl.fromTo(line1,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0 },
          0.02
        );

        // "we celebrate." enters
        tl.fromTo(line2,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0 },
          isMobile ? 0.15 : 0.2
        );

        // "And then…" fades
        tl.to(line1, { opacity: 0, y: -8 }, isMobile ? 0.3 : 0.35);

        // "we celebrate." scales up massively
        tl.to(line2, {
          scale: isMobile ? 25 : 18,
          color: '#F2ECE2',
          ease: 'power2.in',
        }, isMobile ? 0.35 : 0.45);

        // Warm flash as text fills viewport
        tl.fromTo(warmFlash,
          { opacity: 0 },
          { opacity: 0.12, ease: 'power2.in' },
          0.7
        );
        tl.to(warmFlash, { opacity: 0 }, 0.9);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '130svh',
        background: '#0A0908',
        overflow: 'hidden',
      }}
    >
      <div
        className="ct-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <p className="ct-1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '1.1rem',
          color: '#8A8279',
          position: 'absolute',
          opacity: 0,
        }}>
          And then…
        </p>

        <p className="ct-2" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
          color: '#8A8279',
          margin: 0,
          whiteSpace: 'nowrap',
          transformOrigin: 'center center',
          opacity: 0,
        }}>
          we celebrate.
        </p>

        {/* Warm flash overlay */}
        <div className="ct-flash" style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(212, 184, 122, 0.3) 0%, transparent 60%)',
          opacity: 0,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  );
}
