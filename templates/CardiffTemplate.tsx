import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface CardiffTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function CardiffTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: CardiffTemplateProps) {
  const accent = cv.settings.accentColor || '#059669'; // Fresh Welsh emerald / modern green
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';
  const photo = cv.personal.photo;

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

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'statement':
        if (!statementText) return null;
        return (
          <section key="statement" className="min-w-0 mb-4 bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"
              style={{ color: accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              Profile & Career Ambition
            </h2>
            <p className="text-[10.5px] leading-relaxed text-slate-800 break-words [overflow-wrap:anywhere] [text-wrap:pretty] whitespace-pre-line">
              {statementText}
            </p>
          </section>
        );

      case 'education':
        if (!educations || educations.length === 0) return null;
        return (
          <section key="education" className="min-w-0 mb-4">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2 flex items-center justify-between"
              style={{ color: accent, borderColor: accent }}
            >
              <span>Academic Background & Qualifications</span>
              <span className="text-[9.5px] font-semibold text-slate-400 capitalize">Honours & Grades</span>
            </h2>
            <div className="space-y-2.5">
              {educations.map((edu: any, idx: number) => (
                <div key={idx} className="min-w-0 flex justify-between items-start text-[10.5px]">
                  <div className="min-w-0 pr-3">
                    <div className="font-bold text-slate-900 break-words">
                      {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </div>
                    <div className="text-[10px] text-slate-600">
                      {edu.institution}
                      {edu.grade && (
                        <span className="inline-block ml-1.5 px-1.5 py-0.2 bg-emerald-100/70 text-emerald-800 font-semibold rounded text-[9.5px]">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium shrink-0">
                    {edu.startDate ? `${edu.startDate} – ` : ''}
                    {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (!experiences || experiences.length === 0) return null;
        return (
          <section key="experience" className="min-w-0 mb-4">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Professional Experience & Placements
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => (
                <div key={idx} className="min-w-0 pl-3 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline min-w-0 flex-wrap gap-1 mb-0.5">
                    <span className="text-[11.5px] font-bold text-slate-900 break-words">
                      {exp.position}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-700 font-medium mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-500 font-normal"> · {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-[10px] text-slate-700 leading-relaxed break-words [overflow-wrap:anywhere] [text-wrap:pretty] whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-[10px] text-slate-700 list-disc list-outside pl-4 leading-relaxed">
                      {exp.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (allSkills.length === 0 && (!cv.skills || cv.skills.length === 0)) return null;
        return (
          <section key="skills" className="min-w-0 mb-4">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Key Skills & Tooling
            </h2>
            {cv.skills && cv.skills.some((s) => s.category) ? (
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                {cv.skills.map((cat, idx) => (
                  <div key={idx} className="min-w-0 bg-slate-50 p-2 rounded border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">{cat.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-800 rounded text-[9.5px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {allSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-[10px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  const hasContent =
    fullName !== 'Your Name' ||
    Boolean(jobTitle) ||
    Boolean(statementText) ||
    (experiences && experiences.length > 0) ||
    (educations && educations.length > 0);

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border bg-white text-slate-900 px-10 py-9 flex flex-col justify-between overflow-hidden select-text font-sans"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
      }}
    >
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Header - Modern Cardiff Banner with Optional Photo */}
        {isFirstPage && (
          <header className="min-w-0 pb-4 mb-4 border-b-2 border-slate-200">
            <div className="flex items-center gap-5">
              {photo && (
                <div className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={fullName}
                    className="w-20 h-20 rounded-xl object-cover border-2 shadow-sm"
                    style={{ borderColor: accent }}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-[25px] font-extrabold text-slate-950 tracking-tight break-words leading-none">
                    {fullName}
                  </h1>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: accent }}
                  >
                    Cardiff Standard
                  </span>
                </div>
                {jobTitle && (
                  <p
                    className="text-[12.5px] font-semibold mt-1"
                    style={{ color: accent }}
                  >
                    {jobTitle}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600">
                  {email && <span>{email}</span>}
                  {phone && <span>· {phone}</span>}
                  {location && <span>· {location}</span>}
                  {linkedin && <span>· {linkedin}</span>}
                  {website && <span>· {website}</span>}
                  {optionalPersonalMeta.map((item, idx) => (
                    <span key={idx}>· {item}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Continuation Header */}
        {!isFirstPage && (
          <div className="min-w-0 pb-2 mb-3 border-b border-slate-300 flex justify-between items-baseline text-[9px] text-slate-500 font-medium">
            <span className="font-bold text-slate-800">{fullName} — Curriculum Vitae</span>
            <span>Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Dynamic Ordered Sections */}
        <div className="min-w-0 flex-1">
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}

          {/* Optional Sections: Projects / Portfolios */}
          {projects && projects.length > 0 && (
            <section className="min-w-0 mb-4">
              <h2
                className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                {projectTitle || 'Key Projects & Applied Work'}
              </h2>
              <div className="space-y-2">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="min-w-0 text-[10.5px]">
                    <div className="font-bold text-slate-900 break-words">{proj.name}</div>
                    {proj.description && (
                      <p className="text-[10px] text-slate-700 leading-relaxed break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications and Accreditations */}
          {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
            <section className="min-w-0 mb-4">
              <h2
                className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                Certifications & Achievements
              </h2>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {certifications &&
                  certifications.map((cert: any, idx: number) => (
                    <div key={idx} className="min-w-0">
                      <span className="font-semibold text-slate-900">{cert.name || cert}</span>
                      {cert.issuer && <span className="text-slate-500"> — {cert.issuer}</span>}
                    </div>
                  ))}
                {awards &&
                  awards.map((award: any, idx: number) => (
                    <div key={idx} className="min-w-0">
                      <span className="font-semibold text-slate-900">{award.name || award}</span>
                      {award.issuer && <span className="text-slate-500"> — {award.issuer}</span>}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Languages & Interests */}
          {(languagesText || interestsText) && isLastPage && (
            <div className="min-w-0 grid grid-cols-2 gap-4 text-[10px] pt-2 border-t border-slate-200">
              {languagesText && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Bilingual / Languages:</span>
                  <span className="text-slate-800">{languagesText}</span>
                </div>
              )}
              {interestsText && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Interests & Extracurriculars:</span>
                  <span className="text-slate-800">{interestsText}</span>
                </div>
              )}
            </div>
          )}

          {/* References */}
          {references && isLastPage && (
            <div className="min-w-0 mt-3 pt-2 border-t border-slate-200 text-[9.5px] text-slate-500">
              <span className="font-bold text-slate-700">References:</span> {references}
            </div>
          )}

          {!hasContent && <EmptyCvGuide />}
        </div>
      </div>

      {/* Footer */}
      <footer className="min-w-0 pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-400">
        <span>Cardiff Modern Progression CV Standard</span>
        <span>
          Page {pageIndex + 1} of {totalPages}
        </span>
      </footer>
    </div>
  );
}
