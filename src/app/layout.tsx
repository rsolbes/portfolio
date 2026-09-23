import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  keywords: ["Software Engineering", "Enterprise AI", "Text-to-SQL", "RAG", "PostgreSQL", ".NET", "Tampico"],
  openGraph: {
    type: "website",
    title: `${site.name} · ${site.role}`,
    description: site.description,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark light",
};

// Runs before first paint so the page never flashes the wrong theme.
// Dark is the default; a saved choice wins.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain bg-bg font-sans text-fg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
