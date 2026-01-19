const modeBtn = document.getElementById('modeToggle');
const modeText = document.getElementById('modeText');
const heroImg = document.getElementById('heroImg');

function setMode(next) {
  const isLight = next === 'light';
  document.body.classList.toggle('light', isLight);

  if (modeText) {
    modeText.textContent = isLight ? 'Dark' : 'Light';
  }

  if (heroImg) {
    heroImg.src = isLight ? 'pictures/heroLight.png' : 'pictures/hero.png'
  }

  localStorage.setItem('mode', isLight ? 'light' : 'dark');
}


const saved = localStorage.getItem('mode') || 'dark';
setMode(saved);


if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    setMode(isLight ? 'dark' : 'light');
  });
}