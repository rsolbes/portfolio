import { site } from "@/content/site";
import { ArrowUp } from "./ui/icons";
import { Container } from "./ui/primitives";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 font-mono text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <p className="text-fg-soft">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p>Set in Geist, Geist Mono and Newsreader. Built with Next.js, Tailwind CSS and Motion.</p>
        </div>
        <a
          href="#top"
          className="lift-sm group inline-flex w-fit items-center gap-2 rounded-full border border-line px-3.5 py-2 text-muted hover:text-fg"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5" />
        </a>
      </Container>
    </footer>
  );
}
