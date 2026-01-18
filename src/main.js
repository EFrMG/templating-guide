import "./css/styles.css";
import "./js/sidebar";
import "./js/tippy-scroll.js";
import "./js/themer.js";

// Code highlighting
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import handlebars from "highlight.js/lib/languages/handlebars";
import nunjucks from "highlight.js/lib/languages/django"; // fallback
import markdown from "highlight.js/lib/languages/markdown";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import plaintext from "highlight.js/lib/languages/plaintext";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("handlebars", handlebars);
hljs.registerLanguage("nunjucks", nunjucks);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("plaintext", plaintext);

hljs.highlightAll();

const codeInsidePreEls = document.querySelectorAll("pre > code");

// Language labels on code blocks
// Copy while hovering on language label
document.querySelectorAll("pre > code").forEach((block) => {
  const languageClass = Array.from(block.classList).find((cls) =>
    cls.startsWith("language-"),
  );

  if (languageClass) {
    const pre = block.parentElement;
    const language = languageClass.replace("language-", "");
    const languageLength = (language.length + 2).toString();
    const label = document.createElement("div");
    const textToCopy = block.textContent;

    label.classList.add("code-language-label");
    label.textContent = language;
    label.style.minWidth = languageLength + "ch";

    pre.insertBefore(label, block);

    pre.addEventListener("mouseenter", () => {
      label.textContent = "Copy";
    });

    pre.addEventListener("mouseleave", () => {
      label.textContent = language;
    });

    label.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        label.textContent = "✔";

        setTimeout(() => (label.textContent = language), 3500);
      } catch (err) {
        label.textContent = "✖";
        console.log(err);
        setTimeout(() => (label.textContent = language), 3500);
      }
    });
  }
});

// Outro
const outroSection = document.getElementById("outro");

if (outroSection) {
  const outroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          outroSection.classList.add("visible");
          outroObserver.unobserve(outroSection);
        }
      });
    },
    {
      threshold: 0.66,
    },
  );

  outroObserver.observe(outroSection);
}
