import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

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
  const accent = cv.settings.accentColor || '#4B4DED';
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

  const showSkillsSection =
    pageData?.showSkills !== undefined ? pageData.showSkills : isFirstPage && allSkills.length > 0;
  const showLanguagesSection =
    pageData?.showLanguages !== undefined
      ? pageData.showLanguages
      : (isLastPage || totalPages === 1) && cv.languages && cv.languages.length > 0;
  const showInterestsSection =
    pageData?.showInterests !== undefined
      ? pageData.showInterests
      : (isLastPage || totalPages === 1) && cv.interests && cv.interests.length > 0;

  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(' · ')
      : '';
  const interestsText = cv.interests && cv.interests.length > 0 ? cv.interests.join(' · ') : '';

  const optionalPersonalMeta = formatOptionalPersonalMeta(cv);
  const { projects, projectTitle, certifications, awards, customSections, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

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

  const contactItems = [email, phone, location, linkedin, website, ...optionalPersonalMeta].filter(
    Boolean
  );
  const sectionOrder = resolveTemplateSectionOrder(cv);

  const renderSection = (key: string) => {
    if (key === 'statement' && statementText?.trim()) {
      return (
        <section key="statement" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-2 border-b"
          >
            Executive Profile
          </h2>
          <p className="text-[10.5px] leading-[1.6] text-slate-700 whitespace-pre-line">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-3 border-b"
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
                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] mb-1.5">
                    <span style={{ color: accent }} className="font-semibold">
                      {exp.company}
                    </span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-700 leading-[1.5]">
                      {exp.bullets.map((bullet: string, bIdx: number) => (
                        <li key={bIdx} className="break-inside-avoid">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[10px] text-slate-700 whitespace-pre-line leading-[1.5]">
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
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-2.5 border-b"
          >
            {pageData?.educationTitle || 'Education & Credentials'}
          </h2>
          <div className="space-y-3">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div key={edu.id || idx} className="break-inside-avoid cv-item">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[11px]">
                      {edu.qualification}
                    </span>
                    {dateDisplay && (
                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10.5px] text-slate-600">
                    <span className="font-medium text-slate-800">{edu.institution}</span>
                    {(edu.location || edu.grade) && (
                      <span className="text-slate-600 font-medium">
                        {[edu.grade, edu.location].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </div>
                  {edu.bullets && edu.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-600 mt-0.5 leading-snug">
                      {edu.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  ) : edu.description ? (
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
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

    if (key === 'skills' && showSkillsSection && allSkills.length > 0) {
      return (
        <section key="skills" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-2 border-b"
          >
            Core Competencies & Skills
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {allSkills.map((sk, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}22` }}
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
        <section key="projects" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-2.5 border-b"
          >
            {projectTitle}
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="break-inside-avoid cv-item">
                <div className="flex justify-between items-baseline gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-[11px]">{proj.title}</span>
                    {proj.role && (
                      <span style={{ color: accent }} className="text-[10px] font-semibold">
                        · {proj.role}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="text-[9.5px] text-slate-500 truncate max-w-[200px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-[1.5] mt-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[10px] text-slate-700 leading-[1.5] mt-0.5 whitespace-pre-line">
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
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
          >
            Certifications & Licences
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && showLanguagesSection && languagesText) {
      return (
        <section key="languages" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
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
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
          >
            Honours & Awards
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && showInterestsSection && interestsText) {
      return (
        <section key="interests" className="break-inside-avoid cv-section">
          <h2
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
          >
            Interests & Activities
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
                style={{ color: accent, borderBottomColor: `${accent}26` }}
                className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
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
            style={{ color: accent, borderBottomColor: `${accent}26` }}
            className="text-[11px] font-bold uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b"
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
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Accent Header */}
        {isFirstPage ? (
          <header
            style={{ backgroundColor: accent }}
            className="text-white px-11 py-7 break-inside-avoid min-w-0"
          >
            <div className="flex items-center justify-between gap-6 min-w-0">
              <div className="flex items-center gap-4 min-w-0">
                {showPhoto && (
                  <img
                    src={cv.personal.photoUrl}
                    alt={fullName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/80 shrink-0 shadow-xs"
                  />
                )}
                <div className="min-w-0">
                  <h1 className="text-[26px] font-bold tracking-tight text-white leading-tight break-words [overflow-wrap:anywhere]">
                    {fullName}
                  </h1>
                  {jobTitle && (
                    <p className="text-[13px] font-medium text-white/90 mt-1 tracking-wide break-words [overflow-wrap:anywhere]">
                      {jobTitle}
                    </p>
                  )}
                </div>
              </div>

              {contactItems.length > 0 && (
                <div className="text-[10px] text-white/90 text-right space-y-0.5 leading-snug shrink-0 max-w-[260px] min-w-0">
                  {email && <div className="truncate">{email}</div>}
                  {phone && <div className="tabular-nums">{phone}</div>}
                  {location && <div>{location}</div>}
                  {linkedin && <div className="truncate">{linkedin}</div>}
                  {website && <div className="truncate">{website}</div>}
                  {optionalPersonalMeta.length > 0 && (
                    <div className="text-white/85 pt-0.5">
                      {optionalPersonalMeta.join(' · ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>
        ) : (
          <div className="px-11 pt-7 pb-2.5 border-b border-slate-200 flex justify-between items-baseline text-xs break-inside-avoid min-w-0">
            <span className="font-bold text-slate-900 truncate">{fullName}</span>
            <span className="text-slate-400 text-[10px] tabular-nums whitespace-nowrap">
              Curriculum Vitae · Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="px-11 py-7 space-y-5 flex-1 min-w-0">
          {sectionOrder.map((key) => renderSection(key))}
          {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
        </div>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <footer className="px-11 py-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 tabular-nums">
          <span>{fullName}</span>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      )}
    </div>
  );
}
