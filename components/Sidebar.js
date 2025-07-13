import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      background: '#1a202c',
      color: '#fff',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Link href="/">
          <Image
            src="/higo.png"
            alt="HIGO Logo"
            width={100}
            height={100}
            style={{
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            priority
          />
        </Link>
      </div>

      <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Statistik</Link>
      <Link href="/upload" style={{ color: '#fff', textDecoration: 'none' }}>Upload & Table</Link>
    </aside>
  );
}
