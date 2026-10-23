'use client';

import React, { useState } from 'react';
import { useCvStore, SkillItem } from '@/store/useCvStore';
import { Plus, X, Zap, Check, Sparkles } from 'lucide-react';
import CvPreview from '@/components/builder/CvPreview';

const SUGGESTIONS = [
  'Team Leadership',
  'Strategic Negotiation',
  'Project Management',
  'Client Relations',
  'Salesforce CRM',
  'Data Analysis',
  'Business Development',
  'Communication',
];

interface SkillsStepProps {
  mode?: 'intro' | 'form';
}

export default function SkillsStep({ mode = 'form' }: SkillsStepProps) {
  const skills = useCvStore((state) => state.skills);
  const addSkill = useCvStore((state) => state.addSkill);
  const removeSkill = useCvStore((state) => state.removeSkill);

  const [inputVal, setInputVal] = useState('');
  const [levelVal, setLevelVal] = useState<SkillItem['level']>('Advanced');

  if (mode === 'intro') {
    return (
      <div className="space-y-6 sm:space-y-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00d084] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
            Great job with your education!
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1B4D] tracking-tight leading-[1.15]">
          Now, let&apos;s add your key skills
        </h1>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF3FF] border border-[#E0E7FF] flex items-center gap-3.5 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#4B4DED] shrink-0" />
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            Our AI assistant will recommend top professional skills for your role.
          </p>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    addSkill(inputVal.trim(), levelVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Highlight your key skills
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          Add specific hard and soft skills that match your target role to pass ATS screening.
        </p>
      </div>

      {/* Input area */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <label className="block text-xs font-semibold text-slate-700">
          Add a new skill
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Account Management, Financial Modelling"
            className="flex-1 h-[52px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED] focus:ring-2 focus:ring-[#4B4DED]/10 transition-all"
          />

          <select
            value={levelVal}
            onChange={(e) => setLevelVal(e.target.value as SkillItem['level'])}
            className="h-[52px] px-3 rounded-xl border border-[#E3E6F0] bg-white text-sm text-slate-700 focus:outline-none focus:border-[#4B4DED] cursor-pointer"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button
            type="button"
            onClick={handleAdd}
            className="h-[52px] px-6 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>

        {/* Popular suggestions */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick add recruiter recommendations:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => addSkill(sug, 'Advanced')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#EEF0FF] text-slate-700 hover:text-[#4B4DED] text-xs font-medium transition-colors cursor-pointer border border-slate-200/60"
              >
                <Plus className="w-3 h-3" />
                <span>{sug}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Skills Chips */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          Your CV Skills ({skills.length})
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-xl bg-white border border-[#E3E6F0] shadow-2xs group hover:border-[#4B4DED] transition-all"
            >
              <span className="text-sm font-semibold text-[#0F1B4D]">{skill.name}</span>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                {skill.level}
              </span>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                title="Remove skill"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
