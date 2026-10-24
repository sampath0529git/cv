import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface TechCompactTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function TechCompactTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: TechCompactTemplateProps) {
  const accent = cv.settings.accentColor || '#4B4DED';
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';

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
  const contactItems = [
    email,
    phone,
    location,
    linkedin,
    website,
    ...optionalPersonalMeta,
  ].filter(Boolean);

  const sectionOrder = resolveTemplateSectionOrder(cv, [
    'statement',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'languages',
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
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-11 py-9 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-4">
        {/* Top Accent Strip + Technical Header */}
        {isFirstPage ? (
          <header className="pb-3.5 border-b border-slate-200 break-inside-avoid">
            <div style={{ backgroundColor: accent }} className="w-12 h-1 rounded-full mb-3" />
            <div className="flex justify-between items-baseline gap-4">
              <h1 className="text-[25px] font-bold tracking-tight text-slate-950 leading-none">
                {fullName}
              </h1>
              {jobTitle && (
                <span style={{ color: accent }} className="font-semibold text-xs font-mono">
                  {jobTitle}
                </span>
              )}
            </div>
            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9.5px] text-slate-500 mt-2 font-mono">
                {contactItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-300">/</span>}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-1.5 text-xs break-inside-avoid">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="font-mono text-[10px] text-slate-400 tabular-nums">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {/* Ordered Dynamic Sections */}
        {sectionOrder.map((secKey) => {
          if (secKey === 'statement') {
            if (!showStatement || !cv.personalStatement?.trim()) return null;
            return (
              <section key="statement" className="break-inside-avoid cv-section">
                <p className="text-[10.5px] text-slate-700 leading-[1.55] whitespace-pre-line">
                  {pageData?.statementText || cv.personalStatement}
                </p>
              </section>
            );
          }

          if (secKey === 'skills') {
            if (!showSkills || allSkills.length === 0) return null;
            return (
              <section
                key="skills"
                style={{ backgroundColor: `${accent}08`, borderColor: `${accent}20` }}
                className="break-inside-avoid cv-section border rounded-lg p-3"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1.5 font-mono"
                >
                  Technical Stack & Core Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {allSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[9.5px] font-mono font-medium bg-white border border-slate-200/90 text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            );
          }

          if (secKey === 'experience') {
            if (!experiences || experiences.length === 0) return null;
            return (
              <section key="experience" className="break-inside-avoid cv-section">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200 mb-2.5 font-mono"
                >
                  {pageData?.experienceTitle || 'Engineering & Professional Experience'}
                </h2>
                <div className="space-y-3.5">
                  {experiences.map((exp: any, idx: number) => {
                    const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                    return (
                      <div key={exp.id || idx} className="break-inside-avoid cv-item">
                        <div className="flex justify-between items-baseline gap-3">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-[11px]">{exp.role}</span>
                            {exp.company && (
                              <span style={{ color: accent }} className="text-[10.5px] font-semibold">
                                · {exp.company}
                              </span>
                            )}
                            {exp.location && (
                              <span className="text-[9.5px] text-slate-400 font-mono">
                                ({exp.location})
                              </span>
                            )}
                          </div>
                          {dateDisplay && (
                            <span className="text-[9.5px] font-mono text-slate-500 tabular-nums whitespace-nowrap">
                              {dateDisplay}
                            </span>
                          )}
                        </div>

                        {exp.bullets && exp.bullets.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.48] mt-1">
                            {exp.bullets.map((b: string, bIdx: number) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        ) : exp.description ? (
                          <p className="text-[10px] text-slate-700 leading-[1.48] mt-1 whitespace-pre-line">
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
            if (projects.length === 0) return null;
            return (
              <section key="projects" className="break-inside-avoid cv-section">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200 mb-2 font-mono"
                >
                  {projectTitle === 'Key Projects' ? 'Key Technical Projects' : projectTitle}
                </h2>
                <div className="space-y-2.5">
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="break-inside-avoid cv-item">
                      <div className="flex justify-between items-baseline gap-3">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-[11px]">
                            {proj.title}
                          </span>
                          {proj.role && (
                            <span className="text-[10px] font-mono text-slate-500">
                              · {proj.role}
                            </span>
                          )}
                        </div>
                        {proj.link && (
                          <span style={{ color: accent }} className="text-[9.5px] font-mono">
                            {proj.link}
                          </span>
                        )}
                      </div>
                      {proj.bullets && proj.bullets.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.48] mt-0.5">
                          {proj.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      ) : proj.description ? (
                        <p className="text-[10px] text-slate-600 leading-snug mt-0.5 whitespace-pre-line">
                          {proj.description}
                        </p>
                      ) : null}
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
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200 mb-2 font-mono"
                >
                  {pageData?.educationTitle || 'Education'}
                </h2>
                <div className="space-y-2">
                  {educations.map((edu: any, idx: number) => {
                    const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                    return (
                      <div key={edu.id || idx} className="break-inside-avoid cv-item">
                        <div className="flex justify-between items-baseline gap-3">
                          <span className="font-bold text-slate-900 text-[11px]">
                            {edu.qualification}
                          </span>
                          {dateDisplay && (
                            <span className="text-[9.5px] font-mono text-slate-500 tabular-nums whitespace-nowrap">
                              {dateDisplay}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-baseline text-[10px] text-slate-600">
                          <span>
                            {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                          </span>
                          {edu.grade && (
                            <span className="font-semibold text-slate-800">{edu.grade}</span>
                          )}
                        </div>
                        {edu.description && (
                          <p className="text-[9.5px] text-slate-500 mt-0.5 leading-snug whitespace-pre-line">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (secKey === 'certifications') {
            if (certifications.length === 0) return null;
            return (
              <section key="certifications" className="break-inside-avoid cv-section text-[10px] text-slate-700">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200 mb-1.5 font-mono"
                >
                  Certifications & Licences
                </h2>
                <p>{certifications.join(' · ')}</p>
              </section>
            );
          }

          if (secKey === 'languages') {
            if (!languagesText) return null;
            return (
              <section key="languages" className="break-inside-avoid cv-section text-[10px] text-slate-700">
                <div>
                  <strong className="font-mono text-[9.5px] uppercase text-slate-900">
                    Languages:{' '}
                  </strong>
                  <span>{languagesText}</span>
                </div>
              </section>
            );
          }

          if (secKey === 'awards') {
            if (awards.length === 0) return null;
            return (
              <section key="awards" className="break-inside-avoid cv-section text-[10px] text-slate-700">
                <div>
                  <strong className="font-mono text-[9.5px] uppercase text-slate-900">
                    Honours & Awards:{' '}
                  </strong>
                  <span>{awards.join(' · ')}</span>
                </div>
              </section>
            );
          }

          if (secKey === 'interests') {
            if (!interestsText) return null;
            return (
              <section key="interests" className="break-inside-avoid cv-section text-[10px] text-slate-700">
                <div>
                  <strong className="font-mono text-[9.5px] uppercase text-slate-900">
                    Interests:{' '}
                  </strong>
                  <span>{interestsText}</span>
                </div>
              </section>
            );
          }

          if (secKey === 'custom') {
            if (customSections.length === 0) return null;
            return (
              <React.Fragment key="custom">
                {customSections.map((sec) => (
                  <section key={sec.id} className="break-inside-avoid cv-section">
                    <h2
                      style={{ color: accent }}
                      className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200 mb-1.5 font-mono"
                    >
                      {sec.title || 'Additional Details'}
                    </h2>
                    {sec.bullets && sec.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.48]">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[10px] text-slate-700 leading-[1.48] whitespace-pre-line">
                        {sec.content}
                      </p>
                    )}
                  </section>
                ))}
              </React.Fragment>
            );
          }

          if (secKey === 'references') {
            if (!references) return null;
            return (
              <section key="references" className="break-inside-avoid cv-section text-[10px] text-slate-700">
                <div>
                  <strong className="font-mono text-[9.5px] uppercase text-slate-900">
                    References:{' '}
                  </strong>
                  <span className="whitespace-pre-line">{references}</span>
                </div>
              </section>
            );
          }

          return null;
        })}

        {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
      </div>

      {totalPages > 1 && (
        <footer className="pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] font-mono text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
