import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface SohoPerformerTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function SohoPerformerTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: SohoPerformerTemplateProps) {
  const accent = cv.settings.accentColor || '#0F172A';
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';
  const showPhoto = Boolean(cv.settings.showPhoto && cv.personal.photoUrl);

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
  const educations =
    pageData?.educations !== undefined ? pageData.educations : isFirstPage ? cv.education : [];
  const allSkills =
    cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const { projects, projectTitle, certifications, awards, customSections, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

  const showStatement = pageData ? Boolean(pageData.showStatement) : isFirstPage;
  const showSkills = pageData ? Boolean(pageData.showSkills) : isFirstPage;
  const showLanguages = pageData ? Boolean(pageData.showLanguages) : isLastPage || totalPages === 1;
  const showInterests = pageData ? Boolean(pageData.showInterests) : isLastPage || totalPages === 1;

  const optionalPersonalMeta = formatOptionalPersonalMeta(cv);

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    projects.length === 0 &&
    certifications.length === 0 &&
    awards.length === 0;

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border bg-white text-[10.5px] leading-relaxed text-slate-800 grid grid-cols-12 overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      {/* Left Performer Sidebar (4 cols) */}
      <aside
        style={{ backgroundColor: '#F8FAFC', borderRightColor: '#E2E8F0' }}
        className="col-span-4 h-full px-6 py-8 border-r flex flex-col justify-between min-w-0"
      >
        <div className="space-y-5 min-w-0">
          {isFirstPage && showPhoto && (
            <div className="w-full aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cv.personal.photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Contact & Agent Details */}
          <div className="space-y-1.5 min-w-0">
            <h2
              style={{ color: accent }}
              className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
            >
              Contact &amp; Casting
            </h2>
            <div className="space-y-1 text-[9.5px] text-slate-700 break-words">
              {location && <div className="font-medium text-slate-900">{location}</div>}
              {phone && <div>{phone}</div>}
              {email && <div>{email}</div>}
              {website && (
                <div style={{ color: accent }} className="font-semibold">
                  {website}
                </div>
              )}
              {linkedin && <div className="text-slate-600">{linkedin}</div>}
            </div>
          </div>

          {/* Playing Specs / Personal Meta */}
          {isFirstPage && optionalPersonalMeta.length > 0 && (
            <div className="space-y-1.5">
              <h2
                style={{ color: accent }}
                className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
              >
                Performer Details
              </h2>
              <ul className="space-y-1 text-[9.5px] text-slate-700">
                {optionalPersonalMeta.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {showSkills && allSkills.length > 0 && (
            <div className="space-y-1.5">
              <h2
                style={{ color: accent }}
                className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
              >
                Specialist Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {allSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-medium text-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Accents & Languages */}
          {showLanguages && cv.languages && cv.languages.length > 0 && (
            <div className="space-y-1.5">
              <h2
                style={{ color: accent }}
                className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
              >
                Accents &amp; Languages
              </h2>
              <ul className="space-y-1 text-[9.5px] text-slate-700">
                {cv.languages.map((lang, idx) => (
                  <li key={idx} className="flex justify-between gap-2">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    {lang.level && <span className="text-slate-500">{lang.level}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-1.5">
              <h2
                style={{ color: accent }}
                className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
              >
                Equity &amp; Credentials
              </h2>
              <ul className="space-y-1 text-[9.5px] text-slate-700">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {showInterests && cv.interests && cv.interests.length > 0 && (
            <div className="space-y-1.5">
              <h2
                style={{ color: accent }}
                className="text-[9.5px] font-extrabold uppercase tracking-[0.12em] pb-1 border-b border-slate-200"
              >
                Movement &amp; Sports
              </h2>
              <p className="text-[9.5px] text-slate-600 leading-snug">
                {cv.interests.join(' · ')}
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="text-[9px] text-slate-400 tabular-nums pt-2 border-t border-slate-200">
            Page {pageIndex + 1} of {totalPages}
          </div>
        )}
      </aside>

      {/* Main Credits Column (8 cols) */}
      <main className="col-span-8 h-full px-8 py-8 flex flex-col justify-between min-w-0">
        <div className="space-y-4 min-w-0">
          {isFirstPage && (
            <header
              style={{ borderBottomColor: `${accent}25` }}
              className="pb-3.5 border-b min-w-0"
            >
              <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 leading-none break-words">
                {fullName}
              </h1>
              {jobTitle && (
                <p
                  style={{ color: accent }}
                  className="text-xs font-bold uppercase tracking-wider mt-1.5"
                >
                  {jobTitle}
                </p>
              )}
            </header>
          )}

          {isCompletelyEmpty ? (
            <EmptyCvGuide accent={accent} />
          ) : (
            <>
              {showStatement && cv.personalStatement?.trim() && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-1"
                  >
                    Casting Profile
                  </h2>
                  <p className="text-[10px] text-slate-700 leading-[1.55] whitespace-pre-line">
                    {pageData?.statementText || cv.personalStatement}
                  </p>
                </section>
              )}

              {experiences && experiences.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2.5 border-b"
                  >
                    {pageData?.experienceTitle || 'Screen & Theatre Credits'}
                  </h2>
                  <div className="space-y-2.5">
                    {experiences.map((exp: any, idx: number) => {
                      const dateDisplay = [exp.startDate, exp.endDate]
                        .filter(Boolean)
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .join(' – ');
                      return (
                        <div key={exp.id || idx} className="break-inside-avoid cv-item">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-slate-900 text-[11px]">
                              {exp.role || exp.position}
                            </span>
                            {dateDisplay && (
                              <span className="text-[9.5px] font-semibold text-slate-500 tabular-nums whitespace-nowrap">
                                {dateDisplay}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-baseline gap-2 text-[10px]">
                            <span style={{ color: accent }} className="font-semibold">
                              {exp.company}
                            </span>
                            {exp.location && (
                              <span className="text-slate-500 italic">{exp.location}</span>
                            )}
                          </div>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[9.5px] text-slate-600 leading-snug">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          )}
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
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2 border-b"
                  >
                    {projectTitle === 'Key Projects' ? 'Further Credits & Showreel' : projectTitle}
                  </h2>
                  <div className="space-y-2">
                    {projects.map((proj: any, idx: number) => (
                      <div key={proj.id || idx} className="text-[10px]">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="font-bold text-slate-900">{proj.title || proj.name}</span>
                          {proj.role && (
                            <span style={{ color: accent }} className="font-semibold text-[9.5px]">
                              {proj.role}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-[9.5px] text-slate-600 leading-snug mt-0.5">
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {educations && educations.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2 border-b"
                  >
                    {pageData?.educationTitle || 'Drama School & Training'}
                  </h2>
                  <div className="space-y-2">
                    {educations.map((edu: any, idx: number) => {
                      const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                      return (
                        <div key={edu.id || idx} className="break-inside-avoid cv-item">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-slate-900 text-[10.5px]">
                              {edu.qualification || edu.degree}
                            </span>
                            {dateDisplay && (
                              <span className="text-[9.5px] text-slate-500 font-semibold tabular-nums">
                                {dateDisplay}
                              </span>
                            )}
                          </div>
                          <div className="text-[9.5px] text-slate-600">
                            <span className="font-medium text-slate-800">{edu.institution}</span>
                            {edu.grade ? ` · ${edu.grade}` : ''}
                            {edu.description ? ` — ${edu.description}` : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {awards.length > 0 && (
                <section className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-1.5 border-b"
                  >
                    Awards &amp; Commendations
                  </h2>
                  <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-slate-700">
                    {awards.map((award, idx) => (
                      <li key={idx}>{award}</li>
                    ))}
                  </ul>
                </section>
              )}

              {customSections.map((sec) => (
                <section key={sec.id} className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}25` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-1 border-b"
                  >
                    {sec.title}
                  </h2>
                  {sec.content && (
                    <p className="text-[9.5px] text-slate-700 whitespace-pre-line">{sec.content}</p>
                  )}
                </section>
              ))}
            </>
          )}
        </div>

        {references && (
          <footer className="pt-2 border-t border-slate-100 text-[9.5px] italic text-slate-500">
            {references}
          </footer>
        )}
      </main>
    </div>
  );
}
