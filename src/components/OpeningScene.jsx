import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function OpeningScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.ow');
      const scrollHint = sectionRef.current.querySelector('.scroll-hint');
      const bgName1 = sectionRef.current.querySelector('.bg-n1');
      const bgName2 = sectionRef.current.querySelector('.bg-n2');
      const warmGlow = sectionRef.current.querySelector('.warm-glow');
      const contentWrap = sectionRef.current.querySelector('.opening-content');

      // ── Phase 1: Auto-play entrance (no scroll needed) ──
      const intro = gsap.timeline({ delay: 0.3 });

      // Warm glow breathes in
      intro.fromTo(warmGlow,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
        0
      );

      // Background names fade in with depth
      intro.fromTo(bgName1,
        { opacity: 0, x: '-5%' },
        { opacity: 1, x: '0%', duration: 1.8, ease: 'power2.out' },
        0.2
      );
      intro.fromTo(bgName2,
        { opacity: 0, x: '5%' },
        { opacity: 1, x: '0%', duration: 1.8, ease: 'power2.out' },
        0.4
      );

      // Words reveal with mask-like stagger
      intro.fromTo(words,
        { opacity: 0, y: 18, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.06, duration: 0.7, ease: 'power3.out' },
        0.6
      );

      // Scroll hint appears
      intro.fromTo(scrollHint,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power1.inOut' },
        '-=0.2'
      );

      // Scroll hint subtle bounce
      intro.to('.hint-line', {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut',
      }, '-=0.5');

      // ── Phase 2: Scroll-driven exit ──
      const mm = gsap.matchMedia();
      mm.add({
        isMobile: '(max-width: 768px)',
        isDesktop: '(min-width: 769px)',
      }, (context) => {
        const { isMobile } = context.conditions;

        // Content exits upward on scroll
        gsap.to(contentWrap, {
          y: isMobile ? '-25vh' : '-40vh',
          opacity: 0,
          filter: 'blur(3px)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isMobile ? '70% top' : '80% top',
            scrub: true,
          },
        });

        // Background names drift apart with parallax
        gsap.to(bgName1, {
          x: isMobile ? '-8%' : '-12%',
          y: '-10%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to(bgName2, {
          x: isMobile ? '8%' : '12%',
          y: '5%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Warm glow fades and scales
        gsap.to(warmGlow, {
          opacity: 0,
          scale: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '20% top',
            end: '80% top',
            scrub: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sentence = 'Some moments are meant to be witnessed.';
  const words = sentence.split(' ');

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '120svh',
        background: '#161210',
        overflow: 'hidden',
      }}
    >
      {/* Warm ambient glow */}
      <div
        className="warm-glow"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: '500px',
          maxHeight: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 181, 122, 0.07) 0%, rgba(214, 181, 122, 0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />

      {/* Background editorial names */}
      <span
        className="bg-n1"
        style={{
          position: 'absolute',
          top: '18%',
          left: '-3%',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(5rem, 22vw, 14rem)',
          color: 'rgba(242, 236, 226, 0.025)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0,
        }}
      >
        {eventConfig.groomName}
      </span>
      <span
        className="bg-n2"
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '-3%',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(5rem, 22vw, 14rem)',
          color: 'rgba(242, 236, 226, 0.025)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0,
        }}
      >
        {eventConfig.brideName}
      </span>

      {/* Sticky viewport content */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
      >
        <div className="opening-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.3rem, 4.5vw, 2rem)',
              color: '#F2ECE2',
              letterSpacing: '0.04em',
              textAlign: 'center',
              lineHeight: 1.7,
              maxWidth: '420px',
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="ow"
                style={{
                  display: 'inline-block',
                  marginRight: '0.3em',
                  opacity: 0,
                }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Scroll hint */}
          <div
            className="scroll-hint"
            style={{
              marginTop: '6vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0,
            }}
          >
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              color: '#8F857B',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}>
              Scroll
            </span>
            <div style={{ width: '1px', height: '32px', background: 'rgba(138, 130, 121, 0.15)', position: 'relative', overflow: 'hidden' }}>
              <div className="hint-line" style={{ width: '100%', height: '40%', background: 'rgba(214, 181, 122, 0.5)', position: 'absolute', top: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
