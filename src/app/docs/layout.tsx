import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="docs-layout">
        <Sidebar />
        <main className="doc-content">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
