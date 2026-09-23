import { Container, SectionHeading } from "../ui/primitives";
import { CaseStudies } from "./case-studies";
import { FeaturedCaseStudy } from "./featured-case-study";

export function Work() {
  return (
    <section id="work" className="relative border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading
          index="02"
          label="Selected work"
          title="Case studies in data systems, applied AI and full-stack engineering."
          lead="The problem, the architecture and how it ships, with the real numbers behind each one."
        />
        <FeaturedCaseStudy />
        <CaseStudies />
      </Container>
    </section>
  );
}
