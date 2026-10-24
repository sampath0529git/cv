import React from 'react';
import { CV, A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

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
  const fullName = cv.personal.fullName || 'Robert Tipping';
  const email = cv.personal.email || 'example@cvmaker.com';
  const phone = cv.personal.phone || 'example number';
  const location = cv.personal.location || 'London, United Kingdom';
  const linkedin = cv.personal.linkedin || 'https://www.linkedin.com/in/sarah-jones';

  const isFirstPage = pageIndex === 0;

  // Resolve paginated or full data
  const educations = pageData?.educations !== undefined ? pageData.educations : cv.education;
  const experiences = pageData?.experiences !== undefined ? pageData.experiences : cv.experience;

  // Flatten all skills
  const skillsList = cv.skills && cv.skills.length > 0 ? cv.skills.flatMap((s) => s.items) : [];

  return (
    <div
      className="w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] print:h-auto print:min-h-[297mm] print:max-h-none print:overflow-visible box-border p-10 text-[11px] leading-relaxed text-black bg-white flex flex-col justify-between overflow-hidden select-text font-sans"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="grid grid-cols-[220px_1fr] gap-8 h-full">
        {/* ========================================================= */}
        {/* LEFT COLUMN (~30% width)                                  */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-1 border-r border-gray-100 pr-4">
          {/* Personalia */}
          <div className="space-y-2">
            <h2 className="text-[15px] font-normal text-black tracking-tight mb-3">Personalia</h2>
            <div className="space-y-1.5 text-[10px] text-gray-900 break-words">
              {email && (
                <div>
                  <a href={`mailto:${email}`} className="font-bold underline text-black hover:text-blue-600 block truncate">
                    {email}
                  </a>
                </div>
              )}
              {phone && <div className="text-gray-800">{phone}</div>}
              {location && <div className="text-gray-800 font-medium">{location}</div>}
              {linkedin && (
                <div className="pt-2">
                  <div className="text-gray-600 text-[9px] font-semibold">LinkedIn</div>
                  <a href={linkedin} target="_blank" rel="noreferrer" className="text-black text-[9.5px] break-all hover:underline font-normal block">
                    {linkedin}
                  </a>
                </div>
              )}
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-[15px] font-normal text-black tracking-tight mb-3">Skills</h2>
              <div className="space-y-2 text-[10px]">
                {skillsList.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-black text-[10px] truncate max-w-[120px]">
                      {skill}
                    </span>
                    <div className="flex gap-1 shrink-0 text-gray-400 font-mono text-[9px]">
                      <span>- - - - -</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skillsList.length > 0 && <hr className="border-t border-gray-300 my-4" />}

          {/* Education */}
          {educations && educations.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-[15px] font-normal text-black tracking-tight mb-3">Education</h2>
              <div className="space-y-3 text-[10px]">
                {educations.map((edu: any, idx: number) => (
                  <div key={edu.id || idx} className="space-y-0.5">
                    <div className="font-bold text-black text-[10.5px] leading-snug">
                      {edu.qualification || edu.degree}
                    </div>
                    <div className="italic text-gray-800 font-medium text-[10px]">
                      {edu.institution || edu.school}
                      {edu.location ? `, ${edu.location}` : ''}
                    </div>
                    {edu.startDate && (
                      <div className="text-gray-500 text-[9px]">
                        {[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (~70% width)                                 */}
        {/* ========================================================= */}
        <div className="space-y-5">
          {/* Header Name & Statement */}
          {isFirstPage && (
            <div className="space-y-3 pb-2">
              <h1 className="text-[28px] font-bold text-black tracking-tight leading-none">
                {fullName}
              </h1>
              {cv.personalStatement && (
                <p className="text-[10.5px] text-gray-800 leading-normal font-normal pt-1">
                  {cv.personalStatement}
                </p>
              )}
              <hr className="border-t border-gray-300 mt-4" />
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-5">
              <h2 className="text-[16px] font-normal text-black tracking-tight">Work Experience</h2>

              <div className="space-y-5">
                {experiences.map((exp: any, idx: number) => {
                  const dateText = [exp.startDate, exp.endDate === 'Present' ? 'Present' : exp.endDate]
                    .filter(Boolean)
                    .join(' - ');

                  return (
                    <div key={exp.id || idx} className="space-y-1.5">
                      {/* Company name & Location + Date */}
                      <div className="flex justify-between items-baseline">
                        <div className="font-semibold text-black text-[11px]">
                          {exp.company || exp.employer}
                          {exp.location ? `, ${exp.location}` : ''}
                        </div>
                        {dateText && (
                          <div className="text-[10px] text-black font-semibold underline underline-offset-2">
                            {dateText}
                          </div>
                        )}
                      </div>

                      {/* Job Title */}
                      <div className="font-bold text-black text-[11px]">
                        {exp.role || exp.jobTitle}
                      </div>

                      {/* Paragraph / Overview */}
                      {exp.description && (
                        <p className="text-[10.5px] text-gray-800 leading-relaxed font-normal">
                          {exp.description}
                        </p>
                      )}

                      {/* Bullet points */}
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-gray-800 font-normal pt-1">
                          {exp.bullets.map((b: string, bIdx: number) => (
                            <li key={bIdx} className="leading-snug">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="text-right text-[9px] text-gray-400 font-mono pt-2">
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  );
}
