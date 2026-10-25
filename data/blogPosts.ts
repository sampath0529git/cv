export interface Author {
  name: string;
  role: string;
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
  keywords: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
    }[];
    conclusion: string;
    ctaText: string;
    ctaLink: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-write-ats-cv-uk-2026',
    title: 'How to Write an ATS-Optimised CV for the UK Job Market in 2026',
    seoTitle: 'How to Write an ATS-Optimised CV UK (2026 Guide) | Makemeyour',
    metaDescription: 'Learn how to write an ATS-friendly CV for British employers. Discover key formatting rules, keyword targeting, and free ATS CV templates in the UK.',
    excerpt: 'Discover why 75% of CVs are rejected by automated recruitment software and learn the exact formatting rules to pass parsing filters.',
    category: 'ATS Guide',
    readTime: '6 min read',
    date: '24 October 2026',
    datePublished: '2026-10-24T09:00:00+00:00',
    dateModified: '2026-10-24T09:00:00+00:00',
    author: {
      name: 'Sarah Jenkins',
      role: 'Lead UK Recruitment Consultant',
    },
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    keywords: ['ATS CV UK', 'ATS friendly CV', 'free cv maker', 'UK CV formatting'],
    content: {
      intro: 'Applicant Tracking Systems (ATS) have become standard gatekeepers across UK FTSE 100 employers, NHS trusts, financial institutions, and fast-growing technology firms. When submitting your application through platforms like Reed, Indeed UK, Workday, or Greenhouse, algorithms scan your document for keyword relevance, structural clarity, and standard headings before human recruiters ever review it.',
      sections: [
        {
          heading: '1. Why Standard Section Headings Matter in the UK',
          body: [
            'Automated parsers rely on standardised taxonomy. Creative headings like "My Journey" or "Core Passions" confuse indexing bots and risk placing your experience under incorrect database fields.',
            'Always utilise conventional British section titles: "Personal Statement" (or "Professional Summary"), "Work Experience" (or "Employment History"), "Education & Qualifications", and "Skills & Technical Competencies".',
          ],
        },
        {
          heading: '2. Formatting Rules: Fonts, Tables, and ISO A4 Layouts',
          body: [
            'Keep your layout clean and free from multi-layered graphical elements. Complex multi-nested tables, text boxes, and floating header graphics can cause text truncation or corrupted parsing.',
            'Standard British CVs require ISO A4 dimensions (210 x 297 mm) with consistent 15-20 mm margins and standard, legible web fonts such as Inter, Roboto, Arial, or Merriweather. Our free online CV maker automatically applies ATS-compliant structure and single-layer PDF encoding.',
          ],
        },
        {
          heading: '3. Strategic Keyword Placement from UK Job Descriptions',
          body: [
            'Identify 5 to 10 hard skills and industry terms directly from the employer job specification. For example, if the role demands "stakeholder engagement", "PRINCE2", or "commercial acumen", mirror these exact terms in your achievement bullet points.',
            'Never hide white text or engage in keyword stuffing. UK recruiters quickly discard unreadable or deceptive formatting. Instead, contextualise skills with tangible outcomes.',
          ],
        },
      ],
      conclusion: 'Passing an ATS filter is about discipline, clarity, and relevance. By following British CV standards and choosing an ATS-engineered template, your application will consistently reach hiring decision-makers.',
      ctaText: 'Build an ATS-Friendly CV Free',
      ctaLink: '/start',
    },
  },
  {
    id: 'cv-personal-statement-examples',
    title: 'CV Personal Statement Examples: 2026 Guide for UK Jobseekers',
    seoTitle: 'CV Personal Statement Examples UK (Free Guide) | Makemeyour',
    metaDescription: 'Browse recruiter-approved UK CV personal statement examples for graduates, career changers, and professionals. Learn the 4-sentence formula that hooks hiring managers.',
    excerpt: 'Explore proven CV personal statement examples and master the 4-sentence formula that catches the attention of British hiring managers within 6 seconds.',
    category: 'CV Tips',
    readTime: '7 min read',
    date: '22 October 2026',
    datePublished: '2026-10-22T08:30:00+00:00',
    dateModified: '2026-10-22T08:30:00+00:00',
    author: {
      name: 'Oliver Thorne',
      role: 'Graduate Career Coach',
    },
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=800&q=80',
    keywords: [
      'cv templates personal statement examples',
      'personal statement cv examples',
      'how to write a personal statement for a cv uk',
      'cv personal profile examples',
    ],
    content: {
      intro: 'Your CV personal statement—also known as a personal profile or professional summary—is the most valuable real estate on your entire document. Positioned right below your contact details, this 3 to 4-sentence opening determines whether a British hiring manager reads your full career history or moves on to the next candidate.',
      sections: [
        {
          heading: 'The 4-Part British Personal Statement Formula',
          body: [
            'Sentence 1 (Who you are): State your current job title, core specialism, and total years of relevant experience.',
            'Sentence 2 (What you bring): Highlight 2 key skills or technical strengths tailored directly to the target role.',
            'Sentence 3 (Your biggest achievement): Mention a quantifiable result, such as revenue generated, costs reduced, or efficiencies improved.',
            'Sentence 4 (Your objective): Clearly state your immediate career goal and the value you will deliver to the hiring organisation.',
          ],
        },
        {
          heading: 'Example 1: Recent Graduate Personal Statement',
          body: [
            '"Driven Economics graduate (2:1, University of Bristol) with strong analytical skills, proficient in Python, SQL, and financial modelling. Completed a competitive summer analyst placement with a London asset management firm, delivering competitor benchmarking research. Seeking an entry-level analyst position within corporate finance to apply quantitative problem-solving and rigorous commercial acumen."',
          ],
        },
        {
          heading: 'Example 2: Mid-Level Professional / Project Manager',
          body: [
            '"PRINCE2 certified Project Manager with 5+ years of experience leading cross-functional teams in retail technology and financial services. Proven track record of managing £1.2M+ capital budgets and reducing delivery cycle times by 22% through agile adoption. Passionate about driving digital transformation and operational excellence in high-growth UK enterprises."',
          ],
        },
        {
          heading: 'Example 3: Career Changer Personal Statement',
          body: [
            '"Accomplished Secondary School Department Head with 7 years of leadership experience transitioning into corporate Learning & Development. Expert in stakeholder communication, curriculum design, and data-driven performance analysis. Eager to leverage transferable talent coaching and organizational planning skills to enhance workforce capability."',
          ],
        },
      ],
      conclusion: 'Keep your personal statement concise (between 50 and 120 words), avoid generic buzzwords like "hard-working team player", and ensure every sentence showcases concrete value.',
      ctaText: 'Use Free CV Templates with Personal Statement Prompts',
      ctaLink: '/templates',
    },
  },
  {
    id: 'cv-template-16-year-old-school-leaver',
    title: 'CV Template for 16-Year-Olds & School Leavers: Step-by-Step UK Guide',
    seoTitle: 'CV Template for 16 Year Olds & School Leavers UK | Makemeyour',
    metaDescription: 'Complete UK CV template for 16 year olds, teenagers, and school leavers with no work experience. Learn what to include, how to highlight GCSEs, and download free templates.',
    excerpt: 'Writing your first CV with little or no formal work experience? Learn how 16-year-olds and school leavers can showcase GCSEs, volunteer work, and transferable skills.',
    category: 'Graduate & School Leaver',
    readTime: '6 min read',
    date: '21 October 2026',
    datePublished: '2026-10-21T10:00:00+00:00',
    dateModified: '2026-10-21T10:00:00+00:00',
    author: {
      name: 'Oliver Thorne',
      role: 'Graduate Career Coach',
    },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    keywords: [
      'cv template for 16 year old',
      'cv template 16 year old',
      'cv templates for 16 year olds',
      'school leaver cv template',
      'cv template for teenager',
    ],
    content: {
      intro: 'Creating your first CV at 16 or after leaving school can feel intimidating when you have little to no formal employment history. However, UK employers hiring for part-time retail jobs, hospitality, apprenticeships, and entry-level positions do not expect years of commercial experience. Instead, they look for enthusiasm, reliability, punctuality, and transferable skills.',
      sections: [
        {
          heading: '1. Recommended Structure for a 16-Year-Old or School Leaver CV',
          body: [
            'Contact Details: Full Name, Location (City/Town and Postcode district, e.g. Manchester M14), Phone number, and professional Email address (avoid childish handles). Never include date of birth or photographs.',
            'Personal Statement: A brief 3-sentence summary stating you are a motivated school leaver or student seeking part-time or apprentice employment.',
            'Education Section (Place First): Put your secondary school, projected or achieved GCSE grades (especially English and Maths).',
            'Work Experience & Volunteering: Include weekend jobs, babysitting, dog walking, school enterprise projects, or Duke of Edinburgh awards.',
            'Key Skills: Practical abilities like customer service, till operation, digital literacy, teamwork, and reliable timekeeping.',
          ],
        },
        {
          heading: '2. Example GCSE Formatting for British CVs',
          body: [
            'Oakwood High School, Leeds | 2021 – 2026',
            'GCSEs: 8 subjects including Grade 7 in English Language, Grade 8 in Mathematics, and Grade 7 in Combined Science.',
            'Key modules and extracurricular involvement: Year 11 Prefect, Captain of School Athletics Team, Duke of Edinburgh Bronze Award.',
          ],
        },
        {
          heading: '3. Turning Everyday Activities into Impressive Experience',
          body: [
            'If you helped organise a school sports day or charity bake sale, that demonstrates project management and cash handling.',
            'Volunteering at a local animal shelter or scout group proves commitment, reliability, and teamwork—three traits highly valued by UK employers hiring teenagers.',
          ],
        },
      ],
      conclusion: 'Keep your CV strictly to 1 or 2 pages maximum. Use our Cambridge starter template on Makemeyour to format your education and skills in a clean, recruiter-ready layout.',
      ctaText: 'Create Your Free School Leaver CV',
      ctaLink: '/start',
    },
  },
  {
    id: 'top-5-cv-mistakes-london-graduates',
    title: 'Top 5 CV Mistakes London Graduates Make (And How to Fix Them)',
    seoTitle: 'Top 5 Graduate CV Mistakes UK & London Guide | Makemeyour',
    metaDescription: 'Avoid the 5 critical CV mistakes university graduates make in the UK. Discover how to format degree classifications, internships, and pass competitive graduate schemes.',
    excerpt: 'Avoid the common pitfalls that cost graduates interviews in finance, consulting, law, and creative agencies across London and the UK.',
    category: 'Graduate & School Leaver',
    readTime: '5 min read',
    date: '20 October 2026',
    datePublished: '2026-10-20T11:00:00+00:00',
    dateModified: '2026-10-20T11:00:00+00:00',
    author: {
      name: 'Oliver Thorne',
      role: 'Graduate Career Coach',
    },
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    keywords: [
      'graduate cv templates',
      'graduate cv uk',
      'university graduate resume mistakes',
      'entry level cv uk',
    ],
    content: {
      intro: 'Every year, tens of thousands of university graduates compete for spots on UK graduate schemes, banking analyst classes, and corporate development programmes. Despite earning First-class or Upper Second-class honours, many candidates receive immediate rejections due to preventable CV blunders.',
      sections: [
        {
          heading: '1. Glossing Over Academic Dissertations and Projects',
          body: [
            'Graduates frequently list part-time retail or bartending work in exhaustive detail while writing just a single line about their degree.',
            'Your degree is your primary asset. Include your expected or awarded classification (e.g., BSc Economics, 2:1), relevant modules, dissertation topic, and analytical tools used (e.g. SPSS, R, Python, MATLAB).',
          ],
        },
        {
          heading: '2. Exceeding the Strict 2-Page British Limit',
          body: [
            'In the UK, an entry-level CV should never exceed two A4 pages. A concise 1-page or structured 2-page document forces clarity.',
            'UK hiring managers spend an average of 6 to 8 seconds scanning applications. Dense blocks of unformatted text are quickly skipped.',
          ],
        },
        {
          heading: '3. Mixing American and British English Conventions',
          body: [
            'Using US spelling conventions (such as "analyze", "organization", or "labor") when applying to UK-based firms creates an impression of copy-pasting generic applications.',
            'Always apply standard British English: "analyse", "organisation", "programmes", and ensure dates follow Day/Month/Year conventions.',
          ],
        },
      ],
      conclusion: 'Our Cambridge Graduate Starter CV template is specifically tailored for UK university students and early-career jobseekers.',
      ctaText: 'Explore Graduate CV Templates',
      ctaLink: '/templates',
    },
  },
  {
    id: 'mastering-star-interview-technique',
    title: 'Mastering the STAR Interview Technique for UK Hiring Panels',
    seoTitle: 'Mastering the STAR Interview Technique UK | Makemeyour',
    metaDescription: 'Step-by-step guide to the STAR competency framework for UK civil service, corporate, and NHS job interviews. Learn how to structure winning interview answers.',
    excerpt: 'A step-by-step framework to structure compelling competency-based answers that impress interviewers.',
    category: 'Interviews',
    readTime: '7 min read',
    date: '15 October 2026',
    datePublished: '2026-10-15T09:00:00+00:00',
    dateModified: '2026-10-15T09:00:00+00:00',
    author: {
      name: 'Dr. Elena Vance',
      role: 'Executive Placement Director',
    },
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    keywords: ['STAR method UK', 'competency interview questions', 'civil service interview', 'interview preparation'],
    content: {
      intro: 'The STAR method (Situation, Task, Action, Result) is universally used across UK corporate firms, NHS trusts, and Civil Service Success Profiles to evaluate candidate competency.',
      sections: [
        {
          heading: 'How to Proportion Your STAR Response',
          body: [
            'Situation (15%): Set the brief context, team size, and commercial or operational problem.',
            'Task (15%): Outline your exact responsibility and deliverables.',
            'Action (50%): Detail your personal initiatives, methodology, and stakeholder engagement. Use "I" rather than "we".',
            'Result (20%): Quantify the impact—time saved, revenue grown, or service standards raised.',
          ],
        },
      ],
      conclusion: 'Align the achievements written on your CV directly with the STAR stories you prepare for interview day.',
      ctaText: 'Build Your Achievement-Focused CV',
      ctaLink: '/start',
    },
  },
  {
    id: 'executive-cv-formatting-strategies',
    title: 'Executive CV Formatting Strategies for Senior Leadership Roles',
    seoTitle: 'Executive CV Formatting Guide UK (Directors & C-Suite) | Makemeyour',
    metaDescription: 'Strategic CV formatting advice for UK directors, board advisors, and senior managers. Highlight P&L ownership, governance, and business transformation.',
    excerpt: 'How C-suite executives and directors should frame board-level achievements and strategic growth.',
    category: 'Career Growth',
    readTime: '8 min read',
    date: '10 October 2026',
    datePublished: '2026-10-10T14:00:00+00:00',
    dateModified: '2026-10-10T14:00:00+00:00',
    author: {
      name: 'Marcus Sterling',
      role: 'Headhunter & Board Advisor',
    },
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    keywords: ['executive CV format UK', 'board level resume', 'director cv template', 'C-suite CV UK'],
    content: {
      intro: 'At director and board level, your CV is a high-level marketing prospectus that communicates governance, commercial strategy, and team stewardship.',
      sections: [
        {
          heading: 'Leading with an Executive Summary and Board Mandate',
          body: [
            'Summarise your sector footprint, total P&L scale managed (e.g. £50M+ annual turnover), and key transformation milestones in the first third of page one.',
            'Feature governance credentials, Non-Executive Director (NED) experience, and mergers & acquisitions (M&A) leadership prominently.',
          ],
        },
      ],
      conclusion: 'Our Hopkins and London Executive templates are designed to deliver dignified typographic presence and clear strategic hierarchy.',
      ctaText: 'Choose Executive CV Templates',
      ctaLink: '/templates',
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === slug);
}
