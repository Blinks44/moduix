import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const inputOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-input-bg', 'var(--moduix-color-background)', 'Controls the input background color.'],
  ['--moduix-input-border-color', 'var(--moduix-color-border)', 'Controls the input border color.'],
  [
    '--moduix-input-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--moduix-input-border-style', 'solid', 'Controls the input border style.'],
  [
    '--moduix-input-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the input border width.',
  ],
  ['--moduix-input-color', 'var(--moduix-color-foreground)', 'Controls the input text color.'],
  [
    '--moduix-input-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled input opacity.',
  ],
  ['--moduix-input-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-input-focus-ring-offset',
    'calc(0px - var(--moduix-input-border-width, var(--moduix-border-width-sm)))',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-input-focus-ring-width',
    'var(--moduix-input-border-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-input-font-size',
    'var(--moduix-input-font-size-md, var(--moduix-text-md))',
    'Controls default font size.',
  ],
  ['--moduix-input-font-size-xs', 'var(--moduix-text-xs)', 'Controls extra-small input font size.'],
  ['--moduix-input-font-size-sm', 'var(--moduix-text-sm)', 'Controls small input font size.'],
  ['--moduix-input-font-size-md', 'var(--moduix-text-md)', 'Controls medium input font size.'],
  ['--moduix-input-font-size-lg', 'var(--moduix-text-lg)', 'Controls large input font size.'],
  ['--moduix-input-font-size-xl', 'var(--moduix-text-lg)', 'Controls extra-large input font size.'],
  [
    '--moduix-input-height',
    'var(--moduix-input-height-md, var(--moduix-size-md))',
    'Controls the default input minimum height.',
  ],
  ['--moduix-input-height-xs', 'var(--moduix-size-xs)', 'Controls extra-small input height.'],
  ['--moduix-input-height-sm', 'var(--moduix-size-sm)', 'Controls small input height.'],
  ['--moduix-input-height-md', 'var(--moduix-size-md)', 'Controls medium input height.'],
  ['--moduix-input-height-lg', 'var(--moduix-size-lg)', 'Controls large input height.'],
  ['--moduix-input-height-xl', 'var(--moduix-size-xl)', 'Controls extra-large input height.'],
  [
    '--moduix-input-line-height',
    'var(--moduix-input-line-height-md, var(--moduix-line-height-text-md))',
    'Controls default line height.',
  ],
  [
    '--moduix-input-line-height-xs',
    'var(--moduix-line-height-text-xs)',
    'Controls extra-small line height.',
  ],
  [
    '--moduix-input-line-height-sm',
    'var(--moduix-line-height-text-sm)',
    'Controls small line height.',
  ],
  [
    '--moduix-input-line-height-md',
    'var(--moduix-line-height-text-md)',
    'Controls medium line height.',
  ],
  [
    '--moduix-input-line-height-lg',
    'var(--moduix-line-height-text-lg)',
    'Controls large line height.',
  ],
  [
    '--moduix-input-line-height-xl',
    'var(--moduix-line-height-text-lg)',
    'Controls extra-large line height.',
  ],
  ['--moduix-input-max-width', 'none', 'Controls the input max width.'],
  [
    '--moduix-input-padding-x',
    'var(--moduix-input-padding-x-md, var(--moduix-spacing-3))',
    'Controls default horizontal padding.',
  ],
  [
    '--moduix-input-padding-x-xs',
    'var(--moduix-spacing-2)',
    'Controls extra-small horizontal padding.',
  ],
  ['--moduix-input-padding-x-sm', 'var(--moduix-spacing-2)', 'Controls small horizontal padding.'],
  ['--moduix-input-padding-x-md', 'var(--moduix-spacing-3)', 'Controls medium horizontal padding.'],
  ['--moduix-input-padding-x-lg', 'var(--moduix-spacing-4)', 'Controls large horizontal padding.'],
  [
    '--moduix-input-padding-x-xl',
    'var(--moduix-spacing-4)',
    'Controls extra-large horizontal padding.',
  ],
  [
    '--moduix-input-padding-y',
    'var(--moduix-input-padding-y-md, var(--moduix-spacing-1))',
    'Controls default vertical padding.',
  ],
  [
    '--moduix-input-padding-y-xs',
    'var(--moduix-spacing-0-5)',
    'Controls extra-small vertical padding.',
  ],
  ['--moduix-input-padding-y-sm', 'var(--moduix-spacing-1)', 'Controls small vertical padding.'],
  ['--moduix-input-padding-y-md', 'var(--moduix-spacing-1)', 'Controls medium vertical padding.'],
  ['--moduix-input-padding-y-lg', 'var(--moduix-spacing-1)', 'Controls large vertical padding.'],
  [
    '--moduix-input-padding-y-xl',
    'var(--moduix-spacing-2)',
    'Controls extra-large vertical padding.',
  ],
  [
    '--moduix-input-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--moduix-input-radius', 'var(--moduix-radius-md)', 'Controls input corner radius.'],
  [
    '--moduix-input-readonly-bg',
    'var(--moduix-input-bg, var(--moduix-color-background))',
    'Controls readonly input background color.',
  ],
  [
    '--moduix-input-readonly-color',
    'var(--moduix-input-color, var(--moduix-color-foreground))',
    'Controls readonly input text color.',
  ],
  [
    '--moduix-input-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
  ['--moduix-input-width', '100%', 'Controls the input width.'],
];

export function InputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={inputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

const normalizeCssProperty = (property: CssPropertyInput) =>
  'name' in property
    ? property
    : { name: property[0], defaultValue: property[1], description: property[2] };