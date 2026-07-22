import type { CssProperty } from '../mdx/reference';

export const bleedCssProperties: CssProperty[] = [
  {
    name: '--bleed-block-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small block bleed.',
  },
  {
    name: '--bleed-block-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small block bleed.',
  },
  {
    name: '--bleed-block-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium block bleed.',
  },
  {
    name: '--bleed-block-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large block bleed.',
  },
  {
    name: '--bleed-block-xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls extra-large block bleed.',
  },
  {
    name: '--bleed-inline-full',
    defaultValue: 'calc(50% - 50vw)',
    description: 'Controls full viewport inline bleed.',
  },
  {
    name: '--bleed-inline-full-size',
    defaultValue: '100vw',
    description: 'Controls the width used by full viewport inline bleed.',
  },
  {
    name: '--bleed-inline-xs',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls extra-small inline bleed.',
  },
  {
    name: '--bleed-inline-sm',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls small inline bleed.',
  },
  {
    name: '--bleed-inline-md',
    defaultValue: 'var(--spacing-3)',
    description: 'Controls medium inline bleed.',
  },
  {
    name: '--bleed-inline-lg',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls large inline bleed.',
  },
  {
    name: '--bleed-inline-xl',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls extra-large inline bleed.',
  },
];