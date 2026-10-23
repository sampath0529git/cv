import React from 'react';
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '@/types/cv';

interface CvSkeletonProps {
  className?: string;
}

export default function CvSkeleton({ className = '' }: CvSkeletonProps) {
  return (
    <div
      className={`w-[794px] h-[1123px] min-w-[794px] max-w-[794px] min-h-[1123px] max-h-[1123px] box-border px-12 py-10 bg-white flex flex-col justify-between overflow-hidden select-none animate-pulse ${className}`}
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
      }}
    >
      <div className="space-y-4">
        {/* ========================================================= */}
        {/* HEADER SKELETON: Centered Name & Contact                  */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center pb-1 space-y-2">
          {/* Centered Name bar */}
          <div className="h-6 w-56 bg-slate-200/90 rounded-sm" />
          {/* Centered Email & Tel bar */}
          <div className="h-3 w-80 bg-slate-100 rounded-sm" />
        </div>

        {/* ========================================================= */}
        {/* 1. EDUCATION AND QUALIFICATIONS                           */}
        {/* ========================================================= */}
        <div className="border-t border-slate-300 pt-2 space-y-3">
          {/* Section title */}
          <div className="h-3.5 w-44 bg-slate-200 rounded-xs" />

          {/* Education entry 1 */}
          <div className="grid grid-cols-[125px_1fr] gap-4">
            <div className="h-3 w-20 bg-slate-200/80 rounded-xs" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3.5 w-48 bg-slate-200 rounded-xs" />
                <div className="h-3.5 w-40 bg-slate-200 rounded-xs" />
              </div>
              <div className="flex justify-between">
                <div className="h-2.5 w-36 bg-slate-100 rounded-xs" />
                <div className="h-2.5 w-32 bg-slate-100 rounded-xs" />
              </div>
              <div className="h-2.5 w-5/6 bg-slate-100/70 rounded-xs mt-1" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. WORK EXPERIENCE                                        */}
        {/* ========================================================= */}
        <div className="border-t border-slate-300 pt-2 space-y-3.5">
          {/* Section title */}
          <div className="h-3.5 w-32 bg-slate-200 rounded-xs" />

          {/* Experience entry 1 */}
          <div className="grid grid-cols-[125px_1fr] gap-4">
            <div className="h-3 w-24 bg-slate-200/80 rounded-xs" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3.5 w-44 bg-slate-200 rounded-xs" />
                <div className="h-3 w-24 bg-slate-100 rounded-xs" />
              </div>
              <div className="h-2.5 w-28 bg-slate-100 rounded-xs italic" />
              {/* Bullet points */}
              <div className="space-y-1 pl-3 pt-0.5">
                <div className="h-2.5 w-11/12 bg-slate-100 rounded-xs" />
                <div className="h-2.5 w-full bg-slate-100 rounded-xs" />
                <div className="h-2.5 w-4/5 bg-slate-100 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Experience entry 2 */}
          <div className="grid grid-cols-[125px_1fr] gap-4">
            <div className="h-3 w-24 bg-slate-200/80 rounded-xs" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3.5 w-40 bg-slate-200 rounded-xs" />
                <div className="h-3 w-20 bg-slate-100 rounded-xs" />
              </div>
              <div className="h-2.5 w-24 bg-slate-100 rounded-xs" />
              {/* Bullet points */}
              <div className="space-y-1 pl-3 pt-0.5">
                <div className="h-2.5 w-full bg-slate-100 rounded-xs" />
                <div className="h-2.5 w-3/4 bg-slate-100 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Experience entry 3 */}
          <div className="grid grid-cols-[125px_1fr] gap-4">
            <div className="h-3 w-24 bg-slate-200/80 rounded-xs" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3.5 w-36 bg-slate-200 rounded-xs" />
                <div className="h-3 w-20 bg-slate-100 rounded-xs" />
              </div>
              <div className="h-2.5 w-24 bg-slate-100 rounded-xs" />
              <div className="space-y-1 pl-3 pt-0.5">
                <div className="h-2.5 w-5/6 bg-slate-100 rounded-xs" />
                <div className="h-2.5 w-2/3 bg-slate-100 rounded-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. ADDITIONAL INFORMATION                                 */}
        {/* ========================================================= */}
        <div className="border-t border-slate-300 pt-2 space-y-2.5">
          {/* Section title */}
          <div className="h-3.5 w-36 bg-slate-200 rounded-xs mb-1" />

          {/* Interests row */}
          <div className="grid grid-cols-[125px_1fr] gap-4 items-center">
            <div className="h-3 w-16 bg-slate-200/70 rounded-xs" />
            <div className="h-2.5 w-full bg-slate-100 rounded-xs" />
          </div>

          {/* Achievements row */}
          <div className="grid grid-cols-[125px_1fr] gap-4 items-center">
            <div className="h-3 w-24 bg-slate-200/70 rounded-xs" />
            <div className="space-y-1">
              <div className="h-2.5 w-3/4 bg-slate-100 rounded-xs" />
              <div className="h-2.5 w-1/2 bg-slate-100 rounded-xs" />
            </div>
          </div>

          {/* Nationality row */}
          <div className="grid grid-cols-[125px_1fr] gap-4 items-center">
            <div className="h-3 w-20 bg-slate-200/70 rounded-xs" />
            <div className="h-2.5 w-2/3 bg-slate-100 rounded-xs" />
          </div>

          {/* Languages row */}
          <div className="grid grid-cols-[125px_1fr] gap-4 items-center">
            <div className="h-3 w-20 bg-slate-200/70 rounded-xs" />
            <div className="h-2.5 w-1/2 bg-slate-100 rounded-xs" />
          </div>
        </div>
      </div>

      {/* Subtle bottom indicator */}
      <div className="pt-2 flex justify-between items-center text-[9px] text-slate-300">
        <div className="h-2 w-28 bg-slate-100 rounded-xs" />
        <div className="h-2 w-16 bg-slate-100 rounded-xs" />
      </div>
    </div>
  );
}
