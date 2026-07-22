import type { CssPropertyInput } from '../mdx/reference';

export const badgeCssProperties: CssPropertyInput[] = [
  ['--moduix-badge-bg', 'var(--moduix-color-primary)', 'Controls badge background color.'],
  ['--moduix-badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--moduix-badge-border-width', 'var(--moduix-border-width-sm)', 'Controls badge border width.'],
  [
    '--moduix-badge-color',
    'var(--moduix-color-primary-foreground)',
    'Controls badge text and icon color.',
  ],
  ['--moduix-badge-dot-size', 'var(--moduix-spacing-1-5)', 'Controls Badge.Dot size.'],
  ['--moduix-badge-font-size', 'var(--moduix-text-xs)', 'Controls badge font size.'],
  ['--moduix-badge-font-weight', 'var(--moduix-weight-medium)', 'Controls badge font weight.'],
  ['--moduix-badge-gap', 'var(--moduix-spacing-1-5)', 'Controls space between badge children.'],
  ['--moduix-badge-height', '1.25rem', 'Controls badge minimum height.'],
  ['--moduix-badge-icon-size', 'var(--moduix-spacing-3)', 'Controls direct child SVG icon size.'],
  [
    '--moduix-badge-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls badge line-height.',
  ],
  ['--moduix-badge-link-underline-offset', '0.15em', 'Controls link badge underline offset.'],
  ['--moduix-badge-padding-x', 'var(--moduix-spacing-2-5)', 'Controls horizontal badge padding.'],
  ['--moduix-badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--moduix-badge-radius', 'var(--moduix-radius-full)', 'Controls badge border radius.'],
];