import { permanentRedirect } from 'next/navigation';

export default function LegacyNursingCvTemplateRedirectPage() {
  permanentRedirect('/cv-templates/nursing');
}
