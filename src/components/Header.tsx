'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, X, Search, ChevronDown, Plus } from 'lucide-react';

import { useState, useEffect } from 'react';
import { sidebarData } from '@/lib/docs-data';
import SearchModal from './SearchModal';

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const DiscordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M7.5 7.143c.135-.2.433-.451.684-.571.21-.101.44-.143.682-.143.66 0 1.2.537 1.2 1.2v.333c0 .663-.54 1.2-1.2 1.2-.24 0-.47-.042-.682-.143a1.442 1.442 0 0 0-.684-.571M16.5 7.143c-.135-.2-.433-.451-.684-.571a1.432 1.432 0 0 0-.682-.143c-.66 0-1.2.537-1.2 1.2v.333c0 .663.54 1.2 1.2 1.2.24 0 .47-.042.682-.143.25-.12.55-.371.684-.571" />
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.411 2.865 8.151 6.839 9.447.118.02.26.04.26.24v2.313c0 .341.332.54.619.352l3.203-2.002a.65.65 0 0 1 .344-.1l.345.003c.125 0 .248-.016.368-.046h.022C18.406 20.941 22 16.891 22 12z" />
  </svg>
);
const TwitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const RedditIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M17 11.5a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" /><path d="M8.5 11.5a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5 1.5 1.5 0 0 0-1.5 1.5z" /><path d="M12 17c-2 0-3-1-3-1s1-1 3-1 3 1 3 1-1 1-3 1z" /><path d="M12 7c1 0 2 1 2 1s-1 1-2 1-2-1-2-1 1-1 2-1z" /></svg>
);

const CustomMenuIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7H19" stroke="#e1e1e6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 12H19" stroke="#e1e1e6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 17H19" stroke="#e1e1e6" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <Link href="/" className="header-logo">
              <img src="/logo.png" alt="" width={36} height={36} />
              <span className="header-logo-text">Novon</span>
            </Link>

            <button 
              type="button" 
              className="header-search-box" 
              aria-label="Search (Ctrl+K)"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={15} strokeWidth={2} className="header-search-icon" />
              <span className="header-search-label">Search</span>
              <kbd className="header-search-kbd">Ctrl K</kbd>
            </button>

          </div>

          <div className="header-right">
            <nav className="header-nav" aria-label="Main">
              <details className="nav-version-dropdown">
                <summary className="nav-version-summary">
                  <span>Get v1.0.0</span>
                  <ChevronDown size={14} strokeWidth={2.5} className="nav-version-chevron" />
                </summary>
                <div className="nav-version-panel">
                  <Link href="/download">Download</Link>
                  <a
                    href="https://github.com/novon-app/novon/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Releases
                  </a>
                </div>
              </details>
              <Link
                href="/docs/guides/getting-started"
                className={pathname.startsWith('/docs') ? 'active' : ''}
              >
                Docs
              </Link>
              <Link href="/news" className={pathname === '/news' ? 'active' : ''}>
                News
              </Link>
            </nav>

            <div className="header-actions">

              <div className="social-links" aria-label="Social">
                <a href="https://github.com/novon-app/novon" target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                </a>
                <a href="https://discord.gg/novon" target="_blank" rel="noopener noreferrer">
                  <DiscordIcon />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <TwitterIcon />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
                  <RedditIcon />
                </a>
              </div>
            </div>

            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <CustomMenuIcon size={22} />}
            </button>

          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            <Link href="/" className="header-logo" onClick={() => setMobileOpen(false)}>
              <img src="/logo.png" alt="" width={24} height={24} />
              <span className="header-logo-text">Novon</span>
            </Link>
            <div className="mobile-drawer-actions">
              <button 
                aria-label="Search" 
                className="mobile-drawer-btn"
                onClick={() => {
                  setMobileOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <Search size={22} />
              </button>

              <button aria-label="Close" className="mobile-drawer-btn" onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="mobile-drawer-content">
            <Link href="/download" className="mobile-version-card" onClick={() => setMobileOpen(false)}>
              <span>Get v1.0.0</span>
              <Plus size={18} />
            </Link>

            <nav className="mobile-drawer-nav">
              <Link href="/docs/guides/getting-started" onClick={() => setMobileOpen(false)}>Docs</Link>
              <Link href="/news" onClick={() => setMobileOpen(false)}>News</Link>
            </nav>

            <div className="mobile-drawer-spacer" />

            <div className="mobile-drawer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><GithubIcon /></a>
              <a href="https://discord.gg/novon" target="_blank" rel="noopener noreferrer"><DiscordIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer"><RedditIcon /></a>
            </div>
          </div>
        </div>
      )}

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
