import { CV, FontScale } from '@/types/cv';
import { CvState } from '@/store/useCvStore';
import { cvStoreToCv } from '@/lib/cvAdapter';

export type ShareExpiryPreset = '1h' | '24h' | '7d' | '30d';

export const SHARE_EXPIRY_OPTIONS: {
  id: ShareExpiryPreset;
  label: string;
  shortLabel: string;
  ttlSeconds: number;
}[] = [
  { id: '1h', label: '1 hour', shortLabel: '1h', ttlSeconds: 60 * 60 },
  { id: '24h', label: '24 hours', shortLabel: '24h', ttlSeconds: 24 * 60 * 60 },
  { id: '7d', label: '7 days', shortLabel: '7d', ttlSeconds: 7 * 24 * 60 * 60 },
  { id: '30d', label: '30 days', shortLabel: '30d', ttlSeconds: 30 * 24 * 60 * 60 },
];

export interface GeneratedShareLink {
  shareId: string;
  url: string;
  relativePath: string;
  issuedAt: number; // ms
  expiresAt: number; // ms
  preset: ShareExpiryPreset;
  photoStatus: 'included' | 'compressed' | 'omitted' | 'none';
}

export type DecodedShareResult =
  | {
      status: 'valid';
      shareId: string;
      issuedAt: number;
      expiresAt: number;
      cv: CV;
    }
  | {
      status: 'expired';
      shareId: string;
      issuedAt: number;
      expiresAt: number;
    }
  | {
      status: 'invalid';
      message: string;
    };

interface CompactShareEnvelopeV1 {
  v: 1;
  sid: string;
  iat: number; // unix seconds
  exp: number; // unix seconds
  cv: Partial<CV>;
}

const BASE62_ALPHABET = '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * Generates a unique, URL-friendly short share identifier using Web Crypto.
 */
export function generateUniqueShareId(length = 8): string {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  let out = '';
  for (let i = 0; i < length; i++) {
    out += BASE62_ALPHABET[bytes[i] % BASE62_ALPHABET.length];
  }
  return out;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(base64Url: string): Uint8Array {
  const normalized = base64Url
    .trim()
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const padLen = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(padLen);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function compressBytes(input: Uint8Array): Promise<{ prefix: 'z' | 'u'; data: Uint8Array }> {
  if (typeof CompressionStream !== 'undefined') {
    try {
      const cs = new CompressionStream('deflate-raw');
      const writer = cs.writable.getWriter();
      void writer.write(input as unknown as BufferSource);
      void writer.close();
      const buffer = await new Response(cs.readable).arrayBuffer();
      return { prefix: 'z', data: new Uint8Array(buffer) };
    } catch {
      // Fall back to uncompressed UTF-8 bytes
    }
  }
  return { prefix: 'u', data: input };
}

async function decompressBytes(prefix: string, input: Uint8Array): Promise<Uint8Array> {
  if (prefix === 'u') {
    return input;
  }
  if (prefix === 'z') {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Browser decompression stream unavailable.');
    }
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    void writer.write(input as unknown as BufferSource);
    void writer.close();
    const buffer = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(buffer);
  }
  throw new Error('Unrecognised share token encoding.');
}

/**
 * Downscales large base64 profile photos into a compact avatar thumbnail so the encoded URL stays portable.
 */
async function optimizePhotoForUrl(
  photoUrl?: string,
  showPhoto?: boolean
): Promise<{ url?: string; status: GeneratedShareLink['photoStatus'] }> {
  if (!photoUrl || !photoUrl.trim() || showPhoto === false) {
    return { url: undefined, status: 'none' };
  }

  const trimmed = photoUrl.trim();
  if (!trimmed.startsWith('data:image/')) {
    return { url: trimmed, status: 'included' };
  }

  if (trimmed.length <= 3600) {
    return { url: trimmed, status: 'included' };
  }

  if (typeof document === 'undefined' || typeof Image === 'undefined') {
    return { url: undefined, status: 'omitted' };
  }

  try {
    const compressedDataUrl = await new Promise<string>((resolve, reject) => {
      const img = new Image();
      const timeout = setTimeout(() => reject(new Error('Image load timeout')), 1200);
      img.onload = () => {
        clearTimeout(timeout);
        try {
          const targetSize = 84;
          const canvas = document.createElement('canvas');
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('No 2D context'));
            return;
          }
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetSize, targetSize);

          // Center-crop square thumbnail
          const minSide = Math.min(img.naturalWidth || targetSize, img.naturalHeight || targetSize);
          const sx = Math.max(0, ((img.naturalWidth || targetSize) - minSide) / 2);
          const sy = Math.max(0, ((img.naturalHeight || targetSize) - minSide) / 2);
          ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, targetSize, targetSize);

          resolve(canvas.toDataURL('image/jpeg', 0.56));
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Invalid image'));
      };
      img.src = trimmed;
    });

    if (compressedDataUrl && compressedDataUrl.length <= 9000) {
      return { url: compressedDataUrl, status: 'compressed' };
    }
    return { url: undefined, status: 'omitted' };
  } catch {
    return { url: undefined, status: 'omitted' };
  }
}

/**
 * Strips empty strings/arrays from the CV snapshot before deflate compression for shorter URLs.
 */
function stripEmptyCvFields(cv: CV): Partial<CV> {
  const personal: Record<string, string> = {};
  for (const [k, v] of Object.entries(cv.personal)) {
    if (typeof v === 'string' && v.trim()) {
      personal[k] = v.trim();
    }
  }

  const out: Partial<CV> = {
    personal: personal as unknown as CV['personal'],
    settings: cv.settings,
  };

  if (cv.personalStatement?.trim()) out.personalStatement = cv.personalStatement.trim();
  if (cv.experience?.length > 0) out.experience = cv.experience;
  if (cv.education?.length > 0) out.education = cv.education;
  if (cv.skills?.length > 0) out.skills = cv.skills;
  if (cv.skillLevels && Object.keys(cv.skillLevels).length > 0) out.skillLevels = cv.skillLevels;
  if (cv.certifications?.length > 0) out.certifications = cv.certifications;
  if (cv.projects?.length > 0) out.projects = cv.projects;
  if (cv.languages?.length > 0) out.languages = cv.languages;
  if (cv.volunteering?.length > 0) out.volunteering = cv.volunteering;
  if (cv.interests?.length > 0) out.interests = cv.interests;
  if (cv.awards && cv.awards.length > 0) out.awards = cv.awards;
  if (cv.customSections && cv.customSections.length > 0) out.customSections = cv.customSections;
  if (cv.references?.trim()) out.references = cv.references.trim();

  return out;
}

function hydrateCvDefaults(raw: Partial<CV>): CV {
  const p: Partial<CV['personal']> = raw.personal || {};
  const s: Partial<CV['settings']> = raw.settings || {};
  const validScales: FontScale[] = ['sm', 'md', 'lg'];
  const fontScale: FontScale =
    s.fontScale && validScales.includes(s.fontScale) ? s.fontScale : 'md';

  return {
    personal: {
      fullName: p.fullName || 'Curriculum Vitae',
      jobTitle: p.jobTitle || '',
      email: p.email || '',
      phone: p.phone || '',
      location: p.location || '',
      linkedin: p.linkedin || '',
      website: p.website || '',
      photoUrl: p.photoUrl || undefined,
      dateOfBirth: p.dateOfBirth || '',
      nationality: p.nationality || '',
      drivingLicence: p.drivingLicence || '',
    },
    personalStatement: raw.personalStatement || '',
    experience: Array.isArray(raw.experience) ? raw.experience : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    skillLevels: raw.skillLevels || {},
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
    projects: Array.isArray(raw.projects) ? raw.projects : [],
    languages: Array.isArray(raw.languages) ? raw.languages : [],
    volunteering: Array.isArray(raw.volunteering) ? raw.volunteering : [],
    interests: Array.isArray(raw.interests) ? raw.interests : [],
    awards: Array.isArray(raw.awards) ? raw.awards : [],
    customSections: Array.isArray(raw.customSections) ? raw.customSections : [],
    references: raw.references || '',
    settings: {
      templateId: s.templateId || 'hopkins',
      accentColor: s.accentColor || '#4B4DED',
      fontFamily: s.fontFamily || 'jakarta',
      fontScale,
      showPhoto: Boolean(s.showPhoto && p.photoUrl),
      sectionOrder:
        Array.isArray(s.sectionOrder) && s.sectionOrder.length > 0
          ? s.sectionOrder
          : ['statement', 'experience', 'education', 'skills', 'languages', 'interests'],
    },
  };
}

/**
 * Generates a unique, temporary, URL-friendly public preview link from current CvStore state.
 */
export async function generateCvShareLink(
  storeState: Partial<CvState>,
  preset: ShareExpiryPreset = '7d'
): Promise<GeneratedShareLink> {
  const cv = cvStoreToCv(storeState);
  const photoRes = await optimizePhotoForUrl(cv.personal.photoUrl, cv.settings.showPhoto);

  const preparedCv: CV = {
    ...cv,
    personal: {
      ...cv.personal,
      photoUrl: photoRes.url,
    },
    settings: {
      ...cv.settings,
      showPhoto: Boolean(cv.settings.showPhoto && photoRes.url),
    },
  };

  const option =
    SHARE_EXPIRY_OPTIONS.find((o) => o.id === preset) || SHARE_EXPIRY_OPTIONS[2];
  const shareId = generateUniqueShareId(8);
  const iatSec = Math.floor(Date.now() / 1000);
  const expSec = iatSec + option.ttlSeconds;

  const envelope: CompactShareEnvelopeV1 = {
    v: 1,
    sid: shareId,
    iat: iatSec,
    exp: expSec,
    cv: stripEmptyCvFields(preparedCv),
  };

  const jsonBytes = new TextEncoder().encode(JSON.stringify(envelope));
  const { prefix, data } = await compressBytes(jsonBytes);
  const encodedToken = `${prefix}.${bytesToBase64Url(data)}`;

  // Keep query string comfortably below HTTP server/proxy header limits (3 KB threshold);
  // gracefully use URL fragment (#d=...) for larger payloads so links never trigger HTTP 414/431.
  const relativePath =
    encodedToken.length <= 2800
      ? `/share?s=${encodeURIComponent(shareId)}&d=${encodedToken}`
      : `/share?s=${encodeURIComponent(shareId)}#d=${encodedToken}`;

  const origin =
    typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';

  return {
    shareId,
    url: `${origin}${relativePath}`,
    relativePath,
    issuedAt: iatSec * 1000,
    expiresAt: expSec * 1000,
    preset,
    photoStatus: photoRes.status,
  };
}

/**
 * Decodes and validates an encoded CV share payload token from URL query or hash.
 */
export async function decodeCvShareToken(
  rawToken: string | null | undefined
): Promise<DecodedShareResult> {
  if (!rawToken || !rawToken.trim()) {
    return {
      status: 'invalid',
      message: 'This shared CV link is incomplete or missing its preview payload.',
    };
  }

  try {
    const cleaned = decodeURIComponent(rawToken.trim());
    let prefix = 'z';
    let payloadPart = cleaned;

    if (cleaned.startsWith('z.') || cleaned.startsWith('u.')) {
      prefix = cleaned[0];
      payloadPart = cleaned.slice(2);
    }

    const compressedBytes = base64UrlToBytes(payloadPart);
    const jsonBytes = await decompressBytes(prefix, compressedBytes);
    const jsonText = new TextDecoder().decode(jsonBytes);
    const parsed = JSON.parse(jsonText) as Partial<CompactShareEnvelopeV1>;

    if (!parsed || parsed.v !== 1 || !parsed.exp || !parsed.cv) {
      return {
        status: 'invalid',
        message: 'The shared CV link format could not be verified.',
      };
    }

    const issuedAt = (parsed.iat || Math.floor(Date.now() / 1000)) * 1000;
    const expiresAt = parsed.exp * 1000;
    const shareId = parsed.sid || 'preview';

    if (Date.now() > expiresAt) {
      return {
        status: 'expired',
        shareId,
        issuedAt,
        expiresAt,
      };
    }

    return {
      status: 'valid',
      shareId,
      issuedAt,
      expiresAt,
      cv: hydrateCvDefaults(parsed.cv),
    };
  } catch {
    return {
      status: 'invalid',
      message: 'This shared CV link appears to be truncated or corrupted.',
    };
  }
}
