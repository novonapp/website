import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>404 - Page Not Found</h2>
      <p style={{ color: 'var(--text-2)', marginBottom: '32px' }}>
        This documentation page is currently being written or doesn't exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
