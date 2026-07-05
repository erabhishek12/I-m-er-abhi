/**
 * Small shared behaviours: preloader, scroll progress bar, back-to-top,
 * current year injection, mailto-based contact form fallback.
 */
(function () {
  "use strict";

  function initPreloader() {
    const pre = document.querySelector("[data-preloader]");
    if (!pre) return;
    const fill = pre.querySelector("[data-preloader-fill]");
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) progress = 100;
      if (fill) fill.style.width = progress + "%";
      if (progress >= 100) clearInterval(interval);
    }, 120);

    window.addEventListener("load", () => {
      setTimeout(() => pre.classList.add("is-hidden"), 350);
    });
    // Safety net in case load event already fired
    setTimeout(() => pre.classList.add("is-hidden"), 2500);
  }

  function initScrollProgress() {
    const bar = document.querySelector("[data-scroll-progress]");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const subject = data.get("subject") || "New message from portfolio";
      const message = data.get("message") || "";

      const status = form.querySelector("[data-form-status]");

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      const mailto = `mailto:abhishekyadav954698@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;

      window.location.href = mailto;
      if (status) {
        status.textContent = "Opening your email client…";
        status.style.color = "var(--success)";
      }
      form.reset();
    });
  }

  function initHeroPhotoTap() {
    // On touch devices :hover doesn't trigger reliably, so tapping the
    // hero portrait toggles the color reveal directly.
    const frame = document.querySelector("[data-hero-photo]");
    if (!frame) return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!isTouch) return;
    frame.addEventListener("click", () => {
      frame.classList.toggle("is-active");
    });
  }

  function init() {
    initPreloader();
    initScrollProgress();
    initBackToTop();
    initYear();
    initContactForm();
    initHeroPhotoTap();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
