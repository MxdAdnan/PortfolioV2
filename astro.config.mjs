// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /* GitHub Pages project site: https://mxdadnan.github.io/PortfolioV2/
     `base` is load-bearing. Astro rewrites paths in its own bundled assets, but
     NOT the root-relative "/assets/..." strings that live in plain HTML
     attributes and inside the projects data array -- those are handled
     explicitly (see src/lib/base.ts and the normaliser in src/scripts/projects.js).
     If this repo is ever renamed, change `base` here and nowhere else. */
  site: 'https://mxdadnan.github.io',
  base: '/PortfolioV2/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
