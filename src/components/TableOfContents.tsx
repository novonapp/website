'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  level: number;
  text: string;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {

    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.doc-content h2, .doc-content h3'));
      const items = elements.map((el) => {
        const id = el.id || el.textContent!.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        el.id = id;

        if (!el.querySelector('.anchor-hash')) {
          const a = document.createElement('a');
          a.className = 'anchor-hash';
          a.href = `#${id}`;
          a.textContent = '#';
          el.appendChild(a);
        }

        return {
          id,
          text: (el.textContent || '').replace('#', '').trim(),
          level: Number(el.tagName.charAt(1)),
        };
      });
      setHeadings(items);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '0px 0px -80% 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="toc">
      <div className="toc-title">On this page</div>
      <nav>
        {headings.map((h, i) => (
          <a
            key={`${h.id}-${i}`}
            href={`#${h.id}`}
            className={`toc-link depth-${h.level} ${activeId === h.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(h.id);
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
