import React from 'react';
import { TemplateDefinition, TemplateCategory } from '@/types/cv';
import UkTraditionalTemplate from './UkTraditionalTemplate';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'Classic',
];

/**
 * Extensible CV Template Registry
 * Currently features the verified UK Traditional Academic & Corporate template from user specifications.
 * More templates uploaded in the future can easily be appended to this array.
 */
export const CV_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'uk-traditional',
    name: 'UK Traditional Academic & Corporate',
    category: 'Classic',
    description: 'Authoritative centered name, thin rule dividers, date gutter, Education first, and structured Additional Information.',
    bestFor: 'Finance, investment banking, consulting, universities, civil service, and corporate professional roles.',
    supportsPhoto: false,
    component: (props) => <UkTraditionalTemplate {...props} />,
  },
];

export function getTemplateById(id?: string): TemplateDefinition {
  if (!id) return CV_TEMPLATES[0];
  const found = CV_TEMPLATES.find((t) => t.id === id);
  return found || CV_TEMPLATES[0];
}
