import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const MusicPlayer = forwardRef(({ autoStart = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  // Expose the play method to the parent (App)
  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          // Fade in slowly over 2 seconds
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 0.15) {
              vol += 0.01;
              audioRef.current.volume = Math.min(vol, 0.15);
            } else {
              clearInterval(fadeInterval);
            }
          }, 100);
        } catch (err) {
          console.log('Audio autoplay blocked or failed:', err);
        }
      }
    }
  }));

  useEffect(() => {
    const audio = new Audio('/audio/wedding-audio.mp3');
    audio.loop = true;
    audio.volume = 0.15; // Set base volume

    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Audio playback failed:', err));
    }
  };

  if (!isLoaded) return null;

  return (
    <button
      onClick={togglePlay}
      style={{
        position: 'fixed',
        bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))',
        right: '2rem',
        zIndex: 50,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(199, 154, 139, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(106, 81, 72, 0.08)',
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        transform: isPlaying ? 'scale(1)' : 'scale(0.95)',
      }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {/* Animated bars */}
      <div style={{ display: 'flex', gap: '3px', height: '14px', alignItems: 'flex-end' }}>
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            style={{
              width: '2px',
              backgroundColor: '#4F3E39', // Dark luxury text color
              borderRadius: '2px',
              height: isPlaying ? '100%' : '3px',
              transition: 'height 0.3s ease',
              animation: isPlaying ? `bounce${bar} 1s infinite alternate ease-in-out` : 'none',
              animationDelay: `${bar * 0.15}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce1 { 0% { height: 4px; } 100% { height: 14px; } }
        @keyframes bounce2 { 0% { height: 8px; } 100% { height: 12px; } }
        @keyframes bounce3 { 0% { height: 3px; } 100% { height: 10px; } }
      `}</style>
    </button>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;
