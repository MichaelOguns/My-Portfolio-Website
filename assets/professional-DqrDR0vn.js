import{c as e,j as s,r as t,P as r,S as o}from"./index-yrfnlSke.js";e(document.getElementById("root")).render(s.jsxs(t.StrictMode,{children:[s.jsx(r,{}),s.jsx(o,{})]}));
// Helper function to create the theme selector
const createThemeSelector = () => {
  const themeSelector = document.getElementById("theme-selector");
  const themeIcon = themeSelector.querySelector(".theme-icon");
  const themePalette = themeSelector.querySelector(".theme-palette");

  // Toggle palette visibility
  themeIcon.addEventListener("click", () => {
    themeSelector.classList.toggle("active");
  });

  // Handle theme selection
  themePalette.addEventListener("click", (event) => {
    if (event.target.classList.contains("theme-option")) {
      const selectedTheme = event.target.dataset.theme;
      // In a real React app, you would set the theme in state here.
      // For this static example, we'll just log it.
      console.log("Selected theme:", selectedTheme);
      alert(`Theme switched to: ${event.target.title}`);
      themeSelector.classList.remove("active");
    }
  });

  // Make the theme selector draggable
  let isDragging = false;
  let offsetX, offsetY;

  themeSelector.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - themeSelector.offsetLeft;
    offsetY = e.clientY - themeSelector.offsetTop;
    themeSelector.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      themeSelector.style.left = `${e.clientX - offsetX}px`;
      themeSelector.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    themeSelector.style.cursor = "grab";
  });
};

// Create and append the theme selector after the page has loaded
window.addEventListener('load', createThemeSelector);
import{c as e,j as s,r as t,P as r,S as o}from"./index-BWxHwqxv.js";e(document.getElementById("root")).render(s.jsxs(t.StrictMode,{children:[s.jsx(r,{}),s.jsx(o,{})]}));
