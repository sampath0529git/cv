/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';
import CvSection from './shared/CvSection';
import CvBulletList from './shared/CvBulletList';
import CvDateRange from './shared/CvDateRange';
import CvSkillList from './shared/CvSkillList';
import CvContactLine from './shared/CvContactLine';
import FormattedText from './shared/FormattedText';
import { PageContent, paginateCv } from '@/lib/cvPagination';
import { Award, Briefcase, GraduationCap, FolderGit2, ShieldCheck, Languages as LangIcon } from 'lucide-react';

interface BaseTemplateSkeletonProps {
  cv: CV;
  layoutVariant?: 'classic' | 'sidebar-left' | 'sidebar-right' | 'header-band' | 'timeline' | 'minimal' | 'executive' | 'graduate';
  pageData?: PageContent;
  pageIndex?: number;
  totalPages?: number;
}

export default function BaseTemplateSkeleton({
  cv,
  layoutVariant = 'classic',
  pageData,
  pageIndex = 0,
  totalPages = 1,
}: BaseTemplateSkeletonProps) {
  const isTwoColumn = layoutVariant === 'sidebar-left' || layoutVariant === 'sidebar-right';

  // If pageData is not passed directly, run the paginator for this page
  const resolvedPage: PageContent = React.useMemo(() => {
    if (pageData) return pageData;
    const pages = paginateCv(cv, isTwoColumn);
    return pages[pageIndex] || pages[0];
  }, [pageData, cv, isTwoColumn, pageIndex]);

  const accent = cv.settings.accentColor || '#1e3a8a';
  const showPhoto = cv.settings.showPhoto && Boolean(cv.personal.photoUrl);
  const isFirstPage = pageIndex === 0;

  // -------------------------------------------------------------
  // TWO-COLUMN LAYOUT (e.g. Manchester, Glasgow, Shoreditch, Leeds)
  // -------------------------------------------------------------
  if (isTwoColumn) {
    return (
      <div
        className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] box-border flex flex-row text-[10px] leading-relaxed text-slate-800 bg-white overflow-hidden"
        style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px` }}
      >
        {/* Left Sidebar */}
        <aside
          className="w-[33%] p-5 shrink-0 flex flex-col justify-between border-r border-slate-200/90 relative overflow-hidden"
          style={{ backgroundColor: `${accent}0d` }}
        >
          <div className="space-y-4">
            {isFirstPage ? (
              <>
                {showPhoto && (
                  <div className="flex justify-center mb-1">
                    <img
                      src={cv.personal.photoUrl}
                      alt={cv.personal.fullName}
                      className="w-24 h-24 rounded-full object-cover border-2 shadow-xs"
                      style={{ borderColor: accent }}
                    />
                  </div>
                )}

                {/* Contact Section */}
                <div>
                  <h2
                    className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2"
                    style={{ borderColor: `${accent}33`, color: accent }}
                  >
                    Contact
                  </h2>
                  <CvContactLine
                    personal={cv.personal}
                    layout="stacked"
                    showIcons={true}
                    accentColor={accent}
                  />
                </div>

                {/* Key Skills */}
                {cv.skills && cv.skills.length > 0 && (
                  <div>
                    <h2
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2"
                      style={{ borderColor: `${accent}33`, color: accent }}
                    >
                      Key Skills
                    </h2>
                    <CvSkillList skills={cv.skills} layout="tags" accentColor={accent} />
                  </div>
                )}

                {/* Languages */}
                {cv.languages && cv.languages.length > 0 && (
                  <div>
                    <h2
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5"
                      style={{ borderColor: `${accent}33`, color: accent }}
                    >
                      Languages
                    </h2>
                    <ul className="space-y-1 text-[9.5px] text-slate-700">
                      {cv.languages.map((l, i) => (
                        <li key={i} className="flex justify-between">
                          <span className="font-semibold">{l.name}</span>
                          <span className="text-slate-500">{l.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Interests */}
                {cv.interests && cv.interests.length > 0 && (
                  <div>
                    <h2
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5"
                      style={{ borderColor: `${accent}33`, color: accent }}
                    >
                      Interests
                    </h2>
                    <p className="text-[9.5px] text-slate-600">{cv.interests.join(' • ')}</p>
                  </div>
                )}
              </>
            ) : (
              /* Subsequent Pages Sidebar: Continuation brand anchor */
              <div className="pt-4 space-y-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  {(cv.personal.fullName || 'CV')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-xs leading-tight">
                    {cv.personal.fullName}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">{cv.personal.jobTitle}</p>
                </div>
                <div
                  className="w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: `${accent}40` }}
                />
              </div>
            )}
          </div>

          {/* Footer page number indicator */}
          <div className="pt-4 text-[9px] text-slate-400 font-mono">
            Page {pageIndex + 1} of {totalPages}
          </div>
        </aside>

        {/* Right Main Column */}
        <main className="w-[67%] p-6 space-y-4 flex flex-col justify-between overflow-hidden">
          <div className="space-y-4">
            {/* Main Header on Page 1 */}
            {isFirstPage ? (
              <header className="border-b pb-3.5" style={{ borderColor: `${accent}25` }}>
                <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-950 font-sans">
                  {cv.personal.fullName}
                </h1>
                <p className="text-xs sm:text-[13px] font-semibold mt-0.5" style={{ color: accent }}>
                  {cv.personal.jobTitle}
                </p>
              </header>
            ) : (
              /* Continuation Header on Page 2+ */
              <div
                className="flex items-center justify-between pb-2 border-b text-[10px] text-slate-500 font-medium"
                style={{ borderColor: `${accent}25` }}
              >
                <span className="font-bold text-slate-800">{cv.personal.fullName}</span>
                <span className="italic">Curriculum Vitae (continued)</span>
              </div>
            )}

            {/* Personal Statement */}
            {resolvedPage.showStatement && resolvedPage.statementText && (
              <CvSection title="Personal Statement" variant="underline" accentColor={accent}>
                <FormattedText
                  text={resolvedPage.statementText}
                  className="text-[10px] text-slate-700 leading-relaxed text-justify"
                />
              </CvSection>
            )}

            {/* Work Experience */}
            {resolvedPage.experiences && resolvedPage.experiences.length > 0 && (
              <CvSection
                title={resolvedPage.experienceTitle || 'Work Experience'}
                variant="underline"
                accentColor={accent}
              >
                <div className="space-y-3.5">
                  {resolvedPage.experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1 break-inside-avoid">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10.5px]">
                        <span>{exp.role}</span>
                        <CvDateRange
                          startDate={exp.startDate}
                          endDate={exp.endDate}
                          current={exp.current}
                        />
                      </div>
                      <p className="text-[10px] font-medium" style={{ color: accent }}>
                        {[exp.company, exp.location].filter(Boolean).join(', ')}
                      </p>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <CvBulletList bullets={exp.bullets} bulletColor={accent} />
                      )}
                    </div>
                  ))}
                </div>
              </CvSection>
            )}

            {/* Education */}
            {resolvedPage.educations && resolvedPage.educations.length > 0 && (
              <CvSection
                title={resolvedPage.educationTitle || 'Education'}
                variant="underline"
                accentColor={accent}
              >
                <div className="space-y-2.5">
                  {resolvedPage.educations.map((edu) => (
                    <div key={edu.id} className="space-y-0.5 break-inside-avoid">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                        <span>{edu.qualification}</span>
                        <CvDateRange startDate={edu.startDate} endDate={edu.endDate} />
                      </div>
                      <p className="text-[9.5px] text-slate-600">
                        {[edu.institution, edu.location].filter(Boolean).join(' — ')}
                      </p>
                      {edu.description && (
                        <FormattedText
                          text={edu.description}
                          className="text-[9.5px] text-slate-600 leading-relaxed"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CvSection>
            )}

            {/* Projects */}
            {resolvedPage.projects && resolvedPage.projects.length > 0 && (
              <CvSection
                title={resolvedPage.projectTitle || 'Key Projects'}
                variant="underline"
                accentColor={accent}
              >
                <div className="space-y-2.5">
                  {resolvedPage.projects.map((proj, pIdx) => (
                    <div key={proj.id || pIdx} className="space-y-0.5 break-inside-avoid">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                        <span>{proj.title}</span>
                        {proj.link && (
                          <a
                            href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-[#4B4DED] hover:underline"
                          >
                            View project ↗
                          </a>
                        )}
                      </div>
                      <FormattedText
                        text={proj.description}
                        className="text-[9.5px] text-slate-600 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </CvSection>
            )}

            {/* Certifications */}
            {resolvedPage.showCertifications && resolvedPage.certifications.length > 0 && (
              <CvSection title="Certifications" variant="underline" accentColor={accent}>
                <ul className="space-y-1 text-[9.5px] text-slate-700">
                  {resolvedPage.certifications.map((cert, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CvSection>
            )}

            {/* Awards */}
            {resolvedPage.showAwards && resolvedPage.awards.length > 0 && (
              <CvSection title="Key Achievements & Awards" variant="underline" accentColor={accent}>
                <ul className="space-y-1 text-[9.5px] text-slate-700">
                  {resolvedPage.awards.map((award, aIdx) => (
                    <li key={aIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </CvSection>
            )}

            {/* Custom Sections */}
            {resolvedPage.customSections && resolvedPage.customSections.length > 0 && (
              <>
                {resolvedPage.customSections.map((sec) => (
                  <CvSection key={sec.id} title={sec.title} variant="underline" accentColor={accent}>
                    {sec.content && (
                      <FormattedText text={sec.content} className="text-[10px] text-slate-700 leading-relaxed" />
                    )}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <CvBulletList bullets={sec.bullets} bulletColor={accent} />
                    )}
                  </CvSection>
                ))}
              </>
            )}
          </div>

          {/* References statement on final page */}
          {resolvedPage.references && (
            <div className="pt-2 border-t border-slate-100 text-[9px] text-slate-500 italic text-center">
              {resolvedPage.references}
            </div>
          )}
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SINGLE-COLUMN LAYOUT (Classic, Minimal, Executive, Graduate, Header-Band)
  // -------------------------------------------------------------
  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] box-border p-8 text-[10px] leading-relaxed text-slate-800 bg-white flex flex-col justify-between overflow-hidden"
      style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px` }}
    >
      <div className="space-y-4">
        {/* Main Header on Page 1 */}
        {isFirstPage ? (
          <header
            className={`pb-3.5 border-b ${
              layoutVariant === 'executive' ? 'border-b-2' : ''
            }`}
            style={{ borderColor: `${accent}33` }}
          >
            {layoutVariant === 'header-band' ? (
              <div
                className="-mx-8 -mt-8 px-8 py-5 text-white mb-3 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <h1 className="text-2xl font-bold tracking-tight">{cv.personal.fullName}</h1>
                <p className="text-xs uppercase tracking-wider text-white/90 mt-0.5">
                  {cv.personal.jobTitle}
                </p>
                <div className="mt-2 text-white/90">
                  <CvContactLine personal={cv.personal} layout="inline" showIcons={true} />
                </div>
              </div>
            ) : (
              <div className="text-center">
                {showPhoto && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={cv.personal.photoUrl}
                      alt={cv.personal.fullName}
                      className="w-20 h-20 rounded-full object-cover border-2 shadow-xs"
                      style={{ borderColor: accent }}
                    />
                  </div>
                )}
                <h1
                  className={`text-2xl sm:text-[27px] font-bold tracking-tight text-slate-950 ${
                    layoutVariant === 'classic' ? 'font-serif' : 'font-sans'
                  }`}
                >
                  {cv.personal.fullName}
                </h1>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mt-0.5"
                  style={{ color: accent }}
                >
                  {cv.personal.jobTitle}
                </p>
                <div className="mt-2">
                  <CvContactLine personal={cv.personal} layout="inline" showIcons={false} />
                </div>
              </div>
            )}
          </header>
        ) : (
          /* Continuation Header on Page 2+ */
          <div
            className="flex items-center justify-between pb-2 border-b text-[10px] text-slate-500 font-medium"
            style={{ borderColor: `${accent}30` }}
          >
            <span className="font-bold text-slate-900">{cv.personal.fullName}</span>
            <span className="italic">
              {cv.personal.jobTitle} — Page {pageIndex + 1} of {totalPages}
            </span>
          </div>
        )}

        {/* Personal Statement */}
        {resolvedPage.showStatement && resolvedPage.statementText && (
          <CvSection title="Personal Statement" variant="underline" accentColor={accent}>
            <FormattedText
              text={resolvedPage.statementText}
              className="text-[10px] text-slate-700 leading-relaxed text-justify"
            />
          </CvSection>
        )}

        {/* Work Experience */}
        {resolvedPage.experiences && resolvedPage.experiences.length > 0 && (
          <CvSection
            title={resolvedPage.experienceTitle || 'Work Experience'}
            variant="underline"
            accentColor={accent}
          >
            <div className="space-y-3.5">
              {resolvedPage.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1 break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-950 text-[10.5px]">
                    <span>{exp.role}</span>
                    <CvDateRange
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      current={exp.current}
                    />
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: accent }}>
                    {[exp.company, exp.location].filter(Boolean).join(' — ')}
                  </p>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <CvBulletList bullets={exp.bullets} bulletColor={accent} />
                  )}
                </div>
              ))}
            </div>
          </CvSection>
        )}

        {/* Education */}
        {resolvedPage.educations && resolvedPage.educations.length > 0 && (
          <CvSection
            title={resolvedPage.educationTitle || 'Education'}
            variant="underline"
            accentColor={accent}
          >
            <div className="space-y-2">
              {resolvedPage.educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                    <span>{edu.qualification}</span>
                    <CvDateRange startDate={edu.startDate} endDate={edu.endDate} />
                  </div>
                  <p className="text-[9.5px] text-slate-600">
                    {[edu.institution, edu.location].filter(Boolean).join(' — ')}
                  </p>
                  {edu.description && (
                    <FormattedText
                      text={edu.description}
                      className="text-[9.5px] text-slate-600 leading-relaxed mt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </CvSection>
        )}

        {/* Skills */}
        {resolvedPage.showSkills && resolvedPage.skills.length > 0 && (
          <CvSection
            title={resolvedPage.skillsTitle || 'Key Skills & Core Competencies'}
            variant="underline"
            accentColor={accent}
          >
            <CvSkillList skills={resolvedPage.skills} layout="tags" accentColor={accent} />
          </CvSection>
        )}

        {/* Projects */}
        {resolvedPage.projects && resolvedPage.projects.length > 0 && (
          <CvSection
            title={resolvedPage.projectTitle || 'Key Projects'}
            variant="underline"
            accentColor={accent}
          >
            <div className="space-y-2.5">
              {resolvedPage.projects.map((proj, pIdx) => (
                <div key={proj.id || pIdx} className="space-y-0.5 break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10px]">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-[#4B4DED] hover:underline"
                      >
                        {proj.link.replace(/^https?:\/\//, '')} ↗
                      </a>
                    )}
                  </div>
                  <FormattedText
                    text={proj.description}
                    className="text-[9.5px] text-slate-600 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </CvSection>
        )}

        {/* Certifications */}
        {resolvedPage.showCertifications && resolvedPage.certifications.length > 0 && (
          <CvSection title="Certifications" variant="underline" accentColor={accent}>
            <ul className="grid grid-cols-2 gap-1.5 text-[9.5px] text-slate-700">
              {resolvedPage.certifications.map((cert, cIdx) => (
                <li key={cIdx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </CvSection>
        )}

        {/* Languages */}
        {resolvedPage.showLanguages && resolvedPage.languages.length > 0 && (
          <CvSection title="Languages" variant="underline" accentColor={accent}>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9.5px] text-slate-700">
              {resolvedPage.languages.map((l, lIdx) => (
                <span key={lIdx}>
                  <strong className="text-slate-900">{l.name}</strong> ({l.level})
                </span>
              ))}
            </div>
          </CvSection>
        )}

        {/* Awards */}
        {resolvedPage.showAwards && resolvedPage.awards.length > 0 && (
          <CvSection title="Key Achievements & Awards" variant="underline" accentColor={accent}>
            <ul className="space-y-1 text-[9.5px] text-slate-700">
              {resolvedPage.awards.map((award, aIdx) => (
                <li key={aIdx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </CvSection>
        )}

        {/* Custom Sections */}
        {resolvedPage.customSections && resolvedPage.customSections.length > 0 && (
          <>
            {resolvedPage.customSections.map((sec) => (
              <CvSection key={sec.id} title={sec.title} variant="underline" accentColor={accent}>
                {sec.content && (
                  <FormattedText text={sec.content} className="text-[10px] text-slate-700 leading-relaxed" />
                )}
                {sec.bullets && sec.bullets.length > 0 && (
                  <CvBulletList bullets={sec.bullets} bulletColor={accent} />
                )}
              </CvSection>
            ))}
          </>
        )}
      </div>

      {/* Footer References & Page Number */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
        <span className="italic text-slate-500">
          {resolvedPage.references || 'References available on request'}
        </span>
        <span className="font-mono">
          Page {pageIndex + 1} of {totalPages}
        </span>
      </div>
    </div>
  );
}
