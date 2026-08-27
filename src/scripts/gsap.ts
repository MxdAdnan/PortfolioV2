/* Single registration site for GSAP and its plugins.
 *
 * LICENSING: since GSAP 3.13 every formerly-Club plugin -- SplitText,
 * ScrollSmoother, Flip -- ships in the public `gsap` package, free for
 * commercial use. There is no member package, auth token or private registry.
 * ("@gsap/member-plugins" does not exist.)
 *
 * The 14 ported modules were written against CDN script tags, so they reference
 * bare `gsap` and `ScrollTrigger` globals and guard with
 * `typeof gsap === "undefined"`. Rather than rewrite 4,700 lines of working
 * code, the instances are published onto globalThis here. ES module imports are
 * evaluated before any importing module's body runs, so the globals are in place
 * before the first init function executes.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

/* MorphSVG, DrawSVG and MotionPath are deliberately not imported.
   CustomEase is, so that JS-driven reveals can reuse the EXACT cubic-beziers
   already defined as --ease-soft / --ease-premium in tokens.css rather than
   approximating them with power2.out. */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase);

/* Mirrors :root{--ease-soft} and {--ease-premium} in src/styles/tokens.css. */
CustomEase.create('easeSoft', '.22,.61,.36,1');
CustomEase.create('easePremium', '.16,.84,.32,1');

/* Kept from the source (line 11046): stops the mobile URL bar collapsing from
   triggering a ScrollTrigger refresh storm. */
ScrollTrigger.config({ ignoreMobileResize: true });

Object.assign(globalThis as Record<string, unknown>, {
  gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase,
});

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, CustomEase };
