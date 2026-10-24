import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

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
  const accent = cv.settings.accentColor || '#0284c7';
  const fullName = cv.personal.fullName || 'Forename Surname';
  const jobTitle = cv.personal.jobTitle || 'Software Engineer';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;
  const educations = pageData?.educations !== undefined ? pageData.educations : (isFirstPage ? cv.education : []);
  const allSkills = cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];
  const projects = cv.projects || [];
  const certifications = cv.certifications || [];

  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-10 py-8 text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'var(--font-inter, sans-serif)',
      }}
    >
      <div className="space-y-4">
        {/* Header */}
        {isFirstPage ? (
          <header className="border-b-2 border-slate-900 pb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {fullName}
              </h1>
              <span style={{ color: accent }} className="font-semibold text-xs font-mono">
                {jobTitle}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-600 mt-1 font-mono">
              {email && <span>{email}</span>}
              {phone && <span>| {phone}</span>}
              {location && <span>| {location}</span>}
              {linkedin && <span>| {linkedin}</span>}
              {website && <span>| {website}</span>}
            </div>
          </header>
        ) : (
          <div className="flex justify-between items-baseline border-b border-slate-200 pb-1.5 text-xs break-inside-avoid">
            <span className="font-bold text-slate-900">{fullName}</span>
            <span className="font-mono text-[10px] text-slate-500">Page {pageIndex + 1} of {totalPages}</span>
          </div>
        )}

        {/* Technical Summary */}
        {isFirstPage && cv.personalStatement?.trim() && (
          <section className="break-inside-avoid cv-section">
            <p className="text-[10px] text-slate-700 leading-relaxed">
              {cv.personalStatement}
            </p>
          </section>
        )}

        {/* Technical Skills Matrix */}
        {isFirstPage && allSkills.length > 0 && (
          <section className="break-inside-avoid cv-section bg-slate-50 border border-slate-200 rounded-lg p-3">
            <h2 className="text-[10.5px] font-bold text-slate-900 uppercase tracking-wider mb-1.5 font-mono">
              Technical Stack & Key Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {allSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white border border-slate-200 text-slate-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ borderLeftColor: accent }}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 pl-2 border-l-2 mb-2 font-mono"
            >
              Engineering & Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => {
                const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={exp.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-900 text-[11px]">{exp.role}</span>
                        <span className="text-[10.5px] font-semibold text-slate-600">@ {exp.company}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{dateDisplay}</span>
                    </div>
                    {exp.location && (
                      <div className="text-[9.5px] text-slate-400 font-mono mb-1">{exp.location}</div>
                    )}

                    {exp.bullets && exp.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-700 leading-snug">
                        {exp.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-[10px] text-slate-700 leading-snug">{exp.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects (if available) */}
        {projects.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ borderLeftColor: accent }}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 pl-2 border-l-2 mb-2 font-mono"
            >
              Key Technical Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <div key={idx} className="break-inside-avoid cv-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[11px]">{proj.title}</span>
                    {proj.link && <span className="text-[9.5px] font-mono text-blue-600">{proj.link}</span>}
                  </div>
                  <p className="text-[10px] text-slate-600 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Qualifications */}
        {educations && educations.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ borderLeftColor: accent }}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 pl-2 border-l-2 mb-2 font-mono"
            >
              Education & Academic Background
            </h2>
            <div className="space-y-2">
              {educations.map((edu: any, idx: number) => {
                const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                return (
                  <div key={edu.id || idx} className="break-inside-avoid cv-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[11px]">{edu.qualification}</span>
                      <span className="text-[10px] font-mono text-slate-500">{dateDisplay}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10px] text-slate-600">
                      <span>{edu.institution} {edu.location ? `(${edu.location})` : ''}</span>
                      {edu.grade && <span className="font-medium text-slate-800">{edu.grade}</span>}
                    </div>
                    {edu.description && (
                      <p className="text-[9.5px] text-slate-500 mt-0.5 leading-snug">{edu.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Certifications (if any) */}
        {certifications.length > 0 && (
          <section className="break-inside-avoid cv-section">
            <h2
              style={{ borderLeftColor: accent }}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 pl-2 border-l-2 mb-1.5 font-mono"
            >
              Certifications & Licences
            </h2>
            <p className="text-[10px] text-slate-700 font-mono">
              {certifications.join(' • ')}
            </p>
          </section>
        )}
      </div>

      <footer className="pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] font-mono text-slate-400">
        <span>Curriculum Vitae</span>
        <span>Page {pageIndex + 1} of {totalPages}</span>
      </footer>
    </div>
  );
}
