import '@/styles/app.scss';

import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import { Navigator } from '@/components/shared/Navigator';
import ConsoleBanner from '@/components/shared/ConsoleBanner';
import SlidingMenu from '@/components/shared/SlidingMenu';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; media-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'self'; upgrade-insecure-requests"
        />
        <meta
          name="google-site-verification"
          content="PTFwgGvi6DtWU4kuIjOZdG-mJhQoEq5_vjJ5sTTDpjs"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={montserrat.variable}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ConsoleBanner />
        <div className="page">
          <Navigator />
          <SlidingMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
