import type { ReactNode } from "react";
import type { Dictionary } from "@/content";
import { evalCounts, links, securityCheckResults, sourceFormats, thesisStack } from "@/content/shared";
import { cn } from "@/lib/cn";
import { rich } from "@/lib/rich";
import { ShareBar } from "../ui/bar";
import { ArrowUpRight, Check, GitHub } from "../ui/icons";
import { CountUp, Tabs } from "../ui/interactive";
import { StatusDot, Tag } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";
import { PipelineDiagram } from "./pipeline-diagram";

function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
      <span className="text-accent">{n}</span>
      {children}
    </p>
  );
}

function Prose({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-pretty text-muted lg:col-span-2">
      <h4 className="text-xl font-semibold tracking-tight text-fg">{title}</h4>
      {body.map((p) => (
        <p key={p}>{rich(p, "font-serif text-fg-soft")}</p>
      ))}
    </div>
  );
}

function highlightSql(line: string, key: number) {
  if (line.trim().startsWith("--")) {
    return (
      <span key={key} className="text-subtle italic">
        {line}
      </span>
    );
  }
  const parts = line.split(/('[^']*'|\b[A-Z]{2,}\b|\b\d+\b)/g);
  return (
    <span key={key}>
      {parts.map((p, i) => {
        if (/^'[^']*'$/.test(p) || /^\d+$/.test(p))
          return (
            <span key={i} className="text-accent-strong">
              {p}
            </span>
          );
        if (/^[A-Z]{2,}$/.test(p))
          return (
            <span key={i} className="text-accent">
              {p}
            </span>
          );
        return (
          <span key={i} className="text-fg-soft">
            {p}
          </span>
        );
      })}
    </span>
  );
}

function DataIntegrity({ t }: { t: Dictionary }) {
  const c = t.thesis.integrity;
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <Prose title={c.title} body={c.body} />
      <figure className="lg:col-span-3">
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface font-mono text-[11px] tracking-[0.12em] text-subtle uppercase">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-normal">{c.headers.year}</th>
                <th scope="col" className="px-4 py-2.5 font-normal">{c.headers.source}</th>
                <th scope="col" className="px-4 py-2.5 font-normal">{c.headers.why}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sourceFormats.map((r, i) => (
                <tr key={r.year} className="transition-colors duration-500 hover:bg-surface/70">
                  <td className="px-4 py-2.5 font-mono text-fg-soft tabular-nums">{r.year}</td>
                  <td className="px-4 py-2.5">
                    <Tag className={r.format === "csv" ? "text-accent" : undefined}>.{r.format}</Tag>
                  </td>
                  <td className="px-4 py-2.5 text-muted">{c.reasons[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-3 font-mono text-[11px] text-subtle">{c.caption}</figcaption>
      </figure>
    </div>
  );
}

function LeastPrivilege({ t }: { t: Dictionary }) {
  const c = t.thesis.privilege;
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <Prose title={c.title} body={c.body} />
      <div className="space-y-6 lg:col-span-3">
        <figure>
          <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-[12px] leading-[1.75]">
            <code>
              {c.listing.split("\n").map((line, i) => (
                <span key={i} className="block">
                  <span className="mr-4 inline-block w-4 text-right text-subtle/60 select-none">{i + 1}</span>
                  {highlightSql(line, i)}
                </span>
              ))}
            </code>
          </pre>
          <figcaption className="mt-3 font-mono text-[11px] text-subtle">{c.listingCaption}</figcaption>
        </figure>

        <figure>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {securityCheckResults.map((r, i) => (
              <li
                key={c.checks[i]}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-bg/40 px-3 py-2 text-xs"
              >
                <Check className="size-3.5 shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-fg-soft" title={c.checks[i]}>
                  {c.checks[i]}
                </span>
                <span className={cn("font-mono text-[10px]", r.kind === "barrier" ? "text-accent" : "text-subtle")}>
                  {r.expect}
                </span>
              </li>
            ))}
          </ul>
          <figcaption className="mt-3 font-mono text-[11px] text-subtle">{c.checksCaption}</figcaption>
        </figure>
      </div>
    </div>
  );
}

function Evaluation({ t }: { t: Dictionary }) {
  const c = t.thesis.evaluation;
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <Prose title={c.title} body={c.body} />

      <div className="space-y-8 lg:col-span-3">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{c.ladderLabel}</p>
          <ol className="grid gap-2 sm:grid-cols-4">
            {c.ladder.map((s, i) => (
              <li
                key={s.id}
                className="lift rounded-xl border border-line bg-elevated p-3"
                style={{ marginTop: `${i * 10}px` }}
              >
                <span className="font-mono text-[11px] text-accent">{s.id}</span>
                <p className="mt-1 text-sm font-medium tracking-tight text-fg">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{c.behaviorLabel}</p>
            <p className="font-mono text-[11px] text-subtle">
              <span className="mr-1 inline-block h-2.5 w-px translate-y-0.5 bg-fg" /> {t.ui.target}
            </p>
          </div>
          <div className="space-y-3.5">
            {evalCounts.map((d, i) => (
              <div key={c.behaviors[i]} className="grid grid-cols-[88px_1fr_64px] items-center gap-3 text-xs">
                <span className="text-fg-soft">{c.behaviors[i]}</span>
                <ShareBar
                  share={d.share}
                  target={d.target}
                  label={c.behaviors[i]}
                  nowLabel={t.ui.now}
                  targetLabel={t.ui.target}
                />
                <span className="text-right font-mono text-subtle tabular-nums">
                  {d.now} · {d.share}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-subtle">{c.behaviorNote}</p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{c.rqLabel}</p>
          <ol className="space-y-2">
            {c.researchQuestions.map((q, i) => (
              <li key={q} className="flex gap-3 font-serif text-[15px] leading-snug text-fg-soft">
                <span className="w-9 shrink-0 font-mono text-[11px] leading-6 text-accent">RQ{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCaseStudy({ t }: { t: Dictionary }) {
  const th = t.thesis;
  return (
    <Reveal className="mt-14">
      <article className="overflow-hidden rounded-3xl border border-line bg-surface/40">
        {/* Header */}
        <header className="relative border-b border-line p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-accent/[0.07] to-transparent"
          />
          <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-subtle">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 tracking-[0.14em] text-accent uppercase">
              {th.featured}
            </span>
            <span>{th.context}</span>
            <span className="hidden text-line-strong sm:inline">/</span>
            <span>{th.period}</span>
            <span className="flex items-center gap-1.5">
              <StatusDot status="in-progress" /> {t.ui.status["in-progress"]}
            </span>
          </div>

          <div className="relative mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-sm text-accent">{th.name}</p>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-balance text-fg sm:text-[2.1rem]">
                {th.headline}
              </h3>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <a
                href={links.thesisRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-sm group inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 py-2 text-sm font-medium text-fg"
              >
                <GitHub className="size-4" />
                {th.viewRepo}
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex flex-wrap gap-1.5 lg:justify-end">
                {thesisStack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Problem / approach */}
        <div className="grid border-b border-line md:grid-cols-2">
          <div className="border-b border-line p-6 sm:p-10 md:border-r md:border-b-0">
            <Label n="01">{th.labels.problem}</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{th.problem}</p>
          </div>
          <div className="p-6 sm:p-10">
            <Label n="02">{th.labels.approach}</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{th.approach}</p>
          </div>
        </div>

        {/* Metrics */}
        <RevealGroup as="dl" className="grid grid-cols-2 border-b border-line lg:grid-cols-4">
          {th.metrics.map((m, i) => (
            <RevealItem
              key={m.label}
              className={cn(
                "flex flex-col-reverse justify-end p-6 sm:px-10 sm:py-8",
                i % 2 === 0 && "border-r border-line",
                i < 2 && "border-b border-line lg:border-b-0",
                i === 1 && "lg:border-r",
              )}
            >
              <dt className="mt-2 text-xs leading-snug text-muted">{m.label}</dt>
              <dd className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                <CountUp value={m.value} suffix={m.suffix} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Architecture */}
        <div className="border-b border-line p-6 sm:p-10">
          <Label n="03">{th.labels.architecture}</Label>
          <div className="mt-6">
            <PipelineDiagram t={t} />
          </div>
        </div>

        {/* Deep dive */}
        <div className="p-6 sm:p-10">
          <Label n="04">{th.labels.notes}</Label>
          <Tabs
            className="mt-6"
            listClassName="w-fit max-w-full"
            items={[
              { id: "integrity", label: th.tabs.integrity, content: <DataIntegrity t={t} /> },
              { id: "privilege", label: th.tabs.privilege, content: <LeastPrivilege t={t} /> },
              { id: "evaluation", label: th.tabs.evaluation, content: <Evaluation t={t} /> },
            ]}
          />
        </div>
      </article>
    </Reveal>
  );
}
