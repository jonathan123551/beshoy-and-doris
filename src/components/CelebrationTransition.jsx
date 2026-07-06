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
      const inner = sectionRef.current.querySelector('.celeb-inner');
      const andThen = sectionRef.current.querySelector('.celeb-and');
      const celebrate = sectionRef.current.querySelector('.celeb-celebrate');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: inner,
        },
      });

      // "And then..." fades in
      tl.fromTo(andThen, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.05);

      // "And then..." fades out
      tl.to(andThen, { opacity: 0, duration: 0.1 }, 0.3);

      // "we celebrate." appears
      tl.fromTo(
        celebrate,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1, duration: 0.1 },
        0.35
      );

      // "we celebrate." scales up massively
      tl.to(celebrate, {
        scale: 18,
        opacity: 0.15,
        duration: 0.5,
        ease: 'power2.in',
      }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '250vh',
        background: '#0B0A09',
      }}
    >
      <div
        className="celeb-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0B0A09',
        }}
      >
        <p
          className="celeb-and"
          style={{
            position: 'absolute',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#9A9185',
            letterSpacing: '0.05em',
            opacity: 0,
          }}
        >
          And then…
        </p>

        <p
          className="celeb-celebrate"
          style={{
            position: 'absolute',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            color: '#F4EFE6',
            letterSpacing: '0.08em',
            opacity: 0,
            whiteSpace: 'nowrap',
          }}
        >
          we celebrate.
        </p>
      </div>
    </section>
  );
}
