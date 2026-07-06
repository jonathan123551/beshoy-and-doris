import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(Math.round(obj.val));
          if (lineRef.current) {
            lineRef.current.style.width = obj.val + '%';
          }
        },
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: 'power3.inOut',
            delay: 0.4,
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });
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
        background: '#0B0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 300,
          letterSpacing: '0.3em',
          color: '#9A9185',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(progress).padStart(2, '0')}
      </span>
      <div
        style={{
          width: '120px',
          height: '1px',
          background: 'rgba(199, 166, 106, 0.15)',
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
            background: '#C7A66A',
          }}
        />
      </div>
    </div>
  );
}
