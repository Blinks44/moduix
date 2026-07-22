import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const fieldOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-field-color',
    'var(--moduix-color-foreground)',
    'Controls inherited field text color.',
  ],
  [
    '--moduix-field-control-bg',
    'var(--moduix-color-background)',
    'Controls field control background.',
  ],
  [
    '--moduix-field-control-border-color',
    'var(--moduix-color-border)',
    'Controls field control border color.',
  ],
  [
    '--moduix-field-control-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid field control border and focus ring color.',
  ],
  ['--moduix-field-control-border-style', 'solid', 'Controls field control border style.'],
  [
    '--moduix-field-control-border-width',
    'var(--moduix-border-width-sm)',
    'Controls field control border width.',
  ],
  [
    '--moduix-field-control-color',
    'var(--moduix-color-foreground)',
    'Controls field control text color.',
  ],
  [
    '--moduix-field-control-font-size',
    'var(--moduix-text-md)',
    'Controls field control font size.',
  ],
  [
    '--moduix-field-control-height',
    'var(--moduix-size-md)',
    'Controls field control minimum height.',
  ],
  [
    '--moduix-field-control-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls field control line height.',
  ],
  [
    '--moduix-field-control-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls field control horizontal padding.',
  ],
  [
    '--moduix-field-control-padding-y',
    'var(--moduix-spacing-1)',
    'Controls field control vertical padding.',
  ],
  [
    '--moduix-field-control-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls field control placeholder color.',
  ],
  [
    '--moduix-field-control-radius',
    'var(--moduix-radius-md)',
    'Controls field control corner radius.',
  ],
  [
    '--moduix-field-control-transition',
    'var(--moduix-transition-default)',
    'Controls field control state transition timing.',
  ],
  ['--moduix-field-control-width', '100%', 'Controls field control width.'],
  [
    '--moduix-field-description-color',
    'var(--moduix-color-muted-foreground)',
    'Controls helper text color.',
  ],
  [
    '--moduix-field-description-font-size',
    'var(--moduix-text-sm)',
    'Controls helper text font size.',
  ],
  [
    '--moduix-field-description-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls helper text line height.',
  ],
  [
    '--moduix-field-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled field opacity.',
  ],
  ['--moduix-field-error-color', 'var(--moduix-color-destructive)', 'Controls error text color.'],
  ['--moduix-field-error-font-size', 'var(--moduix-text-sm)', 'Controls error text font size.'],
  [
    '--moduix-field-error-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls error text line height.',
  ],
  [
    '--moduix-field-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls field control focus ring color.',
  ],
  [
    '--moduix-field-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls field control focus ring offset.',
  ],
  [
    '--moduix-field-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls field control focus ring width.',
  ],
  ['--moduix-field-gap', 'var(--moduix-spacing-1)', 'Controls spacing between field parts.'],
  ['--moduix-field-item-gap', 'var(--moduix-spacing-1)', 'Controls spacing inside `Field.Item`.'],
  ['--moduix-field-label-color', 'var(--moduix-color-foreground)', 'Controls label text color.'],
  ['--moduix-field-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-field-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  ['--moduix-field-label-gap', 'var(--moduix-spacing-2)', 'Controls spacing inside `Field.Label`.'],
  [
    '--moduix-field-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-field-max-width', 'none', 'Controls the root field max width.'],
  [
    '--moduix-field-required-indicator-color',
    'var(--moduix-color-destructive)',
    'Controls required indicator color.',
  ],
  ['--moduix-field-textarea-min-height', '5rem', 'Controls `Field.Textarea` minimum height.'],
  ['--moduix-field-width', '100%', 'Controls the root field width.'],
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