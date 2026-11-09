import { CV } from '@/types/cv';
import { SAMPLE_UK_CV } from './sampleCv';
import {
  SAMPLE_TEEN_16_CV,
  SAMPLE_SCHOOL_LEAVER_CV,
  SAMPLE_GRADUATE_CV,
  SAMPLE_ACTING_CV,
  SAMPLE_FINANCE_CV,
  SAMPLE_NURSING_CV,
  SAMPLE_ATS_FRIENDLY_CV,
} from './nicheSampleCvs';

export interface CvRuleCard {
  title: string;
  body: string;
}

export interface CvFaqItem {
  id: string;
  question: string;
  answer: string;
  recommendedTemplateId?: string;
}

export interface CvCategoryPageConfig {
  slug: string; // e.g. 'cv-templates' or 'cv-template-16-year-old'
  urlPath: string; // e.g. '/cv-templates'
  categoryLabel: string; // e.g. 'General & Classic'
  breadcrumbLabel: string; // e.g. '16-Year-Old CV Templates'
  targetKeyword: string;
  templateCount: number; // Exact count from spec: 4, 3, 2, 3, 2, 2, 2, 2
  featuredTemplateIds: string[];
  templateAccents: Record<string, string>;
  seoTitle: string; // 50-60 chars exact
  metaDescription: string; // 135-158 chars exact
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  sampleRoleLabel: string;
  sampleCv: CV;
  guideHeading: string;
  guideIntro: string;
  formattingRules: CvRuleCard[];
  recommendedSectionOrder: string[];
  faqs: CvFaqItem[];
  relatedSlugs: string[];
}

export const CV_TEMPLATE_HUB_CONFIG: CvCategoryPageConfig = {
  slug: 'cv-templates',
  urlPath: '/cv-templates',
  categoryLabel: 'General / Classic',
  breadcrumbLabel: 'CV Templates',
  targetKeyword: 'free cv templates',
  templateCount: 4,
  featuredTemplateIds: [
    'classic-corporate', // London
    'uk-traditional', // Westminster
    'minimal-clean', // Oxford
    'hopkins', // Hopkins
  ],
  templateAccents: {
    'classic-corporate': '#0F172A',
    'uk-traditional': '#1E293B',
    'minimal-clean': '#334155',
    hopkins: '#2563EB',
  },
  seoTitle: 'Free CV Templates UK – Free CV Template Word & PDF | freecvmakeruk',
  metaDescription:
    'Browse recruiter-approved free cv templates. Download a free cv template word or free cv template pdf in standard cv uk format and uk cv format template designs.',
  keywords: [
    'free cv templates',
    'free cv template',
    'free cv template word',
    'free cv template pdf',
    'cv uk format',
    'uk cv format template',
    'cv layout free',
    'cv template 16 year old',
    'acting cv template',
    'cv templates for students',
    'british a4 cv template',
  ],
  eyebrow: 'UK ISO A4 CV Template Library · CV Layout Free',
  h1: 'Free CV Templates Built for UK Employers (Word & PDF Formats)',
  heroSubtitle:
    'Explore our recruiter-tested free cv templates crafted in authentic cv uk format. Whether you need a free cv template word (.docx) file, a crisp free cv template pdf, an entry-level cv template 16 year old, an acting cv template, or cv templates for students, our uk cv format template collection delivers every cv layout free of charge.',
  sampleRoleLabel: 'UK Corporate & Professional Standard',
  sampleCv: SAMPLE_UK_CV,
  guideHeading: 'How to Choose the Right UK CV Format Template in 2026',
  guideIntro:
    'British hiring managers spend an average of seven seconds scanning an application. Selecting a clean cv uk format with clear section headings ensures both human recruiters and Applicant Tracking Systems read your achievements effortlessly.',
  formattingRules: [
    {
      title: 'Stick to Standard CV UK Format Dimensions',
      body: 'Standard UK CVs run up to two A4 pages (210 × 297 mm) for experienced candidates, or a single page when using cv templates for students, school leavers, or a cv template 16 year old.',
    },
    {
      title: 'Choose a Professional CV Layout Free of Clutter',
      body: 'Under UK Equality Act 2010 hiring norms, corporate and NHS employers prefer text-only layouts without headshots. The main exception is an acting cv template where a casting headshot is expected.',
    },
    {
      title: 'Lead with a 4-Line Personal Profile',
      body: 'Open directly beneath your contact bar with a focused personal profile summarizing your specialism, qualifications, and measurable commercial or academic achievements.',
    },
    {
      title: 'Download as Free CV Template PDF or Word Document',
      body: 'Every uk cv format template exports true selectable text as a free cv template pdf at 300 DPI or an editable free cv template word (.docx) file ready for Reed, Indeed UK, and Totaljobs.',
    },
  ],
  recommendedSectionOrder: [
    'Name, UK Location & Contact Bar',
    'Personal Profile (3–5 Lines)',
    'Work Experience (Reverse Chronological)',
    'Education & Qualifications',
    'Key Skills & Professional Accreditations',
    'Optional Interests or References Note',
  ],
  faqs: [
    {
      id: 'faq-hub-free-download',
      question: 'Are all free cv templates genuinely free to download as Word and PDF?',
      answer:
        'Yes. Every single layout in our catalogue can be downloaded as a free cv template pdf or an editable free cv template word (.docx) document with no watermarks, hidden paywalls, or card demands.',
      recommendedTemplateId: 'classic-corporate',
    },
    {
      id: 'faq-hub-uk-format',
      question: 'What defines a proper cv uk format compared to international resumes?',
      answer:
        'A proper cv uk format strictly adheres to ISO A4 paper size, leads with a 3–5 line Personal Profile instead of an objective, lists British qualifications (GCSEs, A-Levels, Honours degrees), and omits personal photos, nationality, and marital status in accordance with UK hiring legislation.',
      recommendedTemplateId: 'uk-traditional',
    },
    {
      id: 'faq-hub-student-templates',
      question: 'Do you offer cv templates for students and 16 year olds?',
      answer:
        'Yes. We provide dedicated cv templates for students, graduates, and school leavers—including a specialized cv template 16 year old layout (York) designed for GCSE pupils applying for their first weekend or summer job.',
      recommendedTemplateId: 'minimal-clean',
    },
    {
      id: 'faq-hub-acting-templates',
      question: 'Do you have an acting cv template for Spotlight and West End auditions?',
      answer:
        'Yes. Our acting cv template options (West End and Soho) format stage, film, and TV credits in horizontal columns with playing age, casting headshots, and Equity details.',
      recommendedTemplateId: 'hopkins',
    },
    {
      id: 'faq-hub-layout-free',
      question: 'Can I customise every cv layout free in the online builder?',
      answer:
        'Yes. You can adjust typography, colours, margin spacing, and section order for any cv layout free inside our live preview builder before downloading.',
    },
  ],
  relatedSlugs: [
    '16-year-old',
    'school-leaver',
    'graduate',
    'acting',
    'finance',
    'nursing',
    'ats-friendly',
  ],
};

export const CV_SPOKE_CONFIGS: Record<string, CvCategoryPageConfig> = {
  '16-year-old': {
    slug: '16-year-old',
    urlPath: '/cv-templates/16-year-old',
    categoryLabel: 'Teen (16 Year Old)',
    breadcrumbLabel: 'CV Template for a 16 Year Old',
    targetKeyword: 'cv template 16 year old',
    templateCount: 3,
    featuredTemplateIds: ['york', 'stratford', 'cardiff'],
    templateAccents: {
      york: '#2563EB',
      stratford: '#0D9488',
      cardiff: '#4F46E5',
    },
    seoTitle: 'CV Template 16 Year Old – Free UK Starter A4 | freecvmakeruk',
    metaDescription:
      'Free CV template for a 16 year old in the UK. Highlight GCSE grades, school achievements, volunteering, and skills for your first weekend or summer job.',
    keywords: [
      'cv template 16 year old',
      'cv template for a 16 year old uk',
      'first job cv template uk',
      'gcse student cv template',
      '16 year old cv no experience uk',
    ],
    eyebrow: 'Teen & Year 11 Starter Layouts · 3 Templates',
    h1: 'CV Template for a 16 Year Old (Free UK First-Job Layouts)',
    heroSubtitle:
      'Writing your first CV with little or no formal work history? These three single-page British A4 templates put your GCSEs, transferable strengths, school responsibilities, and volunteering front and centre.',
    sampleRoleLabel: 'Year 11 GCSE Student & Weekend Retail Example',
    sampleCv: SAMPLE_TEEN_16_CV,
    guideHeading: 'How to Write a Standout CV at 16 with No Formal Work Experience',
    guideIntro:
      'High-street retailers, cafés, supermarkets, and leisure centres hiring 16-year-olds do not expect a corporate career history. They look for punctuality, polite communication, GCSE numeracy/literacy, and initiative.',
    formattingRules: [
      {
        title: 'Keep It Strictly to One Crisp A4 Page',
        body: 'At 16, a single well-spaced A4 page looks confident and complete. Never pad your CV onto a second page or include your exact date of birth or street number.',
      },
      {
        title: 'List Predicted or Achieved GCSE Grades Clearly',
        body: 'Highlight Maths and English Language grades prominently alongside your total number of GCSEs (e.g., "9 GCSEs predicted grades 6–8, sitting June 2026") and strong attendance.',
      },
      {
        title: 'Turn School Roles & Volunteering into Experience',
        body: 'Year 10 work experience weeks, charity shop shifts, Duke of Edinburgh awards, sports captaincy, babysitting, or paper rounds all prove reliability and teamwork.',
      },
      {
        title: 'Never Include a Photo or Age',
        body: 'UK employers follow Equality Act guidelines—leave off headshots and simply state your town/city, mobile number, and a professional email address.',
      },
    ],
    recommendedSectionOrder: [
      'Full Name, Town/County, Mobile & Professional Email',
      'Short Personal Statement (3–4 Enthusiastic Lines)',
      'Key Strengths & Practical Skills',
      'GCSE Education & Predicted/Achieved Grades',
      'Work Experience Placements, Volunteering & Saturday Roles',
      'Duke of Edinburgh, School Prefect Roles & Interests',
    ],
    faqs: [
      {
        id: 'faq-teen-age-dob',
        question: 'Should a 16-year-old put their age or date of birth on a UK CV?',
        answer:
          'No. Under UK Equality Act 2010 hiring best practice, you should leave your date of birth and age off your CV. If an employer has a legal minimum age rule (such as 16+ after school-leaving date or 18+ for licensed bar/till duties), they will ask you to confirm eligibility on their application form.',
      },
      {
        id: 'faq-teen-predicted-gcses',
        question: 'How do I list GCSEs if I haven’t received my August results yet?',
        answer:
          'List your secondary school name, study dates (e.g. Sep 2021 – Jun 2026), and write "9 GCSEs (Predicted Grades)" followed by your Maths and English Language predicted 9–1 grades so retail and hospitality managers can verify numeracy and literacy immediately.',
        recommendedTemplateId: 'york',
      },
      {
        id: 'faq-teen-no-experience',
        question: 'What can I put under Work Experience if I have never had a paid job?',
        answer:
          'Include your Year 10 school work-experience placement, charity shop volunteering, helping at school open evenings, Duke of Edinburgh volunteering, coaching junior sports clubs, babysitting, dog walking, or managing a school enterprise stall.',
        recommendedTemplateId: 'york',
      },
      {
        id: 'faq-teen-template-choice',
        question: 'Which of the 3 teen templates is best for Saturday retail and café jobs?',
        answer:
          'York is ideal if you have zero paid work history because it leads with Key Strengths and GCSE qualifications above placements. Stratford works brilliantly once you have a Year 10 placement or Saturday volunteering role, while Cardiff suits Sixth Form or council traineeships.',
        recommendedTemplateId: 'stratford',
      },
      {
        id: 'faq-teen-working-hours',
        question: 'Should I mention my weekend and school-holiday availability on my CV?',
        answer:
          'Yes—adding a concise phrase in your Personal Statement such as "Available Saturdays, Sundays, and throughout school holidays" helps high-street store and café managers match you directly to weekend rota shifts.',
      },
      {
        id: 'faq-teen-references',
        question: 'Who can a 16-year-old use as a CV reference in the UK?',
        answer:
          'You do not need to print referee phone numbers on your CV—simply include "School and volunteer references available on request" at the bottom, then ask your Head of Year, form tutor, sports coach, or charity shop supervisor before an interview.',
      },
    ],
    relatedSlugs: ['school-leaver', 'graduate', 'ats-friendly'],
  },

  'school-leaver': {
    slug: 'school-leaver',
    urlPath: '/cv-templates/school-leaver',
    categoryLabel: 'School Leaver',
    breadcrumbLabel: 'School Leaver CV Template',
    targetKeyword: 'school leaver cv template',
    templateCount: 2,
    featuredTemplateIds: ['durham', 'stratford'],
    templateAccents: {
      durham: '#1E3A8A',
      stratford: '#0D9488',
    },
    seoTitle: 'School Leaver CV Template – Free UK A4 | freecvmakeruk.co.uk',
    metaDescription:
      'Free UK school leaver CV template for Sixth Form, A-Level, BTEC, and T-Level students applying for apprenticeships, traineeships, and entry-level roles.',
    keywords: [
      'school leaver cv template',
      'sixth form leaver cv uk',
      'apprenticeship cv template uk',
      'college leaver cv template',
      'a level student cv template',
    ],
    eyebrow: 'Sixth Form, College & Apprenticeship Layouts · 2 Templates',
    h1: 'School Leaver CV Template for Apprenticeships & First Careers',
    heroSubtitle:
      'Purpose-built British A4 templates for Year 11, Sixth Form, and FE College leavers applying for Level 3–6 apprenticeships, insight schemes, and junior commercial roles.',
    sampleRoleLabel: 'A-Level / Degree Apprenticeship Candidate Example',
    sampleCv: SAMPLE_SCHOOL_LEAVER_CV,
    guideHeading: 'Formatting a School Leaver CV for UK Apprenticeships & Employers',
    guideIntro:
      'Degree and Higher Apprenticeship assessors at firms like PwC, BAE Systems, Rolls-Royce, and the Civil Service score CVs against structured competency frameworks. Clear qualification grades and real-world initiative set you apart.',
    formattingRules: [
      {
        title: 'Separate A-Levels / BTEC / T-Levels from GCSEs',
        body: 'List your latest Sixth Form or College qualification first with individual subject grades (predicted or achieved) and any EPQ topic, followed by a concise summary line for your GCSEs.',
      },
      {
        title: 'Connect Part-Time Shifts to Commercial Skills',
        body: 'Working in a café, supermarket, or warehouse while studying proves time management, customer resolution, and cash accountability—quantify customers served or targets met.',
      },
      {
        title: 'Showcase Virtual Insight Weeks & Enterprise Projects',
        body: 'Include Springpod, Forage, Young Enterprise, STEM challenges, or employer insight programmes to demonstrate genuine commitment to your chosen sector.',
      },
    ],
    recommendedSectionOrder: [
      'Name, Location, Contact Details & LinkedIn',
      'Tailored Apprenticeship / Career Objective',
      'Academic Qualifications (A-Levels / T-Levels / BTEC + GCSE Summary)',
      'Technical & Employability Competencies',
      'Part-Time Work, Placements & Employer Insight Weeks',
      'EPQ, Enterprise Projects & Leadership Awards',
    ],
    faqs: [
      {
        id: 'faq-sl-gcse-summary',
        question: 'Should a school leaver CV list every single GCSE subject individually?',
        answer:
          'Once you are studying or have completed A-Levels, BTEC Nationals, or T-Levels, list those post-16 subjects in full and summarise your GCSEs cleanly on one line—for example: "10 GCSEs Grades 9–7 including Mathematics (9) and English Language (8)".',
        recommendedTemplateId: 'durham',
      },
      {
        id: 'faq-sl-length',
        question: 'How long should a UK school leaver or apprenticeship CV be?',
        answer:
          'One full A4 page is ideal for most 16–18 school leavers. If you have substantial T-Level industry placements (315+ hours), employer insight weeks, and part-time shift leadership, up to two full A4 pages is acceptable—never leave a mostly empty second page.',
      },
      {
        id: 'faq-sl-degree-apprenticeship',
        question: 'Which template should I pick for a Level 4–6 Degree Apprenticeship?',
        answer:
          'Choose Durham for corporate, finance, engineering, legal, and Civil Service apprenticeships—its double-ruled academic structure mirrors assessment-centre expectations. Choose Stratford for digital, creative, retail management, or hospitality traineeships.',
        recommendedTemplateId: 'durham',
      },
      {
        id: 'faq-sl-virtual-experience',
        question: 'Do UK apprenticeship employers value Forage, Springpod, and EPQ projects?',
        answer:
          'Yes. Early-careers recruiters actively look for evidence of sector curiosity. Listing an Extended Project Qualification (EPQ), Young Enterprise role, or Forage/Springpod virtual placement demonstrates commercial motivation before you enter the workplace.',
        recommendedTemplateId: 'stratford',
      },
      {
        id: 'faq-sl-tlevels-btec',
        question: 'How do I format T-Levels or BTEC Extended Diplomas on a UK CV?',
        answer:
          'Write the full qualification title and grade profile—such as "T-Level in Digital Production, Design and Development (Predicted Distinction)" or "BTEC Level 3 National Extended Diploma in Engineering (DDD)"—and detail your 45-day industry placement directly in the Work Experience section.',
      },
    ],
    relatedSlugs: ['16-year-old', 'graduate', 'finance'],
  },

  'graduate': {
    slug: 'graduate',
    urlPath: '/cv-templates/graduate',
    categoryLabel: 'Graduate',
    breadcrumbLabel: 'Graduate CV Templates',
    targetKeyword: 'graduate cv templates',
    templateCount: 3,
    featuredTemplateIds: ['graduate-starter', 'cardiff', 'minimal-clean'],
    templateAccents: {
      'graduate-starter': '#4B4DED',
      cardiff: '#2563EB',
      'minimal-clean': '#334155',
    },
    seoTitle: 'CV Templates for Students & UK Graduates – Free A4 | freecvmakeruk',
    metaDescription:
      'Recruiter-approved cv templates for students and UK university graduates. Showcase 1st/2:1 honours degrees, internships, placements, and dissertations.',
    keywords: [
      'cv templates for students',
      'graduate cv templates',
      'uk graduate cv template',
      'university student cv template uk',
      'graduate scheme cv format',
      'placement year cv template uk',
    ],
    eyebrow: 'University & Graduate Scheme Layouts · 3 Templates',
    h1: 'CV Templates for Students & UK University Graduates',
    heroSubtitle:
      'Specialist cv templates for students, final-year undergraduates, and recent alumni applying to Times Top 100 graduate schemes, university placements, and junior analyst roles.',
    sampleRoleLabel: 'First-Class Honours Graduate & Internship Example',
    sampleCv: SAMPLE_GRADUATE_CV,
    guideHeading: 'What UK Graduate Recruiters Expect on Student & Graduate CVs',
    guideIntro:
      'Graduate recruitment teams screen thousands of applications through Workday, Taleo, and Cappfinity. Using our cv templates for students ensures your university degree, dissertation, and internships pass initial ATS checks.',
    formattingRules: [
      {
        title: 'Place University Education Above Experience',
        body: 'Until you have two years of post-university career history, lead with your degree classification (First-Class or 2:1), relevant final-year modules, and dissertation title.',
      },
      {
        title: 'Quantify Internships, Placements & Society Roles',
        body: 'Treat society committee treasurerships, hackathons, and summer internships like commercial roles—quote budgets managed, sponsorship raised, or time saved.',
      },
      {
        title: 'Keep A-Levels & GCSEs Brief',
        body: 'Many UK graduate schemes still verify UCAS tariff or GCSE Maths/English thresholds, so keep a crisp two-line summary underneath your university degree.',
      },
    ],
    recommendedSectionOrder: [
      'Header with UK City, Mobile, Email & LinkedIn URL',
      'Graduate Profile (Degree + Target Sector + Key Technical Edge)',
      'University Education, Dissertation & A-Level Summary',
      'Internships, Year-in-Industry & Society Leadership',
      'Technical Tools, Languages & Case Competitions',
    ],
    faqs: [
      {
        id: 'faq-grad-page-length',
        question: 'Should a UK graduate CV be one page or two pages?',
        answer:
          'Investment banks, private equity firms, and strategy consultancies require a strict one-page A4 graduate CV (such as our Cambridge or Oxford layout). Most other UK graduate schemes, engineering employers, and the Civil Service Fast Stream welcome one to two full A4 pages.',
        recommendedTemplateId: 'graduate-starter',
      },
      {
        id: 'faq-grad-classification',
        question: 'Should I include my degree percentage or just the Honours classification?',
        answer:
          'Always state your British Honours classification (e.g., First-Class Honours or Upper Second-Class Honours 2:1). Adding your overall average or dissertation score (if 65% or above) provides strong quantitative proof of academic rigour.',
      },
      {
        id: 'faq-grad-ats-portals',
        question: 'Do UK graduate schemes scan CVs with ATS software?',
        answer:
          'Yes—nearly all FTSE 250 and Times Top 100 graduate employers use automated parsers such as Workday, Taleo, Greenhouse, or SmartRecruiters. All three templates on this page export true selectable text with standard British headings.',
        recommendedTemplateId: 'minimal-clean',
      },
      {
        id: 'faq-grad-part-time-jobs',
        question: 'Should I include student bar, hospitality, or supermarket jobs on a graduate CV?',
        answer:
          'Yes, especially if you lack multiple corporate internships. Keep student jobs concise (2–3 bullet points) focusing on reliability, balancing 15+ shift hours alongside degree study, training new staff, and KPIs met.',
        recommendedTemplateId: 'cardiff',
      },
      {
        id: 'faq-grad-dissertation',
        question: 'Where should I feature my final-year dissertation or group capstone project?',
        answer:
          'Mention the dissertation title and grade in a two-line note directly beneath your degree entry, and add technical capstones, case-competition wins, or hackathons to the Key Projects section so recruiters see applied problem-solving.',
      },
    ],
    relatedSlugs: ['school-leaver', 'finance', 'ats-friendly'],
  },

  'acting': {
    slug: 'acting',
    urlPath: '/cv-templates/acting',
    categoryLabel: 'Acting',
    breadcrumbLabel: 'Acting CV Template',
    targetKeyword: 'acting cv template',
    templateCount: 2,
    featuredTemplateIds: ['west-end', 'soho'],
    templateAccents: {
      'west-end': '#1E293B',
      soho: '#0F172A',
    },
    seoTitle: 'Acting CV Template UK – Spotlight & Stage A4 | freecvmakeruk',
    metaDescription:
      'Free UK acting CV template formatted to Spotlight and Equity industry standards. Present stage, TV, and film credits, headshot, playing age, and accents.',
    keywords: [
      'acting cv template',
      'acting cv template uk',
      'spotlight cv template uk',
      'actor cv format uk',
      'musical theatre cv template uk',
    ],
    eyebrow: 'British Spotlight & Equity Standard · 2 Templates',
    h1: 'Acting CV Template (UK Spotlight, Stage & Screen Format)',
    heroSubtitle:
      'Standard corporate CVs get rejected in casting suites. Use our dedicated British performer A4 layouts featuring tabular Role / Production / Director credits, optional portrait headshot, playing specs, and accent profiles.',
    sampleRoleLabel: 'RADA Stage & BBC Screen Actor Example',
    sampleCv: SAMPLE_ACTING_CV,
    guideHeading: 'UK Casting Director Rules for an Acting CV',
    guideIntro:
      'Unlike corporate British CVs, UK casting directors, Spotlight profiles, and theatrical agents expect a single-page credits sheet where roles, production companies, venues, and directors can be scanned in seconds.',
    formattingRules: [
      {
        title: 'Format Credits in Columns — Never Corporate Paragraphs',
        body: 'Casting directors scan Year, Role, Production/Venue, and Director horizontally. Avoid bulleted corporate job descriptions unless noting a major award or West End transfer.',
      },
      {
        title: 'Include Headshot, Playing Age & Physical Specs',
        body: 'Acting is the primary UK exception to the no-photo rule. Include a crisp 3:4 natural casting headshot, Spotlight PIN, agent contact, playing age range, height, and Equity status.',
      },
      {
        title: 'Specify Authentic Accents, Vocal Range & Combat Grades',
        body: 'Be 100% honest with accents (mark Native vs High Standard), list exact singing range (e.g., Baritone G2–G4), and cite BADC stage combat, dance, or full UK driving licence credentials.',
      },
    ],
    recommendedSectionOrder: [
      'Performer Name, Spotlight PIN, Agent Contact & Headshot',
      'Playing Age, Height, Appearance & Equity Status Strip',
      'Selected Stage, Television & Film Credits (Tabular)',
      'Radio, Commercial, Voiceover or Workshop Credits',
      'Drama School / Conservatoire Training',
      'Accents, Vocal Range, Combat & Movement Skills',
    ],
    faqs: [
      {
        id: 'faq-acting-credits-entry',
        question: 'How do I enter my stage and screen credits inside the CV builder?',
        answer:
          'In the Work Experience step, enter your Character Role as the Job Title, the Production & Network/Theatre as the Employer, and "Dir. [Director Name]" in the Location field. Our West End and Soho templates automatically align them as British Spotlight-style credit columns.',
        recommendedTemplateId: 'west-end',
      },
      {
        id: 'faq-acting-survival-jobs',
        question: 'Should a UK acting CV include non-acting survival or hospitality jobs?',
        answer:
          'No—never list hospitality, office, or retail survival jobs on an acting CV sent to casting directors or theatrical agents. Keep it strictly to one A4 page focused on performance credits, conservatoire training, and castable specialist skills.',
      },
      {
        id: 'faq-acting-headshot-rules',
        question: 'Should I include a headshot on my UK acting CV?',
        answer:
          'Yes. Performing arts is the key British exception to Equality Act no-photo norms. Both our West End and Soho templates include a dedicated 3:4 casting portrait frame in the header or sidebar so casting directors can match your face to your self-tape.',
        recommendedTemplateId: 'soho',
      },
      {
        id: 'faq-acting-playing-specs',
        question: 'What physical statistics and memberships do UK casting directors expect?',
        answer:
          'Include your Playing Age range (e.g. 24–32, never your exact date of birth), height in feet/inches and centimetres, eye/hair colour, Spotlight view PIN or URL, Equity membership status, and whether you hold a full UK driving licence.',
      },
      {
        id: 'faq-acting-unrepresented',
        question: 'How should drama school graduates or unrepresented actors list contact details?',
        answer:
          'If you have an agent, list your agency name, agent email, and office phone number rather than personal details. If you are currently self-represented, include a dedicated professional casting email, Spotlight link, and your primary UK base city (e.g., London & Manchester).',
      },
    ],
    relatedSlugs: ['cv-templates', 'graduate', 'ats-friendly'],
  },

  'finance': {
    slug: 'finance',
    urlPath: '/cv-templates/finance',
    categoryLabel: 'Finance',
    breadcrumbLabel: 'Finance CV Template',
    targetKeyword: 'finance cv template',
    templateCount: 2,
    featuredTemplateIds: ['classic-corporate', 'glasgow'],
    templateAccents: {
      'classic-corporate': '#0F172A',
      glasgow: '#1E293B',
    },
    seoTitle: 'Finance CV Template UK – Banking, ACA & CFA | freecvmakeruk',
    metaDescription:
      'Free UK finance CV template built for City of London banking, FP&A, accounting (ACA, ACCA, CIMA), and advisory roles. Crisp A4 deal-sheet precision.',
    keywords: [
      'finance cv template',
      'finance cv template uk',
      'investment banking cv template uk',
      'accountant cv template aca acca',
      'financial analyst cv uk',
    ],
    eyebrow: 'City of London, Banking & Chartered Accountancy · 2 Templates',
    h1: 'Finance CV Template for UK Banking, Accounting & FP&A',
    heroSubtitle:
      'Designed for ACA/ACCA/CIMA accountants, investment banking analysts, FP&A managers, and Canary Wharf advisory professionals who need conservative, metric-driven A4 precision.',
    sampleRoleLabel: 'ACA Corporate Finance & M&A Manager Example',
    sampleCv: SAMPLE_FINANCE_CV,
    guideHeading: 'What Hiring Partners & Finance Directors Look For',
    guideIntro:
      'Financial services hiring in London, Edinburgh, Manchester, and Leeds favours understated typographic authority, zero visual gimmicks, and hard commercial figures denominated in £GBP.',
    formattingRules: [
      {
        title: 'Lead with Chartered Qualifications & Exam Record',
        body: 'State ACA (ICAEW), ACCA, CIMA, or CFA standing in the first sentence of your Personal Profile—and explicitly note "First-Time Passes" where applicable.',
      },
      {
        title: 'Quantify Deal Values, P&L Scope & Audit Portfolios',
        body: 'Anchor every bullet point in commercial scale: enterprise value (£M), working capital unlocked, basis-point margin expansion, or close-cycle days reduced.',
      },
      {
        title: 'Use Conservative Monochrome or Deep Navy Rules',
        body: 'Avoid skill progress bars, multi-colour graphics, or profile photos. Both London and Glasgow use crisp horizontal rules and tabular date columns preferred by Big Four and tier-one banks.',
      },
    ],
    recommendedSectionOrder: [
      'Header (Name, UK Location, Phone, Email, LinkedIn — No Photo)',
      'Executive Summary (Chartered Status + Sector + Deal/P&L Scale)',
      'Career History with Quantified Transaction / Commercial Bullets',
      'Chartered Qualifications (ACA / ACCA / CIMA / CFA) & Degree',
      'Technical Systems (Excel/VBA, Bloomberg, SAP, NetSuite, IFRS)',
    ],
    faqs: [
      {
        id: 'faq-fin-page-length',
        question: 'Should a UK finance or investment banking CV be 1 page or 2 pages?',
        answer:
          'Analysts and Associates in investment banking, M&A, and private equity should stick to one dense A4 page. Qualified ACA/ACCA/CIMA accountants, FP&A Managers, Financial Controllers, and Finance Directors typically use two full A4 pages.',
        recommendedTemplateId: 'classic-corporate',
      },
      {
        id: 'faq-fin-photo-policy',
        question: 'Should I include a photo on a City of London or Canary Wharf finance CV?',
        answer:
          'No. Tier-one banks, Big Four advisory practices, and institutional funds strictly prefer photo-free CVs for unbiased compliance screening. Photo display is turned off automatically when you preview or select our finance templates.',
      },
      {
        id: 'faq-fin-london-vs-glasgow',
        question: 'What is the difference between the London and Glasgow finance templates?',
        answer:
          'London delivers a crisp Canary Wharf investment banking and transaction-services layout with compact deal bullet density, while Glasgow features double-ruled executive framing suited to Financial Controllers, CFOs, Risk Directors, and Audit Partners.',
        recommendedTemplateId: 'glasgow',
      },
      {
        id: 'faq-fin-part-qualified',
        question: 'How should part-qualified ACCA, ACA, or CIMA candidates list exam progress?',
        answer:
          'Specify the exact number of papers passed and remaining—for example, "ACCA Part-Qualified (10 of 13 Exams Passed First Time; Strategic Professional in progress)"—so hiring managers immediately see your trajectory to chartership.',
      },
      {
        id: 'faq-fin-deal-sheet',
        question: 'How do I showcase M&A mandates or audit portfolios without breaching client NDA?',
        answer:
          'Describe transactions anonymously using sector and £GBP enterprise value—such as "Advised on £65M cross-border SaaS buyout (buy-side FDD)"—unless the deal has already been publicly announced via RNS or press release.',
      },
    ],
    relatedSlugs: ['graduate', 'ats-friendly', 'cv-templates'],
  },

  'nursing': {
    slug: 'nursing',
    urlPath: '/cv-templates/nursing',
    categoryLabel: 'Nursing & NHS',
    breadcrumbLabel: 'Nursing CV Template',
    targetKeyword: 'nursing cv template',
    templateCount: 2,
    featuredTemplateIds: ['leeds', 'belfast'],
    templateAccents: {
      leeds: '#0D9488',
      belfast: '#1E3A8A',
    },
    seoTitle: 'Nursing CV Template UK – NHS Band 5–8 & NMC | freecvmakeruk',
    metaDescription:
      'Free UK nursing CV template structured for NHS Trusts, private hospitals, and agency nurses. Clearly display NMC PIN, revalidation, CPD, and clinical skills.',
    keywords: [
      'nursing cv template',
      'nursing cv template uk',
      'nhs nurse cv template',
      'band 5 staff nurse cv uk',
      'nmc registered nurse cv format',
    ],
    eyebrow: 'NHS Trust, Clinical & NMC Compliant · 2 Templates',
    h1: 'Nursing CV Template for NHS Trusts & Private Healthcare',
    heroSubtitle:
      'Calibrated for Student Nurses, Band 5 Staff Nurses, Band 6/7 Sisters & Charge Nurses, and Advanced Nurse Practitioners—putting your NMC PIN, clinical competencies, and patient safety outcomes first.',
    sampleRoleLabel: 'NHS Band 6 Senior Staff Nurse (AMU) Example',
    sampleCv: SAMPLE_NURSING_CV,
    guideHeading: 'How to Structure a UK Nursing CV for Matrons & Clinical Recruiters',
    guideIntro:
      'Whether applying to private hospital groups (Spire, Nuffield, HCA, Circle), GP surgeries, specialist nursing agencies, or uploading alongside NHS Trac applications, clinical recruiters verify registration and ward acuity immediately.',
    formattingRules: [
      {
        title: 'Display NMC PIN Status & Sub-Part in the Header',
        body: 'Make your active NMC Registration (Adult, Children’s, Mental Health, or Learning Disabilities), revalidation status, and Enhanced DBS standing visible within three seconds.',
      },
      {
        title: 'Detail Ward Acuity, Bed Count & Nurse-to-Patient Ratios',
        body: 'Specify exact clinical settings (e.g., 36-bed Acute Medical Unit, ITU, Surgical Triage), clinical procedures (IV cannulation, venepuncture, NIV, male catheterisation), and NEWS2 escalation.',
      },
      {
        title: 'Highlight Clinical Audits, SSSA Mentorship & CQC Standards',
        body: 'For Band 6+ progression, evidence quality-improvement audits (Sepsis Six, falls reduction, tissue viability), Datix governance, and NMC Practice Supervisor/Assessor duties.',
      },
    ],
    recommendedSectionOrder: [
      'Name, Post-Nominals (RN BSc), NMC PIN & UK Contact Details',
      'Clinical Profile (Band, Specialism, Years Qualified & Core Strengths)',
      'Clinical Nursing Experience (NHS Trusts / Placements in Reverse Order)',
      'Extended Clinical Skills & Mandatory Training (ILS/ALS, Cannulation)',
      'NMC Registration, Post-Registration Level 7 Modules & BSc Nursing',
    ],
    faqs: [
      {
        id: 'faq-nur-nmc-pin',
        question: 'Should I put my full NMC PIN on a public job board?',
        answer:
          'When sending your CV directly to an NHS Trust, GP surgery, private hospital group, or vetted healthcare agency, include your NMC PIN and revalidation date so they can verify active standing. On open job boards, write "NMC Registered Adult Nurse (Active — PIN provided upon application)".',
      },
      {
        id: 'faq-nur-band5-placements',
        question: 'How should newly qualified Band 5 student nurses list clinical placements?',
        answer:
          'List your final-year management placement and key acute/community spoke rotations inside the Work Experience section—specifying the NHS Foundation Trust, ward acuity, bed count, and core proficiencies signed off in your PAD/ePAD.',
        recommendedTemplateId: 'leeds',
      },
      {
        id: 'faq-nur-leeds-vs-belfast',
        question: 'Which nursing template should I choose: Leeds or Belfast?',
        answer:
          'Leeds uses an NHS-aligned clinical teal hierarchy ideal for Band 5–6 Staff Nurses, GP Practice Nurses, and agency clinicians. Belfast provides an authoritative clinical-academic structure suited to Band 7–8a Ward Managers, Matrons, ANPs, and Clinical Nurse Specialists.',
        recommendedTemplateId: 'belfast',
      },
      {
        id: 'faq-nur-trac-nhs-jobs',
        question: 'Does NHS Jobs / Trac accept uploaded CVs or only online forms?',
        answer:
          'While NHS Trac requires structured online application fields, private healthcare providers (Spire, Nuffield, Circle, Priory), GP federations, nursing agencies, and many NHS Bank/Direct Engagement teams shortlist directly from your A4 CV—and keeping a structured CV makes completing Trac supporting statements far faster.',
      },
      {
        id: 'faq-nur-cpd-mandatory',
        question: 'Which clinical competencies and mandatory trainings should I highlight?',
        answer:
          'Prioritise extended clinical skills such as IV drug administration, venepuncture, peripheral cannulation, male/female catheterisation, ECG interpretation, ILS/ALS resuscitation status, Safeguarding Level 3, and NMC Practice Assessor (SSSA) sign-off.',
      },
    ],
    relatedSlugs: ['ats-friendly', 'graduate', 'cv-templates'],
  },

  'ats-friendly': {
    slug: 'ats-friendly',
    urlPath: '/cv-templates/ats-friendly',
    categoryLabel: 'Simple / ATS-Friendly',
    breadcrumbLabel: 'ATS-Friendly CV Template',
    targetKeyword: 'ats friendly cv template',
    templateCount: 2,
    featuredTemplateIds: ['minimal-clean', 'uk-traditional'],
    templateAccents: {
      'minimal-clean': '#334155',
      'uk-traditional': '#1E293B',
    },
    seoTitle: 'ATS-Friendly CV Template UK – Simple A4 | freecvmakeruk.co.uk',
    metaDescription:
      'Free simple, ATS-friendly CV template for UK job boards and corporate portals. Single-column ISO A4 structure engineered for Workday, Greenhouse, and Reed.',
    keywords: [
      'ats friendly cv template',
      'ats friendly cv template uk',
      'simple cv template uk',
      'clean single column cv template',
      'workday ats cv format uk',
    ],
    eyebrow: '100% Parser-Clean Single-Column Layouts · 2 Templates',
    h1: 'Simple & ATS-Friendly CV Templates for UK Portals',
    heroSubtitle:
      'Stripped of multi-column text traps, floating text boxes, and graphic skill bars—engineered for flawless automated parsing across Workday, Taleo, Greenhouse, Reed, and Indeed UK.',
    sampleRoleLabel: 'UK Senior Operations & Project Manager Example',
    sampleCv: SAMPLE_ATS_FRIENDLY_CV,
    guideHeading: 'Why Simple Single-Column CVs Score Highest in UK ATS Systems',
    guideIntro:
      'Over 75% of mid-to-large British employers use Applicant Tracking Systems to extract job titles, employer dates, and keyword competencies into structured candidate profiles before a recruiter opens your file.',
    formattingRules: [
      {
        title: 'Linear Top-to-Bottom Single-Column Reading Order',
        body: 'Older enterprise parsers (Taleo, SAP SuccessFactors, Oracle) can merge left and right columns together. Single-column layouts guarantee every role and date attaches to the right employer.',
      },
      {
        title: 'Standard British Section Headings',
        body: 'Use unambiguous headings—Personal Profile, Work Experience, Education, Key Skills, and Certifications—rather than clever labels like "My Journey" or "Where I Shine".',
      },
      {
        title: 'Spell Out Acronyms Alongside Full Terms',
        body: 'Include both the acronym and full phrase (e.g., "PRINCE2 Practitioner Project Management" or "Chartered Institute of Personnel and Development (CIPD)") to match exact recruiter boolean searches.',
      },
    ],
    recommendedSectionOrder: [
      'Single-Line Contact Header (No Tables or Header/Footer Text Boxes)',
      'Keyword-Aligned Personal Summary',
      'Reverse-Chronological Work Experience (Month Year – Month Year)',
      'Core Skills & Technical Keywords List',
      'Certifications & Academic Qualifications',
    ],
    faqs: [
      {
        id: 'faq-ats-pdf-vs-docx',
        question: 'Does PDF or Word (.docx) work better for UK Applicant Tracking Systems?',
        answer:
          'Modern ATS platforms (Greenhouse, Lever, Workday, SmartRecruiters) parse text-based PDFs and DOCX files equally accurately—provided the PDF contains real selectable text like our builder exports. When an external recruitment agency specifically requests Word format, use our one-click DOCX export.',
      },
      {
        id: 'faq-ats-skill-bars',
        question: 'Why avoid skill rating bars or star icons on an ATS-friendly CV?',
        answer:
          'Automated parsers ignore graphic bars completely—or convert icon glyphs into garbled characters—while UK recruiters find self-scored "85% Leadership" arbitrary. Clean text-based skill lists parse with 100% fidelity.',
        recommendedTemplateId: 'minimal-clean',
      },
      {
        id: 'faq-ats-oxford-vs-westminster',
        question: 'What is the difference between the Oxford and Westminster ATS templates?',
        answer:
          'Oxford pairs modern sans-serif typography with generous Swiss single-column spacing—ideal for operations, tech, product, and commercial roles. Westminster uses classic British horizontal section rules suited to Civil Service, legal, academic, and traditional corporate employers.',
        recommendedTemplateId: 'uk-traditional',
      },
      {
        id: 'faq-ats-date-format',
        question: 'Which date format prevents ATS tenure calculation errors in the UK?',
        answer:
          'Use consistent British month-and-year dates such as "Jan 2022 – Present" or "Sep 2019 – Dec 2021" rather than seasons ("Summer 2023") or slash-only numbers, ensuring Workday and Taleo calculate your exact years of experience.',
      },
      {
        id: 'faq-ats-keyword-matching',
        question: 'How should I tailor keywords from a UK job advert without keyword stuffing?',
        answer:
          'Mirror the exact British role title and core competencies from the person specification naturally inside your 4-line Personal Profile, Key Skills list, and quantified experience bullets—never hide invisible white text, which triggers instant ATS rejection.',
      },
    ],
    relatedSlugs: ['cv-templates', 'finance', 'graduate'],
  },
};

export const ALL_SPOKE_LIST: CvCategoryPageConfig[] = [
  CV_SPOKE_CONFIGS['16-year-old'],
  CV_SPOKE_CONFIGS['school-leaver'],
  CV_SPOKE_CONFIGS['graduate'],
  CV_SPOKE_CONFIGS['acting'],
  CV_SPOKE_CONFIGS['finance'],
  CV_SPOKE_CONFIGS['nursing'],
  CV_SPOKE_CONFIGS['ats-friendly'],
];

export function getCategoryConfigBySlug(slug: string): CvCategoryPageConfig | undefined {
  if (slug === 'cv-templates') return CV_TEMPLATE_HUB_CONFIG;
  const legacyToNew: Record<string, string> = {
    'cv-template-16-year-old': '16-year-old',
    'school-leaver-cv-template': 'school-leaver',
    'graduate-cv-templates': 'graduate',
    'acting-cv-template': 'acting',
    'finance-cv-template': 'finance',
    'nursing-cv-template': 'nursing',
    'ats-friendly-cv-template': 'ats-friendly',
  };
  const key = legacyToNew[slug] || slug;
  return CV_SPOKE_CONFIGS[key];
}
