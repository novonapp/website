import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a href="https://github.com/novonapp/novon" target="_blank" rel="noopener">GitHub</a>
          <a href="https://discord.gg/novon" target="_blank" rel="noopener">Discord</a>
          <a href="/docs/guides/getting-started">Documentation</a>
          <a href="/docs/general/contribute">Contribute</a>
        </div>
        <p>Released under the Apache 2.0 License.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          Made with <Heart size={13} style={{ color: '#ef4444' }} /> by the Novon Contributors
        </p>
      </div>
    </footer>
  );
}
