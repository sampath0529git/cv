import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface ClassicCorporateTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function ClassicCorporateTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: ClassicCorporateTemplateProps) {
  const accent = cv.settings.accentColor || '#1E3A8A';
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
        <section key="statement" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-2 border-b border-slate-300"
          >
            Executive Summary
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-[1.6] whitespace-pre-line">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-2.5 border-b border-slate-300"
          >
            {pageData?.experienceTitle || 'Professional Experience'}
          </h2>
          <div className="space-y-4">
            {experiences.map((exp: any, idx: number) => {
              const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
              return (
                <div key={exp.id || idx} className="break-inside-avoid cv-item">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11.5px]">{exp.role}</span>
                    {dateDisplay && (
                      <span className="text-[10px] font-semibold text-slate-600 tabular-nums whitespace-nowrap">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] text-slate-700 mb-1">
                    <span className="font-semibold italic">{exp.company}</span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5]">
                      {exp.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line">
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
        <section key="education" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-2.5 border-b border-slate-300"
          >
            {pageData?.educationTitle || 'Education & Academic Credentials'}
          </h2>
          <div className="space-y-2.5">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div key={edu.id || idx} className="break-inside-avoid cv-item">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11px]">
                      {edu.qualification}
                    </span>
                    {dateDisplay && (
                      <span className="text-[10px] font-semibold text-slate-600 tabular-nums whitespace-nowrap">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] text-slate-700">
                    <span>
                      {edu.institution} {edu.location ? `· ${edu.location}` : ''}
                    </span>
                    {edu.grade && <span className="font-semibold text-slate-900">{edu.grade}</span>}
                  </div>
                  {edu.bullets && edu.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-slate-600 mt-0.5 leading-snug">
                      {edu.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  ) : edu.description ? (
                    <p className="text-[9.5px] text-slate-600 mt-0.5 leading-snug">
                      {edu.description}
                    </p>
                  ) : null}
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
        <section key="skills" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-2 border-b border-slate-300"
          >
            Key Competencies
          </h2>
          <p className="text-[10.5px] text-slate-700 leading-relaxed">
            {allSkills.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'projects' && projects.length > 0) {
      return (
        <section key="projects" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-2 border-b border-slate-300"
          >
            {projectTitle}
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="break-inside-avoid cv-item">
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-bold text-slate-900 text-[11px]">
                    {proj.title}
                    {proj.role ? ` — ${proj.role}` : ''}
                  </span>
                  {proj.link && (
                    <span className="text-[9.5px] text-slate-500 truncate max-w-[200px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5]">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line">
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
        <section key="certifications" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
          >
            Certifications & Licences
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && languagesText && shouldShowLanguages) {
      return (
        <section key="languages" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
          >
            Languages
          </h2>
          <p className="text-[10px] text-slate-700">{languagesText}</p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
          >
            Honours & Achievements
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interestsText && shouldShowInterests) {
      return (
        <section key="interests" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
          >
            Interests
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">{interestsText}</p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section key={sec.id} className="break-inside-avoid cv-section">
              <h2
                style={{ color: accent }}
                className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
              >
                {sec.title}
              </h2>
              {sec.bullets && sec.bullets.length > 0 ? (
                <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5]">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              ) : sec.content ? (
                <p className="text-[10px] text-slate-700 leading-[1.5] whitespace-pre-line">
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
        <section key="references" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.1em] pb-1 mb-1.5 border-b border-slate-300"
          >
            References
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed whitespace-pre-line">
            {references}
          </p>
        </section>
      );
    }

    return null;
  };

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-12 py-10 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-4 min-w-0">
        {/* City Corporate Header with Top Accent Rule */}
        {isFirstPage ? (
          <header
            style={{ borderBottomColor: accent }}
            className="border-b-2 pb-4 break-inside-avoid flex items-center justify-between gap-6 min-w-0"
          >
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-bold tracking-tight text-slate-900 leading-tight break-words [overflow-wrap:anywhere]">
                {fullName}
              </h1>
              {jobTitle && (
                <p style={{ color: accent }} className="text-[12.5px] font-semibold tracking-wide mt-1 break-words [overflow-wrap:anywhere]">
                  {jobTitle}
                </p>
              )}
              {contactItems.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-slate-600 mt-2">
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
                style={{ borderColor: `${accent}40` }}
                className="w-16 h-16 rounded-xl object-cover border shrink-0"
              />
            )}
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-300 pb-1.5 text-xs break-inside-avoid">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="text-[10px] text-slate-400 tabular-nums">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {sectionOrder.map((key) => renderSection(key))}

        {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
      </div>

      {totalPages > 1 && (
        <footer className="pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
