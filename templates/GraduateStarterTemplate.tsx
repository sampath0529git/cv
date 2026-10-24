import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

interface GraduateStarterTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function GraduateStarterTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: GraduateStarterTemplateProps) {
  const accent = cv.settings.accentColor || '#4338ca';
  const fullName = cv.personal.fullName || 'Forename Surname';
  const jobTitle = cv.personal.jobTitle || 'Recent Graduate';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const educations = pageData?.educations !== undefined ? pageData.educations : (isFirstPage ? cv.education : []);
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
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
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-11 py-9 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'var(--font-inter, sans-serif)',
      }}
    >
      <div className="space-y-4">
        {/* Centered Modern Graduate Header */}
        {isFirstPage ? (
          <header className="text-center pb-3 border-b border-slate-200 break-inside-avoid">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {fullName}
            </h1>
            <p style={{ color: accent }} className="text-xs font-semibold mt-0.5">
              {jobTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-slate-600 mt-1.5">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {linkedin && <span>• {linkedin}</span>}
            </div>
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-1.5 text-xs break-inside-avoid">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400">Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Career Objective / Statement */}
        {isFirstPage && cv.personalStatement?.trim() && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ color: accent }}
              className="text-[11px] font-bold uppercase tracking-wider mb-1"
            >
              Career Objective & Profile
            </h2>
            <p className="text-[10px] text-slate-700 leading-relaxed">
              {cv.personalStatement}
            </p>
          </section>
        )}

        {/* 1. Education & Academic Background (Placed First for Graduates) */}
        {educations && educations.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ color: accent }}
              className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100"
            >
              Education & Academic Qualifications
            </h2>
            <div className="space-y-3">
              {educations.map((edu: any, idx: number) => {
                const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={edu.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[11.5px]">{edu.qualification}</span>
                      <span className="text-[10px] font-semibold text-slate-500">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10.5px] text-slate-600 mt-0.5">
                      <span className="font-medium text-slate-800">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</span>
                      {edu.grade && (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200 text-[9.5px]">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-[10px] text-slate-700 mt-1 leading-snug">
                        {edu.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 2. Work Experience & Internships */}
        {experiences && experiences.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ color: accent }}
              className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100"
            >
              Work Experience & Internships
            </h2>
            <div className="space-y-3">
              {experiences.map((exp: any, idx: number) => {
                const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={exp.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[11px]">{exp.role}</span>
                      <span className="text-[10px] font-semibold text-slate-500">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10.5px] text-slate-600 mb-0.5">
                      <span className="font-medium text-slate-800">{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-snug">
                        {exp.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-[10px] text-slate-700 leading-snug">{exp.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. Key Skills & Competencies */}
        {allSkills.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ color: accent }}
              className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-1.5 border-b-2 border-slate-100"
            >
              Skills & Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[9.5px] font-medium rounded"
                >
                  {sk}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 4. Additional Details & Achievements */}
        {(isLastPage || totalPages === 1) && (achievementsList.length > 0 || interestsText || languagesText || nationality) && (
          <section className="break-inside-avoid cv-section border-t border-slate-200 pt-3">
            <h2
              style={{ color: accent }}
              className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 border-slate-100"
            >
              Achievements, Activities & Languages
            </h2>
            <div className="space-y-1.5 text-[10px] text-slate-700">
              {achievementsList.length > 0 && (
                <div>
                  <strong className="text-slate-900">Honours & Achievements: </strong>
                  <span>{achievementsList.join(' • ')}</span>
                </div>
              )}
              {interestsText && (
                <div>
                  <strong className="text-slate-900">Interests & Campus Activities: </strong>
                  <span>{interestsText}</span>
                </div>
              )}
              {languagesText && (
                <div>
                  <strong className="text-slate-900">Languages: </strong>
                  <span>{languagesText}</span>
                </div>
              )}
              {nationality && (
                <div>
                  <strong className="text-slate-900">Nationality / Work Eligibility: </strong>
                  <span>{nationality}</span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <footer className="pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400">
        <span>Curriculum Vitae</span>
        <span>Page {pageIndex + 1} of {totalPages}</span>
      </footer>
    </div>
  );
}
