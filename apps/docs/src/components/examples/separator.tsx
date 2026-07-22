import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const separatorOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-separator-border-style',
    'active variant style',
    'Overrides the separator variant border style.',
  ],
  ['--moduix-separator-color', 'var(--moduix-color-border)', 'Controls the separator color.'],
  ['--moduix-separator-length-horizontal', '100%', 'Controls horizontal separator width.'],
  ['--moduix-separator-length-vertical', '1em', 'Controls vertical separator height.'],
  [
    '--moduix-separator-size-thickness',
    'var(--moduix-border-width-sm)',
    'Controls the recipe-provided thickness for the active size.',
  ],
  [
    '--moduix-separator-thickness',
    'var(--moduix-separator-size-thickness, var(--moduix-border-width-sm))',
    'Overrides separator thickness for both orientations.',
  ],
  ['--moduix-separator-thickness-xs', '0.5px', 'Controls extra-small recipe thickness.'],
  [
    '--moduix-separator-thickness-sm',
    'var(--moduix-border-width-sm)',
    'Controls small recipe thickness.',
  ],
  [
    '--moduix-separator-thickness-md',
    'var(--moduix-border-width-md)',
    'Controls medium recipe thickness.',
  ],
  ['--moduix-separator-thickness-lg', '3px', 'Controls large recipe thickness.'],
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