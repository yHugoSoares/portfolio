import { readFile, writeFile, mkdir } from 'node:fs/promises';

const USER = process.env.GITHUB_USER || 'yHugoSoares';
// Repos that are infrastructure, not portfolio projects.
const EXCLUDE = new Set(
  (process.env.EXCLUDE_REPOS || 'portfolio,yHugoSoares')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

const out = new URL('../src/data/repos.generated.json', import.meta.url);
const curated = JSON.parse(
  await readFile(new URL('../src/data/projects.json', import.meta.url), 'utf8'),
);
const byRepo = new Map(curated.map((p) => [String(p.repo || '').toLowerCase(), p]));
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const headers = { 'User-Agent': 'portfolio-build', Accept: 'application/vnd.github+json' };
if (token) headers.Authorization = `Bearer ${token}`;

let cache = {};
try {
  cache = JSON.parse(await readFile(out, 'utf8'));
} catch {}

const pick = (j, slug, c) => ({
  slug,
  repo: j.full_name,
  name: j.name,
  title: c?.title || j.name,
  description: j.description || c?.blurb || null,
  language: j.language,
  stars: j.stargazers_count ?? 0,
  pushed_at: j.pushed_at || null,
  created_at: j.created_at || null,
  topics: j.topics || [],
  homepage: j.homepage || null,
  url: j.html_url,
  curated: Boolean(c),
});

const result = {};
try {
  const r = await fetch(
    `https://api.github.com/users/${USER}/repos?per_page=100&type=public&sort=pushed`,
    { headers },
  );
  if (!r.ok) throw new Error(`list repos: ${r.status} ${r.statusText}`);
  const repos = await r.json();
  for (const j of repos) {
    if (j.fork || j.private) continue;
    if (EXCLUDE.has(String(j.name).toLowerCase())) continue;
    const c = byRepo.get(String(j.full_name).toLowerCase());
    const slug = c?.slug || String(j.name).toLowerCase();
    result[slug] = pick(j, slug, c);
  }
  // Keep curated entries even if the API missed them (renamed repo, API hiccup).
  for (const c of curated) {
    if (!result[c.slug]) {
      const fb = cache[c.slug] || {};
      result[c.slug] = {
        slug: c.slug,
        repo: c.repo,
        name: String(c.repo).split('/')[1] || c.slug,
        title: c.title,
        description: fb.description ?? null,
        language: fb.language ?? null,
        stars: fb.stars ?? 0,
        pushed_at: fb.pushed_at ?? null,
        created_at: fb.created_at ?? null,
        topics: fb.topics || [],
        homepage: fb.homepage || null,
        url: fb.url || `https://github.com/${c.repo}`,
        curated: true,
      };
    }
  }
} catch (e) {
  console.warn(`fetch-repos: ${e.message} — keeping cache`);
  for (const c of curated) {
    if (cache[c.slug]) result[c.slug] = cache[c.slug];
    else
      result[c.slug] = {
        slug: c.slug,
        repo: c.repo,
        name: String(c.repo).split('/')[1] || c.slug,
        title: c.title,
        description: null,
        language: null,
        stars: 0,
        pushed_at: null,
        created_at: null,
        topics: [],
        homepage: null,
        url: `https://github.com/${c.repo}`,
        curated: true,
      };
  }
  for (const [k, v] of Object.entries(cache)) {
    if (!result[k]) result[k] = v;
  }
}

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
await writeFile(out, JSON.stringify(result, null, 2));
console.log(`repos.generated.json: ${Object.keys(result).length} repos`);
