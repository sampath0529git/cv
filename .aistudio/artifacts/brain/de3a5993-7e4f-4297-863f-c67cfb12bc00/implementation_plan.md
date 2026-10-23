# Modular UK Traditional CV Template & Template System Reset

Remove all existing 20 templates and implement the exact UK Academic & Corporate traditional CV template from the provided document as the sole active template. Establish a clean, extensible template registry so future templates can be added seamlessly whenever uploaded.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Template Reset**: All 20 previous templates (`london`, `bristol`, `manchester`, etc.) will be removed from the active registry.
> - **Sole Active Template**: The template provided in the PDF will be the primary and only active template (`uk-traditional`).
> - **Extensibility for Future Templates**: The template architecture is preserved and modernized so that any new template uploaded later can be registered with a single entry in `templates/registry.tsx`.
> - **Document Alignment**: Content sections and sample data will match the reference document:
>   1. Header: Forename SURNAME (centered), email and telephone (centered), horizontal rule.
>   2. Education and Qualifications (date gutter on left, university, location, degree/subject, additional info).
>   3. Work Experience (date gutter, company, city/country, job title, achievement bullets).
>   4. Additional Information (Interests, Achievements, Nationality, Languages with aligned left-hand labels).

---

## 1. Overview & Core Concept

- **What It Does**: Streamlines the entire application to focus exclusively on the provided UK traditional CV template. Replaces all outdated templates while providing an extensible registry ready for subsequent template uploads.
- **Visual Aesthetic**: Pure corporate/academic UK standard—clean monochrome typography, solid black horizontal dividers, left date gutter, structured definition list for additional info, and zero decorative noise.
- **ATS & Recruiter Compliance**: 100% compliant with standard UK ATS scanners and top-tier UK corporate/academic hiring standards.

---

## 2. User Experience & Visual Design

### Exact Document Visual Specification
```
                                Forename SURNAME
             e-mail: professional email address tel: UK landline or mobile
────────────────────────────────────────────────────────────────────────────────
Education and Qualifications
2000-2003          University/Universities                    Degree and Subject
                   Location; City and Country                 applicable additional info
────────────────────────────────────────────────────────────────────────────────
Work Experience
Sep-07 – Aug-10    Official Company Name                      City, Country
                   Job title
                   • Bullet points with quantitative achievements...
────────────────────────────────────────────────────────────────────────────────
Additional Information
Interests:         Concentrate on activities you participate in and are willing to talk about...
Achievements:      List academic or other achievements here (First Class Honours, etc.)...
Nationality:       Your nationality, dual nationality, and work authorization...
Languages:         Languages other than English and ability level (e.g. German fluent)...
```

### Key User Flows
1. **Landing Page & Template Showcase**:
   - The landing page template carousel and preview display this exact traditional template.
   - A clean "More templates coming soon" badge or indicator reflects that additional templates will be added later.
2. **Builder Workflow**:
   - Directly guides the user through Contact Details, Education, Experience, and Additional Information.
   - Real-time A4 preview immediately reflects edits with exact proportions and zoom controls.
3. **One-Click PDF Export**:
   - Strict A4 print CSS ensures the downloaded PDF matches the visual quality of the provided reference.

---

## 3. Key Architecture & Modular Registry Strategy

### Architecture & Data Flow
```
┌─────────────────────────────────────────────────────────────┐
│                    Zustand CV Store                         │
│  - Contact (Forename, SURNAME, email, UK phone, location)   │
│  - Education[] (First section)                              │
│  - Experience[] (Second section)                            │
│  - AdditionalInfo (Interests, Achievements, Nationality,    │
│    Languages)                                               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
┌───────────────────────────────┐ ┌───────────────────────────┐
│     Builder Stepper / Forms   │ │      A4 Live Preview      │
│  1. Contact Details           │ │  ┌─────────────────────┐  │
│  2. Education & Qualifications│ │  │ Forename SURNAME    │  │
│  3. Work Experience           │ │  ├─────────────────────┤  │
│  4. Additional Information    │ │  │ Education & Quals   │  │
│  5. Finalize & Export         │ │  ├─────────────────────┤  │
│                               │ │  │ Work Experience     │  │
│                               │ │  ├─────────────────────┤  │
│                               │ │  │ Additional Info     │  │
│                               │ │  └─────────────────────┘  │
└───────────────────────────────┘ └───────────────────────────┘
```

- **Extensible Template Registry**:
  `templates/registry.tsx` will define `CV_TEMPLATES: TemplateDefinition[] = [ukTraditionalTemplate]`. When the user uploads additional templates in the future, each new template can be added as a modular component in `templates/` and registered in one line.

---

## 4. Implementation Steps

1. **Dedicated Template Component (`templates/UkTraditionalTemplate.tsx`)**:
   - Implement the exact layout, margins, date gutter, horizontal dividing rules, and typography.
   - Format name as "Forename SURNAME" (surname in uppercase bold).
   - Render the 4 structured Additional Information categories (Interests, Achievements, Nationality, Languages).
2. **Template Registry Overhaul (`templates/registry.tsx`)**:
   - Clear out all 20 legacy templates.
   - Export `uk-traditional` as the sole active template.
3. **Sample Data Alignment (`data/sampleCv.ts`)**:
   - Populate with the sample text and numbers from the reference document (e.g. £3M expansion, $745k equipment financing, Oxford Runners Club, First Class Honours, German fluent).
4. **Builder Steps & Adapter Alignment**:
   - Ensure the builder stepper, `CvPreview.tsx`, and `lib/cvAdapter.ts` seamlessly handle the Education-first hierarchy and Additional Information fields.
5. **Template Modal & Landing Page Update**:
   - Update `components/builder/TemplateModal.tsx` and `components/home/TemplatesSection.tsx` so they feature the new template and show an extensible state for future additions.
6. **Compilation & Verification**:
   - Run `lint_applet` and `compile_applet` to verify clean build and rendering.
