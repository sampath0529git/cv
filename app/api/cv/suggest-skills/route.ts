import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@google/genai';
import { getGeminiClient } from '@/lib/gemini';

const SKILLS_SUGGEST_MODEL = 'gemini-3.8-flash';

interface SuggestSkillsPayload {
  jobTitle?: string;
  currentSkills?: string[];
  experiences?: Array<{
    jobTitle?: string;
    employer?: string;
    description?: string;
    bullets?: string[];
  }>;
  language?: string;
}

const SKILLS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    recommendedSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: {
            type: Type.STRING,
            description: 'One of: Hard Skills & Tech, Core Domain Competencies, Leadership & Strategy',
          },
          reason: {
            type: Type.STRING,
            description: 'Brief 3-6 word note on why recruiters seek this (e.g., High-frequency ATS keyword)',
          },
        },
        required: ['name', 'category'],
      },
      description: '10 to 16 targeted skills that elevate the candidate CV for modern ATS filters',
    },
    actionVerbs: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '6-8 high-impact action verbs tailored to the candidate seniority level',
    },
    atsKeywordTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '2-3 actionable tips to increase interview callback odds for this profession',
    },
  },
  required: ['recommendedSkills', 'actionVerbs', 'atsKeywordTips'],
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SuggestSkillsPayload;
    const jobTitle = (body.jobTitle ?? '').trim();
    const currentSkills = Array.isArray(body.currentSkills) ? body.currentSkills : [];
    const experiences = Array.isArray(body.experiences) ? body.experiences : [];
    const language = (body.language ?? 'English (UK)').trim();

    if (!jobTitle && experiences.length === 0 && currentSkills.length === 0) {
      return NextResponse.json(
        {
          error: 'Please provide a job title or at least one past role to generate tailored skills.',
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const expSummary = experiences
      .slice(0, 4)
      .map((e) => `${e.jobTitle || 'Role'} at ${e.employer || 'Company'}`)
      .join('; ');

    const systemInstruction = [
      'You are a senior recruitment consultant and ATS optimization specialist in the UK & European executive job market.',
      'Your task is to analyze the candidate career trajectory and recommend high-demand, high-impact skills and keywords that give them maximum advantage in recruiter searches and automated ATS screening.',
      'Guidelines:',
      '- Prioritize skills that are genuine industry standards for this exact job title.',
      '- Do not suggest skills that already exist in the candidate existing skills list.',
      '- Group suggestions into: "Hard Skills & Tech", "Core Domain Competencies", and "Leadership & Strategy".',
      '- Return clean, concise names (e.g. "Financial Modeling", "PostgreSQL", "Stakeholder Management", "Cross-Functional Leadership").',
      language.toLowerCase().includes('us')
        ? 'Use clean US English conventions.'
        : 'Use British English spelling (e.g., Optimisation, Programme Management).',
    ].join('\n');

    const prompt = [
      `Target / Current Job Title: ${jobTitle || 'Professional Candidate'}`,
      currentSkills.length > 0 ? `Already on CV: ${currentSkills.join(', ')}` : '',
      expSummary ? `Recent Work Experience: ${expSummary}` : '',
      'Recommend 10 to 16 distinct, high-impact skills that would significantly enhance this CV.',
    ]
      .filter(Boolean)
      .join('\n');

    const response = await ai.models.generateContent({
      model: SKILLS_SUGGEST_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: SKILLS_SCHEMA,
        temperature: 0.3,
      },
    });

    const rawText = (response.text || '').trim();
    if (!rawText) {
      return NextResponse.json(
        { error: 'Could not generate skills suggestions at this time.' },
        { status: 502 }
      );
    }

    const data = JSON.parse(rawText);
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Error in /api/cv/suggest-skills:', err);
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Failed to suggest skills. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
