const themeToggle = document.querySelector("[data-theme-toggle]");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");

const initialTheme = savedTheme || "light";

root.setAttribute("data-theme", initialTheme);

if (themeToggle) {
  themeToggle.textContent = initialTheme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute("aria-pressed", String(initialTheme === "dark"));

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".site-nav a").forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const intakeTabs = document.querySelectorAll("[data-intake-tab]");
const intakePanels = document.querySelectorAll(".intake-panel");

intakeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.intakeTab;

    intakeTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    intakePanels.forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });

    document.getElementById(targetId)?.querySelector("input, select, textarea")?.focus();
  });
});

document.querySelectorAll("[data-intake-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const inquiryType = form.dataset.inquiryType;
    const organization = formData.get("Organization");
    const subject = `${inquiryType}: ${organization}`;
    const lines = [
      inquiryType,
      "",
      ...Array.from(formData.entries())
        .filter(([, value]) => String(value).trim())
        .map(([label, value]) => `${label}: ${String(value).trim()}`),
      "",
      "I would like to discuss the remaining context in conversation."
    ];

    const mailto = `mailto:md.mallorydavis@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
  });
});
