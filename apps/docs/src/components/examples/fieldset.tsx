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
    gap: var(--spacing-2);
  }

  .country-code {
    --select-width: 100%;
  }
`;

const fieldsetOverrideCssProperties: CssPropertyInput[] = [
  ['--fieldset-border-color', 'transparent', 'Controls the root border color.'],
  [
    '--fieldset-border-color-invalid',
    'var(--color-destructive)',
    'Controls the invalid root border color.',
  ],
  ['--fieldset-border-style', 'solid', 'Controls the root border style.'],
  ['--fieldset-border-width', '0', 'Controls the root border width.'],
  ['--fieldset-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--fieldset-error-text-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset children.'],
  ['--fieldset-helper-text-color', 'var(--color-muted-foreground)', 'Controls helper text color.'],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
  ['--fieldset-legend-font-size', 'var(--text-lg)', 'Controls legend font size.'],
  ['--fieldset-legend-font-weight', 'var(--weight-semibold)', 'Controls legend font weight.'],
  ['--fieldset-legend-line-height', 'var(--line-height-text-lg)', 'Controls legend line height.'],
  ['--fieldset-legend-margin', '0', 'Controls legend margin.'],
  ['--fieldset-legend-padding', '0 0 var(--spacing-3)', 'Controls legend padding.'],
  ['--fieldset-margin', '0', 'Controls root margin.'],
  ['--fieldset-max-width', 'none', 'Controls root max width.'],
  ['--fieldset-message-font-size', 'var(--text-sm)', 'Controls helper and error font size.'],
  [
    '--fieldset-message-line-height',
    'var(--line-height-text-sm)',
    'Controls helper and error line height.',
  ],
  ['--fieldset-padding', '0', 'Controls root padding.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls root corner radius.'],
  ['--fieldset-width', '100%', 'Controls root width.'],
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