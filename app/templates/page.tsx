import { permanentRedirect } from 'next/navigation';

export default function LegacyTemplatesRedirectPage() {
  permanentRedirect('/cv-templates');
}
