import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  CV,
  PdfExportSettings,
  normalizePdfExportSettings,
} from '@/types/cv';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv } from '@/lib/cvAdapter';
import { applyDateFormatToCv } from '@/lib/dateFormat';

export interface PdfProgressInfo {
  stage: 'Rendering layout' | 'Optimizing quality' | 'Finalizing' | 'Downloaded';
  percent: number;
  message: string;
  toString?: () => string;
}

export interface ExportPdfOptions {
  fileName?: string;
  cv?: CV;
  exportSettings?: Partial<PdfExportSettings>;
  onProgress?: (info: PdfProgressInfo | string, percent?: number) => void;
}

let isGenerating = false;
let previousBlobUrl: string | null = null;

function waitNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      const timer = setTimeout(resolve, 50);
      window.requestAnimationFrame(() => {
        clearTimeout(timer);
        resolve();
      });
    } else {
      setTimeout(resolve, 16);
    }
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = (hex || '#4B4DED').replace('#', '').trim();
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r, g, b];
  }
  return [75, 77, 237];
}

function extractCssRulesFromSheet(sheet: CSSStyleSheet, includePrintMedia: boolean, out: string[]): void {
  const sheetMedia = sheet.media?.mediaText || '';
  if (
    !includePrintMedia &&
    sheetMedia &&
    /\bprint\b/i.test(sheetMedia) &&
    !/\b(all|screen)\b/i.test(sheetMedia)
  ) {
    return;
  }

  try {
    const rules = sheet.cssRules;
    if (!rules) return;
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (!rule) continue;
      if (!includePrintMedia && typeof CSSMediaRule !== 'undefined' && rule instanceof CSSMediaRule) {
        const mediaCond = rule.conditionText || rule.media?.mediaText || '';
        if (/\bprint\b/i.test(mediaCond) && !/\b(all|screen)\b/i.test(mediaCond)) {
          continue;
        }
      }
      if (typeof rule.cssText === 'string' && rule.cssText.length > 0) {
        out.push(rule.cssText);
      }
    }
  } catch {
    // Cross-origin stylesheet (e.g. Google Fonts) — preserved via its absolute <link> tag
  }
}

/**
 * Extracts all active same-origin CSS rules (Tailwind v4 @theme, @layer, @property, utilities, custom rules)
 * directly from `document.styleSheets` and `document.adoptedStyleSheets` so cloned `about:blank` iframes
 * apply 100% of styles synchronously without racing async `/_next/static/css/...` links.
 */
export async function collectDocumentCssText(includePrintMedia: boolean = false): Promise<string> {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return '';
  }

  const cssChunks: string[] = [];

  for (const sheet of Array.from(document.styleSheets)) {
    extractCssRulesFromSheet(sheet, includePrintMedia, cssChunks);
  }

  if (Array.isArray(document.adoptedStyleSheets)) {
    for (const sheet of document.adoptedStyleSheets) {
      extractCssRulesFromSheet(sheet, includePrintMedia, cssChunks);
    }
  }

  if (cssChunks.length > 0) {
    return cssChunks.join('\n');
  }

  // Fallback: fetch same-origin stylesheet links directly if CSSOM rules were not yet populated
  const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
  for (const link of links) {
    const rawHref = link.getAttribute('href') || '';
    if (!rawHref) continue;
    try {
      const absUrl = new URL(rawHref, window.location.href);
      if (absUrl.origin === window.location.origin) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 1200);
        const resp = await fetch(absUrl.href, { signal: controller.signal });
        clearTimeout(timer);
        if (resp.ok) {
          cssChunks.push(await resp.text());
        }
      }
    } catch {
      // Ignore fetch errors
    }
  }

  return cssChunks.join('\n');
}

const IGNORED_COMPUTED_PROPS = new Set(['all', 'd', 'content', 'transition', 'transition-property']);

/**
 * Fallback computed-style inliner in case a strict CSP ever blocks injected `<style>` tags inside the clone iframe.
 */
function copyComputedStylesSubtree(sourceRoot: HTMLElement, targetRoot: HTMLElement): void {
  const walk = (src: Element, dst: Element, isRoot: boolean) => {
    if (!(dst instanceof HTMLElement || dst instanceof SVGElement)) return;
    const computed = window.getComputedStyle(src);
    const parts: string[] = [];

    for (let i = 0; i < computed.length; i++) {
      const prop = computed.item(i);
      if (!prop || IGNORED_COMPUTED_PROPS.has(prop) || prop.startsWith('--')) continue;
      if (
        isRoot &&
        (prop === 'transform' ||
          prop === 'position' ||
          prop === 'top' ||
          prop === 'left' ||
          prop === 'right' ||
          prop === 'bottom' ||
          prop === 'box-shadow' ||
          prop.startsWith('border'))
      ) {
        continue;
      }
      const val = computed.getPropertyValue(prop);
      if (val) {
        parts.push(`${prop}:${val}`);
      }
    }

    if (isRoot) {
      parts.push(
        `position:relative`,
        `top:0px`,
        `left:0px`,
        `transform:none`,
        `width:${A4_WIDTH_PX}px`,
        `height:${A4_HEIGHT_PX}px`,
        `box-shadow:none`,
        `border:none`,
        `border-radius:0px`,
        `overflow:hidden`
      );
    }

    if (parts.length > 0) {
      dst.style.cssText = parts.join(';') + ';';
    }

    const srcChildren = Array.from(src.children).filter(
      (el) => !el.classList.contains('no-print') && !el.classList.contains('page-badge-indicator')
    );
    const dstChildren = Array.from(dst.children).filter(
      (el) => !el.classList.contains('no-print') && !el.classList.contains('page-badge-indicator')
    );

    const len = Math.min(srcChildren.length, dstChildren.length);
    for (let c = 0; c < len; c++) {
      walk(srcChildren[c], dstChildren[c], false);
    }
  };

  walk(sourceRoot, targetRoot, true);
}

function isCanvasVisiblyRendered(sourceCanvas: HTMLCanvasElement): boolean {
  try {
    if (sourceCanvas.width === 0 || sourceCanvas.height === 0) return false;
    const probe = document.createElement('canvas');
    probe.width = 32;
    probe.height = 45;
    const ctx = probe.getContext('2d');
    if (!ctx) return true;
    ctx.drawImage(sourceCanvas, 0, 0, probe.width, probe.height);
    const { data } = ctx.getImageData(0, 0, probe.width, probe.height);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a > 10 && (r < 250 || g < 250 || b < 250)) {
        return true;
      }
    }
    return false;
  } catch {
    return true;
  }
}

/**
 * Triggers a reliable PDF file download across standalone tabs and sandboxed preview iframes.
 * Avoids `new MouseEvent('click', { view: window })` which throws TypeError when `window` is proxied.
 */
function triggerPdfBlobDownload(pdf: jsPDF, sanitizedFileName: string): boolean {
  try {
    const arrayBuffer = pdf.output('arraybuffer');
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    if (previousBlobUrl) {
      const staleUrl = previousBlobUrl;
      setTimeout(() => {
        try {
          URL.revokeObjectURL(staleUrl);
        } catch {
          // Ignore revoke errors
        }
      }, 60000);
    }
    previousBlobUrl = blobUrl;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('applet-pdf-blob-ready', {
          detail: { blobUrl, fileName: sanitizedFileName, byteSize: blob.size },
        })
      );
    }

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = sanitizedFileName;
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);

    try {
      link.click();
    } catch {
      const fallbackEvt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      link.dispatchEvent(fallbackEvt);
    }

    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 15000);

    return true;
  } catch (err) {
    console.error('Blob download trigger failed, attempting data URI fallback:', err);
    try {
      const dataUri = pdf.output('datauristring');
      const link = document.createElement('a');
      link.href = dataUri;
      link.download = sanitizedFileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 5000);
      return true;
    } catch (fallbackErr) {
      console.error('Data URI download fallback failed:', fallbackErr);
      return false;
    }
  }
}

function normalizeActionableUrl(raw?: string | null, forceWebUrl: boolean = false): string | null {
  if (!raw) return null;
  const cleaned = raw
    .trim()
    .replace(/^[("'<]+/, '')
    .replace(/[.,;|·)"'>]+$/, '')
    .trim();
  if (!cleaned) return null;

  if (/^(mailto:|tel:|https?:\/\/)/i.test(cleaned)) {
    return cleaned;
  }
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleaned)) {
    return `mailto:${cleaned}`;
  }
  if (
    forceWebUrl ||
    /^(?:www\.|linkedin\.com\/|github\.com\/|[a-zA-Z0-9-]+\.(?:co\.uk|org\.uk|ac\.uk|gov\.uk|com|io|dev|net|org|me|ai|app))(?:\/[^\s]*)?$/i.test(
      cleaned
    )
  ) {
    if (cleaned.includes('.') && !/\s/.test(cleaned)) {
      return `https://${cleaned}`;
    }
  }
  return null;
}

interface PdfLinkRect {
  xMm: number;
  yMm: number;
  wMm: number;
  hMm: number;
  url: string;
}

function collectPageHyperlinkAnnotations(pageClone: HTMLElement, cv: CV): PdfLinkRect[] {
  const results: PdfLinkRect[] = [];
  const pageRect = pageClone.getBoundingClientRect();
  if (pageRect.width <= 0 || pageRect.height <= 0) {
    return results;
  }

  const pushDomRect = (rect: DOMRect, url: string) => {
    if (rect.width < 4 || rect.height < 3) return;
    const xMm = Math.max(0, ((rect.left - pageRect.left) / pageRect.width) * A4_WIDTH_MM);
    const yMm = Math.max(0, ((rect.top - pageRect.top) / pageRect.height) * A4_HEIGHT_MM);
    const wMm = Math.min(A4_WIDTH_MM - xMm, (rect.width / pageRect.width) * A4_WIDTH_MM);
    const hMm = Math.min(A4_HEIGHT_MM - yMm, (rect.height / pageRect.height) * A4_HEIGHT_MM);
    if (wMm <= 0.5 || hMm <= 0.5) return;

    const duplicate = results.some(
      (existing) =>
        existing.url === url &&
        Math.abs(existing.xMm - xMm) < 1.2 &&
        Math.abs(existing.yMm - yMm) < 1.2
    );
    if (!duplicate) {
      results.push({ xMm, yMm, wMm, hMm, url });
    }
  };

  // 1. Collect explicit <a href="..."> elements
  const anchors = Array.from(pageClone.querySelectorAll<HTMLAnchorElement>('a[href]'));
  for (const anchor of anchors) {
    const rawHref = anchor.getAttribute('href') || '';
    const resolved = normalizeActionableUrl(rawHref, false);
    if (!resolved) continue;
    const rects = Array.from(anchor.getClientRects());
    for (const r of rects) {
      pushDomRect(r, resolved);
    }
  }

  // 2. Build candidate link targets from CV fields (email, LinkedIn, website, project links)
  const knownTargets: Array<{ token: string; url: string }> = [];
  const registerKnown = (rawVal?: string, isWeb: boolean = false) => {
    const trimmed = rawVal?.trim();
    if (!trimmed || trimmed.length < 4) return;
    const url = normalizeActionableUrl(trimmed, isWeb);
    if (url && !knownTargets.some((t) => t.token === trimmed)) {
      knownTargets.push({ token: trimmed, url });
    }
  };

  registerKnown(cv.personal.email, false);
  registerKnown(cv.personal.linkedin, true);
  registerKnown(cv.personal.website, true);
  for (const proj of cv.projects || []) {
    registerKnown(proj.link, true);
  }

  // 3. Scan text nodes not inside <a> tags for known CV links and inline URLs/emails
  const inlinePattern =
    /(?:https?:\/\/[^\s|,;·)]+|(?:www\.|linkedin\.com\/in\/|github\.com\/)[^\s|,;·)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

  const walker = document.createTreeWalker(pageClone, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    currentNode = walker.nextNode();
    const parentEl = textNode.parentElement;
    if (!parentEl || parentEl.closest('a[href]')) continue;
    const content = textNode.nodeValue || '';
    if (!content.trim()) continue;

    // Match explicit CV contact/project tokens first
    for (const { token, url } of knownTargets) {
      let fromIdx = 0;
      while (fromIdx < content.length) {
        const hit = content.indexOf(token, fromIdx);
        if (hit === -1) break;
        try {
          const range = document.createRange();
          range.setStart(textNode, hit);
          range.setEnd(textNode, hit + token.length);
          for (const r of Array.from(range.getClientRects())) {
            pushDomRect(r, url);
          }
        } catch {
          // Ignore range measurement edge cases
        }
        fromIdx = hit + token.length;
      }
    }

    // Match any inline URLs or emails in body/summary/project descriptions
    inlinePattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = inlinePattern.exec(content)) !== null) {
      const matchedStr = match[0];
      const url = normalizeActionableUrl(matchedStr, false);
      if (!url) continue;
      try {
        const range = document.createRange();
        range.setStart(textNode, match.index);
        range.setEnd(textNode, match.index + matchedStr.length);
        for (const r of Array.from(range.getClientRects())) {
          pushDomRect(r, url);
        }
      } catch {
        // Ignore range measurement edge cases
      }
    }
  }

  return results;
}

/**
 * Pure vector jsPDF fallback renderer used ONLY if DOM canvas capture ever throws an unrecoverable error.
 */
function generateVectorFallbackPdf(
  sanitizedFileName: string,
  overrideCv?: CV,
  exportSettings?: PdfExportSettings
): boolean {
  try {
    const cv = applyDateFormatToCv(overrideCv || cvStoreToCv(useCvStore.getState()));
    const resolvedSettings = normalizePdfExportSettings(
      exportSettings ?? cv.settings.pdfExportSettings
    );
    const [ar, ag, ab] = hexToRgb(cv.settings.accentColor);
    const scaleFactor =
      cv.settings.fontScale === 'sm' ? 0.92 : cv.settings.fontScale === 'lg' ? 1.08 : 1;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const isTwoCol =
      cv.settings.templateId === 'toronto' ||
      cv.settings.templateId === 'manchester' ||
      cv.settings.templateId === 'glasgow' ||
      cv.settings.templateId === 'shoreditch' ||
      cv.settings.templateId === 'leeds' ||
      cv.settings.templateId === 'birmingham';

    if (isTwoCol) {
      // Draw subtle two-column sidebar tint on page 1 so fallback also honors two-column layout
      pdf.setFillColor(246, 248, 254);
      pdf.rect(0, 0, 64, A4_HEIGHT_MM, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.25);
      pdf.line(64, 0, 64, A4_HEIGHT_MM);
    }

    const marginX = isTwoCol ? 72 : 16;
    const rightLimit = A4_WIDTH_MM - 14;
    const contentWidth = rightLimit - marginX;
    let y = 19;

    // Render sidebar on page 1 if two-column
    if (isTwoCol) {
      let sy = 19;
      const sx = 8;
      const sWidth = 50;

      const drawSideHeading = (title: string) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(8.5 * scaleFactor);
        pdf.setTextColor(ar, ag, ab);
        pdf.text(title.toUpperCase(), sx, sy);
        sy += 1.5;
        pdf.setDrawColor(215, 222, 235);
        pdf.line(sx, sy, sx + sWidth, sy);
        sy += 4.2;
      };

      const contactPairs: [string, string | undefined][] = [
        ['EMAIL', cv.personal.email],
        ['PHONE', cv.personal.phone],
        ['LOCATION', cv.personal.location],
        ['LINKEDIN', cv.personal.linkedin],
        ['PORTFOLIO', cv.personal.website],
        ['DOB', cv.personal.dateOfBirth],
        ['NATIONALITY', cv.personal.nationality],
        ['LICENCE', cv.personal.drivingLicence],
      ];
      const activeContacts = contactPairs.filter(([, v]) => Boolean(v && v.trim()));
      if (activeContacts.length > 0) {
        drawSideHeading('Contact');
        for (const [label, val] of activeContacts) {
          if (sy > A4_HEIGHT_MM - 18) break;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(6.8 * scaleFactor);
          pdf.setTextColor(140, 150, 168);
          pdf.text(label, sx, sy);
          sy += 3.2;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          const wrapped = pdf.splitTextToSize(val || '', sWidth);
          pdf.text(wrapped, sx, sy);
          sy += wrapped.length * 3.5 + 1.8;
        }
        sy += 2.5;
      }

      const skillNames = cv.skills.flatMap((g) => g.items).filter(Boolean);
      if (skillNames.length > 0 && sy < A4_HEIGHT_MM - 30) {
        drawSideHeading('Key Skills');
        for (const sk of skillNames) {
          if (sy > A4_HEIGHT_MM - 16) break;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.2 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          const wrapped = pdf.splitTextToSize(sk, sWidth);
          pdf.text(wrapped, sx, sy);
          sy += wrapped.length * 3.5 + 0.6;
          pdf.setFillColor(226, 232, 240);
          pdf.rect(sx, sy, sWidth, 0.9, 'F');
          pdf.setFillColor(ar, ag, ab);
          pdf.rect(sx, sy, sWidth * 0.82, 0.9, 'F');
          sy += 3.5;
        }
        sy += 2.5;
      }

      if (cv.education.length > 0 && sy < A4_HEIGHT_MM - 30) {
        drawSideHeading('Education');
        for (const edu of cv.education) {
          if (sy > A4_HEIGHT_MM - 20) break;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8.3 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          const qLines = pdf.splitTextToSize(edu.qualification || '', sWidth);
          pdf.text(qLines, sx, sy);
          sy += qLines.length * 3.5;
          if (edu.institution) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(7.8 * scaleFactor);
            pdf.setTextColor(71, 85, 105);
            const iLines = pdf.splitTextToSize(edu.institution, sWidth);
            pdf.text(iLines, sx, sy);
            sy += iLines.length * 3.4;
          }
          if (edu.grade) {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(7.5 * scaleFactor);
            pdf.setTextColor(ar, ag, ab);
            const gLines = pdf.splitTextToSize(edu.grade, sWidth);
            pdf.text(gLines, sx, sy);
            sy += gLines.length * 3.3;
          }
          const dStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
          if (dStr) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(7.2 * scaleFactor);
            pdf.setTextColor(148, 163, 184);
            pdf.text(dStr, sx, sy);
            sy += 3.4;
          }
          sy += 2;
        }
        sy += 2;
      }

      if (cv.languages && cv.languages.length > 0 && sy < A4_HEIGHT_MM - 24) {
        drawSideHeading('Languages');
        for (const lang of cv.languages) {
          if (sy > A4_HEIGHT_MM - 14) break;
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          pdf.text(lang.name, sx, sy);
          if (lang.level) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(7.5 * scaleFactor);
            pdf.setTextColor(100, 116, 139);
            pdf.text(lang.level, sx + sWidth, sy, { align: 'right' });
          }
          sy += 4;
        }
      }
    }

    const ensureSpace = (neededMm: number) => {
      if (y + neededMm > A4_HEIGHT_MM - 16) {
        pdf.addPage('a4', 'portrait');
        if (isTwoCol) {
          pdf.setFillColor(246, 248, 254);
          pdf.rect(0, 0, 64, A4_HEIGHT_MM, 'F');
          pdf.setDrawColor(226, 232, 240);
          pdf.setLineWidth(0.25);
          pdf.line(64, 0, 64, A4_HEIGHT_MM);
        }
        y = 19;
      }
    };

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(Math.round(20 * scaleFactor));
    pdf.setTextColor(15, 27, 77);
    pdf.text(cv.personal.fullName || 'Curriculum Vitae', marginX, y);
    y += 6.8;

    if (cv.personal.jobTitle) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11 * scaleFactor);
      pdf.setTextColor(ar, ag, ab);
      pdf.text(cv.personal.jobTitle, marginX, y);
      y += 5.5;
    }

    if (!isTwoCol) {
      const contactLine = [
        cv.personal.email,
        cv.personal.phone,
        cv.personal.location,
        cv.personal.linkedin,
        cv.personal.website,
        cv.personal.dateOfBirth ? `DOB: ${cv.personal.dateOfBirth}` : '',
        cv.personal.nationality ? `Nationality: ${cv.personal.nationality}` : '',
        cv.personal.drivingLicence ? `Driving Licence: ${cv.personal.drivingLicence}` : '',
      ]
        .filter(Boolean)
        .join('  |  ');

      if (contactLine) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(80, 90, 110);
        const wrappedContact = pdf.splitTextToSize(contactLine, contentWidth);
        pdf.text(wrappedContact, marginX, y);
        y += wrappedContact.length * 4.2 + 2.5;
      }
    }

    if (isTwoCol && cv.personalStatement?.trim()) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9 * scaleFactor);
      pdf.setTextColor(71, 85, 105);
      const sLines = pdf.splitTextToSize(cv.personalStatement.trim(), contentWidth);
      pdf.text(sLines, marginX, y);
      y += sLines.length * 4.2 + 2.5;
    }

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(marginX, y, rightLimit, y);
    pdf.setLineWidth(0.2);
    y += 6;

    const drawSectionHeading = (title: string) => {
      ensureSpace(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5 * scaleFactor);
      pdf.setTextColor(ar, ag, ab);
      pdf.text(title.toUpperCase(), marginX, y);
      y += 1.8;
      pdf.setDrawColor(226, 232, 240);
      pdf.line(marginX, y, rightLimit, y);
      y += 5;
    };

    const order = cv.settings.sectionOrder || [
      'statement',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'languages',
      'awards',
      'interests',
      'custom',
      'references',
    ];

    for (const secKey of order) {
      if (secKey === 'statement' && !isTwoCol && cv.personalStatement?.trim()) {
        drawSectionHeading('Professional Summary');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.4 * scaleFactor);
        pdf.setTextColor(40, 50, 65);
        const lines = pdf.splitTextToSize(cv.personalStatement.trim(), contentWidth);
        ensureSpace(lines.length * 4.4 + 4);
        pdf.text(lines, marginX, y);
        y += lines.length * 4.4 + 4;
      }

      if (secKey === 'experience' && cv.experience.length > 0) {
        drawSectionHeading('Work Experience');
        for (const exp of cv.experience) {
          ensureSpace(16);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9.8 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          pdf.text(exp.role || '', marginX, y);

          const dateStr = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
          if (dateStr) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.5 * scaleFactor);
            pdf.setTextColor(100, 116, 139);
            pdf.text(dateStr, rightLimit, y, { align: 'right' });
          }
          y += 4.3;

          if (exp.company || exp.location) {
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(8.8 * scaleFactor);
            pdf.setTextColor(ar, ag, ab);
            if (exp.company) pdf.text(exp.company, marginX, y);
            if (exp.location) {
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(100, 116, 139);
              pdf.text(exp.location, rightLimit, y, { align: 'right' });
            }
            y += 4.4;
          }

          const bullets = exp.bullets && exp.bullets.length > 0 ? exp.bullets : [];
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.9 * scaleFactor);
          pdf.setTextColor(51, 65, 85);
          for (const b of bullets) {
            const bLines = pdf.splitTextToSize(`• ${b}`, contentWidth - 3);
            ensureSpace(bLines.length * 4.1 + 1);
            pdf.text(bLines, marginX + 2, y);
            y += bLines.length * 4.1 + 0.7;
          }
          if (bullets.length === 0 && exp.description) {
            const dLines = pdf.splitTextToSize(exp.description, contentWidth);
            ensureSpace(dLines.length * 4.1 + 1);
            pdf.text(dLines, marginX, y);
            y += dLines.length * 4.1 + 0.7;
          }
          y += 3;
        }
      }

      if (secKey === 'education' && !isTwoCol && cv.education.length > 0) {
        drawSectionHeading('Education');
        for (const edu of cv.education) {
          ensureSpace(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9.8 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          pdf.text(
            `${edu.qualification}${edu.institution ? ` — ${edu.institution}` : ''}`,
            marginX,
            y
          );

          const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
          if (dateStr) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.5 * scaleFactor);
            pdf.setTextColor(100, 116, 139);
            pdf.text(dateStr, rightLimit, y, { align: 'right' });
          }
          y += 4.5;

          if (edu.grade || edu.description) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.9 * scaleFactor);
            pdf.setTextColor(71, 85, 105);
            const detail = [edu.grade ? `Grade: ${edu.grade}` : '', edu.description || '']
              .filter(Boolean)
              .join(' · ');
            const dLines = pdf.splitTextToSize(detail, contentWidth);
            ensureSpace(dLines.length * 4.1 + 2);
            pdf.text(dLines, marginX, y);
            y += dLines.length * 4.1;
          }
          y += 3;
        }
      }

      if (secKey === 'skills' && !isTwoCol) {
        const skillNames = cv.skills.flatMap((g) => g.items).filter(Boolean);
        if (skillNames.length > 0) {
          drawSectionHeading('Key Skills');
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9 * scaleFactor);
          pdf.setTextColor(51, 65, 85);
          const sLines = pdf.splitTextToSize(skillNames.join('  •  '), contentWidth);
          ensureSpace(sLines.length * 4.2 + 4);
          pdf.text(sLines, marginX, y);
          y += sLines.length * 4.2 + 3.5;
        }
      }

      if (secKey === 'projects' && cv.projects && cv.projects.length > 0) {
        drawSectionHeading('Key Projects');
        for (const proj of cv.projects) {
          ensureSpace(14);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(9.5 * scaleFactor);
          pdf.setTextColor(15, 23, 42);
          pdf.text(`${proj.title}${proj.role ? ` — ${proj.role}` : ''}`, marginX, y);
          if (proj.link) {
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8.4 * scaleFactor);
            pdf.setTextColor(ar, ag, ab);
            pdf.text(proj.link, rightLimit, y, { align: 'right' });
            if (resolvedSettings.includeHyperlinks) {
              const linkUrl = normalizeActionableUrl(proj.link, true);
              if (linkUrl) {
                const linkW = pdf.getTextWidth(proj.link);
                pdf.link(Math.max(marginX, rightLimit - linkW), y - 3.2, linkW, 4, {
                  url: linkUrl,
                });
              }
            }
          }
          y += 4.3;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.9 * scaleFactor);
          pdf.setTextColor(51, 65, 85);
          const pBullets = proj.bullets && proj.bullets.length > 0 ? proj.bullets : [];
          for (const b of pBullets) {
            const bLines = pdf.splitTextToSize(`• ${b}`, contentWidth - 3);
            ensureSpace(bLines.length * 4.1 + 1);
            pdf.text(bLines, marginX + 2, y);
            y += bLines.length * 4.1 + 0.7;
          }
          if (pBullets.length === 0 && proj.description) {
            const dLines = pdf.splitTextToSize(proj.description, contentWidth);
            ensureSpace(dLines.length * 4.1 + 1);
            pdf.text(dLines, marginX, y);
            y += dLines.length * 4.1 + 0.7;
          }
          y += 2.6;
        }
      }

      if (secKey === 'certifications' && cv.certifications && cv.certifications.length > 0) {
        drawSectionHeading('Certifications & Licences');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(51, 65, 85);
        const cLines = pdf.splitTextToSize(cv.certifications.join('  •  '), contentWidth);
        ensureSpace(cLines.length * 4.2 + 4);
        pdf.text(cLines, marginX, y);
        y += cLines.length * 4.2 + 3.5;
      }

      if (secKey === 'languages' && !isTwoCol && cv.languages && cv.languages.length > 0) {
        drawSectionHeading('Languages');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(51, 65, 85);
        const langStr = cv.languages
          .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
          .join('  •  ');
        const lLines = pdf.splitTextToSize(langStr, contentWidth);
        ensureSpace(lLines.length * 4.2 + 4);
        pdf.text(lLines, marginX, y);
        y += lLines.length * 4.2 + 3.5;
      }

      if (secKey === 'awards' && cv.awards && cv.awards.length > 0) {
        drawSectionHeading('Honours & Awards');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(51, 65, 85);
        const aLines = pdf.splitTextToSize(cv.awards.join('  •  '), contentWidth);
        ensureSpace(aLines.length * 4.2 + 4);
        pdf.text(aLines, marginX, y);
        y += aLines.length * 4.2 + 3.5;
      }

      if (secKey === 'interests' && cv.interests && cv.interests.length > 0) {
        drawSectionHeading('Interests');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(51, 65, 85);
        const iLines = pdf.splitTextToSize(cv.interests.join('  •  '), contentWidth);
        ensureSpace(iLines.length * 4.2 + 4);
        pdf.text(iLines, marginX, y);
        y += iLines.length * 4.2 + 3.5;
      }

      if (secKey === 'custom' && cv.customSections && cv.customSections.length > 0) {
        for (const cs of cv.customSections) {
          drawSectionHeading(cs.title || 'Additional Information');
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9 * scaleFactor);
          pdf.setTextColor(51, 65, 85);
          if (cs.bullets && cs.bullets.length > 0) {
            for (const b of cs.bullets) {
              const bLines = pdf.splitTextToSize(`• ${b}`, contentWidth - 3);
              ensureSpace(bLines.length * 4.1 + 1);
              pdf.text(bLines, marginX + 2, y);
              y += bLines.length * 4.1 + 0.7;
            }
          } else if (cs.content) {
            const cLines = pdf.splitTextToSize(cs.content, contentWidth);
            ensureSpace(cLines.length * 4.1 + 2);
            pdf.text(cLines, marginX, y);
            y += cLines.length * 4.1 + 1;
          }
          y += 2.8;
        }
      }

      if (secKey === 'references' && cv.references?.trim()) {
        drawSectionHeading('References');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9 * scaleFactor);
        pdf.setTextColor(51, 65, 85);
        const rLines = pdf.splitTextToSize(cv.references.trim(), contentWidth);
        ensureSpace(rLines.length * 4.2 + 4);
        pdf.text(rLines, marginX, y);
        y += rLines.length * 4.2 + 3;
      }
    }

    return triggerPdfBlobDownload(pdf, sanitizedFileName);
  } catch (err) {
    console.error('Vector fallback PDF export failed:', err);
    return false;
  }
}

async function compressImageInPlace(img: HTMLImageElement): Promise<void> {
  try {
    const natW = img.naturalWidth || img.width || 0;
    const natH = img.naturalHeight || img.height || 0;
    if (natW <= 0 || natH <= 0) return;

    const maxEdge = 240;
    const ratio = Math.min(1, maxEdge / Math.max(natW, natH));
    const targetW = Math.max(1, Math.round(natW * ratio));
    const targetH = Math.max(1, Math.round(natH * ratio));

    const offscreen = document.createElement('canvas');
    offscreen.width = targetW;
    offscreen.height = targetH;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const compressedUrl = offscreen.toDataURL('image/jpeg', 0.72);
    if (compressedUrl && compressedUrl.startsWith('data:image/jpeg')) {
      img.src = compressedUrl;
      if (typeof img.decode === 'function') {
        await Promise.race([
          img.decode().catch(() => {}),
          new Promise<void>((r) => setTimeout(r, 180)),
        ]);
      }
    }
  } catch {
    // Keep original image if canvas re-encoding is blocked
  }
}

async function prepareImagesForCanvas(
  root: HTMLElement,
  compressImages: boolean = false
): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'));
  if (images.length === 0) return;

  await Promise.all(
    images.map(async (img) => {
      const src = img.getAttribute('src') || '';
      if (!src) return;

      if (src.startsWith('data:') || src.startsWith('blob:')) {
        try {
          if (typeof img.decode === 'function') {
            await Promise.race([
              img.decode().catch(() => {}),
              new Promise<void>((r) => setTimeout(r, 250)),
            ]);
          }
          if (compressImages) {
            await compressImageInPlace(img);
          }
        } catch {
          // Ignore decode warnings
        }
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 800);
        const resp = await fetch(src, {
          mode: 'cors',
          credentials: 'omit',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const blob = await resp.blob();
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              typeof reader.result === 'string' ? resolve(reader.result) : reject();
            reader.onerror = () => reject();
            reader.readAsDataURL(blob);
          });
          img.src = dataUrl;
          if (typeof img.decode === 'function') {
            await Promise.race([
              img.decode().catch(() => {}),
              new Promise<void>((r) => setTimeout(r, 250)),
            ]);
          }
          if (compressImages) {
            await compressImageInPlace(img);
          }
          return;
        }
      } catch {
        // Fallback to anonymous CORS attribute
      }

      img.crossOrigin = 'anonymous';
      if (!img.complete) {
        await new Promise<void>((res) => {
          const timer = setTimeout(res, 600);
          img.onload = () => {
            clearTimeout(timer);
            res();
          };
          img.onerror = () => {
            clearTimeout(timer);
            img.removeAttribute('src');
            res();
          };
        });
      }
      if (compressImages && img.complete) {
        await compressImageInPlace(img);
      }
    })
  );
}

/**
 * Generates and downloads a crisp multi-page A4 PDF (210mm × 297mm) directly in the browser.
 * Injects compiled Tailwind v4 stylesheet rules synchronously into html2canvas-pro's cloned document
 * (without calling requestAnimationFrame on off-screen hidden iframes, which deadlocks Chromium)
 * so multi-column grids, flexboxes, borders, skill bars, padding, and web fonts match the A4 preview 1:1.
 */
export async function downloadCvPdf(options: ExportPdfOptions = {}): Promise<boolean> {
  if (isGenerating) {
    return false;
  }

  const {
    fileName = 'Curriculum_Vitae.pdf',
    cv: customCv,
    exportSettings,
    onProgress,
  } = options;
  const sanitizedFileName = fileName.toLowerCase().endsWith('.pdf')
    ? fileName
    : `${fileName}.pdf`;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const storeSnapshot = useCvStore.getState();
  const activeCvModel = customCv || cvStoreToCv(storeSnapshot);
  const resolvedSettings = normalizePdfExportSettings(
    exportSettings ?? customCv?.settings?.pdfExportSettings ?? storeSnapshot.pdfExportSettings
  );

  const notify = (
    stage: 'Rendering layout' | 'Optimizing quality' | 'Finalizing' | 'Downloaded',
    percent: number,
    message?: string
  ) => {
    const text = message || `${stage}...`;
    if (!onProgress) return;
    const info: PdfProgressInfo = {
      stage,
      percent,
      message: text,
      toString() {
        return text;
      },
    };
    onProgress(info, percent);
  };

  isGenerating = true;
  notify('Rendering layout', 15);

  try {
    // 1. Flush pending React state updates (e.g. auto-committed skill/language/cert inputs)
    await waitNextFrame();

    // 2. Ensure main document web fonts are settled (bounded to 300ms so user activation stays alive)
    if (document.fonts && document.fonts.ready) {
      await Promise.race([
        document.fonts.ready.catch(() => {}),
        new Promise<void>((r) => setTimeout(r, 300)),
      ]);
    }

    const compiledCssText = await collectDocumentCssText(false);

    // 3. Locate primary CV pages from live preview
    let pageElements: HTMLElement[] = [];

    const primaryRoot = document.querySelector<HTMLElement>('[data-cv-preview-primary="true"]');
    if (primaryRoot) {
      pageElements = Array.from(primaryRoot.querySelectorAll<HTMLElement>('.cv-page'));
    }

    if (pageElements.length === 0) {
      const printArea = document.getElementById('cv-print-area');
      if (printArea) {
        pageElements = Array.from(
          printArea.querySelectorAll<HTMLElement>('.cv-print-sheet, .cv-page')
        );
      }
    }

    if (pageElements.length === 0) {
      pageElements = Array.from(document.querySelectorAll<HTMLElement>('.cv-page')).filter(
        (el) => !el.closest('#cv-pdf-export-staging')
      );
    }

    pageElements = pageElements.filter(
      (el) => el && (el.children.length > 0 || el.innerText.trim().length > 0)
    );

    if (pageElements.length === 0) {
      return generateVectorFallbackPdf(sanitizedFileName, customCv, resolvedSettings);
    }

    // 4. Create an isolated 1:1 unscaled A4 staging container off-screen
    const stagingContainer = document.createElement('div');
    stagingContainer.id = 'cv-pdf-export-staging';
    stagingContainer.setAttribute('aria-hidden', 'true');
    stagingContainer.style.position = 'fixed';
    stagingContainer.style.top = '0px';
    stagingContainer.style.left = '-12000px';
    stagingContainer.style.width = `${A4_WIDTH_PX}px`;
    stagingContainer.style.height = `${A4_HEIGHT_PX}px`;
    stagingContainer.style.margin = '0';
    stagingContainer.style.padding = '0';
    stagingContainer.style.overflow = 'hidden';
    stagingContainer.style.backgroundColor = '#ffffff';
    stagingContainer.style.pointerEvents = 'none';
    stagingContainer.style.opacity = '1';
    stagingContainer.style.visibility = 'visible';
    stagingContainer.style.zIndex = '-9999';

    // Copy root & body CSS custom properties (font variables, theme tokens) onto staging container
    const rootComputed = window.getComputedStyle(document.documentElement);
    const bodyComputed = window.getComputedStyle(document.body);
    const fontVars = [
      '--font-sans',
      '--font-heading',
      '--font-inter',
      '--font-merriweather',
      '--font-roboto',
      '--font-lora',
      '--font-jakarta',
      '--font-mono',
    ];
    for (const v of fontVars) {
      const val = rootComputed.getPropertyValue(v) || bodyComputed.getPropertyValue(v);
      if (val) {
        stagingContainer.style.setProperty(v, val);
      }
    }

    document.body.appendChild(stagingContainer);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const totalPages = pageElements.length;

      for (let i = 0; i < totalPages; i++) {
        const pageRatio = i / totalPages;
        const pageStepBase = 25 + Math.round(pageRatio * 45);
        notify(
          'Rendering layout',
          pageStepBase,
          totalPages > 1
            ? `Rendering layout (Page ${i + 1}/${totalPages})...`
            : 'Rendering layout...'
        );

        stagingContainer.innerHTML = '';

        const originalPage = pageElements[i];
        const originalComputed = window.getComputedStyle(originalPage);
        const pageClone = originalPage.cloneNode(true) as HTMLElement;

        const fontScaleAttr = originalPage.getAttribute('data-font-scale');
        if (fontScaleAttr) {
          pageClone.setAttribute('data-font-scale', fontScaleAttr);
        }

        const hasLetterSpacingAttr = originalPage.getAttribute('data-has-letter-spacing');
        if (hasLetterSpacingAttr) {
          pageClone.setAttribute('data-has-letter-spacing', hasLetterSpacingAttr);
        }

        for (const boldAttr of [
          'data-bold-header',
          'data-bold-headings',
          'data-bold-subheadings',
          'data-bold-body',
        ]) {
          const val = originalPage.getAttribute(boldAttr);
          if (val) {
            pageClone.setAttribute(boldAttr, val);
          }
        }

        // Strip screen scale transforms & enforce exact 1:1 A4 pixel geometry (794 × 1123)
        pageClone.style.position = 'relative';
        pageClone.style.top = '0px';
        pageClone.style.left = '0px';
        pageClone.style.transform = 'none';
        pageClone.style.transformOrigin = 'top left';
        pageClone.style.width = `${A4_WIDTH_PX}px`;
        pageClone.style.height = `${A4_HEIGHT_PX}px`;
        pageClone.style.minWidth = `${A4_WIDTH_PX}px`;
        pageClone.style.maxWidth = `${A4_WIDTH_PX}px`;
        pageClone.style.minHeight = `${A4_HEIGHT_PX}px`;
        pageClone.style.maxHeight = `${A4_HEIGHT_PX}px`;
        pageClone.style.margin = '0';
        pageClone.style.boxSizing = 'border-box';
        pageClone.style.boxShadow = 'none';
        pageClone.style.border = 'none';
        pageClone.style.borderRadius = '0';
        pageClone.style.overflow = 'hidden';
        pageClone.style.backgroundColor = '#ffffff';
        pageClone.style.visibility = 'visible';
        pageClone.style.opacity = '1';

        pageClone.style.fontFamily =
          originalPage.style.fontFamily || originalComputed.fontFamily;
        pageClone.style.fontSize =
          originalPage.style.fontSize || originalComputed.fontSize;
        pageClone.style.lineHeight =
          originalPage.style.lineHeight || originalComputed.lineHeight;
        pageClone.style.letterSpacing =
          originalPage.style.letterSpacing || originalComputed.letterSpacing || 'normal';
        pageClone.style.setProperty('-webkit-font-smoothing', 'antialiased');
        pageClone.style.setProperty('text-rendering', 'geometricPrecision');

        const cvLetterSpacing =
          originalPage.style.getPropertyValue('--cv-letter-spacing') ||
          originalComputed.getPropertyValue('--cv-letter-spacing');
        if (cvLetterSpacing) {
          pageClone.style.setProperty('--cv-letter-spacing', cvLetterSpacing.trim());
        }

        const accent =
          originalPage.style.getPropertyValue('--accent') ||
          originalComputed.getPropertyValue('--accent');
        if (accent) {
          pageClone.style.setProperty('--accent', accent.trim());
        }

        // Remove screen-only helper elements (e.g. EmptyCvGuide, badges)
        pageClone
          .querySelectorAll('.no-print, .page-badge-indicator')
          .forEach((el) => el.remove());

        // Hidden Tailwind CSS verification probe inside stagingContainer
        const styleProbe = document.createElement('div');
        styleProbe.id = 'cv-tailwind-style-probe';
        styleProbe.className = 'flex justify-between px-4';
        styleProbe.style.position = 'absolute';
        styleProbe.style.top = '-9999px';
        styleProbe.style.left = '-9999px';
        styleProbe.style.pointerEvents = 'none';
        styleProbe.style.visibility = 'hidden';

        if (!resolvedSettings.includeHyperlinks) {
          pageClone.querySelectorAll('a[href]').forEach((a) => {
            a.removeAttribute('href');
            if (a instanceof HTMLElement) {
              a.style.textDecoration = 'none';
            }
          });
        }

        stagingContainer.appendChild(pageClone);
        stagingContainer.appendChild(styleProbe);

        await prepareImagesForCanvas(pageClone, resolvedSettings.compressImages);

        const pageLinks: PdfLinkRect[] = resolvedSettings.includeHyperlinks
          ? collectPageHyperlinkAnnotations(pageClone, activeCvModel)
          : [];

        notify(
          'Optimizing quality',
          Math.min(85, pageStepBase + 25),
          totalPages > 1
            ? `Optimizing quality (Page ${i + 1}/${totalPages})...`
            : 'Optimizing quality...'
        );

        const captureScale = resolvedSettings.compressImages ? 1.65 : 2.2;

        // Bound html2canvas per-page execution so off-screen iframe resources can never deadlock
        const abortController = new AbortController();
        const pageWatchdog = setTimeout(() => abortController.abort(), 4500);

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(pageClone, {
            scale: captureScale,
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            windowWidth: A4_WIDTH_PX,
            windowHeight: A4_HEIGHT_PX,
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false,
            imageSmoothing: true,
            imageSmoothingQuality: 'high',
            imageTimeout: 2500,
            signal: abortController.signal,
            ignoreElements: (el) => {
              const tag = el.tagName?.toUpperCase();
              if (tag === 'HTML' || tag === 'HEAD' || tag === 'BODY' || tag === 'STYLE') {
                return false;
              }
              if (tag === 'LINK') {
                const rel = (el.getAttribute('rel') || '').toLowerCase();
                const href = el.getAttribute('href') || '';
                // Only preserve cached Google Fonts stylesheet link; skip relative Next.js CSS/preload links
                // because compiledCssText is injected synchronously as a <style> tag in onclone.
                if (rel === 'stylesheet' && /^https:\/\/fonts\.googleapis\.com\//i.test(href)) {
                  return false;
                }
                return true;
              }
              if (tag === 'SCRIPT' || tag === 'NOSCRIPT' || tag === 'IFRAME' || tag === 'NEXTJS-PORTAL') {
                return true;
              }
              if (el.id === 'cv-pdf-export-staging' || el.closest('#cv-pdf-export-staging')) {
                return false;
              }
              return el.parentElement === document.body;
            },
            onclone: (clonedDoc, clonedPageEl) => {
              // Synchronous style & geometry setup inside the cloned iframe.
              // IMPORTANT: Never call clonedWin.requestAnimationFrame here — Chromium suspends rAF
              // on off-screen visibility:hidden iframes, which would deadlock PDF generation.
              const clonedWin = clonedDoc.defaultView || window;

              let head = clonedDoc.head || clonedDoc.querySelector('head');
              if (!head && clonedDoc.documentElement) {
                head = clonedDoc.createElement('head');
                clonedDoc.documentElement.insertBefore(head, clonedDoc.documentElement.firstChild);
              }

              if (compiledCssText.length > 0 && head) {
                const styleTag = clonedDoc.createElement('style');
                styleTag.id = 'cv-pdf-compiled-tailwind';
                styleTag.textContent = compiledCssText;
                head.appendChild(styleTag);
              }

              if (clonedDoc.body) {
                clonedDoc.body.style.margin = '0';
                clonedDoc.body.style.padding = '0';
                clonedDoc.body.style.background = '#ffffff';
                clonedDoc.body.style.width = `${A4_WIDTH_PX}px`;
                clonedDoc.body.style.height = `${A4_HEIGHT_PX}px`;
                clonedDoc.body.style.overflow = 'hidden';
              }

              const clonedStage = clonedDoc.getElementById('cv-pdf-export-staging');
              if (clonedStage) {
                clonedStage.style.position = 'fixed';
                clonedStage.style.top = '0px';
                clonedStage.style.left = '0px';
                clonedStage.style.width = `${A4_WIDTH_PX}px`;
                clonedStage.style.height = `${A4_HEIGHT_PX}px`;
                clonedStage.style.opacity = '1';
                clonedStage.style.zIndex = '2147483647';
                clonedStage.style.visibility = 'visible';
              }

              // Force synchronous layout reflow and verify Tailwind utility classes applied
              void clonedPageEl.getBoundingClientRect();
              const clonedProbe = clonedDoc.getElementById('cv-tailwind-style-probe');
              let tailwindApplied = false;
              if (clonedProbe) {
                const probeStyle = clonedWin.getComputedStyle(clonedProbe);
                tailwindApplied =
                  probeStyle.display === 'flex' && parseFloat(probeStyle.paddingLeft || '0') >= 12;
                clonedProbe.remove();
              }

              if (!tailwindApplied && clonedPageEl instanceof HTMLElement) {
                copyComputedStylesSubtree(originalPage, clonedPageEl);
              }

              void clonedPageEl.getBoundingClientRect();
            },
          });
        } finally {
          clearTimeout(pageWatchdog);
        }

        // Guard against any blank rasterization edge case
        if (pageClone.innerText.trim().length > 0 && !isCanvasVisiblyRendered(canvas)) {
          return generateVectorFallbackPdf(sanitizedFileName, customCv, resolvedSettings);
        }

        const jpegQuality = resolvedSettings.compressImages ? 0.74 : 0.95;
        const imgCompression = resolvedSettings.compressImages ? 'MEDIUM' : 'FAST';
        const imgData = canvas.toDataURL('image/jpeg', jpegQuality);

        if (i > 0) {
          pdf.addPage('a4', 'portrait');
        }

        pdf.addImage(
          imgData,
          'JPEG',
          0,
          0,
          A4_WIDTH_MM,
          A4_HEIGHT_MM,
          `cv-page-${i + 1}`,
          imgCompression
        );

        if (resolvedSettings.includeHyperlinks && pageLinks.length > 0) {
          for (const linkRect of pageLinks) {
            pdf.link(linkRect.xMm, linkRect.yMm, linkRect.wMm, linkRect.hMm, {
              url: linkRect.url,
            });
          }
        }
      }

      notify('Finalizing', 92);
      const saved = triggerPdfBlobDownload(pdf, sanitizedFileName);
      if (!saved) {
        return generateVectorFallbackPdf(sanitizedFileName, customCv, resolvedSettings);
      }
      notify('Downloaded', 100, 'Downloaded!');
      return true;
    } finally {
      if (stagingContainer.parentNode) {
        stagingContainer.parentNode.removeChild(stagingContainer);
      }
    }
  } catch (error) {
    console.error('Canvas PDF capture failed, executing pure vector PDF fallback:', error);
    return generateVectorFallbackPdf(sanitizedFileName, customCv, resolvedSettings);
  } finally {
    isGenerating = false;
  }
}

/**
 * Triggers native print when running top-level, or direct PDF download when inside a sandboxed iframe.
 */
export function triggerBrowserPrint(fileName?: string): void {
  if (typeof window === 'undefined') return;
  let isEmbeddedIframe = false;
  try {
    isEmbeddedIframe = window.self !== window.top;
  } catch {
    isEmbeddedIframe = true;
  }

  if (isEmbeddedIframe) {
    window.dispatchEvent(
      new CustomEvent('applet-print-cv', { detail: { mode: 'download', fileName } })
    );
  } else {
    window.dispatchEvent(
      new CustomEvent('applet-print-cv', { detail: { mode: 'print', fileName } })
    );
  }
}
