import { CV, ExperienceItem, EducationItem, SkillGroup, ProjectItem, LanguageItem, VolunteeringItem, CustomSectionItem } from '@/types/cv';

export interface PageContent {
  pageNumber: number;
  totalPages: number;
  showMainHeader: boolean;
  showStatement: boolean;
  statementText?: string;
  experiences: ExperienceItem[];
  experienceTitle?: string;
  educations: EducationItem[];
  educationTitle?: string;
  skills: SkillGroup[];
  showSkills: boolean;
  skillsTitle?: string;
  projects: ProjectItem[];
  projectTitle?: string;
  certifications: string[];
  showCertifications: boolean;
  languages: LanguageItem[];
  showLanguages: boolean;
  awards: string[];
  showAwards: boolean;
  interests: string[];
  showInterests: boolean;
  volunteering: VolunteeringItem[];
  showVolunteering: boolean;
  customSections: CustomSectionItem[];
  references?: string | null;
}

const A4_HEIGHT_PX = 1123;
// 48px top padding + 48px bottom padding + 24px footer + safety cushion
const PAGE_PADDING_VERTICAL = 104;
const BASE_USABLE_HEIGHT = A4_HEIGHT_PX - PAGE_PADDING_VERTICAL; // 1019px
const CONTINUATION_HEADER_HEIGHT = 40;
const ITEM_SAFETY_BUFFER = 14;

/**
 * Calculates realistic item heights based on character counts and typography.
 */
function estimateStatementHeight(text: string, isTwoColumn: boolean): number {
  if (!text.trim()) return 0;
  const charsPerLine = isTwoColumn ? 60 : 76;
  const lines = Math.ceil(text.length / charsPerLine) || 1;
  const titleHeight = 32;
  const lineHeight = 17;
  const margin = 16;
  return titleHeight + (lines * lineHeight) + margin;
}

function estimateExperienceItemHeight(item: ExperienceItem, isTwoColumn: boolean): number {
  const charsPerLine = isTwoColumn ? 56 : 74;
  const headerHeight = 34; // Role + company + dates
  let bulletsHeight = 0;

  if (item.bullets && item.bullets.length > 0) {
    for (const bullet of item.bullets) {
      if (!bullet.trim()) continue;
      const lines = Math.ceil(bullet.length / charsPerLine) || 1;
      bulletsHeight += (lines * 17) + 5;
    }
  } else if (item.description) {
    const lines = Math.ceil(item.description.length / charsPerLine) || 1;
    bulletsHeight += (lines * 17) + 5;
  }

  const marginBottom = 16;
  return headerHeight + bulletsHeight + marginBottom;
}

function estimateEducationItemHeight(item: EducationItem, isTwoColumn: boolean): number {
  const charsPerLine = isTwoColumn ? 56 : 74;
  const headerHeight = 32; // Qualification + institution + dates
  let descHeight = 0;

  if (item.bullets && item.bullets.length > 0) {
    for (const b of item.bullets) {
      const lines = Math.ceil(b.length / charsPerLine) || 1;
      descHeight += (lines * 16) + 4;
    }
  } else if (item.description) {
    const lines = Math.ceil(item.description.length / charsPerLine) || 1;
    descHeight += (lines * 16) + 4;
  }

  const marginBottom = 14;
  return headerHeight + descHeight + marginBottom;
}

function estimateSkillsHeight(skills: SkillGroup[]): number {
  if (!skills || skills.length === 0) return 0;
  const titleHeight = 32;
  const totalItems = skills.reduce((acc, g) => acc + (g.items?.length || 0), 0);
  const rows = Math.ceil(totalItems / 4) || 1;
  return titleHeight + (rows * 26) + 14;
}

function estimateProjectsHeight(projects: ProjectItem[]): number {
  if (!projects || projects.length === 0) return 0;
  const titleHeight = 32;
  const itemHeight = 48;
  return titleHeight + (projects.length * itemHeight) + 12;
}

function estimateCertificationsHeight(certs: string[]): number {
  if (!certs || certs.length === 0) return 0;
  const titleHeight = 32;
  return titleHeight + (certs.length * 18) + 12;
}

function estimateLanguagesHeight(langs: LanguageItem[]): number {
  if (!langs || langs.length === 0) return 0;
  const titleHeight = 32;
  return titleHeight + (langs.length * 18) + 12;
}

function estimateAwardsHeight(awards: string[]): number {
  if (!awards || awards.length === 0) return 0;
  const titleHeight = 32;
  return titleHeight + (awards.length * 18) + 12;
}

function createEmptyPage(pageNumber: number, showMainHeader: boolean): PageContent {
  return {
    pageNumber,
    totalPages: 1,
    showMainHeader,
    showStatement: false,
    experiences: [],
    educations: [],
    skills: [],
    showSkills: false,
    projects: [],
    certifications: [],
    showCertifications: false,
    languages: [],
    showLanguages: false,
    awards: [],
    showAwards: false,
    interests: [],
    showInterests: false,
    volunteering: [],
    showVolunteering: false,
    customSections: [],
    references: null,
  };
}

/**
 * Smart A4 Multi-Page Paginator
 * Splits a CV object across A4 pages without cutting headings or spliting entries inappropriately.
 */
export function paginateCv(cv: CV, isTwoColumn: boolean = false): PageContent[] {
  const pages: PageContent[] = [];

  // Header height on Page 1
  let page1HeaderHeight = isTwoColumn ? 75 : 120;
  if (cv.personal.photoUrl && cv.settings.showPhoto) {
    page1HeaderHeight += 30;
  }
  if (cv.personal.drivingLicence || cv.personal.dateOfBirth || cv.personal.nationality) {
    page1HeaderHeight += 18;
  }

  let currentPage = createEmptyPage(1, true);
  let currentHeight = page1HeaderHeight;
  let currentUsableHeight = BASE_USABLE_HEIGHT;

  const startNewPage = () => {
    pages.push(currentPage);
    currentPage = createEmptyPage(pages.length + 1, false);
    currentHeight = CONTINUATION_HEADER_HEIGHT;
    currentUsableHeight = BASE_USABLE_HEIGHT;
  };

  // Section order
  const defaultOrder = [
    'education',
    'experience',
    'statement',
    'skills',
    'projects',
    'certifications',
    'languages',
    'awards',
    'volunteering',
    'interests',
    'custom',
    'references',
  ];

  const sectionOrder =
    cv.settings.sectionOrder && cv.settings.sectionOrder.length > 0
      ? cv.settings.sectionOrder
      : defaultOrder;

  for (const sectionKey of sectionOrder) {
    if (sectionKey === 'statement' && cv.personalStatement?.trim()) {
      const stmtHeight = estimateStatementHeight(cv.personalStatement, isTwoColumn);
      if (currentHeight + stmtHeight > currentUsableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showStatement = true;
      currentPage.statementText = cv.personalStatement;
      currentHeight += stmtHeight;
    }

    if (sectionKey === 'experience' && cv.experience && cv.experience.length > 0) {
      const titleHeight = 32;
      let isFirstInExp = true;

      for (const exp of cv.experience) {
        const itemH = estimateExperienceItemHeight(exp, isTwoColumn);

        // If this is the first item of the section on this page, ensure title + item fit together
        if (isFirstInExp) {
          if (currentHeight + titleHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
            // Section title wouldn't leave room for even 1 item: move title + item to next page
            startNewPage();
          }
          currentPage.experienceTitle = 'Work Experience';
          currentHeight += titleHeight;
          isFirstInExp = false;
        } else if (currentHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          // Additional item doesn't fit on this page: move to next page
          startNewPage();
          currentPage.experienceTitle = 'Work Experience (continued)';
          currentHeight += titleHeight;
        }

        currentPage.experiences.push(exp);
        currentHeight += itemH;
      }
    }

    if (sectionKey === 'education' && cv.education && cv.education.length > 0) {
      const titleHeight = 32;
      let isFirstInEdu = true;

      for (const edu of cv.education) {
        const itemH = estimateEducationItemHeight(edu, isTwoColumn);

        if (isFirstInEdu) {
          if (currentHeight + titleHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
          }
          currentPage.educationTitle = 'Education';
          currentHeight += titleHeight;
          isFirstInEdu = false;
        } else if (currentHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
          currentPage.educationTitle = 'Education (continued)';
          currentHeight += titleHeight;
        }

        currentPage.educations.push(edu);
        currentHeight += itemH;
      }
    }

    if (sectionKey === 'skills' && cv.skills && cv.skills.length > 0) {
      // In two-column layouts, skills are often in the sidebar on page 1,
      // but in single column they are in the main flow.
      if (!isTwoColumn) {
        const skillsH = estimateSkillsHeight(cv.skills);
        if (currentHeight + skillsH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.showSkills = true;
        currentPage.skillsTitle = 'Key Skills';
        currentPage.skills = cv.skills;
        currentHeight += skillsH;
      }
    }

    if (sectionKey === 'projects' && cv.projects && cv.projects.length > 0) {
      const titleHeight = 32;
      let isFirstInProj = true;

      for (const proj of cv.projects) {
        const itemH = 50;

        if (isFirstInProj) {
          if (currentHeight + titleHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
          }
          currentPage.projectTitle = 'Key Projects';
          currentHeight += titleHeight;
          isFirstInProj = false;
        } else if (currentHeight + itemH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
          currentPage.projectTitle = 'Key Projects (continued)';
          currentHeight += titleHeight;
        }

        currentPage.projects.push(proj);
        currentHeight += itemH;
      }
    }

    if (sectionKey === 'certifications' && cv.certifications && cv.certifications.length > 0) {
      const certsH = estimateCertificationsHeight(cv.certifications);
      if (currentHeight + certsH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showCertifications = true;
      currentPage.certifications = cv.certifications;
      currentHeight += certsH;
    }

    if (sectionKey === 'languages' && cv.languages && cv.languages.length > 0) {
      if (!isTwoColumn) {
        const langsH = estimateLanguagesHeight(cv.languages);
        if (currentHeight + langsH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.showLanguages = true;
        currentPage.languages = cv.languages;
        currentHeight += langsH;
      }
    }

    if (sectionKey === 'awards' && cv.awards && cv.awards.length > 0) {
      const awardsH = estimateAwardsHeight(cv.awards);
      if (currentHeight + awardsH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showAwards = true;
      currentPage.awards = cv.awards;
      currentHeight += awardsH;
    }

    if (sectionKey === 'volunteering' && cv.volunteering && cv.volunteering.length > 0) {
      const volH = 32 + (cv.volunteering.length * 45);
      if (currentHeight + volH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showVolunteering = true;
      currentPage.volunteering = cv.volunteering;
      currentHeight += volH;
    }

    if (sectionKey === 'interests' && cv.interests && cv.interests.length > 0) {
      if (!isTwoColumn) {
        const intH = 40;
        if (currentHeight + intH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.showInterests = true;
        currentPage.interests = cv.interests;
        currentHeight += intH;
      }
    }

    if (sectionKey === 'custom' && cv.customSections && cv.customSections.length > 0) {
      for (const customSec of cv.customSections) {
        const secH = 32 + (customSec.content ? 40 : 0) + ((customSec.bullets?.length || 0) * 18);
        if (currentHeight + secH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.customSections.push(customSec);
        currentHeight += secH;
      }
    }

    if (sectionKey === 'references' && cv.references) {
      const refH = 34;
      if (currentHeight + refH > currentUsableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.references = cv.references;
      currentHeight += refH;
    }
  }

  // Push final page
  pages.push(currentPage);

  // If no content added at all, ensure at least 1 page exists
  if (pages.length === 0) {
    pages.push(createEmptyPage(1, true));
  }

  // Set totalPages on all pages
  const total = pages.length;
  pages.forEach((p) => {
    p.totalPages = total;
  });

  return pages;
}
