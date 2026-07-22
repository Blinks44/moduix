import type { CssProperty } from '../mdx/reference';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-card-action-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls `Card.Action` spacing.',
  },
  {
    name: '--moduix-card-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls card background color.',
  },
  {
    name: '--moduix-card-spacing',
    defaultValue: 'falls back to size-specific card padding',
    description: 'Controls shared card inset and section spacing.',
  },
  {
    name: '--moduix-card-spacing-lg',
    defaultValue: 'falls back to `--moduix-card-spacing` then `var(--moduix-spacing-8)`',
    description: 'Controls large-card shared inset and section spacing.',
  },
  {
    name: '--moduix-card-spacing-sm',
    defaultValue: 'falls back to `--moduix-card-spacing` then `var(--moduix-spacing-4)`',
    description: 'Controls compact-card shared inset and section spacing.',
  },
  {
    name: '--moduix-card-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls card border color.',
  },
  {
    name: '--moduix-card-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls card border width.',
  },
  {
    name: '--moduix-card-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls card foreground color.',
  },
  {
    name: '--moduix-card-body-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls `Card.Body` text color.',
  },
  {
    name: '--moduix-card-body-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls `Card.Body` font size.',
  },
  {
    name: '--moduix-card-body-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls `Card.Body` line height.',
  },
  {
    name: '--moduix-card-body-padding-top',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls spacing between header and body.',
  },
  {
    name: '--moduix-card-description-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls `Card.Description` text color.',
  },
  {
    name: '--moduix-card-description-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls `Card.Description` font size.',
  },
  {
    name: '--moduix-card-description-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls `Card.Description` line height.',
  },
  {
    name: '--moduix-card-footer-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls `Card.Footer` spacing.',
  },
  {
    name: '--moduix-card-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls `Card.Link` focus ring color.',
  },
  {
    name: '--moduix-card-focus-ring-offset',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls `Card.Link` focus ring offset.',
  },
  {
    name: '--moduix-card-focus-ring-width',
    defaultValue: 'var(--moduix-border-width-md)',
    description: 'Controls `Card.Link` focus ring width.',
  },
  {
    name: '--moduix-card-header-gap',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls spacing inside `Card.Header`.',
  },
  {
    name: '--moduix-card-padding',
    defaultValue: 'var(--moduix-spacing-6)',
    description: 'Controls default card padding.',
  },
  {
    name: '--moduix-card-padding-lg',
    defaultValue: 'var(--moduix-spacing-8)',
    description: 'Controls large card padding.',
  },
  {
    name: '--moduix-card-padding-sm',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls compact card padding.',
  },
  {
    name: '--moduix-card-radius',
    defaultValue: 'var(--moduix-radius-lg)',
    description: 'Controls card border radius.',
  },
  { name: '--moduix-card-shadow', defaultValue: 'none', description: 'Controls card shadow.' },
  {
    name: '--moduix-card-title-color',
    defaultValue: 'currentColor',
    description: 'Controls `Card.Title` color.',
  },
  {
    name: '--moduix-card-title-font-size',
    defaultValue: 'var(--moduix-text-lg)',
    description: 'Controls default `Card.Title` font size.',
  },
  {
    name: '--moduix-card-title-font-size-lg',
    defaultValue: 'var(--moduix-text-xl)',
    description: 'Controls large `Card.Title` font size.',
  },
  {
    name: '--moduix-card-title-font-size-sm',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls compact `Card.Title` font size.',
  },
  {
    name: '--moduix-card-title-font-weight',
    defaultValue: 'var(--moduix-weight-semibold)',
    description: 'Controls `Card.Title` weight.',
  },
  {
    name: '--moduix-card-title-line-height',
    defaultValue: 'var(--moduix-line-height-text-lg)',
    description: 'Controls default `Card.Title` line height.',
  },
  {
    name: '--moduix-card-title-line-height-lg',
    defaultValue: 'var(--moduix-line-height-text-xl)',
    description: 'Controls large `Card.Title` line height.',
  },
  {
    name: '--moduix-card-title-line-height-sm',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls compact `Card.Title` line height.',
  },
];