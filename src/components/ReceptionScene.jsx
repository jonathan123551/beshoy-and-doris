import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function ReceptionScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Floating ambient lights (always animate, very subtle)
      const lights = sectionRef.current.querySelectorAll('.reception-light');
      lights.forEach((light, i) => {
        gsap.to(light, {
          x: `random(-40, 40)`,
          y: `random(-30, 30)`,
          duration: 10 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      if (prefersReduced) return;

      // Text reveals
      const texts = sectionRef.current.querySelectorAll('.reception-text');
      texts.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
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
        minHeight: '100vh',
        background: '#0B0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12vh 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Ambient light orbs */}
      {[
        { top: '15%', left: '20%', size: 350, color: 'rgba(199, 166, 106, 0.04)' },
        { top: '60%', right: '15%', size: 400, color: 'rgba(199, 166, 106, 0.03)' },
        { bottom: '10%', left: '40%', size: 300, color: 'rgba(154, 145, 133, 0.03)' },
      ].map((orb, i) => (
        <div
          key={i}
          className="reception-light"
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p
          className="reception-text"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9A9185',
            marginBottom: '2rem',
            opacity: 0,
          }}
        >
          The Reception
        </p>

        <h2
          className="reception-text"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 7vw, 3.5rem)',
            color: '#F4EFE6',
            lineHeight: 1.1,
            marginBottom: '0.3em',
            opacity: 0,
          }}
        >
          {eventConfig.reception.name}
        </h2>

        <p
          className="reception-text"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.875rem',
            color: '#9A9185',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          {eventConfig.reception.area}
        </p>

        <p
          className="reception-text"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#C7A66A',
            letterSpacing: '0.05em',
            marginBottom: '3.5rem',
            opacity: 0,
          }}
        >
          Dinner. Music. Memories.
        </p>

        <a
          className="reception-text text-cta"
          href={eventConfig.reception.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: 0 }}
        >
          Open Reception Location →
        </a>
      </div>
    </section>
  );
}
