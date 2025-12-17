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
          name="google-site-verification"
          content="PTFwgGvi6DtWU4kuIjOZdG-mJhQoEq5_vjJ5sTTDpjs"
        />
      </head>
      <body className={montserrat.variable}>
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
