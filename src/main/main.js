import "./normalize.css";
import "./main.css";

const html = document.querySelector("html");
const menuToggler = document.querySelector(".menu-toggler");
const menuTogglerIcon = menuToggler.querySelector(".menu-toggler-icon");
const nav = document.querySelector("nav");
const navList = nav.querySelector("ul");
// Used for checking the animation status of the navbar menu
let animationInProgress = false;

// Prevents FOIT, FUOC, and Cumulative Layout Shift
document.addEventListener("DOMContentLoaded", () => {
  html.style.display = "initial";
});

// Menu toggler logic. Visible only on mobile
// Animates from display "none" using requestAnimationFrame and transitionend events
menuToggler.addEventListener("click", () => {
  // Waits for animation to finish before submitting another click.
  // Prevents animation cancelling
  if (animationInProgress) return;
  animationInProgress = true;
  menuTogglerIcon.classList.toggle("open");

  if (!navList.classList.contains("visible")) {
    const handleTransitionEnd = () => {
      animationInProgress = false;
      navList.removeEventListener("transitionend", handleTransitionEnd);
    };

    navList.style.display = "flex";
    // Disable mobile scrolling when navbar menu is open
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
      animationInProgress = false;
      navList.removeEventListener("transitionend", handleTransitionEnd);
    };

    navList.classList.remove("visible");
    html.style.removeProperty("touch-action");

    navList.addEventListener("transitionend", handleTransitionEnd, {
      once: true,
    });
  }
});

// Toggle the mobile navbar based on viewport width
window.addEventListener("resize", () => {
  if (
    window.matchMedia("(max-width: 1024px)").matches &&
    navList.style.display === "none"
  ) {
    navList.style.removeProperty("display");
  }
});
