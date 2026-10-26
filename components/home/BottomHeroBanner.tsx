'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getTemplateById } from '@/templates/registry';
import { SAMPLE_UK_CV } from '@/data/sampleCv';
import { A4_WIDTH_PX, A4_HEIGHT_PX, TemplateDefinition } from '@/types/cv';
import { useCvStore } from '@/store/useCvStore';

function FannedTemplateCard({
  template,
  accentColor,
  className,
  onSelect,
}: {
  template: TemplateDefinition;
  accentColor: string;
  className?: string;
  onSelect: (id: string) => void;
}) {
  const Component = template.component;
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.24);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const updateScale = (width: number) => {
      if (width > 0) {
        setScale(Number((width / A4_WIDTH_PX).toFixed(4)));
      }
    };

    updateScale(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || el.clientWidth;
      updateScale(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(template.id)}
      title={`Use ${template.name} template`}
      className={`w-44 sm:w-48 aspect-[210/297] bg-white rounded-xl overflow-hidden border border-slate-200/90 select-none cursor-pointer transition-transform duration-300 ${className || ''}`}
    >
      <div
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0 pointer-events-none bg-white text-slate-900 text-left"
      >
        <Component
          cv={{
            ...SAMPLE_UK_CV,
            settings: {
              ...SAMPLE_UK_CV.settings,
              templateId: template.id,
              accentColor,
            },
          }}
        />
      </div>
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 pointer-events-none" />
    </div>
  );
}

export default function BottomHeroBanner() {
  const router = useRouter();
  const setStoreTemplate = useCvStore((state) => state.setTemplate);

  const backTemplate = getTemplateById('toronto');
  const frontTemplate = getTemplateById('hopkins');

  const handleSelectTemplate = (templateId: string) => {
    setStoreTemplate(templateId as any);
    router.push('/start');
  };

  return (
    <section
      aria-label="Get Started Today"
      className="py-12 sm:py-16 bg-white"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#070B1E] via-[#0A1132] to-[#121B45] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle decorative glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                GET STARTED TODAY
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
                Create and edit your CV<br className="hidden sm:block" />
                in just a few clicks
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Join 1+ million people who&apos;ve already built their dream career with freecvmakeruk.co.uk.
              </p>

              <div className="pt-3">
                <Link
                  href="/start"
                  className="min-h-[46px] sm:min-h-[50px] inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
                >
                  <span>Create My CV</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual: Fanned Real CV Templates with "Build your future today" badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-[340px] min-h-[290px] sm:min-h-[310px] flex items-center justify-center">
                {/* Floating Badge: Frosted Glass */}
                <div className="absolute top-3 right-0 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/65 backdrop-blur-xl text-white text-[11px] font-bold flex items-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-white/25 pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Build your future today</span>
                </div>

                {/* Back CV Template Sheet (Toronto 2-column layout) */}
                <FannedTemplateCard
                  template={backTemplate}
                  accentColor="#1E3A8A"
                  onSelect={handleSelectTemplate}
                  className="relative z-10 translate-x-7 -translate-y-2 rotate-6 hover:rotate-3 hover:-translate-y-3 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                />

                {/* Front CV Template Sheet (Hopkins Executive layout) */}
                <FannedTemplateCard
                  template={frontTemplate}
                  accentColor="#2563EB"
                  onSelect={handleSelectTemplate}
                  className="absolute z-20 -translate-x-8 translate-y-3 -rotate-3 hover:-rotate-1 hover:translate-y-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
