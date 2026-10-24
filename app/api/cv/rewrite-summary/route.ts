import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, SUMMARY_REWRITE_MODEL } from '@/lib/gemini';

interface RewriteExperienceContext {
  jobTitle?: string;
  employer?: string;
  description?: string;
}

interface RewriteEducationContext {
  degree?: string;
  school?: string;
}

interface RewriteSummaryPayload {
  summary?: string;
  jobTitle?: string;
  experiences?: RewriteExperienceContext[];
  educations?: RewriteEducationContext[];
  skills?: string[];
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RewriteSummaryPayload;

    const currentSummary = (body.summary ?? '').trim();
    const jobTitle = (body.jobTitle ?? '').trim();
    const experiences = Array.isArray(body.experiences) ? body.experiences.slice(0, 4) : [];
    const educations = Array.isArray(body.educations) ? body.educations.slice(0, 3) : [];
    const skills = Array.isArray(body.skills)
      ? body.skills.map((s) => String(s).trim()).filter(Boolean).slice(0, 12)
      : [];
    const language = (body.language ?? 'English (UK)').trim();

    const hasProfileContext = Boolean(
      jobTitle ||
        skills.length > 0 ||
        experiences.some((e) => e.jobTitle?.trim() || e.employer?.trim() || e.description?.trim()) ||
        educations.some((e) => e.degree?.trim() || e.school?.trim())
    );

    if (!currentSummary && !hasProfileContext) {
      return NextResponse.json(
        {
          error:
            'Enter a rough draft in the summary box or add your job title/experience first so AI Rewrite can polish it.',
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const languageRule = language.toLowerCase().includes('français')
      ? 'Write the output in professional French suitable for a modern CV.'
      : language.toLowerCase().includes('us')
      ? 'Write in crisp American English spelling and professional resume tone.'
      : 'Write in crisp British English spelling (e.g., optimising, organisation, specialisms) suitable for a UK/international CV.';

    const systemInstruction = [
      'You are an executive CV writer and senior recruiter.',
      'Your task is to rewrite and polish a candidate’s professional summary for high impact, clarity, and ATS readability.',
      languageRule,
      'Rules:',
      '- Keep the summary concise: 3 to 4 impactful sentences (roughly 45 to 80 words).',
      '- Use confident, active, implied first-person CV phrasing (avoid "I", "my", or "me" in English).',
      '- Preserve all factual details, domain expertise, and metrics present in the user’s draft. Never invent fake employers, degrees, or fabricated percentages.',
      '- Output ONLY the polished summary paragraph text. Do not include headings, bullet points, quotation marks, markdown formatting, or commentary.',
    ].join('\n');

    const contextLines: string[] = [];
    if (jobTitle) {
      contextLines.push(`Target / Current Role: ${jobTitle}`);
    }
    if (experiences.length > 0) {
      const expText = experiences
        .map((e) =>
          [e.jobTitle?.trim(), e.employer?.trim(), e.description?.trim()]
            .filter(Boolean)
            .join(' — ')
        )
        .filter(Boolean)
        .join(' | ');
      if (expText) {
        contextLines.push(`Recent Experience: ${expText}`);
      }
    }
    if (educations.length > 0) {
      const eduText = educations
        .map((ed) => [ed.degree?.trim(), ed.school?.trim()].filter(Boolean).join(' at '))
        .filter(Boolean)
        .join(' | ');
      if (eduText) {
        contextLines.push(`Education: ${eduText}`);
      }
    }
    if (skills.length > 0) {
      contextLines.push(`Core Skills: ${skills.join(', ')}`);
    }

    const userPrompt = currentSummary
      ? [
          'Polish and rewrite the following CV professional summary for stronger executive impact, clarity, and flow:',
          `"""\n${currentSummary}\n"""`,
          contextLines.length > 0
            ? `\nSupporting CV context (use only to sharpen relevance without inventing facts):\n${contextLines.join('\n')}`
            : '',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          'Draft a compelling, recruiter-ready CV professional summary (3–4 sentences) strictly grounded in the candidate’s profile below:',
          contextLines.join('\n'),
        ].join('\n\n');

    const response = await ai.models.generateContent({
      model: SUMMARY_REWRITE_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const rawText = response.text?.trim() ?? '';
    const cleanedSummary = rawText
      .replace(/^["'“”]+|["'“”]+$/g, '')
      .replace(/^#+\s*.*$/gm, '')
      .trim();

    if (!cleanedSummary) {
      return NextResponse.json(
        { error: 'Could not generate a polished summary. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ summary: cleanedSummary });
  } catch (err: unknown) {
    console.error('AI summary rewrite error:', err);
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Unable to rewrite summary right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
