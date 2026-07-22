import type { CssPropertyInput } from '../mdx/reference';

export const buttonCssProperties: CssPropertyInput[] = [
  [
    '--moduix-button-border-width',
    'var(--moduix-border-width-sm)',
    'Controls base button border width.',
  ],
  [
    '--moduix-button-color',
    'var(--moduix-color-foreground)',
    'Controls base button text and icon color.',
  ],
  [
    '--moduix-button-content-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between text and icons.',
  ],
  [
    '--moduix-button-default-bg',
    'var(--moduix-color-primary)',
    'Controls default variant background.',
  ],
  [
    '--moduix-button-default-bg-hover',
    'color-mix(in srgb, var(--moduix-button-default-bg, var(--moduix-color-primary)) 88%, black)',
    'Controls default variant hover background.',
  ],
  [
    '--moduix-button-default-border-color',
    'var(--moduix-color-primary)',
    'Controls default variant border color.',
  ],
  [
    '--moduix-button-default-color',
    'var(--moduix-color-primary-foreground)',
    'Controls default variant text and icon color.',
  ],
  [
    '--moduix-button-destructive-bg',
    'var(--moduix-color-destructive)',
    'Controls destructive variant background.',
  ],
  [
    '--moduix-button-destructive-border-color',
    'var(--moduix-color-destructive)',
    'Controls destructive variant border color.',
  ],
  [
    '--moduix-button-destructive-color',
    'var(--moduix-color-destructive-foreground)',
    'Controls destructive variant text and icon color.',
  ],
  [
    '--moduix-button-destructive-hover-brightness',
    '0.96',
    'Controls destructive variant hover brightness filter.',
  ],
  [
    '--moduix-button-destructive-outline-bg',
    'var(--moduix-color-background)',
    'Controls destructive-outline variant background.',
  ],
  [
    '--moduix-button-destructive-outline-bg-hover',
    'var(--moduix-color-destructive)',
    'Controls destructive-outline variant hover background.',
  ],
  [
    '--moduix-button-destructive-outline-border-color',
    'var(--moduix-color-destructive)',
    'Controls destructive-outline variant border color.',
  ],
  [
    '--moduix-button-destructive-outline-color',
    'var(--moduix-color-destructive)',
    'Controls destructive-outline variant text and icon color.',
  ],
  [
    '--moduix-button-destructive-outline-color-hover',
    'var(--moduix-button-destructive-color, var(--moduix-color-destructive-foreground))',
    'Controls destructive-outline variant hover text and icon color.',
  ],
  [
    '--moduix-button-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled state opacity.',
  ],
  [
    '--moduix-button-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus-visible outline color.',
  ],
  [
    '--moduix-button-focus-ring-offset',
    'var(--moduix-button-border-width, var(--moduix-border-width-sm))',
    'Controls focus-visible outline offset.',
  ],
  [
    '--moduix-button-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus-visible outline width.',
  ],
  ['--moduix-button-font-size', 'var(--moduix-text-sm)', 'Controls base button font size.'],
  ['--moduix-button-font-size-xs', 'var(--moduix-text-xs)', 'Controls `xs` button font size.'],
  ['--moduix-button-font-size-lg', 'var(--moduix-text-md)', 'Controls `lg` button font size.'],
  ['--moduix-button-font-size-xl', 'var(--moduix-text-lg)', 'Controls `xl` button font size.'],
  ['--moduix-button-font-weight', 'var(--moduix-weight-medium)', 'Controls button font weight.'],
  ['--moduix-button-ghost-bg', 'transparent', 'Controls ghost variant background.'],
  [
    '--moduix-button-ghost-bg-hover',
    'var(--moduix-color-accent)',
    'Controls ghost variant hover background.',
  ],
  ['--moduix-button-ghost-border-color', 'transparent', 'Controls ghost variant border color.'],
  [
    '--moduix-button-ghost-color',
    'var(--moduix-color-foreground)',
    'Controls ghost variant text and icon color.',
  ],
  ['--moduix-button-icon-size', 'var(--moduix-spacing-4)', 'Controls nested SVG icon size.'],
  [
    '--moduix-button-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls base button line height.',
  ],
  [
    '--moduix-button-line-height-xs',
    'var(--moduix-line-height-text-xs)',
    'Controls `xs` button line height.',
  ],
  [
    '--moduix-button-line-height-lg',
    'var(--moduix-line-height-text-md)',
    'Controls `lg` button line height.',
  ],
  [
    '--moduix-button-line-height-xl',
    'var(--moduix-line-height-text-lg)',
    'Controls `xl` button line height.',
  ],
  ['--moduix-button-link-color', 'var(--moduix-color-primary)', 'Controls link variant color.'],
  [
    '--moduix-button-link-color-hover',
    'var(--moduix-color-foreground)',
    'Controls link variant hover color.',
  ],
  ['--moduix-button-link-text-decoration', 'underline', 'Controls link variant text decoration.'],
  ['--moduix-button-link-underline-offset', '0.25em', 'Controls link variant underline offset.'],
  [
    '--moduix-button-outline-bg',
    'var(--moduix-color-background)',
    'Controls outline variant background.',
  ],
  [
    '--moduix-button-outline-bg-hover',
    'var(--moduix-color-accent)',
    'Controls outline variant hover background.',
  ],
  [
    '--moduix-button-outline-border-color',
    'var(--moduix-color-border)',
    'Controls outline variant border color.',
  ],
  [
    '--moduix-button-outline-color',
    'var(--moduix-color-foreground)',
    'Controls outline variant text and icon color.',
  ],
  [
    '--moduix-button-padding-x-xs',
    'var(--moduix-spacing-2-5)',
    'Controls `xs` button horizontal padding.',
  ],
  [
    '--moduix-button-padding-x-sm',
    'var(--moduix-spacing-3)',
    'Controls `sm` button horizontal padding.',
  ],
  [
    '--moduix-button-padding-x-md',
    'var(--moduix-spacing-4)',
    'Controls `md` button horizontal padding.',
  ],
  [
    '--moduix-button-padding-x-lg',
    'var(--moduix-spacing-5)',
    'Controls `lg` button horizontal padding.',
  ],
  [
    '--moduix-button-padding-x-xl',
    'var(--moduix-spacing-6)',
    'Controls `xl` button horizontal padding.',
  ],
  [
    '--moduix-button-padding-y-xs',
    'var(--moduix-spacing-0-5)',
    'Controls `xs` button vertical padding.',
  ],
  [
    '--moduix-button-padding-y-sm',
    'var(--moduix-spacing-1)',
    'Controls `sm` button vertical padding.',
  ],
  [
    '--moduix-button-padding-y-md',
    'var(--moduix-spacing-1)',
    'Controls `md` button vertical padding.',
  ],
  [
    '--moduix-button-padding-y-lg',
    'var(--moduix-spacing-1-5)',
    'Controls `lg` button vertical padding.',
  ],
  [
    '--moduix-button-padding-y-xl',
    'var(--moduix-spacing-2)',
    'Controls `xl` button vertical padding.',
  ],
  ['--moduix-button-radius', 'var(--moduix-radius-md)', 'Controls button corner radius.'],
  [
    '--moduix-button-secondary-bg',
    'var(--moduix-color-secondary)',
    'Controls secondary variant background.',
  ],
  [
    '--moduix-button-secondary-bg-hover',
    'var(--moduix-color-accent)',
    'Controls secondary variant hover background.',
  ],
  [
    '--moduix-button-secondary-border-color',
    'var(--moduix-color-secondary)',
    'Controls secondary variant border color.',
  ],
  [
    '--moduix-button-secondary-color',
    'var(--moduix-color-secondary-foreground)',
    'Controls secondary variant text and icon color.',
  ],
  ['--moduix-button-size-icon-sm', 'var(--moduix-size-sm)', 'Controls `icon-sm` button size.'],
  ['--moduix-button-size-icon-md', 'var(--moduix-size-md)', 'Controls `icon-md` button size.'],
  ['--moduix-button-size-icon-lg', 'var(--moduix-size-lg)', 'Controls `icon-lg` button size.'],
  ['--moduix-button-size-xs', 'var(--moduix-size-xs)', 'Controls `xs` button min height.'],
  ['--moduix-button-size-sm', 'var(--moduix-size-sm)', 'Controls `sm` button min height.'],
  ['--moduix-button-size-md', 'var(--moduix-size-md)', 'Controls `md` button min height.'],
  ['--moduix-button-size-lg', 'var(--moduix-size-lg)', 'Controls `lg` button min height.'],
  ['--moduix-button-size-xl', 'var(--moduix-size-xl)', 'Controls `xl` button min height.'],
  [
    '--moduix-button-transition',
    'var(--moduix-transition-default)',
    'Controls transition timing for interactive states.',
  ],
];