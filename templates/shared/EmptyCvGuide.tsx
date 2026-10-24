import React from 'react';

interface EmptyCvGuideProps {
  accent?: string;
}

/**
 * Subtle screen-only (.no-print) structural preview shown ONLY when the user has not yet
 * entered summary, experience, education, or skills — so switching templates on Step 1
 * immediately showcases each layout's visual hierarchy without polluting PDF exports.
 */
export default function EmptyCvGuide({ accent = '#4B4DED' }: EmptyCvGuideProps) {
  return (
    <div className="no-print space-y-5 pt-2 opacity-55 select-none pointer-events-none">
      <div className="space-y-2">
        <div
          style={{ color: accent }}
          className="text-[10px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
        >
          Professional Summary (Preview)
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 w-full rounded bg-slate-200/80" />
          <div className="h-2.5 w-11/12 rounded bg-slate-200/80" />
          <div className="h-2.5 w-3/4 rounded bg-slate-200/60" />
        </div>
      </div>

      <div className="space-y-3">
        <div
          style={{ color: accent }}
          className="text-[10px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
        >
          Work Experience (Add in Step 2)
        </div>
        {[1, 2].map((item) => (
          <div key={item} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="h-3 w-44 rounded bg-slate-300/80" />
              <div className="h-2.5 w-24 rounded bg-slate-200" />
            </div>
            <div className="h-2.5 w-32 rounded bg-slate-200/80" />
            <div className="pl-3 space-y-1 pt-0.5">
              <div className="h-2 w-full rounded bg-slate-100" />
              <div className="h-2 w-5/6 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        <div
          style={{ color: accent }}
          className="text-[10px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
        >
          Education & Key Skills (Steps 3–4)
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 w-48 rounded bg-slate-300/80" />
          <div className="h-2.5 w-20 rounded bg-slate-200" />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['Leadership', 'Strategy', 'Analytics', 'Stakeholder Management'].map((label) => (
            <span
              key={label}
              className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[9px] font-medium border border-slate-200/70"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
