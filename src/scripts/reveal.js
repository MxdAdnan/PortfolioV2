/* Ported verbatim from "Adnan Main Portfolio.html" lines 11710-11828.
   Only edit: 'export' added to the initSharedObserver declaration. */
/* ============================================================
   ONE SHARED INTERSECTION OBSERVER
   Replaces the five separate observers that lived in Projects,
   Impact (x2), Services and B2B.

   Declared on the element:
     data-io="once"          add .is-visible on first entry, then unobserve
     data-io="toggle"        add/remove .is-visible and .is-exiting
     data-io-threshold       ratio required to count as "in view" (default .12)
     data-io-enter           key in IO_ENTER, run once on first entry
     data-io-enter-ratio     ratio required for data-io-enter (default: threshold)
     data-io-restart         replay the entrance after an exit (Services)
     data-io-safety          ms; add .no-anim if the observer never fired
   ============================================================ */
var IO_ENTER = {
  /* Impact counters — fire on scroll into view, never on page load. */
  impactCounters: function(){
    if(typeof window.__portfolioRunImpactCounters === "function"){
      window.__portfolioRunImpactCounters();
    }
  },
  /* B2B staggered reveal (was its own observer). */
  b2bReveal: function(root){
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = root.querySelectorAll(".b2b-reveal, .b2b-flow-node, .b2b-flow-arrow");
    Array.prototype.forEach.call(items, function(el, i){
      el.style.transitionDelay = reduced ? "0ms" : Math.min(i * 80, 700) + "ms";
      el.classList.add("is-entered");
    });
  }
};

export function initSharedObserver(){
  var targets = document.querySelectorAll("[data-io]");
  if(!targets.length) return;

  /* Safety net: if the observer never fires, content must not stay at opacity:0. */
  var timers = [];
  Array.prototype.forEach.call(targets, function(el){
    var ms = parseInt(el.dataset.ioSafety || "0", 10);
    if(!ms) return;
    timers.push(window.setTimeout(function(){
      if(!el.dataset.ioFired) el.classList.add("no-anim");
    }, ms));
  });

  function release(el){
    el.dataset.ioFired = "1";
    el.classList.remove("no-anim");
  }

  if(!("IntersectionObserver" in window)){
    Array.prototype.forEach.call(targets, function(el){
      release(el);
      el.classList.add("is-visible");
      var key = el.dataset.ioEnter;
      if(key && IO_ENTER[key]) IO_ENTER[key](el);
    });
    timers.forEach(clearTimeout);
    return;
  }

  /* A section taller than the viewport can never reach a high ratio, so any
     intersection counts for it. Without this, tall sections on small screens
     would silently never reveal. */
  function ratioMet(entry, t){
    if(entry.intersectionRatio >= t) return true;
    var rootH = entry.rootBounds ? entry.rootBounds.height : window.innerHeight;
    return entry.isIntersecting && entry.boundingClientRect.height >= rootH;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      var el   = entry.target;
      var mode = el.dataset.io;
      var t    = parseFloat(el.dataset.ioThreshold || "0.12");
      var met  = entry.isIntersecting && ratioMet(entry, t);

      release(el);

      /* data-io-enter — once, at its own ratio */
      var key = el.dataset.ioEnter;
      if(key && !el.dataset.ioEntered){
        var et = parseFloat(el.dataset.ioEnterRatio || el.dataset.ioThreshold || "0.12");
        if(entry.isIntersecting && ratioMet(entry, et)){
          el.dataset.ioEntered = "1";
          if(IO_ENTER[key]) IO_ENTER[key](el);
        }
      }

      if(mode === "once"){
        if(met){
          el.classList.add("is-visible");
          if(!key || el.dataset.ioEntered) observer.unobserve(el);
        }
        return;
      }

      /* mode === "toggle" */
      if(met){
        if(el.hasAttribute("data-io-restart") && el.classList.contains("is-exiting")){
          el.classList.remove("is-exiting", "is-visible");
          void el.offsetWidth;                      /* restart, don't snap back */
        }else{
          el.classList.remove("is-exiting");
        }
        el.classList.add("is-visible");
      }else if(!entry.isIntersecting){
        if(entry.boundingClientRect.top < 0) el.classList.add("is-exiting");
        else el.classList.remove("is-visible", "is-exiting");
      }
    });
  }, {
    threshold: [0, 0.05, 0.08, 0.12, 0.18, 0.28, 0.4, 0.6, 0.8, 1],
    rootMargin: "-6% 0px -6% 0px"
  });

  Array.prototype.forEach.call(targets, function(el){ observer.observe(el); });
}
