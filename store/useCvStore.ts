import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProjectItem, CustomSectionItem, FontScale } from '@/types/cv';

function createUniqueId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function parseDescriptionBullets(description?: string): string[] {
  if (!description) return [];
  return description
    .split('\n')
    .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(Boolean);
}

function ensureSectionInOrder(order: string[], key: string): string[] {
  const normalized = order.map((k) => (k === 'summary' ? 'statement' : k));
  if (normalized.includes(key)) return normalized;
  return [...normalized, key];
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  bullets?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
  grade?: string;
  bullets?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ContactDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  photoUrl: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  dateOfBirth: string;
  nationality: string;
  linkedin: string;
  website: string;
  drivingLicence: string;
}

export type SaveStatus = 'idle' | 'saving' | 'saved';

export type TemplateId =
  | 'hopkins'
  | 'toronto'
  | 'classic-corporate'
  | 'minimal-clean'
  | 'yale'
  | 'graduate-starter'
  | 'uk-traditional'
  | 'london'
  | 'bristol'
  | 'oxford'
  | 'york'
  | 'manchester'
  | 'leeds'
  | 'birmingham'
  | 'glasgow'
  | 'cardiff'
  | 'brighton'
  | 'cambridge'
  | 'bath'
  | 'norwich'
  | 'edinburgh'
  | 'kensington'
  | 'canary'
  | 'shoreditch'
  | 'newcastle'
  | 'durham'
  | 'nottingham'
  | 'castor'
  | 'capella'
  | 'pollux'
  | 'regulus'
  | 'modern-beige'
  | 'executive-navy'
  | 'tech-slate'
  | (string & {});

export interface ImportBackup {
  contact: ContactDetails;
  experiences: WorkExperience[];
  educations: Education[];
  skills: SkillItem[];
  summary: string;
  languagesList: string[];
  interestsList: string[];
  certificationsList: string[];
  projectsList: ProjectItem[];
  awardsList: string[];
  referencesText: string;
  includeReferences: boolean;
  customSections: CustomSectionItem[];
  importedFileName: string | null;
  sectionOrder: string[];
  showPhoto: boolean;
  activeTemplate?: TemplateId;
  timestamp: number;
}

export interface DetectedImportStats {
  hasContact: boolean;
  contactFieldsCount: number;
  experienceCount: number;
  educationCount: number;
  skillCount: number;
  hasSummary: boolean;
  certificationCount: number;
  projectCount: number;
  languageCount: number;
  autoDetectedSections: string[];
}

export interface CvState {
  currentStep: number;
  language: string;
  activeTemplate: TemplateId;
  themeColor: string;
  contact: ContactDetails;
  experiences: WorkExperience[];
  educations: Education[];
  skills: SkillItem[];
  summary: string;
  languagesList: string[];
  interestsList: string[];
  certificationsList: string[];
  projectsList: ProjectItem[];
  awardsList: string[];
  referencesText: string;
  includeReferences: boolean;
  customSections: CustomSectionItem[];
  importedFileName: string | null;
  lastImportBackup: ImportBackup | null;
  detectedImportStats: DetectedImportStats | null;
  customPdfFileName: string;
  fontFamily: string;
  fontScale: FontScale;
  showPhoto: boolean;
  sectionOrder: string[];

  // Transient Auto-Save Telemetry
  saveStatus: SaveStatus;
  lastSavedAt: number | null;

  // Universal CVMaker-style field updater + granular actions
  updateField: (section: string, field: string, value?: any) => void;
  setCustomPdfFileName: (name: string) => void;
  setFontFamily: (font: string) => void;
  setFontScale: (scale: FontScale) => void;
  setShowPhoto: (show: boolean) => void;
  setSectionOrder: (order: string[]) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setLanguage: (lang: string) => void;
  setTemplate: (template: TemplateId) => void;
  setThemeColor: (color: string) => void;
  updateContact: (fields: Partial<ContactDetails>) => void;
  setPhoto: (dataUrl: string) => void;
  removePhoto: () => void;

  // Experience actions
  addExperience: (fields?: Partial<Omit<WorkExperience, 'id'>>) => void;
  updateExperience: (id: string, fields: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  moveExperience: (id: string, direction: 'up' | 'down') => void;

  // Education actions
  addEducation: (fields?: Partial<Omit<Education, 'id'>>) => void;
  updateEducation: (id: string, fields: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  moveEducation: (id: string, direction: 'up' | 'down') => void;

  // Skills actions
  addSkill: (name: string, level?: SkillItem['level']) => void;
  updateSkillLevel: (id: string, level: SkillItem['level']) => void;
  removeSkill: (id: string) => void;

  // Summary
  setSummary: (text: string) => void;

  // Language, Interests, Certifications, Projects, Awards, References, Custom Sections
  addLanguageItem: (lang: string) => void;
  removeLanguageItem: (index: number) => void;
  addInterestItem: (interest: string) => void;
  removeInterestItem: (index: number) => void;
  addCertification: (cert: string) => void;
  removeCertification: (index: number) => void;
  addProject: (project?: Partial<ProjectItem>) => void;
  updateProject: (index: number, fields: Partial<ProjectItem>) => void;
  removeProject: (index: number) => void;
  addAward: (award: string) => void;
  removeAward: (index: number) => void;
  setReferencesText: (text: string) => void;
  setIncludeReferences: (include: boolean) => void;
  addCustomSection: (section?: Partial<CustomSectionItem>) => void;
  removeCustomSection: (id: string) => void;
  updateCustomSection: (id: string, fields: Partial<CustomSectionItem>) => void;

  // Import & Reset
  setImportedFile: (fileName: string) => void;
  loadParsedCvData: (data: Partial<CvState>) => void;
  revertLastImport: () => void;
  dismissRevertImport: () => void;
  clearImportStatus: () => void;
  resetCv: () => void;
}

const initialContact: ContactDetails = {
  firstName: 'Sampath',
  lastName: 'Sandaruwan',
  jobTitle: '',
  photoUrl: '',
  email: 'sampathwork888@gmail.com',
  phone: '',
  postalCode: '',
  city: '',
  dateOfBirth: '',
  nationality: '',
  linkedin: '',
  website: '',
  drivingLicence: '',
};

const DEFAULT_CORE_ORDER = [
  'statement',
  'experience',
  'education',
  'skills',
  'languages',
  'interests',
];

let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSavedStatus(set: (partial: Partial<CvState>) => void): void {
  if (typeof window === 'undefined') return;
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
  autoSaveTimer = setTimeout(() => {
    set({
      saveStatus: 'saved',
      lastSavedAt: Date.now(),
    });
  }, 260);
}

export const useCvStore = create<CvState>()(
  persist(
    (set) => {
      const mutate = (
        updater: Partial<CvState> | ((state: CvState) => Partial<CvState>)
      ) => {
        set((state) => {
          const patch = typeof updater === 'function' ? updater(state) : updater;
          return {
            ...patch,
            saveStatus: 'saving',
          };
        });
        scheduleSavedStatus(set);
      };

      return {
        currentStep: 1,
        language: 'English (UK)',
        activeTemplate: 'hopkins',
        themeColor: '#4B4DED',
        contact: initialContact,
        experiences: [],
        educations: [],
        skills: [],
        summary: '',
        languagesList: [],
        interestsList: [],
        certificationsList: [],
        projectsList: [],
        awardsList: [],
        referencesText: 'References available on request',
        includeReferences: false,
        customSections: [],
        importedFileName: null,
        lastImportBackup: null,
        detectedImportStats: null,
        customPdfFileName: '',
        fontFamily: 'jakarta',
        fontScale: 'md',
        showPhoto: true,
        sectionOrder: [...DEFAULT_CORE_ORDER],
        saveStatus: 'idle',
        lastSavedAt: null,

        updateField: (section, field, value) =>
          mutate((state) => {
            if (section === 'contact') {
              return {
                contact: {
                  ...state.contact,
                  [field]: value,
                },
              };
            }
            const currentSectionVal = (state as any)[section];
            if (
              currentSectionVal &&
              typeof currentSectionVal === 'object' &&
              !Array.isArray(currentSectionVal) &&
              field
            ) {
              return {
                [section]: {
                  ...currentSectionVal,
                  [field]: value,
                },
              } as Partial<CvState>;
            }
            return {
              [section]: value !== undefined ? value : field,
            } as Partial<CvState>;
          }),

        setCustomPdfFileName: (customPdfFileName) => mutate({ customPdfFileName }),
        setFontFamily: (fontFamily) => mutate({ fontFamily }),
        setFontScale: (fontScale) => mutate({ fontScale }),
        setShowPhoto: (showPhoto) => mutate({ showPhoto }),
        setSectionOrder: (sectionOrder) => mutate({ sectionOrder: [...sectionOrder] }),
        setStep: (step) =>
          set({ currentStep: Math.max(1, Math.min(8, step)) }),
        nextStep: () =>
          set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
        prevStep: () =>
          set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
        setLanguage: (language) => mutate({ language }),
        setTemplate: (activeTemplate) => mutate({ activeTemplate }),
        setThemeColor: (themeColor) => mutate({ themeColor }),

        updateContact: (fields) =>
          mutate((state) => ({
            contact: { ...state.contact, ...fields },
          })),

        setPhoto: (photoUrl) =>
          mutate((state) => ({
            showPhoto: true,
            contact: { ...state.contact, photoUrl },
          })),

        removePhoto: () =>
          mutate((state) => ({
            contact: { ...state.contact, photoUrl: '' },
          })),

        addExperience: (fields) =>
          mutate((state) => {
            const desc = fields?.description ?? '';
            const syncedBullets =
              fields?.bullets !== undefined ? fields.bullets : parseDescriptionBullets(desc);
            return {
              experiences: [
                ...state.experiences,
                {
                  id: createUniqueId('exp'),
                  jobTitle: '',
                  employer: '',
                  city: '',
                  startDate: '',
                  endDate: '',
                  isCurrent: false,
                  description: '',
                  ...fields,
                  bullets: syncedBullets,
                },
              ],
            };
          }),

        updateExperience: (id, fields) =>
          mutate((state) => ({
            experiences: state.experiences.map((exp) => {
              if (exp.id !== id) return exp;
              const nextExp = { ...exp, ...fields };
              if (fields.description !== undefined && fields.bullets === undefined) {
                nextExp.bullets = parseDescriptionBullets(fields.description);
              }
              return nextExp;
            }),
          })),

        removeExperience: (id) =>
          mutate((state) => ({
            experiences: state.experiences.filter((exp) => exp.id !== id),
          })),

        moveExperience: (id, direction) =>
          mutate((state) => {
            const index = state.experiences.findIndex((e) => e.id === id);
            if (index === -1) return {};
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= state.experiences.length) return {};
            const updated = [...state.experiences];
            const [moved] = updated.splice(index, 1);
            updated.splice(targetIndex, 0, moved);
            return { experiences: updated };
          }),

        addEducation: (fields) =>
          mutate((state) => {
            const desc = fields?.description ?? '';
            const parsed = parseDescriptionBullets(desc);
            const syncedBullets =
              fields?.bullets !== undefined
                ? fields.bullets
                : parsed.length > 1
                ? parsed
                : undefined;
            return {
              educations: [
                ...state.educations,
                {
                  id: createUniqueId('edu'),
                  degree: '',
                  school: '',
                  city: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  ...fields,
                  bullets: syncedBullets,
                },
              ],
            };
          }),

        updateEducation: (id, fields) =>
          mutate((state) => ({
            educations: state.educations.map((edu) => {
              if (edu.id !== id) return edu;
              const nextEdu = { ...edu, ...fields };
              if (fields.description !== undefined && fields.bullets === undefined) {
                const parsed = parseDescriptionBullets(fields.description);
                nextEdu.bullets = parsed.length > 1 ? parsed : undefined;
              }
              return nextEdu;
            }),
          })),

        removeEducation: (id) =>
          mutate((state) => ({
            educations: state.educations.filter((edu) => edu.id !== id),
          })),

        moveEducation: (id, direction) =>
          mutate((state) => {
            const index = state.educations.findIndex((e) => e.id === id);
            if (index === -1) return {};
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= state.educations.length) return {};
            const updated = [...state.educations];
            const [moved] = updated.splice(index, 1);
            updated.splice(targetIndex, 0, moved);
            return { educations: updated };
          }),

        addSkill: (name, level = 'Advanced') =>
          mutate((state) => {
            const trimmed = name.trim();
            if (!trimmed) return {};
            return {
              skills: [
                ...state.skills,
                {
                  id: createUniqueId('sk'),
                  name: trimmed,
                  level,
                },
              ],
            };
          }),

        updateSkillLevel: (id, level) =>
          mutate((state) => ({
            skills: state.skills.map((sk) => (sk.id === id ? { ...sk, level } : sk)),
          })),

        removeSkill: (id) =>
          mutate((state) => ({
            skills: state.skills.filter((sk) => sk.id !== id),
          })),

        setSummary: (summary) => mutate({ summary }),

        addLanguageItem: (lang) =>
          mutate((state) => {
            if (!lang.trim()) return {};
            return { languagesList: [...state.languagesList, lang.trim()] };
          }),

        removeLanguageItem: (index) =>
          mutate((state) => ({
            languagesList: state.languagesList.filter((_, i) => i !== index),
          })),

        addInterestItem: (interest) =>
          mutate((state) => {
            if (!interest.trim()) return {};
            return { interestsList: [...state.interestsList, interest.trim()] };
          }),

        removeInterestItem: (index) =>
          mutate((state) => ({
            interestsList: state.interestsList.filter((_, i) => i !== index),
          })),

        addCertification: (cert) =>
          mutate((state) => {
            const trimmed = cert.trim();
            if (!trimmed) return {};
            return {
              certificationsList: [...state.certificationsList, trimmed],
              sectionOrder: ensureSectionInOrder(state.sectionOrder, 'certifications'),
            };
          }),

        removeCertification: (index) =>
          mutate((state) => ({
            certificationsList: state.certificationsList.filter((_, i) => i !== index),
          })),

        addProject: (project) =>
          mutate((state) => {
            const desc = project?.description ?? '';
            const bullets =
              project?.bullets !== undefined
                ? project.bullets
                : parseDescriptionBullets(desc);
            const nextProj: ProjectItem = {
              id: project?.id || createUniqueId('proj'),
              title: project?.title ?? '',
              role: project?.role ?? '',
              link: project?.link ?? '',
              description: desc,
              technologies: project?.technologies,
              bullets: bullets.length > 1 ? bullets : undefined,
            };
            return {
              projectsList: [...state.projectsList, nextProj],
              sectionOrder: ensureSectionInOrder(state.sectionOrder, 'projects'),
            };
          }),

        updateProject: (index, fields) =>
          mutate((state) => ({
            projectsList: state.projectsList.map((proj, idx) => {
              if (idx !== index) return proj;
              const nextProj = { ...proj, ...fields };
              if (fields.description !== undefined && fields.bullets === undefined) {
                const parsed = parseDescriptionBullets(fields.description);
                nextProj.bullets = parsed.length > 1 ? parsed : undefined;
              }
              return nextProj;
            }),
          })),

        removeProject: (index) =>
          mutate((state) => ({
            projectsList: state.projectsList.filter((_, i) => i !== index),
          })),

        addAward: (award) =>
          mutate((state) => {
            const trimmed = award.trim();
            if (!trimmed) return {};
            return {
              awardsList: [...state.awardsList, trimmed],
              sectionOrder: ensureSectionInOrder(state.sectionOrder, 'awards'),
            };
          }),

        removeAward: (index) =>
          mutate((state) => ({
            awardsList: state.awardsList.filter((_, i) => i !== index),
          })),

        setReferencesText: (referencesText) =>
          mutate((state) => ({
            referencesText,
            sectionOrder: state.includeReferences
              ? ensureSectionInOrder(state.sectionOrder, 'references')
              : state.sectionOrder,
          })),

        setIncludeReferences: (includeReferences) =>
          mutate((state) => ({
            includeReferences,
            sectionOrder: includeReferences
              ? ensureSectionInOrder(state.sectionOrder, 'references')
              : state.sectionOrder,
          })),

        addCustomSection: (section) =>
          mutate((state) => {
            const content = section?.content ?? '';
            const parsed = parseDescriptionBullets(content);
            const nextSection: CustomSectionItem = {
              id: section?.id || createUniqueId('custom'),
              title: section?.title ?? '',
              content,
              bullets:
                section?.bullets !== undefined
                  ? section.bullets
                  : parsed.length > 1
                  ? parsed
                  : undefined,
            };
            return {
              customSections: [...state.customSections, nextSection],
              sectionOrder: ensureSectionInOrder(state.sectionOrder, 'custom'),
            };
          }),

        removeCustomSection: (id) =>
          mutate((state) => ({
            customSections: state.customSections.filter((s) => s.id !== id),
          })),

        updateCustomSection: (id, fields) =>
          mutate((state) => ({
            customSections: state.customSections.map((s) => {
              if (s.id !== id) return s;
              const nextSec = { ...s, ...fields };
              if (fields.content !== undefined && fields.bullets === undefined) {
                const parsed = parseDescriptionBullets(fields.content);
                nextSec.bullets = parsed.length > 1 ? parsed : undefined;
              }
              return nextSec;
            }),
          })),

        setImportedFile: (importedFileName) => mutate({ importedFileName }),

        loadParsedCvData: (data) =>
          mutate((state) => {
            const backup: ImportBackup = {
              contact: { ...state.contact },
              experiences: state.experiences.map((e) => ({
                ...e,
                bullets: e.bullets ? [...e.bullets] : undefined,
              })),
              educations: state.educations.map((e) => ({
                ...e,
                bullets: e.bullets ? [...e.bullets] : undefined,
              })),
              skills: state.skills.map((s) => ({ ...s })),
              summary: state.summary,
              languagesList: [...state.languagesList],
              interestsList: [...state.interestsList],
              certificationsList: [...state.certificationsList],
              projectsList: state.projectsList.map((p) => ({
                ...p,
                bullets: p.bullets ? [...p.bullets] : undefined,
              })),
              awardsList: [...state.awardsList],
              referencesText: state.referencesText,
              includeReferences: state.includeReferences,
              customSections: state.customSections.map((c) => ({
                ...c,
                bullets: c.bullets ? [...c.bullets] : undefined,
              })),
              importedFileName: state.importedFileName,
              sectionOrder: [...state.sectionOrder],
              showPhoto: state.showPhoto,
              activeTemplate: state.activeTemplate,
              timestamp: Date.now(),
            };

            let nextOrder = data.sectionOrder
              ? [...data.sectionOrder]
              : [...state.sectionOrder];
            const nextCerts = data.certificationsList
              ? [...data.certificationsList]
              : state.certificationsList;
            const nextProjects = data.projectsList
              ? [...data.projectsList]
              : state.projectsList;
            const nextAwards = data.awardsList ? [...data.awardsList] : state.awardsList;
            const nextCustom = data.customSections
              ? [...data.customSections]
              : state.customSections;

            if (nextCerts.length > 0) nextOrder = ensureSectionInOrder(nextOrder, 'certifications');
            if (nextProjects.length > 0) nextOrder = ensureSectionInOrder(nextOrder, 'projects');
            if (nextAwards.length > 0) nextOrder = ensureSectionInOrder(nextOrder, 'awards');
            if (nextCustom.length > 0) nextOrder = ensureSectionInOrder(nextOrder, 'custom');

            const autoDetected: string[] = [];
            const hasContact = Boolean(
              (data.contact?.firstName && data.contact.firstName.trim()) ||
              (data.contact?.email && data.contact.email.trim()) ||
              (data.contact?.jobTitle && data.contact.jobTitle.trim())
            );
            if (hasContact) autoDetected.push('Personal Details');
            if (data.experiences && data.experiences.length > 0) {
              autoDetected.push(
                `${data.experiences.length} Experience${data.experiences.length > 1 ? 's' : ''}`
              );
            }
            if (data.educations && data.educations.length > 0) {
              autoDetected.push(
                `${data.educations.length} Education${data.educations.length > 1 ? 's' : ''}`
              );
            }
            if (data.skills && data.skills.length > 0) {
              autoDetected.push(`${data.skills.length} Skills`);
            }
            if (data.summary && data.summary.trim()) {
              autoDetected.push('Executive Summary');
            }
            if (nextCerts.length > 0) {
              autoDetected.push(`${nextCerts.length} Certifications`);
            }
            if (nextProjects.length > 0) {
              autoDetected.push(`${nextProjects.length} Projects`);
            }
            if (data.languagesList && data.languagesList.length > 0) {
              autoDetected.push(`${data.languagesList.length} Languages`);
            }

            const detectedImportStats: DetectedImportStats = {
              hasContact,
              contactFieldsCount: [
                data.contact?.firstName,
                data.contact?.lastName,
                data.contact?.jobTitle,
                data.contact?.email,
                data.contact?.phone,
                data.contact?.city,
                data.contact?.linkedin,
              ].filter(Boolean).length,
              experienceCount: data.experiences?.length || 0,
              educationCount: data.educations?.length || 0,
              skillCount: data.skills?.length || 0,
              hasSummary: Boolean(data.summary && data.summary.trim()),
              certificationCount: nextCerts.length,
              projectCount: nextProjects.length,
              languageCount: data.languagesList?.length || 0,
              autoDetectedSections: autoDetected,
            };

            return {
              ...data,
              lastImportBackup: backup,
              detectedImportStats,
              contact: { ...state.contact, ...(data.contact || {}) },
              experiences: data.experiences ? [...data.experiences] : state.experiences,
              educations: data.educations ? [...data.educations] : state.educations,
              skills: data.skills ? [...data.skills] : state.skills,
              languagesList: data.languagesList ? [...data.languagesList] : state.languagesList,
              interestsList: data.interestsList ? [...data.interestsList] : state.interestsList,
              certificationsList: nextCerts,
              projectsList: nextProjects,
              awardsList: nextAwards,
              customSections: nextCustom,
              sectionOrder: nextOrder,
            };
          }),

        revertLastImport: () =>
          mutate((state) => {
            if (!state.lastImportBackup) return {};
            const backup = state.lastImportBackup;
            return {
              contact: { ...backup.contact },
              experiences: [...backup.experiences],
              educations: [...backup.educations],
              skills: [...backup.skills],
              summary: backup.summary,
              languagesList: [...backup.languagesList],
              interestsList: [...backup.interestsList],
              certificationsList: [...backup.certificationsList],
              projectsList: [...backup.projectsList],
              awardsList: [...backup.awardsList],
              referencesText: backup.referencesText,
              includeReferences: backup.includeReferences,
              customSections: [...backup.customSections],
              importedFileName: backup.importedFileName,
              sectionOrder: [...backup.sectionOrder],
              showPhoto: backup.showPhoto,
              activeTemplate: backup.activeTemplate || state.activeTemplate,
              lastImportBackup: null,
              detectedImportStats: null,
            };
          }),

        dismissRevertImport: () =>
          mutate({ lastImportBackup: null }),

        clearImportStatus: () =>
          mutate({ detectedImportStats: null }),

        resetCv: () =>
          mutate({
            currentStep: 1,
            contact: { ...initialContact },
            experiences: [],
            educations: [],
            skills: [],
            summary: '',
            languagesList: [],
            interestsList: [],
            certificationsList: [],
            projectsList: [],
            awardsList: [],
            referencesText: 'References available on request',
            includeReferences: false,
            customSections: [],
            importedFileName: null,
            lastImportBackup: null,
            sectionOrder: [...DEFAULT_CORE_ORDER],
          }),
      };
    },
    {
      name: 'yourbrand-cv-builder-storage-v4',
      skipHydration: true,
      merge: (persistedState, currentState) => {
        const persisted = (persistedState as Partial<CvState>) || {};
        const cleanedExperiences = Array.isArray(persisted.experiences)
          ? persisted.experiences.filter(
              (e) =>
                e &&
                e.id !== 'exp-1' &&
                e.id !== 'exp-2' &&
                e.jobTitle !== 'Job title'
            )
          : currentState.experiences;

        const cleanedEducations = Array.isArray(persisted.educations)
          ? persisted.educations.filter(
              (e) =>
                e &&
                e.id !== 'edu-1' &&
                e.id !== 'edu-2' &&
                e.degree !== 'Name of the diploma / training'
            )
          : currentState.educations;

        return {
          ...currentState,
          ...persisted,
          saveStatus: 'saved' as SaveStatus,
          contact: {
            ...currentState.contact,
            ...(persisted.contact || {}),
          },
          experiences: cleanedExperiences,
          educations: cleanedEducations,
          skills: Array.isArray(persisted.skills) ? persisted.skills : currentState.skills,
          languagesList: Array.isArray(persisted.languagesList)
            ? persisted.languagesList
            : currentState.languagesList,
          interestsList: Array.isArray(persisted.interestsList)
            ? persisted.interestsList
            : currentState.interestsList,
          certificationsList: Array.isArray(persisted.certificationsList)
            ? persisted.certificationsList
            : currentState.certificationsList,
          projectsList: Array.isArray(persisted.projectsList)
            ? persisted.projectsList
            : currentState.projectsList,
          awardsList: Array.isArray(persisted.awardsList)
            ? persisted.awardsList
            : currentState.awardsList,
          customSections: Array.isArray(persisted.customSections)
            ? persisted.customSections
            : currentState.customSections,
          includeReferences: Boolean(persisted.includeReferences),
          lastImportBackup: (persistedState as any)?.lastImportBackup || null,
        };
      },
      partialize: (state) => ({
        currentStep: state.currentStep,
        language: state.language,
        activeTemplate: state.activeTemplate,
        themeColor: state.themeColor,
        contact: state.contact,
        experiences: state.experiences || [],
        educations: state.educations || [],
        skills: state.skills || [],
        summary: state.summary || '',
        languagesList: state.languagesList || [],
        interestsList: state.interestsList || [],
        certificationsList: state.certificationsList || [],
        projectsList: state.projectsList || [],
        awardsList: state.awardsList || [],
        referencesText: state.referencesText || 'References available on request',
        includeReferences: Boolean(state.includeReferences),
        customSections: state.customSections || [],
        customPdfFileName: state.customPdfFileName || '',
        fontFamily: state.fontFamily || 'jakarta',
        fontScale: state.fontScale || 'md',
        showPhoto: state.showPhoto ?? true,
        sectionOrder: state.sectionOrder || [...DEFAULT_CORE_ORDER],
        lastImportBackup: state.lastImportBackup,
        lastSavedAt: state.lastSavedAt,
      }),
    }
  )
);
