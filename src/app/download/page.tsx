import { Smartphone, Monitor, Apple, Cpu, ShieldCheck, Code, Wrench } from 'lucide-react';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site-config';
import { getLatestRelease } from '@/lib/github';

export const metadata: Metadata = { 
  title: 'Download | Novon', 
  description: 'Download Novon for Android. Windows, macOS, and Linux require manual building.' 
};

export default async function DownloadPage() {
  const latestRelease = await getLatestRelease();
  let apkDownloadUrl = SITE_CONFIG.links.latestApk || '#';
  
  if (latestRelease && latestRelease.assets && latestRelease.assets.length > 0) {
    const apkAsset = latestRelease.assets.find((a: any) => a.name.endsWith('.apk'));
    if (apkAsset) {
      apkDownloadUrl = apkAsset.browser_download_url;
    } else {
      apkDownloadUrl = `https://github.com/novonapp/novon/releases/tag/${latestRelease.tag_name}`;
    }
  }

  const releases = [
    {
      platform: 'Android',
      icon: <Smartphone size={18} />,
      title: 'Novon for Android',
      description: 'The definitive mobile experience. Full source support and hardware-accelerated reading.',
      requirement: 'Android 8.0+',
      link: apkDownloadUrl,
      action: 'Download APK',
      primary: true
    },
    {
      platform: 'Windows',
      icon: <Monitor size={18} />,
      title: 'Novon for Windows',
      description: 'Native desktop application with multi-window support. Built manually from source code.',
      requirement: 'Windows 10/11 x64',
      link: '#',
      action: 'Manual Build',
      isDisabled: true
    },
    {
      platform: 'macOS',
      icon: <Apple size={18} />,
      title: 'Novon for macOS',
      description: 'Optimized for Apple Silicon. Smooth scrolling and native menus. Built manually from source code.',
      requirement: 'macOS Monterey+',
      link: '#',
      action: 'Manual Build',
      isDisabled: true
    },
    {
      platform: 'Linux',
      icon: <Cpu size={18} />,
      title: 'Novon for Linux',
      description: 'Universal AppImage build compatible with most modern distributions. Built manually from source code.',
      requirement: 'glibc 2.31+',
      link: '#',
      action: 'Manual Build',
      isDisabled: true
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
                target={item.isDisabled ? undefined : "_blank"} 
                rel={item.isDisabled ? undefined : "noopener"} 
                className={`btn ${item.primary ? 'btn-primary' : 'btn-secondary'}`}
                style={item.isDisabled ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                aria-disabled={item.isDisabled}
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
          margin: '40px auto 0'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-1)' }}>
            <Wrench size={20} style={{ marginRight: 8, verticalAlign: 'text-bottom', color: 'var(--brand)' }} />
            Other Platforms (Manual Build)
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.6', margin: 0 }}>
            Currently, we only provide pre-compiled binaries for Android. However, Novon is built with Flutter and supports cross-platform compilation. If you wish to use Novon on Windows, macOS, or Linux, you can manually build the application from the source code.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://docs.flutter.dev/get-started/build-web" target="_blank" rel="noopener noreferrer" className="sidebar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0', background: 'none' }}>
              <Code size={16} />
              View Build Instructions
            </a>
            <a href={SITE_CONFIG.links.github || '#'} target="_blank" rel="noopener noreferrer" className="sidebar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0', background: 'none' }}>
              <ShieldCheck size={16} />
              Source Code on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
