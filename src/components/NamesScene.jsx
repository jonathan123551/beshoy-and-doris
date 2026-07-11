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
      const gName = sectionRef.current.querySelector('.ns-groom');
      const bName = sectionRef.current.querySelector('.ns-bride');
      const sub1 = sectionRef.current.querySelector('.ns-sub1');
      const sub2 = sectionRef.current.querySelector('.ns-sub2');
      const inner = sectionRef.current.querySelector('.ns-inner');

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

        // Fast convergence
        tl.fromTo(gName,
          { x: isMobile ? '-40vw' : '-30vw', opacity: 0 },
          { x: '0vw', opacity: 1, ease: 'power1.out' },
          0
        );
        tl.fromTo(bName,
          { x: isMobile ? '40vw' : '30vw', opacity: 0 },
          { x: '0vw', opacity: 1, ease: 'power1.out' },
          0
        );

        // Quick text reveals
        tl.fromTo(sub1,
          { opacity: 0, y: 10, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out' },
          0.3
        );
        tl.fromTo(sub2,
          { opacity: 0, y: 10, filter: 'blur(3px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out' },
          0.55
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '130svh', // Highly compressed pacing
        background: 'transparent',
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}>
          <h2
            className="ns-groom"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.5rem, 15vw, 8.5rem)',
              color: '#4F3E39', // Dark luxury text
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            {eventConfig.groomName}
          </h2>

          <h2
            className="ns-bride"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.5rem, 15vw, 8.5rem)',
              color: '#4F3E39', // Dark luxury text
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              lineHeight: 0.9,
              opacity: 0,
            }}
          >
            {eventConfig.brideName}
          </h2>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}>
          <p className="ns-sub1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#8F7D78',
            opacity: 0,
          }}>
            Two stories.
          </p>
          <p className="ns-sub2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#C79A8B', // Blush accent
            opacity: 0,
          }}>
            One promise.
          </p>
        </div>
      </div>
    </section>
  );
}
