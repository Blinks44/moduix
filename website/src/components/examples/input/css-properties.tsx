import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const inputOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-input-height', 'var(--moduix-size-md)', 'Controls the minimum height for every size.'],
  ['--moduix-input-radius', 'var(--moduix-radius-md)', 'Controls the border radius.'],
  [
    '--moduix-input-width',
    '100%',
    'Controls the width; with `htmlSize` the default is the native character width (`auto`).',
  ],
];

export function InputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={inputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

const normalizeCssProperty = (property: CssPropertyInput) =>
  'name' in property
    ? property
    : { name: property[0], defaultValue: property[1], description: property[2] };