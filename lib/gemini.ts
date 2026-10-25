import { GoogleGenAI } from '@google/genai';

export const SUMMARY_REWRITE_MODEL = 'gemini-3.8-flash';
export const CV_PARSE_MODEL = 'gemini-3.8-flash';
export const BULLET_GENERATE_MODEL = 'gemini-3.8-flash';


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
