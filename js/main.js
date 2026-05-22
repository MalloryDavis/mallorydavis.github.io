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
