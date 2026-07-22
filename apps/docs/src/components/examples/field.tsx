import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const fieldOverrideCssProperties: CssPropertyInput[] = [
  ['--field-color', 'var(--color-foreground)', 'Controls inherited field text color.'],
  ['--field-control-bg', 'var(--color-background)', 'Controls field control background.'],
  ['--field-control-border-color', 'var(--color-border)', 'Controls field control border color.'],
  [
    '--field-control-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid field control border and focus ring color.',
  ],
  ['--field-control-border-style', 'solid', 'Controls field control border style.'],
  [
    '--field-control-border-width',
    'var(--border-width-sm)',
    'Controls field control border width.',
  ],
  ['--field-control-color', 'var(--color-foreground)', 'Controls field control text color.'],
  ['--field-control-font-size', 'var(--text-md)', 'Controls field control font size.'],
  ['--field-control-height', 'var(--size-md)', 'Controls field control minimum height.'],
  [
    '--field-control-line-height',
    'var(--line-height-text-md)',
    'Controls field control line height.',
  ],
  ['--field-control-padding-x', 'var(--spacing-3-5)', 'Controls field control horizontal padding.'],
  ['--field-control-padding-y', 'var(--spacing-1)', 'Controls field control vertical padding.'],
  [
    '--field-control-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls field control placeholder color.',
  ],
  ['--field-control-radius', 'var(--radius-md)', 'Controls field control corner radius.'],
  [
    '--field-control-transition',
    'var(--transition-default)',
    'Controls field control state transition timing.',
  ],
  ['--field-control-width', '100%', 'Controls field control width.'],
  ['--field-description-color', 'var(--color-muted-foreground)', 'Controls helper text color.'],
  ['--field-description-font-size', 'var(--text-sm)', 'Controls helper text font size.'],
  [
    '--field-description-line-height',
    'var(--line-height-text-sm)',
    'Controls helper text line height.',
  ],
  ['--field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled field opacity.'],
  ['--field-error-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--field-error-font-size', 'var(--text-sm)', 'Controls error text font size.'],
  ['--field-error-line-height', 'var(--line-height-text-sm)', 'Controls error text line height.'],
  ['--field-focus-ring-color', 'var(--color-ring)', 'Controls field control focus ring color.'],
  [
    '--field-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls field control focus ring offset.',
  ],
  [
    '--field-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls field control focus ring width.',
  ],
  ['--field-gap', 'var(--spacing-1)', 'Controls spacing between field parts.'],
  ['--field-item-gap', 'var(--spacing-1)', 'Controls spacing inside `Field.Item`.'],
  ['--field-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--field-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--field-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--field-label-gap', 'var(--spacing-2)', 'Controls spacing inside `Field.Label`.'],
  ['--field-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--field-max-width', 'none', 'Controls the root field max width.'],
  [
    '--field-required-indicator-color',
    'var(--color-destructive)',
    'Controls required indicator color.',
  ],
  ['--field-textarea-min-height', '5rem', 'Controls `Field.Textarea` minimum height.'],
  ['--field-width', '100%', 'Controls the root field width.'],
];

export function FieldCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={fieldOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}