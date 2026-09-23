"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useState, type CSSProperties, type PointerEvent } from "react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// The thesis warehouse: one fact table, twelve conformed dimensions.
// Row counts from docs/bitacora_carga.md. Order places long names where
// there is room for them (top, bottom, and near the vertical axis).
const DIMS = [
  { name: "programa_presupuestario", rows: 901, note: "Budget program" },
  { name: "unidad_responsable", rows: 1926, note: "Responsible unit within a branch" },
  { name: "ramo", rows: 50, note: "Administrative branch: ministry or agency" },
  { name: "partida", rows: 459, note: "Object-of-expenditure line item" },
  { name: "modalidad", rows: 23, note: "Program modality, by letter code" },
  { name: "entidad_federativa", rows: 34, note: "State: geographic classification" },
  { name: "actividad_institucional", rows: 375, note: "Institutional activity" },
  { name: "fuente_financiamiento", rows: 6, note: "Funding source" },
  { name: "finalidad", rows: 4, note: "Functional classification, level 1" },
  { name: "funcion", rows: 28, note: "Functional classification, level 2" },
  { name: "subfuncion", rows: 91, note: "Functional classification, level 3" },
  { name: "tipo_gasto", rows: 9, note: "Type of expenditure" },
];

const CX = 280;
const CY = 250;
const RX = 150;
const RY = 172;

// Server and browser can disagree in the last digit of Math.sin/cos, which
// breaks hydration; rounding keeps the SVG attributes identical on both.
const round = (n: number) => Math.round(n * 100) / 100;

const nodes = DIMS.map((d, i) => {
  const angle = ((-90 + i * 30) * Math.PI) / 180;
  const x = round(CX + RX * Math.cos(angle));
  const y = round(CY + RY * Math.sin(angle));
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const side = cos > 0.2 ? "right" : cos < -0.2 ? "left" : sin < 0 ? "top" : "bottom";
  // Gentle curve toward the fact table.
  const mx = (x + CX) / 2;
  const my = (y + CY) / 2;
  const len = Math.hypot(CX - x, CY - y);
  const k = 20;
  const qx = mx + (-(CY - y) / len) * k;
  const qy = my + ((CX - x) / len) * k;
  const path = `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${CX} ${CY}`;
  return { ...d, x, y, side, path };
});

// Edges that carry an animated "join" pulse, with staggered timing.
const PULSES = [
  { i: 2, dur: 4.2, begin: 1.4 },
  { i: 5, dur: 5.1, begin: 2.2 },
  { i: 9, dur: 4.6, begin: 3.0 },
  { i: 0, dur: 5.6, begin: 3.8 },
  { i: 7, dur: 4.9, begin: 4.5 },
  { i: 3, dur: 5.3, begin: 5.2 },
];

function labelProps(side: string, x: number, y: number) {
  switch (side) {
    case "right":
      return { name: { x: x + 11, y: y - 1, anchor: "start" }, rows: { x: x + 11, y: y + 12, anchor: "start" } };
    case "left":
      return { name: { x: x - 11, y: y - 1, anchor: "end" }, rows: { x: x - 11, y: y + 12, anchor: "end" } };
    case "top":
      return { name: { x, y: y - 26, anchor: "middle" }, rows: { x, y: y - 13, anchor: "middle" } };
    default:
      return { name: { x, y: y + 22, anchor: "middle" }, rows: { x, y: y + 35, anchor: "middle" } };
  }
}

export function SchemaFigure() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 90, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 90, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    setActive(null);
  };

  const activeNode = active === null ? null : nodes[active];

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="[perspective:1400px]">
      <motion.figure
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl border border-line bg-elevated/70 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
          <span>
            schema <span className="text-fg-soft">presupuesto</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            loaded · reconciled
          </span>
        </div>

        <svg
          viewBox="0 0 560 500"
          className="block h-auto w-full select-none"
          role="img"
          aria-labelledby="schema-title schema-desc"
        >
          <title id="schema-title">Star schema of the Mexican federal budget warehouse</title>
          <desc id="schema-desc">
            A central fact table, hecho_gasto, with 1,285,233 rows, joined to twelve dimension tables.
          </desc>

          <defs>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Slow orbits give the figure a quiet sense of motion. */}
          <g aria-hidden>
            <circle
              className="orbit"
              cx={CX}
              cy={CY}
              r={214}
              fill="none"
              stroke="var(--line-strong)"
              strokeDasharray="1 7"
            />
            <circle
              className="orbit orbit-reverse"
              cx={CX}
              cy={CY}
              r={96}
              fill="none"
              stroke="var(--line-strong)"
              strokeDasharray="2 10"
            />
            <circle cx={CX} cy={CY} r={120} fill="url(#core-glow)" />
          </g>

          {/* Edges */}
          <g fill="none">
            {nodes.map((n, i) => {
              const on = active === i;
              return (
                <path
                  key={n.name}
                  d={n.path}
                  pathLength={1}
                  className="enter-draw"
                  stroke={on ? "var(--accent)" : "var(--line-strong)"}
                  strokeWidth={on ? 1.6 : 1}
                  style={{
                    ...delay(600 + i * 50),
                    opacity: active === null || on ? 1 : 0.45,
                    transition: "opacity 500ms var(--ease-soft), stroke 400ms",
                  }}
                />
              );
            })}
          </g>

          {/* Join pulses travel from each dimension into the fact table. */}
          {!reduce ? (
            <g aria-hidden>
              {PULSES.map(({ i, dur, begin }) => (
                <circle key={i} r={2.4} fill="var(--accent)" opacity={0}>
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                    path={nodes[i].path}
                    keyPoints="0;1;1"
                    keyTimes="0;0.55;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0;0"
                    keyTimes="0;0.08;0.48;0.56;1"
                    dur={`${dur}s`}
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          ) : null}

          {/* Dimension nodes */}
          {nodes.map((n, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            const l = labelProps(n.side, n.x, n.y);
            return (
              // Outer group runs the CSS entrance; inner group handles hover dimming.
              <g key={n.name} className="enter-fade" style={delay(900 + i * 50)}>
                <g
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`dim_${n.name}: ${n.rows.toLocaleString("en-US")} rows. ${n.note}`}
                  className="cursor-default outline-none"
                  style={{ opacity: dim ? 0.4 : 1, transition: "opacity 500ms var(--ease-soft)" }}
                >
                  <circle cx={n.x} cy={n.y} r={16} fill="transparent" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={on ? 5.5 : 4}
                    fill={on ? "var(--accent)" : "var(--bg-elevated)"}
                    stroke={on ? "var(--accent)" : "var(--subtle)"}
                    strokeWidth={1.25}
                    style={{ transition: "r 400ms var(--ease-soft), fill 400ms" }}
                  />
                  <text
                    x={l.name.x}
                    y={l.name.y}
                    textAnchor={l.name.anchor as "start" | "middle" | "end"}
                    dominantBaseline="middle"
                    className="font-mono"
                    fontSize={11}
                    fill={on ? "var(--fg)" : "var(--fg-soft)"}
                  >
                    {n.name}
                  </text>
                  <text
                    x={l.rows.x}
                    y={l.rows.y}
                    textAnchor={l.rows.anchor as "start" | "middle" | "end"}
                    dominantBaseline="middle"
                    className="font-mono"
                    fontSize={9.5}
                    fill={on ? "var(--accent)" : "var(--subtle)"}
                  >
                    {n.rows.toLocaleString("en-US")} rows
                  </text>
                </g>
              </g>
            );
          })}

          {/* Fact table */}
          <g className="enter-fade" style={delay(500)}>
            <rect
              x={CX - 78}
              y={CY - 28}
              width={156}
              height={56}
              rx={10}
              fill="var(--bg-elevated)"
              stroke="var(--accent)"
              strokeOpacity={0.55}
            />
            <text x={CX} y={CY - 7} textAnchor="middle" className="font-mono" fontSize={13} fontWeight={600} fill="var(--fg)">
              hecho_gasto
            </text>
            <text x={CX} y={CY + 12} textAnchor="middle" className="font-mono" fontSize={10} fill="var(--accent)">
              1,285,233 rows
            </text>
          </g>
        </svg>

        <figcaption className="flex min-h-[3.25rem] items-center border-t border-line px-4 py-3 font-mono text-[11px] leading-relaxed text-muted">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeNode?.name ?? "caption"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {activeNode ? (
                <>
                  <span className="text-accent">dim_{activeNode.name}</span> · {activeNode.note}
                </>
              ) : (
                <>
                  <span className="text-fg-soft">Fig. 1</span> · Federal budget warehouse, 2020–2025. Twelve
                  conformed dimensions around one fact table. Hover a node.
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </figcaption>
      </motion.figure>
    </div>
  );
}
