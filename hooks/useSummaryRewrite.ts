'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useCvStore } from '@/store/useCvStore';

export function useSummaryRewrite() {
  const summary = useCvStore((state) => state.summary);
  const contact = useCvStore((state) => state.contact);
  const experiences = useCvStore((state) => state.experiences);
  const educations = useCvStore((state) => state.educations);
  const skills = useCvStore((state) => state.skills);
  const language = useCvStore((state) => state.language);
  const setSummary = useCvStore((state) => state.setSummary);

  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);
  const [rewriteSuccess, setRewriteSuccess] = useState(false);
  const [previousSummary, setPreviousSummary] = useState<string | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setRewriteError(null);
  }, []);

  const rewriteSummary = useCallback(async () => {
    if (isRewriting) return;

    setIsRewriting(true);
    setRewriteError(null);
    setRewriteSuccess(false);

    const snapshotBeforeRewrite = summary ?? '';

    try {
      const res = await fetch('/api/cv/rewrite-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: snapshotBeforeRewrite,
          jobTitle: contact.jobTitle,
          experiences: experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            employer: exp.employer,
            description: exp.description,
          })),
          educations: educations.map((edu) => ({
            degree: edu.degree,
            school: edu.school,
          })),
          skills: skills.map((s) => s.name),
          language,
        }),
      });

      const data = (await res.json()) as { summary?: string; error?: string };

      if (!res.ok || !data.summary) {
        setRewriteError(
          data.error || 'Could not polish your summary right now. Please try again.'
        );
        return;
      }

      setPreviousSummary(snapshotBeforeRewrite);
      setSummary(data.summary);
      setRewriteSuccess(true);

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      successTimerRef.current = setTimeout(() => {
        setRewriteSuccess(false);
      }, 3500);
    } catch {
      setRewriteError('Network error while polishing your summary. Please try again.');
    } finally {
      setIsRewriting(false);
    }
  }, [isRewriting, summary, contact.jobTitle, experiences, educations, skills, language, setSummary]);

  const undoRewrite = useCallback(() => {
    if (previousSummary === null) return;
    setSummary(previousSummary);
    setPreviousSummary(null);
    setRewriteSuccess(false);
    setRewriteError(null);
  }, [previousSummary, setSummary]);

  return {
    isRewriting,
    rewriteError,
    rewriteSuccess,
    canUndo: previousSummary !== null,
    rewriteSummary,
    undoRewrite,
    clearError,
  };
}
