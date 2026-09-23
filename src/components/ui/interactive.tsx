"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn, EASE } from "@/lib/cn";

/** A card whose border and surface catch a soft light that follows the cursor. */
export function SpotlightCard({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const Tag = as;
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={cn("spotlight lift", className)}>
      {children}
    </Tag>
  );
}

/** Counts up from zero the first time it scrolls into view. */
export function CountUp({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const format = (n: number) => Math.round(n).toLocaleString("en-US") + suffix;

  useEffect(() => {
    if (!reduce && ref.current && !inView) ref.current.textContent = format(0);
    // Only on mount: hide the server-rendered final value until it animates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(value)}
    </span>
  );
}

export type TabItem = { id: string; label: string; content: ReactNode };

/** Accessible tabs with a sliding indicator and a soft content cross-fade. */
export function Tabs({
  items,
  className,
  listClassName,
  size = "md",
}: {
  items: TabItem[];
  className?: string;
  listClassName?: string;
  size?: "sm" | "md";
}) {
  const [active, setActive] = useState(items[0]?.id);
  const uid = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(items[next].id);
    refs.current[next]?.focus();
  };

  const current = items.find((t) => t.id === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className={cn(
          "relative flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none]",
          listClassName,
        )}
      >
        {items.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative shrink-0 rounded-full font-medium whitespace-nowrap transition-colors duration-500 ease-soft",
                size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
                selected ? "text-fg" : "text-subtle hover:text-fg",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 rounded-full border border-line-strong bg-elevated shadow-[0_1px_2px_rgb(0_0_0/0.08)]"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`${uid}-panel-${current.id}`}
          aria-labelledby={`${uid}-tab-${current.id}`}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Copies text to the clipboard and confirms inline. */
export function CopyButton({ text, children }: { text: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${text}`;
        }
      }}
      className="lift-sm inline-flex items-center gap-2 rounded-full border border-line-strong bg-elevated/70 px-4 py-2.5 font-mono text-xs text-muted backdrop-blur-sm hover:text-fg"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? "Copied to clipboard" : children}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
