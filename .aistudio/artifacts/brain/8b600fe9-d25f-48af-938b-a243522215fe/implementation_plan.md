# Implementation Plan: Adding 10 New UK-Calibrated CV Templates

A comprehensive expansion of the UK CV Maker suite, adding 10 distinct, ATS-compliant, print-calibrated A4 CV templates named after UK and European cities, spanning Tech, Creative, Healthcare, and Executive sectors with a balanced mix of photo-ready and text-driven layouts.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product and design decisions have been confirmed through user clarification:

- **Confirmed Decision 1 (Style & Industry Coverage)**: Balanced UK mix across Tech, Creative, Healthcare, and Executive sectors to give jobseekers tailored layouts for modern UK industries.
- **Confirmed Decision 2 (Naming Convention)**: Named after iconic UK and European cities (`Edinburgh`, `Manchester`, `Bristol`, `Leeds`, `Dublin`, `Glasgow`, `Brighton`, `Newcastle`, `Belfast`, `Cardiff`).
- **Confirmed Decision 3 (Profile Photo Strategy)**: Balanced mix: 5 templates support optional recruiter photos (modern creative/executive roles), and 5 templates remain strictly text-focused for maximal ATS compatibility (NHS, UK civil service, tech and traditional corporate).

---

## 1. Overview & Core Concept

- **What It Does**: Expands the current 7-template catalogue to 17 diverse, recruiter-approved templates. Each template implements the standard ISO A4 pagination engine (794px × 1123px at 96 DPI / 210mm × 297mm for print) and respects user styling options (theme accents, font families, font scales, date formats, and font boldness).
- **Target Audience / Persona**: UK jobseekers across all seniority levels—from NHS healthcare professionals and junior developers to corporate directors and creative freelancers.
- **Key Value**: Provides candidates with industry-authentic layouts that recruiters recognize, improving ATS parsing scores while ensuring print-perfect A4 export fidelity.

---

## 2. User Experience & Visual Design

### The 10 New Templates Profile & Taxonomy

| # | City Name | Category | Primary Industry / Audience | Photo? | Architectural Signature |
|---|---|---|---|---|---|
| 1 | **Edinburgh** | Executive | Directors, Legal, Finance & Strategy | Yes | Dignified navy header band, serif title accents, dual-column executive highlights |
| 2 | **Manchester** | Tech | Software Engineers, Cloud & DevOps | No | Monospace tech kicker, categorized stack badges, impact metric timeline |
| 3 | **Bristol** | Creative | UI/UX, Product Designers & Art Directors | Yes | Asymmetric left color strip, featured visual portfolio links, modern skill bars |
| 4 | **Leeds** | Healthcare | NHS Doctors, Nurses, Pharmacists & Allied Health | No | Prominent GMC/NMC registration bar, clinical rotations, medical qualification hierarchy |
| 5 | **Dublin** | Modern | Tech Sales, Fintech, Project & Product Managers | Yes | Sleek European tech aesthetic, emerald accent divider, two-column compact skill taxonomy |
| 6 | **Glasgow** | Executive | Operations Leads, Managing Directors & C-Suite | No | Full-width charcoal executive crest, tabular career chronology, board leadership focus |
| 7 | **Brighton** | Creative | Marketing Strategists, PR, Writers & Media | Yes | Editorial typography, narrative summary quote, media links & campaign highlights |
| 8 | **Newcastle** | Tech | Systems Architects, IT Specialists & Data Analysts | No | High-density grid, mono tabular figures, compact certification and tooling matrix |
| 9 | **Belfast** | Healthcare | Medical Registrars, Academic Researchers & Lab Scientists | No | Academic & clinical structure, research publications, hospital trust rotations, grant awards |
| 10 | **Cardiff** | Modern | Graduate Trainees, Bilingual Professionals & HR | Yes | Dynamic header badge, bilingual language skill spotlights, clear early-career progression |

### Visual Identity & Theme
- **Color Discipline**: Strict 60-30-10 distribution. 60% pure white A4 canvas (`#FFFFFF`), 30% structural surfaces and neutral slate typography (`#0F172A`, `#334155`, `#64748B`), and 10% concentrated dynamic accent color applied to section dividers, role highlights, and active bullet markers.
- **Typography**: Adheres to the 2+1 font system pairing clean geometric/neo-grotesque sans (`Plus Jakarta Sans`, `DM Sans`, `Manrope`) with dignified serif accents (`Source Serif`, `Playfair`) and monospaced tabular numerals (`font-mono tabular-nums`).
- **Spatial Discipline**: Minimum 16px section padding, strict `min-w-0` on all CSS grid and flex tracks to prevent text blowout, and `break-words [overflow-wrap:anywhere] [text-wrap:pretty]` on all multiline paragraphs and bullet points.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Template Implementation Architecture**
  - *Chosen Approach*: Implement dedicated, highly optimized template components for the new designs utilizing shared atomic components (`CvSection`, `CvBulletList`, `CvDateRange`, `CvSkillList`, `CvContactLine`, `FormattedText`, and `EmptyCvGuide`).
  - *Why*: Gives each template a unique DOM layout and distinct visual personality while maintaining 100% parity with the unified reactive Zustand store (`useCvStore`) and multi-page pagination algorithm (`paginateCv`).
  - *Alternatives Considered*: Reusing a single generic template skeleton with CSS flags. Rejected because it restricts layout individuality and produces homogeneous results.

- **Decision 2: Category Taxonomy Synchronization**
  - *Chosen Approach*: Update `types/cv.ts` and `templates/registry.tsx` so `TemplateCategory` cleanly categorizes all 17 templates across `Executive`, `Classic`, `Modern`, `Minimal`, `Graduate`, `Tech`, and `Healthcare`.
  - *Why*: Ensures the category filter tabs in `/templates` and the builder's `TemplateModal` remain intuitive, responsive, and easy to navigate.

- **Decision 3: Seamless Integration with Gallery & Exporters**
  - *Chosen Approach*: Register all 10 templates in `CV_TEMPLATES` inside `templates/registry.tsx`.
  - *Why*: Automatically unlocks live thumbnail generation in `TemplateGallery`, full-bleed A4 preview in `app/templates/page.tsx`, native print styling in `CvPreview.tsx`, and PDF export in `PdfDownloadButton.tsx` without touching downstream exporter logic.

---

## 4. Technical Architecture & Component Structure

### Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Zustand Store (useCvStore)                      │
│       [Candidate Data + Settings + Section Order + Active Template]     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Template Registry (registry.tsx)                  │
│       Current 7 Templates + 10 New City-Themed Layouts (Total: 17)      │
│   • Hopkins (Executive)       • Leeds (Healthcare)                     │
│   • Toronto (Modern)          • Dublin (Modern)                        │
│   • London (Classic)          • Glasgow (Executive)                    │
│   • Oxford (Minimal)          • Brighton (Creative)                    │
│   • Yale (Modern/Tech)        • Newcastle (Tech)                       │
│   • Cambridge (Graduate)      • Belfast (Healthcare/Academic)          │
│   • Westminster (Classic)     • Cardiff (Modern)                       │
│   • Edinburgh (Executive)     • Bristol (Creative)                     │
│   • Manchester (Tech)                                                  │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌───────────────────────────────────────┐ ┌──────────────────────────────┐
│  CV Preview Engine (CvPreview.tsx)    │ │ Public Gallery (/templates)  │
│  • Screen Viewport (Scaled Canvas)    │ │ • Live ResizeObserver Previews│
│  • Margin Guides (12mm Safe Bounds)   │ │ • Category Filter Tabs       │
│  • Dedicated 1:1 Print Target (A4)    │ │ • Fullscreen Preview Modal   │
│  • PDF Generator (downloadCvPdf)      │ │ • Direct "Use Template" CTA  │
└───────────────────────────────────────┘ └──────────────────────────────┘
```

### Component & File Mapping

1. **`types/cv.ts`**:
   - Update `TemplateCategory` to include `'Tech'` and `'Healthcare'`.
   - Update `CvSettings.templateId` type definitions to accept the 10 new IDs.
2. **`templates/` (10 New Components)**:
   - `EdinburghTemplate.tsx` (Executive, Dual-tone header, photo-ready)
   - `ManchesterTemplate.tsx` (Tech, Stack-categorized, text-driven)
   - `BristolTemplate.tsx` (Creative, Left accent band, photo-ready)
   - `LeedsTemplate.tsx` (Healthcare, GMC/NMC registration bar, text-driven)
   - `DublinTemplate.tsx` (Modern European, Emerald accent, photo-ready)
   - `GlasgowTemplate.tsx` (Executive, Full-width charcoal crest, text-driven)
   - `BrightonTemplate.tsx` (Creative/Editorial, Narrative quote, photo-ready)
   - `NewcastleTemplate.tsx` (Tech, High-density mono tabular grid, text-driven)
   - `BelfastTemplate.tsx` (Healthcare/Research, Publications & trusts, text-driven)
   - `CardiffTemplate.tsx` (Modern/Graduate, Bilingual skill spotlight, photo-ready)
3. **`templates/registry.tsx`**:
   - Register all 10 templates with complete metadata (`id`, `name`, `category`, `description`, `bestFor`, `supportsPhoto`, and `component`).
   - Update `TEMPLATE_CATEGORIES` list to include `'Tech'` and `'Healthcare'`.
4. **`components/TemplateGallery.tsx` & `app/templates/page.tsx`**:
   - Verify category filter buttons dynamically accommodate the new categories.

---

## 5. Verification & Quality Assurance

- **Layout Fluidity**: Silently test long strings, custom line breaks, and multi-line descriptions on each template to ensure zero horizontal blowout past 794px width.
- **A4 Multi-Page Pagination**: Verify pagination splits cleanly across pages 1, 2, and 3 without orphan headings or sliced content boxes.
- **Print & PDF Alignment**: Verify unscaled 1:1 CSS print rules render identical typography and margins in Chrome/Safari print preview.
- **Zero Errors**: Run `compile_applet` and `lint_applet` to confirm clean builds and type safety.
