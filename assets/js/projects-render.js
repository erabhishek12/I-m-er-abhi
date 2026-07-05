/**
 * Renders project cards from the shared PROJECTS data source (see
 * data/projects-data.js). Used on the homepage (featured subset) and the
 * full Projects grid (with category filtering).
 *
 * Mount points set `data-base-path` to "" (site root) or "../" (case-study
 * pages inside /projects/) so links & image paths resolve correctly.
 */
(function () {
  "use strict";

  const IMG_DIR = "assets/images/projects/";

  function cardTemplate(p, basePath) {
    basePath = basePath || "";
    const tags = p.tags
      .slice(0, 3)
      .map((t) => `<span class="chip">${t}</span>`)
      .join("");
    return `
    <article class="project-card hover-lift" data-category="${p.category.join(" ")}" data-reveal="scale">
      <div class="project-media">
        <img src="${basePath}${IMG_DIR}${p.image}" alt="${p.title} — project preview" loading="lazy" width="800" height="600" />
        <div class="project-badge">${p.badge}</div>
        <div class="project-quicklinks">
          <a href="${p.liveUrl}" target="_blank" rel="noopener" aria-label="Live demo of ${p.title}"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
          <button type="button" data-share="native" data-share-title="${p.title} — Abhishek Kumar" data-share-text="${p.tagline}" data-share-url="${basePath}projects/${p.id}.html" aria-label="Share ${p.title}"><i class="fa-solid fa-share-nodes" aria-hidden="true"></i></button>
        </div>
      </div>
      <div class="project-body">
        <div class="project-tags">${tags}</div>
        <h3>${p.title}</h3>
        <p class="project-tagline">${p.tagline}</p>
        <div class="project-footer-row">
          <span class="text-faint mono" style="font-size:var(--fs-micro)">${p.year}</span>
          <a class="view-link" href="${basePath}projects/${p.id}.html">View case study <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </article>`;
  }

  function renderFeatured() {
    const mount = document.querySelector("[data-featured-projects]");
    if (!mount || !window.PROJECTS) return;
    const basePath = mount.getAttribute("data-base-path") || "";
    const count = parseInt(mount.getAttribute("data-count") || "4", 10);
    const list = window.PROJECTS.filter((p) => p.featured).slice(0, count);
    const fallback = window.PROJECTS.slice(0, count);
    const items = list.length ? list : fallback;
    mount.innerHTML = items.map((p) => cardTemplate(p, basePath)).join("");
    if (window.__reInitReveal) window.__reInitReveal();
  }

  function renderGrid() {
    const mount = document.querySelector("[data-projects-grid]");
    if (!mount || !window.PROJECTS) return;
    const basePath = mount.getAttribute("data-base-path") || "";
    const sorted = [...window.PROJECTS].sort((a, b) => a.order - b.order);
    mount.innerHTML = sorted.map((p) => cardTemplate(p, basePath)).join("");

    const filterBtns = document.querySelectorAll("[data-filter]");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        mount.querySelectorAll(".project-card").forEach((card) => {
          const cats = card.getAttribute("data-category").split(" ");
          const show = filter === "all" || cats.includes(filter);
          card.style.display = show ? "" : "none";
        });
      });
    });

    if (window.__reInitReveal) window.__reInitReveal();
    else {
      mount.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    }
  }

  function renderRelated() {
    const mount = document.querySelector("[data-related-projects]");
    if (!mount || !window.PROJECTS) return;
    const currentId = mount.getAttribute("data-current-id");
    const basePath = mount.getAttribute("data-base-path") || "";
    const others = window.PROJECTS.filter((p) => p.id !== currentId).sort(
      () => 0.5 - Math.random()
    );
    const items = others.slice(0, 3);
    mount.innerHTML = items.map((p) => cardTemplate(p, basePath)).join("");
    if (window.__reInitReveal) window.__reInitReveal();
  }

  function init() {
    renderFeatured();
    renderGrid();
    renderRelated();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
