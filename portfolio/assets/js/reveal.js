/**
 * Scroll reveal — IntersectionObserver based (see scroll-reveal.md reference).
 * Elements opt in with `data-reveal` (optionally `data-reveal="left|right|scale|fade"`)
 * and can stagger via `data-delay="120"` (ms).
 */
(function () {
  "use strict";

  let io = null;

  function ensureObserver() {
    if (io || !("IntersectionObserver" in window)) return io;
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute("data-delay");
            if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    return io;
  }

  function scan() {
    const items = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!items.length) return;
    const observer = ensureObserver();
    if (!observer) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    items.forEach((el) => observer.observe(el));
  }

  window.__reInitReveal = scan;

  if (document.readyState !== "loading") scan();
  else document.addEventListener("DOMContentLoaded", scan);
})();
