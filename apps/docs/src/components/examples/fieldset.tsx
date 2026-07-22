import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const fieldsetExampleCss = `
  .fieldset {
    width: min(12.5rem, 100%);
    margin-inline: auto;
  }
`;

export const fieldsetPhoneInputCss = `
  .fieldset {
    width: min(12.5rem, 100%);
    margin-inline: auto;
  }

  .phone-input {
    display: grid;
    grid-template-columns: minmax(0, 6rem) minmax(0, 1fr);
    gap: var(--moduix-spacing-2);
  }

  .country-code {
    --moduix-select-width: 100%;
    --moduix-select-root-gap: var(--moduix-field-gap, var(--moduix-spacing-1));
  }
`;

const fieldsetOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-fieldset-border-color', 'transparent', 'Controls the root border color.'],
  [
    '--moduix-fieldset-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls the invalid root border color.',
  ],
  ['--moduix-fieldset-border-style', 'solid', 'Controls the root border style.'],
  ['--moduix-fieldset-border-width', '0', 'Controls the root border width.'],
  [
    '--moduix-fieldset-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-fieldset-error-text-color',
    'var(--moduix-color-destructive)',
    'Controls error text color.',
  ],
  [
    '--moduix-fieldset-gap',
    'var(--moduix-spacing-4)',
    'Controls spacing between fieldset children.',
  ],
  [
    '--moduix-fieldset-helper-text-color',
    'var(--moduix-color-muted-foreground)',
    'Controls helper text color.',
  ],
  [
    '--moduix-fieldset-legend-color',
    'var(--moduix-color-foreground)',
    'Controls legend text color.',
  ],
  ['--moduix-fieldset-legend-font-size', 'var(--moduix-text-lg)', 'Controls legend font size.'],
  [
    '--moduix-fieldset-legend-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls legend font weight.',
  ],
  [
    '--moduix-fieldset-legend-line-height',
    'var(--moduix-line-height-text-lg)',
    'Controls legend line height.',
  ],
  ['--moduix-fieldset-legend-margin', '0', 'Controls legend margin.'],
  ['--moduix-fieldset-legend-padding', '0 0 var(--moduix-spacing-3)', 'Controls legend padding.'],
  ['--moduix-fieldset-margin', '0', 'Controls root margin.'],
  ['--moduix-fieldset-max-width', 'none', 'Controls root max width.'],
  [
    '--moduix-fieldset-message-font-size',
    'var(--moduix-text-sm)',
    'Controls helper and error font size.',
  ],
  [
    '--moduix-fieldset-message-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls helper and error line height.',
  ],
  ['--moduix-fieldset-padding', '0', 'Controls root padding.'],
  ['--moduix-fieldset-radius', 'var(--moduix-radius-none)', 'Controls root corner radius.'],
  ['--moduix-fieldset-width', '100%', 'Controls root width.'],
];

export function FieldsetCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={fieldsetOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}