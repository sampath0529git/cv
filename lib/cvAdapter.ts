import {
  CV,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  SkillProficiency,
  LanguageItem,
  ProjectItem,
  CustomSectionItem,
  normalizeDateFormat,
  normalizeFontBoldness,
  normalizePdfExportSettings,
} from '@/types/cv';
import { CvState } from '@/store/useCvStore';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { formatCvDate } from '@/lib/dateFormat';

const CORE_SECTIONS = [
  'statement',
  'experience',
  'education',
  'skills',
  'languages',
  'interests',
];

/**
 * Normalizes section keys between builder store ('summary') and CV model ('statement'),
 * and optionally appends any populated optional sections so they can be reordered & rendered.
 */
export function normalizeSectionOrder(
  order?: string[],
  store?: Partial<CvState>
): string[] {
  const base = order && order.length > 0 ? order : [...CORE_SECTIONS];
  const mapped = base.map((k) => (k === 'summary' ? 'statement' : k));
  const deduped = Array.from(new Set(mapped));

  if (store) {
    if ((store.projectsList?.length || 0) > 0 && !deduped.includes('projects')) {
      deduped.push('projects');
    }
    if ((store.certificationsList?.length || 0) > 0 && !deduped.includes('certifications')) {
      deduped.push('certifications');
    }
    if ((store.awardsList?.length || 0) > 0 && !deduped.includes('awards')) {
      deduped.push('awards');
    }
    if ((store.customSections?.length || 0) > 0 && !deduped.includes('custom')) {
      deduped.push('custom');
    }
    if (store.includeReferences && !deduped.includes('references')) {
      deduped.push('references');
    }
  }

  // Filter out disabled optional keys from UI display if store is passed and empty
  if (store) {
    return deduped.filter((key) => {
      if (CORE_SECTIONS.includes(key)) return true;
      if (key === 'projects') return (store.projectsList?.length || 0) > 0;
      if (key === 'certifications') return (store.certificationsList?.length || 0) > 0;
      if (key === 'awards') return (store.awardsList?.length || 0) > 0;
      if (key === 'custom') return (store.customSections?.length || 0) > 0;
      if (key === 'references') return Boolean(store.includeReferences);
      return true;
    });
  }

  return deduped;
}

function parseLanguageString(raw: string): LanguageItem {
  const trimmed = raw.trim();
  const parenMatch = trimmed.match(/^(.+?)\s*\((.+?)\)\s*$/);
  if (parenMatch) {
    return { name: parenMatch[1].trim(), level: parenMatch[2].trim() };
  }
  const dashMatch = trimmed.match(/^(.+?)\s*[–\-:]\s*(.+?)\s*$/);
  if (dashMatch) {
    return { name: dashMatch[1].trim(), level: dashMatch[2].trim() };
  }
  return { name: trimmed, level: '' };
}

/**
 * Converts the existing CvStore state into the unified UK CV data model.
 */
export function cvStoreToCv(
  store: Partial<CvState>,
  fallbackSettings?: Partial<CV['settings']>
): CV {
  const contact = store.contact || {
    firstName: '',
    lastName: '',
    jobTitle: '',
    photoUrl: '',
    email: '',
    phone: '',
    postalCode: '',
    city: '',
    dateOfBirth: '',
    nationality: '',
    linkedin: '',
    website: '',
    drivingLicence: '',
  };

  const nameParts = [contact.firstName, contact.lastName].filter(Boolean);
  const fullName = nameParts.length > 0 ? nameParts.join(' ').trim() : 'Your Name';

  const locationParts = [contact.city, contact.postalCode].filter(Boolean);
  const location = locationParts.join(', ');

  const dateFormat = normalizeDateFormat(store.dateFormat ?? fallbackSettings?.dateFormat);

  // Convert experiences: prioritize live description text so typing updates bullets immediately
  const experience: ExperienceItem[] = (store.experiences || []).map((exp, index) => {
    const rawLines = (exp.description || '')
      .split('\n')
      .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    const bullets =
      rawLines.length > 0
        ? rawLines
        : exp.bullets && exp.bullets.length > 0
        ? exp.bullets
        : [];

    return {
      id: exp.id || `exp-${index}`,
      role: exp.jobTitle || 'Role Title',
      company: exp.employer || 'Organisation',
      location: exp.city || '',
      startDate: formatCvDate(exp.startDate, dateFormat),
      endDate: exp.isCurrent ? 'Present' : formatCvDate(exp.endDate, dateFormat),
      current: Boolean(exp.isCurrent),
      bullets,
      description: bullets.length === 0 ? exp.description || '' : '',
      forceNewPage: Boolean(exp.forceNewPage),
    };
  });

  // Convert educations: prioritize live description edits
  const education: EducationItem[] = (store.educations || []).map((edu, index) => {
    const rawBullets = (edu.description || '')
      .split('\n')
      .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    return {
      id: edu.id || `edu-${index}`,
      qualification: edu.degree || 'Degree / Qualification',
      institution: edu.school || 'Institution',
      location: edu.city || undefined,
      startDate: formatCvDate(edu.startDate, dateFormat),
      endDate: formatCvDate(edu.endDate, dateFormat),
      grade: edu.grade || undefined,
      description: rawBullets.length > 1 ? undefined : edu.description || undefined,
      bullets:
        rawBullets.length > 1
          ? rawBullets
          : edu.bullets && edu.bullets.length > 0
          ? edu.bullets
          : undefined,
      forceNewPage: Boolean(edu.forceNewPage),
    };
  });

  // Convert skills + preserve proficiency levels
  const skillLevels: Record<string, SkillProficiency> = {};
  const skillItems: string[] = [];
  for (const s of store.skills || []) {
    const trimmed = (s.name || '').trim();
    if (!trimmed) continue;
    skillItems.push(trimmed);
    skillLevels[trimmed] = s.level || 'Advanced';
  }
  const skills: SkillGroup[] =
    skillItems.length > 0 ? [{ group: 'Key Skills', items: skillItems }] : [];

  // Normalize projects (only include non-empty entries)
  const projects: ProjectItem[] = (store.projectsList || [])
    .filter((p) => p && (p.title?.trim() || p.description?.trim() || p.role?.trim()))
    .map((p, idx) => {
      const lines = (p.description || '')
        .split('\n')
        .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(Boolean);
      return {
        id: p.id || `proj-${idx}`,
        title: p.title?.trim() || 'Project',
        role: p.role?.trim() || undefined,
        link: p.link?.trim() || undefined,
        technologies: p.technologies,
        description: lines.length > 1 ? '' : p.description?.trim() || '',
        bullets: lines.length > 1 ? lines : p.bullets,
      };
    });

  // Normalize custom sections (only include non-empty entries)
  const customSections: CustomSectionItem[] = (store.customSections || [])
    .filter((cs) => cs && (cs.title?.trim() || cs.content?.trim() || (cs.bullets?.length || 0) > 0))
    .map((cs, idx) => {
      const lines = (cs.content || '')
        .split('\n')
        .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(Boolean);
      return {
        id: cs.id || `custom-${idx}`,
        title: cs.title?.trim() || 'Additional Section',
        content: lines.length > 1 ? undefined : cs.content?.trim() || undefined,
        bullets: lines.length > 1 ? lines : cs.bullets,
      };
    });

  const templateId =
    (store.activeTemplate as string) || fallbackSettings?.templateId || 'hopkins';

  const rawAccent = store.themeColor || fallbackSettings?.accentColor || '#4B4DED';
  const accentColor =
    rawAccent === '#000000' && templateId !== 'uk-traditional' ? '#1E3A8A' : rawAccent;

  const hasUploadedPhoto = Boolean(contact.photoUrl && contact.photoUrl.trim().length > 0);
  const resolvedShowPhotoPref =
    store.showPhoto !== undefined ? store.showPhoto : fallbackSettings?.showPhoto;
  const showPhoto =
    resolvedShowPhotoPref !== undefined
      ? Boolean(resolvedShowPhotoPref && hasUploadedPhoto)
      : hasUploadedPhoto;

  const resolvedReferences = store.includeReferences
    ? (store.referencesText ?? 'References available on request').trim()
    : '';

  return {
    personal: {
      fullName,
      jobTitle: contact.jobTitle || '',
      email: contact.email || '',
      phone: contact.phone || '',
      location,
      linkedin: contact.linkedin || '',
      website: contact.website || '',
      dateOfBirth: contact.dateOfBirth ? formatCvDate(contact.dateOfBirth, dateFormat) : '',
      nationality: contact.nationality || '',
      drivingLicence: contact.drivingLicence || '',
      photoUrl: contact.photoUrl || undefined,
    },
    personalStatement: store.summary || '',
    experience,
    education,
    skills,
    skillLevels,
    certifications: (store.certificationsList || []).filter((c) => Boolean(c?.trim())),
    projects,
    languages: (store.languagesList || []).filter(Boolean).map(parseLanguageString),
    volunteering: [],
    interests: (store.interestsList || []).filter((i) => Boolean(i?.trim())),
    awards: (store.awardsList || []).filter((a) => Boolean(a?.trim())),
    customSections,
    references: resolvedReferences,
    settings: {
      templateId,
      accentColor,
      fontFamily: store.fontFamily || fallbackSettings?.fontFamily || 'jakarta',
      fontScale: store.fontScale || fallbackSettings?.fontScale || 'md',
      dateFormat,
      letterSpacing:
        typeof store.letterSpacing === 'number'
          ? store.letterSpacing
          : fallbackSettings?.letterSpacing ?? 0,
      fontBoldness: normalizeFontBoldness(store.fontBoldness ?? fallbackSettings?.fontBoldness),
      pdfExportSettings: normalizePdfExportSettings(
        store.pdfExportSettings ?? fallbackSettings?.pdfExportSettings
      ),
      showPhoto,
      sectionOrder: normalizeSectionOrder(
        store.sectionOrder || fallbackSettings?.sectionOrder || SAMPLE_UK_CV.settings.sectionOrder,
        store
      ),
    },
  };
}

/**
 * Converts a unified CV data model back into CvStore state (e.g. for Fill Sample Data or Import).
 */
export function cvToCvStore(cv: CV): Partial<CvState> {
  const nameParts = (cv.personal.fullName || '').trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    contact: {
      firstName,
      lastName,
      jobTitle: cv.personal.jobTitle || '',
      email: cv.personal.email || '',
      phone: cv.personal.phone || '',
      city: cv.personal.location || '',
      postalCode: '',
      photoUrl: cv.personal.photoUrl || '',
      linkedin: cv.personal.linkedin || '',
      website: cv.personal.website || '',
      dateOfBirth: cv.personal.dateOfBirth || '',
      nationality: cv.personal.nationality || '',
      drivingLicence: cv.personal.drivingLicence || '',
    },
    summary: cv.personalStatement || '',
    experiences: (cv.experience || []).map((exp) => ({
      id: exp.id,
      jobTitle: exp.role,
      employer: exp.company,
      city: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate === 'Present' ? '' : exp.endDate,
      isCurrent: exp.current,
      description: exp.bullets ? exp.bullets.join('\n') : exp.description || '',
      bullets: exp.bullets ? [...exp.bullets] : [],
      forceNewPage: Boolean(exp.forceNewPage),
    })),
    educations: (cv.education || []).map((edu) => ({
      id: edu.id,
      degree: edu.qualification,
      school: edu.institution,
      city: edu.location || '',
      startDate: edu.startDate,
      endDate: edu.endDate,
      grade: edu.grade || '',
      description: edu.description || (edu.bullets ? edu.bullets.join('\n') : ''),
      bullets: edu.bullets ? [...edu.bullets] : undefined,
      forceNewPage: Boolean(edu.forceNewPage),
    })),
    skills: (cv.skills || []).flatMap((group) =>
      group.items.map((item, idx) => ({
        id: `sk-${idx}-${item}`,
        name: item,
        level: cv.skillLevels?.[item] || ('Advanced' as const),
      }))
    ),
    languagesList: (cv.languages || []).map((l) =>
      l.level ? `${l.name} (${l.level})` : l.name
    ),
    interestsList: cv.interests || [],
    certificationsList: cv.certifications || [],
    projectsList: cv.projects || [],
    awardsList: cv.awards || [],
    referencesText: cv.references || 'References available on request',
    includeReferences: false,
    customSections: cv.customSections || [],
    themeColor: cv.settings.accentColor,
    fontFamily: cv.settings.fontFamily || 'jakarta',
    fontScale: cv.settings.fontScale || 'md',
    dateFormat: normalizeDateFormat(cv.settings.dateFormat),
    letterSpacing: typeof cv.settings.letterSpacing === 'number' ? cv.settings.letterSpacing : 0,
    fontBoldness: normalizeFontBoldness(cv.settings.fontBoldness),
    pdfExportSettings: normalizePdfExportSettings(cv.settings.pdfExportSettings),
    showPhoto: cv.settings.showPhoto ?? Boolean(cv.personal.photoUrl),
    activeTemplate: cv.settings.templateId as any,
    sectionOrder: normalizeSectionOrder(cv.settings.sectionOrder),
  };
}
