import React from 'react';
import { TemplateDefinition, TemplateCategory } from '@/types/cv';
import BaseTemplateSkeleton from './BaseTemplateSkeleton';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'Classic',
  'Modern',
  'Minimal',
  'Executive',
  'Creative-Light',
  'Graduate',
];

export const CV_TEMPLATES: TemplateDefinition[] = [
  // --- CLASSIC ---
  {
    id: 'london',
    name: 'London',
    category: 'Classic',
    description: 'Centred name, thin rule dividers, serif headings. Timeless British elegance.',
    bestFor: 'Corporate, finance, consulting, and traditional professional roles.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'bristol',
    name: 'Bristol',
    category: 'Classic',
    description: 'Left-aligned header with small-caps section titles and an accent underline.',
    bestFor: 'Management, communications, higher education, and senior administration.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'oxford',
    name: 'Oxford Classic',
    category: 'Classic',
    description: 'Formal, dense, serif body typography. Ideal for legal, financial, and academic careers.',
    bestFor: 'Lawyers, solicitors, academics, researchers, and civil servants.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'york',
    name: 'York',
    category: 'Classic',
    description: 'Single-line contact header, bold company names, right-aligned dates with clean margins.',
    bestFor: 'Mid-to-senior professionals seeking a direct, high-impact overview.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },

  // --- MODERN ---
  {
    id: 'manchester',
    name: 'Manchester',
    category: 'Modern',
    description: 'Narrow left sidebar for contact, skills, and languages with a wide main experience column.',
    bestFor: 'Tech, digital marketing, operations, and cross-functional project leads.',
    supportsPhoto: true,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="sidebar-left" />,
  },
  {
    id: 'leeds',
    name: 'Leeds',
    category: 'Modern',
    description: 'Right sidebar variant with an accent-coloured top banner highlighting name and job title.',
    bestFor: 'E-commerce, digital transformation, and business analysis.',
    supportsPhoto: true,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="sidebar-left" />,
  },
  {
    id: 'birmingham',
    name: 'Birmingham',
    category: 'Modern',
    description: 'Full-width accent header band with balanced two-column body below for structured scanning.',
    bestFor: 'Engineering, logistics, manufacturing, and supply chain management.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="sidebar-left" />,
  },
  {
    id: 'glasgow',
    name: 'Glasgow',
    category: 'Modern',
    description: 'Sidebar with light accent-tint background, name in main column with high visual hierarchy.',
    bestFor: 'Healthcare, pharmaceuticals, science, and public health leadership.',
    supportsPhoto: true,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="sidebar-left" />,
  },
  {
    id: 'cardiff',
    name: 'Cardiff',
    category: 'Modern',
    description: 'Timeline-style experience with a thin vertical accent line connecting career milestones.',
    bestFor: 'Software developers, product managers, and agile practitioners.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },

  // --- MINIMAL ---
  {
    id: 'brighton',
    name: 'Brighton',
    category: 'Minimal',
    description: 'Generous white space, sans-serif typography, and uppercase micro-headings for clean reading.',
    bestFor: 'Designers, content strategists, architects, and creative directors.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'cambridge',
    name: 'Cambridge Minimal',
    category: 'Minimal',
    description: 'Ultra-clean, monochrome aesthetic with single accent color reserved exclusively for headings.',
    bestFor: 'Scientific researchers, data analysts, economists, and mathematicians.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'bath',
    name: 'Bath',
    category: 'Minimal',
    description: 'Two-tone header with compact spacing engineered to fit high-density experience cleanly.',
    bestFor: 'Experienced contractors, consultants, and career pivoters.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'norwich',
    name: 'Norwich',
    category: 'Minimal',
    description: 'Left-hand date gutter layout with chronological dates aligned beside role descriptions.',
    bestFor: 'Project managers, management consultants, and operations directors.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },

  // --- EXECUTIVE ---
  {
    id: 'edinburgh',
    name: 'Edinburgh Executive',
    category: 'Executive',
    description: 'Authoritative header with a dedicated "Key Achievements" highlight box under the profile.',
    bestFor: 'C-Suite, VP, Managing Directors, and Board Advisory roles.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'kensington',
    name: 'Kensington',
    category: 'Executive',
    description: 'Refined serif/sans pairing with subtle accent vertical rules emphasizing leadership results.',
    bestFor: 'Private equity, wealth management, luxury brand executives, and partners.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'canary',
    name: 'Canary',
    category: 'Executive',
    description: 'Canary Wharf finance/consulting style: compact, metrics-friendly bullets and core skills grid.',
    bestFor: 'Investment banking, risk analysis, FinTech, and strategy consulting.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },

  // --- CREATIVE-LIGHT ---
  {
    id: 'shoreditch',
    name: 'Shoreditch',
    category: 'Creative-Light',
    description: 'Bold oversized typography, subtle accent job title block, and rounded skill tags.',
    bestFor: 'Creative agencies, startup founders, copywriters, and media strategists.',
    supportsPhoto: true,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="sidebar-left" />,
  },
  {
    id: 'newcastle',
    name: 'Newcastle',
    category: 'Creative-Light',
    description: 'Split header (name left, contact right) with geometric accent decoration (ATS-safe CSS).',
    bestFor: 'Digital agencies, public relations, event producers, and brand managers.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },

  // --- GRADUATE ---
  {
    id: 'durham',
    name: 'Durham',
    category: 'Graduate',
    description: 'Education listed first, followed by academic projects/placements, then work experience.',
    bestFor: 'University graduates, postgraduates, intern applicants, and trainee roles.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
  {
    id: 'nottingham',
    name: 'Nottingham',
    category: 'Graduate',
    description: 'Single column with "Key Skills" and "Academic Achievements" up front for early careers.',
    bestFor: 'School leavers, apprentices, career changers, and junior developers.',
    supportsPhoto: false,
    component: (props) => <BaseTemplateSkeleton {...props} layoutVariant="classic" />,
  },
];

export function getTemplateById(id: string): TemplateDefinition {
  return CV_TEMPLATES.find((t) => t.id === id) || CV_TEMPLATES[0];
}
