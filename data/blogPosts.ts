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
  {
    id: 'uk-cv-personal-statement-examples',
    title: 'UK CV Personal Statement Examples: How to Write a Winning 4-Line Profile',
    seoTitle: 'UK CV Personal Statement Examples & Formula (2026 Guide)',
    metaDescription:
      'See recruiter-tested UK CV personal statement examples for corporate, finance, NHS nursing, graduates, and career changers—plus a simple 4-line British formula.',
    excerpt:
      'Replace generic clichés with a sharp four-line Personal Profile. Explore tailored British examples for experienced hires, career changers, NHS clinicians, and first-time applicants.',
    category: 'CV Tips',
    readTime: '6 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T11:00:00.000Z',
    dateModified: '2026-11-02T11:00:00.000Z',
    author: {
      name: 'Eleanor Vance',
      role: 'Senior UK Recruitment Lead',
    },
    image: '/assets/blog/uk-personal-statement-cv.jpg',
    imageAlt:
      'Printed British A4 CV personal profile page beside a fountain pen, notebook, and mug of tea by a bright sash window',
    keywords: [
      'cv personal statement examples uk',
      'personal profile cv uk',
      'how to start a cv uk',
      'executive summary cv uk',
      'career change personal statement cv uk',
    ],
    keyTakeaways: [
      'Limit your UK Personal Profile to 50–80 words (3 to 4 crisp lines) directly beneath your header contact bar.',
      'Follow the 3-part British formula: Professional Identity + Quantified Track Record + Next Target Role.',
      'Write in implied first person ("Experienced Commercial Analyst driving...") without repetitive "I" pronouns or third-person phrasing.',
      'Tailor two or three domain terms in your opening lines to match each UK job specification you apply for.',
    ],
    relatedTemplateLinks: [
      {
        label: 'Free UK CV Templates Hub',
        href: '/cv-templates',
        description: 'Preview clean Personal Profile spacing across 20+ British A4 layouts.',
      },
      {
        label: 'Finance & Banking CV Template',
        href: '/finance-cv-template',
        description: 'Executive summary layouts tailored for City & Canary Wharf roles.',
      },
      {
        label: 'NHS & Nursing CV Template',
        href: '/nursing-cv-template',
        description: 'Clinical personal statement structures highlighting NMC PIN and Band level.',
      },
      {
        label: 'Live UK CV Builder',
        href: '/builder',
        description: 'Draft and refine your 4-line personal profile with instant A4 preview.',
      },
    ],
    faqs: [
      {
        question: 'Should a UK CV personal statement be written in first or third person?',
        answer:
          'British recruiters prefer implied first person—dropping "I" and "my" at the start of sentences (for example, "Chartered Management Accountant with 5 years’ experience leading FTSE 250 month-end reporting..."). Avoid writing in the third person ("Eleanor is a manager..."), which reads unnaturally on a British CV.',
      },
      {
        question: 'Is a CV Personal Profile the same as a UCAS Personal Statement?',
        answer:
          'No. A UCAS statement is a 4,000-character academic essay for university admissions, whereas a UK employment CV Personal Profile is a tight 3–4 line commercial pitch sitting at the top of page one.',
      },
      {
        question: 'How often should I update my CV personal statement?',
        answer:
          'Keep your core metric sentence consistent, but tweak your opening job title and target skills in the final sentence for every high-priority application so hiring managers see an immediate match.',
      },
    ],
    content: {
      intro:
        'Your Personal Profile occupies the highest-value real estate on page one of a British CV. Before scanning your employment dates, hiring managers read those four opening lines to decide whether your seniority, sector background, and commercial focus match their vacancy. Pair the formula below with any layout from our [free UK CV templates](/cv-templates) to hook recruiters in seconds.',
      sections: [
        {
          id: 'the-3-part-british-personal-profile-formula',
          heading: '1. The 3-Part British Personal Profile Formula',
          body: [
            'Most weak personal statements fail because they string together unverifiable adjectives: "enthusiastic, motivated self-starter who works well alone or in a team." Because any candidate can claim those traits, UK recruiters skip right past them.',
            'Anchor your opening paragraph in concrete evidence instead. Sentence one states your current title, years of experience, and sector. Sentence two proves your impact with one or two hard metrics (£ revenue, % efficiency, caseload, or qualification). Sentence three names the exact role and value you bring next—matching the structure in our [complete UK CV writing guide](/blog/how-to-write-a-cv-uk).',
          ],
          bullets: [
            'Line 1 (Identity): Title + years/qualification + industry specialism.',
            'Lines 2–3 (Proof): Quantified commercial, technical, or clinical outcome.',
            'Line 4 (Goal): Target UK role title and specific contribution.',
          ],
        },
        {
          id: 'sector-specific-uk-examples',
          heading: '2. Sector-Specific UK Personal Statement Examples',
          body: [
            '**Corporate & Operations:** "Operations Lead with 7 years’ experience optimising multi-site UK grocery and 3PL supply chains. Reduced regional fulfilment costs by £340k YoY while lifting on-time store deliveries from 91% to 98.4%. Targeting a Senior Supply Chain Manager post to scale automated warehouse workflows."',
            '**Finance & Accountancy:** "ACCA-qualified Financial Analyst with 4 years’ FP&A and statutory reporting experience across mid-market SaaS firms. Built rolling 13-week cash-flow models covering £28m ARR and shortened month-end close by three working days." Format profiles like this cleanly on our [finance CV template](/finance-cv-template) or clinical equivalents on our [NHS nursing CV template](/nursing-cv-template).',
          ],
        },
        {
          id: 'career-changers-and-first-job-profiles',
          heading: '3. Writing a Profile When Changing Careers or Starting Out',
          body: [
            'Pivoting industries? Bridge your past transferable achievements directly to the new discipline—mentioning completed UK certifications (such as PRINCE2, CIPD Level 5, or CompTIA) in sentence one so ATS parsers and hiring leads understand your transition immediately.',
            'If you are still at school or university, focus on academic rigour, reliability, and availability. See dedicated student phrasing inside our [first CV guide for 16-year-olds, school leavers, and graduates](/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk).',
          ],
        },
      ],
      conclusion:
        'Four focused lines of evidence beat half a page of buzzwords every time. Draft your profile inside our [free British A4 CV builder](/builder) and see how cleanly it sits at the top of your page.',
      ctaText: 'Build Your Personal Profile Free',
      ctaLink: '/builder',
    },
  },
  {
    id: 'uk-cv-keywords-and-action-verbs-ats',
    title: 'Best CV Keywords & Action Verbs for UK Job Applications (2026 ATS Guide)',
    seoTitle: 'Best UK CV Keywords & Action Verbs to Pass ATS Scanners',
    metaDescription:
      'Upgrade weak duties with high-impact British CV action verbs and industry ATS keywords tested across Workday, Reed, Civil Service Jobs, and NHS Trac.',
    excerpt:
      'Swap passive phrases like "responsible for" with measurable British action verbs and exact job-spec keywords that rank higher in recruiter Boolean searches.',
    category: 'ATS Guide',
    readTime: '6 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T11:30:00.000Z',
    dateModified: '2026-11-02T11:30:00.000Z',
    author: {
      name: 'Marcus Sterling',
      role: 'HR Tech & Talent Acquisition Specialist',
    },
    image: '/assets/blog/uk-ats-keywords-cv.jpg',
    imageAlt:
      'Printed British A4 CVs and silver laptop on a modern London glass meeting table overlooking the city skyline',
    keywords: [
      'cv keywords uk',
      'action verbs for cv uk',
      'ats keywords uk job application',
      'power words for cv uk',
      'replace responsible for on cv',
    ],
    keyTakeaways: [
      'Eliminate passive fillers ("Responsible for", "Assisted with", "Duties included") and open every bullet with a decisive past-tense verb.',
      'Pair hard competency nouns (e.g., "P&L Forecasting", "CQC Compliance", "Agile Delivery") with concrete outcomes rather than dumping isolated word lists.',
      'Include both British qualification titles and abbreviations—for example, "Chartered Institute of Personnel and Development (CIPD)".',
      'Keep British spelling consistent ("optimised", "standardised", "commercialised") when applying to UK-headquartered employers.',
    ],
    relatedTemplateLinks: [
      {
        label: 'ATS-Friendly CV Templates',
        href: '/ats-friendly-cv-template',
        description: 'Clean single-column British A4 templates engineered for keyword clarity.',
      },
      {
        label: 'Upload & Parse Existing CV',
        href: '/import',
        description: 'Import your current PDF or Word CV and sharpen weak bullet points fast.',
      },
      {
        label: 'Finance & Corporate Templates',
        href: '/finance-cv-template',
        description: 'High-density A4 layouts ideal for quantified commercial bullet points.',
      },
      {
        label: 'All Free UK CV Templates',
        href: '/cv-templates',
        description: 'Compare classic, modern, and technical A4 templates side by side.',
      },
    ],
    faqs: [
      {
        question: 'How many keywords from the job advert should I include on my UK CV?',
        answer:
          'Aim to mirror the 6 to 10 core essential criteria listed in the Person Specification—such as specific software, regulatory frameworks, qualifications, and core responsibilities—woven naturally into your Personal Profile, Core Skills, and Work Experience bullets.',
      },
      {
        question: 'Should I use past or present tense action verbs on my CV?',
        answer:
          'Use present tense verbs ("Lead", "Oversee", "Deliver") for responsibilities in your current role, and past tense verbs ("Negotiated", "Streamlined", "Delivered") for all previous roles and completed projects.',
      },
      {
        question: 'Does British vs American spelling affect UK ATS keyword matching?',
        answer:
          'While modern semantic search engines recognise many variants, strict Boolean filters used by UK agency consultants on Reed or CV-Library commonly query British spellings ("Financial Modelling", "Organisation", "Licence"). Stick to UK English unless applying to a US firm.',
      },
    ],
    content: {
      intro:
        'Once your layout follows clean structural rules—as covered in our [UK ATS formatting guide](/blog/ats-friendly-cv-uk-guide)—the words inside your bullet points determine where you rank in recruiter searches. Combining precise domain nouns with strong British action verbs turns flat job descriptions into persuasive evidence on any [ATS-friendly CV template](/ats-friendly-cv-template).',
      sections: [
        {
          id: 'hard-nouns-vs-action-verbs-in-ats',
          heading: '1. Why ATS Scanners Search Nouns While Humans Read Verbs',
          body: [
            'Recruiters rarely type verbs like "spearheaded" into Bullhorn or Workday search bars. Instead, they search hard nouns: job titles, software tools, UK regulatory standards, and accredited qualifications (`"Project Manager" AND "PRINCE2" AND "RAID Logs"`).',
            'Once your CV surfaces in that shortlist, the human hiring manager reads your bullet points—and strong action verbs ("Delivered", "Restructured", "Negotiated", "Safeguarded") immediately signal ownership rather than passive attendance.',
          ],
          bullets: [
            'Leadership & Ownership: Directed, Mobilised, Mentored, Chaired, Spearheaded.',
            'Commercial & Revenue: Negotiated, Accelerated, Captured, Retained, Monetised.',
            'Operations & Efficiency: Streamlined, Automated, Consolidated, Standardized, Audited.',
          ],
        },
        {
          id: 'mirroring-uk-person-specifications',
          heading: '2. Extracting High-Value Keywords From UK Person Specifications',
          body: [
            'Public sector portals (NHS Trac, Civil Service Jobs, university HR systems) and FTSE corporate careers pages score applications directly against "Essential" and "Desirable" criteria. Highlight recurring multi-word phrases in the job pack—for example, "Stakeholder Management", "GDPR Data Governance", "Multi-Agency Safeguarding", or "IFRS 16 Reporting".',
            'Weave those exact phrases into your **Core Skills** list and prove each one inside a dated **Work Experience** bullet. You can test how cleanly your current bullets extract by uploading your file to our [free UK CV importer](/import).',
          ],
        },
        {
          id: 'rewriting-weak-cv-bullets-before-and-after',
          heading: '3. Before & After: Upgrading Passive UK CV Bullets',
          body: [
            'Compare *"Responsible for looking after key client accounts and dealing with renewals"* against *"Managed a £1.8m portfolio of 34 UK enterprise accounts, lifting annual contract renewals from 82% to 94% through quarterly executive business reviews."*',
            'Combine this phrasing discipline with our [UK CV Personal Statement guide](/blog/uk-cv-personal-statement-examples) so your entire page reads with unmistakable authority.',
          ],
        },
      ],
      conclusion:
        'Strong UK CV writing pairs recruiter search terms with tangible commercial or clinical proof. Open any layout in our [British CV template hub](/cv-templates) to put sharp, ATS-ready phrasing to work immediately.',
      ctaText: 'Try an ATS-Ready UK Template',
      ctaLink: '/ats-friendly-cv-template',
    },
  },
  {
    id: 'uk-apprenticeship-cv-guide',
    title: 'How to Write a UK Apprenticeship CV: Level 3, Higher & Degree Apprenticeships',
    seoTitle: 'UK Apprenticeship CV Guide: Degree & School Leaver Tips',
    metaDescription:
      'Applying for Level 3, Higher, or Degree Apprenticeships in the UK? Learn how to structure your A-Levels, BTECs, T-Levels, projects, and transferable skills.',
    excerpt:
      'Stand out on Gov.uk, UCAS, and FTSE 100 apprenticeship portals with a crisp one-page British CV that turns school projects, part-time shifts, and predicted grades into real workplace potential.',
    category: 'Graduate & School Leaver',
    readTime: '7 min read',
    date: '2 November 2026',
    datePublished: '2026-11-02T12:00:00.000Z',
    dateModified: '2026-11-02T12:00:00.000Z',
    author: {
      name: 'Hannah Alverton',
      role: 'UK Early Careers & Campus Adviser',
    },
    image: '/assets/blog/uk-apprenticeship-cv.jpg',
    imageAlt:
      'Printed one-page UK apprenticeship CV beside a closed notebook and laptop in a bright British sixth form and university study space',
    keywords: [
      'apprenticeship cv uk',
      'degree apprenticeship cv template uk',
      'school leaver apprenticeship cv',
      'how to write a cv for an apprenticeship uk',
      'higher apprenticeship cv examples',
    ],
    keyTakeaways: [
      'Match your CV focus to the apprenticeship tier: practical reliability for Level 2–3, and analytical coursework plus commercial curiosity for Level 4–6 Higher & Degree pathways.',
      'Highlight virtual work experience (Springpod, Forage), EPQ topics, T-Level industry placements, and STEM or business societies prominently.',
      'List GCSE English and Mathematics grades explicitly—almost every UK apprenticeship provider checks Level 2 numeracy and literacy eligibility first.',
      'Keep your apprenticeship CV to a crisp single ISO A4 page unless technical project portfolios justify a second page.',
    ],
    relatedTemplateLinks: [
      {
        label: 'School Leaver & Apprenticeship CVs',
        href: '/school-leaver-cv-template',
        description: 'Purpose-built A4 layouts for Sixth Form, BTEC, T-Level, and apprenticeship applicants.',
      },
      {
        label: '16-Year-Old GCSE CV Templates',
        href: '/cv-template-16-year-old',
        description: 'Clean one-page templates for post-16 Level 2 and Level 3 apprenticeships.',
      },
      {
        label: 'UK Graduate CV Templates',
        href: '/graduate-cv-templates',
        description: 'Structured academic & project layouts for competitive corporate intakes.',
      },
      {
        label: 'Guided Free UK CV Start',
        href: '/start',
        description: 'Build your apprenticeship CV step by step in minutes with zero watermarks.',
      },
    ],
    faqs: [
      {
        question: 'Do UK degree apprenticeships require a different CV from university applications?',
        answer:
          'Yes. Unlike UCAS university admissions, degree apprenticeship employers (such as Rolls-Royce, BAE Systems, PwC, Dyson, and the NHS) recruit you as a salaried employee. They want a structured one-page business CV showing teamwork, problem-solving, relevant subjects, and genuine interest in their industry.',
      },
      {
        question: 'Should I include GCSE English and Maths if I am already studying A-Levels or a BTEC?',
        answer:
          'Always. UK apprenticeship funding rules require evidence of GCSE English Language and Mathematics at Grade 4/C or above (and often Grade 6+ for engineering or finance degree apprenticeships), so recruiters look for those exact grades immediately.',
      },
      {
        question: 'Can I include virtual work experience on an apprenticeship CV?',
        answer:
          'Absolutely. Structured UK insight programmes (such as Forage, Speakers for Schools, or employer insight days) show proactive industry motivation—list the host company, date, and one practical task you completed.',
      },
    ],
    content: {
      intro:
        'Competition for UK Higher and Degree Apprenticeships now rivals Russell Group university admissions, while Level 3 trade, digital, and business apprenticeships attract dozens of applicants per post. Using a dedicated [school leaver and apprenticeship CV template](/school-leaver-cv-template) ensures apprenticeship assessors immediately spot your qualifications, technical curiosity, and workplace readiness.',
      sections: [
        {
          id: 'tailoring-for-level-3-vs-degree-apprenticeships',
          heading: '1. Tailoring Your Layout for Level 3 vs Level 6 Degree Apprenticeships',
          body: [
            'Post-GCSE applicants targeting Level 2 or Level 3 apprenticeships in engineering maintenance, IT support, dental nursing, or business administration should lead with practical dependability, hands-on school subjects, and punctuality—using a crisp one-page layout from our [16-year-old CV template collection](/cv-template-16-year-old).',
            'Sixth Formers and college leavers targeting Level 4–6 Higher or Degree Apprenticeships in software engineering, quantity surveying, audit, or aerospace need stronger technical proof. Unpack relevant A-Level, T-Level, or BTEC modules, Extended Project Qualifications (EPQ), coding repositories, or CAD coursework right beneath your education entry.',
          ],
        },
        {
          id: 'proving-workplace-competencies-early',
          heading: '2. Proving Workplace Competencies Without Corporate History',
          body: [
            'Apprenticeship recruiters score early-career CVs against core behaviours: teamwork, time management, communication, and resilience. Frame Saturday hospitality shifts, T-Level placements, volunteering, or sports leadership using measurable outcomes—just as outlined in our [first UK CV guide for students and graduates](/blog/first-cv-guide-16-year-old-school-leaver-graduate-uk).',
            'Even a 10-hour virtual insight programme or school STEM challenge counts when you describe what you solved: *"Completed a 3-day civil engineering insight project, collaborating in a team of four to cost a sustainable flood-defence proposal in Excel."*',
          ],
          bullets: [
            'State GCSE English Language and Mathematics grades clearly under Education.',
            'Highlight technical tools early: Excel, Python, SolidWorks, Canva, or laboratory safety.',
            'Explain why you chose an earn-and-learn pathway in your 3-line Personal Profile.',
          ],
        },
        {
          id: 'passing-apprenticeship-ats-screening',
          heading: '3. Formatting Cleanly for Employer & Gov.uk Portals',
          body: [
            'Major apprenticeship employers screen CV uploads through automated portals before inviting candidates to online situational judgement tests. Avoid graphic sidebars, skill stars, or profile photos, and double-check your headings against our [UK ATS formatting guide](/blog/ats-friendly-cv-uk-guide) so every predicted grade extracts accurately.',
          ],
        },
      ],
      conclusion:
        'A winning UK apprenticeship CV shows employers you are ready to learn fast, show up reliably, and contribute from week one. Pick a free ISO A4 design on our [school leaver CV template page](/school-leaver-cv-template) and export your PDF today.',
      ctaText: 'Browse Apprenticeship CV Templates',
      ctaLink: '/school-leaver-cv-template',
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === slug);
}

/**
 * Selects related blog posts for the 'Read Next' sidebar and cross-navigation,
 * prioritizing articles in the exact same category first and ranking remaining
 * candidates by shared template hubs and topic keywords so `limit` (default 3)
 * articles are reliably returned.
 */
export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  const candidates = BLOG_POSTS.filter((p) => p.id !== currentSlug);

  if (!currentPost) {
    return candidates.slice(0, limit);
  }

  const currentHrefs = new Set(currentPost.relatedTemplateLinks.map((link) => link.href));
  const currentKeywords = new Set(
    currentPost.keywords.flatMap((kw) => kw.toLowerCase().split(/\s+/))
  );

  return [...candidates]
    .sort((a, b) => {
      const score = (post: BlogPost) => {
        let total = 0;
        if (post.category === currentPost.category) {
          total += 100;
        }
        for (const link of post.relatedTemplateLinks) {
          if (currentHrefs.has(link.href)) {
            total += 12;
          }
        }
        for (const kw of post.keywords) {
          for (const word of kw.toLowerCase().split(/\s+/)) {
            if (word.length > 3 && currentKeywords.has(word)) {
              total += 3;
            }
          }
        }
        return total;
      };

      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
      return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
    })
    .slice(0, limit);
}

/**
 * Returns contextually relevant blog articles for each template hub/spoke slug
 * to strengthen internal topic clusters and reciprocal PageRank flow.
 */
export function getBlogPostsForCategorySlug(categorySlug: string): BlogPost[] {
  const byId = (id: string) => BLOG_POSTS.find((p) => p.id === id);

  if (categorySlug === 'school-leaver-cv-template') {
    return [
      byId('uk-apprenticeship-cv-guide'),
      byId('first-cv-guide-16-year-old-school-leaver-graduate-uk'),
      byId('how-to-write-a-cv-uk'),
    ].filter((p): p is BlogPost => Boolean(p));
  }

  if (
    categorySlug === 'cv-template-16-year-old' ||
    categorySlug === 'graduate-cv-templates'
  ) {
    return [
      byId('first-cv-guide-16-year-old-school-leaver-graduate-uk'),
      byId('uk-apprenticeship-cv-guide'),
      byId('uk-cv-personal-statement-examples'),
    ].filter((p): p is BlogPost => Boolean(p));
  }

  if (
    categorySlug === 'ats-friendly-cv-template' ||
    categorySlug === 'finance-cv-template' ||
    categorySlug === 'nursing-cv-template'
  ) {
    return [
      byId('ats-friendly-cv-uk-guide'),
      byId('uk-cv-keywords-and-action-verbs-ats'),
      byId('uk-cv-personal-statement-examples'),
    ].filter((p): p is BlogPost => Boolean(p));
  }

  return [
    byId('how-to-write-a-cv-uk'),
    byId('uk-cv-personal-statement-examples'),
    byId('ats-friendly-cv-uk-guide'),
  ].filter((p): p is BlogPost => Boolean(p));
}
