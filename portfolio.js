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

const lightSrc = "pictures/lightModeOpen.png";
const darkSrc = "pictures/nightMode2.png";

function updateScreenHitbox() {
  const imgRect = deskImage.getBoundingClientRect();

  // Calculate scale to fit image
  const scaleX = imgRect.width / IMAGE_WIDTH;
  const scaleY = imgRect.height / IMAGE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  // Calculate offsets for object-fit: contain centering
  const offsetX = (imgRect.width - IMAGE_WIDTH * scale) / 2;
  const offsetY = (imgRect.height - IMAGE_HEIGHT * scale) / 2;

  // Set position and size of the green hitbox
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

// Update on load and resize
deskImage.addEventListener("load", updateScreenHitbox);
window.addEventListener("resize", updateScreenHitbox);
updateScreenHitbox();

screen.addEventListener("click", () => {
  const introRect = intro.getBoundingClientRect();
  const imgRect = deskImage.getBoundingClientRect();

  // scale factor for image
  const scaleX = imgRect.width / IMAGE_WIDTH;
  const scaleY = imgRect.height / IMAGE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  // offsets for object-fit: contain centering
  const offsetX = (imgRect.width - IMAGE_WIDTH * scale) / 2;
  const offsetY = (imgRect.height - IMAGE_HEIGHT * scale) / 2;

  // calculate hitbox center relative to .intro
  const hitboxCenterX = imgRect.left - introRect.left + offsetX + SCREEN_BOX.x * scale + (SCREEN_BOX.width * scale) / 2;
  const hitboxCenterY = imgRect.top - introRect.top + offsetY + SCREEN_BOX.y * scale + (SCREEN_BOX.height * scale) / 2;

  // set transform origin at center of hitbox
  intro.style.transformOrigin = `${hitboxCenterX}px ${hitboxCenterY}px`;

  // scale so the hitbox fills the viewport
  const scaleXFull = window.innerWidth / (SCREEN_BOX.width * scale);
  const scaleYFull = window.innerHeight / (SCREEN_BOX.height * scale);
  const finalScale = Math.min(scaleXFull, scaleYFull);

  // apply zoom
  intro.classList.add("zooming");
  intro.style.transform = `scale(${finalScale})`;

  // prevent double clicks while animating
  screen.style.pointerEvents = "none";

  // start fading portfolio in *before* the zoom finishes (no display:none toggling)
  // so it doesn't "pause then smack" onto the screen.
  requestAnimationFrame(() => {
    portfolio.classList.add("visible");
  });

  // after the zoom transition, remove the intro from the layout
  setTimeout(() => {
    intro.style.display = "none";
    document.body.style.overflow = "auto";
  }, 1200);
});

function playHandwrite(word = "Portfolio", durationMs = 2200) {
  const textEl = document.getElementById("handwriteText");
  if (!textEl) return;

  textEl.textContent = word;

  textEl.classList.remove("play");
  void textEl.offsetWidth; // restart animation
  textEl.classList.add("play");

  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);
    // if you later need t for something, use it here
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

playHandwrite("Portfolio");