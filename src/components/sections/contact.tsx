import { site } from "@/content/site";
import { Copy, FileText, GitHub, LinkedIn, Mail } from "../ui/icons";
import { CopyButton } from "../ui/interactive";
import { ButtonLink, Container } from "../ui/primitives";
import { Reveal } from "../ui/reveal";

export function Contact() {
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
              <span className="tracking-[0.2em] uppercase">Contact</span>
            </p>

            <h2 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-fg">
              Let’s build systems people can <em className="font-serif font-normal text-accent italic">check</em>.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted">
              Open to conversations about software engineering and enterprise AI roles, internships and research
              collaborations. I reply in English or Spanish.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${site.email}`} icon="none">
                <Mail className="size-4" />
                Email me
              </ButtonLink>
              <CopyButton text={site.email}>
                <Copy className="size-3.5" />
                {site.email}
              </CopyButton>
              <ButtonLink href={site.github} variant="secondary" external icon="external">
                <GitHub className="size-4" />
                GitHub
              </ButtonLink>
              {site.linkedin ? (
                <ButtonLink href={site.linkedin} variant="secondary" external icon="external">
                  <LinkedIn className="size-4" />
                  LinkedIn
                </ButtonLink>
              ) : null}
              {site.resume ? (
                <ButtonLink href={site.resume} variant="secondary" external icon="external">
                  <FileText className="size-4" />
                  Résumé (PDF)
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
