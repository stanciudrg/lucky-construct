(()=>{"use strict";const e=document.querySelector("html"),t=document.querySelector(".menu-toggler"),n=t.querySelector(".menu-toggler-icon"),i=document.querySelector("nav").querySelector("ul");document.addEventListener("DOMContentLoaded",(()=>{e.style.display="initial"})),window.addEventListener("load",(()=>{}));let s=!1;t.addEventListener("click",(()=>{if(!s)if(s=!0,n.classList.toggle("open"),i.classList.contains("visible")){const t=()=>{i.style.display="none",s=!1,i.removeEventListener("transitionend",t)};i.classList.remove("visible"),e.style.removeProperty("touch-action"),i.addEventListener("transitionend",t,{once:!0})}else{const t=()=>{s=!1,i.removeEventListener("transitionend",t)};i.style.display="flex",e.style.touchAction="none",requestAnimationFrame((()=>{i.classList.add("visible"),i.addEventListener("transitionend",t,{once:!0})}))}})),window.addEventListener("resize",(()=>{window.matchMedia("(max-width: 1024px)").matches&&"none"===i.style.display&&i.style.removeProperty("display")}))})();