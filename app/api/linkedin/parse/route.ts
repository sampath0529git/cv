import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@google/genai';
import mammoth from 'mammoth';
import { CV_PARSE_MODEL, getGeminiClient } from '@/lib/gemini';
import { LinkedInImportPayload } from '@/lib/linkedinImport';

interface ParseLinkedInBody {
  pdfBase64?: string;
  fileBase64?: string;
  fileType?: string;
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
    suggestedTemplate: {
      type: Type.STRING,
      description:
        'Matched template ID based on document layout: "toronto" (2-column sidebar layout), "hopkins" (executive header band with corporate hierarchy), "classic-corporate" (formal City of London single-column), "minimal-clean" (Swiss typographic layout with date column), "yale" (technical engineering dense stack), "graduate-starter" (education-first graduate CV), "uk-traditional" (traditional academic/civil service serif)',
    },
    templateConfidence: {
      type: Type.STRING,
      description: '"High" or "Medium"',
    },
    matchReason: {
      type: Type.STRING,
      description: 'One concise sentence explaining why this template best matches the uploaded CV layout',
    },
    layoutCharacteristics: {
      type: Type.OBJECT,
      properties: {
        columns: { type: Type.INTEGER, description: '1 or 2 columns' },
        hasSidebar: { type: Type.BOOLEAN, description: 'True if a distinct sidebar exists' },
        headerStyle: { type: Type.STRING, description: 'e.g. banner, centered, left' },
        layoutType: { type: Type.STRING, description: 'e.g. modern-sidebar, executive-header, classic-single-column' },
      },
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
    const rawFile = (body.fileBase64 || body.pdfBase64 || '').trim();
    const profileText = (body.profileText || '').trim();
    const oauthProfile = body.oauthProfile || undefined;
    const language = (body.language || 'English (UK)').trim();
    const fileName = (body.fileName || '').toLowerCase();
    const fileType = (body.fileType || '').toLowerCase();

    if (!rawFile && !profileText) {
      return NextResponse.json(
        {
          error:
            'Upload your CV (PDF, Word .docx, or text) to scan and extract your details into the builder.',
        },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    const parts: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];

    let extractedDocxText = '';

    if (rawFile) {
      const { mimeType, base64 } = stripDataUrlPrefix(rawFile);
      const isDocx =
        fileName.endsWith('.docx') ||
        fileName.endsWith('.doc') ||
        mimeType.includes('wordprocessingml') ||
        mimeType.includes('officedocument') ||
        fileType.includes('word') ||
        fileType === 'docx';

      if (isDocx) {
        try {
          const docxBuffer = Buffer.from(base64, 'base64');
          const mammothResult = await mammoth.extractRawText({ buffer: docxBuffer });
          extractedDocxText = (mammothResult.value || '').trim();
        } catch (docxErr) {
          console.warn('Mammoth docx extraction warning, fallback to text/buffer:', docxErr);
        }
      }

      if (extractedDocxText) {
        parts.push({
          text: `[Uploaded Word Document Content from "${body.fileName || 'CV.docx'}"]:\n"""\n${extractedDocxText.slice(0, 35000)}\n"""`,
        });
      } else {
        // PDF or multimodal document
        if (base64.length > 11_500_000) {
          return NextResponse.json(
            { error: 'The uploaded file exceeds the 8MB size limit.' },
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
      'You are an executive CV parser, layout analyzer, and ATS optimization system.',
      'Your task is twofold:',
      '1. EXTRACT and structure all candidate information (contact, summary, work history, education, skills, certifications, languages, projects, awards).',
      '2. ANALYZE THE VISUAL LAYOUT & STRUCTURE of the uploaded CV to match the closest builder template:',
      '   - "toronto": Matched if the CV has a distinct 2-column layout or sidebar (contact info, skills, education on one side and main timeline on the other).',
      '   - "hopkins": Matched if the CV features an executive top header band, bold corporate hierarchy, or prominent executive profile.',
      '   - "classic-corporate": Matched if the CV is a traditional City of London / corporate single-column format with formal horizontal divider rules.',
      '   - "minimal-clean": Matched if the CV has minimalist Swiss typography, generous whitespace, or clean date-column alignments.',
      '   - "yale": Matched if the CV is dense with technical stacks, engineering projects, programming tools, or GitHub repositories.',
      '   - "graduate-starter": Matched if education is placed first at the top, highlighting university degrees, modules, or early-career projects.',
      '   - "uk-traditional": Matched if the CV uses traditional serif typography, formal academic/civil service structure.',
      language.toLowerCase().includes('us')
        ? 'Use clean American English spelling.'
        : 'Use clean British English spelling (e.g. optimised, organised).',
      'Strict accuracy rules:',
      '- Extract ONLY factual roles, employers, dates, qualifications, and skills present in the input.',
      '- Convert narrative role descriptions into clean, results-oriented bullet points.',
      '- Ensure suggestedTemplate is one of: "hopkins", "toronto", "classic-corporate", "minimal-clean", "yale", "graduate-starter", "uk-traditional".',
      oauthContext,
      profileText ? `\nPasted CV / Profile Content:\n"""\n${profileText}\n"""` : '',
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
        { error: 'Could not extract structured data from the provided document.' },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(rawJsonText) as Partial<LinkedInImportPayload>;

    const sourceType: LinkedInImportPayload['source'] = oauthProfile?.oauthConnected
      ? 'linkedin-hybrid'
      : rawFile
      ? 'cv-upload'
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
      // Layout matching properties
      suggestedTemplate: parsed.suggestedTemplate || 'hopkins',
      templateConfidence: parsed.templateConfidence || 'High',
      matchReason:
        parsed.matchReason ||
        'Layout geometry and section hierarchy matched to our executive templates.',
      layoutCharacteristics: parsed.layoutCharacteristics || {
        columns: 1,
        hasSidebar: false,
        headerStyle: 'standard',
        layoutType: 'corporate-single-column',
      },
    };

    return NextResponse.json({ payload: mergedPayload });
  } catch (err: unknown) {
    console.error('CV / LinkedIn parse error:', err);
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Unable to parse document right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
