import { permanentRedirect } from 'next/navigation';

export default function LegacyActingCvTemplateRedirectPage() {
  permanentRedirect('/cv-templates/acting');
}
