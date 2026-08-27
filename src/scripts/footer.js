/* Ported verbatim from "Adnan Main Portfolio.html" lines 11664-11709.
   Only edit: 'export' added to the initFooter declaration. */
export function initFooter(){
  const year=document.getElementById("footerYear");
const footer=document.getElementById("footer");

  if(year){
    year.textContent=new Date().getFullYear();
  }

  if(
    footer &&
    typeof gsap!=="undefined" &&
    typeof ScrollTrigger!=="undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ){

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".footer__brand",{
      opacity:0,
      y:20,
      duration:.55,
      ease:"power3.out",
      scrollTrigger:{
        trigger:footer,
        start:"top 92%",
        once:true
      }
    });

    gsap.from(".footer__links",{
      opacity:0,
      y:16,
      duration:.5,
      ease:"power3.out",
      scrollTrigger:{
        trigger:footer,
        start:"top 92%",
        once:true
      }
    });


  }
}


