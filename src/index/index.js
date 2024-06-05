import "./index.css";
import "../img/hero-mobile.webp";
import "../img/hero-desktop.webp";
import "../img/proof-of-concept/main-work-1.webp";
import "../img/proof-of-concept/main-work-2.webp";
import "../img/proof-of-concept/main-work-3.webp";
import Swiper from "swiper/bundle";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const findOutMoreButton = document.querySelector(".find-out-more");
const hero = document.querySelector(".hero");

const navItem = document.querySelector("#home");
navItem.classList.add("selected");

const logo = document.querySelector(".logo");
const logoLink = logo.querySelector("a");
logoLink.style.pointerEvents = "none";

checkAndChangeHero();

findOutMoreButton.addEventListener("click", () => {
  window.scrollTo(0, hero.offsetHeight - 50);
});

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
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

function checkAndChangeHero() {
  if (window.matchMedia("(max-width: 800px)").matches) {
    hero.style.backgroundImage = "url(img/hero-mobile.webp)";
  } else {
    hero.style.backgroundImage = "url(img/hero-desktop.webp)";
  }
}
