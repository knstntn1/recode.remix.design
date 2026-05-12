---
plan: 03-01
phase: 03
status: completed
completed_at: 2026-05-12
---

# Plan 03-01 Summary: Content-Driven Exhibit Routes

## Completed

- Replaced the placeholder exhibit route with manifest-driven static paths.
- Added `ArticleContent` for migrated local HTML rendering.
- Added `ExhibitNavigation` for overview and previous/next exhibit navigation.
- Added content styling for figures, images, captions, headings, lists, embeds, and wrapping.
- Generated all 17 exhibit routes from local JSON data.

## Requirements Covered

- EXH-02 through EXH-19

## Verification

- `npm run check`
- `npm run build`

Astro built 18 static pages: the start page plus 17 exhibit pages.
