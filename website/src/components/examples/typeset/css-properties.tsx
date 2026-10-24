import type { CssPropertyInput } from '../../mdx/reference';

export const typesetOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-typeset-flow', '1.25em', 'Controls space before each rendered block.'],
  ['--moduix-typeset-font-body', 'inherit', 'Controls body font family.'],
  ['--moduix-typeset-font-heading', 'var(--moduix-font-sans)', 'Controls heading font family.'],
  ['--moduix-typeset-leading', '1.75', 'Controls body line height.'],
  [
    '--moduix-typeset-font-mono',
    'var(--moduix-font-mono)',
    'Controls inline and block code font family.',
  ],
  ['--moduix-typeset-size', '1em', 'Controls the container-relative body font size.'],
];