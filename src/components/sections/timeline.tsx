"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { timeline } from "@/content/experience";
import { cn } from "@/lib/cn";
import { Tag } from "../ui/primitives";
import { RevealGroup, RevealItem } from "../ui/reveal";

/** Vertical timeline whose rail fills in as you scroll through it. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
      <motion.div
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-accent to-accent/30"
      />
      <RevealGroup as="ol" className="space-y-12" stagger={0.12}>
        {timeline.map((e) => (
          <RevealItem as="li" key={e.title} className="relative pl-10">
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border bg-bg",
                e.current ? "border-accent" : "border-line-strong",
              )}
            >
              <span className={cn("size-[5px] rounded-full", e.current ? "bg-accent" : "bg-subtle")} />
            </span>

            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
              {e.period}
              {e.current ? (
                <span className="rounded-full bg-accent/12 px-2 py-0.5 tracking-normal text-accent normal-case">
                  now
                </span>
              ) : null}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{e.title}</h3>
            <p className="mt-0.5 text-sm text-muted">
              {e.org}
              {e.place ? <span className="text-subtle"> · {e.place}</span> : null}
            </p>
            <ul className="mt-4 space-y-2 text-[14.5px] leading-relaxed text-pretty text-muted">
              {e.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-line-strong" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
