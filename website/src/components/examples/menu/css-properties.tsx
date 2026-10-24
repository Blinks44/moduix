import type { CssPropertyInput } from '../../mdx/reference';

export const menuOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-menu-popup-max-height',
    '24rem',
    'Controls the viewport maximum height; longer menus scroll.',
  ],
  ['--moduix-menu-popup-max-width', '20rem', 'Controls the content maximum width.'],
  [
    '--moduix-menu-popup-min-width',
    '12rem',
    'Controls the content minimum width; the content is never narrower than its trigger.',
  ],
];