import { SpotlightCard } from "../ui/interactive";
import { Container } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";

const keywords = [
  "text-to-SQL",
  "retrieval-augmented generation",
  "churn modeling",
  "probability calibration",
  "dimensional modeling",
  "least privilege",
  "enterprise .NET",
];

const principles = [
  {
    n: "i.",
    title: "Evidence over assertion",
    body: "Every answer carries its proof: the SQL that ran, or the passage it cites. When the data can’t support an answer, the right output is an abstention.",
  },
  {
    n: "ii.",
    title: "Reproducible by default",
    body: "Sources recorded with URL, date and hash. Prompts versioned like code. Three runs per configuration, reported with mean and spread.",
  },
  {
    n: "iii.",
    title: "Defense in depth",
    body: "The database doesn’t trust the validator, and the validator doesn’t trust the model. Each layer is named for what it can and can’t stop.",
  },
];

export function Abstract() {
  return (
    <section aria-labelledby="abstract-label" className="relative py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <p id="abstract-label" className="flex items-center gap-3 font-mono text-xs text-subtle">
            <span className="text-accent">§01</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="tracking-[0.2em] uppercase">Abstract</span>
          </p>
        </Reveal>

        <div className="lg:col-span-9">
          <Reveal>
            <p className="font-serif text-[1.45rem] leading-[1.5] text-pretty text-fg-soft sm:text-[1.75rem]">
              <span className="font-sans text-[0.8em] font-semibold tracking-[0.06em] text-fg uppercase">
                I work where enterprise data meets language models.
              </span>{" "}
              At work, I ship a calibrated churn model inside a .NET ERP that serves about a hundred branches.
              In research, I’m building a system that answers Spanish questions about Mexico’s federal budget,
              choosing between generated SQL and retrieved regulation, and abstaining when the evidence isn’t
              there. What connects the two: systems that are reproducible, least-privileged, and honest about
              what they know.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 font-mono text-xs leading-relaxed text-subtle">
              <span className="text-fg-soft">Keywords</span> —{" "}
              {keywords.map((k, i) => (
                <span key={k}>
                  {k}
                  {i < keywords.length - 1 ? <span className="px-1.5 text-line-strong">·</span> : null}
                </span>
              ))}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {principles.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <SpotlightCard className="h-full rounded-2xl border border-line bg-surface/50 p-6">
                  <span className="font-serif text-lg text-accent italic">{p.n}</span>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{p.body}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
