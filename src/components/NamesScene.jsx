import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function NamesScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const groom = sectionRef.current.querySelector('.ns-groom');
      const bride = sectionRef.current.querySelector('.ns-bride');
      const ampersand = sectionRef.current.querySelector('.ns-amp');
      const twoStories = sectionRef.current.querySelector('.ns-two');
      const onePromise = sectionRef.current.querySelector('.ns-one');
      const inner = sectionRef.current.querySelector('.ns-inner');
      const glowL = sectionRef.current.querySelector('.ns-glow-l');
      const glowR = sectionRef.current.querySelector('.ns-glow-r');

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
            scrub: 1,
            pin: inner,
          },
        });

        // Names converge — closer start on mobile
        const xDist = isMobile ? '25vw' : '80vw';

        tl.fromTo(groom,
          { x: `-${xDist}`, opacity: 0, filter: 'blur(6px)' },
          { x: '0', opacity: 1, filter: 'blur(0px)', ease: 'none' },
          0
        );
        tl.fromTo(bride,
          { x: xDist, opacity: 0, filter: 'blur(6px)' },
          { x: '0', opacity: 1, filter: 'blur(0px)', ease: 'none' },
          0
        );

        // Ampersand fades in
        tl.fromTo(ampersand,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, ease: 'power2.out' },
          isMobile ? 0.15 : 0.25
        );

        // Warm glows breathe in as names converge
        tl.fromTo(glowL,
          { opacity: 0 },
          { opacity: 1 },
          0.1
        );
        tl.fromTo(glowR,
          { opacity: 0 },
          { opacity: 1 },
          0.15
        );

        // Text reveals
        tl.fromTo(twoStories,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0 },
          isMobile ? 0.3 : 0.4
        );
        tl.fromTo(onePromise,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0 },
          isMobile ? 0.4 : 0.5
        );

        // Everything fades at end to transition
        tl.to([groom, bride, ampersand, twoStories, onePromise, glowL, glowR], {
          opacity: 0,
          y: -15,
          filter: 'blur(2px)',
          stagger: 0.02,
        }, isMobile ? 0.7 : 0.75);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: 'clamp(3.5rem, 16vw, 9rem)',
    color: '#F2ECE2',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    opacity: 0,
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '150svh',
        background: '#0A0908',
      }}
    >
      <div
        className="ns-inner"
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
        {/* Warm depth glows */}
        <div className="ns-glow-l" style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
          filter: 'blur(30px)',
        }} />
        <div className="ns-glow-r" style={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
          filter: 'blur(30px)',
        }} />

        {/* Names + ampersand */}
        <div className="ns-groom" style={{ ...nameStyle, textAlign: 'center' }}>
          {eventConfig.groomName}
        </div>

        <div
          className="ns-amp"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 6vw, 3rem)',
            color: '#C9A96E',
            margin: '0.15em 0',
            fontWeight: 300,
            fontStyle: 'italic',
            opacity: 0,
          }}
        >
          &amp;
        </div>

        <div className="ns-bride" style={{ ...nameStyle, textAlign: 'center' }}>
          {eventConfig.brideName}
        </div>

        {/* Subtext */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <p className="ns-two" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: '#8A8279',
            letterSpacing: '0.05em',
            opacity: 0,
          }}>
            Two stories.
          </p>
          <p className="ns-one" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: '#8A8279',
            letterSpacing: '0.05em',
            marginTop: '0.5em',
            opacity: 0,
          }}>
            One promise.
          </p>
        </div>
      </div>
    </section>
  );
}
