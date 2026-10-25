# Makemeyour Home Page UI Redesign & Mobile Optimization

High-fidelity recreation of the provided reference design for the Makemeyour home page, engineered with responsive mobile-first Tailwind CSS, interactive template filtering, working modal video/feature tour, testimonial carousel, and seamless navigation into the CV builder.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions were confirmed during the planning clarification phase:

- **Confirmed Decision 1 (Brand Identity & Wordmark)**: Adopted **Makemeyour** branding with the vibrant green rounded square logo icon (`#00B67A` / emerald green) and modern typography matching the reference image.
- **Confirmed Decision 2 (Template Gallery Interaction)**: The "Professional Templates" section features interactive category tabs (`All Templates`, `Academic`, `Corporate`, `Creative`, `Tech`, `Medical`) that dynamically filter CV template preview cards in real-time, accompanied by the "Why choose our templates?" checklist panel.
- **Confirmed Decision 3 (Watch How It Works)**: Clicking "Watch How It Works" opens a polished interactive modal tour showcasing the 3-minute builder workflow, interactive step walkthrough, and sample preview.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces the generic home page layout with an exact, visually engaging landing experience matching the reference screenshot. The page features a high-impact hero with social proof, top company hiring strip, interactive feature spotlight, 4-step creation roadmap, trust cards, a categorized CV template browser, a 6-reason value grid, a customer testimonial slider, and a high-converting dark navy bottom banner.
- **Target Audience / Persona**: Jobseekers, career switchers, recent graduates, and executives seeking a modern, ATS-compliant CV with zero design friction.
- **Key Value**: Delivers immediate credibility through recognizable company logos and 4.8/5 rating proof, demonstrates builder simplicity in 4 visual steps, and provides frictionless one-click entry into the CV creation workflow.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero Conversion Flow**:
   - User arrives on the hero section; sees the badge `✦ AI POWERED CV BUILDER`, the headline `Create a standout CV in minutes` with cyan-gradient highlight, and 1M+ candidate social proof.
   - Primary CTA `Create My CV →` navigates immediately to `/start` (or opens the Start CV modal).
   - Secondary CTA `Watch How It Works` triggers an interactive modal dialog explaining the 4-step builder workflow with visual previews.
2. **Interactive Template Discovery Flow**:
   - User scrolls to the dark navy "Professional Academic & Corporate CV Templates" section.
   - Clicking category pills (`All`, `Academic`, `Corporate`, `Creative`, `Tech`, `Medical`) instantly filters the 4 active template preview cards with smooth transitions.
   - Clicking `Browse All Templates →` or any template card selects the template and directs the user to `/builder` or `/templates`.
3. **Interactive Testimonial Flow**:
   - User reviews the "Real Stories" section with 5-star rating and quote from Sarah Johnson.
   - Clicking prev/next chevrons slides through genuine UK candidate success stories with active pagination dots.
4. **Mobile Experience**:
   - Navigation collapses into a clean mobile sheet menu with quick access to `Features`, `Templates`, `Pricing`, `Blog`, and `Get Started Free`.
   - Hero split collapses gracefully: headline and CTAs stack vertically above the candidate visual.
   - 4-step cards and 6-reason items format cleanly into single/double column grids with touch-friendly targets ($\ge 44\text{px}$).

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Neutral Canvas: `#FFFFFF` (light sections) and deep obsidian navy `#0B112C` / `#0F1738` (dark templates & footer banners).
  - Primary Brand Action: `#2563EB` / `#3B82F6` (vibrant royal blue) and `#00B67A` (emerald green brand icon).
  - Accent Highlight: Cyan-teal `#06B6D4` / `#0EA5E9` gradient for the word *"minutes"* and key indicators.
  - Border & Dividers: Hairline `#E2E8F0` / `#EEF2F6`.
- **Typography**:
  - Headings: `Plus Jakarta Sans`, font-bold, `tracking-tight`, with `text-wrap: balance` to eliminate orphan words.
  - Body: `Inter` / `Plus Jakarta Sans`, 15–16px, 1.6 line-height for effortless legibility.
- **Anti-Slop Discipline**:
  - Clean unboxed metadata with bullet separators (`·`).
  - Strict 3-zone Top Bar Contract (Wordmark — 5 nav links — 1 primary CTA).
  - Zero decorative pulsing dots or hallucinated AI scoreboards.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Responsive Visual Mockups without External Broken Image Dependencies**:
  - *Chosen Approach*: Implement the hero candidate composition, builder UI preview card, and fanned CV graphics using clean SVG/CSS illustrations and high-fidelity local assets already registered in `/public/assets/`, with resilient CSS fallbacks.
  - *Why*: Ensures zero broken images or network latency in sandboxed environments while retaining pixel-accurate alignment with the reference screenshot.
- **Decision 2: Interactive Feature Tour Modal**:
  - *Chosen Approach*: Build a lightweight modal component with tabbed interactive steps (Choose Template → Fill Info → AI Polish → Export PDF) and video/demo frame.
  - *Why*: Provides immediate interactive utility when the user clicks "Watch How It Works" without requiring external third-party video embeds.
- **Decision 3: Synchronized Template Filtering with Existing Registry**:
  - *Chosen Approach*: Link the category selector directly with the existing `CV_TEMPLATES` registry in `@/templates/registry`, rendering live scaled A4 thumbnails and supporting one-click template selection.

---

## 4. Technical Architecture & Data Strategy

### Component Architecture & Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              app/page.tsx                              │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ TopNav: Brand "Makemeyour" | Home, Features, Templates, Pricing... │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ HeroSection: "Create a standout CV in minutes" + Candidate Visual  │ │
│ │   ├─ VideoTourModal (opened via "Watch How It Works")              │ │
│ │   └─ StartCvModal / Link to /start                                 │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ HiredByBar: Google, Microsoft, Amazon, LinkedIn, Deloitte, Tesla...│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ FeatureTabsSection: "Everything you need to land interviews"        │ │
│ │   └─ Live Builder UI Preview Mockup (Emma Wilson document)         │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ StepsSection: "Create your CV in 4 steps" (Numbered cards + arrows) │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ TrustMetricCards: "Why 1+ million users trust Makemeyour" (4 cards)│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ TemplatesSection (Dark Navy): Filterable Category Pills + 4 Cards  │ │
│ │   └─ "Why choose our templates?" checklist + "Browse All" button   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ ReasonsSection: "6 Reasons to Create Your CV with Makemeyour"       │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ ReviewsSection: "Join thousands who landed their dream jobs"       │ │
│ │   └─ Testimonial Slider (Sarah Johnson, quotes, prev/next buttons) │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ BottomHeroBanner (Curved Dark Navy): "Create and edit in clicks"   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Footer: Wordmark, Copyright, Nav links, Social Icons, Back-to-Top  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component State & Interactive Mapping
- `activeCategory` state (`All Templates` | `Academic` | `Corporate` | `Creative` | `Tech` | `Medical`): Controls the visible template cards in the dark navy section.
- `isVideoTourOpen` state (`boolean`): Controls visibility of the interactive workflow modal when "Watch How It Works" is clicked.
- `activeTestimonialIndex` state (`number`): Controls the current story displayed with prev/next buttons and active pagination dots.
- `isMobileMenuOpen` state (`boolean`): Toggles the responsive mobile slide-out drawer on small viewports.
