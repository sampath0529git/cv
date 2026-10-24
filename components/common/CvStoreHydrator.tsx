'use client';

import { useEffect } from 'react';
import { useCvStore } from '@/store/useCvStore';

/**
 * Renderless client hydrator that triggers Zustand localStorage rehydration
 * strictly after initial React SSR hydration completes, preventing DOM/input mismatches.
 */
export default function CvStoreHydrator() {
  useEffect(() => {
    useCvStore.persist.rehydrate();
  }, []);

  return null;
}
