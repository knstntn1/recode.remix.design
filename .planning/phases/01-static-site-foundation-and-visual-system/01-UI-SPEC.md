---
phase: 1
slug: static-site-foundation-and-visual-system
status: approved
shadcn_initialized: false
preset: none
created: 2026-05-12
---

# Phase 1 - UI Design Contract

> Visual and interaction contract for the static site foundation and Computingeducation-compatible visual system.

---

## Phase Scope

Phase 1 establishes the shared page shell used by the Recode.Remix.Design gallery: Astro static-site foundation, base layout, global styles, header, footer, and baseline responsive pages. It must make later content pages feel native to `computingeducation.de` without cloning its Gatsby implementation.

**Locked product context:**
- The site is a static German-language exhibition website.
- It will later live under `https://gallery.computingeducation.de`.
- The visual system must align with Computingeducation: restrained education/research style, dark blue header/footer, light background, white surfaces, system sans typography, compact navigation, and matching footer pattern.
- This phase may use placeholder content only where later phases will migrate actual exhibit content.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none |
| Icon library | none for Phase 1; only add icons later if a concrete control needs them |
| Font | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif` |

**Implementation contract:**
- Use plain Astro components and global CSS custom properties.
- Do not add Tailwind, shadcn, Radix, animation libraries, or a CMS for Phase 1.
- Use CSS tokens for color, typography, spacing, radius, shadow, and layout width before styling individual components.
- Keep runtime JavaScript unnecessary for the static shell.

---

## Layout Contract

| Element | Contract |
|---------|----------|
| Page background | `#f4f8fb` across the full viewport below/around content |
| Main width | Center content in a `max-width: 1040px` container with `padding-inline: 4vw` |
| Header | Full-width dark blue band, white text/logo treatment, compact nav below or within header |
| Header height | Compact, not a marketing hero; enough room for title/identity without hiding page content |
| Main content | Starts close enough to header to feel like Computingeducation cards/content, but no overlapping text |
| Footer | Full-width dark blue band, `padding-top: 20px`, `padding-bottom: 60px`, white/70% text, responsive stacked layout on narrow screens |
| Cards/surfaces | White background, 5px radius, subtle Computingeducation-like shadow |
| Mobile | Header/nav/footer stack cleanly; no horizontal scrolling; nav remains readable |

**Do not:**
- Do not create a large decorative marketing hero.
- Do not use gradient/orb backgrounds.
- Do not nest cards inside cards.
- Do not make page sections look like floating cards unless they are actual repeated item cards.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tiny label gaps, separator offsets |
| sm | 8px | Compact nav spacing, small text gaps |
| md | 16px | Default paragraph/component spacing |
| lg | 24px | Card padding, footer row gaps |
| xl | 32px | Section spacing and grid gaps |
| 2xl | 48px | Major content breaks |
| 3xl | 64px | Top-level page spacing |

Exceptions: `4vw` horizontal page padding is allowed to match Computingeducation's responsive container treatment.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 15px desktop, 15px mobile | 400 | 1.6 |
| Label | 12px | 500 | 1.15 |
| Heading | 20px | 700 | 1.15 |
| Display | 38px desktop, 28px tablet, 22px mobile | 700 | 1.1 |

**Typography rules:**
- Letter spacing is `0` for body and headings.
- Navigation/category labels may use `0.4px` to `0.5px` letter spacing and uppercase, matching Computingeducation.
- Body text color is `#3b474d`.
- Strong title/text color is `#15171A`.
- Do not scale font size with viewport width.
- Long German words and titles must wrap without overflow.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#f4f8fb` | Page background |
| Secondary (30%) | `#ffffff` | Content surfaces, placeholder cards |
| Accent (10%) | `#0a3d7c` | Header, footer, primary brand band |
| Link | `#26a6ed` | Inline links and focus-visible link accents |
| Text | `#3b474d` | Body copy |
| Heading | `#15171A` | Titles and high-emphasis text |
| Muted | `#738a94` | Labels, metadata, secondary footer text |
| Border | `#e4eaed` | Dividers, subtle content boundaries |
| Destructive | `#cf2e2e` | Destructive actions only; likely unused in Phase 1 |

Accent reserved for: header background, footer background, active/primary navigation treatment, and selected brand accents only. Do not use blue on every interactive element.

---

## Component Contracts

### Site Header

**Purpose:** Establish the gallery as part of the Computingeducation environment.

**Required structure:**
- Dark blue full-width band.
- Centered inner container with max-width 1040px.
- Site identity text: `Recode.Remix.Design` for this gallery.
- Optional small association text: `Computingeducation Gallery`.
- Compact uppercase nav with at least `Ausstellung` and `Exponate` anchors/links.

**Visual contract:**
- Background `#0a3d7c`.
- Text white or rgba white at 0.8.
- Nav items use compact uppercase labels, 12px, medium weight, slight letter spacing.
- Hover/focus increases opacity or underlines; focus-visible must be obvious.

### Site Footer

**Purpose:** Match Computingeducation footer expectations.

**Required structure:**
- Dark blue full-width band.
- Centered max-width 1040px flex layout on desktop, stacked layout under 650px.
- Copyright/maintainer text pattern:
  - `Computingeducation © 2026`
  - `Computingeducation is designed and maintained by Tilman Michaeli & Stefan Seegerer`
- Include `Impressum` link.
- RSS link may be omitted unless the built site actually provides RSS.

**Visual contract:**
- Footer text rgba white at 0.7.
- Footer links inherit rgba white at 0.7 and become white on hover/focus.
- Use subtle dot separators between footer nav links if multiple links exist.

### Main Shell

**Purpose:** Provide a reusable frame for Phase 3 pages.

**Required structure:**
- `main` element with centered max-width 1040px container.
- Page sections are unframed layouts unless they are repeated item cards.
- Include a placeholder content area that can later host the exhibition intro and exhibit grid.

### Placeholder Cards

**Purpose:** Prove the visual token system for later exhibit cards without final content dependency.

**Required structure:**
- White surface, 5px radius.
- Shadow matching Computingeducation-like values: `rgba(39,44,49,0.06) 8px 14px 38px` and `rgba(39,44,49,0.03) 1px 3px 8px`.
- Stable min width/height behavior; no layout shift on hover.

**Hover contract:**
- Optional subtle lift only: max `translateY(-1px)` and small shadow increase.
- Do not scale cards enough to create overlap or reflow.

---

## Interaction Contract

| Interaction | Contract |
|-------------|----------|
| Header nav hover | Increase opacity to 1 or underline; no layout shift |
| Header nav focus | Visible `outline` or underline with sufficient contrast |
| Footer link hover | Text becomes full white; no layout shift |
| Card hover | Optional subtle shadow/lift; disabled/reduced under `prefers-reduced-motion` |
| Mobile nav | No hamburger required in Phase 1 unless links overflow; horizontal scroll is acceptable only if it does not hide content or create page-level overflow |

---

## Responsive Contract

| Viewport | Contract |
|----------|----------|
| 1280px desktop | Header/footer fill width; inner content maxes at 1040px; cards/content align cleanly |
| 900px tablet | Header remains compact; page content does not collide with nav |
| 650px mobile | Footer stacks vertically; nav remains readable; no horizontal page scrolling |
| 375px mobile | Long title `Recode.Remix.Design` fits or wraps cleanly; text does not overlap |

**Verification targets for Phase 1:**
- Desktop screenshot around 1280x900.
- Mobile screenshot around 390x844.
- Check for horizontal scroll and overlapping text.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Site identity | Recode.Remix.Design |
| Association label | Computingeducation Gallery |
| Primary nav item | Ausstellung |
| Secondary nav item | Exponate |
| Placeholder page heading | Recode.Remix.Design |
| Placeholder intro copy | Statische Ausstellungsseite im Aufbau. |
| Empty state heading | Inhalte werden vorbereitet |
| Empty state body | Die Exponate und Medien werden in der nächsten Phase lokal migriert. |
| Error state | Inhalt konnte nicht geladen werden. Bitte Build-Ausgabe und Content-Dateien prüfen. |
| Destructive confirmation | Not applicable; Phase 1 has no destructive UI actions. |

**Copy rules:**
- User-facing page copy is German.
- Technical/dev-facing comments and metadata can be English.
- Do not add visible instructional text about keyboard shortcuts, layout choices, or implementation details.

---

## Accessibility Contract

| Area | Requirement |
|------|-------------|
| Landmarks | Use semantic `header`, `nav`, `main`, and `footer` landmarks |
| Focus | All links have visible focus states |
| Contrast | Header/footer text meets contrast against `#0a3d7c`; body text meets contrast against white and `#f4f8fb` |
| Motion | Any hover transition respects `prefers-reduced-motion` |
| Images | Phase 1 placeholders must not require decorative alt text; later real media must receive meaningful or empty alt based on content role |
| Skip link | Include or prepare a skip-to-content link if navigation grows beyond a few links |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party registries | none | not allowed for Phase 1 |

---

## Implementation Guardrails

- Keep all visual tokens in one global CSS location.
- Do not hard-code remote `computingeducation.de` asset dependencies.
- Do not add analytics, RSS generation, CMS code, or source-content migration in Phase 1.
- Do not implement final exhibit pages in Phase 1; only the reusable shell and placeholder routes/content needed to prove layout.
- Keep generated HTML static-hosting friendly.
- Use root-compatible paths and set canonical/site metadata for `https://gallery.computingeducation.de` when the Astro config is created.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-05-12
