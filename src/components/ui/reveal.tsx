"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { EASE } from "@/lib/cn";

/**
 * True in automated browsers (headless renderers, AI readers, recruiting
 * tools). They rarely scroll, so scroll-triggered entrances would leave
 * content invisible to them; for these visitors content is shown at once.
 */
export function useAutomated() {
  const [automated, setAutomated] = useState(false);
  useEffect(() => {
    if (navigator.webdriver) setAutomated(true);
  }, []);
  return automated;
}

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// A transition inside a variant wins over the component's `transition` prop,
// so the delay travels through `custom` instead.
const single: Variants = {
  hidden: item.hidden,
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const automated = useAutomated();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      animate={automated ? "show" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      variants={single}
      custom={automated ? 0 : delay}
    >
      {children}
    </motion.div>
  );
}

/** Staggers the entry of its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const automated = useAutomated();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      animate={automated ? "show" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: automated ? {} : { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
