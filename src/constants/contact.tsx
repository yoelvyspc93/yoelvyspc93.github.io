import { ReactNode } from 'react';

import GithubIcon from '@/components/common/Icons/GithubIcon';
import TelegramIcon from '@/components/common/Icons/TelegramIcon';

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
