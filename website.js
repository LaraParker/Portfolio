(() => {
  const hero = document.querySelector('.hero');
  const root = document.documentElement;

  // Parallax progress (0..1)
  function updateHeroProgress() {
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    const p = total > 0 ? scrolled / total : 0;
    root.style.setProperty('--p', p.toFixed(4));
  }

  // Theme toggle (simple, no dependencies)
  const modeBtn = document.getElementById('modeToggle');
  const modeText = document.getElementById('modeText');

  function setMode(next) {
    const isLight = next === 'light';
    document.body.classList.toggle('light', isLight);
    if (modeText) modeText.textContent = isLight ? 'Dark' : 'Light';
    try { localStorage.setItem('mode', isLight ? 'light' : 'dark'); } catch (_) {}
  }

  // init theme
  let saved = 'dark';
  try { saved = localStorage.getItem('mode') || 'dark'; } catch (_) {}
  setMode(saved);

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light');
      setMode(isLight ? 'dark' : 'light');
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // perf-friendly scroll handler
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateHeroProgress();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateHeroProgress();
})();
