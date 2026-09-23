import { Hero } from "@/components/hero/hero";
import { Abstract } from "@/components/sections/abstract";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Work } from "@/components/sections/work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Abstract />
        <Work />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
