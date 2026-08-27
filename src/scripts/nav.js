/* Ported verbatim from "Adnan Main Portfolio.html" lines 11829-11883.
   Only edit: 'export' added to the initNav declaration. */

/* ============================================================
   NAV — smooth scroll is native (scroll-behavior + scroll-margin-top).
   This adds active-state highlighting only.
   ============================================================ */
export function initNav(){
  var links = document.querySelectorAll('.main-nav a[href^="#"], .mobile-nav__links a[href^="#"]');
  if(!links.length) return;

  /* Sections that should light up each nav link. */
  var MAP = [
    ["#projects-overview",  ["projects-overview", "featured-case-studies"]],
    ["#marketing-tools",    ["services", "b2b-channel", "marketing-tools"]],
    ["#experience",         ["experience"]],
    ["#about-me",           ["about-me", "beyond-the-portfolio"]],
    ["#contact",            ["contact", "contact-form"]]
  ];

  var watched = [];
  MAP.forEach(function(pair){
    pair[1].forEach(function(id){
      var el = document.getElementById(id);
      if(el) watched.push({el: el, href: pair[0]});
    });
  });
  if(!watched.length) return;

  var ticking = false;
  function update(){
    ticking = false;
    var line = (document.querySelector(".site-header")
                 ? document.querySelector(".site-header").offsetHeight : 84) + 12;
    var active = null;
    for(var i = 0; i < watched.length; i++){
      if(watched[i].el.getBoundingClientRect().top <= line) active = watched[i].href;
    }
    /* bottom of page always resolves to the last link */
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 4){
      active = watched[watched.length - 1].href;
    }
    Array.prototype.forEach.call(links, function(a){
      a.classList.toggle("is-active", a.getAttribute("href") === active);
    });
  }
  function onScroll(){
    if(ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener("scroll", onScroll, {passive: true});
  window.addEventListener("resize", onScroll, {passive: true});
  update();
}


