import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function MusicPlayer({ autoStart }) {
  const audioRef = useRef(null);
  const btnRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.loop = true;
  }, []);

  // Auto-start after envelope opens
  useEffect(() => {
    if (!autoStart || hasStarted.current) return;
    hasStarted.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    // Small delay for smooth transition
    const timer = setTimeout(() => {
      audio.play().then(() => {
        setPlaying(true);
        gsap.to(audio, {
          volume: 0.12,
          duration: 2,
          ease: 'power2.in',
        });
      }).catch(() => {});
    }, 800);

    return () => clearTimeout(timer);
  }, [autoStart]);

  // Pulse animation when paused
  useEffect(() => {
    if (!btnRef.current) return;
    const ring = btnRef.current.querySelector('.pulse-ring');
    if (!ring) return;
    const ctx = gsap.context(() => {
      if (!playing) {
        gsap.to(ring, {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power1.out',
        });
      }
    }, btnRef);
    return () => ctx.revert();
  }, [playing]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          audio.pause();
          setPlaying(false);
        },
      });
    } else {
      audio.play().then(() => {
        setPlaying(true);
        gsap.to(audio, {
          volume: 0.12,
          duration: 1.5,
          ease: 'power2.in',
        });
      }).catch(() => {});
    }
  }, [playing]);

  // Entrance animation
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(btnRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    );
  }, [autoStart]);

  return (
    <>
      <audio ref={audioRef} preload="auto" src="/music/theme.mp3" />
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{
          position: 'fixed',
          bottom: 'max(env(safe-area-inset-bottom, 16px), 20px)',
          right: '20px',
          zIndex: 200,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'rgba(22, 18, 16, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(214, 181, 122, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0,
          transition: 'border-color 0.3s ease',
        }}
      >
        {!playing && (
          <span
            className="pulse-ring"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(214, 181, 122, 0.25)',
              pointerEvents: 'none',
            }}
          />
        )}

        {playing ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="#D6B57A" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#D6B57A" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M8 5.14v14.72a1 1 0 001.5.86l11.14-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" fill="#D6B57A" />
          </svg>
        )}
      </button>
    </>
  );
}
