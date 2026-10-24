import type { CssPropertyInput } from '../../mdx/reference';

export const comboboxOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-combobox-action-size',
    'var(--moduix-size-xs)',
    'Controls the trigger and clear action size and the input space reserved for them.',
  ],
  [
    '--moduix-combobox-content-max-height',
    '24rem',
    'Controls the popup maximum height; the available viewport height still caps it.',
  ],
  ['--moduix-combobox-control-height', 'var(--moduix-size-md)', 'Controls the input height.'],
  [
    '--moduix-combobox-radius',
    'var(--moduix-radius-md)',
    'Controls the control and popup content radius.',
  ],
  ['--moduix-combobox-width', '16rem', 'Controls the root width.'],
];