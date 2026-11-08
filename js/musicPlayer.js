/**
 * Background music player for the supplied Deepawali track.
 */

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const button = document.getElementById('background-music-toggle');
  if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLButtonElement)) {
    console.error('Background music player markup is missing or invalid.');
    return;
  }

  audio.volume = 0.6;

  const updateButton = () => {
    const playing = !audio.paused;
    button.classList.toggle('playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    button.innerHTML = '<span class="music-wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span>';
  };

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('error', () => {
    button.disabled = true;
    button.setAttribute('aria-label', 'Background music unavailable');
    console.error('Unable to load the Deepawali background music file.');
  });

  const pauseWhenLeavingPage = () => {
    if (!audio.paused) audio.pause();
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseWhenLeavingPage();
    } else {
      startMusic();
    }
  });
  window.addEventListener('pagehide', pauseWhenLeavingPage);

  let interactionListenerAdded = false;
  const startOnInteraction = event => {
    if (button.contains(event.target)) return;
    startMusic();
  };
  const startMusic = async () => {
    try {
      await audio.play();
      ['pointerdown', 'keydown'].forEach(eventName => {
        window.removeEventListener(eventName, startOnInteraction);
      });
      interactionListenerAdded = false;
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        if (!interactionListenerAdded) {
          ['pointerdown', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, startOnInteraction);
          });
          interactionListenerAdded = true;
        }
        return;
      }
      console.error('Unable to play the Deepawali background music.', error);
    }
  };
  window.addEventListener('pageshow', startMusic);

  button.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    await startMusic();
  });

  startMusic();
});
