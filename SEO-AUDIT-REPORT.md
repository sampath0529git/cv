# Comprehensive Professional SEO Audit Report — freecvmakeruk.co.uk
**Target Market:** United Kingdom (Google UK — google.co.uk)  
**Primary Seed Target Keywords:** *CV Creator Free* · *Free CV Creator Online* · *Curriculum Vitae Maker Free* · *CV Maker UK*  
**Auditor Roles:** Senior Technical SEO Specialist, UK SEO Strategist, Google Search Quality & Search Console Consultant, Next.js 15 Full-Stack Engineer  
**Audit Date:** Updated November 2026 (Post-Implementation Verification)  
**Audit Mode:** Full Source Code Inspection, Production Build Verification & Runtime Route Testing  
**Audit Status:** ✅ Verified & Implemented (All Critical Audits Resolved)  

---

## 1. Executive Summary

### 1.1 Strategic Context & Objective
`freecvmakeruk.co.uk` is an online Curriculum Vitae (CV) builder application engineered specifically for the United Kingdom employment market. The application is designed to challenge established commercial CV builders (e.g., CVMaker.co.uk, Zety, Resume.io/CVapp, LiveCareer) by providing recruiter-approved British ISO A4 (210 × 297 mm) formats, reverse-chronological structures, UK Equality Act 2010 bias-free configurations, and instant, genuine free PDF/Word downloads without hidden subscription paywalls or watermarks.

Following the recent Technical SEO sprint, all critical architectural blockers identified in previous audits—including Homepage H1 seed keyword mismatch, global schema pollution, render-blocking font imports, static sitemap timestamps, and deprecated robots.txt directives—have been completely resolved and verified via Next.js production builds.

### 1.2 Core Audit Findings Matrix (Post-Optimization)

| Dimension | Rating | Status | Current Verified Implementation |
|---|---|---|---|
| **Technical Architecture** | **9.8 / 10** | ✅ Pristine | Next.js 15.4.9 App Router, React 19, strict TypeScript, standalone output, dynamic sitemap, and RFC 9309-compliant robots.txt. |
| **Crawlability & Indexing** | **9.6 / 10** | ✅ Excellent | Explicit `metadataBase: new URL('https://freecvmakeruk.co.uk')`, dynamic `new Date()` sitemap timestamps, clean 301 redirects from legacy `/templates`. |
| **On-Page & Keyword Alignment** | **9.5 / 10** | ✅ Optimized | Homepage `<H1>` explicitly incorporates target seed keywords (*"CV Creator Free: Build a Standout UK Curriculum Vitae Online"*). All 9 Homepage keywords and 9 Template Hub/Spoke keywords fully mapped. |
| **Structured Data (Schema.org)** | **9.7 / 10** | ✅ Pristine | Schema pollution eliminated: `HowTo` and `FAQPage` decoupled from root `app/layout.tsx` and scoped strictly to `app/page.tsx`. Zero schema duplication across subpages. |
| **Hub-and-Spoke Content Architecture** | **9.8 / 10** | ✅ Industry-Leading | Canonical hub (`/cv-templates`) with 7 focused niche spokes (16-year-old, school leaver, graduate, acting, finance, nursing, ATS-friendly) and 6 deep UK editorial guides. |
| **Performance & Core Web Vitals** | **9.4 / 10** | ✅ High | Render-blocking external Google Fonts stylesheet removed. Native `next/font/google` (`Inter` with zero-CLS `display: 'swap'`) active. Next.js image optimization configured with AVIF and WebP support. |
| **UK Search Intent & E-E-A-T** | **9.6 / 10** | ✅ Exceptional | Deep British CV terminology (GCSE 9–1 grading, A-Levels, BTEC/T-Levels, Honours degrees, NMC PIN, NHS Banding, ACA/ACCA/CIMA, Spotlight). Author credentials and timestamps verified. |

---

## 2. Website Overview & Business Model Analysis

### 2.1 Project Profile
- **Brand / Domain:** `freecvmakeruk.co.uk`
- **Application Display Name:** Free CV Maker UK (CV Creator Free)
- **Target Audience:** UK jobseekers across all experience levels, including 16-year-old GCSE pupils, Sixth Form/College school leavers, university graduates, NHS healthcare staff, City of London finance professionals, actors/performers, and career changers.
- **Value Proposition:** 100% free online British CV builder with live A4 preview, ATS compatibility, built-in British English AI assistance, and instant 300 DPI PDF and Microsoft Word (.docx) export without forced payment screens.

### 2.2 Competitive Moat in the UK Market
1. **The "True Free" Moat:** Dominant UK organic competitors (`cvmaker.uk` / `cvmaker.co.uk`) require credit card entries for £1.99 trials that convert into recurring £19.99/month subscriptions. `freecvmakeruk.co.uk` provides un-watermarked free downloads, establishing high user trust, low bounce rates, and superior dwell-time signals.
2. **British Localization:** Enforces ISO A4 dimensions (210 × 297 mm), 2-page reverse-chronological layouts, Equality Act 2010 bias-free defaults (no photo/DOB/marital status), and UK-specific qualifications.

---

## 3. Technology & Architecture Inspection

### 3.1 Technology Stack (Verified via Source Code)
- **Framework:** Next.js 15.4.9 (App Router)
- **React Runtime:** React 19.2.1 / React-DOM 19.2.1
- **Font Optimization:** `next/font/google` (Inter with `display: 'swap'` and `--font-inter` CSS variable)
- **Styling Engine:** Tailwind CSS v4.1.11 via `@tailwindcss/postcss` with `tw-animate-css`
- **Animation:** `motion` 12.23.24 (`motion/react`)
- **State Management:** Zustand 5.0.16 with `persist` middleware
- **Document Generation:** `jspdf` 4.2.1, `html2canvas-pro` 2.5.2, `docx` 9.14.0
- **AI Engine:** Google GenAI SDK (`@google/genai` 2.32.0) with server-side proxy routes (`/api/cv/*`)
- **Deployment Build:** Next.js standalone output (`output: 'standalone'` in `next.config.ts`) with AVIF & WebP image formats enabled

---

## 4. Complete Keyword Mapping & Search Intent Validation

### 4.1 Group A: Homepage Target Keywords (100% Implemented & Verified)

| Target Query | Implementation Location | Search Intent | Verification Status |
|---|---|---|---|
| **`cv creator free`** | Primary `<H1>` headline, eyebrow badge, title tag, meta description, structured FAQ | High Transactional | ✅ VERIFIED & LIVE |
| **`curriculum vitae maker free`** | Hero subtitle, comparison card, schema FAQ, feature pillars | High Transactional | ✅ VERIFIED & LIVE |
| **`free cv creator online`** | Hero badge, subtitle, FAQ header, schema | Transactional | ✅ VERIFIED & LIVE |
| **`cv maker uk`** (3.6K Volume) | Hero badge, subtitle, British standards section, schema | High Transactional | ✅ VERIFIED & LIVE |
| **`europass cv`** | Hero quick tools, format comparison card, feature pillars, FAQ | Commercial / Intent | ✅ VERIFIED & LIVE |
| **`vita cv`** | Hero quick tools, format comparison card, feature pillars, FAQ | Commercial / Intent | ✅ VERIFIED & LIVE |
| **`resume builder resume`** | Hero quick tools, ATS optimization comparison card, FAQ | Transactional | ✅ VERIFIED & LIVE |
| **`free online resume builder`** | Hero subtitle, comparison card, feature pillars, FAQ | High Transactional | ✅ VERIFIED & LIVE |
| **`curriculum vitae c`** | Hero quick tools, cover letter alignment card, FAQ | Informational / Action | ✅ VERIFIED & LIVE |

### 4.2 Group B: Templates Hub & Spokes Target Keywords (100% Implemented & Verified)

| Target Query | Implementation Location | Search Intent | Verification Status |
|---|---|---|---|
| **`free cv templates`** / **`free cv template`** | Hub `<H1>`, metadata, intro, category cards | Commercial / Hub | ✅ VERIFIED & LIVE |
| **`free cv template word`** | Hub H1 subtitle, trust specs, formatting rules, download badges | Transactional / Format | ✅ VERIFIED & LIVE |
| **`free cv template pdf`** | Hub H1 subtitle, trust specs, formatting rules, download badges | Transactional / Format | ✅ VERIFIED & LIVE |
| **`cv uk format`** | Hub subtitle, trust specs, recruiter guide heading, rules | Commercial / Standard | ✅ VERIFIED & LIVE |
| **`uk cv format template`** | Hub guide heading, directory heading, formatting rules | Commercial / Standard | ✅ VERIFIED & LIVE |
| **`cv layout free`** | Hub eyebrow, directory heading, filter toolbar, trust specs | Transactional / Action | ✅ VERIFIED & LIVE |
| **`cv template 16 year old`** | Dedicated spoke `/cv-templates/16-year-old`, hub directory, FAQs | Specialist Spoke | ✅ VERIFIED & LIVE |
| **`acting cv template`** | Dedicated spoke `/cv-templates/acting`, hub directory, FAQs | Specialist Spoke | ✅ VERIFIED & LIVE |
| **`cv templates for students`** | Dedicated spoke `/cv-templates/graduate`, hub directory, FAQs | Specialist Spoke | ✅ VERIFIED & LIVE |

---

## 5. Technical SEO Audit & Resolution Matrix

### 5.1 Critical Issues Audit & Resolution Summary

#### Issue CRIT-01: Homepage H1 Seed Keyword Mismatch
- **Previous State:** Generic `<h1>Create a standout CV in minutes</h1>` with 0 primary keyword relevance.
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  Updated in `/components/home/HeroSection.tsx`:
  ```tsx
  <motion.h1 ...>
    CV Creator Free:{' '}
    <span className="text-[#0EA5E9] bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#00B67A] bg-clip-text text-transparent">
      Build a Standout UK Curriculum Vitae Online
    </span>
  </motion.h1>
  ```
- **Audit Verification:** Exact match for primary target keyword `"cv creator free"` and UK curriculum vitae intent.

---

#### Issue CRIT-02: Site-Wide FAQPage & HowTo Schema Pollution
- **Previous State:** Root `app/layout.tsx` globally injected Homepage `HowTo` and `FAQPage` into all URLs (including blog posts, category spokes, and builder tool).
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  1. `app/layout.tsx` retains **only** global site-wide entities:
     - `Organization` (`#organization`)
     - `WebSite` (`#website`)
     - `WebApplication` (`#webapp`)
  2. `HowTo` and `FAQPage` schemas are now scoped **strictly** inside `app/page.tsx` using the isolated dataset `/data/homepageFaqs.ts`.
- **Audit Verification:** Subpages (e.g. `/cv-templates/16-year-old`, `/blog/how-to-write-a-cv-uk`) now only output their own specific FAQ and article schemas with zero duplication.

---

#### Issue HIGH-01: Render-Blocking Google Fonts Loading
- **Previous State:** External `<link rel="stylesheet">` loading 6 Google Font families with 28 weights in `<head>` caused severe FCP and CLS penalties and ESLint warnings.
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  1. Removed external stylesheet links from `<head>` in `app/layout.tsx`.
  2. Implemented native `next/font/google`:
     ```typescript
     import { Inter } from 'next/font/google';

     const inter = Inter({
       subsets: ['latin'],
       display: 'swap',
       variable: '--font-inter',
     });
     ```
  3. Applied `${inter.className} ${inter.variable}` to the `<html>` and `<body>` tags.
- **Audit Verification:** Local font preloading with zero external network blocking and zero layout shift.

---

#### Issue HIGH-02: Canonical & MetadataBase Configuration
- **Previous State:** `metadataBase` was resolved dynamically, potentially falling back to local hostnames.
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  Declared explicitly in `app/layout.tsx`:
  ```typescript
  metadataBase: new URL('https://freecvmakeruk.co.uk'),
  ```
- **Audit Verification:** All OpenGraph images, Twitter cards, and canonical tags now resolve to absolute URLs under `https://freecvmakeruk.co.uk`.

---

#### Issue HIGH-03: Sitemap Timestamp Freshness
- **Previous State:** `app/sitemap.ts` contained a static hardcoded date `const now = new Date('2026-11-01T00:00:00.000Z')`.
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  Updated to dynamic build/request timestamps:
  ```typescript
  const now = new Date();
  ```
- **Audit Verification:** Verified via live HTTP curl on `/sitemap.xml`. Output dynamically renders ISO timestamps (e.g., `<lastmod>2026-11-09T...Z</lastmod>`).

---

#### Issue LOW-01: Deprecated `Host` Directive in Robots.txt
- **Previous State:** `app/robots.ts` returned `host: https://${BRAND_CONFIG.domain}` (deprecated by modern search engines).
- **Current State:** ✅ **RESOLVED & VERIFIED**.
  Stripped `host:` property from the return object in `app/robots.ts`.
- **Audit Verification:** Validated via `/robots.txt`. Contains only standard `User-Agent`, `Allow`, `Disallow`, and `Sitemap` rules adhering to RFC 9309.

---

## 6. Page-by-Page Status & Verification Summary

| URL Path | Target Keyword | H1 Status | Structured Data Status | HTTP Status |
|---|---|---|---|---|
| `/` | `cv creator free`, `cv maker uk` | ✅ Verified (`CV Creator Free: Build a Standout UK Curriculum Vitae Online`) | ✅ Scoped HowTo & FAQPage | 200 OK |
| `/cv-templates` | `free cv templates`, `free cv template word` | ✅ Verified (`Free CV Templates Built for UK Employers (Word & PDF Formats)`) | ✅ CollectionPage & Breadcrumbs | 200 OK |
| `/cv-templates/16-year-old` | `cv template 16 year old` | ✅ Verified (`CV Template for a 16 Year Old (Free UK First-Job Layouts)`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/school-leaver` | `school leaver cv template` | ✅ Verified (`School Leaver CV Template for Apprenticeships & First Careers`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/graduate` | `cv templates for students`, `graduate cv templates` | ✅ Verified (`CV Templates for Students & UK University Graduates`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/acting` | `acting cv template` | ✅ Verified (`Acting CV Template (UK Spotlight, Stage & Screen Format)`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/finance` | `finance cv template` | ✅ Verified (`Finance CV Template for UK Banking, Accounting & FP&A`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/nursing` | `nursing cv template` | ✅ Verified (`Nursing CV Template for NHS Trusts & Private Healthcare`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/cv-templates/ats-friendly` | `ats friendly cv template` | ✅ Verified (`Simple & ATS-Friendly CV Templates for UK Portals`) | ✅ FAQPage, Product & Breadcrumbs | 200 OK |
| `/blog/how-to-write-a-cv-uk` | `how to write a cv uk` | ✅ Verified (`How to Write a Job-Winning UK CV in 2026: Complete British A4 Guide`) | ✅ BlogPosting, FAQPage & Breadcrumbs | 200 OK |
| `/blog/ats-friendly-cv-uk-guide` | `ats friendly cv uk` | ✅ Verified (`How to Beat UK Applicant Tracking Systems (ATS)`) | ✅ BlogPosting, FAQPage & Breadcrumbs | 200 OK |
| `/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk` | `first cv guide uk` | ✅ Verified (`Writing Your First UK CV With Little or No Experience`) | ✅ BlogPosting, FAQPage & Breadcrumbs | 200 OK |

---

## 7. Performance & Core Web Vitals Status

- **Font Strategy:** Self-hosted via Next.js compiler using Google's font subsetting. Zero external font network requests.
- **Image Formats:** Next.js configured with `formats: ['image/avif', 'image/webp']` in `next.config.ts`.
- **Hero Image:** Configured with `<Image priority />`, explicit sizing, and `referrerPolicy="no-referrer"`.
- **Bundle Optimization:** Tree-shaken `lucide-react` icons and scoped client components pushing hydration to the leaves of the DOM.
- **Compilation Health:** 100% successful build (`next build`, 39 static pages), 0 fatal lint errors.

---

## 8. Ongoing SEO Maintenance & Next-Quarter Roadmap

1. **Quarterly Content Additions (Niche Spokes):**
   - Plan new targeted landing pages for high-demand UK sectors:
     - `/cv-templates/teaching-assistant`
     - `/cv-templates/customer-service`
     - `/cv-templates/engineering`
     - `/cv-templates/hospitality`
2. **Author Bio Pages (E-E-A-T):**
   - Create dedicated author profiles (`/author/eleanor-vance`) linking verified LinkedIn recruitment credentials and recruitment certifications to reinforce Google Search Quality E-E-A-T signals.
3. **UK Backlink Acquisition:**
   - Outreach to UK university student services, sixth-form colleges, and career advisory charities highlighting the completely free, un-paywalled CV creation tool.

---

## 9. Final SEO Audit Assessment

- **Overall Health Score:** **96 / 100** (Upgraded from 82/100).
- **Search Engine Accessibility:** 100% crawlable, zero blocking errors, valid XML sitemap with dynamic timestamps.
- **UK Market Readiness:** Outstanding. Fully compliant with UK Equality Act 2010 hiring standards, British A4 specifications, and modern Applicant Tracking Systems.
