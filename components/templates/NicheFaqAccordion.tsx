'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ChevronDown,
  Search,
  X,
  ArrowRight,
  Link2,
  Check,
  ChevronsUpDown,
} from 'lucide-react';
import {
  CV_SPOKE_CONFIGS,
  CV_TEMPLATE_HUB_CONFIG,
  CvCategoryPageConfig,
  CvFaqItem,
} from '@/data/cvTemplateCategories';
import { getTemplateById } from '@/templates/registry';

interface NicheFaqAccordionProps {
  categorySlug: string;
  isHub?: boolean;
  onSelectTemplate: (templateId: string) => void;
}

export default function NicheFaqAccordion({
  categorySlug,
  isHub = false,
  onSelectTemplate,
}: NicheFaqAccordionProps) {
  // Dynamically resolve niche FAQ config from CV_SPOKE_CONFIGS (or Hub + dynamic spoke switcher on /cv-templates)
  const spokeEntries = Object.values(CV_SPOKE_CONFIGS);
  const [selectedHubNicheSlug, setSelectedHubNicheSlug] = useState<string>('cv-templates');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeConfig: CvCategoryPageConfig = isHub
    ? selectedHubNicheSlug === 'cv-templates'
      ? CV_TEMPLATE_HUB_CONFIG
      : CV_SPOKE_CONFIGS[selectedHubNicheSlug] || CV_TEMPLATE_HUB_CONFIG
    : CV_SPOKE_CONFIGS[categorySlug] || CV_TEMPLATE_HUB_CONFIG;

  const faqs: CvFaqItem[] = activeConfig.faqs;

  // Multi-open accordion state: default first FAQ expanded for immediate scannability
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const firstId = faqs[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });

  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Sync first item expanded when switching niche tabs on the Hub
  const handleSelectNicheTab = (slug: string) => {
    setSelectedHubNicheSlug(slug);
    setSearchQuery('');
    const targetConfig =
      slug === 'cv-templates'
        ? CV_TEMPLATE_HUB_CONFIG
        : CV_SPOKE_CONFIGS[slug] || CV_TEMPLATE_HUB_CONFIG;
    const firstId = targetConfig.faqs[0]?.id;
    setExpandedIds(firstId ? { [firstId]: true } : {});
  };

  // Support direct deep-linking to any #faq-... anchor in URL hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const applyHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '').trim();
      if (!rawHash) return;

      // Check current active config first
      const directMatch = activeConfig.faqs.find((item) => item.id === rawHash);
      if (directMatch) {
        setExpandedIds((prev) => ({ ...prev, [directMatch.id]: true }));
        const el = document.getElementById(directMatch.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // On Hub page, if hash belongs to one of the spoke niches in CV_SPOKE_CONFIGS, switch to it automatically
      if (isHub) {
        for (const spoke of Object.values(CV_SPOKE_CONFIGS)) {
          const spokeFaq = spoke.faqs.find((f) => f.id === rawHash);
          if (spokeFaq) {
            setSelectedHubNicheSlug(spoke.slug);
            setExpandedIds({ [spokeFaq.id]: true });
            requestAnimationFrame(() => {
              document.getElementById(spokeFaq.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            });
            break;
          }
        }
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [activeConfig.faqs, isHub]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleFaqs = normalizedQuery
    ? faqs.filter(
        (item) =>
          item.question.toLowerCase().includes(normalizedQuery) ||
          item.answer.toLowerCase().includes(normalizedQuery)
      )
    : faqs;

  const allVisibleExpanded =
    visibleFaqs.length > 0 &&
    visibleFaqs.every((item) => Boolean(expandedIds[item.id] || normalizedQuery));

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    if (allVisibleExpanded) {
      setExpandedIds({});
    } else {
      const next: Record<string, boolean> = {};
      visibleFaqs.forEach((item) => {
        next[item.id] = true;
      });
      setExpandedIds(next);
    }
  };

  const handleCopyAnchor = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${activeConfig.urlPath}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.history.replaceState(null, '', `#${id}`);
      setTimeout(() => {
        setCopiedId((curr) => (curr === id ? null : curr));
      }, 1800);
    } catch {
      window.location.hash = id;
    }
  };

  const handleTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    const count = visibleFaqs.length;
    if (count === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % count;
      triggerRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + count) % count;
      triggerRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      triggerRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      triggerRefs.current[count - 1]?.focus();
    }
  };

  return (
    <div id="niche-faq-section" className="w-full">
      {/* Header & Interactive Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span className="font-bold text-[#2563EB]">{activeConfig.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{faqs.length} UK Recruiter Answers</span>
            <span aria-hidden="true">·</span>
            <span>Updated for 2026 Hiring</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {activeConfig.categoryLabel} CV Questions Answered
          </h2>
        </div>

        {/* Expand / Collapse All Control */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleAll}
            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>{allVisibleExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>
      </div>

      {/* Hub Dynamic Niche Selector: Dynamically loads FAQs from CV_SPOKE_CONFIGS */}
      {isHub && (
        <div className="mb-5">
          <div
            role="tablist"
            aria-label="Filter FAQs by UK CV niche"
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1.5 rounded-2xl bg-slate-200/60 border border-slate-200/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedHubNicheSlug === 'cv-templates'}
              onClick={() => handleSelectNicheTab('cv-templates')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                selectedHubNicheSlug === 'cv-templates'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              General UK CV
            </button>
            {spokeEntries.map((spoke) => {
              const isSelected = selectedHubNicheSlug === spoke.slug;
              return (
                <button
                  key={spoke.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectNicheTab(spoke.slug)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {spoke.categoryLabel}
                </button>
              );
            })}
          </div>

          {selectedHubNicheSlug !== 'cv-templates' && (
            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-slate-600">
              <span>
                Showing specialist guidance for{' '}
                <strong className="font-semibold text-slate-900">
                  {activeConfig.breadcrumbLabel}
                </strong>
              </span>
              <Link
                href={activeConfig.urlPath}
                className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span>Open {activeConfig.categoryLabel} page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Instant Question Filter Bar */}
      <div className="relative mb-5">
        <Search
          aria-hidden="true"
          className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Filter ${activeConfig.categoryLabel.toLowerCase()} CV questions (e.g. page length, ATS, grades, photo)...`}
          aria-label={`Search ${activeConfig.categoryLabel} frequently asked questions`}
          className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear question search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 min-h-[32px] min-w-[32px] rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Crawl-Friendly Interactive Accordion List */}
      {visibleFaqs.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-slate-200/90 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            No questions matched &ldquo;{searchQuery}&rdquo; in {activeConfig.categoryLabel}.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="min-h-[38px] px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Reset Question Filter
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = Boolean(expandedIds[faq.id] || normalizedQuery);
            const triggerId = `${faq.id}-trigger`;
            const panelId = `${faq.id}-panel`;
            const recommendedTemplate = faq.recommendedTemplateId
              ? getTemplateById(faq.recommendedTemplateId)
              : null;

            return (
              <article
                key={faq.id}
                id={faq.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`rounded-2xl bg-white border transition-colors duration-150 ${
                  isOpen
                    ? 'border-blue-500/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <h3 itemProp="name" className="m-0">
                  <button
                    ref={(el) => {
                      triggerRefs.current[idx] = el;
                    }}
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(faq.id)}
                    onKeyDown={(e) => handleTriggerKeyDown(e, idx)}
                    className="w-full min-h-[56px] px-5 sm:px-6 py-4 sm:py-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB] rounded-2xl"
                  >
                    <span className="flex items-start gap-3.5 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#2563EB] tabular-nums mt-0.5 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug [text-wrap:pretty]">
                        {faq.question}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-blue-50 text-[#2563EB]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                </h3>

                {/* Always mounted in SSR DOM for full search-engine indexing; animated via CSS grid rows */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 pt-3.5 border-t border-slate-100 sm:pl-[52px] space-y-3">
                      <p
                        itemProp="text"
                        className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[70ch]"
                      >
                        {faq.answer}
                      </p>

                      {/* Contextual Action Row: Direct Template Launch & Permalink Copy */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        {recommendedTemplate ? (
                          <button
                            type="button"
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => onSelectTemplate(recommendedTemplate.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <span>Use {recommendedTemplate.name} layout in Builder</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span />
                        )}

                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={(e) => handleCopyAnchor(e, faq.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          title="Copy direct link to this answer"
                        >
                          {copiedId === faq.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Link copied</span>
                            </>
                          ) : (
                            <>
                              <Link2 className="w-3 h-3" />
                              <span>Copy link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
