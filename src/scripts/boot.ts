/* Entry point. Replaces boot() from "Adnan Main Portfolio.html" lines 11884-11920.
 *
 * The try/catch isolation is kept exactly as the original had it: one failing
 * section must never blank the rest of the page. */
import './gsap';                    // registers plugins + publishes globals first
import { initSmoother } from './smoother';

import { initHero } from './hero';
import { initImpactCounters } from './impact';
import { initProjects } from './projects';
import { initCaseStudies } from './caseStudies';
import { initMarketingTools } from './marketingTools';
import { initExperience } from './experience';
import { initAbout } from './about';
import { initGithubCard } from './githubCard';
import { initLinkedInBadge } from './linkedInBadge';
import { initCta } from './cta';
import { initContact } from './contact';
import { initFooter } from './footer';
import { initSharedObserver } from './reveal';
import { initNav } from './nav';
import { initStagger } from './stagger';

function boot(): void {
  const steps: Array<[string, () => void]> = [
    ['initSmoother',         initSmoother],   // must run before any ScrollTrigger
    ['initHero',             initHero],
    ['initImpactCounters',   initImpactCounters],
    ['initProjects',         initProjects],
    ['initCaseStudies',      initCaseStudies],
    ['initMarketingTools',   initMarketingTools],
    ['initExperience',       initExperience],
    ['initAbout',            initAbout],
    ['initGithubCard',       initGithubCard],
    ['initLinkedInBadge',    initLinkedInBadge],
    ['initCta',              initCta],
    ['initContact',          initContact],
    ['initFooter',           initFooter],
    ['initSharedObserver',   initSharedObserver],
    ['initNav',              initNav],
    /* Last: the grids it batches must already be in the DOM (the case-study and
       project cards are rendered by the init functions above). */
    ['initStagger',          initStagger],
  ];

  for (const [name, fn] of steps) {
    try { fn(); }
    catch (err) { console.error('[portfolio] ' + name + ' failed:', err); }
  }

  /* One refresh after fonts/images settle so every ScrollTrigger start marker is
     measured against the final merged page height, not a stale one. */
  const refresh = () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); };
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
