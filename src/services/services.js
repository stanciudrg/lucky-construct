import "./services.css";

const header = document.querySelector("header");
header.classList.remove("invisible");

const navItem = document.querySelector("#services");
navItem.classList.add("selected");

const servicesGrid = document.querySelector(".services-grid");

const stickyButton = document.querySelector(".sticky-contact-me");

const footer = document.querySelector("footer");

if (
  window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0
) {
  servicesGrid.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("swiper-button-prev") ||
      e.target.classList.contains("swiper-button-next")
    )
      return;
    if (e.target.closest(".service")) {
      servicesGrid.querySelectorAll(".service").forEach((node) => {
        if (e.target.closest(".service") === node) return;
        node.classList.remove("show-full-image");
      });
      e.target.closest(".service").classList.toggle("show-full-image");
    }
  });
}

if (window.matchMedia("(max-width: 600px)")) {
  window.addEventListener("scroll", () => {
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      stickyButton.style.bottom = "6rem";
    } else {
      stickyButton.style.bottom = "2rem";
    }
  });
}
