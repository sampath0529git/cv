import { CV, ProjectItem, CustomSectionItem, SkillProficiency } from '@/types/cv';

export const DEFAULT_TEMPLATE_SECTION_ORDER = [
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

export function resolveTemplateSectionOrder(
  cv: CV,
  fallbackBase: string[] = DEFAULT_TEMPLATE_SECTION_ORDER
): string[] {
  const raw =
    cv.settings.sectionOrder && cv.settings.sectionOrder.length > 0
      ? cv.settings.sectionOrder
      : fallbackBase;

  const mapped = raw.map((k) => (k === 'summary' ? 'statement' : k));
  const combined = [...mapped];

  if (cv.projects && cv.projects.length > 0 && !combined.includes('projects')) {
    combined.push('projects');
  }
  if (cv.certifications && cv.certifications.length > 0 && !combined.includes('certifications')) {
    combined.push('certifications');
  }
  if (cv.awards && cv.awards.length > 0 && !combined.includes('awards')) {
    combined.push('awards');
  }
  if (cv.customSections && cv.customSections.length > 0 && !combined.includes('custom')) {
    combined.push('custom');
  }
  if (cv.references?.trim() && !combined.includes('references')) {
    combined.push('references');
  }

  return Array.from(new Set(combined));
}

export function formatOptionalPersonalMeta(cv: CV): string[] {
  const extras: string[] = [];
  if (cv.personal.dateOfBirth?.trim()) {
    extras.push(`DOB: ${cv.personal.dateOfBirth.trim()}`);
  }
  if (cv.personal.nationality?.trim()) {
    extras.push(cv.personal.nationality.trim());
  }
  if (cv.personal.drivingLicence?.trim()) {
    extras.push(`Licence: ${cv.personal.drivingLicence.trim()}`);
  }
  return extras;
}

export function resolvePaginatedOptionalData(
  cv: CV,
  pageData: any,
  pageIndex: number,
  totalPages: number
): {
  projects: ProjectItem[];
  projectTitle: string;
  certifications: string[];
  awards: string[];
  customSections: CustomSectionItem[];
  references: string;
} {
  const isLastOrSingle = pageIndex === totalPages - 1 || totalPages === 1;

  const projects: ProjectItem[] =
    pageData?.projects !== undefined
      ? pageData.projects
      : isLastOrSingle
      ? cv.projects || []
      : [];

  const certifications: string[] =
    pageData?.showCertifications !== undefined
      ? pageData.showCertifications
        ? pageData.certifications || cv.certifications || []
        : []
      : isLastOrSingle
      ? cv.certifications || []
      : [];

  const awards: string[] =
    pageData?.showAwards !== undefined
      ? pageData.showAwards
        ? pageData.awards || cv.awards || []
        : []
      : isLastOrSingle
      ? cv.awards || []
      : [];

  const customSections: CustomSectionItem[] =
    pageData?.customSections !== undefined
      ? pageData.customSections
      : isLastOrSingle
      ? cv.customSections || []
      : [];

  const references: string =
    pageData?.references !== undefined
      ? pageData.references || ''
      : isLastOrSingle
      ? cv.references || ''
      : '';

  return {
    projects,
    projectTitle: pageData?.projectTitle || 'Key Projects',
    certifications,
    awards,
    customSections,
    references,
  };
}

export function getSkillBarWidth(
  skillName: string,
  idx: number,
  skillLevels?: Record<string, SkillProficiency>
): string {
  const level = skillLevels?.[skillName];
  if (level === 'Expert') return '96%';
  if (level === 'Advanced') return '85%';
  if (level === 'Intermediate') return '68%';
  if (level === 'Beginner') return '50%';
  return idx % 3 === 1 ? '85%' : '95%';
}
