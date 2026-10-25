/**
 * Application Brand Configuration
 * Change your brand name, logo, or theme colors in this single file.
 */

export interface BrandConfig {
  name: string;
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
  name: 'Makemeyour',
  tagline: 'The #1 Free CV Maker UK & AI Resume Builder',
  domain: 'makemeyour.com',
  // Design tokens matching reference design:
  primaryColor: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryDisabled: '#93C5FD',
  navyColor: '#0A102F',
  sidebarBg: '#0C1233',
  pageGradientTop: '#F0F5FF',
  pageGradientBottom: '#FFFFFF',
};
