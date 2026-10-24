import { CV, ExperienceItem, EducationItem, SkillGroup } from '@/types/cv';
import { CvState } from '@/store/useCvStore';
import { SAMPLE_UK_CV } from '@/data/sampleCv';

/**
 * Converts the existing CvStore state into the unified UK CV data model.
 * Adheres strictly to the single-source-of-truth rule:
 * User-entered data is never discarded, truncated, or overridden with dummy text.
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

  // Convert experiences
  const experience: ExperienceItem[] = (store.experiences || []).map((exp, index) => {
    const rawBullets = (exp.description || '')
      .split('\n')
      .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    return {
      id: exp.id || `exp-${index}`,
      role: exp.jobTitle || 'Role Title',
      company: exp.employer || 'Organisation',
      location: exp.city || '',
      startDate: exp.startDate || '',
      endDate: exp.isCurrent ? 'Present' : exp.endDate || '',
      current: Boolean(exp.isCurrent),
      bullets:
        exp.bullets && exp.bullets.length > 0
          ? exp.bullets
          : rawBullets.length > 0
          ? rawBullets
          : exp.description
          ? [exp.description]
          : [],
      description: exp.description || '',
    };
  });

  // Convert educations
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
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      grade: edu.grade || undefined,
      description: edu.description || undefined,
      bullets: edu.bullets && edu.bullets.length > 0 ? edu.bullets : (rawBullets.length > 0 ? rawBullets : undefined),
    };
  });

  // Convert skills
  const skillItems = (store.skills || []).map((s) => s.name).filter(Boolean);
  const skills: SkillGroup[] =
    skillItems.length > 0
      ? [{ group: 'Key Skills', items: skillItems }]
      : [];

  // Template ID mapping (defaults to uk-traditional)
  const templateId = (store.activeTemplate as string) || fallbackSettings?.templateId || 'uk-traditional';

  return {
    personal: {
      fullName,
      jobTitle: contact.jobTitle || '',
      email: contact.email || '',
      phone: contact.phone || '',
      location,
      linkedin: contact.linkedin || '',
      website: contact.website || '',
      dateOfBirth: contact.dateOfBirth || '',
      nationality: contact.nationality || '',
      drivingLicence: contact.drivingLicence || '',
      photoUrl: contact.photoUrl || undefined,
    },
    personalStatement: store.summary || '',
    experience,
    education,
    skills,
    certifications: store.certificationsList || [],
    projects: store.projectsList || [],
    languages: (store.languagesList || []).map((lang) => ({ name: lang, level: 'Proficient' })),
    volunteering: [],
    interests: store.interestsList || [],
    awards: store.awardsList || [],
    customSections: store.customSections || [],
    references: store.referencesText !== undefined ? store.referencesText : 'References available on request',
    settings: {
      templateId,
      accentColor: store.themeColor || '#1E3A8A',
      fontFamily: store.fontFamily || fallbackSettings?.fontFamily || 'inter',
      fontScale: fallbackSettings?.fontScale || 'md',
      showPhoto: Boolean(fallbackSettings?.showPhoto),
      sectionOrder: store.sectionOrder || fallbackSettings?.sectionOrder || SAMPLE_UK_CV.settings.sectionOrder,
    },
  };
}

/**
 * Converts a unified CV data model back into CvStore state (e.g. for Reset Sample or Import).
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
      description: exp.bullets ? exp.bullets.join('\n') : (exp.description || ''),
    })),
    educations: (cv.education || []).map((edu) => ({
      id: edu.id,
      degree: edu.qualification,
      school: edu.institution,
      city: edu.location || '',
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description || (edu.bullets ? edu.bullets.join('\n') : ''),
    })),
    skills: (cv.skills || []).flatMap((group) =>
      group.items.map((item, idx) => ({
        id: `sk-${idx}-${item}`,
        name: item,
        level: 'Advanced' as const,
      }))
    ),
    languagesList: (cv.languages || []).map((l) => l.name),
    interestsList: cv.interests || [],
    certificationsList: cv.certifications || [],
    projectsList: cv.projects || [],
    awardsList: cv.awards || [],
    referencesText: cv.references || 'References available on request',
    customSections: cv.customSections || [],
    themeColor: cv.settings.accentColor,
    activeTemplate: cv.settings.templateId as any,
  };
}
