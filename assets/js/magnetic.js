/**
 * Magnetic hover effect for buttons/links with [data-magnetic].
 * Follows cursor within the element bounds using a spring-like lerp,
 * consistent with the magnetic-button.md reference (subtle strength ~0.3,
 * spring stiffness ~300 / damping ~20 approximated via rAF lerp).
 */
(function () {
  "use strict";

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  function attach(el) {
    const strength = parseFloat(el.getAttribute("data-magnetic-strength") || "0.35");
    let targetX = 0,
      targetY = 0,
      curX = 0,
      curY = 0,
      raf = null;

    function loop() {
      curX += (targetX - curX) * 0.2;
      curY += (targetY - curY) * 0.2;
      el.style.transform = `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`;
      if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) * strength;
      targetY = (e.clientY - rect.top - rect.height / 2) * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    el.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  function init() {
    document.querySelectorAll("[data-magnetic]").forEach(attach);
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
