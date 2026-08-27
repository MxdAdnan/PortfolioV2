/* Ported verbatim from "Adnan Main Portfolio.html" lines 10965-11116.
   Only edit: 'export' added to the initExperience declaration. */
export function initExperience(){
  "use strict";

  var root    = document.documentElement;
  var section = document.getElementById("experience");
  if(!section) return;

  var stage = document.getElementById("experienceStage");
  var line  = document.getElementById("expLineProgress");
  var items = Array.prototype.slice.call(section.querySelectorAll(".exp-item"));

  if(!stage || !line || !items.length){
    root.classList.remove("exp-js");   // fail open: everything stays readable
    return;
  }

  /* ---------- logo safety net -------------------------------------------
     These are hot-linked third-party logos; the LinkedIn one in particular
     carries an expiry token. If any of them 404s, drop the box rather than
     leave a broken-image frame in the card. */
  Array.prototype.forEach.call(section.querySelectorAll(".exp-company-logo img"), function(img){
    img.addEventListener("error", function(){
      var box = img.parentNode;
      if(box) box.setAttribute("hidden","");
      if(window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ---------- measurement ------------------------------------------------
     Activation points are measured from the real node positions instead of
     hard-coded numbers, so the red line tip and the nodes can never drift
     apart after a layout, font or breakpoint change. */
  var points = items.map(function(){ return 0; });
  var lineH  = 1;
  var TAIL   = 56;   // how far the line runs past the final node

  function measure(){
    var stageTop = stage.getBoundingClientRect().top;
    var last = 0;

    var centres = items.map(function(item){
      var node = item.querySelector(".exp-node");
      if(!node) return 0;
      var r = node.getBoundingClientRect();
      var c = (r.top + r.height / 2) - stageTop;   // scale keeps the centre put
      if(c > last) last = c;
      return c;
    });

    lineH = Math.max(1, last + TAIL);
    stage.style.setProperty("--exp-line-h", lineH + "px");

    points = centres.map(function(c){
      return Math.min(1, Math.max(0, c / lineH));
    });
  }

  function render(p){
    line.style.strokeDashoffset = String(1 - p);
    for(var i = 0; i < items.length; i++){
      items[i].classList.toggle("is-active", p >= points[i] - 0.001);
    }
  }

  function revealEverything(){
    measure();
    line.style.strokeDashoffset = "0";
    stage.classList.add("is-entered");
    items.forEach(function(item){ item.classList.add("is-active"); });
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var noGsap  = (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined");

  if(noGsap || reduced){
    revealEverything();
    if(noGsap) root.classList.remove("exp-js");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  /* Stops the mobile URL bar collapsing from triggering a refresh storm */
  ScrollTrigger.config({ignoreMobileResize:true});

  measure();

  /* ---------- entrance ---------- */
  gsap.set(".exp-heading > div", {opacity:0, y:28});
  gsap.set(".exp-heading > p",   {opacity:0, y:24});

  var entered = false;
  function enter(){
    if(entered) return;
    entered = true;
    stage.classList.add("is-entered");
  }

  var entrance = gsap.timeline({
    scrollTrigger:{trigger:section, start:"top 82%", once:true}
  });

  entrance
    .to(".exp-heading > div", {opacity:1, y:0, duration:.65, ease:"power3.out", clearProps:"transform"})
    .to(".exp-heading > p",   {opacity:1, y:0, duration:.55, ease:"power3.out", clearProps:"transform"}, "-=.42")
    .add(enter, .3);

  /* Insurance: cards can never stay invisible if the trigger misfires */
  setTimeout(function(){
    if(!entered && stage.getBoundingClientRect().top < window.innerHeight) enter();
  }, 2500);

  /* ---------- one scroll-linked source of truth ----------
     A single scrubbed tween drives BOTH the line and the node activation,
     so they are mathematically incapable of desyncing. */
  var state = {p:0};

  gsap.to(state, {
    p:1,
    ease:"none",
    onUpdate:function(){ render(state.p); },
    scrollTrigger:{
      trigger:stage,
      start:"top 80%",
      /* The line finishes when its tip reaches ~70% of the viewport — but never
         past the last scrollable pixel, otherwise the final role can never
         activate on a page that ends soon after this section. */
      end:function(self){
        var natural = self.start + lineH + window.innerHeight * 0.1;
        var reachable = ScrollTrigger.maxScroll(window) - 1;
        return Math.max(self.start + 120, Math.min(natural, reachable));
      },
      scrub:.6,
      invalidateOnRefresh:true
    }
  });

  ScrollTrigger.addEventListener("refreshInit", measure);
  ScrollTrigger.addEventListener("refresh", function(){ render(state.p); });

  window.addEventListener("load", function(){ ScrollTrigger.refresh(); });

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(function(){ ScrollTrigger.refresh(); });
  }

  /* Respect a mid-session switch to reduced motion */
  var rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if(rmq.addEventListener){
    rmq.addEventListener("change", function(e){ if(e.matches) revealEverything(); });
  }
}

