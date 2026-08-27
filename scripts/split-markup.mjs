/**
 * STEP 3 — split the body markup into .astro components.
 *
 * Every range is copied VERBATIM: same class names, same ids, same data-*
 * attributes, same comments, same section order. Verified to contain zero "{"
 * or "}" characters, so nothing needs escaping for Astro's expression syntax.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SRC = path.join(HERE, 'portfolio-rewritten.html');
const COMPONENTS = path.join(ROOT, 'src', 'components');

const BODY_OPEN = 5538, BODY_LAST = 7209;   // <body> .. last markup line

/* [outfile, first, last] — 1-indexed inclusive. */
const PARTS = [
  ['SiteHeader.astro',                    5540, 5563],
  ['MobileNav.astro',                     5565, 5585],
  ['sections/Hero.astro',                 5587, 5650],
  ['sections/Impact.astro',               5652, 5723],
  ['sections/Projects.astro',             5725, 5780],
  ['overlays/MobileFilterSheet.astro',    5782, 5802],
  ['overlays/ProjectOverlay.astro',       5804, 5848],
  ['sections/CaseStudies.astro',          5850, 5875],
  ['overlays/CaseStudyModal.astro',       5877, 5975],
  ['sections/Services.astro',             5977, 6303],
  ['sections/B2BChannel.astro',           6305, 6353],
  ['sections/MarketingTools.astro',       6355, 6492],
  ['sections/Experience.astro',           6494, 6626],
  ['sections/About.astro',                6628, 6689],
  ['sections/BeyondPortfolio.astro',      6691, 6771],
  ['sections/Cta.astro',                  6786, 6823],
  ['overlays/CtaModal.astro',             6825, 6929],
  ['sections/Contact.astro',              6931, 7159],
  ['SiteFooter.astro',                    7162, 7208],
];

/* Lines deliberately NOT in a component, because index.astro owns them:
   the .contact-block wrapper (it carries id="contact", which the nav targets). */
const OWNED_BY_PAGE = [[6772, 6785], [7160, 7161]];

const html = await readFile(SRC, 'utf8');
const lines = html.split(/\r?\n/);

await mkdir(path.join(COMPONENTS, 'sections'), { recursive: true });
await mkdir(path.join(COMPONENTS, 'overlays'), { recursive: true });

for (const [out, from, to] of PARTS) {
  const body = lines.slice(from - 1, to).join('\n');
  const front = `---\n/* Markup ported verbatim from "Adnan Main Portfolio.html" lines ${from}-${to}.\n   Class names, ids and data-* attributes are load-bearing for the ported\n   scripts in src/scripts -- do not rename. */\n---\n`;
  await writeFile(path.join(COMPONENTS, out), front + body + '\n', 'utf8');
  console.log(`  ${out.padEnd(36)} ${String(from).padStart(5)}-${String(to).padEnd(5)} ${String(to - from + 1).padStart(4)} lines`);
}

/* Coverage accounting — identical rigour to the CSS split. */
const claimed = new Set();
for (const [, f, t] of PARTS) for (let i = f; i <= t; i++) claimed.add(i);
for (const [f, t] of OWNED_BY_PAGE) for (let i = f; i <= t; i++) claimed.add(i);

const orphans = [];
for (let i = BODY_OPEN + 1; i <= BODY_LAST; i++) {
  if (!claimed.has(i) && lines[i - 1].trim() !== '') orphans.push(i);
}

console.log(`\n  markup lines in <body>   ${BODY_LAST - BODY_OPEN}`);
console.log(`  lines claimed            ${claimed.size}`);
console.log(`  non-blank orphans        ${orphans.length}   (must be 0)`);
if (orphans.length) {
  console.error('\nFAIL: uncopied markup lines:');
  for (const n of orphans.slice(0, 25)) console.error(`  ${n}: ${lines[n - 1].slice(0, 100)}`);
  process.exit(1);
}
