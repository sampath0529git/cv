import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
  getSkillBarWidth,
} from './shared/templateHelpers';

interface BristolTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function BristolTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: BristolTemplateProps) {
  const accent = cv.settings.accentColor || '#7C3AED';
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';
  const showPhoto = Boolean(cv.personal.photoUrl && cv.settings.showPhoto);

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
  const educations =
    pageData?.educations !== undefined ? pageData.educations : isFirstPage ? cv.education : [];
  const allSkills =
    cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const statementText =
    pageData?.showStatement !== undefined
      ? pageData.showStatement
        ? pageData.statementText || cv.personalStatement
        : ''
      : isFirstPage
      ? cv.personalStatement
      : '';

  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(' · ')
      : '';
  const interestsText = cv.interests && cv.interests.length > 0 ? cv.interests.join(' · ') : '';

  const optionalPersonalMeta = formatOptionalPersonalMeta(cv);
  const { projects, projectTitle, certifications, awards, customSections, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

  const contactItems = [email, phone, location, linkedin, website, ...optionalPersonalMeta].filter(
    Boolean
  );
  const sectionOrder = resolveTemplateSectionOrder(cv);
  const isCompletelyEmpty =
    (!fullName || fullName === 'Your Name') &&
    !jobTitle &&
    !statementText &&
    (!experiences || experiences.length === 0) &&
    (!educations || educations.length === 0);

  const renderSection = (key: string) => {
    if (key === 'statement' && statementText?.trim()) {
      return (
        <section key="statement" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Creative Profile</span>
          </h2>
          <p className="text-[10.5px] leading-[1.65] text-slate-700 whitespace-pre-line pl-3 border-l-2 border-slate-100 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'projects' && projects.length > 0) {
      return (
        <section key="projects" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{projectTitle || 'Selected Portfolio Works'}</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 min-w-0">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="break-inside-avoid cv-item min-w-0 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">{proj.title}</span>
                  {proj.link && (
                    <span style={{ color: accent }} className="text-[9.5px] font-medium truncate max-w-[130px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.role && <div className="text-[9.5px] text-slate-500 font-medium mt-0.5">{proj.role}</div>}
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[9.5px] text-slate-600 mt-1 min-w-0">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[9.5px] text-slate-600 mt-1 whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                    {proj.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{pageData?.experienceTitle || 'Work Experience'}</span>
          </h2>
          <div className="space-y-3.5 min-w-0">
            {experiences.map((exp: any, idx: number) => {
              const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
              return (
                <div key={exp.id || idx} className="break-inside-avoid cv-item min-w-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11.5px] break-words [overflow-wrap:anywhere]">{exp.role}</span>
                    {dateDisplay && (
                      <span className="text-[9.5px] font-semibold text-slate-400 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] mb-1">
                    <span style={{ color: accent }} className="font-semibold break-words [overflow-wrap:anywhere]">{exp.company}</span>
                    {exp.location && <span className="text-slate-400 text-[10px]">{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-600 leading-[1.5] min-w-0">
                      {exp.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[10px] text-slate-600 leading-[1.5] whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

    if (key === 'skills' && allSkills.length > 0) {
      return (
        <section key="skills" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Creative &amp; Technical Skills</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 min-w-0">
            {allSkills.map((sk, idx) => (
              <div key={idx} className="space-y-0.5 min-w-0">
                <div className="flex justify-between text-[10px] font-medium text-slate-700">
                  <span className="truncate">{sk}</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{
                      backgroundColor: accent,
                      width: getSkillBarWidth(sk, idx, cv.skillLevels),
                    }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'education' && educations && educations.length > 0) {
      return (
        <section key="education" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{pageData?.educationTitle || 'Education'}</span>
          </h2>
          <div className="space-y-2.5 min-w-0">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div key={edu.id || idx} className="break-inside-avoid cv-item min-w-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">
                      {edu.qualification}
                    </span>
                    {dateDisplay && (
                      <span className="text-[9.5px] font-semibold text-slate-400 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10px] text-slate-600">
                    <span className="break-words [overflow-wrap:anywhere]">{edu.institution}</span>
                    {edu.grade && <span style={{ color: accent }} className="font-semibold">{edu.grade}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-[9.5px] text-slate-500 mt-0.5 leading-snug whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

    if (key === 'certifications' && certifications.length > 0) {
      return (
        <section key="certifications" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Certifications</span>
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && languagesText) {
      return (
        <section key="languages" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Languages</span>
          </h2>
          <p className="text-[10px] text-slate-700 min-w-0 break-words [overflow-wrap:anywhere]">{languagesText}</p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Design Awards &amp; Recognition</span>
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interestsText) {
      return (
        <section key="interests" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>Interests</span>
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{interestsText}</p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section key={sec.id} className="break-inside-avoid cv-section min-w-0">
              <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
                <span>{sec.title}</span>
              </h2>
              {sec.bullets && sec.bullets.length > 0 ? (
                <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5] min-w-0">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                  ))}
                </ul>
              ) : sec.content ? (
                <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                  {sec.content}
                </p>
              ) : null}
            </section>
          ))}
        </React.Fragment>
      );
    }

    if (key === 'references' && references.trim()) {
      return (
        <section key="references" className="break-inside-avoid cv-section min-w-0">
          <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>References</span>
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {references}
          </p>
        </section>
      );
    }

    return null;
  };

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="flex-1 flex min-w-0">
        {/* Bristol Asymmetric Left Stripe */}
        <div className="w-3 shrink-0" style={{ backgroundColor: accent }} />

        <div className="flex-1 px-10 py-8 flex flex-col justify-between min-w-0">
          <div className="space-y-4 min-w-0">
            {/* Header */}
            {isFirstPage ? (
              <header className="pb-4 border-b border-slate-200 break-inside-avoid min-w-0">
                <div className="flex items-center justify-between gap-5 min-w-0">
                  <div className="min-w-0">
                    <h1 className="text-[27px] font-extrabold tracking-tight text-slate-900 leading-none break-words [overflow-wrap:anywhere]">
                      {fullName}
                    </h1>
                    {jobTitle && (
                      <p style={{ color: accent }} className="text-[13px] font-semibold tracking-wide mt-1.5 break-words [overflow-wrap:anywhere]">
                        {jobTitle}
                      </p>
                    )}
                    {contactItems.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-500 mt-2">
                        {contactItems.map((item, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <span className="text-slate-300">·</span>}
                            <span>{item}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {showPhoto && (
                    <img
                      src={cv.personal.photoUrl}
                      alt={fullName}
                      referrerPolicy="no-referrer"
                      style={{ borderColor: accent }}
                      className="w-18 h-18 rounded-2xl object-cover border-2 shadow-xs shrink-0"
                    />
                  )}
                </div>
              </header>
            ) : (
              <div className="pb-2.5 border-b border-slate-200 flex justify-between items-baseline text-xs break-inside-avoid min-w-0">
                <span className="font-bold text-slate-900 truncate">{fullName}</span>
                <span className="text-slate-400 text-[10px] tabular-nums whitespace-nowrap">
                  Portfolio CV · Page {pageIndex + 1} of {totalPages}
                </span>
              </div>
            )}

            {/* Sections */}
            {sectionOrder.map((key) => renderSection(key))}
            {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
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
      </div>
    </div>
  );
}
