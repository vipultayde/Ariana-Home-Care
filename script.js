// =====================================================
// Ariana Home Care — script.js
// Shared by index.html and careers.html — elements are
// guarded so pages can omit any of them.
// =====================================================

// ---------- Mobile navigation drawer ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navBackdrop = document.getElementById("navBackdrop");
const drawerClose = document.getElementById("drawerClose");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  hamburger.classList.toggle("open", open);
  if (navBackdrop) navBackdrop.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  if (drawerClose) drawerClose.addEventListener("click", () => setMenu(false));
  if (navBackdrop) navBackdrop.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) setMenu(false);
  });
  // Close the drawer when a link is tapped
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
}

// ---------- Navbar shadow on scroll ----------
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });
}

// ---------- Scroll-reveal animations ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Active nav link highlighting ----------
const sections = document.querySelectorAll("section[id]");
if (navLinks && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.querySelectorAll("a:not(.btn)").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

// ---------- Enquiry form → WhatsApp ----------
// No backend needed: the form composes a WhatsApp message to the business.
const form = document.getElementById("enquiryForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const service = (data.get("service") || "").toString();
    const message = (data.get("message") || "").toString().trim();

    const lines = [
      "Hello Ariana Home Care, I would like to enquire about your services.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service needed: ${service}`,
    ];
    if (message) lines.push(`Details: ${message}`);

    const url = `https://wa.me/917888017233?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    form.reset();
  });
}

// ---------- Welcome popup (phone view only) ----------
// Shown on every homepage visit on phones, shortly after the page loads.
const welcomeOverlay = document.getElementById("welcomeOverlay");
if (welcomeOverlay) {
  const isPhone = window.matchMedia("(max-width: 860px)").matches;

  const hideWelcome = () => {
    welcomeOverlay.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => { welcomeOverlay.hidden = true; }, 320);
  };

  if (isPhone) {
    setTimeout(() => {
      welcomeOverlay.hidden = false;
      // timer instead of requestAnimationFrame: rAF never fires in background tabs
      setTimeout(() => welcomeOverlay.classList.add("show"), 30);
      document.body.style.overflow = "hidden";
    }, 900);
  }

  document.getElementById("welcomeClose").addEventListener("click", hideWelcome);
  document.getElementById("welcomeContact").addEventListener("click", hideWelcome);
  welcomeOverlay.addEventListener("click", (e) => {
    if (e.target === welcomeOverlay) hideWelcome();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !welcomeOverlay.hidden) hideWelcome();
  });
}

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
