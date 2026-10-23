import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportPdfOptions {
  fileName?: string;
  onProgress?: (message: string) => void;
}

/**
 * Generates and downloads an ultra-high-quality (300 DPI) multi-page A4 PDF
 * directly to the user's computer via jsPDF & html2canvas.
 */
export async function downloadCvPdf(options: ExportPdfOptions = {}): Promise<boolean> {
  const { fileName = 'Curriculum_Vitae.pdf', onProgress } = options;
  const sanitizedFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  // Find the CV print area or pages
  const printArea = document.getElementById('cv-print-area');
  const pageElements = printArea
    ? Array.from(printArea.querySelectorAll('.cv-page'))
    : Array.from(document.querySelectorAll('.cv-page'));

  if (!pageElements || pageElements.length === 0) {
    console.warn('No CV pages found to export. Falling back to browser print.');
    window.print();
    return false;
  }

  onProgress?.('Preparing high-resolution document...');

  // Ensure all fonts are fully loaded
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if font readiness check fails
    }
  }

  // Create an off-screen staging container to render pages unscaled at exact 1:1 A4 dimensions
  const stagingContainer = document.createElement('div');
  stagingContainer.id = 'cv-pdf-export-staging';
  stagingContainer.style.position = 'fixed';
  stagingContainer.style.left = '-10000px';
  stagingContainer.style.top = '0';
  stagingContainer.style.width = '794px';
  stagingContainer.style.height = '1123px';
  stagingContainer.style.zIndex = '-9999';
  stagingContainer.style.overflow = 'visible';
  stagingContainer.style.backgroundColor = '#ffffff';
  stagingContainer.style.pointerEvents = 'none';
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
      onProgress?.(`Rendering page ${i + 1} of ${totalPages} in high resolution...`);

      // Clear previous staging content
      stagingContainer.innerHTML = '';

      const originalPage = pageElements[i] as HTMLElement;
      // Clone the page node to isolate it completely from screen CSS transforms (scale)
      const pageClone = originalPage.cloneNode(true) as HTMLElement;

      // Clean clone styles to ensure pristine 1:1 A4 rendering
      pageClone.style.transform = 'none';
      pageClone.style.position = 'static';
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

      // Remove any non-print elements (e.g. updating badges or page badge indicators)
      const nonPrintElements = pageClone.querySelectorAll('.no-print, .page-badge-indicator');
      nonPrintElements.forEach((el) => el.remove());

      stagingContainer.appendChild(pageClone);

      // Brief tick for complete DOM reflow & font layout settling
      await new Promise((resolve) => setTimeout(resolve, 80));

      // Capture at scale: 3.125 (yields ~2481px width for 794px A4 element, exactly 300 true DPI)
      // Produces tack-sharp text, thin hairline dividers, and icons
      const canvas = await html2canvas(pageClone, {
        scale: 3.125,
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
        },
      });

      // Maximum quality JPEG encoding (1.0) to eliminate any compression blur on serif typography
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Add image filling the exact A4 page dimensions (210mm x 297mm) with high precision SLOW resampling
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'SLOW');
    }

    onProgress?.('Saving PDF file...');

    // Save and trigger automatic download with fallback
    try {
      pdf.save(sanitizedFileName);
    } catch (saveError) {
      console.warn('pdf.save encountered an issue, attempting manual blob anchor download:', saveError);
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = sanitizedFileName;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 3000);
    }

    onProgress?.('Download complete!');
    return true;
  } catch (error) {
    console.error('Error generating PDF via html2canvas/jsPDF:', error);
    onProgress?.('Falling back to system print...');
    // Fallback: trigger standard browser print dialog
    window.print();
    return false;
  } finally {
    // Clean up off-screen staging element
    if (document.body.contains(stagingContainer)) {
      document.body.removeChild(stagingContainer);
    }
  }
}
