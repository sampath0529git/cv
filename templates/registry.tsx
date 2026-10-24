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
  'Classic',
  'Executive',
  'Minimal',
  'Modern',
  'Graduate',
];

/**
 * CV Template Registry matching user's requested template names (Toronto, Hopkins, Yale, etc.)
 * and professional standards.
 */
export const CV_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'toronto',
    name: 'Toronto',
    category: 'Classic',
    description: 'Clean two-column layout with Personalia, Skills level indicators, Education on the left, and Experience on the right.',
    bestFor: 'Finance, retail, management, consulting, and corporate professional roles.',
    supportsPhoto: false,
    component: (props) => <TorontoTemplate {...props} />,
  },
  {
    id: 'hopkins',
    name: 'Hopkins',
    category: 'Executive',
    description: 'Contemporary executive header band with bold contrast styling and executive profile emphasis.',
    bestFor: 'Directors, senior managers, operations leads, and corporate professionals.',
    supportsPhoto: true,
    component: (props) => <ModernExecutiveTemplate {...props} />,
  },
  {
    id: 'yale',
    name: 'Yale',
    category: 'Modern',
    description: 'Silicon Valley tech engineering layout with technical stack matrix and project highlights.',
    bestFor: 'Software developers, data scientists, and technical product managers.',
    supportsPhoto: false,
    component: (props) => <TechCompactTemplate {...props} />,
  },
  {
    id: 'minimal-clean',
    name: 'Oxford',
    category: 'Minimal',
    description: 'Swiss-inspired typographic restraint, generous whitespace, and maximum ATS efficiency.',
    bestFor: 'Designers, architects, consultants, and minimalist professionals.',
    supportsPhoto: false,
    component: (props) => <MinimalCleanTemplate {...props} />,
  },
  {
    id: 'graduate-starter',
    name: 'Cambridge',
    category: 'Graduate',
    description: 'Education-first structure highlighting degree classification, coursework, and internships.',
    bestFor: 'University students, recent graduates, and early career candidates.',
    supportsPhoto: false,
    component: (props) => <GraduateStarterTemplate {...props} />,
  },
  {
    id: 'classic-corporate',
    name: 'London',
    category: 'Classic',
    description: 'Mayfair and City of London corporate style with deep accent bar and work history.',
    bestFor: 'Law, accounting, banking, and advisory firms.',
    supportsPhoto: false,
    component: (props) => <ClassicCorporateTemplate {...props} />,
  },
];

export function getTemplateById(id?: string): TemplateDefinition {
  if (!id) return CV_TEMPLATES[0];
  const found = CV_TEMPLATES.find((t) => t.id === id);
  return found || CV_TEMPLATES[0];
}
