import type { ReactNode } from "react";

/** Renders copy with light markup: *text* becomes <em>. */
export function rich(text: string, emClassName?: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
        <em key={i} className={emClassName}>
          {part.slice(1, -1)}
        </em>
      ) : (
        part
      ),
    );
}
