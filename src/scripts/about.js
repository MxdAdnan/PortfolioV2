/* Ported verbatim from "Adnan Main Portfolio.html" lines 11117-11164.
   Only edit: 'export' added to the initAbout declaration. */
export function initAbout(){
  const section=document.getElementById("about-me");
  if(!section) return;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(typeof gsap==="undefined" || typeof ScrollTrigger==="undefined" || reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".about__header > *", {
    opacity:0,
    y:28,
    duration:.7,
    stagger:.08,
    ease:"power3.out",
    scrollTrigger:{trigger:section,start:"top 78%",once:true}
  });

  const shellReveal={trigger:".about__shell",start:"top 85%",once:true};

  gsap.from(".about__copy", {
    opacity:0,
    x:-28,
    duration:.7,
    ease:"power3.out",
    scrollTrigger:shellReveal
  });

  gsap.from(".about__portrait", {
    opacity:0,
    x:28,
    scale:.985,
    duration:.75,
    ease:"power3.out",
    scrollTrigger:shellReveal
  });

  gsap.from(".about__philosophy", {
    opacity:0,
    y:12,
    duration:.4,
    ease:"power2.out",
    scrollTrigger:{trigger:".about__philosophy",start:"top 92%",once:true}
  });

  window.addEventListener("load",()=>ScrollTrigger.refresh());
}

