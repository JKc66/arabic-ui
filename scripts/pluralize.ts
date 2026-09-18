/**
 * Production-ready Arabic Pluralization Utility
 * Based on Unicode CLDR & Intl.PluralRules specification for Arabic (ar).
 *
 * Arabic has 6 grammatical plural categories:
 * - zero (0): صفر / نفي
 * - one (1): مفرد
 * - two (2): مثنى (دقيقتان / دقيقتين)
 * - few (3-10): جمع قلة مجرور (3 تطبيقات)
 * - many (11-99): مفرد منصوب (11 تطبيقًا)
 * - other (100+): مفرد مجرور (100 تطبيق)
 */

export type GrammaticalCase = 'nominative' | 'oblique';

export interface ArabicPluralForms {
  zero: string;
  one: string;
  /**
   * Dual form. Can be a single string or an object specifying grammatical case:
   * - nominative (مرفوع بالألف): e.g. "دقيقتان", "تطبيقان" (مبتدأ / فاعل)
   * - oblique (منصوب أو مجرور بالياء): e.g. "دقيقتين", "تطبيقين" (بعد حرف الجر أو مفعول به)
   */
  two: string | { nominative: string; oblique: string };
  few: string;   // 3-10
  many: string;  // 11-99
  other: string; // 100+
}

export interface FormatArabicPluralOptions {
  useArabicDigits?: boolean;
  dualCase?: GrammaticalCase;
}

const arabicPluralRules = new Intl.PluralRules('ar');

export function formatArabicPlural(
  count: number,
  forms: ArabicPluralForms,
  options: boolean | FormatArabicPluralOptions = false
): string {
  const opts: FormatArabicPluralOptions =
    typeof options === 'boolean' ? { useArabicDigits: options } : options;

  const category = arabicPluralRules.select(count);
  let template: string;

  if (category === 'two' && typeof forms.two === 'object') {
    const caseKey = opts.dualCase ?? 'nominative';
    template = forms.two[caseKey] ?? forms.two.nominative;
  } else if (category === 'two' && typeof forms.two === 'string') {
    template = forms.two;
  } else {
    template = forms[category] ?? forms.other;
  }

  const formattedCount = opts.useArabicDigits
    ? count.toLocaleString('ar-SA')
    : count.toString();

  return template.replace('{n}', formattedCount);
}

// Pre-defined noun templates for common software entities
export const COMMON_ARABIC_NOUNS: Record<string, ArabicPluralForms> = {
  minute: {
    zero: 'أقل من دقيقة',
    one: 'دقيقة واحدة',
    two: { nominative: 'دقيقتان', oblique: 'دقيقتين' },
    few: '{n} دقائق',
    many: '{n} دقيقةً',
    other: '{n} دقيقة'
  },
  hour: {
    zero: 'أقل من ساعة',
    one: 'ساعة واحدة',
    two: { nominative: 'ساعتان', oblique: 'ساعتين' },
    few: '{n} ساعات',
    many: '{n} ساعةً',
    other: '{n} ساعة'
  },
  day: {
    zero: 'اليوم',
    one: 'يوم واحد',
    two: { nominative: 'يومان', oblique: 'يومين' },
    few: '{n} أيام',
    many: '{n} يومًا',
    other: '{n} يوم'
  },
  file: {
    zero: 'لا توجد ملفات',
    one: 'ملف واحد',
    two: { nominative: 'ملفان', oblique: 'ملفين' },
    few: '{n} ملفات',
    many: '{n} ملفًا',
    other: '{n} ملف'
  },
  item: {
    zero: 'لا توجد عناصر',
    one: 'عنصر واحد',
    two: { nominative: 'عنصران', oblique: 'عنصرين' },
    few: '{n} عناصر',
    many: '{n} عنصرًا',
    other: '{n} عنصر'
  },
  app: {
    zero: 'لا توجد تطبيقات',
    one: 'تطبيق واحد',
    two: { nominative: 'تطبيقان', oblique: 'تطبيقين' },
    few: '{n} تطبيقات',
    many: '{n} تطبيقًا',
    other: '{n} تطبيق'
  },
  server: {
    zero: 'لا توجد خوادم',
    one: 'خادم واحد',
    two: { nominative: 'خادمان', oblique: 'خادمين' },
    few: '{n} خوادم',
    many: '{n} خادمًا',
    other: '{n} خادم'
  }
};
