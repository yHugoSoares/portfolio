# Hugo Soares — Portfolio

Live: https://yhugosoares.github.io/portfolio/

CV-grounded editorial portfolio. Content mirrors the CV: 3 pinned projects
(reddit-tiktok-pipeline, Zenyth-IDE, VencordMobile), Minho education, real contact.
The archive lists every public GitHub repo (minus forks, the portfolio itself,
and the profile repo), each with its own detail page.

## Tech Stack

- **Framework**: Astro static (`output: 'static'`), no client frameworks
- **Styling**: Tailwind CSS + `src/styles/global.css` design tokens
- **Data**: `src/data/projects.json` curated details + `scripts/fetch-repos.mjs`
  lists all public repos and merges live GitHub stars/language/push dates
  at build time (`GITHUB_TOKEN` in CI) into `src/data/repos.generated.json`
- **CVs**: `src/data/cv-sources.json` points at the GitHub-hosted PDFs;
  `scripts/fetch-cvs.mjs` downloads them into `public/` at build time
  (overrides: `CV_EN_URL` / `CV_PT_URL`). Never fails the build.
- **SEO**: per-page meta, canonical, sitemap, `404.html`
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`
  (push to `main` + daily metadata refresh)

## Routes

- `/` — hero, about, selected work, capabilities, education, contact
- `/projects/` — full archive (pinned first, rest by most recent push)
- `/projects/[slug]/` — detail page per public repo (curated case-study
  notes for pinned projects, README pointer + live metadata for the rest)

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
