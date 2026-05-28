import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getThemeCssBlock } from "@/color";
import { getFontCssBlock } from "@/font";
import { appConfig } from "@/config";
import { DEFAULT_AVATAR_SRC } from "@/avatar";
import { defaultResume } from "@/resume";
import { buildPersonJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // khớp fonts.sans.variable trong src/font.ts
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains", // khớp fonts.mono.variable trong src/font.ts
  display: "swap",
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
  metadataBase: new URL(appConfig.siteUrl),
  openGraph: {
    title: appConfig.title,
    description: appConfig.description,
    type: "website",
    url: appConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.title,
    description: appConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: DEFAULT_AVATAR_SRC,
    shortcut: DEFAULT_AVATAR_SRC,
    apple: DEFAULT_AVATAR_SRC,
  },
};

const personJsonLd = buildPersonJsonLd({
  name: defaultResume.personal.fullName,
  jobTitle: defaultResume.personal.title,
  email: defaultResume.personal.contact.email || undefined,
  url:
    defaultResume.personal.contact.github ||
    defaultResume.personal.contact.portfolio,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultResume.meta.locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${getThemeCssBlock()}\n${getFontCssBlock()}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
