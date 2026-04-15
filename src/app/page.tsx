import { RefreshCw, SlidersHorizontal, Puzzle } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="home-landing">
      <div className="hero-viewport">
        <section className="hero-container">
          <div className="hero-text animate-fade-in">
            <h1 className="hero-heading">
              <span className="hero-brand">Novon</span>
              <span className="hero-tagline">Full-featured reader</span>
            </h1>
            <p className="hero-lead">
              Discover and read manga, webtoons, comics, and more – easier than ever on your
              Android device.
            </p>
            <div className="hero-actions">
              <Link href="/docs/guides/getting-started" className="btn btn-primary">
                Get started
              </Link>
              <Link href="/download" className="btn btn-secondary">
                Download
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-spotlight" aria-hidden />
            <div className="hero-app-mockup animate-fade-in">
              <div className="hero-phone-frame">
                <img src="/app_pic.png" alt="Novon app preview" className="hero-phone-img animate-float" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="features" aria-label="Features">
        <Link href="/docs/guides/tracking" className="feature-card">
          <div className="feature-icon-box feature-icon-box--tracking">
            <RefreshCw size={22} strokeWidth={2.25} />
          </div>
          <h3>Tracking</h3>
          <p>
            Automatically keep track of your series with MyAnimeList, AniList, Kitsu, and
            more.
          </p>
          <span className="feature-link">
            Setup tracking -&gt;
          </span>
        </Link>

        <Link href="/docs/reference/settings" className="feature-card">
          <div className="feature-icon-box feature-icon-box--customization">
            <SlidersHorizontal size={22} strokeWidth={2.25} />
          </div>
          <h3>Customization</h3>
          <p>
            Make it yours with multiple reading modes, custom color filters, and many other
            settings.
          </p>
          <span className="feature-link">
            Get started -&gt;
          </span>
        </Link>

        <Link href="/docs/guides/extension-system" className="feature-card">
          <div className="feature-icon-box feature-icon-box--extensions">
            <Puzzle size={22} strokeWidth={2.25} />
          </div>
          <h3>Extensions</h3>
          <p>Bring your own content from a variety of sources.</p>
          <span className="feature-link">
            Learn more -&gt;
          </span>
        </Link>

      </section>

      <Footer />
    </main>
  );
}
