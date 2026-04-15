export interface SidebarLink {
  title: string;
  href: string;
}

export interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}

export const sidebarData: SidebarGroup[] = [
  {
    title: 'General',
    links: [
      { title: 'Getting started', href: '/docs/guides/getting-started' },
      { title: 'Download', href: '/download' },
      { title: 'Changelogs', href: '/docs/general/changelogs' },
      { title: 'Contribute', href: '/docs/general/contribute' },
    ],
  },
  {
    title: 'Frequently Asked Questions',
    links: [
      { title: 'General', href: '/docs/faq/general' },
      { title: 'Library', href: '/docs/faq/library' },
      { title: 'Extensions', href: '/docs/faq/extensions' },
      { title: 'Reader', href: '/docs/faq/reader' },
      { title: 'Downloads', href: '/docs/faq/downloads' },
      { title: 'Settings & Storage', href: '/docs/faq/settings' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { title: 'Extension system', href: '/docs/guides/extension-system' },
      { title: 'Creating extensions', href: '/docs/guides/creating-extensions' },
      { title: 'Extension repositories', href: '/docs/guides/extension-repositories' },
      { title: 'Bundling extensions', href: '/docs/guides/bundling-extensions' },
      { title: 'Source structure', href: '/docs/guides/source-structure' },
      { title: 'Backup & restore', href: '/docs/guides/backup-restore' },
      { title: 'Tracking', href: '/docs/guides/tracking' },
      { title: 'Network & User-Agent', href: '/docs/guides/network' },
      { title: 'Categories', href: '/docs/guides/categories' },
      { title: 'Extension example', href: '/docs/guides/extension-example' },
      { title: 'Troubleshooting', href: '/docs/guides/troubleshooting' },
    ],
  },
  {
    title: 'Developer Reference',
    links: [
      { title: 'Architecture', href: '/docs/reference/architecture' },
      { title: 'Manifest reference', href: '/docs/reference/manifest' },
      { title: 'SDK API reference', href: '/docs/reference/sdk-api' },
      { title: 'Data models', href: '/docs/reference/data-models' },
      { title: 'Filter system', href: '/docs/reference/filter-system' },
      { title: 'Helper utilities', href: '/docs/reference/helpers' },
      { title: 'Sandboxing & security', href: '/docs/reference/sandboxing' },
      { title: 'Compliance tests', href: '/docs/reference/compliance' },
      { title: 'Settings reference', href: '/docs/reference/settings' },
    ],
  },
];

export function findCurrentGroup(pathname: string): { prev?: SidebarLink; next?: SidebarLink } {
  const allLinks = sidebarData.flatMap(g => g.links);
  const idx = allLinks.findIndex(l => l.href === pathname);
  return {
    prev: idx > 0 ? allLinks[idx - 1] : undefined,
    next: idx < allLinks.length - 1 ? allLinks[idx + 1] : undefined,
  };
}
