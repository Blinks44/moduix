import type { CssPropertyInput } from '../../mdx/reference';

export const swapOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-swap-transition',
    'var(--moduix-transition-slow)',
    'Controls the enter and exit animation timing.',
  ],
  [
    '--moduix-swap-enter-starting-opacity',
    '0',
    'Controls the starting opacity of the entering indicator.',
  ],
  [
    '--moduix-swap-enter-starting-scale',
    '0.5',
    'Controls the starting scale of the entering indicator.',
  ],
  [
    '--moduix-swap-exit-ending-opacity',
    '0',
    'Controls the ending opacity of the exiting indicator.',
  ],
  ['--moduix-swap-exit-ending-scale', '0.5', 'Controls the ending scale of the exiting indicator.'],
  [
    '--moduix-swap-rotate-enter-starting-angle',
    '-180deg',
    'Controls the starting rotation of the entering indicator.',
  ],
  [
    '--moduix-swap-rotate-exit-ending-angle',
    '180deg',
    'Controls the ending rotation of the exiting indicator.',
  ],
  [
    '--moduix-swap-flip-perspective',
    '24rem',
    'Controls the 3D perspective used by the flip animation.',
  ],
  [
    '--moduix-swap-flip-enter-starting-angle',
    '-180deg',
    'Controls the starting Y-axis rotation of the entering indicator.',
  ],
  [
    '--moduix-swap-flip-exit-ending-angle',
    '180deg',
    'Controls the ending Y-axis rotation of the exiting indicator.',
  ],
];