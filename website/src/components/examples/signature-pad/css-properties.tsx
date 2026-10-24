import type { CssPropertyInput } from '../../mdx/reference';

export const signaturePadCssProperties: CssPropertyInput[] = [
  ['--moduix-signature-pad-width', '17.5rem', 'Controls the root width.'],
  ['--moduix-signature-pad-height', '10rem', 'Controls the drawing area height.'],
  [
    '--moduix-signature-pad-bg',
    'var(--moduix-color-background)',
    'Controls the drawing area background.',
  ],
  [
    '--moduix-signature-pad-border-color',
    'var(--moduix-color-border)',
    'Controls the drawing area border color.',
  ],
  ['--moduix-signature-pad-radius', 'var(--moduix-radius-md)', 'Controls the drawing area radius.'],
  [
    '--moduix-signature-pad-stroke-color',
    'currentColor',
    'Controls the default stroke color when drawing.fill is not set.',
  ],
  [
    '--moduix-signature-pad-guide-color',
    'var(--moduix-color-border)',
    'Controls the guide line color.',
  ],
];