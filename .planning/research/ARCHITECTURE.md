# Architecture Research

**Domain:** Static exhibition/gallery website
**Researched:** 2026-05-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│ Static Astro Site                                            │
├─────────────────────────────────────────────────────────────┤
│ Layouts                                                      │
│ - Base page shell                                            │
│ - Computingeducation header/footer                           │
│ - Exhibit page layout                                        │
├─────────────────────────────────────────────────────────────┤
│ Content                                                      │
│ - Exhibition intro                                           │
│ - Exhibit metadata                                           │
│ - Migrated exhibit body content                              │
├─────────────────────────────────────────────────────────────┤
│ Local Assets                                                 │
│ - Images copied from source WordPress uploads                │
│ - Optional generated thumbnails                              │
├─────────────────────────────────────────────────────────────┤
│ Build/Verification                                           │
│ - Static route generation                                    │
│ - Asset/link validation                                      │
│ - Playwright responsive screenshots                          │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Base layout | HTML shell, metadata, common CSS imports, site structure | `src/layouts/BaseLayout.astro` |
| Header/navigation | Computingeducation-style identity and navigation | `src/components/SiteHeader.astro` |
| Footer | Computingeducation-style footer links and maintainer/copyright text | `src/components/SiteFooter.astro` |
| Exhibit grid | Browseable cards linking to each exhibit | `src/components/ExhibitGrid.astro` |
| Exhibit detail layout | Title, media/content body, previous/next/back navigation | `src/layouts/ExhibitLayout.astro` |
| Content data | Exhibit slugs, titles, source URLs, thumbnails, order | Astro content collection or typed data module |
| Asset importer | Download and rewrite source media locally | Node script under `scripts/` |

## Recommended Project Structure

```text
src/
├── components/
│   ├── ExhibitCard.astro
│   ├── ExhibitGrid.astro
│   ├── SiteFooter.astro
│   └── SiteHeader.astro
├── content/
│   └── exhibits/
│       ├── schotter.mdx
│       └── ...
├── data/
│   └── exhibits.ts
├── layouts/
│   ├── BaseLayout.astro
│   └── ExhibitLayout.astro
├── pages/
│   ├── index.astro
│   └── exponate/
│       └── [slug].astro
└── styles/
    └── global.css

public/
└── assets/
    └── exhibits/
        ├── schotter/
        └── ...

scripts/
└── import-source-content.mjs
```

### Structure Rationale

- **`content/exhibits/`:** Keeps migrated exhibit bodies separate from layout logic and easy to review.
- **`data/exhibits.ts`:** Centralizes ordering, slugs, source URLs, and thumbnail choices.
- **`public/assets/exhibits/`:** Makes independence from source WordPress explicit and easy to audit.
- **Dynamic `[slug].astro`:** Generates consistent exhibit pages from content and metadata without duplicating layout.

## Architectural Patterns

### Pattern 1: Content-Driven Route Generation

**What:** Exhibit pages are generated from content files and metadata rather than hand-coded as separate page templates.
**When to use:** A fixed set of similarly structured pages, such as the 17 exhibits here.
**Trade-offs:** Requires careful metadata setup, but prevents layout drift.

### Pattern 2: Local Asset Rewrite

**What:** Source HTML/media references are transformed from remote WordPress URLs to local asset paths.
**When to use:** Required here because the new site must be independent.
**Trade-offs:** Needs an import script and validation, but avoids brittle hotlinking.

### Pattern 3: Visual Tokens Before Components

**What:** Define colors, font stacks, spacing, card shadows, and footer/header treatment before building pages.
**When to use:** Necessary when matching an external visual identity.
**Trade-offs:** Slight upfront work, but prevents inconsistent one-off CSS.

## Data Flow

### Build Flow

```text
Source URL inventory
    ↓
Import script downloads HTML/media
    ↓
Local content files + local assets
    ↓
Astro generates start page and exhibit routes
    ↓
Static build output
    ↓
Playwright/link/asset verification
```

### Runtime Flow

```text
Visitor opens gallery.computingeducation.de
    ↓
Static start page loads local CSS/assets
    ↓
Visitor selects an exhibit card
    ↓
Static exhibit detail page loads local content/media
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current 18 pages | Static Astro build, no backend. |
| Dozens of exhibitions | Add collection grouping and landing pages by exhibition. |
| Frequent editorial updates | Consider a headless CMS only after static editing becomes painful. |

### Scaling Priorities

1. **First bottleneck:** Manual migration accuracy - solve with import script and asset/link validation.
2. **Second bottleneck:** Image weight - solve with thumbnails/responsive images if build output is large.

## Anti-Patterns

### Anti-Pattern 1: Hand-Coded Pages With Copied Layout

**What people do:** Duplicate each exhibit page manually.
**Why it's wrong:** Header/footer/card behavior drifts and changes become expensive.
**Do this instead:** Use shared layouts and content-driven route generation.

### Anti-Pattern 2: Hotlinking Source WordPress Images

**What people do:** Leave `http://experimente.../wp-content/uploads/...` image URLs in migrated content.
**Why it's wrong:** Violates independence and makes the site dependent on external availability.
**Do this instead:** Download assets locally and rewrite references.

### Anti-Pattern 3: Marketing Landing Page Instead of Exhibition Page

**What people do:** Build a generic hero page that hides the actual exhibit navigation.
**Why it's wrong:** Visitors need the exhibition content immediately.
**Do this instead:** Make the start page an actual exhibition overview with intro and exhibit grid.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Source WordPress site | One-time content/media import | Do not keep runtime dependency. |
| computingeducation.de | Visual reference only | Recreate style locally; do not depend on its Gatsby bundle. |
| gallery.computingeducation.de | Static deployment target | Configure canonical URLs and root-relative routes. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Content ↔ Layout | Astro content collection/data props | Keep migrated content free of page chrome. |
| Asset importer ↔ Content | Rewritten local paths | Import should be repeatable or at least auditable. |
| Verification ↔ Build output | Playwright/static file checks | Verify after production build, not only dev server. |

## Sources

- Astro and Vite official docs for static build and current runtime assumptions.
- Source WordPress page inventory.
- computingeducation.de visual inspection.

---
*Architecture research for: Recode.Remix.Design*
*Researched: 2026-05-12*
