import "./index.css";
import "../img/hero-mobile.webp";
import "../img/hero-desktop.webp";
import "../img/proof-of-concept/main-work-1.webp";
import "../img/proof-of-concept/main-work-2.webp";
import "../img/proof-of-concept/main-work-3.webp";
// eslint-disable-next-line
import Swiper from "swiper/bundle";
import { Navigation, Scrollbar } from "swiper/modules";
// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/navigation";
// eslint-disable-next-line
import "swiper/css/scrollbar";

const findOutMoreButton = document.querySelector(".find-out-more");
const hero = document.querySelector(".hero");

const navItem = document.querySelector("#home");
navItem.classList.add("selected");

// Disable click events on logo when on homepage (not needed, since clicking on the logo sends the user to the homepage)
const logo = document.querySelector(".logo");
const logoLink = logo.querySelector("a");
logoLink.style.pointerEvents = "none";

// Change hero image based on viewport width. Saves space on mobile devices
function checkAndChangeHero() {
  if (window.matchMedia("(max-width: 800px)").matches) {
    hero.style.backgroundImage = "url(img/hero-mobile.webp)";
  } else {
    hero.style.backgroundImage = "url(img/hero-desktop.webp)";
  }
}

checkAndChangeHero();

// Scrolls to "about-me" section under hero without adding #id inside the url
findOutMoreButton.addEventListener("click", () => {
  window.scrollTo(0, hero.offsetHeight - 50);
});

// Swiper initialization logic. Check library documentation for more information about
// the settings used inside this object
// eslint-disable-next-line
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Scrollbar],
  lazy: true,
  direction: "horizontal",
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  scrollbar: true,
  breakpoints: {
    1300: {
      slidesPerView: 3,
    },
    1025: {
      slidesPerView: 2,
      scrollbar: false,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // eslint-disable-next-line
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
