import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

interface ClassicCorporateTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function ClassicCorporateTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: ClassicCorporateTemplateProps) {
  const accent = cv.settings.accentColor || '#0f766e';
  const fullName = cv.personal.fullName || 'Forename Surname';
  const jobTitle = cv.personal.jobTitle || 'Executive Professional';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
  const educations = pageData?.educations !== undefined ? pageData.educations : (isFirstPage ? cv.education : []);
  const allSkills = cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const nationality = cv.personal.nationality || '';
  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(', ')
      : '';
  const interestsText = cv.interests && cv.interests.length > 0 ? cv.interests.join('; ') : '';
  const achievementsList = cv.awards && cv.awards.length > 0 ? cv.awards : [];

  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-10 py-8 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'var(--font-merriweather, Georgia, serif)',
      }}
    >
      <div className="space-y-4">
        {/* Header with Left Accent Border */}
        {isFirstPage ? (
          <header className="border-b border-slate-300 pb-3 pl-4 border-l-4 break-inside-avoid" style={{ borderLeftColor: accent }}>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {fullName}
            </h1>
            <p style={{ color: accent }} className="text-xs font-semibold tracking-wide mt-0.5 font-sans">
              {jobTitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-[10px] text-slate-600 mt-1 font-sans">
              {email && <span>Email: {email}</span>}
              {phone && <span>Tel: {phone}</span>}
              {location && <span>Location: {location}</span>}
              {linkedin && <span>LinkedIn: {linkedin}</span>}
            </div>
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-300 pb-1 text-xs break-inside-avoid font-sans">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400">Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Executive Summary */}
        {isFirstPage && cv.personalStatement?.trim() && (
          <section className="break-inside-avoid cv-section">
            <h2 style={{ color: accent }} className="text-xs font-bold uppercase tracking-wider mb-1 font-sans">
              Executive Summary
            </h2>
            <p className="text-[10px] text-slate-700 leading-relaxed font-sans">
              {cv.personalStatement}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2 style={{ color: accent }} className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200 font-sans">
              Professional Work History
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => {
                const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={exp.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[11.5px]">{exp.role}</span>
                      <span className="text-[10px] font-semibold text-slate-500 font-sans">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10.5px] text-slate-700 mb-1 font-sans">
                      <span className="font-semibold">{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-snug font-sans">
                        {exp.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-[10px] text-slate-700 leading-snug font-sans">{exp.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education & Qualifications */}
        {educations && educations.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2 style={{ color: accent }} className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-200 font-sans">
              Education & Academic Credentials
            </h2>
            <div className="space-y-2.5">
              {educations.map((edu: any, idx: number) => {
                const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={edu.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[11px]">{edu.qualification}</span>
                      <span className="text-[10px] font-semibold text-slate-500 font-sans">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10.5px] text-slate-700 font-sans">
                      <span>{edu.institution} {edu.location ? `• ${edu.location}` : ''}</span>
                      {edu.grade && <span className="font-semibold text-slate-900">{edu.grade}</span>}
                    </div>
                    {edu.description && (
                      <p className="text-[9.5px] text-slate-600 mt-0.5 font-sans leading-snug">{edu.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Core Competencies & Skills */}
        {allSkills.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2 style={{ color: accent }} className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-200 font-sans">
              Key Competencies
            </h2>
            <p className="text-[10px] text-slate-700 font-sans leading-relaxed">
              {allSkills.join(' • ')}
            </p>
          </section>
        )}

        {/* Additional Information */}
        {(isLastPage || totalPages === 1) && (nationality || languagesText || interestsText || achievementsList.length > 0) && (
          <section className="break-inside-avoid cv-section border-t border-slate-200 pt-2.5">
            <h2 style={{ color: accent }} className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-200 font-sans">
              Additional Information
            </h2>
            <div className="space-y-1 text-[10px] text-slate-700 font-sans">
              {languagesText && <div><strong>Languages: </strong>{languagesText}</div>}
              {nationality && <div><strong>Nationality: </strong>{nationality}</div>}
              {interestsText && <div><strong>Interests: </strong>{interestsText}</div>}
              {achievementsList.length > 0 && <div><strong>Achievements: </strong>{achievementsList.join(' • ')}</div>}
            </div>
          </section>
        )}
      </div>

      <footer className="pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-400 font-sans">
        <span>Curriculum Vitae</span>
        <span>Page {pageIndex + 1} of {totalPages}</span>
      </footer>
    </div>
  );
}
