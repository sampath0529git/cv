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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F8FAFF] text-slate-900">
      <div className="mb-8">
        <Logo variant="dark" href="/" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B112C] mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md mb-8 text-sm sm:text-base">
        The page you requested could not be found on freecvmakeruk.co.uk. Start building your UK CV or explore our free templates below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition shadow-sm"
        >
          Return Home
        </Link>
        <Link
          href="/templates"
          className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition"
        >
          Browse UK CV Templates
        </Link>
      </div>
    </div>
  );
}
