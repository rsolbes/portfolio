export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const siteUrl = "https://rodrigosolbes.com";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** The default locale lives at the site root; the others under their prefix. */
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);
