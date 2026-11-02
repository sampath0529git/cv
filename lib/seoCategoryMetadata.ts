import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';
import { CvCategoryPageConfig } from '@/data/cvTemplateCategories';
import { getTemplateById } from '@/templates/registry';

const canonicalBase = `https://${BRAND_CONFIG.domain}`;

export function buildCategoryMetadata(config: CvCategoryPageConfig): Metadata {
  return {
    title: {
      absolute: config.seoTitle,
    },
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: {
      canonical: config.urlPath,
      languages: {
        'en-GB': config.urlPath,
      },
    },
    openGraph: {
      title: config.seoTitle,
      description: config.metaDescription,
      url: config.urlPath,
      siteName: BRAND_CONFIG.domain,
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: '/assets/hero-backdrop-clean.png',
          width: 1200,
          height: 630,
          alt: `${config.breadcrumbLabel} – ${BRAND_CONFIG.domain}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seoTitle,
      description: config.metaDescription,
      images: ['/assets/hero-backdrop-clean.png'],
    },
  };
}

export function buildCategoryJsonLd(config: CvCategoryPageConfig, isHub = false) {
  const pageUrl = `${canonicalBase}${config.urlPath}`;

  const breadcrumbItems = isHub
    ? [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${canonicalBase}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CV Templates',
          item: pageUrl,
        },
      ]
    : [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${canonicalBase}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CV Templates',
          item: `${canonicalBase}/cv-templates`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: config.breadcrumbLabel,
          item: pageUrl,
        },
      ];

  const itemListElements = config.featuredTemplateIds.map((id, index) => {
    const tpl = getTemplateById(id);
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: `${tpl.name} – ${config.categoryLabel} UK CV Template`,
      description: tpl.description,
      url: `${canonicalBase}/builder?template=${encodeURIComponent(tpl.id)}`,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: config.seoTitle,
        description: config.metaDescription,
        inLanguage: 'en-GB',
        isPartOf: {
          '@id': `${canonicalBase}/#website`,
        },
        mainEntity: {
          '@id': `${pageUrl}#templates`,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#templates`,
        name: `${config.breadcrumbLabel} (ISO A4)`,
        numberOfItems: config.templateCount,
        itemListElement: itemListElements,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: config.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
