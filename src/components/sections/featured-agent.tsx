import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import coachShot from "@/assets/finance-coach/coach.png";
import dashboardShot from "@/assets/finance-coach/dashboard.png";
import mobileShot from "@/assets/finance-coach/mobile.png";
import spendingShot from "@/assets/finance-coach/spending.png";
import statementShot from "@/assets/finance-coach/statement-review.png";
import type { Dictionary } from "@/content";
import { financeCoachStack, links } from "@/content/shared";
import { cn } from "@/lib/cn";
import { ArrowUpRight, GitHub } from "../ui/icons";
import { CountUp, Tabs } from "../ui/interactive";
import { StatusDot, Tag } from "../ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";
import { Label } from "./featured-case-study";

const SHOTS: Record<string, StaticImageData> = {
  coach: coachShot,
  dashboard: dashboardShot,
  statement: statementShot,
  spending: spendingShot,
};

/** A light browser window around a desktop screenshot. */
function BrowserFrame({ src, alt, priority }: { src: StaticImageData; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-elevated shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
      <div aria-hidden className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 rounded-md bg-surface px-2 py-0.5 font-mono text-[10.5px] text-subtle">finance-coach</span>
      </div>
      <div className="aspect-[16/10] overflow-hidden bg-white">
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function PhoneFrame({ alt }: { alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-[2.1rem] border border-line-strong bg-elevated p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        <Image src={mobileShot} alt={alt} placeholder="blur" sizes="220px" className="h-auto w-full" />
      </div>
    </div>
  );
}

function Box({ title, detail, highlight, children }: { title: string; detail?: string; highlight?: boolean; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "lift relative rounded-xl border p-3.5",
        highlight ? "border-accent/50 bg-accent/10" : "border-line bg-elevated",
      )}
    >
      <p className={cn("text-sm font-medium tracking-tight", highlight ? "text-accent" : "text-fg")}>{title}</p>
      {detail ? <p className="mt-1 text-xs leading-relaxed text-muted">{detail}</p> : null}
      {children}
    </div>
  );
}

const Right = () => <div aria-hidden className="flow-x hidden h-px w-8 shrink-0 self-center bg-line-strong sm:block" />;
const Down = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("flow-y mx-auto h-5 w-px bg-line-strong", className)} />
);

/** Question -> Claude -> answer, with the tools Claude calls and what they sit on. */
function AgentDiagram({ t }: { t: Dictionary }) {
  const a = t.financeCoach.agent;
  return (
    <div>
      <RevealGroup className="flex flex-col gap-0 sm:flex-row sm:items-stretch" stagger={0.08}>
        <RevealItem className="sm:flex-1">
          <Box title={a.ask.title} detail={a.ask.detail} />
        </RevealItem>
        <Down className="sm:hidden" />
        <Right />
        <RevealItem className="sm:flex-[1.3]">
          <Box title={a.model.title} detail={a.model.detail} highlight />
        </RevealItem>
        <Down className="sm:hidden" />
        <Right />
        <RevealItem className="sm:flex-1">
          <Box title={a.answer.title} detail={a.answer.detail} />
        </RevealItem>
      </RevealGroup>

      <Down />
      <p className="text-center font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{a.toolsTitle}</p>
      <Down />

      <RevealGroup className="grid gap-3 md:grid-cols-3" stagger={0.08}>
        {a.groups.map((g) => (
          <RevealItem key={g.title}>
            <Box title={g.title}>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {g.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-muted"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Box>
          </RevealItem>
        ))}
      </RevealGroup>

      <Down />
      <div className="grid gap-3 sm:grid-cols-2">
        <Box title={a.engine.title} detail={a.engine.detail} />
        <Box title={a.store.title} detail={a.store.detail} />
      </div>
    </div>
  );
}

export function FeaturedAgent({ t }: { t: Dictionary }) {
  const fc = t.financeCoach;
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
              {fc.featured}
            </span>
            <span>{fc.context}</span>
            <span className="hidden text-line-strong sm:inline">/</span>
            <span>{fc.period}</span>
            <span className="flex items-center gap-1.5">
              <StatusDot status="built" /> {fc.status}
            </span>
          </div>

          <div className="relative mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-sm text-accent">{fc.name}</p>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-balance text-fg sm:text-[2.1rem]">
                {fc.headline}
              </h3>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <a
                href={links.financeCoachRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-sm group inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-elevated px-4 py-2 text-sm font-medium text-fg"
              >
                <GitHub className="size-4" />
                {fc.viewRepo}
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">({t.ui.opensNewTab})</span>
              </a>
              <div className="flex flex-wrap gap-1.5 lg:justify-end">
                {financeCoachStack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Screenshots */}
        <div className="border-b border-line p-6 sm:p-10">
          <Label n="01">{fc.labels.app}</Label>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
            <Tabs
              className="lg:col-span-9"
              listClassName="w-fit max-w-full"
              size="sm"
              items={fc.screens.map((s, i) => ({
                id: s.id,
                label: s.label,
                content: (
                  <div className="mt-4">
                    <BrowserFrame src={SHOTS[s.id]} alt={s.alt} priority={i === 0} />
                  </div>
                ),
              }))}
            />
            <div className="lg:col-span-3 lg:pt-14">
              <PhoneFrame alt={fc.phoneAlt} />
            </div>
          </div>
          <p className="mt-5 font-mono text-[11px] text-subtle">{fc.screensNote}</p>
        </div>

        {/* Problem / approach */}
        <div className="grid border-b border-line md:grid-cols-2">
          <div className="border-b border-line p-6 sm:p-10 md:border-r md:border-b-0">
            <Label n="02">{fc.labels.problem}</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{fc.problem}</p>
          </div>
          <div className="p-6 sm:p-10">
            <Label n="03">{fc.labels.approach}</Label>
            <p className="mt-4 text-[15px] leading-relaxed text-pretty text-muted">{fc.approach}</p>
          </div>
        </div>

        {/* Metrics */}
        <RevealGroup as="dl" className="grid grid-cols-2 border-b border-line lg:grid-cols-4">
          {fc.metrics.map((m, i) => (
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

        {/* Agent */}
        <div className="border-b border-line p-6 sm:p-10">
          <Label n="04">{fc.labels.agent}</Label>
          <div className="mt-6">
            <AgentDiagram t={t} />
          </div>
        </div>

        {/* Decisions */}
        <div className="p-6 sm:p-10">
          <Label n="05">{fc.labels.decisions}</Label>
          <RevealGroup as="ul" className="mt-6 grid gap-x-10 gap-y-7 md:grid-cols-2" stagger={0.08}>
            {fc.decisions.map((d) => (
              <RevealItem as="li" key={d.title} className="flex gap-3">
                <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" />
                <div>
                  <h4 className="font-semibold tracking-tight text-fg">{d.title}</h4>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-pretty text-muted">{d.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </article>
    </Reveal>
  );
}
