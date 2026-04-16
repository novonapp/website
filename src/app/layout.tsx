import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { SITE_CONFIG } from "@/config/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title || "Novon | Open-source Novel Reader",
    template: `%s | Novon`,
  },
  description: SITE_CONFIG.description,
  keywords: ["novon", "novel reader", "open source", "light novel", "web novel", "flutter", "reading app"],
  authors: [{ name: "Novon Contributors" }],
  creator: "Novon team",
  publisher: "Novon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: "Novon Documentation",
    title: "Novon | Open-source Novel Reader",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Novon Documentation Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novon | Open-source Novel Reader",
    description: SITE_CONFIG.description,
    images: ["/banner.png"],
    creator: "@novonapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <Script id="app-vh" strategy="beforeInteractive">
          {`
(function () {
  function setAppVh() {

    var h = window.innerHeight;
    document.documentElement.style.setProperty('--app-vh', h + 'px');
  }
  setAppVh();
  window.addEventListener('resize', setAppVh);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setAppVh);
  }
})();
          `}
        </Script>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
