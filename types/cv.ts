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
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface SkillGroup {
  group?: string;
  items: string[];
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  link?: string;
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
  certifications: string[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  volunteering: VolunteeringItem[];
  interests: string[];
  references: string; // Default: "References available on request"
  settings: CvSettings;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  bestFor: string;
  supportsPhoto: boolean;
  component: React.ComponentType<{ cv: CV }>;
}
