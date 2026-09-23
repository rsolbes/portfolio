import type { MetadataRoute } from "next";
import { localePath, locales, siteUrl } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l)}`]));
  return locales.map((locale) => ({
    url: `${siteUrl}${localePath(locale)}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
