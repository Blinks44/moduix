import type { CssPropertyInput } from '../../mdx/reference';

export const datePickerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-date-picker-content-width',
    '20rem',
    'Controls the calendar popup width. Set it inside the overlay subtree, for example on DatePickerContent.',
  ],
  ['--moduix-date-picker-control-height', 'var(--moduix-size-md)', 'Controls the input height.'],
  ['--moduix-date-picker-radius', 'var(--moduix-radius-md)', 'Controls the input radius.'],
  [
    '--moduix-date-picker-table-cell-size',
    'var(--moduix-size-sm)',
    'Controls the calendar cell size.',
  ],
  [
    '--moduix-date-picker-width',
    '18.75rem (24rem for range fields)',
    'Controls the root width; the field fills the root.',
  ],
];