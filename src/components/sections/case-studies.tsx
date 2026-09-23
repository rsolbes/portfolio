import type { ReactNode } from "react";
import type { Dictionary } from "@/content";
import type { CaseStudy } from "@/content/types";
import { ArrowUpRight, Lock } from "../ui/icons";
import { SpotlightCard, Tabs } from "../ui/interactive";
import { Tag } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";

function Panel({ children }: { children: ReactNode }) {
  return <div className="mt-5 min-h-[12.5rem] text-[14.5px] leading-relaxed text-pretty text-muted">{children}</div>;
}

function CaseStudyCard({ study, t }: { study: CaseStudy; t: Dictionary }) {
  const ui = t.caseStudiesUi;
  return (
    <SpotlightCard as="article" className="flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-subtle">
        <span className="truncate">{study.kicker}</span>
        {study.visibility === "public" && study.repo ? (
          <a
            href={study.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-muted transition-colors duration-500 hover:border-accent/50 hover:text-accent"
          >
            {ui.repository}
            <ArrowUpRight className="size-3 transition-transform duration-500 ease-soft group-hover:translate-x-px group-hover:-translate-y-px" />
            <span className="sr-only">
              {ui.forProject} {study.title} ({t.ui.opensNewTab})
            </span>
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1">
            <Lock className="size-3" />
            {study.privateNote}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-fg sm:text-[1.4rem]">{study.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-pretty text-fg-soft">{study.summary}</p>

      <Tabs
        className="mt-6"
        listClassName="w-fit max-w-full"
        size="sm"
        items={[
          { id: "problem", label: ui.tabs.problem, content: <Panel>{study.problem}</Panel> },
          {
            id: "architecture",
            label: ui.tabs.architecture,
            content: (
              <Panel>
                <ul className="space-y-2.5">
                  {study.architecture.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ),
          },
          {
            id: "deployment",
            label: ui.tabs.deployment,
            content: (
              <Panel>
                <p>{study.deployment}</p>
                {study.retrospective ? (
                  <p className="mt-4 border-l-2 border-accent/60 pl-3 font-serif text-[15px] text-fg-soft italic">
                    {study.retrospective}
                  </p>
                ) : null}
              </Panel>
            ),
          },
        ]}
      />

      <div className="mt-auto pt-6">
        {study.facts ? (
          <dl className="mb-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {study.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-[10.5px] tracking-wide text-subtle uppercase">{f.label}</dt>
                <dd className="text-xl font-semibold tracking-tight text-fg tabular-nums">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-line pt-5">
          {study.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          <span className="ml-auto pl-2 font-mono text-[11px] text-subtle">{study.period}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function CaseStudies({ t }: { t: Dictionary }) {
  return (
    <>
      <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2" stagger={0.1}>
        {t.caseStudies.map((s) => (
          <RevealItem key={s.slug} className="h-full">
            <CaseStudyCard study={s} t={t} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12">
        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-start md:gap-10">
          <p className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase md:w-40 md:pt-1">
            {t.caseStudiesUi.alsoOnGithub}
          </p>
          <ul className="grid flex-1 gap-2 sm:grid-cols-3">
            {t.archive.map((a) => (
              <li key={a.name}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift group flex h-full flex-col rounded-xl border border-line bg-surface/40 p-4"
                >
                  <span className="flex items-center justify-between font-mono text-[13px] text-fg">
                    {a.name}
                    <ArrowUpRight className="size-3.5 text-subtle transition-all duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </span>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted">{a.detail}</span>
                  <span className="mt-3 font-mono text-[10.5px] text-subtle">{a.lang}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
