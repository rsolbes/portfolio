# Rodrigo Solbes · Portfolio

Personal site for Software & AI engineering work. Next.js 16 (App Router), Tailwind CSS v4 and Motion, statically prerendered.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
```

## Editing content

All copy lives in `src/content/`, so text changes never touch components.

| File | What it holds |
|---|---|
| `site.ts` | Name, email, GitHub, LinkedIn, résumé path (set any link to `null` to hide its button) |
| `thesis.ts` | Featured case study: metrics, pipeline stages and their build status, deep-dive tables |
| `projects.ts` | Other case studies (problem / architecture / deployment) and the "Also on GitHub" row |
| `experience.ts` | Timeline, recognition, certifications (with verification links), capabilities |

To mark a pipeline stage as done, change its `status` in `thesis.ts` to `"built"`. To add a certification, append to `certifications` with `status: "earned"`, a `date` and an optional `href`. The résumé is served from `public/Rodrigo-Solbes-CV.pdf`; replace that file to update it.

The thesis numbers come from the thesis repository's own logs (`docs/bitacora_*.md`, `docs/pruebas_seguridad.md`, `experiments/salidas/conjunto_evaluacion.md`). Update them here when those logs change.

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

Every animation respects `prefers-reduced-motion`.

## Deploying

Any static-capable Next.js host works. On Vercel: import the repository, keep the defaults, deploy.
