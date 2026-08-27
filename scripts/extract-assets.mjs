/**
 * STEP 1 — base64 -> external files.
 *
 * The source portfolio inlines ~9MB of decoded image bytes as base64 data URIs,
 * which is 12.0MB of its 12.4MB weight. This decodes every raster payload to a
 * real file under public/assets/ and rewrites the references.
 *
 * The 87 WebP payloads are written BYTE-FOR-BYTE. No re-encode, no quality flag,
 * no format conversion -- they are already WebP. The single hero-portrait JPEG is
 * the one deliberate exception (see HERO_ID below).
 *
 * Also emits scripts/portfolio-rewritten.html: the same markup with every data URI
 * swapped for its /assets/ path. That file is ~450KB instead of 12.4MB, so every
 * later extraction pass reads it instead of the original.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const SOURCE = path.resolve(ROOT, '..', 'Adnan Main Portfolio.html');

const ASSETS = path.join(ROOT, 'public', 'assets');
const PROJECTS_DIR = path.join(ASSETS, 'projects');

/* Context markers that identify the two portraits, so they get stable, readable
   filenames instead of a hash. Everything else is project gallery imagery. */
const HERO_ID = 'id="portraitImg"';
const ABOUT_MARKER = 'about__portrait';
const CONTEXT_WINDOW = 400;   // chars to look back from a match

const DATA_URI = /data:image\/(webp|jpeg);base64,([A-Za-z0-9+/=]+)/g;

const bytes = n => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

async function main() {
  console.log(`Reading ${path.basename(SOURCE)} ...`);
  const html = await readFile(SOURCE, 'utf8');
  console.log(`  ${bytes(Buffer.byteLength(html, 'utf8'))} of HTML\n`);

  await mkdir(PROJECTS_DIR, { recursive: true });

  /* ---- pass 1: locate every payload, decode, hash ---------------------- */
  const refs = [];
  let m;
  DATA_URI.lastIndex = 0;
  while ((m = DATA_URI.exec(html)) !== null) {
    const [full, format, payload] = m;
    const buf = Buffer.from(payload, 'base64');
    const hash = createHash('sha256').update(buf).digest('hex').slice(0, 12);
    const before = Math.max(0, m.index - CONTEXT_WINDOW);
    const context = html.slice(before, m.index);

    let kind = 'project';
    if (context.includes(HERO_ID)) kind = 'hero';
    else if (context.includes(ABOUT_MARKER)) kind = 'about';

    refs.push({ full, format, hash, buf, kind, index: m.index });
  }

  const inlineBytes = refs.reduce((s, r) => s + r.full.length, 0);
  console.log(`Found ${refs.length} data URIs (${bytes(inlineBytes)} of base64 text)`);
  const byFormat = refs.reduce((a, r) => (a[r.format] = (a[r.format] || 0) + 1, a), {});
  for (const [f, n] of Object.entries(byFormat)) console.log(`  ${f}: ${n}`);

  /* ---- pass 2: write one file per UNIQUE payload ------------------------ */
  const written = new Map();   // hash -> public path
  const stats = { files: 0, diskBytes: 0, deduped: 0, converted: 0 };

  for (const ref of refs) {
    if (written.has(ref.hash)) { stats.deduped++; continue; }

    let outPath, publicPath;

    if (ref.kind === 'hero') {
      /* The ONLY format conversion in this script, and the only use of sharp.
         This payload is the lone JPEG in the file. */
      const { default: sharp } = await import('sharp');
      const webp = await sharp(ref.buf).webp({ quality: 82 }).toBuffer();
      outPath = path.join(ASSETS, 'portrait-hero.webp');
      publicPath = '/assets/portrait-hero.webp';
      await writeFile(outPath, webp);
      stats.diskBytes += webp.length;
      stats.converted++;
      console.log(`\n  hero portrait: JPEG ${bytes(ref.buf.length)} -> WebP ${bytes(webp.length)} (q82)`);
      written.set(ref.hash, publicPath);
      stats.files++;
      continue;
    }

    if (ref.kind === 'about') {
      outPath = path.join(ASSETS, 'portrait-about.webp');
      publicPath = '/assets/portrait-about.webp';
    } else {
      outPath = path.join(PROJECTS_DIR, `${ref.hash}.webp`);
      publicPath = `/assets/projects/${ref.hash}.webp`;
    }

    await writeFile(outPath, ref.buf);     // exact bytes, untouched
    stats.diskBytes += ref.buf.length;
    stats.files++;
    written.set(ref.hash, publicPath);
  }

  /* ---- pass 3: rewrite the HTML ---------------------------------------- */
  let rewritten = '';
  let cursor = 0;
  for (const ref of refs) {
    rewritten += html.slice(cursor, ref.index);
    rewritten += written.get(ref.hash);
    cursor = ref.index + ref.full.length;
  }
  rewritten += html.slice(cursor);

  const outHtml = path.join(HERE, 'portfolio-rewritten.html');
  await writeFile(outHtml, rewritten, 'utf8');

  const map = Object.fromEntries([...written.entries()].map(([h, p]) => [h, p]));
  await writeFile(path.join(HERE, 'asset-map.json'), JSON.stringify(map, null, 2), 'utf8');

  /* ---- report ----------------------------------------------------------- */
  const remaining = (rewritten.match(/data:image\/(webp|jpeg);base64/g) || []).length;
  console.log(`\n--- report ---------------------------------------------`);
  console.log(`  refs found         ${refs.length}`);
  console.log(`  unique files       ${stats.files}`);
  console.log(`    projects/        ${[...written.values()].filter(p => p.includes('/projects/')).length}`);
  console.log(`    portraits        ${[...written.values()].filter(p => !p.includes('/projects/')).length}`);
  console.log(`  duplicate refs     ${stats.deduped}  (collapsed, not rewritten)`);
  console.log(`  format conversions ${stats.converted}  (hero JPEG only)`);
  console.log(`  bytes on disk      ${bytes(stats.diskBytes)}`);
  console.log(`  HTML before        ${bytes(Buffer.byteLength(html, 'utf8'))}`);
  console.log(`  HTML after         ${bytes(Buffer.byteLength(rewritten, 'utf8'))}`);
  console.log(`  raster URIs left   ${remaining}   (must be 0)`);
  console.log(`--------------------------------------------------------`);

  if (remaining !== 0) {
    console.error('\nFAIL: raster data URIs survived the rewrite.');
    process.exit(1);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
