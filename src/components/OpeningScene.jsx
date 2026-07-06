import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      const line = sectionRef.current.querySelector('.opening-line');

      // Word reveal
      gsap.set(wordEls, { opacity: 0, y: 20 });
      gsap.to(wordEls, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
      });

      // Word fade out
      gsap.to(wordEls, {
        opacity: 0,
        y: -15,
        stagger: 0.03,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '45% top',
          end: '65% top',
          scrub: true,
        },
      });

      // Vertical line grows
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '50% top',
            end: '90% top',
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
        height: '200vh',
        background: '#0B0A09',
        overflow: 'hidden',
      }}
    >
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
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#F4EFE6',
            letterSpacing: '0.05em',
            textAlign: 'center',
            lineHeight: 1.8,
            maxWidth: '500px',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="opening-word"
              style={{
                display: 'inline-block',
                marginRight: '0.35em',
              }}
            >
              {word}
            </span>
          ))}
        </p>

        <div
          className="opening-line"
          style={{
            position: 'absolute',
            bottom: '10vh',
            left: '50%',
            transform: 'translateX(-50%) scaleY(0)',
            transformOrigin: 'top',
            width: '1px',
            height: '15vh',
            background: '#C7A66A',
          }}
        />
      </div>
    </section>
  );
}
