import type { CssProperty } from '../mdx/reference';

export const bleedCssProperties: CssProperty[] = [
  {
    name: '--moduix-bleed-block-xs',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls extra-small block bleed.',
  },
  {
    name: '--moduix-bleed-block-sm',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls small block bleed.',
  },
  {
    name: '--moduix-bleed-block-md',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls medium block bleed.',
  },
  {
    name: '--moduix-bleed-block-lg',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls large block bleed.',
  },
  {
    name: '--moduix-bleed-block-xl',
    defaultValue: 'var(--moduix-spacing-6)',
    description: 'Controls extra-large block bleed.',
  },
  {
    name: '--moduix-bleed-inline-full',
    defaultValue: 'calc(50% - 50vw)',
    description: 'Controls full viewport inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-full-size',
    defaultValue: '100vw',
    description: 'Controls the width used by full viewport inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-xs',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls extra-small inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-sm',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls small inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-md',
    defaultValue: 'var(--moduix-spacing-3)',
    description: 'Controls medium inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-lg',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls large inline bleed.',
  },
  {
    name: '--moduix-bleed-inline-xl',
    defaultValue: 'var(--moduix-spacing-6)',
    description: 'Controls extra-large inline bleed.',
  },
];