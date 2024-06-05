import "./normalize.css";
import "./main.css";

const html = document.querySelector("html");
const menuToggler = document.querySelector(".menu-toggler");
const menuTogglerIcon = menuToggler.querySelector(".menu-toggler-icon");
const nav = document.querySelector("nav");
const navList = nav.querySelector("ul");

document.addEventListener("DOMContentLoaded", () => {
  html.style.display = "initial";
});
window.addEventListener("load", () => {});

let inProgress = false;

menuToggler.addEventListener("click", () => {
  if (inProgress) return;
  inProgress = true;
  menuTogglerIcon.classList.toggle("open");

  if (!navList.classList.contains("visible")) {
    const handleTransitionEnd = () => {
      inProgress = false;
      navList.removeEventListener("transitionend", handleTransitionEnd);
    };

    navList.style.display = "flex";
    html.style.touchAction = "none";

    requestAnimationFrame(() => {
      navList.classList.add("visible");
      navList.addEventListener("transitionend", handleTransitionEnd, {
        once: true,
      });
    });
  } else {
    const handleTransitionEnd = () => {
      navList.style.display = "none";
      inProgress = false;
      navList.removeEventListener("transitionend", handleTransitionEnd);
    };

    navList.classList.remove("visible");
    html.style.removeProperty("touch-action");

    navList.addEventListener("transitionend", handleTransitionEnd, {
      once: true,
    });
  }
});

window.addEventListener("resize", () => {
  if (
    window.matchMedia("(max-width: 1024px)").matches &&
    navList.style.display === "none"
  ) {
    navList.style.removeProperty("display");
  }
});
