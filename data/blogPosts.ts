export interface Author {
  name: string;
  role: string;
}

export interface RelatedTemplateLink {
  label: string;
  href: string;
  description: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: 'ATS Guide' | 'CV Tips' | 'Interviews' | 'Career Growth' | 'Graduate & School Leaver';
  readTime: string;
  date: string;
  datePublished: string;
  dateModified: string;
  author: Author;
  image: string;
  imageAlt: string;
  keywords: string[];
  keyTakeaways: string[];
  relatedTemplateLinks: RelatedTemplateLink[];
  faqs: BlogFaqItem[];
  content: {
    intro: string;
    sections: BlogSection[];
    conclusion: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-write-a-cv-uk',
    title: 'How to Write a Job-Winning UK CV in 2026: Complete British A4 Guide',
    seoTitle: 'How to Write a UK CV in 2026: Format, Layout & Examples',
    metaDescription:
      'Learn how to write a UK CV in 2026 with recruiter-approved British A4 formatting, personal statement examples, section order, and free UK CV templates.',
    excerpt:
      'Master modern British CV conventions—from crafting a concise four-line personal profile and Equality Act compliant header to quantifying achievements across two crisp ISO A4 pages.',
    category: 'CV Tips',
    readTime: '7 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T08:00:00.000Z',
    dateModified: '2026-11-02T08:00:00.000Z',
    author: {
      name: 'Eleanor Vance',
      role: 'Senior UK Recruitment Lead',
    },
    image: '/assets/blog/uk-cv-writing-guide.jpg',
    imageAlt:
      'Printed British ISO A4 curriculum vitae document beside a laptop and fountain pen on a London oak desk',
    keywords: [
      'how to write a cv uk',
      'uk cv format 2026',
      'british cv layout',
      'personal statement examples uk cv',
      'uk cv length 2 pages',
      'free uk cv templates',
    ],
    keyTakeaways: [
      'Keep experienced UK CVs to two full ISO A4 pages (210 × 297 mm), or one page for 16-year-olds, school leavers, and early graduates.',
      'Omit headshots, date of birth, marital status, and full street addresses in line with the UK Equality Act 2010 (except for Spotlight acting CVs).',
      'Lead with a tailored 3–4 line Personal Profile, followed by reverse-chronological Work History quantified with commercial or operational results.',
      'Use standard British English spelling and clean, single-layer headings so both hiring managers and ATS software read your timeline effortlessly.',
    ],
    relatedTemplateLinks: [
      {
        label: 'Free UK CV Templates Hub',
        href: '/cv-templates',
        description: 'Compare our four flagship British A4 layouts and 20+ sector designs.',
      },
      {
        label: 'ATS-Friendly CV Templates',
        href: '/ats-friendly-cv-template',
        description: 'Single-column layouts tested on Reed, Indeed UK, and Workday.',
      },
      {
        label: 'Finance & Banking CV Template',
        href: '/finance-cv-template',
        description: 'City of London & Canary Wharf deal-ready corporate formatting.',
      },
      {
        label: 'NHS & Nursing CV Template',
        href: '/nursing-cv-template',
        description: 'NMC PIN, CPD, and clinical governance layouts for NHS Trusts.',
      },
    ],
    faqs: [
      {
        question: 'How long should a CV be in the UK in 2026?',
        answer:
          'Two sides of ISO A4 paper remain the benchmark for experienced UK professionals. If you are writing your first CV at 16, leaving Sixth Form, or applying for performing arts roles, a crisp one-page A4 CV is preferred.',
      },
      {
        question: 'Should I put a photo or my date of birth on a British CV?',
        answer:
          'No. Under UK Equality Act 2010 anti-discrimination guidance, British employers strongly prefer CVs without photographs, age, date of birth, or marital status. The sole industry exception is theatrical and screen casting, where an Equity or Spotlight headshot is expected.',
      },
      {
        question: 'Do I still need to write "References available upon request" on a UK CV?',
        answer:
          'Most UK recruiters assume you can provide two referees at offer stage, so you only need that line if space permits at the foot of page two—or when applying to clinical NHS and safeguarding roles that explicitly ask for referee details upfront.',
      },
    ],
    content: {
      intro:
        'British hiring managers spend an average of seven seconds on their initial scan of an application. Whether you are targeting a corporate role in London, an engineering post in Manchester, or a clinical band progression, understanding how to structure a modern UK CV is the fastest way to turn applications into interview invitations. You can follow every rule below manually or apply them automatically inside our [free UK CV templates](/cv-templates).',
      sections: [
        {
          id: 'british-a4-format-vs-us-resume',
          heading: '1. Understand the British ISO A4 Standard (Not a US Resume)',
          body: [
            'One of the most frequent mistakes UK applicants make is downloading an American "US Letter" resume template. US Letter paper (215.9 × 279.4 mm) is wider and shorter than British ISO A4 (210 × 297 mm), causing awkward margin clipping when printed or previewed by British recruitment agencies.',
            'Equally important are UK hiring norms under the Equality Act 2010. Never include your date of birth, marital status, nationality (unless clarifying Right to Work), or a profile photograph—unless you are a performer using a specialist [UK acting and Spotlight CV template](/acting-cv-template). Your header needs only your full name, target job title, town/city (for example, "Leeds, West Yorkshire"), mobile number, professional email, and LinkedIn URL.',
          ],
          bullets: [
            'Page size: Strict ISO A4 (210 × 297 mm) with balanced 15–20 mm margins.',
            'Ideal length: Two A4 pages for experienced hires; one A4 page for students and school leavers.',
            'Spelling & dates: British English throughout ("organised", "programme", "specialised") and UK month-year dates ("Sept 2023 – Present").',
          ],
        },
        {
          id: 'how-to-write-uk-personal-profile',
          heading: '2. Write a Sharp Four-Line Personal Profile',
          body: [
            'Directly beneath your contact bar sits your Personal Profile (also called a Personal Statement or Executive Summary). Avoid vague clichés such as "hard-working team player seeking a challenging opportunity." Instead, answer three concrete questions in 50 to 80 words: Who are you professionally? What measurable value have you delivered? What specific UK role are you targeting next?',
            'For example, an operations candidate might write: "Commercial Operations Manager with 6+ years’ experience scaling multi-site UK retail logistics. Reduced warehouse dispatch lead times by 28% and oversaw a £4.2m annual budget across 45 staff. Seeking a Senior Operations Lead role where lean process design drives sustainable margin growth." You can draft and refine yours in seconds inside our [live A4 CV builder](/builder).',
          ],
        },
        {
          id: 'quantify-work-experience-bullets',
          heading: '3. Quantify Your Work History With Outcomes, Not Duties',
          body: [
            'Hiring managers already know what a Marketing Executive, Staff Nurse, or Financial Analyst does day to day—they want proof of how well you did it. List your roles in reverse-chronological order (most recent first) and replace copied job descriptions with 3 to 5 bullet points starting with strong past-tense action verbs.',
            'Sector expectations vary across Britain. City banking and audit recruiters expect deal values, IFRS/ACA credentials, and margin basis points formatted cleanly like our [finance CV template](/finance-cv-template), whereas NHS Trust shortlisting panels check NMC registration, patient safety audits, and multidisciplinary care aligned with our [NHS nursing CV template](/nursing-cv-template).',
          ],
          bullets: [
            'Lead with impact: "Increased regional B2B renewal rates from 76% to 91% within 12 months."',
            'Show scale: Include team sizes, customer volumes, patient caseloads, or £ GBP budgets.',
            'Keep older roles brief: Summarize positions held more than 10 years ago to 1–2 lines.',
          ],
        },
        {
          id: 'education-skills-and-ats-readability',
          heading: '4. Structure Qualifications, Core Skills & ATS Compatibility',
          body: [
            'If you have two or more years of full-time work history, place Education below Work Experience. List your university degree with classification (e.g., "BA (Hons) Business Management, 2:1"), institution, and graduation year. Summarize A-Levels by subject and grade, and condense GCSEs to a single clean line such as "9 GCSEs (Grades 9–6), including English Language and Mathematics." If you are still in education or applying for your first role, read our dedicated [first CV guide for 16-year-olds, school leavers, and graduates](/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk).',
            'Finally, ensure your layout passes automated screening software before a human ever opens it. Over 75% of large UK employers filter incoming CVs using parser software—so pair clean typography with an [ATS-friendly CV template](/ats-friendly-cv-template) and review our in-depth [guide to beating UK Applicant Tracking Systems](/blog/ats-friendly-cv-uk-guide).',
          ],
        },
      ],
      conclusion:
        'A standout UK CV does not rely on decorative graphics—it wins interviews through unmistakable visual hierarchy, British A4 precision, and quantified evidence. Choose a recruiter-tested layout on [freecvmakeruk.co.uk](/start) to build or [import your existing CV](/import) and export a crisp A4 PDF or Word file at zero cost.',
      ctaText: 'Browse Free UK CV Templates',
      ctaLink: '/cv-templates',
    },
  },
  {
    id: 'ats-friendly-cv-uk-guide',
    title: 'How to Beat UK Applicant Tracking Systems (ATS): Formatting Rules That Work',
    seoTitle: 'ATS-Friendly CV Guide UK: How to Pass Recruiter Scanners',
    metaDescription:
      'Discover how UK Applicant Tracking Systems parse your CV on Reed, Indeed UK, Workday, and NHS Trac—plus formatting rules and free ATS-ready A4 layouts.',
    excerpt:
      'Why qualified UK candidates get filtered out by Workday, Greenhouse, Reed, and NHS Trac—and the exact typography, heading, and keyword fixes that guarantee 100% parser accuracy.',
    category: 'ATS Guide',
    readTime: '6 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T09:00:00.000Z',
    dateModified: '2026-11-02T09:00:00.000Z',
    author: {
      name: 'Marcus Sterling',
      role: 'HR Tech & Talent Acquisition Specialist',
    },
    image: '/assets/blog/uk-ats-cv-scanner-guide.jpg',
    imageAlt:
      'London recruitment specialists reviewing clean ATS-friendly printed A4 CV layouts in a glass consulting room',
    keywords: [
      'ats friendly cv uk',
      'how to pass ats scanners uk',
      'applicant tracking system cv format uk',
      'reed cv library ats tips',
      'workday cv parsing uk',
      'ats cv template free uk',
    ],
    keyTakeaways: [
      'Avoid multi-column floating text boxes, graphics, skill percentage bars, and header/footer contact details that scramble text extraction order.',
      'Use conventional UK section headings ("Personal Profile", "Work Experience", "Education", "Core Skills") rather than creative titles.',
      'Mirror exact British job-specification terminology (e.g., "Stakeholder Management", "PRINCE2", "ACCA", "Safeguarding") naturally inside your experience bullets.',
      'Export text-based ISO A4 PDFs or clean .docx files—never upload flattened image scans created in graphic design posters.',
    ],
    relatedTemplateLinks: [
      {
        label: 'ATS-Friendly CV Templates',
        href: '/ats-friendly-cv-template',
        description: 'Zero-table linear DOM layouts built for strict corporate & public portals.',
      },
      {
        label: 'Smart UK CV Parser & Importer',
        href: '/import',
        description: 'Upload your old PDF or Word CV to test extraction and upgrade its layout.',
      },
      {
        label: 'NHS & Clinical Nursing Templates',
        href: '/nursing-cv-template',
        description: 'Structured for NHS Jobs, Trac shortlisting, and clinical agency portals.',
      },
      {
        label: 'All British A4 CV Templates',
        href: '/cv-templates',
        description: 'Explore every recruiter-verified UK layout in our library.',
      },
    ],
    faqs: [
      {
        question: 'Is PDF or Word (.docx) better for UK ATS portals?',
        answer:
          'Modern cloud ATS platforms used in the UK—such as Workday, Greenhouse, Lever, and SmartRecruiters—parse text-layer A4 PDFs accurately while locking your visual typography. However, specialist UK recruitment agencies (like Hays, Michael Page, or Reed consultants) sometimes request an editable .docx file so they can attach a cover sheet. Exporting both from our builder covers every scenario.',
      },
      {
        question: 'Do two-column CVs always fail Applicant Tracking Systems?',
        answer:
          'Not when built with clean HTML/text reading order, though floating Word text boxes and nested tables frequently merge left- and right-column sentences together. For maximum safety on strict portals like Civil Service Jobs, FTSE 100 Workday systems, or NHS Trac, a single-column layout like our Oxford template is the gold standard.',
      },
      {
        question: 'Can I hide white text keywords at the bottom of my CV to trick ATS?',
        answer:
          'Never do this. Modern UK ATS platforms strip font colours and render plain text directly to the recruiter, immediately exposing hidden keyword blocks and resulting in automatic disqualification.',
      },
    ],
    content: {
      intro:
        'Across FTSE 250 companies, NHS Trusts, Civil Service departments, and major job boards like Reed.co.uk, Totaljobs, and Indeed UK, over three-quarters of applications pass through an Applicant Tracking System (ATS) before reaching a hiring manager. An ATS does not "reject" people at random—instead, poorly structured layouts scramble your job titles and dates so your profile never surfaces in recruiter keyword searches. Starting with a verified [ATS-friendly CV template](/ats-friendly-cv-template) eliminates structural parsing errors from day one.',
      sections: [
        {
          id: 'how-uk-ats-parsers-read-your-cv',
          heading: '1. How British ATS Software Actually Reads Your Document',
          body: [
            'When you upload a CV to Workday, Taleo, Bullhorn, or CV-Library, an optical and structural parser strips away colours and borders to extract raw text into database fields: Contact Info, Current Job Title, Total Years of Experience, Skills, and Qualifications.',
            'If your CV was built inside a poster design app using floating text boxes, multi-cell tables, or SVG icons in place of headings, the parser often reads straight across columns—merging your sidebar skills right into the middle of your employment dates. You can see how a parser reads your current file right now by testing our [free CV upload and parser tool](/import).',
          ],
          bullets: [
            'Never place your email address or phone number inside a Word document Header/Footer region—many legacy parsers skip header/footer layers completely.',
            'Replace visual skill bars ("80% Excel") with explicit text skills ("Advanced Microsoft Excel: PivotTables, XLOOKUP, Power Query").',
            'Use standard bullet characters (•) rather than custom wingdings or emoji symbols.',
          ],
        },
        {
          id: 'use-predictable-uk-section-headings',
          heading: '2. Stick to Standard UK Section Headings',
          body: [
            'Creative headings such as "My Journey So Far", "Where I Studied", or "Superpowers" confuse automated section classifiers. When an ATS cannot locate your "Work Experience" heading, it may record zero years of relevant experience even if you have a decade in the industry.',
            'Follow the classic British hierarchy covered in our [complete guide on how to write a UK CV](/blog/how-to-write-a-cv-uk): **Personal Profile**, **Work Experience** (or **Employment History**), **Education & Qualifications**, **Core Skills**, and optional **Certifications** or **Projects**.',
          ],
        },
        {
          id: 'keyword-alignment-for-uk-job-specs',
          heading: '3. Align Keywords With the UK Job Specification Naturally',
          body: [
            'Recruiters filter their ATS talent pool using Boolean searches that combine role titles, qualifications, and technical competencies—for example, `"Management Accountant" AND ("CIMA" OR "ACCA") AND "SAP"`. If a job advert asks for "Stakeholder Engagement" and "GDPR Compliance" while your CV only mentions "client talks" and "data rules", you will rank lower than equally capable peers.',
            'Tailor your Personal Profile and Core Skills bank for each high-priority application. Include both the spelled-out British qualification and its acronym—such as "Association of Chartered Certified Accountants (ACCA)" on a [finance CV template](/finance-cv-template) or "Nursing and Midwifery Council (NMC) Registered" on an [NHS nursing CV template](/nursing-cv-template). Early-career candidates can apply the same method to degree modules and GCSEs using our [graduate CV templates](/graduate-cv-templates).',
          ],
        },
        {
          id: 'pdf-vs-docx-for-uk-applications',
          heading: '4. Choose the Right Export Format: Text-Layer PDF vs DOCX',
          body: [
            'Not all PDFs are equal. A PDF exported from a rasterised image editor contains zero selectable text, forcing the ATS to rely on error-prone OCR. By contrast, every template in our [British A4 CV template library](/cv-templates) generates a clean text-layer ISO A4 PDF alongside an editable Microsoft Word (`.docx`) file.',
            'Want the cleanest linear structure right away? Open our [Oxford ATS layout directly in the CV Builder](/builder?template=minimal-clean) or explore [all start options](/start) to convert your existing CV in under two minutes.',
          ],
        },
      ],
      conclusion:
        'Passing UK ATS filters is about clarity, not gaming an algorithm. Pair clean linear formatting, standard British headings, and authentic job-spec terminology so both automated parsers and human hiring managers immediately recognise your fit.',
      ctaText: 'Use an ATS-Friendly UK Template',
      ctaLink: '/ats-friendly-cv-template',
    },
  },
  {
    id: 'first-cv-guide-16-year-old-school-leaver-graduate-uk',
    title: 'Writing Your First UK CV With Little or No Experience: GCSEs, A-Levels & Graduates',
    seoTitle: 'First CV Guide UK: 16-Year-Olds, School Leavers & Grads',
    metaDescription:
      'Step-by-step UK guide to writing your first CV at 16, after Sixth Form, or at university. Learn how to list GCSEs, A-Levels, degree modules, and skills.',
    excerpt:
      'No full-time work history yet? Here is how Year 11 students, Sixth Form school leavers, and UK university graduates turn predicted grades, coursework, volunteering, and Saturday jobs into interview-winning CVs.',
    category: 'Graduate & School Leaver',
    readTime: '8 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T10:00:00.000Z',
    dateModified: '2026-11-02T10:00:00.000Z',
    author: {
      name: 'Hannah Alverton',
      role: 'UK Early Careers & Campus Adviser',
    },
    image: '/assets/blog/uk-graduate-school-leaver-cv.jpg',
    imageAlt:
      'Young British graduate reviewing a one-page printed A4 CV with a laptop in a bright UK university library',
    keywords: [
      'first cv no experience uk',
      'cv for 16 year old uk',
      'school leaver cv guide uk',
      'graduate cv tips uk',
      'how to put predicted grades on cv uk',
      'apprenticeship cv uk',
    ],
    keyTakeaways: [
      'Flip the traditional layout: put Core Skills and Education above Work Experience when you have limited employment history.',
      'Include predicted GCSE, A-Level, BTEC, T-Level, or university degree classifications clearly alongside key coursework or projects.',
      'Treat Year 10/12 work placements, Duke of Edinburgh awards, sports captaincy, society committees, and volunteering as real evidence of reliability.',
      'Stick to one crisp A4 page for 16-year-olds and school leavers, expanding to two pages only when graduate internships and projects warrant it.',
    ],
    relatedTemplateLinks: [
      {
        label: '16-Year-Old CV Templates',
        href: '/cv-template-16-year-old',
        description: 'One-page GCSE and skills-first layouts for Saturday & retail jobs.',
      },
      {
        label: 'School Leaver & Apprenticeship CVs',
        href: '/school-leaver-cv-template',
        description: 'Built for Sixth Formers, BTEC/T-Level students, and degree apprenticeships.',
      },
      {
        label: 'UK Graduate CV Templates',
        href: '/graduate-cv-templates',
        description: 'Academic-led layouts for summer internships and graduate schemes.',
      },
      {
        label: 'Browse All Free UK CV Templates',
        href: '/cv-templates',
        description: 'Compare classic, modern, creative, and entry-level A4 designs.',
      },
    ],
    faqs: [
      {
        question: 'How do I list predicted GCSE or A-Level grades on a UK CV?',
        answer:
          'Write your school or Sixth Form college name, dates attended (e.g., "Sept 2024 – June 2026"), and clearly mark grades as predicted—for example: "9 GCSEs (Predicted Grades 8–5), including English Language (7), Mathematics (7), and Combined Science (7-6)."',
      },
      {
        question: 'What can I put under Experience if I have never had a paid job?',
        answer:
          'Rename the section "Work Experience & Volunteering" or "Positions of Responsibility". Include Year 10 or Year 12 work experience weeks, charity shop volunteering, tutoring younger pupils, Duke of Edinburgh expeditions, school council roles, or university society committee duties.',
      },
      {
        question: 'Should a UK graduate CV be one page or two pages?',
        answer:
          'Both are accepted in the UK depending on sector: investment banks and strategy consultancies strongly favour a tight one-page A4 CV, whereas engineering, civil service, and general corporate graduate schemes welcome up to two A4 pages if you have placements, dissertations, and society leadership to showcase.',
      },
    ],
    content: {
      intro:
        'Every UK professional started with a blank employment section. Whether you are 16 looking for a weekend retail or hospitality job, an 18-year-old Sixth Form leaver applying for Level 4–6 apprenticeships, or a final-year undergraduate targeting graduate schemes, employers do not expect ten years of corporate experience—they look for reliability, communication skills, and eagerness to learn. Choosing an entry-level layout from our [free UK CV templates](/cv-templates) puts your strongest assets at the top of the page.',
      sections: [
        {
          id: 'cv-tips-for-16-year-olds-and-gcse-students',
          heading: '1. Ages 16–17: Building a One-Page GCSE & First-Job CV',
          body: [
            'When applying to high-street retailers, supermarkets, cafés, leisure centres, or local pharmacies at 16, store managers scan for punctuality, polite customer service, numeracy, and weekend availability. Instead of leaving a half-empty work history section at the top, open with a bright three-line Personal Statement, followed immediately by **Key Transferable Skills** and **Education (GCSEs)**.',
            'Highlight practical school achievements: Prefect or House Captain duties, Duke of Edinburgh (Bronze/Silver), sports teams, drama productions, or helping run a school charity stall. Our dedicated [CV template for a 16-year-old](/cv-template-16-year-old)—including the [York GCSE starter layout in the builder](/builder?template=york)—is pre-structured in this exact single-page order.',
          ],
          bullets: [
            'Never include your exact date of birth or school uniform photo—just your name, town, mobile number, and professional email.',
            'Mention availability clearly in your personal profile (e.g., "Available Saturdays, Sundays, and school holidays").',
            'List predicted GCSE grades honestly if you are sitting exams this summer.',
          ],
        },
        {
          id: 'school-leavers-sixth-form-and-apprenticeships',
          heading: '2. School Leavers (17–19): Winning Degree & Higher Apprenticeships',
          body: [
            'UK apprenticeship employers—from engineering firms and NHS Trusts to Big Four accounting pathways—assess potential against structured competency frameworks. On a [school leaver CV template](/school-leaver-cv-template), showcase your A-Levels, T-Levels, or BTEC National Extended Diploma alongside relevant coursework modules, Extended Project Qualifications (EPQ), and virtual insight weeks.',
            'If you worked part-time on tills, waited tables, coached junior football, or completed a T-Level industry placement, quantify your reliability: how many customers you served on busy Saturday shifts, how you handled cash-ups accurately, or how you collaborated in a team.',
          ],
        },
        {
          id: 'uk-university-graduates-and-placement-students',
          heading: '3. University Graduates: Turning Academic Rigour Into Commercial Value',
          body: [
            'Graduate recruiters receive hundreds of applications from candidates with similar `2:1` or First-Class Honours degrees. Differentiate yours on our [UK graduate CV templates](/graduate-cv-templates) by unpacking three high-value modules, your dissertation topic and methodology, technical software tools (Python, R, SPSS, AutoCAD, Financial Modelling), and measurable outcomes from university societies or summer internships.',
            'Applying to creative drama schools or agency showcases instead? Switch to an industry-calibrated [acting and Spotlight CV template](/acting-cv-template) so casting directors see your credits and training in tabular format. Applying to investment banking spring weeks or audit graduate intakes? Pair single-page precision with our [finance CV template](/finance-cv-template).',
          ],
        },
        {
          id: 'proofread-and-pass-graduate-ats-portals',
          heading: '4. Pass Automated Campus & Apprenticeship Portals',
          body: [
            'Large UK apprenticeship and graduate employers almost universally use automated application portals to screen initial CV uploads. Before submitting, verify that your headings and dates follow the standards in our [complete UK CV writing guide](/blog/how-to-write-a-cv-uk) and check your layout against our [UK ATS formatting guide](/blog/ats-friendly-cv-uk-guide) so every grade and skill parses cleanly.',
            'Ready to put your first CV together in under five minutes? Head to our [guided CV start page](/start) to build section by section with built-in British English phrasing prompts.',
          ],
        },
      ],
      conclusion:
        'Lack of full-time corporate history should never hold back a sharp, honest British CV. Lead with your education, transferable strengths, and real-world initiative—and export a clean ISO A4 PDF for free today.',
      ctaText: 'Start Your First UK CV Free',
      ctaLink: '/start',
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === slug);
}

/**
 * Returns contextually relevant blog articles for each template hub/spoke slug
 * to strengthen internal topic clusters and reciprocal PageRank flow.
 */
export function getBlogPostsForCategorySlug(categorySlug: string): BlogPost[] {
  const byId = (id: string) => BLOG_POSTS.find((p) => p.id === id);

  if (
    categorySlug === 'cv-template-16-year-old' ||
    categorySlug === 'school-leaver-cv-template' ||
    categorySlug === 'graduate-cv-templates'
  ) {
    return [
      byId('first-cv-guide-16-year-old-school-leaver-graduate-uk'),
      byId('how-to-write-a-cv-uk'),
      byId('ats-friendly-cv-uk-guide'),
    ].filter((p): p is BlogPost => Boolean(p));
  }

  if (
    categorySlug === 'ats-friendly-cv-template' ||
    categorySlug === 'finance-cv-template' ||
    categorySlug === 'nursing-cv-template'
  ) {
    return [
      byId('ats-friendly-cv-uk-guide'),
      byId('how-to-write-a-cv-uk'),
      byId('first-cv-guide-16-year-old-school-leaver-graduate-uk'),
    ].filter((p): p is BlogPost => Boolean(p));
  }

  return BLOG_POSTS;
}
