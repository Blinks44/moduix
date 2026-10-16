import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

export const editableOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-editable-area-height',
    'var(--moduix-size-md)',
    'Controls the area minimum height and the square trigger size.',
  ],
];

export function EditableCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={editableOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}