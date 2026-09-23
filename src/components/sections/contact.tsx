import type { Dictionary } from "@/content";
import { links } from "@/content/shared";
import { rich } from "@/lib/rich";
import { Copy, FileText, GitHub, LinkedIn, Mail } from "../ui/icons";
import { CopyButton } from "../ui/interactive";
import { ButtonLink, Container } from "../ui/primitives";
import { Reveal } from "../ui/reveal";

export function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface/50 px-6 py-14 sm:px-14 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_0%,#000_20%,transparent_75%)]" />
              <div className="absolute -top-32 -right-24 size-[420px] rounded-full bg-accent/15 blur-[90px]" />
            </div>

            <p className="flex items-center gap-3 font-mono text-xs text-subtle">
              <span className="text-accent">§04</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="tracking-[0.2em] uppercase">{c.label}</span>
            </p>

            <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-fg">
              {rich(c.title, "font-serif font-normal text-accent italic")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted">{c.body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${links.email}`} icon="none">
                <Mail className="size-4" />
                {c.email}
              </ButtonLink>
              <CopyButton text={links.email} copiedLabel={t.ui.copied}>
                <Copy className="size-3.5" />
                {links.email}
              </CopyButton>
              <ButtonLink href={links.github} variant="secondary" external icon="external">
                <GitHub className="size-4" />
                GitHub
              </ButtonLink>
              {links.linkedin ? (
                <ButtonLink href={links.linkedin} variant="secondary" external icon="external">
                  <LinkedIn className="size-4" />
                  LinkedIn
                </ButtonLink>
              ) : null}
              {c.resumeHref ? (
                <ButtonLink href={c.resumeHref} variant="secondary" external icon="external">
                  <FileText className="size-4" />
                  {c.resume}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
