"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { GitHub } from "./ui/icons";

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    const clearAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-accent/40 via-accent to-accent-strong"
      />
      <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-6">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between gap-2 rounded-full border py-1.5 pr-1.5 pl-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-soft",
            scrolled
              ? "border-line bg-bg/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label={`${site.name}, back to top`}>
            <span className="grid size-8 place-items-center rounded-full border border-line-strong bg-surface font-mono text-[11px] font-semibold tracking-tight text-fg transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
              RS
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:inline">{site.name}</span>
          </a>

          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-1.5 text-[13px] transition-colors duration-500 sm:px-3.5 sm:text-sm",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-line bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="lift-sm hidden size-9 place-items-center rounded-full border border-line bg-surface/80 text-muted hover:text-fg sm:grid"
            >
              <GitHub className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
