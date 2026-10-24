import type { CssPropertyInput } from '../../mdx/reference';

export const inputOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-input-height', 'var(--moduix-size-md)', 'Controls the minimum height for every size.'],
  ['--moduix-input-radius', 'var(--moduix-radius-md)', 'Controls the border radius.'],
  [
    '--moduix-input-width',
    '100%',
    'Controls the width; with `htmlSize` the default is the native character width (`auto`).',
  ],
];