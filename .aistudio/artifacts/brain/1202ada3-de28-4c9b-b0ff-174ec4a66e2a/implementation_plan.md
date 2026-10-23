# CV Builder SaaS Onboarding & Real-Time Builder Flow

Pixel-perfect recreation of the multi-step CV Builder onboarding flow and interactive builder workspace based on the 4 reference screenshots, featuring modular brand configuration, real-time A4 live preview, robust state management, and print-ready PDF export.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions have been aligned based on clarifying questions:

- **Confirmed Decision 1 (Brand Configuration)**: The brand identity is isolated in `lib/config.ts` under `YourBrand`, providing a single point of configuration for the brand name, logo mark, primary accent (`#4B4DED`), dark navy (`#0F1B4D`), and theme tokens.
- **Confirmed Decision 2 (Export Format)**: The Finalize step will invoke an optimized native print stylesheet (`@media print`) configured strictly for crisp, high-resolution standard A4 paper dimensions without page breaks clipping sections.
- **Confirmed Decision 3 (CV Templates)**: The "Change template" modal will include 4 distinct recruiter-approved templates:
  1. *Modern Beige* (the exact reference design from screenshot 4: beige left sidebar column, timeline dots, dark headers)
  2. *Minimal Clean* (single-column modern editorial layout with clean divider lines)
  3. *Executive Navy* (deep indigo headers with compact 2-column skills/experience split)
  4. *Tech Slate* (accent color badges, clean monospace tabular dates, balanced white-space)

---

## 1. Overview & Core Concept

- **What It Does**: A frictionless, end-to-end CV builder SaaS web application that guides users from onboarding (`/start` and `/import`), through a visual system preparation animation (`/setup`), into a split-screen live builder workspace (`/builder`). The form dynamically updates a photorealistic A4 CV preview card on the fly.
- **Target Audience**: Job seekers, students, and professionals looking for an intuitive, recruiter-approved CV builder with instant feedback and zero friction.
- **Key Value**: Real-time visual synchronization between user inputs and the A4 document preview, paired with structured step-by-step guidance.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ / (Home) ] ──(Click "Create CV")──> [ /start (Choose Flow) ]
                                          ├── "Import my CV" ──> [ /import (Dropzone) ] ──> [ /setup (Animated Loader) ]
                                          └── "From scratch" ────────────────────────────> [ /setup (Animated Loader) ]
                                                                                                    │
                                                                                                    ▼
                                                                                           [ /builder (6 Steps) ]
                                                                                               1. Contact Details
                                                                                               2. Work Experience
                                                                                               3. Education
                                                                                               4. Skills
                                                                                               5. Summary
                                                                                               6. Finalize & Print PDF
```

### Visual Identity & Design Tokens

- **Primary Indigo**: `#4B4DED` (buttons, active stepper, focused inputs, brand highlights)
- **Dark Navy**: `#0F1B4D` (primary headings, "Recommended" badge on Start card, loader gear box)
- **Sidebar Background**: `#12114A` (stepper drawer in `/builder`)
- **Canvas Gradient**: `#EEF1FF` (top subtle tint) blending into `#FFFFFF` (bottom)
- **Card Backgrounds**: Clean white (`#FFFFFF`) with `#E8EAF5` hairline borders and subtle elevation
- **Inputs**: 60px touch height, `#E3E6F0` border, `rounded-lg`, `#94A3B8` placeholder styling
- **Disabled State**: `#A5A7F5` with cursor-not-allowed
- **Typography**: Space Grotesk / Plus Jakarta Sans display headers with Inter / Plus Jakarta body

---

## 3. Screen-by-Screen Specifications

### Screen 1: Start Flow (`/start`)
- Header with `YourBrand` logo and clean white border-b.
- Centered headline: **"How do you want "** (navy `#0F1B4D`) + **"to start your CV?"** (indigo `#4B4DED`).
- Two stacked option cards (`max-w-[575px]`):
  1. **Import my CV**:
     - Dark navy pill badge `"✦ Recommended"` anchored top-right.
     - Royal blue curved accent shape pinned to bottom-left corner.
     - Icon tile with file-import line illustration.
     - Description: *"We'll improve the layout and optimize the content."*
  2. **From scratch**:
     - Soft purple icon tile with paintbrush line illustration.
     - Description: *"We'll guide you section by section."*
- Card hover transitions with 200ms ease, lift, and indigo border highlight.

### Screen 2: System Setup Loader (`/setup`)
- Centered white card with headline: **"Settings things up for you..."**
- Navy rounded illustration container with smooth rotating gear and dashed orbit ring matching screenshot 2.
- Interactive checklist with sequential progress:
  - Step 1: *"Applying Template"* (Spinner -> Indigo checkmark)
  - Step 2: *"Setting up the CV Builder"* (Spinner -> Indigo checkmark)
  - Step 3: *"Launch AI assistant"* (Spinner -> Indigo checkmark)
- 1.1s delay per step; upon completion, smooth auto-redirect to `/builder`.

### Screen 3: File Import (`/import`)
- Centered white card with headline: **"Import your existing CV"** and subtitle: *"Leverage expert advice to improve your CV."*
- Dashed border dropzone container (`bg-[#F0F0FC]` with `#4B4DED` dashed stroke):
  - File upload icon, *"Drag and drop a file here"*, *"Accepted format: PDF, DOCX"*.
  - Solid indigo *"Browse"* button.
- Real drag-and-drop file handling, format validation (PDF/DOCX), and max 5MB size limit.
- Selected file preview pill with filename and remove (`×`) trigger.
- Footer actions: `"< Back"` link and disabled/active `"Import"` button.

### Screen 4: Split Builder Workspace (`/builder`)
- **Left Stepper Sidebar** (360px width, deep navy `#12114A`):
  - Brand header with logo.
  - 6 vertical steps connected by subtle dotted indicator lines:
    1. *Contact*
    2. *Work experience*
    3. *Education*
    4. *Skills*
    5. *Summary*
    6. *Finalize*
  - Active step = glowing indigo circle; Completed = checkmark icon; Inactive = muted number.
- **Top Utility Bar**:
  - Centered language selector dropdown with globe icon (`English (UK)`, `English (US)`, etc.).
- **Main Split View**:
  - **Left Form Area**:
    - **Step 1 (Contact)**: First name, Last name, Job title, circular Photo upload with preview + "Add a photo" pill button, Email, Phone number, Postal code, City.
    - Expandable accordion: *"Add more details (Date of birth, Nationality, etc.)"* containing Date of birth, Nationality, LinkedIn, Website, Driving licence.
    - **Step 2 (Experience)**: Dynamic repeater entries (Job title, Employer, City, Start/End dates, "I currently work here" toggle, responsibilities).
    - **Step 3 (Education)**: Degree, School, City, Start/End dates, description.
    - **Step 4 (Skills)**: Tag chip input with level indicator (Beginner, Intermediate, Advanced, Expert).
    - **Step 5 (Summary)**: Professional summary textarea with live character counter and "Generate with AI" button.
    - **Step 6 (Finalize)**: Complete review, section edit shortcuts, and print/download action.
  - **Right Live CV Preview Area**:
    - Pixel-perfect A4 ratio card matching screenshot 4.
    - Beige left sidebar (`#F4EFE6`) housing Contact, Skills, Languages, and Interests.
    - Right content column with Name, Job Title, Professional Summary, Work Experience timeline dots, and Education.
    - Real-time instant two-way binding as user types in the form.
    - Floating button below preview: `"⊞ Change template"` opening modal with 4 interactive template options.
- **Fixed Bottom Navigation Bar**:
  - Outlined `"Back"` button on left.
  - Solid indigo `"Next"` button on right (advancing step or completing).

---

## 4. Technical Architecture & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     Zustand Store                           │
│  (Personal Info, Experience, Education, Skills, Template)   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
    ┌──────────────────────┐      ┌───────────────────────────┐
    │  Step Form Controls  │      │   Live A4 CV Preview      │
    │  - ContactStep       │      │   - Modern Beige Template │
    │  - ExperienceStep    │ ───> │   - Minimal Clean         │
    │  - EducationStep     │      │   - Executive Navy        │
    │  - SkillsStep        │      │   - Tech Slate            │
    │  - SummaryStep       │      │   (Print-ready stylesheet)│
    │  - FinalizeStep      │      └───────────────────────────┘
    └──────────────────────┘                    ▲
                                                │
                                  ┌───────────────────────────┐
                                  │   Change Template Modal   │
                                  └───────────────────────────┘
```

### State Management & Persistence
- Zustand store (`store/useCvStore.ts`) with `persist` middleware storing state in `localStorage` under `yourbrand-cv-builder`.
- Default values pre-fill the form so the live preview immediately renders a beautiful sample CV matching the screenshot when empty, replacing placeholders cleanly on input.

### File Plan
1. `lib/config.ts`: Central brand tokens (Brand name, logo SVG, theme colors).
2. `store/useCvStore.ts`: Full CV schema, step tracking, active template, and persistence.
3. `components/brand/Logo.tsx`: Flexible brand logo component based on `lib/config.ts`.
4. `components/start/StartOptionCard.tsx`: Reusable option card for `/start`.
5. `components/import/Dropzone.tsx`: Drag & drop file parser mockup.
6. `components/setup/SetupChecklist.tsx`: Animated rotating gear and progress checklist.
7. `components/builder/Stepper.tsx`: 6-step vertical sidebar navigation.
8. `components/builder/LanguageSelect.tsx`: Globe language selector.
9. `components/builder/TemplateModal.tsx`: Modal for switching between 4 CV templates.
10. `components/builder/CvPreview.tsx`: Real-time A4 preview rendering the active template.
11. `components/builder/steps/*`: ContactStep, ExperienceStep, EducationStep, SkillsStep, SummaryStep, FinalizeStep.
12. Pages: `/start/page.tsx`, `/import/page.tsx`, `/setup/page.tsx`, `/builder/page.tsx`, and updated `/app/page.tsx`.

---

## Plan Verification

- **Completeness**: All 4 screenshots and the requested 6 steps, templates, and routes are fully mapped.
- **Fidelity**: Exact color hexes, rounded borders, spacing, and micro-interactions specified.
- **Safety**: Pure additive frontend implementation with no external runtime dependencies that break compilation.
