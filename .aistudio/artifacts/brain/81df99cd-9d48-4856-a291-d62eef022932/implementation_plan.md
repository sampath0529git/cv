# Intelligent CV Scanning with Layout Matching & AI Assistant

Automate the transition from raw CV documents (PDF, Word .docx, and text) into the Makemycv builder by auto-detecting the original document's visual layout to match the closest builder template, while equipping the builder with a comprehensive AI Assistant panel for generating high-impact bullet points, executive summaries, ATS skill keywords, and quick template customization.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and user experience decisions were confirmed through Phase 1 clarification:

- **Confirmed Decision 1 (Template Matching)**: The scan engine will analyze the document structure and typography (single-column, 2-column sidebar, executive header, or technical grid) and automatically select the closest matching template (`toronto`, `modern-executive`, `classic-corporate`, `tech-compact`, `uk-traditional`, `minimal-clean`, `graduate-starter`). The user can also override it directly on the preview card.
- **Confirmed Decision 2 (AI Experience)**: A dedicated, collapsible "AI Assistant" slide-out panel docked in the CV Builder featuring three specialized tools: **Bullet Point Architect**, **Executive Summary Tailoring**, and **ATS Skills & Keyword Recommendations**, with 1-click apply handlers.
- **Confirmed Decision 3 (File Format Support)**: Support for PDF files (multimodal Gemini parsing), Word `.docx` documents (client-side text extraction + structured Gemini parsing), and raw text / LinkedIn export formats.

---

## 1. Overview & Core Concept

- **What It Does**: Allows users to drop any existing CV file. The system scans the document, extracts complete structured data (contact, experiences, education, skills, projects, certifications, languages), identifies whether the source document is a 2-column sidebar, formal single-column, or modern corporate layout, and sets the builder directly to that matched template. Inside the builder, users can edit every field, switch templates with zero data loss, and invoke the AI Assistant panel to refine bullet points with action verbs and metrics.
- **Target Audience**: Job seekers, career switchers, and professionals who have an existing CV and want to digitize it without manual retyping, while upgrading its content with AI and testing different modern templates.
- **Key Value**: Saves 30–60 minutes of tedious copying and pasting, preserves the visual layout familiarity of their existing CV, and provides instant AI suggestions to boost interview callback rates.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Upload & Scan (`/import`)**:
   - Drag and drop PDF, `.docx`, or `.txt` file into the upload dropzone.
   - Animated parsing progress tracker showing live analysis milestones: *Reading document structure*, *Detecting layout & column geometry*, *Extracting career history*, *Identifying template match*.
2. **Layout & Template Verification (`/import` Preview Step)**:
   - Verification card displaying parsed candidate name, role, contact info, experience count, and a prominent **"Matched Template"** badge (e.g. *Toronto (2-Column Sidebar)* with confidence indicator).
   - Quick template selector dropdown right on the preview card if the user wants to adjust the auto-selected template before opening the builder.
   - Action buttons: "Open in CV Builder (Matched Template)" or "Cancel".
3. **Builder Experience with AI Assistant (`/builder`)**:
   - The builder loads directly with the auto-matched template selected and all sections populated.
   - A floating / header-docked **"AI Assistant"** trigger button with badge indicator.
   - Sliding right-side AI drawer containing:
     - **Tab 1: Bullet Point Architect**: Choose any job role, get STAR-format bullet suggestions with quantifiable metrics and active verbs, preview differences, and 1-click insert.
     - **Tab 2: Summary Polisher**: Generate 3 tailored variations (Executive / Impact-driven / Career Transition) aligned with target role and skills.
     - **Tab 3: Skills & ATS Keyword Suggester**: Analyzes career history against target job titles to suggest missing hard and soft skills with 1-click "+ Add Skill" badges.
4. **Frictionless Template Switching (`/builder` -> Design Tab)**:
   - Instant visual carousel and grid of all 7 templates with live thumbnail previews.
   - Switching templates takes 1 click with zero data loss and instant reactive re-render of the canvas.

### Visual Identity & Layout Rules

- **Tokens & Colors**:
  - Primary brand indigo: `#4a4df2` (`bg-primary`, `text-primary`).
  - Subtle borders: `border-slate-200/80`.
  - AI Assistant accent: Indigo and emerald highlights with clean, unboxed metadata and typographic separators (`·`).
- **Typography**: Display typography in `Plus Jakarta Sans` with tight tracking (`-0.025em`) and crisp body in `Inter`.
- **Zero-Pill Discipline**: Metadata (confidence score, dates, category tags) rendered as quiet text separated by middle dots, avoiding chunky colored capsules.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Document Structure & Template Classifier**:
  - *Chosen Approach*: Expand the Gemini parse schema in `/api/linkedin/parse/route.ts` to include `layoutCharacteristics` (columnCount, hasSidebar, headerStyle) and `suggestedTemplate` (`toronto` | `modern-executive` | `classic-corporate` | `tech-compact` | `uk-traditional` | `minimal-clean` | `graduate-starter`).
  - *Why*: Gemini 3.8 Flash can evaluate the visual geometry and structural hierarchy of PDF documents directly, providing accurate template classification without needing separate OCR heuristics.
- **Decision 2: Word (.docx) Parsing Integration**:
  - *Chosen Approach*: Use client-side XML/text extraction for `.docx` (or pass base64 to server route) and feed the extracted text to the structured Gemini schema.
  - *Why*: Supports standard British and worldwide CV files without requiring heavy native server binaries.
- **Decision 3: Builder AI Panel Placement & Integration**:
  - *Chosen Approach*: A collapsible docked sidebar panel in `/app/builder/page.tsx` rather than scattered isolated modals.
  - *Why*: Users can view their CV live in the center preview while interacting with AI suggestions on the side, enabling immediate visual feedback.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Client UI                                 │
│                                                                        │
│  ┌───────────────────────┐              ┌───────────────────────────┐  │
│  │    /import Page       │              │     /builder Page         │  │
│  │  - Dropzone           │              │  - Live Canvas Preview    │  │
│  │  - Progress Animation │              │  - Template Switcher Bar  │  │
│  │  - Matched Template   │──(Push Store)│  - Section Form Editors   │  │
│  │    Preview Card       │              │  - Collapsible AI Drawer  │  │
│  └──────────┬────────────┘              └─────────────┬─────────────┘  │
└─────────────┼─────────────────────────────────────────┼────────────────┘
              │ (POST /api/linkedin/parse)              │ (POST /api/cv/*)
              ▼                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           API Proxy Routes                             │
│                                                                        │
│  ┌───────────────────────────────┐     ┌────────────────────────────┐  │
│  │  /api/linkedin/parse          │     │  /api/cv/generate-bullet   │  │
│  │  - Structured Data Extraction │     │  /api/cv/rewrite-summary   │  │
│  │  - Layout Classification      │     │  /api/cv/suggest-skills    │  │
│  │  - Template Auto-Matching     │     │  (Gemini 3.8 Flash)        │  │
│  └──────────────┬────────────────┘     └──────────────┬─────────────┘  │
└─────────────────┼─────────────────────────────────────┼────────────────┘
                  │                                     │
                  ▼                                     ▼
        ┌──────────────────────────────────────────────────────┐
        │                 @google/genai SDK                    │
        │           Model: 'gemini-3.8-flash'                  │
        └──────────────────────────────────────────────────────┘
```

### Data Model Additions

- **`LinkedInImportPayload` & `CvState`**:
  - `suggestedTemplate?: TemplateId`
  - `templateConfidence?: string`
  - `layoutDetails?: { columns: number; hasSidebar: boolean; styleSummary: string }`
- **Store Actions**:
  - `loadParsedCvData` sets `selectedTemplate` to `suggestedTemplate` if present, while saving undo state.
  - `setTemplate(templateId)` updates template with zero content loss.

### New & Updated Endpoints:
1. `/api/linkedin/parse/route.ts`: Upgraded with layout analysis prompt and schema fields for template matching.
2. `/api/cv/suggest-skills/route.ts`: New endpoint receiving candidate job title, existing skills, and work history, returning categorized recommended ATS keywords (Hard Skills, Tools, Soft Skills).
3. `/components/builder/AiAssistantDrawer.tsx`: New interactive slide-out panel with bullet generator, summary rewriter, and skill keywords injector.
4. `/components/import/ImportPreviewCard.tsx`: Updated with layout badge, matched template indicator, and template selector before launch.
