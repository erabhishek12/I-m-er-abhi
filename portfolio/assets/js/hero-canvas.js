/**
 * Three.js particle / constellation field for the hero section.
 * A field of points drifts slowly; nearby points connect with thin lines
 * that brighten near the cursor, and the whole field gently parallaxes
 * with pointer position. Kept intentionally lightweight (no post-processing)
 * for performance, and skipped entirely for reduced-motion users or when
 * Three.js fails to load (site still looks complete without it).
 */
(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof THREE === "undefined") return;

  const isMobile = window.innerWidth < 700;
  const COUNT = isMobile ? 55 : 130;
  const LINK_DIST = isMobile ? 90 : 130;

  let width = canvas.parentElement.offsetWidth;
  let height = canvas.parentElement.offsetHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, width, 0, height, -1000, 1000);
  camera.position.z = 10;

  function accentColor() {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light" ? 0x6b8f00 : 0xd7fb3a;
  }

  // ---------- Points ----------
  const points = [];
  for (let i = 0; i < COUNT; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    });
  }

  const pointGeometry = new THREE.BufferGeometry();
  const pointPositions = new Float32Array(COUNT * 3);
  pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  const pointMaterial = new THREE.PointsMaterial({
    color: accentColor(),
    size: isMobile ? 2.2 : 2.8,
    transparent: true,
    opacity: 0.85,
  });
  const pointCloud = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(pointCloud);

  // ---------- Lines (dynamic, rebuilt each frame from a pooled buffer) ----------
  const MAX_LINES = COUNT * 6;
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(MAX_LINES * 2 * 3);
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: accentColor(),
    transparent: true,
    opacity: 0.18,
  });
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let parallaxX = 0;
  let parallaxY = 0;

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    targetParallaxX = (e.clientX / window.innerWidth - 0.5) * 24;
    targetParallaxY = (e.clientY / window.innerHeight - 0.5) * 24;
  });

  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    renderer.setSize(width, height);
    camera.right = width;
    camera.bottom = height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  function animate() {
    requestAnimationFrame(animate);

    parallaxX += (targetParallaxX - parallaxX) * 0.05;
    parallaxY += (targetParallaxY - parallaxY) * 0.05;
    pointCloud.position.set(parallaxX, parallaxY, 0);
    lineMesh.position.set(parallaxX, parallaxY, 0);

    for (let i = 0; i < COUNT; i++) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      pointPositions[i * 3] = p.x;
      pointPositions[i * 3 + 1] = p.y;
      pointPositions[i * 3 + 2] = 0;
    }
    pointGeometry.attributes.position.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < COUNT && lineIdx < MAX_LINES; i++) {
      for (let j = i + 1; j < COUNT && lineIdx < MAX_LINES; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const base = lineIdx * 6;
          linePositions[base] = points[i].x;
          linePositions[base + 1] = points[i].y;
          linePositions[base + 2] = 0;
          linePositions[base + 3] = points[j].x;
          linePositions[base + 4] = points[j].y;
          linePositions[base + 5] = 0;
          lineIdx++;
        }
      }
    }
    lineGeometry.setDrawRange(0, lineIdx * 2);
    lineGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // React to theme toggles so particle color matches the accent
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        pointMaterial.color.setHex(accentColor());
        lineMaterial.color.setHex(accentColor());
      }, 50);
    });
  });

  animate();
})();
