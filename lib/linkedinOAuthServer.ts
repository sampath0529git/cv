import crypto from 'crypto';
import {
  LinkedInImportPayload,
  LinkedInParsedEducation,
  LinkedInParsedExperience,
  LinkedInParsedSkill,
} from '@/lib/linkedinImport';

export const LINKEDIN_STATE_COOKIE = 'linkedin_oauth_state';
const STATE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function getLinkedInCredentials(): {
  clientId: string;
  clientSecret: string;
  scopes: string;
  configured: boolean;
} {
  const clientId = (process.env.LINKEDIN_CLIENT_ID || '').trim();
  const clientSecret = (process.env.LINKEDIN_CLIENT_SECRET || '').trim();
  const scopes =
    (process.env.LINKEDIN_SCOPES || 'openid profile email').trim() ||
    'openid profile email';

  return {
    clientId,
    clientSecret,
    scopes,
    configured: Boolean(clientId && clientSecret),
  };
}

export function resolveOAuthRedirectUri(
  originParam?: string | null,
  requestOrigin?: string
): string {
  let resolvedOrigin = '';

  if (originParam) {
    try {
      const parsed = new URL(originParam);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        resolvedOrigin = parsed.origin;
      }
    } catch {
      resolvedOrigin = '';
    }
  }

  if (!resolvedOrigin && process.env.APP_URL) {
    try {
      resolvedOrigin = new URL(process.env.APP_URL.trim()).origin;
    } catch {
      resolvedOrigin = process.env.APP_URL.trim().replace(/\/+$/, '');
    }
  }

  if (!resolvedOrigin && requestOrigin) {
    resolvedOrigin = requestOrigin.replace(/\/+$/, '');
  }

  return `${resolvedOrigin.replace(/\/+$/, '')}/api/auth/linkedin/callback`;
}

interface StatePayload {
  n: string;
  r: string;
  exp: number;
}

export function createSignedOAuthState(
  redirectUri: string,
  secret: string
): { state: string; nonce: string } {
  const nonce = crypto.randomBytes(16).toString('hex');
  const payloadObj: StatePayload = {
    n: nonce,
    r: redirectUri,
    exp: Date.now() + STATE_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payloadObj), 'utf8').toString(
    'base64url'
  );
  const sig = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return {
    state: `${payloadB64}.${sig}`,
    nonce,
  };
}

export function verifySignedOAuthState(
  stateParam: string | null,
  secret: string,
  cookieNonce?: string
): { valid: boolean; redirectUri?: string; error?: string } {
  if (!stateParam || !stateParam.includes('.')) {
    return { valid: false, error: 'Invalid or missing OAuth state parameter.' };
  }

  const [payloadB64, providedSig] = stateParam.split('.');
  if (!payloadB64 || !providedSig) {
    return { valid: false, error: 'Malformed OAuth state parameter.' };
  }

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBufA = Buffer.from(providedSig);
  const sigBufB = Buffer.from(expectedSig);
  if (
    sigBufA.length !== sigBufB.length ||
    !crypto.timingSafeEqual(sigBufA, sigBufB)
  ) {
    return { valid: false, error: 'OAuth state signature verification failed.' };
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    ) as StatePayload;

    if (!decoded.exp || Date.now() > decoded.exp) {
      return {
        valid: false,
        error: 'LinkedIn sign-in session expired. Please try again.',
      };
    }

    if (cookieNonce && cookieNonce !== decoded.n) {
      return { valid: false, error: 'OAuth CSRF state mismatch.' };
    }

    return {
      valid: true,
      redirectUri: decoded.r,
    };
  } catch {
    return { valid: false, error: 'Unable to parse OAuth state payload.' };
  }
}

async function fetchPhotoAsDataUrl(pictureUrl?: string): Promise<string | undefined> {
  if (!pictureUrl || !/^https?:\/\//i.test(pictureUrl)) {
    return undefined;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(pictureUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'image/*',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) return undefined;

    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength === 0 || arrayBuffer.byteLength > 1_500_000) {
      return undefined;
    }

    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return `data:${contentType.split(';')[0]};base64,${base64}`;
  } catch {
    return undefined;
  }
}

function formatLinkedInDateObj(dateObj?: {
  month?: number;
  year?: number;
}): string {
  if (!dateObj || !dateObj.year) return '';
  if (dateObj.month && dateObj.month >= 1 && dateObj.month <= 12) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[dateObj.month - 1]} ${dateObj.year}`;
  }
  return String(dateObj.year);
}

function pickLocalizedString(field: any): string {
  if (!field) return '';
  if (typeof field === 'string') return field.trim();
  if (typeof field.localized === 'object' && field.localized !== null) {
    const values = Object.values(field.localized);
    if (values.length > 0 && typeof values[0] === 'string') {
      return values[0].trim();
    }
  }
  return '';
}

export async function exchangeCodeAndFetchLinkedInProfile(params: {
  code: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}): Promise<LinkedInImportPayload> {
  const tokenBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code: params.code,
    redirect_uri: params.redirectUri,
    client_id: params.clientId,
    client_secret: params.clientSecret,
  });

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: tokenBody.toString(),
  });

  const tokenJson = (await tokenRes.json().catch(() => ({}))) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenRes.ok || !tokenJson.access_token) {
    const reason =
      tokenJson.error_description ||
      tokenJson.error ||
      `Token exchange failed (${tokenRes.status}).`;
    throw new Error(reason);
  }

  const accessToken = tokenJson.access_token;
  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };
  const restliHeaders = {
    ...authHeaders,
    'X-Restli-Protocol-Version': '2.0.0',
  };

  // Fetch OIDC /v2/userinfo + best-effort /v2/me for headline, vanityName, summary, and positions/educations/skills
  const [userInfoRes, meRes] = await Promise.allSettled([
    fetch('https://api.linkedin.com/v2/userinfo', { headers: authHeaders }),
    fetch(
      'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,localizedHeadline,vanityName,summary,positions,educations,skills)',
      { headers: restliHeaders }
    ),
  ]);

  let firstName = '';
  let lastName = '';
  let email = '';
  let pictureUrl = '';
  let jobTitle = '';
  let vanityName = '';
  let summary = '';
  const experiences: LinkedInParsedExperience[] = [];
  const educations: LinkedInParsedEducation[] = [];
  const skills: LinkedInParsedSkill[] = [];

  if (userInfoRes.status === 'fulfilled' && userInfoRes.value.ok) {
    const info = (await userInfoRes.value.json().catch(() => ({}))) as {
      given_name?: string;
      family_name?: string;
      name?: string;
      email?: string;
      picture?: string;
    };

    firstName = (info.given_name || '').trim();
    lastName = (info.family_name || '').trim();

    if (!firstName && !lastName && info.name) {
      const parts = info.name.trim().split(/\s+/);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ');
    }

    email = (info.email || '').trim();
    pictureUrl = (info.picture || '').trim();
  }

  if (meRes.status === 'fulfilled' && meRes.value.ok) {
    const me = (await meRes.value.json().catch(() => ({}))) as Record<string, any>;
    if (!firstName && me.localizedFirstName) {
      firstName = String(me.localizedFirstName).trim();
    }
    if (!lastName && me.localizedLastName) {
      lastName = String(me.localizedLastName).trim();
    }
    if (me.localizedHeadline) {
      jobTitle = String(me.localizedHeadline).trim();
    }
    if (me.vanityName) {
      vanityName = String(me.vanityName).trim();
    }
    if (me.summary) {
      summary = pickLocalizedString(me.summary);
    }

    // Parse Partner-scoped positions if returned
    const rawPositions =
      me.positions?.elements ||
      (me.positions && typeof me.positions === 'object'
        ? Object.values(me.positions)
        : []);
    if (Array.isArray(rawPositions)) {
      for (const pos of rawPositions) {
        if (!pos || typeof pos !== 'object') continue;
        const role =
          pickLocalizedString(pos.title) || String(pos.title || '').trim();
        const company =
          pickLocalizedString(pos.companyName) ||
          String(pos.company?.name || pos.companyName || '').trim();
        if (!role && !company) continue;
        const startDate = formatLinkedInDateObj(
          pos.timePeriod?.startDate || pos.startDate
        );
        const endDate = formatLinkedInDateObj(
          pos.timePeriod?.endDate || pos.endDate
        );
        const isCurrent = !endDate && Boolean(startDate);
        const desc = pickLocalizedString(pos.description);
        experiences.push({
          jobTitle: role,
          employer: company,
          city: pickLocalizedString(pos.locationName),
          startDate,
          endDate: isCurrent ? 'Present' : endDate,
          isCurrent,
          description: desc,
        });
      }
    }

    // Parse Partner-scoped educations if returned
    const rawEducations =
      me.educations?.elements ||
      (me.educations && typeof me.educations === 'object'
        ? Object.values(me.educations)
        : []);
    if (Array.isArray(rawEducations)) {
      for (const edu of rawEducations) {
        if (!edu || typeof edu !== 'object') continue;
        const degreeName = pickLocalizedString(edu.degreeName);
        const fieldOfStudy = pickLocalizedString(edu.fieldOfStudy);
        const degree = [degreeName, fieldOfStudy].filter(Boolean).join(' in ');
        const school =
          pickLocalizedString(edu.schoolName) ||
          String(edu.schoolName || '').trim();
        if (!degree && !school) continue;
        educations.push({
          degree: degree || 'Qualification',
          school,
          startDate: formatLinkedInDateObj(
            edu.timePeriod?.startDate || edu.startDate
          ),
          endDate: formatLinkedInDateObj(edu.timePeriod?.endDate || edu.endDate),
          grade: pickLocalizedString(edu.grade),
          description: pickLocalizedString(edu.activities),
        });
      }
    }

    // Parse Partner-scoped skills if returned
    const rawSkills =
      me.skills?.elements ||
      (me.skills && typeof me.skills === 'object'
        ? Object.values(me.skills)
        : []);
    if (Array.isArray(rawSkills)) {
      for (const sk of rawSkills) {
        const name = pickLocalizedString(sk?.name);
        if (name) {
          skills.push({ name, level: 'Advanced' });
        }
      }
    }
  }

  if (!firstName && !lastName && !email) {
    throw new Error(
      'Authenticated with LinkedIn, but no profile fields were returned. Ensure "Sign In with LinkedIn using OpenID Connect" is enabled on your LinkedIn app.'
    );
  }

  const photoDataUrl = await fetchPhotoAsDataUrl(pictureUrl);
  const hasCareerDetails =
    experiences.length > 0 || educations.length > 0 || skills.length > 0;

  return {
    source: 'linkedin-oauth',
    oauthConnected: true,
    limitedScopeNotice: !hasCareerDetails,
    firstName,
    lastName,
    jobTitle,
    email,
    linkedin: vanityName ? `linkedin.com/in/${vanityName}` : '',
    photoUrl: photoDataUrl || '',
    summary,
    experiences,
    educations,
    skills,
  };
}
