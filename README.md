# R's Briefing Studio

A small offline web app that turns proposals into beautifully designed, two-page briefings — one for executive readers, one for engineering reviewers. The output is built to be **read in 90 seconds (page 1)** with **full context available on demand (page 2)**.

> One page. One decision. Ninety seconds.

---

## What's new — v1.1.0

**Markdown export mode.** Both editors now ship with a *Print / Markdown* toggle in the chrome.

- **Print mode** (default) — unchanged. The right pane shows the two A4/A3 pages and the primary button prints to PDF.
- **Markdown mode** — the right pane swaps to a rendered wiki-style preview, and the primary button becomes **Export .md**.

The exported `.md` file is wiki-flavoured Markdown built around the standard macro set most company wikis support:

- **Info / note / warning panels** for the bottom line, the ask, and high-severity risks
- **Expand / collapse** wraps the page-2 context section
- **Table of contents** macro at the top
- **Inline status badges** for confidentiality, decision deadlines, evidence (M / E / G), risk severity, cost-vs-value
- **Tables** for every two-column layout — pros vs. cons, metric vs. visual, cost &amp; value, trade-offs, dependencies, alternatives, stakeholders, timeline (with `[████░░░░░░] 40%` ASCII progress bars)
- **Task-list checkboxes** for engineering open questions

Markdown mode also offers a *Strip embedded images* toggle for when base64 image data would exceed your wiki's paste limits, and a *Copy* button alongside *Export .md*.

---

## Why this exists

**This app is not here to add another document to your pile.** It is the opposite of that. The point is to *replace* sprawling Word docs and forty-slide decks with one clear, two-page packet of digestible chunks — a shared canvas you and your teammates can sync on quickly, without ambiguity.

Modern work happens in parallel. The people whose decisions unblock you are reading at the bottom of a stack of twelve other proposals, three of which are about to slip, and one of which someone wants to talk about *right now*. They do not have time to read your nine-page Word document. They do not want to sit through your forty-slide deck. They will skim, decide, and move on — whether you want them to or not.

The app gives you a **formalized format**: an idea, an issue, or an opportunity broken into the smallest set of fields that still preserves the decision. Each field is a digestible chunk. Each chunk has a clear discipline behind it. Once you've filled it in, the briefing is something you, your manager, your peers, and your reviewers can all look at *together* and arrive at the same picture in 90 seconds. That is what "syncing with teammates" actually means in practice — not more meetings, but a shared, low-ambiguity artefact that the meeting can be about.

This app is a forcing function for the writer. It makes you commit to:

- **The decision you actually want.** Not a discussion, not a status update — an *ask*, with a deadline.
- **The headline number.** One metric, the one that, if it's wrong, the whole proposal is wrong.
- **The trade-offs.** Pros, cons, alternatives — the things the reader would push back on.
- **What you actually know vs. what you're guessing.** Engineering briefings tag every number `M` (measured), `E` (estimated) or `G` (gut). Reviewers calibrate accordingly.

The output is a **self-contained information packet** that respects the reader's time. It works as a kick-starter for a deeper conversation: by the time you walk into the room, you and the reader share the same picture of the decision, the data, the risks, and the path. The discussion is then about substance — not about catching the reader up.

The goal is to drive the chance of misunderstanding and wrong assumptions as close to zero as the format allows.

## If text overflows the page, that's a feature

When your content spills past the page boundaries, the app does **not** truncate it, scale it down, or quietly hide it — it lets it overflow, on purpose. The two-page limit is the discipline. The overflow is the app telling you: *this idea is not yet tight enough to fit*.

Tighten the wording. Drop the adjective. Cut the example. Pick the one number that matters and lose the rest. The format is the forcing function — keep editing until everything fits, and you will end up with a sharper briefing than if the app had silently shrunk your text to make room.

## What you formalize

When you fill in a briefing you are forced — by the structure of the form — to commit to:

| Section | What it forces you to formalize |
|---|---|
| Bottom line / Proposal | The single sentence that contains the decision and its headline number |
| Headline metric | The one number that captures the "so what" |
| 5 Ws + H *(executive)* | What, Why, Who, When, Where, How — facts in one short clause each |
| What changes *(engineering)* | Before / after pairs the reader can verify |
| Cost & value *(engineering)* | Numbers if possible, with evidence tags (M/E/G) |
| Pros / Cons | 2–4 ranked items, outcomes the reader can verify |
| Trade-offs | Paths actually considered, with the chosen one marked |
| Risks | Real risks the reader would raise — not strawmen |
| Open questions | Things you genuinely need answered before committing |
| The ask / CTA | One decision, one deadline, named reviewers |
| Page 2 — context | Background, problem, stakeholders, considerations, alternatives, risks, supporting data |

Every section has an info button (the pulsing `i` icon) that explains the *discipline* behind that field. The hints are deliberately written to push toward concise, decision-focused communication.

## Two report types

The app ships with two distinct briefing flavors. Pick the one that matches your audience:

| App | File | For | Accent |
|---|---|---|---|
| **Executive Level Reporting** | `app-exec.html` | Decision-makers, leadership | Blue |
| **Engineering Reporting** | `app-eng.html` | Technical reviewers, eng leads, PM, SRE | Green |

The chrome of each app shows the mode in a colored pill at the top so you always know which kind of briefing you are writing.

---

## Getting started

**To run it: download this repo and double-click `index.html`.** That's it.

**Requirements:**
- A relatively modern desktop browser on your PC — Chrome, Edge, Firefox, or Safari from the last ~3 years.
- Nothing else. No installer, no Node.js, no Python, no server. Everything runs locally in the browser, fully offline.

**Step by step:**

1. Download or clone this repository (`git clone …`, or click *Code → Download ZIP* and unzip).
2. Open the folder, double-click `index.html` — your browser opens it.
3. Pick **New Executive Level Report** or **New Engineering Report**, or load an existing project file.

The app saves automatically to your browser's `localStorage`. To share a project with someone else, click **Save Project** to download a `.json` file (the uploaded image is embedded as base64, so the file is self-contained). The recipient opens `index.html`, clicks **Open existing project**, and the app routes them to the correct editor automatically.

### Print to PDF

Click **Print / PDF** in the chrome. The app strips the form pane and renders both pages on one print stream. Page size follows the `A4` / `A3` toggle in the chrome.

For best PDF fidelity:
- Choose **Save as PDF** in the print dialog.
- Under *More settings*, enable **Background graphics** (so the colored tile accents render).
- Margins: **None** (the layout already includes its own margins).

### Export to Markdown (wiki-flavoured)

Switch the **Print / Markdown** toggle in the chrome to *Markdown*. The right pane swaps to a rendered preview that shows panels, expand blocks, status badges, tables, and the table of contents the way a wiki would render them. Click **Export .md** to download the file, or **Copy** to put the markdown on your clipboard.

The output uses fenced macro blocks (e.g. ` ```panel:info `, ` ```expand `, ` ```toc `) plus inline `!status:color:text!` tokens. Most major company wikis recognise these macros; on viewers that don't, the content still renders as standard Markdown inside a code fence — nothing is lost, it just falls back to plain.

If your wiki rejects long base64 image data on paste, tick **Strip embedded images** before exporting and re-upload the image manually after the page is created.

### What's in localStorage

Per-app settings (template, dark/light editor mode, paper size, UI scale, splitter width, last edited project) live in `localStorage` keys prefixed `briefing-…` (executive) and `eng-briefing-…` (engineering). They are per-browser, per-device — they never leave your machine.

---

## How to modify the project

The codebase is intentionally small and unbundled:

```
Brief App/
├── index.html              # Landing page (new project / open existing)
├── app-exec.html           # Executive Level Reporting editor
├── app-eng.html            # Engineering Reporting editor
├── i18n.xml                # Translation table (EN / DE / IT / HR)
├── i18n.js                 # Translation loader (parses i18n.xml at runtime)
├── product-spec.md         # Living technical spec (data model, layouts, design system)
├── README.md               # This file
└── LICENSE                 # MIT
```

No build step. No npm install. No node_modules. Dependencies:

**External (CDN-loaded):**
- [**Tailwind CSS**](https://cdn.tailwindcss.com) — utility CSS framework
- [**Alpine.js** v3.13.5](https://alpinejs.dev) — small reactivity layer driving form ⇄ preview binding (loaded only by the editor apps, not by `index.html`)
- [**Geist** font](https://fonts.googleapis.com/css2?family=Geist) — single typeface for the whole UI, weights 400/500/600/700

**Local (shipped with the repo):**
- `i18n.js` — translation loader, ~15 lines of glue code that parses `i18n.xml` (or its inline fallback) and applies translations to elements via `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`, and `data-i18n-title` attributes
- `i18n.xml` — translation source for English, German, Italian, Croatian

**Browser built-ins used (no dependency):** `DOMParser` (XML parsing), `FileReader` (image upload, project file load), `localStorage` / `sessionStorage` (persistence + handoff), `MutationObserver` (auto-injecting clear-buttons on dynamically added inputs).

To make a change, open the relevant `.html` file in your editor, edit, save, refresh the browser. That's it.

### Where to make common changes

| Goal | File / location |
|---|---|
| Change the form / preview content of executive briefings | `app-exec.html` |
| Change the form / preview content of engineering briefings | `app-eng.html` |
| Change the landing page or About modal | `index.html` |
| Change the data model | `sampleData()` at the bottom of each app file *and* the corresponding form fields *and* the preview tiles. The editor will warn you in the console if you forget a piece. |
| Tune the design system (colors, spacing, typography) | The `<style>` block at the top of each HTML file. Mode accent colors are the `--mode-accent` / `--mode-accent-soft` CSS custom properties at the top of `:root`. |
| Add a new tile to page 1 | Add it to the bento grid in the preview section, give it a `grid-column: span N` rule in CSS (12 columns total per row). Update the bento auto-flow rules if it should sit on its own row. |
| Add a new field to page 2 | Add it under the corresponding `data.context` key in the data model and `sampleData()`, add a form input in the *Page 2 — Context* section, and render it inside the editorial column. |
| Add a new info-button term hint | Reuse the `<span class="hint" x-data="{ open: false }">` pattern used on every section heading. The `.term-hint` modifier exists for subtler inline hints next to field labels. |

For a complete reference of the data model, design tokens, component layout, and architecture choices, see [`product-spec.md`](./product-spec.md).

---

## Languages (i18n)

> **Work in progress — translations may be buggy.** The English copy is the canonical source of truth. The DE / IT / HR translations are a first machine-assisted pass and will benefit from a native-speaker review. If you spot a translation that reads awkwardly or is plain wrong, edit `i18n.xml` directly (and mirror the same edit in `i18n.js → FALLBACK_XML` so offline `file://` users see the fix).

The UI ships with four languages: **English (EN)**, **Deutsch (DE)**, **Italiano (IT)**, **Hrvatski (HR)**. Switch in the top-right of the chrome — the choice persists per browser. Every translatable label, button, section heading, switch-menu item, and modal title is driven by the same translation table.

The translation source is `i18n.xml` at the project root. Each entry looks like:

```xml
<string key="ui.saveproject">
  <en>Save Project</en>
  <de>Projekt speichern</de>
  <it>Salva progetto</it>
  <hr>Spremi projekt</hr>
</string>
```

**To translate an existing string:** open `i18n.xml`, find the `<string key="…">` and edit the language tag.

**To add a new language:** add a new tag (e.g. `<fr>…</fr>`) inside every `<string>`, then extend `i18n.js` → `LANGUAGES`, `LANG_NAMES`, `LANG_FLAGS` and add an `<option>` to each chrome's language `<select>`.

**To add a new UI string:** add a `<string key="some.unique.key">` block in `i18n.xml`, then mark the matching HTML element with `data-i18n="some.unique.key"`. (Use `data-i18n-placeholder` for input placeholders, `data-i18n-title` for tooltip text.)

**Note on offline use:** when you open the HTML files directly via `file://`, Chrome blocks `fetch('i18n.xml')` for security reasons. `i18n.js` therefore ships with a synced inline copy of the XML as a fallback. If you change `i18n.xml` and want offline users to see the change, also update the `FALLBACK_XML` literal at the top of `i18n.js`. (Or serve the project over a local server like `python -m http.server` and the XML loads directly.)

## Confidentiality / NDA marking

Both editors have **Company name** and a **Confidential** checkbox in the *Meta* section.

- **Company name** appears in the prepared-by line of both page footers, between the audience and the date.
- **Confidential** (checked by default) renders a red bordered "CONFIDENTIAL" badge in the footer of both pages — useful for documents falling under NDA. Uncheck to remove.

Both fields are part of `data.meta` and round-trip through Save Project / Load Project.

## Privacy

- Everything runs in your browser. No analytics, no tracking, no telemetry.
- Project content lives only in your browser's `localStorage` and in `.json` files you explicitly save.
- The HTML source contains no real briefing data — only sample placeholder content (a cookie-factory case study).
- Sharing the source code with a colleague will *not* leak any project files: those live in `localStorage`, which is per-browser, and in `.json` files you choose where to save.

---

## License

Released under the [MIT License](./LICENSE) — do whatever you want with it, no warranty.

---

## Author

**Rene Radojčić** · [rene.radojcic@hotmail.com](mailto:rene.radojcic@hotmail.com)

Built end-to-end with HTML, Tailwind CSS, and Alpine.js. Works offline. No server. No tracking.
