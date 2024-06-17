import "./services.css";

const navItem = document.querySelector("#services");
navItem.classList.add("selected");

const servicesGrid = document.querySelector(".services-grid");
const stickyButton = document.querySelector(".sticky-contact-me");
const footer = document.querySelector("footer");

// Shows a sticky "call-me" button when in mobile mode
if (window.matchMedia("(max-width: 600px)")) {
  window.addEventListener("scroll", () => {
    // Prevents the sticky button above the footer
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      stickyButton.style.bottom = "6rem";
    } else {
      stickyButton.style.bottom = "2rem";
    }
  });
}

// Turns hover effect into click effect on mobile devices.
// Uses ontouchstart in window and navigator.maxTouchPoints to detect Samsung devices
// which are considered hoverable devices by default due to their S-Pen
if (
  window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0
) {
  // On click, it hides the service description to show the full image
  servicesGrid.addEventListener("click", (e) => {
    if (e.target.closest(".service")) {
      servicesGrid.querySelectorAll(".service").forEach((node) => {
        if (e.target.closest(".service") === node) return;
        node.classList.remove("show-full-image");
      });
      e.target.closest(".service").classList.toggle("show-full-image");
    }
  });
}
