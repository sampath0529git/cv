import { CV, DEFAULT_FONT_BOLDNESS } from '@/types/cv';
import { SAMPLE_UK_CV } from './sampleCv';
import type { CvState } from '@/store/useCvStore';

/**
 * Tailored UK Sample CVs for each of the 8 Hub & Spoke SEO Categories.
 * Every sample uses authentic British qualifications, spelling, locations, and employer standards.
 */

export const SAMPLE_TEEN_16_CV: CV = {
  personal: {
    fullName: 'Freya Bennett',
    jobTitle: 'Year 11 Student · Weekend Retail & Hospitality Applicant',
    email: 'freya.bennett@outlook.co.uk',
    phone: '07700 900418',
    location: 'York, North Yorkshire',
  },
  personalStatement:
    'Reliable, polite, and enthusiastic 16-year-old Year 11 student completing 9 GCSEs in June 2026, seeking a weekend or summer customer assistant role in retail or hospitality. Confident communicator with hands-on till and stockroom experience gained during a school placement at Waterstones, alongside 12 months volunteering with Oxfam and completing the Bronze Duke of Edinburgh Award.',
  education: [
    {
      id: 'teen-edu-1',
      qualification: '9 GCSEs (Predicted Grades 6–8, sitting Summer 2026)',
      institution: 'Huntington School',
      location: 'York, UK',
      startDate: 'Sep 2021',
      endDate: 'Jun 2026',
      grade: 'Maths (7) · English Lang (8) · English Lit (7)',
      description:
        'Additional subjects: Combined Science (7-7), Geography (8), Business Studies (7), Spanish (6), Computer Science (7). 98.5% attendance record.',
    },
  ],
  experience: [
    {
      id: 'teen-exp-1',
      role: 'Saturday Charity Shop Volunteer',
      company: 'Oxfam Bookshop',
      location: 'Petergate, York',
      startDate: 'May 2025',
      endDate: 'Present',
      current: true,
      bullets: [
        'Welcome customers warmly, answer enquiries on stock availability, and process card and cash payments accurately on the EPOS till.',
        'Sort, price, and steam incoming donations, refreshing front-window displays that helped lift Saturday book sales by 15%.',
        'Maintain a clean, tidy shop floor and follow daily opening and cashing-up checklists alongside the shift supervisor.',
      ],
    },
    {
      id: 'teen-exp-2',
      role: 'Year 10 Work Experience Placement (Retail Assistant)',
      company: 'Waterstones',
      location: 'Coney Street, York',
      startDate: 'Jul 2025',
      endDate: 'Jul 2025',
      current: false,
      bullets: [
        'Completed a two-week full-time retail placement supporting seasonal Summer Reads merchandising and customer click-and-collect.',
        'Checked off morning deliveries of 200+ titles against electronic stock sheets with zero discrepancies.',
      ],
    },
  ],
  skills: [
    {
      group: 'Core Skills',
      items: [
        'Customer Service',
        'EPOS Till & Cash Handling',
        'Punctuality & Reliability',
        'Teamwork',
        'Stock Replenishment',
        'Clear Communication',
        'Microsoft Office & Google Docs',
        'Problem Solving',
        'Numeracy',
      ],
    },
  ],
  certifications: [
    'St John Ambulance Youth First Aid Certificate (2025)',
    'Level 2 Food Safety & Hygiene Awareness (Online)',
  ],
  projects: [
    {
      id: 'teen-proj-1',
      title: 'Year 11 House Prefect & Peer Reading Mentor',
      role: 'Huntington School',
      description:
        'Selected by teaching staff to guide prospective parents at open evenings and mentor three Year 7 pupils weekly in literacy.',
    },
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'GCSE Conversational' },
  ],
  volunteering: [],
  interests: [
    'York City Rowing Club Junior Squad (trains 3 mornings per week)',
    'Baking & decorating celebration cakes for family charity bake sales',
  ],
  awards: [
    'Duke of Edinburgh Bronze Award Completed (2025)',
    'Head of Year Commendation for 98.5% Attendance & Attitude to Learning',
  ],
  references: 'School and volunteer references available on request',
  settings: {
    templateId: 'york',
    accentColor: '#2563EB',
    fontFamily: 'jakarta',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: false,
    sectionOrder: [
      'statement',
      'skills',
      'education',
      'experience',
      'projects',
      'awards',
      'certifications',
      'interests',
      'references',
    ],
  },
};

export const SAMPLE_SCHOOL_LEAVER_CV: CV = {
  personal: {
    fullName: 'Callum MacLeod',
    jobTitle: 'Sixth Form School Leaver · Degree Apprenticeship Candidate',
    email: 'callum.macleod@btinternet.com',
    phone: '07700 900654',
    location: 'Leeds, West Yorkshire',
    linkedin: 'linkedin.com/in/callum-macleod-uk',
    drivingLicence: 'Full UK Clean Driving Licence',
  },
  personalStatement:
    'Analytical and commercially minded Year 13 Sixth Form leaver predicted AAB at A-Level (Mathematics, Economics, Physics), applying for Level 4–6 Finance, Audit, and Business Degree Apprenticeships. Combines quantitative problem-solving and Excel data modelling with 18 months of customer-facing hospitality teamwork and PwC Virtual Insight Week experience.',
  education: [
    {
      id: 'sl-edu-1',
      qualification: 'A-Levels: Mathematics (A), Economics (A), Physics (B) — Predicted',
      institution: 'Roundhay Sixth Form',
      location: 'Leeds, UK',
      startDate: 'Sep 2024',
      endDate: 'Jun 2026',
      grade: 'Predicted AAB + Grade A in EPQ',
      description:
        'Extended Project Qualification (EPQ): Analysed the impact of Bank of England base-rate movements on UK SME borrowing.',
    },
    {
      id: 'sl-edu-2',
      qualification: '10 GCSEs (Grades 9–7)',
      institution: 'Roundhay School',
      location: 'Leeds, UK',
      startDate: 'Sep 2019',
      endDate: 'Jun 2024',
      grade: 'Including Maths (9), English Language (8), Economics (8)',
    },
  ],
  experience: [
    {
      id: 'sl-exp-1',
      role: 'Part-Time Barista & Shift Opener',
      company: 'North Star Coffee Roasters',
      location: 'Leeds Dock',
      startDate: 'Oct 2024',
      endDate: 'Present',
      current: true,
      bullets: [
        'Serve 180+ customers per weekend shift in a fast-paced speciality café while balancing full-time A-Level study.',
        'Trusted with weekend opening checks, PDQ terminal reconciliation, and training two new junior team members.',
        'Reduced milk and pastry wastage by 12% by tracking Sunday afternoon sell-through patterns on a shared spreadsheet.',
      ],
    },
    {
      id: 'sl-exp-2',
      role: 'Business & Accounting Virtual Insight Participant',
      company: 'PwC UK',
      location: 'Leeds / Hybrid',
      startDate: 'Jul 2025',
      endDate: 'Aug 2025',
      current: false,
      bullets: [
        'Selected from 1,400+ Sixth Form applicants to shadow Assurance and Deals associates across case-study workshops.',
        'Presented a 5-minute retail turnaround pitch to a panel of Senior Managers, receiving commendation for commercial clarity.',
      ],
    },
  ],
  skills: [
    {
      group: 'Competencies',
      items: [
        'Microsoft Excel (PivotTables, XLOOKUP)',
        'Quantitative Analysis',
        'Commercial Awareness',
        'Client Presentation',
        'Time Management',
        'Team Leadership',
        'PowerPoint & Data Visualisation',
        'Cash & Till Reconciliation',
      ],
    },
  ],
  certifications: [
    'Bloomberg Market Concepts (BMC) Foundation Module',
    'Forage UK Audit & Commercial Law Virtual Experience',
  ],
  projects: [
    {
      id: 'sl-proj-1',
      title: 'Young Enterprise UK — Managing Director (Team Elevate)',
      role: 'Regional Finalist',
      description:
        'Led a team of 9 Sixth Form students launching reusable laser-etched campus drinkware, generating £1,420 revenue and 38% net margin.',
    },
  ],
  languages: [{ name: 'English', level: 'Native' }],
  volunteering: [],
  interests: [
    'Captain of School 1st XI Football Squad',
    'Leeds Parkrun 5km Regular Volunteer & Runner',
  ],
  awards: [
    'UKMT Senior Mathematical Challenge — Silver Certificate (2025)',
    'Duke of Edinburgh Silver Award',
  ],
  references: 'Academic and employer references available on request',
  settings: {
    templateId: 'durham',
    accentColor: '#1E3A8A',
    fontFamily: 'jakarta',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: false,
    sectionOrder: [
      'statement',
      'education',
      'skills',
      'experience',
      'projects',
      'certifications',
      'awards',
      'interests',
      'references',
    ],
  },
};

export const SAMPLE_GRADUATE_CV: CV = {
  personal: {
    fullName: 'Priya Nair',
    jobTitle: 'BSc Management Graduate · Commercial & Consulting Analyst',
    email: 'priya.nair@alumni.manchester.ac.uk',
    phone: '07700 900812',
    location: 'Manchester, Greater Manchester',
    linkedin: 'linkedin.com/in/priya-nair-uk',
  },
  personalStatement:
    'First-Class Honours BSc Management graduate from the University of Manchester with commercial internship experience in FTSE 100 FMCG analytics and university society sponsorship leadership. Skilled in SQL, Python, Excel financial modelling, and translating complex consumer datasets into clear board-ready growth recommendations.',
  education: [
    {
      id: 'grad-edu-1',
      qualification: 'BSc (Hons) Management (Strategy & Analytics)',
      institution: 'Alliance Manchester Business School, University of Manchester',
      location: 'Manchester, UK',
      startDate: 'Sep 2023',
      endDate: 'Jun 2026',
      grade: 'First-Class Honours (76% Average)',
      description:
        'Final-Year Dissertation (79%): Predictive Churn Modelling in UK Subscription Retail. Dean’s List Award for Top 5% Cohort Performance.',
    },
    {
      id: 'grad-edu-2',
      qualification: 'A-Levels: Economics (A*), Mathematics (A), History (A)',
      institution: 'King Edward VI Camp Hill School',
      location: 'Birmingham, UK',
      startDate: 'Sep 2021',
      endDate: 'Jun 2023',
      grade: 'A*AA · 10 GCSEs Grades 9–8',
    },
  ],
  experience: [
    {
      id: 'grad-exp-1',
      role: 'Commercial Strategy Summer Intern',
      company: 'Unilever UK & Ireland',
      location: 'Kingston upon Thames, London',
      startDate: 'Jun 2025',
      endDate: 'Sep 2025',
      current: false,
      bullets: [
        'Analysed EPOS promotional elasticity across Tesco and Sainsbury’s accounts worth £42M, identifying 3 SKU bundle changes projected to lift category margin by 2.4%.',
        'Built an automated Power BI weekly tracker adopted by 11 National Account Managers, saving 6 hours of manual reporting per week.',
        'Awarded fast-track Graduate Scheme final-round return offer following end-of-placement director presentation.',
      ],
    },
    {
      id: 'grad-exp-2',
      role: 'Head of Corporate Sponsorship (Committee)',
      company: 'Manchester Consulting & Finance Society',
      location: 'University of Manchester',
      startDate: 'Sep 2024',
      endDate: 'May 2025',
      current: false,
      bullets: [
        'Negotiated £11,500 in annual sponsorship packages with 7 graduate employers, a 35% increase year-on-year.',
        'Organised 6 campus case-interview workshops and networking panels attended by 450+ undergraduate students.',
      ],
    },
  ],
  skills: [
    {
      group: 'Technical & Commercial',
      items: [
        'Excel (Financial Modelling & VBA)',
        'Power BI & Tableau',
        'SQL (PostgreSQL)',
        'Python (Pandas)',
        'Market Sizing & Case Analysis',
        'Stakeholder Presentations',
        'FMCG Category Insights',
        'Project Coordination',
      ],
    },
  ],
  certifications: [
    'Google Data Analytics Professional Certificate',
    'Bright Network Commercial Consultancy Academy',
  ],
  projects: [
    {
      id: 'grad-proj-1',
      title: 'UK Universities Strategy Case Competition — 1st Place Winner',
      role: 'Team Lead',
      description:
        'Developed a UK net-zero last-mile delivery strategy judged first out of 48 university teams by McKinsey & Co. panellists.',
    },
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Malayalam', level: 'Conversational' },
    { name: 'French', level: 'Intermediate (B1)' },
  ],
  volunteering: [],
  interests: [
    'University of Manchester Women’s Lacrosse 1st Team Treasurer',
    'Peak District Trail Running & Half-Marathon Finisher (1:44)',
  ],
  awards: ['Alliance MBS Dean’s List Commendation (2024, 2025)'],
  references: 'References available on request',
  settings: {
    templateId: 'graduate-starter',
    accentColor: '#4B4DED',
    fontFamily: 'jakarta',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: false,
    sectionOrder: [
      'statement',
      'education',
      'experience',
      'skills',
      'projects',
      'certifications',
      'languages',
      'interests',
      'references',
    ],
  },
};

export const SAMPLE_ACTING_CV: CV = {
  personal: {
    fullName: 'Theo Sterling',
    jobTitle: 'Actor (Stage, Television & Film) · Spotlight PIN: 4819-5620-3314',
    email: 'casting@hamiltonhodell-example.co.uk',
    phone: '+44 20 7946 0319',
    location: 'London, UK (Base: London & Manchester)',
    website: 'spotlight.com/4819-5620-3314',
    linkedin: 'Agent: Conway & Partners Talent',
    photoUrl: '/assets/actor-headshot-uk.jpg',
    nationality: 'Playing Age: 24–32 · Height: 5\'11" (180cm) · Eyes: Hazel',
    drivingLicence: 'Full UK Clean Licence · Equity Member',
  },
  personalStatement:
    'RADA-trained British stage and screen actor with classical verse fluency, strong contemporary naturalist instincts, and BADC Advanced stage combat certification. Experienced across West End transfers, BBC One prime-time drama, and independent British feature film.',
  experience: [
    {
      id: 'act-exp-1',
      role: 'DS Rory Halstead (Series Regular, 4 Eps)',
      company: 'BBC One / Lookout Point — "Calder Valley"',
      location: 'Dir. Euros Lyn',
      startDate: '2025',
      endDate: '2025',
      current: false,
      bullets: [
        'Lead investigative detective opposite Sarah Lancashire in six-part prime-time BBC One thriller.',
      ],
    },
    {
      id: 'act-exp-2',
      role: 'Edmund',
      company: 'Almeida Theatre & West End Transfer — "King Lear"',
      location: 'Dir. Rebecca Frecknall',
      startDate: '2024',
      endDate: '2025',
      current: false,
      bullets: [
        'Performed 110+ performances; praised in The Stage for "razor-sharp, charismatic verse delivery".',
      ],
    },
    {
      id: 'act-exp-3',
      role: 'Julian Vance (Supporting Lead)',
      company: 'Film4 / BFI — "Saltmarsh"',
      location: 'Dir. Charlotte Regan',
      startDate: '2024',
      endDate: '2024',
      current: false,
      bullets: [
        'Official Selection, BFI London Film Festival 2024.',
      ],
    },
    {
      id: 'act-exp-4',
      role: 'Konstantin Treplev',
      company: 'Royal Exchange Theatre, Manchester — "The Seagull"',
      location: 'Dir. Roy Alexander Weise',
      startDate: '2023',
      endDate: '2023',
      current: false,
      bullets: [],
    },
    {
      id: 'act-exp-5',
      role: 'Lt. Arthur Hollis (Guest Lead)',
      company: 'ITV Studios — "Grantchester" (Series 8)',
      location: 'Dir. Rob Evans',
      startDate: '2023',
      endDate: '2023',
      current: false,
      bullets: [],
    },
  ],
  projects: [
    {
      id: 'act-proj-1',
      title: 'BBC Radio 4 Afternoon Play — "The North Pier"',
      role: 'Narrator / Sam',
      description: 'Dir. Nadia Molinari · Recorded at MediaCityUK Salford (2025).',
    },
    {
      id: 'act-proj-2',
      title: 'National Theatre Studio R&D — "Albion Rising"',
      role: 'Marcus',
      description: 'Two-week new writing workshop with playwright Beth Steel (2024).',
    },
  ],
  education: [
    {
      id: 'act-edu-1',
      qualification: 'BA (Hons) in Acting (3-Year Conservatoire)',
      institution: 'Royal Academy of Dramatic Art (RADA)',
      location: 'London, UK',
      startDate: '2019',
      endDate: '2022',
      grade: 'Graduated with Distinction in Classical Text',
    },
    {
      id: 'act-edu-2',
      qualification: 'National Youth Theatre of Great Britain (NYT)',
      institution: 'Senior Intake Member',
      location: 'London, UK',
      startDate: '2018',
      endDate: '2019',
    },
  ],
  skills: [
    {
      group: 'Performance Skills',
      items: [
        'Baritone (G2–G4)',
        'BADC Level 3 Advanced Combat (Rapier, Unarmed)',
        'Acoustic Guitar & Piano (Grade 6)',
        'Horse Riding (Canter/Jump)',
        'Period & Contemporary Dance',
        'Motion Capture & ADR',
        'Cold Reading & Improvisation',
        'Swimming & Boxing',
      ],
    },
  ],
  languages: [
    { name: 'RP / Heightened RP', level: 'Native' },
    { name: 'Yorkshire & Mancunian', level: 'Native/Authentic' },
    { name: 'General American & Irish (Dublin)', level: 'High Standard' },
    { name: 'French', level: 'Conversational' },
  ],
  certifications: [
    'Equity Full Member',
    'Spotlight Registered Performer',
    'BADC Advanced Stage Combat Gold',
  ],
  volunteering: [],
  interests: ['Amateur 35mm Film Photography', 'Boxing ( Fitzroy Lodge ABC )', 'Wild Swimming'],
  awards: [
    'Ian Charleson Award Commendation — King Lear (2025)',
    'Spotlight Prize Finalist Showcase',
  ],
  references: 'Representation: Conway & Partners Talent, Soho Square, London',
  settings: {
    templateId: 'west-end',
    accentColor: '#1E293B',
    fontFamily: 'jakarta',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: true,
    sectionOrder: [
      'statement',
      'experience',
      'projects',
      'education',
      'skills',
      'languages',
      'certifications',
      'awards',
      'references',
    ],
  },
};

export const SAMPLE_FINANCE_CV: CV = {
  ...SAMPLE_UK_CV,
  settings: {
    ...SAMPLE_UK_CV.settings,
    templateId: 'classic-corporate',
    accentColor: '#0F172A',
    showPhoto: false,
  },
};

export const SAMPLE_NURSING_CV: CV = {
  personal: {
    fullName: 'Amelia Thornton, RN BSc (Hons)',
    jobTitle: 'Band 6 Senior Staff Nurse (Acute Medicine) · NMC PIN: 19I0482E',
    email: 'amelia.thornton.rn@nhs-mail-example.co.uk',
    phone: '07700 900275',
    location: 'Leeds, West Yorkshire',
    drivingLicence: 'Enhanced DBS Cleared · Full Right to Work UK',
  },
  personalStatement:
    'Compassionate, NMC-registered Band 6 Adult Nurse with 6+ years of acute NHS hospital experience across Acute Medical Units (AMU) and High Dependency step-down care. Proven clinical leader skilled in deteriorating patient escalation (NEWS2), IV cannulation, venepuncture, mentorship of student nurses, and CQC-aligned patient safety audits.',
  experience: [
    {
      id: 'nur-exp-1',
      role: 'Band 6 Junior Sister / Charge Nurse — Acute Medical Unit',
      company: 'Leeds Teaching Hospitals NHS Trust (St James’s University Hospital)',
      location: 'Leeds, UK',
      startDate: 'Apr 2023',
      endDate: 'Present',
      current: true,
      bullets: [
        'Coordinate shift flow and safe bed allocation across a 36-bed Acute Medical Unit admitting 45+ emergency medical patients daily.',
        'Lead multidisciplinary ward rounds alongside Consultant Physicians, Pharmacists, and Discharge Coordinators, cutting delayed discharges by 14%.',
        'Spearheaded a Sepsis Six 60-minute bundle audit across 120 patient episodes, raising timely IV antibiotic administration compliance from 81% to 94%.',
        'Act as Practice Assessor (NMC SSSA) for 8 BSc Nursing students and newly qualified preceptorship nurses per year.',
      ],
    },
    {
      id: 'nur-exp-2',
      role: 'Band 5 Staff Nurse — Respiratory & General Medicine',
      company: 'Calderdale and Huddersfield NHS Foundation Trust',
      location: 'Huddersfield, UK',
      startDate: 'Sep 2020',
      endDate: 'Mar 2023',
      current: false,
      bullets: [
        'Delivered holistic evidence-based care for 8–10 acute medical and non-invasive ventilation (NIV/BiPAP) patients per 12.5-hour shift.',
        'Administered controlled drugs, IV infusions, and TPN accurately with zero medication safety incidents over 30 months.',
        'Appointed Ward Tissue Viability Champion, reducing hospital-acquired Category 2 pressure ulcers by 22% over 12 months.',
      ],
    },
  ],
  education: [
    {
      id: 'nur-edu-1',
      qualification: 'Postgraduate Module: Care of the Acutely Ill Adult (Level 7, 30 Credits)',
      institution: 'University of Leeds — School of Healthcare',
      location: 'Leeds, UK',
      startDate: 'Jan 2024',
      endDate: 'Jun 2024',
      grade: 'Merit',
    },
    {
      id: 'nur-edu-2',
      qualification: 'BSc (Hons) Nursing (Adult)',
      institution: 'University of Manchester',
      location: 'Manchester, UK',
      startDate: 'Sep 2017',
      endDate: 'Jul 2020',
      grade: 'First-Class Honours (1st)',
      description: 'Clinical placements across Manchester Royal Infirmary Emergency Department, Surgical Assessment, and Community District Nursing.',
    },
  ],
  skills: [
    {
      group: 'Clinical & Governance Competencies',
      items: [
        'Acute Assessment (ABCDE / NEWS2)',
        'IV Cannulation & Venepuncture',
        'ECG Recording & Interpretation',
        'Non-Invasive Ventilation (NIV)',
        'Male & Female Catheterisation',
        'Safeguarding Adults Level 3',
        'Datix Incident Investigation',
        'NMC Practice Assessor (SSSA)',
      ],
    },
  ],
  certifications: [
    'NMC Registered Nurse — Sub-Part 1 Adult (Active, Revalidated 2026)',
    'Resuscitation Council UK — Immediate Life Support (ILS)',
    'NHS Leadership Academy — Edward Jenner Programme',
  ],
  projects: [],
  languages: [{ name: 'English', level: 'Native' }],
  volunteering: [],
  interests: ['Royal College of Nursing (RCN) Branch Member', 'Yorkshire Three Peaks Charity Walker'],
  awards: ['Leeds Teaching Hospitals "Time to Shine" Patient Safety Commendation (2024)'],
  references: 'NHS clinical line-manager references available via Trac / NHS Jobs',
  settings: {
    templateId: 'leeds',
    accentColor: '#0D9488',
    fontFamily: 'jakarta',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: false,
    sectionOrder: [
      'statement',
      'experience',
      'skills',
      'certifications',
      'education',
      'awards',
      'references',
    ],
  },
};

export const SAMPLE_ATS_FRIENDLY_CV: CV = {
  personal: {
    fullName: 'Daniel Whitaker',
    jobTitle: 'Senior Operations & Supply Chain Project Manager',
    email: 'daniel.whitaker@ukmail-example.co.uk',
    phone: '07700 900510',
    location: 'Birmingham, West Midlands',
    linkedin: 'linkedin.com/in/daniel-whitaker-ops',
  },
  personalStatement:
    'PRINCE2 Practitioner and Lean Six Sigma Black Belt Operations Manager with 9 years of UK logistics, procurement, and multi-site fulfilment leadership. Track record delivering £3.8M in verified cost efficiencies, 99.4% OTIF service compliance, and seamless ERP warehouse migrations across Midlands distribution hubs.',
  experience: [
    {
      id: 'ats-exp-1',
      role: 'Operations & Continuous Improvement Manager',
      company: 'Midlands Logistics Group plc',
      location: 'Birmingham, UK',
      startDate: 'Mar 2022',
      endDate: 'Present',
      current: true,
      bullets: [
        'Direct daily fulfilment and inventory operations across a 240,000 sq ft national distribution centre employing 145 warehouse and transport staff.',
        'Delivered £1.9M in annualised operating savings by redesigning pick-path slotting and automating carrier manifest integration in SAP S/4HANA.',
        'Improved On-Time In-Full (OTIF) retail delivery performance from 95.8% to 99.4% across 60+ national retail accounts.',
      ],
    },
    {
      id: 'ats-exp-2',
      role: 'Supply Chain Project Lead',
      company: 'Severn Retail Distribution Ltd',
      location: 'Coventry, UK',
      startDate: 'Jun 2018',
      endDate: 'Feb 2022',
      current: false,
      bullets: [
        'Managed £4.5M WMS implementation across 3 regional depots on schedule and 4% under capital budget.',
        'Negotiated 3PL haulage SLA renewals worth £12M annually, reducing cost-per-pallet by 8.5% without service degradation.',
      ],
    },
  ],
  education: [
    {
      id: 'ats-edu-1',
      qualification: 'BEng (Hons) Industrial & Manufacturing Systems Engineering',
      institution: 'Loughborough University',
      location: 'Loughborough, UK',
      startDate: 'Sep 2013',
      endDate: 'Jun 2017',
      grade: 'Upper Second-Class Honours (2:1)',
    },
  ],
  skills: [
    {
      group: 'Core Skills',
      items: [
        'Supply Chain & Fulfilment Operations',
        'Lean Six Sigma (DMAIC)',
        'SAP S/4HANA & Manhattan WMS',
        'P&L Budget Ownership (£18M)',
        '3PL Vendor Negotiation',
        'Health, Safety & ISO 9001 Compliance',
        'S&OP Demand Forecasting',
        'Cross-Functional Leadership',
      ],
    },
  ],
  certifications: [
    'PRINCE2 Practitioner Project Management',
    'Lean Six Sigma Black Belt Certified',
    'IOSH Managing Safely',
  ],
  projects: [],
  languages: [{ name: 'English', level: 'Native' }],
  volunteering: [],
  interests: ['Chartered Institute of Logistics and Transport (CILT UK) Member'],
  awards: [],
  references: 'References available on request',
  settings: {
    templateId: 'minimal-clean',
    accentColor: '#334155',
    fontFamily: 'inter',
    fontScale: 'md',
    letterSpacing: 0,
    fontBoldness: { ...DEFAULT_FONT_BOLDNESS },
    showPhoto: false,
    sectionOrder: [
      'statement',
      'experience',
      'skills',
      'certifications',
      'education',
      'references',
    ],
  },
};

/**
 * Converts a niche sample `CV` into a `Partial<CvState>` patch suitable for `loadParsedCvData`
 * when a user chooses "Load UK Example Content" from a category preview modal.
 */
export function convertSampleCvToStorePatch(
  sample: CV,
  templateId: string
): Partial<CvState> {
  const fullNameParts = (sample.personal.fullName || '').trim().split(/\s+/);
  const firstName = fullNameParts[0] || '';
  const lastName = fullNameParts.slice(1).join(' ');

  return {
    activeTemplate: templateId as any,
    themeColor: sample.settings.accentColor || '#2563EB',
    showPhoto: Boolean(sample.settings.showPhoto),
    summary: sample.personalStatement || '',
    contact: {
      firstName,
      lastName,
      jobTitle: sample.personal.jobTitle || '',
      photoUrl: sample.personal.photoUrl || '',
      email: sample.personal.email || '',
      phone: sample.personal.phone || '',
      postalCode: '',
      city: sample.personal.location || '',
      dateOfBirth: sample.personal.dateOfBirth || '',
      nationality: sample.personal.nationality || '',
      linkedin: sample.personal.linkedin || '',
      website: sample.personal.website || '',
      drivingLicence: sample.personal.drivingLicence || '',
    },
    experiences: (sample.experience || []).map((exp, idx) => ({
      id: exp.id || `sample-exp-${idx + 1}`,
      jobTitle: exp.role || '',
      employer: exp.company || '',
      city: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      isCurrent: Boolean(exp.current),
      description:
        exp.bullets && exp.bullets.length > 0
          ? exp.bullets.map((b) => `• ${b}`).join('\n')
          : exp.description || '',
      bullets: exp.bullets || [],
    })),
    educations: (sample.education || []).map((edu, idx) => ({
      id: edu.id || `sample-edu-${idx + 1}`,
      degree: edu.qualification || '',
      school: edu.institution || '',
      city: edu.location || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      grade: edu.grade || '',
      description: edu.description || '',
      bullets: edu.bullets || [],
    })),
    skills: (sample.skills || [])
      .flatMap((g) => g.items)
      .filter(Boolean)
      .map((name, idx) => ({
        id: `sample-skill-${idx + 1}`,
        name,
        level: 'Advanced' as const,
      })),
    certificationsList: [...(sample.certifications || [])],
    projectsList: [...(sample.projects || [])],
    awardsList: [...(sample.awards || [])],
    languagesList: (sample.languages || []).map((l) =>
      l.level ? `${l.name} (${l.level})` : l.name
    ),
    interestsList: [...(sample.interests || [])],
    referencesText: sample.references || 'References available on request',
    includeReferences: Boolean(sample.references?.trim()),
    sectionOrder: sample.settings.sectionOrder || [
      'statement',
      'experience',
      'education',
      'skills',
      'languages',
      'interests',
    ],
  };
}
