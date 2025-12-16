import { ReactNode } from 'react';

import {
  TypescriptIcon,
  WebflowIcon,
  WordpressIcon,
} from '@/components/ui/Icons';

export interface ExperienceData {
  id: string;
  techStack: ReactNode[];
}

export const experiencesData: ExperienceData[] = [
  {
    id: '01',
    techStack: [
      <TypescriptIcon key="typescript" />,
      <WebflowIcon key="webflow" />,
      <WordpressIcon key="wordpress" />,
    ],
  },
  {
    id: '02',
    techStack: [
      <TypescriptIcon key="typescript" />,
      <WebflowIcon key="webflow" />,
      <WordpressIcon key="wordpress" />,
    ],
  },
];
