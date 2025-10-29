import { featureFlags } from '@/constants/featureFlags';

import { Header } from '@/components/sections/home/Header';
import { About } from '@/components/sections/home/About';
import { Projects } from '@/components/sections/home/Projects';
import { Experience } from '@/components/sections/home/Experience';
import { Skills } from '@/components/sections/home/Skills';
import { Contact } from '@/components/sections/home/Contact';

export default function HomePage() {
  return (
    <main id="main">
      {featureFlags.showHeader && <Header />}
      {featureFlags.showAbout && <About />}
      {featureFlags.showProjects && <Projects />}
      {featureFlags.showExperience && <Experience />}
      {featureFlags.showSkills && <Skills />}
      {featureFlags.showContact && <Contact />}
    </main>
  );
}
