import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createHighlighter, Highlighter } from 'shiki';
import { SITE_CONFIG } from '@/config/site-config';
import { getReleases, getLatestRelease } from './github';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/docs');

let highlighter: Highlighter | null = null;
async function getShiki() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark-dimmed', 'github-light'],
      langs: ['javascript', 'typescript', 'dart', 'json', 'bash', 'yaml', 'python'],
    });
  }
  return highlighter;
}

export interface DocMeta {
  title: string;
  description?: string;
}

export interface DocContent {
  meta: DocMeta;
  content: string;
  slug: string[];
}

export async function getDocBySlug(slug: string[]): Promise<DocContent | null> {
  const relPath = slug.join('/') + '.mdx';
  const fullPath = path.join(CONTENT_DIR, relPath);

  if (slug.join('/') === 'general/changelogs') {
    const releases = await getReleases();
    let content = ``;
    if (!releases || releases.length === 0) {
      content = `No releases found or unable to fetch from GitHub.\n`;
    } else {
      releases.forEach((r: any) => {
        content += `## ${r.name || r.tag_name}\n`;
        content += `* **Published**: ${new Date(r.published_at).toLocaleDateString()}\n`;
        content += `* **Tag**: \`${r.tag_name}\`\n\n`;
        content += `${r.body}\n\n`;
        content += `---\n\n`;
      });
    }

    return {
      meta: { title: 'Changelogs', description: 'History of Novon releases fetched dynamically from GitHub.' },
      content,
      slug,
    };
  }

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  let { data, content } = matter(fileContents);

  const latestRelease = await getLatestRelease();
  const dynamicVersion = latestRelease?.tag_name || SITE_CONFIG.version;
  const dynamicStatus = latestRelease ? (latestRelease.prerelease ? 'Beta' : 'Stable') : SITE_CONFIG.status;

  content = content
    .replaceAll('{{APP_VERSION}}', dynamicVersion)
    .replaceAll('{{API_VERSION}}', SITE_CONFIG.apiVersion)
    .replaceAll('{{APP_STATUS}}', dynamicStatus)
    .replaceAll('{{GITHUB_URL}}', SITE_CONFIG.links.github || '')
    .replaceAll('{{DOWNLOAD_URL}}', SITE_CONFIG.links.latestApk || '');

  return {
    meta: data as DocMeta,
    content,
    slug,
  };
}

export async function highlightCode(code: string, lang: string) {
  const h = await getShiki();
  try {
    const htmlDark = h.codeToHtml(code, { lang, theme: 'github-dark-dimmed' });
    const htmlLight = h.codeToHtml(code, { lang, theme: 'github-light' });

    return htmlDark;
  } catch (e) {
    return `<pre><code>${code}</code></pre>`;
  }
}
