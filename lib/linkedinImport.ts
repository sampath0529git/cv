import {
  CvState,
  ContactDetails,
  WorkExperience,
  Education,
  SkillItem,
} from '@/store/useCvStore';
import { ProjectItem } from '@/types/cv';
import { normalizeSectionOrder } from '@/lib/cvAdapter';

export interface LinkedInParsedExperience {
  jobTitle: string;
  employer: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  bullets?: string[];
  description?: string;
}

export interface LinkedInParsedEducation {
  degree: string;
  school: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
}

export interface LinkedInParsedSkill {
  name: string;
  level?: SkillItem['level'];
}

export interface LinkedInParsedProject {
  title: string;
  role?: string;
  link?: string;
  description?: string;
  bullets?: string[];
}

export interface LinkedInImportPayload {
  source: 'linkedin-oauth' | 'linkedin-pdf' | 'linkedin-text' | 'linkedin-hybrid' | 'cv-upload';
  oauthConnected?: boolean;
  limitedScopeNotice?: boolean;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
  linkedin?: string;
  website?: string;
  photoUrl?: string;
  summary?: string;
  experiences?: LinkedInParsedExperience[];
  educations?: LinkedInParsedEducation[];
  skills?: LinkedInParsedSkill[];
  languages?: string[];
  certifications?: string[];
  projects?: LinkedInParsedProject[];
  awards?: string[];
  interests?: string[];
  suggestedTemplate?: string;
  templateConfidence?: 'High' | 'Medium';
  matchReason?: string;
  layoutCharacteristics?: {
    columns?: number;
    hasSidebar?: boolean;
    headerStyle?: string;
    layoutType?: string;
  };
}

function makeId(prefix: string, idx: number): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}-li-${Date.now()}-${idx}-${rand}`;
}

function normalizeBullets(bullets?: string[], description?: string): {
  bullets: string[];
  description: string;
} {
  const cleanedBullets = (bullets || [])
    .map((b) => String(b).replace(/^[•\-*]\s*/, '').trim())
    .filter(Boolean);

  if (cleanedBullets.length > 0) {
    return {
      bullets: cleanedBullets,
      description: cleanedBullets.join('\n'),
    };
  }

  const fromDesc = (description || '')
    .split('\n')
    .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(Boolean);

  return {
    bullets: fromDesc,
    description: fromDesc.join('\n'),
  };
}

function normalizeSkillLevel(level?: string): SkillItem['level'] {
  if (
    level === 'Beginner' ||
    level === 'Intermediate' ||
    level === 'Advanced' ||
    level === 'Expert'
  ) {
    return level;
  }
  return 'Advanced';
}

const INITIAL_PLACEHOLDER_EMAIL = 'sampathwork888@gmail.com';
const INITIAL_PLACEHOLDER_FIRST = 'Sampath';
const INITIAL_PLACEHOLDER_LAST = 'Sandaruwan';

function isDefaultUntouchedContact(contact: ContactDetails): boolean {
  return (
    contact.firstName === INITIAL_PLACEHOLDER_FIRST &&
    contact.lastName === INITIAL_PLACEHOLDER_LAST &&
    contact.email === INITIAL_PLACEHOLDER_EMAIL &&
    !contact.jobTitle &&
    !contact.phone &&
    !contact.city
  );
}

/**
 * Maps an authenticated / parsed LinkedIn profile payload into `useCvStore` updates.
 */
export function mapLinkedInPayloadToCvStore(
  payload: LinkedInImportPayload,
  currentState: CvState,
  mode: 'replace' | 'merge' = 'replace'
): Partial<CvState> {
  const existingContact = currentState.contact;
  const untouchedDefault = isDefaultUntouchedContact(existingContact);

  const pickContactField = (
    incoming: string | undefined,
    existing: string
  ): string => {
    const trimmedIncoming = (incoming || '').trim();
    if (trimmedIncoming) return trimmedIncoming;
    if (mode === 'merge' && !untouchedDefault) return existing;
    return mode === 'replace' ? '' : existing;
  };

  const nextContact: ContactDetails = {
    ...existingContact,
    firstName: pickContactField(payload.firstName, existingContact.firstName),
    lastName: pickContactField(payload.lastName, existingContact.lastName),
    jobTitle: pickContactField(payload.jobTitle, existingContact.jobTitle),
    email: pickContactField(payload.email, existingContact.email),
    phone: pickContactField(payload.phone, existingContact.phone),
    city: pickContactField(payload.city, existingContact.city),
    postalCode: pickContactField(payload.postalCode, existingContact.postalCode),
    linkedin: pickContactField(payload.linkedin, existingContact.linkedin),
    website: pickContactField(payload.website, existingContact.website),
    photoUrl: (payload.photoUrl || '').trim() || existingContact.photoUrl,
  };

  const mappedExperiences: WorkExperience[] = (payload.experiences || [])
    .filter((exp) => exp && (exp.jobTitle?.trim() || exp.employer?.trim()))
    .map((exp, idx) => {
      const { bullets, description } = normalizeBullets(exp.bullets, exp.description);
      const isCurrent =
        Boolean(exp.isCurrent) ||
        /^(present|current|now)$/i.test((exp.endDate || '').trim());
      return {
        id: makeId('exp', idx),
        jobTitle: (exp.jobTitle || '').trim(),
        employer: (exp.employer || '').trim(),
        city: (exp.city || '').trim(),
        startDate: (exp.startDate || '').trim(),
        endDate: isCurrent ? '' : (exp.endDate || '').trim(),
        isCurrent,
        description,
        bullets,
      };
    });

  const mappedEducations: Education[] = (payload.educations || [])
    .filter((edu) => edu && (edu.degree?.trim() || edu.school?.trim()))
    .map((edu, idx) => {
      const { bullets, description } = normalizeBullets(undefined, edu.description);
      return {
        id: makeId('edu', idx),
        degree: (edu.degree || '').trim(),
        school: (edu.school || '').trim(),
        city: (edu.city || '').trim(),
        startDate: (edu.startDate || '').trim(),
        endDate: (edu.endDate || '').trim(),
        grade: (edu.grade || '').trim(),
        description,
        bullets: bullets.length > 1 ? bullets : undefined,
      };
    });

  const mappedSkills: SkillItem[] = [];
  const seenSkillNames = new Set<string>();

  if (mode === 'merge') {
    for (const sk of currentState.skills || []) {
      const key = sk.name.trim().toLowerCase();
      if (key && !seenSkillNames.has(key)) {
        seenSkillNames.add(key);
        mappedSkills.push(sk);
      }
    }
  }

  (payload.skills || []).forEach((sk, idx) => {
    const name = (sk?.name || '').trim();
    if (!name) return;
    const key = name.toLowerCase();
    if (seenSkillNames.has(key)) return;
    seenSkillNames.add(key);
    mappedSkills.push({
      id: makeId('sk', idx),
      name,
      level: normalizeSkillLevel(sk.level),
    });
  });

  const mappedProjects: ProjectItem[] = (payload.projects || [])
    .filter((proj) => proj && (proj.title?.trim() || proj.description?.trim()))
    .map((proj, idx) => {
      const { bullets, description } = normalizeBullets(proj.bullets, proj.description);
      return {
        id: makeId('proj', idx),
        title: (proj.title || '').trim(),
        role: (proj.role || '').trim(),
        link: (proj.link || '').trim(),
        description,
        bullets: bullets.length > 1 ? bullets : undefined,
      };
    });

  const dedupeStrings = (existing: string[], incoming?: string[]): string[] => {
    const base = mode === 'merge' ? [...existing] : [];
    const seen = new Set(base.map((s) => s.trim().toLowerCase()));
    for (const item of incoming || []) {
      const trimmed = String(item || '').trim();
      if (!trimmed) continue;
      const key = trimmed.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        base.push(trimmed);
      }
    }
    return base;
  };

  const nextExperiences =
    mappedExperiences.length > 0
      ? mode === 'merge'
        ? [...mappedExperiences, ...(currentState.experiences || [])]
        : mappedExperiences
      : mode === 'merge'
      ? currentState.experiences
      : [];

  const nextEducations =
    mappedEducations.length > 0
      ? mode === 'merge'
        ? [...mappedEducations, ...(currentState.educations || [])]
        : mappedEducations
      : mode === 'merge'
      ? currentState.educations
      : [];

  const nextProjects =
    mappedProjects.length > 0
      ? mode === 'merge'
        ? [...mappedProjects, ...(currentState.projectsList || [])]
        : mappedProjects
      : mode === 'merge'
      ? currentState.projectsList
      : [];

  const incomingSummary = (payload.summary || '').trim();
  const nextSummary = incomingSummary
    ? incomingSummary
    : mode === 'merge'
    ? currentState.summary
    : '';

  const nextLanguages = dedupeStrings(currentState.languagesList || [], payload.languages);
  const nextCerts = dedupeStrings(
    currentState.certificationsList || [],
    payload.certifications
  );
  const nextAwards = dedupeStrings(currentState.awardsList || [], payload.awards);
  const nextInterests = dedupeStrings(
    currentState.interestsList || [],
    payload.interests
  );

  const partialUpdate: Partial<CvState> = {
    contact: nextContact,
    summary: nextSummary,
    experiences: nextExperiences,
    educations: nextEducations,
    skills:
      mappedSkills.length > 0
        ? mappedSkills
        : mode === 'merge'
        ? currentState.skills
        : [],
    languagesList: nextLanguages,
    certificationsList: nextCerts,
    projectsList: nextProjects,
    awardsList: nextAwards,
    interestsList: nextInterests,
    importedFileName: 'LinkedIn Profile',
    showPhoto: nextContact.photoUrl ? true : currentState.showPhoto,
    ...(payload.suggestedTemplate
      ? { activeTemplate: payload.suggestedTemplate as any }
      : {}),
  };

  partialUpdate.sectionOrder = normalizeSectionOrder(currentState.sectionOrder, {
    ...currentState,
    ...partialUpdate,
  });

  return partialUpdate;
}
