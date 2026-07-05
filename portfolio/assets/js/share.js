/**
 * Social / portfolio sharing utilities.
 *
 * Deliberately avoids window.open() for share links — in sandboxed/embedded
 * contexts (iframes without allow-popups, some in-app browsers) calling
 * window.open can throw or, on some Chromium builds, kill the renderer
 * (RESULT_CODE_KILLED_BAD_MESSAGE). Instead we render a small share sheet
 * with real <a target="_blank" rel="noopener"> links, which navigate safely
 * everywhere, plus a defensive clipboard/native-share fallback.
 */
(function () {
  "use strict";

  function toast(message) {
    try {
      let container = document.querySelector(".toast-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
      }
      const el = document.createElement("div");
      el.className = "toast";
      el.textContent = message;
      container.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    } catch (e) {
      /* no-op — toast is cosmetic only */
    }
  }

  function resolveUrl(url) {
    try {
      return new URL(url, window.location.href).href;
    } catch (e) {
      return url;
    }
  }

  function buildLinks({ url, text }) {
    const encUrl = encodeURIComponent(url);
    const encText = encodeURIComponent(text || "");
    return {
      whatsapp: `https://wa.me/?text=${encText}%20${encUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encText}&url=${encUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      telegram: `https://t.me/share/url?url=${encUrl}&text=${encText}`,
    };
  }

  function getShareData(trigger) {
    const rawUrl = trigger.getAttribute("data-share-url");
    return {
      url: rawUrl ? resolveUrl(rawUrl) : window.location.href,
      title:
        trigger.getAttribute("data-share-title") ||
        document.title ||
        "Abhishek Kumar — Portfolio",
      text:
        trigger.getAttribute("data-share-text") ||
        document.querySelector('meta[name="description"]')?.getAttribute("content") ||
        "",
    };
  }

  async function copyLink(url) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast("Link copied to clipboard");
        return;
      }
      throw new Error("clipboard unavailable");
    } catch (err) {
      // Fallback: temporary input + execCommand, wrapped safely
      try {
        const tmp = document.createElement("input");
        tmp.value = url;
        tmp.style.position = "fixed";
        tmp.style.opacity = "0";
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        tmp.remove();
        toast("Link copied to clipboard");
      } catch (e2) {
        toast("Copy this link: " + url);
      }
    }
  }

  function tryNativeShare(data) {
    // Deliberately disabled: calling the native navigator.share() API can
    // trigger a renderer-level crash (RESULT_CODE_KILLED_BAD_MESSAGE) when
    // this site is embedded inside a sandboxed iframe without the
    // "web-share" Permissions-Policy allowance — which is exactly how this
    // site is often previewed. Our own share sheet below works everywhere
    // (real browsers and embedded previews alike), so we always use it.
    return false;
  }

  // ---------- Custom share sheet (anchor-based, sandbox-safe) ----------
  let sheetEl = null;

  function buildSheet() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("data-share-sheet", "");
    overlay.innerHTML = `
      <div class="modal-box share-sheet-box" role="dialog" aria-modal="true" aria-label="Share this">
        <button type="button" class="modal-close btn-icon-circle" data-sheet-close aria-label="Close">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <h4 style="margin-bottom:1rem;">Share this</h4>
        <div class="share-row" data-sheet-links></div>
        <div class="field" style="margin-top:1.25rem;">
          <label>Link</label>
          <div style="display:flex; gap:8px;">
            <input type="text" readonly data-sheet-url style="flex:1;" />
            <button type="button" class="btn btn-secondary btn-sm" data-sheet-copy>Copy</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest("[data-sheet-close]")) {
        overlay.classList.remove("is-open");
      }
    });
    return overlay;
  }

  function openSheet(data) {
    if (!sheetEl) sheetEl = buildSheet();
    const links = buildLinks(data);
    const linkMeta = [
      ["whatsapp", "fa-brands fa-whatsapp", "WhatsApp"],
      ["twitter", "fa-brands fa-x-twitter", "Twitter"],
      ["linkedin", "fa-brands fa-linkedin-in", "LinkedIn"],
      ["facebook", "fa-brands fa-facebook-f", "Facebook"],
      ["telegram", "fa-brands fa-telegram", "Telegram"],
    ];
    const linksContainer = sheetEl.querySelector("[data-sheet-links]");
    linksContainer.innerHTML = linkMeta
      .map(
        ([key, icon, label]) =>
          `<a class="share-btn-icon ${key}" href="${links[key]}" target="_blank" rel="noopener noreferrer" aria-label="Share on ${label}"><i class="${icon}" aria-hidden="true"></i></a>`
      )
      .join("");
    const urlInput = sheetEl.querySelector("[data-sheet-url]");
    urlInput.value = data.url;
    sheetEl.querySelector("[data-sheet-copy]").onclick = () => copyLink(data.url);
    sheetEl.classList.add("is-open");
  }

  function handleAction(action, data, trigger) {
    if (action === "native") {
      if (!tryNativeShare(data)) openSheet(data);
      return;
    }
    if (action === "copy") {
      copyLink(data.url);
      return;
    }
    // Direct platform buttons (whatsapp/twitter/linkedin/etc.) — if the
    // trigger is already a real <a>, let default navigation happen.
    if (trigger && trigger.tagName === "A" && trigger.getAttribute("href")) {
      return; // native anchor navigation, nothing to do
    }
    // Otherwise (a <button> requested a specific platform) open the sheet
    // pre-filled rather than risk a blocked/crashing programmatic popup.
    openSheet(data);
  }

  function init() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-share]");
      if (!trigger) return;
      const action = trigger.getAttribute("data-share");
      const isRealLink = trigger.tagName === "A" && trigger.getAttribute("href") && trigger.getAttribute("href") !== "#";
      if (isRealLink && action !== "native" && action !== "copy") return; // allow default navigation
      e.preventDefault();
      try {
        handleAction(action, getShareData(trigger), trigger);
      } catch (err) {
        toast("Sharing isn't available right now — link copied instead");
        copyLink(getShareData(trigger).url);
      }
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
