import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const inputGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-input-group-addon-bg',
    'var(--moduix-color-muted)',
    'Controls addon background color.',
  ],
  [
    '--moduix-input-group-addon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls addon text and icon color.',
  ],
  [
    '--moduix-input-group-addon-gap',
    'var(--moduix-spacing-2)',
    'Controls space between addon children.',
  ],
  [
    '--moduix-input-group-addon-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls default addon padding.',
  ],
  [
    '--moduix-input-group-addon-padding-x-xs',
    'var(--moduix-spacing-2-5)',
    'Controls addon padding for `xs`.',
  ],
  [
    '--moduix-input-group-addon-padding-x-sm',
    'var(--moduix-spacing-3)',
    'Controls addon padding for `sm`.',
  ],
  [
    '--moduix-input-group-addon-padding-x-md',
    'var(--moduix-spacing-3-5)',
    'Controls addon padding for `md`.',
  ],
  [
    '--moduix-input-group-addon-padding-x-lg',
    'var(--moduix-spacing-4)',
    'Controls addon padding for `lg`.',
  ],
  [
    '--moduix-input-group-addon-padding-x-xl',
    'var(--moduix-spacing-4-5)',
    'Controls addon padding for `xl`.',
  ],
  ['--moduix-input-group-bg', 'var(--moduix-color-background)', 'Controls group background color.'],
  [
    '--moduix-input-group-border-color',
    'var(--moduix-color-border)',
    'Controls group border color.',
  ],
  [
    '--moduix-input-group-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--moduix-input-group-border-style', 'solid', 'Controls group border style.'],
  [
    '--moduix-input-group-border-width',
    'var(--moduix-border-width-sm)',
    'Controls group border width.',
  ],
  [
    '--moduix-input-group-button-color',
    'var(--moduix-color-foreground)',
    'Controls grouped button color.',
  ],
  [
    '--moduix-input-group-button-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls grouped button focus offset.',
  ],
  ['--moduix-input-group-color', 'var(--moduix-color-foreground)', 'Controls group text color.'],
  [
    '--moduix-input-group-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-input-group-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-input-group-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-input-group-focus-ring-width',
    'var(--moduix-input-group-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--moduix-input-group-font-size', 'var(--moduix-text-md)', 'Controls default font size.'],
  ['--moduix-input-group-font-size-xs', 'var(--moduix-text-xs)', 'Controls font size for `xs`.'],
  ['--moduix-input-group-font-size-sm', 'var(--moduix-text-sm)', 'Controls font size for `sm`.'],
  ['--moduix-input-group-font-size-md', 'var(--moduix-text-md)', 'Controls font size for `md`.'],
  ['--moduix-input-group-font-size-lg', 'var(--moduix-text-lg)', 'Controls font size for `lg`.'],
  ['--moduix-input-group-font-size-xl', 'var(--moduix-text-lg)', 'Controls font size for `xl`.'],
  [
    '--moduix-input-group-height',
    'var(--moduix-input-group-height-md, var(--moduix-size-md))',
    'Controls group height.',
  ],
  ['--moduix-input-group-height-xs', 'var(--moduix-size-xs)', 'Controls height for `xs`.'],
  ['--moduix-input-group-height-sm', 'var(--moduix-size-sm)', 'Controls height for `sm`.'],
  ['--moduix-input-group-height-md', 'var(--moduix-size-md)', 'Controls height for `md`.'],
  ['--moduix-input-group-height-lg', 'var(--moduix-size-lg)', 'Controls height for `lg`.'],
  ['--moduix-input-group-height-xl', 'var(--moduix-size-xl)', 'Controls height for `xl`.'],
  ['--moduix-input-group-icon-size', 'var(--moduix-spacing-4)', 'Controls addon icon size.'],
  [
    '--moduix-input-group-input-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls default input inline padding.',
  ],
  [
    '--moduix-input-group-input-padding-x-xs',
    'var(--moduix-spacing-2-5)',
    'Controls input inline padding for `xs`.',
  ],
  [
    '--moduix-input-group-input-padding-x-sm',
    'var(--moduix-spacing-3)',
    'Controls input inline padding for `sm`.',
  ],
  [
    '--moduix-input-group-input-padding-x-md',
    'var(--moduix-spacing-3-5)',
    'Controls input inline padding for `md`.',
  ],
  [
    '--moduix-input-group-input-padding-x-lg',
    'var(--moduix-spacing-4)',
    'Controls input inline padding for `lg`.',
  ],
  [
    '--moduix-input-group-input-padding-x-xl',
    'var(--moduix-spacing-4-5)',
    'Controls input inline padding for `xl`.',
  ],
  [
    '--moduix-input-group-input-padding-y',
    'var(--moduix-spacing-2)',
    'Controls default input block padding.',
  ],
  [
    '--moduix-input-group-input-padding-y-xs',
    'var(--moduix-spacing-0-5)',
    'Controls input block padding for `xs`.',
  ],
  [
    '--moduix-input-group-input-padding-y-sm',
    '0.3125rem',
    'Controls input block padding for `sm`.',
  ],
  [
    '--moduix-input-group-input-padding-y-md',
    'var(--moduix-spacing-1)',
    'Controls input block padding for `md`.',
  ],
  [
    '--moduix-input-group-input-padding-y-lg',
    'var(--moduix-spacing-1)',
    'Controls input block padding for `lg`.',
  ],
  [
    '--moduix-input-group-input-padding-y-xl',
    'var(--moduix-spacing-2)',
    'Controls input block padding for `xl`.',
  ],
  [
    '--moduix-input-group-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls default line height.',
  ],
  [
    '--moduix-input-group-line-height-xs',
    'var(--moduix-line-height-text-xs)',
    'Controls line height for `xs`.',
  ],
  [
    '--moduix-input-group-line-height-sm',
    'var(--moduix-line-height-text-sm)',
    'Controls line height for `sm`.',
  ],
  [
    '--moduix-input-group-line-height-md',
    'var(--moduix-line-height-text-md)',
    'Controls line height for `md`.',
  ],
  [
    '--moduix-input-group-line-height-lg',
    'var(--moduix-line-height-text-lg)',
    'Controls line height for `lg`.',
  ],
  [
    '--moduix-input-group-line-height-xl',
    'var(--moduix-line-height-text-lg)',
    'Controls line height for `xl`.',
  ],
  ['--moduix-input-group-max-width', 'none', 'Controls group max width.'],
  ['--moduix-input-group-radius', 'var(--moduix-radius-md)', 'Controls group border radius.'],
  [
    '--moduix-input-group-readonly-bg',
    'var(--moduix-input-group-bg, var(--moduix-color-background))',
    'Controls shell background when the grouped input is read-only.',
  ],
  [
    '--moduix-input-group-readonly-border-color',
    'var(--moduix-input-group-border-color, var(--moduix-color-border))',
    'Controls shell border color when the grouped input is read-only.',
  ],
  [
    '--moduix-input-group-readonly-color',
    'var(--moduix-input-group-color, var(--moduix-color-foreground))',
    'Controls shell text color when the grouped input is read-only.',
  ],
  [
    '--moduix-input-group-separator-color',
    'var(--moduix-color-border)',
    'Controls addon separator color.',
  ],
  [
    '--moduix-input-group-separator-width',
    'var(--moduix-border-width-sm)',
    'Controls addon separator width.',
  ],
  [
    '--moduix-input-group-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
  ['--moduix-input-group-width', '100%', 'Controls group width.'],
];

export function InputGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={inputGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

const normalizeCssProperty = (property: CssPropertyInput) =>
  'name' in property
    ? property
    : { name: property[0], defaultValue: property[1], description: property[2] };