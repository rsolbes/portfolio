import type { Dictionary } from "@/content";
import { Container, SectionHeading } from "../ui/primitives";
import { CaseStudies } from "./case-studies";
import { FeaturedCaseStudy } from "./featured-case-study";

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="work" className="relative border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading index="02" label={t.work.label} title={t.work.title} lead={t.work.lead} />
        <FeaturedCaseStudy t={t} />
        <CaseStudies t={t} />
      </Container>
    </section>
  );
}
