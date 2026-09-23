import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { getDictionary } from "@/content";
import { hasLocale, localePath, locales, siteUrl } from "@/i18n/config";
import "../globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

// Only the locales we ship; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: t.site.name, url: siteUrl }],
    keywords: ["Software Engineering", "Enterprise AI", "Text-to-SQL", "RAG", "LightGBM", ".NET", "Tampico"],
    alternates: {
      canonical: localePath(lang),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l)])),
        "x-default": "/",
      },
    },
    icons: { icon: "/icon.svg" },
    openGraph: {
      type: "website",
      url: localePath(lang),
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
      siteName: t.site.name,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
  colorScheme: "dark light",
};

// Runs before first paint so the page never flashes the wrong theme.
// Dark is the default; a saved choice wins.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){}})();`;

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
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
