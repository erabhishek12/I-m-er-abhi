/**
 * Custom cursor — a genuinely physical cursor system, not a copy of the
 * default pointer with a circle glued to it.
 *
 * - Center dot: tracks the raw pointer 1:1 (mix-blend-mode: difference).
 * - Outer ring: true spring physics (stiffness/damping integrator, per the
 *   spring-physics reference) trailing the pointer with real overshoot.
 * - Morphs into a filled blob over any clickable element, and into a
 *   labelled "VIEW" pill over project cards / images.
 * - Emits a short-lived particle trail on fast movement for extra texture.
 * Disabled entirely on touch/coarse pointers.
 */
(function () {
  "use strict";

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  const label = document.createElement("span");
  label.className = "cursor-label";
  label.textContent = "View";
  ring.appendChild(label);
  // Hide until the pointer actually moves, so headless renders / first paint
  // never show a phantom cursor parked at the viewport center.
  dot.style.opacity = "0";
  ring.style.opacity = "0";
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");
  let hasMoved = false;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastX = mouseX;
  let lastY = mouseY;

  // Spring state for the ring (critically-tuned underdamped spring ~ stiffness 210 / damping 18)
  let ringX = mouseX;
  let ringY = mouseY;
  let velX = 0;
  let velY = 0;
  const stiffness = 210;
  const damping = 18;
  const mass = 1;

  let lastTime = performance.now();

  const particlePool = [];
  const MAX_PARTICLES = 14;

  function spawnParticle(x, y) {
    if (particlePool.length >= MAX_PARTICLES) return;
    const p = document.createElement("div");
    p.className = "cursor-trail";
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const dist = 6 + Math.random() * 10;
    p.style.transform = `translate(${x}px, ${y}px)`;
    particlePool.push({ el: p, x, y, vx: Math.cos(angle) * dist, vy: Math.sin(angle) * dist, life: 1 });
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    if (!hasMoved) {
      hasMoved = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }

    const speed = Math.hypot(mouseX - lastX, mouseY - lastY);
    if (speed > 28) spawnParticle(mouseX, mouseY);
    lastX = mouseX;
    lastY = mouseY;
  });

  function raf(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.032);
    lastTime = now;

    // Explicit spring integrator (F = -k*x - c*v), per spring-physics.md
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    const ax = (stiffness * dx - damping * velX) / mass;
    const ay = (stiffness * dy - damping * velY) / mass;
    velX += ax * dt;
    velY += ay * dt;
    ringX += velX * dt;
    ringY += velY * dt;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    // Update particles
    for (let i = particlePool.length - 1; i >= 0; i--) {
      const p = particlePool[i];
      p.life -= dt * 2.2;
      if (p.life <= 0) {
        p.el.remove();
        particlePool.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      p.el.style.opacity = String(Math.max(p.life, 0));
    }

    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
  const viewSelector = "[data-cursor-view], .project-card, .hero-card, .id-card, .blog-card";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(viewSelector)) {
      ring.classList.add("is-view");
      ring.classList.remove("is-active");
    } else if (e.target.closest(interactiveSelector)) {
      ring.classList.add("is-active");
      ring.classList.remove("is-view");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(viewSelector) || e.target.closest(interactiveSelector)) {
      ring.classList.remove("is-active", "is-view");
    }
  });

  window.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  window.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();
