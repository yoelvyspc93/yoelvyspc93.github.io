import { metadata as seo } from '@/constants/metadata';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { featureFlags } from '@/constants/featureFlags';

import { Header } from '@/components/sections/home/Header';
import { JsonLdSchema } from '@/components/shared/JsonLdSchema';
import { homeSchema } from '@/utils/schema/home';

const About = dynamic(() =>
  import('@/components/sections/home/About').then((mod) => mod.About),
);
const Projects = dynamic(() =>
  import('@/components/sections/home/Projects').then((mod) => mod.Projects),
);
const Experience = dynamic(() =>
  import('@/components/sections/home/Experience').then((mod) => mod.Experience),
);
const Skills = dynamic(() =>
  import('@/components/sections/home/Skills').then((mod) => mod.Skills),
);
const Contact = dynamic(() =>
  import('@/components/sections/home/Contact').then((mod) => mod.Contact),
);

export const metadata: Metadata = seo;

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
