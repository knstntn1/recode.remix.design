# Phase 4: Verification and Deployment Readiness - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 4 is the final QA and handoff phase. It verifies production build output, internal links, local asset independence, responsive rendering, and deployment readiness for `gallery.computingeducation.de`. It should avoid new product features and focus on checks, polish fixes, and documentation.

</domain>

<decisions>
## Implementation Decisions

### Verification
- Extend automated checks rather than relying on manual inspection.
- Verify internal links in `dist/` resolve to generated files or valid anchors.
- Verify built HTML/CSS/JS contains no source WordPress media URLs.
- Verify referenced local `/assets/recode-remix-design/...` files exist.

### Visual QA
- Reuse Playwright for desktop and mobile screenshots.
- Cover homepage, a representative first exhibit, and the long-title `Punkt.Linie.Flaeche` exhibit.
- Fix overflow/overlap issues discovered by checks.

### Deployment Readiness
- Document the static build command and deployable output directory.
- Document that deployment target is root of `https://gallery.computingeducation.de`.
- Keep deployment notes project-local and concise.

### the agent's Discretion
- Exact script names are flexible as long as `npm run verify` is the final umbrella command.
- Minor CSS polish is allowed when directly tied to Phase 4 visual/readiness checks.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `npm run verify` already chains Astro check/build, static verification, migration verification, page verification, and Playwright checks.
- `scripts/verify-exhibition-pages.mjs` checks page presence and navigation.
- `tests/phase1-shell.spec.mjs` already checks desktop/mobile rendering and overflow.

### Established Patterns
- Static Astro output in `dist/`.
- Local public assets under `public/assets/recode-remix-design/`.
- GSD summaries and verification reports for each phase.

### Integration Points
- `package.json` final `verify` script is the release gate.
- Deployment notes should reference `npm run build` and `dist/`.

</code_context>

<specifics>
## Specific Ideas

- The site will later be hosted at `gallery.computingeducation.de`.
- No CMS, server runtime, or remote WordPress media dependency should be introduced.

</specifics>

<deferred>
## Deferred Ideas

Search/filter, CMS editing, multilingual content, and analytics remain v2/deferred.

</deferred>
