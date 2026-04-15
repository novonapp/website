'use client';
import { useState } from 'react';
import { 
  Copy, Check, Lightbulb, AlertTriangle, Octagon, Info, 
  Settings, Code, Zap, Download, BookOpen, Database, Layout, 
  RefreshCw, Search, History, Library, Shield
} from 'lucide-react';

const IconsMap: Record<string, React.FC<any>> = {
  Lightbulb, AlertTriangle, Octagon, Info, Settings, Code, Zap, 
  Download, BookOpen, Database, Layout, RefreshCw, 
  Search, History, Library, Shield
};

export function Icon({ name, size = 18, className = '' }: { name: string, size?: number, className?: string }) {
  const LucideIcon = IconsMap[name];
  if (!LucideIcon) return <span>[{name}]</span>;
  return <LucideIcon size={size} className={className} style={{ 
    display: 'inline-block', 
    verticalAlign: 'middle', 
    marginTop: '-0.2em',
    marginRight: '0.3em' 
  }} />;
}

export function CodeBlock({ children, html, lang, title }: { children?: React.ReactNode, html?: string, lang?: string, title?: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {

    let text = '';
    if (typeof children === 'string') {
      text = children;
    } else if (html) {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      text = temp.textContent || '';
    }
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span>{title || lang || 'Code'}</span>
        <button className="code-copy-btn" onClick={copyToClipboard} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre><code className={`language-${lang || 'text'}`}>{children}</code></pre>
      )}
    </div>
  );
}

export function Callout({ type = 'info', title, children }: { type?: 'tip' | 'warning' | 'danger' | 'info', title?: string, children: React.ReactNode }) {
  const defaultTitles = {
    tip: <><Lightbulb size={18} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle', marginTop: '-0.2em' }} /> Tip</>,
    warning: <><AlertTriangle size={18} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle', marginTop: '-0.2em' }} /> Warning</>,
    danger: <><Octagon size={18} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle', marginTop: '-0.2em' }} /> Danger</>,
    info: <><Info size={18} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle', marginTop: '-0.2em' }} /> Info</>,
  };

  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-title">{title || defaultTitles[type]}</div>
      <div>{children}</div>
    </div>
  );
}

export function Tabs({ tabs, children }: { tabs: string[], children: React.ReactNode[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tab-btn ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[active]}
      </div>
    </div>
  );
}
