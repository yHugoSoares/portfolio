# Portfolio - Design Spec

> Superseded: shipped theme is warm editorial (paper `#faf8f3` / charcoal
> `#171511`, accent `#4f6df5`/`#8ba0ff`, DM Serif Display + Manrope +
> JetBrains Mono). See README for the live system. Kept for history.

## Visual Style

- **Aesthetic**: Minimalist, dark-first, with subtle gradients
- **Typography**: Inter (body), JetBrains Mono (code/accents)
- **Spacing**: Consistent 8px grid system
- **Border radius**: Rounded corners (8px cards, 4px buttons)

## Color Palette

```css
:root {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-border: #334155;
  --color-text: #f8fafc;
  --color-muted: #94a3b8;
  --color-primary: #6366f1;
  --color-accent: #22d3ee;
  --color-success: #10b981;
  --color-warning: #f59e0b;
}
```

## Layout

```
┌─────────────────────────────────┐
│  NAV (fixed, glassmorphism)     │
├─────────────────────────────────┤
│                                 │
│  HERO                           │
│  - Full viewport height         │
│  - Animated mesh gradient       │
│  - Name + title + CTA           │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ABOUT                          │
│  - Two-column: photo + text     │
│  - Stats row (years, projects)  │
│                                 │
├─────────────────────────────────┤
│                                 │
│  PROJECTS                       │
│  - Card grid (2-3 columns)      │
│  - Each card: image, title,     │
│    tech stack, links            │
│                                 │
├─────────────────────────────────┤
│                                 │
│  SKILLS                         │
│  - Categorized skill badges     │
│  - Hover reveal effect          │
│                                 │
├─────────────────────────────────┤
│                                 │
│  CONTACT                        │
│  - Social icons + email CTA     │
│                                 │
├─────────────────────────────────┤
│  FOOTER                         │
└─────────────────────────────────┘
```

## Animations

- **Hero gradient**: Slow-moving mesh animation (CSS keyframes)
- **Scroll reveal**: Elements fade up on scroll (Framer Motion)
- **Card hover**: Subtle scale + shadow lift
- **Nav**: Glassmorphism on scroll
- **Text**: Staggered character animation on hero name

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 640px | Single column, stacked |
| 640-1024px | 2-column grid |
| > 1024px | 3-column grid, full layout |
