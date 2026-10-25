'use client';

import React, { useState } from 'react';
import { useCvStore, DetectedImportStats } from '@/store/useCvStore';
import {
  CheckCircle2,
  Sparkles,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Award,
  FolderGit2,
  RotateCcw,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ImportStatusBannerProps {
  stats: DetectedImportStats;
  fileName?: string | null;
  onRevert?: () => void;
  onDismiss?: () => void;
}

export default function ImportStatusBanner({
  stats,
  fileName,
  onRevert,
  onDismiss,
}: ImportStatusBannerProps) {
  const store = useCvStore();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const sectionsList = [
    {
      id: 1,
      label: 'Personal Details',
      detected: stats.hasContact,
      countLabel: stats.contactFieldsCount > 0 ? `${stats.contactFieldsCount} fields` : 'Found',
      icon: User,
    },
    {
      id: 2,
      label: 'Work Experience',
      detected: stats.experienceCount > 0,
      countLabel: `${stats.experienceCount} role${stats.experienceCount === 1 ? '' : 's'}`,
      icon: Briefcase,
    },
    {
      id: 3,
      label: 'Education',
      detected: stats.educationCount > 0,
      countLabel: `${stats.educationCount} degree${stats.educationCount === 1 ? '' : 's'}`,
      icon: GraduationCap,
    },
    {
      id: 4,
      label: 'Skills',
      detected: stats.skillCount > 0,
      countLabel: `${stats.skillCount} skills`,
      icon: Wrench,
    },
    {
      id: 5,
      label: 'Summary',
      detected: stats.hasSummary,
      countLabel: 'Extracted',
      icon: FileText,
    },
    {
      id: 6,
      label: 'Languages',
      detected: stats.languageCount > 0,
      countLabel: `${stats.languageCount} langs`,
      icon: Languages,
    },
  ];

  const detectedCount = sectionsList.filter((s) => s.detected).length;

  const handleJumpToStep = (stepId: number) => {
    store.setStep(stepId);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-emerald-50/95 via-teal-50/70 to-indigo-50/80 border border-emerald-200/90 p-3.5 sm:p-4 shadow-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Import Status
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {detectedCount} of {sectionsList.length} Sections Auto-Detected
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 truncate">
              Scanned from <span className="font-semibold text-slate-900">{fileName || 'Uploaded CV'}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {onRevert && (
            <button
              type="button"
              onClick={onRevert}
              className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300/80 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Undo this import and restore your previous draft"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revert</span>
            </button>
          )}

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
              title="Dismiss import status indicator"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Auto-detected Sections Chip Grid */}
      <div className="pt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Auto-Detected Sections (Click to Jump & Review):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleJumpToStep(sec.id)}
                className={`p-2 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                  sec.detected
                    ? 'bg-white border-emerald-300/80 hover:border-emerald-500 hover:shadow-2xs'
                    : 'bg-white/50 border-slate-200/70 opacity-60 hover:opacity-100'
                }`}
                title={`Jump to ${sec.label}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      sec.detected ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                  {sec.detected ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-400">Empty</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-900 truncate group-hover:text-emerald-700">
                    {sec.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {sec.countLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supplemental sections (certifications / projects) if present */}
      {(stats.certificationCount > 0 || stats.projectCount > 0) && (
        <div className="flex items-center gap-2 pt-1 border-t border-emerald-200/50 text-[11px] text-slate-600">
          <span className="font-semibold text-emerald-950">Additional Details:</span>
          {stats.certificationCount > 0 && (
            <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-slate-800 font-medium">
              ✓ {stats.certificationCount} Certifications
            </span>
          )}
          {stats.projectCount > 0 && (
            <span className="bg-white px-2 py-0.5 rounded border border-emerald-200 text-slate-800 font-medium">
              ✓ {stats.projectCount} Projects
            </span>
          )}
        </div>
      )}
    </div>
  );
}
