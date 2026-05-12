# Phase 2: Source Content and Asset Migration - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 imports the prepared Recode.Remix.Design source material into local project data/assets. It must inventory the main source page and all 17 exhibit pages, capture article content faithfully, copy required media into the repository, rewrite WordPress media references to local paths, and produce migration checks. It does not implement the final browseable exhibit UI or polish exhibit page rendering; those belong to Phase 3 and Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Source Fidelity
- Use the prepared German-language source content directly, with only technical cleanup required for static rendering.
- Preserve source structure enough that Phase 3 can render introduction text, exhibit titles, media, captions, and external learning/code links.
- Do not editorially rewrite exhibition text.
- Treat `http://experimente.joachim-wedekind.de/recode-remix-design/` and its linked exhibit pages as the canonical source.

### Local Content Model
- Store migrated exhibit metadata/content in project-local structured files so Astro pages can consume them without remote requests.
- Keep stable slugs for all 17 exhibits, including a stable local route for `500 Linien`.
- Include enough metadata for Phase 3 navigation: title, slug, source URL, order, local media references, and body content.
- Prefer a simple data/content structure over a CMS or runtime fetch layer.

### Asset Independence
- Download required source media into local project assets.
- Rewrite migrated content so required media uses local paths and no runtime source WordPress media URLs remain.
- Preserve meaningful external educational/source links when they are not media dependencies.
- Add checks that fail if migrated content still references `experimente.joachim-wedekind.de/wp-content`.

### the agent's Discretion
- Exact data format is flexible, but it should be easy for Astro to import and render statically.
- Exact asset subdirectory naming is flexible as long as it is stable, readable, and grouped under local source assets.
- Use robust HTML parsing for migration rather than fragile regular-expression scraping wherever practical.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout`, `SiteHeader`, `SiteFooter`, and `PlaceholderCard` provide the current shared shell.
- `global.css` provides Computingeducation-compatible tokens and responsive shell styling.
- `scripts/verify-static-output.mjs` already checks built output for required shell text and absence of source WordPress media dependencies.
- `tests/phase1-shell.spec.mjs` provides a simple Playwright pattern for later visual checks.

### Established Patterns
- Astro static output with no server runtime.
- Root deployment configured for `https://gallery.computingeducation.de`.
- Lightweight local CSS and simple Astro components; no CMS, framework state layer, or UI library.
- Generated outputs and screenshots are ignored by git.

### Integration Points
- Migrated data should feed `src/pages/index.astro` and `src/pages/exponate/[slug].astro` in Phase 3.
- Asset paths must work in the static `dist/` output.
- Migration verification can extend the existing npm verification style.

</code_context>

<specifics>
## Specific Ideas

- Required exhibits: Schotter, Boxes, 500 Linien, Quadrate, Binary Rhythm, Grid Based Systems, Inequality, Permutationen, Labyrinth, Random Windows, n-Ecken, Kraftlinien, Komputerstrukturen, Farbzentren, Punkt.Linie.Flaeche, Fraktale, Sinus Addition.
- The user explicitly requested that content can be übernommen directly from the source pages.
- The final site must remain independent from the original WordPress media host.
- The `500 Linien` source is known to need special handling because it may appear as a query-string or preview URL.

</specifics>

<deferred>
## Deferred Ideas

Final exhibit card layout, previous/next navigation, full visual polish, link crawling from the rendered start page, and deployment-readiness documentation are deferred to Phases 3 and 4.

</deferred>

---

*Phase: 2-Source Content and Asset Migration*
*Context gathered: 2026-05-12*
