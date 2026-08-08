import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const getAbsolutePath = (packageName: string) =>
  dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('storybook-addon-rslib')],
  framework: {
    // Storybook accepts an absolute framework path, but the Rsbuild type narrows this to its package name.
    name: getAbsolutePath('storybook-react-rsbuild') as 'storybook-react-rsbuild',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: true,
  },
};

export default config;