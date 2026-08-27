# Mohammed Adnan — Portfolio (v2)

Astro + Tailwind + GSAP rebuild of a single-file HTML portfolio.

**Live:** https://mxdadnan.github.io/PortfolioV2/

## Why this rebuild

The original was one 12.4 MB `.html` file. About 12.0 MB of that was base64 image
data inlined into the markup — every visitor downloaded ~9 MB of decoded image
bytes as render-blocking HTML before anything painted, with no lazy-loading and
nothing cacheable.

| | before | after |
|---|---|---|
| Initial HTML | 11.87 MB | **77 KB** |
| CSS | inline | 117 KB, cached |
| JS (incl. GSAP + plugins) | 2 CDN tags | 293 KB / 98 KB gzip |
| Images | 88 base64 URIs | 66 files, lazy + cacheable |

The 87 WebP payloads were written to disk byte-for-byte — no re-encoding. Hash
deduplication collapsed them to 65 unique files (22 `thumbnail` fields were
byte-identical to a sibling `src`). Only the single hero-portrait JPEG was
converted, to WebP.

## Migration constraints

The port was mechanical and verified by measurement, not inspection:

- **CSS is byte-identical** to the source — all 5,152 non-blank lines, split into
  `src/styles/` by the file's own section banners. Tokens, including the
  duplicated `--mt-*` / `--exp-*` aliases, are untouched.
- **Markup and scripts** were split by explicit line ranges with zero unaccounted
  non-blank lines. Class names, ids and `data-*` attributes are load-bearing for
  the ported scripts.
- **Rendered text** is the same 1,184-word multiset as the original.

Tailwind is additive: preflight is deliberately **not** imported, so its reset can
never fight the ported one. The portfolio CSS is imported unlayered, which keeps
it above every Tailwind utility in the cascade.

## Animation

GSAP 3.15 with ScrollTrigger, ScrollSmoother, SplitText, Flip and CustomEase.

Since GSAP 3.13 every formerly-Club plugin ships in the public `gsap` package,
free for commercial use — there is no member package, auth token or private
registry involved.

- **Hero** — SplitText chars inside the existing `.line-wrap` overflow masks
- **Impact counters** — GSAP ticker count-up on scroll entry
- **Projects filters** — Flip, with new cards handled separately from survivors
- **Card grids** — `ScrollTrigger.batch` stagger, replacing CSS `nth-child`
  delays that capped at 6 (the grid paginates past that, so later cards used to
  fade in all at once)
- **Experience timeline** — scrubbed ScrollTrigger on the SVG stroke

`prefers-reduced-motion` is honoured throughout; ScrollSmoother is skipped
entirely under it.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/PortfolioV2/
npm run build
```

`npm run extract` re-runs the base64 extraction. It expects the original
`Adnan Main Portfolio.html` one directory above the repo; that file is not
committed here.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

`base` is set to `/PortfolioV2/` in `astro.config.mjs`. It is load-bearing: Astro
rewrites its own bundle paths, but the `/assets/...` strings in the markup and in
the projects data are rewritten by `src/lib/base.ts` instead. **If this repo is
renamed, change `base` and nothing else.**
