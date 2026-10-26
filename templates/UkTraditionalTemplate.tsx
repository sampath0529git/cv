import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  resolvePaginatedOptionalData,
} from './shared/templateHelpers';

interface UkTraditionalTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function UkTraditionalTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: UkTraditionalTemplateProps) {
  const accent = cv.settings.accentColor || '#000000';
  const rawFullName = cv.personal.fullName || 'Your Name';
  const nameParts = rawFullName.trim().split(/\s+/);
  const forename = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
  const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1].toUpperCase() : '';

  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';
  const dateOfBirth = cv.personal.dateOfBirth || '';
  const nationality = cv.personal.nationality || '';
  const drivingLicence = cv.personal.drivingLicence || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  const educations =
    pageData?.educations !== undefined ? pageData.educations : isFirstPage ? cv.education : [];
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;

  const { projects, projectTitle, certifications, awards, customSections, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(', ')
      : '';

  const interestsText =
    cv.interests && cv.interests.length > 0 ? cv.interests.join('; ') : '';

  const allSkills =
    cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const sectionOrder = resolveTemplateSectionOrder(cv, [
    'statement',
    'education',
    'experience',
    'skills',
    'projects',
    'certifications',
    'languages',
    'awards',
    'interests',
    'custom',
    'references',
  ]);

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    projects.length === 0 &&
    certifications.length === 0 &&
    awards.length === 0 &&
    customSections.length === 0 &&
    !references &&
    !languagesText &&
    !interestsText;

  return (
    <div
      className="cv-template-container w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-12 py-10 text-[11px] leading-relaxed text-black bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="space-y-3.5">
        {/* HEADER: Forename SURNAME (Centered on Page 1) */}
        {isFirstPage ? (
          <header className="text-center pb-2 break-inside-avoid">
            <h1 className="text-[22px] font-bold tracking-normal text-black leading-tight">
              <span>{forename} </span>
              {surname && <span className="uppercase">{surname}</span>}
            </h1>
            {jobTitle && (
              <div style={{ color: accent }} className="text-[11.5px] font-semibold mt-0.5">
                {jobTitle}
              </div>
            )}
            <div className="text-[10.5px] text-neutral-800 mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {email && (
                <span>
                  <strong className="font-semibold">e-mail:</strong> {email}
                </span>
              )}
              {phone && (
                <span className="tabular-nums">
                  <strong className="font-semibold">tel:</strong> {phone}
                </span>
              )}
              {location && (
                <span>
                  <strong className="font-semibold">location:</strong> {location}
                </span>
              )}
              {linkedin && (
                <span>
                  <strong className="font-semibold">linkedin:</strong> {linkedin}
                </span>
              )}
              {website && (
                <span>
                  <strong className="font-semibold">web:</strong> {website}
                </span>
              )}
              {dateOfBirth && (
                <span className="tabular-nums">
                  <strong className="font-semibold">DOB:</strong> {dateOfBirth}
                </span>
              )}
              {nationality && (
                <span>
                  <strong className="font-semibold">nationality:</strong> {nationality}
                </span>
              )}
              {drivingLicence && (
                <span>
                  <strong className="font-semibold">licence:</strong> {drivingLicence}
                </span>
              )}
            </div>
          </header>
        ) : (
          <div
            style={{ borderBottomColor: accent }}
            className="flex justify-between items-baseline border-b pb-1 mb-2 break-inside-avoid"
          >
            <span className="font-bold text-black text-[12px]">
              {forename} {surname}
            </span>
            <span className="italic text-neutral-600 text-[10px]">
              Curriculum Vitae (continued)
            </span>
          </div>
        )}

        {/* Dynamic Sections */}
        {sectionOrder.map((secKey) => {
          if (secKey === 'statement') {
            const shouldShowStatement = pageData ? Boolean(pageData.showStatement) : isFirstPage;
            if (!cv.personalStatement?.trim() || !shouldShowStatement) return null;
            return (
              <section
                key="statement"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                >
                  Professional Summary
                </h2>
                <p className="text-[10.5px] text-neutral-900 leading-[1.55] whitespace-pre-line">
                  {pageData?.statementText || cv.personalStatement}
                </p>
              </section>
            );
          }

          if (secKey === 'education') {
            if (!educations || educations.length === 0) return null;
            return (
              <section
                key="education"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-2 break-after-avoid"
                >
                  {pageData?.educationTitle || 'Education and Qualifications'}
                </h2>
                <div className="space-y-3">
                  {educations.map((edu: any, idx: number) => {
                    const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                    return (
                      <div
                        key={edu.id || idx}
                        className="grid grid-cols-[140px_1fr] gap-4 break-inside-avoid cv-item min-w-0"
                      >
                        <div className="font-bold text-neutral-800 text-[10.5px] leading-snug tabular-nums min-w-0">
                          {dateDisplay}
                        </div>
                        <div className="min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-black break-words [overflow-wrap:anywhere]">
                              {edu.institution || 'University / Institution'}
                            </span>
                            <span className="font-semibold text-black text-right break-words [overflow-wrap:anywhere]">
                              {edu.qualification || 'Degree / Qualification'}
                            </span>
                          </div>
                          {(edu.location || edu.grade) && (
                            <div className="flex justify-between items-baseline text-[10px] text-neutral-700 mt-0.5">
                              <span className="break-words [overflow-wrap:anywhere]">{edu.location || ''}</span>
                              <span className="font-medium">{edu.grade || ''}</span>
                            </div>
                          )}
                          {edu.description && (
                            <p className="text-[10px] text-neutral-800 mt-1 leading-normal whitespace-pre-line break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (secKey === 'experience') {
            if (!experiences || experiences.length === 0) return null;
            return (
              <section
                key="experience"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section min-w-0"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-2 break-after-avoid"
                >
                  {pageData?.experienceTitle || 'Work Experience'}
                </h2>
                <div className="space-y-3.5 min-w-0">
                  {experiences.map((exp: any, idx: number) => {
                    const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                    return (
                      <div
                        key={exp.id || idx}
                        className="grid grid-cols-[140px_1fr] gap-4 break-inside-avoid cv-item min-w-0"
                      >
                        <div className="font-bold text-neutral-800 text-[10.5px] leading-snug tabular-nums min-w-0">
                          {dateDisplay}
                        </div>
                        <div className="min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-black break-words [overflow-wrap:anywhere]">
                              {exp.company || 'Company Name'}
                            </span>
                            {exp.location && (
                              <span className="text-neutral-700 text-[10px] break-words [overflow-wrap:anywhere]">{exp.location}</span>
                            )}
                          </div>
                          <div className="italic font-medium text-neutral-900 text-[10.5px] mt-0.5 mb-1 break-words [overflow-wrap:anywhere]">
                            {exp.role || 'Job Title'}
                          </div>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-neutral-900 min-w-0">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx} className="leading-snug break-inside-avoid break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="text-[10px] text-neutral-900 leading-snug whitespace-pre-line break-inside-avoid break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

          if (secKey === 'projects') {
            if (projects.length === 0) return null;
            return (
              <section
                key="projects"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section min-w-0"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-2 break-after-avoid"
                >
                  {projectTitle}
                </h2>
                <div className="space-y-2.5 min-w-0">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id || idx}
                      className="grid grid-cols-[125px_1fr] gap-4 break-inside-avoid cv-item min-w-0"
                    >
                      <div className="font-bold text-neutral-800 text-[10px] truncate min-w-0">
                        {proj.role || 'Project'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="font-bold text-black break-words [overflow-wrap:anywhere]">{proj.title}</span>
                          {proj.link && (
                            <span className="text-neutral-700 text-[10px] truncate max-w-[150px]">{proj.link}</span>
                          )}
                        </div>
                        {proj.bullets && proj.bullets.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-neutral-900 mt-0.5 min-w-0">
                            {proj.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-snug break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : proj.description ? (
                          <p className="text-[10px] text-neutral-900 leading-snug whitespace-pre-line mt-0.5 break-words [overflow-wrap:anywhere] [text-wrap:pretty]">
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

          if (secKey === 'skills' || secKey === 'languages' || secKey === 'interests') {
            const shouldShow =
              secKey === 'skills'
                ? pageData
                  ? Boolean(pageData.showSkills)
                  : isLastPage || totalPages === 1
                : secKey === 'languages'
                ? pageData
                  ? Boolean(pageData.showLanguages)
                  : isLastPage || totalPages === 1
                : pageData
                ? Boolean(pageData.showInterests)
                : isLastPage || totalPages === 1;

            const hasContent =
              (secKey === 'skills' && allSkills.length > 0) ||
              (secKey === 'languages' && languagesText) ||
              (secKey === 'interests' && interestsText);
            if (!shouldShow || !hasContent) return null;

            return (
              <section
                key={secKey}
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                >
                  {secKey === 'skills'
                    ? 'Key Skills'
                    : secKey === 'languages'
                    ? 'Languages'
                    : 'Interests'}
                </h2>
                <div className="text-[10.5px] text-neutral-900">
                  {secKey === 'skills' && allSkills.length > 0 && <p>{allSkills.join(' · ')}</p>}
                  {secKey === 'languages' && languagesText && <p>{languagesText}</p>}
                  {secKey === 'interests' && interestsText && <p>{interestsText}</p>}
                </div>
              </section>
            );
          }

          if (secKey === 'certifications') {
            if (certifications.length === 0) return null;
            return (
              <section
                key="certifications"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                >
                  Certifications and Licences
                </h2>
                <p className="text-[10.5px] text-neutral-900">{certifications.join('; ')}</p>
              </section>
            );
          }

          if (secKey === 'awards') {
            if (awards.length === 0) return null;
            return (
              <section
                key="awards"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                >
                  Honours and Awards
                </h2>
                <p className="text-[10.5px] text-neutral-900">{awards.join('; ')}</p>
              </section>
            );
          }

          if (secKey === 'custom') {
            if (customSections.length === 0) return null;
            return (
              <React.Fragment key="custom">
                {customSections.map((sec) => (
                  <section
                    key={sec.id}
                    style={{ borderTopColor: accent }}
                    className="border-t pt-2 break-inside-avoid cv-section"
                  >
                    <h2
                      style={{ color: accent }}
                      className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                    >
                      {sec.title || 'Additional Details'}
                    </h2>
                    {sec.bullets && sec.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-neutral-900">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[10.5px] text-neutral-900 whitespace-pre-line">
                        {sec.content}
                      </p>
                    )}
                  </section>
                ))}
              </React.Fragment>
            );
          }

          if (secKey === 'references') {
            if (!references) return null;
            return (
              <section
                key="references"
                style={{ borderTopColor: accent }}
                className="border-t pt-2 break-inside-avoid cv-section"
              >
                <h2
                  style={{ color: accent }}
                  className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 break-after-avoid"
                >
                  References
                </h2>
                <p className="text-[10.5px] text-neutral-900 whitespace-pre-line">{references}</p>
              </section>
            );
          }

          return null;
        })}

        {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="text-right text-[9px] text-neutral-500 pt-2 tabular-nums">
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  );
}
