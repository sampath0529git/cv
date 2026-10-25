'use client';

import React from 'react';
import { LinkedInImportPayload } from '@/lib/linkedinImport';
import { Sparkles, Code, Megaphone, Stethoscope, ArrowRight } from 'lucide-react';

export interface SamplePresetItem {
  id: string;
  name: string;
  jobTitle: string;
  location: string;
  badge: string;
  icon: React.ElementType;
  payload: LinkedInImportPayload;
}

export const SAMPLE_CV_PRESETS: SamplePresetItem[] = [
  {
    id: 'tech-lead',
    name: 'Alex Turner',
    jobTitle: 'Senior Full-Stack Engineer',
    location: 'London, United Kingdom',
    badge: 'Tech & Engineering',
    icon: Code,
    payload: {
      source: 'linkedin-text',
      firstName: 'Alex',
      lastName: 'Turner',
      jobTitle: 'Senior Full-Stack Engineer',
      email: 'alex.turner@example.co.uk',
      phone: '+44 7700 900142',
      city: 'London, United Kingdom',
      linkedin: 'linkedin.com/in/alex-turner-dev',
      website: 'github.com/alexturner-uk',
      summary:
        'Accomplished Senior Full-Stack Engineer with 7+ years of experience architecting high-scale distributed systems and real-time React web applications. Proven track record reducing API latency by 42% and mentoring high-performing engineering squads across UK FinTech hubs.',
      experiences: [
        {
          jobTitle: 'Lead Software Engineer',
          employer: 'FinTech Velocity UK',
          city: 'London, UK',
          startDate: 'Mar 2021',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            'Spearheaded the migration of legacy monolithic banking APIs to Next.js and microservices, handling £12M+ in daily transaction volume.',
            'Architected distributed caching layers reducing p99 response times from 340ms to 48ms across UK banking partner endpoints.',
            'Mentored 6 junior/mid-level engineers through structured pairing and code reviews, resulting in 3 promotions within 18 months.',
          ],
        },
        {
          jobTitle: 'Full-Stack Developer',
          employer: 'Apex Cloud Solutions',
          city: 'Cambridge, UK',
          startDate: 'Sep 2018',
          endDate: 'Feb 2021',
          isCurrent: false,
          bullets: [
            'Engineered customer-facing enterprise dashboards using TypeScript, React, and Tailwind CSS.',
            'Integrated automated CI/CD deployment pipelines on GCP and Docker, decreasing release turnaround from weekly to same-day.',
          ],
        },
      ],
      educations: [
        {
          degree: 'BSc (Hons) Computer Science, First Class Honours',
          school: 'University of Bristol',
          city: 'Bristol, UK',
          startDate: '2015',
          endDate: '2018',
          grade: 'First Class (1st)',
          description: 'Specialised in Distributed Systems, Algorithms, and Human-Computer Interaction.',
        },
      ],
      skills: [
        { name: 'TypeScript', level: 'Expert' },
        { name: 'React / Next.js', level: 'Expert' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Expert' },
        { name: 'Cloud Infrastructure (GCP/AWS)', level: 'Intermediate' },
      ],
      languages: ['English (Native)', 'French (Conversational)'],
      certifications: ['AWS Certified Solutions Architect – Associate', 'Scrum Alliance Certified Developer'],
      suggestedTemplate: 'yale',
      templateConfidence: 'High',
      matchReason: 'Technical architecture, engineering stack tags, and GitHub portfolio matched the Yale Tech Compact layout.',
      layoutCharacteristics: {
        columns: 1,
        hasSidebar: false,
        headerStyle: 'left',
        layoutType: 'tech-grid',
      },
    },
  },
  {
    id: 'product-marketing',
    name: 'Charlotte Davies',
    jobTitle: 'Head of Product Marketing',
    location: 'Manchester, United Kingdom',
    badge: 'Marketing & Growth',
    icon: Megaphone,
    payload: {
      source: 'linkedin-text',
      firstName: 'Charlotte',
      lastName: 'Davies',
      jobTitle: 'Head of Product Marketing',
      email: 'c.davies@growthmedia.co.uk',
      phone: '+44 7911 123456',
      city: 'Manchester, United Kingdom',
      linkedin: 'linkedin.com/in/charlotte-davies-pmm',
      website: 'charlottedavies.me',
      summary:
        'Strategic Product Marketing Leader with 8+ years driving commercial go-to-market motions for high-growth B2B SaaS platforms. Directed cross-functional product launches generating £3.4M in annual recurring revenue across European and North American markets.',
      experiences: [
        {
          jobTitle: 'Head of Product Marketing',
          employer: 'ScalePulse Software',
          city: 'Manchester, UK',
          startDate: 'Jan 2022',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            'Formulated end-to-end positioning, competitive intelligence, and GTM strategy for 4 flagship product tier expansions.',
            'Partnered with Enterprise Sales to produce sales enablement assets, lifting closed-won win rates by 28% year-over-year.',
            'Authored customer research case studies and webinars that generated 1,400+ qualified enterprise inbound leads.',
          ],
        },
        {
          jobTitle: 'Senior Growth & Product Marketer',
          employer: 'OmniFlow Digital',
          city: 'Leeds, UK',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          isCurrent: false,
          bullets: [
            'Owned user onboarding funnel optimization, boosting free-to-paid trial conversion by 34%.',
            'Managed an annual multi-channel digital acquisition budget of £450k with positive unit economics.',
          ],
        },
      ],
      educations: [
        {
          degree: 'BA (Hons) Marketing & Communications',
          school: 'University of Leeds',
          city: 'Leeds, UK',
          startDate: '2014',
          endDate: '2017',
          grade: 'Upper Second Class (2:1)',
          description: 'Focus on digital consumer psychology, brand architecture, and campaign analytics.',
        },
      ],
      skills: [
        { name: 'Product Positioning', level: 'Expert' },
        { name: 'Go-To-Market (GTM) Strategy', level: 'Expert' },
        { name: 'Customer Research & ICP', level: 'Advanced' },
        { name: 'Sales Enablement', level: 'Advanced' },
        { name: 'HubSpot / CRM', level: 'Advanced' },
        { name: 'Data & Funnel Analytics', level: 'Advanced' },
      ],
      languages: ['English (Native)', 'Spanish (Professional)'],
      certifications: ['Pragmatic Institute Certified (PMC-III)', 'Product Marketing Alliance Core Certified'],
      suggestedTemplate: 'toronto',
      templateConfidence: 'High',
      matchReason: 'Modern dual-column marketing hierarchy with visual sidebar credentials matched Toronto Modern Sidebar template.',
      layoutCharacteristics: {
        columns: 2,
        hasSidebar: true,
        headerStyle: 'left',
        layoutType: 'modern-sidebar',
      },
    },
  },
  {
    id: 'healthcare-lead',
    name: 'Dr. James Wilson',
    jobTitle: 'Clinical Operations Lead',
    location: 'Edinburgh, United Kingdom',
    badge: 'NHS & Healthcare',
    icon: Stethoscope,
    payload: {
      source: 'linkedin-text',
      firstName: 'Dr. James',
      lastName: 'Wilson',
      jobTitle: 'Clinical Operations Lead',
      email: 'j.wilson.nhs@medhealth.org.uk',
      phone: '+44 7822 555678',
      city: 'Edinburgh, United Kingdom',
      linkedin: 'linkedin.com/in/james-wilson-healthcare',
      website: '',
      summary:
        'Dedicated Clinical Operations and Healthcare Project Manager with 9+ years managing multidisciplinary acute care teams, NHS digital transformation programs, and regulatory clinical governance standards.',
      experiences: [
        {
          jobTitle: 'Clinical Operations Manager',
          employer: 'NHS Lothian Health Board',
          city: 'Edinburgh, UK',
          startDate: 'Aug 2020',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            'Directed patient journey optimization initiatives across 3 regional facilities, decreasing acute admission wait times by 22%.',
            'Implemented an electronic triage scheduling system covering 45 healthcare professionals and 60,000+ annual patient visits.',
            'Ensured 100% compliance with Healthcare Improvement Scotland (HIS) and CQC regulatory standards during annual clinical audits.',
          ],
        },
        {
          jobTitle: 'Deputy Ward Lead & Project Coordinator',
          employer: 'Royal Infirmary of Edinburgh',
          city: 'Edinburgh, UK',
          startDate: 'Sep 2016',
          endDate: 'Jul 2020',
          isCurrent: false,
          bullets: [
            'Supervised clinical staffing schedules, acute equipment procurement, and standard operating procedures (SOPs).',
            'Chaired monthly infection prevention and quality safety review committees.',
          ],
        },
      ],
      educations: [
        {
          degree: 'MSc Healthcare Management & Leadership',
          school: 'University of Edinburgh',
          city: 'Edinburgh, UK',
          startDate: '2017',
          endDate: '2019',
          grade: 'Distinction',
          description: 'Dissertation on digital workforce scheduling and patient flow optimization.',
        },
        {
          degree: 'BSc (Hons) Nursing Studies',
          school: 'Queen Margaret University',
          city: 'Edinburgh, UK',
          startDate: '2012',
          endDate: '2016',
          grade: 'First Class (1st)',
        },
      ],
      skills: [
        { name: 'Clinical Governance & Audits', level: 'Expert' },
        { name: 'Healthcare Project Management', level: 'Expert' },
        { name: 'Patient Pathway Optimization', level: 'Advanced' },
        { name: 'PRINCE2 Practitioner', level: 'Advanced' },
        { name: 'Multi-Disciplinary Leadership', level: 'Advanced' },
      ],
      languages: ['English (Native)'],
      certifications: ['PRINCE2 Practitioner in Project Management', 'NMC Registered Specialist'],
      suggestedTemplate: 'hopkins',
      templateConfidence: 'High',
      matchReason: 'Executive healthcare operations profile and governance leadership matched Hopkins Executive layout.',
      layoutCharacteristics: {
        columns: 1,
        hasSidebar: false,
        headerStyle: 'banner',
        layoutType: 'executive-header',
      },
    },
  },
];

interface SampleCvPresetsProps {
  onSelectPreset: (preset: SamplePresetItem) => void;
  disabled?: boolean;
}

export default function SampleCvPresets({
  onSelectPreset,
  disabled = false,
}: SampleCvPresetsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4B4DED]" />
          <span className="text-xs font-semibold text-[#0F1B4D] uppercase tracking-wider">
            Quick test with sample CVs
          </span>
        </div>
        <span className="text-[11px] text-slate-500">Instant 1-click test</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_CV_PRESETS.map((preset) => {
          const IconComponent = preset.icon;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPreset(preset)}
              className="group text-left p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#4B4DED] hover:shadow-[0_4px_16px_rgba(75,77,237,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-[#4B4DED]">
                    {preset.badge}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#4B4DED] text-slate-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-sm font-bold text-[#0F1B4D] group-hover:text-[#4B4DED] transition-colors truncate">
                  {preset.name}
                </p>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                  {preset.jobTitle}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {preset.location}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-[#4B4DED]">
                <span>Load sample profile</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
