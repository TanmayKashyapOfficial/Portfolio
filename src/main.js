// ---- Mobile nav toggle ----
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav__links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('is-open'));
});

// ---- Active section highlight ----
const sections = document.querySelectorAll('main > section, .hero');
const navLinks = document.querySelectorAll('.nav__links a');
const setActive = (id) => {
  navLinks.forEach(l => l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '');
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting && e.target.id) setActive(e.target.id); });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => s.id && observer.observe(s));

// ---- Ambient orbit canvas ----
const canvas = document.getElementById('orbit-canvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // A handful of orbiting nodes drifting slowly around loose centers —
  // a quiet nod to the ringed-planet mark in the Quantum Pillar logo.
  const rings = Array.from({ length: 5 }, (_, i) => ({
    cx: (0.15 + Math.random() * 0.7) * w,
    cy: (0.1 + Math.random() * 0.5) * h,
    radius: 60 + Math.random() * 140,
    angle: Math.random() * Math.PI * 2,
    speed: 0.0006 + Math.random() * 0.0006 * (i % 2 === 0 ? 1 : -1),
    hue: i % 2 === 0 ? '46,87,69' : '63,138,109',
    dotR: 1.6 + Math.random() * 1.6,
  }));

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    rings.forEach(r => {
      r.angle += r.speed * 16;
      const x = r.cx + Math.cos(r.angle) * r.radius;
      const y = r.cy + Math.sin(r.angle) * r.radius * 0.55;

      ctx.beginPath();
      ctx.ellipse(r.cx, r.cy, r.radius, r.radius * 0.55, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r.hue},0.12)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r.dotR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r.hue},0.65)`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
