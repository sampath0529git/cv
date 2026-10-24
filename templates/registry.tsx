import React from 'react';
import { TemplateDefinition, TemplateCategory } from '@/types/cv';
import TorontoTemplate from './TorontoTemplate';
import UkTraditionalTemplate from './UkTraditionalTemplate';
import ModernExecutiveTemplate from './ModernExecutiveTemplate';
import MinimalCleanTemplate from './MinimalCleanTemplate';
import TechCompactTemplate from './TechCompactTemplate';
import GraduateStarterTemplate from './GraduateStarterTemplate';
import ClassicCorporateTemplate from './ClassicCorporateTemplate';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'Executive',
  'Classic',
  'Modern',
  'Minimal',
  'Graduate',
];

/**
 * CV Template Registry — ATS-compliant, print-calibrated A4 layouts.
 */
export const CV_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'hopkins',
    name: 'Hopkins',
    category: 'Executive',
    description: 'Contemporary executive header band with optional profile photo, crisp section hierarchy, and refined spacing.',
    bestFor: 'Directors, senior managers, operations leads, and corporate professionals.',
    supportsPhoto: true,
    component: (props) => <ModernExecutiveTemplate {...props} />,
  },
  {
    id: 'toronto',
    name: 'Toronto',
    category: 'Modern',
    description: 'Balanced two-column architecture with sidebar contact details, visual skill bars, education, and main career timeline.',
    bestFor: 'Finance, consulting, retail management, marketing, and client-facing roles.',
    supportsPhoto: true,
    component: (props) => <TorontoTemplate {...props} />,
  },
  {
    id: 'classic-corporate',
    name: 'London',
    category: 'Classic',
    description: 'Distinguished City of London & Canary Wharf corporate layout with crisp accent rules and structured achievements.',
    bestFor: 'Law, accounting, investment banking, and advisory firms.',
    supportsPhoto: true,
    component: (props) => <ClassicCorporateTemplate {...props} />,
  },
  {
    id: 'minimal-clean',
    name: 'Oxford',
    category: 'Minimal',
    description: 'Swiss-inspired typographic precision, generous margins, date-column grid, and maximum ATS clarity.',
    bestFor: 'Consultants, product leaders, architects, and minimalist professionals.',
    supportsPhoto: false,
    component: (props) => <MinimalCleanTemplate {...props} />,
  },
  {
    id: 'yale',
    name: 'Yale',
    category: 'Modern',
    description: 'High-density technical layout featuring structured stack tags, engineering impact bullets, and project highlights.',
    bestFor: 'Software engineers, data scientists, DevOps, and technical product managers.',
    supportsPhoto: false,
    component: (props) => <TechCompactTemplate {...props} />,
  },
  {
    id: 'graduate-starter',
    name: 'Cambridge',
    category: 'Graduate',
    description: 'Education-first layout spotlighting degree classification, honours coursework, internships, and core skills.',
    bestFor: 'University students, recent graduates, and early-career candidates.',
    supportsPhoto: false,
    component: (props) => <GraduateStarterTemplate {...props} />,
  },
  {
    id: 'uk-traditional',
    name: 'Westminster',
    category: 'Classic',
    description: 'Traditional British academic & civil service CV with classic serif proportions and horizontal section rules.',
    bestFor: 'Academia, public sector, civil service, medicine, and traditional UK employers.',
    supportsPhoto: false,
    component: (props) => <UkTraditionalTemplate {...props} />,
  },
];

export function getTemplateById(id?: string): TemplateDefinition {
  if (!id) return CV_TEMPLATES[0];
  const found = CV_TEMPLATES.find((t) => t.id === id);
  return found || CV_TEMPLATES[0];
}
