/* ================================================================
   THEME SYSTEM
   ================================================================
   TO ADD A NEW THEME: add its name to this array (must match
   the data-theme value in style.css), that's the only change needed.
================================================================ */
const THEMES = [
  { id: "dark-purple", label: "Purple", dotColor: "#a78bfa" },
  { id: "dark-cyan", label: "Cyan", dotColor: "#67e8f9" },
  { id: "light", label: "Light", dotColor: "#6d28d9" },
];

(function () {
  const html = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const labelEl = document.getElementById("theme-label");
  const dotEl = document.getElementById("theme-dot");

  // Load saved theme or default
  const saved = localStorage.getItem("kv-theme") || "dark-purple";
  applyTheme(saved);

  btn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const idx = THEMES.findIndex((t) => t.id === current);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next.id);
    localStorage.setItem("kv-theme", next.id);
  });

  function applyTheme(id) {
    const theme = THEMES.find((t) => t.id === id) || THEMES[0];
    html.setAttribute("data-theme", theme.id);
    if (labelEl) labelEl.textContent = theme.label;
    if (dotEl) dotEl.style.background = theme.dotColor;
  }
})();

/* ================================================================
   main.js — Portfolio Logic
================================================================ */

/* ── STAR CANVAS ─────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, stars;
  const N = 140;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      a: Math.random() * 0.7 + 0.1,
      sp: Math.random() * 0.0025 + 0.001,
      o: Math.random() * Math.PI * 2,
    }));
  }

  let startTime = null;
  function draw(t) {
    if (!startTime) startTime = t;
    const elapsed = (t - startTime) * 0.001; // convert ms to seconds

    ctx.clearRect(0, 0, W, H);

    // subtle grid
    ctx.strokeStyle = "rgba(124,58,237,0.025)";
    ctx.lineWidth = 0.5;
    const G = 64;
    for (let x = 0; x <= W; x += G) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += G) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    stars.forEach((s) => {
      const a = (Math.sin(elapsed * s.sp * 1000 + s.o) * 0.5 + 0.5) * s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,180,255,${a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ── CURSOR GLOW ─────────────────────────────────────────────── */
(function () {
  const glow = document.getElementById("cursor-glow");
  let mx = -999,
    my = -999,
    cx = -999,
    cy = -999;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    glow.style.opacity = "1";
  });
  (function tick() {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    glow.style.left = cx + "px";
    glow.style.top = cy + "px";
    requestAnimationFrame(tick);
  })();
})();

/* ── SCROLL REVEAL ───────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

/* ── NAV: scroll state + active section ─────────────────────── */
(function () {
  const nav = document.getElementById("nav");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);

      let cur = "";
      // Near bottom of page → force last section active (fixes Contact not highlighting)
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;
      if (nearBottom) {
        cur = sections[sections.length - 1].getAttribute("id");
      } else {
        sections.forEach((s) => {
          if (window.scrollY >= s.offsetTop - 110) cur = s.id;
        });
      }
      links.forEach((l) => {
        l.classList.remove("active");
        if (l.getAttribute("href") === "#" + cur) l.classList.add("active");
      });
    },
    { passive: true },
  );
})();

/* ── MOBILE NAV ──────────────────────────────────────────────── */
(function () {
  const burger = document.getElementById("nav-burger");
  const mob = document.getElementById("nav-mobile");
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    mob.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mob.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mob.classList.remove("open");
      document.body.style.overflow = "";
    }),
  );
})();

/* ── SMOOTH SCROLL ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── CATEGORY LABELS ─────────────────────────────────────────── */
const CAT_LABELS = {
  game: "Game",
  xr: "XR (VR/AR)",
  system: "System",
  prototype: "Prototype",
  other: "Other",
};

/* ── PLACEHOLDER THUMB SVG ───────────────────────────────────── */
function thumbIcon(category) {
  const icons = {
    xr: `<svg viewBox="0 0 80 48" fill="none" width="60" class="ph-icon"><rect x="2" y="10" width="76" height="28" rx="14" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="8" stroke="currentColor" stroke-width="2"/><circle cx="56" cy="24" r="8" stroke="currentColor" stroke-width="2"/><path d="M32 24H48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    game: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" class="ph-icon"><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M6 12h4M8 10v4M15 12h.01M17 12h.01"/></svg>`,
    system: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" class="ph-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    prototype: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" class="ph-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    other: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" class="ph-icon"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
  };
  return icons[category] || icons.other;
}

/* ── RENDER PROJECT CARDS ────────────────────────────────────── */
function renderCards(filter) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement("article");
    card.className =
      "project-card reveal" +
      (i % 3 === 1 ? " reveal-d1" : i % 3 === 2 ? " reveal-d2" : "");
    card.dataset.id = p.id;

    const fit = p.thumbnailFit || "cover"; // "cover" | "contain"
    const thumbHtml = p.thumbnail
      ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy" data-fit="${fit}" />`
      : `<div class="project-thumb-placeholder ph-${p.category}">${thumbIcon(p.category)}</div>`;

    card.innerHTML = `
      <div class="project-thumb">${thumbHtml}</div>
      <div class="project-body">
        <div class="project-card-top">
          <span class="project-badge">${p.badge}</span>
          <span class="project-cat-label">${CAT_LABELS[p.category] || p.category}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });

  // Re-observe new cards for reveal animation
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ── FILTER TABS ─────────────────────────────────────────────── */
(function () {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.filter);
    });
  });
  renderCards("all");
})();

/* ── PROJECT MODAL + CAROUSEL ────────────────────────────────── */
function getYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
function getVimeoId(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

/* Build one slide's inner HTML */
function buildSlide(item) {
  if (item.type === "youtube") {
    const id = getYouTubeId(item.url);
    if (!id) return null;
    // data-src: only loaded when slide becomes active
    return `<iframe data-src="https://www.youtube.com/embed/${id}?rel=0" src="" allowfullscreen title="YouTube video"></iframe>`;
  }
  if (item.type === "vimeo") {
    const id = getVimeoId(item.url);
    if (!id) return null;
    return `<iframe data-src="https://player.vimeo.com/video/${id}" src="" allowfullscreen title="Vimeo video"></iframe>`;
  }
  if (item.type === "video") {
    return `<video controls><source src="${item.url}"></video>`;
  }
  if (item.type === "image") {
    // fit: "cover" (default, zooms to fill) | "contain" (letterbox/pillarbox, shows full image)
    const fit = item.fit || "cover";
    return `<img src="${item.url}" alt="Project media" loading="lazy" data-fit="${fit}" />`;
  }
  return null;
}

/* Build thumb icon for video slides */
function thumbForSlide(item, index) {
  if (item.type === "image") {
    return `<div class="carousel-thumb" data-index="${index}"><img src="${item.url}" alt="thumb" loading="lazy"/></div>`;
  }
  // Video icon thumb
  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  return `<div class="carousel-thumb" data-index="${index}"><div class="carousel-thumb-video">${icon}</div></div>`;
}

/* State for carousel */
let carouselIndex = 0;
let carouselTotal = 0;

/* Stop all playing iframes and videos */
function stopAllMedia() {
  // Blank all iframe srcs to stop audio/video immediately
  document.querySelectorAll(".media-slide iframe").forEach((iframe) => {
    iframe.src = "";
  });
  document.querySelectorAll(".media-slide video").forEach((video) => {
    video.pause();
  });
}

function loadActiveSlide(index) {
  const slides = document.querySelectorAll(".media-slide");
  const activeSlide = slides[index];
  if (!activeSlide) return;
  const iframe = activeSlide.querySelector("iframe[data-src]");
  if (iframe && iframe.dataset.src) {
    // Always set src from data-src when slide becomes active
    iframe.src = iframe.dataset.src;
  }
}

function goToSlide(n) {
  const track = document.querySelector(".media-track");
  const dots = document.querySelectorAll(".carousel-dot");
  const thumbs = document.querySelectorAll(".carousel-thumb");
  const counter = document.querySelector(".carousel-counter");
  if (!track) return;

  stopAllMedia();

  carouselIndex = (n + carouselTotal) % carouselTotal;
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;

  dots.forEach((d, i) => d.classList.toggle("active", i === carouselIndex));
  thumbs.forEach((t, i) => t.classList.toggle("active", i === carouselIndex));
  if (counter) counter.textContent = `${carouselIndex + 1} / ${carouselTotal}`;
  loadActiveSlide(carouselIndex);
}

function buildCarousel(media) {
  if (!media || media.length === 0) {
    return `<div class="modal-no-media">No media added yet</div>`;
  }

  // Build slides
  const validMedia = media
    .map((m) => ({ ...m, html: buildSlide(m) }))
    .filter((m) => m.html);
  if (validMedia.length === 0) {
    return `<div class="modal-no-media">No media added yet</div>`;
  }

  carouselTotal = validMedia.length;
  carouselIndex = 0;

  const isSingle = validMedia.length === 1;

  const slides = validMedia
    .map((m, i) => `<div class="media-slide">${m.html}</div>`)
    .join("");

  const dots = validMedia
    .map(
      (_, i) =>
        `<button class="carousel-dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`,
    )
    .join("");

  const thumbs = validMedia.map((m, i) => thumbForSlide(m, i)).join("");

  const arrowSvgLeft = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M15 18l-6-6 6-6"/></svg>`;
  const arrowSvgRight = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M9 18l6-6-6-6"/></svg>`;

  return `
    <div class="media-carousel${isSingle ? " single-slide" : ""}">
      <div class="media-track">${slides}</div>
      <button class="carousel-btn carousel-prev" aria-label="Previous">${arrowSvgLeft}</button>
      <button class="carousel-btn carousel-next" aria-label="Next">${arrowSvgRight}</button>
      ${!isSingle ? `<div class="carousel-dots">${dots}</div>` : ""}
      ${!isSingle ? `<div class="carousel-counter">1 / ${carouselTotal}</div>` : ""}
    </div>
    ${!isSingle ? `<div class="carousel-thumbs">${thumbs}</div>` : ""}
  `;
}

function attachCarouselEvents() {
  const prev = document.querySelector(".carousel-prev");
  const next = document.querySelector(".carousel-next");
  const dots = document.querySelectorAll(".carousel-dot");
  const thumbs = document.querySelectorAll(".carousel-thumb");

  if (prev) prev.addEventListener("click", () => goToSlide(carouselIndex - 1));
  if (next) next.addEventListener("click", () => goToSlide(carouselIndex + 1));
  dots.forEach((d) =>
    d.addEventListener("click", () => goToSlide(+d.dataset.index)),
  );
  thumbs.forEach((t) =>
    t.addEventListener("click", () => goToSlide(+t.dataset.index)),
  );
}

function openModal(p) {
  const overlay = document.getElementById("modal-overlay");

  document.getElementById("modal-media").innerHTML = buildCarousel(
    p.detail.media,
  );
  document.getElementById("modal-badge").textContent = p.badge;
  document.getElementById("modal-category").textContent =
    CAT_LABELS[p.category] || p.category;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-desc").innerHTML =
    p.detail.longDesc || p.description;

  const techEl = document.getElementById("modal-tech");
  techEl.innerHTML = (p.detail.tech || [])
    .map((t) => `<span class="modal-tech-pill">${t}</span>`)
    .join("");

  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = (p.detail.links || [])
    .map(
      (l) =>
        `<a href="${l.url}" class="modal-link-btn" target="_blank" rel="noopener">${l.label} ↗</a>`,
    )
    .join("");

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-scroll").scrollTop = 0;

  attachCarouselEvents();
  loadActiveSlide(0);

  // Scroll fade hint
  const scrollEl = document.getElementById("modal-scroll");
  const modalEl = document.getElementById("modal");
  function checkScrollFade() {
    const atBottom =
      scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.clientHeight + 8;
    modalEl.classList.toggle("scrolled-to-bottom", atBottom);
  }
  // Check immediately on open, and on every scroll
  checkScrollFade();
  scrollEl.addEventListener("scroll", checkScrollFade);
}

function closeModal() {
  stopAllMedia();
  document.getElementById("modal-overlay").classList.remove("open");
  document.getElementById("modal").classList.remove("scrolled-to-bottom");
  document.body.style.overflow = "";
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("modal-overlay").classList.contains("open"))
    return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") goToSlide(carouselIndex - 1);
  if (e.key === "ArrowRight") goToSlide(carouselIndex + 1);
});
