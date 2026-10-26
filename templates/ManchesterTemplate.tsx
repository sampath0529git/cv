import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  formatOptionalPersonalMeta,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface ManchesterTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function ManchesterTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: ManchesterTemplateProps) {
  const accent = cv.settings.accentColor || '#0284C7';
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
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Technical Profile
            </h2>
            <span className="text-[9px] font-mono text-slate-400">overview</span>
          </div>
          <p className="text-[10px] text-slate-700 leading-[1.6] whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {statementText}
          </p>
        </section>
      );
    }

    if (key === 'skills' && allSkills.length > 0) {
      return (
        <section key="skills" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Technical Stack &amp; Tools
            </h2>
            <span className="text-[9px] font-mono text-slate-400">core competencies</span>
          </div>
          <div className="grid grid-cols-2 gap-2 min-w-0">
            {cv.skills && cv.skills.length > 0 ? (
              cv.skills.map((group, gIdx) => (
                <div key={group.id || gIdx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 min-w-0">
                  <div style={{ color: accent }} className="text-[9.5px] font-bold font-mono uppercase tracking-wider mb-1">
                    {group.category || 'Competency'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {group.items.filter(Boolean).map((item, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[9px] text-slate-800 font-mono">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-wrap gap-1.5 col-span-2">
                {allSkills.map((sk, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[9.5px] font-mono text-slate-800">
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-2.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              {pageData?.experienceTitle || 'Engineering & Work Experience'}
            </h2>
            <span className="text-[9px] font-mono text-slate-400">chronology</span>
          </div>
          <div className="space-y-3.5 min-w-0">
            {experiences.map((exp: any, idx: number) => {
              const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
              return (
                <div key={exp.id || idx} className="break-inside-avoid cv-item min-w-0 border-l-2 pl-3" style={{ borderLeftColor: accent }}>
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-950 text-[11px] break-words [overflow-wrap:anywhere]">{exp.role}</span>
                    {dateDisplay && (
                      <span className="text-[9.5px] font-mono text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10px] text-slate-600 mb-1">
                    <span style={{ color: accent }} className="font-semibold break-words [overflow-wrap:anywhere]">{exp.company}</span>
                    {exp.location && <span className="font-mono text-slate-400">{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-3.5 space-y-0.5 text-[10px] text-slate-700 leading-[1.5] min-w-0">
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

    if (key === 'projects' && projects.length > 0) {
      return (
        <section key="projects" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              {projectTitle}
            </h2>
            <span className="text-[9px] font-mono text-slate-400">code &amp; builds</span>
          </div>
          <div className="space-y-2.5 min-w-0">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="break-inside-avoid cv-item min-w-0 bg-slate-50/70 border border-slate-200/70 rounded-lg p-2.5">
                <div className="flex justify-between items-baseline gap-4">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    <span className="font-bold text-slate-950 text-[11px] break-words [overflow-wrap:anywhere]">{proj.title}</span>
                    {proj.role && <span className="text-[9.5px] font-mono text-slate-500">· {proj.role}</span>}
                  </div>
                  {proj.link && (
                    <span style={{ color: accent }} className="text-[9.5px] font-mono truncate max-w-[180px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc pl-3.5 space-y-0.5 text-[9.5px] text-slate-700 leading-[1.5] mt-1 min-w-0">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[9.5px] text-slate-700 leading-[1.5] mt-1 whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                    {proj.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (key === 'education' && educations && educations.length > 0) {
      return (
        <section key="education" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              {pageData?.educationTitle || 'Education'}
            </h2>
            <span className="text-[9px] font-mono text-slate-400">degrees</span>
          </div>
          <div className="space-y-2.5 min-w-0">
            {educations.map((edu: any, idx: number) => {
              const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
              return (
                <div key={edu.id || idx} className="break-inside-avoid cv-item min-w-0">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-slate-900 text-[10.5px] break-words [overflow-wrap:anywhere]">
                      {edu.qualification}
                    </span>
                    {dateDisplay && (
                      <span className="text-[9.5px] font-mono text-slate-500 whitespace-nowrap tabular-nums">
                        {dateDisplay}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-4 text-[10px] text-slate-600">
                    <span className="break-words [overflow-wrap:anywhere]">{edu.institution}</span>
                    {edu.grade && <span className="font-mono text-slate-900">{edu.grade}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-[9.5px] text-slate-600 mt-0.5 leading-snug whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Certifications &amp; Accreditations
            </h2>
          </div>
          <p className="text-[9.5px] font-mono text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'languages' && languagesText) {
      return (
        <section key="languages" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Languages
            </h2>
          </div>
          <p className="text-[9.5px] font-mono text-slate-700 min-w-0 break-words [overflow-wrap:anywhere]">{languagesText}</p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Honours &amp; Hackathons
            </h2>
          </div>
          <p className="text-[9.5px] font-mono text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interestsText) {
      return (
        <section key="interests" className="break-inside-avoid cv-section min-w-0">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              Interests
            </h2>
          </div>
          <p className="text-[9.5px] text-slate-700 leading-relaxed min-w-0 break-words [overflow-wrap:anywhere]">{interestsText}</p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section key={sec.id} className="break-inside-avoid cv-section min-w-0">
              <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
                <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
                  {sec.title}
                </h2>
              </div>
              {sec.bullets && sec.bullets.length > 0 ? (
                <ul className="list-disc pl-3.5 space-y-0.5 text-[9.5px] text-slate-700 leading-[1.5] min-w-0">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="break-words [overflow-wrap:anywhere] [text-wrap:pretty]">{b}</li>
                  ))}
                </ul>
              ) : sec.content ? (
                <p className="text-[9.5px] text-slate-700 leading-[1.5] whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider font-mono text-slate-900">
              References
            </h2>
          </div>
          <p className="text-[9.5px] text-slate-600 leading-relaxed whitespace-pre-line min-w-0 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
            {references}
          </p>
        </section>
      );
    }

    return null;
  };

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-10 py-8 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-3.5 min-w-0">
        {/* Manchester Industrial Tech Header */}
        {isFirstPage ? (
          <header className="pb-3 border-b-2 border-slate-900 break-inside-avoid min-w-0">
            <div className="flex justify-between items-baseline gap-4 min-w-0">
              <h1 className="text-[25px] font-black tracking-tight text-slate-950 leading-none break-words [overflow-wrap:anywhere]">
                {fullName}
              </h1>
              {jobTitle && (
                <div style={{ color: accent }} className="text-[11.5px] font-bold font-mono uppercase tracking-wider">
                  {jobTitle}
                </div>
              )}
            </div>
            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[9.5px] font-mono text-slate-500 mt-2">
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
          <div className="pb-2 border-b border-slate-200 flex justify-between items-baseline text-xs break-inside-avoid min-w-0">
            <span className="font-bold text-slate-900 truncate font-mono">{fullName}</span>
            <span className="text-slate-400 font-mono text-[9.5px] tabular-nums whitespace-nowrap">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {/* Dynamic Sections */}
        {sectionOrder.map((key) => renderSection(key))}
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
