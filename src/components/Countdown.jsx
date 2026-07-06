import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/eventConfig';

gsap.registerPlugin(ScrollTrigger);

function getTimeRemaining() {
  const [year, month, day] = eventConfig.date.split('-').map(Number);
  const [hour, minute] = eventConfig.time.split(':').map(Number);
  const target = new Date(year, month - 1, day, hour, minute, 0);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const sectionRef = useRef(null);
  const [remaining, setRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.countdown-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const units = remaining
    ? [
        { value: remaining.days, label: 'Days' },
        { value: remaining.hours, label: 'Hours' },
        { value: remaining.minutes, label: 'Minutes' },
        { value: remaining.seconds, label: 'Seconds' },
      ]
    : [];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '60vh',
        background: '#0B0A09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8vh 1.5rem',
      }}
    >
      {remaining === null ? (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: '#9A9185',
            textAlign: 'center',
          }}
        >
          Today became a memory.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {units.map((unit, i) => (
            <div key={unit.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="countdown-item"
                style={{
                  textAlign: 'center',
                  padding: '0 clamp(0.8rem, 3vw, 2rem)',
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    color: '#F4EFE6',
                    lineHeight: 1,
                    display: 'block',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.55rem',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#9A9185',
                    display: 'block',
                    marginTop: '0.8em',
                  }}
                >
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    height: '3rem',
                    background: '#241F1A',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
