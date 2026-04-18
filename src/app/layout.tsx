import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { SITE_CONFIG } from "@/config/site-config";
import { getLatestRelease } from "@/lib/github";

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
        url: "/banner.jpg",
        width: 1129,
        height: 630,
        alt: "Novon Documentation Banner",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novon | Open-source Novel Reader",
    description: SITE_CONFIG.description,
    images: ["/banner.jpg"],
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
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const release = await getLatestRelease();
  let version = release?.tag_name || SITE_CONFIG.version;
  if (version.startsWith('v')) version = version.substring(1);
  
  let status = SITE_CONFIG.status;
  if (release) {
    if (release.tag_name.toLowerCase().includes('alpha')) status = 'Alpha';
    else if (release.tag_name.toLowerCase().includes('beta') || release.prerelease) status = 'Beta';
    else status = 'Stable';
  }

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
          <Header appVersion={version} appStatus={status} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
