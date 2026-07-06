import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

const sentence = 'Some moments are meant to be witnessed.';
const words = sentence.split(' ');

export default function OpeningScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const wordEls = sectionRef.current.querySelectorAll('.opening-word');
      const indicator = sectionRef.current.querySelector('.scroll-indicator');
      const bgWords = sectionRef.current.querySelectorAll('.bg-name');
      const contentWrap = sectionRef.current.querySelector('.content-wrap');

      // 1. Initial fast automated reveal (timeline)
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(wordEls, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power2.out' }
      );
      
      tl.fromTo(indicator,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power1.inOut' },
        "-=0.2"
      );

      // Scroll Indicator small bounce
      gsap.to('.indicator-line', {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });

      // 2. Scroll driven exit
      const mm = gsap.matchMedia();
      
      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        const { isMobile } = context.conditions;
        
        // On mobile, the scene is much shorter so 1 swipe leaves it
        gsap.to(contentWrap, {
          y: isMobile ? '-30vh' : '-50vh',
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: isMobile ? 'bottom top' : 'bottom top',
            scrub: true,
          }
        });

        // Background names move slightly
        gsap.to(bgWords[0], {
          x: isMobile ? '-10%' : '-5%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        gsap.to(bgWords[1], {
          x: isMobile ? '10%' : '5%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'var(--opening-height, 130vh)', // Shorter to leave quickly
        background: '#0B0A09',
        overflow: 'hidden',
      }}
    >
      {/* Background Typography */}
      <span
        className="bg-name"
        style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(6rem, 25vw, 15rem)',
          color: 'rgba(244, 239, 230, 0.03)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {eventConfig.groomName}
      </span>
      <span
        className="bg-name"
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '-5%',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(6rem, 25vw, 15rem)',
          color: 'rgba(244, 239, 230, 0.03)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {eventConfig.brideName}
      </span>

      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
      >
        <div className="content-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              color: '#F4EFE6',
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '500px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="opening-word"
                style={{
                  display: 'inline-block',
                  marginRight: '0.35em',
                  opacity: 0,
                }}
              >
                {word}
              </span>
            ))}
          </p>

          <div 
            className="scroll-indicator" 
            style={{ 
              marginTop: '5vh', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: 0 
            }}
          >
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: '#9A9185',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Scroll to begin
            </span>
            <div style={{ width: '1px', height: '40px', background: 'rgba(154, 145, 133, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div className="indicator-line" style={{ width: '100%', height: '50%', background: '#C7A66A', position: 'absolute', top: 0 }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic styles for height */}
      <style>{`
        @media (max-width: 768px) {
          section {
            --opening-height: 120svh;
          }
        }
      `}</style>
    </section>
  );
}
