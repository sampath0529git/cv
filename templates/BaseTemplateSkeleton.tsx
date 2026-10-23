/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CV } from '@/types/cv';
import CvSection from './shared/CvSection';
import CvBulletList from './shared/CvBulletList';
import CvDateRange from './shared/CvDateRange';
import CvSkillList from './shared/CvSkillList';
import CvContactLine from './shared/CvContactLine';

interface BaseTemplateSkeletonProps {
  cv: CV;
  layoutVariant?: 'classic' | 'sidebar-left' | 'sidebar-right' | 'header-band' | 'timeline' | 'minimal' | 'executive';
}

/**
 * Base template skeleton for Batch 0 to ensure all 20 templates render beautifully
 * with realistic styling and layouts right away, prior to Batches 1-4 dedicated files.
 */
export default function BaseTemplateSkeleton({ cv, layoutVariant = 'classic' }: BaseTemplateSkeletonProps) {
  const accent = cv.settings.accentColor || '#1e3a8a';
  const showPhoto = cv.settings.showPhoto && Boolean(cv.personal.photoUrl);

  // Modern Two-Column Layouts (e.g. Manchester / Glasgow)
  if (layoutVariant === 'sidebar-left') {
    return (
      <div className="w-full min-h-full flex flex-row text-[10px] leading-relaxed text-slate-800">
        {/* Left Sidebar */}
        <aside
          className="w-[33%] p-5 shrink-0 space-y-4 border-r border-slate-200"
          style={{ backgroundColor: `${accent}0d` }}
        >
          {showPhoto && (
            <div className="flex justify-center mb-2">
              <img
                src={cv.personal.photoUrl}
                alt={cv.personal.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 shadow-xs"
                style={{ borderColor: accent }}
              />
            </div>
          )}

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: `${accent}33` }}>
              Contact
            </h2>
            <CvContactLine personal={cv.personal} layout="stacked" showIcons={true} accentColor={accent} />
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: `${accent}33` }}>
              Key Skills
            </h2>
            <CvSkillList skills={cv.skills} layout="tags" accentColor={accent} />
          </div>

          {cv.languages && cv.languages.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5" style={{ borderColor: `${accent}33` }}>
                Languages
              </h2>
              <ul className="space-y-1 text-[9px] text-slate-700">
                {cv.languages.map((l, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-slate-500">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cv.interests && cv.interests.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5" style={{ borderColor: `${accent}33` }}>
                Interests
              </h2>
              <p className="text-[9px] text-slate-600">{cv.interests.join(' • ')}</p>
            </div>
          )}
        </aside>

        {/* Right Main Column */}
        <main className="w-[67%] p-6 space-y-4">
          <header className="border-b pb-3" style={{ borderColor: `${accent}25` }}>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">{cv.personal.fullName}</h1>
            <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{cv.personal.jobTitle}</p>
          </header>

          {cv.personalStatement && (
            <CvSection title="Personal Statement" variant="underline" accentColor={accent}>
              <p className="text-[10px] text-slate-700 leading-relaxed">{cv.personalStatement}</p>
            </CvSection>
          )}

          <CvSection title="Work Experience" variant="underline" accentColor={accent}>
            <div className="space-y-3.5">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="space-y-1 break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10.5px]">
                    <span>{exp.role}</span>
                    <CvDateRange startDate={exp.startDate} endDate={exp.endDate} current={exp.current} />
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: accent }}>
                    {[exp.company, exp.location].filter(Boolean).join(', ')}
                  </p>
                  <CvBulletList bullets={exp.bullets} bulletColor={accent} />
                </div>
              ))}
            </div>
          </CvSection>

          <CvSection title="Education" variant="underline" accentColor={accent}>
            <div className="space-y-2.5">
              {cv.education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                    <span>{edu.qualification}</span>
                    <CvDateRange startDate={edu.startDate} endDate={edu.endDate} />
                  </div>
                  <p className="text-[9.5px] text-slate-600">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</p>
                </div>
              ))}
            </div>
          </CvSection>

          <div className="pt-2 text-[9px] text-slate-500 italic">
            {cv.references || 'References available on request'}
          </div>
        </main>
      </div>
    );
  }

  // Classic Single-Column Layout (e.g. London / Oxford / Bristol / York)
  return (
    <div className="w-full min-h-full p-8 text-[10px] leading-relaxed text-slate-800 space-y-4">
      {/* Header */}
      <header className="text-center border-b pb-3" style={{ borderColor: `${accent}33` }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 font-serif">{cv.personal.fullName}</h1>
        <p className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: accent }}>
          {cv.personal.jobTitle}
        </p>
        <div className="mt-2">
          <CvContactLine personal={cv.personal} layout="inline" showIcons={false} />
        </div>
      </header>

      {/* Personal Statement */}
      {cv.personalStatement && (
        <CvSection title="Personal Statement" variant="underline" accentColor={accent}>
          <p className="text-[10px] text-slate-700 leading-relaxed text-justify">{cv.personalStatement}</p>
        </CvSection>
      )}

      {/* Work Experience */}
      <CvSection title="Work Experience" variant="underline" accentColor={accent}>
        <div className="space-y-3.5">
          {cv.experience.map((exp) => (
            <div key={exp.id} className="space-y-1 break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-slate-950 text-[10.5px]">
                <span>{exp.role}</span>
                <CvDateRange startDate={exp.startDate} endDate={exp.endDate} current={exp.current} />
              </div>
              <p className="text-[10px] font-semibold" style={{ color: accent }}>
                {[exp.company, exp.location].filter(Boolean).join(' — ')}
              </p>
              <CvBulletList bullets={exp.bullets} bulletColor={accent} />
            </div>
          ))}
        </div>
      </CvSection>

      {/* Education */}
      <CvSection title="Education" variant="underline" accentColor={accent}>
        <div className="space-y-2">
          {cv.education.map((edu) => (
            <div key={edu.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                <span>{edu.qualification}</span>
                <CvDateRange startDate={edu.startDate} endDate={edu.endDate} />
              </div>
              <p className="text-[9.5px] text-slate-600">{edu.institution} {edu.grade ? `— ${edu.grade}` : ''}</p>
            </div>
          ))}
        </div>
      </CvSection>

      {/* Skills */}
      <CvSection title="Key Skills" variant="underline" accentColor={accent}>
        <CvSkillList skills={cv.skills} layout="tags" accentColor={accent} />
      </CvSection>

      {/* References */}
      <div className="pt-2 border-t border-slate-200 text-center text-[9px] text-slate-500 italic">
        {cv.references || 'References available on request'}
      </div>
    </div>
  );
}
