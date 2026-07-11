import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OpeningScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.os-word');
      const line = sectionRef.current.querySelector('.os-line');

      // Auto-play entrance (no scroll needed for initial reveal)
      gsap.fromTo(words,
        { opacity: 0, y: 15, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.4, // Wait for envelope to finish scaling
        }
      );

      // Fade out on scroll
      gsap.to(words, {
        opacity: 0,
        y: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 50%',
          scrub: true,
        },
      });

      // Line grows down
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = 'Some moments are meant to be witnessed.';

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100svh', // Highly compressed
        background: 'transparent', // Let the global #FCF8F5 / #F7F1EA show through
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
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
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '600px',
        }}>
          {text.split(' ').map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                overflow: 'hidden',
                paddingBottom: '0.2em',
              }}
            >
              <span
                className="os-word"
                style={{
                  display: 'inline-block',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  color: '#6A5148',
                  letterSpacing: '0.05em',
                  opacity: 0,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Decorative line */}
        <div
          className="os-line"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            width: '1px',
            height: '20vh',
            background: 'linear-gradient(180deg, rgba(214, 181, 122, 0.6), transparent)',
            transformOrigin: 'top center',
            transform: 'scaleY(0)',
          }}
        />
      </div>
    </section>
  );
}
