import { pipeline, type StageStatus } from "@/content/thesis";
import { cn } from "@/lib/cn";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { StatusDot, statusLabel } from "../ui/primitives";

function Stage({
  title,
  detail,
  status,
  className,
}: {
  title: string;
  detail: string;
  status?: StageStatus;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "lift relative rounded-xl border p-3.5",
        status === "planned" ? "border-dashed border-line-strong bg-bg/40" : "border-line bg-elevated",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium tracking-tight text-fg">{title}</span>
        {status ? (
          <span className="flex items-center gap-1.5" title={statusLabel[status]}>
            <span className="sr-only">{statusLabel[status]}</span>
            <StatusDot status={status} />
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">{detail}</p>
    </div>
  );
}

function Down() {
  return <div aria-hidden className="flow-y mx-auto h-5 w-px bg-line-strong" />;
}

function Right() {
  return <div aria-hidden className="flow-x hidden h-px w-8 shrink-0 self-center bg-line-strong sm:block" />;
}

function Lane({ label, stages }: { label: string; stages: typeof pipeline.dataRoute }) {
  return (
    <RevealItem className="flex flex-col">
      <p className="mb-3 text-center font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">{label}</p>
      {stages.map((s, i) => (
        <div key={s.title} className="flex flex-col">
          {i > 0 ? <Down /> : null}
          <Stage {...s} />
        </div>
      ))}
    </RevealItem>
  );
}

export function PipelineDiagram() {
  return (
    <figure className="rounded-2xl border border-line bg-bg/50 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <figcaption className="font-mono text-[11px] text-muted">
          <span className="text-fg-soft">Fig. 2</span> · System architecture and build status
        </figcaption>
        <ul className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-subtle">
          {(["built", "in-progress", "planned"] as const).map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <StatusDot status={s} />
              {statusLabel[s]}
            </li>
          ))}
        </ul>
      </div>

      <RevealGroup className="pt-6" stagger={0.1}>
        <RevealItem className="flex flex-col items-stretch justify-center gap-0 sm:flex-row sm:items-center">
          <Stage {...pipeline.input} className="sm:w-56" />
          <Right />
          <div className="sm:hidden">
            <Down />
          </div>
          <Stage {...pipeline.router} className="sm:w-72" />
        </RevealItem>

        {/* Fork from the router into the two routes. */}
        <RevealItem>
          <svg aria-hidden className="hidden h-9 w-full md:block" viewBox="0 0 100 36" preserveAspectRatio="none">
            <path
              d="M50 0 V14 M25.5 14 H74.5 M25.5 14 V36 M74.5 14 V36"
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="md:hidden">
            <Down />
          </div>
        </RevealItem>

        <div className="grid gap-8 md:grid-cols-2 md:gap-4">
          <Lane label="Data route · text-to-SQL" stages={pipeline.dataRoute} />
          <Lane label="Document route · RAG" stages={pipeline.docRoute} />
        </div>

        <RevealItem className="mt-8 border-t border-dashed border-line-strong pt-5">
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">Foundations</p>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {pipeline.foundation.map((f) => (
              <Stage key={f.title} {...f} />
            ))}
          </div>
        </RevealItem>

        <RevealItem>
          <p className="mt-5 font-serif text-[15px] text-muted italic">
            Either route can end in an abstention. When the evidence can’t support an answer, saying so is the
            correct output.
          </p>
        </RevealItem>
      </RevealGroup>
    </figure>
  );
}
