import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const typesetOverrideCssProperties: CssPropertyInput[] = [
  ['--typeset-flow', '1.25em', 'Controls space before each rendered block.'],
  ['--typeset-font-body', 'inherit', 'Controls body font family.'],
  ['--typeset-font-heading', 'var(--font-sans)', 'Controls heading font family.'],
  ['--typeset-leading', '1.75', 'Controls body line height.'],
  ['--typeset-font-mono', 'var(--font-mono)', 'Controls inline and block code font family.'],
  ['--typeset-size', '1em', 'Controls the container-relative body font size.'],
];

export function TypesetCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={typesetOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}