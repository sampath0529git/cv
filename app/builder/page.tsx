'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCvStore, SkillItem } from '@/store/useCvStore';
import Logo from '@/components/brand/Logo';
import CvPreview from '@/components/builder/CvPreview';
import TemplateModal from '@/components/builder/TemplateModal';
import ShareModal from '@/components/builder/ShareModal';
import LinkedInImportModal from '@/components/builder/LinkedInImportModal';
import AiAssistantDrawer from '@/components/builder/AiAssistantDrawer';
import ImportStatusBanner from '@/components/builder/ImportStatusBanner';
import SaveToast from '@/components/common/SaveToast';
import WordCountBadge from '@/components/common/WordCountBadge';
import PdfDownloadButton from '@/components/builder/PdfDownloadButton';
import PdfExportSettingsModal from '@/components/builder/PdfExportSettingsModal';
import { CV_TEMPLATES } from '@/templates/registry';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { cvToCvStore, normalizeSectionOrder } from '@/lib/cvAdapter';
import {
  A4_WIDTH_PX,
  CV,
  DateFormatOption,
  DEFAULT_DATE_FORMAT,
  FontBoldnessTarget,
  FontScale,
  normalizeDateFormat,
  normalizeFontBoldness,
  normalizePdfExportSettings,
} from '@/types/cv';
import {
  DATE_FORMAT_OPTIONS,
  applyDateFormatToCv,
  formatCvDateRange,
  getDateFormatMeta,
} from '@/lib/dateFormat';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Check,
  Camera,
  ZoomIn,
  ZoomOut,
  Maximize2,
  LayoutGrid,
  Printer,
  Loader2,
  RefreshCw,
  X,
  FileEdit,
  Palette,
  Eye,
  ListPlus,
  Sparkles,
  Info,
  Share2,
  RotateCcw,
  AlertCircle,
  FileText,
  Linkedin,
  FileCheck2,
  ShieldCheck,
  Bold,
  Calendar,
  SeparatorHorizontal,
  Ruler,
  Minimize2,
  MoreHorizontal,
  Copy,
  Eraser,
  Sliders,
} from 'lucide-react';
import { downloadCvPdf, triggerBrowserPrint } from '@/lib/pdfGenerator';
import { downloadCvDocx } from '@/lib/docxGenerator';
import { useSummaryRewrite } from '@/hooks/useSummaryRewrite';
import { useBulletGenerator } from '@/hooks/useBulletGenerator';

const STEPS = [
  { id: 1, label: 'Personal details', short: 'Personal' },
  { id: 2, label: 'Work experience', short: 'Experience' },
  { id: 3, label: 'Education', short: 'Education' },
  { id: 4, label: 'Skills', short: 'Skills' },
  { id: 5, label: 'Summary', short: 'Summary' },
  { id: 6, label: 'Languages', short: 'Languages' },
  { id: 7, label: 'Interests', short: 'Interests' },
  { id: 8, label: 'Finalize', short: 'Finalize' },
];

const QUICK_SKILLS = [
  'Project Management',
  'Financial Analysis',
  'Stakeholder Management',
  'Data Analysis',
  'Strategic Planning',
  'Leadership',
  'Microsoft Excel',
  'Python',
];

const SKILL_LEVELS: SkillItem['level'][] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

const QUICK_LANGUAGES = [
  'English (Native)',
  'French (Professional Working)',
  'Spanish (Conversational)',
  'German (Fluent)',
];

const QUICK_INTERESTS = [
  'Long-distance running & charity marathons',
  'Open-source software contribution',
  'Community mentoring & volunteering',
  'Architectural photography',
];

const SUMMARY_STARTERS = [
  {
    label: 'Experienced Professional',
    text: 'Results-driven professional with extensive experience delivering measurable commercial outcomes, leading cross-functional initiatives, and optimising operational performance across fast-paced organisations.',
  },
  {
    label: 'Graduate / Early Career',
    text: 'Motivated honours graduate with strong analytical foundations, hands-on internship experience, and a proven ability to collaborate effectively in high-performing teams.',
  },
];

const SECTION_LABELS: Record<string, string> = {
  statement: 'Professional Summary',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education and Qualifications',
  skills: 'Key Skills & Competencies',
  projects: 'Key Projects',
  certifications: 'Certifications & Licences',
  languages: 'Languages',
  awards: 'Honours & Awards',
  interests: 'Interests & Activities',
  custom: 'Custom Sections',
  references: 'References',
};

function formatSavedTime(timestamp: number | null): string {
  if (!timestamp) return '';
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function DesignTemplateThumb({
  Component,
  cv,
}: {
  Component: React.ComponentType<{ cv: CV }>;
  cv: CV;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbScale, setThumbScale] = useState<number>(0.21);

  useEffect(() => {
    const measure = () => {
      if (!thumbRef.current) return;
      const w = thumbRef.current.clientWidth;
      if (w > 0) {
        setThumbScale(Number((w / 794).toFixed(4)));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (thumbRef.current) {
      ro.observe(thumbRef.current);
    }
    return () => ro.disconnect();
  }, []);

  const spacingVal = Number(cv.settings.letterSpacing ?? 0);
  const hasSpacing = Math.abs(spacingVal) > 0.001;
  const thumbBold = normalizeFontBoldness(cv.settings.fontBoldness);

  return (
    <div
      ref={thumbRef}
      className="relative w-full aspect-[210/297] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-2"
    >
      <div
        data-has-letter-spacing={hasSpacing ? 'true' : undefined}
        data-bold-header={thumbBold.enabled && thumbBold.header ? 'true' : undefined}
        data-bold-headings={thumbBold.enabled && thumbBold.headings ? 'true' : undefined}
        data-bold-subheadings={thumbBold.enabled && thumbBold.subheadings ? 'true' : undefined}
        data-bold-body={thumbBold.enabled && thumbBold.sectionText ? 'true' : undefined}
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${thumbScale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          letterSpacing: hasSpacing ? `${spacingVal}px` : undefined,
          ['--cv-letter-spacing' as any]: `${spacingVal}px`,
        }}
        className="cv-page absolute top-0 left-0 bg-white select-none"
      >
        <Component cv={cv} />
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const router = useRouter();
  const store = useCvStore();

  // Desktop left panel tab ('content' | 'design') + Mobile 3-mode workspace ('content' | 'design' | 'preview')
  const [editorTab, setEditorTab] = useState<'content' | 'design'>('content');
  const [mobileMode, setMobileMode] = useState<'content' | 'design' | 'preview'>('content');

  const currentStep = Math.max(1, Math.min(STEPS.length, store.currentStep || 1));

  // Skill / Language / Interest / Certification / Award input states
  const [skillInput, setSkillInput] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<SkillItem['level']>('Advanced');
  const [languageInput, setLanguageInput] = useState<string>('');
  const [interestInput, setInterestInput] = useState<string>('');
  const [certInput, setCertInput] = useState<string>('');
  const [awardInput, setAwardInput] = useState<string>('');

  // Collapsible optional disclosures
  const [showExtraPersonal, setShowExtraPersonal] = useState<boolean>(false);
  const [showOptionalSections, setShowOptionalSections] = useState<boolean>(false);

  // Collapsible Experience & Education cards (new entries default to expanded automatically)
  const [collapsedExpIds, setCollapsedExpIds] = useState<Record<string, boolean>>({});
  const [collapsedEduIds, setCollapsedEduIds] = useState<Record<string, boolean>>({});
  const [openQuickActionsId, setOpenQuickActionsId] = useState<string | null>(null);

  // Step button refs for smooth horizontal auto-centering on mobile
  const stepButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  // Photo upload refs & drag state
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState<boolean>(false);

  // Preview auto-fit & zoom state
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const customColorInputRef = useRef<HTMLInputElement>(null);
  const [fitScale, setFitScale] = useState<number>(0.76);
  const [manualZoom, setManualZoom] = useState<number | null>(null); // null = Auto-Fit
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activePreviewPage, setActivePreviewPage] = useState<number>(1);
  const [showMarginGuides, setShowMarginGuides] = useState<boolean>(false);
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState<boolean>(false);
  const [fullscreenZoom, setFullscreenZoom] = useState<number>(100);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);

  // PDF & Word (.docx) Export state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadDone, setDownloadDone] = useState<boolean>(false);
  const [readyPdfBlob, setReadyPdfBlob] = useState<{
    blobUrl: string;
    fileName: string;
    byteSize?: number;
  } | null>(null);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState<boolean>(false);
  const [docxDownloadDone, setDocxDownloadDone] = useState<boolean>(false);
  const [readyDocxBlob, setReadyDocxBlob] = useState<{ blobUrl: string; fileName: string } | null>(
    null
  );
  const [showPrintSettingsTip, setShowPrintSettingsTip] = useState<boolean>(false);
  const [isPdfSettingsModalOpen, setIsPdfSettingsModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState<boolean>(false);
  const [linkedInImportedNotice, setLinkedInImportedNotice] = useState<boolean>(false);
  const [revertToast, setRevertToast] = useState<string | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  const {
    isRewriting: isRewritingSummary,
    rewriteError: summaryRewriteError,
    rewriteSuccess: summaryRewriteSuccess,
    canUndo: canUndoSummaryRewrite,
    rewriteSummary: handleRewriteSummary,
    undoRewrite: handleUndoSummaryRewrite,
    clearError: clearSummaryRewriteError,
  } = useSummaryRewrite();
  const bulletGen = useBulletGenerator();

  const contact = store.contact;
  const activePdfExportSettings = normalizePdfExportSettings(store.pdfExportSettings);
  const activeTemplate =
    CV_TEMPLATES.find((t) => t.id === store.activeTemplate) || CV_TEMPLATES[0];

  const hasExtraPersonalValues = Boolean(
    contact.dateOfBirth?.trim() ||
      contact.nationality?.trim() ||
      contact.drivingLicence?.trim()
  );

  const isCvEmpty = Boolean(
    !contact.firstName?.trim() &&
      !contact.lastName?.trim() &&
      !contact.jobTitle?.trim() &&
      store.experiences.length === 0 &&
      store.educations.length === 0
  );

  const optionalSectionsCount =
    (store.certificationsList?.length > 0 ? 1 : 0) +
    (store.projectsList?.length > 0 ? 1 : 0) +
    (store.awardsList?.length > 0 ? 1 : 0) +
    (store.customSections?.length > 0 ? 1 : 0) +
    (store.includeReferences ? 1 : 0);

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);
  const effectiveScale = manualZoom !== null ? manualZoom / 100 : fitScale;
  const displayedZoomPercent = Math.round(effectiveScale * 100);

  // Smoothly center the active step pill inside the horizontal scroll strip
  useEffect(() => {
    const activeBtn = stepButtonRefs.current[currentStep];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentStep, editorTab, mobileMode]);

  // Measure preview viewport width to calculate crisp 1:1 auto-fit scale across mobile & desktop
  const recalculateFitScale = useCallback(() => {
    if (!previewContainerRef.current) return;
    const width = previewContainerRef.current.clientWidth;
    if (width > 0) {
      const horizontalPadding = width < 640 ? 20 : 48;
      const available = Math.max(220, width - horizontalPadding);
      const computed = Math.min(1.0, Math.max(0.28, available / A4_WIDTH_PX));
      setFitScale(Number(computed.toFixed(3)));
    }
  }, []);

  useEffect(() => {
    recalculateFitScale();
    const observer = new ResizeObserver(recalculateFitScale);
    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current);
    }
    window.addEventListener('resize', recalculateFitScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recalculateFitScale);
    };
  }, [recalculateFitScale]);

  // Re-measure immediately when switching into mobile Preview mode
  useEffect(() => {
    if (mobileMode === 'preview') {
      const raf = window.requestAnimationFrame(() => {
        recalculateFitScale();
      });
      return () => window.cancelAnimationFrame(raf);
    }
  }, [mobileMode, recalculateFitScale]);

  // Close Fullscreen Preview on Escape key
  useEffect(() => {
    if (!isFullscreenPreviewOpen || isTemplateModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreenPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreenPreviewOpen, isTemplateModalOpen]);

  const handleOpenFullscreenPreview = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const mobileFit = Math.min(
        100,
        Math.max(30, Math.round(((window.innerWidth - 32) / A4_WIDTH_PX) * 100))
      );
      setFullscreenZoom(mobileFit);
    } else {
      setFullscreenZoom(100);
    }
    setIsFullscreenPreviewOpen(true);
  }, []);

  // Dismiss Quick Actions floating menu on outside click or Escape key
  useEffect(() => {
    if (!openQuickActionsId) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-quick-actions-root]')) return;
      setOpenQuickActionsId(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenQuickActionsId(null);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openQuickActionsId]);

  const resolvedFileName = useCallback(() => {
    const custom = store.customPdfFileName?.trim();
    if (custom) {
      const stripped = custom.replace(/\.(pdf|docx)$/i, '');
      return `${stripped}.pdf`;
    }
    const base = [contact.firstName, contact.lastName]
      .filter(Boolean)
      .join('_')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '');
    return `${base || 'my'}_cv.pdf`;
  }, [store.customPdfFileName, contact.firstName, contact.lastName]);

  const resolvedDocxFileName = useCallback(() => {
    const custom = store.customPdfFileName?.trim();
    if (custom) {
      const stripped = custom.replace(/\.(pdf|docx)$/i, '');
      return `${stripped}.docx`;
    }
    const base = [contact.firstName, contact.lastName]
      .filter(Boolean)
      .join('_')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '');
    return `${base || 'my'}_cv.docx`;
  }, [store.customPdfFileName, contact.firstName, contact.lastName]);

  const commitPendingInputs = useCallback(() => {
    if (skillInput.trim()) {
      store.addSkill(skillInput.trim(), skillLevel);
      setSkillInput('');
    }
    if (languageInput.trim()) {
      store.addLanguageItem(languageInput.trim());
      setLanguageInput('');
    }
    if (interestInput.trim()) {
      store.addInterestItem(interestInput.trim());
      setInterestInput('');
    }
    if (certInput.trim()) {
      store.addCertification(certInput.trim());
      setCertInput('');
    }
    if (awardInput.trim()) {
      store.addAward(awardInput.trim());
      setAwardInput('');
    }
  }, [skillInput, skillLevel, languageInput, interestInput, certInput, awardInput, store]);

  useEffect(() => {
    const handlePrintComplete = (e: any) => {
      setIsDownloading(false);
      if (e?.detail?.ok !== false) {
        setDownloadDone(true);
        setTimeout(() => setDownloadDone(false), 3500);
      }
    };
    const handleBlobReady = (e: any) => {
      if (e?.detail?.blobUrl && e?.detail?.fileName) {
        setReadyPdfBlob({
          blobUrl: e.detail.blobUrl,
          fileName: e.detail.fileName,
          byteSize: typeof e.detail.byteSize === 'number' ? e.detail.byteSize : undefined,
        });
      }
    };
    const handleDocxBlobReady = (e: any) => {
      if (e?.detail?.blobUrl && e?.detail?.fileName) {
        setReadyDocxBlob({
          blobUrl: e.detail.blobUrl,
          fileName: e.detail.fileName,
        });
      }
    };
    window.addEventListener('applet-print-cv-complete', handlePrintComplete);
    window.addEventListener('applet-pdf-blob-ready', handleBlobReady);
    window.addEventListener('applet-docx-blob-ready', handleDocxBlobReady);
    return () => {
      window.removeEventListener('applet-print-cv-complete', handlePrintComplete);
      window.removeEventListener('applet-pdf-blob-ready', handleBlobReady);
      window.removeEventListener('applet-docx-blob-ready', handleDocxBlobReady);
    };
  }, []);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    commitPendingInputs();
    setIsDownloading(true);
    setDownloadDone(false);
    try {
      const ok = await downloadCvPdf({ fileName: resolvedFileName() });
      if (ok) {
        setDownloadDone(true);
        setTimeout(() => setDownloadDone(false), 4500);
      }
    } catch (err) {
      console.error('Builder PDF export error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (isDownloadingDocx) return;
    commitPendingInputs();
    setIsDownloadingDocx(true);
    setDocxDownloadDone(false);
    try {
      const ok = await downloadCvDocx({ fileName: resolvedDocxFileName() });
      if (ok) {
        setDocxDownloadDone(true);
        setTimeout(() => setDocxDownloadDone(false), 4500);
      }
    } catch (err) {
      console.error('Builder DOCX export error:', err);
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  const handleBrowserPrint = () => {
    if (isDownloading) return;
    commitPendingInputs();
    setIsDownloading(true);
    triggerBrowserPrint(resolvedFileName());
  };

  const handleOpenShareModal = () => {
    commitPendingInputs();
    setIsShareModalOpen(true);
  };

  const handleOpenLinkedInModal = () => {
    commitPendingInputs();
    setIsLinkedInModalOpen(true);
  };

  const handleLinkedInImportSuccess = () => {
    setLinkedInImportedNotice(true);
    setTimeout(() => setLinkedInImportedNotice(false), 4500);
  };

  const handleRevertImport = () => {
    store.revertLastImport();
    setRevertToast('CV import successfully reverted to your previous draft.');
    setTimeout(() => setRevertToast(null), 4500);
  };

  const handleLoadSampleData = () => {
    const storeUpdates = cvToCvStore(SAMPLE_UK_CV);
    store.loadParsedCvData(storeUpdates as any);
  };

  const handlePhotoFile = (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        store.setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    store.addSkill(skillInput.trim(), skillLevel);
    setSkillInput('');
  };

  const handleCycleSkillLevel = (skill: SkillItem) => {
    const idx = SKILL_LEVELS.indexOf(skill.level || 'Advanced');
    const nextLevel = SKILL_LEVELS[(idx + 1) % SKILL_LEVELS.length];
    store.updateSkillLevel(skill.id, nextLevel);
  };

  const handleAddLanguage = () => {
    if (!languageInput.trim()) return;
    store.addLanguageItem(languageInput.trim());
    setLanguageInput('');
  };

  const handleAddInterest = () => {
    if (!interestInput.trim()) return;
    store.addInterestItem(interestInput.trim());
    setInterestInput('');
  };

  const handleAddCertification = () => {
    if (!certInput.trim()) return;
    store.addCertification(certInput.trim());
    setCertInput('');
  };

  const handleAddAward = () => {
    if (!awardInput.trim()) return;
    store.addAward(awardInput.trim());
    setAwardInput('');
  };

  const handleInsertExperienceBullet = (expId: string, currentDesc: string) => {
    const trimmedRight = currentDesc.replace(/\s+$/, '');
    const nextValue = trimmedRight ? `${trimmedRight}\n• ` : '• ';
    store.updateExperience(expId, { description: nextValue });
  };

  const handleDuplicateExperience = (expId: string) => {
    const newId = store.duplicateExperience(expId);
    if (newId) {
      setCollapsedExpIds((prev) => ({
        ...prev,
        [newId]: false,
      }));
    }
    setOpenQuickActionsId(null);
  };

  const handleClearExperienceFields = (expId: string) => {
    if (bulletGen.errorMap[expId]) {
      bulletGen.clearError(expId);
    }
    store.clearExperienceFields(expId);
    setCollapsedExpIds((prev) => ({
      ...prev,
      [expId]: false,
    }));
    setOpenQuickActionsId(null);
  };

  const handleDuplicateEducation = (eduId: string) => {
    const newId = store.duplicateEducation(eduId);
    if (newId) {
      setCollapsedEduIds((prev) => ({
        ...prev,
        [newId]: false,
      }));
    }
    setOpenQuickActionsId(null);
  };

  const handleClearEducationFields = (eduId: string) => {
    store.clearEducationFields(eduId);
    setCollapsedEduIds((prev) => ({
      ...prev,
      [eduId]: false,
    }));
    setOpenQuickActionsId(null);
  };

  const handleGenerateExperienceBullet = async (exp: {
    id: string;
    jobTitle: string;
    employer: string;
    description?: string;
  }) => {
    await bulletGen.generateBullet({
      expId: exp.id,
      jobTitle: exp.jobTitle,
      employer: exp.employer,
      currentDescription: exp.description,
      onSuccess: (newBullet) => {
        const trimmed = (exp.description ?? '').trimEnd();
        const updated = trimmed ? `${trimmed}\n${newBullet}` : newBullet;
        store.updateExperience(exp.id, { description: updated });
      },
    });
  };

  const handlePagesChange = useCallback((count: number) => {
    setTotalPages((prev) => (prev === count ? prev : count));
    setActivePreviewPage((p) => Math.min(p, count));
  }, []);

  const handleScrollToPreviewPage = (targetPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, targetPage));
    setActivePreviewPage(clamped);
    const pageEl = document.getElementById(`cv-preview-page-${clamped}`);
    if (pageEl && previewContainerRef.current) {
      pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePreviewScroll = useCallback(() => {
    const container = previewContainerRef.current;
    if (!container || totalPages <= 1) return;
    const containerRect = container.getBoundingClientRect();
    const probeY = containerRect.top + containerRect.height * 0.35;
    let closestPage = 1;
    let minDistance = Infinity;
    for (let p = 1; p <= totalPages; p++) {
      const el = document.getElementById(`cv-preview-page-${p}`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) {
        closestPage = p;
        break;
      }
      const dist = Math.abs(rect.top - probeY);
      if (dist < minDistance) {
        minDistance = dist;
        closestPage = p;
      }
    }
    setActivePreviewPage((prev) => (prev === closestPage ? prev : closestPage));
  }, [totalPages]);

  const handleSwitchDesktopTab = (tab: 'content' | 'design') => {
    commitPendingInputs();
    setEditorTab(tab);
    setMobileMode(tab);
  };

  const handleSwitchMobileMode = (mode: 'content' | 'design' | 'preview') => {
    commitPendingInputs();
    setMobileMode(mode);
    if (mode === 'content' || mode === 'design') {
      setEditorTab(mode);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep = (stepId: number) => {
    commitPendingInputs();
    store.setStep(stepId);
  };

  const handleNext = () => {
    commitPendingInputs();
    if (currentStep < STEPS.length) {
      store.setStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleDownloadPdf();
    }
  };

  const handleBack = () => {
    commitPendingInputs();
    if (currentStep > 1) {
      store.setStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/start');
    }
  };

  const isStepPopulated = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return Boolean(contact.firstName?.trim() || contact.email?.trim());
      case 2:
        return store.experiences.length > 0;
      case 3:
        return store.educations.length > 0;
      case 4:
        return store.skills.length > 0;
      case 5:
        return Boolean(store.summary?.trim());
      case 6:
        return store.languagesList.length > 0;
      case 7:
        return store.interestsList.length > 0;
      default:
        return false;
    }
  };

  const normalizedOrder = normalizeSectionOrder(store.sectionOrder, store);
  const summaryText = store.summary ?? '';
  const summaryWordCount = summaryText.trim()
    ? summaryText.trim().split(/\s+/).length
    : 0;
  const formattedSaveTime = formatSavedTime(store.lastSavedAt);

  const renderAutoSaveStatus = (compactMobile = false) => {
    if (store.saveStatus === 'saving') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 tabular-nums shrink-0">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4B4DED]" />
          <span className={compactMobile ? 'hidden sm:inline' : ''}>Saving...</span>
        </span>
      );
    }
    if (store.saveStatus === 'saved') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#059669] tabular-nums shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className={compactMobile ? 'hidden sm:inline' : ''}>
            Saved{formattedSaveTime ? ` ${formattedSaveTime}` : ''}
          </span>
        </span>
      );
    }
    return null;
  };

  // text-base on mobile (<640px) prevents iOS Safari input auto-zoom; sm:text-sm keeps desktop crisp
  const inputClass =
    'w-full min-h-[46px] sm:min-h-[42px] px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200/95 bg-[#FAFBFD] hover:bg-white focus:bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:border-[#4B4DED] focus:ring-3 focus:ring-[#4B4DED]/12';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FE] text-slate-900 font-sans pb-[66px] lg:pb-0">
      {/* Clean Minimal Sticky Top App Bar (Top Bar Contract: Brand — Studio Switch — Single Primary CTA) */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40">
        <div className="max-w-[1640px] mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Brand Logo + Clean Typographic Document Title */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <Logo variant="dark" href="/" />
            <div className="hidden md:flex items-center gap-2.5 pl-3.5 border-l border-slate-200 min-w-0">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-700 truncate max-w-[180px]">
                {contact.firstName
                  ? `${contact.firstName} ${contact.lastName || ''}`.trim() + ' CV'
                  : 'My Professional CV'}
              </span>
              {renderAutoSaveStatus(true)}
            </div>
          </div>

          {/* Center (Desktop lg+): Clean Icon-Free Content | Design Segmented Switch */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => handleSwitchDesktopTab('content')}
              className={`min-h-[36px] px-5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                editorTab === 'content'
                  ? 'bg-white text-[#0F1B4D] shadow-2xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Content Studio
            </button>
            <button
              type="button"
              onClick={() => handleSwitchDesktopTab('design')}
              className={`min-h-[36px] px-5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                editorTab === 'design'
                  ? 'bg-white text-[#0F1B4D] shadow-2xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Design &amp; Layout
            </button>
          </div>

          {/* Right: Clean Step Counter + Single Primary Download PDF CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="md:hidden">{renderAutoSaveStatus(true)}</div>

            <span className="hidden xl:inline text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
              Step {currentStep} of {STEPS.length} · {progressPercent}%
            </span>

            {downloadDone && readyPdfBlob && (
              <a
                href={readyPdfBlob.blobUrl}
                download={readyPdfBlob.fileName}
                className="hidden md:inline-flex items-center text-xs font-semibold text-[#4B4DED] hover:underline whitespace-nowrap"
                title={`Save ${readyPdfBlob.fileName}`}
              >
                Save copy
              </a>
            )}

            <PdfDownloadButton
              fileName={resolvedFileName}
              onBeforeDownload={commitPendingInputs}
              variant="header"
              label="Download PDF"
              showIcon={false}
            />
          </div>
        </div>

        {/* Hairline Step Progress Track */}
        <div className="w-full h-[2px] bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-[#4B4DED] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Responsive Studio Workspace */}
      <main className="flex-1 max-w-[1640px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-7 items-start">
        {/* Left Panel: Content Editor or Design Studio (Hidden on mobile ONLY when Preview mode is active) */}
        <div
          className={`lg:col-span-6 xl:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(15,27,77,0.04)] p-4 sm:p-6 lg:p-7 ${
            mobileMode === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {editorTab === 'content' ? (
            <div className="space-y-5 sm:space-y-6">
              {/* Import Status Indicator Banner */}
              {store.detectedImportStats ? (
                <ImportStatusBanner
                  stats={store.detectedImportStats}
                  fileName={store.importedFileName}
                  onRevert={handleRevertImport}
                  onDismiss={() => store.clearImportStatus()}
                />
              ) : store.lastImportBackup ? (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-blue-50/80 border border-indigo-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#4a4df2] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-[#0F1B4D] truncate">
                        CV imported {store.importedFileName ? `(${store.importedFileName})` : ''}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        Want to undo? You can quickly revert the import if any sections were merged incorrectly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={handleRevertImport}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-indigo-200 text-[#4a4df2] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-98"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revert Import</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => store.dismissRevertImport()}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
                      title="Dismiss notice"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : null}

              {revertToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between gap-2 shadow-2xs animate-toast-slide-up animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{revertToast}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRevertToast(null)}
                    className="p-1 text-emerald-600 hover:text-emerald-800 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Auto-Centering Horizontal Step Navigation Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 -mx-1 px-1 scrollbar-none border-b border-slate-100">
                {STEPS.map((step) => {
                  const isActive = currentStep === step.id;
                  const isDone = currentStep > step.id || isStepPopulated(step.id);
                  const isAutoDetected = Boolean(
                    store.detectedImportStats &&
                      ((step.id === 1 && store.detectedImportStats.hasContact) ||
                        (step.id === 2 && store.detectedImportStats.experienceCount > 0) ||
                        (step.id === 3 && store.detectedImportStats.educationCount > 0) ||
                        (step.id === 4 && store.detectedImportStats.skillCount > 0) ||
                        (step.id === 5 && store.detectedImportStats.hasSummary) ||
                        (step.id === 6 && store.detectedImportStats.languageCount > 0))
                  );
                  return (
                    <button
                      key={step.id}
                      ref={(el) => {
                        stepButtonRefs.current[step.id] = el;
                      }}
                      type="button"
                      onClick={() => handleSelectStep(step.id)}
                      className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white shadow-sm shadow-[#4a4df2]/25 ring-2 ring-[#4a4df2]/20'
                          : isDone
                          ? 'bg-[#EEF1FF] text-[#4a4df2] hover:bg-[#E0E5FA]'
                          : 'bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200/60'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center tabular-nums font-bold shrink-0 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : isDone
                            ? 'bg-[#4a4df2]/15 text-[#4a4df2]'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isDone && !isActive ? '✓' : step.id}
                      </span>
                      <span>{step.short}</span>
                      {isAutoDetected && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-300' : 'bg-emerald-500'
                          }`}
                          title="Auto-detected from scanned CV"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Step Heading + Quick Sample Loader (if empty) + Auto-Save */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4a4df2] to-[#6366f1] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {currentStep}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                        {STEPS[currentStep - 1]?.label}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCvEmpty && currentStep === 1 && (
                      <button
                        type="button"
                        onClick={handleLoadSampleData}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#4B4DED]" />
                        <span>Sample CV</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsAiAssistantOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      title="Open AI Writing Assistant for bullets, summary & skills"
                    >
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>AI Assistant</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 pl-8 leading-relaxed">
                  {currentStep === 1 &&
                    'How employers can reach you. Your target role tailors the header of your CV.'}
                  {currentStep === 2 &&
                    'Add your work history, dates, locations, and measurable achievements.'}
                  {currentStep === 3 &&
                    'Include university degrees, professional qualifications, and academic grades.'}
                  {currentStep === 4 &&
                    'Highlight your technical tools, domain expertise, and core competencies.'}
                  {currentStep === 5 &&
                    'Write a concise 3–4 line executive summary highlighting your key strengths.'}
                  {currentStep === 6 &&
                    'List languages you speak alongside your proficiency level.'}
                  {currentStep === 7 &&
                    'Add leadership activities, volunteering, or personal interests.'}
                  {currentStep === 8 &&
                    'Add optional sections, arrange your CV section order, and export your A4 PDF.'}
                </p>
              </div>

              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {/* Quick Import from LinkedIn Card */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-[#DCE3F7] bg-[#FAFBFD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center shrink-0">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#0F1B4D]">
                          Import from LinkedIn
                        </h3>
                        <p className="text-xs text-slate-500">
                          {linkedInImportedNotice
                            ? 'LinkedIn profile imported into your CV'
                            : 'Connect your LinkedIn account or parse your profile PDF'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenLinkedInModal}
                      className="min-h-[40px] px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] whitespace-nowrap shrink-0"
                    >
                      <Linkedin className="w-4 h-4 shrink-0" />
                      <span>Import from LinkedIn</span>
                    </button>
                  </div>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handlePhotoFile(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                  <div
                    onClick={() => photoInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingPhoto(true);
                    }}
                    onDragLeave={() => setIsDraggingPhoto(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingPhoto(false);
                      handlePhotoFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 border-dashed transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer ${
                      isDraggingPhoto
                        ? 'border-[#4B4DED] bg-[#EEF1FF]/60'
                        : 'border-slate-200 hover:border-[#4B4DED] bg-[#F8F9FE]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {contact.photoUrl ? (
                        <img
                          src={contact.photoUrl}
                          alt="Profile preview"
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#4B4DED] shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#EEF1FF] text-[#4B4DED] flex items-center justify-center shrink-0">
                          <Camera className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#0F1B4D]">
                          {contact.photoUrl ? 'Profile photo uploaded' : 'Add a profile photo'}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {contact.photoUrl
                            ? 'Shown on photo templates (Hopkins, Toronto, London)'
                            : 'Optional — tap to upload or drag an image'}
                        </p>
                      </div>
                    </div>

                    {contact.photoUrl && (
                      <div
                        className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/70 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label className="min-h-[38px] inline-flex items-center gap-2 text-xs font-semibold text-[#0F1B4D] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(store.showPhoto)}
                            onChange={(e) => store.setShowPhoto(e.target.checked)}
                            className="w-4 h-4 rounded accent-[#4B4DED]"
                          />
                          <span>Show on CV</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => store.removePhoto()}
                          className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                      Desired job title
                    </label>
                    <input
                      type="text"
                      value={contact.jobTitle ?? ''}
                      onChange={(e) => store.updateField('contact', 'jobTitle', e.target.value)}
                      placeholder="e.g. Senior Financial Analyst"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        First name
                      </label>
                      <input
                        type="text"
                        value={contact.firstName ?? ''}
                        onChange={(e) => store.updateField('contact', 'firstName', e.target.value)}
                        placeholder="e.g. Oliver"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={contact.lastName ?? ''}
                        onChange={(e) => store.updateField('contact', 'lastName', e.target.value)}
                        placeholder="e.g. Harrington"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        value={contact.email ?? ''}
                        onChange={(e) => store.updateField('contact', 'email', e.target.value)}
                        placeholder="e.g. oliver@example.co.uk"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={contact.phone ?? ''}
                        onChange={(e) => store.updateField('contact', 'phone', e.target.value)}
                        placeholder="e.g. +44 20 7946 0918"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        City / Town
                      </label>
                      <input
                        type="text"
                        value={contact.city ?? ''}
                        onChange={(e) => store.updateField('contact', 'city', e.target.value)}
                        placeholder="e.g. London"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={contact.postalCode ?? ''}
                        onChange={(e) => store.updateField('contact', 'postalCode', e.target.value)}
                        placeholder="e.g. SW1A 1AA"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        LinkedIn URL <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        inputMode="url"
                        value={contact.linkedin ?? ''}
                        onChange={(e) => store.updateField('contact', 'linkedin', e.target.value)}
                        placeholder="linkedin.com/in/yourprofile"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Portfolio / Website{' '}
                        <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        inputMode="url"
                        value={contact.website ?? ''}
                        onChange={(e) => store.updateField('contact', 'website', e.target.value)}
                        placeholder="yourportfolio.co.uk"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Collapsible Additional Personal Details */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowExtraPersonal((prev) => !prev)}
                      className="min-h-[42px] flex items-center justify-between gap-2 w-full py-2 text-left text-xs font-semibold text-[#4B4DED] hover:text-[#3D3FC9] cursor-pointer"
                    >
                      <span>
                        Additional details (Date of Birth, Nationality, Driving Licence)
                      </span>
                      {showExtraPersonal || hasExtraPersonalValues ? (
                        <ChevronUp className="w-4 h-4 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0" />
                      )}
                    </button>

                    {(showExtraPersonal || hasExtraPersonalValues) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Date of Birth
                          </label>
                          <input
                            type="text"
                            value={contact.dateOfBirth ?? ''}
                            onChange={(e) =>
                              store.updateField('contact', 'dateOfBirth', e.target.value)
                            }
                            placeholder="e.g. 14 May 1995"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Nationality / Right to Work
                          </label>
                          <input
                            type="text"
                            value={contact.nationality ?? ''}
                            onChange={(e) =>
                              store.updateField('contact', 'nationality', e.target.value)
                            }
                            placeholder="e.g. British Citizen"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Driving Licence
                          </label>
                          <input
                            type="text"
                            value={contact.drivingLicence ?? ''}
                            onChange={(e) =>
                              store.updateField('contact', 'drivingLicence', e.target.value)
                            }
                            placeholder="e.g. Full UK Clean"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Work Experience (Collapsible Mobile-Friendly Cards) */}
              {currentStep === 2 && (
                <div className="space-y-3.5">
                  {store.experiences.length === 0 && (
                    <div className="py-7 px-4 rounded-2xl bg-[#F8F9FE] border border-[#E8EAF5] text-center space-y-1.5">
                      <p className="text-sm font-semibold text-[#0F1B4D]">
                        No work experience added yet
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Add your most recent position first — use bullet lines to highlight measurable impact.
                      </p>
                    </div>
                  )}

                  {store.experiences.map((exp, idx) => {
                    const isCollapsed = Boolean(collapsedExpIds[exp.id]);
                    const expMenuKey = `exp:${exp.id}`;
                    const isQuickMenuOpen = openQuickActionsId === expMenuKey;
                    const dateRange = formatCvDateRange(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrent,
                      store.dateFormat
                    );

                    return (
                      <div
                        key={exp.id}
                        className={`space-y-1.5 relative ${isQuickMenuOpen ? 'z-30' : 'z-0'}`}
                      >
                        {exp.forceNewPage && (
                          <div className="flex items-center gap-2.5 px-1 text-[11px] font-medium text-[#4B4DED] select-none">
                            <div className="h-px flex-1 border-t border-dashed border-[#4B4DED]/45" />
                            <span className="inline-flex items-center gap-1.5">
                              <SeparatorHorizontal className="w-3.5 h-3.5 shrink-0" />
                              <span>Page break · Starts on new page</span>
                            </span>
                            <div className="h-px flex-1 border-t border-dashed border-[#4B4DED]/45" />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl border transition-colors ${
                            exp.forceNewPage
                              ? 'border-[#4B4DED]/45 bg-[#F8F9FE]'
                              : 'border-slate-200 bg-[#F8F9FE]/65'
                          }`}
                        >
                          {/* Card Accordion Header */}
                          <div
                            onClick={() =>
                              setCollapsedExpIds((prev) => ({
                                ...prev,
                                [exp.id]: !prev[exp.id],
                              }))
                            }
                            className={`px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-white/60 transition-colors ${
                              isCollapsed ? 'rounded-2xl' : 'rounded-t-2xl'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-sm text-[#0F1B4D] truncate">
                                {exp.jobTitle || `Position ${idx + 1}`}
                                {exp.employer ? ` · ${exp.employer}` : ''}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate mt-0.5 tabular-nums">
                                {dateRange || 'Tap to edit role details & achievements'}
                                {exp.city ? ` · ${exp.city}` : ''}
                                {exp.forceNewPage ? ' · Starts on new page' : ''}
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-0.5 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Floating Quick Actions Menu */}
                              <div className="relative mr-0.5" data-quick-actions-root>
                                <button
                                  type="button"
                                  aria-haspopup="menu"
                                  aria-expanded={isQuickMenuOpen}
                                  onClick={() =>
                                    setOpenQuickActionsId((prev) =>
                                      prev === expMenuKey ? null : expMenuKey
                                    )
                                  }
                                  className={`min-h-[36px] min-w-[36px] sm:px-2.5 py-1.5 rounded-lg border text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                                    isQuickMenuOpen
                                      ? 'bg-[#EEF1FF] border-[#4B4DED]/40 text-[#4B4DED]'
                                      : 'bg-white/90 hover:bg-white border-slate-200/90 text-slate-600 hover:text-[#0F1B4D] hover:border-slate-300'
                                  }`}
                                  title="Quick Actions"
                                  aria-label="Quick Actions"
                                >
                                  <MoreHorizontal className="w-4 h-4 shrink-0" />
                                  <span className="hidden sm:inline text-[11px]">
                                    Quick Actions
                                  </span>
                                </button>

                                {isQuickMenuOpen && (
                                  <div
                                    role="menu"
                                    aria-label="Work experience quick actions"
                                    className="absolute right-0 top-full mt-1.5 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 origin-top-right"
                                  >
                                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none border-b border-slate-100 mb-1">
                                      Quick Actions
                                    </div>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleDuplicateExperience(exp.id)}
                                      className="group w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-[#EEF1FF]/70 hover:text-[#4B4DED] flex items-center gap-2.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                                    >
                                      <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4B4DED] shrink-0 transition-colors" />
                                      <span>Duplicate Entry</span>
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleClearExperienceFields(exp.id)}
                                      className="group w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                                    >
                                      <Eraser className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0 transition-colors" />
                                      <span>Clear All Fields</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {isCollapsed && (
                                <button
                                  type="button"
                                  aria-pressed={Boolean(exp.forceNewPage)}
                                  onClick={() =>
                                    store.updateExperience(exp.id, {
                                      forceNewPage: !exp.forceNewPage,
                                    })
                                  }
                                  className={`min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                                    exp.forceNewPage
                                      ? 'text-[#4B4DED] bg-[#EEF1FF]'
                                      : 'text-slate-400 hover:text-[#4B4DED] hover:bg-white'
                                  }`}
                                  title={
                                    exp.forceNewPage
                                      ? 'Force New Page (Active — click to disable)'
                                      : 'Force New Page'
                                  }
                                  aria-label="Force New Page"
                                >
                                  <SeparatorHorizontal className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => store.moveExperience(exp.id, 'up')}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-[#0F1B4D] hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Move up"
                              aria-label="Move position up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === store.experiences.length - 1}
                              onClick={() => store.moveExperience(exp.id, 'down')}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-[#0F1B4D] hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Move down"
                              aria-label="Move position down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => store.removeExperience(exp.id)}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Remove position"
                              aria-label="Remove position"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCollapsedExpIds((prev) => ({
                                  ...prev,
                                  [exp.id]: !prev[exp.id],
                                }))
                              }
                              className="min-h-[38px] min-w-[34px] flex items-center justify-center text-slate-500 hover:text-[#4B4DED] rounded-lg cursor-pointer"
                              aria-label={isCollapsed ? 'Expand position' : 'Collapse position'}
                            >
                              {isCollapsed ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronUp className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Body */}
                        {!isCollapsed && (
                          <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 border-t border-slate-200/70 bg-white rounded-b-2xl space-y-3.5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  Job Title
                                </label>
                                <input
                                  type="text"
                                  value={exp.jobTitle ?? ''}
                                  onChange={(e) =>
                                    store.updateExperience(exp.id, { jobTitle: e.target.value })
                                  }
                                  placeholder="e.g. Senior Product Manager"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  Employer / Organisation
                                </label>
                                <input
                                  type="text"
                                  value={exp.employer ?? ''}
                                  onChange={(e) =>
                                    store.updateExperience(exp.id, { employer: e.target.value })
                                  }
                                  placeholder="e.g. Barclays PLC"
                                  className={inputClass}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  Location
                                </label>
                                <input
                                  type="text"
                                  value={exp.city ?? ''}
                                  onChange={(e) =>
                                    store.updateExperience(exp.id, { city: e.target.value })
                                  }
                                  placeholder="e.g. London, UK"
                                  className={inputClass}
                                />
                              </div>
                              <div className="grid grid-cols-2 sm:contents gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="text"
                                    value={exp.startDate ?? ''}
                                    onChange={(e) =>
                                      store.updateExperience(exp.id, { startDate: e.target.value })
                                    }
                                    placeholder={getDateFormatMeta(store.dateFormat).startPlaceholder}
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-[11px] font-semibold text-slate-600">
                                      End Date
                                    </label>
                                    <label className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4B4DED] cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={Boolean(exp.isCurrent)}
                                        onChange={(e) =>
                                          store.updateExperience(exp.id, {
                                            isCurrent: e.target.checked,
                                            endDate: e.target.checked ? 'Present' : '',
                                          })
                                        }
                                        className="rounded accent-[#4B4DED]"
                                      />
                                      <span>Present</span>
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    disabled={Boolean(exp.isCurrent)}
                                    value={exp.isCurrent ? 'Present' : exp.endDate ?? ''}
                                    onChange={(e) =>
                                      store.updateExperience(exp.id, { endDate: e.target.value })
                                    }
                                    placeholder={getDateFormatMeta(store.dateFormat).endPlaceholder}
                                    className={`${inputClass} disabled:bg-slate-100 disabled:text-slate-500`}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                                <div className="flex items-center gap-2 min-w-0">
                                  <label className="text-[11px] font-semibold text-slate-600 truncate">
                                    Key Achievements (one bullet per line)
                                  </label>
                                  <WordCountBadge text={exp.description} min={30} max={120} />
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateExperienceBullet(exp)}
                                    disabled={bulletGen.generatingMap[exp.id]}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shrink-0 disabled:opacity-70 disabled:cursor-wait ${
                                      bulletGen.successMap[exp.id]
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white border border-[#4B4DED]/25 shadow-2xs'
                                    }`}
                                    title={
                                      exp.jobTitle?.trim()
                                        ? 'AI: Suggest a high-impact, results-driven achievement statement'
                                        : 'Enter a Job Title above to generate tailored achievement statements'
                                    }
                                  >
                                    {bulletGen.generatingMap[exp.id] ? (
                                      <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                                        <span>Generating...</span>
                                      </>
                                    ) : bulletGen.successMap[exp.id] ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                                        <span>Added</span>
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                        <span>Generate bullet point</span>
                                      </>
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleInsertExperienceBullet(exp.id, exp.description ?? '')
                                    }
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                                  >
                                    <ListPlus className="w-3.5 h-3.5" />
                                    <span>+ Bullet</span>
                                  </button>
                                </div>
                              </div>
                              <textarea
                                value={exp.description ?? ''}
                                onChange={(e) => {
                                  if (bulletGen.errorMap[exp.id]) bulletGen.clearError(exp.id);
                                  store.updateExperience(exp.id, { description: e.target.value });
                                }}
                                placeholder={
                                  '• Spearheaded regional product launch generating £1.4M ARR\n• Reduced onboarding turnaround by 32% across 5 teams'
                                }
                                rows={4}
                                className={inputClass}
                              />
                              {bulletGen.errorMap[exp.id] && (
                                <div
                                  role="alert"
                                  className="mt-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-2"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    <span className="truncate">{bulletGen.errorMap[exp.id]}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => bulletGen.clearError(exp.id)}
                                    className="text-amber-600 hover:text-amber-800 p-0.5 cursor-pointer"
                                    title="Dismiss notice"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Per-Entry Manual Pagination Control */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-[#0F1B4D] flex items-center gap-1.5">
                                  <SeparatorHorizontal className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                                  <span>Page Break</span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  Start this position at the top of a new A4 page
                                </p>
                              </div>
                              <button
                                type="button"
                                aria-pressed={Boolean(exp.forceNewPage)}
                                onClick={() =>
                                  store.updateExperience(exp.id, {
                                    forceNewPage: !exp.forceNewPage,
                                  })
                                }
                                className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DED]/40 ${
                                  exp.forceNewPage
                                    ? 'bg-[#4B4DED] border-[#4B4DED] text-white shadow-2xs'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-[#4B4DED]/50 hover:text-[#0F1B4D]'
                                }`}
                              >
                                <SeparatorHorizontal className="w-3.5 h-3.5 shrink-0" />
                                <span>Force New Page</span>
                                {exp.forceNewPage && (
                                  <Check className="w-3.5 h-3.5 stroke-[2.75] shrink-0" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() =>
                      store.addExperience({
                        jobTitle: '',
                        employer: '',
                        city: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                      })
                    }
                    className="w-full min-h-[48px] py-3.5 rounded-xl border-2 border-dashed border-[#4B4DED]/40 text-[#4B4DED] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#EEF1FF]/60 hover:border-[#4B4DED] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add work experience</span>
                  </button>
                </div>
              )}

              {/* Step 3: Education (Collapsible Mobile-Friendly Cards) */}
              {currentStep === 3 && (
                <div className="space-y-3.5">
                  {store.educations.length === 0 && (
                    <div className="py-7 px-4 rounded-2xl bg-[#F8F9FE] border border-[#E8EAF5] text-center space-y-1.5">
                      <p className="text-sm font-semibold text-[#0F1B4D]">
                        No education entries added yet
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Add your university degrees, A-Levels, diplomas, or professional qualifications.
                      </p>
                    </div>
                  )}

                  {store.educations.map((edu, idx) => {
                    const isCollapsed = Boolean(collapsedEduIds[edu.id]);
                    const eduMenuKey = `edu:${edu.id}`;
                    const isQuickMenuOpen = openQuickActionsId === eduMenuKey;
                    const dateRange = formatCvDateRange(
                      edu.startDate,
                      edu.endDate,
                      false,
                      store.dateFormat
                    );

                    return (
                      <div
                        key={edu.id}
                        className={`space-y-1.5 relative ${isQuickMenuOpen ? 'z-30' : 'z-0'}`}
                      >
                        {edu.forceNewPage && (
                          <div className="flex items-center gap-2.5 px-1 text-[11px] font-medium text-[#4B4DED] select-none">
                            <div className="h-px flex-1 border-t border-dashed border-[#4B4DED]/45" />
                            <span className="inline-flex items-center gap-1.5">
                              <SeparatorHorizontal className="w-3.5 h-3.5 shrink-0" />
                              <span>Page break · Starts on new page</span>
                            </span>
                            <div className="h-px flex-1 border-t border-dashed border-[#4B4DED]/45" />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl border transition-colors ${
                            edu.forceNewPage
                              ? 'border-[#4B4DED]/45 bg-[#F8F9FE]'
                              : 'border-slate-200 bg-[#F8F9FE]/65'
                          }`}
                        >
                          <div
                            onClick={() =>
                              setCollapsedEduIds((prev) => ({
                                ...prev,
                                [edu.id]: !prev[edu.id],
                              }))
                            }
                            className={`px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-white/60 transition-colors ${
                              isCollapsed ? 'rounded-2xl' : 'rounded-t-2xl'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-sm text-[#0F1B4D] truncate">
                                {edu.degree || `Qualification ${idx + 1}`}
                                {edu.school ? ` · ${edu.school}` : ''}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate mt-0.5 tabular-nums">
                                {[edu.grade, dateRange].filter(Boolean).join(' · ') ||
                                  'Tap to edit institution, dates & grade'}
                                {edu.forceNewPage ? ' · Starts on new page' : ''}
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-0.5 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Floating Quick Actions Menu */}
                              <div className="relative mr-0.5" data-quick-actions-root>
                                <button
                                  type="button"
                                  aria-haspopup="menu"
                                  aria-expanded={isQuickMenuOpen}
                                  onClick={() =>
                                    setOpenQuickActionsId((prev) =>
                                      prev === eduMenuKey ? null : eduMenuKey
                                    )
                                  }
                                  className={`min-h-[36px] min-w-[36px] sm:px-2.5 py-1.5 rounded-lg border text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                                    isQuickMenuOpen
                                      ? 'bg-[#EEF1FF] border-[#4B4DED]/40 text-[#4B4DED]'
                                      : 'bg-white/90 hover:bg-white border-slate-200/90 text-slate-600 hover:text-[#0F1B4D] hover:border-slate-300'
                                  }`}
                                  title="Quick Actions"
                                  aria-label="Quick Actions"
                                >
                                  <MoreHorizontal className="w-4 h-4 shrink-0" />
                                  <span className="hidden sm:inline text-[11px]">
                                    Quick Actions
                                  </span>
                                </button>

                                {isQuickMenuOpen && (
                                  <div
                                    role="menu"
                                    aria-label="Education quick actions"
                                    className="absolute right-0 top-full mt-1.5 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 origin-top-right"
                                  >
                                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none border-b border-slate-100 mb-1">
                                      Quick Actions
                                    </div>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleDuplicateEducation(edu.id)}
                                      className="group w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-[#EEF1FF]/70 hover:text-[#4B4DED] flex items-center gap-2.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                                    >
                                      <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4B4DED] shrink-0 transition-colors" />
                                      <span>Duplicate Entry</span>
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleClearEducationFields(edu.id)}
                                      className="group w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2.5 transition-colors duration-150 cursor-pointer whitespace-nowrap"
                                    >
                                      <Eraser className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0 transition-colors" />
                                      <span>Clear All Fields</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {isCollapsed && (
                                <button
                                  type="button"
                                  aria-pressed={Boolean(edu.forceNewPage)}
                                  onClick={() =>
                                    store.updateEducation(edu.id, {
                                      forceNewPage: !edu.forceNewPage,
                                    })
                                  }
                                  className={`min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                                    edu.forceNewPage
                                      ? 'text-[#4B4DED] bg-[#EEF1FF]'
                                      : 'text-slate-400 hover:text-[#4B4DED] hover:bg-white'
                                  }`}
                                  title={
                                    edu.forceNewPage
                                      ? 'Force New Page (Active — click to disable)'
                                      : 'Force New Page'
                                  }
                                  aria-label="Force New Page"
                                >
                                  <SeparatorHorizontal className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => store.moveEducation(edu.id, 'up')}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-[#0F1B4D] hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Move up"
                              aria-label="Move qualification up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === store.educations.length - 1}
                              onClick={() => store.moveEducation(edu.id, 'down')}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-[#0F1B4D] hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Move down"
                              aria-label="Move qualification down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => store.removeEducation(edu.id)}
                              className="min-h-[38px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Remove qualification"
                              aria-label="Remove qualification"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setCollapsedEduIds((prev) => ({
                                  ...prev,
                                  [edu.id]: !prev[edu.id],
                                }))
                              }
                              className="min-h-[38px] min-w-[34px] flex items-center justify-center text-slate-500 hover:text-[#4B4DED] rounded-lg cursor-pointer"
                              aria-label={
                                isCollapsed ? 'Expand qualification' : 'Collapse qualification'
                              }
                            >
                              {isCollapsed ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronUp className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {!isCollapsed && (
                          <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 border-t border-slate-200/70 bg-white rounded-b-2xl space-y-3.5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  Degree / Qualification
                                </label>
                                <input
                                  type="text"
                                  value={edu.degree ?? ''}
                                  onChange={(e) =>
                                    store.updateEducation(edu.id, { degree: e.target.value })
                                  }
                                  placeholder="e.g. BSc (Hons) Computer Science"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  University / Institution
                                </label>
                                <input
                                  type="text"
                                  value={edu.school ?? ''}
                                  onChange={(e) =>
                                    store.updateEducation(edu.id, { school: e.target.value })
                                  }
                                  placeholder="e.g. University College London (UCL)"
                                  className={inputClass}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                  Grade / Classification
                                </label>
                                <input
                                  type="text"
                                  value={edu.grade ?? ''}
                                  onChange={(e) =>
                                    store.updateEducation(edu.id, { grade: e.target.value })
                                  }
                                  placeholder="e.g. First-Class (1st)"
                                  className={inputClass}
                                />
                              </div>
                              <div className="grid grid-cols-2 sm:contents gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="text"
                                    value={edu.startDate ?? ''}
                                    onChange={(e) =>
                                      store.updateEducation(edu.id, { startDate: e.target.value })
                                    }
                                    placeholder={getDateFormatMeta(store.dateFormat).eduStartPlaceholder}
                                    className={inputClass}
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Graduation Date
                                  </label>
                                  <input
                                    type="text"
                                    value={edu.endDate ?? ''}
                                    onChange={(e) =>
                                      store.updateEducation(edu.id, { endDate: e.target.value })
                                    }
                                    placeholder={getDateFormatMeta(store.dateFormat).eduEndPlaceholder}
                                    className={inputClass}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Location &amp; Relevant Modules / Dissertation{' '}
                                <span className="font-normal text-slate-400">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={edu.description ?? ''}
                                onChange={(e) =>
                                  store.updateEducation(edu.id, { description: e.target.value })
                                }
                                placeholder="e.g. Dean's List; Dissertation on Machine Learning in FinTech"
                                className={inputClass}
                              />
                            </div>

                            {/* Per-Entry Manual Pagination Control */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-[#0F1B4D] flex items-center gap-1.5">
                                  <SeparatorHorizontal className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                                  <span>Page Break</span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  Start this qualification at the top of a new A4 page
                                </p>
                              </div>
                              <button
                                type="button"
                                aria-pressed={Boolean(edu.forceNewPage)}
                                onClick={() =>
                                  store.updateEducation(edu.id, {
                                    forceNewPage: !edu.forceNewPage,
                                  })
                                }
                                className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DED]/40 ${
                                  edu.forceNewPage
                                    ? 'bg-[#4B4DED] border-[#4B4DED] text-white shadow-2xs'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-[#4B4DED]/50 hover:text-[#0F1B4D]'
                                }`}
                              >
                                <SeparatorHorizontal className="w-3.5 h-3.5 shrink-0" />
                                <span>Force New Page</span>
                                {edu.forceNewPage && (
                                  <Check className="w-3.5 h-3.5 stroke-[2.75] shrink-0" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() =>
                      store.addEducation({
                        degree: '',
                        school: '',
                        grade: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                      })
                    }
                    className="w-full min-h-[48px] py-3.5 rounded-xl border-2 border-dashed border-[#4B4DED]/40 text-[#4B4DED] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#EEF1FF]/60 hover:border-[#4B4DED] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add education</span>
                  </button>
                </div>
              )}

              {/* Step 4: Skills */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill (e.g. Financial Modelling, React, SQL)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      className={inputClass}
                    />
                    <div className="flex gap-2 shrink-0">
                      <select
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value as SkillItem['level'])}
                        aria-label="Skill proficiency level"
                        className="flex-1 sm:flex-none min-h-[46px] sm:min-h-[42px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-base sm:text-xs font-semibold text-[#0F1B4D] focus:outline-hidden focus:border-[#4B4DED]"
                      >
                        {SKILL_LEVELS.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="min-h-[46px] sm:min-h-[42px] px-5 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Quick-Add Suggestions */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Tap to quick-add popular skills:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SKILLS.filter(
                        (qs) =>
                          !store.skills.some((s) => s.name.toLowerCase() === qs.toLowerCase())
                      ).map((qs) => (
                        <button
                          key={qs}
                          type="button"
                          onClick={() => store.addSkill(qs, skillLevel)}
                          className="min-h-[36px] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#4B4DED] hover:text-[#4B4DED] text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                        >
                          + {qs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {store.skills.length > 0 && (
                    <div className="space-y-2.5 pt-2.5 border-t border-slate-100">
                      <span className="block text-[11px] text-slate-400">
                        Tap a proficiency label to cycle skill level:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {store.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="min-h-[38px] inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-xl bg-[#EEF1FF] text-[#4B4DED] border border-[#4B4DED]/20 text-xs font-semibold"
                          >
                            <span>{skill.name}</span>
                            <button
                              type="button"
                              onClick={() => handleCycleSkillLevel(skill)}
                              title="Tap to cycle proficiency level"
                              className="min-h-[26px] px-2 py-0.5 rounded-lg bg-white/90 text-[10px] font-semibold text-[#0F1B4D] hover:bg-white cursor-pointer"
                            >
                              {skill.level || 'Advanced'}
                            </button>
                            <button
                              type="button"
                              onClick={() => store.removeSkill(skill.id)}
                              className="min-h-[28px] min-w-[28px] flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              aria-label={`Remove ${skill.name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Summary */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="builder-step5-summary-textarea"
                            className="text-xs font-semibold text-[#0F1B4D] block"
                          >
                            Professional Profile Statement
                          </label>
                          <WordCountBadge count={summaryWordCount} min={40} max={80} />
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums">
                          Recruitment standard: 40–80 words · {summaryText.length} chars
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {canUndoSummaryRewrite && !isRewritingSummary && (
                          <button
                            type="button"
                            onClick={handleUndoSummaryRewrite}
                            className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F1B4D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                            title="Restore previous summary draft"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Undo</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleRewriteSummary}
                          disabled={isRewritingSummary}
                          className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-wait ${
                            summaryRewriteSuccess
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white border border-[#4B4DED]/25 shadow-2xs'
                          }`}
                        >
                          {isRewritingSummary ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                              <span>Rewriting...</span>
                            </>
                          ) : summaryRewriteSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                              <span>Polished</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>AI Rewrite</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <textarea
                      id="builder-step5-summary-textarea"
                      value={summaryText}
                      onChange={(e) => {
                        if (summaryRewriteError) clearSummaryRewriteError();
                        store.setSummary(e.target.value);
                      }}
                      placeholder="Write a concise 3–4 sentence overview of your experience, core specialisms, and career achievements..."
                      rows={6}
                      className={inputClass}
                    />

                    {summaryRewriteError && (
                      <div
                        role="alert"
                        className="mt-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span>{summaryRewriteError}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Insert a quick starter template:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SUMMARY_STARTERS.map((starter) => (
                        <button
                          key={starter.label}
                          type="button"
                          onClick={() => {
                            if (summaryRewriteError) clearSummaryRewriteError();
                            store.setSummary(starter.text);
                          }}
                          className="p-3.5 rounded-xl border border-slate-200 hover:border-[#4B4DED] bg-[#F8F9FE] text-left transition-colors cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-[#0F1B4D] group-hover:text-[#4B4DED]">
                            + {starter.label}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                            {starter.text}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Languages */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={languageInput}
                      onChange={(e) => setLanguageInput(e.target.value)}
                      placeholder="e.g. English (Native), French (Fluent)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddLanguage();
                        }
                      }}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={handleAddLanguage}
                      className="min-h-[46px] sm:min-h-[42px] px-5 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {QUICK_LANGUAGES.filter((ql) => !store.languagesList.includes(ql)).map((ql) => (
                      <button
                        key={ql}
                        type="button"
                        onClick={() => store.addLanguageItem(ql)}
                        className="min-h-[36px] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#4B4DED] hover:text-[#4B4DED] text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                      >
                        + {ql}
                      </button>
                    ))}
                  </div>

                  {store.languagesList.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2.5 border-t border-slate-100">
                      {store.languagesList.map((lang, idx) => (
                        <span
                          key={idx}
                          className="min-h-[38px] pl-3 pr-1.5 py-1 rounded-xl bg-[#EEF1FF] text-[#4B4DED] border border-[#4B4DED]/20 text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <span>{lang}</span>
                          <button
                            type="button"
                            onClick={() => store.removeLanguageItem(idx)}
                            className="min-h-[28px] min-w-[28px] flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                            aria-label={`Remove ${lang}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 7: Interests */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      placeholder="e.g. Marathon running, Photography"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={handleAddInterest}
                      className="min-h-[46px] sm:min-h-[42px] px-5 py-2.5 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {QUICK_INTERESTS.filter((qi) => !store.interestsList.includes(qi)).map((qi) => (
                      <button
                        key={qi}
                        type="button"
                        onClick={() => store.addInterestItem(qi)}
                        className="min-h-[36px] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#4B4DED] hover:text-[#4B4DED] text-slate-600 text-xs font-medium transition-colors cursor-pointer text-left"
                      >
                        + {qi}
                      </button>
                    ))}
                  </div>

                  {store.interestsList.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2.5 border-t border-slate-100">
                      {store.interestsList.map((interest, idx) => (
                        <span
                          key={idx}
                          className="min-h-[38px] pl-3 pr-1.5 py-1 rounded-xl bg-[#EEF1FF] text-[#4B4DED] border border-[#4B4DED]/20 text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <span>{interest}</span>
                          <button
                            type="button"
                            onClick={() => store.removeInterestItem(idx)}
                            className="min-h-[28px] min-w-[28px] flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer shrink-0"
                            aria-label={`Remove ${interest}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 8: Finalize, Optional Sections & Section Reordering */}
              {currentStep === 8 && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F5F7FF] via-[#EEF1FF]/75 to-[#F8F9FE] border border-[#4B4DED]/25 shadow-xs space-y-4">
                    {/* Header: Status Icon, Title, Subtitle & ATS Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#4B4DED] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-[#0F1B4D] leading-snug">
                            Your CV is ready for export
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 tabular-nums">
                            Active template: <strong className="text-[#0F1B4D]">{activeTemplate.name}</strong> · {totalPages} {totalPages === 1 ? 'A4 page' : 'A4 pages'}
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-semibold shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ATS Ready</span>
                      </span>
                    </div>

                    {/* Quick Re-save links if already generated */}
                    {(readyPdfBlob || readyDocxBlob) && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1 border-t border-[#4B4DED]/15">
                        <span className="text-slate-500 font-medium">Recent exports:</span>
                        {readyPdfBlob && (
                          <a
                            href={readyPdfBlob.blobUrl}
                            download={readyPdfBlob.fileName}
                            className="inline-flex items-center gap-1 font-semibold text-[#4B4DED] hover:underline"
                          >
                            <Download className="w-3 h-3" />
                            <span>Save {readyPdfBlob.fileName}</span>
                          </a>
                        )}
                        {readyDocxBlob && (
                          <a
                            href={readyDocxBlob.blobUrl}
                            download={readyDocxBlob.fileName}
                            className="inline-flex items-center gap-1 font-semibold text-[#4B4DED] hover:underline"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Save {readyDocxBlob.fileName}</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Primary Export CTA: Prominent Download Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className={`w-full min-h-[46px] px-5 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] disabled:opacity-75 disabled:cursor-wait ${
                          downloadDone
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                            : 'bg-[#4B4DED] hover:bg-[#3D3FC9] shadow-[#4B4DED]/25'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            <span>Generating 300 DPI A4 PDF...</span>
                          </>
                        ) : downloadDone ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5] shrink-0" />
                            <span>A4 PDF Downloaded!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 shrink-0" />
                            <span>Download A4 PDF</span>
                            <span className="text-xs text-white/80 font-normal font-mono hidden sm:inline">
                              ({resolvedFileName()})
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Secondary Action Grid: Word, Vector Print, PDF Settings, Share, Preview (mobile) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleDownloadDocx}
                        disabled={isDownloadingDocx}
                        className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-70 ${
                          docxDownloadDone
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-white hover:bg-slate-50 border-slate-200/90 text-[#0F1B4D] shadow-2xs'
                        }`}
                      >
                        {isDownloadingDocx ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4B4DED]" />
                            <span className="truncate">Building...</span>
                          </>
                        ) : docxDownloadDone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                            <span className="truncate">Word (.docx)</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleBrowserPrint}
                        onMouseEnter={() => setShowPrintSettingsTip(true)}
                        onMouseLeave={() => setShowPrintSettingsTip(false)}
                        onFocus={() => setShowPrintSettingsTip(true)}
                        onBlur={() => setShowPrintSettingsTip(false)}
                        aria-describedby="vector-print-settings-hint"
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span className="truncate">Vector Print</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          commitPendingInputs();
                          setIsPdfSettingsModalOpen(true);
                        }}
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Configure hyperlinks and image compression for PDF export"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span className="truncate">PDF Settings</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenShareModal}
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Generate a temporary shareable CV link"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span className="truncate">Share Link</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchMobileMode('preview')}
                        className="lg:hidden col-span-2 min-h-[40px] px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span>Preview Full A4 CV</span>
                      </button>
                    </div>

                    {/* Print hint with interactive tooltip */}
                    <div className="relative pt-1 border-t border-[#4B4DED]/15 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Info className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span className="truncate">
                          For print: set <strong className="font-semibold text-[#0F1B4D]">Margins: None</strong> &amp; <strong className="font-semibold text-[#0F1B4D]">Scale: 100%</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        id="vector-print-settings-hint"
                        onClick={() => setShowPrintSettingsTip((prev) => !prev)}
                        onMouseEnter={() => setShowPrintSettingsTip(true)}
                        onMouseLeave={() => setShowPrintSettingsTip(false)}
                        onFocus={() => setShowPrintSettingsTip(true)}
                        onBlur={() => setShowPrintSettingsTip(false)}
                        aria-expanded={showPrintSettingsTip}
                        className="text-[#4B4DED] hover:underline font-medium cursor-pointer shrink-0 ml-2"
                      >
                        Print specs
                      </button>

                      {showPrintSettingsTip && (
                        <div
                          role="tooltip"
                          className="absolute bottom-full right-0 mb-2 w-[264px] max-w-[calc(100vw-2.5rem)] p-3 rounded-xl bg-[#0F1B4D] text-white text-[11px] leading-relaxed shadow-xl border border-white/10 z-30 text-left"
                        >
                          <div className="font-bold text-white mb-1.5 flex items-center justify-between gap-2">
                            <span>Recommended Print Settings</span>
                            <span className="text-[10px] font-mono text-indigo-200">A4 PDF</span>
                          </div>
                          <ul className="space-y-1 text-slate-200">
                            <li className="flex items-center justify-between gap-2">
                              <span className="text-slate-300">Margins:</span>
                              <span className="font-semibold text-white">None</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span className="text-slate-300">Scale:</span>
                              <span className="font-semibold text-white">100%</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span className="text-slate-300">Paper size:</span>
                              <span className="font-semibold text-white">A4 (210 × 297 mm)</span>
                            </li>
                            <li className="flex items-center justify-between gap-2">
                              <span className="text-slate-300">Background graphics:</span>
                              <span className="font-semibold text-emerald-300">Enabled</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional Summary Final Polish + AI Rewrite */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="builder-finalize-summary-textarea"
                            className="text-xs font-semibold text-[#0F1B4D] block"
                          >
                            Professional Summary
                          </label>
                          <WordCountBadge count={summaryWordCount} min={40} max={80} />
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums">
                          Recruitment standard: 40–80 words · {summaryText.length} chars
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {canUndoSummaryRewrite && !isRewritingSummary && (
                          <button
                            type="button"
                            onClick={handleUndoSummaryRewrite}
                            className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F1B4D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                            title="Restore previous summary draft"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Undo</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleRewriteSummary}
                          disabled={isRewritingSummary}
                          className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-wait ${
                            summaryRewriteSuccess
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white border border-[#4B4DED]/25 shadow-2xs'
                          }`}
                        >
                          {isRewritingSummary ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                              <span>Rewriting...</span>
                            </>
                          ) : summaryRewriteSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
                              <span>Polished</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>AI Rewrite</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <textarea
                      id="builder-finalize-summary-textarea"
                      value={summaryText}
                      onChange={(e) => {
                        if (summaryRewriteError) clearSummaryRewriteError();
                        store.setSummary(e.target.value);
                      }}
                      placeholder="Review or write your 3–4 sentence professional summary, then click AI Rewrite to polish..."
                      rows={4}
                      className={inputClass}
                    />

                    {summaryRewriteError && (
                      <div
                        role="alert"
                        className="mt-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span>{summaryRewriteError}</span>
                      </div>
                    )}
                  </div>

                  {/* Custom PDF Filename & Export Settings Summary */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <label className="block text-xs font-semibold text-[#0F1B4D]">
                        PDF File Name
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          commitPendingInputs();
                          setIsPdfSettingsModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B4DED] hover:text-[#3D3FC9] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Sliders className="w-3.5 h-3.5 shrink-0" />
                        <span>PDF Export Settings</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={store.customPdfFileName || ''}
                      onChange={(e) => store.setCustomPdfFileName(e.target.value)}
                      placeholder={resolvedFileName()}
                      className={inputClass}
                    />
                    <p className="mt-1.5 text-[11px] text-slate-500 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 tabular-nums">
                      <span>
                        Hyperlinks:{' '}
                        <strong className="font-semibold text-[#0F1B4D]">
                          {activePdfExportSettings.includeHyperlinks ? 'On' : 'Off'}
                        </strong>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <span>
                        Compress Images:{' '}
                        <strong className="font-semibold text-[#0F1B4D]">
                          {activePdfExportSettings.compressImages ? 'On' : 'Off'}
                        </strong>
                      </span>
                    </p>
                  </div>

                  {/* Optional Sections Disclosure */}
                  <div className="rounded-2xl border border-slate-200 bg-[#F8F9FE]/60 p-4 space-y-4">
                    <button
                      type="button"
                      onClick={() => setShowOptionalSections((prev) => !prev)}
                      className="min-h-[42px] w-full flex items-center justify-between gap-2 text-left cursor-pointer"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-[#0F1B4D]">
                          Optional CV Sections
                          {optionalSectionsCount > 0 && (
                            <span className="ml-2 text-[#4B4DED] tabular-nums">
                              ({optionalSectionsCount} active)
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Certifications, Key Projects, Honours &amp; Awards, Custom Sections &amp; References
                        </p>
                      </div>
                      {showOptionalSections || optionalSectionsCount > 0 ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {(showOptionalSections || optionalSectionsCount > 0) && (
                      <div className="space-y-5 pt-3 border-t border-slate-200/80">
                        {/* 1. Certifications & Licences */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#0F1B4D]">
                            Certifications &amp; Licences
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={certInput}
                              onChange={(e) => setCertInput(e.target.value)}
                              placeholder="e.g. AWS Solutions Architect, PRINCE2"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCertification();
                                }
                              }}
                              className={inputClass}
                            />
                            <button
                              type="button"
                              onClick={handleAddCertification}
                              className="min-h-[46px] sm:min-h-[42px] px-4 py-2 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
                            >
                              Add
                            </button>
                          </div>
                          {store.certificationsList.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {store.certificationsList.map((cert, idx) => (
                                <span
                                  key={idx}
                                  className="min-h-[34px] pl-3 pr-1.5 py-1 rounded-xl bg-white text-[#0F1B4D] border border-slate-200 text-xs font-medium inline-flex items-center gap-1.5"
                                >
                                  <span>{cert}</span>
                                  <button
                                    type="button"
                                    onClick={() => store.removeCertification(idx)}
                                    className="min-h-[26px] min-w-[26px] flex items-center justify-center text-slate-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 2. Key Projects */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-200/70">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-[#0F1B4D]">
                              Key Projects
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                store.addProject({
                                  title: '',
                                  role: '',
                                  link: '',
                                  description: '',
                                })
                              }
                              className="min-h-[36px] px-2.5 rounded-lg hover:bg-[#EEF1FF] text-xs font-semibold text-[#4B4DED] hover:text-[#3D3FC9] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add project</span>
                            </button>
                          </div>
                          {store.projectsList.map((proj, idx) => (
                            <div
                              key={proj.id || idx}
                              className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-[#0F1B4D] truncate">
                                  {proj.title || `Project ${idx + 1}`}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => store.removeProject(idx)}
                                  className="min-h-[34px] min-w-[34px] flex items-center justify-center text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                                  title="Remove project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                <input
                                  type="text"
                                  value={proj.title ?? ''}
                                  onChange={(e) =>
                                    store.updateProject(idx, { title: e.target.value })
                                  }
                                  placeholder="Project Title"
                                  className={inputClass}
                                />
                                <input
                                  type="text"
                                  value={proj.role ?? ''}
                                  onChange={(e) =>
                                    store.updateProject(idx, { role: e.target.value })
                                  }
                                  placeholder="Role / Year (Optional)"
                                  className={inputClass}
                                />
                                <input
                                  type="text"
                                  value={proj.link ?? ''}
                                  onChange={(e) =>
                                    store.updateProject(idx, { link: e.target.value })
                                  }
                                  placeholder="URL / GitHub (Optional)"
                                  className={inputClass}
                                />
                              </div>
                              <div className="flex items-center justify-between gap-2 pt-0.5">
                                <label className="text-[11px] font-semibold text-slate-600">
                                  Project Outcomes &amp; Highlights
                                </label>
                                <WordCountBadge text={proj.description} min={15} max={60} />
                              </div>
                              <textarea
                                value={proj.description ?? ''}
                                onChange={(e) =>
                                  store.updateProject(idx, { description: e.target.value })
                                }
                                placeholder="Key project outcomes or technical architecture (supports multiple bullet lines)"
                                rows={2}
                                className={inputClass}
                              />
                            </div>
                          ))}
                        </div>

                        {/* 3. Honours & Awards */}
                        <div className="space-y-2 pt-3 border-t border-slate-200/70">
                          <label className="block text-xs font-semibold text-[#0F1B4D]">
                            Honours &amp; Awards
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={awardInput}
                              onChange={(e) => setAwardInput(e.target.value)}
                              placeholder="e.g. Dean's Excellence Scholarship (2023)"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddAward();
                                }
                              }}
                              className={inputClass}
                            />
                            <button
                              type="button"
                              onClick={handleAddAward}
                              className="min-h-[46px] sm:min-h-[42px] px-4 py-2 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
                            >
                              Add
                            </button>
                          </div>
                          {store.awardsList.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {store.awardsList.map((award, idx) => (
                                <span
                                  key={idx}
                                  className="min-h-[34px] pl-3 pr-1.5 py-1 rounded-xl bg-white text-[#0F1B4D] border border-slate-200 text-xs font-medium inline-flex items-center gap-1.5"
                                >
                                  <span>{award}</span>
                                  <button
                                    type="button"
                                    onClick={() => store.removeAward(idx)}
                                    className="min-h-[26px] min-w-[26px] flex items-center justify-center text-slate-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 4. Custom Sections */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-200/70">
                          <div className="flex items-center justify-between gap-2">
                            <label className="text-xs font-semibold text-[#0F1B4D]">
                              Custom Sections (Publications, Volunteering)
                            </label>
                            <button
                              type="button"
                              onClick={() => store.addCustomSection({ title: '', content: '' })}
                              className="min-h-[36px] px-2.5 rounded-lg hover:bg-[#EEF1FF] text-xs font-semibold text-[#4B4DED] hover:text-[#3D3FC9] inline-flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add section</span>
                            </button>
                          </div>
                          {store.customSections.map((sec) => (
                            <div
                              key={sec.id}
                              className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <input
                                  type="text"
                                  value={sec.title ?? ''}
                                  onChange={(e) =>
                                    store.updateCustomSection(sec.id, { title: e.target.value })
                                  }
                                  placeholder="Section Heading (e.g. Publications)"
                                  className={inputClass}
                                />
                                <button
                                  type="button"
                                  onClick={() => store.removeCustomSection(sec.id)}
                                  className="min-h-[42px] min-w-[42px] flex items-center justify-center text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer shrink-0"
                                  title="Remove custom section"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between gap-2 pt-0.5">
                                <label className="text-[11px] font-semibold text-slate-600">
                                  Section Content
                                </label>
                                <WordCountBadge text={sec.content} min={20} max={80} />
                              </div>
                              <textarea
                                value={sec.content ?? ''}
                                onChange={(e) =>
                                  store.updateCustomSection(sec.id, { content: e.target.value })
                                }
                                placeholder="Enter details or one bullet point per line..."
                                rows={3}
                                className={inputClass}
                              />
                            </div>
                          ))}
                        </div>

                        {/* 5. References */}
                        <div className="space-y-2 pt-3 border-t border-slate-200/70">
                          <label className="min-h-[38px] inline-flex items-center gap-2.5 text-xs font-semibold text-[#0F1B4D] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(store.includeReferences)}
                              onChange={(e) => store.setIncludeReferences(e.target.checked)}
                              className="w-4 h-4 rounded accent-[#4B4DED]"
                            />
                            <span>Include References section on CV</span>
                          </label>
                          {store.includeReferences && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold text-slate-600">
                                  References Statement
                                </span>
                                <WordCountBadge text={store.referencesText} max={25} />
                              </div>
                              <textarea
                                value={store.referencesText ?? ''}
                                onChange={(e) => store.setReferencesText(e.target.value)}
                                placeholder="References available on request"
                                rows={2}
                                className={inputClass}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section Reordering List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#0F1B4D]">CV Section Order</h4>
                      <span className="text-[11px] text-slate-400">
                        Use arrows or drag to reorder
                      </span>
                    </div>
                    {normalizedOrder.map((secKey, idx) => (
                      <div
                        key={secKey}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', idx.toString());
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
                          if (isNaN(fromIdx) || fromIdx === idx) return;
                          const order = [...normalizedOrder];
                          const [moved] = order.splice(fromIdx, 1);
                          order.splice(idx, 0, moved);
                          store.setSectionOrder(order);
                        }}
                        className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 rounded-xl bg-white border border-slate-200 cursor-grab active:cursor-grabbing hover:border-[#4B4DED] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-[#4B4DED] font-mono text-xs font-bold tabular-nums w-4 shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-[#0F1B4D] truncate">
                            {SECTION_LABELS[secKey] || secKey}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const order = [...normalizedOrder];
                              const [moved] = order.splice(idx, 1);
                              order.splice(idx - 1, 0, moved);
                              store.setSectionOrder(order);
                            }}
                            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg hover:bg-[#EEF1FF] text-slate-500 hover:text-[#4B4DED] disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                            aria-label="Move section up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === normalizedOrder.length - 1}
                            onClick={() => {
                              if (idx === normalizedOrder.length - 1) return;
                              const order = [...normalizedOrder];
                              const [moved] = order.splice(idx, 1);
                              order.splice(idx + 1, 0, moved);
                              store.setSectionOrder(order);
                            }}
                            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg hover:bg-[#EEF1FF] text-slate-500 hover:text-[#4B4DED] disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                            aria-label="Move section down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ergonomic Step Navigation Footer */}
              <div className="flex items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="min-h-[48px] px-5 sm:px-6 py-2.5 rounded-xl border border-slate-200 text-[#0F1B4D] font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-none min-h-[48px] px-5 sm:px-7 py-3 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(75,77,237,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.99]"
                >
                  <span className="truncate">
                    {currentStep === STEPS.length
                      ? 'Download PDF'
                      : `Next: ${STEPS[currentStep].short}`}
                  </span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          ) : (
            /* Design Studio Tab */
            <div className="space-y-6 sm:space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B4D]">Design Studio</h2>
                    {renderAutoSaveStatus(false)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Switch ATS-approved templates, accent colours, and typography in real time.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSwitchMobileMode('preview')}
                    className="lg:hidden flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#4B4DED]" />
                    <span>View Live CV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 rounded-xl bg-[#EEF1FF] hover:bg-[#4B4DED] text-[#4B4DED] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Full Gallery</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                    CV Language
                  </label>
                  <select
                    value={store.language || 'English (UK)'}
                    onChange={(e) => store.setLanguage(e.target.value)}
                    className={inputClass}
                  >
                    <option value="English (UK)">United Kingdom (English)</option>
                    <option value="English (US)">United States (English)</option>
                    <option value="Français (FR)">Français (FR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                    Active Font Family
                  </label>
                  <select
                    value={store.fontFamily || 'jakarta'}
                    onChange={(e) => store.setFontFamily(e.target.value)}
                    className={inputClass}
                  >
                    <option value="jakarta">Plus Jakarta Sans (Geometric)</option>
                    <option value="inter">Inter (Modern Sans)</option>
                    <option value="merriweather">Merriweather (Classic Serif)</option>
                    <option value="lora">Lora (Editorial Serif)</option>
                    <option value="roboto">Roboto (Clean Sans)</option>
                    <option value="mono">JetBrains Mono (Technical)</option>
                  </select>
                </div>
              </div>

              {/* Font Scaling & Photo Visibility Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F8F9FE] border border-slate-200 min-h-[46px] sm:min-h-[42px]">
                    {(
                      [
                        { id: 'sm', label: 'Small' },
                        { id: 'md', label: 'Medium' },
                        { id: 'lg', label: 'Large' },
                      ] as { id: FontScale; label: string }[]
                    ).map((opt) => {
                      const active = (store.fontScale || 'md') === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => store.setFontScale(opt.id)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-[#4B4DED] text-white shadow-xs'
                              : 'text-slate-600 hover:text-[#0F1B4D]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B4D] mb-1.5">
                    Profile Photo Display
                  </label>
                  <button
                    type="button"
                    onClick={() => store.setShowPhoto(!store.showPhoto)}
                    className={`w-full min-h-[46px] sm:min-h-[42px] px-4 py-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      store.showPhoto
                        ? 'border-[#4B4DED]/40 bg-[#EEF1FF]/50 text-[#0F1B4D]'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <span>
                      {store.showPhoto ? 'Visible on photo templates' : 'Hidden on CV'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        store.showPhoto
                          ? 'bg-[#4B4DED] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {store.showPhoto ? 'On' : 'Off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Date Format Dropdown (UK Industry Standards) */}
              {(() => {
                const activeDateFormat = normalizeDateFormat(store.dateFormat);
                const activeFormatMeta = getDateFormatMeta(activeDateFormat);
                return (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <label
                        htmlFor="cv-date-format-select"
                        className="text-xs font-semibold text-[#0F1B4D] flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                        <span>Date Format</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono font-semibold text-[#0F1B4D] tabular-nums">
                          {activeFormatMeta.sampleRange}
                        </span>
                        {activeDateFormat !== DEFAULT_DATE_FORMAT && (
                          <button
                            type="button"
                            onClick={() => store.setDateFormat(DEFAULT_DATE_FORMAT)}
                            className="text-[11px] font-semibold text-[#4B4DED] hover:text-[#3D3FC9] hover:underline cursor-pointer flex items-center gap-1"
                            title="Reset date format to Month Year"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <select
                      id="cv-date-format-select"
                      value={activeDateFormat}
                      onChange={(e) => store.setDateFormat(e.target.value as DateFormatOption)}
                      aria-label="Date Format"
                      className={inputClass}
                    >
                      {DATE_FORMAT_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <p className="text-[11px] text-slate-500">
                      Standardises Work Experience, Education, and Personal dates across your CV using UK day–month–year formatting.
                    </p>
                  </div>
                );
              })()}

              {/* Letter Spacing Control Slider */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="cv-letter-spacing-slider"
                    className="text-xs font-semibold text-[#0F1B4D]"
                  >
                    Letter Spacing
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono font-semibold text-[#0F1B4D] tabular-nums">
                      {Math.abs(store.letterSpacing ?? 0) < 0.05
                        ? '0.0px (Default)'
                        : `${(store.letterSpacing ?? 0) > 0 ? '+' : ''}${(
                            store.letterSpacing ?? 0
                          ).toFixed(1)}px`}
                    </span>
                    {Math.abs(store.letterSpacing ?? 0) >= 0.05 && (
                      <button
                        type="button"
                        onClick={() => store.setLetterSpacing(0)}
                        className="text-[11px] font-semibold text-[#4B4DED] hover:text-[#3D3FC9] hover:underline cursor-pointer flex items-center gap-1"
                        title="Reset letter spacing to default"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                <input
                  id="cv-letter-spacing-slider"
                  type="range"
                  min={-0.5}
                  max={2}
                  step={0.1}
                  value={store.letterSpacing ?? 0}
                  onChange={(e) => store.setLetterSpacing(parseFloat(e.target.value))}
                  aria-label="Letter Spacing"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4B4DED]"
                />

                <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 pt-0.5">
                  {[
                    { label: 'Tight (-0.5px)', value: -0.5 },
                    { label: 'Normal (0px)', value: 0 },
                    { label: 'Wide (+1.0px)', value: 1 },
                    { label: 'Spacious (+2.0px)', value: 2 },
                  ].map((preset) => {
                    const isActive = Math.abs((store.letterSpacing ?? 0) - preset.value) < 0.05;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => store.setLetterSpacing(preset.value)}
                        className={`transition-colors cursor-pointer ${
                          isActive
                            ? 'text-[#4B4DED] font-bold'
                            : 'text-slate-500 hover:text-[#0F1B4D]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Boldness Toggle Control */}
              {(() => {
                const boldness = normalizeFontBoldness(store.fontBoldness);
                const boldTargets: {
                  id: FontBoldnessTarget;
                  label: string;
                  hint: string;
                }[] = [
                  {
                    id: 'header',
                    label: 'CV Header & Name',
                    hint: 'Candidate name & job title',
                  },
                  {
                    id: 'headings',
                    label: 'Section Headings',
                    hint: 'Experience, Education & Skills',
                  },
                  {
                    id: 'subheadings',
                    label: 'Role & Entry Titles',
                    hint: 'Job roles, employers & degrees',
                  },
                  {
                    id: 'sectionText',
                    label: 'Section Body Text',
                    hint: 'Summary, bullet points & skills',
                  },
                ];
                const activeCount = boldness.enabled
                  ? boldTargets.filter((t) => boldness[t.id]).length
                  : 0;

                return (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F9FE] border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Bold className="w-3.5 h-3.5 text-[#4B4DED] shrink-0 stroke-[2.6]" />
                          <span
                            id="cv-font-boldness-label"
                            className="text-xs font-semibold text-[#0F1B4D]"
                          >
                            Font Boldness
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                            · {boldness.enabled ? `${activeCount} active` : 'Standard'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Make specific headings or section text bolder across your CV
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {boldness.enabled && (
                          <button
                            type="button"
                            onClick={() => store.resetFontBoldness()}
                            className="text-[11px] font-semibold text-[#4B4DED] hover:text-[#3D3FC9] hover:underline cursor-pointer flex items-center gap-1"
                            title="Reset font boldness to standard weights"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset</span>
                          </button>
                        )}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={boldness.enabled}
                          aria-labelledby="cv-font-boldness-label"
                          onClick={() => store.setFontBoldness({ enabled: !boldness.enabled })}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DED]/40 ${
                            boldness.enabled ? 'bg-[#4B4DED]' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${
                              boldness.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                      {boldTargets.map((target) => {
                        const isTargetActive = boldness.enabled && boldness[target.id];
                        return (
                          <button
                            key={target.id}
                            type="button"
                            aria-pressed={isTargetActive}
                            onClick={() => store.toggleFontBoldnessTarget(target.id)}
                            className={`min-h-[48px] px-3 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isTargetActive
                                ? 'border-[#4B4DED] bg-white ring-1 ring-[#4B4DED]/20 shadow-2xs'
                                : 'border-slate-200 bg-white/75 hover:bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="min-w-0">
                              <div
                                className={`text-xs truncate ${
                                  isTargetActive
                                    ? 'font-extrabold text-[#0F1B4D]'
                                    : 'font-semibold text-slate-700'
                                }`}
                              >
                                {target.label}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {target.hint}
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                isTargetActive
                                  ? 'bg-[#4B4DED] border-[#4B4DED] text-white'
                                  : 'border-slate-300 bg-slate-50 text-transparent'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Theme Colors Palette Section */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm font-bold text-[#0F1B4D]">Accent Colour</h3>
                  <div className="relative">
                    <input
                      ref={customColorInputRef}
                      type="color"
                      value={store.themeColor || '#4B4DED'}
                      onChange={(e) => store.setThemeColor(e.target.value)}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      onClick={() => customColorInputRef.current?.click()}
                      className="min-h-[36px] text-xs font-semibold text-[#4B4DED] hover:underline cursor-pointer tabular-nums"
                    >
                      Custom Hex ({store.themeColor || '#4B4DED'})
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { name: 'Royal Blue', color: '#4B4DED' },
                    { name: 'British Navy', color: '#1E3A8A' },
                    { name: 'Executive Slate', color: '#0F172A' },
                    { name: 'Heritage Teal', color: '#0F766E' },
                    { name: 'Oxford Green', color: '#065F46' },
                    { name: 'Royal Burgundy', color: '#7F1D1D' },
                  ].map((palette) => {
                    const isSelected =
                      (store.themeColor || '#4B4DED').toLowerCase() ===
                      palette.color.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={palette.color}
                        onClick={() => store.setThemeColor(palette.color)}
                        className={`min-h-[54px] p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-[#4B4DED] ring-2 ring-[#4B4DED]/20 bg-[#EEF1FF]/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white"
                          style={{ backgroundColor: palette.color }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#0F1B4D] truncate">
                            {palette.name}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {palette.color}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Family Selection Cards */}
              <div>
                <h3 className="text-sm font-bold text-[#0F1B4D] mb-2.5">Typography Pairing</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    {
                      id: 'jakarta',
                      name: 'Plus Jakarta',
                      sample: 'Aa',
                      category: 'Geometric Sans',
                      css: '"Plus Jakarta Sans", sans-serif',
                    },
                    {
                      id: 'merriweather',
                      name: 'Merriweather',
                      sample: 'Aa',
                      category: 'Classic Serif',
                      css: '"Merriweather", Georgia, serif',
                    },
                    {
                      id: 'lora',
                      name: 'Lora',
                      sample: 'Aa',
                      category: 'Editorial Serif',
                      css: '"Lora", Georgia, serif',
                    },
                    {
                      id: 'inter',
                      name: 'Inter',
                      sample: 'Aa',
                      category: 'Modern Sans',
                      css: '"Inter", sans-serif',
                    },
                    {
                      id: 'roboto',
                      name: 'Roboto',
                      sample: 'Aa',
                      category: 'Clean Sans',
                      css: '"Roboto", sans-serif',
                    },
                    {
                      id: 'mono',
                      name: 'JetBrains Mono',
                      sample: '01',
                      category: 'Technical',
                      css: '"JetBrains Mono", monospace',
                    },
                  ].map((font) => {
                    const isSelected = (store.fontFamily || 'jakarta') === font.id;
                    return (
                      <button
                        type="button"
                        key={font.id}
                        onClick={() => store.setFontFamily(font.id)}
                        className={`p-3 sm:p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#4B4DED] ring-2 ring-[#4B4DED]/20 bg-[#EEF1FF]/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1.5">
                          <span
                            style={{ fontFamily: font.css }}
                            className="text-lg font-bold text-[#0F1B4D]"
                          >
                            {font.sample}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#4B4DED] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F1B4D] truncate">
                            {font.name}
                          </div>
                          <span className="text-[10px] text-slate-500">{font.category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Responsive Visual Template Picker Grid */}
              <div>
                <h3 className="text-sm font-bold text-[#0F1B4D] mb-3 tabular-nums">
                  CV Templates ({CV_TEMPLATES.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
                  {CV_TEMPLATES.map((tmpl) => {
                    const isSelected = activeTemplate.id === tmpl.id;
                    const ThumbComp = tmpl.component;
                    const thumbCv: CV = applyDateFormatToCv(
                      {
                        ...SAMPLE_UK_CV,
                        settings: {
                          ...SAMPLE_UK_CV.settings,
                          templateId: tmpl.id,
                          accentColor: store.themeColor || '#4B4DED',
                          dateFormat: normalizeDateFormat(store.dateFormat),
                          letterSpacing: store.letterSpacing ?? 0,
                          fontBoldness: store.fontBoldness,
                        },
                      },
                      store.dateFormat
                    );
                    return (
                      <button
                        type="button"
                        key={tmpl.id}
                        onClick={() => store.setTemplate(tmpl.id as any)}
                        className={`group relative rounded-2xl p-2 sm:p-2.5 bg-white border text-left cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                          isSelected
                            ? 'border-[#4a4df2] ring-2 ring-[#4a4df2]/20 shadow-md bg-[#EEF1FF]/30'
                            : 'border-slate-200 hover:border-[#4a4df2]/50 hover:shadow-sm'
                        }`}
                      >
                        <DesignTemplateThumb Component={ThumbComp} cv={thumbCv} />
                        <div className="flex items-center justify-between gap-1 px-0.5">
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#0F1B4D] truncate">
                              {tmpl.name}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {tmpl.category}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#4B4DED] text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Precision Document Studio Live A4 CV Preview
            IMPORTANT: On mobile (<lg) when editing Content/Design, we keep this mounted off-screen
            rather than `display: none` so CvPreview & #cv-print-area remain 100% live for instant PDF export! */}
        <div
          className={`lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:sticky lg:top-[76px] ${
            mobileMode === 'preview'
              ? 'w-full'
              : 'max-lg:fixed max-lg:-left-[9999px] max-lg:top-0 max-lg:w-[390px] max-lg:opacity-0 max-lg:pointer-events-none'
          }`}
        >
          {/* Unified Document Preview Studio Frame */}
          <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/95 bg-[#EAEEF7] shadow-[0_8px_30px_rgba(15,27,77,0.06)] overflow-hidden flex flex-col">
            {/* Integrated Single-Bar Studio Control Strip */}
            <div className="w-full bg-white border-b border-slate-200/90 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              {/* Left: Template Picker + Quick Accent Dots + Typographic Sheet Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="min-h-[36px] px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#EEF1FF]/70 border border-slate-200/90 hover:border-[#4B4DED]/60 text-[#0F1B4D] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  title="Switch CV template layout"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-[150px]">{activeTemplate.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {/* Quick Accent Swatches */}
                <div className="hidden xl:flex items-center gap-1.5 pl-2.5 border-l border-slate-200">
                  {[
                    { color: '#4B4DED', name: 'Royal Blue' },
                    { color: '#1E3A8A', name: 'British Navy' },
                    { color: '#0F172A', name: 'Executive Slate' },
                    { color: '#065F46', name: 'Oxford Green' },
                    { color: '#7F1D1D', name: 'Burgundy' },
                  ].map((swatch) => {
                    const isSelected =
                      (store.themeColor || '#4B4DED').toLowerCase() === swatch.color.toLowerCase();
                    return (
                      <button
                        key={swatch.color}
                        type="button"
                        onClick={() => store.setThemeColor(swatch.color)}
                        title={swatch.name}
                        aria-label={`Select ${swatch.name} accent`}
                        className={`w-4 h-4 rounded-full cursor-pointer transition-transform duration-150 hover:scale-110 flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-offset-1 ring-[#4B4DED] scale-105'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: swatch.color }}
                      />
                    );
                  })}
                </div>

                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="hidden sm:inline text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
                  A4 · {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
                </span>
              </div>

              {/* Right: Page Stepper + Zoom/Fit + Margin Guides + Fullscreen Inspect + Print */}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                {/* Multi-Page Navigation */}
                {totalPages > 1 && (
                  <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200/90 px-1 py-0.5">
                    <button
                      type="button"
                      disabled={activePreviewPage <= 1}
                      onClick={() => handleScrollToPreviewPage(activePreviewPage - 1)}
                      className="min-h-[28px] min-w-[26px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-[#0F1B4D] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                      title="Previous Page"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono font-semibold text-slate-700 tabular-nums whitespace-nowrap px-1">
                      {activePreviewPage}/{totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={activePreviewPage >= totalPages}
                      onClick={() => handleScrollToPreviewPage(activePreviewPage + 1)}
                      className="min-h-[28px] min-w-[26px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-[#0F1B4D] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                      title="Next Page"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Zoom & Auto-Fit Cluster */}
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200/90 p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setManualZoom((z) => Math.max(35, (z ?? displayedZoomPercent) - 10))
                    }
                    disabled={displayedZoomPercent <= 35}
                    className="min-h-[30px] min-w-[28px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-[#0F1B4D] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-semibold text-slate-700 min-w-[38px] text-center tabular-nums">
                    {displayedZoomPercent}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setManualZoom((z) => Math.min(125, (z ?? displayedZoomPercent) + 10))
                    }
                    disabled={displayedZoomPercent >= 125}
                    className="min-h-[30px] min-w-[28px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-[#0F1B4D] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualZoom((z) => (z === null ? 100 : null))}
                    className={`min-h-[30px] px-2 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      manualZoom === null
                        ? 'bg-[#4B4DED] text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-white hover:text-[#0F1B4D]'
                    }`}
                    title={manualZoom === null ? 'Switch to 100% actual size' : 'Auto-fit to preview width'}
                  >
                    Fit
                  </button>
                </div>

                {/* Safe A4 Print Margin Guides Toggle */}
                <button
                  type="button"
                  onClick={() => setShowMarginGuides((v) => !v)}
                  aria-pressed={showMarginGuides}
                  className={`hidden sm:flex min-h-[36px] min-w-[36px] rounded-xl border items-center justify-center transition-colors cursor-pointer ${
                    showMarginGuides
                      ? 'border-[#4B4DED] bg-[#EEF1FF] text-[#4B4DED]'
                      : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F1B4D]'
                  }`}
                  title="Toggle 12mm safe A4 print margin guides"
                  aria-label="Toggle A4 margin guides"
                >
                  <Ruler className="w-3.5 h-3.5" />
                </button>

                {/* Fullscreen A4 Inspection Modal Trigger */}
                <button
                  type="button"
                  onClick={handleOpenFullscreenPreview}
                  className="min-h-[36px] px-2.5 sm:px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-[#0F1B4D] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  title="Open full-screen A4 CV inspection view"
                  aria-label="Expand full-screen preview"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#4B4DED] shrink-0" />
                  <span className="hidden md:inline">Expand</span>
                </button>

                {/* Quick Browser Print */}
                <button
                  type="button"
                  onClick={handleBrowserPrint}
                  className="hidden sm:flex min-h-[36px] min-w-[36px] rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0F1B4D] items-center justify-center transition-colors cursor-pointer"
                  title="Print / Save Vector A4 PDF"
                  aria-label="Print CV"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Architectural A4 Paper Stage with Precision Dot-Grid Backdrop */}
            <div
              ref={previewContainerRef}
              onScroll={handlePreviewScroll}
              className="w-full lg:h-[calc(100vh-146px)] lg:min-h-[600px] bg-[#EAEEF7] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:18px_18px] overflow-x-auto overflow-y-auto flex justify-center items-start p-3 sm:p-6"
            >
              <CvPreview
                showControlsBar={false}
                showMarginGuides={showMarginGuides}
                scale={effectiveScale}
                onPagesChange={handlePagesChange}
              />
            </div>
          </div>

          {/* Mobile Quick Export Card inside Preview Tab */}
          <div className="lg:hidden w-full mt-4 p-3.5 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-2.5 shadow-2xs">
            <PdfDownloadButton
              fileName={resolvedFileName}
              onBeforeDownload={commitPendingInputs}
              variant="mobile"
              label="Download A4 PDF"
            />
            <button
              type="button"
              onClick={handleDownloadDocx}
              disabled={isDownloadingDocx}
              className="min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-60"
            >
              <FileText className="w-4 h-4 text-[#4B4DED]" />
              <span>DOCX</span>
            </button>
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="min-h-[46px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0F1B4D] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-[#4B4DED]" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Mobile Workspace Navigation Bar (58px + safe area — Natural Thumb Zone) */}
      <nav
        aria-label="Mobile Builder Workspace Switcher"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8EAF5] shadow-[0_-4px_20px_rgba(15,27,77,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="max-w-lg mx-auto px-2 h-[58px] grid grid-cols-3 gap-1 items-center">
          <button
            type="button"
            onClick={() => handleSwitchMobileMode('content')}
            className={`h-[46px] rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
              mobileMode === 'content'
                ? 'bg-[#EEF1FF] text-[#4B4DED]'
                : 'text-slate-500 hover:text-[#0F1B4D]'
            }`}
          >
            <div className="flex items-center gap-1">
              <FileEdit className="w-[18px] h-[18px]" />
              <span className="text-[10px] font-mono font-bold tabular-nums opacity-80">
                {currentStep}/{STEPS.length}
              </span>
            </div>
            <span className="text-[11px] font-semibold leading-tight mt-0.5">Edit CV</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMobileMode('design')}
            className={`h-[46px] rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
              mobileMode === 'design'
                ? 'bg-[#EEF1FF] text-[#4B4DED]'
                : 'text-slate-500 hover:text-[#0F1B4D]'
            }`}
          >
            <Palette className="w-[18px] h-[18px]" />
            <span className="text-[11px] font-semibold leading-tight mt-0.5">Design</span>
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMobileMode('preview')}
            className={`h-[46px] rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
              mobileMode === 'preview'
                ? 'bg-[#EEF1FF] text-[#4B4DED]'
                : 'text-slate-500 hover:text-[#0F1B4D]'
            }`}
          >
            <div className="flex items-center gap-1">
              <Eye className="w-[18px] h-[18px]" />
              <span className="text-[10px] font-mono font-bold tabular-nums opacity-80">
                {totalPages}p
              </span>
            </div>
            <span className="text-[11px] font-semibold leading-tight mt-0.5">Preview</span>
          </button>
        </div>
      </nav>

      {/* Full-Screen A4 CV Inspection Modal */}
      {isFullscreenPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen CV Inspection"
          className="fixed inset-0 z-[45] bg-slate-950/85 backdrop-blur-sm flex flex-col"
        >
          <div className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(true)}
                className="min-h-[38px] px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0F1B4D] text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#4B4DED]" />
                <span>{activeTemplate.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <span className="hidden sm:inline text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
                A4 (210 × 297 mm) · {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-0.5">
                <button
                  type="button"
                  onClick={() => setFullscreenZoom((z) => Math.max(30, z - 10))}
                  disabled={fullscreenZoom <= 30}
                  className="min-h-[30px] min-w-[28px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-35 cursor-pointer"
                  aria-label="Zoom out fullscreen preview"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-800 min-w-[38px] sm:min-w-[42px] text-center tabular-nums">
                  {fullscreenZoom}%
                </span>
                <button
                  type="button"
                  onClick={() => setFullscreenZoom((z) => Math.min(145, z + 10))}
                  disabled={fullscreenZoom >= 145}
                  className="min-h-[30px] min-w-[28px] flex items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-35 cursor-pointer"
                  aria-label="Zoom in fullscreen preview"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const mobileFit = typeof window !== 'undefined' && window.innerWidth < 640
                      ? Math.min(100, Math.round(((window.innerWidth - 32) / A4_WIDTH_PX) * 100))
                      : 100;
                    setFullscreenZoom((curr) => (curr === mobileFit ? 100 : mobileFit));
                  }}
                  className={`min-h-[30px] px-2 rounded-lg text-[11px] font-semibold cursor-pointer ${
                    fullscreenZoom === 100
                      ? 'bg-[#4B4DED] text-white'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                  title="Toggle between Fit and 100%"
                >
                  {fullscreenZoom === 100 ? '100%' : 'Fit'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowMarginGuides((v) => !v)}
                aria-pressed={showMarginGuides}
                className={`hidden md:flex min-h-[38px] px-3 rounded-xl border text-xs font-semibold items-center gap-1.5 cursor-pointer ${
                  showMarginGuides
                    ? 'border-[#4B4DED] bg-[#EEF1FF] text-[#4B4DED]'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Margins</span>
              </button>

              <button
                type="button"
                onClick={handleBrowserPrint}
                className="hidden sm:flex min-h-[38px] px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#4B4DED]" />
                <span>Print</span>
              </button>

              <PdfDownloadButton
                fileName={resolvedFileName}
                onBeforeDownload={commitPendingInputs}
                variant="compact"
                label="Download PDF"
              />

              <button
                type="button"
                onClick={() => setIsFullscreenPreviewOpen(false)}
                className="min-h-[38px] px-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                aria-label="Close full-screen preview"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsFullscreenPreviewOpen(false);
            }}
            className="flex-1 overflow-auto flex justify-center items-start p-4 sm:p-8 bg-slate-900/60"
          >
            <CvPreview
              isPrimary={false}
              showControlsBar={false}
              showMarginGuides={showMarginGuides}
              scale={fullscreenZoom / 100}
            />
          </div>
        </div>
      )}

      {/* Full Template & Design Modal / Bottom Sheet */}
      {isTemplateModalOpen && (
        <TemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}

      {/* Share Temporary Public Link Modal */}
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* PDF Export Settings Modal */}
      {isPdfSettingsModalOpen && (
        <PdfExportSettingsModal
          isOpen={isPdfSettingsModalOpen}
          onClose={() => setIsPdfSettingsModalOpen(false)}
          fileName={resolvedFileName}
          onBeforeDownload={commitPendingInputs}
          totalPages={totalPages}
          lastExportedBytes={readyPdfBlob?.byteSize ?? null}
        />
      )}

      {/* Import from LinkedIn OAuth & Profile Parser Modal */}
      {isLinkedInModalOpen && (
        <LinkedInImportModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          onImportSuccess={handleLinkedInImportSuccess}
        />
      )}

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      {/* Subtle Auto-Save Confirmation Toast */}
      <SaveToast />
    </div>
  );
}
