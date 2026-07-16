const sidebarLinks = document.querySelectorAll(".sidebar a");
const burgerCheckEl = document.querySelector(".hamburger-check input");
const mainGrid = document.querySelector(".main-grid");
const sidebarButton = document.querySelector(".sidebar-button");

// Link navigation
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });

      // Hide the burger menu as well to facilitate UX
      if (!burgerQuery.matches) {
        burgerCheckEl.checked = false;
        burgerCheckEl.dispatchEvent(new Event("change"));
      }
    }
  });
});

// Burger menu
burgerCheckEl.addEventListener("change", (e) => {
  if (e.target.checked) {
    mainGrid.style.setProperty("--sidebar-width--height", "80vh");
    sidebarButton.setAttribute("aria-expanded", "true");
  } else {
    mainGrid.style.setProperty("--sidebar-width--height", "2.25lh");
    sidebarButton.setAttribute("aria-expanded", "false");
  }
});

// Reset var when resizing up to desktop size
const burgerQuery = window.matchMedia("(min-width: 900px)");

burgerQuery.addEventListener("change", (e) => {
  if (e.matches) {
    mainGrid.style.setProperty("--sidebar-width--height", "300px");
    sidebarButton.setAttribute("aria-expanded", "false");
  } else {
    mainGrid.style.setProperty("--sidebar-width--height", "2.25lh");
    sidebarButton.setAttribute("aria-expanded", "false");
    burgerCheckEl.checked = false;
    burgerCheckEl.dispatchEvent(new Event("change"));
  }
});
