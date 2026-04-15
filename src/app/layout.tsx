import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Novon | Open-source Novel Reader",
  description: "Discover and read novels from hundreds of sources — all in one place, offline-first. Built with Flutter.",
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
