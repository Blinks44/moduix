import type { CssPropertyInput } from '../../mdx/reference';

export const scrollAreaOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-scroll-area-fade-size',
    'var(--moduix-spacing-10)',
    'Controls the top and bottom fade depth when `fade` is enabled.',
  ],
  [
    '--moduix-scroll-area-scrollbar-size',
    'var(--moduix-spacing-1)',
    'Controls the scrollbar track thickness; the track grows by 2px on hover and drag.',
  ],
  [
    '--moduix-scroll-area-thumb-bg',
    'var(--moduix-color-border)',
    'Controls the draggable thumb color.',
  ],
];