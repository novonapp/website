import { Smartphone, Monitor, Apple, Cpu, ShieldCheck, Code } from 'lucide-react';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { 
  title: 'Download | Novon', 
  description: 'Download Novon for Android, Windows, macOS, and Linux.' 
};

export default function DownloadPage() {
  const releases = [
    {
      platform: 'Android',
      icon: <Smartphone size={18} />,
      title: 'Novon for Android',
      description: 'The definitive mobile experience. Full source support and hardware-accelerated reading.',
      requirement: 'Android 8.0+',
      link: 'https://github.com/novon-app/novon/releases/latest',
      action: 'Download APK',
      primary: true
    },
    {
      platform: 'Windows',
      icon: <Monitor size={18} />,
      title: 'Novon for Windows',
      description: 'Native desktop application with multi-window support and keyboard navigation.',
      requirement: 'Windows 10/11 x64',
      link: 'https://github.com/novon-app/novon/releases/latest',
      action: 'Download EXE'
    },
    {
      platform: 'macOS',
      icon: <Apple size={18} />,
      title: 'Novon for macOS',
      description: 'Optimized for Apple Silicon and Intel Macs. Smooth scrolling and native menus.',
      requirement: 'macOS Monterey+',
      link: 'https://github.com/novon-app/novon/releases/latest',
      action: 'Download DMG'
    },
    {
      platform: 'Linux',
      icon: <Cpu size={18} />,
      title: 'Novon for Linux',
      description: 'Universal AppImage build compatible with most modern distributions.',
      requirement: 'glibc 2.31+',
      link: 'https://github.com/novon-app/novon/releases/latest',
      action: 'Download AppImage'
    }
  ];

  return (
    <>
      <main className="download-section">
        <h1>Downloads</h1>
        <p>
          Novon is cross-platform and open source. 
          Choose your binary below to get started.
        </p>

        <div className="download-grid">
          {releases.map((item) => (
            <div key={item.platform} className="download-card-clean">
              <div className="platform-badge">
                {item.icon}
                {item.platform}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              
              <div style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px' }}>
                System Requirement: <strong>{item.requirement}</strong>
              </div>

              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener" 
                className={`btn ${item.primary ? 'btn-primary' : 'btn-secondary'}`}
              >
                {item.action}
              </a>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'left', 
          padding: '40px', 
          background: 'var(--bg-soft)', 
          borderRadius: '12px', 
          border: '1px solid var(--divider)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-1)' }}>
            <ShieldCheck size={20} style={{ marginRight: 8, verticalAlign: 'text-bottom', color: 'var(--brand)' }} />
            Build Integrity & Security
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.6', margin: 0 }}>
            Every Novon release is cryptographically signed and published via GitHub Releases. 
            We do not host binaries on third-party mirrors. For maximum security, we recommend 
            verifying the SHA-256 hash of your downloaded file against the official release notes.
          </p>
          <div style={{ marginTop: '24px' }}>
            <a href="https://github.com/novon-app/novon" className="sidebar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0', background: 'none' }}>
              <Code size={16} />
              View Source on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
