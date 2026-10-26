import React from 'react';
import { TemplateDefinition, TemplateCategory } from '@/types/cv';
import TorontoTemplate from './TorontoTemplate';
import UkTraditionalTemplate from './UkTraditionalTemplate';
import ModernExecutiveTemplate from './ModernExecutiveTemplate';
import MinimalCleanTemplate from './MinimalCleanTemplate';
import TechCompactTemplate from './TechCompactTemplate';
import GraduateStarterTemplate from './GraduateStarterTemplate';
import ClassicCorporateTemplate from './ClassicCorporateTemplate';
import EdinburghTemplate from './EdinburghTemplate';
import ManchesterTemplate from './ManchesterTemplate';
import BristolTemplate from './BristolTemplate';
import LeedsTemplate from './LeedsTemplate';
import DublinTemplate from './DublinTemplate';
import GlasgowTemplate from './GlasgowTemplate';
import BrightonTemplate from './BrightonTemplate';
import NewcastleTemplate from './NewcastleTemplate';
import BelfastTemplate from './BelfastTemplate';
import CardiffTemplate from './CardiffTemplate';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'Executive',
  'Classic',
  'Modern',
  'Minimal',
  'Creative',
  'Graduate',
  'Tech',
  'Healthcare',
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
  // 10 New UK & European City Templates
  {
    id: 'edinburgh',
    name: 'Edinburgh',
    category: 'Executive',
    description: 'Distinguished executive layout featuring an authoritative header banner, board-level impact metrics, and photo support.',
    bestFor: 'C-suite executives, VP/Directors, non-exec directors, and corporate strategists.',
    supportsPhoto: true,
    component: (props) => <EdinburghTemplate {...props} />,
  },
  {
    id: 'manchester',
    name: 'Manchester',
    category: 'Tech',
    description: 'Modern high-impact tech CV with categorical skill chips, engineering impact metrics, and strict ATS parser compliance.',
    bestFor: 'Full-stack engineers, cloud architects, technical leads, and product engineers.',
    supportsPhoto: false,
    component: (props) => <ManchesterTemplate {...props} />,
  },
  {
    id: 'bristol',
    name: 'Bristol',
    category: 'Creative',
    description: 'Contemporary two-column creative studio architecture with left-hand bio sidebar, photo showcase, and exhibition portfolio highlights.',
    bestFor: 'UI/UX designers, creative directors, brand strategists, and multimedia producers.',
    supportsPhoto: true,
    component: (props) => <BristolTemplate {...props} />,
  },
  {
    id: 'leeds',
    name: 'Leeds',
    category: 'Healthcare',
    description: 'Clinical NHS trust compliant CV with clinical governance, audit metrics, registration numbers, and CPD credentials.',
    bestFor: 'NHS doctors, clinical nurses, allied health professionals, and practice managers.',
    supportsPhoto: false,
    component: (props) => <LeedsTemplate {...props} />,
  },
  {
    id: 'dublin',
    name: 'Dublin',
    category: 'Modern',
    description: 'Sleek European tech hub layout with asymmetric accent header, optional headshot, and dual-track achievements.',
    bestFor: 'Fintech specialists, management consultants, SaaS account executives, and modern analysts.',
    supportsPhoto: true,
    component: (props) => <DublinTemplate {...props} />,
  },
  {
    id: 'glasgow',
    name: 'Glasgow',
    category: 'Executive',
    description: 'Commanding corporate layout with double-ruled gold/slate framing, executive narrative summary, and governance milestones.',
    bestFor: 'Senior operational leaders, finance directors, partners, and governance chairs.',
    supportsPhoto: false,
    component: (props) => <GlasgowTemplate {...props} />,
  },
  {
    id: 'brighton',
    name: 'Brighton',
    category: 'Creative',
    description: 'Editorial narrative design featuring an inspiring creative quote block, pastel accents, portfolio links, and headshot framing.',
    bestFor: 'Copywriters, journalists, creative agency leads, content creators, and art directors.',
    supportsPhoto: true,
    component: (props) => <BrightonTemplate {...props} />,
  },
  {
    id: 'newcastle',
    name: 'Newcastle',
    category: 'Tech',
    description: 'High-density terminal/sysadmin engineering CV with monospaced tabular figures, certifications matrix, and clean ATS parsing.',
    bestFor: 'DevOps engineers, systems architects, site reliability engineers, and backend developers.',
    supportsPhoto: false,
    component: (props) => <NewcastleTemplate {...props} />,
  },
  {
    id: 'belfast',
    name: 'Belfast',
    category: 'Healthcare',
    description: 'Clinical academic trust layout with Royal College affiliations, GMC/NMC registration standing, and research publications.',
    bestFor: 'Consultant physicians, surgeons, clinical researchers, and medical academics.',
    supportsPhoto: false,
    component: (props) => <BelfastTemplate {...props} />,
  },
  {
    id: 'cardiff',
    name: 'Cardiff',
    category: 'Graduate',
    description: 'Fresh early-career progression layout with bilingual language showcase, degree honors badge, and modern headshot framing.',
    bestFor: 'University graduates, civil service apprentices, entry-level associates, and career changers.',
    supportsPhoto: true,
    component: (props) => <CardiffTemplate {...props} />,
  },
];

export function getTemplateById(id?: string): TemplateDefinition {
  if (!id) return CV_TEMPLATES[0];
  const found = CV_TEMPLATES.find((t) => t.id === id);
  return found || CV_TEMPLATES[0];
}
