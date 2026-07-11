// Global audio instance - created once, lives outside React lifecycle
let audioInstance = null;
let fadeInterval = null;
let isPlaying = false;
let playFailed = false;

// Subscribers for UI updates
const listeners = new Set();

function notifyListeners() {
  listeners.forEach(cb => cb({ isPlaying, playFailed }));
}

export function initAudio() {
  if (typeof window === 'undefined') return;
  if (!audioInstance) {
    audioInstance = new Audio('/music/theme.mp3');
    audioInstance.loop = true;
    audioInstance.volume = 0; // Start at 0 for fade in

    audioInstance.addEventListener('play', () => {
      isPlaying = true;
      playFailed = false;
      notifyListeners();
      console.log('PLAY SUCCESS');
    });

    audioInstance.addEventListener('pause', () => {
      isPlaying = false;
      notifyListeners();
    });

    audioInstance.addEventListener('error', (e) => {
      console.log('PLAY FAILED (Audio Error)', e);
      playFailed = true;
      isPlaying = false;
      notifyListeners();
    });
  }
}

export function playMusic(fadeIn = true) {
  if (!audioInstance) initAudio();
  
  console.log('CLICK');
  console.log('PLAY CALLED');

  if (fadeIn) {
    audioInstance.volume = 0;
  }

  // Play immediately (synchronously)
  const playPromise = audioInstance.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      // PLAY SUCCESS handled by event listener
      
      if (fadeIn) {
        // Fade in logic
        if (fadeInterval) clearInterval(fadeInterval);
        let vol = 0;
        fadeInterval = setInterval(() => {
          if (vol < 0.15) {
            vol += 0.01;
            if (audioInstance) audioInstance.volume = Math.min(vol, 0.15);
          } else {
            clearInterval(fadeInterval);
          }
        }, 130); // 130ms * 15 = ~2 seconds
      } else {
        if (fadeInterval) clearInterval(fadeInterval);
        audioInstance.volume = 0.15;
      }
    }).catch(error => {
      console.log('PLAY FAILED', error);
      playFailed = true;
      isPlaying = false;
      notifyListeners();
    });
  }
}

export function toggleMusic() {
  if (!audioInstance) return;
  
  if (isPlaying) {
    audioInstance.pause();
  } else {
    playMusic(false); // No fade when toggling manually
  }
}

export function dismissRetry() {
  playFailed = false;
  notifyListeners();
}

export function subscribeToAudio(callback) {
  listeners.add(callback);
  // Initial state
  callback({ isPlaying, playFailed });
  return () => {
    listeners.delete(callback);
  };
}
