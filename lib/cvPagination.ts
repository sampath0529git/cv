import {
  CV,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  ProjectItem,
  LanguageItem,
  VolunteeringItem,
  CustomSectionItem,
  FontScale,
} from '@/types/cv';

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
  // Two-column sidebar pagination support
  showSidebarContact?: boolean;
  sidebarSkills?: string[];
  sidebarEducations?: EducationItem[];
  sidebarLanguages?: LanguageItem[];
}

const A4_HEIGHT_PX = 1123;
// Account for top + bottom page padding (72px–88px), footer (32px), and safety margin
const PAGE_PADDING_VERTICAL = 128;
const BASE_USABLE_HEIGHT = A4_HEIGHT_PX - PAGE_PADDING_VERTICAL; // 995px
const CONTINUATION_HEADER_HEIGHT = 46;
const SECTION_VERTICAL_GAP = 18;
const ITEM_SAFETY_BUFFER = 16;

function getScaleMultiplier(scale?: FontScale): number {
  if (scale === 'sm') return 0.9;
  if (scale === 'lg') return 1.12;
  return 1.0;
}

function estimateWrappedLines(text: string, charsPerLine: number): number {
  if (!text || !text.trim()) return 0;
  return text.split('\n').reduce((sum, paragraph) => {
    const len = paragraph.trim().length;
    if (len === 0) return sum + 1;
    return sum + Math.max(1, Math.ceil(len / charsPerLine));
  }, 0);
}

function estimateStatementHeight(text: string, isTwoColumn: boolean, scaleMult: number): number {
  if (!text.trim()) return 0;
  const charsPerLine = Math.floor((isTwoColumn ? 56 : 72) / scaleMult);
  const lines = estimateWrappedLines(text, charsPerLine);
  const titleHeight = isTwoColumn ? 12 : Math.round(28 * scaleMult);
  const lineHeight = Math.round(17.5 * scaleMult);
  return titleHeight + lines * lineHeight + SECTION_VERTICAL_GAP;
}

function estimateExperienceHeaderHeight(scaleMult: number): number {
  return Math.round(38 * scaleMult);
}

function estimateBulletHeight(bullet: string, isTwoColumn: boolean, scaleMult: number): number {
  const charsPerLine = Math.floor((isTwoColumn ? 52 : 68) / scaleMult);
  const lines = Math.max(1, estimateWrappedLines(bullet, charsPerLine));
  return lines * Math.round(16.5 * scaleMult) + 5;
}

function estimateExperienceItemHeight(
  item: ExperienceItem,
  isTwoColumn: boolean,
  scaleMult: number
): number {
  const headerHeight = estimateExperienceHeaderHeight(scaleMult);
  let bulletsHeight = 0;

  if (item.bullets && item.bullets.length > 0) {
    for (const bullet of item.bullets) {
      if (!bullet.trim()) continue;
      bulletsHeight += estimateBulletHeight(bullet, isTwoColumn, scaleMult);
    }
  } else if (item.description) {
    bulletsHeight += estimateBulletHeight(item.description, isTwoColumn, scaleMult);
  }

  return headerHeight + bulletsHeight + 16;
}

function estimateEducationItemHeight(
  item: EducationItem,
  isTwoColumn: boolean,
  scaleMult: number
): number {
  const charsPerLine = Math.floor((isTwoColumn ? 32 : 68) / scaleMult);
  const headerHeight = Math.round((isTwoColumn ? 44 : 36) * scaleMult);
  let descHeight = 0;

  if (item.bullets && item.bullets.length > 0) {
    for (const b of item.bullets) {
      const lines = Math.max(1, estimateWrappedLines(b, charsPerLine));
      descHeight += lines * Math.round(16 * scaleMult) + 4;
    }
  } else if (item.description) {
    const lines = Math.max(1, estimateWrappedLines(item.description, charsPerLine));
    descHeight += lines * Math.round(16 * scaleMult) + 4;
  }

  return headerHeight + descHeight + 14;
}

function estimateProjectItemHeight(
  proj: ProjectItem,
  isTwoColumn: boolean,
  scaleMult: number
): number {
  const headerHeight = Math.round(24 * scaleMult);
  let bodyHeight = 0;
  if (proj.bullets && proj.bullets.length > 0) {
    for (const b of proj.bullets) {
      if (!b.trim()) continue;
      bodyHeight += estimateBulletHeight(b, isTwoColumn, scaleMult);
    }
  } else if (proj.description) {
    const charsPerLine = Math.floor((isTwoColumn ? 54 : 70) / scaleMult);
    const lines = Math.max(1, estimateWrappedLines(proj.description, charsPerLine));
    bodyHeight += lines * Math.round(16 * scaleMult) + 4;
  }
  return headerHeight + bodyHeight + 12;
}

function estimateCustomSectionHeight(
  sec: CustomSectionItem,
  isTwoColumn: boolean,
  scaleMult: number
): number {
  const titleHeight = Math.round(30 * scaleMult);
  let bodyHeight = 0;
  if (sec.bullets && sec.bullets.length > 0) {
    for (const b of sec.bullets) {
      if (!b.trim()) continue;
      bodyHeight += estimateBulletHeight(b, isTwoColumn, scaleMult);
    }
  } else if (sec.content) {
    const charsPerLine = Math.floor((isTwoColumn ? 54 : 70) / scaleMult);
    const lines = Math.max(1, estimateWrappedLines(sec.content, charsPerLine));
    bodyHeight += lines * Math.round(16.5 * scaleMult) + 4;
  }
  return titleHeight + bodyHeight + SECTION_VERTICAL_GAP;
}

function estimateSkillsHeight(skills: SkillGroup[], scaleMult: number): number {
  if (!skills || skills.length === 0) return 0;
  const titleHeight = Math.round(30 * scaleMult);
  const totalItems = skills.reduce((acc, g) => acc + (g.items?.length || 0), 0);
  if (totalItems === 0) return 0;
  const rows = Math.ceil(totalItems / 4) || 1;
  return titleHeight + rows * Math.round(26 * scaleMult) + SECTION_VERTICAL_GAP;
}

function estimateCertificationsHeight(certs: string[], isTwoColumn: boolean, scaleMult: number): number {
  if (!certs || certs.length === 0) return 0;
  const joined = certs.join(' · ');
  const charsPerLine = Math.floor((isTwoColumn ? 54 : 70) / scaleMult);
  const lines = Math.max(certs.length <= 3 ? 1 : 2, Math.ceil(joined.length / charsPerLine));
  return Math.round(30 * scaleMult) + lines * Math.round(18 * scaleMult) + SECTION_VERTICAL_GAP;
}

function estimateLanguagesHeight(langs: LanguageItem[], scaleMult: number): number {
  if (!langs || langs.length === 0) return 0;
  return (
    Math.round(30 * scaleMult) +
    Math.ceil(langs.length / 2) * Math.round(20 * scaleMult) +
    SECTION_VERTICAL_GAP
  );
}

function estimateAwardsHeight(awards: string[], isTwoColumn: boolean, scaleMult: number): number {
  if (!awards || awards.length === 0) return 0;
  const joined = awards.join(' · ');
  const charsPerLine = Math.floor((isTwoColumn ? 54 : 70) / scaleMult);
  const lines = Math.max(1, Math.ceil(joined.length / charsPerLine));
  return Math.round(30 * scaleMult) + lines * Math.round(18 * scaleMult) + SECTION_VERTICAL_GAP;
}

function estimateInterestsHeight(
  interests: string[],
  isTwoColumn: boolean,
  scaleMult: number
): number {
  if (!interests || interests.length === 0) return 0;
  const joined = interests.join(' · ');
  const charsPerLine = Math.floor((isTwoColumn ? 54 : 72) / scaleMult);
  const lines = Math.max(1, Math.ceil(joined.length / charsPerLine));
  return Math.round(30 * scaleMult) + lines * Math.round(17 * scaleMult) + SECTION_VERTICAL_GAP;
}

function estimateReferencesHeight(
  references: string,
  isTwoColumn: boolean,
  scaleMult: number
): number {
  if (!references || !references.trim()) return 0;
  const charsPerLine = Math.floor((isTwoColumn ? 54 : 72) / scaleMult);
  const lines = Math.max(1, estimateWrappedLines(references, charsPerLine));
  return Math.round(28 * scaleMult) + lines * Math.round(16.5 * scaleMult) + 12;
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
    showSidebarContact: showMainHeader,
    sidebarSkills: [],
    sidebarEducations: [],
    sidebarLanguages: [],
  };
}

/**
 * Splits an oversized ExperienceItem cleanly at bullet boundaries if a single role
 * contains too many bullets to fit on one page without clipping.
 */
function splitOversizedExperience(
  exp: ExperienceItem,
  availableFirstChunkPx: number,
  fullPageBodyPx: number,
  isTwoColumn: boolean,
  scaleMult: number
): ExperienceItem[] {
  const bullets = (exp.bullets || []).filter((b) => b.trim().length > 0);
  if (bullets.length <= 2) {
    return [exp];
  }

  const headerH = estimateExperienceHeaderHeight(scaleMult) + 16;
  const chunks: ExperienceItem[] = [];
  let idx = 0;
  let chunkIndex = 0;

  while (idx < bullets.length) {
    const budget = chunkIndex === 0 ? availableFirstChunkPx : fullPageBodyPx;
    let used = headerH;
    const chunkBullets: string[] = [];

    while (idx < bullets.length) {
      const bH = estimateBulletHeight(bullets[idx], isTwoColumn, scaleMult);
      if (chunkBullets.length > 0 && used + bH > budget) {
        break;
      }
      chunkBullets.push(bullets[idx]);
      used += bH;
      idx++;
    }

    chunks.push({
      ...exp,
      id: chunkIndex === 0 ? exp.id : `${exp.id}-cont-${chunkIndex}`,
      role: chunkIndex === 0 ? exp.role : `${exp.role} (continued)`,
      bullets: chunkBullets,
      description: '',
    });
    chunkIndex++;
  }

  return chunks;
}

/**
 * Smart A4 Multi-Page Paginator
 * Splits a CV object across A4 pages without cutting headings, clipping text,
 * or stranding section headers at page bottoms.
 */
export function paginateCv(cv: CV, isTwoColumn: boolean = false): PageContent[] {
  const pages: PageContent[] = [];
  const scaleMult = getScaleMultiplier(cv.settings.fontScale);

  // Page 1 header height estimation
  let page1HeaderHeight = Math.round((isTwoColumn ? 92 : 138) * scaleMult);
  if (!isTwoColumn && cv.personal.photoUrl && cv.settings.showPhoto) {
    page1HeaderHeight += 24;
  }
  if (
    !isTwoColumn &&
    (cv.personal.drivingLicence || cv.personal.dateOfBirth || cv.personal.nationality)
  ) {
    page1HeaderHeight += Math.round(20 * scaleMult);
  }

  let currentPage = createEmptyPage(1, true);
  let currentHeight = page1HeaderHeight;
  const usableHeight = BASE_USABLE_HEIGHT;

  const startNewPage = () => {
    pages.push(currentPage);
    currentPage = createEmptyPage(pages.length + 1, false);
    currentHeight = CONTINUATION_HEADER_HEIGHT;
  };

  const defaultOrder = [
    'statement',
    'experience',
    'education',
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

  const rawOrder =
    cv.settings.sectionOrder && cv.settings.sectionOrder.length > 0
      ? cv.settings.sectionOrder
      : defaultOrder;

  // Ensure optional sections are included in user-selected sequence or appended cleanly
  const normalizedBase = rawOrder.map((k) => (k === 'summary' ? 'statement' : k));
  const sectionOrder = Array.from(new Set([...normalizedBase, ...defaultOrder]));

  for (const sectionKey of sectionOrder) {
    if (sectionKey === 'statement' && cv.personalStatement?.trim()) {
      const stmtHeight = estimateStatementHeight(cv.personalStatement, isTwoColumn, scaleMult);
      if (
        !currentPage.showMainHeader &&
        currentHeight + stmtHeight > usableHeight - ITEM_SAFETY_BUFFER
      ) {
        startNewPage();
      } else if (
        currentPage.showMainHeader &&
        currentHeight > page1HeaderHeight &&
        currentHeight + stmtHeight > usableHeight - ITEM_SAFETY_BUFFER
      ) {
        startNewPage();
      }
      currentPage.showStatement = true;
      currentPage.statementText = cv.personalStatement;
      currentHeight += stmtHeight;
    }

    if (sectionKey === 'experience' && cv.experience && cv.experience.length > 0) {
      const titleHeight = Math.round(34 * scaleMult);
      let isFirstInExp = true;

      for (const exp of cv.experience) {
        const itemH = estimateExperienceItemHeight(exp, isTwoColumn, scaleMult);
        const fullPageBody =
          usableHeight - CONTINUATION_HEADER_HEIGHT - titleHeight - ITEM_SAFETY_BUFFER;

        if (isFirstInExp) {
          const minRequired = Math.min(itemH, estimateExperienceHeaderHeight(scaleMult) + 64);
          if (currentHeight + titleHeight + minRequired > usableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
          }
          currentPage.experienceTitle = 'Work Experience';
          currentHeight += titleHeight;
          isFirstInExp = false;
        } else {
          const minRequired = Math.min(itemH, estimateExperienceHeaderHeight(scaleMult) + 64);
          if (currentHeight + minRequired > usableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
            currentPage.experienceTitle = 'Work Experience (continued)';
            currentHeight += titleHeight;
          }
        }

        const remainingOnPage = usableHeight - ITEM_SAFETY_BUFFER - currentHeight;

        if (itemH <= remainingOnPage) {
          currentPage.experiences.push(exp);
          currentHeight += itemH;
        } else if (itemH <= fullPageBody && currentPage.experiences.length > 0) {
          startNewPage();
          currentPage.experienceTitle = 'Work Experience (continued)';
          currentHeight += titleHeight;
          currentPage.experiences.push(exp);
          currentHeight += itemH;
        } else {
          const chunks = splitOversizedExperience(
            exp,
            Math.max(120, remainingOnPage),
            Math.max(240, fullPageBody),
            isTwoColumn,
            scaleMult
          );
          chunks.forEach((chunk, cIdx) => {
            if (cIdx > 0) {
              startNewPage();
              currentPage.experienceTitle = 'Work Experience (continued)';
              currentHeight += titleHeight;
            }
            const chunkH = estimateExperienceItemHeight(chunk, isTwoColumn, scaleMult);
            currentPage.experiences.push(chunk);
            currentHeight += chunkH;
          });
        }
      }
      currentHeight += 8;
    }

    // In two-column mode (Toronto), Education is rendered in the left sidebar
    if (sectionKey === 'education' && !isTwoColumn && cv.education && cv.education.length > 0) {
      const titleHeight = Math.round(34 * scaleMult);
      let isFirstInEdu = true;

      for (const edu of cv.education) {
        const itemH = estimateEducationItemHeight(edu, false, scaleMult);

        if (isFirstInEdu) {
          if (currentHeight + titleHeight + itemH > usableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
          }
          currentPage.educationTitle = 'Education';
          currentHeight += titleHeight;
          isFirstInEdu = false;
        } else if (currentHeight + itemH > usableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
          currentPage.educationTitle = 'Education (continued)';
          currentHeight += titleHeight;
        }

        currentPage.educations.push(edu);
        currentHeight += itemH;
      }
      currentHeight += 8;
    }

    if (sectionKey === 'skills' && !isTwoColumn && cv.skills && cv.skills.length > 0) {
      const skillsH = estimateSkillsHeight(cv.skills, scaleMult);
      if (skillsH > 0) {
        if (currentHeight + skillsH > usableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.showSkills = true;
        currentPage.skillsTitle = 'Key Skills';
        currentPage.skills = cv.skills;
        currentHeight += skillsH;
      }
    }

    if (sectionKey === 'projects' && cv.projects && cv.projects.length > 0) {
      const titleHeight = Math.round(32 * scaleMult);
      let isFirstInProj = true;

      for (const proj of cv.projects) {
        const itemH = estimateProjectItemHeight(proj, isTwoColumn, scaleMult);

        if (isFirstInProj) {
          if (currentHeight + titleHeight + itemH > usableHeight - ITEM_SAFETY_BUFFER) {
            startNewPage();
          }
          currentPage.projectTitle = 'Key Projects';
          currentHeight += titleHeight;
          isFirstInProj = false;
        } else if (currentHeight + itemH > usableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
          currentPage.projectTitle = 'Key Projects (continued)';
          currentHeight += titleHeight;
        }

        currentPage.projects.push(proj);
        currentHeight += itemH;
      }
      currentHeight += 6;
    }

    if (sectionKey === 'certifications' && cv.certifications && cv.certifications.length > 0) {
      const certsH = estimateCertificationsHeight(cv.certifications, isTwoColumn, scaleMult);
      if (currentHeight + certsH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showCertifications = true;
      currentPage.certifications = cv.certifications;
      currentHeight += certsH;
    }

    if (sectionKey === 'languages' && !isTwoColumn && cv.languages && cv.languages.length > 0) {
      const langsH = estimateLanguagesHeight(cv.languages, scaleMult);
      if (currentHeight + langsH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showLanguages = true;
      currentPage.languages = cv.languages;
      currentHeight += langsH;
    }

    if (sectionKey === 'awards' && cv.awards && cv.awards.length > 0) {
      const awardsH = estimateAwardsHeight(cv.awards, isTwoColumn, scaleMult);
      if (currentHeight + awardsH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showAwards = true;
      currentPage.awards = cv.awards;
      currentHeight += awardsH;
    }

    if (sectionKey === 'volunteering' && cv.volunteering && cv.volunteering.length > 0) {
      const volH = Math.round(32 * scaleMult) + cv.volunteering.length * Math.round(46 * scaleMult);
      if (currentHeight + volH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showVolunteering = true;
      currentPage.volunteering = cv.volunteering;
      currentHeight += volH;
    }

    if (sectionKey === 'interests' && cv.interests && cv.interests.length > 0) {
      const intH = estimateInterestsHeight(cv.interests, isTwoColumn, scaleMult);
      if (currentHeight + intH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.showInterests = true;
      currentPage.interests = cv.interests;
      currentHeight += intH;
    }

    if (sectionKey === 'custom' && cv.customSections && cv.customSections.length > 0) {
      for (const customSec of cv.customSections) {
        const secH = estimateCustomSectionHeight(customSec, isTwoColumn, scaleMult);
        if (currentHeight + secH > usableHeight - ITEM_SAFETY_BUFFER) {
          startNewPage();
        }
        currentPage.customSections.push(customSec);
        currentHeight += secH;
      }
    }

    if (sectionKey === 'references' && cv.references?.trim()) {
      const refH = estimateReferencesHeight(cv.references, isTwoColumn, scaleMult);
      if (currentHeight + refH > usableHeight - ITEM_SAFETY_BUFFER) {
        startNewPage();
      }
      currentPage.references = cv.references.trim();
      currentHeight += refH;
    }
  }

  pages.push(currentPage);

  if (pages.length === 0) {
    pages.push(createEmptyPage(1, true));
  }

  // Paginate two-column sidebar items across pages so sidebar never overflows A4 height
  if (isTwoColumn) {
    const sidebarBudget = A4_HEIGHT_PX - 136;
    let sPageIdx = 0;
    const ensurePage = (idx: number) => {
      while (pages.length <= idx) {
        pages.push(createEmptyPage(pages.length + 1, false));
      }
      return pages[idx];
    };

    const contactFields = [
      cv.personal.email,
      cv.personal.phone,
      cv.personal.location,
      cv.personal.linkedin,
      cv.personal.website,
      cv.personal.dateOfBirth,
      cv.personal.nationality,
      cv.personal.drivingLicence,
    ].filter(Boolean) as string[];

    const contactItemsHeight = contactFields.reduce((sum, val) => {
      const wraps = val.length > 24 ? 14 : 0;
      return sum + Math.round((34 + wraps) * scaleMult);
    }, 0);

    let sHeight =
      (cv.personal.photoUrl && cv.settings.showPhoto ? 116 : 0) +
      (contactFields.length > 0 ? 36 + contactItemsHeight + 22 : 0);

    // 1. Sidebar Skills
    const allSidebarSkills = (cv.skills || []).flatMap((g) => g.items).filter(Boolean);
    if (allSidebarSkills.length > 0) {
      sHeight += 34;
      for (const sk of allSidebarSkills) {
        const skH = Math.round(30 * scaleMult);
        if (sHeight + skH > sidebarBudget) {
          sPageIdx++;
          sHeight = 34;
        }
        const target = ensurePage(sPageIdx);
        target.sidebarSkills = target.sidebarSkills || [];
        target.sidebarSkills.push(sk);
        sHeight += skH;
      }
      sHeight += 24;
    }

    // 2. Sidebar Educations
    if (cv.education && cv.education.length > 0) {
      if (sHeight + 92 > sidebarBudget) {
        sPageIdx++;
        sHeight = 0;
      }
      sHeight += 34;
      for (const edu of cv.education) {
        const qualLines = Math.max(1, Math.ceil((edu.qualification || '').length / 26));
        const instLines = Math.max(1, Math.ceil((edu.institution || '').length / 28));
        const eduH = Math.round((28 + qualLines * 16 + instLines * 15 + (edu.grade ? 16 : 0)) * scaleMult);
        if (sHeight + eduH > sidebarBudget) {
          sPageIdx++;
          sHeight = 34;
        }
        const target = ensurePage(sPageIdx);
        target.sidebarEducations = target.sidebarEducations || [];
        target.sidebarEducations.push(edu);
        target.educations.push(edu);
        sHeight += eduH;
      }
      sHeight += 24;
    }

    // 3. Sidebar Languages
    if (cv.languages && cv.languages.length > 0) {
      if (sHeight + 62 > sidebarBudget) {
        sPageIdx++;
        sHeight = 0;
      }
      sHeight += 32;
      for (const lang of cv.languages) {
        const langH = Math.round(22 * scaleMult);
        if (sHeight + langH > sidebarBudget) {
          sPageIdx++;
          sHeight = 32;
        }
        const target = ensurePage(sPageIdx);
        target.sidebarLanguages = target.sidebarLanguages || [];
        target.sidebarLanguages.push(lang);
        sHeight += langH;
      }
    }
  }

  const total = pages.length;
  pages.forEach((p, idx) => {
    p.pageNumber = idx + 1;
    p.totalPages = total;
  });

  return pages;
}
