import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

interface MinimalCleanTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function MinimalCleanTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: MinimalCleanTemplateProps) {
  const accent = cv.settings.accentColor || '#0f172a';
  const fullName = cv.personal.fullName || 'Forename Surname';
  const jobTitle = cv.personal.jobTitle || 'Professional Title';
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

  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-12 py-10 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'var(--font-jakarta, var(--font-inter, sans-serif))',
      }}
    >
      <div className="space-y-5">
        {/* Minimal Clean Header */}
        {isFirstPage ? (
          <header className="border-b border-slate-200 pb-4 break-inside-avoid">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {fullName}
            </h1>
            <p style={{ color: accent }} className="text-xs font-semibold tracking-wide mt-0.5">
              {jobTitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] text-slate-500 mt-2">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {linkedin && <span>• {linkedin}</span>}
            </div>
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-2 mb-2 text-xs break-inside-avoid">
            <span className="font-semibold text-slate-800">{fullName}</span>
            <span className="text-[10px] text-slate-400">Page {pageIndex + 1}</span>
          </div>
        )}

        {/* Profile Statement */}
        {isFirstPage && cv.personalStatement?.trim() && (
          <section className="break-inside-avoid cv-section">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-1.5">
              Profile
            </h2>
            <p className="text-[10.5px] text-slate-600 leading-relaxed">
              {cv.personalStatement}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="break-inside-avoid cv-section space-y-3">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp: any, idx: number) => {
                const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={exp.id || idx} className="grid grid-cols-[140px_1fr] gap-4 break-inside-avoid cv-item">
                    <div className="text-[10.5px] font-medium text-slate-400">
                      {dateDisplay}
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-900">{exp.role}</span>
                        <span className="text-[10px] text-slate-500">{exp.location}</span>
                      </div>
                      <div style={{ color: accent }} className="text-[10.5px] font-medium mb-1">
                        {exp.company}
                      </div>
                      {exp.bullets && exp.bullets.length > 0 ? (
                        <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-600 leading-snug">
                          {exp.bullets.map((b: string, bIdx: number) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      ) : exp.description ? (
                        <p className="text-[10px] text-slate-600 leading-snug">{exp.description}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="break-inside-avoid cv-section space-y-3">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu: any, idx: number) => {
                const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={edu.id || idx} className="grid grid-cols-[140px_1fr] gap-4 break-inside-avoid cv-item">
                    <div className="text-[10.5px] font-medium text-slate-400">
                      {dateDisplay}
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-900">{edu.qualification}</span>
                        {edu.grade && <span className="text-[10px] font-medium text-slate-600">{edu.grade}</span>}
                      </div>
                      <div style={{ color: accent }} className="text-[10.5px] font-medium">
                        {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                      </div>
                      {edu.description && (
                        <p className="text-[10px] text-slate-500 mt-0.5">{edu.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-[10.5px] text-slate-600 leading-relaxed">
              {allSkills.join(' • ')}
            </p>
          </section>
        )}

        {/* Additional Info */}
        {(isLastPage || totalPages === 1) && (nationality || languagesText || interestsText) && (
          <section className="break-inside-avoid cv-section pt-2">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
              Additional Details
            </h2>
            <div className="space-y-1 text-[10.5px] text-slate-600">
              {languagesText && <div><strong className="text-slate-800">Languages:</strong> {languagesText}</div>}
              {nationality && <div><strong className="text-slate-800">Nationality:</strong> {nationality}</div>}
              {interestsText && <div><strong className="text-slate-800">Interests:</strong> {interestsText}</div>}
            </div>
          </section>
        )}
      </div>

      {totalPages > 1 && (
        <div className="text-right text-[9px] text-slate-400 pt-2 border-t border-slate-100">
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  );
}
