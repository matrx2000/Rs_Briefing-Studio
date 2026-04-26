# Product spec — R's Briefing Studio

A working spec for a static web app that turns proposals into beautifully designed, two-page briefings, with two flavors (Executive Level Reporting and Engineering Reporting), live preview, and PDF export. Runs from plain HTML files — no server, no installer, no tracking. Tailwind, Alpine.js and the Geist font are pulled from public CDNs on first load and cached afterwards, so the app works offline thereafter; for an air-gapped build see *Going fully offline* in the README.

This document describes **the implementation as it currently ships**. Use it when you need to extend or modify the project.

---

## 1. Vision

A single-purpose tool where a user fills in structured fields about an idea, sees a live preview, and exports a polished two-page briefing to PDF. The output is designed to be **skimmable in 90 seconds (page 1)** with **full context available on demand (page 2)**.

The visual benchmark is the bento-grid aesthetic — mixed tile sizes, premium typography, tight spacing, restrained color, generous use of an accent stripe per mode (blue for Executive, green for Engineering).

## 2. Target user & problem

**User:** anyone who needs to pitch an idea or a technical change to busy decision-makers — managers, founders, consultants, product teams, engineering leads, plant engineers.

**Problem they have today:** Word docs are dense and ugly. Slide decks take hours and sprawl. There is no fast way to produce a single beautifully-designed page that respects the reader's time and still looks credible.

**What this app gives them:** Structure (a proven briefing template) + design (premium look out of the box) + speed (fill and export in minutes) + a discipline-forcing UI (info hints next to every section that nudge the writer toward concise, decision-focused communication).

## 3. Two report types

The app is two sibling editors plus a landing page.

| App | File | Audience | Accent color | localStorage prefix |
|---|---|---|---|---|
| Executive Level Reporting | `app-exec.html` | Decision-makers, leadership | Blue `#1d4ed8` | `briefing-…` |
| Engineering Reporting | `app-eng.html` | Technical reviewers, eng leads, PM | Green `#16a34a` | `eng-briefing-…` |
| Landing | `index.html` | Project picker / open existing | — | — |

The chrome of each editor shows the active mode in a colored pill. The same color is the active state of the paper-size toggle, the info-button pulse, and the splitter hover state — so the writer always knows which mode they are in.

## 4. Output format — two pages

Both apps render two pages stacked. Page-1 is a bento dashboard, page 2 is editorial prose. **Both pages are always shown** in the preview and both are emitted to print (no toggle).

### 4.1 Page 1 — Executive Level Reporting (bento)

Tile layout on a 12-column CSS grid, with `grid-auto-rows: min-content` so rows shrink to content (no wasted space).

| # | Tile | Span | Style | Content |
|---|---|---|---|---|
| 1 | Bottom line (proposal) | col-span-8 | Light tinted | Eyebrow + headline + supporting sentence (max 1150 chars, with live counter) |
| 2 | Headline metric | col-span-4 (vertical) / 3 (horizontal w/ image) | Light tinted | Eyebrow + auto-scaling number + unit + caption |
| 2b | *(optional)* Metric image | col-span-3 | Plain tile | User-uploaded image, base64-embedded |
| 2c | *(optional)* Commentary | col-span 1/-1 | Plain tile | Heading + 1–2 paragraphs, hidden if both empty |
| 3 | 5 Ws + H | col-span 1/-1 (full row) | Plain tile | What, Why, Who, When, Where, How — 6-column inner grid |
| 4 | Pros / Cons | col-span 1/-1 | Two side-by-side tiles | Green / amber accent, 2–4 bullets each |
| 5 | Timeline | col-span-8 | Plain tile | 4 phases with progress bars |
| 6 | The Ask / CTA | col-span-4 | Blue accent stripe | Eyebrow + headline + pill button with deadline |

Header shows: title (with subtitle as muted prefix), eyebrow with date, audience, prepared-by, decision-by, computed read time. Footer has prepared-by + a single tagline.

### 4.2 Page 1 — Engineering Reporting (bento)

| # | Tile | Span | Style | Content |
|---|---|---|---|---|
| 1 | Technical proposal | col-span-8 | Light tinted | Eyebrow + headline + supporting |
| 2 | Effort | col-span-4 (vertical) / 3 (horizontal w/ image) | Light tinted | Eyebrow + value + unit + caption + evidence tag |
| 2b | *(optional)* Effort image | col-span-3 | Plain tile | base64-embedded |
| 3 | What changes | col-span-7 | Plain tile | Component / before / after rows |
| 4 | Cost & value | col-span-5 | Green left-stripe | Cost / value rows with amounts + period + evidence tag |
| 5 | Trade-offs | col-span-6 | Plain tile | Options with pros/cons; chosen one marked |
| 6 | Risks | col-span-6 | Amber left-stripe | Category + level + note + evidence tag |
| 7 | Open questions | col-span-8 | Plain tile | Bulleted list (2 columns) |
| 8 | The ask / decision | col-span-4 | Blue left-stripe | Eyebrow + headline + reviewers + pill button |

Header includes a confidence-stage pill (Discovery / Hypothesis / Validated). Footer has a legend explaining the M/E/G evidence tags.

### 4.3 Page 2 — Editorial context

Single-column editorial layout providing depth. Reading time: ~3–5 minutes.

**Executive context sections:**
1. Background & history
2. Problem statement
3. Stakeholders (name + role)
4. Detailed considerations (bullets)
5. Alternatives considered (option + reason set aside)
6. Risks & mitigations
7. Supporting data

**Engineering context sections:**
1. Motivation & problem
2. Design approach
3. Dependencies (name + status)
4. Testing plan
5. Rollout plan
6. Rollback
7. Monitoring & metrics
8. References

## 5. Design system

### Tokens (defined as CSS custom properties at the top of each editor)

| Token | Value |
|---|---|
| `--ink` | `#1d1d1f` |
| `--ink-soft` | `#6b6b70` |
| `--hair` | `#e5e5e7` |
| `--paper` | `#ffffff` |
| `--paper-tint` | `#f5f5f7` |
| `--accent-green` | `#16a34a` |
| `--accent-amber` | `#b45309` |
| `--accent-blue` | `#1d4ed8` |
| `--accent-red` | `#b91c1c` |
| `--mode-accent` | `#1d4ed8` (exec) / `#16a34a` (eng) |
| `--mode-accent-soft` | mode-accent at 12% alpha |
| Typography | **Geist** (single typeface, weights 400/500/600/700) |
| Headline tracking | `-0.035em` (`tight`); `-0.05em` on `tnum` for numerals |
| Eyebrow labels | `10–11px`, `letter-spacing: 0.18em`, uppercase, weight 500 |
| Tile border-radius | `5mm` |
| Tile padding | `4mm 5mm` |
| Bento grid gap | `3mm` |
| A4 inner padding | `10mm 12mm` |
| A4 size | `210 × 297 mm` |
| A3 size | `297 × 420 mm` |

### Editor (form pane) themes

The light/dark choice in the chrome (`☾ Dark` / `☀ Light`) applies **only to the editor**. The printed sheet is always white and ink-friendly. Dark editor mode is the default.

A `body.editor-dark` class triggers darker form pane, chrome, inputs, modal, splitter, hint icons. The preview pane background and the `.a4` sheet remain light at all times.

### Templates (deprecated)

The earlier "Apple Bento Dark" template is gone. The remaining templates are `bento-light` (executive) / `eng-light` (engineering) and `print-classic` (a serif-led variant kept for completeness — kept as a class hook but not heavily styled).

## 6. Data model (TypeScript-style)

Both apps round-trip cleanly to JSON via *Save Project*. The image is embedded as a `data:image/...;base64,...` string so the project file is fully self-contained.

```typescript
type ExecutiveBriefing = {
  meta: {
    title: string;
    subtitle: string;       // small framing word, e.g. "Project"
    authorName: string;
    date: string;           // ISO
    audience: string;
    decisionBy: string;     // ISO
    readTimeSeconds: number;
    companyName: string;          // shown in footer when non-empty
    confidential: boolean;        // renders red CONFIDENTIAL pill in both footers (default true)
  };
  bluf: {                        // "bottom line" tile — key kept as `bluf` for backward compatibility with saved JSON files
    eyebrow: string;
    headline: string;
    headlineEmphasis?: string;   // legacy — substring once italicized
    supporting: string;           // capped at 1150 chars in the form
  };
  metric: {
    label: string;
    value: string;
    unit?: string;
    caption: string;
    image: string | null;        // data: URL, base64-embedded
    orientation: 'vertical' | 'horizontal';
    imageFit: 'cover' | 'width' | 'height';
  };
  commentary: {
    heading: string;
    p1: string;                  // optional
    p2: string;                  // optional
  };
  fiveWsH: {
    what: string; why: string; who: string;
    when: string; where: string; how: string;
  };
  pros: string[];                // 2–4
  cons: string[];                // 2–4
  timeline: {
    phases: Array<{
      label: string;
      title: string;
      description: string;
      progress: number;          // 0–100
    }>;
  };
  cta: {
    eyebrow: string;
    headline: string;
    headlineEmphasis?: string;
    buttonText: string;
  };
  context: {
    background: string;
    problem: string;
    stakeholders: Array<{ name: string; role: string }>;
    considerations: string[];
    alternatives: Array<{ option: string; reason: string }>;
    risks: Array<{ risk: string; mitigation: string }>;
    supportingData: string;
  };
};

type EngineeringBriefing = {
  meta: {
    title: string;
    subtitle: string;
    authorName: string;
    date: string;
    audience: string;
    decisionBy: string;
    stage: 'discovery' | 'hypothesis' | 'validated';
    companyName: string;
    confidential: boolean;
  };
  proposal: { eyebrow; headline; headlineEmphasis?; supporting; };
  effort: {
    value: string;
    unit: string;
    caption: string;
    evidence: 'measured' | 'estimated' | 'gut';
    image: string | null;
    orientation: 'vertical' | 'horizontal';
    imageFit: 'cover' | 'width' | 'height';
  };
  changes: {
    eyebrow: string;
    items: Array<{ component: string; before: string; after: string }>;
  };
  costValue: {
    eyebrow: string;
    rows: Array<{
      kind: 'cost' | 'value';
      label: string;
      amount: string;
      period: string;
      evidence: 'measured' | 'estimated' | 'gut';
    }>;
  };
  tradeoffs: {
    eyebrow: string;
    items: Array<{ option: string; pros: string; cons: string; chosen: boolean }>;
  };
  risks: {
    eyebrow: string;
    items: Array<{
      category: 'Security' | 'Performance' | 'Complexity' | 'Tech debt' | 'Operational';
      level: 'Low' | 'Medium' | 'High';
      note: string;
      evidence: 'measured' | 'estimated' | 'gut';
    }>;
  };
  questions: { eyebrow: string; items: string[]; };
  decision: { eyebrow; headline; headlineEmphasis?; reviewers; buttonText; };
  context: {
    motivation: string;
    designApproach: string;
    dependencies: Array<{ name: string; status: string }>;
    testingPlan: string;
    rolloutPlan: string;
    rollback: string;
    monitoring: string;
    references: string;
  };
};
```

## 7. Architecture

### File structure

```
Brief App/
├── index.html              # Landing page (project picker, About modal, file load)
├── app-exec.html           # Executive editor
├── app-eng.html            # Engineering editor
├── i18n.xml                # Translation table (EN / DE / IT / HR) — canonical source
├── i18n.js                 # Translation loader (parses i18n.xml, applies via data-i18n)
├── product-spec.md         # This file
├── README.md               # User-facing intro
└── LICENSE                 # MIT
```

Both editor apps are fully self-contained: each file holds its own `<style>`, `<body>`, and `<script>`. All three HTML files load the same shared `i18n.js`.

**External dependencies (CDN-loaded):**
- **Tailwind CSS** via `cdn.tailwindcss.com` — utility CSS framework
- **Alpine.js v3.13.5** via `cdn.jsdelivr.net` — small reactivity layer (loaded only by `app-exec.html` and `app-eng.html`; `index.html` does not need it)
- **Geist** font via Google Fonts (weights 400/500/600/700)

**Local files (shipped in the repo):**
- `i18n.js` — translation engine, ~120 lines. Tries `fetch('i18n.xml')` first, falls back to an inline copy of the XML when running on `file://`. Exposes `window.I18N` with `t(key, lang)`, `apply(lang)`, and broadcasts a `i18n:changed` `CustomEvent` on every language switch.
- `i18n.xml` — canonical translation source. Each entry: `<string key="…"><en/><de/><it/><hr/></string>`. To stay offline-safe, the same entries are duplicated inside `i18n.js → FALLBACK_XML`.

**Browser built-ins used (no external dependency):** `DOMParser` (XML parsing for `i18n.js`), `FileReader.readAsDataURL` (image upload → base64), `FileReader.readAsText` (project JSON load), `localStorage` (per-app persistence: data, template, editorMode, paperSize, uiScale, formPaneWidth, lang) and `sessionStorage` (project handoff from `index.html` to editors), `MutationObserver` (auto-injects field clear-buttons on dynamically-added inputs).

There is **no build step**. Edit the file, refresh the browser.

### Reactivity

Each editor wraps its `<body>` in an Alpine `x-data="…App()"` component. The component object holds:
- `data` — the briefing (round-trips to JSON)
- UI state (`page`, `zoom`, `templateId`, `editorMode`, `paperSize`, `uiScale`, `formPaneWidth`, `showSampleModal`, `switchOpen`)
- Methods (`init`, `persist`, `loadSample`, `exportJson`, `importJson`, `readImage`, `fitZoom`, `applyPageSize`, `applyUiScale`, `startResize`, `initClearButtons`)

`init()` is the single startup hook. It:
1. Merges `?new=1` / `sessionStorage` handoffs from `index.html`
2. Hydrates from `localStorage`
3. Backfills missing fields on older saved projects (`metric.image`, `metric.orientation`, `metric.imageFit`, `meta.companyName`, `meta.confidential`, etc.)
4. Applies persisted UI settings (template, editor mode, paper size, UI scale, form-pane width)
5. Registers `$watch` handlers for auto-save + reactive UI changes
6. Wires the `MutationObserver`-driven clear-button injector
7. Re-applies translations after Alpine has rendered (handles `<template x-for>` content)

### Form ⇄ preview binding

Every editable form field uses `x-model="data.path.to.field"`. Every preview tile uses `x-text` / `x-html` / `x-show` to read from the same data object. Alpine's deep `$watch` handler persists the data to `localStorage` automatically.

### Form-pane UX features

- **Pulsing info buttons (`hint`)** next to every section heading — opens a tooltip explaining the *discipline* of that section. Each is its own micro-Alpine instance with `x-data="{ open: false }"`.
- **Field clear buttons (✕)** auto-injected next to every text input / textarea via a MutationObserver-driven wrapping function. Layout classes (`col-span-*`, `row-span-*`, `justify-self-*`) are hoisted from the input to the wrapper to preserve grid placement.
- **Sample-text modal** — a `Sample text` button opens a confirmation dialog explaining what the action does and that current work will be replaced.
- **Resizable splitter** between form pane and preview, persisted to `localStorage`.
- **UI text scale slider** (80–140%) — applies a `--ui-scale` CSS variable that the form pane uses in `calc(...)` for inputs, labels, headings, hints. Does not affect printed output.

### Print

`window.print()` is wired to the *Print / PDF* button. The print stylesheet:
- Hides chrome, form pane, modal, splitter
- Forces preview pane to span full width and overflow visibly
- Forces both `.preview-frame` blocks to render (defeating any `x-show` inline `display:none` if present)
- Sets `.a4` width/height per `body.paper-A4` / `body.paper-A3` class
- Updates a dedicated `<style id="pageSizeRule">` block to emit `@page { size: A4 portrait | A3 portrait; margin: 0 }` based on the current selection

### Project file handoff (index → editor)

`index.html` reads the uploaded `.json`, runs a heuristic on its top-level keys to decide whether it is an executive or engineering project (`data.proposal | data.effort | data.tradeoffs | …` → engineering; `data.bluf | data.metric | data.fiveWsH | …` → executive), stores the raw text in `sessionStorage` under either `briefing-import` or `eng-briefing-import`, and redirects to the matching editor. The editor's `init()` consumes the handoff on first load and removes it.

### Internationalization (i18n)

`i18n.js` is loaded by all three HTML files. On startup it tries `fetch('i18n.xml')`; if blocked (Chrome on `file://`), it falls back to the inline `FALLBACK_XML` constant. The XML is parsed with `DOMParser` into a flat dictionary `{ key: { en, de, it, hr } }`.

**HTML elements opt in via attributes:**
- `data-i18n="key"` — replaces the first text node (preserves child elements like nested `<span>` notes)
- `data-i18n-html="key"` — sets `innerHTML` (used for labels containing `<strong>` / `<em>`)
- `data-i18n-placeholder="key"` — sets `placeholder` on inputs
- `data-i18n-title="key"` — sets the `title` tooltip

**Language switching:** the chrome's `<select id="lang-picker">` calls `window.I18N.apply(lang)`. The function walks all four selector sets, persists the choice to `localStorage` (`briefing-lang`), updates `document.documentElement.lang`, and dispatches `i18n:changed` so the picker UI can re-sync.

**Initial language:** `localStorage.briefing-lang` if set; otherwise the first two letters of `navigator.language` if it matches one of `en/de/it/hr`; otherwise English.

**To add a new language:** add a new tag (e.g. `<fr>...</fr>`) inside every `<string>` in `i18n.xml`, mirror the change inside `i18n.js → FALLBACK_XML`, extend `LANGUAGES`, `LANG_NAMES`, `LANG_FLAGS` arrays in `i18n.js`, and add an `<option value="fr">FR</option>` to each chrome's language `<select>`.

**To add a new UI string:** add a `<string key="some.unique.key">` block in both `i18n.xml` and `i18n.js → FALLBACK_XML`, then mark the matching HTML element with the appropriate `data-i18n*` attribute.

### Confidentiality marking

Both apps carry `data.meta.companyName` (string, default empty) and `data.meta.confidential` (boolean, **default `true`**). The Confidential badge renders as a red-bordered uppercase pill in both page footers using `--accent-red`. Both fields are part of `data.meta` and round-trip through Save Project / Load Project.

## 8. Roadmap / open questions

These are signposted in the code but not implemented:

1. **AI assist** — paste a rough doc or transcript → LLM populates the structured fields.
2. **Brand kit** — upload logo, define brand colors, generate a custom template.
3. **Collaboration** — share-link with comments. Currently `.json` files are the only handoff.
4. **Version history** — currently only "last saved" is held in `localStorage`.
5. **Slide export** — convert to PPTX/Keynote.
6. **More templates** — community-contributed designs.
7. **i18n** — currently English-only. Date formatting is locale-aware (`en-GB`).
8. **Accessibility audit** — modal focus trapping is partial; tab order across the form is mostly natural but unverified.

## 9. Modifying the project

The codebase is intentionally small and unbundled so that changes are local and immediate.

### Common changes

**Add a new field to a section**

1. Add the key to `sampleData()` at the bottom of the relevant editor file.
2. Add the form input under the matching `<section class="form-section">` using `x-model="data.path.to.field"`.
3. Render it in the preview tile / editorial section using `x-text="data.path.to.field"` or similar.
4. If older saved data must be backfilled, add a default in the `init()` block (search for `if (this.data...) ... = ...`).

**Add a new page-1 tile**

1. Add a new article inside the `<section class="bento">` block.
2. Give the tile a `grid-column: span N` rule in the CSS (the bento is 12 columns wide). Use `grid-column: 1 / -1` for a full-width row.
3. If it should sit on its own row, no extra rule is needed — `grid-auto-flow: row` + `align-content: start` on the bento ensures rows pack from the top.

**Change colors**

Edit the `:root` CSS custom properties at the top of the file. The `--mode-accent` and `--mode-accent-soft` pair drives the chrome accent stripe, the active toggle pill, the info-button pulse, the splitter hover, and the about-modal current-mode highlight.

**Change typography**

The Google Fonts `<link>` at the top of each file controls font loading. The body `font-family` is set to `Geist`. The codebase still has `.serif` and `.mono` class hooks (legacy from earlier templates) but they are aliased to `Geist` to enforce the "two fonts max → Geist + bold" rule the project follows.

**Add a new editor template**

1. Add an entry to the `templates` array in the Alpine component.
2. Add CSS rules under `.tpl-<id> .a4 { … }` etc.
3. Test in `print-classic` to make sure the print output stays ink-friendly.

**Add a new info hint**

Reuse the standard `hint` pattern next to a section `<h3>`:

```html
<h3>Section title <span class="hint" x-data="{ open: false }" @click.outside="open = false"><button type="button" class="hint-btn" @click="open = !open" aria-label="Tip">i</button><span x-show="open" x-cloak class="hint-bubble">Your concise discipline-focused tip here.</span></span></h3>
```

For inline term hints next to a single field label, use the `.term-hint` modifier:

```html
<label class="app-label">Eyebrow <span class="hint term-hint" x-data="{ open: false }" @click.outside="open = false"><button class="hint-btn" @click="open = !open">i</button><span x-show="open" x-cloak class="hint-bubble">Small uppercase label above the headline.</span></span></label>
```

### Code conventions

- **Default to writing no comments.** Names should explain what; comments only explain *why* when the why is non-obvious.
- **Tailwind for layout, raw CSS for design tokens.** Heavy design styling lives in the `<style>` block. Tailwind classes are used for one-off layout (flex / grid / spacing).
- **Alpine for reactivity, no framework.** Don't reach for Vue / React. The two editors are intentionally one-file each.
- **No build step.** If you find yourself needing one, reconsider — the project's no-server / works-from-a-thumb-drive guarantee depends on this. (Note: the runtime CDN dependencies — Tailwind, Alpine, Geist — mean the *first* load needs internet; subsequent loads are cached. For a strictly air-gapped distribution, vendor those three locally per the README's *Going fully offline* section.)

## 10. License

MIT — see [`LICENSE`](./LICENSE).

## 11. Author

Rene Radojčić — [rene.radojcic@hotmail.com](mailto:rene.radojcic@hotmail.com)
