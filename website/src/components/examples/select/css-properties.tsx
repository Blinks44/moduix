import type { CssPropertyInput } from '../../mdx/reference';

export const selectOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-select-action-size',
    'var(--moduix-size-xs)',
    'Controls the indicator and clear action size and the trigger space reserved for them.',
  ],
  [
    '--moduix-select-content-max-height',
    '24rem',
    'Controls the popup maximum height; the available viewport height still caps it.',
  ],
  ['--moduix-select-control-height', 'var(--moduix-size-md)', 'Controls the trigger height.'],
  [
    '--moduix-select-radius',
    'var(--moduix-radius-md)',
    'Controls the trigger and popup content radius.',
  ],
  ['--moduix-select-width', '14rem', 'Controls the root width.'],
];