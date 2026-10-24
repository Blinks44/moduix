import type { CssProperty } from '../../mdx/reference';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-card-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls card background color for every variant.',
  },
  {
    name: '--moduix-card-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls card border color.',
  },
  {
    name: '--moduix-card-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls card border width for every variant.',
  },
  {
    name: '--moduix-card-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls card foreground color.',
  },
  {
    name: '--moduix-card-radius',
    defaultValue: 'var(--moduix-radius-lg)',
    description: 'Controls card and `CardLink` focus-ring radius.',
  },
  {
    name: '--moduix-card-shadow',
    defaultValue: 'none',
    description: 'Controls card shadow for every variant.',
  },
  {
    name: '--moduix-card-spacing',
    defaultValue: 'size-specific: `sm` 4, `md` 6, `lg` 8 spacing units',
    description: 'Controls the card inset and the space between sections.',
  },
];