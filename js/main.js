const themeToggle = document.querySelector("[data-theme-toggle]");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

root.setAttribute("data-theme", initialTheme);

if (themeToggle) {
  themeToggle.textContent = initialTheme === "dark" ? "Light" : "Dark";

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "Light" : "Dark";
  });
}