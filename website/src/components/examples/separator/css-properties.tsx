import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const separatorOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-separator-color', 'var(--moduix-color-border)', 'Controls the separator color.'],
  [
    '--moduix-separator-thickness',
    'active size thickness',
    'Overrides the line thickness for both orientations.',
  ],
];

export function SeparatorCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={separatorOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}