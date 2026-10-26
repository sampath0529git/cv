import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface BelfastTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function BelfastTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: BelfastTemplateProps) {
  const accent = cv.settings.accentColor || '#1E3A8A'; // Trust Navy / Royal Clinical Blue
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

  const sectionOrder = resolveTemplateSectionOrder(cv);

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'statement':
        if (!statementText) return null;
        return (
          <section key="statement" className="min-w-0 mb-4">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2 flex items-center justify-between"
              style={{ color: accent, borderColor: accent }}
            >
              <span>Clinical Profile & Research Focus</span>
              <span className="text-[9px] font-normal text-slate-500 uppercase tracking-normal">
                Curriculum Vitae
              </span>
            </h2>
            <p className="text-[10.5px] leading-relaxed text-slate-800 break-words [overflow-wrap:anywhere] [text-wrap:pretty] whitespace-pre-line text-justify">
              {statementText}
            </p>
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
              Clinical Appointments & Hospital Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => (
                <div key={idx} className="min-w-0">
                  <div className="flex justify-between items-baseline min-w-0 flex-wrap gap-1 mb-0.5">
                    <span className="text-[11.5px] font-bold text-slate-900 break-words font-serif">
                      {exp.position}
                    </span>
                    <span className="text-[10px] font-medium text-slate-600 shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-700 font-medium mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-500 font-normal"> — {exp.location}</span>}
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

      case 'education':
        if (!educations || educations.length === 0) return null;
        return (
          <section key="education" className="min-w-0 mb-4">
            <h2
              className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Medical Degrees & Higher Qualifications
            </h2>
            <div className="space-y-2">
              {educations.map((edu: any, idx: number) => (
                <div key={idx} className="min-w-0 flex justify-between items-start text-[10.5px]">
                  <div className="min-w-0 pr-3">
                    <div className="font-bold text-slate-900 break-words font-serif">
                      {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </div>
                    <div className="text-[10px] text-slate-600">
                      {edu.institution}
                      {edu.grade && <span className="text-slate-800 font-semibold ml-1">({edu.grade})</span>}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 shrink-0 font-medium">
                    {edu.startDate ? `${edu.startDate} – ` : ''}
                    {edu.endDate}
                  </div>
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
              Clinical Competencies & Governance
            </h2>
            {cv.skills && cv.skills.some((s) => s.category) ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                {cv.skills.map((cat, idx) => (
                  <div key={idx} className="min-w-0">
                    <div className="font-bold text-slate-900 mb-0.5">{cat.category}</div>
                    <div className="text-slate-700 leading-relaxed break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                      {cat.items.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[10.5px] text-slate-800 leading-relaxed break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                {allSkills.join(' · ')}
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
        {/* Header - Trust / NHS / Academic Medical Banner */}
        {isFirstPage && (
          <header className="min-w-0 pb-4 mb-4 border-b-2 border-slate-900">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-[26px] font-bold text-slate-950 break-words font-serif leading-tight">
                  {fullName}
                </h1>
                {jobTitle && (
                  <p
                    className="text-[13px] font-semibold tracking-wide uppercase mt-0.5"
                    style={{ color: accent }}
                  >
                    {jobTitle}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600">
                  {email && <span>{email}</span>}
                  {phone && <span>• {phone}</span>}
                  {location && <span>• {location}</span>}
                  {linkedin && <span>• {linkedin}</span>}
                  {website && <span>• {website}</span>}
                </div>
              </div>
              <div className="shrink-0 text-right bg-slate-50 border border-slate-200 px-3 py-2 rounded">
                <div className="text-[9px] uppercase tracking-wider font-bold text-slate-500">
                  Registration & Standing
                </div>
                <div className="text-[11px] font-bold" style={{ color: accent }}>
                  UK GMC / NMC Compliant
                </div>
                <div className="text-[9px] text-slate-600 mt-0.5">Full Professional Reg</div>
              </div>
            </div>
          </header>
        )}

        {/* Continuation Header */}
        {!isFirstPage && (
          <div className="min-w-0 pb-2 mb-3 border-b border-slate-300 flex justify-between items-baseline text-[9.5px] text-slate-500">
            <span className="font-bold text-slate-800 font-serif">{fullName} — Medical Curriculum Vitae</span>
            <span>Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Dynamic Ordered Sections */}
        <div className="min-w-0 flex-1">
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}

          {/* Research & Publications / Projects */}
          {projects && projects.length > 0 && (
            <section className="min-w-0 mb-4">
              <h2
                className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                {projectTitle || 'Peer-Reviewed Publications & Clinical Audits'}
              </h2>
              <div className="space-y-2">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="min-w-0 text-[10px]">
                    <div className="font-bold text-slate-900 break-words">{proj.name}</div>
                    {proj.description && (
                      <p className="text-slate-700 leading-relaxed break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Fellowships, Memberships & Certifications */}
          {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
            <section className="min-w-0 mb-4">
              <h2
                className="text-[12px] font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                Royal College Memberships & Certifications
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

          {/* Languages & Professional Affiliations */}
          {(languagesText || interestsText) && isLastPage && (
            <div className="min-w-0 grid grid-cols-2 gap-4 text-[10px] pt-2 border-t border-slate-200">
              {languagesText && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Languages:</span>
                  <span className="text-slate-800">{languagesText}</span>
                </div>
              )}
              {interestsText && (
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Clinical & Academic Interests:</span>
                  <span className="text-slate-800">{interestsText}</span>
                </div>
              )}
            </div>
          )}

          {/* References */}
          {references && isLastPage && (
            <div className="min-w-0 mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-600">
              <span className="font-bold text-slate-800">Referees:</span> {references}
            </div>
          )}

          {!hasContent && <EmptyCvGuide />}
        </div>
      </div>

      {/* Footer */}
      <footer className="min-w-0 pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-500">
        <span className="font-serif">Belfast Clinical & Academic Trust CV Standard</span>
        <span>
          Page {pageIndex + 1} of {totalPages}
        </span>
      </footer>
    </div>
  );
}
