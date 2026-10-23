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

  const email = cv.personal.email || 'professional email address';
  const phone = cv.personal.phone || 'UK landline or mobile';
  const location = cv.personal.location || '';

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalPages - 1;

  // Resolve paginated data if present, otherwise full cv data
  const educations = pageData?.educations !== undefined ? pageData.educations : (isFirstPage ? cv.education : []);
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;

  // Format nationality & languages
  const nationality =
    cv.personal.nationality ||
    'your nationality, dual nationality, and any additional work authorization if applicable';

  const languagesText =
    cv.languages && cv.languages.length > 0
      ? cv.languages.map((l) => `${l.name} (${l.level})`).join(', ')
      : 'languages other than English and ability level eg. German (fluent)';

  const interestsText =
    cv.interests && cv.interests.length > 0
      ? cv.interests.join('; ')
      : "Concentrate on activities you participate in and are willing to talk about. You should highlight achievements in those activities. Eg. rather than just listing 'running' say 'running – participated in several marathons, President of the Oxford Runners Club'";

  const achievementsList =
    cv.awards && cv.awards.length > 0
      ? cv.awards
      : [
          'First Class Honours, Previous University',
          'Study abroad scholarship (selected 3 out of 600 students)',
          'Principal Cellist of London Youth Orchestra',
        ];

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
              <span className="uppercase">{surname}</span>
            </h1>
            <div className="text-[11px] text-black mt-1 flex items-center justify-center gap-3">
              <span>
                <strong className="font-semibold">e-mail:</strong> {email}
              </span>
              <span>
                <strong className="font-semibold">tel:</strong> {phone}
              </span>
              {location && (
                <span>
                  <strong className="font-semibold">location:</strong> {location}
                </span>
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

        {/* ========================================================= */}
        {/* 1. EDUCATION AND QUALIFICATIONS (Listed First)            */}
        {/* ========================================================= */}
        {educations && educations.length > 0 && (
          <section className="border-t border-black pt-1.5 break-inside-avoid cv-section">
            <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">Education and Qualifications</h2>

            <div className="space-y-3">
              {educations.map((edu: any, idx: number) => (
                <div key={edu.id || idx} className="grid grid-cols-[125px_1fr] gap-4 break-inside-avoid cv-item">
                  {/* Left date gutter */}
                  <div className="font-bold text-black text-[11px] whitespace-nowrap">
                    {edu.startDate}
                    {edu.endDate ? `–${edu.endDate}` : ''}
                  </div>

                  {/* Right education details */}
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-black">{edu.institution}</span>
                      <span className="font-bold text-black">{edu.qualification}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[10.5px] text-neutral-800 mt-0.5">
                      <span>{edu.location ? `Location; ${edu.location}` : 'Location; City and Country'}</span>
                      <span>{edu.grade || 'applicable additional info'}</span>
                    </div>
                    {edu.description && (
                      <p className="text-[10.5px] text-neutral-800 mt-1 leading-normal whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 2. WORK EXPERIENCE                                        */}
        {/* ========================================================= */}
        {experiences && experiences.length > 0 && (
          <section className="border-t border-black pt-1.5 break-inside-avoid cv-section">
            <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">Work Experience</h2>

            <div className="space-y-3.5">
              {experiences.map((exp: any, idx: number) => (
                <div key={exp.id || idx} className="grid grid-cols-[125px_1fr] gap-4 break-inside-avoid cv-item">
                  {/* Left date gutter */}
                  <div className="font-bold text-black text-[11px] whitespace-nowrap">
                    {exp.startDate}
                    {exp.endDate ? ` – ${exp.endDate}` : ''}
                  </div>

                  {/* Right company & role details */}
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-black">{exp.company}</span>
                      <span className="text-black">{exp.location || 'City, Country'}</span>
                    </div>
                    <div className="italic text-neutral-900 text-[10.5px] mt-0.5 mb-1">
                      {exp.role}
                    </div>

                    {/* Bullet list */}
                    {exp.bullets && exp.bullets.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-black">
                        {exp.bullets.map((b: string, bIdx: number) => (
                          <li key={bIdx} className="leading-snug break-inside-avoid">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : exp.description ? (
                      <p className="text-[10.5px] text-black leading-snug whitespace-pre-line break-inside-avoid">
                        {exp.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 3. ADDITIONAL INFORMATION (On single page or last page)   */}
        {/* ========================================================= */}
        {(isLastPage || totalPages === 1) && (
          <section className="border-t border-black pt-1.5 break-inside-avoid cv-section">
            <h2 className="text-[12px] font-bold text-black mb-2 break-after-avoid">Additional Information</h2>

            <div className="space-y-2 text-[10.5px] text-black">
              {/* Interests */}
              <div className="grid grid-cols-[125px_1fr] gap-4 items-start break-inside-avoid cv-item">
                <span className="font-normal text-black">Interests:</span>
                <p className="leading-snug text-black">{interestsText}</p>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-[125px_1fr] gap-4 items-start break-inside-avoid cv-item">
                <span className="font-normal text-black">Achievements:</span>
                <div className="space-y-0.5 leading-snug">
                  <p>List academic or other achievements here, for example</p>
                  {achievementsList.map((ach: string, aIdx: number) => (
                    <p key={aIdx}>{ach}</p>
                  ))}
                </div>
              </div>

              {/* Nationality */}
              <div className="grid grid-cols-[125px_1fr] gap-4 items-start break-inside-avoid cv-item">
                <span className="font-normal text-black">Nationality:</span>
                <p className="leading-snug text-black">{nationality}</p>
              </div>

              {/* Languages */}
              <div className="grid grid-cols-[125px_1fr] gap-4 items-start break-inside-avoid cv-item">
                <span className="font-normal text-black">Languages:</span>
                <p className="leading-snug text-black">{languagesText}</p>
              </div>
            </div>
          </section>
        )}
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
