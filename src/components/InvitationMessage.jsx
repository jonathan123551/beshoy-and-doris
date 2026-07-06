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
      gsap.fromTo(
        els,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 50%',
            scrub: true,
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
        minHeight: '80vh',
        background: '#0B0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15vh 2rem',
      }}
    >
      {lines.map((line, i) => (
        <p
          key={i}
          className="msg-line"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: '#F4EFE6',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '1.5em',
            opacity: 0,
            maxWidth: '500px',
          }}
        >
          {line}
        </p>
      ))}
    </section>
  );
}
