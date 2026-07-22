import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const separatorOverrideCssProperties: CssPropertyInput[] = [
  [
    '--separator-border-style',
    'active variant style',
    'Overrides the separator variant border style.',
  ],
  ['--separator-color', 'var(--color-border)', 'Controls the separator color.'],
  ['--separator-length-horizontal', '100%', 'Controls horizontal separator width.'],
  ['--separator-length-vertical', '1em', 'Controls vertical separator height.'],
  [
    '--separator-size-thickness',
    'var(--border-width-sm)',
    'Controls the recipe-provided thickness for the active size.',
  ],
  [
    '--separator-thickness',
    'var(--separator-size-thickness, var(--border-width-sm))',
    'Overrides separator thickness for both orientations.',
  ],
  ['--separator-thickness-xs', '0.5px', 'Controls extra-small recipe thickness.'],
  ['--separator-thickness-sm', 'var(--border-width-sm)', 'Controls small recipe thickness.'],
  ['--separator-thickness-md', 'var(--border-width-md)', 'Controls medium recipe thickness.'],
  ['--separator-thickness-lg', '3px', 'Controls large recipe thickness.'],
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