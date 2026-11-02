import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface SpotlightActingTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function SpotlightActingTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: SpotlightActingTemplateProps) {
  const accent = cv.settings.accentColor || '#1E293B';
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

  const languagesText =
    showLanguages && cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(' · ')
      : '';
  const interestsText =
    showInterests && cv.interests && cv.interests.length > 0 ? cv.interests.join(' · ') : '';

  const optionalPersonalMeta = formatOptionalPersonalMeta(cv);
  const contactItems = [email, phone, location, website, linkedin].filter(Boolean);

  const sectionOrder = resolveTemplateSectionOrder(cv, [
    'statement',
    'experience',
    'projects',
    'education',
    'skills',
    'languages',
    'certifications',
    'awards',
    'interests',
    'custom',
    'references',
  ]);

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    projects.length === 0 &&
    certifications.length === 0 &&
    awards.length === 0 &&
    customSections.length === 0 &&
    !references &&
    !languagesText &&
    !interestsText;

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-11 py-9 text-[10.5px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-4 min-w-0">
        {isFirstPage ? (
          <header
            style={{ borderBottomColor: accent }}
            className="pb-4 border-b-2 flex items-start justify-between gap-6 break-inside-avoid min-w-0"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <h1 className="text-[27px] font-extrabold tracking-tight text-slate-900 uppercase leading-none break-words [overflow-wrap:anywhere]">
                  {fullName}
                </h1>
              </div>

              {jobTitle && (
                <p
                  style={{ color: accent }}
                  className="text-xs font-bold tracking-wide uppercase mt-1.5 break-words [overflow-wrap:anywhere]"
                >
                  {jobTitle}
                </p>
              )}

              {contactItems.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-600 mt-2">
                  {contactItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-300">·</span>}
                      <span>{item}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {optionalPersonalMeta.length > 0 && (
                <div
                  style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}22` }}
                  className="mt-2.5 px-3 py-1.5 rounded border text-[9.5px] font-medium text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-0.5"
                >
                  {optionalPersonalMeta.map((meta, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-300">|</span>}
                      <span>{meta}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {showPhoto && (
              <div
                style={{ borderColor: `${accent}35` }}
                className="w-[92px] h-[118px] rounded-md overflow-hidden border shrink-0 bg-slate-100 shadow-2xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cv.personal.photoUrl}
                  alt={fullName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-1.5 text-xs break-inside-avoid">
            <span className="font-bold uppercase tracking-wide text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400 tabular-nums">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {isCompletelyEmpty ? (
          <EmptyCvGuide accent={accent} />
        ) : (
          sectionOrder.map((secKey) => {
            if (secKey === 'statement') {
              if (!showStatement || !cv.personalStatement?.trim()) return null;
              return (
                <section key="statement" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-1"
                  >
                    Performer Profile &amp; Casting Summary
                  </h2>
                  <p className="text-[10.5px] text-slate-700 leading-[1.55] whitespace-pre-line">
                    {pageData?.statementText || cv.personalStatement}
                  </p>
                </section>
              );
            }

            if (secKey === 'experience') {
              if (!experiences || experiences.length === 0) return null;
              return (
                <section key="experience" className="break-inside-avoid cv-section">
                  <div
                    style={{ borderBottomColor: `${accent}30` }}
                    className="flex items-baseline justify-between pb-1 mb-2 border-b"
                  >
                    <h2
                      style={{ color: accent }}
                      className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
                    >
                      {pageData?.experienceTitle || 'Selected Stage, Television & Film Credits'}
                    </h2>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                      Year · Role · Production / Company
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {experiences.map((exp: any, idx: number) => {
                      const roleName = exp.role || exp.position || '';
                      const prodCompany = exp.company || '';
                      const venueOrDir = exp.location || '';
                      const yearStr = [exp.startDate, exp.endDate]
                        .filter(Boolean)
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .join(' – ');
                      return (
                        <div key={exp.id || idx} className="py-1.5 break-inside-avoid cv-item">
                          <div className="grid grid-cols-12 gap-2 items-baseline">
                            <div className="col-span-2 text-[9.5px] font-semibold text-slate-500 tabular-nums truncate">
                              {yearStr || 'Credit'}
                            </div>
                            <div className="col-span-4 font-bold text-slate-900 text-[10.5px] break-words">
                              {roleName}
                            </div>
                            <div className="col-span-6 text-[10px] text-slate-700 flex flex-wrap justify-between gap-1">
                              <span style={{ color: accent }} className="font-semibold">
                                {prodCompany}
                              </span>
                              {venueOrDir && (
                                <span className="text-slate-500 italic">{venueOrDir}</span>
                              )}
                            </div>
                          </div>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="mt-0.5 pl-[16.666%] space-y-0.5 text-[9.5px] text-slate-600 leading-snug">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{b}</li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="mt-0.5 pl-[16.666%] text-[9.5px] text-slate-600 leading-snug">
                              {exp.description}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            }

            if (secKey === 'projects') {
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}30` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2 border-b"
                  >
                    {projectTitle === 'Key Projects' ? 'Commercial, Voiceover & Workshop Credits' : projectTitle}
                  </h2>
                  <div className="space-y-1.5">
                    {projects.map((proj: any, idx: number) => (
                      <div key={proj.id || idx} className="grid grid-cols-12 gap-2 items-baseline text-[10px]">
                        <div className="col-span-4 font-bold text-slate-900">
                          {proj.title || proj.name}
                        </div>
                        <div className="col-span-3 font-semibold" style={{ color: accent }}>
                          {proj.role || ''}
                        </div>
                        <div className="col-span-5 text-slate-600">
                          {proj.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (secKey === 'education') {
              if (!educations || educations.length === 0) return null;
              return (
                <section key="education" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}30` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2 border-b"
                  >
                    {pageData?.educationTitle || 'Conservatoire & Performance Training'}
                  </h2>
                  <div className="space-y-2">
                    {educations.map((edu: any, idx: number) => {
                      const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                      return (
                        <div key={edu.id || idx} className="break-inside-avoid cv-item">
                          <div className="flex justify-between items-baseline gap-3">
                            <span className="font-bold text-slate-900 text-[10.5px]">
                              {edu.qualification || edu.degree}
                              {edu.institution ? ` — ${edu.institution}` : ''}
                            </span>
                            <span className="text-[9.5px] font-semibold text-slate-500 tabular-nums whitespace-nowrap">
                              {dateDisplay}
                            </span>
                          </div>
                          {(edu.grade || edu.location || edu.description) && (
                            <p className="text-[9.5px] text-slate-600 mt-0.5">
                              {[edu.grade, edu.location, edu.description].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            }

            if (secKey === 'skills') {
              if (!showSkills || allSkills.length === 0) return null;
              return (
                <section key="skills" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent, borderBottomColor: `${accent}30` }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-2 border-b"
                  >
                    Performance, Vocal &amp; Movement Skills
                  </h2>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-slate-700">
                    {allSkills.map((skill, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-slate-300">·</span>}
                        <span className="font-medium text-slate-800">{skill}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </section>
              );
            }

            if (secKey === 'languages') {
              if (!languagesText) return null;
              return (
                <section key="languages" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-0.5"
                  >
                    Accents, Dialects &amp; Languages
                  </h2>
                  <p className="text-[10px] text-slate-700">{languagesText}</p>
                </section>
              );
            }

            if (secKey === 'certifications') {
              if (!certifications || certifications.length === 0) return null;
              return (
                <section key="certifications" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-0.5"
                  >
                    Memberships &amp; Combat / Specialist Certifications
                  </h2>
                  <p className="text-[10px] text-slate-700">{certifications.join(' · ')}</p>
                </section>
              );
            }

            if (secKey === 'awards') {
              if (!awards || awards.length === 0) return null;
              return (
                <section key="awards" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-0.5"
                  >
                    Awards &amp; Nominations
                  </h2>
                  <p className="text-[10px] text-slate-700">{awards.join(' · ')}</p>
                </section>
              );
            }

            if (secKey === 'interests') {
              if (!interestsText) return null;
              return (
                <section key="interests" className="break-inside-avoid cv-section">
                  <h2
                    style={{ color: accent }}
                    className="text-[10px] font-extrabold uppercase tracking-[0.12em] mb-0.5"
                  >
                    Additional Interests &amp; Athletics
                  </h2>
                  <p className="text-[10px] text-slate-700">{interestsText}</p>
                </section>
              );
            }

            if (secKey === 'custom') {
              if (!customSections || customSections.length === 0) return null;
              return (
                <div key="custom" className="space-y-3">
                  {customSections.map((sec) => (
                    <section key={sec.id} className="break-inside-avoid cv-section">
                      <h2
                        style={{ color: accent, borderBottomColor: `${accent}30` }}
                        className="text-[10px] font-extrabold uppercase tracking-[0.12em] pb-1 mb-1.5 border-b"
                      >
                        {sec.title}
                      </h2>
                      {sec.content && (
                        <p className="text-[10px] text-slate-700 whitespace-pre-line">
                          {sec.content}
                        </p>
                      )}
                    </section>
                  ))}
                </div>
              );
            }

            if (secKey === 'references') {
              if (!references) return null;
              return (
                <section key="references" className="break-inside-avoid cv-section pt-1">
                  <p className="text-[9.5px] italic text-slate-500">{references}</p>
                </section>
              );
            }

            return null;
          })
        )}
      </div>

      {totalPages > 1 && (
        <footer className="pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
