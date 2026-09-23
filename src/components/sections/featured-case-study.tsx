import type { ReactNode } from "react";
import {
  evalDistribution,
  experimentLadder,
  researchQuestions,
  roleListing,
  securityChecks,
  sourceChoice,
  thesis,
} from "@/content/thesis";
import { cn } from "@/lib/cn";
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

function DataIntegrity() {
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <div className="space-y-4 text-[15px] leading-relaxed text-pretty text-muted lg:col-span-2">
        <h4 className="text-xl font-semibold tracking-tight text-fg">The CSV and the XLSX disagree.</h4>
        <p>
          The Ministry of Finance publishes every fiscal year as both CSV and XLSX. A row-level cross-check
          showed they aren’t equivalent, so the source format is chosen per year. Every correction is
          declared in a normalization log, because a silent fix can’t be told apart from altering the data.
        </p>
        <p>
          Loads run in a single transaction and end by reconciling row counts and per-stage totals (approved,
          accrued, paid) against the source, to the peso. Any mismatch rolls back the whole load. If the load
          log exists, validation passed.
        </p>
      </div>
      <figure className="lg:col-span-3">
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface font-mono text-[11px] tracking-[0.12em] text-subtle uppercase">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-normal">Year</th>
                <th scope="col" className="px-4 py-2.5 font-normal">Source</th>
                <th scope="col" className="px-4 py-2.5 font-normal">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sourceChoice.map((r) => (
                <tr key={r.year} className="transition-colors duration-500 hover:bg-surface/70">
                  <td className="px-4 py-2.5 font-mono text-fg-soft tabular-nums">{r.year}</td>
                  <td className="px-4 py-2.5">
                    <Tag className={r.format === "csv" ? "text-accent" : undefined}>.{r.format}</Tag>
                  </td>
                  <td className="px-4 py-2.5 text-muted">{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-3 font-mono text-[11px] text-subtle">
          Table 1 · Source format per fiscal year, from docs/bitacora_normalizacion.md
        </figcaption>
      </figure>
    </div>
  );
}

function LeastPrivilege() {
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <div className="space-y-4 text-[15px] leading-relaxed text-pretty text-muted lg:col-span-2">
        <h4 className="text-xl font-semibold tracking-tight text-fg">The database doesn’t trust the validator.</h4>
        <p>
          The system runs SQL written by a language model, so safety can’t depend on the validator being
          right. The query role can only read the semantic views. In PostgreSQL a view runs with its owner’s
          privileges, which makes the semantic layer the only way in.
        </p>
        <p>
          Session settings are treated as <em className="font-serif text-fg-soft">safeguards</em>, not{" "}
          <em className="font-serif text-fg-soft">barriers</em>: a session can SET them. So the orchestrator
          must enforce its own timeout and reject SET and set_config().
        </p>
      </div>
      <div className="space-y-6 lg:col-span-3">
        <figure>
          <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-[12px] leading-[1.75]">
            <code>
              {roleListing.split("\n").map((line, i) => (
                <span key={i} className="block">
                  <span className="mr-4 inline-block w-4 text-right text-subtle/60 select-none">{i + 1}</span>
                  {highlightSql(line, i)}
                </span>
              ))}
            </code>
          </pre>
          <figcaption className="mt-3 font-mono text-[11px] text-subtle">
            Listing 1 · Least-privilege role, abridged from src/sql/03_rol_consulta.sql (comments translated)
          </figcaption>
        </figure>

        <figure>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {securityChecks.map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-bg/40 px-3 py-2 text-xs"
              >
                <Check className="size-3.5 shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-fg-soft" title={c.name}>
                  {c.name}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    c.kind === "barrier" ? "text-accent" : "text-subtle",
                  )}
                >
                  {c.expect}
                </span>
              </li>
            ))}
          </ul>
          <figcaption className="mt-3 font-mono text-[11px] text-subtle">
            Table 2 · 11 of 11 checks pass against exact values or SQLSTATE codes (tests/verificar_rol_consulta.py).
            Barriers highlighted.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function Evaluation() {
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-5">
      <div className="space-y-4 text-[15px] leading-relaxed text-pretty text-muted lg:col-span-2">
        <h4 className="text-xl font-semibold tracking-tight text-fg">Measure the bias, don’t hide it.</h4>
        <p>
          Accuracy is scored by execution, comparing result sets instead of SQL text, against a hand-verified
          question set. Questions have two origins, analyzed separately: citizens’ real transparency requests,
          quoted verbatim, and LLM-assisted questions generated from a schema-coverage matrix. If the system
          scores higher on generated questions, the gap measures their bias.
        </p>
        <p>
          Only questions a human has verified enter an experiment. The documentation given to the model was
          frozen at v1 on 2026-09-21, and every question is dated, so any gain can be reported separately for
          questions written before and after the freeze.
        </p>
      </div>

      <div className="space-y-8 lg:col-span-3">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
            Experimental ladder · 3 runs each
          </p>
          <ol className="grid gap-2 sm:grid-cols-4">
            {experimentLadder.map((s, i) => (
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
            <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
              Expected behavior · 61 drafted
            </p>
            <p className="font-mono text-[11px] text-subtle">
              <span className="mr-1 inline-block h-2.5 w-px translate-y-0.5 bg-fg" /> target
            </p>
          </div>
          <div className="space-y-3.5">
            {evalDistribution.map((d) => (
              <div key={d.label} className="grid grid-cols-[88px_1fr_64px] items-center gap-3 text-xs">
                <span className="text-fg-soft">{d.label}</span>
                <ShareBar share={d.share} target={d.target} label={d.label} />
                <span className="text-right font-mono text-subtle tabular-nums">
                  {d.now} · {d.share}%
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-subtle">
            Real citizen requests skew toward unanswerable questions: 78% of the first three batches asked for data
            the warehouse doesn’t hold. That is why answerable questions are generated.
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Research questions</p>
          <ol className="space-y-2">
            {researchQuestions.map((q, i) => (
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

export function FeaturedCaseStudy() {
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
              Featured
            </span>
            <span>{thesis.context}</span>
            <span className="hidden text-line-strong sm:inline">/</span>
            <span>{thesis.period}</span>
            <span className="flex items-center gap-1.5">
              <StatusDot status="in-progress" /> In progress
            </span>
          </div>

          <div className="relative mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-sm text-accent">{thesis.name}</p>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-balance text-fg sm:text-[2.1rem]">
                {thesis.headline}
              </h3>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <a
                href={thesis.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-sm group inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 py-2 text-sm font-medium text-fg"
              >
                <GitHub className="size-4" />
                View repository
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex flex-wrap gap-1.5 lg:justify-end">
                {thesis.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Problem / approach */}
        <div className="grid border-b border-line md:grid-cols-2">
          <div className="border-b border-line p-6 sm:p-10 md:border-r md:border-b-0">
            <Label n="01">Problem</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{thesis.problem}</p>
          </div>
          <div className="p-6 sm:p-10">
            <Label n="02">Approach</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{thesis.approach}</p>
          </div>
        </div>

        {/* Metrics */}
        <RevealGroup as="dl" className="grid grid-cols-2 border-b border-line lg:grid-cols-4">
          {thesis.metrics.map((m, i) => (
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
                <CountUp value={m.value} suffix={"suffix" in m ? m.suffix : ""} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Architecture */}
        <div className="border-b border-line p-6 sm:p-10">
          <Label n="03">Architecture</Label>
          <div className="mt-6">
            <PipelineDiagram />
          </div>
        </div>

        {/* Deep dive */}
        <div className="p-6 sm:p-10">
          <Label n="04">Engineering notes</Label>
          <Tabs
            className="mt-6"
            listClassName="w-fit max-w-full"
            items={[
              { id: "integrity", label: "Data integrity", content: <DataIntegrity /> },
              { id: "privilege", label: "Least privilege", content: <LeastPrivilege /> },
              { id: "evaluation", label: "Evaluation design", content: <Evaluation /> },
            ]}
          />
        </div>
      </article>
    </Reveal>
  );
}
