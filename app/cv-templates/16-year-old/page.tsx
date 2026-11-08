import React from 'react';
import type { Metadata } from 'next';
import { CV_SPOKE_CONFIGS } from '@/data/cvTemplateCategories';
import { buildCategoryMetadata, buildCategoryJsonLd } from '@/lib/seoCategoryMetadata';
import CvTemplatesPageContent from '@/components/templates/CvTemplatesPageContent';

const pageConfig = CV_SPOKE_CONFIGS['16-year-old'];

export const metadata: Metadata = buildCategoryMetadata(pageConfig);

export default function CvTemplate16YearOldPage() {
  const jsonLd = buildCategoryJsonLd(pageConfig, false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CvTemplatesPageContent config={pageConfig} />
    </>
  );
}
