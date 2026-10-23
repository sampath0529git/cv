'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface StartCvContextType {
  openModal: (mode?: 'default' | 'import' | 'scratch') => void;
  closeModal: () => void;
}

const StartCvContext = createContext<StartCvContextType | undefined>(undefined);

export function StartCvProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const openModal = (initialMode: 'default' | 'import' | 'scratch' = 'default') => {
    if (initialMode === 'import') {
      router.push('/import');
    } else {
      router.push('/start');
    }
  };

  const closeModal = () => {};

  // Intercept any click on 'Create my CV' or 'Import my CV' links/buttons globally and route directly
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest('a, button');
      if (!trigger) return;

      const text = trigger.textContent?.trim().toLowerCase() || '';
      const href = trigger.getAttribute('href') || '';

      // Check if it's an import button
      if (text.includes('import my cv') || href === '/import') {
        e.preventDefault();
        router.push('/import');
        return;
      }

      // Check if it's a 'Create my CV' or 'Create CV' button
      if (
        text.includes('create my cv') ||
        text.includes('create your cv') ||
        text.includes('create cv') ||
        href === '/start' ||
        href === '#cv-builder-section' ||
        (href === '#templates-section' && text.includes('create')) ||
        href === '#create-cv'
      ) {
        e.preventDefault();
        router.push('/start');
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [router]);

  return (
    <StartCvContext.Provider value={{ openModal, closeModal }}>
      {children}
    </StartCvContext.Provider>
  );
}

export function useStartCvModal() {
  const context = useContext(StartCvContext);
  if (!context) {
    throw new Error('useStartCvModal must be used within a StartCvProvider');
  }
  return context;
}
