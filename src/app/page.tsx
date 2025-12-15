import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import { featureFlags } from '@/constants/featureFlags';

import { Header } from '@/components/sections/home/Header';
import { About } from '@/components/sections/home/About';
import { Projects } from '@/components/sections/home/Projects';
import { Experience } from '@/components/sections/home/Experience';
import { Skills } from '@/components/sections/home/Skills';
import { Contact } from '@/components/sections/home/Contact';
import { homeSchema } from '@/utils/schema/home';
import { JsonLdSchema } from '@/components/common/JsonLdSchema';

export const metadata: Metadata = {
  ...seo,
  openGraph: {
    ...seo.openGraph,
    url: '/',
    locale: 'en',
  },
};

export default function RootPage() {
  return (
    <main id="main">
      {featureFlags.showHeader && <Header />}
      {featureFlags.showAbout && <About />}
      {featureFlags.showProjects && <Projects />}
      {featureFlags.showExperience && <Experience />}
      {featureFlags.showSkills && <Skills />}
      {featureFlags.showContact && <Contact />}
      <JsonLdSchema schemaData={homeSchema} />
    </main>
  );
}
