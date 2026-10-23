'use client';

import React, { useState } from 'react';
import { useCvStore, SkillItem } from '@/store/useCvStore';
import { Plus, X, Zap, Check, Sparkles, Globe, Trophy, Heart, Flag } from 'lucide-react';

const SUGGESTIONS = [
  'Financial Analysis',
  'Deal Financing',
  'Contract Negotiation',
  'Digital Media Strategy',
  'Project Management',
  'Client Relations',
  'Data Analysis',
  'Team Leadership',
];

interface SkillsStepProps {
  mode?: 'intro' | 'form';
}

export default function SkillsStep({ mode = 'form' }: SkillsStepProps) {
  const skills = useCvStore((state) => state.skills);
  const addSkill = useCvStore((state) => state.addSkill);
  const removeSkill = useCvStore((state) => state.removeSkill);

  const contact = useCvStore((state) => state.contact);
  const updateContact = useCvStore((state) => state.updateContact);

  const interestsList = useCvStore((state) => state.interestsList);
  const addInterestItem = useCvStore((state) => state.addInterestItem);
  const removeInterestItem = useCvStore((state) => state.removeInterestItem);

  const awardsList = useCvStore((state) => state.awardsList);
  const addAward = useCvStore((state) => state.addAward);
  const removeAward = useCvStore((state) => state.removeAward);

  const languagesList = useCvStore((state) => state.languagesList);
  const addLanguageItem = useCvStore((state) => state.addLanguageItem);
  const removeLanguageItem = useCvStore((state) => state.removeLanguageItem);

  const [inputVal, setInputVal] = useState('');
  const [levelVal, setLevelVal] = useState<SkillItem['level']>('Advanced');
  const [newInterest, setNewInterest] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  if (mode === 'intro') {
    return (
      <div className="space-y-6 sm:space-y-8 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00d084] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-bold text-[#0F1B4D] text-base sm:text-lg tracking-tight">
            Work experience completed!
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F1B4D] tracking-tight leading-[1.15]">
          Now, add Additional Information & Skills
        </h1>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF3FF] border border-[#E0E7FF] flex items-center gap-3.5 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#4B4DED] shrink-0" />
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            Include Interests, Achievements, Nationality, Languages, and Key Competencies as required by the UK traditional standard.
          </p>
        </div>
      </div>
    );
  }

  const handleAddSkill = () => {
    if (!inputVal.trim()) return;
    addSkill(inputVal.trim(), levelVal);
    setInputVal('');
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    addInterestItem(newInterest.trim());
    setNewInterest('');
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    addAward(newAchievement.trim());
    setNewAchievement('');
  };

  const handleAddLanguage = () => {
    if (!newLanguage.trim()) return;
    addLanguageItem(newLanguage.trim());
    setNewLanguage('');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F1B4D] tracking-tight leading-tight">
          Additional Information & Skills
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
          Provide structured details for Interests, Achievements, Nationality, and Languages per the UK traditional template.
        </p>
      </div>

      {/* 1. Interests Section */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#4B4DED]" />
          <h2 className="text-sm font-bold text-slate-900">Interests & Activities</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Concentrate on activities you participate in and are willing to talk about. Highlight achievements (e.g. &apos;running – participated in several marathons, President of the Oxford Runners Club&apos;).
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddInterest();
              }
            }}
            placeholder="e.g. Marathon running – completed 3 marathons; President of Oxford Runners Club"
            className="flex-1 h-[48px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="px-5 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
        {interestsList.length > 0 && (
          <div className="space-y-2 pt-1">
            {interestsList.map((interest, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              >
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => removeInterestItem(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Achievements Section */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold text-slate-900">Academic & Other Achievements</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          List honours, scholarships, and significant distinctions (e.g. First Class Honours, Study abroad scholarship selected 3 out of 600 students, Principal Cellist of London Youth Orchestra).
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddAchievement();
              }
            }}
            placeholder="e.g. Study abroad scholarship (selected 3 out of 600 students)"
            className="flex-1 h-[48px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-5 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
        {awardsList.length > 0 && (
          <div className="space-y-2 pt-1">
            {awardsList.map((award, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              >
                <span>{award}</span>
                <button
                  type="button"
                  onClick={() => removeAward(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Nationality & Work Authorisation */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900">Nationality & Work Authorisation</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Specify your nationality, dual nationality, and any additional UK work authorisation if applicable.
        </p>
        <input
          type="text"
          value={contact.nationality || ''}
          onChange={(e) => updateContact({ nationality: e.target.value })}
          placeholder="e.g. British Citizen (Dual nationality: British/Irish, Full UK Work Authorisation)"
          className="w-full h-[48px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
        />
      </div>

      {/* 4. Languages */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Languages & Ability Level</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Languages other than English and ability level (e.g. &apos;German (fluent)&apos;, &apos;French (intermediate)&apos;).
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddLanguage();
              }
            }}
            placeholder="e.g. German (fluent)"
            className="flex-1 h-[48px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
          />
          <button
            type="button"
            onClick={handleAddLanguage}
            className="px-5 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
        {languagesList.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {languagesList.map((lang, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium"
              >
                <span>{lang}</span>
                <button
                  type="button"
                  onClick={() => removeLanguageItem(idx)}
                  className="text-blue-500 hover:text-rose-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 5. Key Skills */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[#E3E6F0] bg-white shadow-2xs space-y-4">
        <label className="block text-xs font-semibold text-slate-700">
          Key Professional Skills & Competencies
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="e.g. Financial Modelling, Corporate Strategy"
            className="flex-1 h-[48px] px-3.5 rounded-xl border border-[#E3E6F0] text-sm text-slate-900 focus:outline-none focus:border-[#4B4DED]"
          />

          <select
            value={levelVal}
            onChange={(e) => setLevelVal(e.target.value as SkillItem['level'])}
            className="h-[48px] px-3 rounded-xl border border-[#E3E6F0] bg-white text-sm text-slate-700 focus:outline-none focus:border-[#4B4DED] cursor-pointer"
          >
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>

          <button
            type="button"
            onClick={handleAddSkill}
            className="h-[48px] px-6 bg-[#4B4DED] hover:bg-[#3D3FC9] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>

        {/* Quick add recommendations */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended for academic & corporate roles:</span>
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

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
              >
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
