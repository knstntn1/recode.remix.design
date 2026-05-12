# Recode.Remix.Design

## What This Is

Recode.Remix.Design is a simple static exhibition website for the art exhibition of the same name. It presents the already prepared German-language exhibition material from Joachim Wedekind's "Experimente" site in a new standalone web presence that visually fits into the look of computingeducation.de.

The site will have a start page for the exhibition and separate detail pages for each exhibit. It will later be embedded or hosted under `gallery.computingeducation.de`, so all required content and media should be available locally instead of depending on the original WordPress site.

## Core Value

Visitors can browse the Recode.Remix.Design exhibition independently under the Computingeducation visual identity, with all exhibit information and media available without relying on the source site.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] Create a static website for the Recode.Remix.Design exhibition.
- [ ] Match the visual language of computingeducation.de, especially typography, color scheme, header/navigation feel, and footer.
- [ ] Provide a start page for the exhibition.
- [ ] Provide separate detail pages for all listed exhibits.
- [ ] Migrate the existing German-language content from `http://experimente.joachim-wedekind.de/recode-remix-design/` and linked exhibit pages.
- [ ] Copy required images and media locally so the new site is independent from the source WordPress site.
- [ ] Prepare the site for later deployment or embedding at `gallery.computingeducation.de`.

### Out of Scope

- Rewriting or editorially changing the exhibition content - the existing prepared content should be übernommen as-is unless technical cleanup is required.
- Building a CMS or editing backend - the requested deliverable is a simple static website.
- Depending on remote media from the source WordPress site - the new page should work independently.
- Recreating the full computingeducation.de site - only the relevant visual identity and footer conventions should be mirrored.

## Context

The user needs a small static information website for an art exhibition titled "Recode.Remix.Design". The source content is already prepared on Joachim Wedekind's WordPress site at `http://experimente.joachim-wedekind.de/recode-remix-design/` and its linked exhibit pages:

- Schotter
- Boxes
- 500 Linien
- Quadrate
- Binary Rhythm
- Grid Based Systems
- Inequality
- Permutationen
- Labyrinth
- Random Windows
- n-Ecken
- Kraftlinien
- Komputerstrukturen
- Farbzentren
- Punkt.Linie.Flaeche
- Fraktale
- Sinus Addition

The Computingeducation reference site uses a restrained research/education visual style: light page background, white content cards, dark blue header/footer, sans-serif typography, compact uppercase navigation labels, and a footer with Computingeducation copyright, maintainer text, Impressum, and RSS links. The new gallery should feel like it belongs to that environment while focusing on an exhibition browsing experience rather than a blog index.

The source exhibition page explains the exhibition as a homage to early computer art pioneers of the 1960s. Joachim Wedekind's works connect recoding, remixing, and designing algorithmic art objects with visual programming in Snap!. The site should preserve that framing and make the individual exhibit pages easy to navigate.

## Constraints

- **Deployment**: The site will later live under `gallery.computingeducation.de` - paths, assets, and links should be static-hosting friendly.
- **Independence**: All required images and media from the source pages must be copied locally - the new site must not depend on the original WordPress media URLs.
- **Visual identity**: Typography, color scheme, footer, and general page feel should align with computingeducation.de.
- **Content fidelity**: Existing prepared content should be transferred directly, with only necessary structural or technical cleanup.
- **Scope**: Keep this a simple static site, not a CMS or dynamic application.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static website | The requested deliverable is a simple exhibition information site. | - Pending |
| Start page plus exhibit subpages | The exhibition has a main introduction and 17 linked exhibit pages, so separate pages preserve the existing structure and make browsing clearer. | - Pending |
| Local asset copy | The new site should be independent from the original source site. | - Pending |
| Computingeducation visual fit | The gallery will be embedded under `gallery.computingeducation.de`. | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-12 after initialization*
