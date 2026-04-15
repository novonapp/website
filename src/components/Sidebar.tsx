'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarData } from '@/lib/docs-data';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      {sidebarData.map(group => (
        <div key={group.title} className="sidebar-group">
          <div className="sidebar-group-title">{group.title}</div>
          {group.links.map(link => (
            <Link key={link.href} href={link.href}
              className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}>
              {link.title}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
