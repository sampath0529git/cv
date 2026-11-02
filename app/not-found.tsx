import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-transparent text-slate-900">
      <div className="max-w-lg w-full p-8 sm:p-10 rounded-3xl bg-white/66 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-slate-900/[0.04] shadow-[0_20px_54px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] flex flex-col items-center">
        <div className="mb-7">
          <Logo variant="dark" href="/" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
          The page you requested could not be found on freecvmakeruk.co.uk. Start building your UK
          CV or explore our free templates below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="min-h-[44px] px-6 py-2.5 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition shadow-[0_8px_22px_rgba(37,99,235,0.3)] inline-flex items-center justify-center"
          >
            Return Home
          </Link>
          <Link
            href="/cv-templates"
            className="min-h-[44px] px-6 py-2.5 bg-white/75 hover:bg-white/95 backdrop-blur-md border border-white/85 ring-1 ring-slate-900/[0.05] text-slate-800 font-semibold rounded-full transition inline-flex items-center justify-center"
          >
            Browse UK CV Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
