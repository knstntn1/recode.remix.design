# Roadmap: Recode.Remix.Design

## Overview

The v1 roadmap builds a static exhibition website from the outside in: first establish the Computingeducation-compatible static site shell, then migrate the source content and media locally, then generate the start page and 17 exhibit detail pages, and finally verify the build, links, asset independence, responsive layout, and deployment readiness for `gallery.computingeducation.de`.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Static Site Foundation and Visual System** - Create the Astro static site foundation and Computingeducation-style layout shell. (completed 2026-05-12)
- [x] **Phase 2: Source Content and Asset Migration** - Import the exhibition and exhibit content, copy media locally, and remove runtime source-site media dependencies. (completed 2026-05-12)
- [ ] **Phase 3: Exhibition Pages and Navigation** - Build the start page, exhibit grid, 17 exhibit detail pages, and navigation flows.
- [ ] **Phase 4: Verification and Deployment Readiness** - Verify build output, links, asset independence, responsive rendering, and gallery-domain readiness.

## Phase Details

### Phase 1: Static Site Foundation and Visual System
**Goal**: The project has a working static site foundation with shared Computingeducation-compatible page chrome.
**Depends on**: Nothing (first phase)
**Requirements**: [FOUND-01, FOUND-02, FOUND-03, VIS-01, VIS-02, VIS-03]
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. Developer can run a local static-site dev/build workflow without a server runtime or CMS.
  2. Start page and placeholder exhibit pages share the same header, footer, typography, color tokens, and content width.
  3. Header/navigation and footer visually fit the Computingeducation reference style on desktop and mobile.
  4. Site configuration is compatible with root deployment at `gallery.computingeducation.de`.
**Plans**: 3 plans

Plans:
**Wave 1**
- [x] 01-01: Scaffold Astro static site, scripts, and deployment-friendly config.

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 01-02: Implement shared layout, header, footer, and global visual tokens.

**Wave 3** *(blocked on Wave 2 completion)*
- [x] 01-03: Add baseline responsive shell pages and verify visual fit against Computingeducation.

### Phase 2: Source Content and Asset Migration
**Goal**: All required source exhibition content and media are available locally and ready for page generation.
**Depends on**: Phase 1
**Requirements**: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]
**UI hint**: no
**Success Criteria** (what must be TRUE):
  1. Source inventory includes the main exhibition page and all 17 exhibit source pages.
  2. Required images/media from source content exist under local project assets.
  3. Migrated content uses local media paths and preserves meaningful source links.
  4. "500 Linien" has a stable local content entry and route despite its query-string source URL.
  5. A scan of migrated source content finds no remaining WordPress media runtime dependencies.
**Plans**: 3 plans

Plans:
- [x] 02-01: Build source inventory and exhibit metadata map.
- [x] 02-02: Import/migrate article content and download required local media.
- [x] 02-03: Rewrite media references, preserve external learning links, and validate migration completeness.

### Phase 3: Exhibition Pages and Navigation
**Goal**: Visitors can browse the full exhibition through the start page and all exhibit detail pages.
**Depends on**: Phase 2
**Requirements**: [EXH-01, EXH-02, EXH-03, EXH-04, EXH-05, EXH-06, EXH-07, EXH-08, EXH-09, EXH-10, EXH-11, EXH-12, EXH-13, EXH-14, EXH-15, EXH-16, EXH-17, EXH-18, EXH-19]
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. Start page presents the exhibition introduction and a browseable index of all 17 exhibits.
  2. Each listed exhibit opens a dedicated local detail page with migrated content.
  3. Exhibit pages provide back-to-overview and previous/next navigation.
  4. Exhibit titles, images, captions, and article content render coherently within the shared visual system.
**Plans**: 3 plans

Plans:
- [x] 03-01: Implement content-driven exhibit routes and detail page layout.
- [x] 03-02: Build the exhibition start page and exhibit card grid with local previews.
- [ ] 03-03: Add exhibit navigation, metadata, and content rendering polish.

### Phase 4: Verification and Deployment Readiness
**Goal**: The static site is verified, polished, and ready for deployment under the gallery domain.
**Depends on**: Phase 3
**Requirements**: [QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05]
**UI hint**: yes
**Success Criteria** (what must be TRUE):
  1. Production build completes successfully.
  2. Built site contains no runtime references to source WordPress media URLs.
  3. Internal links from the start page to all exhibit pages work.
  4. Start page and representative exhibit pages render correctly on desktop and mobile screenshots.
  5. Long German titles and migrated article content do not overflow or overlap.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Add automated build/link/asset verification checks.
- [ ] 04-02: Run responsive visual QA, fix polish issues, and document deployment readiness.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Static Site Foundation and Visual System | 3/3 | Complete    | 2026-05-12 |
| 2. Source Content and Asset Migration | 3/3 | Complete    | 2026-05-12 |
| 3. Exhibition Pages and Navigation | 2/3 | In Progress|  |
| 4. Verification and Deployment Readiness | 0/2 | Not started | - |
