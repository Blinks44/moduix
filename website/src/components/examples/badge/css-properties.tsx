import type { CssPropertyInput } from '../../mdx/reference';

export const badgeCssProperties: CssPropertyInput[] = [
  [
    '--moduix-badge-bg',
    'var(--moduix-color-primary)',
    'Overrides badge background color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-badge-border-color',
    'transparent',
    'Overrides badge border color. Each `variant` sets its own default.',
  ],
  ['--moduix-badge-border-width', 'var(--moduix-border-width-sm)', 'Controls badge border width.'],
  [
    '--moduix-badge-color',
    'var(--moduix-color-primary-foreground)',
    'Overrides badge text and icon color. Each `variant` sets its own default.',
  ],
  ['--moduix-badge-dot-size', 'var(--moduix-spacing-1-5)', 'Controls BadgeDot size.'],
  [
    '--moduix-badge-font-size',
    'var(--moduix-text-xs)',
    'Overrides badge font size. Each `size` sets its own default.',
  ],
  ['--moduix-badge-font-weight', 'var(--moduix-weight-medium)', 'Controls badge font weight.'],
  ['--moduix-badge-gap', 'var(--moduix-spacing-1-5)', 'Controls space between badge children.'],
  [
    '--moduix-badge-height',
    '1.25rem',
    'Overrides badge minimum height. Each `size` sets its own default.',
  ],
  ['--moduix-badge-icon-size', 'var(--moduix-spacing-3)', 'Controls direct child SVG icon size.'],
  [
    '--moduix-badge-line-height',
    'var(--moduix-line-height-text-xs)',
    'Overrides badge line-height. Each `size` sets its own default.',
  ],
  [
    '--moduix-badge-padding-x',
    'var(--moduix-spacing-2-5)',
    'Overrides horizontal badge padding. Each `size` sets its own default.',
  ],
  ['--moduix-badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--moduix-badge-radius', 'var(--moduix-radius-full)', 'Controls badge border radius.'],
];