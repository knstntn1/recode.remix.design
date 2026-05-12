# Feature Research

**Domain:** Static exhibition/gallery website
**Researched:** 2026-05-12
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Exhibition start page | Visitors need orientation, title, framing, and entry points into the exhibition. | LOW | Use migrated introduction content and representative images. |
| Exhibit detail pages | The source content is organized as separate exhibit pages; preserving that structure improves scanning and direct linking. | MEDIUM | 17 exhibit pages from source links. |
| Local media assets | User explicitly requires independence from the original site. | MEDIUM | Download images/media and rewrite references. |
| Computingeducation visual identity | The site will live at `gallery.computingeducation.de`. | MEDIUM | Match colors, typography, header/footer feel, and restrained card layout. |
| Responsive layout | Gallery visitors will use desktop and mobile devices. | MEDIUM | Verify navigation, cards, and exhibit content on mobile. |
| Footer matching reference site | User explicitly called out footer. | LOW | Include Computingeducation-style copyright/maintainer/impressum pattern. |
| Internal navigation | Visitors need to move between overview and exhibits. | LOW | Include exhibit index, previous/next links, and breadcrumb/back links. |
| Static-hosting friendly build | Needed for deployment under gallery domain. | LOW | No server runtime or CMS dependency. |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Exhibit card grid with artwork previews | Makes the exhibition browseable and visually engaging. | MEDIUM | Use local thumbnails from source images. |
| Clear Recoding/Remixing/Design framing | Preserves the concept of the exhibition and helps visitors understand the pedagogy. | LOW | Pull from intro content. |
| Source/project links preserved | Keeps learning value by linking Snap!/program code where source pages include it. | MEDIUM | External educational links can remain external; media should be local. |
| SEO/social metadata | Useful for sharing the exhibition. | LOW | Static metadata per page. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full CMS | Makes future editing easier. | Adds maintenance, hosting, auth, and security for a small static exhibition. | Static content files with build process. |
| Exact clone of computingeducation.de Gatsby implementation | Seems easiest for visual consistency. | Overkill and creates dependency on a separate site's internals. | Recreate visual tokens and layout conventions locally. |
| Remote embeds for every source page | Faster migration. | Violates independence and makes the new site fragile. | Copy relevant HTML/text/media into local pages. |
| Heavy animation/gallery effects | Adds polish. | Can distract from artworks and risks mobile/layout issues. | Keep motion subtle or absent. |

## Feature Dependencies

```text
Computingeducation visual baseline
    -> shared layout/header/footer
        -> start page
        -> exhibit detail pages

Source content inventory
    -> local asset download
        -> link/media rewriting
            -> static build verification

Exhibit metadata
    -> exhibit grid
    -> previous/next navigation
    -> page metadata
```

### Dependency Notes

- **Shared layout before pages:** Header, footer, typography, colors, and content width should be established first so pages do not drift visually.
- **Inventory before migration:** The source includes one preview-style `page_id=625&preview=true` link for "500 Linien"; this needs resolution during content import.
- **Asset download before verification:** Visual QA is only meaningful after local media paths replace source WordPress URLs.

## MVP Definition

### Launch With (v1)

- [ ] Start page with migrated exhibition introduction and exhibit index.
- [ ] 17 exhibit subpages with migrated content.
- [ ] Local copies of all required images/media used by migrated pages.
- [ ] Computingeducation-inspired visual system and footer.
- [ ] Responsive navigation and page layouts.
- [ ] Production static build with no broken internal links or missing local assets.

### Add After Validation (v1.x)

- [ ] Search/filter by exhibit title or theme if visitors need faster discovery.
- [ ] More refined image optimization if page weight is high.
- [ ] Print-friendly view if exhibition use requires handouts.

### Future Consideration (v2+)

- [ ] CMS/editor workflow if non-developers need frequent updates.
- [ ] Multilingual content if the exhibition needs a non-German audience.
- [ ] Analytics if visitor behavior matters and privacy/legal requirements are addressed.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Start page | HIGH | LOW | P1 |
| Exhibit detail pages | HIGH | MEDIUM | P1 |
| Local media migration | HIGH | MEDIUM | P1 |
| Computingeducation styling | HIGH | MEDIUM | P1 |
| Responsive QA | HIGH | MEDIUM | P1 |
| SEO/social metadata | MEDIUM | LOW | P2 |
| Search/filter | LOW | MEDIUM | P3 |
| CMS | LOW | HIGH | P3 |

## Source Content Inventory

Primary source page:

- `http://experimente.joachim-wedekind.de/recode-remix-design/`

Exhibit pages:

- Schotter - `http://experimente.joachim-wedekind.de/addi-schotter/`
- Boxes - `http://experimente.joachim-wedekind.de/addi-boxes/`
- 500 Linien - `http://experimente.joachim-wedekind.de/?page_id=625&preview=true`
- Quadrate - `http://experimente.joachim-wedekind.de/addi-quadrate/`
- Binary Rhythm - `http://experimente.joachim-wedekind.de/addi-binaryrhythm/`
- Grid Based Systems - `http://experimente.joachim-wedekind.de/addi-grid-based-systems/`
- Inequality - `http://experimente.joachim-wedekind.de/addi-optical-effect-of-inequality/`
- Permutationen - `http://experimente.joachim-wedekind.de/addi-permutationen/`
- Labyrinth - `http://experimente.joachim-wedekind.de/addi-labyrinth/`
- Random Windows - `http://experimente.joachim-wedekind.de/addi-random-windows/`
- n-Ecken - `http://experimente.joachim-wedekind.de/addi-n-ecke/`
- Kraftlinien - `http://experimente.joachim-wedekind.de/addi-kraftlinien/`
- Komputerstrukturen - `http://experimente.joachim-wedekind.de/addi-komputerstrukturen/`
- Farbzentren - `http://experimente.joachim-wedekind.de/addi-farbzentren/`
- Punkt.Linie.Flaeche - `http://experimente.joachim-wedekind.de/addi-punkt-linie-flaeche/`
- Fraktale - `http://experimente.joachim-wedekind.de/addi-fraktale/`
- Sinus Addition - `http://experimente.joachim-wedekind.de/addi-sinus-addition/`

## Sources

- User brief - start page plus subpages, independent static page, Computingeducation look, later under `gallery.computingeducation.de`.
- Source WordPress page and WordPress REST response for page 590 - exhibit link inventory.
- computingeducation.de - visual conventions and footer pattern.

---
*Feature research for: Recode.Remix.Design*
*Researched: 2026-05-12*
