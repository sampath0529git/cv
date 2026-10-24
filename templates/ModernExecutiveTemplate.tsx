import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

interface ModernExecutiveTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function ModernExecutiveTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: ModernExecutiveTemplateProps) {
  const accent = cv.settings.accentColor || '#1e3a8a';
  const fullName = cv.personal.fullName || 'Forename Surname';
  const jobTitle = cv.personal.jobTitle || 'Experienced Professional';
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
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'var(--font-inter, ui-sans-serif, system-ui, sans-serif)',
      }}
    >
      <div className="flex-1 flex flex-col">
        {/* Top Executive Accent Band */}
        {isFirstPage ? (
          <header
            style={{ backgroundColor: accent }}
            className="text-white px-10 py-7 break-inside-avoid shadow-sm"
          >
            <div className="flex justify-between items-end gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                  {fullName}
                </h1>
                <p className="text-sm font-medium text-white/90 mt-1 tracking-wide">
                  {jobTitle}
                </p>
              </div>

              <div className="text-[10.5px] text-white/85 text-right space-y-0.5 leading-snug">
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
                {location && <div>{location}</div>}
                {linkedin && <div>{linkedin}</div>}
              </div>
            </div>
          </header>
        ) : (
          <div className="px-10 pt-6 pb-2 border-b border-slate-200 flex justify-between items-baseline text-xs break-inside-avoid">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="italic text-slate-500 text-[10px]">Curriculum Vitae (continued)</span>
          </div>
        )}

        {/* Content Body */}
        <div className="px-10 py-6 space-y-5 flex-1">
          {/* Executive Summary */}
          {isFirstPage && cv.personalStatement?.trim() && (
            <section className="break-inside-avoid cv-section">
              <h2
                style={{ color: accent }}
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100 flex items-center gap-2"
              >
                Executive Profile
              </h2>
              <p className="text-[10.5px] leading-relaxed text-slate-700 whitespace-pre-line">
                {cv.personalStatement}
              </p>
            </section>
          )}

          {/* Key Competencies / Skills Grid */}
          {isFirstPage && allSkills.length > 0 && (
            <section className="break-inside-avoid cv-section">
              <h2
                style={{ color: accent }}
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100 flex items-center gap-2"
              >
                Core Competencies & Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {allSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200/80"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Professional Work Experience */}
          {experiences && experiences.length > 0 && (
            <section className="break-inside-avoid cv-section">
              <h2
                style={{ color: accent }}
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 border-slate-100"
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp: any, idx: number) => {
                  const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                  return (
                    <div key={exp.id || idx} className="break-inside-avoid cv-item">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[11.5px]">{exp.role}</span>
                        <span className="text-[10.5px] font-semibold text-slate-500 whitespace-nowrap">
                          {dateDisplay}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[10.5px] text-slate-600 mb-1">
                        <span className="font-semibold text-slate-700">{exp.company}</span>
                        {exp.location && <span>{exp.location}</span>}
                      </div>

                      {exp.bullets && exp.bullets.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-700 leading-snug">
                          {exp.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="break-inside-avoid">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : exp.description ? (
                        <p className="text-[10px] text-slate-700 whitespace-pre-line leading-snug">
                          {exp.description}
                        </p>
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
              <h2
                style={{ color: accent }}
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 border-slate-100"
              >
                Education & Credentials
              </h2>
              <div className="space-y-3">
                {educations.map((edu: any, idx: number) => {
                  const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                  return (
                    <div key={edu.id || idx} className="break-inside-avoid cv-item">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-900 text-[11px]">{edu.qualification}</span>
                        <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                          {dateDisplay}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[10.5px] text-slate-600">
                        <span className="font-medium text-slate-800">{edu.institution}</span>
                        {(edu.location || edu.grade) && (
                          <span>
                            {[edu.location, edu.grade].filter(Boolean).join(' • ')}
                          </span>
                        )}
                      </div>
                      {edu.description && (
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Additional Information (Last page or single page) */}
          {(isLastPage || totalPages === 1) && (nationality || languagesText || interestsText || achievementsList.length > 0) && (
            <section className="break-inside-avoid cv-section border-t border-slate-200 pt-3">
              <h2
                style={{ color: accent }}
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100"
              >
                Additional Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] text-slate-700">
                {languagesText && (
                  <div>
                    <span className="font-bold text-slate-900">Languages: </span>
                    <span>{languagesText}</span>
                  </div>
                )}
                {nationality && (
                  <div>
                    <span className="font-bold text-slate-900">Nationality: </span>
                    <span>{nationality}</span>
                  </div>
                )}
                {interestsText && (
                  <div className="sm:col-span-2">
                    <span className="font-bold text-slate-900">Interests: </span>
                    <span>{interestsText}</span>
                  </div>
                )}
                {achievementsList.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="font-bold text-slate-900">Achievements: </span>
                    <span>{achievementsList.join(' • ')}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      <footer className="px-10 py-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400">
        <span>Confidential Curriculum Vitae</span>
        <span>
          Page {pageIndex + 1} of {totalPages}
        </span>
      </footer>
    </div>
  );
}
