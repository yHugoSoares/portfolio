# Hugo Soares — Portfolio

Live: https://yhugosoares.github.io/portfolio/

CV-grounded editorial portfolio. Content mirrors the CV: 3 shipped projects
(reddit-tiktok-pipeline, Zenyth-IDE, VencordMobile), Minho education, real contact.

## Tech Stack

- **Framework**: Astro static (`output: 'static'`), no client frameworks
- **Styling**: Tailwind CSS + `src/styles/global.css` design tokens
- **Data**: `src/data/projects.json` curated + `scripts/fetch-repos.mjs` merges
  live GitHub stars/language at build time (`GITHUB_TOKEN` in CI)
- **SEO**: per-page meta, canonical, sitemap, `404.html`
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`
  (push to `main` + daily metadata refresh)

## Routes

- `/` — hero, about, selected work, capabilities, education, contact
- `/projects/` — archive catalogue
- `/projects/[slug]/` — case-study notes per project

## Design tokens

| Token | Light | Dark |
|-------|-------|------|
| bg | `#faf8f3` paper | `#171511` warm charcoal |
| text | `#1c1a15` | `#f0ebe0` |
| accent | `#4f6df5` | `#8ba0ff` |

Type: DM Serif Display / Manrope / JetBrains Mono. Motion: fade-up reveals,
underline + arrow hovers, row tints. `prefers-reduced-motion` respected.

## Getting Started

```bash
npm install
npm run dev
```
