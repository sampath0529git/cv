'use client';

import React, { useState } from 'react';

export default function SeoGuideFaqSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article id="seo-guide" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Online CV Creation: Easily Create a Stylish CV
          </h2>
        </div>

        {/* What is the best CV designer software? */}
        <div className="space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            What is the best CV designer software?
          </h3>

          <p>
            To create your professional CV,{' '}
            <strong className="text-slate-900 font-semibold">
              using an online CV creation software is the fastest and simplest way
            </strong>{' '}
            . The templates offered are validated by recruiters: this way, you maximise your chances of securing an interview for the desired position.
          </p>

          <p>To create your CV, simply follow each of the steps below:</p>

          {/* Numbered Steps with subtle teal/green background */}
          <div className="space-y-3.5 pt-1">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p className="text-slate-700 text-sm sm:text-base pt-0.5">
                Choose the CV design that suits you best from the fillable CV templates offered online
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p className="text-slate-700 text-sm sm:text-base pt-0.5">
                Complete the fields of each section with your information (education, experiences, skills, languages...)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded bg-[#daf5ea] text-[#00a86b] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p className="text-slate-700 text-sm sm:text-base pt-0.5">
                Download the CV in PDF format
              </p>
            </div>
          </div>

          <p className="pt-2">
            You can then{' '}
            <strong className="text-slate-900 font-semibold">edit your CV as you wish</strong> using our CV creation software. Convenient for sending a{' '}
            <strong className="text-slate-900 font-semibold">personalised application to different recruiters!</strong>
          </p>

          <p>
            For a cover letter, the procedure is identical. You simply need to select from the proposed examples a cover letter template and then write your text directly online in the tool. You can also paste your letters from Word.
          </p>

          {/* Expanded sections */}
          {isExpanded && (
            <div className="space-y-8 pt-4 animate-in fade-in duration-200">
              {/* How to create a free online CV? */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a free online CV?
                </h3>
                <p>
                  To test the online CV creation tool, a trial is offered. All you need to do is{' '}
                  <strong className="text-slate-900 font-semibold">
                    select the free and stylish CV template in the first step of creation
                  </strong>
                  .
                </p>
                <p>
                  You also have the option of creating your CV for free using Open Office or Word. <strong className="text-slate-900 font-semibold">Free CV templates are offered when you open a new document</strong>. Pre-filled, you simply need to replace the text with your information.
                </p>
                <p>
                  Please note that some templates only include the &ldquo;basic&rdquo; sections (personal details, experiences, education, activities). To add other elements, such as a title or your professional skills, you will need to modify the document, with the risk of misalignment that this entails. For a professional CV that is compatible with your job, it is therefore best to choose an online CV template.
                </p>
              </div>

              {/* Create a design CV from an online CV template */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Create a design CV from an online CV template
                </h3>
                <p>
                  1 recruiter out of 2 places importance on the design of a CV. Maximise your chances of being selected for the job by using a modern CV template.
                </p>
                <p>
                  CVs have evolved in recent years. In terms of form, colour has appeared, and there is a greater willingness to embrace originality. In terms of content, the sections have not changed (title, experience, degrees, skills, languages), but it is important today to showcase your skills and qualities at work. Discover our CV writing guide to learn more and receive personalised advice based on your profile and the position sought.
                </p>
              </div>

              {/* CV templates suitable for all types of jobs and profiles */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  CV templates suitable for all types of jobs and profiles
                </h3>
                <p>
                  On MakeMyCV, students and professionals can find the CV template that suits them. Whether understated or more modern, we have designed CV layouts that adapt to all types of jobs and ages. They are also compliant with current standards and validated by professional recruiters.
                </p>
                <p>
                  And for a perfectly cohesive application, do not hesitate to also use one of our universal cover letter templates. Whatever your profile and the job targeted, they will certainly appeal to recruiters.
                </p>
              </div>

              {/* How to create a simple CV that will appeal to all recruiters? */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a simple CV that will appeal to all recruiters?
                </h3>
                <p>
                  The competition is fierce in the job market in 2026. Many candidates are looking for work and are making extra efforts to attract recruiters. To increase your chances of landing an interview, some tips can help you.
                </p>
                <p>A professional CV will be compartmentalised into various essential sections:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Civil status</li>
                  <li>Title</li>
                  <li>Profile</li>
                  <li>Professional Experiences</li>
                  <li>Training</li>
                  <li>Skills (qualities, languages and IT)</li>
                </ul>
                <p>
                  For the presentation of your document, <strong className="text-slate-900 font-semibold">stay understated and focus on clarity and readability</strong>. You can nevertheless add a bit of colour to the section headings to make it more modern. Take inspiration from our simple CV templates available online.
                </p>
              </div>

              {/* What colour to choose for a design CV? */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  What colour to choose for a design CV?
                </h3>
                <p>
                  While the black and white CV remains a classic, it often turns out to be a bit dull. To <strong className="text-slate-900 font-semibold">create a stylish CV that will stand out everywhere</strong>, we recommend using blue, which is the quintessential unifying colour. Depending on your sector, you can easily <strong className="text-slate-900 font-semibold">personalise your CV template by choosing from different shades</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>yellow and orange are suited for creative CVs in marketing and communication, for example;</li>
                  <li>red will reflect a dynamic personality for commercial or banking professions;</li>
                  <li>brown will be ideal for construction or craftsmanship trades;</li>
                  <li>a CV template with touches of green will highlight your environmental sensitivity and will be ideal in the ecology or wellness professions sector.</li>
                </ul>
              </div>

              {/* Tips for 2026 */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Our tips for a good CV in 2026
                </h3>
                <p>
                  A CV that will be noticed must contain the <strong className="text-slate-900 font-semibold">information that the recruiter expects</strong>. Get straight to the point with a one-page document. And above all, <strong className="text-slate-900 font-semibold">customise your CV as much as possible according to the position to be filled</strong>. Follow our tips for writing an effective CV for an application that will be retained by the employers you are targeting:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Only indicate experiences relevant to the position to be filled</li>
                  <li>Highlight your achievements rather than your tasks</li>
                  <li>Add examples of quantified results from your missions</li>
                  <li>Highlight the professional qualities expected by the employer</li>
                </ul>
              </div>

              {/* How to create a CV in PDF format? */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a CV in PDF format?
                </h3>
                <p>
                  All CVs you create on our CV designer are exportable in PDF format. This ensures you maintain the correct formatting of your curriculum when sending your application to the recruiter. The PDF format is important because it is readable by ATS, the recruitment software that scans your CV for keywords.
                </p>
                <p>
                  On our CV designer, once your document is filled out, you just need to click on the &ldquo;Download&rdquo; button to save your CV as a PDF on your computer.
                </p>
              </div>

              {/* How to create a CV using your phone? */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  How to create a CV using your phone?
                </h3>
                <p>
                  <strong className="text-slate-900 font-semibold">Our online CV designer is mobile friendly</strong> and allows you to create a CV from your smartphone. There is no need to download an app; you can create your CV directly from our website in mobile version.
                </p>
              </div>
            </div>
          )}

          {/* Show more / Show less Button matching reference */}
          <div className="text-center pt-6">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center px-8 py-2.5 rounded-lg bg-[#3b5bfd] hover:bg-[#2f4ee8] text-white font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
