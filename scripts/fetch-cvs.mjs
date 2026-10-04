// Downloads the CV PDFs from GitHub into public/ so the portfolio always
// ships the versions committed to the source repo. Never fails the build:
// on any error the previously committed public/ files are kept.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const sources = JSON.parse(
  await readFile(new URL('../src/data/cv-sources.json', import.meta.url), 'utf8'),
);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = { 'User-Agent': 'portfolio-build' };
if (token) headers.Authorization = `Bearer ${token}`;

const jobs = Object.entries(sources)
  .filter(([, v]) => v && v.repo && v.path && v.file)
  .map(([lang, v]) => {
    const direct = process.env[`CV_${lang.toUpperCase()}_URL`];
    const url =
      direct || `https://raw.githubusercontent.com/${v.repo}/${v.ref || 'main'}/${v.path}`;
    return { lang, url, file: v.file };
  });

await mkdir(new URL('../public/', import.meta.url), { recursive: true });

for (const { lang, url, file } of jobs) {
  const dest = new URL(`../public/${file}`, import.meta.url);
  try {
    const r = await fetch(url, { headers });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('not a PDF');
    await writeFile(dest, buf);
    console.log(`cv[${lang}]: updated ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.warn(
      `cv[${lang}]: keep ${existsSync(dest) ? 'existing' : 'missing'} ${file} (${e.message})`,
    );
  }
}
