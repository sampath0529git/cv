'use client';

import React, { useState } from 'react';
import { useCvStore, SkillItem } from '@/store/useCvStore';
import {
  Sparkles,
  X,
  Wand2,
  Check,
  Copy,
  Plus,
  RefreshCw,
  Briefcase,
  FileText,
  Lightbulb,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type AiTab = 'bullets' | 'summary' | 'skills';

export default function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const store = useCvStore();
  const [activeTab, setActiveTab] = useState<AiTab>('bullets');

  // Bullet Architect state
  const [selectedExpId, setSelectedExpId] = useState<string>(
    store.experiences[0]?.id || ''
  );
  const [customJobTitle, setCustomJobTitle] = useState<string>(
    store.contact.jobTitle || ''
  );
  const [customEmployer, setCustomEmployer] = useState<string>('');
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [isGeneratingBullet, setIsGeneratingBullet] = useState(false);
  const [generatedBullet, setGeneratedBullet] = useState<string | null>(null);
  const [bulletError, setBulletError] = useState<string | null>(null);
  const [bulletCopied, setBulletCopied] = useState(false);
  const [bulletInserted, setBulletInserted] = useState(false);

  // Summary Tailor state
  const [summaryTargetRole, setSummaryTargetRole] = useState<string>(
    store.contact.jobTitle || ''
  );
  const [summaryTone, setSummaryTone] = useState<'executive' | 'commercial' | 'technical' | 'concise'>(
    'executive'
  );
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [summaryApplied, setSummaryApplied] = useState(false);

  // Skills & ATS state
  const [isScanningSkills, setIsScanningSkills] = useState(false);
  const [recommendedSkills, setRecommendedSkills] = useState<
    Array<{ name: string; category: string; reason?: string }>
  >([]);
  const [actionVerbs, setActionVerbs] = useState<string[]>([]);
  const [atsTips, setAtsTips] = useState<string[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [addedSkillNames, setAddedSkillNames] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  // Selected experience helper
  const selectedExp = store.experiences.find((e) => e.id === selectedExpId);

  // Handle Generate Bullet
  const handleGenerateBullet = async () => {
    setBulletError(null);
    setBulletCopied(false);
    setBulletInserted(false);

    const titleToUse = selectedExp?.jobTitle || customJobTitle || store.contact.jobTitle;
    if (!titleToUse.trim()) {
      setBulletError('Please enter or select a job title first.');
      return;
    }

    setIsGeneratingBullet(true);
    try {
      const skillsArray = store.skills.map((s) => s.name);
      const res = await fetch('/api/cv/generate-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: titleToUse,
          employer: selectedExp?.employer || customEmployer,
          currentDescription: currentDescription || selectedExp?.description,
          skills: skillsArray,
          language: store.language,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.bullet) {
        throw new Error(data.error || 'Failed to generate bullet point.');
      }
      setGeneratedBullet(data.bullet);
    } catch (err: unknown) {
      setBulletError(err instanceof Error ? err.message : 'Error generating bullet.');
    } finally {
      setIsGeneratingBullet(false);
    }
  };

  // Insert bullet into experience
  const handleInsertBullet = () => {
    if (!generatedBullet) return;
    const cleanText = generatedBullet.replace(/^[•\-*]\s*/, '').trim();

    if (selectedExp) {
      const existingBullets = selectedExp.bullets || [];
      const updatedBullets = [...existingBullets, cleanText];
      store.updateExperience(selectedExp.id, {
        bullets: updatedBullets,
        description: updatedBullets.join('\n'),
      });
      setBulletInserted(true);
    } else if (store.experiences.length > 0) {
      const firstExp = store.experiences[0];
      const existingBullets = firstExp.bullets || [];
      const updatedBullets = [...existingBullets, cleanText];
      store.updateExperience(firstExp.id, {
        bullets: updatedBullets,
        description: updatedBullets.join('\n'),
      });
      setBulletInserted(true);
    }
  };

  // Handle Rewrite / Tailor Summary
  const handleGenerateSummary = async () => {
    setSummaryError(null);
    setSummaryApplied(false);

    const roleToUse = summaryTargetRole || store.contact.jobTitle || 'Executive Professional';
    setIsGeneratingSummary(true);

    try {
      const topSkills = store.skills.slice(0, 6).map((s) => s.name);
      const res = await fetch('/api/cv/rewrite-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSummary: store.summary,
          jobTitle: roleToUse,
          experiences: store.experiences.slice(0, 3).map((e) => ({
            jobTitle: e.jobTitle,
            employer: e.employer,
            description: e.description,
          })),
          skills: topSkills,
          style: summaryTone,
          language: store.language,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.summary) {
        throw new Error(data.error || 'Failed to generate summary.');
      }
      setGeneratedSummary(data.summary);
    } catch (err: unknown) {
      setSummaryError(err instanceof Error ? err.message : 'Error tailoring summary.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleApplySummary = () => {
    if (!generatedSummary) return;
    store.setSummary(generatedSummary);
    setSummaryApplied(true);
  };

  // Handle Scan for Skills & ATS Keywords
  const handleScanSkills = async () => {
    setSkillsError(null);
    setIsScanningSkills(true);

    try {
      const currentSkillNames = store.skills.map((s) => s.name);
      const res = await fetch('/api/cv/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: store.contact.jobTitle,
          currentSkills: currentSkillNames,
          experiences: store.experiences.slice(0, 4).map((e) => ({
            jobTitle: e.jobTitle,
            employer: e.employer,
            description: e.description,
          })),
          language: store.language,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.recommendedSkills) {
        throw new Error(data.error || 'Failed to scan skills.');
      }

      setRecommendedSkills(data.recommendedSkills);
      setActionVerbs(data.actionVerbs || []);
      setAtsTips(data.atsKeywordTips || []);
    } catch (err: unknown) {
      setSkillsError(err instanceof Error ? err.message : 'Error scanning skills.');
    } finally {
      setIsScanningSkills(false);
    }
  };

  const handleAddSkillToCv = (skillName: string) => {
    store.addSkill(skillName, 'Advanced');
    setAddedSkillNames((prev) => new Set(prev).add(skillName));
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-blue-50/40 to-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Makemycv AI Assistant</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                PRO
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              ATS-calibrated phrasing, metrics & skill keyword suggestions
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close AI Assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="p-2 border-b border-slate-200 bg-slate-50/80 flex items-center gap-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('bullets')}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'bullets'
              ? 'bg-white text-indigo-600 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Bullet Architect</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-white text-indigo-600 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Summary Tailor</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('skills');
            if (recommendedSkills.length === 0) {
              handleScanSkills();
            }
          }}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'skills'
              ? 'bg-white text-indigo-600 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>ATS Keywords</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs text-slate-700">
        {/* ================= TAB 1: BULLET ARCHITECT ================= */}
        {activeTab === 'bullets' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                Target Role / Experience
              </label>
              {store.experiences.length > 0 ? (
                <select
                  value={selectedExpId}
                  onChange={(e) => setSelectedExpId(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500"
                >
                  {store.experiences.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.jobTitle || 'Role'} at {exp.employer || 'Company'}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={customJobTitle}
                  onChange={(e) => setCustomJobTitle(e.target.value)}
                  placeholder="e.g. Senior Commercial Director"
                  className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                Context / Existing Task (Optional)
              </label>
              <textarea
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                placeholder="e.g. Managed sales team, improved quarterly targets and launched new product"
                rows={3}
                className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                AI will inject strong action verbs and quantified impact metrics (%, £, scale).
              </p>
            </div>

            {bulletError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {bulletError}
              </div>
            )}

            <button
              type="button"
              onClick={handleGenerateBullet}
              disabled={isGeneratingBullet}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {isGeneratingBullet ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Executive Bullet...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate Achievement Bullet</span>
                </>
              )}
            </button>

            {/* Generated Bullet Result */}
            {generatedBullet && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-blue-50/50 border border-indigo-200 shadow-2xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Suggested High-Impact Bullet
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-mono font-bold">
                    ATS Calibrated
                  </span>
                </div>

                <div className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-indigo-100 font-medium leading-relaxed">
                  {generatedBullet}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleInsertBullet}
                    disabled={bulletInserted}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      bulletInserted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {bulletInserted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Inserted into Role!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Insert into CV</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBullet.replace(/^[•\-*]\s*/, ''));
                      setBulletCopied(true);
                      setTimeout(() => setBulletCopied(false), 2000);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {bulletCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{bulletCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SUMMARY TAILOR ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                Target Role / Direction
              </label>
              <input
                type="text"
                value={summaryTargetRole}
                onChange={(e) => setSummaryTargetRole(e.target.value)}
                placeholder="e.g. Managing Director or Senior Software Engineer"
                className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
                Tone & Executive Posture
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(
                  [
                    { id: 'executive', label: 'Executive Boardroom' },
                    { id: 'commercial', label: 'P&L & Growth Focus' },
                    { id: 'technical', label: 'Technical Depth' },
                    { id: 'concise', label: 'Crisp & Punchy' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSummaryTone(t.id)}
                    className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                      summaryTone === t.id
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {summaryError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {summaryError}
              </div>
            )}

            <button
              type="button"
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {isGeneratingSummary ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Profile...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Tailor Executive Summary</span>
                </>
              )}
            </button>

            {generatedSummary && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-blue-50/50 border border-indigo-200 shadow-2xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Tailored Executive Summary
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-mono font-bold">
                    3-4 Sentences
                  </span>
                </div>

                <div className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-indigo-100 font-normal leading-relaxed">
                  {generatedSummary}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleApplySummary}
                    disabled={summaryApplied}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      summaryApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {summaryApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied to CV Summary!</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Apply to CV Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedSummary);
                    }}
                    className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ATS SKILLS & KEYWORDS ================= */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Recommended ATS Keywords</h4>
                <p className="text-[11px] text-slate-500">Based on your career trajectory and target role</p>
              </div>
              <button
                type="button"
                onClick={handleScanSkills}
                disabled={isScanningSkills}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isScanningSkills ? 'animate-spin' : ''}`} />
                <span>Rescan</span>
              </button>
            </div>

            {skillsError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {skillsError}
              </div>
            )}

            {isScanningSkills ? (
              <div className="py-10 text-center space-y-2">
                <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-700">Scanning UK & Global ATS database...</p>
                <p className="text-[10px] text-slate-400">Identifying missing in-demand keywords</p>
              </div>
            ) : recommendedSkills.length > 0 ? (
              <div className="space-y-4">
                {/* Categorized Skills */}
                <div className="space-y-2">
                  {recommendedSkills.map((sk, idx) => {
                    const alreadyOnCv = store.skills.some(
                      (s) => s.name.toLowerCase() === sk.name.toLowerCase()
                    );
                    const isAdded = alreadyOnCv || addedSkillNames.has(sk.name);

                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-200 flex items-center justify-between gap-2 transition-all shadow-2xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs truncate">
                              {sk.name}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                              {sk.category}
                            </span>
                          </div>
                          {sk.reason && (
                            <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                              {sk.reason}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddSkillToCv(sk.name)}
                          disabled={isAdded}
                          className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isAdded
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>On CV</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Recruiter Action Verbs */}
                {actionVerbs.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Executive Action Verbs</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {actionVerbs.map((verb, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(verb);
                          }}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-mono hover:border-indigo-400 cursor-pointer"
                          title="Click to copy verb"
                        >
                          {verb}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recruiter ATS Tips */}
                {atsTips.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Recruiter ATS Best Practice</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-emerald-800">
                      {atsTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center">
                <button
                  type="button"
                  onClick={handleScanSkills}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  Scan for ATS Keywords
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
