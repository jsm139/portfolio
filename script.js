const layers = document.querySelectorAll('.parallax-layer');
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
window.addEventListener('mousemove', event => {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  targetY = (event.clientY / window.innerHeight - 0.5) * 2;
});
window.addEventListener('deviceorientation', event => {
  if (event.gamma !== null && event.beta !== null) {
    targetX = Math.max(-1, Math.min(1, event.gamma / 35));
    targetY = Math.max(-1, Math.min(1, event.beta / 35));
  }
});
function animateParallax(){
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;
  layers.forEach(layer => {
    const depth = parseFloat(layer.dataset.depth || 0.03);
    layer.style.transform = `translate3d(${currentX * depth * 420}px, ${currentY * depth * 260}px, 0)`;
  });
  requestAnimationFrame(animateParallax);
}
animateParallax();
