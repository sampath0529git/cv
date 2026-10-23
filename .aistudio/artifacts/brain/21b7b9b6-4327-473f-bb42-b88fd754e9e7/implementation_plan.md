# UK ATS-Friendly CV Template System (20 Templates)

A modular, production-grade CV template and customisation engine integrated seamlessly into the existing Next.js CV maker app. It introduces 20 UK-convention, ATS-friendly templates across 6 distinct categories, live responsive A4 preview with pagination, custom accent colours, font pairings, section reordering, bidirectional synchronisation with the current builder store, and high-fidelity print-to-PDF export via `react-to-print`.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed via interactive clarification:
> - **Modal Integration**: Replaces the existing 4-template modal with the new 20-template gallery modal, featuring category filters ("Classic", "Modern", "Minimal", "Executive", "Creative-Light", "Graduate"), live preview scaling, and quick selection.
> - **Data Synchronization**: Implements seamless bidirectional synchronization between the existing Zustand store (`useCvStore`) and the unified UK CV data model (`types/cv.ts`), so users can freely switch between editing in the builder steps and selecting/customizing any of the 20 templates without data loss.

- **Confirmed Decision 1**: **UK Standards Compliance** – British English terminology, no date of birth/marital status/nationality fields, optional photo off by default (supported only by templates 5, 6, 8, 17), and default references text "References available on request".
- **Confirmed Decision 2**: **Deliverable Phasing** – Structured across 5 clean batches: Batch 0 (Core types, sample data, shared components, preview, controls, gallery, PDF export), Batch 1 (Templates 1–5), Batch 2 (Templates 6–10), Batch 3 (Templates 11–15), Batch 4 (Templates 16–20 and registry wiring), and Final integration verification.

---

## 1. Overview & Core Concept

- **What It Does**: Enables users to write their CV details once and switch between 20 distinct, recruiter-approved UK CV templates in real-time. Users can tweak accent palettes (8 preset UK corporate tones + custom hex), typography (6 web-safe / Google fonts), font scaling (`sm`, `md`, `lg`), photo visibility, and section ordering, and instantly export a pixel-perfect, ATS-compliant A4 PDF.
- **Target Audience**: UK job seekers across all sectors—from corporate executives, lawyers, and finance analysts to software engineers, creative leads, and university graduates.
- **Key Value**: ATS-safe semantic HTML (real selectable text, logical DOM reading order, no layout tables or unreadable canvas/image text) combined with bespoke, elegant British CV designs that gracefully handle 1 or 2 pages with page-break avoidance on work and education entries.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Browse & Select Template**: User opens the "Change template" modal from the builder header or preview toolbar. The modal displays a filterable grid of all 20 templates categorized into Classic, Modern, Minimal, Executive, Creative-Light, and Graduate, rendered live with the user's data (or sample data).
2. **Real-time Customisation**: Inside the builder preview pane (or controls panel), users adjust the accent colour (CSS variable `--accent`), font family (`--font-cv`), font scale, and optional photo toggle. All 20 templates adapt instantaneously through shared CSS tokens.
3. **Reorder Sections**: Simple up/down controls allow users to prioritize sections (e.g. graduates placing Education above Work Experience).
4. **Live A4 Preview & Pagination**: Renders accurate 210mm × 297mm A4 sheets with CSS transforms scaling smoothly to desktop or mobile viewports, indicating page boundaries and page counts.
5. **PDF Download**: Clicking "Download PDF" uses `react-to-print` with exact `@page { size: A4; margin: 0 }` rules, ensuring crisp vector text, background colour preservation (`print-color-adjust: exact`), and `break-inside: avoid` on experience/education entries.

### Visual Identity & Palette
- **Canvas & Neutral Surfaces**: Crisp white A4 canvas (`#FFFFFF`) on a subtle neutral workspace backdrop (`#F8FAFC`).
- **Accent Colour Palette**:
  - Classic Navy (`#1E3A8A`)
  - Oxford Slate (`#334155`)
  - British Racing Green (`#14532D`)
  - Cambridge Teal (`#0F766E`)
  - Westminster Burgundy (`#831843`)
  - London Brick Red (`#991B1B`)
  - Royal Purple (`#581C87`)
  - Edinburgh Khaki (`#78716C`)
  - Custom user Hex with automatic luminance-based text contrast calculation (WCAG AA).
- **Typography & Font Pairings**:
  - Serif Classic: `Merriweather` / `Georgia`
  - Clean Neo-Grotesque: `Plus Jakarta Sans` / `Inter`
  - Executive Elegance: `Playfair Display`
  - Compact Modern: `DM Sans`
  - Technical / Minimal: `Manrope`
  - Editorial: `Source Serif 4`

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: CSS Variables for Universal Template Theming**
  - *Chosen Approach*: Define `--accent`, `--accent-light`, `--accent-contrast`, and `--font-cv` at the template wrapper level.
  - *Why*: Allows all 20 templates to be pure, declarative components under 150 lines without repeating colour math or prop-drilling theme logic.
- **Decision 2: Seamless Zustand Store Adapter**
  - *Chosen Approach*: Create `lib/cvAdapter.ts` to convert between existing builder state (`useCvStore`) and the unified UK `CV` object, syncing edits bidirectionally.
  - *Why*: Preserves 100% of user data entered into existing steps (Contact, Experience, Education, Skills, Summary, Languages) while powering all 20 new templates.
- **Decision 3: Dedicated Shared Component Library (`templates/shared/*`)**
  - *Chosen Approach*: Modular primitives: `CvSection`, `CvBulletList`, `CvDateRange`, `CvSkillList`, `CvContactLine`, and `CvPageWrapper`.
  - *Why*: Guarantees consistent ATS semantic markup (`<section>`, `<h2>`, `<ul>`, `<li>`), strict A4 print page-break containment (`break-inside: avoid`), and compact template implementations.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   User Interface                       │
│  ┌───────────────────────┐  ┌───────────────────────┐  │
│  │   TemplateGallery     │  │   TemplateControls    │  │
│  │ (20 UK Live Cards)    │  │ (Color, Font, Reorder)│  │
│  └───────────┬───────────┘  └───────────┬───────────┘  │
│              │                          │              │
│              ▼                          ▼              │
│  ┌──────────────────────────────────────────────────┐  │
│  │                    CvPreview                     │  │
│  │   (A4 Scale Container 794x1123px, Pagination)    │  │
│  └──────────────────────────┬───────────────────────┘  │
└─────────────────────────────┼──────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────┐
│                 Template Registry                      │
│   (registry.ts - 20 Pure React Template Components)    │
│   ├── Classic: London, Bristol, Oxford, York           │
│   ├── Modern: Manchester, Leeds, Birmingham, Glasgow,  │
│   │           Cardiff                                  │
│   ├── Minimal: Brighton, Cambridge, Bath, Norwich      │
│   ├── Executive: Edinburgh, Kensington, Canary         │
│   ├── Creative-Light: Shoreditch, Newcastle            │
│   └── Graduate: Durham, Nottingham                     │
│                             │                          │
│                             ▼                          │
│                 Shared Template Primitives             │
│   (CvSection, CvBulletList, CvDateRange, CvSkillList)  │
└─────────────────────────────┬──────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────┐
│                Data & State Layer                      │
│   types/cv.ts ◄──► lib/cvAdapter.ts ◄──► useCvStore.ts │
│   data/sampleCv.ts (UK Marketing Manager in MCR)       │
│   Local Storage Persistence + React-To-Print Engine    │
└────────────────────────────────────────────────────────┘
```

### Deliverable Phasing
1. **Batch 0**:
   - `types/cv.ts`: Core data structures and template settings.
   - `data/sampleCv.ts`: Comprehensive realistic UK CV sample.
   - `lib/cvAdapter.ts`: Adapter between `useCvStore` and `CV`.
   - `templates/shared/*`: `CvSection`, `CvBulletList`, `CvDateRange`, `CvSkillList`, `CvContactLine`.
   - `templates/registry.ts`: Registry mapping 20 templates.
   - `components/builder/TemplateControls.tsx`: Palette, font, scale, and reorder controls.
   - `components/builder/TemplateGallery.tsx`: Live-rendered category gallery.
   - Install `react-to-print` and verify build.
2. **Batch 1**: Templates 1–5 (London, Bristol, Oxford Classic, York, Manchester).
3. **Batch 2**: Templates 6–10 (Leeds, Birmingham, Glasgow, Cardiff, Brighton).
4. **Batch 3**: Templates 11–15 (Cambridge Minimal, Bath, Norwich, Edinburgh Executive, Kensington).
5. **Batch 4**: Templates 16–20 (Canary, Shoreditch, Newcastle, Durham, Nottingham) & final wiring.
6. **Final**: Verification checklist, print PDF validation, and layout review.
