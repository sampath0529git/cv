export type TemplateCategory =
  | 'Classic'
  | 'Modern'
  | 'Minimal'
  | 'Executive'
  | 'Creative-Light'
  | 'Graduate';

export type FontScale = 'sm' | 'md' | 'lg';

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

