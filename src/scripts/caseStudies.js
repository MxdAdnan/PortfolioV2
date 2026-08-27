/* Ported verbatim from "Adnan Main Portfolio.html" lines 10416-10921.
   Only edit: 'export' added to the initCaseStudies declaration. */
export function initCaseStudies(){
  "use strict";

  /* ------------------------------------------------------------------
     DATA
     Every field below is derived from the original case-study source
     (challenge / strategy / execution / result). Nothing is invented:
     where a client, industry or metric was never stated, the field is
     explicitly marked unavailable rather than filled in.
     ------------------------------------------------------------------ */
  const REF_CAPTION = "Reference visual — illustrative of the work type, not a client screenshot.";

  const data = [
    {
      num:"01",
      category:"Lead generation campaigns",
      title:"High-intent B2B demand",
      summary:"A paid acquisition programme built around audience quality rather than reach — narrowing to decision-makers and letting performance data drive every round of refinement.",
      meta:[
        {k:"Client",v:"Not disclosed",na:true},
        {k:"Industry",v:"B2B technology"},
        {k:"Role",v:"Campaign strategy & management"},
        {k:"Focus",v:"Qualified lead generation"}
      ],
      challenge:"Reach qualified technology buyers without wasting spend on low-intent audiences.",
      objective:"Concentrate budget on decision-makers who are genuinely in-market, and keep improving the audience definition as data comes in.",
      strategy:"Segment decision-makers, align campaign messaging to the offer and use performance data to refine targeting.",
      execution:"Paid social campaigns, campaign creatives, audience targeting and ongoing optimization.",
      tools:["Paid social campaigns","Audience segmentation","Campaign creative","Performance analytics"],
      toolsNote:"Specific ad platforms not disclosed",
      metrics:[],
      result:"High-intent B2B leads generated through targeted paid campaigns.",
      resultFlag:"No published performance figures for this project. The outcome above is qualitative — spend, cost per lead and volume are not disclosed.",
      learning:"Audience precision did more work than budget size. Tightening who the campaign spoke to, then letting performance data reshape that definition, kept spend on in-market buyers.",
      link:null,
      images:[
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
      ],
      captions:[
        "Campaign planning context — reference visual.",
        "Performance review setting — reference visual.",
        "Analytics dashboard reference — not project data.",
        "Reporting workflow — reference visual.",
        "Audience research context — reference visual.",
        "Team collaboration context — reference visual."
      ]
    },
    {
      num:"02",
      category:"SEO growth",
      title:"Organic visibility that compounds",
      summary:"A technical-plus-content SEO programme where the foundations were fixed first, then keyword targeting and analytics kept the gains compounding month over month.",
      meta:[
        {k:"Client",v:"Not disclosed",na:true},
        {k:"Industry",v:"Not specified",na:true},
        {k:"Role",v:"SEO strategy & execution"},
        {k:"Focus",v:"Organic search growth"}
      ],
      challenge:"Improve search visibility while strengthening the technical and content foundations of the website.",
      objective:"Grow organic visibility on a site that can actually support it — fixing the technical base before pushing for rankings.",
      strategy:"Combine technical SEO, keyword targeting, on-page optimization and analytics-led iteration.",
      execution:"Search Console and GA4 analysis, content optimization, technical fixes, keyword monitoring and reporting.",
      tools:["Google Search Console","GA4","Technical SEO","On-page optimization","Keyword monitoring"],
      toolsNote:null,
      metrics:[
        {v:"30%+",l:"Organic growth achieved through ongoing SEO optimization",src:"Reported by project owner"}
      ],
      result:"30%+ organic growth achieved through ongoing SEO optimization.",
      resultFlag:"Figure as stated in the project record. Timeframe, baseline traffic and traffic source breakdown are not published here.",
      learning:"Technical fixes set the ceiling; content and keyword work decided how quickly the site reached it. Analytics-led iteration is what kept the curve moving rather than flattening.",
      link:null,
      images:[
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
      ],
      captions:[
        "Search analytics context — reference visual, not Search Console data.",
        "Reporting review — reference visual.",
        "Traffic analysis context — reference visual.",
        "Keyword research setting — reference visual.",
        "Content planning — reference visual.",
        "Performance discussion — reference visual."
      ]
    },
    {
      num:"03",
      category:"Web development",
      title:"Experiences built to move visitors",
      summary:"A build where UX structure, responsive development and SEO foundations were treated as one job — so the site loads well, reads clearly and gives visitors an obvious next step.",
      meta:[
        {k:"Client",v:"Not disclosed",na:true},
        {k:"Industry",v:"Not specified",na:true},
        {k:"Role",v:"Web development & technical SEO"},
        {k:"Focus",v:"Conversion-focused website"}
      ],
      challenge:"Turn a business proposition into a fast, responsive digital experience with clear conversion paths.",
      objective:"Give the proposition a site that holds up on any device and guides visitors toward a single clear action.",
      strategy:"Combine UX structure, responsive development, SEO foundations and performance-conscious implementation.",
      execution:"Website architecture, WordPress/Elementor implementation, responsive UI, technical SEO and optimization.",
      tools:["WordPress","Elementor","Responsive UI","Technical SEO","Site architecture"],
      toolsNote:null,
      metrics:[],
      result:"Conversion-focused website built with responsive UX and SEO foundations.",
      resultFlag:"No published performance figures for this project. Conversion rate, traffic and speed scores are not disclosed.",
      learning:"Structure decided the outcome. Settling architecture and conversion paths before build kept the SEO and responsive work from becoming retrofits.",
      link:null,
      images:[
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80"
      ],
      captions:[
        "Development context — reference visual, not the delivered site.",
        "Responsive layout reference — illustrative only.",
        "Interface design context — reference visual.",
        "Front-end build context — reference visual.",
        "Implementation workflow — reference visual.",
        "Code review context — reference visual."
      ]
    },
    {
      num:"04",
      category:"LinkedIn marketing",
      title:"Targeting the right decision-makers",
      summary:"A LinkedIn programme aimed at a narrow B2B technology audience, using job-function and geography signals plus creative testing to build qualified attention rather than raw reach.",
      meta:[
        {k:"Client",v:"Not disclosed",na:true},
        {k:"Industry",v:"B2B technology"},
        {k:"Role",v:"Paid social strategy & optimization"},
        {k:"Focus",v:"Awareness & qualified engagement"}
      ],
      challenge:"Build awareness and qualified engagement within a focused B2B technology audience.",
      objective:"Put the message in front of a defined set of decision-makers and keep refining creative against live performance.",
      strategy:"Combine audience signals, job-function targeting, geography and campaign creative.",
      execution:"LinkedIn Campaign Manager setup, audience targeting, creative testing, performance monitoring and optimization.",
      tools:["LinkedIn Campaign Manager","Job-function targeting","Geo targeting","Creative testing","Performance monitoring"],
      toolsNote:null,
      metrics:[
        {v:"83K+",l:"Impressions generated through targeted B2B LinkedIn campaigns",src:"Reported by project owner"}
      ],
      result:"83K+ impressions generated through targeted B2B LinkedIn campaigns.",
      resultFlag:"Impressions as stated in the project record. Click-through rate, engagement rate, spend and lead volume are not published here.",
      learning:"Impressions only counted because the audience was narrow. Job-function and geography filters kept delivery inside the intended buyer set instead of chasing cheaper, broader reach.",
      link:null,
      images:[
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
      ],
      captions:[
        "Campaign strategy context — reference visual.",
        "Audience planning — reference visual.",
        "Creative review setting — reference visual.",
        "Performance monitoring context — reference visual, not campaign data.",
        "Optimization workflow — reference visual.",
        "Reporting context — reference visual."
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  const section  = document.getElementById("featured-case-studies");
  const modal    = document.getElementById("fcsModal");
  const list     = document.getElementById("fcsList");
  if(!section || !modal || !list) return;

  const shell    = document.getElementById("fcsShell");
  const mainWrap = document.getElementById("fcsMainWrap");
  const mainImg  = document.getElementById("fcsModalMainImage");
  const thumbs   = document.getElementById("fcsModalThumbs");
  const closeBtn = modal.querySelector(".fcs-modal__close");

  const el = {
    num:        document.getElementById("fcsModalNum"),
    category:   document.getElementById("fcsModalCategory"),
    title:      document.getElementById("fcsModalTitle"),
    summary:    document.getElementById("fcsModalSummary"),
    meta:       document.getElementById("fcsModalMeta"),
    challenge:  document.getElementById("fcsModalChallenge"),
    objective:  document.getElementById("fcsModalObjective"),
    strategy:   document.getElementById("fcsModalStrategy"),
    execution:  document.getElementById("fcsModalExecution"),
    tools:      document.getElementById("fcsModalTools"),
    metrics:    document.getElementById("fcsModalMetrics"),
    result:     document.getElementById("fcsModalResult"),
    resultFlag: document.getElementById("fcsModalResultFlag"),
    learning:   document.getElementById("fcsModalLearning"),
    caption:    document.getElementById("fcsModalCaption"),
    galCount:   document.getElementById("fcsGalCount"),
    link:       document.getElementById("fcsModalLink"),
    disclaimer: document.getElementById("fcsModalDisclaimer")
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canAnimate   = () => typeof gsap !== "undefined" && !reduceMotion.matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => (
    {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]
  ));

  /* ---------------- build cards ---------------- */
  data.forEach((item, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "fcs__thumb-card" + (i % 2 ? " fcs__thumb-card--reverse" : "");
    card.setAttribute("data-case", i);
    card.setAttribute("aria-label", `Open case study ${item.num}: ${item.title} — ${item.category}`);
    card.innerHTML = `
      <span class="fcs__thumb-image">
        <img src="${esc(item.images[0])}" alt="Reference visual for ${esc(item.category)} case study"
             loading="${i < 2 ? "eager" : "lazy"}" decoding="async">
      </span>
      <span class="fcs__thumb-overlay"></span>
      <span class="fcs__ref-chip">Reference visual</span>
      <span class="fcs__thumb-meta">
        <span class="fcs__thumb-rule">
          <span class="fcs__thumb-num">${esc(item.num)}</span>
          <span class="fcs__thumb-category">${esc(item.category)}</span>
        </span>
        <strong>${esc(item.title)}</strong>
        <span class="fcs__thumb-summary">${esc(item.summary)}</span>
        <span class="fcs__thumb-cta">Read the case study <i aria-hidden="true">→</i></span>
      </span>
      <span class="fcs__thumb-arrow" aria-hidden="true">↗</span>`;
    card.addEventListener("click", () => openCase(i, card));
    list.appendChild(card);
  });

  const cards = [...list.querySelectorAll(".fcs__thumb-card")];

  /* ---------------- gallery ---------------- */
  let current = null;
  let activeIndex = 0;

  function showImage(i, focusThumb){
    if(!current) return;
    const total = current.images.length;
    activeIndex = (i + total) % total;

    const src = current.images[activeIndex];
    const cap = current.captions[activeIndex] || REF_CAPTION;

    mainWrap.classList.remove("is-broken");
    mainWrap.classList.add("is-swapping");

    const pre = new Image();
    pre.onload = () => {
      mainImg.src = src;
      mainImg.alt = `${current.title} — reference visual ${activeIndex + 1} of ${total}`;
      mainWrap.classList.remove("is-swapping");
    };
    pre.onerror = () => {
      mainImg.removeAttribute("src");
      mainImg.alt = "";
      mainWrap.classList.remove("is-swapping");
      mainWrap.classList.add("is-broken");
    };
    pre.src = src;

    el.caption.textContent = cap;
    el.galCount.textContent = `${activeIndex + 1} / ${total}`;

    [...thumbs.children].forEach((b, bi) => {
      const on = bi === activeIndex;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    if(focusThumb && thumbs.children[activeIndex]) thumbs.children[activeIndex].focus();
  }

  function buildThumbs(item){
    thumbs.innerHTML = "";
    item.images.forEach((src, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcs-modal__thumb";
      btn.setAttribute("aria-label", `Show reference visual ${i + 1} of ${item.images.length}`);
      btn.setAttribute("aria-pressed", "false");
      btn.tabIndex = -1;
      const img = new Image();
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => { btn.style.opacity = ".25"; });
      btn.appendChild(img);
      btn.addEventListener("click", () => showImage(i, false));
      thumbs.appendChild(btn);
    });
  }
  thumbs.addEventListener("keydown", galleryKeys);

  function galleryKeys(e){
    if(e.key === "ArrowRight"){ e.preventDefault(); showImage(activeIndex + 1, true); }
    else if(e.key === "ArrowLeft"){ e.preventDefault(); showImage(activeIndex - 1, true); }
  }

  /* ---------------- report ---------------- */
  function renderReport(item){
    el.num.textContent      = item.num;
    el.category.textContent = item.category;
    el.title.textContent    = item.title;
    el.summary.textContent  = item.summary;
    el.challenge.textContent= item.challenge;
    el.objective.textContent= item.objective;
    el.strategy.textContent = item.strategy;
    el.execution.textContent= item.execution;
    el.result.textContent   = item.result;
    el.resultFlag.textContent = item.resultFlag;
    el.learning.textContent = item.learning;

    el.meta.innerHTML = item.meta.map(m => `
      <div><dt>${esc(m.k)}</dt><dd class="${m.na ? "is-na" : ""}">${esc(m.v)}</dd></div>
    `).join("");

    el.tools.innerHTML = item.tools.map(t => `<li>${esc(t)}</li>`).join("")
      + (item.toolsNote ? `<li class="is-note">${esc(item.toolsNote)}</li>` : "");

    el.metrics.innerHTML = item.metrics.map(m => `
      <div class="fcs-metric">
        <b>${esc(m.v)}</b>
        <span>${esc(m.l)}</span>
        <i>${esc(m.src)}</i>
      </div>`).join("");
    el.metrics.hidden = item.metrics.length === 0;

    if(item.link){
      el.link.href = item.link;
      el.link.hidden = false;
      el.link.target = "_blank";
      el.link.rel = "noopener noreferrer";
      el.disclaimer.textContent = "Figures shown are as recorded for this project; supporting evidence available on request.";
    }else{
      el.link.hidden = true;
      el.link.removeAttribute("href");
      el.disclaimer.textContent = "Live link not published for this project. Supporting evidence available on request.";
    }
  }

  /* ---------------- scroll lock ---------------- */
  let lockY = 0;
  function lockScroll(){
    lockY = window.scrollY || document.documentElement.scrollTop || 0;
    const sb = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if(sb > 0) document.body.style.paddingRight = sb + "px";
  }
  function unlockScroll(){
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    // scroll-behavior:smooth would animate (and clamp) the restore — force it instant
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, lockY);
    requestAnimationFrame(() => {
      window.scrollTo(0, lockY);
      document.documentElement.style.scrollBehavior = prev;
      if(typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  }

  /* ---------------- focus trap ---------------- */
  const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea';
  function trapFocus(e){
    if(e.key !== "Tab") return;
    const nodes = [...shell.querySelectorAll(FOCUSABLE)]
      .filter(n => n.offsetParent !== null && n.tabIndex !== -1);
    if(!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }

  /* ---------------- open / close ---------------- */
  let lastTrigger = null;
  let isOpen = false;

  function openCase(index, trigger){
    const item = data[index];
    if(!item || isOpen) return;

    current = item;
    lastTrigger = trigger || null;

    renderReport(item);
    buildThumbs(item);
    showImage(0, false);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll();
    modal.scrollTop = 0;
    isOpen = true;

    document.addEventListener("keydown", onKeydown, true);

    const reveals = [...shell.querySelectorAll("[data-reveal]")];
    if(canAnimate()){
      gsap.set(reveals, {clearProps:"all"});
      gsap.fromTo(shell,
        {opacity:0, y:26, scale:.985},
        {opacity:1, y:0, scale:1, duration:.4, ease:"power3.out"}
      );
      gsap.fromTo(reveals,
        {opacity:0, y:14},
        {opacity:1, y:0, duration:.34, ease:"power2.out", stagger:.035, delay:.1,
         onComplete(){ gsap.set(reveals, {clearProps:"all"}); }}
      );
    }
    // focus lands on close so the report is immediately dismissable
    requestAnimationFrame(() => closeBtn.focus());
  }

  function closeCase(){
    if(!isOpen) return;
    if(canAnimate()){
      gsap.to(shell, {
        opacity:0, y:16, scale:.985, duration:.22, ease:"power2.in",
        onComplete:finishClose
      });
    }else{
      finishClose();
    }
  }

  function finishClose(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if(typeof gsap !== "undefined") gsap.set(shell, {clearProps:"all"});
    isOpen = false;
    document.removeEventListener("keydown", onKeydown, true);
    unlockScroll();
    if(lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  function onKeydown(e){
    if(e.key === "Escape"){ e.preventDefault(); closeCase(); return; }
    trapFocus(e);
  }

  modal.querySelectorAll("[data-close]").forEach(n => n.addEventListener("click", closeCase));

  /* ---------------- entrance + parallax ---------------- */
  function initMotion(){
    if(typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    ScrollTrigger.getAll().forEach(t => { if(t.vars && t.vars.id && String(t.vars.id).startsWith("fcs")) t.kill(); });
    if(reduceMotion.matches){
      gsap.set([".fcs__header", ".fcs__thumb-card", ".fcs__thumb-image img"], {clearProps:"all"});
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".fcs__header", {
      opacity:0, y:28, duration:.65, ease:"power3.out",
      scrollTrigger:{id:"fcs-header", trigger:section, start:"top 80%", once:true}
    });

    cards.forEach(card => {
      const img = card.querySelector("img");

      gsap.fromTo(card,
        {opacity:0, y:38},
        {opacity:1, y:0, duration:.7, ease:"power3.out",
         scrollTrigger:{id:"fcs-card", trigger:card, start:"top 86%", once:true}}
      );

      gsap.fromTo(img,
        {yPercent:-2.5, scale:1.055},
        {yPercent:2.5, scale:1.03, ease:"none",
         scrollTrigger:{id:"fcs-par", trigger:card, start:"top bottom", end:"bottom top", scrub:1.1}}
      );
    });
  }

  initMotion();
  reduceMotion.addEventListener?.("change", initMotion);
  window.addEventListener("load", () => {
    if(typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
}

