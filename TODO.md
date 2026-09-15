# Portfolio Website - Implementation Checklist

> Superseded planning doc — kept for history. Shipped scope differs:
> 3 CV projects (not 6–8), no photo, no Framer Motion, no blog.

## Phase 1: Setup
- [x] Initialize Astro project with Tailwind
- [x] Configure GitHub Pages deployment
- [x] Set up global styles and design tokens

## Phase 2: Core Sections
- [x] Hero section (editorial statement + build notes)
- [x] About section (bio + languages)
- [x] Projects section (3 CV projects, case-study rows)
- [x] Skills section (CV-verbatim capability rows)
- [x] Education section (Minho 2023–2026)
- [x] Contact section (email, GitHub, LinkedIn, CV PDFs)

## Phase 3: Polish
- [x] Scroll reveals (quiet, reduced-motion safe)
- [x] Responsive design (mobile-first)
- [x] Dark/light mode toggle
- [x] SEO meta tags, canonical, sitemap, 404 page
- [ ] OG social preview image (skipped: no real asset to use)
- [x] Performance (CSS-only output, no client bundles)

## Phase 4: Content
- [x] Project descriptions from CV bullets
- [ ] Project screenshots (none exist; detail pages say so honestly)
- [x] Bio and education from CV
- [x] Resume PDF download links (EN + PT, real files in `public/`)

## Phase 5: Deploy
- [x] GitHub repo: yHugoSoares/portfolio
- [x] GitHub Pages via Actions workflow
- [ ] Custom domain (optional, skipped)
