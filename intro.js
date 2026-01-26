document.body.classList.add("intro-active");
const screen = document.getElementById("screen");
const intro = document.getElementById("intro");
const portfolio = document.getElementById("portfolio");
const deskImage = document.querySelector(".desk-image");

const IMAGE_WIDTH = 2732;
const IMAGE_HEIGHT = 2048;
const SCREEN_BOX = {
  x: 970,
  y: 365,
  width: 670,
  height: 351
};

const lamp = document.getElementById("lamp");

const LAMP_BOX = {
  x: 630,
  y: 250,
  width: 230, 
  height: 200
};

let isDark = false;

const lightSrc = "intro-pictures/lightModeOpen.png";
const darkSrc = "intro-pictures/nightMode2.png";

function updateScreenHitbox() {
  const imgRect = deskImage.getBoundingClientRect();

  const scaleX = imgRect.width / IMAGE_WIDTH;
  const scaleY = imgRect.height / IMAGE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = (imgRect.width - IMAGE_WIDTH * scale) / 2;
  const offsetY = (imgRect.height - IMAGE_HEIGHT * scale) / 2;

  screen.style.left = imgRect.left + offsetX + SCREEN_BOX.x * scale + "px";
  screen.style.top = imgRect.top + offsetY + SCREEN_BOX.y * scale + "px";
  screen.style.width = SCREEN_BOX.width * scale + "px";
  screen.style.height = SCREEN_BOX.height * scale + "px";

  lamp.style.left = imgRect.left + offsetX + LAMP_BOX.x * scale + "px";
  lamp.style.top = imgRect.top + offsetY + LAMP_BOX.y * scale + "px ";
  lamp.style.width = LAMP_BOX.width * scale + "px";
  lamp.style.height = LAMP_BOX.height * scale + "px";
}
lamp.addEventListener("click", () => {
  isDark = !isDark;
  deskImage.src = isDark ? darkSrc : lightSrc;
  document.body.classList.toggle("dark", isDark);
});

deskImage.addEventListener("load", updateScreenHitbox);
window.addEventListener("resize", updateScreenHitbox);
updateScreenHitbox();

screen.addEventListener("click", () => {
  const introRect = intro.getBoundingClientRect();
  const imgRect = deskImage.getBoundingClientRect();

  const scaleX = imgRect.width / IMAGE_WIDTH;
  const scaleY = imgRect.height / IMAGE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = (imgRect.width - IMAGE_WIDTH * scale) / 2;
  const offsetY = (imgRect.height - IMAGE_HEIGHT * scale) / 2;

  const hitboxCenterX = imgRect.left - introRect.left + offsetX + SCREEN_BOX.x * scale + (SCREEN_BOX.width * scale) / 2;
  const hitboxCenterY = imgRect.top - introRect.top + offsetY + SCREEN_BOX.y * scale + (SCREEN_BOX.height * scale) / 2;

  intro.style.transformOrigin = `${hitboxCenterX}px ${hitboxCenterY}px`;

  const scaleXFull = window.innerWidth / (SCREEN_BOX.width * scale);
  const scaleYFull = window.innerHeight / (SCREEN_BOX.height * scale);
  const finalScale = Math.min(scaleXFull, scaleYFull);

  intro.classList.add("zooming");
  intro.style.transform = `scale(${finalScale})`;

  screen.style.pointerEvents = "none";

  requestAnimationFrame(() => {
    portfolio.classList.add("visible");
  });

  setTimeout(() => {
    intro.style.display = "none";
    document.body.style.overflow = "";
    document.body.classList.remove("intro-active");
  }, 1200);
});

function playHandwrite(word = "Portfolio", durationMs = 2200) {
  const textEl = document.getElementById("handwriteText");
  if (!textEl) return;

  textEl.textContent = word;

  textEl.classList.remove("play");
  void textEl.offsetWidth; 
  textEl.classList.add("play");

  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

playHandwrite("Portfolio");