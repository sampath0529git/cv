/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useCvStore, TemplateId } from '@/store/useCvStore';
import { Phone, Mail, MapPin, Globe, Linkedin, Calendar, Award } from 'lucide-react';

interface CvPreviewProps {
  className?: string;
  isPrintMode?: boolean;
}

export const COLOR_PALETTES: Record<string, { bgLight: string; textAccent: string; dot: string }> = {
  '#C4A482': { bgLight: '#EDE8DF', textAccent: '#A37E58', dot: '#B99672' }, // Khaki / Warm Beige
  '#4EBA88': { bgLight: '#E6F6EF', textAccent: '#2F855A', dot: '#4EBA88' }, // Mint / Emerald
  '#9896F5': { bgLight: '#EEEEFC', textAccent: '#6865E8', dot: '#9896F5' }, // Lavender / Purple
  '#BA4D4D': { bgLight: '#FCECEC', textAccent: '#9B2C2C', dot: '#BA4D4D' }, // Brick Red
  '#F472B6': { bgLight: '#FDF2F8', textAccent: '#DB2777', dot: '#F472B6' }, // Pink
  '#F87171': { bgLight: '#FEF2F2', textAccent: '#DC2626', dot: '#F87171' }, // Coral
  '#4A9FF5': { bgLight: '#EFF6FF', textAccent: '#2563EB', dot: '#4A9FF5' }, // Blue
  '#F97316': { bgLight: '#FFF7ED', textAccent: '#C2410C', dot: '#F97316' }, // Orange
};

export default function CvPreview({ className = '', isPrintMode = false }: CvPreviewProps) {
  const {
    contact,
    experiences,
    educations,
    skills,
    summary,
    languagesList,
    interestsList,
    activeTemplate,
    themeColor,
  } = useCvStore();

  const palette = COLOR_PALETTES[themeColor || '#C4A482'] || {
    bgLight: `${themeColor || '#C4A482'}22`,
    textAccent: themeColor || '#C4A482',
    dot: themeColor || '#C4A482',
  };

  // Fallbacks matching Screenshot 4
  const displayName =
    contact.firstName || contact.lastName
      ? `${contact.firstName} ${contact.lastName}`.trim()
      : 'Sampath Sandaruwan';

  const displayJobTitle = contact.jobTitle || 'Job title';

  const displaySummary =
    summary ||
    'Short description of your background and professional project. Example: After an initial 3 years of experience in sales in the luxury and ready to wear sector, seeking new growth challenges.';

  const displayPhone = contact.phone || '(020) 1234 5678';
  const displayEmail = contact.email || 'sampathwork888@gmail.com';
  const displayLocation =
    contact.city || contact.postalCode
      ? `${contact.postalCode} ${contact.city}`.trim()
      : 'SW1A 1AA London';

  return (
    <div
      id="cv-print-area"
      className={`cv-preview-sheet relative bg-white text-slate-800 transition-all duration-200 select-text ${
        isPrintMode
          ? 'w-[210mm] min-h-[297mm] p-0 shadow-none m-0 overflow-visible'
          : `aspect-[210/297] rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden ${
              className || 'w-full max-w-[500px] max-h-[calc(100vh-235px)]'
            }`
      }`}
    >
      {/* RENDER TEMPLATE ACCORDING TO activeTemplate */}
      {(activeTemplate === 'castor' || activeTemplate === 'modern-beige' || !activeTemplate) && (
        <ModernBeigeTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
          palette={palette}
        />
      )}

      {(activeTemplate === 'capella' || activeTemplate === 'minimal-clean') && (
        <MinimalCleanTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
          palette={palette}
        />
      )}

      {activeTemplate === 'pollux' && (
        <PolluxTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
          palette={palette}
        />
      )}

      {activeTemplate === 'regulus' && (
        <RegulusTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
          palette={palette}
        />
      )}

      {activeTemplate === 'executive-navy' && (
        <ExecutiveNavyTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
        />
      )}

      {activeTemplate === 'tech-slate' && (
        <TechSlateTemplate
          contact={contact}
          experiences={experiences}
          educations={educations}
          skills={skills}
          summary={displaySummary}
          displayName={displayName}
          displayJobTitle={displayJobTitle}
          displayPhone={displayPhone}
          displayEmail={displayEmail}
          displayLocation={displayLocation}
          languagesList={languagesList}
          interestsList={interestsList}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 1: Castor / Modern Beige (Screenshot 4 & image_3e730f4b.png Match)
// -------------------------------------------------------------
function ModernBeigeTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
  languagesList,
  interestsList,
  palette,
}: any) {
  const bgLight = palette?.bgLight || '#EDE8DF';
  const textAccent = palette?.textAccent || '#A37E58';
  const dotColor = palette?.dot || '#B99672';

  // Check if skills are custom (not default empty/initial)
  const hasCustomSkills =
    skills &&
    skills.length > 0 &&
    skills.some(
      (s: any) =>
        s.name &&
        s.name !== 'Skill 1' &&
        s.name !== 'Skill 2' &&
        s.name !== 'Skill 3'
    );

  const hasCustomLanguages =
    languagesList &&
    languagesList.length > 0 &&
    languagesList.some((l: string) => !l.startsWith('Language ('));

  const hasCustomInterests =
    interestsList &&
    interestsList.length > 0 &&
    interestsList.some((i: string) => i !== 'Area of interest');

  return (
    <div className="w-full min-h-full flex flex-row text-[9.5px] leading-tight pb-8">
      {/* Left Column with dynamic swatch background (Beige matching image_28c4ca3f.png) */}
      <div
        className="w-[30%] p-4 sm:p-5 flex flex-col justify-between shrink-0 transition-colors duration-200"
        style={{ backgroundColor: bgLight }}
      >
        <div className="space-y-4">
          {/* Optional Profile Photo if uploaded */}
          {contact.photoUrl && (
            <div className="flex justify-center mb-2">
              <img
                src={contact.photoUrl}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          )}

          {/* Contact Details (Minimal & Clean matching image_28c4ca3f.png) */}
          <div className="space-y-2 text-slate-800 text-[8.5px] sm:text-[9px]">
            {displayEmail && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-2.5 h-2.5 text-slate-700 shrink-0" />
                <span className="truncate">{displayEmail}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-2.5 h-2.5 text-slate-700 shrink-0" />
                <span className="truncate">{contact.phone}</span>
              </div>
            )}
            {(contact.city || contact.postalCode) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-2.5 h-2.5 text-slate-700 shrink-0" />
                <span className="truncate">{displayLocation}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-2.5 h-2.5 text-slate-700 shrink-0" />
                <span className="truncate">{contact.linkedin}</span>
              </div>
            )}
            {contact.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-2.5 h-2.5 text-slate-700 shrink-0" />
                <span className="truncate">{contact.website}</span>
              </div>
            )}
          </div>

          {/* Skills (Only displayed if user has actively added them) */}
          {hasCustomSkills && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Skills
              </p>
              <div className="space-y-1">
                {skills.map((skill: any) => (
                  <div key={skill.id} className="flex justify-between items-center text-slate-700">
                    <span className="font-medium truncate pr-1">{skill.name}</span>
                    <span className="text-[8px] text-slate-500 shrink-0">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {hasCustomLanguages && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Languages
              </p>
              <div className="space-y-1 text-slate-700">
                {languagesList.map((lang: string, i: number) => (
                  <p key={i} className="truncate">{lang}</p>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {hasCustomInterests && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Interests
              </p>
              <div className="space-y-1 text-slate-700">
                {interestsList.map((interest: string, i: number) => (
                  <p key={i} className="truncate">{interest}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Driving licence / Nationality if present */}
        {(contact.nationality || contact.drivingLicence) && (
          <div className="pt-2 border-t border-slate-300/60 text-[8.5px] text-slate-600 space-y-0.5">
            {contact.nationality && <p>Nationality: {contact.nationality}</p>}
            {contact.drivingLicence && <p>Licence: {contact.drivingLicence}</p>}
          </div>
        )}
      </div>

      {/* Right Column (Clean White matching image_28c4ca3f.png) */}
      <div className="w-[70%] p-4 sm:p-6 flex flex-col space-y-4">
        {/* Name & Title */}
        <div>
          <h1 className="text-base sm:text-[20px] font-bold text-slate-950 tracking-tight leading-tight">
            {displayName}
          </h1>
          {contact.jobTitle && (
            <p
              className="text-[10.5px] font-medium mt-0.5"
              style={{ color: textAccent }}
            >
              {contact.jobTitle}
            </p>
          )}
          {summary && summary.trim() && (
            <p className="text-[8.5px] text-slate-600 mt-2 leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        {/* Work Experience */}
        <div>
          {/* Section Header with dot and horizontal connector line (Exact image_28c4ca3f.png match) */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center shrink-0">
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: dotColor }}
              />
              <span
                className="w-3.5 h-[2px] inline-block shrink-0"
                style={{ backgroundColor: dotColor }}
              />
            </div>
            <h2 className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-900 tracking-tight">
              Work experience
            </h2>
          </div>

          <div className="space-y-3.5">
            {experiences.map((exp: any) => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-bold text-slate-950 text-[9.5px] sm:text-[10px]">
                    {exp.jobTitle || 'Job title'}
                  </p>
                  <div className="text-[8px] sm:text-[8.5px] text-slate-500 text-right leading-tight shrink-0 font-normal">
                    <div>{exp.startDate || 'January 2023'}</div>
                    <div>{exp.isCurrent ? 'Current' : exp.endDate || 'December 2022'}</div>
                  </div>
                </div>
                <p
                  className="text-[8.5px] sm:text-[9px] font-medium"
                  style={{ color: textAccent }}
                >
                  {exp.employer || 'Company name'}{exp.city ? `, ${exp.city}` : ', City'}
                </p>
                {exp.description && (
                  <div className="text-[8px] sm:text-[8.5px] text-slate-700 mt-0.5 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="pt-1">
          {/* Section Header with dot and horizontal connector line */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center shrink-0">
              <span
                className="w-2 h-2 rounded-full inline-block shrink-0"
                style={{ backgroundColor: dotColor }}
              />
              <span
                className="w-3.5 h-[2px] inline-block shrink-0"
                style={{ backgroundColor: dotColor }}
              />
            </div>
            <h2 className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-900 tracking-tight">
              Education
            </h2>
          </div>

          <div className="space-y-3">
            {educations.map((edu: any) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="font-bold text-slate-950 text-[9.5px] sm:text-[10px]">
                    {edu.degree || 'Name of the diploma / training'}
                  </p>
                  <div className="text-[8px] sm:text-[8.5px] text-slate-500 text-right leading-tight shrink-0 font-normal">
                    {edu.startDate && <div>{edu.startDate}</div>}
                    {edu.endDate && edu.endDate !== edu.startDate && <div>{edu.endDate}</div>}
                  </div>
                </div>
                <p
                  className="text-[8.5px] sm:text-[9px] font-medium"
                  style={{ color: textAccent }}
                >
                  {edu.school || 'Name of the school / institution'}{edu.city ? `, ${edu.city}` : ', City'}
                </p>
                {edu.description && (
                  <div className="text-[8px] sm:text-[8.5px] text-slate-700 mt-0.5 leading-relaxed whitespace-pre-line">
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 2: Minimal Clean (Modern Editorial)
// -------------------------------------------------------------
function MinimalCleanTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
}: any) {
  return (
    <div className="w-full min-h-full p-6 text-[9.5px] leading-tight space-y-3.5 pb-10">
      {/* Header */}
      <div className="border-b pb-3 border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{displayName}</h1>
        <p className="text-[11px] font-medium text-[#4B4DED] mt-0.5">{displayJobTitle}</p>
        <div className="flex flex-wrap gap-3 text-[8.5px] text-slate-500 mt-2">
          <span>{displayEmail}</span>
          <span>·</span>
          <span>{displayPhone}</span>
          <span>·</span>
          <span>{displayLocation}</span>
          {contact.linkedin && (
            <>
              <span>·</span>
              <span>{contact.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div>
        <p className="text-[9px] text-slate-600 leading-relaxed">{summary}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
          Experience
        </h2>
        <div className="space-y-2.5">
          {experiences.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-slate-800 text-[9.5px]">
                <span>{exp.jobTitle || 'Job Title'}</span>
                <span className="font-normal font-mono text-[8px] text-slate-500">
                  {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                </span>
              </div>
              <p className="text-[8.5px] text-slate-600">{exp.employer}, {exp.city}</p>
              {exp.description && (
                <p className="text-[8px] text-slate-500 mt-0.5 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
          Education
        </h2>
        <div className="space-y-2">
          {educations.map((edu: any) => (
            <div key={edu.id}>
              <div className="flex justify-between font-bold text-slate-800 text-[9.5px]">
                <span>{edu.degree || 'Degree'}</span>
                <span className="font-normal font-mono text-[8px] text-slate-500">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <p className="text-[8.5px] text-slate-600">{edu.school}, {edu.city}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
          Skills
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill: any) => (
            <span key={skill.id} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[8px] font-medium">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 3: Executive Navy
// -------------------------------------------------------------
function ExecutiveNavyTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
}: any) {
  return (
    <div className="w-full min-h-full flex flex-col text-[9.5px] leading-tight pb-8">
      {/* Dark Navy Header */}
      <div className="bg-[#0F1B4D] text-white p-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">{displayName}</h1>
          <p className="text-[#A5A7F5] font-medium text-[10.5px] mt-0.5">{displayJobTitle}</p>
          <div className="flex gap-3 text-[8px] text-white/70 mt-2">
            <span>{displayEmail}</span>
            <span>·</span>
            <span>{displayPhone}</span>
            <span>·</span>
            <span>{displayLocation}</span>
          </div>
        </div>
        {contact.photoUrl && (
          <img
            src={contact.photoUrl}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-white/50 shrink-0"
          />
        )}
      </div>

      {/* Body */}
      <div className="p-5 space-y-3.5 flex-1 bg-white">
        <div>
          <p className="text-[8.5px] text-slate-600 leading-relaxed">{summary}</p>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-[#0F1B4D] uppercase tracking-wider border-b-2 border-[#4B4DED] pb-0.5 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-2.5">
            {experiences.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.jobTitle}</span>
                  <span className="font-mono text-[8px] text-[#4B4DED]">
                    {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                  </span>
                </div>
                <p className="text-[8.5px] text-slate-500 font-medium">{exp.employer}, {exp.city}</p>
                {exp.description && (
                  <p className="text-[8px] text-slate-600 mt-0.5 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-[#0F1B4D] uppercase tracking-wider border-b-2 border-[#4B4DED] pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-1.5">
            {educations.map((edu: any) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <p className="text-[8px] text-slate-500">{edu.school}, {edu.city}</p>
                </div>
                <span className="text-[8px] font-mono text-slate-400">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-[#0F1B4D] uppercase tracking-wider border-b-2 border-[#4B4DED] pb-0.5 mb-1.5">
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill: any) => (
              <span key={skill.id} className="bg-indigo-50 text-[#0F1B4D] border border-indigo-100 px-2 py-0.5 rounded text-[8px] font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 4: Tech Slate
// -------------------------------------------------------------
function TechSlateTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
}: any) {
  return (
    <div className="w-full min-h-full p-6 text-[9.5px] leading-tight space-y-3 font-sans bg-slate-50/50 pb-10">
      <div className="flex justify-between items-start border-b border-slate-300 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{displayName}</h1>
          <p className="text-[11px] font-mono text-emerald-700 font-semibold">{displayJobTitle}</p>
          <p className="text-[8.5px] text-slate-500 mt-1">
            {displayLocation} · {displayEmail} · {displayPhone}
          </p>
        </div>
        {contact.photoUrl && (
          <img src={contact.photoUrl} alt="User" className="w-12 h-12 rounded-lg object-cover border border-slate-300" />
        )}
      </div>

      <p className="text-[8.5px] text-slate-700 leading-relaxed">{summary}</p>

      <div>
        <h2 className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
          $ experience --timeline
        </h2>
        <div className="space-y-2">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="border-l-2 border-slate-300 pl-2.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{exp.jobTitle}</span>
                <span className="font-mono text-[8px] text-slate-500">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-[8.5px] text-emerald-800 font-medium">{exp.employer}</p>
              <p className="text-[8px] text-slate-600 mt-0.5">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1 mb-1.5">
          $ skills --list
        </h2>
        <div className="flex flex-wrap gap-1">
          {skills.map((s: any) => (
            <span key={s.id} className="font-mono text-[7.5px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 5: Pollux (Deep Dark Sidebar on Right)
// -------------------------------------------------------------
function PolluxTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
  languagesList,
  interestsList,
  palette,
}: any) {
  const dotColor = palette?.dot || '#10B981';
  const textAccent = palette?.textAccent || '#047857';

  return (
    <div className="w-full min-h-full flex flex-row text-[9.5px] leading-tight pb-8">
      {/* Left Main Content */}
      <div className="w-[68%] p-5 sm:p-6 flex flex-col space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{displayName}</h1>
          <p className="text-[10.5px] font-semibold text-emerald-800 mt-0.5">{displayJobTitle}</p>
          <p className="text-[8.5px] text-slate-600 mt-2 leading-relaxed">{summary}</p>
        </div>

        {/* Work experience */}
        <div>
          <h2 className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
            Work experience
          </h2>
          <div className="relative pl-3 space-y-3 border-l" style={{ borderColor: `${dotColor}40` }}>
            {experiences.map((exp: any) => (
              <div key={exp.id} className="relative">
                <div
                  className="absolute -left-[16px] top-1 w-1.5 h-1.5 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: dotColor }}
                />
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.jobTitle}</span>
                  <span className="font-normal font-mono text-[8px] text-slate-500">
                    {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                  </span>
                </div>
                <p className="text-[8.5px] font-medium" style={{ color: textAccent }}>
                  {exp.employer}, {exp.city}
                </p>
                {exp.description && <p className="text-[8px] text-slate-600 mt-0.5 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
            Education
          </h2>
          <div className="relative pl-3 space-y-2 border-l" style={{ borderColor: `${dotColor}40` }}>
            {educations.map((edu: any) => (
              <div key={edu.id} className="relative">
                <div
                  className="absolute -left-[16px] top-1 w-1.5 h-1.5 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: dotColor }}
                />
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="font-normal font-mono text-[8px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-[8.5px] font-medium" style={{ color: textAccent }}>
                  {edu.school}, {edu.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Dark Column */}
      <div className="w-[32%] bg-[#1E3A34] text-white p-4 sm:p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-4 text-emerald-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
              Contact
            </p>
            <div className="space-y-1.5 text-[8.5px]">
              <div className="flex items-center gap-1.5">
                <Mail className="w-2.5 h-2.5 shrink-0 opacity-80" />
                <span className="truncate">{displayEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-2.5 h-2.5 shrink-0 opacity-80" />
                <span className="truncate">{displayPhone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-2.5 h-2.5 shrink-0 opacity-80" />
                <span className="truncate">{displayLocation}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
              Skills
            </p>
            <div className="space-y-1">
              {skills.map((s: any) => (
                <div key={s.id} className="flex justify-between text-[8px]">
                  <span>{s.name}</span>
                  <span className="opacity-70">{s.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
              Languages
            </p>
            <div className="space-y-1 text-[8px]">
              {languagesList.map((lang: string, i: number) => (
                <p key={i}>{lang}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TEMPLATE 6: Regulus (Top Header & Multi-Column Layout)
// -------------------------------------------------------------
function RegulusTemplate({
  contact,
  experiences,
  educations,
  skills,
  summary,
  displayName,
  displayJobTitle,
  displayPhone,
  displayEmail,
  displayLocation,
  languagesList,
  interestsList,
  palette,
}: any) {
  const dotColor = palette?.dot || '#EF4444';
  const textAccent = palette?.textAccent || '#DC2626';

  return (
    <div className="w-full min-h-full p-6 text-[9.5px] leading-tight space-y-4 pb-10">
      {/* Top Banner with soft curve */}
      <div className="relative pb-3 border-b-2" style={{ borderColor: `${dotColor}30` }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight">{displayName}</h1>
            <p className="text-[11px] font-semibold mt-0.5" style={{ color: textAccent }}>
              {displayJobTitle}
            </p>
          </div>
          {contact.photoUrl && (
            <img src={contact.photoUrl} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs" />
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-[8.5px] text-slate-600 mt-2">
          <span>{displayEmail}</span>
          <span>•</span>
          <span>{displayPhone}</span>
          <span>•</span>
          <span>{displayLocation}</span>
        </div>
      </div>

      <p className="text-[8.5px] text-slate-600 leading-relaxed">{summary}</p>

      {/* Two columns */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8 space-y-4">
          <div>
            <h2 className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
              Work experience
            </h2>
            <div className="space-y-3 pl-3 border-l" style={{ borderColor: `${dotColor}30` }}>
              {experiences.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.jobTitle}</span>
                    <span className="font-normal font-mono text-[8px] text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Current' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[8.5px]" style={{ color: textAccent }}>{exp.employer}, {exp.city}</p>
                  {exp.description && <p className="text-[8px] text-slate-600 mt-0.5">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
              Education
            </h2>
            <div className="space-y-2 pl-3 border-l" style={{ borderColor: `${dotColor}30` }}>
              {educations.map((edu: any) => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{edu.degree}</span>
                    <span className="font-normal font-mono text-[8px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-[8.5px]" style={{ color: textAccent }}>{edu.school}, {edu.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-3.5 border-l border-slate-100 pl-4">
          <div>
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">Skills</h3>
            <div className="space-y-1">
              {skills.map((s: any) => (
                <p key={s.id} className="text-[8px] text-slate-700 font-medium">• {s.name}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">Languages</h3>
            <div className="space-y-1 text-[8px] text-slate-600">
              {languagesList.map((l: string, i: number) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
