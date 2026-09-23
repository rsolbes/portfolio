import type { ReactNode } from "react";
import { awards, capabilities, certifications } from "@/content/experience";
import { ArrowUpRight } from "../ui/icons";
import { SpotlightCard } from "../ui/interactive";
import { Container, SectionHeading } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";
import { Timeline } from "./timeline";

function Label({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4 font-mono text-[11px] text-subtle">
      <p className="tracking-[0.16em] uppercase">{children}</p>
      {aside ? <p>{aside}</p> : null}
    </div>
  );
}

function Recognition() {
  return (
    <div>
      <Label>Recognition</Label>
      <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
        {awards.map((a) => (
          <RevealItem as="li" key={a.event}>
            <SpotlightCard className="h-full rounded-xl border border-line bg-surface/50 p-5">
              <p className="font-mono text-[11px] text-accent">{a.place}</p>
              <p className="mt-2 text-[15px] leading-snug font-semibold tracking-tight text-balance text-fg">
                {a.event}
              </p>
              <p className="mt-1.5 font-mono text-[11px] text-subtle">Capture the Flag · {a.year}</p>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

function Certifications() {
  const earned = certifications.filter((c) => c.status === "earned").length;
  return (
    <div>
      <Label aside={earned > 0 ? `${earned} verifiable` : undefined}>Certifications</Label>
      <Reveal>
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
          {certifications.map((c) => {
            const body = (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-fg">
                    {c.name}
                    {c.code ? <span className="ml-2 font-mono text-[11px] font-normal text-subtle">{c.code}</span> : null}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-subtle">{c.issuer}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] text-subtle tabular-nums">
                  {c.status === "earned" ? (c.date ?? "Earned") : "In progress"}
                </span>
              </>
            );
            return (
              <li key={c.name}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-surface/30 px-5 py-3.5 transition-colors duration-500 hover:bg-surface"
                  >
                    {body}
                    <ArrowUpRight className="size-3.5 shrink-0 text-subtle transition-all duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    <span className="sr-only">Verify credential (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 bg-surface/30 px-5 py-3.5">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}

function Capabilities() {
  return (
    <div>
      <Label>Capabilities</Label>
      <Reveal>
        <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line">
          {capabilities.map((c) => (
            <div
              key={c.area}
              className="grid gap-2 bg-surface/30 px-5 py-4 transition-colors duration-500 hover:bg-surface sm:grid-cols-[140px_1fr] sm:gap-6"
            >
              <dt className="text-sm font-medium text-fg">{c.area}</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-muted">
                {c.items.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 ? <span aria-hidden className="text-line-strong">/</span> : null}
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading
          index="03"
          label="Experience & credentials"
          title="Three years from server rooms to production ML."
          lead="IT infrastructure, independent consulting and enterprise .NET, now shipping machine learning inside an ERP that serves about a hundred branches."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Label>Timeline</Label>
            <div className="mt-3">
              <Timeline />
            </div>
          </div>

          <div className="space-y-14 lg:col-span-6">
            {awards.length > 0 ? <Recognition /> : null}
            {certifications.length > 0 ? <Certifications /> : null}
            <Capabilities />
          </div>
        </div>
      </Container>
    </section>
  );
}
