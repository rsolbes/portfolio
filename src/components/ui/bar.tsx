"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/cn";

/** Horizontal share bar that grows into place, with a tick marking the target. */
export function ShareBar({ share, target, label }: { share: number; target: number; label: string }) {
  return (
    <div className="relative h-2 rounded-full bg-surface-2" role="img" aria-label={`${label}: ${share}% now, target ${target}%`}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-accent/60 to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${share}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
      />
      <span
        aria-hidden
        className="absolute -top-1 -bottom-1 w-px bg-fg"
        style={{ left: `${target}%` }}
      />
    </div>
  );
}
