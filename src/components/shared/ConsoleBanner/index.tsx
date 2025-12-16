'use client';
import { useEffect } from 'react';
import { COMMON } from '@/constants/content';

type ConsoleMethod = 'log' | 'info' | 'debug' | 'warn' | 'trace';
type GlobalWithBanner = typeof globalThis & {
  __consoleBannerShown?: boolean;
  __consoleOriginals?: Partial<
    Record<ConsoleMethod, (...args: unknown[]) => void>
  >;
  __consoleSilenced?: boolean;
};

const CONSOLE_METHODS: readonly ConsoleMethod[] = [
  'log',
  'info',
  'debug',
  'warn',
  'trace',
];

const isProduction = process.env.NODE_ENV === 'production';

const consoleNoop = () => {};

function restoreConsoleIfNeeded(g: GlobalWithBanner): void {
  if (!isProduction) return;
  if (!g.__consoleOriginals) {
    g.__consoleOriginals = {
      log: console.log,
      info: console.info,
      debug: console.debug,
      warn: console.warn,
      trace: console.trace,
    };
    return;
  }
  if (g.__consoleSilenced) {
    const typedConsole = console as Record<
      ConsoleMethod,
      (...args: unknown[]) => void
    >;
    for (const m of CONSOLE_METHODS) {
      const original = g.__consoleOriginals[m];
      if (original) {
        typedConsole[m] = original;
      }
    }
    g.__consoleSilenced = false;
  }
}

function silenceConsole(g: GlobalWithBanner): void {
  if (!isProduction) return;
  const typedConsole = console as unknown as Record<
    ConsoleMethod,
    (...args: unknown[]) => void
  >;
  for (const method of CONSOLE_METHODS) {
    typedConsole[method] = consoleNoop;
  }
  g.__consoleSilenced = true;
}

export default function ConsoleBanner() {
  useEffect(() => {
    const g = globalThis as GlobalWithBanner;
    restoreConsoleIfNeeded(g);

    if (g.__consoleBannerShown) {
      return;
    }

    const titleStyle = [
      'font-weight:800',
      'font-size:32px',
      'padding:12px 16px',
      'background:#010101',
      'color:#86a7ff',
      'border-radius:12px',
    ].join(';');
    const textStyle = 'font-size:14px;color:#ffffff';
    const linkStyle = 'font-size:14px;color:#86a7ff;text-decoration:underline';

    console.clear();

    console.log('%c' + COMMON.consoleBanner.title, titleStyle);
    console.log('%c' + COMMON.consoleBanner.description, textStyle);
    console.log(
      '%c' +
        COMMON.consoleBanner.repoLabel +
        '%c ' +
        COMMON.consoleBanner.repoUrl,
      textStyle,
      linkStyle,
    );
    console.log(
      '%c' +
        COMMON.consoleBanner.contactLabel +
        '%c ' +
        COMMON.consoleBanner.contactEmail,
      textStyle,
      linkStyle,
    );

    g.__consoleBannerShown = true;
    silenceConsole(g);
  }, []);

  return null;
}
