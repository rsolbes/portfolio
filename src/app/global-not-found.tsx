import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "404 · Rodrigo Solbes",
};

// Bypasses the [lang] layout, so it applies the saved theme itself.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grid min-h-dvh place-items-center bg-bg px-6 font-sans text-fg antialiased">
        <main className="max-w-md text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">This page doesn’t exist.</h1>
          <p className="mt-2 text-muted">Esta página no existe.</p>
          <div className="mt-8 flex justify-center gap-3 text-sm">
            <a href="/" className="lift-sm rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast">
              Home
            </a>
            <a href="/es" className="lift-sm rounded-full border border-line-strong px-5 py-2.5 font-medium">
              Inicio
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
