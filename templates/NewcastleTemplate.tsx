import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface NewcastleTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function NewcastleTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: NewcastleTemplateProps) {
  const accent = cv.settings.accentColor || '#0F766E'; // Crisp teal/slate tech tone
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
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-300">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                01 //
              </span>
              <h2
                className="text-[12px] font-bold uppercase tracking-wider font-mono"
                style={{ color: accent }}
              >
                Engineering Synopsis
              </h2>
            </div>
            <p className="text-[10.5px] leading-[1.55] text-slate-800 break-words [overflow-wrap:anywhere] [text-wrap:pretty] whitespace-pre-line font-sans">
              {statementText}
            </p>
          </section>
        );

      case 'skills':
        if (allSkills.length === 0 && (!cv.skills || cv.skills.length === 0)) return null;
        return (
          <section key="skills" className="min-w-0 mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-300">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                02 //
              </span>
              <h2
                className="text-[12px] font-bold uppercase tracking-wider font-mono"
                style={{ color: accent }}
              >
                Technical Stack & Capabilities
              </h2>
            </div>
            {cv.skills && cv.skills.some((s) => s.category) ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {cv.skills.map((cat, idx) => (
                  <div key={idx} className="min-w-0 bg-slate-50/70 p-2 rounded border border-slate-200">
                    <div className="text-[10px] font-mono font-bold text-slate-900 mb-1 flex items-center justify-between">
                      <span>{cat.category || 'Competencies'}</span>
                      <span className="text-[8.5px] text-slate-400 font-mono">[{cat.items.length}]</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-block px-1.5 py-0.5 text-[9.5px] font-mono bg-white border border-slate-200 text-slate-800 rounded-sm"
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
                    className="inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-300 text-slate-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        );

      case 'experience':
        if (!experiences || experiences.length === 0) return null;
        return (
          <section key="experience" className="min-w-0 mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-300">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                03 //
              </span>
              <h2
                className="text-[12px] font-bold uppercase tracking-wider font-mono"
                style={{ color: accent }}
              >
                Professional & Engineering Experience
              </h2>
            </div>
            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => (
                <div key={idx} className="min-w-0 pl-2.5 border-l-2" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-baseline min-w-0 flex-wrap gap-1 mb-0.5">
                    <span className="text-[11.5px] font-bold text-slate-900 break-words font-sans">
                      {exp.position}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-slate-500 shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono mb-1">
                    <span className="font-semibold text-slate-800">{exp.company}</span>
                    {exp.location && <span>· {exp.location}</span>}
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
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-300">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                04 //
              </span>
              <h2
                className="text-[12px] font-bold uppercase tracking-wider font-mono"
                style={{ color: accent }}
              >
                Education & Credentials
              </h2>
            </div>
            <div className="space-y-2">
              {educations.map((edu: any, idx: number) => (
                <div key={idx} className="min-w-0 flex justify-between items-start text-[10.5px]">
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 break-words font-sans">
                      {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">
                      {edu.institution}
                      {edu.grade && <span className="text-slate-800 font-semibold ml-1">[{edu.grade}]</span>}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 shrink-0">
                    {edu.startDate ? `${edu.startDate} – ` : ''}
                    {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
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
        {/* Header - Terminal / Monospaced Tabular Header */}
        {isFirstPage && (
          <header className="min-w-0 pb-4 mb-4 border-b-2 border-slate-900">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: accent }} />
                  <span>CANDIDATE DOSSIER // REVISION 2026</span>
                </div>
                <h1 className="text-[26px] font-black tracking-tight text-slate-950 uppercase break-words font-sans leading-none mb-1">
                  {fullName}
                </h1>
                {jobTitle && (
                  <p
                    className="text-[12.5px] font-mono font-semibold tracking-wide"
                    style={{ color: accent }}
                  >
                    {jobTitle}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right font-mono text-[9.5px] text-slate-600 space-y-0.5 border border-slate-200 bg-slate-50/80 p-2.5 rounded">
                {email && <div>email: {email}</div>}
                {phone && <div>phone: {phone}</div>}
                {location && <div>loc: {location}</div>}
                {website && <div>web: {website}</div>}
                {linkedin && <div>in: {linkedin}</div>}
              </div>
            </div>
          </header>
        )}

        {/* Continuation Header */}
        {!isFirstPage && (
          <div className="min-w-0 pb-2 mb-3 border-b border-slate-300 flex justify-between items-baseline text-[9px] font-mono text-slate-500">
            <span className="font-bold text-slate-800 uppercase">{fullName} — Curriculum Vitae</span>
            <span>Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Dynamic Ordered Sections */}
        <div className="min-w-0 flex-1">
          {sectionOrder.map((sectionKey) => renderSection(sectionKey))}

          {/* Optional Sections: Projects */}
          {projects && projects.length > 0 && (
            <section className="min-w-0 mb-4">
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-300">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  05 //
                </span>
                <h2
                  className="text-[12px] font-bold uppercase tracking-wider font-mono"
                  style={{ color: accent }}
                >
                  {projectTitle || 'Technical Deployments & Open Source Projects'}
                </h2>
              </div>
              <div className="space-y-2">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="min-w-0 p-2 bg-slate-50/70 border border-slate-200 rounded">
                    <div className="flex justify-between items-baseline text-[10.5px] mb-0.5">
                      <span className="font-bold text-slate-900 break-words font-sans">{proj.name}</span>
                      {proj.link && (
                        <span className="text-[9px] font-mono text-slate-500 shrink-0">{proj.link}</span>
                      )}
                    </div>
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

          {/* Optional Sections: Certifications & Awards Matrix */}
          {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
            <section className="min-w-0 mb-4">
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-300">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  06 //
                </span>
                <h2
                  className="text-[12px] font-bold uppercase tracking-wider font-mono"
                  style={{ color: accent }}
                >
                  Certifications & Verified Credentials
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {certifications &&
                  certifications.map((cert: any, idx: number) => (
                    <div key={idx} className="min-w-0 flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                      <span className="font-semibold text-slate-900 break-words pr-2 font-mono text-[9.5px]">
                        {cert.name || cert}
                      </span>
                      {cert.issuer && <span className="text-[9px] font-mono text-slate-500 shrink-0">{cert.issuer}</span>}
                    </div>
                  ))}
                {awards &&
                  awards.map((award: any, idx: number) => (
                    <div key={idx} className="min-w-0 flex items-center justify-between p-1.5 bg-slate-50 rounded border border-slate-200">
                      <span className="font-semibold text-slate-900 break-words pr-2 font-mono text-[9.5px]">
                        {award.name || award}
                      </span>
                      {award.issuer && <span className="text-[9px] font-mono text-slate-500 shrink-0">{award.issuer}</span>}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Languages & Interests */}
          {(languagesText || interestsText) && isLastPage && (
            <div className="min-w-0 grid grid-cols-2 gap-4 text-[10px] font-mono pt-2 border-t border-slate-200">
              {languagesText && (
                <div>
                  <span className="text-slate-500 font-bold uppercase block mb-0.5">LANGUAGES:</span>
                  <span className="text-slate-800">{languagesText}</span>
                </div>
              )}
              {interestsText && (
                <div>
                  <span className="text-slate-500 font-bold uppercase block mb-0.5">TECHNICAL INTERESTS:</span>
                  <span className="text-slate-800">{interestsText}</span>
                </div>
              )}
            </div>
          )}

          {/* References */}
          {references && isLastPage && (
            <div className="min-w-0 mt-3 pt-2 border-t border-slate-200 text-[9.5px] font-mono text-slate-500">
              <span className="font-bold text-slate-700">REFERENCES:</span> {references}
            </div>
          )}

          {!hasContent && <EmptyCvGuide />}
        </div>
      </div>

      {/* Footer */}
      <footer className="min-w-0 pt-2 border-t border-slate-200 flex justify-between items-center text-[8.5px] font-mono text-slate-400">
        <span>NEWCASTLE ATS ENGINEERING FORMAT</span>
        <span>
          PAGE {pageIndex + 1} OF {totalPages}
        </span>
      </footer>
    </div>
  );
}
