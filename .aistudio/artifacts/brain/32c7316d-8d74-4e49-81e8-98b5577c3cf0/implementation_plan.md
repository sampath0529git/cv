# Production-Ready CV Builder with 5 Professional Templates & Design Customizer

Enhance the CV builder into a complete, production-ready suite by adding 5 new ATS-compliant, recruiter-approved CV templates, integrating a visual template selector modal directly accessible from the preview bar, and supporting preset professional color palettes and typography controls, while strictly preserving the existing UI design and 6-step workflow.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your explicit constraints and confirmed preferences:
> - **Preserve Existing UI & Steps**: The current UI styling, navbar, step cards, and 6-step workflow (Contact, Education, Work Experience, Additional info/Skills, Summary, Finalize) are preserved with 100% fidelity.
> - **5 New Templates Added (Total 6 Templates)**:
>   1. `uk-traditional`: **UK Traditional Academic & Corporate** (Existing baseline: centered header, date gutters, education first, serif typography).
>   2. `modern-executive`: **Modern Executive** (Contemporary header block, sharp navy/charcoal styling, balanced hierarchy, executive summary emphasis).
>   3. `minimal-clean`: **Minimal Clean** (Airy whitespace, pure typographic precision, hairline rule dividers, maximum ATS parsing rate).
>   4. `tech-compact`: **Tech & Engineering** (Structured technical layout, prominent skills matrix, project highlights, and clean chronological timeline).
>   5. `graduate-starter`: **Graduate & Early Career** (Education-first structure highlighting degree classification, coursework, dissertations, academic honors, and internships).
>   6. `classic-corporate`: **Classic London Corporate** (Sophisticated corporate layout with subtle left accent margin, refined typography, and full section coverage).
> - **Template Switcher Access**: Seamless visual modal opened directly from the template button on the live preview bar and desktop/mobile shortcuts.
> - **Customization Controls**: Tab in the template modal featuring preset professional British color palettes (Navy, Teal, Oxford Green, Amber, Crimson, Indigo, Slate, Plum) and typography scale/family controls.

---

## 1. Overview & Core Concept

- **What It Does**: Provides job seekers with an end-to-end, production-ready CV builder offering 6 distinct recruiter-approved templates tailored to different career stages and industries, without requiring re-entry of data when switching designs.
- **Target Audience / Persona**: Professionals, graduates, executives, and career changers who want a tailored CV that is 100% ATS-friendly and prints cleanly on standard A4 paper.
- **Key Value**: Instant multi-template switching with live preview synchronization, single-source-of-truth data persistence, and zero formatting breakage across devices and export modes.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Step-by-Step Data Entry (Preserved 6-Step Workflow)**:
   - **Step 1 (Contact)**: Forename, surname, professional email, phone number, location, optional photo, and additional details.
   - **Step 2 (Education)**: Degree, institution, location, dates, grade/classification, and description notes.
   - **Step 3 (Work experience)**: Roles, employers, dates, location, and structured bulleted achievements.
   - **Step 4 (Additional info & skills)**: Interests, Academic Achievements, Nationality & Work Eligibility, Languages, and Key Skills.
   - **Step 5 (Summary)**: Professional statement / executive summary.
   - **Step 6 (Finalize)**: PDF file renaming, section overview checklist, and dual export options.

2. **Template Selection & Design Customization**:
   - Above the live CV preview, a clean "Template" badge displays the currently active design with a "Change Template" button.
   - Clicking opens the **Template Modal** with two tabs:
     - **Templates Gallery**: Interactive cards displaying real-time scaled A4 thumbnails of each of the 6 templates populated with the candidate's actual data. Clicking any template instantly applies it.
     - **Customise Design**: Preset professional accent colors (Navy, Teal, Oxford Green, Slate, etc.), font scale (`sm`, `md`, `lg`), and font family pairings (`Inter`, `Merriweather`, `Plus Jakarta`, `Roboto`, `Lora`, `JetBrains Mono`).

3. **Production-Ready Live Preview & Export**:
   - Preview maintains exact international A4 proportions ($210\text{mm} \times 297\text{mm}$) with zoom controls ($50\%\text{--}140\%$), fit-to-screen, and page badge indicator (`Page 1 of 2`).
   - One-click **Direct PDF Download (300 DPI)** and **Browser Vector Print (Ctrl+P)** work seamlessly across all 6 templates.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Modular Template Component Architecture**
  - *Chosen Approach*: Implement each of the 5 new templates (`ModernExecutiveTemplate`, `MinimalCleanTemplate`, `TechCompactTemplate`, `GraduateStarterTemplate`, `ClassicCorporateTemplate`) as self-contained components conforming to the unified `TemplateDefinition` interface in `templates/registry.tsx`.
  - *Why*: Ensures zero regressions on the existing `UkTraditionalTemplate`, keeps code modular and maintainable, and allows seamless multi-page pagination.
  - *Alternatives Considered*: A single mega-component with hundreds of conditional branches was rejected due to styling conflicts and fragile rendering.

- **Decision 2: Universal State Sharing with No Data Loss**
  - *Chosen Approach*: All templates consume the unified `CV` model generated by `cvStoreToCv(useCvStore)`. Switching templates immediately updates the visual presentation while retaining 100% of the candidate's entered data.
  - *Why*: Eliminates user frustration when experimenting with different looks for different job applications.

- **Decision 3: Integrated Template Modal Trigger**
  - *Chosen Approach*: Add the visual template modal button directly into the preview bar in `components/CvPreview.tsx` and wire the existing `TemplateModal` component.
  - *Why*: Fulfills the user's explicit preference while preserving the 6 form steps completely unchanged.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js Applet Frontend                         │
│                                                                        │
│   ┌────────────────────────────────┐    ┌───────────────────────────┐  │
│   │   Zustand Store (useCvStore)   │◄──►│ cvAdapter (Unified CV)    │  │
│   │   - 6 Step Form State          │    └─────────────┬─────────────┘  │
│   │   - Active Template ID         │                  │                │
│   │   - Theme Accent & Typography  │                  ▼                │
│   └───────────────┬────────────────┘    ┌───────────────────────────┐  │
│                   │                     │    cvPagination Engine    │  │
│                   ▼                     │    (A4 Height Division)   │  │
│   ┌────────────────────────────────┐    └─────────────┬─────────────┘  │
│   │  6-Step Form (Unchanged UI)    │                  │                │
│   │  1. Contact    4. Additional   │                  ▼                │
│   │  2. Education  5. Summary      │    ┌───────────────────────────┐  │
│   │  3. Experience 6. Finalize     │    │     Template Registry     │  │
│   └────────────────────────────────┘    │  1. UK Traditional        │  │
│                                         │  2. Modern Executive      │  │
│   ┌────────────────────────────────┐    │  3. Minimal Clean         │  │
│   │ Template Modal (Gallery & CSS) │───►│  4. Tech & Engineering    │  │
│   │ - 6 Interactive Visual Cards   │    │  5. Graduate Starter      │  │
│   │ - Preset Palette & Typography  │    │  6. Classic Corporate     │  │
│   └────────────────────────────────┘    └─────────────┬─────────────┘  │
│                                                       │                │
│                                                       ▼                │
│                                         ┌───────────────────────────┐  │
│                                         │    Live A4 CvPreview      │  │
│                                         │  - Scaled viewport (0.6x) │  │
│                                         │  - Dual Export Buttons    │  │
│                                         └───────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### 5 New Templates Specification

1. **`ModernExecutiveTemplate.tsx`**:
   - *Aesthetic*: Modern corporate executive style with prominent navy/accent header band, crisp typography, and balanced 2-column or structured 1-column layout.
   - *Sections*: Contact band, Executive Summary, Key Competencies grid, Experience with clear milestones, Education, and Additional details.

2. **`MinimalCleanTemplate.tsx`**:
   - *Aesthetic*: Swiss-inspired minimalist aesthetic with generous margins, subtle hairline rules, and zero decorative boxes.
   - *Sections*: Clean unboxed header, compact date columns, succinct bullet points, and high ATS readability.

3. **`TechCompactTemplate.tsx`**:
   - *Aesthetic*: Silicon Valley / London tech engineering style with prominent technical skills matrix, project highlights with tech tags, and achievement-driven experience bullets.
   - *Sections*: Header with GitHub/LinkedIn, Key Skills & Tech Stack, Professional Experience, Key Technical Projects, Education, and Certifications.

4. **`GraduateStarterTemplate.tsx`**:
   - *Aesthetic*: Oxford/Cambridge graduate style highlighting Education and Qualifications prominently at the top with dissertation, degree classification (e.g. 1st Class), and modules, followed by internships, leadership roles, and campus societies.

5. **`ClassicCorporateTemplate.tsx`**:
   - *Aesthetic*: Elegant Mayfair/City of London corporate style with deep accent bar, structured serif section headers, chronological experience, and references.

---

## 5. Execution Steps

1. **Create the 5 New Template Components**:
   - Create `templates/ModernExecutiveTemplate.tsx`
   - Create `templates/MinimalCleanTemplate.tsx`
   - Create `templates/TechCompactTemplate.tsx`
   - Create `templates/GraduateStarterTemplate.tsx`
   - Create `templates/ClassicCorporateTemplate.tsx`
2. **Register in `templates/registry.tsx`**:
   - Add all 5 templates to `CV_TEMPLATES` with complete metadata (category, description, bestFor).
   - Update `TEMPLATE_CATEGORIES` to support `Classic`, `Executive`, `Minimal`, `Modern`, and `Graduate`.
3. **Wire Template Modal in Preview Bar**:
   - In `components/CvPreview.tsx`, add an active template indicator button in the controls bar that opens `TemplateModal`.
   - Ensure the modal updates the store's active template and settings with instant real-time re-render.
4. **Verify Production Readiness**:
   - Verify all 6 templates paginate cleanly, respect font scaling (`sm`/`md`/`lg`), and render without layout clipping.
   - Verify direct PDF download (300 DPI) and browser vector print for all 6 templates.
5. **Compilation & Health Check**:
   - Execute `compile_applet` and verify dev server status.
