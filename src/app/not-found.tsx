'use client';
import { usePathname } from 'next/navigation';
import { COMMON } from '@/constants/content';
import Link from 'next/link';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>{COMMON.notFound.title}</h1>
          <p>{COMMON.notFound.description}</p>
          <p>Path: {pathname}</p>
          <Link href="/">{COMMON.notFound.link}</Link>
        </div>
      </body>
    </html>
  );
}
