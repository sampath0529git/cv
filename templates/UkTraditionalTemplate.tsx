import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

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
  // Format Name: Forename SURNAME
  const rawFullName = cv.personal.fullName || 'Forename Surname';
  const nameParts = rawFullName.trim().split(/\s+/);
  const forename = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
  const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1].toUpperCase() : '';

  const email = cv.personal.email || '';
  const phone = cv.personal.phone || '';
  const location = cv.personal.location || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  // Resolve paginated data if present, otherwise full cv data
  const educations = pageData?.educations !== undefined ? pageData.educations : (isFirstPage ? cv.education : []);
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;

  // Format nationality & languages
  const nationality = cv.personal.nationality || '';

  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(', ')
      : '';

  const interestsText =
    cv.interests && cv.interests.length > 0
      ? cv.interests.join('; ')
      : '';

  const achievementsList =
    cv.awards && cv.awards.length > 0
      ? cv.awards
      : [];

  const allSkills = cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items).filter(Boolean) : [];

  const hasAdditionalInfo = Boolean(
    nationality ||
    languagesText ||
    interestsText ||
    achievementsList.length > 0 ||
    allSkills.length > 0
  );

  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border px-12 py-10 text-[11px] leading-relaxed text-black bg-white flex flex-col justify-between overflow-hidden select-text"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      <div className="space-y-3.5">
        {/* ========================================================= */}
        {/* HEADER: Forename SURNAME (Centered on Page 1)             */}
        {/* ========================================================= */}
        {isFirstPage ? (
          <header className="text-center pb-1 break-inside-avoid">
            <h1 className="text-[20px] font-bold tracking-normal text-black leading-tight">
              <span>{forename} </span>
              {surname && <span className="uppercase">{surname}</span>}
            </h1>
            <div className="text-[11px] text-black mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {email && (
                <span>
                  <strong className="font-semibold">e-mail:</strong> {email}
                </span>
              )}
              {phone && (
                <span>
                  <strong className="font-semibold">tel:</strong> {phone}
                </span>
              )}
              {location && (
                <span>
                  <strong className="font-semibold">location:</strong> {location}
                </span>
              )}
              {!email && !phone && !location && (
                <span className="italic text-neutral-500">Contact details will appear here</span>
              )}
            </div>
          </header>
        ) : (
          /* Continuation Header for Page 2+ */
          <div className="flex justify-between items-baseline border-b border-black pb-1 mb-2 break-inside-avoid">
            <span className="font-bold text-black text-[12px]">
              {forename} {surname}
            </span>
            <span className="italic text-neutral-600 text-[10px]">
              Curriculum Vitae (continued)
            </span>
          </div>
        )}

        {/* Dynamic Sections mapped from cv.settings.sectionOrder */}
        {(cv.settings.sectionOrder || ['education', 'experience', 'skills', 'languages', 'interests']).map((secKey) => {
          if (secKey === 'education') {
            if (!educations || educations.length === 0) return null;
            return (
              <section key="education" className="border-t border-black pt-1.5 break-inside-avoid cv-section">
                <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">Education and Qualifications</h2>
                <div className="space-y-3">
                  {educations.map((edu: any, idx: number) => {
                    const dateDisplay = [edu.startDate, edu.endDate].filter(Boolean).join('–');
                    return (
                      <div key={edu.id || idx} className="grid grid-cols-[130px_1fr] gap-4 break-inside-avoid cv-item">
                        <div className="font-bold text-black text-[11px] whitespace-nowrap">{dateDisplay || 'Date'}</div>
                        <div>
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-black">{edu.institution || 'University / Institution'}</span>
                            <span className="font-bold text-black text-right">{edu.qualification || 'Degree / Qualification'}</span>
                          </div>
                          {(edu.location || edu.grade) && (
                            <div className="flex justify-between items-baseline text-[10.5px] text-neutral-800 mt-0.5">
                              <span>{edu.location ? `Location: ${edu.location}` : ''}</span>
                              <span>{edu.grade || ''}</span>
                            </div>
                          )}
                          {edu.description && (
                            <p className="text-[10.5px] text-neutral-800 mt-1 leading-normal whitespace-pre-line">{edu.description}</p>
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
              <section key="experience" className="border-t border-black pt-1.5 break-inside-avoid cv-section">
                <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">Work Experience</h2>
                <div className="space-y-3.5">
                  {experiences.map((exp: any, idx: number) => {
                    const dateDisplay = [exp.startDate, exp.endDate].filter(Boolean).join(' – ');
                    return (
                      <div key={exp.id || idx} className="grid grid-cols-[130px_1fr] gap-4 break-inside-avoid cv-item">
                        <div className="font-bold text-black text-[11px] whitespace-nowrap">{dateDisplay || 'Dates'}</div>
                        <div>
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-bold text-black">{exp.company || 'Company Name'}</span>
                            {exp.location && <span className="text-black text-[10.5px]">{exp.location}</span>}
                          </div>
                          <div className="italic text-neutral-900 text-[10.5px] mt-0.5 mb-1">{exp.role || 'Job Title'}</div>
                          {exp.bullets && exp.bullets.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-black">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx} className="leading-snug break-inside-avoid">{b}</li>
                              ))}
                            </ul>
                          ) : exp.description ? (
                            <p className="text-[10.5px] text-black leading-snug whitespace-pre-line break-inside-avoid">{exp.description}</p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (secKey === 'summary') {
            if (!cv.personalStatement) return null;
            return (
              <section key="summary" className="border-t border-black pt-1.5 break-inside-avoid cv-section">
                <h2 className="text-[12px] font-bold text-black mb-1.5 break-after-avoid">Professional Summary</h2>
                <p className="text-[10.5px] text-black leading-normal whitespace-pre-line">{cv.personalStatement}</p>
              </section>
            );
          }

          if ((secKey === 'skills' || secKey === 'languages' || secKey === 'interests') && (isLastPage || totalPages === 1)) {
            const hasContent =
              (secKey === 'skills' && allSkills.length > 0) ||
              (secKey === 'languages' && languagesText) ||
              (secKey === 'interests' && interestsText);
            if (!hasContent) return null;

            return (
              <section key={secKey} className="border-t border-black pt-1.5 break-inside-avoid cv-section">
                <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">
                  {secKey === 'skills' ? 'Key Skills' : secKey === 'languages' ? 'Languages' : 'Interests'}
                </h2>
                <div className="text-[10.5px] text-black">
                  {secKey === 'skills' && allSkills.length > 0 && <p>{allSkills.join(', ')}</p>}
                  {secKey === 'languages' && languagesText && <p>{languagesText}</p>}
                  {secKey === 'interests' && interestsText && <p>{interestsText}</p>}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="text-right text-[9px] text-neutral-500 font-sans pt-2">
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  );
}
