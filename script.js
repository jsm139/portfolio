const palettes = [
  "#1c6fff",
  "#42aeb8",
  "#45e7ff",
  "#71bd3b",
  "#7b4dff",
  "#c83c83",
  "#dcae50",
  "#29374c"
];

function seededRandom(seed) {
  let value = seed % 2147483647;

  if (value <= 0) {
    value += 2147483646;
  }

  return function random() {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function populatePixelField(element, options) {
  if (!element) {
    return;
  }

  const random = seededRandom(options.seed);
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < options.count; index += 1) {
    const pixel = document.createElement("span");
    const useRightSide = random() > 0.5;
    const edgeDepth = Math.pow(random(), 1.55) * options.edgeWidth;
    const x = useRightSide ? 100 - edgeDepth : edgeDepth;
    const y = random() * 112 - 6;
    const size = options.minSize + random() * (options.maxSize - options.minSize);
    const color = palettes[Math.floor(random() * palettes.length)];
    const opacity = options.minOpacity + random() * (options.maxOpacity - options.minOpacity);
    const rotation = Math.floor(random() * 4) * 90;

    pixel.className = random() > 0.78 ? "pixel-sprite cluster" : "pixel-sprite";
    pixel.style.left = `${x}%`;
    pixel.style.top = `${y}%`;
    pixel.style.setProperty("--size", `${size.toFixed(1)}px`);
    pixel.style.setProperty("--color", color);
    pixel.style.setProperty("--opacity", opacity.toFixed(2));
    pixel.style.setProperty("--rotation", `${rotation}deg`);

    fragment.appendChild(pixel);
  }

  element.appendChild(fragment);
}

const backLayer = document.querySelector(".pixel-field-back");
const frontLayer = document.querySelector(".pixel-field-front");

populatePixelField(backLayer, {
  seed: 139,
  count: 155,
  edgeWidth: 31,
  minSize: 2,
  maxSize: 5,
  minOpacity: 0.28,
  maxOpacity: 0.72
});

populatePixelField(frontLayer, {
  seed: 2026,
  count: 105,
  edgeWidth: 25,
  minSize: 3,
  maxSize: 7,
  minOpacity: 0.38,
  maxOpacity: 0.9
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;

function updatePixelParallax() {
  if (reduceMotion.matches) {
    backLayer.style.transform = "none";
    frontLayer.style.transform = "none";
    ticking = false;
    return;
  }

  const scrollY = window.scrollY;
  backLayer.style.transform = `translate3d(0, ${scrollY * -0.045}px, 0)`;
  frontLayer.style.transform = `translate3d(0, ${scrollY * -0.085}px, 0)`;
  ticking = false;
}

function requestPixelParallax() {
  if (!ticking) {
    window.requestAnimationFrame(updatePixelParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestPixelParallax, { passive: true });
reduceMotion.addEventListener?.("change", updatePixelParallax);
updatePixelParallax();
