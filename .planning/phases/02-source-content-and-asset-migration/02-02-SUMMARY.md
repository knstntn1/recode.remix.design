---
plan: 02-02
phase: 02
status: completed
completed_at: 2026-05-12
---

# Plan 02-02 Summary: Content Import and Local Media

## Completed

- Added `scripts/migrate-source-content.mjs`.
- Added `migrate:content` npm script.
- Migrated the main exhibition source page into `src/data/exhibition.json`.
- Migrated all 17 exhibit pages into `src/data/exhibits/*.json`.
- Downloaded required source media into `public/assets/recode-remix-design/`.
- Rewrote migrated media references to local `/assets/recode-remix-design/...` paths.
- Preserved non-media external links in `externalLinks`.

## Requirements Covered

- CONT-01
- CONT-02
- CONT-03
- CONT-04

## Verification

- `npm run migrate:content`
- `test -f src/data/exhibition.json`
- `test "$(find src/data/exhibits -name '*.json' | wc -l | tr -d ' ')" = "17"`
- `rg '"contentHtml"' src/data/exhibition.json src/data/exhibits`
- `! rg "experimente\\.joachim-wedekind\\.de/wp-content" src/data`
- `npm run check`

All checks completed successfully. The migration produced 46 local media files.
