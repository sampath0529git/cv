import { CV, ExperienceItem, EducationItem, SkillGroup } from '@/types/cv';
import { CvState } from '@/store/useCvStore';
import { SAMPLE_UK_CV } from '@/data/sampleCv';

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

  const fullName =
    contact.firstName || contact.lastName
      ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim()
      : SAMPLE_UK_CV.personal.fullName;

  const location =
    contact.city || contact.postalCode
      ? [contact.city, contact.postalCode].filter(Boolean).join(', ')
      : SAMPLE_UK_CV.personal.location;

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
      bullets: rawBullets.length > 0 ? rawBullets : [exp.description || ''],
    };
  });

  // Convert educations
  const education: EducationItem[] = (store.educations || []).map((edu, index) => ({
    id: edu.id || `edu-${index}`,
    qualification: edu.degree || 'Degree / Qualification',
    institution: edu.school || 'Institution',
    startDate: edu.startDate || '',
    endDate: edu.endDate || '',
    grade: edu.city ? `Location: ${edu.city}` : undefined,
  }));

  // Convert skills
  const skillItems = (store.skills || []).map((s) => s.name).filter(Boolean);
  const skills: SkillGroup[] =
    skillItems.length > 0
      ? [{ group: 'Core Competencies', items: skillItems }]
      : SAMPLE_UK_CV.skills;

  // Template ID mapping (handle legacy template names if present)
  let templateId = store.activeTemplate || 'london';
  if (templateId === 'castor' || templateId === 'modern-beige') templateId = 'manchester';
  if (templateId === 'capella' || templateId === 'minimal-clean') templateId = 'cambridge';
  if (templateId === 'pollux') templateId = 'glasgow';
  if (templateId === 'regulus') templateId = 'leeds';
  if (templateId === 'executive-navy') templateId = 'edinburgh';
  if (templateId === 'tech-slate') templateId = 'cardiff';

  return {
    personal: {
      fullName: fullName || SAMPLE_UK_CV.personal.fullName,
      jobTitle: contact.jobTitle || SAMPLE_UK_CV.personal.jobTitle,
      email: contact.email || SAMPLE_UK_CV.personal.email,
      phone: contact.phone || SAMPLE_UK_CV.personal.phone,
      location: location || SAMPLE_UK_CV.personal.location,
      linkedin: contact.linkedin || SAMPLE_UK_CV.personal.linkedin,
      website: contact.website || SAMPLE_UK_CV.personal.website,
      photoUrl: contact.photoUrl || undefined,
    },
    personalStatement: store.summary?.trim() || SAMPLE_UK_CV.personalStatement,
    experience: experience.length > 0 ? experience : SAMPLE_UK_CV.experience,
    education: education.length > 0 ? education : SAMPLE_UK_CV.education,
    skills,
    certifications: SAMPLE_UK_CV.certifications,
    projects: SAMPLE_UK_CV.projects,
    languages:
      (store.languagesList || []).length > 0
        ? store.languagesList!.map((lang) => ({ name: lang, level: 'Proficient' }))
        : SAMPLE_UK_CV.languages,
    volunteering: SAMPLE_UK_CV.volunteering,
    interests:
      (store.interestsList || []).length > 0
        ? store.interestsList!
        : SAMPLE_UK_CV.interests,
    references: SAMPLE_UK_CV.references,
    settings: {
      templateId,
      accentColor: store.themeColor || '#1E3A8A',
      fontFamily: fallbackSettings?.fontFamily || 'inter',
      fontScale: fallbackSettings?.fontScale || 'md',
      showPhoto: Boolean(fallbackSettings?.showPhoto),
      sectionOrder: fallbackSettings?.sectionOrder || SAMPLE_UK_CV.settings.sectionOrder,
    },
  };
}

/**
 * Converts a unified CV data model back into CvStore state.
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
      dateOfBirth: '',
      nationality: '',
      drivingLicence: '',
    },
    summary: cv.personalStatement,
    experiences: cv.experience.map((exp) => ({
      id: exp.id,
      jobTitle: exp.role,
      employer: exp.company,
      city: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate === 'Present' ? '' : exp.endDate,
      isCurrent: exp.current,
      description: exp.bullets.join('\n'),
    })),
    educations: cv.education.map((edu) => ({
      id: edu.id,
      degree: edu.qualification,
      school: edu.institution,
      city: edu.grade || '',
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: '',
    })),
    skills: cv.skills.flatMap((group) =>
      group.items.map((item, idx) => ({
        id: `sk-${idx}-${item}`,
        name: item,
        level: 'Advanced' as const,
      }))
    ),
    languagesList: cv.languages.map((l) => l.name),
    interestsList: cv.interests,
    themeColor: cv.settings.accentColor,
    activeTemplate: cv.settings.templateId as any,
  };
}
