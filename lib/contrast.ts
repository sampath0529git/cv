/**
 * WCAG-compliant color contrast helper
 * Calculates the relative luminance of a hex color and returns
 * high-contrast text color ('#ffffff' or '#0f172a').
 */
export function getContrastTextColor(hexColor: string): '#ffffff' | '#0f172a' {
  if (!hexColor) return '#ffffff';

  let hex = hexColor.replace('#', '').trim();
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  if (hex.length !== 6) return '#ffffff';

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  // Standard relative luminance formula
  const luminance = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;

  // Midpoint threshold for WCAG AA (0.45 works well for white vs dark slate)
  return luminance < 0.42 ? '#ffffff' : '#0f172a';
}

/**
 * Creates a subtle tint or translucent version of a hex color.
 */
export function getHexWithOpacity(hexColor: string, opacityPercent: number): string {
  let hex = (hexColor || '#1E3A8A').replace('#', '').trim();
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  const alpha = Math.round((opacityPercent / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${hex}${alpha}`;
}
