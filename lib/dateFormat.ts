import {
  CV,
  DateFormatOption,
  DEFAULT_DATE_FORMAT,
  normalizeDateFormat,
} from '@/types/cv';

export const UK_SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const DATE_FORMAT_OPTIONS: {
  id: DateFormatOption;
  label: string;
  shortLabel: string;
  sampleRange: string;
  startPlaceholder: string;
  endPlaceholder: string;
  eduStartPlaceholder: string;
  eduEndPlaceholder: string;
}[] = [
  {
    id: 'month-year',
    label: 'Month Year (e.g., Jan 2024)',
    shortLabel: 'Month Year',
    sampleRange: 'Jan 2024 – Present',
    startPlaceholder: 'e.g. Jan 2022',
    endPlaceholder: 'e.g. Dec 2024',
    eduStartPlaceholder: 'e.g. Sep 2019',
    eduEndPlaceholder: 'e.g. Jun 2022',
  },
  {
    id: 'year-only',
    label: 'Year Only (2024)',
    shortLabel: 'Year Only',
    sampleRange: '2024 – Present',
    startPlaceholder: 'e.g. 2022',
    endPlaceholder: 'e.g. 2024',
    eduStartPlaceholder: 'e.g. 2019',
    eduEndPlaceholder: 'e.g. 2022',
  },
  {
    id: 'full-date',
    label: 'Full Date (e.g., 15 Jan 2024)',
    shortLabel: 'Full Date (UK)',
    sampleRange: '15 Jan 2024 – Present',
    startPlaceholder: 'e.g. 15 Jan 2022',
    endPlaceholder: 'e.g. 31 Dec 2024',
    eduStartPlaceholder: 'e.g. 23 Sep 2019',
    eduEndPlaceholder: 'e.g. 30 Jun 2022',
  },
];

const MONTH_NAME_LOOKUP: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

interface ParsedUkDate {
  day?: number;
  month?: number; // 1-12
  year?: number;
  isOngoing?: boolean;
}

function expandTwoDigitYear(twoDigit: number): number {
  const currentYear = new Date().getFullYear();
  const pivot = (currentYear % 100) + 10;
  return twoDigit <= pivot ? 2000 + twoDigit : 1900 + twoDigit;
}

function clampDay(day: number, month: number, year: number): number {
  const maxDay = new Date(year, month, 0).getDate();
  return Math.max(1, Math.min(maxDay, day));
}

/**
 * Parses flexible date inputs using strict UK Day-Month-Year conventions
 * while gracefully normalizing ISO (YYYY-MM-DD) and imported US textual dates.
 */
function parseFlexibleUkDate(raw: string): ParsedUkDate | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (/^(present|current|currently|ongoing|now|to\s+date|till\s+date)$/i.test(trimmed)) {
    return { isOngoing: true };
  }

  // 1. ISO Full Date: YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD
  const isoFull = trimmed.match(/^((?:19|20)\d{2})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (isoFull) {
    const year = parseInt(isoFull[1], 10);
    const p2 = parseInt(isoFull[2], 10);
    const p3 = parseInt(isoFull[3], 10);
    if (p2 >= 1 && p2 <= 12 && p3 >= 1 && p3 <= 31) {
      return { day: clampDay(p3, p2, year), month: p2, year };
    }
  }

  // 2. ISO Year-Month: YYYY-MM, YYYY/MM
  const isoMonth = trimmed.match(/^((?:19|20)\d{2})[-/.](\d{1,2})$/);
  if (isoMonth) {
    const year = parseInt(isoMonth[1], 10);
    const month = parseInt(isoMonth[2], 10);
    if (month >= 1 && month <= 12) {
      return { month, year };
    }
  }

  // 3. UK Numeric Full Date: DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY (or 2-digit year)
  const ukNumericFull = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2}|\d{4})$/);
  if (ukNumericFull) {
    const p1 = parseInt(ukNumericFull[1], 10);
    const p2 = parseInt(ukNumericFull[2], 10);
    const rawYear = parseInt(ukNumericFull[3], 10);
    const year = ukNumericFull[3].length === 2 ? expandTwoDigitYear(rawYear) : rawYear;

    if (p2 >= 1 && p2 <= 12 && p1 >= 1 && p1 <= 31) {
      // Standard UK order: DD/MM/YYYY
      return { day: clampDay(p1, p2, year), month: p2, year };
    }
    if (p1 >= 1 && p1 <= 12 && p2 > 12 && p2 <= 31) {
      // Unambiguous US import (e.g. 01/15/2024) -> normalize to UK day-month-year
      return { day: clampDay(p2, p1, year), month: p1, year };
    }
  }

  // 4. UK Numeric Month-Year: MM/YYYY, MM-YYYY, MM.YYYY
  const numericMonthYear = trimmed.match(/^(\d{1,2})[-/.]((?:19|20)\d{2})$/);
  if (numericMonthYear) {
    const month = parseInt(numericMonthYear[1], 10);
    const year = parseInt(numericMonthYear[2], 10);
    if (month >= 1 && month <= 12) {
      return { month, year };
    }
  }

  // 5. UK Textual Full Date: "15 Jan 2024", "15th January 2024", "15-Jan-2024"
  const ukTextFull = trimmed.match(
    /^(\d{1,2})(?:st|nd|rd|th)?[\s\-/.]+([A-Za-z]+)\.?,?[\s\-/.]+((?:19|20)\d{2}|\d{2})$/i
  );
  if (ukTextFull) {
    const rawDay = parseInt(ukTextFull[1], 10);
    const monthKey = ukTextFull[2].toLowerCase();
    const month = MONTH_NAME_LOOKUP[monthKey];
    const rawYear = parseInt(ukTextFull[3], 10);
    const year = ukTextFull[3].length === 2 ? expandTwoDigitYear(rawYear) : rawYear;
    if (month && rawDay >= 1 && rawDay <= 31) {
      return { day: clampDay(rawDay, month, year), month, year };
    }
  }

  // 6. US Textual Full Date (e.g. from LinkedIn/CV imports): "Jan 15, 2024", "January 15th 2024"
  const usTextFull = trimmed.match(
    /^([A-Za-z]+)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+((?:19|20)\d{2})$/i
  );
  if (usTextFull) {
    const monthKey = usTextFull[1].toLowerCase();
    const month = MONTH_NAME_LOOKUP[monthKey];
    const rawDay = parseInt(usTextFull[2], 10);
    const year = parseInt(usTextFull[3], 10);
    if (month && rawDay >= 1 && rawDay <= 31) {
      return { day: clampDay(rawDay, month, year), month, year };
    }
  }

  // 7. Textual Month-Year: "Jan 2024", "January 2024", "Sept 2024", "Jan '24"
  const textMonthYear = trimmed.match(
    /^([A-Za-z]+)\.?[\s,\-/']+((?:19|20)\d{2}|\d{2})$/i
  );
  if (textMonthYear) {
    const monthKey = textMonthYear[1].toLowerCase();
    const month = MONTH_NAME_LOOKUP[monthKey];
    const rawYear = parseInt(textMonthYear[2], 10);
    const year = textMonthYear[2].length === 2 ? expandTwoDigitYear(rawYear) : rawYear;
    if (month) {
      return { month, year };
    }
  }

  // 8. Pure 4-Digit Year: "2024"
  const yearOnly = trimmed.match(/^((?:19|20)\d{2})$/);
  if (yearOnly) {
    return { year: parseInt(yearOnly[1], 10) };
  }

  return null;
}

/**
 * Formats a single CV date string into the active UK industry-standard DateFormatOption.
 * - 'month-year': "Jan 2024"
 * - 'year-only':  "2024"
 * - 'full-date':  "15 Jan 2024" (or "01 Jan 2024" when day was omitted; strict UK DD MMM YYYY)
 */
export function formatCvDate(
  raw: string | undefined | null,
  format: DateFormatOption = DEFAULT_DATE_FORMAT
): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const resolvedFormat = normalizeDateFormat(format);

  // If a composite range was typed into a single field (e.g. "Jan 2021 – Mar 2023")
  const rangeParts = trimmed.split(/\s*(?:–|—|\s-\s|\sto\s)\s*/i);
  if (rangeParts.length === 2 && rangeParts[0] && rangeParts[1]) {
    const left = formatCvDate(rangeParts[0], resolvedFormat);
    const right = formatCvDate(rangeParts[1], resolvedFormat);
    return [left, right].filter(Boolean).join(' – ');
  }

  const parsed = parseFlexibleUkDate(trimmed);
  if (!parsed) {
    if (resolvedFormat === 'year-only') {
      const embeddedYear = trimmed.match(/\b((?:19|20)\d{2})\b/);
      if (embeddedYear) return embeddedYear[1];
    }
    return trimmed;
  }

  if (parsed.isOngoing) {
    return 'Present';
  }

  if (resolvedFormat === 'year-only') {
    return parsed.year ? String(parsed.year) : trimmed;
  }

  if (resolvedFormat === 'month-year') {
    if (parsed.month && parsed.year) {
      return `${UK_SHORT_MONTHS[parsed.month - 1]} ${parsed.year}`;
    }
    if (parsed.year) {
      return String(parsed.year);
    }
    return trimmed;
  }

  // 'full-date' — UK recruitment & vetting standard: DD MMM YYYY (e.g. 15 Jan 2024 / 01 Jan 2024)
  if (parsed.year) {
    const monthIndex = (parsed.month ?? 1) - 1;
    const dayStr = String(parsed.day ?? 1).padStart(2, '0');
    return `${dayStr} ${UK_SHORT_MONTHS[monthIndex]} ${parsed.year}`;
  }

  return trimmed;
}

/**
 * Formats a start/end date range consistently across UI cards, templates, and exports.
 */
export function formatCvDateRange(
  startDate?: string | null,
  endDate?: string | null,
  isCurrent?: boolean,
  format: DateFormatOption = DEFAULT_DATE_FORMAT
): string {
  const start = formatCvDate(startDate, format);
  const end = isCurrent ? 'Present' : formatCvDate(endDate, format);
  if (start && end) return `${start} – ${end}`;
  return start || end || '';
}

export function getDateFormatMeta(format?: DateFormatOption | null) {
  const normalized = normalizeDateFormat(format);
  return DATE_FORMAT_OPTIONS.find((opt) => opt.id === normalized) || DATE_FORMAT_OPTIONS[0];
}

/**
 * Non-destructively returns a display-ready CV with all timeline & personal dates
 * formatted according to `overrideFormat ?? cv.settings.dateFormat`.
 */
export function applyDateFormatToCv(cv: CV, overrideFormat?: DateFormatOption): CV {
  const activeFormat = normalizeDateFormat(overrideFormat ?? cv.settings?.dateFormat);

  return {
    ...cv,
    personal: {
      ...cv.personal,
      dateOfBirth: cv.personal.dateOfBirth
        ? formatCvDate(cv.personal.dateOfBirth, activeFormat)
        : cv.personal.dateOfBirth,
    },
    experience: (cv.experience || []).map((exp) => ({
      ...exp,
      startDate: formatCvDate(exp.startDate, activeFormat),
      endDate: exp.current ? 'Present' : formatCvDate(exp.endDate, activeFormat),
    })),
    education: (cv.education || []).map((edu) => ({
      ...edu,
      startDate: formatCvDate(edu.startDate, activeFormat),
      endDate: formatCvDate(edu.endDate, activeFormat),
    })),
    volunteering: (cv.volunteering || []).map((vol) => ({
      ...vol,
      date: vol.date ? formatCvDate(vol.date, activeFormat) : vol.date,
    })),
    settings: {
      ...cv.settings,
      dateFormat: activeFormat,
    },
  };
}
