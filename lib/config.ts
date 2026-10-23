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
  name: 'Makemycv',
  tagline: 'Free CV Maker & Resume Builder',
  domain: 'makemycv.co.uk',
  // Design tokens matching reference screenshots:
  primaryColor: '#4B4DED',
  primaryHover: '#3D3FC9',
  primaryDisabled: '#A5A7F5',
  navyColor: '#0F1B4D',
  sidebarBg: '#12114A',
  pageGradientTop: '#EEF1FF',
  pageGradientBottom: '#FFFFFF',
};
