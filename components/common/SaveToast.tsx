'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useCvStore, SaveStatus } from '@/store/useCvStore';

export default function SaveToast() {
  const saveStatus = useCvStore((state) => state.saveStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const prevStatusRef = useRef<SaveStatus>(saveStatus);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prev = prevStatusRef.current;
    if (prev === 'saving' && saveStatus === 'saved') {
      setAnimationKey((k) => k + 1);
      setIsOpen(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 2800);
    }
    prevStatusRef.current = saveStatus;
  }, [saveStatus]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={`save-toast-${animationKey}`}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 md:right-8 z-50 pointer-events-auto max-w-[calc(100vw-32px)]"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DCE3F7] shadow-[0_8px_30px_rgba(15,27,77,0.12)] text-slate-800 transition-shadow">
            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#0F1B4D] tracking-tight whitespace-nowrap">
              Changes saved successfully
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-1 p-1 -mr-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
