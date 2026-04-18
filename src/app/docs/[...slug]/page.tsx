import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getDocBySlug, highlightCode } from '@/lib/docs';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents';
import { CodeBlock, Callout, Tabs, Icon } from '@/components/mdx-components';
import Link from 'next/link';
import { findCurrentGroup } from '@/lib/docs-data';
import { SITE_CONFIG } from '@/config/site-config';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return { title: 'Not Found | Novon' };
  
  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) return { title: 'Not Found | Novon' };
  return { title: `${doc.meta.title} | Novon`, description: doc.meta.description };
}

const components = {
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  p: (props: any) => <p {...props} />,
  a: (props: any) => <a {...props} target={props.href?.startsWith('http') ? '_blank' : '_self'} rel="noopener" />,
  table: (props: any) => <div className="table-wrapper"><table {...props} /></div>,
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) return <code {...props} />;
    return <code {...props} />;
  },
  pre: (props: any) => {
    const codeProps = props.children?.props || {};
    const lang = codeProps.className?.replace('language-', '') || 'text';
    const code = codeProps.children || '';
    
    return <AsyncCodeBlock code={code as string} lang={lang} />;
  },
  Callout,
  Tabs,
  CodeBlock,
  Icon,
  ApiVersion: () => <span>{SITE_CONFIG.apiVersion}</span>,
};

async function AsyncCodeBlock({ code, lang }: { code: string, lang: string }) {
  const html = await highlightCode(code, lang);
  return <CodeBlock html={html} lang={lang} title={lang} />;
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) notFound();

  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) notFound();

  const currentPath = `/docs/${resolvedParams.slug.join('/')}`;
  const { prev, next } = findCurrentGroup(currentPath);

  const { getLatestRelease } = await import('@/lib/github');
  const latestRelease = await getLatestRelease();
  const dynamicVersion = latestRelease?.tag_name || SITE_CONFIG.version;
  const dynamicStatus = latestRelease ? (latestRelease.prerelease ? 'Beta' : 'Stable') : SITE_CONFIG.status;

  const mdxComponents = {
    ...components,
    AppVersion: () => <span>{dynamicVersion}</span>,
    AppStatus: () => <span>{dynamicStatus}</span>,
  };

  return (
    <>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1>{doc.meta.title}</h1>
        {doc.meta.description && <div className="doc-header-meta">{doc.meta.description}</div>}
        
        <MDXRemote 
          source={doc.content} 
          components={mdxComponents} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
        
        <div className="doc-nav">
          {prev ? (
            <Link href={prev.href} className="doc-nav-link prev">
              <span className="doc-nav-label">Previous</span>
              <span className="doc-nav-title">← {prev.title}</span>
            </Link>
          ) : <div />}
          
          {next ? (
            <Link href={next.href} className="doc-nav-link next">
              <span className="doc-nav-label">Next page</span>
              <span className="doc-nav-title">{next.title} →</span>
            </Link>
          ) : <div />}
        </div>
      </div>
      
      <TableOfContents />
    </>
  );
}
