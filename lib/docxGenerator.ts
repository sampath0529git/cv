import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType,
  convertMillimetersToTwip,
} from 'docx';
import { CV, FontScale } from '@/types/cv';
import { useCvStore } from '@/store/useCvStore';
import { cvStoreToCv } from '@/lib/cvAdapter';
import { applyDateFormatToCv } from '@/lib/dateFormat';
import { getTemplateById } from '@/templates/registry';

export interface ExportDocxOptions {
  fileName?: string;
  cv?: CV;
  onProgress?: (message: string) => void;
}

const DOCX_MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

let isGeneratingDocx = false;
let previousDocxBlobUrl: string | null = null;

interface DocxTypographyScale {
  nameSize: number; // half-points (e.g. 46 = 23pt)
  roleSize: number;
  sectionSize: number;
  subHeadingSize: number;
  bodySize: number;
  metaSize: number;
  lineSpacing: number; // 240 = 1.0x, 276 = 1.15x
}

const SCALE_MAP: Record<FontScale, DocxTypographyScale> = {
  sm: {
    nameSize: 42,
    roleSize: 23,
    sectionSize: 21,
    subHeadingSize: 20,
    bodySize: 19,
    metaSize: 17,
    lineSpacing: 264,
  },
  md: {
    nameSize: 48,
    roleSize: 25,
    sectionSize: 23,
    subHeadingSize: 22,
    bodySize: 20,
    metaSize: 18,
    lineSpacing: 276,
  },
  lg: {
    nameSize: 54,
    roleSize: 28,
    sectionSize: 25,
    subHeadingSize: 24,
    bodySize: 22,
    metaSize: 20,
    lineSpacing: 288,
  },
};

const WORD_FONT_MAP: Record<string, string> = {
  jakarta: 'Segoe UI',
  inter: 'Calibri',
  roboto: 'Arial',
  merriweather: 'Georgia',
  lora: 'Cambria',
  mono: 'Consolas',
};

const NO_BORDER = {
  style: BorderStyle.NONE,
  size: 0,
  color: 'FFFFFF',
};

const NO_TABLE_BORDERS = {
  top: NO_BORDER,
  bottom: NO_BORDER,
  left: NO_BORDER,
  right: NO_BORDER,
  insideHorizontal: NO_BORDER,
  insideVertical: NO_BORDER,
};

function normalizeHex6(hex?: string, fallback: string = '1E3A8A'): string {
  const cleaned = (hex || '').replace('#', '').trim();
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return (
      cleaned[0] +
      cleaned[0] +
      cleaned[1] +
      cleaned[1] +
      cleaned[2] +
      cleaned[2]
    ).toUpperCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.toUpperCase();
  }
  return fallback;
}

function hexToRgbTuple(hex6: string): [number, number, number] {
  const r = parseInt(hex6.slice(0, 2), 16);
  const g = parseInt(hex6.slice(2, 4), 16);
  const b = parseInt(hex6.slice(4, 6), 16);
  return [
    isNaN(r) ? 30 : r,
    isNaN(g) ? 58 : g,
    isNaN(b) ? 138 : b,
  ];
}

function getContrastHexOnFill(hex6: string): { primary: string; secondary: string } {
  const [r, g, b] = hexToRgbTuple(hex6);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.58) {
    return { primary: '0F172A', secondary: '334155' };
  }
  return { primary: 'FFFFFF', secondary: 'E2E8F0' };
}

function tintHexWithWhite(hex6: string, whiteRatio: number = 0.92): string {
  const [r, g, b] = hexToRgbTuple(hex6);
  const mix = (channel: number) =>
    Math.min(255, Math.max(0, Math.round(channel * (1 - whiteRatio) + 255 * whiteRatio)))
      .toString(16)
      .padStart(2, '0');
  return `${mix(r)}${mix(g)}${mix(b)}`.toUpperCase();
}

function sanitizeDocxFileName(rawName?: string, fallbackFullName?: string): string {
  const cleanedRaw = (rawName || '')
    .trim()
    .replace(/\.(pdf|docx)$/i, '')
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');

  if (cleanedRaw) {
    return `${cleanedRaw}.docx`;
  }

  const slug = (fallbackFullName || 'Curriculum_Vitae')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '');

  return `${slug || 'Curriculum_Vitae'}-CV.docx`;
}

function waitNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      const timer = setTimeout(resolve, 40);
      window.requestAnimationFrame(() => {
        clearTimeout(timer);
        resolve();
      });
    } else {
      setTimeout(resolve, 16);
    }
  });
}

/**
 * Loads a candidate portrait URL (base64 data URL or same-origin asset) and normalizes it
 * into a crisp square PNG Uint8Array for Word ImageRun compatibility.
 */
async function loadPortraitPngBytes(photoUrl?: string): Promise<Uint8Array | null> {
  if (!photoUrl || typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      const timeout = setTimeout(() => reject(new Error('Image load timeout')), 1500);
      el.crossOrigin = 'anonymous';
      el.onload = () => {
        clearTimeout(timeout);
        resolve(el);
      };
      el.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Image load failed'));
      };
      el.src = photoUrl;
    });

    const sizePx = 220;
    const canvas = document.createElement('canvas');
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sizePx, sizePx);

    // Center-crop to square so portrait aspect ratios never stretch in Word
    const minSide = Math.min(img.naturalWidth || sizePx, img.naturalHeight || sizePx);
    const sx = Math.max(0, ((img.naturalWidth || sizePx) - minSide) / 2);
    const sy = Math.max(0, ((img.naturalHeight || sizePx) - minSide) / 2);
    ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, sizePx, sizePx);

    const dataUrl = canvas.toDataURL('image/png');
    const base64Part = dataUrl.split(',')[1];
    if (!base64Part) return null;

    const binary = atob(base64Part);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

interface InlineRunStyle {
  font: string;
  size: number;
  color: string;
}

/**
 * Parses lightweight inline formatting (`**bold**`, `*italic*`, `<u>underline</u>`)
 * from builder text fields into native Microsoft Word TextRuns.
 */
function parseFormattedRuns(rawText: string, style: InlineRunStyle): TextRun[] {
  const cleaned = rawText.replace(/\r\n/g, '\n');
  const tokenRegex = /(\*\*[^*]+\*\*|<u>[\s\S]+?<\/u>|\*[^*\n]+\*)/g;
  const parts = cleaned.split(tokenRegex).filter((p) => p.length > 0);

  if (parts.length === 0) {
    return [
      new TextRun({
        text: cleaned,
        font: style.font,
        size: style.size,
        color: style.color,
      }),
    ];
  }

  return parts.map((segment) => {
    if (segment.startsWith('**') && segment.endsWith('**') && segment.length > 4) {
      return new TextRun({
        text: segment.slice(2, -2),
        bold: true,
        font: style.font,
        size: style.size,
        color: style.color,
      });
    }
    if (segment.startsWith('<u>') && segment.endsWith('</u>') && segment.length > 7) {
      return new TextRun({
        text: segment.slice(3, -4),
        underline: { type: UnderlineType.SINGLE },
        font: style.font,
        size: style.size,
        color: style.color,
      });
    }
    if (segment.startsWith('*') && segment.endsWith('*') && segment.length > 2) {
      return new TextRun({
        text: segment.slice(1, -1),
        italics: true,
        font: style.font,
        size: style.size,
        color: style.color,
      });
    }
    return new TextRun({
      text: segment,
      font: style.font,
      size: style.size,
      color: style.color,
    });
  });
}

function formatDateSpan(start?: string, end?: string, isCurrent?: boolean): string {
  const s = (start || '').trim();
  const e = isCurrent ? 'Present' : (end || '').trim();
  if (s && e) return `${s} – ${e}`;
  return s || e || '';
}

function buildContactMetadataParts(cv: CV): string[] {
  const p = cv.personal;
  const items: string[] = [];
  if (p.location?.trim()) items.push(p.location.trim());
  if (p.phone?.trim()) items.push(p.phone.trim());
  if (p.email?.trim()) items.push(p.email.trim());
  if (p.linkedin?.trim()) items.push(p.linkedin.trim());
  if (p.website?.trim()) items.push(p.website.trim());
  if (p.nationality?.trim()) items.push(`Nationality: ${p.nationality.trim()}`);
  if (p.drivingLicence?.trim()) items.push(`Licence: ${p.drivingLicence.trim()}`);
  if (p.dateOfBirth?.trim()) items.push(`DOB: ${p.dateOfBirth.trim()}`);
  return items;
}

function createSectionHeading(
  title: string,
  font: string,
  scale: DocxTypographyScale,
  accentHex: string,
  templateId: string,
  pageBreakBefore: boolean = false
): Paragraph {
  const isClassic = templateId === 'uk-traditional' || templateId === 'classic-corporate';
  const isMinimal = templateId === 'minimal-clean';

  return new Paragraph({
    spacing: { before: 220, after: 100 },
    keepNext: true,
    pageBreakBefore,
    border: isMinimal
      ? undefined
      : {
          bottom: {
            color: isClassic ? accentHex : 'CBD5E1',
            space: 4,
            style: BorderStyle.SINGLE,
            size: isClassic ? 8 : 4,
          },
        },
    children: [
      new TextRun({
        text: isMinimal ? title : title.toUpperCase(),
        bold: true,
        font,
        size: scale.sectionSize,
        color: templateId === 'uk-traditional' ? '0F172A' : accentHex,
        characterSpacing: isMinimal ? 8 : 22,
      }),
    ],
  });
}

function createBulletParagraph(
  text: string,
  font: string,
  scale: DocxTypographyScale,
  textColor: string = '1E293B'
): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 55, line: scale.lineSpacing },
    children: parseFormattedRuns(text, {
      font,
      size: scale.bodySize,
      color: textColor,
    }),
  });
}

function buildSectionBlocks(
  secKey: string,
  cv: CV,
  font: string,
  scale: DocxTypographyScale,
  accentHex: string,
  rightTabTwip: number
): (Paragraph | Table)[] {
  const blocks: (Paragraph | Table)[] = [];
  const templateId = cv.settings.templateId || 'hopkins';

  if (secKey === 'statement' || secKey === 'summary') {
    const raw = (cv.personalStatement || '').trim();
    if (!raw) return blocks;

    blocks.push(
      createSectionHeading('Professional Summary', font, scale, accentHex, templateId)
    );

    const paragraphs = raw
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    for (const paraText of paragraphs) {
      const lines = paraText.split('\n').map((l) => l.trim()).filter(Boolean);
      const isBulletBlock = lines.length > 1 && lines.every((l) => /^[•\-*]/.test(l));
      if (isBulletBlock) {
        for (const bl of lines) {
          blocks.push(
            createBulletParagraph(bl.replace(/^[•\-*]\s*/, ''), font, scale)
          );
        }
      } else {
        blocks.push(
          new Paragraph({
            spacing: { after: 90, line: scale.lineSpacing },
            children: parseFormattedRuns(paraText.replace(/\n+/g, ' '), {
              font,
              size: scale.bodySize,
              color: '1E293B',
            }),
          })
        );
      }
    }
    return blocks;
  }

  if (secKey === 'experience') {
    if (!cv.experience || cv.experience.length === 0) return blocks;
    const allowDocxPageBreak = templateId !== 'toronto';
    blocks.push(
      createSectionHeading(
        'Work Experience',
        font,
        scale,
        accentHex,
        templateId,
        allowDocxPageBreak && Boolean(cv.experience[0]?.forceNewPage)
      )
    );

    cv.experience.forEach((exp, idx) => {
      const dateLabel = formatDateSpan(exp.startDate, exp.endDate, exp.current);
      const companyLoc = [exp.company, exp.location].filter(Boolean).join(', ');

      blocks.push(
        new Paragraph({
          spacing: { before: idx === 0 ? 40 : 140, after: 30 },
          keepNext: true,
          pageBreakBefore: allowDocxPageBreak && idx > 0 && Boolean(exp.forceNewPage),
          tabStops: [{ type: TabStopType.RIGHT, position: rightTabTwip }],
          children: [
            new TextRun({
              text: exp.role || 'Role Title',
              bold: true,
              font,
              size: scale.subHeadingSize,
              color: '0F172A',
            }),
            ...(dateLabel
              ? [
                  new TextRun({
                    text: `\t${dateLabel}`,
                    font,
                    size: scale.metaSize,
                    color: '475569',
                    bold: true,
                  }),
                ]
              : []),
          ],
        })
      );

      if (companyLoc) {
        blocks.push(
          new Paragraph({
            spacing: { after: 55 },
            keepNext: (exp.bullets?.length || 0) > 0,
            children: [
              new TextRun({
                text: companyLoc,
                font,
                size: scale.bodySize,
                color: accentHex,
                italics: templateId === 'uk-traditional' || templateId === 'classic-corporate',
                bold: templateId !== 'uk-traditional',
              }),
            ],
          })
        );
      }

      if (exp.bullets && exp.bullets.length > 0) {
        for (const bullet of exp.bullets) {
          if (bullet.trim()) {
            blocks.push(createBulletParagraph(bullet.trim(), font, scale));
          }
        }
      } else if (exp.description?.trim()) {
        blocks.push(
          new Paragraph({
            spacing: { after: 70, line: scale.lineSpacing },
            children: parseFormattedRuns(exp.description.trim(), {
              font,
              size: scale.bodySize,
              color: '1E293B',
            }),
          })
        );
      }
    });

    return blocks;
  }

  if (secKey === 'education') {
    if (!cv.education || cv.education.length === 0) return blocks;
    const allowDocxPageBreak = templateId !== 'toronto';
    blocks.push(
      createSectionHeading(
        'Education & Qualifications',
        font,
        scale,
        accentHex,
        templateId,
        allowDocxPageBreak && Boolean(cv.education[0]?.forceNewPage)
      )
    );

    cv.education.forEach((edu, idx) => {
      const dateLabel = formatDateSpan(edu.startDate, edu.endDate, false);
      const schoolLoc = [edu.institution, edu.location].filter(Boolean).join(', ');
      const qualWithGrade = edu.grade?.trim()
        ? `${edu.qualification} (${edu.grade.trim()})`
        : edu.qualification;

      blocks.push(
        new Paragraph({
          spacing: { before: idx === 0 ? 40 : 130, after: 30 },
          keepNext: true,
          pageBreakBefore: allowDocxPageBreak && idx > 0 && Boolean(edu.forceNewPage),
          tabStops: [{ type: TabStopType.RIGHT, position: rightTabTwip }],
          children: [
            new TextRun({
              text: qualWithGrade || 'Qualification',
              bold: true,
              font,
              size: scale.subHeadingSize,
              color: '0F172A',
            }),
            ...(dateLabel
              ? [
                  new TextRun({
                    text: `\t${dateLabel}`,
                    font,
                    size: scale.metaSize,
                    color: '475569',
                    bold: true,
                  }),
                ]
              : []),
          ],
        })
      );

      if (schoolLoc) {
        blocks.push(
          new Paragraph({
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: schoolLoc,
                font,
                size: scale.bodySize,
                color: accentHex,
                bold: true,
              }),
            ],
          })
        );
      }

      if (edu.bullets && edu.bullets.length > 0) {
        for (const bullet of edu.bullets) {
          if (bullet.trim()) {
            blocks.push(createBulletParagraph(bullet.trim(), font, scale));
          }
        }
      } else if (edu.description?.trim()) {
        blocks.push(
          new Paragraph({
            spacing: { after: 65, line: scale.lineSpacing },
            children: parseFormattedRuns(edu.description.trim(), {
              font,
              size: scale.bodySize,
              color: '334155',
            }),
          })
        );
      }
    });

    return blocks;
  }

  if (secKey === 'skills') {
    const allSkills = (cv.skills || []).flatMap((g) => g.items).filter(Boolean);
    if (allSkills.length === 0) return blocks;

    blocks.push(
      createSectionHeading('Key Skills & Competencies', font, scale, accentHex, templateId)
    );

    // Format in a clean 2-column borderless Word grid for crisp visual alignment & ATS readability
    const rows: TableRow[] = [];
    for (let i = 0; i < allSkills.length; i += 2) {
      const leftSkill = allSkills[i];
      const rightSkill = allSkills[i + 1];
      const leftLevel = cv.skillLevels?.[leftSkill];
      const rightLevel = rightSkill ? cv.skillLevels?.[rightSkill] : undefined;

      rows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_TABLE_BORDERS,
              margins: { top: 35, bottom: 35, left: 0, right: 120 },
              children: [
                new Paragraph({
                  spacing: { after: 0 },
                  children: [
                    new TextRun({
                      text: `• ${leftSkill}`,
                      bold: true,
                      font,
                      size: scale.bodySize,
                      color: '0F172A',
                    }),
                    ...(leftLevel
                      ? [
                          new TextRun({
                            text: `  (${leftLevel})`,
                            font,
                            size: scale.metaSize,
                            color: '64748B',
                          }),
                        ]
                      : []),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: NO_TABLE_BORDERS,
              margins: { top: 35, bottom: 35, left: 120, right: 0 },
              children: rightSkill
                ? [
                    new Paragraph({
                      spacing: { after: 0 },
                      children: [
                        new TextRun({
                          text: `• ${rightSkill}`,
                          bold: true,
                          font,
                          size: scale.bodySize,
                          color: '0F172A',
                        }),
                        ...(rightLevel
                          ? [
                              new TextRun({
                                text: `  (${rightLevel})`,
                                font,
                                size: scale.metaSize,
                                color: '64748B',
                              }),
                            ]
                          : []),
                      ],
                    }),
                  ]
                : [new Paragraph({ children: [] })],
            }),
          ],
        })
      );
    }

    blocks.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: NO_TABLE_BORDERS,
        rows,
      })
    );

    return blocks;
  }

  if (secKey === 'projects') {
    if (!cv.projects || cv.projects.length === 0) return blocks;
    blocks.push(createSectionHeading('Key Projects', font, scale, accentHex, templateId));

    cv.projects.forEach((proj, idx) => {
      blocks.push(
        new Paragraph({
          spacing: { before: idx === 0 ? 40 : 120, after: 35 },
          keepNext: true,
          tabStops: [{ type: TabStopType.RIGHT, position: rightTabTwip }],
          children: [
            new TextRun({
              text: proj.title || 'Project',
              bold: true,
              font,
              size: scale.subHeadingSize,
              color: '0F172A',
            }),
            ...(proj.role
              ? [
                  new TextRun({
                    text: ` — ${proj.role}`,
                    font,
                    size: scale.bodySize,
                    color: accentHex,
                    bold: true,
                  }),
                ]
              : []),
            ...(proj.link
              ? [
                  new TextRun({
                    text: `\t${proj.link}`,
                    font,
                    size: scale.metaSize,
                    color: '475569',
                  }),
                ]
              : []),
          ],
        })
      );

      if (proj.bullets && proj.bullets.length > 0) {
        for (const b of proj.bullets) {
          if (b.trim()) {
            blocks.push(createBulletParagraph(b.trim(), font, scale));
          }
        }
      } else if (proj.description?.trim()) {
        blocks.push(
          new Paragraph({
            spacing: { after: 65, line: scale.lineSpacing },
            children: parseFormattedRuns(proj.description.trim(), {
              font,
              size: scale.bodySize,
              color: '1E293B',
            }),
          })
        );
      }
    });

    return blocks;
  }

  if (secKey === 'certifications') {
    if (!cv.certifications || cv.certifications.length === 0) return blocks;
    blocks.push(
      createSectionHeading('Certifications & Licences', font, scale, accentHex, templateId)
    );
    for (const cert of cv.certifications) {
      if (cert.trim()) {
        blocks.push(createBulletParagraph(cert.trim(), font, scale));
      }
    }
    return blocks;
  }

  if (secKey === 'languages') {
    if (!cv.languages || cv.languages.length === 0) return blocks;
    blocks.push(createSectionHeading('Languages', font, scale, accentHex, templateId));

    const runs: TextRun[] = [];
    cv.languages.forEach((lang, idx) => {
      if (idx > 0) {
        runs.push(
          new TextRun({
            text: '   •   ',
            font,
            size: scale.bodySize,
            color: '94A3B8',
          })
        );
      }
      runs.push(
        new TextRun({
          text: lang.name,
          bold: true,
          font,
          size: scale.bodySize,
          color: '0F172A',
        })
      );
      if (lang.level) {
        runs.push(
          new TextRun({
            text: ` (${lang.level})`,
            font,
            size: scale.bodySize,
            color: '475569',
          })
        );
      }
    });

    blocks.push(
      new Paragraph({
        spacing: { after: 80, line: scale.lineSpacing },
        children: runs,
      })
    );
    return blocks;
  }

  if (secKey === 'awards') {
    if (!cv.awards || cv.awards.length === 0) return blocks;
    blocks.push(createSectionHeading('Honours & Awards', font, scale, accentHex, templateId));
    for (const award of cv.awards) {
      if (award.trim()) {
        blocks.push(createBulletParagraph(award.trim(), font, scale));
      }
    }
    return blocks;
  }

  if (secKey === 'interests') {
    if (!cv.interests || cv.interests.length === 0) return blocks;
    blocks.push(
      createSectionHeading('Interests & Activities', font, scale, accentHex, templateId)
    );
    blocks.push(
      new Paragraph({
        spacing: { after: 80, line: scale.lineSpacing },
        children: [
          new TextRun({
            text: cv.interests.join('  •  '),
            font,
            size: scale.bodySize,
            color: '1E293B',
          }),
        ],
      })
    );
    return blocks;
  }

  if (secKey === 'custom') {
    if (!cv.customSections || cv.customSections.length === 0) return blocks;
    for (const cs of cv.customSections) {
      blocks.push(
        createSectionHeading(
          cs.title || 'Additional Information',
          font,
          scale,
          accentHex,
          templateId
        )
      );
      if (cs.bullets && cs.bullets.length > 0) {
        for (const b of cs.bullets) {
          if (b.trim()) {
            blocks.push(createBulletParagraph(b.trim(), font, scale));
          }
        }
      } else if (cs.content?.trim()) {
        blocks.push(
          new Paragraph({
            spacing: { after: 75, line: scale.lineSpacing },
            children: parseFormattedRuns(cs.content.trim(), {
              font,
              size: scale.bodySize,
              color: '1E293B',
            }),
          })
        );
      }
    }
    return blocks;
  }

  if (secKey === 'references') {
    if (!cv.references?.trim()) return blocks;
    blocks.push(createSectionHeading('References', font, scale, accentHex, templateId));
    blocks.push(
      new Paragraph({
        spacing: { after: 80, line: scale.lineSpacing },
        children: parseFormattedRuns(cv.references.trim(), {
          font,
          size: scale.bodySize,
          color: '334155',
        }),
      })
    );
    return blocks;
  }

  return blocks;
}

/**
 * Builds the Header + Ordered Body for Single-Column Word layouts
 * (Executive Hopkins, London Corporate, Oxford Minimal, Yale Tech, Cambridge Graduate, Westminster Traditional).
 */
function buildSingleColumnDocChildren(
  cv: CV,
  font: string,
  scale: DocxTypographyScale,
  accentHex: string,
  contentWidthTwip: number,
  portraitBytes: Uint8Array | null
): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  const templateId = cv.settings.templateId || 'hopkins';
  const contactItems = buildContactMetadataParts(cv);
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = (cv.personal.jobTitle || '').trim();

  if (templateId === 'hopkins') {
    // Executive shaded header band matching Hopkins template
    const onAccent = getContrastHexOnFill(accentHex);

    const textParagraphs: Paragraph[] = [
      new Paragraph({
        spacing: { after: jobTitle ? 45 : 80 },
        children: [
          new TextRun({
            text: fullName,
            bold: true,
            font,
            size: scale.nameSize,
            color: onAccent.primary,
          }),
        ],
      }),
    ];

    if (jobTitle) {
      textParagraphs.push(
        new Paragraph({
          spacing: { after: contactItems.length > 0 ? 85 : 0 },
          children: [
            new TextRun({
              text: jobTitle.toUpperCase(),
              bold: true,
              font,
              size: scale.metaSize + 2,
              color: onAccent.secondary,
              characterSpacing: 20,
            }),
          ],
        })
      );
    }

    if (contactItems.length > 0) {
      textParagraphs.push(
        new Paragraph({
          spacing: { after: 0, line: 250 },
          children: [
            new TextRun({
              text: contactItems.join('  •  '),
              font,
              size: scale.metaSize,
              color: onAccent.secondary,
            }),
          ],
        })
      );
    }

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: NO_TABLE_BORDERS,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: portraitBytes ? 80 : 100, type: WidthType.PERCENTAGE },
                shading: { type: ShadingType.CLEAR, color: 'auto', fill: accentHex },
                verticalAlign: VerticalAlign.CENTER,
                borders: NO_TABLE_BORDERS,
                margins: { top: 240, bottom: 240, left: 260, right: portraitBytes ? 120 : 260 },
                children: textParagraphs,
              }),
              ...(portraitBytes
                ? [
                    new TableCell({
                      width: { size: 20, type: WidthType.PERCENTAGE },
                      shading: { type: ShadingType.CLEAR, color: 'auto', fill: accentHex },
                      verticalAlign: VerticalAlign.CENTER,
                      borders: NO_TABLE_BORDERS,
                      margins: { top: 200, bottom: 200, left: 60, right: 240 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [
                            new ImageRun({
                              type: 'png',
                              data: portraitBytes,
                              transformation: { width: 74, height: 74 },
                            }),
                          ],
                        }),
                      ],
                    }),
                  ]
                : []),
            ],
          }),
        ],
      })
    );
  } else if (templateId === 'uk-traditional') {
    // Centered classic Westminster header
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: jobTitle ? 45 : 70 },
        children: [
          new TextRun({
            text: fullName.toUpperCase(),
            bold: true,
            font,
            size: scale.nameSize - 2,
            color: '0F172A',
            characterSpacing: 24,
          }),
        ],
      })
    );

    if (jobTitle) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 65 },
          children: [
            new TextRun({
              text: jobTitle,
              italics: true,
              font,
              size: scale.roleSize - 1,
              color: '334155',
            }),
          ],
        })
      );
    }

    if (contactItems.length > 0) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 140 },
          border: {
            bottom: {
              color: '0F172A',
              space: 8,
              style: BorderStyle.SINGLE,
              size: 10,
            },
          },
          children: [
            new TextRun({
              text: contactItems.join('  |  '),
              font,
              size: scale.metaSize,
              color: '475569',
            }),
          ],
        })
      );
    }
  } else {
    // Corporate / Minimal / Technical / Graduate clean header (with optional portrait for London corporate)
    const headerParas: Paragraph[] = [
      new Paragraph({
        spacing: { after: jobTitle ? 40 : 65 },
        children: [
          new TextRun({
            text: fullName,
            bold: true,
            font,
            size: scale.nameSize,
            color: '0F172A',
          }),
        ],
      }),
    ];

    if (jobTitle) {
      headerParas.push(
        new Paragraph({
          spacing: { after: contactItems.length > 0 ? 65 : 80 },
          children: [
            new TextRun({
              text: jobTitle,
              bold: true,
              font,
              size: scale.roleSize,
              color: accentHex,
            }),
          ],
        })
      );
    }

    if (contactItems.length > 0) {
      headerParas.push(
        new Paragraph({
          spacing: { after: 90, line: 245 },
          children: [
            new TextRun({
              text: contactItems.join('  •  '),
              font,
              size: scale.metaSize,
              color: '475569',
            }),
          ],
        })
      );
    }

    if (portraitBytes) {
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            ...NO_TABLE_BORDERS,
            bottom: {
              style: BorderStyle.SINGLE,
              size: 10,
              color: accentHex,
            },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 82, type: WidthType.PERCENTAGE },
                  borders: NO_TABLE_BORDERS,
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 0, bottom: 140, left: 0, right: 120 },
                  children: headerParas,
                }),
                new TableCell({
                  width: { size: 18, type: WidthType.PERCENTAGE },
                  borders: NO_TABLE_BORDERS,
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 0, bottom: 140, left: 60, right: 0 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [
                        new ImageRun({
                          type: 'png',
                          data: portraitBytes,
                          transformation: { width: 72, height: 72 },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
    } else {
      children.push(...headerParas);
      children.push(
        new Paragraph({
          spacing: { after: 80 },
          border: {
            bottom: {
              color: accentHex,
              space: 4,
              style: BorderStyle.SINGLE,
              size: 10,
            },
          },
          children: [],
        })
      );
    }
  }

  const orderedSections =
    cv.settings.sectionOrder && cv.settings.sectionOrder.length > 0
      ? cv.settings.sectionOrder
      : [
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

  for (const secKey of orderedSections) {
    const secBlocks = buildSectionBlocks(
      secKey,
      cv,
      font,
      scale,
      accentHex,
      contentWidthTwip
    );
    children.push(...secBlocks);
  }

  return children;
}

/**
 * Builds a Two-Column Sidebar Word layout matching the Toronto template
 * using a clean, borderless Word Table with tinted sidebar shading.
 */
function buildTwoColumnTorontoChildren(
  cv: CV,
  font: string,
  scale: DocxTypographyScale,
  accentHex: string,
  contentWidthTwip: number,
  portraitBytes: Uint8Array | null
): (Paragraph | Table)[] {
  const sidebarTintHex = tintHexWithWhite(accentHex, 0.91);
  const sidebarKeys = new Set([
    'skills',
    'education',
    'languages',
    'certifications',
    'interests',
  ]);

  const ordered =
    cv.settings.sectionOrder && cv.settings.sectionOrder.length > 0
      ? cv.settings.sectionOrder
      : [
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

  const sidebarChildren: (Paragraph | Table)[] = [];
  const mainChildren: (Paragraph | Table)[] = [];

  if (portraitBytes) {
    sidebarChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [
          new ImageRun({
            type: 'png',
            data: portraitBytes,
            transformation: { width: 84, height: 84 },
          }),
        ],
      })
    );
  }

  // Contact Details in Sidebar
  const contactItems = buildContactMetadataParts(cv);
  if (contactItems.length > 0) {
    sidebarChildren.push(
      createSectionHeading('Contact', font, scale, accentHex, 'toronto')
    );
    for (const item of contactItems) {
      sidebarChildren.push(
        new Paragraph({
          spacing: { after: 55, line: 245 },
          children: [
            new TextRun({
              text: item,
              font,
              size: scale.metaSize,
              color: '1E293B',
            }),
          ],
        })
      );
    }
  }

  const sidebarTabTwip = Math.round(contentWidthTwip * 0.31);
  const mainTabTwip = Math.round(contentWidthTwip * 0.63);

  // Main column top header: Candidate Name & Job Title
  mainChildren.push(
    new Paragraph({
      spacing: { after: cv.personal.jobTitle ? 40 : 100 },
      children: [
        new TextRun({
          text: cv.personal.fullName || 'Your Name',
          bold: true,
          font,
          size: scale.nameSize,
          color: '0F172A',
        }),
      ],
    })
  );

  if (cv.personal.jobTitle?.trim()) {
    mainChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        border: {
          bottom: {
            color: accentHex,
            space: 6,
            style: BorderStyle.SINGLE,
            size: 10,
          },
        },
        children: [
          new TextRun({
            text: cv.personal.jobTitle.trim().toUpperCase(),
            bold: true,
            font,
            size: scale.metaSize + 2,
            color: accentHex,
            characterSpacing: 18,
          }),
        ],
      })
    );
  }

  for (const secKey of ordered) {
    if (sidebarKeys.has(secKey)) {
      if (secKey === 'skills') {
        const allSkills = (cv.skills || []).flatMap((g) => g.items).filter(Boolean);
        if (allSkills.length > 0) {
          sidebarChildren.push(
            createSectionHeading('Skills', font, scale, accentHex, 'toronto')
          );
          for (const sk of allSkills) {
            const lvl = cv.skillLevels?.[sk];
            sidebarChildren.push(
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({
                    text: `• ${sk}`,
                    bold: true,
                    font,
                    size: scale.metaSize + 1,
                    color: '0F172A',
                  }),
                  ...(lvl
                    ? [
                        new TextRun({
                          text: ` — ${lvl}`,
                          font,
                          size: scale.metaSize,
                          color: '475569',
                        }),
                      ]
                    : []),
                ],
              })
            );
          }
        }
      } else {
        sidebarChildren.push(
          ...buildSectionBlocks(secKey, cv, font, scale, accentHex, sidebarTabTwip)
        );
      }
    } else {
      mainChildren.push(
        ...buildSectionBlocks(secKey, cv, font, scale, accentHex, mainTabTwip)
      );
    }
  }

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: NO_TABLE_BORDERS,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 34, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: sidebarTintHex },
              borders: NO_TABLE_BORDERS,
              margins: { top: 200, bottom: 220, left: 180, right: 180 },
              children:
                sidebarChildren.length > 0
                  ? sidebarChildren
                  : [new Paragraph({ children: [] })],
            }),
            new TableCell({
              width: { size: 66, type: WidthType.PERCENTAGE },
              borders: NO_TABLE_BORDERS,
              margins: { top: 160, bottom: 220, left: 240, right: 80 },
              children: mainChildren,
            }),
          ],
        }),
      ],
    }),
  ];
}

function triggerDocxBlobDownload(blob: Blob, sanitizedFileName: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const blobUrl = URL.createObjectURL(blob);

    if (previousDocxBlobUrl) {
      const staleUrl = previousDocxBlobUrl;
      setTimeout(() => {
        try {
          URL.revokeObjectURL(staleUrl);
        } catch {
          // Ignore revoke errors
        }
      }, 60000);
    }
    previousDocxBlobUrl = blobUrl;

    window.dispatchEvent(
      new CustomEvent('applet-docx-blob-ready', {
        detail: { blobUrl, fileName: sanitizedFileName },
      })
    );

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
    console.error('DOCX blob download trigger error:', err);
    return false;
  }
}

/**
 * Generates and downloads an editable, ATS-compatible Microsoft Word (.docx) CV
 * mapped directly from the CV store's content, section order, typography, and theme styling.
 */
export async function downloadCvDocx(options: ExportDocxOptions = {}): Promise<boolean> {
  if (isGeneratingDocx) return false;
  isGeneratingDocx = true;

  try {
    options.onProgress?.('Preparing Word document...');
    await waitNextFrame();

    const cv: CV = applyDateFormatToCv(options.cv ?? cvStoreToCv(useCvStore.getState()));
    const sanitizedFileName = sanitizeDocxFileName(options.fileName, cv.personal.fullName);

    const templateDef = getTemplateById(cv.settings.templateId);
    const font = WORD_FONT_MAP[cv.settings.fontFamily || 'jakarta'] || 'Segoe UI';
    const scale = SCALE_MAP[cv.settings.fontScale || 'md'] || SCALE_MAP.md;
    const accentHex = normalizeHex6(
      cv.settings.accentColor,
      cv.settings.templateId === 'uk-traditional' ? '0F172A' : '1E3A8A'
    );

    let portraitBytes: Uint8Array | null = null;
    if (cv.settings.showPhoto && cv.personal.photoUrl && templateDef.supportsPhoto) {
      options.onProgress?.('Formatting portrait image...');
      portraitBytes = await loadPortraitPngBytes(cv.personal.photoUrl);
    }

    const isTwoColumn = cv.settings.templateId === 'toronto';
    const isCompact = cv.settings.templateId === 'yale';
    const marginMm = isTwoColumn ? 13 : isCompact ? 14 : 16;

    const pageWidthTwip = convertMillimetersToTwip(210);
    const pageHeightTwip = convertMillimetersToTwip(297);
    const marginTwip = convertMillimetersToTwip(marginMm);
    const contentWidthTwip = pageWidthTwip - marginTwip * 2;

    options.onProgress?.('Building .docx layout...');

    const sectionChildren = isTwoColumn
      ? buildTwoColumnTorontoChildren(
          cv,
          font,
          scale,
          accentHex,
          contentWidthTwip,
          portraitBytes
        )
      : buildSingleColumnDocChildren(
          cv,
          font,
          scale,
          accentHex,
          contentWidthTwip,
          portraitBytes
        );

    const doc = new Document({
      creator: 'freecvmakeruk.co.uk',
      title: `${cv.personal.fullName || 'Candidate'} — Curriculum Vitae`,
      description: `Curriculum Vitae (${templateDef.name} style)`,
      styles: {
        default: {
          document: {
            run: {
              font,
              size: scale.bodySize,
              color: '1E293B',
              bold: Boolean(
                cv.settings.fontBoldness?.enabled && cv.settings.fontBoldness?.sectionText
              ),
            },
            paragraph: {
              spacing: { line: scale.lineSpacing },
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                width: pageWidthTwip,
                height: pageHeightTwip,
              },
              margin: {
                top: marginTwip,
                bottom: marginTwip,
                left: marginTwip,
                right: marginTwip,
              },
            },
          },
          children: sectionChildren,
        },
      ],
    });

    options.onProgress?.('Saving Word (.docx)...');
    const rawBlob = await Packer.toBlob(doc);
    const typedBlob = new Blob([rawBlob], { type: DOCX_MIME_TYPE });

    const ok = triggerDocxBlobDownload(typedBlob, sanitizedFileName);
    if (ok) {
      options.onProgress?.('Word (.docx) downloaded!');
    }
    return ok;
  } catch (err) {
    console.error('Failed to generate Word (.docx) CV:', err);
    return false;
  } finally {
    isGeneratingDocx = false;
  }
}
