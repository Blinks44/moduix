import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

export const dialogOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-dialog-width', '28rem', 'Content width. Overrides the width from the `size` prop.'],
];

export function DialogCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={dialogOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}