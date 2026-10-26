import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface EdinburghTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function EdinburghTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: EdinburghTemplateProps) {
  const accent = cv.settings.accentColor || '#1A365D';
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
          <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Executive Summary
            </h2>
          </div>
          <p className="text-[10.5px] leading-[1.65] text-slate-700 whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-2.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              {pageData?.experienceTitle || 'Professional Experience'}
            </h2>
          </div>
          <div className="space-y-4 min-w-0">
            {experiences.map((exp: any, idx: number) => {
              const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
              return (
                <div key={exp.id || idx} className="break-inside-avoid cv-item min-w-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11.5px] break-words [overflow-wrap:anywhere]">{exp.role}</span>
                    {dateDisplay && (
                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] text-slate-700 mb-1">
                    <span className="font-semibold italic break-words [overflow-wrap:anywhere]">{exp.company}</span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5] min-w-0">
                      {exp.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

    if (key === 'education' && educations && educations.length > 0) {
      return (
        <section key="education" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              {pageData?.educationTitle || 'Education & Credentials'}
            </h2>
          </div>
          <div className="space-y-3 min-w-0">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div key={edu.id || idx} className="break-inside-avoid cv-item min-w-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">
                      {edu.qualification}
                    </span>
                    {dateDisplay && (
                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] text-slate-700">
                    <span className="font-medium break-words [overflow-wrap:anywhere]">{edu.institution}</span>
                    {edu.grade && <span className="font-semibold text-slate-900">{edu.grade}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-snug whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

    if (key === 'skills' && allSkills.length > 0) {
      return (
        <section key="skills" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Core Competencies
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {allSkills.map((sk, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}
                className="text-[10px] font-medium px-2.5 py-0.5 rounded text-slate-800 border"
              >
                {sk}
              </span>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'projects' && projects.length > 0) {
      return (
        <section key="projects" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              {projectTitle}
            </h2>
          </div>
          <div className="space-y-3 min-w-0">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="break-inside-avoid cv-item min-w-0">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">{proj.title}</span>
                  {proj.link && (
                    <span style={{ color: accent }} className="text-[9.5px] truncate max-w-[200px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.role && <div className="text-[10px] text-slate-500 italic mb-0.5">{proj.role}</div>}
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5] min-w-0">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                    {proj.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'certifications' && certifications.length > 0) {
      return (
        <section key="certifications" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Certifications & Qualifications
            </h2>
          </div>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && languagesText) {
      return (
        <section key="languages" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Languages
            </h2>
          </div>
          <p className="text-[10px] text-slate-700 min-w-0 break-words [overflow-wrap:anywhere]">{languagesText}</p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Honours & Appointments
            </h2>
          </div>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interestsText) {
      return (
        <section key="interests" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Interests & Engagements
            </h2>
          </div>
          <p className="text-[10px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{interestsText}</p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section key={sec.id} className="break-inside-avoid cv-section min-w-0">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
                <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
                <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
                  {sec.title}
                </h2>
              </div>
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
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b" style={{ borderColor: `${accent}30` }}>
            <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: accent }} />
            <h2 style={{ color: accent }} className="text-[11px] font-bold uppercase tracking-[0.1em]">
              References
            </h2>
          </div>
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Edinburgh Scottish Executive Header Band */}
        {isFirstPage ? (
          <header className="border-b-2 px-11 py-7 break-inside-avoid min-w-0" style={{ borderBottomColor: accent, backgroundColor: `${accent}0A` }}>
            <div className="flex items-center justify-between gap-6 min-w-0">
              <div className="flex items-center gap-5 min-w-0 flex-1">
                {showPhoto && (
                  <img
                    src={cv.personal.photoUrl}
                    alt={fullName}
                    referrerPolicy="no-referrer"
                    style={{ borderColor: accent }}
                    className="w-20 h-20 rounded-xl object-cover border-2 shadow-xs shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h1 className="text-[26px] font-bold tracking-tight text-slate-900 leading-tight font-serif break-words [overflow-wrap:anywhere]">
                    {fullName}
                  </h1>
                  {jobTitle && (
                    <p style={{ color: accent }} className="text-[12.5px] font-semibold tracking-wider uppercase mt-1 break-words [overflow-wrap:anywhere]">
                      {jobTitle}
                    </p>
                  )}
                  {contactItems.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-600 mt-2">
                      {contactItems.map((item, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && <span className="text-slate-300">·</span>}
                          <span>{item}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
        ) : (
          <div className="px-11 pt-7 pb-2.5 border-b border-slate-200 flex justify-between items-baseline text-xs break-inside-avoid min-w-0">
            <span className="font-bold text-slate-900 truncate font-serif">{fullName}</span>
            <span className="text-slate-400 text-[10px] tabular-nums whitespace-nowrap">
              Curriculum Vitae · Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="px-11 py-6 space-y-4 flex-1 min-w-0">
          {sectionOrder.map((key) => renderSection(key))}
          {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
        </div>
      </div>

      {totalPages > 1 && (
        <footer className="px-11 py-2.5 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
