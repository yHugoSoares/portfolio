import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const out = new URL('../src/data/repos.generated.json', import.meta.url);
const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url), 'utf8'));
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = { 'User-Agent': 'portfolio-build', Accept: 'application/vnd.github+json' };
if (token) headers.Authorization = `Bearer ${token}`;

let cache = {};
try { cache = JSON.parse(await readFile(out, 'utf8')); } catch {}

const result = {};
await Promise.all(projects.map(async (p) => {
  if (!p.repo) return;
  try {
    const r = await fetch(`https://api.github.com/repos/${p.repo}`, { headers });
    if (!r.ok) throw new Error(r.statusText);
    const j = await r.json();
    result[p.slug] = { stars: j.stargazers_count, language: j.language, pushed_at: j.pushed_at, description: j.description, url: j.html_url };
  } catch (e) {
    if (cache[p.slug]) result[p.slug] = cache[p.slug];
    else result[p.slug] = { stars: 0, language: null, pushed_at: null, description: null, url: `https://github.com/${p.repo}` };
  }
}));

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
await writeFile(out, JSON.stringify(result, null, 2));
console.log(`repos.generated.json: ${Object.keys(result).length} repos`);
