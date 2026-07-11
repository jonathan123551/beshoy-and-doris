import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { eventConfig } from '../config/eventConfig';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const obj = { val: 0 };

      // Progress animation
      tl.to(obj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(obj.val);
          setProgress(v);
          if (lineRef.current) {
            lineRef.current.style.width = v + '%';
          }
        },
      });

      // Exit sequence
      tl.to('.preloader-number', {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2');

      tl.to('.preloader-line-track', {
        opacity: 0,
        scaleX: 1.5,
        duration: 0.5,
        ease: 'power3.in',
      }, '-=0.2');

      tl.to('.preloader-names', {
        opacity: 0,
        y: -15,
        duration: 0.5,
        ease: 'power2.in',
      }, '-=0.3');

      // Flash of warm light
      tl.to('.preloader-flash', {
        opacity: 0.15,
        duration: 0.3,
        ease: 'power2.in',
      });

      tl.to('.preloader-flash', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Slide entire preloader up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#161210',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Warm radial glow */}
      <div style={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        maxWidth: '400px',
        maxHeight: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(214, 181, 122, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Names hint */}
      <div
        className="preloader-names"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
          color: 'rgba(214, 181, 122, 0.4)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        {eventConfig.groomName} & {eventConfig.brideName}
      </div>

      {/* Progress number */}
      <span
        className="preloader-number"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 300,
          letterSpacing: '0.3em',
          color: '#8F857B',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(progress).padStart(2, '0')}
      </span>

      {/* Progress line */}
      <div
        className="preloader-line-track"
        style={{
          width: '100px',
          height: '1px',
          background: 'rgba(214, 181, 122, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, rgba(214, 181, 122, 0.3), #D6B57A)',
          }}
        />
      </div>

      {/* Warm flash overlay */}
      <div
        className="preloader-flash"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(212, 184, 122, 0.3) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
