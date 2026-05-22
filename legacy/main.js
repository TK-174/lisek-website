/* ==========================================================================
   Lisek Salon Groomerski — main.js
   - Mobile nav toggle (a11y-friendly)
   - Scroll-state on header
   - Reveal-on-scroll via IntersectionObserver
   - Mailto contact form handler with light client validation
   - Auto year in footer
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navList   = document.getElementById("nav-list");

  const closeNav = () => {
    if (!navToggle || !navList) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Otwórz menu");
    navList.classList.remove("is-open");
  };

  const openNav = () => {
    if (!navToggle || !navList) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Zamknij menu");
    navList.classList.add("is-open");
  };

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      expanded ? closeNav() : openNav();
    });

    // Close when an in-page link is followed
    navList.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close on resize back to desktop
    const mql = window.matchMedia("(min-width: 721px)");
    mql.addEventListener("change", (e) => { if (e.matches) closeNav(); });
  }

  /* ---------- Sticky header scroll state ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const setScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".section-header, .about-copy, .about-gallery, .service-card, .price-group, .booksy-frame, .contact-info, .contact-form, .hero-title, .hero-sub, .hero-ctas, .hero-stats"
  );

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealTargets.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ---------- Contact form (mailto fallback) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("cf-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const data = {
        name:    form.elements.namedItem("name").value.trim(),
        email:   form.elements.namedItem("email").value.trim(),
        pet:     form.elements.namedItem("pet").value.trim(),
        message: form.elements.namedItem("message").value.trim(),
      };

      if (!data.name || !data.email || !data.message) {
        status.classList.add("is-error");
        status.textContent = "Uzupełnij wszystkie wymagane pola.";
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      if (!emailOk) {
        status.classList.add("is-error");
        status.textContent = "Wpisz poprawny adres e-mail.";
        return;
      }

      const subject = encodeURIComponent(`Zapytanie ze strony — ${data.name}`);
      const bodyLines = [
        `Imię i nazwisko: ${data.name}`,
        `E-mail: ${data.email}`,
        data.pet ? `Pupil: ${data.pet}` : null,
        "",
        "Wiadomość:",
        data.message,
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:alalis@salongroomerski.com?subject=${subject}&body=${body}`;

      status.classList.add("is-success");
      status.textContent = "Otwieramy Twojego klienta poczty… Jeśli nic się nie dzieje, napisz bezpośrednio na alalis@salongroomerski.com.";
    });
  }
})();
