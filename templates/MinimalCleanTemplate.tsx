import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

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

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    !languagesText &&
    !interestsText &&
    (cv.projects || []).length === 0 &&
    (cv.certifications || []).length === 0 &&
    (cv.awards || []).length === 0 &&
    (cv.customSections || []).length === 0 &&
    !cv.references?.trim();

  const sectionOrder = resolveTemplateSectionOrder(cv);

  const renderSection = (key: string) => {
    if (key === 'statement' && statementText?.trim()) {
      return (
        <section key="statement" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Profile
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-[1.6] whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty] min-w-0">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="space-y-3.5 break-inside-avoid cv-section min-w-0">
          <div className="border-b border-slate-100 pb-1">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em]">
              {pageData?.experienceTitle || 'Experience'}
            </h2>
          </div>
          <div className="space-y-4 min-w-0">
            {experiences.map((exp: any, idx: number) => {
              const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
              return (
                <div
                  key={exp.id || idx}
                  className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-item min-w-0"
                >
                  <div className="text-[10px] font-medium text-slate-400 tabular-nums pt-0.5 min-w-0">
                    {dateDisplay}
                  </div>
                  <div className="min-w-0">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="font-bold text-slate-900 text-[11.5px] break-words [overflow-wrap:anywhere]">{exp.role}</span>
                      {exp.location && (
                        <span className="text-[10px] text-slate-400 break-words [overflow-wrap:anywhere]">{exp.location}</span>
                      )}
                    </div>
                    <div style={{ color: accent }} className="text-[10.5px] font-semibold mb-1 break-words [overflow-wrap:anywhere]">
                      {exp.company}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 ? (
                      <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-600 leading-[1.5] min-w-0">
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
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    if (key === 'education' && educations && educations.length > 0) {
      return (
        <section key="education" className="space-y-3 break-inside-avoid cv-section min-w-0">
          <div className="border-b border-slate-100 pb-1">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em]">
              {pageData?.educationTitle || 'Education'}
            </h2>
          </div>
          <div className="space-y-3 min-w-0">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div
                  key={edu.id || idx}
                  className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-item min-w-0"
                >
                  <div className="text-[10px] font-medium text-slate-400 tabular-nums pt-0.5 min-w-0">
                    {dateDisplay}
                  </div>
                  <div className="min-w-0">
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">
                        {edu.qualification}
                      </span>
                      {edu.grade && (
                        <span className="text-[10px] font-semibold text-slate-700">{edu.grade}</span>
                      )}
                    </div>
                    <div style={{ color: accent }} className="text-[10.5px] font-medium break-words [overflow-wrap:anywhere]">
                      {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                    </div>
                    {edu.bullets && edu.bullets.length > 0 ? (
                      <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-500 mt-0.5 leading-snug min-w-0">
                        {edu.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                        ))}
                      </ul>
                    ) : edu.description ? (
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                        {edu.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    const shouldShowSkills = pageData ? Boolean(pageData.showSkills) : isFirstPage;
    const shouldShowLanguages = pageData
      ? Boolean(pageData.showLanguages)
      : isLastPage || totalPages === 1;
    const shouldShowInterests = pageData
      ? Boolean(pageData.showInterests)
      : isLastPage || totalPages === 1;

    if (key === 'skills' && allSkills.length > 0 && shouldShowSkills) {
      return (
        <section key="skills" className="grid grid-cols-[135px_1fr] gap-5 pt-1 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Skills
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">
            {allSkills.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'projects' && projects.length > 0) {
      return (
        <section key="projects" className="space-y-3 break-inside-avoid cv-section min-w-0">
          <div className="border-b border-slate-100 pb-1">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em]">
              {projectTitle}
            </h2>
          </div>
          <div className="space-y-3 min-w-0">
            {projects.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-item min-w-0"
              >
                <div className="text-[10px] font-medium text-slate-400 truncate pt-0.5 min-w-0">
                  {proj.role || 'Project'}
                </div>
                <div className="min-w-0">
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="font-bold text-slate-900 text-[11px] break-words [overflow-wrap:anywhere]">{proj.title}</span>
                    {proj.link && (
                      <span style={{ color: accent }} className="text-[9.5px] truncate max-w-[180px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.bullets && proj.bullets.length > 0 ? (
                    <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-600 leading-[1.5] mt-0.5 min-w-0">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                      ))}
                    </ul>
                  ) : proj.description ? (
                    <p className="text-[10px] text-slate-600 leading-[1.5] mt-0.5 whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                      {proj.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'certifications' && certifications.length > 0) {
      return (
        <section key="certifications" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Certifications
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && languagesText && shouldShowLanguages) {
      return (
        <section key="languages" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Languages
          </h2>
          <p className="text-[10.5px] text-slate-700 min-w-0 break-words [overflow-wrap:anywhere]">{languagesText}</p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Awards
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interestsText && shouldShowInterests) {
      return (
        <section key="interests" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            Interests
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{interestsText}</p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section
              key={sec.id}
              className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0"
            >
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
                {sec.title}
              </h2>
              <div className="min-w-0">
                {sec.bullets && sec.bullets.length > 0 ? (
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-600 leading-[1.5] min-w-0">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                    ))}
                  </ul>
                ) : sec.content ? (
                  <p className="text-[10.5px] text-slate-700 leading-relaxed whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                    {sec.content}
                  </p>
                ) : null}
              </div>
            </section>
          ))}
        </React.Fragment>
      );
    }

    if (key === 'references' && references.trim()) {
      return (
        <section key="references" className="grid grid-cols-[135px_1fr] gap-5 break-inside-avoid cv-section min-w-0">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] pt-0.5 min-w-0">
            References
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {references}
          </p>
        </section>
      );
    }

    return null;
  };

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-12 py-11 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-5 min-w-0">
        {/* Swiss Minimal Header */}
        {isFirstPage ? (
          <header className="border-b border-slate-200 pb-5 break-inside-avoid min-w-0">
            <h1 className="text-[28px] font-bold tracking-tight text-slate-950 leading-none">
              {fullName}
            </h1>
            {jobTitle && (
              <p style={{ color: accent }} className="text-[13px] font-semibold tracking-wide mt-2">
                {jobTitle}
              </p>
            )}
            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-slate-500 mt-2.5">
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
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-2 text-xs break-inside-avoid">
            <span className="font-semibold text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400 tabular-nums">Page {pageIndex + 1}</span>
          </div>
        )}

        {sectionOrder.map((key) => renderSection(key))}

        {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
      </div>

      {totalPages > 1 && (
        <div className="text-right text-[9px] text-slate-400 pt-2 border-t border-slate-100 tabular-nums">
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  );
}
