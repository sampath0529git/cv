import { permanentRedirect } from 'next/navigation';

export default function LegacyGraduateCvTemplatesRedirectPage() {
  permanentRedirect('/cv-templates/graduate');
}
