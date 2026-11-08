import { permanentRedirect } from 'next/navigation';

export default function LegacySchoolLeaverCvTemplateRedirectPage() {
  permanentRedirect('/cv-templates/school-leaver');
}
