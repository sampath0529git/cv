export type TemplateCategory =
  | 'Classic'
  | 'Modern'
  | 'Minimal'
  | 'Executive'
  | 'Creative-Light'
  | 'Graduate';

export type FontScale = 'sm' | 'md' | 'lg';

export type DateFormatOption = 'month-year' | 'year-only' | 'full-date';

export const DEFAULT_DATE_FORMAT: DateFormatOption = 'month-year';

export function normalizeDateFormat(raw?: string | null): DateFormatOption {
  if (raw === 'month-year' || raw === 'year-only' || raw === 'full-date') {
    return raw;
  }
  return DEFAULT_DATE_FORMAT;
}

export type FontBoldnessTarget = 'header' | 'headings' | 'subheadings' | 'sectionText';

export interface FontBoldnessSettings {
  enabled: boolean;
  header: boolean; // Candidate Name & Headline Title in CV Header
  headings: boolean; // Section Headings (e.g. Work Experience, Education, Key Skills)
  subheadings: boolean; // Role Titles, Employers, Qualifications & Entry Subheadings
  sectionText: boolean; // Section Body Text (Summary, Bullet Points, Descriptions & Skills)
}

export const DEFAULT_FONT_BOLDNESS: FontBoldnessSettings = {
  enabled: false,
  header: true,
  headings: true,
  subheadings: true,
  sectionText: false,
};

export function normalizeFontBoldness(
  raw?: Partial<FontBoldnessSettings> | null
): FontBoldnessSettings {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_FONT_BOLDNESS };
  }
  return {
    enabled: Boolean(raw.enabled),
    header: raw.header !== undefined ? Boolean(raw.header) : DEFAULT_FONT_BOLDNESS.header,
    headings: raw.headings !== undefined ? Boolean(raw.headings) : DEFAULT_FONT_BOLDNESS.headings,
    subheadings:
      raw.subheadings !== undefined ? Boolean(raw.subheadings) : DEFAULT_FONT_BOLDNESS.subheadings,
    sectionText:
      raw.sectionText !== undefined ? Boolean(raw.sectionText) : DEFAULT_FONT_BOLDNESS.sectionText,
  };
}

export interface PdfExportSettings {
  includeHyperlinks: boolean; // Embed clickable mailto:, LinkedIn, portfolio & project links in PDF
  compressImages: boolean; // Compress embedded photos & raster encoding to reduce final PDF file size
}

export const DEFAULT_PDF_EXPORT_SETTINGS: PdfExportSettings = {
  includeHyperlinks: true,
  compressImages: false,
};

export function normalizePdfExportSettings(
  raw?: Partial<PdfExportSettings> | null
): PdfExportSettings {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PDF_EXPORT_SETTINGS };
  }
  return {
    includeHyperlinks:
      raw.includeHyperlinks !== undefined
        ? Boolean(raw.includeHyperlinks)
        : DEFAULT_PDF_EXPORT_SETTINGS.includeHyperlinks,
    compressImages:
      raw.compressImages !== undefined
        ? Boolean(raw.compressImages)
        : DEFAULT_PDF_EXPORT_SETTINGS.compressImages,
  };
}

export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string; // City / County only, UK format (e.g., Manchester, Greater Manchester)
  linkedin?: string;
  website?: string;
  photoUrl?: string; // Optional, off by default
  dateOfBirth?: string;
  nationality?: string;
  drivingLicence?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  description?: string;
  forceNewPage?: boolean;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade?: string;
  location?: string;
  description?: string;
  bullets?: string[];
  forceNewPage?: boolean;
}

export interface SkillGroup {
  group?: string;
  items: string[];
}

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ProjectItem {
  id?: string;
  title: string;
  role?: string;
  description: string;
  link?: string;
  technologies?: string[];
  bullets?: string[];
}

export interface LanguageItem {
  name: string;
  level: string; // e.g. Native, Fluent, Professional Working, Intermediate
}

export interface VolunteeringItem {
  id?: string;
  role: string;
  organisation: string;
  date?: string;
  description?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content?: string;
  bullets?: string[];
}

export interface CvSettings {
  templateId: string;
  accentColor: string; // Hex color e.g. #1E3A8A
  fontFamily: string; // e.g. 'inter', 'merriweather', 'roboto', 'lora', 'jakarta', 'mono'
  fontScale: FontScale; // 'sm' | 'md' | 'lg'
  dateFormat?: DateFormatOption; // UK CV date format ('month-year' | 'year-only' | 'full-date')
  letterSpacing?: number; // Character spacing offset in px (e.g. -0.5 to 2.0, default 0)
  fontBoldness?: FontBoldnessSettings; // Granular bold emphasis toggle for headings & section text
  pdfExportSettings?: PdfExportSettings; // PDF export hyperlink & image compression preferences
  showPhoto: boolean; // false by default per UK convention
  sectionOrder: string[]; // Order of sections e.g. ['statement', 'experience', 'education', 'skills', ...]
}

export interface CV {
  personal: PersonalDetails;
  personalStatement: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  skillLevels?: Record<string, SkillProficiency>;
  certifications: string[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  volunteering: VolunteeringItem[];
  interests: string[];
  awards?: string[];
  customSections?: CustomSectionItem[];
  references: string; // Empty when hidden, or e.g. "References available on request"
  settings: CvSettings;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  bestFor: string;
  supportsPhoto: boolean;
  component: React.ComponentType<{
    cv: CV;
    pageData?: any;
    pageIndex?: number;
    totalPages?: number;
  }>;
}

// Strict ISO 216 A4 Document Dimensions (210mm × 297mm, 1 : √2 aspect ratio)
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;
export const A4_ASPECT_RATIO = A4_HEIGHT_MM / A4_WIDTH_MM; // ~1.4142857
export const A4_WIDTH_PX = 794; // 210mm at standard 96 CSS DPI (793.70px)
export const A4_HEIGHT_PX = 1123; // 297mm at standard 96 CSS DPI (1122.52px)

