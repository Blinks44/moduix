import type { CssPropertyInput } from '../../mdx/reference';

export const navigationMenuOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-navigation-menu-content-max-height',
    '24rem',
    'Controls the disclosure panel maximum height; longer panels scroll.',
  ],
  [
    '--moduix-navigation-menu-content-max-width',
    '20rem',
    'Controls the disclosure panel maximum width.',
  ],
  [
    '--moduix-navigation-menu-content-min-width',
    '12rem',
    'Controls the disclosure panel minimum width; the panel is never narrower than its trigger.',
  ],
  [
    '--moduix-navigation-menu-viewport-max-height',
    '32rem',
    'Controls the shared viewport maximum height.',
  ],
  [
    '--moduix-navigation-menu-viewport-max-width',
    '40rem',
    'Controls the shared viewport maximum width.',
  ],
];