import "./gallery.css";
import "../img/gallery/1.webp";
import "../img/gallery/2.webp";
import "../img/gallery/3.webp";
import "../img/gallery/4.webp";
import "../img/gallery/5.webp";
import "../img/gallery/6.webp";
import "../img/gallery/7.webp";
import "../img/gallery/8.webp";
import "../img/gallery/9.webp";
import "../img/gallery/10.webp";
import "../img/gallery/11.webp";
import "../img/gallery/12.webp";
import "../img/gallery/13.webp";
import "../img/gallery/14.webp";
import "../img/gallery/15.webp";
import "../img/gallery/16.webp";
import "../img/gallery/17.webp";
import "../img/gallery/18.webp";
import "../img/gallery/19.webp";
import "../img/gallery/20.webp";
import "../img/gallery/21.webp";
import "../img/gallery/22.webp";
import "../img/gallery/23.webp";
import "../img/gallery/24.webp";
import "../img/gallery/25.webp";
import "../img/gallery/26.webp";
import "../img/gallery/27.webp";
import "../img/gallery/28.webp";
import "../img/gallery/29.webp";
import "../img/gallery/30.webp";
import "../img/gallery/31.webp";
import "../img/gallery/32.webp";
import "../img/gallery/33.webp";
import "../img/gallery/34.webp";
import "../img/gallery/35.webp";
import "../img/gallery/36.webp";
import "../img/gallery/37.webp";
import "../img/gallery/38.webp";
import "../img/gallery/39.webp";
import "../img/gallery/40.webp";
import "../img/gallery/41.webp";
import "../img/gallery/42.webp";
import "../img/gallery/43.webp";
import "../img/gallery/44.webp";
import "../img/gallery/45.webp";
import "../img/gallery/46.webp";
import "../img/gallery/47.webp";
import "../img/gallery/48.webp";
import "../img/gallery/49.webp";
import "../img/gallery/50.webp";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Masonry from "masonry-layout";

const navItem = document.querySelector("#gallery");
navItem.classList.add("selected");

const stickyButton = document.querySelector(".sticky-contact-me");

const footer = document.querySelector("footer");

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#masonry",
    children: "a",
    pswpModule: () => import("photoswipe"),
    showHideAnimationType: "none",
  });
  lightbox.init();

  const elem = document.querySelector("#masonry");
  const msnry = new Masonry(elem, {
    itemSelector: "a",
    columnWidth: ".grid-sizer",
    percentPosition: true,
  });
});

if (window.matchMedia("(max-width: 600px)").matches) {
  window.addEventListener("scroll", () => {
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      stickyButton.style.bottom = "6rem";
    } else {
      stickyButton.style.bottom = "2rem";
    }
  });
}
