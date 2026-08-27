/* ScrollSmoother — must be created BEFORE any other ScrollTrigger, so that every
 * later trigger measures against the smoothed scroller rather than the native one.
 *
 * Skipped entirely under prefers-reduced-motion: the page then uses native scroll
 * and every ported ScrollTrigger continues to work unchanged.
 */
import { ScrollSmoother } from './gsap';

export function initSmoother(): void {
  const wrapper = document.getElementById('smooth-wrapper');
  const content = document.getElementById('smooth-content');
  if (!wrapper || !content) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.__smoother = null;
    return;
  }

  /* base.css sets html{scroll-behavior:smooth} for the native anchor jumps.
     Left in place it fights ScrollSmoother's own tweening and produces a
     double-easing stutter on nav clicks, so it is disabled only while the
     smoother is actually running. */
  document.documentElement.style.scrollBehavior = 'auto';

  window.__smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1.1,
    effects: true,
    normalizeScroll: false,   // would swallow the modals' own scroll locking
  });
}
