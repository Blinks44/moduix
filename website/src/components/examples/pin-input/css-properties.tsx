import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const pinInputOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-pin-input-gap', 'var(--moduix-spacing-2)', 'Controls spacing between cells.'],
  ['--moduix-pin-input-input-size', 'var(--moduix-size-md)', 'Square cell size for every size.'],
  ['--moduix-pin-input-radius', 'var(--moduix-radius-md)', 'Controls cell corner radius.'],
];

export function PinInputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={pinInputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}