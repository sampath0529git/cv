'use client';

import React, { useState } from 'react';
import { LinkedInImportPayload } from '@/lib/linkedinImport';
import {
  CheckCircle,
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  FileCheck,
  LayoutTemplate,
  Check,
  ChevronDown,
} from 'lucide-react';

export const TEMPLATE_OPTIONS = [
  { id: 'hopkins', name: 'Hopkins', style: 'Executive Header', desc: 'Prominent header banner, corporate hierarchy' },
  { id: 'toronto', name: 'Toronto', style: '2-Column Sidebar', desc: 'Sidebar contact & skills with career timeline' },
  { id: 'classic-corporate', name: 'London', style: 'Classic Corporate', desc: 'Canary Wharf corporate single-column' },
  { id: 'minimal-clean', name: 'Oxford', style: 'Minimal Clean', desc: 'Swiss typography with date columns' },
  { id: 'yale', name: 'Yale', style: 'Tech Compact', desc: 'Dense technical stacks & engineering bullets' },
  { id: 'graduate-starter', name: 'Cambridge', style: 'Graduate Starter', desc: 'Education-first early-career layout' },
  { id: 'uk-traditional', name: 'Westminster', style: 'UK Traditional', desc: 'Traditional British serif civil service' },
];

interface ImportPreviewCardProps {
  payload: LinkedInImportPayload;
  fileName?: string;
  onConfirm: (mode: 'replace' | 'merge', targetTemplate?: string) => void;
  onCancel: () => void;
}

export default function ImportPreviewCard({
  payload,
  fileName = 'Imported CV',
  onConfirm,
  onCancel,
}: ImportPreviewCardProps) {
  const [mode, setMode] = useState<'replace' | 'merge'>('replace');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    payload.suggestedTemplate || 'hopkins'
  );
  const [showTemplateMenu, setShowTemplateMenu] = useState<boolean>(false);

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ') || 'Candidate';
  const experiences = payload.experiences || [];
  const educations = payload.educations || [];
  const skills = payload.skills || [];

  const initials =
    (payload.firstName?.[0] || '') + (payload.lastName?.[0] || '') || 'CV';

  const matchedTemplateObj =
    TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplate) || TEMPLATE_OPTIONS[0];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E8EAF5] shadow-[0_8px_30px_rgba(15,27,77,0.06)] p-6 sm:p-10">
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Successfully Extracted</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B4D] tracking-tight">
            Review Parsed CV & Matched Layout
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Source: <span className="font-medium text-slate-700">{fileName}</span>
          </p>
        </div>

        {/* Import Mode Selector */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setMode('replace')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'replace'
                ? 'bg-white text-[#0F1B4D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Start Fresh (Replace)
          </button>
          <button
            type="button"
            onClick={() => setMode('merge')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'merge'
                ? 'bg-white text-[#0F1B4D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Merge with Draft
          </button>
        </div>
      </div>

      {/* Matched Template Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50/60 to-slate-50 border border-indigo-100/90 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
              Layout Matched
            </span>
            <span className="text-xs font-semibold text-indigo-950">
              {matchedTemplateObj.style}
            </span>
            <span className="text-slate-300 text-xs">·</span>
            <span className="text-[11px] font-medium text-slate-500">
              Confidence: {payload.templateConfidence || 'High'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            {payload.matchReason || 'Detected structure automatically aligned to our templates.'}
          </p>
        </div>

        {/* Template Switcher Dropdown */}
        <div className="relative w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowTemplateMenu(!showTemplateMenu)}
            className="w-full md:w-auto px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-950 text-xs font-bold shadow-xs hover:border-indigo-400 flex items-center justify-between gap-3 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-indigo-600" />
              <span>Template: {matchedTemplateObj.name} ({matchedTemplateObj.style})</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
          </button>

          {showTemplateMenu && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
                Choose Matched Template
              </div>
              <div className="max-h-60 overflow-y-auto">
                {TEMPLATE_OPTIONS.map((tmpl) => {
                  const isSelected = tmpl.id === selectedTemplate;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(tmpl.id);
                        setShowTemplateMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? 'bg-indigo-50 text-indigo-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {tmpl.name} <span className="text-[11px] font-normal text-slate-500">· {tmpl.style}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                          {tmpl.desc}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Summary Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F8F9FE] to-[#F1F3FD] border border-[#E2E6F8] mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#4B4DED] text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm uppercase tracking-wider">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[#0F1B4D] truncate">
              {fullName}
            </h3>
            <p className="text-sm font-semibold text-[#4B4DED] mt-0.5">
              {payload.jobTitle || 'Professional Role'}
            </p>

            {/* Contact details row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-600">
              {payload.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[200px]">{payload.email}</span>
                </span>
              )}
              {payload.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{payload.phone}</span>
                </span>
              )}
              {payload.city && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{payload.city}</span>
                </span>
              )}
              {payload.linkedin && (
                <span className="inline-flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span className="truncate max-w-[160px]">{payload.linkedin}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {payload.summary && (
          <div className="mt-4 pt-3.5 border-t border-indigo-100/70 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">Summary: </span>
            <span className="line-clamp-3">{payload.summary}</span>
          </div>
        )}
      </div>

      {/* Sections Extracted Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Experience Box */}
        <div className="p-4 rounded-2xl border border-slate-200/90 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#4B4DED]" />
              <span className="text-xs font-bold text-[#0F1B4D]">Work History</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
              {experiences.length}
            </span>
          </div>
          {experiences.length > 0 ? (
            <div className="space-y-1 mt-2">
              {experiences.slice(0, 2).map((exp, i) => (
                <div key={i} className="text-xs truncate text-slate-700">
                  <span className="font-semibold">{exp.jobTitle}</span>
                  <span className="text-slate-400"> at </span>
                  <span className="text-slate-600">{exp.employer}</span>
                </div>
              ))}
              {experiences.length > 2 && (
                <div className="text-[11px] text-slate-400 pt-0.5">
                  +{experiences.length - 2} more roles
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-2">No experiences detected</p>
          )}
        </div>

        {/* Education Box */}
        <div className="p-4 rounded-2xl border border-slate-200/90 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#4B4DED]" />
              <span className="text-xs font-bold text-[#0F1B4D]">Education</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
              {educations.length}
            </span>
          </div>
          {educations.length > 0 ? (
            <div className="space-y-1 mt-2">
              {educations.slice(0, 2).map((edu, i) => (
                <div key={i} className="text-xs truncate text-slate-700">
                  <span className="font-semibold">{edu.degree}</span>
                  <span className="text-slate-400"> · </span>
                  <span className="text-slate-600">{edu.school}</span>
                </div>
              ))}
              {educations.length > 2 && (
                <div className="text-[11px] text-slate-400 pt-0.5">
                  +{educations.length - 2} more credentials
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-2">No education detected</p>
          )}
        </div>

        {/* Skills Box */}
        <div className="p-4 rounded-2xl border border-slate-200/90 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#4B4DED]" />
              <span className="text-xs font-bold text-[#0F1B4D]">Skills</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
              {skills.length}
            </span>
          </div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.slice(0, 4).map((sk, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium truncate max-w-[120px]"
                >
                  {sk.name}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-2">No skills detected</p>
          )}
        </div>
      </div>

      {/* Mode explanation */}
      <div className="mb-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-center gap-2.5">
        <FileCheck className="w-4 h-4 text-[#4B4DED] shrink-0" />
        <span>
          {mode === 'replace'
            ? `Your builder will open with the ${matchedTemplateObj.name} template and all extracted details.`
            : `Extracted sections will be merged into your draft and set to ${matchedTemplateObj.name}.`}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Upload different file</span>
        </button>

        <button
          type="button"
          onClick={() => onConfirm(mode, selectedTemplate)}
          className="w-full sm:w-auto min-h-[46px] px-8 py-3 rounded-xl bg-[#4B4DED] hover:bg-[#3D3FC9] text-white text-sm sm:text-base font-semibold shadow-[0_4px_14px_rgba(75,77,237,0.25)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
        >
          <span>Continue to CV Builder</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
