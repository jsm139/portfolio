const palette = [
  "#1c6fff",
  "#3ea7ff",
  "#45e7ff",
  "#98ff5a",
  "#7b4dff",
  "#ff4fd8",
  "#ffd85a",
  "#ffffff"
];

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function populatePixelField(element, options) {
  if (!element) return;
  const random = seededRandom(options.seed);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < options.count; i += 1) {
    const pixel = document.createElement("span");
    const right = random() > 0.5;
    const edgeDepth = Math.pow(random(), 1.45) * options.edgeWidth;
    const x = right ? 100 - edgeDepth : edgeDepth;
    const y = random() * 124 - 12;
    const size = options.minSize + random() * (options.maxSize - options.minSize);
    const color = palette[Math.floor(random() * palette.length)];
    const opacity = options.minOpacity + random() * (options.maxOpacity - options.minOpacity);

    pixel.className = random() > 0.80 ? "pixel-sprite cluster" : "pixel-sprite";
    pixel.style.left = `${x}%`;
    pixel.style.top = `${y}%`;
    pixel.style.setProperty("--size", `${size.toFixed(1)}px`);
    pixel.style.setProperty("--color", color);
    pixel.style.setProperty("--opacity", opacity.toFixed(2));
    pixel.style.setProperty("--rotation", `${Math.floor(random() * 4) * 90}deg`);
    fragment.appendChild(pixel);
  }

  element.appendChild(fragment);
}

const backLayer = document.querySelector(".pixel-field-back");
const frontLayer = document.querySelector(".pixel-field-front");

populatePixelField(backLayer, {
  seed: 139,
  count: 190,
  edgeWidth: 34,
  minSize: 2,
  maxSize: 5,
  minOpacity: 0.30,
  maxOpacity: 0.80
});

populatePixelField(frontLayer, {
  seed: 2026,
  count: 125,
  edgeWidth: 27,
  minSize: 3,
  maxSize: 7,
  minOpacity: 0.42,
  maxOpacity: 1
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let scrollY = window.scrollY;
let mouseX = 0;
let mouseY = 0;
let currentBackX = 0;
let currentBackY = 0;
let currentFrontX = 0;
let currentFrontY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
}, { passive: true });

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;
}, { passive: true });

function animateBackground() {
  if (!reduceMotion.matches) {
    const backTargetX = mouseX * 16;
    const backTargetY = scrollY * -0.025 + mouseY * 10;
    const frontTargetX = mouseX * 34;
    const frontTargetY = scrollY * -0.065 + mouseY * 22;

    currentBackX += (backTargetX - currentBackX) * 0.045;
    currentBackY += (backTargetY - currentBackY) * 0.045;
    currentFrontX += (frontTargetX - currentFrontX) * 0.065;
    currentFrontY += (frontTargetY - currentFrontY) * 0.065;

    if (backLayer) {
      backLayer.style.transform = `translate3d(${currentBackX}px, ${currentBackY}px, 0)`;
    }
    if (frontLayer) {
      frontLayer.style.transform = `translate3d(${currentFrontX}px, ${currentFrontY}px, 0)`;
    }
  }

  requestAnimationFrame(animateBackground);
}

animateBackground();
