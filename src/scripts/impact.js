/* Ported from "Adnan Main Portfolio.html" lines 7687-7742.
 *
 * CHANGED: the hand-rolled requestAnimationFrame loop is replaced by GSAP's
 * ticker (gsap.to on a proxy object). Behaviour deliberately preserved:
 *   - the 200000 -> "200K" formatting branch
 *   - the .suffix / .plus child spans are left in place; only the bare text
 *     node inside .number is animated
 *   - counters never run on page load, only on scroll entry, and only once
 *   - the 110ms cascade between the six metrics
 *
 * Still driven by the shared IntersectionObserver at ratio >= .28 via
 * window.__portfolioRunImpactCounters, because that observer also owns the
 * section's .is-visible entrance choreography in impact.css.
 */
import { gsap } from './gsap';

export function initImpactCounters(){
  const section = document.querySelector("#marketing-impact");
  if(!section) return;

  const metrics = [...section.querySelectorAll(".metric[data-target]")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function format(target, value){
    return target === 200000 ? Math.round(value / 1000) + "K" : String(Math.floor(value));
  }

  function animateCounter(metric){
    if(metric.dataset.counted === "true") return;

    const target = Number(metric.dataset.target);
    const number = metric.querySelector(".number");
    if(!number) return;

    // Keep the existing suffix/plus markup but animate only the numeric text.
    let valueNode = [...number.childNodes].find(node => node.nodeType === 3);
    if(!valueNode){
      valueNode = document.createTextNode("0");
      number.insertBefore(valueNode, number.firstChild);
    }

    metric.dataset.counted = "true";

    if(reduced){
      valueNode.nodeValue = format(target, target);
      return;
    }

    const proxy = { value: 0 };
    gsap.to(proxy, {
      value: target,
      duration: 1.5,
      ease: "power3.out",              // matches the original 1-(1-t)^3 easing
      onUpdate(){ valueNode.nodeValue = format(target, proxy.value); },
      onComplete(){ valueNode.nodeValue = format(target, target); }
    });
  }

  /* Triggered by the shared IntersectionObserver at ratio >= .28 — never on load. */
  window.__portfolioRunImpactCounters = function(){
    metrics.forEach((metric, index) => {
      gsap.delayedCall(index * 0.11, () => animateCounter(metric));
    });
  };
}
