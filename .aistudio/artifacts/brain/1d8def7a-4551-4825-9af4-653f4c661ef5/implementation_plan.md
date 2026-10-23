# ukcvmaker – Free CV Maker Home Page Implementation Plan

A modern, high-converting, UK-targeted landing page for **ukcvmaker** built to rank for the primary search query **"free cv maker"** and secondary UK keywords, faithfully reproducing the reference SaaS visual design system with interactive components and British English editorial standards.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following core product and visual decisions have been confirmed and will guide the build:

- **Confirmed Decision 1 (Brand & Identity)**: Brand identity is set to **ukcvmaker**, with the primary title `<title>Free CV Maker | Create a Professional CV Online – ukcvmaker</title>` and UK-specific meta descriptions.
- **Confirmed Decision 2 (Social Proof & Trust)**: Faithfully reproduce the reference social proof structures (the "+1 million satisfied users" banner, Trustpilot rating badge, company hire strip featuring Apple, DHL, Accenture, Amazon, and Tesla, and authenticated testimonial cards).
- **Confirmed Decision 3 (Full Interactivity)**: Implement complete interactive controls: interactive 10-feature tab switcher with live preview card, template carousel with working previous/next controls and color switches, and rich UK CV guide with expandable/collapsible accordion (`Show more` / `Show less`).
- **Confirmed Decision 4 (Scope Isolation)**: In strict accordance with Phase 1 instructions, only the Home Page will be built, with clean placeholder navigation routes (e.g. `/cv-builder`, `/templates`, `/account`) prepared for future phase implementation.

---

## 1. Overview & Core Concept

- **What It Does**: A landing page that demonstrates how UK jobseekers can craft recruiter-approved, ATS-friendly curriculum vitae (CVs) in minutes for free, showcasing templates, AI-assisted content drafting, and instant export options.
- **Target Audience / Persona**: UK university graduates, career changers, tradespeople, NHS workers, and professionals across England, Scotland, Wales, and Northern Ireland seeking an intuitive, free online CV builder without dark-pattern paywalls.
- **Key Value**: Instant clarity, zero friction, and recruiter-validated UK formatting standards (GCSEs, A-Levels, British date conventions, UK work authorization, concise 1–2 page templates).

---

## 2. User Experience & Visual Design

### Key Visual Sections (Aligned with Reference UI `image_2fbb01ed.png`)

1. **Top Navigation Bar (One-Row, 3-Zone Contract)**:
   - *Left*: **ukcvmaker** wordmark with sleek blue geometric document mark.
   - *Center*: Primary navigation (`CV Builder`, `Cover Letter`, `Templates`, `Features`).
   - *Right*: Language indicator (`🇬🇧 EN`), and `My Account` button.
   - *Mobile*: Accessible hamburger menu toggling a slide-down navigation drawer.

2. **Hero Section (Split Grid & High-Impact Value Proposition)**:
   - Trust badge: `+1 million satisfied users` with reviewer avatar stack and 5-star rating.
   - Main headline: **"Create a perfect CV in minutes with AI"** (H1 incorporating UK CV value).
   - Subheading: "Create a CV in just a few minutes with our recruiter-approved templates and our AI assistant."
   - Dual CTAs: High-contrast primary button **"Create my CV"** (`bg-[#2b4bf6]` hover: `bg-[#1e3cd6]`) and secondary **"Import my CV"** (`border border-slate-200 bg-white`).
   - Trustpilot inline score: "EXCELLENT ★★★★★ on Trustpilot".
   - Right Visual: Professional hero portrait with floating builder UI card ("Build a recruiter-ready CV in minutes") and "Generate with AI" feature indicator.

3. **Hired-By Logo Bar (Dark Navy Foundation `#0b0e20`)**:
   - Subtle banner: *"Our users have been hired by\*: Apple · DHL · Accenture · Amazon · Tesla"*.

4. **"Everything you need to land interviews in one place" (Interactive Feature Showcase)**:
   - 10 segmented tab pills: *Resume Builder (active), Cover Letter Builder, Resume Checker, Resignation Letter Builder, Headshot Pro, Career Test, Job Search, Job Tracker, Remote Job, Interview Prep*.
   - Stateful two-column preview card displaying builder canvas, color picker options, and direct "Create my CV" action.

5. **"Create your CV in 4 steps" Section**:
   - 4-card workflow breakdown with soft blue container surfaces:
     1. *Start your way* (Import existing CV or start from scratch).
     2. *Write it with AI* (Tailored phrasing for each section).
     3. *Make it yours* (Adjust colours, fonts, and spacing in one click).
     4. *Download and apply* (Export to PDF or Word).
   - Centered CTA: **"Create my CV"**.

6. **Customer Reviews Carousel ("+1 million satisfied users")**:
   - Trustpilot-styled review cards with 5 green stars, verified quotes, and reviewer names (e.g., Ally Fox, Rocco Giordano, Ivan).
   - Working previous/next navigation arrows.

7. **"Choose your professional CV template" (Deep Dark Navy Section `#090d1a`)**:
   - Headline and recruiter assurance subtitle.
   - Template carousel showcasing British-style CV layouts (Elise Monet modern template, classic double-column, executive single-column, and creative slate styles) with working navigation controls.
   - Primary CTA: **"Create my CV"**.

8. **"6 Reasons to Create Your CV with ukcvmaker" Grid**:
   - Soft blue gradient card container:
     1. *CV Creator* – Distraction-free online editor.
     2. *Pre-written content* – Recruiter-validated phrasing.
     3. *AI Assistant* – Smart content suggestions.
     4. *Multilingual templates* – Translate headings in one click.
     5. *Cover Letter Creator* – Matched cover letters.
     6. *Approved templates* – ATS-optimised layouts.

9. **Comprehensive UK SEO Content & Guide ("Online CV Creation: Easily Create a Stylish CV")**:
   - High-ranking semantic article matching Semrush keyword strategies:
     - What is the best CV designer software?
     - How to create a free online CV?
     - Creating a design CV from an online template.
     - UK tips for 2026 job applications.
     - Exporting to PDF and mobile smartphone editing.
   - Smooth "Show more / Show less" toggle.

10. **Bottom Conversion Hero & Footer**:
    - Dark navy curved banner with professional visual and immediate CTA.
    - Comprehensive UK footer with brand wordmark, feature links, about links, copyright, and trademark disclaimer.

---

## 3. Key Product Decisions & Trade-Offs

- **UK English Exclusivity**:
  - *Chosen Approach*: Strictly use UK terminology throughout: "CV" (never resume in body copy), "optimised", "postcode", "GCSEs", "A-levels".
  - *Why*: User specifically requested UK-targeted product; Americanisms alienate British jobseekers.
- **Client vs. Server Component Separation**:
  - *Chosen Approach*: Root page (`app/page.tsx`) renders the primary semantic HTML on the server for maximum SEO crawler performance, while interactive elements (feature tabs, carousel sliders, FAQ accordion, mobile nav) are encapsulated in client components in `components/home/`.
  - *Why*: Guarantees high Core Web Vitals and indexability for Google UK while delivering seamless UI interactivity.
- **Semrush Keyword Strategy**:
  - *Chosen Approach*: Natural integration of primary keyword "free cv maker" across H1, title, meta description, structured data, and content body without spammy repetition.

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                   Root Layout (app/layout.tsx)         │
│  - Meta Title: "Free CV Maker | ukcvmaker"             │
│  - JSON-LD Structured Data: WebApplication & FAQPage   │
│  - UK Font: Plus Jakarta Sans                          │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                    Home Page (app/page.tsx)            │
│  - Server Component for optimal SEO indexability       │
└──────┬───────────────────┬───────────────────┬─────────┘
       │                   │                   │
┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
│  TopNav     │     │ HeroSection │     │ HiredByBar  │
│ (Responsive)│     │(CTAs+Proof) │     │ (Logos Bar) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
│FeatureTabs  │     │ StepsSection│     │ ReviewsStrip│
│(Interactive)│     │ (4-step UX) │     │ (Carousel)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
│TemplateGrid │     │ReasonsGrid  │     │ SeoGuideFaq │
│(Interactive)│     │(6 Benefits) │     │(Expandable) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
┌──────▼──────┐     ┌──────▼──────┐
│ BottomHero  │     │   Footer    │
│(Dark Banner)│     │(Legal Links)│
└─────────────┘     └─────────────┘
```

---

## 5. Verification & Acceptance Criteria

1. **Visual Accuracy**: Layout, colors (`#2b4bf6` primary blue, `#0b0e20` dark sections, soft blue card surfaces), and typography match the reference screenshot.
2. **Interactive Controls**:
   - Feature tabs correctly switch the preview screen.
   - Reviews and template carousel arrows slide to reveal cards.
   - "Show more / Show less" button cleanly expands and collapses the SEO guide.
   - Mobile navigation toggles smoothly without layout shift.
3. **SEO & Structured Data**: Valid JSON-LD schema embedded in layout; meta title and description correctly configured for Google UK search.
4. **Clean Code & Zero Lints**: Strict TypeScript, responsive across 320px to 1920px viewports, zero console errors, passes `compile_applet`.
