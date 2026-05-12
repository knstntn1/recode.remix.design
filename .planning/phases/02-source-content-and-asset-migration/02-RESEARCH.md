---
phase: 2
status: completed
researched_at: 2026-05-12
---

# Phase 2 Research: Source Content and Asset Migration

## Source Access

- Main source page: `http://experimente.joachim-wedekind.de/recode-remix-design/`
- WordPress REST page endpoint is available at `http://experimente.joachim-wedekind.de/wp-json/wp/v2/pages/590`.
- The HTML page and REST endpoint are served over HTTP and return WordPress 6.8.5 content.
- Source media appears under `http://experimente.joachim-wedekind.de/wp-content/uploads/sites/10/...`.

## Exhibit Source Map

| Order | Title | Source URL / Page |
|-------|-------|-------------------|
| 1 | Schotter | `/addi-schotter/`, page `635` |
| 2 | Boxes | `/addi-boxes/`, page `652` |
| 3 | 500 Linien | `/?page_id=625&preview=true`, page `625`, REST slug `500-linien` |
| 4 | Quadrate | `/addi-quadrate/`, page `691` |
| 5 | Binary Rhythm | `/addi-binaryrhythm/`, page `678` |
| 6 | Grid Based Systems | `/addi-grid-based-systems/`, page `700` |
| 7 | Inequality | `/addi-optical-effect-of-inequality/`, page `689` |
| 8 | Permutationen | `/addi-permutationen/`, page `735` |
| 9 | Labyrinth | `/addi-labyrinth/`, page `748` |
| 10 | Random Windows | `/addi-random-windows/`, page `745` |
| 11 | n-Ecken | `/addi-n-ecke/`, page `732` |
| 12 | Kraftlinien | `/addi-kraftlinien/`, page `671` |
| 13 | Komputerstrukturen | `/addi-komputerstrukturen/`, page `752` |
| 14 | Farbzentren | `/addi-farbzentren/`, page `729` |
| 15 | Punkt.Linie.Flaeche | `/addi-punkt-linie-flaeche/`, page `755` |
| 16 | Fraktale | `/addi-fraktale/`, page `660` |
| 17 | Sinus Addition | `/addi-sinus-addition/`, page `737` |

## Recommended Migration Shape

- Use REST API content rather than scraping rendered theme chrome.
- Use `cheerio` for parsing and rewriting `content.rendered`.
- Store structured content in `src/data/`:
  - `src/data/exhibit-manifest.json`
  - `src/data/exhibition.json`
  - `src/data/exhibits/*.json`
- Store downloaded media in `public/assets/recode-remix-design/`.
- Rewrite required WordPress media links to root-relative `/assets/recode-remix-design/...` paths.
- Preserve non-media external links such as Wikipedia, Snap!, and book/source links.

## Verification Implications

- Verify exactly 17 exhibit entries.
- Verify `500 Linien` has a stable local slug, independent of the preview/query source URL.
- Verify no migrated data contains `experimente.joachim-wedekind.de/wp-content`.
- Verify every local media reference in migrated JSON has a corresponding file under `public/`.
