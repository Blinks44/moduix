import type { CssControls } from '../../mdx/customize';
import type { CssPropertyInput } from '../../mdx/reference';

export const badgeCssProperties: CssPropertyInput[] = [
  [
    '--moduix-badge-bg',
    'var(--moduix-primary)',
    'Overrides badge background color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-badge-border-color',
    'transparent',
    'Overrides badge border color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-badge-color',
    'var(--moduix-primary-foreground)',
    'Overrides badge text and icon color. Each `variant` sets its own default.',
  ],
];

export const badgeControls: CssControls = {
  '--moduix-badge-bg': 'color',
  '--moduix-badge-color': 'color',
};