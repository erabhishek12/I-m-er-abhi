/**
 * Header behaviour: shrink-on-scroll, mobile menu open/close, active link
 * highlighting based on current page.
 */
(function () {
  "use strict";

  function init() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const mobileNav = document.querySelector("[data-mobile-nav]");
    const mobileClose = document.querySelector("[data-mobile-nav-close]");

    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && mobileNav) {
      const open = () => {
        mobileNav.classList.add("is-open");
        document.body.style.overflow = "hidden";
      };
      const close = () => {
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      };
      toggle.addEventListener("click", open);
      mobileClose?.addEventListener("click", close);
      mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    }

    // Active link highlight
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const linkPath = link.getAttribute("href").split("/").pop();
      if (
        linkPath === path ||
        (path === "" && linkPath === "index.html") ||
        (path === "index.html" && linkPath === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
