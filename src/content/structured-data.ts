import { localePath, siteUrl, type Locale } from "@/i18n/config";
import type { Dictionary } from "./en";
import { links } from "./shared";

/**
 * schema.org Person profile embedded in the page as JSON-LD. Search engines,
 * AI assistants and recruiting tools read it directly, independent of layout,
 * animation or how link-heavy a section looks to a text extractor.
 */
export function personJsonLd(t: Dictionary, lang: Locale) {
  const current = t.experience.timeline.find((e) => e.current);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.site.name,
    url: `${siteUrl}${localePath(lang)}`,
    description: t.meta.description,
    email: `mailto:${links.email}`,
    jobTitle: current?.title,
    worksFor: current ? { "@type": "Organization", name: current.org } : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampico",
      addressRegion: "Tamaulipas",
      addressCountry: "MX",
    },
    sameAs: [links.github, links.linkedin].filter(Boolean),
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad Autónoma de Tamaulipas" },
      { "@type": "CollegeOrUniversity", name: "Universidad de Burgos" },
    ],
    // EU citizenship: eligible to work across the EU without sponsorship.
    nationality: { "@type": "Country", name: "Spain" },
    knowsLanguage: ["en", "es"],
    knowsAbout: t.experience.capabilities.flatMap((c) => c.items),
    hasCredential: t.experience.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: c.issuer },
      url: c.href,
    })),
    award: t.experience.awards.map((a) => `${a.place}: ${a.event} (${a.year})`),
  };
}

/** Serializes JSON-LD safely for inline <script> use. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
