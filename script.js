// =====================================================
// Ariana Home Care — script.js
// =====================================================

// ---------- Mobile navigation ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Close the menu when a link is tapped
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ---------- Navbar shadow on scroll ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

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

// ---------- Enquiry form → WhatsApp ----------
// No backend needed: the form composes a WhatsApp message to the business.
const form = document.getElementById("enquiryForm");
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

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
