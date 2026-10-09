import type { CssProperty } from '../../mdx/reference';

export const cardOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-card-action-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls `CardAction` spacing.',
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
    name: '--moduix-card-subtle-bg',
    defaultValue: 'var(--moduix-color-muted)',
    description: 'Controls the subtle variant background color.',
  },
  {
    name: '--moduix-card-subtle-border-color',
    defaultValue: 'transparent',
    description: 'Controls the subtle variant border color.',
  },
  {
    name: '--moduix-card-subtle-border-width',
    defaultValue: '0',
    description: 'Controls the subtle variant border width.',
  },
  {
    name: '--moduix-card-subtle-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls the subtle variant foreground color.',
  },
  {
    name: '--moduix-card-subtle-shadow',
    defaultValue: 'none',
    description: 'Controls the subtle variant shadow.',
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
    description: 'Controls `CardBody` text color.',
  },
  {
    name: '--moduix-card-body-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls `CardBody` font size.',
  },
  {
    name: '--moduix-card-body-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls `CardBody` line height.',
  },
  {
    name: '--moduix-card-body-padding-top',
    defaultValue: 'var(--moduix-spacing-4)',
    description: 'Controls spacing between header and body.',
  },
  {
    name: '--moduix-card-description-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls `CardDescription` text color.',
  },
  {
    name: '--moduix-card-description-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls `CardDescription` font size.',
  },
  {
    name: '--moduix-card-description-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls `CardDescription` line height.',
  },
  {
    name: '--moduix-card-elevated-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls the elevated variant background color.',
  },
  {
    name: '--moduix-card-elevated-border-color',
    defaultValue: 'transparent',
    description: 'Controls the elevated variant border color.',
  },
  {
    name: '--moduix-card-elevated-border-width',
    defaultValue: '0',
    description: 'Controls the elevated variant border width.',
  },
  {
    name: '--moduix-card-elevated-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls the elevated variant foreground color.',
  },
  {
    name: '--moduix-card-elevated-shadow',
    defaultValue: 'var(--moduix-shadow-md)',
    description: 'Controls the elevated variant shadow.',
  },
  {
    name: '--moduix-card-footer-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls `CardFooter` spacing.',
  },
  {
    name: '--moduix-card-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls interactive root and `CardLink` focus ring color.',
  },
  {
    name: '--moduix-card-focus-ring-offset',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls interactive root and `CardLink` focus ring offset.',
  },
  {
    name: '--moduix-card-focus-ring-width',
    defaultValue: 'var(--moduix-border-width-md)',
    description: 'Controls interactive root and `CardLink` focus ring width.',
  },
  {
    name: '--moduix-card-header-gap',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls spacing inside `CardHeader`.',
  },
  {
    name: '--moduix-card-outline-bg',
    defaultValue: 'var(--moduix-color-card)',
    description: 'Controls the outline variant background color.',
  },
  {
    name: '--moduix-card-outline-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls the outline variant border color.',
  },
  {
    name: '--moduix-card-outline-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls the outline variant border width.',
  },
  {
    name: '--moduix-card-outline-color',
    defaultValue: 'var(--moduix-color-card-foreground)',
    description: 'Controls the outline variant foreground color.',
  },
  {
    name: '--moduix-card-outline-shadow',
    defaultValue: 'none',
    description: 'Controls the outline variant shadow.',
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
    description: 'Controls `CardTitle` color.',
  },
  {
    name: '--moduix-card-title-font-size',
    defaultValue: 'var(--moduix-text-lg)',
    description: 'Controls default `CardTitle` font size.',
  },
  {
    name: '--moduix-card-title-font-size-lg',
    defaultValue: 'var(--moduix-text-xl)',
    description: 'Controls large `CardTitle` font size.',
  },
  {
    name: '--moduix-card-title-font-size-sm',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls compact `CardTitle` font size.',
  },
  {
    name: '--moduix-card-title-font-weight',
    defaultValue: 'var(--moduix-weight-semibold)',
    description: 'Controls `CardTitle` weight.',
  },
  {
    name: '--moduix-card-title-line-height',
    defaultValue: 'var(--moduix-line-height-text-lg)',
    description: 'Controls default `CardTitle` line height.',
  },
  {
    name: '--moduix-card-title-line-height-lg',
    defaultValue: 'var(--moduix-line-height-text-xl)',
    description: 'Controls large `CardTitle` line height.',
  },
  {
    name: '--moduix-card-title-line-height-sm',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls compact `CardTitle` line height.',
  },
];