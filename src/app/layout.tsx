import '@/styles/app.scss';

import { ReactNode } from 'react';
import { schemaData } from '@/constants/metadata';
import { Navigator } from '@/components/common/Navigator';
import JsonLdSchema from '@/components/common/JsonLdSchema';
import ConsoleBanner from '@/components/common/ConsoleBanner';
import SlidingMenu from '@/components/common/SlidingMenu';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConsoleBanner />
        <div className="page">
          <Navigator />
          <SlidingMenu />
          {children}
        </div>
        <JsonLdSchema schemaData={schemaData} />
      </body>
    </html>
  );
}
