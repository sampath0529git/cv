import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@google/genai';
import { CV_PARSE_MODEL, getGeminiClient } from '@/lib/gemini';
import { LinkedInImportPayload } from '@/lib/linkedinImport';

interface ParseLinkedInBody {
  pdfBase64?: string;
  fileName?: string;
  profileText?: string;
  oauthProfile?: Partial<LinkedInImportPayload>;
  language?: string;
}

const LINKEDIN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    firstName: { type: Type.STRING, description: 'Candidate first / given name' },
    lastName: { type: Type.STRING, description: 'Candidate last / family name' },
    jobTitle: {
      type: Type.STRING,
      description: 'Current headline or target professional role',
    },
    email: { type: Type.STRING, description: 'Email address if present' },
    phone: { type: Type.STRING, description: 'Phone number if present' },
    city: {
      type: Type.STRING,
      description: 'City, town, or region (e.g., London, United Kingdom)',
    },
    postalCode: { type: Type.STRING, description: 'Postal / ZIP code if present' },
    linkedin: {
      type: Type.STRING,
      description: 'Clean LinkedIn profile URL (e.g., linkedin.com/in/username)',
    },
    website: {
      type: Type.STRING,
      description: 'Personal portfolio, GitHub, or website URL if present',
    },
    summary: {
      type: Type.STRING,
      description:
        'Polished 3-4 sentence professional CV summary grounded strictly in the candidate About/Summary and career history',
    },
    experiences: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          employer: { type: Type.STRING },
          city: { type: Type.STRING },
          startDate: { type: Type.STRING, description: 'e.g., Jan 2022 or 2022' },
          endDate: {
            type: Type.STRING,
            description: 'e.g., Mar 2024 or Present if current',
          },
          isCurrent: { type: Type.BOOLEAN },
          bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              'Concise, impact-oriented bullet points extracted from the role description',
          },
        },
        required: ['jobTitle', 'employer'],
      },
    },
    educations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: {
            type: Type.STRING,
            description: 'Degree and field of study (e.g., BSc Computer Science)',
          },
          school: { type: Type.STRING, description: 'University or institution name' },
          city: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          grade: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['degree', 'school'],
      },
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: {
            type: Type.STRING,
            description: 'One of Beginner, Intermediate, Advanced, Expert',
          },
        },
        required: ['name'],
      },
    },
    languages: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: 'Language with proficiency if stated, e.g., English (Native)',
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: 'Certification name and issuing body',
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          role: { type: Type.STRING },
          link: { type: Type.STRING },
          description: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title'],
      },
    },
    awards: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
};

function stripDataUrlPrefix(input: string): { mimeType: string; base64: string } {
  const trimmed = input.trim();
  const base64Marker = ';base64,';
  if (trimmed.startsWith('data:')) {
    const markerIdx = trimmed.indexOf(base64Marker);
    if (markerIdx > 5) {
      return {
        mimeType: trimmed.slice(5, markerIdx).trim() || 'application/pdf',
        base64: trimmed.slice(markerIdx + base64Marker.length).trim(),
      };
    }
  }
  return {
    mimeType: 'application/pdf',
    base64: trimmed,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ParseLinkedInBody;
    const rawPdf = (body.pdfBase64 || '').trim();
    const profileText = (body.profileText || '').trim();
    const oauthProfile = body.oauthProfile || undefined;
    const language = (body.language || 'English (UK)').trim();

    if (!rawPdf && !profileText) {
      return NextResponse.json(
        {
          error:
            'Upload your LinkedIn profile PDF ("Save to PDF") or paste your LinkedIn profile text to parse.',
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const parts: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];

    if (rawPdf) {
      const { mimeType, base64 } = stripDataUrlPrefix(rawPdf);
      if (base64.length > 11_500_000) {
        return NextResponse.json(
          { error: 'The uploaded PDF exceeds the 8MB size limit.' },
          { status: 400 }
        );
      }
      parts.push({
        inlineData: {
          mimeType: mimeType || 'application/pdf',
          data: base64,
        },
      });
    }

    const oauthContext =
      oauthProfile &&
      (oauthProfile.firstName || oauthProfile.lastName || oauthProfile.email)
        ? `\nAuthenticated LinkedIn account context:\nName: ${[
            oauthProfile.firstName,
            oauthProfile.lastName,
          ]
            .filter(Boolean)
            .join(' ')}\nEmail: ${oauthProfile.email || ''}\nHeadline: ${
            oauthProfile.jobTitle || ''
          }\nLinkedIn URL: ${oauthProfile.linkedin || ''}`
        : '';

    const instructionText = [
      'Extract and structure the candidate’s LinkedIn profile / CV data into clean JSON matching the response schema.',
      language.toLowerCase().includes('us')
        ? 'Use clean American English spelling where polishing bullet phrasing.'
        : 'Use clean British English spelling where polishing bullet phrasing.',
      'Strict accuracy rules:',
      '- Extract ONLY factual roles, employers, dates, qualifications, skills, certifications, languages, projects, and awards present in the input.',
      '- Never invent employers, degrees, dates, or fabricated metrics.',
      '- Convert LinkedIn role paragraphs into crisp, scannable CV bullet points while preserving all factual substance.',
      '- Clean LinkedIn URLs to the form "linkedin.com/in/handle" without noisy tracking query parameters.',
      '- Order experiences and educations in reverse-chronological order (most recent first).',
      oauthContext,
      profileText ? `\nPasted LinkedIn Profile Content:\n"""\n${profileText}\n"""` : '',
    ]
      .filter(Boolean)
      .join('\n');

    parts.push({ text: instructionText });

    const response = await ai.models.generateContent({
      model: CV_PARSE_MODEL,
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: LINKEDIN_SCHEMA,
        temperature: 0.2,
      },
    });

    const rawJsonText = (response.text || '').trim();
    if (!rawJsonText) {
      return NextResponse.json(
        { error: 'Could not extract structured data from the provided LinkedIn profile.' },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(rawJsonText) as Partial<LinkedInImportPayload>;

    const sourceType: LinkedInImportPayload['source'] = oauthProfile?.oauthConnected
      ? 'linkedin-hybrid'
      : rawPdf
      ? 'linkedin-pdf'
      : 'linkedin-text';

    const mergedPayload: LinkedInImportPayload = {
      source: sourceType,
      oauthConnected: Boolean(oauthProfile?.oauthConnected),
      limitedScopeNotice: false,
      firstName: (parsed.firstName || oauthProfile?.firstName || '').trim(),
      lastName: (parsed.lastName || oauthProfile?.lastName || '').trim(),
      jobTitle: (parsed.jobTitle || oauthProfile?.jobTitle || '').trim(),
      email: (parsed.email || oauthProfile?.email || '').trim(),
      phone: (parsed.phone || oauthProfile?.phone || '').trim(),
      city: (parsed.city || oauthProfile?.city || '').trim(),
      postalCode: (parsed.postalCode || '').trim(),
      linkedin: (parsed.linkedin || oauthProfile?.linkedin || '').trim(),
      website: (parsed.website || '').trim(),
      photoUrl: (oauthProfile?.photoUrl || '').trim(),
      summary: (parsed.summary || oauthProfile?.summary || '').trim(),
      experiences:
        parsed.experiences && parsed.experiences.length > 0
          ? parsed.experiences
          : oauthProfile?.experiences || [],
      educations:
        parsed.educations && parsed.educations.length > 0
          ? parsed.educations
          : oauthProfile?.educations || [],
      skills:
        parsed.skills && parsed.skills.length > 0
          ? parsed.skills
          : oauthProfile?.skills || [],
      languages: parsed.languages || [],
      certifications: parsed.certifications || [],
      projects: parsed.projects || [],
      awards: parsed.awards || [],
      interests: parsed.interests || [],
    };

    return NextResponse.json({ payload: mergedPayload });
  } catch (err: unknown) {
    console.error('LinkedIn profile parse error:', err);
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Unable to parse LinkedIn profile right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
