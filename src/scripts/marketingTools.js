/* Ported verbatim from "Adnan Main Portfolio.html" lines 10922-10964.
   Only edit: 'export' added to the initMarketingTools declaration. */
export function initMarketingTools(){
  var section = document.getElementById("marketing-tools");
  if(!section) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce || typeof gsap === "undefined") return;

  var hasST = typeof ScrollTrigger !== "undefined";
  if(hasST) gsap.registerPlugin(ScrollTrigger);

  var header  = section.querySelectorAll(".mt-header > *");
  var toolbox = section.querySelector(".mt-toolbox");
  var chips   = section.querySelectorAll(".mt-chip");

  if(header.length){
    gsap.from(header,{
      opacity:0, y:28, duration:.7, stagger:.08, ease:"power3.out",
      scrollTrigger: hasST ? {trigger:section, start:"top 78%", once:true} : undefined
    });
  }
  if(toolbox){
    gsap.from(toolbox,{
      opacity:0, y:26, scale:.99, duration:.7, ease:"power3.out",
      scrollTrigger: hasST ? {trigger:section, start:"top 74%", once:true} : undefined
    });
  }
  if(chips.length){
    gsap.from(chips,{
      opacity:0, y:12, stagger:.035, duration:.42, ease:"power2.out",
      scrollTrigger: hasST ? {trigger:toolbox || section, start:"top 76%", once:true} : undefined
    });
  }

  // Recalculate trigger positions once fonts/layout settle, so the
  // start:"top 78%" markers don't fire against a stale page height.
  if(hasST){
    window.addEventListener("load", function(){ ScrollTrigger.refresh(); });
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(function(){ ScrollTrigger.refresh(); });
    }
  }
}

