import { ReactNode } from 'react';

import { GithubIcon, TelegramIcon } from '@/components/ui/Icons';

export interface ContactInfo {
  contactLinks: {
    icon: ReactNode;
    text: string;
  }[];
}

export const contactInfo: ContactInfo = {
  contactLinks: [
    {
      icon: <GithubIcon />,
      text: 'github.com/yoelvyspc93',
    },
    {
      icon: <TelegramIcon />,
      text: '+53 54773819',
    },
  ],
};
