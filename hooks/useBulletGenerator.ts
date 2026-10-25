'use client';

import { useState, useCallback } from 'react';
import { useCvStore } from '@/store/useCvStore';

interface GenerateBulletParams {
  expId: string;
  jobTitle?: string;
  employer?: string;
  currentDescription?: string;
  onSuccess?: (bullet: string) => void;
}

export function useBulletGenerator() {
  const [generatingMap, setGeneratingMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string | null>>({});
  const [successMap, setSuccessMap] = useState<Record<string, boolean>>({});

  const language = useCvStore((state) => state.language);
  const skills = useCvStore((state) => state.skills);

  const generateBullet = useCallback(
    async ({
      expId,
      jobTitle,
      employer,
      currentDescription,
      onSuccess,
    }: GenerateBulletParams) => {
      const trimmedJob = (jobTitle ?? '').trim();
      if (!trimmedJob) {
        setErrorMap((prev) => ({
          ...prev,
          [expId]: 'Enter a Job Title above to generate tailored achievement bullets.',
        }));
        return null;
      }

      setErrorMap((prev) => ({ ...prev, [expId]: null }));
      setGeneratingMap((prev) => ({ ...prev, [expId]: true }));
      setSuccessMap((prev) => ({ ...prev, [expId]: false }));

      try {
        const res = await fetch('/api/cv/generate-bullet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobTitle: trimmedJob,
            employer: employer?.trim() || '',
            currentDescription: currentDescription || '',
            skills: skills.map((s) => s.name),
            language,
          }),
        });

        const data = (await res.json()) as { bullet?: string; error?: string };
        if (!res.ok || !data.bullet) {
          throw new Error(data.error || 'Unable to generate bullet point.');
        }

        const newBullet: string = data.bullet;
        setSuccessMap((prev) => ({ ...prev, [expId]: true }));
        setTimeout(() => {
          setSuccessMap((prev) => ({ ...prev, [expId]: false }));
        }, 3000);

        if (onSuccess) {
          onSuccess(newBullet);
        }

        return newBullet;
      } catch (err: unknown) {
        const msg =
          err instanceof Error && err.message
            ? err.message
            : 'Error generating bullet. Please try again.';
        setErrorMap((prev) => ({ ...prev, [expId]: msg }));
        return null;
      } finally {
        setGeneratingMap((prev) => ({ ...prev, [expId]: false }));
      }
    },
    [language, skills]
  );

  const clearError = useCallback((expId: string) => {
    setErrorMap((prev) => ({ ...prev, [expId]: null }));
  }, []);

  return {
    generatingMap,
    errorMap,
    successMap,
    generateBullet,
    clearError,
  };
}
