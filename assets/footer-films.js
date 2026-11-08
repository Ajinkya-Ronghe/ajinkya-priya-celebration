(() => {
  const columns = 12;
  const rows = 7;

  function mount() {
    const clips = [...document.querySelectorAll('footer .scroll-film')];
    if (!clips.length) return;
    observer.disconnect();
    function render() {
      const height = document.documentElement.clientHeight;
      for (const clip of clips) {
        const bounds = clip.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - bounds.top) / height));
        const frame = Math.round(progress * (columns * rows - 1));
        const x = (frame % columns) * 100 / (columns - 1);
        const y = Math.floor(frame / columns) * 100 / (rows - 1);
        clip.style.backgroundPosition = x + '% ' + y + '%';
      }
    }
    window.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', render);
    new ResizeObserver(render).observe(document.body);
    render();
  }
  const observer = new MutationObserver(mount);
  observer.observe(document.getElementById('root'), { childList: true, subtree: true });
  mount();
})();
