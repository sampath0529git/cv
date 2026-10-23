import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-white text-slate-900">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-slate-600 mb-6">Could not find requested resource</p>
      <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
        Return Home
      </Link>
    </div>
  );
}
