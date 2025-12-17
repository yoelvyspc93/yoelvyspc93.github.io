import { ReactNode } from 'react';

import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { SOCIAL } from './content';

export interface SocialLink {
  icon: ReactNode;
  platform: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: <GithubIcon />,
    platform: 'GitHub',
    url: SOCIAL.github,
  },
  {
    icon: <LinkedinIcon />,
    platform: 'LinkedIn',
    url: SOCIAL.linkedin,
  },
];
