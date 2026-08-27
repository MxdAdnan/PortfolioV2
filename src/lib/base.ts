/* Single source of truth for prefixing root-relative asset paths with Astro's
 * configured `base`.
 *
 * WHY: the site is served from https://mxdadnan.github.io/PortfolioV2/, but the
 * images extracted out of the original single-file portfolio are referenced as
 * "/assets/projects/<hash>.webp". Astro rewrites paths it owns (its own CSS/JS
 * bundles), but a string sitting in an HTML src attribute or inside the projects
 * data array is invisible to it, so those would resolve to
 * mxdadnan.github.io/assets/... and 404 in production while working fine in dev.
 *
 * Only "/assets/..." strings are touched. Remote URLs (Unsplash, LinkedIn,
 * company logos) must pass through untouched.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (typeof path !== 'string') return path;
  return path.startsWith('/assets/') ? BASE + path : path;
}

export { BASE };
