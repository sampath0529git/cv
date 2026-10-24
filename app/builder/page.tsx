'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCvStore } from '@/store/useCvStore';
import Logo from '@/components/brand/Logo';
import CvPreview from '@/components/builder/CvPreview';
import { CV_TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates/registry';
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Check, 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Sliders,
  LayoutGrid,
  FileText
} from 'lucide-react';
import { downloadCvPdf } from '@/lib/pdfGenerator';

const STEPS = [
  { id: 1, label: 'Personal details' },
  { id: 2, label: 'Work experience' },
  { id: 3, label: 'Education' },
  { id: 4, label: 'Skills' },
  { id: 5, label: 'Summary' },
  { id: 6, label: 'Languages' },
  { id: 7, label: 'Interests' },
  { id: 8, label: 'Finalize' },
];

export default function BuilderPage() {
  const router = useRouter();
  const store = useCvStore();
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(46);

  const contact = store.contact;
  const activeTemplate = CV_TEMPLATES.find((t) => t.id === store.activeTemplate) || CV_TEMPLATES[0];

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      downloadCvPdf({ fileName: `${(contact.firstName || 'My').toLowerCase()}_cv.pdf` });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/start');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900 font-sans">
      {/* Top Header Bar matching screenshot 2 */}
      <header className="w-full bg-white border-b border-slate-200 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40">
        {/* Left: Logo */}
        <Logo variant="dark" href="/" />

        {/* Center: Content | Design Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Content
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'design'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Design
          </button>
        </div>

        {/* Right: Progress bar + Download button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-3 bg-slate-100 px-3.5 py-1.5 rounded-full">
            <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#FF5722] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700">{progressPercent}%</span>
          </div>

          <button
            type="button"
            onClick={() => downloadCvPdf({ fileName: `${(contact.firstName || 'My').toLowerCase()}_cv.pdf` })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Content Form or Design Studio (~55%) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
          {activeTab === 'content' ? (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722]">
                  Step {currentStep} of {STEPS.length}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                  {STEPS[currentStep - 1].label}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {currentStep === 1 && "How employers can reach you. The job you want tailors the rest of the CV."}
                  {currentStep === 2 && "Add your recent work experience, key achievements, and responsibilities."}
                  {currentStep === 3 && "List your university degrees, diplomas, or professional training."}
                  {currentStep === 4 && "Highlight your hard skills, tools, and professional competencies."}
                  {currentStep === 5 && "Write a short, punchy summary of your professional background."}
                  {currentStep === 6 && "List languages you speak and proficiency levels."}
                  {currentStep === 7 && "Add your hobbies, interests, and extracurricular activities."}
                  {currentStep === 8 && "Review your CV and download your ATS-compliant PDF."}
                </p>
              </div>

              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#FF5722] transition-colors flex items-center gap-4 cursor-pointer bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Add a photo</h3>
                      <p className="text-xs text-slate-500">Optional — drag a file here or browse</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Desired job title</label>
                    <input
                      type="text"
                      value={contact.jobTitle}
                      onChange={(e) => store.updateContact({ jobTitle: e.target.value })}
                      placeholder="e.g. Senior Financial Analyst"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First name</label>
                      <input
                        type="text"
                        value={contact.firstName}
                        onChange={(e) => store.updateContact({ firstName: e.target.value })}
                        placeholder="e.g. Sampath"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last name</label>
                      <input
                        type="text"
                        value={contact.lastName}
                        onChange={(e) => store.updateContact({ lastName: e.target.value })}
                        placeholder="e.g. Sandaruwan"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => store.updateContact({ email: e.target.value })}
                        placeholder="e.g. sampath@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone number</label>
                      <input
                        type="text"
                        value={contact.phone}
                        onChange={(e) => store.updateContact({ phone: e.target.value })}
                        placeholder="e.g. +44 20 7946 0918"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        value={contact.city}
                        onChange={(e) => store.updateContact({ city: e.target.value })}
                        placeholder="e.g. London"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={contact.postalCode}
                        onChange={(e) => store.updateContact({ postalCode: e.target.value })}
                        placeholder="e.g. SW1A 1AA"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Work Experience */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  {store.experiences.map((exp) => (
                    <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">
                          {exp.jobTitle || 'New Position'} at {exp.employer || 'Company'}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => store.updateExperience(exp.id, { jobTitle: e.target.value })}
                          placeholder="Job Title"
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={exp.employer}
                          onChange={(e) => store.updateExperience(exp.id, { employer: e.target.value })}
                          placeholder="Employer"
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => store.updateExperience(exp.id, { description: e.target.value })}
                        placeholder="Description & achievements..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => store.addExperience({ jobTitle: '', employer: '', description: '' })}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-[#FF5722]/40 text-[#FF5722] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#FF5722]/5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add work experience</span>
                  </button>
                </div>
              )}

              {/* Step 3: Education */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  {store.educations.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">
                          {edu.degree || 'Degree'} at {edu.school || 'School'}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => store.updateEducation(edu.id, { degree: e.target.value })}
                          placeholder="Degree / Qualification"
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => store.updateEducation(edu.id, { school: e.target.value })}
                          placeholder="School / University"
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => store.addEducation({ degree: '', school: '' })}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-[#FF5722]/40 text-[#FF5722] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#FF5722]/5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add education</span>
                  </button>
                </div>
              )}

              {/* Step 4: Skills */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill (e.g. Financial Modeling, React, Python)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          store.addSkill((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {store.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-[#FF5722] border border-orange-200 text-xs font-semibold"
                      >
                        <span>{skill.name}</span>
                        <button
                          type="button"
                          onClick={() => store.removeSkill(skill.id)}
                          className="hover:text-red-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <textarea
                    value={store.summary}
                    onChange={(e) => store.setSummary(e.target.value)}
                    placeholder="Write a professional profile summary highlighting your core strengths and career goals..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>
              )}

              {/* Step 6: Languages */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Add language (e.g. English (Native), French (Fluent))"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        store.addLanguageItem((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    {store.languagesList.map((lang, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1">
                        <span>{lang}</span>
                        <button onClick={() => store.removeLanguageItem(idx)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Interests */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Add interest (e.g. Marathon running, Chess, Photography)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        store.addInterestItem((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    {store.interestsList.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1">
                        <span>{interest}</span>
                        <button onClick={() => store.removeInterestItem(idx)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Finalize & Section Reordering */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="text-center py-2">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Your CV is ready!</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Drag and drop sections below to reorder them (e.g. move Education above Work Experience).
                    </p>
                  </div>

                  {/* Drag and Drop Section Reordering List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">CV Sections Order</h4>
                    {(store.sectionOrder || ['education', 'experience', 'skills', 'languages', 'interests']).map((secKey, idx) => {
                      const labels: Record<string, string> = {
                        summary: 'Professional Summary',
                        education: 'Education and Qualifications',
                        experience: 'Work Experience',
                        skills: 'Key Skills',
                        languages: 'Languages',
                        interests: 'Interests',
                      };
                      return (
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
                            const order = [...(store.sectionOrder || ['education', 'experience', 'skills', 'languages', 'interests'])];
                            const [moved] = order.splice(fromIdx, 1);
                            order.splice(idx, 0, moved);
                            store.setSectionOrder(order);
                          }}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs cursor-grab active:cursor-grabbing hover:border-[#FF5722] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono text-xs font-bold">{idx + 1}</span>
                            <span className="text-sm font-bold text-slate-800">{labels[secKey] || secKey}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (idx === 0) return;
                                const order = [...(store.sectionOrder || ['education', 'experience', 'skills', 'languages', 'interests'])];
                                const [moved] = order.splice(idx, 1);
                                order.splice(idx - 1, 0, moved);
                                store.setSectionOrder(order);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const order = [...(store.sectionOrder || ['education', 'experience', 'skills', 'languages', 'interests'])];
                                if (idx === order.length - 1) return;
                                const [moved] = order.splice(idx, 1);
                                order.splice(idx + 1, 0, moved);
                                store.setSectionOrder(order);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                              title="Move Down"
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 rounded-xl bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{currentStep === STEPS.length ? 'Download PDF' : `Next: ${STEPS[currentStep].label}`}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Design Tab: Template Picker & Global Typography Control Panel */
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Design Studio</h2>
                <p className="text-sm text-slate-500 mt-1">Pick a template, adjust typography family, and customize language settings.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CV Language</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-medium">
                    <option>🇬🇧 United Kingdom (EN)</option>
                    <option>🇺🇸 United States (US)</option>
                    <option>🇫🇷 Français (FR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Active Font Family</label>
                  <select
                    value={store.fontFamily || 'inter'}
                    onChange={(e) => store.setFontFamily(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-medium"
                  >
                    <option value="inter">Inter (Modern Sans)</option>
                    <option value="merriweather">Merriweather (Classic Serif)</option>
                    <option value="roboto">Roboto (Clean Sans)</option>
                    <option value="lora">Lora (Editorial Serif)</option>
                    <option value="jakarta">Plus Jakarta Sans (Geometric)</option>
                    <option value="mono">JetBrains Mono (Technical)</option>
                  </select>
                </div>
              </div>

              {/* Theme Colors Palette Section */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2.5">Theme Colors & Palettes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Navy & Gold', color: '#1E3A8A' },
                    { name: 'Slate & Blue', color: '#0F172A' },
                    { name: 'Emerald & Stone', color: '#065F46' },
                    { name: 'Burgundy', color: '#7F1D1D' },
                    { name: 'Royal Purple', color: '#581C87' },
                    { name: 'Classic Black', color: '#000000' },
                  ].map((palette) => {
                    const isSelected = store.themeColor === palette.color;
                    return (
                      <div
                        key={palette.color}
                        onClick={() => store.setThemeColor(palette.color)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 bg-orange-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full shrink-0 shadow-xs border border-white/20"
                          style={{ backgroundColor: palette.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{palette.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{palette.color}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Typography Family Selection Cards */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2.5">Global Typography Control Panel</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'inter', name: 'Inter', sample: 'Aa', category: 'Modern Sans' },
                    { id: 'merriweather', name: 'Merriweather', sample: 'Aa', category: 'Classic Serif' },
                    { id: 'roboto', name: 'Roboto', sample: 'Aa', category: 'Clean Sans' },
                    { id: 'lora', name: 'Lora', sample: 'Aa', category: 'Editorial Serif' },
                    { id: 'jakarta', name: 'Plus Jakarta', sample: 'Aa', category: 'Geometric' },
                    { id: 'mono', name: 'JetBrains Mono', sample: '10', category: 'Technical' },
                  ].map((font) => {
                    const isSelected = (store.fontFamily || 'inter') === font.id;
                    return (
                      <div
                        key={font.id}
                        onClick={() => store.setFontFamily(font.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 bg-orange-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-bold text-slate-900">{font.sample}</span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#FF5722] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 truncate">{font.name}</h4>
                          <span className="text-[10px] text-slate-500 font-medium">{font.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3">Template</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CV_TEMPLATES.map((tmpl) => {
                    const isSelected = store.activeTemplate === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => store.setTemplate(tmpl.id as any)}
                        className={`group relative rounded-2xl p-3 bg-white border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="aspect-[1/1.414] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden mb-2">
                          <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-600">
                            {tmpl.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{tmpl.name}</span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#FF5722] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Live A4 CV Preview with dynamic 30%-100% state-based zoom */}
        <div className="lg:col-span-6 flex flex-col items-center sticky top-24">
          <div className="w-full max-w-[640px] h-[680px] bg-slate-50/60 rounded-3xl border border-slate-200/80 shadow-lg overflow-auto relative flex justify-center items-start p-4 custom-scrollbar">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="w-[794px] h-[1123px] min-w-[794px] min-h-[1123px] bg-white shrink-0 shadow-md rounded-sm"
            >
              <CvPreview scale={zoomLevel / 100} />
            </div>
          </div>

          {/* Floating Zoom & Page Controls Bar */}
          <div className="mt-4 bg-[#111827] text-white rounded-2xl px-5 py-2.5 flex items-center gap-4 shadow-xl">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="text-white/70 hover:text-white cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-medium">1 / 1</span>
            <button
              type="button"
              onClick={() => setCurrentStep(Math.min(STEPS.length, currentStep + 1))}
              className="text-white/70 hover:text-white cursor-pointer"
              title="Next Step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="w-px h-4 bg-white/20" />
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(30, z - 10))}
              disabled={zoomLevel <= 30}
              className="text-white/70 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center"
              title="Zoom Out (Min 30%)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold min-w-[36px] text-center">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(100, z + 10))}
              disabled={zoomLevel >= 100}
              className="text-white/70 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-xs flex items-center"
              title="Zoom In (Max 100%)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/20" />
            <button
              type="button"
              onClick={() => setZoomLevel((z) => (z === 100 ? 50 : 100))}
              className="text-white/70 hover:text-white cursor-pointer"
              title={zoomLevel === 100 ? "Fit Preview" : "100% Zoom"}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
