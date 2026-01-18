import qualia from "highlight.js/styles/base16/qualia.min.css?url";
import bespin from "highlight.js/styles/base16/bespin.min.css?url";

const mainContent = document.querySelector(".main-content");
const nunjucksSection = document.getElementById("eleventy-nunjucks");
let highlightJsTheme = document.getElementById("highlight-js-theme");

// Create the link element if it doesn't exist
if (!highlightJsTheme) {
  highlightJsTheme = document.createElement("link");
  highlightJsTheme.id = "highlight-js-theme";
  highlightJsTheme.rel = "stylesheet";
  document.head.appendChild(highlightJsTheme);
}

// Set the initial theme
highlightJsTheme.href = qualia;

const mainContentTop = mainContent.getBoundingClientRect().top;

mainContent.addEventListener("scroll", () => {
  const nunjucksSectionTop = nunjucksSection.getBoundingClientRect().top;

  if (nunjucksSectionTop - 230 <= mainContentTop) {
    document.body.classList.add("nunjucks-theme");
    highlightJsTheme.href = bespin;
  } else {
    document.body.classList.remove("nunjucks-theme");
    highlightJsTheme.href = qualia;
  }
});
