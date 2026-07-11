import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

export default function ReceptionScene() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const textEls = sectionRef.current.querySelectorAll('.rec-text');
      const orbs = sectionRef.current.querySelectorAll('.rec-orb');

      // Floating ambient lights (rose/blush) — slow breathing
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: `${(i % 2 === 0 ? 1 : -1) * 20}%`,
          y: `${(i % 2 === 0 ? -1 : 1) * 12}%`,
          duration: 12 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Fast reveal
      gsap.fromTo(textEls,
        { opacity: 0, y: 20, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '80svh', // Highly compressed
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Blush ambient orbs */}
      <div className="rec-orb" style={{
        position: 'absolute', top: '15%', left: '5%',
        width: '55vw', height: '55vw',
        background: 'radial-gradient(circle, rgba(232, 200, 200, 0.2) 0%, transparent 65%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />
      <div className="rec-orb" style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(199, 154, 139, 0.15) 0%, transparent 65%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div className="rec-orb" style={{
        position: 'absolute', top: '50%', left: '40%',
        width: '30vw', height: '30vw',
        background: 'radial-gradient(circle, rgba(214, 181, 122, 0.1) 0%, transparent 70%)',
        filter: 'blur(35px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '500px' }}>
        <div className="rec-text" style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#8F7D78',
          }}>
            The Reception
          </span>
        </div>

        <div className="rec-text" style={{ marginBottom: '1.2rem' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 9vw, 4.5rem)',
            color: '#4F3E39', // Dark luxury text
            lineHeight: 1.05,
          }}>
            {eventConfig.reception.name}
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.7rem',
            color: '#8F7D78',
            marginTop: '0.5em',
            letterSpacing: '0.1em',
          }}>
            {eventConfig.reception.area}
          </p>
        </div>

        <div className="rec-text" style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
            color: '#C79A8B', // Blush accent
          }}>
            Dinner. Music. Memories.
          </p>
        </div>

        <div className="rec-text">
          <a
            href={eventConfig.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6A5148',
              }}>
                Open Reception Location
              </span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6A5148" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <span dir="rtl" lang="ar" style={{
              fontFamily: "'Amiri', serif",
              fontSize: '0.75rem',
              color: '#8F7D78',
              marginTop: '0.25em',
            }}>
              الموقع على الخريطة
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
