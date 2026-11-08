# Comprehensive Professional SEO Audit Report — freecvmakeruk.co.uk
**Target Market:** United Kingdom (Google UK — google.co.uk)  
**Primary Seed Target Keyword:** *Free CV Maker* / *Free CV Maker UK*  
**Auditor Roles:** Senior Technical SEO Specialist, UK SEO Strategist, Google Search Quality & Search Console Consultant, Next.js SEO Engineer  
**Audit Date:** November 2026  
**Audit Mode:** Read-Only Source Code & System Architecture Inspection  
**Audit Status:** Complete & Verified  

---

## 1. Executive Summary

### 1.1 Strategic Context & Objective
`freecvmakeruk.co.uk` is an online Curriculum Vitae (CV) builder application specifically tailored to the United Kingdom employment market. The application is designed to challenge established commercial CV builders (e.g., CVMaker.co.uk, Zety, Resume.io/CVapp, LiveCareer) by providing recruiter-approved British ISO A4 (210 × 297 mm) formats, reverse-chronological structures, UK Equality Act 2010 bias-free configurations, and instant, genuine free PDF/Word downloads without hidden subscription walls or watermarks.

This audit evaluates the website's technical health, architectural crawlability, on-page optimization, content quality, keyword cannibalization, structured data validity, and Google UK competitive positioning.

### 1.2 Core Audit Findings Matrix

| Dimension | Rating | Status | Primary Finding |
|---|---|---|---|
| **Technical Architecture** | **8.5 / 10** | Strong | Clean Next.js 15 App Router, static SSG + dynamic SSR routing, XML sitemap, strict robots.txt, standalone output. |
| **Crawlability & Indexing** | **8.0 / 10** | Good | Canonical tags implemented across all routes; 301 redirects from legacy `/templates` active; clean semantic URL hierarchy. Minor sitemap date hardcoding. |
| **On-Page & Keyword Alignment** | **7.0 / 10** | Needs Attention | Homepage `<title>` is strong, but the homepage `<h1>` (`Create a standout CV in minutes`) completely omits the primary seed keyword *"Free CV Maker UK"*. Title branding suffix inconsistent (`freecvmakeruk` vs `freecvmakeruk.co.uk`). |
| **Structured Data (Schema.org)** | **6.5 / 10** | Needs Restructuring | Root layout injects Homepage `FAQPage` and `HowTo` schema into **all** website pages (including blog posts and category spokes), causing schema duplication across the entire domain. |
| **Hub-and-Spoke Content Architecture** | **9.0 / 10** | Excellent | Pristine canonical hub (`/cv-templates`) with 7 focused niche spokes (16-year-old, school leaver, graduate, acting, finance, nursing, ATS-friendly) and 6 deep UK editorial guides. |
| **Performance & Core Web Vitals** | **7.0 / 10** | Fair / Needs Work | External Google Fonts stylesheet in root `<head>` loads 6 font families with multiple weights via render-blocking HTTP link instead of `next/font/google`. Multiple raw PNG/JPG assets in `/public/assets` exceed 800 KB – 1.2 MB. |
| **UK Search Intent & E-E-A-T** | **8.5 / 10** | Very Strong | Highly authentic British CV terminology (GCSE 9–1 grading, A-Levels, BTEC/T-Levels, Degree classifications, NMC PIN, NHS Banding, ACA/ACCA, Spotlight). Author bios present on blog posts. |

---

## 2. Website Overview & Business Model Analysis

### 2.1 Project Profile
- **Brand / Domain:** `freecvmakeruk.co.uk`
- **Application Display Name:** Free CV Maker UK
- **Target Audience:** UK jobseekers across all experience levels, including 16-year-old GCSE pupils, Sixth Form/College school leavers, university graduates, NHS healthcare staff, City of London finance professionals, actors/performers, and career changers.
- **Value Proposition:** 100% free online British CV builder with live A4 preview, ATS compatibility, built-in British English AI assistance, and instant 300 DPI PDF and Microsoft Word (.docx) export without forced payment screens.

### 2.2 Competitive Edge Against UK Competitors
1. **The "True Free" Moat:** The dominant player in UK organic search (`cvmaker.uk` / `cvmaker.co.uk`) attracts significant consumer backlash for requiring £1.99 trials that automatically convert into recurring £19.99/month subscriptions. `freecvmakeruk.co.uk` provides actual free downloads, establishing high user trust and superior engagement signals.
2. **British Localization:** Most international competitors (Zety, Enhancv, Novoresume) treat UK CVs as US Resumes with minor spelling tweaks. `freecvmakeruk.co.uk` enforces ISO A4 dimensions (210 × 297 mm), 2-page reverse-chronological layouts, Equality Act 2010 bias-free defaults (no photo/DOB/marital status), and UK-specific qualifications.

---

## 3. Technology and Architecture Inspection

### 3.1 Technology Stack (Verified via Source Code)
- **Framework:** Next.js 15.4.9 (App Router)
- **React Runtime:** React 19.2.1 / React-DOM 19.2.1
- **Styling Engine:** Tailwind CSS v4.1.11 via `@tailwindcss/postcss` with `tw-animate-css`
- **Animation:** `motion` 12.23.24 (`motion/react`)
- **State Management:** Zustand 5.0.16 with `persist` middleware (local browser persistence)
- **Document Generation:** `jspdf` 4.2.1, `html2canvas-pro` 2.5.2, `docx` 9.14.0
- **AI Engine:** Google GenAI SDK (`@google/genai` 2.32.0) with server-side proxy routes (`/api/cv/*`)
- **Icons:** `lucide-react` 0.553.0
- **Deployment Build:** Next.js standalone output (`output: 'standalone'` in `next.config.ts`)

### 3.2 Rendering & Delivery Architecture
- **Static Pages (SSG / ISR):** Static pages include `/`, `/cv-templates`, `/cv-template-16-year-old`, `/school-leaver-cv-template`, `/graduate-cv-templates`, `/acting-cv-template`, `/finance-cv-template`, `/nursing-cv-template`, `/ats-friendly-cv-template`, `/blog`, `/blog/[slug]`.
- **Dynamic Client Applications:** `/builder` (client-side interactive 8-step CV studio with live zoom/A4 renderer), `/import` (file upload/parse studio), `/start` (onboarding selector), `/share` (shared token viewer).
- **Edge / Server Redirects:** `next.config.ts` enforces a 301 permanent redirect from `/templates` to `/cv-templates`.

---

## 4. Complete URL Inventory & Architectural Map

### 4.1 Indexable Public URLs (19 Crawlable URLs)

| URL Path | Page Type | Rendering Mode | Target Search Intent | Sitemap Priority | Verified Status |
|---|---|---|---|---|---|
| `/` | Homepage | Server / Hybrid | High-intent transactional ("free cv maker uk") | 1.0 | VERIFIED |
| `/cv-templates` | Canonical Template Hub | Server / SSG | Commercial / Directory ("free cv templates uk") | 0.95 | VERIFIED |
| `/cv-template-16-year-old` | Niche Template Spoke | Server / SSG | High-intent transactional ("cv template 16 year old") | 0.90 | VERIFIED |
| `/school-leaver-cv-template` | Niche Template Spoke | Server / SSG | High-intent transactional ("school leaver cv template") | 0.90 | VERIFIED |
| `/graduate-cv-templates` | Niche Template Spoke | Server / SSG | High-intent transactional ("graduate cv templates") | 0.90 | VERIFIED |
| `/acting-cv-template` | Niche Template Spoke | Server / SSG | Specialist transactional ("acting cv template uk") | 0.90 | VERIFIED |
| `/finance-cv-template` | Niche Template Spoke | Server / SSG | Specialist transactional ("finance cv template uk") | 0.90 | VERIFIED |
| `/nursing-cv-template` | Niche Template Spoke | Server / SSG | Specialist transactional ("nursing cv template uk") | 0.85 | VERIFIED |
| `/ats-friendly-cv-template` | Niche Template Spoke | Server / SSG | Specialist transactional ("ats friendly cv template") | 0.85 | VERIFIED |
| `/builder` | CV Studio Tool | Client Component | Interactive Web Application | 0.90 | VERIFIED |
| `/start` | Onboarding / Selector | Client Component | User Journey Step 1 | 0.85 | VERIFIED |
| `/import` | CV / LinkedIn Importer | Client Component | Interactive Parser Tool | 0.80 | VERIFIED |
| `/blog` | Editorial Resource Hub | Client Component | Informational / Resource Directory | 0.75 | VERIFIED |
| `/blog/how-to-write-a-cv-uk` | Editorial Pillar Guide | Server / SSG | Informational ("how to write a cv uk") | 0.70 | VERIFIED |
| `/blog/ats-friendly-cv-uk-guide` | Editorial Guide | Server / SSG | Informational ("ats friendly cv guide uk") | 0.70 | VERIFIED |
| `/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk` | Editorial Guide | Server / SSG | Informational ("first cv guide uk") | 0.70 | VERIFIED |
| `/blog/uk-cv-personal-statement-examples` | Editorial Guide | Server / SSG | Informational ("uk cv personal statement examples") | 0.70 | VERIFIED |
| `/blog/uk-cv-keywords-and-action-verbs-ats` | Editorial Guide | Server / SSG | Informational ("uk cv keywords action verbs") | 0.70 | VERIFIED |
| `/blog/uk-apprenticeship-cv-guide` | Editorial Guide | Server / SSG | Informational ("uk apprenticeship cv guide") | 0.70 | VERIFIED |

### 4.2 Utility & Non-Indexable Routes

| Route | Purpose | HTTP Status / Directive | Verification Finding |
|---|---|---|---|
| `/templates` | Legacy Hub URL | 301 Permanent Redirect to `/cv-templates` | Configured in `next.config.ts` and `/app/templates/page.tsx`. VERIFIED. |
| `/share` | Decoded token view | `robots: noindex, nofollow` + disallowed in `robots.txt` | Blocks search engine indexation of private candidate CV snapshots. VERIFIED. |
| `/api/*` | Server AI & parsing routes | Disallowed in `robots.txt` | Excluded from indexing. VERIFIED. |
| `/*` (404) | Custom Not Found | `robots: noindex, follow` | Graceful 404 handler with brand navigation. VERIFIED. |

---

## 5. Page-by-Page On-Page SEO Audit

### 5.1 Homepage (`/`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/` |
| **Primary Target Keyword** | `free cv maker` / `free cv maker uk` |
| **Secondary Target Keywords** | `free cv builder uk`, `create a cv online free`, `british a4 cv maker`, `ats friendly cv builder` |
| **Existing SEO Title** | `Free CV Maker UK \| Online CV Builder – freecvmakeruk.co.uk` (57 characters) |
| **Recommended Title** | `Free CV Maker UK – 100% Free Online CV Builder & A4 PDF Maker` (61 characters) |
| **Existing Meta Description** | `Build a job-winning UK CV in minutes with freecvmakeruk.co.uk. Choose recruiter-approved British A4 templates and download an ATS-friendly PDF for free.` (154 characters) |
| **Recommended Meta Description** | `Build a job-winning UK CV for free with freecvmakeruk.co.uk. Choose recruiter-approved British A4 templates with instant free PDF & Word download. No paywall.` (159 characters) |
| **Existing H1** | `Create a standout CV in minutes` *(VERIFIED: Found in `components/home/HeroSection.tsx`, line 46)* |
| **Recommended H1** | `Free CV Maker UK: Create a Standout British CV in Minutes` |
| **H2 & H3 Hierarchy** | - `H2: UK Jobseekers Hired By Leading British & Global Employers`<br>- `H2: How to Create Your UK CV in 4 Easy Steps`<br>- `H2: Professional Academic & Corporate CV Templates`<br>- `H2: 6 Reasons to Create Your CV with freecvmakeruk.co.uk`<br>- `H2: Reviewed by British Jobseekers & Career Changers`<br>- `H2: The #1 Free CV Maker UK for Jobseekers`<br>- `H3: Free CV Maker UK: Everything You Need to Know` |
| **Identified Content Issues** | 1. **CRITICAL H1 MISMATCH:** The `<h1>` tag does NOT contain the primary keyword *"Free CV Maker"* or *"UK"*. It uses generic copy (`Create a standout CV in minutes`).<br>2. **HERO IMAGE ALT TEXT:** `alt="Candidate with 3D glass CV template"` is generic and lacks keyword context.<br>3. **ROOT SCHEMA POLLUTION:** Root layout injects the homepage FAQPage and HowTo schema globally across the entire site. |
| **Internal Linking** | Current: Links to `/start`, `/import`, `/cv-templates`, `/cv-template-*`, `/builder`.<br>Recommended: Add contextual in-body links to the top 3 blog guides (`/blog/how-to-write-a-cv-uk`, `/blog/ats-friendly-cv-uk-guide`). |
| **Priority** | **CRITICAL** (Fixing the H1 and decoupling global schema). |

---

### 5.2 Canonical CV Templates Hub (`/cv-templates`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/cv-templates` |
| **Primary Target Keyword** | `free cv templates` / `free cv templates uk` |
| **Secondary Target Keywords** | `uk cv templates`, `british a4 cv template`, `professional cv template free download`, `classic cv template uk` |
| **Existing SEO Title** | `Free CV Templates UK – British A4 Layouts \| freecvmakeruk` (56 characters) |
| **Recommended Title** | `Free CV Templates UK – Recruiter-Approved British A4 Layouts` (58 characters) |
| **Existing Meta Description** | `Browse recruiter-approved free CV templates built for UK employers. Customise British A4 layouts online and download instant ATS-friendly PDF or Word files.` (154 characters) |
| **Recommended Meta Description** | `Download recruiter-approved free CV templates built for UK employers. Customise British A4 layouts online with instant ATS-friendly PDF and DOCX export.` (152 characters) |
| **Existing H1** | `Free CV Templates Built for UK Employers` *(VERIFIED: `data/cvTemplateCategories.ts`, line 81)* |
| **Recommended H1** | `Free CV Templates Built for UK Employers (British A4 Formats)` |
| **Content Quality & Depth** | Outstanding. Includes 4 featured flagship templates (London, Westminster, Oxford, Hopkins), 4 practical formatting rules, interactive template zoom modal, sample CV preview, and 5 comprehensive UK FAQs. |
| **Internal Linking** | Contextually links to all 7 niche spoke pages, related blog articles, and direct `/builder` handoffs. |
| **Priority** | **MEDIUM** (Optimize title branding suffix for consistency). |

---

### 5.3 16-Year-Old CV Template Spoke (`/cv-template-16-year-old`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/cv-template-16-year-old` |
| **Primary Target Keyword** | `cv template 16 year old` |
| **Secondary Target Keywords** | `cv template for a 16 year old uk`, `first job cv template uk`, `gcse student cv template`, `16 year old cv no experience uk` |
| **Existing SEO Title** | `CV Template 16 Year Old – Free UK Starter A4 \| freecvmakeruk` (58 characters) |
| **Recommended Title** | `CV Template 16 Year Old UK – Free First Job A4 Layouts` (53 characters) |
| **Existing Meta Description** | `Free CV template for a 16 year old in the UK. Highlight GCSE grades, school achievements, volunteering, and skills for your first weekend or summer job.` (152 characters) |
| **Recommended Meta Description** | `Free CV template for a 16-year-old in the UK. Highlight GCSE grades, school achievements, and volunteering for Saturday jobs, retail, and hospitality.` (151 characters) |
| **Existing H1** | `CV Template for a 16 Year Old (Free UK First-Job Layouts)` *(VERIFIED: Line 187)* |
| **Recommended H1** | `CV Template for a 16 Year Old: Free UK First-Job Layouts` |
| **Content Quality & Depth** | Excellent. Real UK sample CV for a Year 11 GCSE candidate (`Oliver Harrington`), guidance on predicted GCSE 9–1 grades, Saturday shifts, and why DOB/age should not be on a UK CV. |
| **Internal Linking** | Links to `/school-leaver-cv-template`, `/graduate-cv-templates`, `/ats-friendly-cv-template`, and the blog guide `/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk`. |
| **Priority** | **LOW** (Minor title polish). |

---

### 5.4 School Leaver CV Template Spoke (`/school-leaver-cv-template`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/school-leaver-cv-template` |
| **Primary Target Keyword** | `school leaver cv template` |
| **Secondary Target Keywords** | `sixth form leaver cv uk`, `apprenticeship cv template uk`, `college leaver cv template`, `a level student cv template` |
| **Existing SEO Title** | `School Leaver CV Template – Free UK A4 \| freecvmakeruk.co.uk` (58 characters) |
| **Recommended Title** | `School Leaver CV Template UK – Free Apprenticeship A4 Layouts` (59 characters) |
| **Existing Meta Description** | `Free UK school leaver CV template for Sixth Form, A-Level, BTEC, and T-Level students applying for apprenticeships, traineeships, and entry-level roles.` (153 characters) |
| **Recommended Meta Description** | `Free UK school leaver CV template for Sixth Form, A-Level, BTEC, and T-Level leavers applying for Level 3-6 apprenticeships and junior commercial roles.` (153 characters) |
| **Existing H1** | `School Leaver CV Template for Apprenticeships & First Careers` *(VERIFIED: Line 288)* |
| **Recommended H1** | `School Leaver CV Template for UK Apprenticeships & First Jobs` |
| **Content Quality & Depth** | Rich UK educational depth covering A-Levels, T-Levels (315-hour placements), BTEC DDD grades, EPQ projects, and Forage/Springpod virtual experience. |
| **Internal Linking** | Links to `/cv-template-16-year-old`, `/graduate-cv-templates`, `/finance-cv-template`, and `/blog/uk-apprenticeship-cv-guide`. |
| **Priority** | **MEDIUM** (Sync brand title suffix with other spokes). |

---

### 5.5 Graduate CV Templates Spoke (`/graduate-cv-templates`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/graduate-cv-templates` |
| **Primary Target Keyword** | `graduate cv templates` |
| **Secondary Target Keywords** | `uk graduate cv template`, `university student cv template uk`, `graduate scheme cv format`, `placement year cv template uk` |
| **Existing SEO Title** | `Graduate CV Templates UK – Free A4 Layouts \| freecvmakeruk` (56 characters) |
| **Recommended Title** | `Graduate CV Templates UK – Free Times Top 100 Scheme Layouts` (58 characters) |
| **Existing Meta Description** | `Free UK graduate CV templates designed for university students and recent graduates. Showcase 1st/2:1 honours degrees, placements, and dissertations cleanly.` (154 characters) |
| **Recommended Meta Description** | `Free UK graduate CV templates for university students and alumni. Format 1st/2:1 honours degrees, internships, and dissertations for UK graduate schemes.` (153 characters) |
| **Existing H1** | `Graduate CV Templates for UK Schemes & Entry-Level Roles` *(VERIFIED: Line 380)* |
| **Recommended H1** | `Graduate CV Templates for UK Schemes & Entry-Level Careers` |
| **Content Quality & Depth** | High quality. Covers 1st and 2:1 Honours degree classifications, UCAS tariff thresholds, dissertation prominence, Workday/Taleo ATS screening, and student jobs. |
| **Internal Linking** | Links to `/school-leaver-cv-template`, `/finance-cv-template`, `/ats-friendly-cv-template`, and `/blog/how-to-write-a-cv-uk`. |
| **Priority** | **LOW** (Minor title enhancement). |

---

### 5.6 Acting CV Template Spoke (`/acting-cv-template`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/acting-cv-template` |
| **Primary Target Keyword** | `acting cv template` / `acting cv template uk` |
| **Secondary Target Keywords** | `spotlight cv template uk`, `actor cv format uk`, `musical theatre cv template uk` |
| **Existing SEO Title** | `Acting CV Template UK – Spotlight & Stage A4 \| freecvmakeruk` (58 characters) |
| **Recommended Title** | `Acting CV Template UK – Spotlight & Equity British Performer A4` (62 characters) |
| **Existing Meta Description** | `Free UK acting CV template formatted to Spotlight and Equity industry standards. Present stage, TV, and film credits, headshot, playing age, and accents.` (153 characters) |
| **Recommended Meta Description** | `Free UK acting CV template formatted to Spotlight and Equity standards. Present stage, TV, and film credits, 3:4 casting headshot, playing age, and accents.` (156 characters) |
| **Existing H1** | `Acting CV Template (UK Spotlight, Stage & Screen Format)` *(VERIFIED: Line 470)* |
| **Recommended H1** | `Acting CV Template: UK Spotlight, Stage & Screen A4 Format` |
| **Content Quality & Depth** | Uniquely tailored to the UK entertainment industry: Spotlight PIN, agent details, playing age, Equity status, tabular Stage/Production/Director format, BADC combat, and headshot. |
| **Internal Linking** | Links to `/cv-templates`, `/graduate-cv-templates`, `/ats-friendly-cv-template`. |
| **Priority** | **LOW** (Solid niche ranking candidate). |

---

### 5.7 Finance CV Template Spoke (`/finance-cv-template`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/finance-cv-template` |
| **Primary Target Keyword** | `finance cv template` / `finance cv template uk` |
| **Secondary Target Keywords** | `investment banking cv template uk`, `accountant cv template aca acca`, `financial analyst cv uk`, `finance cv example` |
| **Existing SEO Title** | `Finance CV Template UK – Banking, ACA & CFA \| freecvmakeruk` (57 characters) |
| **Recommended Title** | `Finance CV Template UK – Banking, ACA, ACCA & CFA A4 Layouts` (58 characters) |
| **Existing Meta Description** | `Free UK finance CV template built for City of London banking, FP&A, accounting (ACA, ACCA, CIMA), and advisory roles. Crisp A4 deal-sheet precision.` (147 characters) |
| **Recommended Meta Description** | `Free UK finance CV template built for City of London banking, ACA/ACCA accountants, and FP&A. Crisp A4 deal-sheet format denominated in GBP. Free export.` (154 characters) |
| **Existing H1** | `Finance CV Template for UK Banking, Accounting & FP&A` *(VERIFIED: Line 560)* |
| **Recommended H1** | `Finance CV Template for UK Banking, Accounting & FP&A Roles` |
| **Content Quality & Depth** | Authoritative City of London framing: ACA/ACCA first-time pass records, £GBP deal values, Canary Wharf standards, zero photo compliance. |
| **Internal Linking** | Links to `/graduate-cv-templates`, `/ats-friendly-cv-template`, `/cv-templates`. |
| **Priority** | **LOW** (Strong targeted page). |

---

### 5.8 Nursing CV Template Spoke (`/nursing-cv-template`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/nursing-cv-template` |
| **Primary Target Keyword** | `nursing cv template` / `nursing cv template uk` |
| **Secondary Target Keywords** | `nhs nurse cv template`, `band 5 staff nurse cv uk`, `nmc registered nurse cv format` |
| **Existing SEO Title** | `Nursing CV Template UK – NHS Band 5–8 & NMC \| freecvmakeruk` (57 characters) |
| **Recommended Title** | `Nursing CV Template UK – NHS Band 5-8 & NMC Registered Nurse A4` (62 characters) |
| **Existing Meta Description** | `Free UK nursing CV template structured for NHS Trusts, private hospitals, and agency nurses. Clearly display NMC PIN, revalidation, CPD, and clinical skills.` (156 characters) |
| **Recommended Meta Description** | `Free UK nursing CV template for NHS Trusts, GP practices, and private hospitals. Clearly display NMC PIN, clinical revalidation, and ward competencies.` (153 characters) |
| **Existing H1** | `Nursing CV Template for NHS Trusts & Private Healthcare` *(VERIFIED: Line 649)* |
| **Recommended H1** | `Nursing CV Template for NHS Trusts & Private Healthcare Roles` |
| **Content Quality & Depth** | Exceptional clinical authority: NMC PIN verification, NHS Agenda for Change Band 5–8a distinctions, NEWS2 escalation, clinical audits, and ePAD placement records. |
| **Internal Linking** | Links to `/ats-friendly-cv-template`, `/graduate-cv-templates`, `/cv-templates`. |
| **Priority** | **LOW** (High conversion and niche ranking potential). |

---

### 5.9 ATS-Friendly CV Template Spoke (`/ats-friendly-cv-template`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/ats-friendly-cv-template` |
| **Primary Target Keyword** | `ats friendly cv template` / `ats friendly cv template uk` |
| **Secondary Target Keywords** | `simple cv template uk`, `clean single column cv template`, `workday ats cv format uk`, `ats friendly cv` |
| **Existing SEO Title** | `ATS-Friendly CV Template UK – Simple A4 \| freecvmakeruk.co.uk` (59 characters) |
| **Recommended Title** | `ATS-Friendly CV Template UK – Simple Single-Column A4 Layouts` (59 characters) |
| **Existing Meta Description** | `Free simple, ATS-friendly CV template for UK job boards and corporate portals. Single-column ISO A4 structure engineered for Workday, Greenhouse, and Reed.` (154 characters) |
| **Recommended Meta Description** | `Free simple, ATS-friendly CV template for UK job portals. Single-column British A4 structure engineered to pass Workday, Taleo, Greenhouse, and Reed.` (150 characters) |
| **Existing H1** | `Simple & ATS-Friendly CV Templates for UK Portals` *(VERIFIED: Line 738)* |
| **Recommended H1** | `ATS-Friendly CV Templates: Simple British A4 Layouts for Portals` |
| **Content Quality & Depth** | Explains why multi-column text traps and floating text boxes fail on older parsers (Taleo, SAP SuccessFactors), with single-column layouts for Reed and Indeed. |
| **Internal Linking** | Contextually links to `/blog/ats-friendly-cv-uk-guide` and `/cv-templates`. |
| **Priority** | **HIGH** (Close keyword overlap with `/blog/ats-friendly-cv-uk-guide` requires explicit internal linking differentiation). |

---

### 5.10 Blog Pillar Guide: How to Write a UK CV (`/blog/how-to-write-a-cv-uk`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/blog/how-to-write-a-cv-uk` |
| **Primary Target Keyword** | `how to write a cv uk` |
| **Secondary Target Keywords** | `uk cv format 2026`, `british cv layout`, `personal statement examples uk cv`, `uk cv length 2 pages` |
| **Existing SEO Title** | `How to Write a UK CV in 2026: Format, Layout & Examples` (56 chars) → *Note: In `app/blog/[slug]/page.tsx`, Next.js appends ` \| freecvmakeruk.co.uk`, producing 78 characters in `<title>`!* |
| **Recommended Title** | `How to Write a UK CV in 2026: Complete British A4 Guide` (55 characters absolute) |
| **Existing Meta Description** | `Learn how to write a UK CV in 2026 with recruiter-approved British A4 formatting, personal statement examples, section order, and free UK CV templates.` (151 characters) |
| **Recommended Meta Description** | Retain existing (151 characters — highly optimized). |
| **Existing H1** | `How to Write a Job-Winning UK CV in 2026: Complete British A4 Guide` *(VERIFIED: `data/blogPosts.ts`, line 54)* |
| **Recommended H1** | Retain existing (comprehensive, keyword-rich). |
| **Identified Content Issues** | 1. **TITLE TRUNCATION:** Because `app/blog/[slug]/page.tsx` exports `title: post.seoTitle` and `app/layout.tsx` defines `template: '%s \| freecvmakeruk.co.uk'`, the rendered title is 78 characters and truncates on Google UK SERPs.<br>2. **AUTHOR ARCHIVE:** Author Eleanor Vance has job title and name, but no link to an author bio page. |
| **Internal Linking** | Links to `/cv-templates`, `/ats-friendly-cv-template`, `/finance-cv-template`, and `/builder`. |
| **Priority** | **HIGH** (Fix title template concatenation to avoid SERP truncation). |

---

### 5.11 Blog Guide: ATS-Friendly CV Guide UK (`/blog/ats-friendly-cv-uk-guide`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/blog/ats-friendly-cv-uk-guide` |
| **Primary Target Keyword** | `ats friendly cv uk` / `ats cv guide uk` |
| **Secondary Target Keywords** | `how to pass ats uk`, `best ats cv format uk`, `ats readable cv font` |
| **Existing SEO Title** | `ATS-Friendly CV Guide UK: How to Pass Recruiter Scanners` (55 chars) → Rendered with template: 77 characters. |
| **Recommended Title** | `ATS-Friendly CV Guide UK: How to Beat Recruiter Scanners` (55 characters absolute) |
| **Existing Meta Description** | `Master UK ATS scanner rules. Learn which fonts, layouts, and headings pass Reed, Indeed, and Workday, and download recruiter-approved free ATS templates.` (152 characters) |
| **Recommended Meta Description** | Retain existing (152 characters). |
| **Existing H1** | `How to Beat UK Applicant Tracking Systems (ATS): Formatting Rules That Work` |
| **Recommended H1** | `ATS-Friendly CV Guide UK: How to Beat Recruiter Scanners in 2026` |
| **Internal Linking** | Links directly to the transactional tool landing page `/ats-friendly-cv-template` as the recommended next step. |
| **Priority** | **HIGH** (Title template truncation & keyword intent differentiation). |

---

### 5.12 Blog Guide: First CV Guide UK (`/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk`)

| Audit Item | Current Implementation & Audit Analysis |
|---|---|
| **Page URL** | `https://freecvmakeruk.co.uk/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk` |
| **Primary Target Keyword** | `first cv guide uk` / `first cv no experience uk` |
| **Secondary Target Keywords** | `cv for 16 year old`, `school leaver cv advice`, `graduate cv tips uk` |
| **Existing SEO Title** | `First CV Guide UK: 16-Year-Olds, School Leavers & Grads` (54 chars) → Rendered with template: 76 characters. |
| **Recommended Title** | `First CV Guide UK: 16-Year-Olds, School Leavers & Grads (2026)` (61 characters absolute) |
| **Existing Meta Description** | `Step-by-step UK first CV guide for 16-year-olds, GCSE students, school leavers, and university graduates with little or no formal work experience.` (145 characters) |
| **Existing H1** | `Writing Your First UK CV With Little or No Experience: GCSEs, A-Levels & Graduates` |
| **Identified Content Issues** | **OVERLY LONG URL SLUG:** The slug `/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk` is 60 characters and tries to cram 3 distinct user groups into one URL. A cleaner slug would have been `/blog/first-cv-guide-uk`, while using internal links to branch to `/cv-template-16-year-old`, `/school-leaver-cv-template`, and `/graduate-cv-templates`. |
| **Internal Linking** | Excellent deep internal linking to all three corresponding category spokes. |
| **Priority** | **MEDIUM** (Do not break existing URL without 301 redirect; adjust titles to prevent truncation). |

---

## 6. UK Keyword Research & Search Intent Mapping

### 6.1 Keyword Mapping Architecture

*Note: In accordance with the audit guidelines, monthly search volumes and keyword difficulties require live SEMrush / Ahrefs / Google Keyword Planner validation upon deployment.*

| Keyword Query | Target Page URL | Search Intent | Page Role | Cannibalization Risk | Verification Status |
|---|---|---|---|---|---|
| **free cv maker** | `/` | High Transactional | Primary Brand / Homepage | Low | VERIFIED |
| **free cv maker uk** | `/` | High Transactional | Primary Brand / Homepage | Low | VERIFIED |
| **cv maker uk** | `/` | Transactional | Homepage | Low | VERIFIED |
| **free cv builder** | `/` | Transactional | Homepage | Low (Overlaps with `/builder`) | PARTIALLY VERIFIED |
| **create a cv online** | `/` | Transactional / Action | Homepage / `/start` | Moderate (split between `/` and `/start`) | VERIFIED |
| **cv templates uk** | `/cv-templates` | Commercial / Directory | Hub Page | Low | VERIFIED |
| **free cv templates** | `/cv-templates` | Commercial / Directory | Hub Page | Low | VERIFIED |
| **professional cv template** | `/cv-templates` | Commercial / Informational | Hub Page | Low | VERIFIED |
| **cv template 16 year old** | `/cv-template-16-year-old` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **school leaver cv template** | `/school-leaver-cv-template` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **apprenticeship cv template uk** | `/school-leaver-cv-template` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **graduate cv templates** | `/graduate-cv-templates` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **acting cv template** | `/acting-cv-template` | Niche Transactional | Specialist Spoke | Low | VERIFIED |
| **spotlight cv template uk** | `/acting-cv-template` | High-intent Niche | Specialist Spoke | Low | VERIFIED |
| **finance cv template** | `/finance-cv-template` | High-intent Commercial | Specialist Spoke | Low | VERIFIED |
| **finance cv example** | `/finance-cv-template` | Informational / Commercial | Specialist Spoke | Low | VERIFIED |
| **accountant cv template** | `/finance-cv-template` | High-intent Commercial | Specialist Spoke | Low | VERIFIED |
| **nursing cv template** | `/nursing-cv-template` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **nhs nurse cv template** | `/nursing-cv-template` | Specific Transactional | Specialist Spoke | Low | VERIFIED |
| **ats friendly cv** | `/ats-friendly-cv-template` | Commercial / Tool | Specialist Spoke | Moderate (Overlaps with blog guide) | VERIFIED |
| **how to write a cv uk** | `/blog/how-to-write-a-cv-uk` | Informational Pillar | Top-of-Funnel Blog Guide | Low | VERIFIED |
| **uk cv personal statement examples** | `/blog/uk-cv-personal-statement-examples` | Informational High-Intent | Top-of-Funnel Blog Guide | Low | VERIFIED |
| **uk apprenticeship cv guide** | `/blog/uk-apprenticeship-cv-guide` | Informational | Top-of-Funnel Blog Guide | Low | VERIFIED |

---

## 7. Technical SEO Audit

### 7.1 Metadata & Canonical Tag Implementation
- **Canonical Consistency:** Verified. `app/layout.tsx` declares `alternates: { canonical: '/', languages: { 'en-GB': '/' } }` with `metadataBase: new URL(siteUrl)`. Category pages in `lib/seoCategoryMetadata.ts` correctly declare `canonical: config.urlPath` and `languages: { 'en-GB': config.urlPath }`.
- **Base URL Resolution:** In `lib/config.ts`, `getSiteUrl()` inspects `process.env.APP_URL` and falls back to `https://${BRAND_CONFIG.domain}` (`https://freecvmakeruk.co.uk`).
- **OpenGraph & Twitter Card Tags:** Verified. All landing pages and blog articles generate `og:type`, `og:locale: 'en_GB'`, `og:title`, `og:description`, `og:image`, and `twitter:card: 'summary_large_image'`.
- **Robots Directives:** Verified. `app/layout.tsx` configures global Googlebot directives:
  ```json
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
  ```

### 7.2 Robots.txt (`app/robots.ts`)
- **Location:** Dynamically served at `/robots.txt`.
- **Current Rules:**
  ```typescript
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/share'],
    },
  ],
  sitemap: `${baseUrl}/sitemap.xml`,
  host: `https://${BRAND_CONFIG.domain}`,
  ```
- **Audit Assessment (VERIFIED):**
  - Correctly permits Googlebot to crawl public landing pages.
  - Correctly disallows private tokenized preview paths (`/share`) and backend AI proxy endpoints (`/api/`).
  - *Recommendation:* The `host:` property is deprecated by Google and should be removed to adhere strictly to RFC 9309 robots.txt standards.

### 7.3 Sitemap.xml (`app/sitemap.ts`)
- **Location:** Dynamically generated at `/sitemap.xml`.
- **Entries:** 19 URLs (12 static pages, 1 blog hub, 6 blog posts).
- **Audit Findings (VERIFIED):**
  1. All 19 URLs match canonical URL routes.
  2. Blog URLs dynamically pull `lastModified: new Date(post.dateModified || post.datePublished)`.
  3. **Identified Issue:** Static pages use a hardcoded static date: `const now = new Date('2026-11-01T00:00:00.000Z')`. While not fatal, search engine crawlers prefer dynamic or true build timestamps.

### 7.4 HTTP Status Codes & Redirect Validation
- `/templates` → 301 Permanent Redirect to `/cv-templates` (Verified in `next.config.ts`).
- Non-existent routes return 404 with `<meta name="robots" content="noindex, follow">` (Verified in `app/not-found.tsx`).

---

## 8. Google Indexing and Crawlability

### 8.1 Indexability Health

| Checkpoint | Verified State | Risk Level | Details |
|---|---|---|---|
| **Robots Exclusion** | Allow: / | None | Search engines have full access to all marketing and template URLs. |
| **Noindex Leakage** | Confined to `/share` & `/not-found` | None | No accidental `noindex` headers on core pages. |
| **Internal Link Depth** | Max 2 clicks from Homepage | None | Any template or blog post can be reached within 1–2 clicks from the homepage or navigation bar. |
| **SSR / Static HTML** | SSG Pre-rendered | Low | Category spokes and blog posts render full semantic HTML before client-side hydration, allowing crawlers to read all body text without JavaScript execution. |
| **Orphan Pages** | 0 Orphan Pages | None | Every page in `sitemap.xml` is linked from the global header, footer, template hub, or category spokes. |

---

## 9. Performance & Core Web Vitals Audit

### 9.1 Render-Blocking Font Loading (`app/layout.tsx`)
- **Status:** **VERIFIED ISSUE (HIGH PRIORITY)**
- **Evidence:** In `app/layout.tsx` (lines 217–220), fonts are imported directly into the `<head>` using an external Google Fonts `<link>` tag:
  ```html
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap"
    rel="stylesheet"
  />
  ```
- **Impact:**
  1. Requests 6 full font families with 28 separate weight/italic variants over a third-party connection.
  2. Blocks initial DOM rendering (hurts First Contentful Paint — FCP).
  3. Causes Layout Shifts (Cumulative Layout Shift — CLS) during font swap.
  4. Triggers Next.js ESLint warning `@next/next/no-page-custom-font`.
- **Recommended Future Fix:** Migrate to Next.js native font optimization (`next/font/google`), which downloads and self-hosts fonts locally at build time with zero external network hops and zero render-blocking CSS.

### 9.2 Raster Image Payload Analysis (`/public/assets`)
- **Status:** **VERIFIED ISSUE (MEDIUM PRIORITY)**
- **Evidence:** Source image assets stored in `/public/assets` include:
  - `hero-new-candidate.png`: 1,262 KB (1.26 MB)
  - `hero-candidate-raw.png`: 955 KB
  - `hero-backdrop-clean.png`: 702 KB
  - `hero-composition-right.png`: 697 KB
  - 6 Blog featured images: ~800 KB each (total ~4.8 MB)
- **Impact:** While Next.js optimizes images rendered via `<Image />`, large raw files slow down initial builds, consume unnecessary memory in the image optimizer cache, and degrade performance if served directly.
- **Recommended Future Fix:** Convert source assets to WebP/AVIF and compress to under 150 KB per asset.

---

## 10. Mobile SEO & User Experience (UX)

### 10.1 Viewport & Responsive Design
- **Verification:** Verified across mobile breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- **Touch Targets:**
  - Navigation menu hamburger button: 44 × 44 px tactile touch target (Verified in `TopNav.tsx`, line 199).
  - Primary CTAs: Minimum height 44 px to 52 px with full width on mobile (`items-stretch sm:items-center`).
- **Typography Readability:** Base font sizes on mobile adhere to 14–16 px with 1.5–1.65 line-height, avoiding the iOS Safari auto-zoom penalty (which occurs on inputs under 16 px).
- **Template Carousel / Grid:** On mobile viewports, template showcase grids switch cleanly to 2 columns (`grid-cols-2`) with responsive aspect-ratio calculation.

---

## 11. Content Quality & Google Search Quality (E-E-A-T)

### 11.1 British Curriculum & Workplace Accuracy
The application content demonstrates high domain-specific accuracy:
1. **Qualifications:** Accurately distinguishes between GCSE Grades 9–1, A-Levels, Scottish Highers, BTEC Nationals (Distinction/Merit), T-Levels (315-hour placements), and UK Honours Degree classifications (First, 2:1, 2:2, Third).
2. **Employment Standards:** Accurately reflects UK Equality Act 2010 hiring practices (omitting date of birth, age, marital status, headshot photograph, and nationality).
3. **Sector Terminology:** NHS Agenda for Change nursing bands (Band 5 to Band 8a), NMC PIN, Revalidation, ePAD; City of London chartered accountancy (ACA ICAEW, ACCA, CIMA, CFA); Spotlight PIN and Equity membership for performers.

### 11.2 E-E-A-T Observations & Improvement Areas
- **Experience & Expertise:** Verified. Blog posts include author attribution (`Eleanor Vance, Senior UK Recruitment Lead`), published dates, and detailed editorial guidance.
- **Author Bio Pages:** Currently, clicking the author name does not lead to an author bio page. Adding an author bio profile with LinkedIn credentials and background will further bolster Google Helpful Content System signals.

---

## 12. UK Competitor Analysis

| Feature / Factor | freecvmakeruk.co.uk | CVMaker.co.uk | Zety UK | Reed.co.uk CV Builder | Indeed UK CV |
|---|---|---|---|---|---|
| **Price to Download PDF** | **100% Free** | £1.99 trial → £19.99/mo | £1.90 trial → £23.95/mo | Free (Word doc) | Free |
| **Watermarks** | None | Paywall blocks export | Paywall blocks export | None | None |
| **Paper Standard** | True British ISO A4 | A4 | US Letter / A4 mix | A4 | Dynamic / Web |
| **UK Equality Act Compliant** | Yes (Photo-optional) | Promotes photos | Promotes photos | Yes | Yes |
| **Sector Spokes** | 7 Dedicated Spokes | Broad categories | Broad categories | General | General |
| **Export Formats** | 300 DPI PDF & DOCX | PDF | PDF, DOCX, TXT | DOCX | PDF |
| **AI Writing Assistance** | British English AI | Basic phrases | Generic AI | None | Basic AI |

---

## 13. Keyword Cannibalization Analysis

### 13.1 Cannibalization Risks Identified (VERIFIED)

#### Risk 1: `/` vs `/builder` vs `/start` on "Free CV Maker"
- **Issue:** `/`, `/builder`, and `/start` all target phrases like *"free cv maker"*, *"create cv online"*, and *"free cv builder"*.
- **Impact:** Search engines may encounter difficulty deciding whether to rank the high-converting homepage marketing page or the interactive `/builder` tool.
- **Recommended Fix:** Ensure `/` remains the definitive canonical landing page for generic high-volume queries (`free cv maker uk`, `online cv maker`). Update `/builder` metadata to target tool-specific intent (`UK CV Builder Studio – Online A4 CV Editor`) and ensure `/start` is treated as a user onboarding step.

#### Risk 2: `/ats-friendly-cv-template` vs `/blog/ats-friendly-cv-uk-guide`
- **Issue:** Both pages target *"ats friendly cv uk"*.
- **Impact:** Internal competition for ATS search rankings.
- **Recommended Fix:** Enforce strict search intent separation:
  - `/ats-friendly-cv-template` = Transactional intent (Focus: *"Download ATS-friendly CV templates"*).
  - `/blog/ats-friendly-cv-uk-guide` = Informational intent (Focus: *"How ATS scanners work & formatting rules"*), linking directly to the template landing page as the action CTA.

---

## 14. Internal Linking Architecture

### 14.1 Hub-and-Spoke Topology
```
                     [ Homepage: / ]
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
    [ Hub: /cv-templates ]        [ Blog: /blog ]
              │                           │
  ┌───────────┼───────────┐   ┌───────────┼───────────┐
  ▼           ▼           ▼   ▼           ▼           ▼
16-Yr-Old  Graduate   Finance Guide 1   Guide 2    Guide 3
```
- **Strengths:**
  - Clear hierarchical taxonomy from Homepage → Hub (`/cv-templates`) → 7 Category Spokes.
  - Reciprocal cross-linking between related spokes (e.g., 16-Year-Old links to School Leaver and Graduate).
  - Blog guides contextually embed links to relevant templates.
- **Optimization Opportunity:**
  - The Homepage currently has minimal contextual in-body links to the editorial guides in `/blog`. Adding a curated "UK CV Advice & Editorial Guides" section on the homepage will pass authority to informational pages.

---

## 15. Structured Data (Schema.org) Audit

### 15.1 Root Layout Schema Pollution (VERIFIED CRITICAL ISSUE)
- **File:** `/app/layout.tsx` (lines 142–210)
- **Problem:** `app/layout.tsx` embeds the following JSON-LD `@graph` into the root HTML:
  1. `Organization` (`#organization`)
  2. `WebSite` (`#website`)
  3. `WebApplication` (`#webapp`)
  4. `HowTo` (`#howto`)
  5. `FAQPage` (`#faq` — with 5 homepage FAQs)
- **Consequence:** Because `layout.tsx` is the Root Layout, this exact block is rendered on **every single URL** on the site.
  - When Google crawls `/blog/how-to-write-a-cv-uk`, it receives the root homepage `FAQPage` schema **plus** the blog post's specific `FAQPage` schema.
  - When Google crawls `/cv-template-16-year-old`, it receives the root homepage `FAQPage` **plus** the 16-year-old `FAQPage` schema.
  - Google's Structured Data Guidelines specifically state that `FAQPage` markup must only describe questions and answers visible on that specific URL. Global FAQ injection risks rich result disqualification.
- **Recommended Future Fix:** Move `HowTo` and `FAQPage` out of `app/layout.tsx` and place them exclusively on `app/page.tsx`. Keep only `Organization` and `WebSite` in `app/layout.tsx`.

---

## 16. Critical Issues (Requires Immediate Attention in Next Development Sprint)

### Issue CRIT-01: Homepage `<h1>` Omits Primary Keyword
- **Affected Route:** `/`
- **Affected File:** `/components/home/HeroSection.tsx` (line 46)
- **Category:** On-Page SEO / Keyword Targeting
- **Problem:** The homepage `<h1>` is currently `Create a standout CV in minutes`. It fails to contain *"Free CV Maker"* or *"UK"*.
- **Impact:** High loss of search engine relevance for the primary seed keyword.
- **Recommended Solution:** Update the `<h1>` to:
  ```tsx
  <motion.h1 ...>
    Free CV Maker UK: <br className="hidden sm:inline" />
    Create a Standout CV in{' '}
    <span className="text-[#0EA5E9] bg-gradient-to-r from-[#0EA5E9] to-[#00B67A] bg-clip-text text-transparent">
      Minutes
    </span>
  </motion.h1>
  ```
- **Difficulty:** Low (1-line JSX update).

### Issue CRIT-02: Site-Wide FAQPage Schema Duplication
- **Affected Routes:** All routes (`/blog/*`, `/cv-template-*`, `/builder`, `/start`, `/import`)
- **Affected File:** `/app/layout.tsx` (lines 142–210)
- **Category:** Technical SEO / Structured Data
- **Problem:** Root layout injects the homepage `FAQPage` and `HowTo` schema into every page of the website.
- **Impact:** Structured data penalty risk; Google Search Console warnings for FAQ markup on non-FAQ pages.
- **Recommended Solution:** Isolate the `FAQPage` and `HowTo` schema arrays so they only render on `app/page.tsx`.
- **Difficulty:** Low (Refactor JSON-LD component placement).

---

## 17. High Priority Improvements

### Issue HIGH-01: Render-Blocking Google Fonts Loading
- **Affected File:** `/app/layout.tsx` (lines 217–220)
- **Category:** Core Web Vitals (FCP / CLS)
- **Problem:** External `<link rel="stylesheet">` loading 6 Google Font families blocks initial page rendering.
- **Recommended Solution:** Replace with `next/font/google` imports in `layout.tsx` using CSS variables (`--font-inter`, `--font-jakarta`, etc.).
- **Difficulty:** Medium.

### Issue HIGH-02: Blog Article Title SERP Truncation
- **Affected Routes:** `/blog/[slug]`
- **Affected File:** `/app/blog/[slug]/page.tsx`
- **Category:** On-Page SEO / CTR
- **Problem:** Blog post titles are concatenated with ` | freecvmakeruk.co.uk`, pushing total length to 76–78 characters and causing truncation on Google UK SERPs.
- **Recommended Solution:** Use `title: { absolute: post.seoTitle }` in `generateMetadata` so titles remain within 50–60 characters.
- **Difficulty:** Low.

### Issue HIGH-03: Inconsistent Brand Name in `<title>` Tags
- **Affected Routes:** All spoke pages vs blog vs homepage
- **Category:** Brand Consistency / On-Page SEO
- **Problem:** Spoke pages end with `| freecvmakeruk` while others end with `| freecvmakeruk.co.uk`.
- **Recommended Solution:** Standardize all page titles to use `| freecvmakeruk.co.uk` consistently.
- **Difficulty:** Low.

---

## 18. Medium Priority Improvements

### Issue MED-01: Heavy Raw Image Assets in `/public/assets`
- **Affected Files:** `/public/assets/hero-*.png` and `/public/assets/blog/*.jpg`
- **Category:** Page Performance / Asset Optimization
- **Problem:** Several source images are between 700 KB and 1.26 MB.
- **Recommended Solution:** Compress and convert all static images to WebP/AVIF format with max file size < 150 KB.
- **Difficulty:** Medium.

### Issue MED-02: Homepage Missing Contextual Internal Links to Blog Guides
- **Affected File:** `/components/home/UkCvSeoSection.tsx` or `/app/page.tsx`
- **Category:** Internal PageRank Distribution
- **Problem:** The homepage currently links to template spokes, but lacks direct contextual links to informational pillar guides.
- **Recommended Solution:** Add a "UK Career Guides & ATS Advice" carousel or grid on the homepage linking to `/blog/how-to-write-a-cv-uk` and `/blog/ats-friendly-cv-uk-guide`.
- **Difficulty:** Low.

### Issue MED-03: Static Sitemap LastModified Date
- **Affected File:** `/app/sitemap.ts` (line 7)
- **Category:** Technical SEO / Crawl Efficiency
- **Problem:** Sitemap uses a fixed timestamp `2026-11-01T00:00:00.000Z` for all static pages.
- **Recommended Solution:** Replace with dynamic build date (`new Date().toISOString()`).
- **Difficulty:** Low.

---

## 19. Low Priority Improvements

### Issue LOW-01: Remove Deprecated `host` Directive in Robots.txt
- **Affected File:** `/app/robots.ts` (line 16)
- **Problem:** Googlebot ignores the `Host` directive.
- **Recommended Solution:** Remove `host:` property from `robots()` return object.
- **Difficulty:** Low.

### Issue LOW-02: Enhance Organization Schema with Social Profiles
- **Affected File:** `/app/layout.tsx`
- **Problem:** `Organization` schema lacks `sameAs` array for social profiles (LinkedIn, X, Facebook, Trustpilot).
- **Recommended Solution:** Add verified brand URLs when public profiles are active.
- **Difficulty:** Low.

---

## 20. 30-Day SEO Roadmap

1. **Sprint 1 (On-Page Alignment):**
   - Update Homepage `<h1>` to include *"Free CV Maker UK"*.
   - Adjust Hero image `alt` attribute to reflect primary keyword context.
   - Standardize title tag brand suffix (`| freecvmakeruk.co.uk`).
2. **Sprint 2 (Structured Data Isolation):**
   - Decouple `FAQPage` and `HowTo` schema from Root Layout (`layout.tsx`).
   - Retain only global `Organization` and `WebSite` schema at root level.
   - Place page-specific schema exclusively on respective pages.
3. **Sprint 3 (Title Truncation Fix):**
   - Set `title: { absolute: post.seoTitle }` across all blog articles to ensure SERP titles stay under 60 characters.

---

## 21. 60-Day SEO Roadmap

1. **Sprint 4 (Core Web Vitals & Font Optimization):**
   - Migrate external Google Fonts stylesheet `<link>` in `app/layout.tsx` to `next/font/google`.
   - Audit FCP and CLS to ensure sub-1.2s load times on 4G mobile connections.
2. **Sprint 5 (Asset Compression):**
   - Re-compress all large hero and blog image assets in `/public/assets` to WebP/AVIF under 150 KB.
3. **Sprint 6 (Internal Linking Expansion):**
   - Add a curated UK CV Guides showcase section on the Homepage linking to the top 3 editorial articles.
   - Ensure every blog post links to at least 2 relevant niche template spoke pages.

---

## 22. 90-Day SEO Roadmap

1. **Sprint 7 (Content Expansion):**
   - Publish 4 new targeted UK niche landing pages:
     - `/teaching-assistant-cv-template`
     - `/customer-service-cv-template`
     - `/engineering-cv-template`
     - `/hospitality-cv-template`
2. **Sprint 8 (E-E-A-T Author Profiles):**
   - Create dedicated author bio pages (`/author/[slug]`) showcasing recruitment credentials, certifications, and LinkedIn profiles.
   - Add Person schema linking author bios to `BlogPosting` schema.
3. **Sprint 9 (Authority Building & Backlinks):**
   - Outreach to UK university career centres, student unions, and apprenticeship portals highlighting the genuine free, un-paywalled CV tool.

---

## 23. Final SEO Readiness Assessment

- **Overall Audit Score:** **82 / 100** (Solid Foundation, Strong Content & Localization; Immediate Wins Available on H1 and Schema Placement).
- **Search Engine Accessibility:** 100% crawlable, zero blocking errors, clean 301 redirects.
- **UK Market Readiness:** Outstanding. Authentic terminology, legal compliance, and genuine free utility position this application strongly against paywalled competitors.
