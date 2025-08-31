'use client';
import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocale } from 'next-intl';

type ConsoleMethod = 'log' | 'info' | 'debug' | 'warn' | 'trace';
type GlobalWithBanner = typeof globalThis & {
  __consoleBannerLastLocale?: string;
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
  const { t } = useTranslation('common');
  const locale = useLocale();

  useEffect(() => {
    const g = globalThis as GlobalWithBanner;
    // In production, restore originals temporarily to allow re-print on locale change
    restoreConsoleIfNeeded(g);

    // Only log when the locale actually changes (including first render)
    const shouldLog = g.__consoleBannerLastLocale !== locale;
    if (!shouldLog) {
      return;
    }

    const titleStyle = [
      'font-weight:800',
      'font-size:32px',
      'padding:12px 16px',
      'background:#0f172a',
      'color:#93c5fd',
      'border-radius:12px',
    ].join(';');
    const textStyle = 'font-size:14px;color:#e5e7eb';
    const linkStyle = 'font-size:14px;color:#60a5fa;text-decoration:underline';

    // Clear previous language banner to avoid duplicates
    if (g.__consoleBannerLastLocale) {
      console.clear();
    }

    // Translated console messages
    console.log('%c' + t('consoleBanner.title'), titleStyle);
    console.log('%c' + t('consoleBanner.description'), textStyle);
    console.log(
      '%c' + t('consoleBanner.repoLabel') + '%c ' + t('consoleBanner.repoUrl'),
      textStyle,
      linkStyle,
    );
    console.log(
      '%c' +
        t('consoleBanner.contactLabel') +
        '%c ' +
        t('consoleBanner.contactEmail'),
      textStyle,
      linkStyle,
    );

    // Remember last locale used
    g.__consoleBannerLastLocale = locale;

    // Environment-specific behavior
    silenceConsole(g);
  }, [t, locale]);

  return null;
}
