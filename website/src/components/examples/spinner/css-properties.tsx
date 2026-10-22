import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const spinnerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-spinner-ring-border-width',
    'var(--moduix-border-width-md)',
    'Controls ring stroke width.',
  ],
  [
    '--moduix-spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  [
    '--moduix-spinner-size',
    'size-specific, md: var(--moduix-spacing-5)',
    'Overrides the spinner size for every size except inherit.',
  ],
];

export function SpinnerCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={spinnerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}