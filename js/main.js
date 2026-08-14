(() => {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("nav-links");
  const year = document.getElementById("year");
  const filters = document.getElementById("project-filters");
  const projects = [...document.querySelectorAll(".project-item")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = drawer?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  drawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveals
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Active section highlighting
  const markActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= y) current = section.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", href === current);
    });
  };
  window.addEventListener("scroll", markActive, { passive: true });
  markActive();

  // Project filters
  filters?.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter || "all";
    projects.forEach((card) => {
      const tags = (card.dataset.tags || "").split(/\s+/);
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
})();
