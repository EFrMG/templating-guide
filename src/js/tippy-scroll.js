import debounce from "./utils/debounce.js";
import acronyms from "../acronyms.json";
import tippy, { animateFill } from "tippy.js";
import "tippy.js/animations/perspective.css";
import "tippy.js/themes/material.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

const mainContent = document.querySelector(".main-content");
const sections = mainContent.querySelectorAll("section[id]");
const sidebarLinks = document.querySelectorAll(".sidebar a");

const linkActiveObserverOptions = {
  root: mainContent,
  rootMargin: "0px 0px -50% 0px",
  threshold: 0,
};

// Add active class to sidebar links when scrolling the mainContent section
const linkActiveObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`.sidebar a[href="#${id}"]`);

    if (link) {
      if (entry.isIntersecting) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });

  debouncedScrollHandler();
}, linkActiveObserverOptions);

sections.forEach((section) => {
  linkActiveObserver.observe(section);
});

// Scroll on the sidebar to the last active link
function scrollToActiveLink() {
  const sidebar = document.getElementById("sidebar");
  const activeLinks = [...sidebarLinks].filter((link) =>
    link.classList.contains("active"),
  );
  const lastActiveLink = activeLinks.pop();

  const scrollTop =
    lastActiveLink.offsetTop -
    sidebar.clientHeight / 2 +
    lastActiveLink.clientHeight / 2;

  sidebar.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });
}

const debouncedScrollHandler = debounce(scrollToActiveLink, 1400);

// Cancel aboveset timeout when sidebar is scrolled manually
const sidebar = document.getElementById("sidebar");
if (sidebar) {
  sidebar.addEventListener("scroll", () => {
    debouncedScrollHandler.cancel();
  });
}

// Tippy.js
const initTooltips = () => {
  // Create a map for quick lookups, ignoring case for possible mixed ones
  const acronymMap = new Map(
    acronyms.map(({ acronym, definition }) => [
      acronym.toLowerCase(),
      definition,
    ]),
  );

  // All abbr tags need to be set before initializing Tippy
  const abbrTags = document.querySelectorAll("abbr");

  abbrTags.forEach((abbr) => {
    const acronym = abbr.textContent.toLowerCase();
    const definition = acronymMap.get(acronym);

    // If a definition is found, set the data-tippy-content attr
    // Tippy sets the content based on this by itself
    if (definition) {
      abbr.setAttribute("data-tippy-content", definition);
    }
  });

  // Initialize Tippy
  tippy("[data-tippy-content]", {
    animation: "perspective",
    animateFill: true,
    plugins: [animateFill],
    theme: "material",
  });
};

initTooltips();
