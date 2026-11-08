(() => {
  const music = new Audio();
  music.preload = 'none';
  music.src = './assets/sitar-and-bansuri.m4a';
  music.loop = true;
  music.volume = 0.3;

  const button = document.createElement('button');
  button.type = 'button';
  button.style.cssText = 'position:fixed;bottom:calc(12px + env(safe-area-inset-bottom));right:12px;z-index:2147483647;padding:6px 12px;min-height:44px;background:#fffaf0;color:#443822;border:1px solid #b29a6d;border-radius:24px;font:14px Georgia,serif;cursor:pointer';
  function updateControl() {
    button.textContent = music.paused ? 'Play music' : 'Mute music';
  }
  function play() {
    music.play().catch(updateControl);
  }
  music.addEventListener('play', updateControl);
  music.addEventListener('pause', updateControl);
  button.addEventListener('click', () => {
    if (music.paused) play();
    else music.pause();
  });
  const coverSelector = '[aria-label="Tap to open the invitation"]';
  const page = document.documentElement;
  const requestFullscreen = page.requestFullscreen || page.webkitRequestFullscreen;
  function enterFullscreen() {
    if (!requestFullscreen || document.fullscreenElement || document.webkitFullscreenElement) return;
    Promise.resolve(requestFullscreen.call(page)).catch(() => {});
  }

  let openTimer;
  function scheduleOpening() {
    const cover = document.querySelector(coverSelector);
    if (!cover) return;
    observer.disconnect();
    openTimer = setTimeout(() => {
      if (cover.isConnected) cover.click();
    }, 4000);
  }
  const observer = new MutationObserver(scheduleOpening);
  observer.observe(document.getElementById('root'), { childList: true, subtree: true });
  scheduleOpening();
  play();

  document.addEventListener('click', event => {
    if (button.isConnected || !event.target.closest(coverSelector)) return;
    clearTimeout(openTimer);
    updateControl();
    document.body.append(button);
    if (music.paused) play();
    if (event.isTrusted) {
      enterFullscreen();
    } else {
      function onGuestTap(tap) {
        if (!tap.isTrusted) return;
        document.removeEventListener('click', onGuestTap, true);
        if (music.paused && !button.contains(tap.target)) play();
        enterFullscreen();
      }
      document.addEventListener('click', onGuestTap, true);
    }
  }, true);
})();
