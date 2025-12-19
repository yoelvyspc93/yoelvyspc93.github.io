import { useCallback } from 'react';

const to = 'yoelvyspc93@gmail.com';
const subject = 'Contact from portfolio';

export const useMailTo = () => {
  const generateMailTo = useCallback(
    ({ email, message }: { email: string; message: string }) => {
      const encodedTo = encodeURIComponent(to);
      const encodedSubject = encodeURIComponent(subject);
      const body = `From: ${email}\n\n${message}`;
      const encodedBody = encodeURIComponent(body);

      const url = `mailto:${encodedTo}?subject=${encodedSubject}&body=${encodedBody}`;
      globalThis.location.href = url;
    },
    [],
  );

  return { generateMailTo };
};
