import type { CssPropertyInput } from '../../mdx/reference';

export const clipboardOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-clipboard-gap',
    'var(--moduix-spacing-1-5)',
    'Controls spacing between label and control.',
  ],
  [
    '--moduix-clipboard-control-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between value surface and trigger.',
  ],
  ['--moduix-clipboard-height', 'var(--moduix-size-md)', 'Controls input and trigger height.'],
  [
    '--moduix-clipboard-radius',
    'var(--moduix-radius-md)',
    'Controls input and trigger corner radius.',
  ],
  [
    '--moduix-clipboard-border-color',
    'var(--moduix-color-border)',
    'Controls input and trigger border color.',
  ],
  ['--moduix-clipboard-input-bg', 'var(--moduix-color-background)', 'Controls input background.'],
  [
    '--moduix-clipboard-trigger-bg',
    'var(--moduix-color-background)',
    'Controls trigger background.',
  ],
  [
    '--moduix-clipboard-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls trigger background on hover.',
  ],
  ['--moduix-clipboard-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
];