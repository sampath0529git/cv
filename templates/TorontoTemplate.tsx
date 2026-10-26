import React from 'react';
import { CV, LanguageItem, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import EmptyCvGuide from './shared/EmptyCvGuide';
import {
  resolveTemplateSectionOrder,
  resolvePaginatedOptionalData,
  getSkillBarWidth,
} from './shared/templateHelpers';

interface TorontoTemplateProps {
  cv: CV;
  pageData?: any;
  pageIndex?: number;
  totalPages?: number;
}

export default function TorontoTemplate({
  cv,
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: TorontoTemplateProps) {
  const accent = cv.settings.accentColor || '#4B4DED';
  const fullName = cv.personal.fullName || 'Your Name';
  const jobTitle = cv.personal.jobTitle || '';
  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';
  const linkedin = cv.personal.linkedin || '';
  const website = cv.personal.website || '';
  const dateOfBirth = cv.personal.dateOfBirth || '';
  const nationality = cv.personal.nationality || '';
  const drivingLicence = cv.personal.drivingLicence || '';
  const showPhoto = Boolean(cv.personal.photoUrl && cv.settings.showPhoto);

  const isFirstPage = pageIndex === 0;
  const hasPageData = Boolean(pageData);

  const educations = hasPageData
    ? pageData.sidebarEducations ?? pageData.educations ?? []
    : cv.education;
  const experiences = hasPageData ? pageData.experiences ?? [] : cv.experience;

  const allSkills =
    cv.skills && cv.skills.length > 0
      ? cv.skills.flatMap((s) => s.items).filter(Boolean)
      : [];
  const skillsList: string[] = hasPageData ? pageData.sidebarSkills ?? [] : allSkills;

  const languages: LanguageItem[] = hasPageData
    ? pageData.sidebarLanguages ?? []
    : cv.languages || [];
  const interests: string[] = hasPageData
    ? pageData.showInterests
      ? pageData.interests || cv.interests || []
      : []
    : cv.interests || [];

  const statementText = hasPageData
    ? pageData.showStatement
      ? pageData.statementText || cv.personalStatement
      : ''
    : isFirstPage
    ? cv.personalStatement
    : '';

  const { projects, projectTitle, certifications, awards, customSections, references } =
    resolvePaginatedOptionalData(cv, pageData, pageIndex, totalPages);

  const showSidebarContact = hasPageData ? Boolean(pageData.showSidebarContact) : isFirstPage;
  const hasAnyContact = Boolean(
    email || phone || location || linkedin || website || dateOfBirth || nationality || drivingLicence
  );

  const isCompletelyEmpty =
    isFirstPage &&
    !cv.personalStatement?.trim() &&
    (!cv.experience || cv.experience.length === 0) &&
    (!cv.education || cv.education.length === 0) &&
    allSkills.length === 0 &&
    (cv.languages || []).length === 0 &&
    (cv.interests || []).length === 0 &&
    (cv.projects || []).length === 0 &&
    (cv.certifications || []).length === 0 &&
    (cv.awards || []).length === 0 &&
    (cv.customSections || []).length === 0 &&
    !cv.references?.trim();

  const mainSectionOrder = resolveTemplateSectionOrder(cv);

  const renderMainSection = (key: string) => {
    if (key === 'experience' && experiences && experiences.length > 0) {
      return (
        <section key="experience" className="space-y-3.5 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
          >
            {pageData?.experienceTitle || 'Work Experience'}
          </h2>

          <div className="space-y-4">
            {experiences.map((exp: any, idx: number) => {
              const dateText = [
                exp.startDate,
                exp.endDate === 'Present' ? 'Present' : exp.endDate,
              ]
                .filter(Boolean)
                .join(' – ');

              return (
                <div key={exp.id || idx} className="space-y-1 break-inside-avoid cv-item">
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="font-bold text-slate-900 text-[11.5px]">
                      {exp.role || exp.jobTitle}
                    </span>
                    {dateText && (
                      <span className="text-[10px] text-slate-500 font-semibold whitespace-nowrap tabular-nums">
                        {dateText}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline gap-3 text-[10.5px]">
                    <span style={{ color: accent }} className="font-semibold">
                      {exp.company || exp.employer}
                    </span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-700 leading-[1.5] pt-0.5">
                      {exp.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx} className="leading-snug break-inside-avoid">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : exp.description ? (
                    <p className="text-[10px] text-slate-700 leading-[1.5] pt-0.5 whitespace-pre-line">
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
        <section key="projects" className="space-y-2.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
          >
            {projectTitle}
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="space-y-0.5 break-inside-avoid cv-item">
                <div className="flex justify-between items-baseline gap-3">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-[11px]">{proj.title}</span>
                    {proj.role && (
                      <span style={{ color: accent }} className="text-[10px] font-semibold">
                        · {proj.role}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="text-[9.5px] text-slate-500 truncate max-w-[160px]">
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
        <section key="certifications" className="space-y-1.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
          >
            Certifications & Licences
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">
            {certifications.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'awards' && awards.length > 0) {
      return (
        <section key="awards" className="space-y-1.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
          >
            Honours & Awards
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">{awards.join(' · ')}</p>
        </section>
      );
    }

    if (key === 'interests' && interests.length > 0) {
      return (
        <section key="interests" className="space-y-1.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
          >
            Interests & Activities
          </h2>
          <p className="text-[10px] text-slate-700 leading-relaxed">
            {interests.join(' · ')}
          </p>
        </section>
      );
    }

    if (key === 'custom' && customSections.length > 0) {
      return (
        <React.Fragment key="custom">
          {customSections.map((sec) => (
            <section
              key={sec.id}
              className="space-y-1.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section"
            >
              <h2
                style={{ color: accent }}
                className="text-[11px] font-bold uppercase tracking-[0.08em]"
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
        <section key="references" className="space-y-1.5 pt-2 border-t border-slate-100 break-inside-avoid cv-section">
          <h2
            style={{ color: accent }}
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
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
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border text-[11px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'inherit',
      }}
    >
      <div className="grid grid-cols-[240px_1fr] flex-1 min-h-0">
        {/* LEFT SIDEBAR */}
        <aside
          style={{ backgroundColor: `${accent}0A`, borderRightColor: `${accent}1F` }}
          className="px-7 py-9 border-r flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Optional Profile Photo */}
            {isFirstPage && showPhoto && (
              <div className="pb-1">
                <img
                  src={cv.personal.photoUrl}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  style={{ borderColor: accent }}
                  className="w-24 h-24 rounded-2xl object-cover border-2 shadow-xs"
                />
              </div>
            )}

            {/* Contact Details (Page 1 sidebar) */}
            {showSidebarContact && hasAnyContact && (
              <div className="space-y-2.5">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200"
                >
                  Contact
                </h2>
                <div className="space-y-2 text-[10px] text-slate-700 break-words">
                  {email && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Email
                      </div>
                      <div className="font-medium text-slate-900 break-all">{email}</div>
                    </div>
                  )}
                  {phone && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Phone
                      </div>
                      <div className="font-medium text-slate-900 tabular-nums">{phone}</div>
                    </div>
                  )}
                  {location && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </div>
                      <div className="font-medium text-slate-900">{location}</div>
                    </div>
                  )}
                  {linkedin && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        LinkedIn
                      </div>
                      <div className="font-medium text-slate-900 break-all">{linkedin}</div>
                    </div>
                  )}
                  {website && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Portfolio
                      </div>
                      <div className="font-medium text-slate-900 break-all">{website}</div>
                    </div>
                  )}
                  {dateOfBirth && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Date of Birth
                      </div>
                      <div className="font-medium text-slate-900">{dateOfBirth}</div>
                    </div>
                  )}
                  {nationality && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Nationality
                      </div>
                      <div className="font-medium text-slate-900">{nationality}</div>
                    </div>
                  )}
                  {drivingLicence && (
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Driving Licence
                      </div>
                      <div className="font-medium text-slate-900">{drivingLicence}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Skills with Real Proficiency Accent Bars */}
            {skillsList.length > 0 && (
              <div className="space-y-2.5">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200"
                >
                  Key Skills
                </h2>
                <div className="space-y-2 text-[10px]">
                  {skillsList.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="font-medium text-slate-900 leading-snug">{skill}</div>
                      <div className="w-full h-1 bg-slate-200/90 rounded-full overflow-hidden">
                        <div
                          style={{
                            backgroundColor: accent,
                            width: getSkillBarWidth(skill, idx, cv.skillLevels),
                          }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {educations && educations.length > 0 && (
              <div className="space-y-2.5">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200"
                >
                  {pageData?.educationTitle || 'Education'}
                </h2>
                <div className="space-y-3 text-[10px]">
                  {educations.map((edu: any, idx: number) => {
                    const dateText = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');
                    return (
                      <div key={edu.id || idx} className="space-y-0.5 break-inside-avoid">
                        <div className="font-bold text-slate-900 text-[10.5px] leading-snug">
                          {edu.qualification || edu.degree}
                        </div>
                        <div className="text-slate-700 font-medium">
                          {edu.institution || edu.school}
                        </div>
                        {edu.grade && (
                          <div style={{ color: accent }} className="text-[9.5px] font-semibold">
                            {edu.grade}
                          </div>
                        )}
                        {dateText && (
                          <div className="text-slate-400 text-[9px] tabular-nums">{dateText}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="space-y-2">
                <h2
                  style={{ color: accent }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.08em] pb-1 border-b border-slate-200"
                >
                  Languages
                </h2>
                <div className="space-y-1 text-[10px] text-slate-700">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between items-baseline gap-2">
                      <span className="font-semibold text-slate-900">{lang.name}</span>
                      {lang.level && <span className="text-[9.5px] text-slate-500">{lang.level}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="text-[9px] text-slate-400 tabular-nums pt-4">
              Page {pageIndex + 1} of {totalPages}
            </div>
          )}
        </aside>

        {/* MAIN RIGHT COLUMN */}
        <main className="px-9 py-9 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            {isFirstPage ? (
              <header className="pb-4 border-b border-slate-200 break-inside-avoid">
                <h1 className="text-[28px] font-bold text-slate-950 tracking-tight leading-none">
                  {fullName}
                </h1>
                {jobTitle && (
                  <p
                    style={{ color: accent }}
                    className="text-[13px] font-semibold tracking-wide mt-2"
                  >
                    {jobTitle}
                  </p>
                )}
                {statementText?.trim() && (
                  <p className="text-[10.5px] text-slate-600 leading-[1.6] mt-3 whitespace-pre-line">
                    {statementText}
                  </p>
                )}
              </header>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline border-b border-slate-200 pb-2 text-xs break-inside-avoid">
                  <span className="font-bold text-slate-900">{fullName}</span>
                  <span className="text-slate-400 text-[10px] tabular-nums">
                    Continued · Page {pageIndex + 1}
                  </span>
                </div>
                {statementText?.trim() && (
                  <p className="text-[10.5px] text-slate-600 leading-[1.6] whitespace-pre-line">
                    {statementText}
                  </p>
                )}
              </div>
            )}

            {mainSectionOrder.map((key) => renderMainSection(key))}

            {isCompletelyEmpty && <EmptyCvGuide accent={accent} />}
          </div>
        </main>
      </div>
    </div>
  );
}
