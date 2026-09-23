"use client";

import type { MouseEvent } from "react";
import { Moon, Sun } from "./ui/icons";

type ViewTransitionDoc = {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Switches between dark (default) and light themes. Where the View
 * Transitions API exists, the new theme expands as a circle from the button;
 * otherwise colours cross-fade.
 */
export function ThemeToggle() {
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";

    const apply = () => {
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage unavailable (private mode): the choice lasts for this page view.
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = (document as unknown as ViewTransitionDoc).startViewTransition;

    if (!start || reduce) {
      root.classList.add("theme-transition");
      apply();
      window.setTimeout(() => root.classList.remove("theme-transition"), 500);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = start.call(document, apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 750,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="lift-sm group relative grid size-9 place-items-center rounded-full border border-line bg-surface/80 text-muted hover:text-fg"
    >
      <Sun className="col-start-1 row-start-1 size-[17px] scale-50 rotate-90 opacity-0 transition-all duration-700 ease-soft dark:scale-100 dark:rotate-0 dark:opacity-100" />
      <Moon className="col-start-1 row-start-1 size-[16px] scale-100 rotate-0 opacity-100 transition-all duration-700 ease-soft dark:scale-50 dark:-rotate-90 dark:opacity-0" />
    </button>
  );
}
