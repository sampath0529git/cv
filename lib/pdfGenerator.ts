import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface ExportPdfOptions {
  fileName?: string;
  onProgress?: (message: string) => void;
}

let isGenerating = false;

/**
 * Generates and downloads an ultra-high-quality (300 true DPI) multi-page A4 PDF
 * directly to the user's device using jsPDF and html2canvas with lossless PNG rendering.
 */
export async function downloadCvPdf(options: ExportPdfOptions = {}): Promise<boolean> {
  if (isGenerating) {
    console.warn('PDF generation already in progress. Ignoring duplicate request.');
    return false;
  }

  const { fileName = 'Curriculum_Vitae.pdf', onProgress } = options;
  const sanitizedFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  isGenerating = true;

  onProgress?.('Preparing high-resolution document...');

  // Ensure all web fonts are settled
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if font readiness promise rejects
    }
  }

  // Find candidate CV page elements across visible and hidden persistent roots
  let pageElements: HTMLElement[] = [];

  const printArea = document.getElementById('cv-print-area');
  if (printArea) {
    pageElements = Array.from(printArea.querySelectorAll<HTMLElement>('.cv-page'));
  }

  // If no pages found inside cv-print-area, search globally
  if (pageElements.length === 0) {
    pageElements = Array.from(document.querySelectorAll<HTMLElement>('.cv-page'));
  }

  // Filter out any pages that might have 0 inner content
  pageElements = pageElements.filter((el) => el && (el.children.length > 0 || el.innerText.trim().length > 0));

  if (pageElements.length === 0) {
    console.warn('No CV pages found in DOM. Triggering browser print fallback.');
    onProgress?.('Opening print window...');
    window.print();
    return false;
  }

  // Create an off-screen staging container positioned at exact viewport origin (0, 0)
  // Behind the body with zIndex -9999 so it is 100% within canvas viewport bounds
  const stagingContainer = document.createElement('div');
  stagingContainer.id = 'cv-pdf-export-staging';
  stagingContainer.style.position = 'fixed';
  stagingContainer.style.top = '0';
  stagingContainer.style.left = '0';
  stagingContainer.style.width = '794px';
  stagingContainer.style.height = '1123px';
  stagingContainer.style.zIndex = '-9999';
  stagingContainer.style.overflow = 'hidden';
  stagingContainer.style.backgroundColor = '#ffffff';
  stagingContainer.style.pointerEvents = 'none';
  stagingContainer.style.opacity = '1';
  document.body.appendChild(stagingContainer);

  try {
    // Initialize jsPDF with standard international A4 dimensions (210 x 297 mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const totalPages = pageElements.length;

    for (let i = 0; i < totalPages; i++) {
      onProgress?.(`Rendering page ${i + 1} of ${totalPages} in high resolution (300 DPI)...`);

      // Clear previous staging content
      stagingContainer.innerHTML = '';

      const originalPage = pageElements[i];
      // Clone the page node to isolate it completely from parent screen CSS scale transforms
      const pageClone = originalPage.cloneNode(true) as HTMLElement;

      // Clean clone styles to ensure pristine 1:1 A4 layout matching 210mm x 297mm
      pageClone.style.transform = 'none';
      pageClone.style.position = 'relative';
      pageClone.style.display = 'flex';
      pageClone.style.flexDirection = 'column';
      pageClone.style.visibility = 'visible';
      pageClone.style.opacity = '1';
      pageClone.style.boxShadow = 'none';
      pageClone.style.border = 'none';
      pageClone.style.borderRadius = '0';
      pageClone.style.width = '794px';
      pageClone.style.height = '1123px';
      pageClone.style.minWidth = '794px';
      pageClone.style.maxWidth = '794px';
      pageClone.style.minHeight = '1123px';
      pageClone.style.maxHeight = '1123px';
      pageClone.style.margin = '0';
      pageClone.style.padding = originalPage.style.padding || '';
      pageClone.style.backgroundColor = '#ffffff';
      pageClone.style.setProperty('-webkit-font-smoothing', 'antialiased');
      pageClone.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
      pageClone.style.setProperty('text-rendering', 'optimizeLegibility');

      // Preserve active typography and accent tokens
      if (originalPage.style.fontFamily) {
        pageClone.style.fontFamily = originalPage.style.fontFamily;
      }
      if (originalPage.style.fontSize) {
        pageClone.style.fontSize = originalPage.style.fontSize;
      }
      if (originalPage.style.lineHeight) {
        pageClone.style.lineHeight = originalPage.style.lineHeight;
      }
      const accent = originalPage.style.getPropertyValue('--accent');
      if (accent) {
        pageClone.style.setProperty('--accent', accent);
      }

      // Remove any non-print elements (updating badges, indicators)
      const nonPrintElements = pageClone.querySelectorAll('.no-print, .page-badge-indicator');
      nonPrintElements.forEach((el) => el.remove());

      stagingContainer.appendChild(pageClone);

      // Brief tick for complete DOM reflow & font layout settling
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture at scale: 3.0 (yields ~2382px width for 794px A4 element, true 300 DPI)
      const canvas = await html2canvas(pageClone, {
        scale: 3.0,
        x: 0,
        y: 0,
        width: 794,
        height: 1123,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const body = clonedDoc.body;
          if (body) {
            body.style.setProperty('-webkit-font-smoothing', 'antialiased');
            body.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
            body.style.setProperty('text-rendering', 'optimizeLegibility');
          }

          // Defensive sanitization: remove any residual oklch references from cloned elements
          try {
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              if (!htmlEl || !htmlEl.style) return;
              const style = htmlEl.style;
              for (let s = style.length - 1; s >= 0; s--) {
                const prop = style[s];
                const val = style.getPropertyValue(prop);
                if (val && typeof val === 'string' && val.includes('oklch')) {
                  style.removeProperty(prop);
                }
              }
            });
          } catch {
            // Ignore traversal errors
          }
        },
      });

      // Lossless PNG data encoding to eliminate JPEG compression fuzz around text
      const imgData = canvas.toDataURL('image/png');

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Add image filling the exact A4 page dimensions (210mm x 297mm)
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    }

    onProgress?.('Finalizing and downloading PDF file...');

    // Robust dual-method download to handle all desktop, mobile, and iframe sandboxes
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = sanitizedFileName;
    downloadLink.setAttribute('download', sanitizedFileName);
    downloadLink.rel = 'noopener noreferrer';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Fallback: Also invoke pdf.save if click was blocked by browser popup restrictions
    try {
      pdf.save(sanitizedFileName);
    } catch {
      // Ignore if standard anchor download already succeeded
    }

    setTimeout(() => {
      if (document.body.contains(downloadLink)) {
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(blobUrl);
    }, 6000);

    onProgress?.('Download complete!');
    return true;
  } catch (error) {
    console.error('Error generating PDF via html2canvas/jsPDF:', error);
    onProgress?.('Direct download encountered an issue, opening print dialog...');
    // Fallback: trigger standard browser print dialog
    window.print();
    return false;
  } finally {
    isGenerating = false;
    // Clean up staging element
    if (document.body.contains(stagingContainer)) {
      document.body.removeChild(stagingContainer);
    }
  }
}
