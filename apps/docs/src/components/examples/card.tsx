import type { CssProperty } from '../mdx/reference';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--card-action-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `Card.Action` spacing.',
  },
  {
    name: '--card-bg',
    defaultValue: 'var(--color-card)',
    description: 'Controls card background color.',
  },
  {
    name: '--card-spacing',
    defaultValue: 'falls back to size-specific card padding',
    description: 'Controls shared card inset and section spacing.',
  },
  {
    name: '--card-spacing-lg',
    defaultValue: 'falls back to `--card-spacing` then `var(--spacing-8)`',
    description: 'Controls large-card shared inset and section spacing.',
  },
  {
    name: '--card-spacing-sm',
    defaultValue: 'falls back to `--card-spacing` then `var(--spacing-4)`',
    description: 'Controls compact-card shared inset and section spacing.',
  },
  {
    name: '--card-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls card border color.',
  },
  {
    name: '--card-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls card border width.',
  },
  {
    name: '--card-color',
    defaultValue: 'var(--color-card-foreground)',
    description: 'Controls card foreground color.',
  },
  {
    name: '--card-body-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `Card.Body` text color.',
  },
  {
    name: '--card-body-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `Card.Body` font size.',
  },
  {
    name: '--card-body-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `Card.Body` line height.',
  },
  {
    name: '--card-body-padding-top',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls spacing between header and body.',
  },
  {
    name: '--card-description-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls `Card.Description` text color.',
  },
  {
    name: '--card-description-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls `Card.Description` font size.',
  },
  {
    name: '--card-description-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls `Card.Description` line height.',
  },
  {
    name: '--card-footer-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls `Card.Footer` spacing.',
  },
  {
    name: '--card-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls `Card.Link` focus ring color.',
  },
  {
    name: '--card-focus-ring-offset',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls `Card.Link` focus ring offset.',
  },
  {
    name: '--card-focus-ring-width',
    defaultValue: 'var(--border-width-md)',
    description: 'Controls `Card.Link` focus ring width.',
  },
  {
    name: '--card-header-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing inside `Card.Header`.',
  },
  {
    name: '--card-padding',
    defaultValue: 'var(--spacing-6)',
    description: 'Controls default card padding.',
  },
  {
    name: '--card-padding-lg',
    defaultValue: 'var(--spacing-8)',
    description: 'Controls large card padding.',
  },
  {
    name: '--card-padding-sm',
    defaultValue: 'var(--spacing-4)',
    description: 'Controls compact card padding.',
  },
  {
    name: '--card-radius',
    defaultValue: 'var(--radius-lg)',
    description: 'Controls card border radius.',
  },
  { name: '--card-shadow', defaultValue: 'none', description: 'Controls card shadow.' },
  {
    name: '--card-title-color',
    defaultValue: 'currentColor',
    description: 'Controls `Card.Title` color.',
  },
  {
    name: '--card-title-font-size',
    defaultValue: 'var(--text-lg)',
    description: 'Controls default `Card.Title` font size.',
  },
  {
    name: '--card-title-font-size-lg',
    defaultValue: 'var(--text-xl)',
    description: 'Controls large `Card.Title` font size.',
  },
  {
    name: '--card-title-font-size-sm',
    defaultValue: 'var(--text-md)',
    description: 'Controls compact `Card.Title` font size.',
  },
  {
    name: '--card-title-font-weight',
    defaultValue: 'var(--weight-semibold)',
    description: 'Controls `Card.Title` weight.',
  },
  {
    name: '--card-title-line-height',
    defaultValue: 'var(--line-height-text-lg)',
    description: 'Controls default `Card.Title` line height.',
  },
  {
    name: '--card-title-line-height-lg',
    defaultValue: 'var(--line-height-text-xl)',
    description: 'Controls large `Card.Title` line height.',
  },
  {
    name: '--card-title-line-height-sm',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls compact `Card.Title` line height.',
  },
];