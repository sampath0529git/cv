import {
  GoogleGenAI,
  GenerateContentParameters,
  GenerateContentResponse,
  ThinkingLevel,
} from '@google/genai';

export const SUMMARY_REWRITE_MODEL = 'gemini-3.8-flash';
export const CV_PARSE_MODEL = 'gemini-3.8-flash';
export const BULLET_GENERATE_MODEL = 'gemini-3.8-flash';
export const SKILLS_SUGGEST_MODEL = 'gemini-3.8-flash';

/**
 * Ordered list of active free-tier models from @google/genai.
 * If the primary model experiences a temporary 503 high-demand spike or rate limit,
 * requests automatically retry and cascade to fallback serving pools.
 */
export const FALLBACK_TEXT_MODELS = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
] as const;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ParsedApiErrorDetails {
  code?: number;
  status?: string;
  message?: string;
}

function extractApiErrorDetails(err: unknown): ParsedApiErrorDetails {
  if (!err) return {};

  const anyErr = err as {
    status?: number | string;
    code?: number;
    message?: string;
    error?: { code?: number; status?: string; message?: string };
  };

  let code =
    typeof anyErr.code === 'number'
      ? anyErr.code
      : typeof anyErr.status === 'number'
      ? anyErr.status
      : anyErr.error?.code;

  let status =
    typeof anyErr.status === 'string'
      ? anyErr.status
      : anyErr.error?.status;

  let message = anyErr.error?.message || anyErr.message || '';

  // SDK errors frequently serialize JSON inside `err.message`, e.g. `{"error":{"code":503,...}}`
  if (message) {
    const jsonStart = message.indexOf('{');
    const jsonEnd = message.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      try {
        const parsed = JSON.parse(message.slice(jsonStart, jsonEnd + 1)) as {
          error?: { code?: number; status?: string; message?: string };
          code?: number;
          status?: string;
          message?: string;
        };
        const nested = parsed.error || parsed;
        if (typeof nested.code === 'number' && !code) code = nested.code;
        if (typeof nested.status === 'string' && !status) status = nested.status;
        if (typeof nested.message === 'string' && nested.message.trim()) {
          message = nested.message.trim();
        }
      } catch {
        // Keep original message if not valid JSON
      }
    }
  }

  return { code, status, message };
}

function isTransientOrModelSwitchableError(err: unknown): {
  retrySameModel: boolean;
  tryFallbackModel: boolean;
} {
  const { code, status, message } = extractApiErrorDetails(err);
  const combined = `${status || ''} ${message || ''}`.toLowerCase();

  // Invalid API key or permission errors should fail immediately without wasting retries
  if (
    code === 401 ||
    code === 403 ||
    combined.includes('api_key_invalid') ||
    combined.includes('permission_denied') ||
    combined.includes('api key not valid')
  ) {
    return { retrySameModel: false, tryFallbackModel: false };
  }

  // Model not found (404) or unsupported config on this specific model -> immediately try next fallback model
  if (code === 404 || combined.includes('not_found') || combined.includes('not found')) {
    return { retrySameModel: false, tryFallbackModel: true };
  }

  // High demand (503 UNAVAILABLE), rate limit (429), internal/gateway errors (500/502/504), or network hiccups
  if (
    code === 429 ||
    code === 500 ||
    code === 502 ||
    code === 503 ||
    code === 504 ||
    combined.includes('unavailable') ||
    combined.includes('high demand') ||
    combined.includes('overloaded') ||
    combined.includes('resource_exhausted') ||
    combined.includes('deadline_exceeded') ||
    combined.includes('internal') ||
    combined.includes('fetch failed') ||
    combined.includes('network')
  ) {
    return { retrySameModel: true, tryFallbackModel: true };
  }

  return { retrySameModel: false, tryFallbackModel: false };
}

export interface GenerateWithFallbackOptions {
  preferredModel?: string;
  contents: GenerateContentParameters['contents'];
  config?: GenerateContentParameters['config'];
  lowThinkingOnPrimary?: boolean;
}

/**
 * Executes `ai.models.generateContent` with exponential backoff and automatic fallback
 * across active Gemini models so temporary 503 demand spikes do not break user flows.
 */
export async function generateContentWithFallback({
  preferredModel = 'gemini-3.8-flash',
  contents,
  config,
  lowThinkingOnPrimary = true,
}: GenerateWithFallbackOptions): Promise<GenerateContentResponse> {
  const ai = getGeminiClient();

  const candidateModels = Array.from(
    new Set([preferredModel, ...FALLBACK_TEXT_MODELS])
  );

  let lastError: unknown = null;

  for (let modelIdx = 0; modelIdx < candidateModels.length; modelIdx++) {
    const model = candidateModels[modelIdx];
    const maxAttemptsForModel = modelIdx === 0 ? 2 : 2;

    const effectiveConfig: GenerateContentParameters['config'] = {
      ...(config || {}),
    };

    // Use ThinkingLevel.LOW on gemini-3.8-flash for faster latency & lower capacity contention
    if (
      lowThinkingOnPrimary &&
      model === 'gemini-3.8-flash' &&
      !effectiveConfig.thinkingConfig
    ) {
      effectiveConfig.thinkingConfig = {
        thinkingLevel: ThinkingLevel.LOW,
      };
    }

    for (let attempt = 0; attempt < maxAttemptsForModel; attempt++) {
      try {
        return await ai.models.generateContent({
          model,
          contents,
          config: effectiveConfig,
        });
      } catch (err: unknown) {
        lastError = err;
        const { retrySameModel, tryFallbackModel } =
          isTransientOrModelSwitchableError(err);

        console.warn(
          `[Gemini] Model "${model}" attempt ${attempt + 1}/${maxAttemptsForModel} failed:`,
          err instanceof Error ? err.message : err
        );

        if (retrySameModel && attempt + 1 < maxAttemptsForModel) {
          const delayMs = 650 * Math.pow(2, attempt) + Math.floor(Math.random() * 250);
          await sleep(delayMs);
          continue;
        }

        if (tryFallbackModel && modelIdx + 1 < candidateModels.length) {
          // Short breather before switching to independent fallback model pool
          await sleep(250);
          break;
        }

        throw err;
      }
    }
  }

  throw lastError || new Error('AI request failed after retries.');
}

/**
 * Strips optional ```json ... ``` markdown fences before JSON.parse.
 */
export function cleanJsonModelOutput(rawText: string): string {
  const trimmed = rawText.trim();
  if (trimmed.startsWith('```')) {
    return trimmed
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();
  }
  return trimmed;
}

/**
 * Converts raw SDK / JSON errors into clean, actionable user-facing messages and HTTP status codes.
 */
export function formatGeminiRouteError(
  err: unknown,
  fallbackMessage: string
): { message: string; status: number } {
  const { code, status, message } = extractApiErrorDetails(err);
  const combined = `${status || ''} ${message || ''}`.toLowerCase();

  if (
    message?.includes('GEMINI_API_KEY is not configured') ||
    code === 401 ||
    code === 403 ||
    combined.includes('api_key_invalid') ||
    combined.includes('permission_denied') ||
    combined.includes('api key not valid')
  ) {
    return {
      message:
        'AI service key issue detected. Please check your Gemini API key in the Settings > Secrets panel.',
      status: 403,
    };
  }

  if (code === 429 || combined.includes('resource_exhausted')) {
    return {
      message:
        'AI request quota reached. Please wait a few seconds and try again, or select a billing-enabled API key in Settings > Secrets.',
      status: 429,
    };
  }

  if (
    code === 503 ||
    code === 502 ||
    code === 504 ||
    combined.includes('unavailable') ||
    combined.includes('high demand') ||
    combined.includes('overloaded')
  ) {
    return {
      message:
        'The AI service is experiencing temporary high demand right now. Please wait a few seconds and click Try Again.',
      status: 503,
    };
  }

  if (message && !message.trim().startsWith('{')) {
    return {
      message,
      status: code && code >= 400 && code < 600 ? code : 500,
    };
  }

  return {
    message: fallbackMessage,
    status: 500,
  };
}
