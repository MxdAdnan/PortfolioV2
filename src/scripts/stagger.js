/* ScrollTrigger staggered fade-up for card grids.  (NEW — not in the source file.)
 *
 * WHY THIS EXISTS
 * The source staggers cards with CSS nth-child animation-delay rules, but those
 * rules stop at a fixed index:
 *   projects.css  caps at .project-card:nth-child(6)
 *   services.css  caps at .svc-card:nth-child(10)
 * The archive paginates at pageSize 6 and "Load More" appends another 6, so from
 * card 7 onward every card inherits animation-delay:0 and they all fade in on the
 * same frame -- the "stacking" this replaces. ScrollTrigger.batch staggers any
 * number of cards, so the cascade survives pagination.
 *
 * .svc-card is deliberately NOT taken over: there are exactly 10 of them, the cap
 * is never exceeded, and services.css drives an intricate enter/exit/restart
 * choreography (.is-visible / .is-exiting / data-io-restart) that works today.
 *
 * .metric, .b2b-flow-node and .exp-item are also left alone -- each already has
 * its own bespoke motion (counter cascade, b2bReveal, timeline scrub).
 */
import { gsap, ScrollTrigger } from './gsap';

const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FROM = { opacity: 0, y: 28, scale: 0.985 };
const TO = { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'easeSoft', overwrite: 'auto' };

/* Grids that have NO entrance animation of their own in the ported CSS. */
const GRIDS = [
  { sel: '.fcs__list > .fcs__thumb-card', stagger: 0.08 },
  { sel: '.btp-grid > .btp-card',         stagger: 0.10 },
  { sel: '.mt-toolbox__tools > .mt-chip', stagger: 0.02, from: { opacity: 0, y: 14, scale: 0.97 } },
];

/* Safety net, mirroring the data-io-safety / .no-anim contract in the source.
   Anything hidden by gsap.set() must have a guaranteed path back to visible: if
   the trigger never fires -- observer starved in a background tab, a layout that
   never reaches the start position, a refresh that mismeasures -- the content
   must not be stranded at opacity:0. Matches the 2500ms the markup already uses. */
const SAFETY_MS = 2500;

/* IMPORTANT: only rescue cards that SHOULD already have revealed -- i.e. their
   top has entered the viewport but they are still hidden. A blanket sweep would
   force-reveal everything below the fold a couple of seconds after load, so by
   the time the reader scrolled down the cards would already be visible and the
   stagger would never play. Re-checked on an interval rather than once, because
   an element can reach the trigger point at any time. */
function safetyNet(elements) {
  let checks = 0;
  const timer = window.setInterval(() => {
    const live = elements.filter(el => el.isConnected);
    if (!live.length || ++checks > 40) { window.clearInterval(timer); return; }

    const stranded = live.filter(el => {
      if (parseFloat(getComputedStyle(el).opacity) >= 0.01) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92;   // matches the batch start
    });

    if (stranded.length) {
      gsap.to(stranded, { ...TO, stagger: 0.06 });
    }
    if (live.every(el => parseFloat(getComputedStyle(el).opacity) >= 0.01)) {
      window.clearInterval(timer);
    }
  }, SAFETY_MS);
}

function batch(elements, stagger, fromVars) {
  if (!elements.length) return;
  gsap.set(elements, fromVars || FROM);
  ScrollTrigger.batch(elements, {
    start: 'top 92%',
    once: true,
    onEnter: b => gsap.to(b, { ...TO, stagger }),
  });
  safetyNet(elements);
}

/* Called after every renderProjects(), because the grid is rebuilt from scratch
   (grid.innerHTML = "") on each filter, page change and Load More. */
export function staggerProjectCards() {
  if (REDUCED()) return;
  const cards = [...document.querySelectorAll('#projectsGrid > .project-card')];
  if (!cards.length) return;
  /* Neutralise the capped CSS keyframe so it cannot double-run against GSAP. */
  cards.forEach(c => { c.style.animation = 'none'; });
  batch(cards, 0.08);
}

export function initStagger() {
  if (REDUCED()) return;
  document.documentElement.classList.add('gsap-motion');
  for (const g of GRIDS) batch([...document.querySelectorAll(g.sel)], g.stagger, g.from);
}
