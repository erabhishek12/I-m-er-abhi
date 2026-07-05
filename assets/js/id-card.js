/**
 * Floating 3D ID-card interaction — tilts toward the cursor within a bounded
 * range, layers a moving holographic shine, and adds gentle spring-back
 * on mouse leave. Works alongside the CSS keyframe idle float (idCardFloat);
 * JS only overrides rotation while the pointer is near the card.
 */
(function () {
  "use strict";

  function init() {
    const card = document.getElementById("idCard");
    if (!card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return;

    const inner = card.querySelector(".id-card-inner");
    const shine = card.querySelector(".id-card-shine");
    const stage = card.parentElement;

    let raf = null;
    let targetRX = 0;
    let targetRY = 0;
    let curRX = 0;
    let curRY = 0;

    function loop() {
      curRX += (targetRX - curRX) * 0.12;
      curRY += (targetRY - curRY) * 0.12;
      inner.style.transform = `rotateX(${curRX}deg) rotateY(${curRY}deg)`;
      if (Math.abs(targetRX - curRX) > 0.05 || Math.abs(targetRY - curRY) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    stage.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;
      targetRY = (px - 0.5) * 24; // left/right tilt
      targetRX = (0.5 - py) * 24; // up/down tilt
      card.classList.add("is-active");
      card.style.animationPlayState = "paused";

      if (shine) {
        shine.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    });

    stage.addEventListener("mouseleave", () => {
      targetRX = 0;
      targetRY = 0;
      card.classList.remove("is-active");
      card.style.animationPlayState = "running";
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
