import { permanentRedirect } from 'next/navigation';

export default function LegacyFinanceCvTemplateRedirectPage() {
  permanentRedirect('/cv-templates/finance');
}
