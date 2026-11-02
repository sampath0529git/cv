import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface StratfordFirstJobTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function StratfordFirstJobTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: StratfordFirstJobTemplateProps) {
  const accent = cv.settings.accentColor || '#0D9488';
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const educations =
    pageData?.educations !== undefined ? pageData.educations : isFirstPage ? cv.education : [];
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
  const allSkills =
    cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const { projects, projectTitle, certifications, awards, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

  const showStatement = pageData ? Boolean(pageData.showStatement) : isFirstPage;
  const showSkills = pageData ? Boolean(pageData.showSkills) : isFirstPage;
  const showLanguages = pageData ? Boolean(pageData.showLanguages) : isLastPage || totalPages === 1;
  const showInterests = pageData ? Boolean(pageData.showInterests) : isLastPage || totalPages === 1;

  const optionalPersonalMeta = formatOptionalPersonalMeta(cv);
  const contactItems = [location, phone, email, linkedin, website, ...optionalPersonalMeta].filter(
    Boolean
  );

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    projects.length === 0;

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-10 py-9 bg-white text-[10.5px] leading-relaxed text-slate-800 flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-5 min-w-0">
        {isFirstPage ? (
          <header
            style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}28` }}
            className="rounded-xl p-5 border break-inside-avoid min-w-0"
          >
            <h1 className="text-[26px] font-extrabold tracking-tight text-slate-900 leading-none break-words">
              {fullName}
            </h1>
            {jobTitle && (
              <p style={{ color: accent }} className="text-xs font-bold mt-1.5">
                {jobTitle}
              </p>
            )}
            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-600 mt-2.5">
                {contactItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-300">·</span>}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-1.5 text-xs">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400 tabular-nums">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {isCompletelyEmpty ? (
          <EmptyCvGuide accent={accent} />
        ) : (
          <div className="grid grid-cols-12 gap-6 min-w-0">
            {/* Main Left Column (8 cols) */}
            <div className="col-span-8 space-y-4 min-w-0">
              {showStatement && cv.personalStatement?.trim() && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] mb-1"
                  >
                    Personal Profile
                  </h2>
                  <p className="text-[10.5px] text-slate-700 leading-[1.55] whitespace-pre-line">
                    {pageData?.statementText || cv.personalStatement}
                  </p>
                </section>
              )}

              {educations && educations.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2.5 border-b"
                  >
                    {pageData?.educationTitle || 'Education & Qualifications'}
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu: any, idx: number) => {
                      const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                      return (
                        <div key={edu.id || idx} className="break-inside-avoid cv-item">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-slate-900 text-[11px]">
                              {edu.qualification || edu.degree}
                            </span>
                            {dateDisplay && (
                              <span className="text-[9.5px] font-semibold text-slate-500 tabular-nums">
                                {dateDisplay}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-baseline gap-2 text-[10px]">
                            <span className="font-medium text-slate-700">{edu.institution}</span>
                            {edu.grade && (
                              <span style={{ color: accent }} className="font-bold">
                                {edu.grade}
                              </span>
                            )}
                          </div>
                          {edu.description && (
                            <p className="text-[9.5px] text-slate-600 mt-1 leading-snug whitespace-pre-line">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {experiences && experiences.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2.5 border-b"
                  >
                    {pageData?.experienceTitle || 'Work Placements & Part-Time Experience'}
                  </h2>
                  <div className="space-y-3">
                    {experiences.map((exp: any, idx: number) => {
                      const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                      return (
                        <div key={exp.id || idx} className="break-inside-avoid cv-item">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-slate-900 text-[11px]">
                              {exp.role || exp.position}
                            </span>
                            {dateDisplay && (
                              <span className="text-[9.5px] font-semibold text-slate-500 tabular-nums">
                                {dateDisplay}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-semibold mb-1" style={{ color: accent }}>
                            {exp.company}
                            {exp.location ? ` · ${exp.location}` : ''}
                          </div>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-slate-700 leading-[1.48]">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="text-[9.5px] text-slate-700 leading-[1.48] whitespace-pre-line">
                              {exp.description}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {projects.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2 border-b"
                  >
                    {projectTitle === 'Key Projects'
                      ? 'Volunteering & School Projects'
                      : projectTitle}
                  </h2>
                  <div className="space-y-2">
                    {projects.map((proj: any, idx: number) => (
                      <div key={proj.id || idx} className="text-[9.5px]">
                        <span className="font-bold text-slate-900">{proj.title || proj.name}</span>
                        {proj.role ? ` (${proj.role})` : ''}
                        {proj.description && (
                          <p className="text-slate-600 mt-0.5 leading-snug">{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar Column (4 cols) */}
            <div className="col-span-4 space-y-4 min-w-0">
              {showSkills && allSkills.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2 border-b"
                  >
                    Key Skills
                  </h2>
                  <ul className="space-y-1 text-[10px] text-slate-700">
                    {allSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: accent }}
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {awards.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2 border-b"
                  >
                    Achievements
                  </h2>
                  <ul className="space-y-1 text-[9.5px] text-slate-700">
                    {awards.map((award, idx) => (
                      <li key={idx}>{award}</li>
                    ))}
                  </ul>
                </section>
              )}

              {certifications.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-2 border-b"
                  >
                    Certificates
                  </h2>
                  <ul className="space-y-1 text-[9.5px] text-slate-700">
                    {certifications.map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>
                </section>
              )}

              {showLanguages && cv.languages && cv.languages.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b"
                  >
                    Languages
                  </h2>
                  <ul className="space-y-0.5 text-[9.5px] text-slate-700">
                    {cv.languages.map((l, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{l.name}</span>
                        {l.level ? ` (${l.level})` : ''}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {showInterests && cv.interests && cv.interests.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b"
                  >
                    Interests
                  </h2>
                  <p className="text-[9.5px] text-slate-600 leading-snug">
                    {cv.interests.join(' · ')}
                  </p>
                </section>
              )}

              {references && (
                <section className="break-inside-avoid cv-section pt-1">
                  <p className="text-[9.5px] italic text-slate-500">{references}</p>
                </section>
              )}
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <footer className="pt-2 border-t border-slate-100 flex justify-between text-[9px] text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
