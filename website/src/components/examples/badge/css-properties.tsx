import type { CssPropertyInput } from '../../mdx/reference';

export const badgeCssProperties: CssPropertyInput[] = [
  ['--moduix-badge-bg', 'Variant-specific fallback', 'Overrides badge background color.'],
  ['--moduix-badge-border-color', 'Variant-specific fallback', 'Overrides badge border color.'],
  ['--moduix-badge-border-width', 'var(--moduix-border-width-sm)', 'Controls badge border width.'],
  ['--moduix-badge-color', 'Variant-specific fallback', 'Overrides badge text and icon color.'],
  ['--moduix-badge-dot-size', 'var(--moduix-spacing-1-5)', 'Controls BadgeDot size.'],
  ['--moduix-badge-font-size', 'Size-specific fallback', 'Overrides badge font size.'],
  ['--moduix-badge-font-weight', 'var(--moduix-weight-medium)', 'Controls badge font weight.'],
  ['--moduix-badge-gap', 'var(--moduix-spacing-1-5)', 'Controls space between badge children.'],
  ['--moduix-badge-height', 'Size-specific fallback', 'Overrides badge minimum height.'],
  ['--moduix-badge-icon-size', 'var(--moduix-spacing-3)', 'Controls direct child SVG icon size.'],
  ['--moduix-badge-line-height', 'Size-specific fallback', 'Overrides badge line-height.'],
  ['--moduix-badge-padding-x', 'Size-specific fallback', 'Overrides horizontal badge padding.'],
  ['--moduix-badge-padding-y', '0', 'Controls vertical badge padding.'],
  ['--moduix-badge-radius', 'var(--moduix-radius-full)', 'Controls badge border radius.'],
];