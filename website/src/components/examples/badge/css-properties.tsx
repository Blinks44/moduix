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
  [
    '--moduix-badge-color',
    'var(--moduix-color-primary-foreground)',
    'Overrides badge text and icon color. Each `variant` sets its own default.',
  ],
];