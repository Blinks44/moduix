import type { CssPropertyInput } from '../mdx/reference';

export const badgeCssProperties: CssPropertyInput[] = [
  ['--badge-bg', 'var(--color-primary)', 'Controls badge background color.'],
  ['--badge-border-color', 'transparent', 'Controls badge border color.'],
  ['--badge-border-width', 'var(--border-width-sm)', 'Controls badge border width.'],
  ['--badge-color', 'var(--color-primary-foreground)', 'Controls badge text and icon color.'],
  ['--badge-dot-size', 'var(--spacing-1-5)', 'Controls Badge.Dot size.'],
  ['--badge-font-size', 'var(--text-xs)', 'Controls badge font size.'],
  ['--badge-font-weight', 'var(--weight-medium)', 'Controls badge font weight.'],
  ['--badge-gap', 'var(--spacing-1-5)', 'Controls space between badge children.'],
  ['--badge-height', '1.25rem', 'Controls badge minimum height.'],
  ['--badge-icon-size', 'var(--spacing-3)', 'Controls direct child SVG icon size.'],
  ['--badge-line-height', 'var(--line-height-text-xs)', 'Controls badge line-height.'],
  ['--badge-link-underline-offset', '0.15em', 'Controls link badge underline offset.'],
  ['--badge-padding-x', 'var(--spacing-2-5)', 'Controls horizontal badge padding.'],
  ['--badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--badge-radius', 'var(--radius-full)', 'Controls badge border radius.'],
];