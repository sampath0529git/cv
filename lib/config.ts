/**
 * Application Brand Configuration
 * Change your brand name, logo, or theme colors in this single file.
 */

export interface BrandConfig {
  name: string;
  displayDomain: string;
  tagline: string;
  domain: string;
  primaryColor: string;
  primaryHover: string;
  primaryDisabled: string;
  navyColor: string;
  sidebarBg: string;
  pageGradientTop: string;
  pageGradientBottom: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: 'freecvmakeruk.co.uk',
  displayDomain: 'freecvmakeruk.co.uk',
  tagline: 'The #1 Free CV Maker UK & ATS-Friendly Online CV Builder',
  domain: 'freecvmakeruk.co.uk',
  primaryColor: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryDisabled: '#93C5FD',
  navyColor: '#0A102F',
  sidebarBg: '#0C1233',
  pageGradientTop: '#F0F5FF',
  pageGradientBottom: '#FFFFFF',
};

export function getSiteUrl(): string {
  const envUrl = process.env.APP_URL?.trim();
  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/+$/, '');
  }
  return `https://${BRAND_CONFIG.domain}`;
}

