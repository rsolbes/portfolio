import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/hero";
import { Abstract } from "@/components/sections/abstract";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Work } from "@/components/sections/work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/content";
import { personJsonLd, toJsonLd } from "@/content/structured-data";
import { hasLocale } from "@/i18n/config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd(t, lang)) }} />
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.ui.skipToContent}
      </a>
      <SiteHeader lang={lang} name={t.site.name} nav={t.nav} ui={t.ui} />
      <main id="main">
        <Hero hero={t.hero} figure={t.figure} name={t.site.name} />
        <Abstract t={t} />
        <Work t={t} />
        <Experience t={t} />
        <Contact t={t} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
