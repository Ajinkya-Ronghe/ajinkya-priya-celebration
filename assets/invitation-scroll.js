(() => {
  const introSelector = 'video[src$="/intro-doors-open.mp4"]';
  const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

  function start(event) {
    if (!event.target.matches?.(introSelector)) return;
    document.removeEventListener('playing', start, true);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const listeners = new AbortController();
    const options = { passive: true, signal: listeners.signal };
    let position = window.scrollY;
    let lastTime;
    let frame;
    function stop() {
      cancelAnimationFrame(frame);
      listeners.abort();
    }
    function advance(time) {
      if (lastTime !== undefined) {
        const elapsed = Math.min(time - lastTime, 80);
        position += 80 * elapsed / 1000;
        window.scrollTo({ top: Math.floor(position), behavior: 'instant' });
        if (window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight - 1) {
          stop();
          return;
        }
      }
      lastTime = time;
      frame = requestAnimationFrame(advance);
    }
    window.addEventListener('wheel', stop, options);
    window.addEventListener('touchmove', stop, options);
    window.addEventListener('keydown', event => {
      if (scrollKeys.includes(event.key)) stop();
    }, options);
    window.addEventListener('pointerdown', event => {
      if (event.clientX >= document.documentElement.clientWidth) stop();
    }, options);
    document.addEventListener('invitation-names-visible', () => {
      position = window.scrollY;
      frame = requestAnimationFrame(advance);
    }, { once: true, signal: listeners.signal });
  }
  document.addEventListener('playing', start, true);
})();
