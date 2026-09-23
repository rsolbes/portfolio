"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/cn";
import { useAutomated } from "./reveal";

/** Horizontal share bar that grows into place, with a tick marking the target. */
export function ShareBar({
  share,
  target,
  label,
  nowLabel,
  targetLabel,
}: {
  share: number;
  target: number;
  label: string;
  nowLabel: string;
  targetLabel: string;
}) {
  const automated = useAutomated();
  return (
    <div
      className="relative h-2 rounded-full bg-surface-2"
      role="img"
      aria-label={`${label}: ${share}% ${nowLabel}, ${targetLabel} ${target}%`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-accent/60 to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${share}%` }}
        animate={automated ? { width: `${share}%` } : undefined}
        viewport={{ once: true }}
        transition={{ duration: automated ? 0 : 1.2, ease: EASE, delay: automated ? 0 : 0.15 }}
      />
      <span aria-hidden className="absolute -top-1 -bottom-1 w-px bg-fg" style={{ left: `${target}%` }} />
    </div>
  );
}
