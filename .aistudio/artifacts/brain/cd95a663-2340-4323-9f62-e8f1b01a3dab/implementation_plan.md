# High-Quality PDF Download & Export Architecture

Fix the CV PDF download mechanism to ensure reliable, instant downloads on all devices (desktop and mobile) with high-resolution output (300 DPI lossless raster & crisp vector print options).

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed based on your requirements:
> - **Download Quality**: Direct instant download of high-resolution PDF with lossless typography rendering, backed by vector browser-print fallback.
> - **Action Placement**: Prominent, high-visibility download buttons in both the **Finalize Step** and the **CV Preview Toolbar**, complete with live generation progress feedback.

---

## 1. Overview & Root Cause Analysis

### Identified Root Causes of PDF Download Failure:
1. **Viewport & Responsive Visibility Blocker**: In `app/builder/page.tsx`, the CV preview containing `#cv-print-area` is hidden on mobile screens (`hidden lg:flex`). When users trigger download on mobile or without opening the modal preview, `querySelectorAll('.cv-page')` either finds zero pages or attempts to rasterize elements with `display: none`, causing rendering failure or blank output.
2. **Offscreen Staging Clipping**: Rendering cloned nodes at `left: -10000px` causes `html2canvas` in modern browsers to fail bounding-box calculations and font rendering.
3. **JPEG Compression Ringing**: Using lossy JPEG encoding in `toDataURL` causes noticeable compression artifacts on fine typography, borders, and icons.
4. **Iframe Sandbox Interception**: Direct `pdf.save()` calls can get swallowed in sandboxed preview iframes unless backed by an explicit object-URL anchor fallback.

---

## 2. Solution & User Experience

### Dual High-Fidelity Export Options:
1. **Direct Instant PDF Download (300 DPI)**:
   - Headless background generation: Mounts the active CV template in an invisible, zero-opacity A4 container (210mm × 297mm) that is always available regardless of screen size.
   - Lossless PNG rendering via `html2canvas` with optimal device pixel ratio (scale: 3.0+), producing crystal-clear serif and sans-serif typography, sharp divider lines, and high-fidelity contact icons.
   - Multi-page jsPDF assembly with exact A4 dimensions and automatic fallback blob download for maximum browser compatibility.
2. **Vector Print / Save as PDF**:
   - One-click trigger for system print with custom `@media print` A4 stylesheet, yielding 100% vector-sharp, selectable, ATS-friendly text.

### Visual Design & UI Enhancements:
- **Finalize Step**: A primary, radiant "Download High-Quality PDF" action card with clear progress states (`Preparing document...`, `Rendering Page 1...`, `Download Ready!`).
- **CV Preview Controls Bar**: A distinct "Download PDF" button with download icon, tooltips, and file size indicator.
- **Filename Consistency**: Respects custom filename entered by the user (e.g. `John_Doe_CV.pdf`).

---

## 3. Key Product Decisions & Trade-Offs

- **Headless Staging vs. Visible DOM Capture**:
  - *Chosen Approach*: Always construct a standardized, unscaled A4 staging element in the DOM at exact dimensions (794px × 1123px), ensuring mobile users get the exact same high-resolution multi-page PDF as desktop users.
  - *Why*: Eliminates CSS `scale()` distortion and viewport clipping bugs.
- **Lossless PNG vs. Compressed JPEG**:
  - *Chosen Approach*: Use PNG canvas data URL encoding for jsPDF.
  - *Why*: Prevents blurry halos and pixelation around text characters.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   Zustand CV Store                     │
│    (Personal, Experience, Education, Skills, Custom Name)│
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
   ┌───────────────────────┐  ┌───────────────────────┐
   │ FinalizeStep.tsx      │  │ CvPreview.tsx         │
   │ Download Actions UI   │  │ Toolbar & Viewport    │
   └───────────┬───────────┘  └───────────┬───────────┘
               │                          │
               └────────────┬─────────────┘
                            ▼
           ┌──────────────────────────────────┐
           │      lib/pdfGenerator.ts         │
           │  • Headless A4 Staging Node      │
           │  • Font Readiness Verification   │
           │  • html2canvas (scale: 3.0, PNG) │
           │  • jsPDF Multi-Page Packaging    │
           │  • Blob / Anchor Fallback Save   │
           └────────────────┬─────────────────┘
                            ▼
              High-Quality Downloaded PDF
```

### Planned Implementation Steps:
1. **Refactor `lib/pdfGenerator.ts`**:
   - Support autonomous headless rendering: if `#cv-print-area` is not rendered or is hidden, dynamically generate the CV pages using the active template and store data.
   - Switch from JPEG to lossless high-resolution PNG rendering.
   - Robust download trigger using `URL.createObjectURL(pdf.output('blob'))` with fallback.
2. **Update `components/builder/steps/FinalizeStep.tsx`**:
   - Provide a prominent, responsive "Download PDF (300 DPI High-Res)" button and secondary "Save as Vector PDF (Browser Print)" option.
   - Implement real-time progress text and success feedback toasts.
3. **Update `components/CvPreview.tsx` & `app/builder/page.tsx`**:
   - Ensure an unhidden print/export container is always available for export on all screen sizes.
   - Connect global print and download events cleanly.
4. **Verification**:
   - Validate build with `compile_applet` and `lint_applet`.
   - Test PDF generation across desktop and mobile preview contexts.
