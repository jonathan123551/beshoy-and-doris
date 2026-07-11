import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  'We would be honored to have you with us.',
  'To witness the promise.',
  'And celebrate the beginning.',
];

export default function InvitationMessage() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current.querySelectorAll('.msg-line');
      const divider = sectionRef.current.querySelector('.msg-divider');

      gsap.fromTo(els,
        { opacity: 0, y: 20, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center 55%',
            scrub: true,
          },
        }
      );

      if (divider) {
        gsap.fromTo(divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'center 55%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '70vh',
        background: '#0A0908',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Warm glow */}
      <div style={{
        position: 'absolute',
        width: '50vw',
        height: '50vw',
        maxWidth: '300px',
        maxHeight: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative divider */}
      <div className="msg-divider" style={{
        width: '30px',
        height: '1px',
        background: 'rgba(201, 169, 110, 0.4)',
        marginBottom: '3rem',
        transformOrigin: 'center',
        transform: 'scaleX(0)',
      }} />

      {lines.map((line, i) => (
        <p
          key={i}
          className="msg-line"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
            color: '#F2ECE2',
            textAlign: 'center',
            lineHeight: 1.7,
            marginBottom: '1.2em',
            opacity: 0,
            maxWidth: '420px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {line}
        </p>
      ))}
    </section>
  );
}
