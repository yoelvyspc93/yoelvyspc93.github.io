import { ReactNode } from 'react';

import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export interface SocialLink {
  icon: ReactNode;
  platform: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: <GithubIcon />,
    platform: 'GitHub',
    url: 'https://github.com/yoelvyspc93',
  },
  {
    icon: <LinkedinIcon />,
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/yoelvys-perez-cabrera',
  },
];
