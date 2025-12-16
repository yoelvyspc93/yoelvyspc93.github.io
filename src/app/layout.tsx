import '@/styles/app.scss';

import { ReactNode } from 'react';
import { Navigator } from '@/components/shared/Navigator';
import ConsoleBanner from '@/components/shared/ConsoleBanner';
import SlidingMenu from '@/components/shared/SlidingMenu';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="PTFwgGvi6DtWU4kuIjOZdG-mJhQoEq5_vjJ5sTTDpjs"
        />
      </head>
      <body>
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
