/* The ported ES5 modules reference these as bare globals (see gsap.ts). */
declare const gsap: typeof import('gsap').gsap;
declare const ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
declare const ScrollSmoother: typeof import('gsap/ScrollSmoother').ScrollSmoother;
declare const SplitText: typeof import('gsap/SplitText').SplitText;
declare const Flip: typeof import('gsap/Flip').Flip;

interface Window {
  __portfolioRunImpactCounters?: () => void;
  __smoother?: import('gsap/ScrollSmoother').ScrollSmoother | null;
}
