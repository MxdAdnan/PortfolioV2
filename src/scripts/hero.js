/* Ported from "Adnan Main Portfolio.html" lines 7216-7686.
 *
 * CHANGED: the headline reveal now uses SplitText. The existing
 * .line-wrap > .line structure and class names are preserved exactly --
 * .line-wrap{overflow:hidden} is what masks the reveal, so SplitText is applied
 * INSIDE each .line rather than replacing the wrapper markup. Chars are split
 * (not lines), which is far less sensitive to Poppins loading late than a line
 * split would be, and aria:"auto" keeps the name readable as one string to
 * screen readers instead of character by character.
 */
import { SplitText } from './gsap';

export function initHero(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Every other section in this portfolio already guards for a missing GSAP.
     Hero did not, so a blocked/slow CDN threw before buildOrbit() and left the
     hero empty with a dead mobile menu. Same guard, same fallbacks. */
  var hasGsap = (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined");
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  else document.documentElement.classList.add("no-gsap");

  /*
     * Brand asset note:
     * Google, LinkedIn, WordPress, Figma and OpenAI publish official brand
     * resources/guidelines. The SVG delivery URLs below use recognizable
     * vector brand marks so the portfolio remains lightweight and crisp.
     * Do not recolor, distort or imply endorsement.
     */
  /* =========================================================
     USER-SUPPLIED BRAND LOGO SOURCES
     ========================================================= */
  var ICONS = {
    ga:      { name:"Google Analytics", src:"https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg" },
    gads:    { name:"Google Ads", src:"https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Logo.width-500.format-webp.webp" },
    meta:    { name:"Meta", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ExsAJgNKitVjlT9Gl-i3pPphUZ4wBD-4a9rcIEySmSrUt0O9xqUNH0w&s=10" },
    ig:      { name:"Instagram", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShkS9MHMfVlDuMGoHjNzeeWfqxXXeuu1IFZmso8IXaow&s=10" },
    fb:      { name:"Facebook", src:"https://framerusercontent.com/images/AOy3hx6pjYIYAxxPKjBZ6rBm4Y.jpeg?width=400&height=400" },
    li:      { name:"LinkedIn", src:"https://delivery-p143253-e1476319.adobeaemcloud.com/adobe/assets/urn:aaid:aem:22e6a488-3325-4515-a03b-ecd36159c0d8/original/as/brand-homepg-guidance-inlogo-dsk-v01-jpg-original.jpg" },
    yt:      { name:"YouTube", src:"https://www.edigitalagency.com.au/wp-content/uploads/new-YouTube-icon-red-png-large-size.png" },
    sr:      { name:"SEMrush", src:"https://1000logos.net/wp-content/uploads/2024/08/SEMrush-Emblem.png" },
    canva:   { name:"Canva", src:"https://www.edigitalagency.com.au/wp-content/uploads/Canva-logo-PNG-large-size.png" },
    cap:     { name:"CapCut", src:"https://1000logos.net/wp-content/uploads/2025/01/CapCut-Emblem.png" },
    brevo:   { name:"Brevo", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJZlIQUUSWH6wHIZM2gbRlYqQF6x-trdDNGMZqQ89gA&s=10" },
    wp:      { name:"WordPress", src:"https://brandpalettes.com/wp-content/uploads/2021/06/wordpress-color-codes.svg" },
    figma:   { name:"Figma", src:"https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" },
    mc:      { name:"Mailchimp", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn0thpukPl8lL3gcBZ_8KgdbvFDkespxig3Wricc9-7TNVEhPrUUkZRGy9&s=10" },
    gpt:     { name:"ChatGPT", src:"https://chatgptaihub.com/wp-content/uploads/2023/06/ChatGPT-logo-with-color-Background.png" },
    claude:  { name:"Claude.ai", src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGitQ3eUFhYmx0o8BMipgHWqK1o-rOwu9fPh3sSSqaA&s=10" }
  };


  function addLogoFallback(img, name){
    img.addEventListener("error", function(){
      var holder = img.parentElement;
      img.style.display = "none";
      holder.classList.add("logo-load-error");
      holder.setAttribute("data-fallback", (name || "").split(/\s+/).map(function(w){return w[0]}).join("").slice(0,3).toUpperCase());
    }, { once:true });
  }

  function iconEl(key, size){
    var d = ICONS[key];
    var el = document.createElement("div");
    el.className = "icon-badge";
    el.style.setProperty("--isize", size + "px");
    el.title = d.name;
    el.setAttribute("aria-label", d.name);

    var img = document.createElement("img");
    img.src = d.src;
    img.alt = d.name;
    img.loading = "eager";
    img.decoding = "async";
    img.draggable = false;
    addLogoFallback(img, d.name);
    el.appendChild(img);

    return el;
  }

  /* =========================================================
     ORBIT CONFIGURATION
     ========================================================= */
  function pickRings(){
    var w = window.innerWidth;
    if (w <= 520){
      return [
        { rx:120, ry:48,  rotate:-14, speed:30, dir:1,  size:38, icons:["ga","meta","ig","li"] },
        { rx:152, ry:66,  rotate:16,  speed:42, dir:-1, size:34, icons:["yt","canva","gpt"] }
      ];
    }
    if (w <= 860){
      return [
        { rx:148, ry:58,  rotate:-14, speed:30, dir:1,  size:42, icons:["ga","meta","ig"] },
        { rx:186, ry:90,  rotate:14,  speed:42, dir:-1, size:40, icons:["fb","li","yt"] },
        { rx:122, ry:50,  rotate:26,  speed:24, dir:1,  size:36, icons:["canva","wp","gpt"] }
      ];
    }
    if (w <= 1024){
      return [
        { rx:176, ry:68,  rotate:-14, speed:32, dir:1,  size:46, icons:["ga","gads","yt"] },
        { rx:216, ry:104, rotate:12,  speed:46, dir:-1, size:46, icons:["meta","ig","fb","li"] },
        { rx:138, ry:56,  rotate:26,  speed:26, dir:1,  size:40, icons:["sr","canva","cap"] },
        { rx:238, ry:44,  rotate:-30, speed:56, dir:-1, size:40, icons:["wp","figma","mc","gpt","claude"] }
      ];
    }
    return [
      { rx:230, ry:92,  rotate:-13, speed:34, dir:1,  size:54, icons:["ga","gads","yt","sr"] },
      { rx:270, ry:138, rotate:11,  speed:50, dir:-1, size:54, icons:["meta","ig","fb","li"] },
      { rx:172, ry:74,  rotate:24,  speed:26, dir:1,  size:48, icons:["canva","cap","brevo"] },
      { rx:298, ry:56,  rotate:-28, speed:60, dir:-1, size:48, icons:["wp","figma","mc","gpt","claude"] }
    ];
  }

  var ringsBackEl = document.getElementById("ringsBack");
  var ringsFrontEl = document.getElementById("ringsFront");
  var iconsLayerEl = document.getElementById("iconsLayer");
  var orbitEl = document.getElementById("heroOrbit");

  var activeIcons = [];
  var tickerAttached = false;

  function buildOrbit(){
    ringsBackEl.innerHTML = "";
    ringsFrontEl.innerHTML = "";
    iconsLayerEl.innerHTML = "";
    activeIcons = [];

    var ringConfigs = pickRings();

    ringConfigs.forEach(function(ring, ringIndex){
      // back ring (full ellipse, sits behind the portrait)
      var back = document.createElement("div");
      back.className = "ring ring--back" + (ringIndex % 2 ? " ring--red" : "");
      back.style.width = (ring.rx*2) + "px";
      back.style.height = (ring.ry*2) + "px";
      back.style.transform = "translate(-50%,-50%) rotate(" + ring.rotate + "deg)";
      ringsBackEl.appendChild(back);

      // front ring (bottom-half arc only, sits in front of the portrait)
      var front = document.createElement("div");
      front.className = "ring ring--front" + (ringIndex % 2 ? " ring--red" : "");
      front.style.width = (ring.rx*2) + "px";
      front.style.height = (ring.ry*2) + "px";
      front.style.clipPath = "inset(50% 0 0 0)";
      front.style.transform = "translate(-50%,-50%) rotate(" + ring.rotate + "deg)";
      ringsFrontEl.appendChild(front);

      var count = ring.icons.length;
      ring.icons.forEach(function(key, i){
        var el = iconEl(key, ring.size);
        iconsLayerEl.appendChild(el);
        activeIcons.push({
          el: el,
          rx: ring.rx, ry: ring.ry,
          rotateRad: ring.rotate * Math.PI / 180,
          speed: ring.speed,
          dir: ring.dir,
          offset: (i / count) * Math.PI * 2 + ringIndex * 0.6
        });
      });
    });

    positionIcons(0);
  }

  function positionIcons(elapsed){
    for (var idx = 0; idx < activeIcons.length; idx++){
      var ic = activeIcons[idx];

      var angle =
        (elapsed * (Math.PI * 2 / ic.speed) * ic.dir) + ic.offset;

      var lx = ic.rx * Math.cos(angle);
      var ly = ic.ry * Math.sin(angle);

      var cos = Math.cos(ic.rotateRad);
      var sin = Math.sin(ic.rotateRad);

      var x = lx * cos - ly * sin;
      var y = lx * sin + ly * cos;

      // -1 = furthest behind, +1 = closest to the viewer.
      var depth = Math.sin(angle);

      // Portrait is the true center layer.
      // Icons behind it use z-index 6; icons in front use z-index 20.
      var isFront = depth > 0.08;
      var z = isFront ? 20 : 6;

      var frontAmount = (depth + 1) / 2;
      var scale = 0.74 + frontAmount * 0.42;
      var opacity = 0.52 + frontAmount * 0.48;
      var tilt = depth * 4.5;

      ic.el.classList.toggle("is-front", isFront);
      ic.el.classList.toggle("is-back", !isFront);

      ic.el.style.transform =
        "translate(-50%,-50%) " +
        "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) " +
        "translateZ(" + (depth * 18).toFixed(1) + "px) " +
        "rotateZ(" + tilt.toFixed(2) + "deg) " +
        "scale(" + scale.toFixed(3) + ")";

      ic.el.style.opacity = opacity.toFixed(2);
      ic.el.style.zIndex = z;
    }
  }

  var startTime = null;
  function tick(){
    var now = performance.now() / 1000;
    if (startTime === null) startTime = now;
    positionIcons(now - startTime);
  }

  function startOrbitLoop(){
    if (reduceMotion || tickerAttached) return;
    tickerAttached = true;
    if (hasGsap){ gsap.ticker.add(tick); return; }
    (function raf(){ tick(); window.requestAnimationFrame(raf); })();
  }

  buildOrbit();

  var resizeTimer;
  window.addEventListener("resize", function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      startTime = null;
      buildOrbit();
    }, 220);
  });

  /* =========================================================
     HEADER — scrolled glass state
     ========================================================= */
  var header = document.getElementById("siteHeader");
  function onScroll(){
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  /* =========================================================
     MOBILE NAV
     ========================================================= */
  var burgerBtn = document.getElementById("burgerBtn");
  var closeBtn = document.getElementById("mobileCloseBtn");
  var mobileNav = document.getElementById("mobileNav");
  var scrim = document.getElementById("navScrim");
  var mnavLinks = mobileNav.querySelectorAll(".mnav-link");
  var menuOpen = false;
  var lastMenuFocus = null;

  var mnavTl = hasGsap ? gsap.timeline({ paused:true })
    .set(mobileNav, { visibility:"visible" })
    .to(scrim, { autoAlpha:1, duration:.3 }, 0)
    .to(mobileNav, { xPercent:0, duration:.45, ease:"power3.out" }, 0)
    .from(mnavLinks, { autoAlpha:0, x:24, duration:.4, stagger:.05, ease:"power2.out" }, .12) : null;

  if (hasGsap){
    gsap.set(mobileNav, { xPercent:100 });
    gsap.set(scrim, { autoAlpha:0 });
  }

  function openMenu(){
    lastMenuFocus = document.activeElement;
    menuOpen = true;
    burgerBtn.setAttribute("aria-expanded","true");
    mobileNav.setAttribute("aria-hidden","false");
    if (mnavTl) mnavTl.timeScale(1).play();
    else { mobileNav.classList.add("is-open"); scrim.classList.add("is-open"); }
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeMenu(){
    menuOpen = false;
    burgerBtn.setAttribute("aria-expanded","false");
    mobileNav.setAttribute("aria-hidden","true");
    if (mnavTl) mnavTl.timeScale(1.4).reverse();
    else { mobileNav.classList.remove("is-open"); scrim.classList.remove("is-open"); }
    document.body.style.overflow = "";
    if (lastMenuFocus && typeof lastMenuFocus.focus === "function") lastMenuFocus.focus();
    else burgerBtn.focus();
    lastMenuFocus = null;
  }
  burgerBtn.addEventListener("click", function(){ menuOpen ? closeMenu() : openMenu(); });
  closeBtn.addEventListener("click", closeMenu);
  scrim.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function(e){
    if (!menuOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    var focusable = mobileNav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  mnavLinks.forEach(function(a){ a.addEventListener("click", closeMenu); });

  /* =========================================================
     ENTRANCE TIMELINE
     ========================================================= */
  var nameLines = document.querySelectorAll("#heroName .line");

  /* SplitText: one instance per .line, so each line keeps its own overflow mask.
     nameChars falls back to the whole lines if SplitText is unavailable, which
     keeps the original line-level reveal working rather than failing open. */
  var nameSplits = [];
  var nameChars = nameLines;
  if (hasGsap && typeof SplitText !== "undefined" && nameLines.length){
    try{
      nameSplits = Array.prototype.map.call(nameLines, function(line){
        return SplitText.create(line, { type:"chars", charsClass:"hero-char", aria:"auto" });
      });
      var collected = [];
      nameSplits.forEach(function(s){ collected = collected.concat(s.chars); });
      if (collected.length) nameChars = collected;
    }catch(err){
      console.error("[portfolio] hero SplitText failed, falling back to line reveal:", err);
      nameChars = nameLines;
    }
  }

  if (!hasGsap){
    startOrbitLoop();                      /* no GSAP: content is already visible */
  } else if (reduceMotion){
    gsap.set(["#heroName .line", "#heroRole", "#heroBadge", "#orbitPortrait", ".ring", ".icon-badge"], { opacity:1, clearProps:"transform" });
    startOrbitLoop();
  } else {
    /*
     * HERO SYNC:
     * The name and orbital ecosystem are choreographed from the same
     * master timeline. The orbit does not appear as an unrelated animation.
     * Name reveal -> orbit rings -> portrait -> tools -> continuous motion.
     */
    var entrance = gsap.timeline({ defaults:{ ease:"power3.out" } });

    // Initial hidden states are explicit so the sequence is deterministic.
    gsap.set(["#heroName .line", "#heroRole", "#heroBadge"], { willChange:"transform,opacity" });
    gsap.set(["#orbitPortrait", ".ring", ".icon-badge"], { willChange:"transform,opacity" });

    entrance
      // 0.00 — background establishes the scene
      .from(".hero-bg", { opacity:0, duration:1.0, ease:"power2.out" })

      // 0.18 — header enters
      .from(header, { y:-30, opacity:0, duration:.55 }, "-=0.72")

      // 0.55 — NAME begins, now character by character inside the line masks.
      .from(nameChars, {
        yPercent:120,
        opacity:0,
        duration:.78,
        stagger: nameChars === nameLines ? .08 : .022,
        ease:"expo.out"
      }, "-=0.20")

      // Start orbit motion while the name is still revealing.
      .call(startOrbitLoop, [], "-=0.48")

      .from(".ring", {
        opacity:0,
        scale:.72,
        transformOrigin:"50% 50%",
        duration:.68,
        stagger:.045,
        ease:"power3.out"
      }, "-=0.56")

      // 0.95 — portrait and title enter together.
      .from("#orbitPortrait", {
        opacity:0,
        scale:.78,
        y:18,
        duration:.68,
        ease:"power3.out"
      }, "-=0.54")
      .from("#heroRole", {
        y:18,
        opacity:0,
        duration:.62,
        ease:"power3.out"
      }, "-=0.72")

      // 1.25 — orbital tools populate as the experience badge arrives.
      .from(".icon-badge", {
        opacity:0,
        scale:.35,
        duration:.36,
        stagger:.025,
        ease:"back.out(1.45)"
      }, "-=0.42")
      .from("#heroBadge", {
        y:24,
        opacity:0,
        scale:.92,
        duration:.62,
        ease:"power3.out"
      }, "-=0.62")

      // Final beat — scroll cue and orbital loop start together.
.add(function(){
        // Start the continuous orbital motion only after the visual system
        // has completed its entrance, keeping the intro perfectly readable.
        startOrbitLoop();
      });

    /* Insurance: name/portrait/nav can never stay invisible if rAF stalls
       (backgrounded tab, throttled device, bfcache restore, etc.) — mirrors
       the fallback pattern used in the Experience section. */
    var heroRevealed = false;
    entrance.eventCallback("onComplete", function(){ heroRevealed = true; });
    setTimeout(function(){
      if(heroRevealed) return;
      entrance.progress(1);
      heroRevealed = true;
    }, 4000);
  }
  if (reduceMotion && hasGsap){
    gsap.set(["#heroName .line", "#heroRole", "#heroBadge", "#orbitPortrait", ".ring", ".icon-badge"], {
      opacity:1,
      clearProps:"transform"
    });
  }

  /* Synchronized ambient beat after the entrance. */
  if (!reduceMotion && hasGsap){
    gsap.timeline({ repeat:-1, repeatDelay:1.2, delay:entrance.duration() + 0.3 })
      .to("#heroName .line.accent", {
        opacity:.78,
        duration:1.05,
        ease:"sine.inOut"
      })
      .to("#heroName .line.accent", {
        opacity:1,
        duration:1.05,
        ease:"sine.inOut"
      }, "<")
      .to("#orbitPortrait", {
        scale:1.012,
        duration:1.05,
        ease:"sine.inOut"
      }, "<")
      .to("#orbitPortrait", {
        scale:1,
        duration:1.05,
        ease:"sine.inOut"
      });
  }

  /* subtle ambient float on the badge */
  if (!reduceMotion && hasGsap){
    gsap.to("#heroBadge", { y:-8, duration:2.6, ease:"sine.inOut", yoyo:true, repeat:-1, delay:2.4 });
  }

  /* =========================================================
     SCROLL EXIT
     ========================================================= */
  if (!reduceMotion && hasGsap){
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.6
      }
    })
    .to("#heroBgImg", { opacity:0.12, scale:1.12, y:-30, ease:"none" }, 0)
    .to(".hero-bg__wash", { opacity:0.4, ease:"none" }, 0)
    .to(["#heroName", "#heroRole"], { y:-70, opacity:0, ease:"none" }, 0)
    .to("#heroBadge", { y:-40, opacity:0, ease:"none" }, 0.05)
    .to("#orbitPortrait", { y:-60, opacity:0, scale:.85, ease:"none" }, 0.02)
    .to([ringsBackEl.children, ringsFrontEl.children], { opacity:0, y:-30, ease:"none" }, 0)
    .to(".icon-badge", { opacity:0, y:-90, stagger:{ each:0.015, from:"random" }, ease:"none" }, 0)
    .to("#heroOrbit", { scale:.92, ease:"none" }, 0);
  }
}

