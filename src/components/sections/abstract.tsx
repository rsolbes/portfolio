import type { Dictionary } from "@/content";
import { SpotlightCard } from "../ui/interactive";
import { Container } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";

const numerals = ["i.", "ii.", "iii.", "iv.", "v."];

export function Abstract({ t }: { t: Dictionary }) {
  const a = t.abstract;
  return (
    <section aria-labelledby="abstract-label" className="relative py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <p id="abstract-label" className="flex items-center gap-3 font-mono text-xs text-subtle">
            <span className="text-accent">§01</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="tracking-[0.2em] uppercase">{a.label}</span>
          </p>
        </Reveal>

        <div className="lg:col-span-9">
          <Reveal>
            <p className="font-serif text-[1.45rem] leading-[1.5] text-pretty text-fg-soft sm:text-[1.75rem]">
              <span className="font-sans text-[0.8em] font-semibold tracking-[0.06em] text-fg uppercase">
                {a.leadStrong}
              </span>{" "}
              {a.leadRest}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 font-mono text-xs leading-relaxed text-subtle">
              <span className="text-fg-soft">{a.keywordsLabel}</span> —{" "}
              {a.keywords.map((k, i) => (
                <span key={k}>
                  {k}
                  {i < a.keywords.length - 1 ? <span className="px-1.5 text-line-strong">·</span> : null}
                </span>
              ))}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {a.principles.map((p, i) => (
              <RevealItem key={p.title} className="h-full">
                <SpotlightCard className="h-full rounded-2xl border border-line bg-surface/50 p-6">
                  <span className="font-serif text-lg text-accent italic">{numerals[i]}</span>
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
