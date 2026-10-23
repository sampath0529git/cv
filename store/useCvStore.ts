import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkExperience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  description: string;
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
  | 'castor'
  | 'capella'
  | 'pollux'
  | 'regulus'
  | 'modern-beige'
  | 'minimal-clean'
  | 'executive-navy'
  | 'tech-slate';

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
  importedFileName: string | null;

  // Actions
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
  addExperience: () => void;
  updateExperience: (id: string, fields: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;

  // Education actions
  addEducation: () => void;
  updateEducation: (id: string, fields: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills actions
  addSkill: (name: string, level?: SkillItem['level']) => void;
  removeSkill: (id: string) => void;

  // Summary
  setSummary: (text: string) => void;

  // Language & Interests
  addLanguageItem: (lang: string) => void;
  removeLanguageItem: (index: number) => void;
  addInterestItem: (interest: string) => void;
  removeInterestItem: (index: number) => void;

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

const initialExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    jobTitle: 'Job title',
    employer: 'Company name',
    city: 'City',
    startDate: 'January 2023',
    endDate: 'Current',
    isCurrent: true,
    description: 'Your main missions accomplished during this job, which could arouse interest in your future employer.\n• Responsibilities and results obtained.',
  },
  {
    id: 'exp-2',
    jobTitle: 'Job title',
    employer: 'Company name',
    city: 'City',
    startDate: 'January 2021',
    endDate: 'December 2022',
    isCurrent: false,
    description: 'Your main missions accomplished during this job, which could arouse interest in your future employer.\n• Responsibilities and results obtained.',
  },
];

const initialEducations: Education[] = [
  {
    id: 'edu-1',
    degree: 'Name of the diploma / training',
    school: 'Name of the school / institution',
    city: 'City',
    startDate: '2020',
    endDate: '2019',
    description: '• Projects completed related to the position sought\n• Grades, honors',
  },
  {
    id: 'edu-2',
    degree: 'Name of the diploma / training',
    school: 'Name of the school / institution',
    city: 'City',
    startDate: '2018',
    endDate: '',
    description: '• Projects completed related to the position sought\n• Grades, honors',
  },
];

const initialSkills: SkillItem[] = [
  { id: 'sk-1', name: 'Skill 1', level: 'Advanced' },
  { id: 'sk-2', name: 'Skill 2', level: 'Advanced' },
  { id: 'sk-3', name: 'Skill 3', level: 'Advanced' },
];

const initialLanguages: string[] = ['Language (C1)', 'Language (B2)'];
const initialInterests: string[] = ['Area of interest'];

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      currentStep: 1,
      language: 'English (UK)',
      activeTemplate: 'castor',
      themeColor: '#C4A482',
      contact: initialContact,
      experiences: initialExperiences,
      educations: initialEducations,
      skills: initialSkills,
      summary: 'Short description of your background and professional project. Example: After an initial 3 years of experience in sales in the car yard ready to wear sector...',
      languagesList: initialLanguages,
      interestsList: initialInterests,
      importedFileName: null,

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

      addExperience: () =>
        set((state) => ({
          experiences: [
            ...state.experiences,
            {
              id: 'exp-' + Date.now(),
              jobTitle: '',
              employer: '',
              city: '',
              startDate: '',
              endDate: '',
              isCurrent: false,
              description: '',
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

      addEducation: () =>
        set((state) => ({
          educations: [
            ...state.educations,
            {
              id: 'edu-' + Date.now(),
              degree: '',
              school: '',
              city: '',
              startDate: '',
              endDate: '',
              description: '',
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
          importedFileName: null,
        }),
    }),
    {
      name: 'yourbrand-cv-builder-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        language: state.language,
        activeTemplate: state.activeTemplate,
        themeColor: state.themeColor,
        contact: state.contact,
        experiences: state.experiences,
        educations: state.educations,
        skills: state.skills,
        summary: state.summary,
        languagesList: state.languagesList,
        interestsList: state.interestsList,
      }),
    }
  )
);
