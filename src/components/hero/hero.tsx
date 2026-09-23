"use client";

import type { CSSProperties, PointerEvent } from "react";
import type { Dictionary } from "@/content";
import { links } from "@/content/shared";
import { rich } from "@/lib/rich";
import { ButtonLink, Container } from "../ui/primitives";
import { GitHub } from "../ui/icons";
import { SchemaFigure } from "./schema-figure";

// Entrance timing for CSS-driven animations (see .enter-* in globals.css).
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Props = { hero: Dictionary["hero"]; figure: Dictionary["figure"]; name: string };

export function Hero({ hero, figure, name }: Props) {
  const words = name.split(" ");
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28"
    >
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-top absolute inset-0" />
        <div className="aurora absolute -top-48 left-1/2 h-[620px] w-[min(1100px,140vw)]" />
        <div className="hero-spotlight absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-line-strong to-transparent" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <a
            href="#work"
            style={d(50)}
            className="enter-rise lift-sm group inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-elevated/70 py-1 pr-3 pl-1.5 text-xs text-muted backdrop-blur-sm hover:text-fg"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2 py-0.5 font-mono text-[10.5px] text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {hero.nowBadge}
            </span>
            <span className="truncate">{hero.nowText}</span>
          </a>

          <h1 className="mt-7 text-[clamp(2.9rem,8.2vw,5.6rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-fg">
            <span className="sr-only">{name}</span>
            <span aria-hidden className="flex flex-wrap gap-x-[0.24em]">
              {words.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden pb-[0.08em]">
                  <span className="enter-mask inline-block" style={d(150 + i * 90)}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p
            style={d(400)}
            className="enter-rise mt-6 max-w-xl text-[1.35rem] leading-snug font-medium tracking-[-0.015em] text-balance text-fg-soft sm:text-[1.6rem]"
          >
            {rich(hero.tagline, "font-serif font-normal text-accent italic")}
          </p>

          <p
            style={d(500)}
            className="enter-rise mt-5 max-w-xl text-[15px] leading-relaxed text-pretty text-muted sm:text-base"
          >
            {hero.intro}
          </p>

          <div style={d(600)} className="enter-rise mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work">{hero.ctaPrimary}</ButtonLink>
            <ButtonLink href={links.github} variant="secondary" external icon="none">
              <GitHub className="size-4" />
              GitHub
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              {hero.ctaContact}
            </ButtonLink>
          </div>

          <dl
            style={d(720)}
            className="enter-rise mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 font-mono text-xs sm:grid-cols-2 sm:gap-y-5"
          >
            {hero.facts.map((f) => (
              <div key={f.label}>
                <dt className="tracking-[0.18em] text-subtle uppercase">{f.label}</dt>
                <dd className="mt-1.5 text-fg-soft">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="enter-rise lg:col-span-5" style={d(350)}>
          <SchemaFigure figure={figure} />
        </div>
      </Container>
    </section>
  );
}
