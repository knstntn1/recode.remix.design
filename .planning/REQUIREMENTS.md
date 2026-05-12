# Requirements: Recode.Remix.Design

**Defined:** 2026-05-12
**Core Value:** Visitors can browse the Recode.Remix.Design exhibition independently under the Computingeducation visual identity, with all exhibit information and media available without relying on the source site.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Developer can build the website as a static site with no server runtime or CMS dependency.
- [x] **FOUND-02**: Site routes and asset paths are compatible with deployment at `https://gallery.computingeducation.de`.
- [x] **FOUND-03**: Shared layouts provide a consistent page shell for the start page and all exhibit pages.

### Visual Identity

- [x] **VIS-01**: Site uses a Computingeducation-inspired visual system, including dark blue header/footer, light page background, white content surfaces, and system sans typography.
- [x] **VIS-02**: Site footer follows the Computingeducation footer pattern with copyright/maintainer text and an Impressum link.
- [x] **VIS-03**: Site navigation is compact, responsive, and visually consistent with Computingeducation conventions.

### Content Migration

- [x] **CONT-01**: Start page includes the migrated introduction content from the Recode.Remix.Design source page.
- [x] **CONT-02**: All source page images and media required by migrated content are copied into local project assets.
- [x] **CONT-03**: Migrated content references local media paths instead of `experimente.joachim-wedekind.de` media URLs.
- [x] **CONT-04**: External educational/source links from the original content are preserved where they provide context or program/code access.
- [x] **CONT-05**: The "500 Linien" source page is resolved from its query-string/preview URL and assigned a stable local exhibit route.

### Exhibit Pages

- [x] **EXH-01**: Start page shows a browseable exhibit index with all 17 exhibits.
- [x] **EXH-02**: User can open a dedicated local page for Schotter.
- [x] **EXH-03**: User can open a dedicated local page for Boxes.
- [x] **EXH-04**: User can open a dedicated local page for 500 Linien.
- [x] **EXH-05**: User can open a dedicated local page for Quadrate.
- [x] **EXH-06**: User can open a dedicated local page for Binary Rhythm.
- [x] **EXH-07**: User can open a dedicated local page for Grid Based Systems.
- [x] **EXH-08**: User can open a dedicated local page for Inequality.
- [x] **EXH-09**: User can open a dedicated local page for Permutationen.
- [x] **EXH-10**: User can open a dedicated local page for Labyrinth.
- [x] **EXH-11**: User can open a dedicated local page for Random Windows.
- [x] **EXH-12**: User can open a dedicated local page for n-Ecken.
- [x] **EXH-13**: User can open a dedicated local page for Kraftlinien.
- [x] **EXH-14**: User can open a dedicated local page for Komputerstrukturen.
- [x] **EXH-15**: User can open a dedicated local page for Farbzentren.
- [x] **EXH-16**: User can open a dedicated local page for Punkt.Linie.Flaeche.
- [x] **EXH-17**: User can open a dedicated local page for Fraktale.
- [x] **EXH-18**: User can open a dedicated local page for Sinus Addition.
- [x] **EXH-19**: Exhibit pages provide navigation back to the overview and between neighboring exhibits.

### Quality

- [x] **QUAL-01**: Production build completes successfully.
- [x] **QUAL-02**: Built site contains no runtime references to source WordPress media URLs.
- [x] **QUAL-03**: Internal links from the start page to all exhibit pages work.
- [x] **QUAL-04**: Start page and representative exhibit pages render correctly on desktop and mobile viewports.
- [x] **QUAL-05**: Long German titles and migrated article content do not overflow or overlap on supported viewports.

## v2 Requirements

### Discovery

- **DISC-01**: User can search or filter exhibits by title or theme.
- **DISC-02**: User can browse future exhibitions from a shared gallery landing page.

### Editorial

- **EDIT-01**: Non-developer editor can update exhibition content through a CMS or structured editing workflow.
- **EDIT-02**: Site supports multilingual exhibit content.

### Analytics

- **ANALYT-01**: Maintainers can view privacy-compliant traffic analytics if explicitly required.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CMS/admin backend | The requested deliverable is a simple static website. |
| Editorial rewrite of source content | Existing prepared content should be übernommen as-is except for technical cleanup. |
| Runtime dependency on source WordPress media | User requires the new site to be independent. |
| Full clone of computingeducation.de | The goal is visual integration, not recreating the entire Gatsby site. |
| Search/filter for v1 | Nice to have, but not needed for the initial static exhibition experience. |
| Analytics for v1 | Not requested and creates privacy/legal decisions outside current scope. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| VIS-01 | Phase 1 | Complete |
| VIS-02 | Phase 1 | Complete |
| VIS-03 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| EXH-01 | Phase 3 | Complete |
| EXH-02 | Phase 3 | Complete |
| EXH-03 | Phase 3 | Complete |
| EXH-04 | Phase 3 | Complete |
| EXH-05 | Phase 3 | Complete |
| EXH-06 | Phase 3 | Complete |
| EXH-07 | Phase 3 | Complete |
| EXH-08 | Phase 3 | Complete |
| EXH-09 | Phase 3 | Complete |
| EXH-10 | Phase 3 | Complete |
| EXH-11 | Phase 3 | Complete |
| EXH-12 | Phase 3 | Complete |
| EXH-13 | Phase 3 | Complete |
| EXH-14 | Phase 3 | Complete |
| EXH-15 | Phase 3 | Complete |
| EXH-16 | Phase 3 | Complete |
| EXH-17 | Phase 3 | Complete |
| EXH-18 | Phase 3 | Complete |
| EXH-19 | Phase 3 | Complete |
| QUAL-01 | Phase 4 | Complete |
| QUAL-02 | Phase 4 | Complete |
| QUAL-03 | Phase 4 | Complete |
| QUAL-04 | Phase 4 | Complete |
| QUAL-05 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0

---
*Requirements defined: 2026-05-12*
*Last updated: 2026-05-12 after roadmap creation*
