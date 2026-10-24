# CVMaker-Grade State Synchronization, Optional Sections & Clean A4 PDF Export

Upgrade the CV Builder to a production-grade, CVMaker-caliber editing and export engine—delivering instantaneous real-time preview synchronization, live auto-save feedback, optional personal details and extra CV sections, proportional font scaling, and guaranteed A4 PDF download plus native print—while keeping your existing visual layout, colors, and CSS structure completely intact.

## User Review & Critical Decisions

> [!IMPORTANT]
> Your Phase 1 preferences have been locked in below alongside your strict UI preservation constraint. Review these choices and click **Proceed** to execute the upgrade.

- **Confirmed Decision 1 — A4 PDF Export & Print**: Instant high-resolution A4 PDF direct file download (`210mm × 297mm`) paired with a dedicated Native Browser Print option so exports succeed reliably inside both embedded preview frames and standalone desktop/mobile browsers.
- **Confirmed Decision 2 — Real-Time Sync & Auto-Save**: Single-source-of-truth Zustand state synchronization across every input and dynamic array, paired with a quiet, non-intrusive live Auto-Save status indicator (`Saving...` / `Saved` with tabular timestamp).
- **Confirmed Decision 3 — Optional CVMaker Fields, Sections & Font Scaling**: Unlock collapsible optional personal fields (Date of Birth, Nationality, Driving Licence, Photo visibility toggle), optional CV sections (Certifications, Key Projects, Honours & Awards, References, and Custom Sections), and three-tier Font Scaling (`Small`, `Medium`, `Large`) inside the existing builder steps and Design Studio.
- **Strict Visual Invariant**: Existing layout grids, card borders, spacing rhythm, and royal-blue brand tokens (`#4B4DED`, `#0F1B4D`, `#F4F7FE`) remain untouched; newly unlocked controls adopt the exact existing form input and collapsible card styling.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the CV Builder into a zero-latency, single-source-of-truth document workspace where every keystroke, list reorder, optional credential, font density change, and template switch reflects instantaneously on paginated `210mm × 297mm` A4 sheets and exports cleanly to PDF or native print without clipped lines or blank trailing pages.
- **Target Audience / Persona**: Job seekers, graduates, and experienced professionals crafting ATS-ready UK and international CVs who expect CVMaker-level responsiveness, complete section flexibility, and pixel-accurate A4 PDF downloads.
- **Key Value**: Eliminates stale preview states, silent iframe print failures, and rigid fixed-section forms—giving users full control over document density and optional credentials without altering the familiar builder interface.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Personal Details & Optional Metadata (Step 1)**: Users type contact details with instant A4 header updates, toggle profile photo visibility on photo-capable templates, and optionally expand a clean *"Additional personal details"* panel to enter Date of Birth, Nationality / Right to Work, and Driving Licence.
  2. **Dynamic Career & Academic Entries (Steps 2–7)**: Adding, editing, reordering, or deleting Work Experience, Education, Skills (with proficiency levels), Summary, Languages, and Interests updates the live A4 preview on every keystroke while a subtle status label confirms local auto-save completion.
  3. **Optional Sections & Section Ordering (Step 8 — Finalize)**: Users can toggle and populate optional CVMaker sections—**Certifications**, **Key Projects**, **Honours & Awards**, **Custom Sections**, and **References**—and drag or arrow-sort all active sections in the CV Section Order list.
  4. **Typography & Font Density Scaling (Design Tab)**: Alongside Template Gallery, Accent Colour, and Font Family, users select **Font Size (`Small`, `Medium`, `Large`)** and **Photo Display**, immediately reflowing multi-page A4 pagination to fit more content onto one page or expand breathing room across two pages.
  5. **Dual-Mode A4 Export**: Clicking **Download PDF** generates and downloads a crisp `210mm × 297mm` multi-page PDF file within milliseconds; clicking **Vector Print** launches the browser's native `@page { size: A4 portrait; margin: 0; }` print engine in standalone tabs (or seamlessly falls back to direct PDF download when sandboxed).

- **Visual Identity & Theme** *(Preserving Existing Brand System)*:
  - *Aesthetic Direction*: Clean, high-clarity SaaS document studio pairing structured form cards on the left with a tactile, auto-fitted A4 paper stage on the right.
  - *Color Palette & Mood*: 60% cool neutral workspace canvas (`#F4F7FE` outer field, `#FFFFFF` single-elevation panels), 30% structural slate surfaces (`#0F1B4D` primary ink, `#E8EAF5` hairline borders, `#64748B` muted labels), and 10% high-intent Royal Blue accent (`#4B4DED`, hover `#3D3FC9`, soft tint `#EEF1FF`). Semantic emerald (`#059669`) is paired with explicit check icons and text labels for completed downloads and save confirmation.
  - *Typography & Hierarchy*: `Plus Jakarta Sans` UI and display hierarchy with `tabular-nums` (`JetBrains Mono` / numeric alignment) on step progress percentages, word counters, zoom ratios, page indicators, and auto-save timestamps so numbers never jitter during typing.
  - *Component Styling & Layout*: Preserves the exact 12-column split workspace (`lg:col-span-6` editor card + `lg:col-span-6` sticky A4 stage and floating `#0F1B4D` zoom/page dock). Newly unlocked optional fields and extra sections use collapsible disclosures styled identically to existing form cards, preventing visual clutter when collapsed.

- **Interactive Feedback & Motion**:
  - Instantaneous (<16ms) reactive DOM updates on preview sheets without full-sheet skeleton flashes during typing.
  - Quiet, unboxed auto-save status text (`Saving...` → `✓ Saved`) in the form header—strictly avoiding decorative pulsing dots or noisy toast popups.
  - Clear button state transitions (`Download PDF` → spinner `Exporting...` → emerald `Downloaded`) with automatic pending-input commit before export so unsubmitted skill, language, interest, or certification text is never lost.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Engine A4 PDF Export (Direct High-DPI PDF Download + Native Browser Print)**
  - *Chosen Approach*: Keep **Download PDF** wired to an isolated 1:1 unscaled A4 staging pipeline (`794px × 1123px` mapped to `210mm × 297mm` at high DPI with embedded web fonts, sRGB color fidelity, and a pure-vector A4 fallback), while keeping **Vector Print** wired to `react-to-print` targeting dedicated `210mm × 296.8mm` print sheets (`@page { size: A4 portrait; margin: 0mm; }`), automatically routing sandboxed iframe print clicks to direct PDF download.
  - *Why*: Cross-origin preview iframes silently block `window.print()` without throwing errors. Combining an instant client-side A4 PDF file generator with `react-to-print` guarantees one-click file downloads everywhere while still offering native OS print-to-PDF in standalone browser tabs.
  - *Alternatives Considered*: Relying solely on `react-to-print` fails silently inside sandboxed preview iframes; relying solely on naive on-screen DOM capture suffers from CSS `transform: scale(...)` clipping and layout shifts unless rendered through a dedicated 1:1 unscaled A4 stage.

- **Decision 2: Unified Single-Source-of-Truth Zustand Store with Persistent Step & Auto-Save Tracking**
  - *Chosen Approach*: Consolidate step navigation, contact fields, dynamic item arrays, optional sections, typography scale, and `lastSavedAt` metadata inside the persisted Zustand store, using granular slice subscriptions in the preview engine and a universal `updateField` action pattern.
  - *Why*: Eliminates split local-vs-global state desynchronization, ensures reloads restore the exact active step and CV content after SSR hydration, and powers an accurate real-time Auto-Save indicator.
  - *Alternatives Considered*: Scattering form state across local component `useState` hooks with manual sync effects introduces stale closures and dropped keystrokes when switching tabs or exporting immediately after typing.

- **Decision 3: Proportional Typography Scaling & Universal Section Support Across All 7 Templates**
  - *Chosen Approach*: Apply proportional font scaling (`Small`, `Medium`, `Large`) across template headings, body copy, and pagination height estimators simultaneously, and ensure every template renders populated optional personal fields (`Date of Birth`, `Nationality`, `Driving Licence`) and optional sections (`Certifications`, `Projects`, `Awards`, `Custom Sections`, `References`).
  - *Why*: Previously, hardcoded pixel text classes inside individual templates could ignore the store's `fontScale` setting, and two-column or minimalist templates omitted optional sections even when present in state. Synchronizing template rendering with the A4 paginator prevents page-bottom clipping when switching to `Large` or stranding whitespace when switching to `Small`.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Persisted Single Source of Truth (Zustand)               │
│  • Contact + Optional Personal Details   • Experience / Education / Skills   │
│  • Summary / Languages / Interests       • Projects / Certs / Awards / Custom│
│  • Template / Theme / Font / FontScale   • Section Order / Auto-Save Status  │
└──────────────────┬────────────────────────────────────────┬──────────────────┘
                   │ Granular Actions                       │ Reactive Slices
                   ▼ & Auto-Commit                          ▼
┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐
│     Builder Workspace (Left 6-Col)  │  │   CV Adapter & Smart A4 Paginator   │
│  ┌───────────────────────────────┐  │  │  • Normalizes bullets & dates       │
│  │ Content Tab (Steps 1–8)       │  │  │  • Applies FontScale multiplier     │
│  │ • Step 1 + Optional Accordion │  │  │  • Splits multi-page A4 cleanly     │
│  │ • Steps 2–7 Controlled Forms  │  │  │  • Prevents orphan headings/widows  │
│  │ • Step 8 Optional Sections &  │  │  └──────────────────┬──────────────────┘
│  │   Drag/Arrow Section Order    │  │                     │ Paginated Pages[]
│  ├───────────────────────────────┤  │                     ▼
│  │ Design Studio Tab             │  │  ┌─────────────────────────────────────┐
│  │ • Language & Font Family      │  │  │   Live A4 Preview & Export Engine   │
│  │ • Font Scale (Sm / Md / Lg)   │  │  │  ┌───────────────────────────────┐  │
│  │ • Photo Visibility Toggle     │  │  │  │ On-Screen Scaled A4 Viewport  │  │
│  │ • Accent Colour & 7 Templates │  │  │  │ (ResizeObserver Auto-Fit/Zoom)│  │
│  └───────────────────────────────┘  │  │  ├───────────────────────────────┤  │
│  • Header Auto-Save Status          │  │  │ 1:1 Unscaled A4 Export Stage  │  │
│  • Header & Step 8 Export Triggers ─┼──┼─▶│ • Direct High-DPI A4 PDF Blob │  │
└─────────────────────────────────────┘  │  │ • Native A4 Print Sheet Host  │  │
                                         │  └───────────────────────────────┘  │
                                         └─────────────────────────────────────┘
```

- **Data Model & State**:
  - **Personal Profile**: First name, last name, target job title, email, phone, city, postal code, LinkedIn, portfolio website, profile photo data URL, plus unlocked optional fields (`dateOfBirth`, `nationality`, `drivingLicence`) and `showPhoto` boolean preference.
  - **Core & Optional Sections**: Work Experience (`id`, `jobTitle`, `employer`, `city`, `startDate`, `endDate`, `isCurrent`, `description`, synced `bullets[]`), Education (`id`, `degree`, `school`, `city`, `startDate`, `endDate`, `grade`, `description`, synced `bullets[]`), Skills (`id`, `name`, `level`), Summary, Languages, Interests, plus unlocked **Certifications** (`string[]`), **Key Projects** (`id`, `name`, `role`, `url`, `description`, `bullets[]`), **Honours & Awards** (`string[]`), **Custom Sections** (`id`, `title`, `content`, `bullets[]`), and **References** (`string`).
  - **Design & Persistence Metadata**: Active template ID, hex accent color (default `#4B4DED`), font family, font scale (`sm` | `md` | `lg`), ordered section keys (`sectionOrder`), custom PDF filename, active builder step, and transient save status (`isSaving` / `lastSavedAt`).

- **Interactive Component & State Mapping**:
  - **Universal Controlled Inputs**: Every input, textarea, checkbox, and select across Steps 1–8 and Design Studio binds with null-safe controlled values (`value ?? ''`) and dispatches synchronous immutable store updates that bump `lastSavedAt` and immediately recompute `activeCv` and `pages`.
  - **Pending Input Auto-Commit**: Switching steps, switching between Content and Design tabs, clicking Next/Back, or clicking Download PDF / Vector Print automatically commits any unsubmitted text sitting in the Skill, Language, Interest, Certification, or Award quick-entry inputs before continuing.
  - **Optional Sections & Reordering**: Toggling or adding items in Certifications, Key Projects, Awards, Custom Sections, or References automatically registers that section in the reorderable `sectionOrder` list when populated and renders it in exact sequence across all 7 templates.
  - **Font Scale Synchronization**: Selecting `Small`, `Medium`, or `Large` updates CSS typography scaling on `.cv-page` and `.cv-print-sheet` while scaling line-wrap and block-height math inside the A4 paginator so multi-page breaks stay aligned with rendered DOM height.

- **Key Sequences & Integrations**:
  - **Hydration Sequence**: Client hydrator triggers `persist.rehydrate()` after initial mount so server and client HTML match cleanly without React hydration mismatches, restoring saved CV data, step progress, and design preferences.
  - **A4 PDF & Print Sequence**: Export flushes pending inputs → awaits `document.fonts.ready` and image decoding → clones each paginated `.cv-page` into a `794px × 1123px` (`210mm × 297mm`) unscaled sRGB stage → renders high-DPI JPEG DCT pages into an A4 `jsPDF` document and triggers an instant Blob download (with automatic pure-vector A4 `jsPDF` fallback if canvas capture ever fails, and `react-to-print` `@page { size: A4 portrait; margin: 0mm; }` execution for native browser printing).
