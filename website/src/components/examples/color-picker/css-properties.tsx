import type { CssPropertyInput } from '../../mdx/reference';

export const colorPickerOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-color-picker-area-height', '10rem', 'Controls the color area height.'],
  [
    '--moduix-color-picker-channel-slider-height',
    'var(--moduix-spacing-3)',
    'Controls channel slider thickness, including the default track.',
  ],
  ['--moduix-color-picker-content-width', '16rem', 'Controls the popup content width.'],
  [
    '--moduix-color-picker-radius',
    'var(--moduix-radius-md)',
    'Controls the radius of the trigger, inputs, actions, and popup content.',
  ],
  [
    '--moduix-color-picker-swatch-size',
    'var(--moduix-size-sm)',
    'Controls swatch size, including the default swatch inside ColorPickerSwatchTrigger.',
  ],
  [
    '--moduix-color-picker-thumb-size',
    'var(--moduix-spacing-4)',
    'Controls the color area and channel slider thumb size.',
  ],
  [
    '--moduix-color-picker-trigger-size',
    'var(--moduix-size-md)',
    'Controls the square trigger size and the minimum width of a fit-content trigger.',
  ],
  ['--moduix-color-picker-width', '16rem', 'Controls the root width.'],
];