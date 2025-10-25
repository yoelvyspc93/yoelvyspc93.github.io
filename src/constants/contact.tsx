import { ReactNode } from 'react';

import EmailGradientIcon from '@/components/common/Icons/EmailGradientIcon';
import TelegramGradientIcon from '@/components/common/Icons/TelegramIcon';

export interface ContactInfo {
  contactLinks: {
    icon: ReactNode;
    text: string;
  }[];
}

export const contactInfo: ContactInfo = {
  contactLinks: [
    {
      icon: <EmailGradientIcon />,
      text: 'yoelvyspc93@gmail.com',
    },
    {
      icon: <TelegramGradientIcon />,
      text: '+53 54773819',
    },
  ],
};
