import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Shared UK CV Preview',
  description:
    'View a shared UK Curriculum Vitae created with freecvmakeruk.co.uk — the free ATS-friendly online CV builder for UK jobseekers.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Shared UK CV Preview | freecvmakeruk.co.uk',
    description:
      'View a shared UK Curriculum Vitae created with freecvmakeruk.co.uk.',
    siteName: BRAND_CONFIG.name,
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
