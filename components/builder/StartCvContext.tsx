'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import StartCvModal from './StartCvModal';

interface StartCvContextType {
  openModal: (mode?: 'default' | 'import' | 'scratch') => void;
  closeModal: () => void;
}

const StartCvContext = createContext<StartCvContextType | undefined>(undefined);

export function StartCvProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'default' | 'import' | 'scratch'>('default');

  const openModal = (initialMode: 'default' | 'import' | 'scratch' = 'default') => {
    setMode(initialMode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Intercept any click on 'Create my CV' or 'Import my CV' links/buttons globally
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest('a, button');
      if (!trigger) return;

      const text = trigger.textContent?.trim().toLowerCase() || '';
      const href = trigger.getAttribute('href') || '';

      // Check if it's a 'Create my CV' or 'Import my CV' button
      if (
        text.includes('create my cv') ||
        text.includes('create your cv') ||
        text.includes('import my cv') ||
        href === '#cv-builder-section' ||
        href === '#create-cv'
      ) {
        // Prevent default hash jump and open modal
        e.preventDefault();
        if (text.includes('import')) {
          openModal('import');
        } else {
          openModal('default');
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  return (
    <StartCvContext.Provider value={{ openModal, closeModal }}>
      {children}
      <StartCvModal isOpen={isOpen} onClose={closeModal} initialMode={mode} />
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
