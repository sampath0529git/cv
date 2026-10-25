import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, BULLET_GENERATE_MODEL } from '@/lib/gemini';

interface GenerateBulletPayload {
  jobTitle?: string;
  employer?: string;
  currentDescription?: string;
  skills?: string[];
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateBulletPayload;
    const jobTitle = (body.jobTitle ?? '').trim();
    const employer = (body.employer ?? '').trim();
    const currentDescription = (body.currentDescription ?? '').trim();
    const skills = Array.isArray(body.skills) ? body.skills.slice(0, 8) : [];
    const language = (body.language ?? 'English (UK)').trim();

    if (!jobTitle) {
      return NextResponse.json(
        {
          error: 'Please enter a job title first so AI can suggest tailored achievement bullet points.',
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const languageRule = language.toLowerCase().includes('français')
      ? 'Write the bullet point in professional French suitable for a modern CV.'
      : language.toLowerCase().includes('us')
      ? 'Write in crisp American English spelling.'
      : 'Write in crisp British English spelling (e.g. optimised, delivered, £ for currency).';

    const systemInstruction = [
      'You are an executive CV writer and senior hiring manager.',
      'Your task is to generate ONE single high-impact, results-driven work achievement statement (bullet point) based on the candidate\'s job title.',
      languageRule,
      'Key guidelines:',
      '- Begin with a strong past-tense action verb (e.g., Spearheaded, Orchestrated, Engineered, Automated, Championed, Accelerated, Reduced, Delivered).',
      '- Include a concrete, realistic metric or commercial achievement indicator (e.g., percentage improvement, turnaround reduction, revenue impact, or team/scale indicator) typical for this profession.',
      '- Keep it between 15 and 28 words.',
      '- Ensure it is distinct and does not simply repeat existing bullets provided in context.',
      '- Format: Start with "• " followed by the achievement statement.',
      '- Return ONLY the single bullet point line. Do not include commentary, multiple options, conversational remarks, or quotation marks.',
    ].join('\n');

    let prompt = `Job Title: ${jobTitle}\n`;
    if (employer) {
      prompt += `Company / Employer: ${employer}\n`;
    }
    if (skills.length > 0) {
      prompt += `Candidate Skills: ${skills.join(', ')}\n`;
    }
    if (currentDescription) {
      prompt += `Current achievements already on CV:\n${currentDescription.slice(0, 600)}\n\nGenerate ONE new, complementary achievement bullet point that highlights a different dimension (e.g. innovation, efficiency, leadership, or stakeholder collaboration).`;
    } else {
      prompt += `Generate ONE high-impact achievement bullet point demonstrating proven value and quantifiable success in this role.`;
    }

    const response = await ai.models.generateContent({
      model: BULLET_GENERATE_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 120,
      },
    });

    let bullet = (response.text ?? '').trim();
    // Normalize bullet point prefix: ensure it starts with '• '
    bullet = bullet.replace(/^[•\-*]\s*/, '').trim();
    if (!bullet) {
      throw new Error('AI did not produce a bullet point.');
    }
    bullet = `• ${bullet}`;

    return NextResponse.json({
      bullet,
      success: true,
    });
  } catch (error: unknown) {
    console.error('Bullet generation error:', error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Failed to generate achievement bullet point. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
