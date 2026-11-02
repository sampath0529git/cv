'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Check,
  Layers,
} from 'lucide-react';
import TopNav from '@/components/navigation/TopNav';
import Footer from '@/components/layout/Footer';
import TemplatePreviewModal from '@/components/common/TemplatePreviewModal';
import CvTemplateShowcaseCard from './CvTemplateShowcaseCard';
import NicheFaqAccordion from './NicheFaqAccordion';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES, getTemplateById } from '@/templates/registry';
import { useCvStore } from '@/store/useCvStore';
import { CV, TemplateDefinition } from '@/types/cv';
import {
  ALL_SPOKE_LIST,
  CV_TEMPLATE_HUB_CONFIG,
  CvCategoryPageConfig,
  getCategoryConfigBySlug,
} from '@/data/cvTemplateCategories';
import { convertSampleCvToStorePatch } from '@/data/nicheSampleCvs';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { getBlogPostsForCategorySlug } from '@/data/blogPosts';

interface CvTemplatesPageContentProps {
  config: CvCategoryPageConfig;
  isHub?: boolean;
}

export default function CvTemplatesPageContent({
  config,
  isHub = false,
}: CvTemplatesPageContentProps) {
  const router = useRouter();
  const setStoreTemplate = useCvStore((state) => state.setTemplate);
  const setShowPhoto = useCvStore((state) => state.setShowPhoto);
  const loadParsedCvData = useCvStore((state) => state.loadParsedCvData);

  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);
  const [previewSampleCv, setPreviewSampleCv] = useState<CV>(config.sampleCv);
  const [libraryFilter, setLibraryFilter] = useState<string>('All');

  const featuredTemplates: TemplateDefinition[] = config.featuredTemplateIds
    .map((id) => getTemplateById(id))
    .filter(Boolean);

  // Direct handoff to /builder with selected template applied (preserving user's existing CV data)
  const handleUseTemplate = (templateId: string) => {
    const tpl = getTemplateById(templateId);
    setStoreTemplate(templateId as any);
    if (!tpl.supportsPhoto) {
      setShowPhoto(false);
    }
    router.push(`/builder?template=${encodeURIComponent(templateId)}`);
  };

  // Optional secondary action inside preview modal: load the niche UK sample text into the builder
  const handleUseWithSample = (templateId: string, sampleToLoad: CV) => {
    const patch = convertSampleCvToStorePatch(sampleToLoad, templateId);
    loadParsedCvData(patch);
    setStoreTemplate(templateId as any);
    router.push(`/builder?template=${encodeURIComponent(templateId)}`);
  };

  const relatedConfigs: CvCategoryPageConfig[] = config.relatedSlugs
    .map((slug) => getCategoryConfigBySlug(slug))
    .filter((item): item is CvCategoryPageConfig => Boolean(item));

  const relatedBlogPosts = getBlogPostsForCategorySlug(config.slug);

  // Responsive grid sizing: 2 cards per row on mobile, expanding cleanly on desktop
  const gridColsClass =
    config.templateCount === 2
      ? 'grid-cols-2 max-w-4xl'
      : config.templateCount === 3
      ? 'grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-2 xl:grid-cols-4';

  const libraryCategories = ['All', ...TEMPLATE_CATEGORIES];
  const filteredLibraryTemplates =
    libraryFilter === 'All'
      ? CV_TEMPLATES
      : CV_TEMPLATES.filter((t) => t.category.toLowerCase() === libraryFilter.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <TopNav />

      <main className="flex-1">
        {/* 1. Proposition Hero & Breadcrumb */}
        <section className="bg-white border-b border-slate-200/80 pt-6 sm:pt-9 pb-12 sm:pb-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-6"
            >
              <Link href="/" className="hover:text-[#2563EB] transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              {isHub ? (
                <span className="font-semibold text-slate-900" aria-current="page">
                  CV Templates
                </span>
              ) : (
                <>
                  <Link
                    href="/cv-templates"
                    className="hover:text-[#2563EB] transition-colors font-medium"
                  >
                    CV Templates
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="font-semibold text-slate-900" aria-current="page">
                    {config.breadcrumbLabel}
                  </span>
                </>
              )}
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2563EB]">
                  {config.eyebrow}
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B112C] tracking-tight leading-[1.12] [text-wrap:balance]">
                  {config.h1}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-[65ch]">
                  {config.heroSubtitle}
                </p>

                {/* Unboxed Inline Trust Specs */}
                <div className="pt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-medium text-slate-500">
                  <span className="text-slate-800 font-semibold tabular-nums">
                    {config.templateCount} Curated A4{' '}
                    {config.templateCount === 1 ? 'Layout' : 'Layouts'}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>210 × 297 mm British Standard</span>
                  <span className="text-slate-300">·</span>
                  <span>Free 300 DPI PDF &amp; Word Export</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
                <button
                  type="button"
                  onClick={() => handleUseTemplate(featuredTemplates[0]?.id || 'classic-corporate')}
                  className="min-h-[48px] px-7 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-[15px] inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer whitespace-nowrap"
                >
                  <span>Build with {featuredTemplates[0]?.name || 'Classic'} Layout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 sm:ml-2 lg:ml-0">
                  No sign-up wall · Opens directly in the live editor
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured Curated ISO A4 Templates Showcase */}
        <section
          aria-labelledby="featured-templates-heading"
          className="py-10 sm:py-16 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h2
                id="featured-templates-heading"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]"
              >
                {isHub
                  ? 'General & Classic UK CV Templates (4 Flagship Layouts)'
                  : `${config.categoryLabel} CV Templates (${config.templateCount} Recruiter-Tested Layouts)`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Previewed live with a tailored <strong className="font-semibold text-slate-700">{config.sampleRoleLabel}</strong>. Click any page to zoom in or open directly in the builder.
              </p>
            </div>

            {!isHub && (
              <Link
                href="/cv-templates"
                className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>View all UK template categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className={`grid gap-3 sm:gap-6 lg:gap-7 ${gridColsClass}`}>
            {featuredTemplates.map((template) => (
              <CvTemplateShowcaseCard
                key={template.id}
                template={template}
                sampleCv={config.sampleCv}
                accentColor={config.templateAccents[template.id]}
                onPreview={(tpl) => {
                  setPreviewSampleCv(config.sampleCv);
                  setPreviewTemplate(tpl);
                }}
                onUseTemplate={handleUseTemplate}
              />
            ))}
          </div>
        </section>

        {/* 3. Hub-Only: Specialist UK Career Stage & Industry Directory (7 Spokes) */}
        {isHub && (
          <section
            aria-labelledby="specialist-categories-heading"
            className="py-12 sm:py-16 bg-white border-y border-slate-200/80"
          >
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-9">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-2">
                  Browse by Career Stage &amp; Sector
                </p>
                <h2
                  id="specialist-categories-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]"
                >
                  Specialist UK CV Templates Tailored to Your Role
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Different British industries follow distinct formatting conventions—from single-page GCSE and Spotlight performer layouts to NMC clinical nursing and Canary Wharf deal sheets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ALL_SPOKE_LIST.map((spoke) => (
                  <Link
                    key={spoke.slug}
                    href={spoke.urlPath}
                    className="group p-6 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-blue-500/50 hover:shadow-lg transition-all flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                        <span className="font-bold text-[#2563EB]">{spoke.categoryLabel}</span>
                        <span className="font-mono font-semibold text-slate-600 tabular-nums">
                          {spoke.templateCount} {spoke.templateCount === 1 ? 'Template' : 'Templates'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors mt-1.5 leading-snug">
                        {spoke.breadcrumbLabel}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed line-clamp-3">
                        {spoke.heroSubtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-[#2563EB]">
                      <span>Explore {spoke.categoryLabel.toLowerCase()} layouts</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Hub-Only: Full Interactive UK Template Browser */}
        {isHub && (
          <section
            aria-labelledby="all-layouts-heading"
            className="py-10 sm:py-16 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-slate-500 mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Complete Design Catalogue</span>
                </div>
                <h2
                  id="all-layouts-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                >
                  Explore All {CV_TEMPLATES.length} British A4 Layouts
                </h2>
              </div>

              <span className="text-xs font-medium text-slate-500 tabular-nums">
                Showing {filteredLibraryTemplates.length} of {CV_TEMPLATES.length} templates
              </span>
            </div>

            {/* Interactive Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter CV templates by style"
              className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-5 sm:mb-6"
            >
              {libraryCategories.map((cat) => {
                const isSelected = libraryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setLibraryFilter(cat)}
                    className={`min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#0B112C] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredLibraryTemplates.map((template) => (
                <CvTemplateShowcaseCard
                  key={`lib-${template.id}`}
                  template={template}
                  sampleCv={
                    template.category === 'Acting'
                      ? ALL_SPOKE_LIST.find((s) => s.slug === 'acting-cv-template')?.sampleCv ||
                        SAMPLE_UK_CV
                      : template.category === 'Entry-Level'
                      ? ALL_SPOKE_LIST.find((s) => s.slug === 'school-leaver-cv-template')
                          ?.sampleCv || SAMPLE_UK_CV
                      : template.category === 'Healthcare'
                      ? ALL_SPOKE_LIST.find((s) => s.slug === 'nursing-cv-template')?.sampleCv ||
                        SAMPLE_UK_CV
                      : SAMPLE_UK_CV
                  }
                  onPreview={(tpl) => {
                    const matchedSample =
                      tpl.category === 'Acting'
                        ? ALL_SPOKE_LIST.find((s) => s.slug === 'acting-cv-template')?.sampleCv
                        : tpl.category === 'Entry-Level'
                        ? ALL_SPOKE_LIST.find((s) => s.slug === 'school-leaver-cv-template')
                            ?.sampleCv
                        : tpl.category === 'Healthcare'
                        ? ALL_SPOKE_LIST.find((s) => s.slug === 'nursing-cv-template')?.sampleCv
                        : SAMPLE_UK_CV;
                    setPreviewSampleCv(matchedSample || SAMPLE_UK_CV);
                    setPreviewTemplate(tpl);
                  }}
                  onUseTemplate={handleUseTemplate}
                />
              ))}
            </div>
          </section>
        )}

        {/* 5. UK Recruiter Formatting Rules & Recommended Section Structure */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left 7 Cols: Niche UK Recruiter Guidance */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-2">
                    UK Hiring Standards
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
                    {config.guideHeading}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-[65ch]">
                    {config.guideIntro}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {config.formattingRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded-lg bg-blue-600/10 text-[#2563EB] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{rule.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                            {rule.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Recommended Section Order Blueprint */}
              <aside className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0B112C] text-white space-y-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300">
                    <FileCheck2 className="w-4 h-4 text-blue-400" />
                    <span>Recommended UK Section Order</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Ideal {config.categoryLabel} Structure
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Every section can be reordered, renamed, or toggled inside our live CV editor:
                  </p>
                </div>

                <ol className="space-y-3">
                  {config.recommendedSectionOrder.map((stepLabel, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm"
                    >
                      <span className="font-mono text-xs font-bold text-blue-300 tabular-nums mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="font-medium text-slate-100 leading-snug">{stepLabel}</span>
                    </li>
                  ))}
                </ol>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleUseTemplate(featuredTemplates[0]?.id || 'classic-corporate')}
                    className="w-full min-h-[46px] px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Open {featuredTemplates[0]?.name} in CV Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Free PDF
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Editable DOCX
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> UK English
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 6. Niche Frequently Asked Questions & Internal Cross-Links */}
        <section
          aria-label={`${config.categoryLabel} Frequently Asked Questions`}
          itemScope
          itemType="https://schema.org/FAQPage"
          className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NicheFaqAccordion
              categorySlug={config.slug}
              isHub={isHub}
              onSelectTemplate={handleUseTemplate}
            />

            {/* Related UK CV Template Spokes */}
            {!isHub && relatedConfigs.length > 0 && (
              <div className="mt-14 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Related UK CV Template Collections
                  </h3>
                  <Link
                    href={CV_TEMPLATE_HUB_CONFIG.urlPath}
                    className="text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    All CV Templates &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedConfigs.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={rel.urlPath}
                      className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between gap-2"
                    >
                      <div>
                        <span className="text-[11px] font-semibold text-[#2563EB]">
                          {rel.categoryLabel} · {rel.templateCount}{' '}
                          {rel.templateCount === 1 ? 'Layout' : 'Layouts'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors mt-0.5">
                          {rel.breadcrumbLabel}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 group-hover:text-[#2563EB] inline-flex items-center gap-1 pt-1">
                        <span>View templates</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Contextual UK CV Writing Guides Cross-Links */}
            {relatedBlogPosts.length > 0 && (
              <div className="mt-12 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      UK CV Writing &amp; Formatting Guides
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Step-by-step recruiter advice on personal profiles, ATS keywords, and British
                      A4 layout standards.
                    </p>
                  </div>
                  <Link
                    href="/blog"
                    className="text-xs font-semibold text-[#2563EB] hover:underline whitespace-nowrap shrink-0"
                  >
                    All guides &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedBlogPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                          <span className="font-semibold text-[#2563EB]">{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors mt-1 leading-snug line-clamp-2">
                          {post.seoTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-[#2563EB] inline-flex items-center gap-1">
                        <span>Read guide</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Full Responsive A4 Zoom Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        customCv={previewSampleCv}
        accentColor={previewTemplate ? config.templateAccents[previewTemplate.id] : undefined}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
        onUseWithSample={handleUseWithSample}
      />
    </div>
  );
}
