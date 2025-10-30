import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import next from 'eslint-config-next';
import unicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use FlatCompat only for legacy shareable configs; Next provides flat config already.
const compat = new FlatCompat({ baseDirectory: __dirname });

const unicornRecommended = { ...unicorn.configs.recommended };
delete unicornRecommended.name;

export default [
  // Next.js base + TypeScript + Core Web Vitals (flat config)
  ...next,
  // Add legacy configs via compat
  ...compat.extends(
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended-legacy',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
  ),
  // Unicorn recommended (flat)
  { ...unicornRecommended },
  {
    rules: {
      'prettier/prettier': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
    },
  },
];
