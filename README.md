# Rodrigo Solbes · Portfolio

Personal site for Software & AI engineering work. Next.js 16 (App Router), Tailwind CSS v4 and Motion, statically prerendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
```

## Languages

English is served at `/` and Spanish at `/es` (`src/app/[lang]`). `/en` redirects to `/`. Each page sets its own `<html lang>` and links to the other through `hreflang` alternates and the sitemap. The switch in the header keeps the reader at the same section.

## Editing content

All copy lives in `src/content/`, so text changes never touch components.

| File | What it holds |
|---|---|
| `en.ts` | Every English string on the page |
| `es.ts` | Every Spanish string. Must match `en.ts` field for field; a missing translation fails the build |
| `shared.ts` | Language-neutral data: links (set LinkedIn to `null` to hide its button), credential URLs, thesis figures |
| `structured-data.ts` | schema.org `Person` JSON-LD built from the dictionaries, for search engines and AI readers |

In copy, `*text*` renders as emphasis where a component supports it (hero tagline, contact heading, deep-dive notes).

To mark a thesis pipeline stage as done, change its `status` to `"built"` in both `en.ts` and `es.ts`. To add a certification, add it to `certifications` in both files. Each language links its own CV (`contact.resumeHref`): `public/Rodrigo-Solbes-CV.pdf` for English and `public/Rodrigo-Solbes-CV-ES.pdf` for Spanish. Replace a file to update it; keep the public versions free of the phone number.

The thesis numbers come from the thesis repository's own logs (`docs/bitacora_*.md`, `docs/pruebas_seguridad.md`, `experiments/salidas/conjunto_evaluacion.md`). Update them when those logs change.

## Design system

Tokens are CSS variables in `src/app/globals.css`, switched by `<html data-theme>`:

- **Dark (default):** deep slate `#0a0f1a` with azure `#3d9dff`.
- **Light:** white-paper `#ffffff` with azure `#0061df`.
- Text tokens `fg`, `fg-soft`, `muted` and `subtle` all meet WCAG AA (≥ 4.5:1) on both background and surface.
- Type: Geist (UI), Geist Mono (metadata, tags, figures), Newsreader italic (leads, abstract, academic touches).

Interaction primitives:

- `.lift` / `.lift-sm`: slow (650 ms) elevation with soft shadow and scale, only on devices with a real hover.
- `SpotlightCard`: cursor-following light on the surface and border.
- `Reveal`, `RevealGroup`, `RevealItem`: blur-and-rise entrance when scrolled into view.
- `.enter-*`: CSS-only entrances for above-the-fold content, so the hero appears on first paint without waiting for JavaScript.
- `Tabs`, `CountUp`, `ShareBar`, theme toggle with a circular View Transition reveal.

Every animation respects `prefers-reduced-motion`. Automated browsers (`navigator.webdriver`) skip the scroll-triggered entrances so content is never left invisible to tools that don't scroll.

## Deploying

Any static-capable Next.js host works. On Vercel: import the repository, keep the defaults, deploy.
