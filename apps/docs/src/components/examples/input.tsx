import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const inputOverrideCssProperties: CssPropertyInput[] = [
  ['--input-bg', 'var(--color-background)', 'Controls the input background color.'],
  ['--input-border-color', 'var(--color-border)', 'Controls the input border color.'],
  [
    '--input-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--input-border-style', 'solid', 'Controls the input border style.'],
  ['--input-border-width', 'var(--border-width-sm)', 'Controls the input border width.'],
  ['--input-color', 'var(--color-foreground)', 'Controls the input text color.'],
  ['--input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled input opacity.'],
  ['--input-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--input-focus-ring-offset',
    'calc(0px - var(--input-border-width, var(--border-width-sm)))',
    'Controls focus ring offset.',
  ],
  [
    '--input-focus-ring-width',
    'var(--input-border-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls focus ring width.',
  ],
  ['--input-font-size', 'var(--input-font-size-md, var(--text-md))', 'Controls default font size.'],
  ['--input-font-size-xs', 'var(--text-xs)', 'Controls extra-small input font size.'],
  ['--input-font-size-sm', 'var(--text-sm)', 'Controls small input font size.'],
  ['--input-font-size-md', 'var(--text-md)', 'Controls medium input font size.'],
  ['--input-font-size-lg', 'var(--text-lg)', 'Controls large input font size.'],
  ['--input-font-size-xl', 'var(--text-lg)', 'Controls extra-large input font size.'],
  [
    '--input-height',
    'var(--input-height-md, var(--size-md))',
    'Controls the default input minimum height.',
  ],
  ['--input-height-xs', 'var(--size-xs)', 'Controls extra-small input height.'],
  ['--input-height-sm', 'var(--size-sm)', 'Controls small input height.'],
  ['--input-height-md', 'var(--size-md)', 'Controls medium input height.'],
  ['--input-height-lg', 'var(--size-lg)', 'Controls large input height.'],
  ['--input-height-xl', 'var(--size-xl)', 'Controls extra-large input height.'],
  [
    '--input-line-height',
    'var(--input-line-height-md, var(--line-height-text-md))',
    'Controls default line height.',
  ],
  ['--input-line-height-xs', 'var(--line-height-text-xs)', 'Controls extra-small line height.'],
  ['--input-line-height-sm', 'var(--line-height-text-sm)', 'Controls small line height.'],
  ['--input-line-height-md', 'var(--line-height-text-md)', 'Controls medium line height.'],
  ['--input-line-height-lg', 'var(--line-height-text-lg)', 'Controls large line height.'],
  ['--input-line-height-xl', 'var(--line-height-text-lg)', 'Controls extra-large line height.'],
  ['--input-max-width', 'none', 'Controls the input max width.'],
  [
    '--input-padding-x',
    'var(--input-padding-x-md, var(--spacing-3))',
    'Controls default horizontal padding.',
  ],
  ['--input-padding-x-xs', 'var(--spacing-2)', 'Controls extra-small horizontal padding.'],
  ['--input-padding-x-sm', 'var(--spacing-2)', 'Controls small horizontal padding.'],
  ['--input-padding-x-md', 'var(--spacing-3)', 'Controls medium horizontal padding.'],
  ['--input-padding-x-lg', 'var(--spacing-4)', 'Controls large horizontal padding.'],
  ['--input-padding-x-xl', 'var(--spacing-4)', 'Controls extra-large horizontal padding.'],
  [
    '--input-padding-y',
    'var(--input-padding-y-md, var(--spacing-1))',
    'Controls default vertical padding.',
  ],
  ['--input-padding-y-xs', 'var(--spacing-0-5)', 'Controls extra-small vertical padding.'],
  ['--input-padding-y-sm', 'var(--spacing-1)', 'Controls small vertical padding.'],
  ['--input-padding-y-md', 'var(--spacing-1)', 'Controls medium vertical padding.'],
  ['--input-padding-y-lg', 'var(--spacing-1)', 'Controls large vertical padding.'],
  ['--input-padding-y-xl', 'var(--spacing-2)', 'Controls extra-large vertical padding.'],
  ['--input-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--input-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  [
    '--input-readonly-bg',
    'var(--input-bg, var(--color-background))',
    'Controls readonly input background color.',
  ],
  [
    '--input-readonly-color',
    'var(--input-color, var(--color-foreground))',
    'Controls readonly input text color.',
  ],
  ['--input-transition', 'var(--transition-default)', 'Controls state transition timing.'],
  ['--input-width', '100%', 'Controls the input width.'],
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