# Project Research Summary

**Project:** Recode.Remix.Design
**Domain:** Static exhibition/gallery website
**Researched:** 2026-05-12
**Confidence:** HIGH

## Executive Summary

This is a small, content-heavy static exhibition site: one start page plus 17 exhibit pages. The strongest approach is a static Astro build with shared layouts, content-driven exhibit pages, and a one-time migration of WordPress article content and media into local project files.

The key product requirement is independence. The new site must not depend on the original Joachim Wedekind WordPress media URLs at runtime. The key design requirement is fit with computingeducation.de: dark blue header/footer, light background, white card surfaces, system sans typography, compact navigation, and a matching footer pattern.

The main risks are incomplete migration, remote assets left behind, and superficial visual matching. These should be handled directly in the roadmap: visual baseline first, then source inventory/import, then content pages, then static build and responsive verification.

## Key Findings

### Recommended Stack

Astro 6.3.1 is the recommended static site generator, with Vite 8.0.12 underneath and TypeScript for route/content metadata. This gives shared layouts, static output, and enough structure for 18 pages without introducing a CMS or client-heavy application.

**Core technologies:**
- Astro: static page generation and layouts - best fit for content-heavy static gallery.
- Vite: local dev and production build - current docs support static and multi-page workflows.
- TypeScript: typed exhibit metadata and migration checks - reduces errors in slugs/source mapping.
- Playwright: browser verification - needed for visual/responsive QA.

### Expected Features

**Must have (table stakes):**
- Exhibition start page with migrated introduction.
- 17 exhibit detail pages.
- Local media copies and rewritten image/media links.
- Computingeducation-aligned header, footer, typography, colors, and card/grid feel.
- Responsive layout and navigation.
- Production build with no missing local assets or broken internal links.

**Should have (competitive):**
- Exhibit card grid with artwork previews.
- Previous/next exhibit navigation.
- Per-page metadata for sharing.
- Preserved external learning/source links where relevant.

**Defer (v2+):**
- CMS/editor workflow.
- Search/filter.
- Analytics.
- Multilingual version.

### Architecture Approach

Use a content-driven static architecture: shared BaseLayout, SiteHeader, SiteFooter, ExhibitGrid, and ExhibitLayout; exhibit metadata in a typed data module or content collection; migrated exhibit bodies as local content files; all images/media under `public/assets/exhibits/`.

**Major components:**
1. Visual foundation - shared CSS tokens and Computingeducation-style layout.
2. Content importer - extracts source article bodies, downloads media, rewrites paths.
3. Static page generation - start page and exhibit pages generated from content/metadata.
4. Verification - build, link/asset scan, and Playwright screenshots.

### Critical Pitfalls

1. **Remote asset dependency** - avoid by scanning source/build output for source WordPress domains.
2. **Superficial visual fit** - avoid by defining Computingeducation visual tokens before building pages.
3. **Content fidelity loss** - avoid by preserving article body order, captions, links, and media.
4. **Broken "500 Linien" page** - resolve query-string source explicitly and assign stable local slug.
5. **Desktop-only layout** - normalize WordPress image/floating behavior and verify mobile screenshots.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Static Site Foundation and Visual System
**Rationale:** Shared layout and visual tokens should exist before content pages are built.
**Delivers:** Astro project, base layout, Computingeducation-style header/footer, global CSS, deployment-friendly config.
**Addresses:** Visual identity, static-hosting requirement.
**Avoids:** Superficial visual fit and layout drift.

### Phase 2: Source Content and Asset Migration
**Rationale:** Local content/media independence is the central technical risk.
**Delivers:** Source inventory, import/download script or equivalent migration workflow, local assets, rewritten paths.
**Uses:** Source WordPress pages, local `public/assets/exhibits/`, content files.
**Implements:** Asset independence.

### Phase 3: Exhibition Start Page and Exhibit Pages
**Rationale:** Once content and layout exist, generate the actual user-facing site.
**Delivers:** Start page, exhibit grid, 17 exhibit pages, previous/next/back navigation, metadata.
**Implements:** Core visitor experience.

### Phase 4: Verification, Polish, and Deployment Readiness
**Rationale:** The project can look complete while hiding broken assets, links, or mobile layout issues.
**Delivers:** Production build, link/asset scans, responsive screenshots, final visual adjustments, deployment notes for `gallery.computingeducation.de`.
**Avoids:** Remote dependencies, mobile breakage, broken routes.

### Phase Ordering Rationale

- Visual foundation first prevents every page from solving styling separately.
- Migration before page implementation ensures pages use local assets from the start.
- Page generation after content inventory lets all routes and previous/next navigation be derived from a single ordered exhibit list.
- Verification last catches the specific failure modes likely in static content migration.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2:** Source import details, especially WordPress media `srcset`, attachment links, and the `500 Linien` preview URL.
- **Phase 4:** Deployment configuration if `gallery.computingeducation.de` has a specific hosting platform or base path.

Phases with standard patterns:
- **Phase 1:** Astro static project setup and shared layout.
- **Phase 3:** Content-driven page generation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified current Astro/Vite/npm versions and requirements. |
| Features | HIGH | User explicitly defined structure and independence; source page inventory is available. |
| Architecture | HIGH | Standard static content architecture fits the scope. |
| Pitfalls | HIGH | Risks are directly visible from source WordPress markup and user constraints. |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact hosting setup:** Confirm during deployment planning whether `gallery.computingeducation.de` serves from domain root or a subpath.
- **500 Linien permalink:** Resolve during import; current source link is a preview/query-string URL.
- **Legal/attribution footer wording:** Match Computingeducation conventions while preserving any required exhibition/source attribution.

## Sources

### Primary (HIGH confidence)

- User brief and follow-up answers - project scope and deployment requirement.
- `http://experimente.joachim-wedekind.de/recode-remix-design/` - source content and exhibit list.
- `https://computingeducation.de/` - visual style and footer reference.
- Astro official docs - latest release and upgrade policy.
- Vite official docs - Node compatibility and static build behavior.

### Secondary (MEDIUM confidence)

- npm registry - current package versions checked on 2026-05-12.

---
*Research completed: 2026-05-12*
*Ready for roadmap: yes*
