import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProjectItem, CustomSectionItem } from '@/types/cv';

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

export type TemplateId =
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
  | 'minimal-clean'
  | 'executive-navy'
  | 'tech-slate'
  | (string & {});

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
  customSections: CustomSectionItem[];
  importedFileName: string | null;
  customPdfFileName: string;
  fontFamily: string;
  sectionOrder: string[];

  // Actions
  setCustomPdfFileName: (name: string) => void;
  setFontFamily: (font: string) => void;
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
  addProject: (project: ProjectItem) => void;
  removeProject: (index: number) => void;
  addAward: (award: string) => void;
  removeAward: (index: number) => void;
  setReferencesText: (text: string) => void;
  addCustomSection: (section: CustomSectionItem) => void;
  removeCustomSection: (id: string) => void;
  updateCustomSection: (id: string, fields: Partial<CustomSectionItem>) => void;

  // Import
  setImportedFile: (fileName: string) => void;
  loadParsedCvData: (data: Partial<CvState>) => void;
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

const initialExperiences: WorkExperience[] = [];

const initialEducations: Education[] = [];

const initialSkills: SkillItem[] = [];

const initialLanguages: string[] = [];
const initialInterests: string[] = [];

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      currentStep: 1,
      language: 'English (UK)',
      activeTemplate: 'uk-traditional',
      themeColor: '#000000',
      contact: initialContact,
      experiences: initialExperiences,
      educations: initialEducations,
      skills: initialSkills,
      summary: '',
      languagesList: initialLanguages,
      interestsList: initialInterests,
      certificationsList: [],
      projectsList: [],
      awardsList: [],
      referencesText: 'References available on request',
      customSections: [],
      importedFileName: null,
      customPdfFileName: '',
      fontFamily: 'inter',
      sectionOrder: ['summary', 'education', 'experience', 'skills', 'languages', 'interests'],

      setCustomPdfFileName: (customPdfFileName) => set({ customPdfFileName }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setSectionOrder: (sectionOrder) => set({ sectionOrder }),
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      setLanguage: (language) => set({ language }),
      setTemplate: (activeTemplate) => set({ activeTemplate }),
      setThemeColor: (themeColor) => set({ themeColor }),

      updateContact: (fields) =>
        set((state) => ({
          contact: { ...state.contact, ...fields },
        })),

      setPhoto: (photoUrl) =>
        set((state) => ({
          contact: { ...state.contact, photoUrl },
        })),

      removePhoto: () =>
        set((state) => ({
          contact: { ...state.contact, photoUrl: '' },
        })),

      addExperience: (fields) =>
        set((state) => ({
          experiences: [
            ...state.experiences,
            {
              id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
              jobTitle: '',
              employer: '',
              city: '',
              startDate: '',
              endDate: '',
              isCurrent: false,
              description: '',
              ...fields,
            },
          ],
        })),

      updateExperience: (id, fields) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...fields } : exp
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((exp) => exp.id !== id),
        })),

      moveExperience: (id, direction) =>
        set((state) => {
          const index = state.experiences.findIndex((e) => e.id === id);
          if (index === -1) return state;
          const targetIndex = direction === 'up' ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= state.experiences.length) return state;
          const updated = [...state.experiences];
          const [moved] = updated.splice(index, 1);
          updated.splice(targetIndex, 0, moved);
          return { experiences: updated };
        }),

      addEducation: (fields) =>
        set((state) => ({
          educations: [
            ...state.educations,
            {
              id: 'edu-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
              degree: '',
              school: '',
              city: '',
              startDate: '',
              endDate: '',
              description: '',
              ...fields,
            },
          ],
        })),

      updateEducation: (id, fields) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.id === id ? { ...edu, ...fields } : edu
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((edu) => edu.id !== id),
        })),

      moveEducation: (id, direction) =>
        set((state) => {
          const index = state.educations.findIndex((e) => e.id === id);
          if (index === -1) return state;
          const targetIndex = direction === 'up' ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= state.educations.length) return state;
          const updated = [...state.educations];
          const [moved] = updated.splice(index, 1);
          updated.splice(targetIndex, 0, moved);
          return { educations: updated };
        }),

      addSkill: (name, level = 'Advanced') =>
        set((state) => {
          if (!name.trim()) return state;
          return {
            skills: [
              ...state.skills,
              {
                id: 'sk-' + Date.now(),
                name: name.trim(),
                level,
              },
            ],
          };
        }),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((sk) => sk.id !== id),
        })),

      setSummary: (summary) => set({ summary }),

      addLanguageItem: (lang) =>
        set((state) => {
          if (!lang.trim()) return state;
          return { languagesList: [...state.languagesList, lang.trim()] };
        }),

      removeLanguageItem: (index) =>
        set((state) => ({
          languagesList: state.languagesList.filter((_, i) => i !== index),
        })),

      addInterestItem: (interest) =>
        set((state) => {
          if (!interest.trim()) return state;
          return { interestsList: [...state.interestsList, interest.trim()] };
        }),

      removeInterestItem: (index) =>
        set((state) => ({
          interestsList: state.interestsList.filter((_, i) => i !== index),
        })),

      addCertification: (cert) =>
        set((state) => {
          if (!cert.trim()) return state;
          return { certificationsList: [...state.certificationsList, cert.trim()] };
        }),

      removeCertification: (index) =>
        set((state) => ({
          certificationsList: state.certificationsList.filter((_, i) => i !== index),
        })),

      addProject: (project) =>
        set((state) => ({
          projectsList: [...state.projectsList, project],
        })),

      removeProject: (index) =>
        set((state) => ({
          projectsList: state.projectsList.filter((_, i) => i !== index),
        })),

      addAward: (award) =>
        set((state) => {
          if (!award.trim()) return state;
          return { awardsList: [...state.awardsList, award.trim()] };
        }),

      removeAward: (index) =>
        set((state) => ({
          awardsList: state.awardsList.filter((_, i) => i !== index),
        })),

      setReferencesText: (referencesText) => set({ referencesText }),

      addCustomSection: (section) =>
        set((state) => ({
          customSections: [...state.customSections, section],
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          customSections: state.customSections.filter((s) => s.id !== id),
        })),

      updateCustomSection: (id, fields) =>
        set((state) => ({
          customSections: state.customSections.map((s) =>
            s.id === id ? { ...s, ...fields } : s
          ),
        })),

      setImportedFile: (importedFileName) => set({ importedFileName }),

      loadParsedCvData: (data) =>
        set((state) => ({
          ...state,
          ...data,
          contact: { ...state.contact, ...(data.contact || {}) },
        })),

      resetCv: () =>
        set({
          currentStep: 1,
          contact: initialContact,
          experiences: initialExperiences,
          educations: initialEducations,
          skills: initialSkills,
          summary: '',
          languagesList: [],
          interestsList: [],
          certificationsList: [],
          projectsList: [],
          awardsList: [],
          referencesText: 'References available on request',
          customSections: [],
          importedFileName: null,
        }),
    }),
    {
      name: 'yourbrand-cv-builder-storage-v4',
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (state.experiences) {
          state.experiences = state.experiences.filter(
            (e) =>
              e.id !== 'exp-1' &&
              e.id !== 'exp-2' &&
              e.jobTitle !== 'Job title' &&
              Boolean(e.jobTitle?.trim() || e.employer?.trim())
          );
        }
        if (state.educations) {
          state.educations = state.educations.filter(
            (e) =>
              e.id !== 'edu-1' &&
              e.id !== 'edu-2' &&
              e.degree !== 'Name of the diploma / training' &&
              Boolean(e.degree?.trim() || e.school?.trim())
          );
        }
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
        customSections: state.customSections || [],
        customPdfFileName: state.customPdfFileName || '',
        fontFamily: state.fontFamily || 'inter',
        sectionOrder: state.sectionOrder || ['summary', 'education', 'experience', 'skills', 'languages', 'interests'],
      }),
    }
  )
);
