import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  index,
  label,
  title,
  lead,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 font-mono text-xs text-subtle">
        <span className="text-accent">§{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="uppercase tracking-[0.2em]">{label}</span>
      </div>
      <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.025em] text-balance text-fg sm:text-4xl md:text-[2.8rem] md:leading-[1.08]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl font-serif text-lg text-pretty text-muted italic sm:text-xl">{lead}</p>
      ) : null}
    </Reveal>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  icon?: "arrow" | "external" | "none";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon = "arrow",
  className,
}: ButtonProps) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "arrow" ? ArrowRight : null;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "lift-sm group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap",
        variant === "primary" &&
          "bg-accent text-accent-contrast shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]",
        variant === "secondary" && "border border-line-strong bg-elevated/70 text-fg backdrop-blur-sm",
        variant === "ghost" && "text-muted hover:text-fg",
        className,
      )}
    >
      {children}
      {Icon ? (
        <Icon
          className={cn(
            "size-4 transition-transform duration-500 ease-soft",
            icon === "arrow" ? "group-hover:translate-x-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          )}
        />
      ) : null}
    </a>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ status }: { status: "built" | "in-progress" | "planned" }) {
  if (status === "built") return <span className="size-2 rounded-full bg-accent" aria-hidden />;
  if (status === "in-progress")
    return (
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50 motion-reduce:animate-none" />
        <span className="relative size-2 rounded-full border border-accent bg-accent/40" />
      </span>
    );
  return <span className="size-2 rounded-full border border-dashed border-subtle" aria-hidden />;
}

export const statusLabel = {
  built: "Built",
  "in-progress": "In progress",
  planned: "Planned",
} as const;
