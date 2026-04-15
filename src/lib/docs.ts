import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createHighlighter, Highlighter } from 'shiki';

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

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

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
