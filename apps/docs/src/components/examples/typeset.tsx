import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const typesetOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-typeset-flow', '1.25em', 'Controls space before each rendered block.'],
  ['--moduix-typeset-font-body', 'inherit', 'Controls body font family.'],
  ['--moduix-typeset-font-heading', 'var(--moduix-font-sans)', 'Controls heading font family.'],
  ['--moduix-typeset-leading', '1.75', 'Controls body line height.'],
  [
    '--moduix-typeset-font-mono',
    'var(--moduix-font-mono)',
    'Controls inline and block code font family.',
  ],
  ['--moduix-typeset-size', '1em', 'Controls the container-relative body font size.'],
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