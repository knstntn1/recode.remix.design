# Pitfalls Research

**Domain:** Static exhibition/gallery website
**Researched:** 2026-05-12
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Remote Asset Dependency Survives Migration

**What goes wrong:**
The new static site appears complete, but images still load from `experimente.joachim-wedekind.de`.

**Why it happens:**
Copied HTML often contains absolute WordPress upload URLs, `srcset` entries, links to attachments, and inline image references.

**How to avoid:**
Inventory all `img`, `srcset`, `href`, and downloadable media references; download required files; rewrite references to local paths; scan final source and build output for source-domain URLs.

**Warning signs:**
Build output still contains `experimente.joachim-wedekind.de/wp-content/uploads` or pages look correct only while online.

**Phase to address:**
Content migration and asset import phase.

---

### Pitfall 2: Visual Fit Is Superficial

**What goes wrong:**
The page uses the right blue but does not feel like computingeducation.de because typography, spacing, cards, footer, and responsive behavior differ.

**Why it happens:**
Teams copy one or two colors instead of extracting layout and typography conventions.

**How to avoid:**
Establish a visual baseline first: dark blue header/footer `#0a3d7c`, light background `#f4f8fb`, white cards, 5px radii, system sans font stack, compact uppercase nav, footer link treatment.

**Warning signs:**
Hero-heavy marketing layout, oversized decorative typography, footer mismatch, or cards that look unrelated to Computingeducation.

**Phase to address:**
Visual foundation phase.

---

### Pitfall 3: Content Fidelity Loss During Cleanup

**What goes wrong:**
Important captions, source links, program code links, or exhibit context are lost while stripping WordPress markup.

**Why it happens:**
Automated scraping treats content as generic HTML and removes "messy" elements that are semantically meaningful.

**How to avoid:**
Preserve article body order, captions, links, and media. Clean technical WordPress wrappers, but review migrated pages against source pages.

**Warning signs:**
Pages have images but missing explanatory text, or links to Snap!/program code disappear.

**Phase to address:**
Content migration and review phase.

---

### Pitfall 4: Broken Route for "500 Linien"

**What goes wrong:**
The "500 Linien" page is missing or points to a preview URL that does not work in the final static site.

**Why it happens:**
The source link is `?page_id=625&preview=true` instead of a clean permalink like the other exhibit pages.

**How to avoid:**
Resolve that page explicitly during import, assign a stable local slug such as `/exponate/500-linien/`, and verify content loaded.

**Warning signs:**
Import script skips query-string URLs or treats the page as duplicate/invalid.

**Phase to address:**
Content inventory/import phase.

---

### Pitfall 5: Desktop-Only Gallery Layout

**What goes wrong:**
The exhibit grid and long migrated article content look acceptable on desktop but break on mobile.

**Why it happens:**
WordPress source content contains floated images and fixed image widths; card grids can also overflow if titles are long.

**How to avoid:**
Normalize migrated image layout in CSS, avoid floats on mobile, use responsive cards, and verify with mobile screenshots.

**Warning signs:**
Text wraps around tiny images awkwardly, horizontal scrolling, overlapping cards, or footer/nav overflow.

**Phase to address:**
Responsive QA phase.

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Manually paste all HTML without import script | Fast initial progress | Hard to audit media URLs and repeat fixes | Only if followed by automated scans and manual page review |
| One giant CSS file with page-specific exceptions | Quick visual fixes | Style drift and regressions | Acceptable for a small site only if organized by section/tokens |
| Keep source URLs in comments/data | Easier traceability | False positives in independence scan | Store source URLs only in metadata, not rendered HTML, if needed |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| WordPress REST/HTML | Importing full theme page instead of article content | Extract the page/article body and metadata only |
| WordPress images | Ignoring `srcset` and attachment links | Download all referenced media variants needed or normalize to one local asset |
| Computingeducation style | Depending on remote Gatsby assets | Use local CSS and, if needed, local logo/brand assets |
| Static deployment | Hard-coded development URLs | Configure canonical site URL and root-relative internal links |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Full-size source images everywhere | Slow first load, layout shifts | Generate thumbnails for cards and constrain article media | Immediately on mobile |
| Too much client-side JavaScript | Slower pages for no benefit | Keep the site mostly static | Any low-powered device |
| Unbounded card text | Uneven grid and overflow | Use consistent card metadata/excerpts and responsive constraints | Long German exhibit titles |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Copying arbitrary source scripts | Tracking/security issues from unrelated WordPress plugins | Strip scripts; keep static HTML/content only |
| Leaving mixed `http://` media references | Browser warnings and broken secure deployment | Use local assets and HTTPS canonical URL |
| Embedding third-party analytics by default | Privacy/legal concerns | Do not add analytics unless explicitly required |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Landing page hides exhibit links | Visitors cannot quickly enter the exhibition | Put exhibit grid on the start page |
| Missing previous/next navigation | Visitors must return to overview after every page | Add previous/next and back-to-overview links |
| Over-cleaned article content | Educational value is reduced | Preserve explanatory structure, captions, and program/source links |
| Footer mismatch | The site feels detached from Computingeducation | Match footer structure and colors closely |

## "Looks Done But Isn't" Checklist

- [ ] **Asset independence:** Scan source and build output for `experimente.joachim-wedekind.de/wp-content`.
- [ ] **All exhibits:** Verify 17 exhibit pages exist and are linked from the start page.
- [ ] **500 Linien:** Verify the preview/query-string source page has a stable local page.
- [ ] **Responsive layout:** Capture desktop and mobile screenshots of overview and representative exhibit pages.
- [ ] **Footer/header:** Compare against computingeducation.de reference styling.
- [ ] **Build:** Run production build and static preview.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Remote assets remain | MEDIUM | Run domain scan, download missing files, rewrite paths, rebuild |
| Visual mismatch | MEDIUM | Rework tokens/layout before page-specific styling |
| Missing migrated content | HIGH | Re-import source page, diff against source article body, review manually |
| Broken routes | LOW | Fix slug/data map and regenerate static pages |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Remote asset dependency | Content migration | Domain scan in source/build output |
| Visual fit superficial | Visual foundation | Screenshot comparison against reference |
| Content fidelity loss | Content migration/review | Manual source-vs-local review sample and link checks |
| 500 Linien route | Content inventory/import | Dedicated route test |
| Desktop-only layout | Responsive QA | Playwright screenshots at desktop/mobile |

## Sources

- User requirements from project initialization.
- Source WordPress page markup and REST response.
- computingeducation.de visual inspection.
- Astro/Vite static site documentation.

---
*Pitfalls research for: Recode.Remix.Design*
*Researched: 2026-05-12*
