# UK Traditional Academic CV Template Implementation Plan

Replace existing CV templates with the user-provided UK academic and professional CV template layout (`cv-template_42165b2d.pdf`), featuring a clean two-column timeline structure, centered capitalized name header, and strict A4 printable pagination.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Key Decisions for Your Review:**
> - **Template Availability**: In accordance with your request to remove the other templates ("cv template okkoma tika ain karanna mn me dunna cv templte eka add karanna"), the new template will be introduced as the dedicated primary template **"UK Standard Academic & Professional"**. The template gallery and registry will feature this design directly, with options streamlined to focus exclusively on this standard.
> - **Section Ordering**: The default layout will strictly mirror your provided PDF document:
>   1. **Header**: Centered full name with bold capitalized surname, inline email and telephone with clean horizontal divider rule.
>   2. **Education and Qualifications**: Positioned prominently at the top with left-hand date ranges (e.g. `2000-2003`), right-hand institutions, degrees, grades, and bulleted details.
>   3. **Work Experience**: Left-hand chronological date ranges with right-hand employer name, location, position, and descriptive bullet points.
>   4. **Additional Information**: Tabular key-value grid for Interests, Achievements, Nationality, and Languages.
> - **Strict ISO 216 A4 Dimensions**: The template guarantees exact 210mm × 297mm bounds (`794px × 1123px`), print-safe margins, and dynamic multi-page continuation without clipping or shrinking text.

---

## 1. Overview & Core Concept

- **What It Does**: Renders a faithful, pixel-accurate digital implementation of the traditional British academic and professional CV template supplied in `cv-template_42165b2d.pdf`. It replaces the cluttered template choices with this clean, high-impact standard.
- **Target Audience / Persona**: UK job seekers, academics, consultants, civil servants, and professionals applying for roles where clean typography, chronological clarity, and ATS readability are paramount.
- **Key Value**: Guarantees that whatever information is entered into the builder maps directly into an elegant, print-ready A4 document matching the exact look and proportions of the user's uploaded PDF.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Builder Input**: User edits personal information, education, experience, achievements, and languages in the form editor.
  2. **Live A4 Preview**: The preview instantly renders the new UK traditional layout on an exact 210mm × 297mm canvas with live responsive CSS transform scaling.
  3. **Multi-Page Handling**: If education and experience exceed page 1, content seamlessly continues onto page 2 with matching margins and section title preservation.
  4. **Export / Print**: User clicks "Export PDF" or "Print CV"; the exact styling and horizontal dividers print cleanly with zero distortion or orphaned headings.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Classic British academic/corporate minimalism. Authoritative, legible, and unadorned.
  - *Color Palette & Rules*: Crisp white page canvas (`#FFFFFF`), high-contrast dark slate body (`#0F172A` / `#1E293B`), subtle solid hairline rules (`#334155` / `1px solid black`), and optional accent color for subtle headers.
  - *Typography*: High-legibility serif or clean grotesque sans pairing (`Georgia` / `Merriweather` or refined British sans), with `text-transform: uppercase` on surnames, bold organization names, and tabular figures for all date spans.
  - *Component Styling & Layout*:
    - **Header**: Centered Forename + capitalized SURNAME, single-line contact line (`e-mail: ... · tel: ...`).
    - **Sections**: Uppercase title with an edge-to-edge hairline rule underneath.
    - **Content Blocks**: Two-column layout within sections — fixed left gutter (approx. 140px–160px) for date ranges, flexible right column for organization, role, and bullet points.
    - **Additional Information**: Dedicated structured rows with bold labels on the left (`Interests:`, `Achievements:`, `Nationality:`, `Languages:`) and descriptive content on the right.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Template Structure & Registry Streamlining**
  - *Chosen Approach*: Implement a dedicated `UkAcademicTemplate.tsx` component encapsulating the layout of the user's PDF, and set it as the primary/exclusive active template in `registry.tsx`.
  - *Why*: Direct compliance with the user's instruction to remove existing templates and use their specific layout.
  - *Alternatives Considered*: Forcing existing generic templates into this layout would degrade their distinct layouts; a dedicated component ensures 100% fidelity to the PDF.

- **Decision 2: Section Hierarchy & Gutter Alignment**
  - *Chosen Approach*: Use a grid/flex layout with a fixed-width left column for date spans (`140px`) and an auto-filling right column.
  - *Why*: Guarantees perfect vertical alignment across Education, Experience, and Additional Information, mirroring the provided PDF.
  - *Alternatives Considered*: Standard stacked layout loses the British academic CV gutter structure.

- **Decision 3: Multi-Page Continuation & Pagination**
  - *Chosen Approach*: Integrate seamlessly with `lib/cvPagination.ts` so that multi-page CVs calculate line heights accurately and break at natural entry boundaries rather than inside a bullet point.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      CV Data Store                          │
│  (Personal Details, Education, Experience, Skills, Add'l)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             Pagination Engine (lib/cvPagination)            │
│  Splits entries into discrete A4 pages (794px × 1123px)     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            UK Academic Template (UkAcademicTemplate)        │
│  - Centered Header with capitalized surname & contact line  │
│  - Horizontal hairline section dividers                     │
│  - 2-Column Date Gutter + Content Layout                    │
│  - Additional Information Grid (Interests, Achievements)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌──────────────────────────────┐ ┌───────────────────────────┐
│     Live Canvas Preview      │ │     PDF / Print Engine    │
│  Responsive CSS Transform    │ │  @page { size: A4 }       │
│  Scale to fit viewport       │ │  Print color adjust       │
└──────────────────────────────┘ └───────────────────────────┘
```

- **Entities & Fields Handled**:
  - Header: `personal.fullName`, `personal.email`, `personal.phone`, `personal.location`, `personal.linkedin`
  - Education (top): `education[].startDate`, `education[].endDate`, `education[].institution`, `education[].location`, `education[].qualification`, `education[].grade`, `education[].bullets`
  - Work Experience: `experience[].startDate`, `experience[].endDate`, `experience[].company`, `experience[].location`, `experience[].role`, `experience[].bullets`
  - Additional Information: `interests`, `awards` (achievements), `personal.nationality`, `languages`
- **Verification Strategy**:
  - Verify layout against `/public/assets/aistudio/cv-template_42165b2d.pdf`
  - Test short (1-page) and extended (2+ page) sample data
  - Verify strict A4 dimensions (`794px × 1123px`)
  - Run `compile_applet` and test PDF preview and export
