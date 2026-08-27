/**
 * STEP 4 — split the 4,700-line <script> block into ES modules.
 *
 * The bodies are copied VERBATIM. The ONLY edit is adding `export ` in front of
 * the top-level `function initX(){`. Everything else -- including the ES5 style,
 * the `var` declarations and the defensive `typeof gsap === "undefined"` guards
 * -- is left exactly as written.
 *
 * These stay .js rather than .ts on purpose: they are 4,700 lines of ported ES5
 * with no annotations, and running them through a strict tsconfig would produce
 * hundreds of implicit-any errors that carry no information. New code (gsap.ts,
 * boot.ts) is TypeScript.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SRC = path.join(HERE, 'portfolio-rewritten.html');
const OUT = path.join(ROOT, 'src', 'scripts');

const JS_OPEN = 7215, JS_CLOSE = 11923;

/* [outfile, exportedName, first, last] */
const MODULES = [
  ['hero.js',            'initHero',            7216,  7686],
  ['impact.js',          'initImpactCounters',  7687,  7742],
  ['projects.js',        'initProjects',        7743, 10415],
  ['caseStudies.js',     'initCaseStudies',    10416, 10921],
  ['marketingTools.js',  'initMarketingTools', 10922, 10964],
  ['experience.js',      'initExperience',     10965, 11116],
  ['about.js',           'initAbout',          11117, 11164],
  ['githubCard.js',      'initGithubCard',     11165, 11226],
  ['linkedInBadge.js',   'initLinkedInBadge',  11227, 11286],
  ['cta.js',             'initCta',            11287, 11446],
  ['contact.js',         'initContact',        11447, 11663],
  ['footer.js',          'initFooter',         11664, 11709],
  ['reveal.js',          'initSharedObserver', 11710, 11828],
  ['nav.js',             'initNav',            11829, 11883],
];
/* boot() at 11884-11920 is NOT copied: boot.ts replaces it with real imports. */
const OWNED_BY_BOOT = [[11884, 11922]];

const html = await readFile(SRC, 'utf8');
const lines = html.split(/\r?\n/);
await mkdir(OUT, { recursive: true });

for (const [file, name, from, to] of MODULES) {
  let body = lines.slice(from - 1, to).join('\n');

  const decl = `function ${name}(){`;
  const at = body.indexOf(decl);
  if (at === -1) { console.error(`FAIL: ${decl} not found in ${file}`); process.exit(1); }
  /* Only the top-level declaration is exported; nested helpers are untouched. */
  body = body.slice(0, at) + 'export ' + body.slice(at);

  const banner = `/* Ported verbatim from "Adnan Main Portfolio.html" lines ${from}-${to}.\n   Only edit: 'export' added to the ${name} declaration. */\n`;
  await writeFile(path.join(OUT, file), banner + body + '\n', 'utf8');
  console.log(`  ${file.padEnd(20)} ${name.padEnd(20)} ${String(from).padStart(5)}-${String(to).padEnd(5)} ${String(to - from + 1).padStart(5)} lines`);
}

const claimed = new Set();
for (const [, , f, t] of MODULES) for (let i = f; i <= t; i++) claimed.add(i);
for (const [f, t] of OWNED_BY_BOOT) for (let i = f; i <= t; i++) claimed.add(i);

const orphans = [];
for (let i = JS_OPEN + 1; i < JS_CLOSE; i++) {
  if (!claimed.has(i) && lines[i - 1].trim() !== '') orphans.push(i);
}
console.log(`\n  JS lines in <script>   ${JS_CLOSE - JS_OPEN - 1}`);
console.log(`  lines claimed          ${claimed.size}`);
console.log(`  non-blank orphans      ${orphans.length}   (must be 0)`);
if (orphans.length) {
  console.error('\nFAIL: uncopied JS lines:');
  for (const n of orphans.slice(0, 25)) console.error(`  ${n}: ${lines[n - 1].slice(0, 100)}`);
  process.exit(1);
}
