async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#header-placeholder", "header.html");
  await loadComponent("#footer-placeholder", "footer.html");

  // Init mobile nav toggle after header is loaded
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Mobile dropdown toggle
    const dropdown = navLinks.querySelector(".dropdown");
    const dropdownToggle = navLinks.querySelector(".dropdown-toggle");

    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("open");
        }
      });
    }

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (link.classList.contains("dropdown-toggle")) return;
        toggle.classList.remove("active");
        navLinks.classList.remove("open");
        if (dropdown) dropdown.classList.remove("open");
      });
    });
  }

  // Hide header on scroll down, show on scroll up or at top
  const header = document.querySelector("#header");
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        header.classList.remove("header-hidden");
      } else if (currentScrollY > lastScrollY) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }

      lastScrollY = currentScrollY;
    });
  }
});
