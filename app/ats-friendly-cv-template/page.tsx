import { permanentRedirect } from 'next/navigation';

export default function LegacyAtsFriendlyCvTemplateRedirectPage() {
  permanentRedirect('/cv-templates/ats-friendly');
}
