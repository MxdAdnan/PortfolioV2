/**
 * STEP 2 — split the single 5,515-line <style> block into per-section files.
 *
 * Every range below is copied VERBATIM. No reformatting, no token renaming, no
 * dedupe of the --mt-* / --exp-* aliases (section CSS references them directly).
 * The only edit is a banner comment at the top of each file recording its origin.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SRC = path.join(HERE, 'portfolio-rewritten.html');
const STYLES = path.join(ROOT, 'src', 'styles');

/* [outfile, firstLine, lastLine]  — 1-indexed, inclusive, matching the source. */
const RANGES = [
  ['tokens.css',                  22,   97],
  ['base.css',                    99,  126],
  ['sections/hero.css',          127,  773],
  ['sections/impact.css',        774, 1046],
  ['sections/projects.css',     1047, 1960],
  ['sections/case-studies.css', 1961, 2588],
  ['sections/services.css',     2589, 3043],
  ['sections/b2b.css',          3044, 3150],
  ['sections/marketing-tools.css', 3151, 3346],
  ['sections/experience.css',   3347, 3882],
  ['sections/about.css',        3883, 4160],
  ['sections/beyond.css',       4161, 4533],
  ['sections/cta.css',          4534, 4969],
  ['sections/contact.css',      4970, 5326],
  ['sections/footer.css',       5327, 5479],
  ['sections/merge-layer.css',  5480, 5535],
];

const STYLE_OPEN = 21, STYLE_CLOSE = 5536;

const html = await readFile(SRC, 'utf8');
const lines = html.split(/\r?\n/);

await mkdir(path.join(STYLES, 'sections'), { recursive: true });

let covered = 0;
const report = [];

for (const [out, from, to] of RANGES) {
  const body = lines.slice(from - 1, to).join('\n');
  const banner = `/* Ported verbatim from "Adnan Main Portfolio.html" lines ${from}-${to}.\n   Do not reformat or rename tokens. */\n`;
  await writeFile(path.join(STYLES, out), banner + body + '\n', 'utf8');
  covered += to - from + 1;
  report.push([out, `${from}-${to}`, to - from + 1]);
}

/* Accounting: every line between <style> and </style> must be either copied or
   provably blank. A non-blank orphan means a range boundary is wrong. */
const claimed = new Set();
for (const [, from, to] of RANGES) for (let i = from; i <= to; i++) claimed.add(i);

const orphans = [];
for (let i = STYLE_OPEN + 1; i < STYLE_CLOSE; i++) {
  if (!claimed.has(i) && lines[i - 1].trim() !== '') orphans.push(i);
}

const width = Math.max(...report.map(r => r[0].length));
for (const [f, range, n] of report) {
  console.log(`  ${f.padEnd(width)}  ${range.padStart(11)}  ${String(n).padStart(4)} lines`);
}
console.log(`\n  total CSS lines in <style>  ${STYLE_CLOSE - STYLE_OPEN - 1}`);
console.log(`  lines copied                ${covered}`);
console.log(`  non-blank orphans           ${orphans.length}   (must be 0)`);
if (orphans.length) {
  console.error(`\nFAIL: uncopied non-blank lines: ${orphans.slice(0, 20).join(', ')}${orphans.length > 20 ? ' ...' : ''}`);
  process.exit(1);
}
