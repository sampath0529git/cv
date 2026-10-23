import { CV } from '@/types/cv';

export const SAMPLE_UK_CV: CV = {
  personal: {
    fullName: 'Eleanor Vance',
    jobTitle: 'Senior Marketing Manager',
    email: 'eleanor.vance@example.co.uk',
    phone: '+44 7700 900842',
    location: 'Manchester, Greater Manchester',
    linkedin: 'linkedin.com/in/eleanor-vance-uk',
    website: 'eleanorvance.co.uk',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  personalStatement:
    'Strategic, commercially astute Senior Marketing Manager with over 8 years’ experience spearheading multi-channel marketing campaigns and brand positioning across competitive UK consumer and B2B sectors. Proven expertise in orchestrating cross-functional growth programmes, managing six-figure budgets, and driving digital transformation that elevates customer acquisition and retention. A collaborative leader committed to data-led decision making and high-impact storytelling.',
  experience: [
    {
      id: 'exp-1',
      role: 'Head of Growth Marketing',
      company: 'Peak Digital Group',
      location: 'Manchester',
      startDate: 'Jan 2022',
      endDate: 'Present',
      current: true,
      bullets: [
        'Direct an 8-person multidisciplinary marketing team across paid performance, SEO, lifecycle CRM, and content strategy with full P&L accountability for a £1.4M annual budget.',
        'Architected a cohesive customer acquisition programme that delivered a 42% year-on-year increase in qualified inbound leads whilst reducing cost per acquisition (CPA) by 18%.',
        'Spearheaded an end-to-end brand refresh and website rebuild, elevating organic search visibility by 65% and boosting conversion rate from 1.8% to 3.1%.',
        'Established advanced marketing attribution modelling in Tableau and Google Analytics 4, delivering actionable commercial insights to the C-suite and Board.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Senior Digital Marketing Manager',
      company: 'Northern Commerce Ltd',
      location: 'Leeds',
      startDate: 'Sep 2018',
      endDate: 'Dec 2021',
      current: false,
      bullets: [
        'Managed omni-channel campaigns across paid search, programmatic display, paid social, and automated email workflows for an enterprise retail client portfolio.',
        'Delivered £3.8M in attributed e-commerce revenue across four consecutive fiscal quarters, exceeding annual regional targets by 24%.',
        'Implemented a bespoke customer segmentation and lifecycle retention framework via HubSpot, reducing churn by 14% and elevating repeat customer lifetime value.',
        'Mentored junior marketers and apprentices, fostering an agile test-and-learn culture with continuous A/B experimentation across landing pages and ad creative.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Digital Marketing Executive',
      company: 'Chesterfield Media Group',
      location: 'Chester',
      startDate: 'Aug 2016',
      endDate: 'Aug 2018',
      current: false,
      bullets: [
        'Coordinated day-to-day social media channels, organic content marketing, and email newsletters, scaling subscriber community from 15,000 to over 85,000 active readers.',
        'Drafted engaging press releases, editorial thought-leadership articles, and seasonal campaign assets featured in regional and trade publications.',
        'Monitored key performance metrics and compiled monthly stakeholder reports with recommendations on channel optimisation.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      qualification: 'MSc Strategic Marketing (Distinction)',
      institution: 'Alliance Manchester Business School, University of Manchester',
      startDate: 'Sep 2015',
      endDate: 'Jun 2016',
      grade: 'Distinction (First in Class)',
    },
    {
      id: 'edu-2',
      qualification: 'BA (Hons) English Literature & Media Studies',
      institution: 'University of Leeds',
      startDate: 'Sep 2012',
      endDate: 'Jun 2015',
      grade: 'First Class Honours (1st)',
    },
  ],
  skills: [
    {
      group: 'Core Leadership & Strategy',
      items: [
        'Omnichannel Campaign Strategy',
        'Brand Positioning & Architecture',
        'Budget Allocation & P&L Oversight',
        'Executive Stakeholder Relations',
        'Agile Team Leadership',
      ],
    },
    {
      group: 'Performance & Growth',
      items: [
        'SEO & Content Strategy',
        'Paid Search & Social (Google, Meta, LinkedIn)',
        'Conversion Rate Optimisation (CRO)',
        'CRM Lifecycle Automation',
        'Customer Journey Mapping',
      ],
    },
    {
      group: 'Analytics & MarTech Tools',
      items: [
        'Google Analytics 4 & Looker Studio',
        'HubSpot Enterprise CRM',
        'Tableau & SQL Reporting',
        'Semrush & Ahrefs',
        'Figma & Adobe Creative Suite',
      ],
    },
  ],
  certifications: [
    'Chartered Marketer (CIM) – Chartered Institute of Marketing (2021)',
    'Google Analytics 4 Certified Professional – Google Skillshop (2023)',
    'Inbound & Lifecycle Marketing Specialist – HubSpot Academy (2022)',
    'Mini MBA in Brand Management – Marketing Week (2020)',
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'UK Retail Omnichannel Rebrand',
      description:
        'Led a national repositioning campaign across 24 retail locations and e-commerce platforms, securing a 34% surge in footfall and a prestigious D&AD Impact Award nomination.',
      link: 'eleanorvance.co.uk/rebrand',
    },
    {
      id: 'proj-2',
      title: 'Automated Lifecycle Retention Engine',
      description:
        'Architected a 12-stage personalised email automation system across 120,000 active customers, generating an incremental £1.2M in annual recurring revenue.',
    },
  ],
  languages: [
    { name: 'English', level: 'Native / Bilingual' },
    { name: 'French', level: 'Professional Working Proficiency' },
  ],
  volunteering: [
    {
      id: 'vol-1',
      role: 'Career Mentor & Digital Workshop Facilitator',
      organisation: 'Manchester Digital Career Exchange',
      date: '2020 – Present',
      description:
        'Volunteer 4 hours monthly mentoring graduates and under-represented young professionals entering the UK digital marketing sector.',
    },
  ],
  interests: [
    'Landscape Photography',
    'Long-distance Fell Running in the Peak District',
    'Contemporary British Fiction & Literary Essays',
  ],
  references: 'References available on request',
  settings: {
    templateId: 'london',
    accentColor: '#1E3A8A', // Classic British Navy
    fontFamily: 'inter',
    fontScale: 'md',
    showPhoto: false, // Default false per UK convention
    sectionOrder: [
      'statement',
      'experience',
      'education',
      'skills',
      'certifications',
      'projects',
      'languages',
      'volunteering',
      'interests',
      'references',
    ],
  },
};
