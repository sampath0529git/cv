import React from 'react';
import type { Metadata } from 'next';
import { CV_TEMPLATE_HUB_CONFIG } from '@/data/cvTemplateCategories';
import { buildCategoryMetadata, buildCategoryJsonLd } from '@/lib/seoCategoryMetadata';
import CvTemplatesPageContent from '@/components/templates/CvTemplatesPageContent';

export const metadata: Metadata = buildCategoryMetadata(CV_TEMPLATE_HUB_CONFIG);

export default function CvTemplatesHubPage() {
  const jsonLd = buildCategoryJsonLd(CV_TEMPLATE_HUB_CONFIG, true);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CvTemplatesPageContent config={CV_TEMPLATE_HUB_CONFIG} isHub />
    </>
  );
}
