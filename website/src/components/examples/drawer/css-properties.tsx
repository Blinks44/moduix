import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

export const drawerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-drawer-island-inset',
    'var(--moduix-spacing-4)',
    'Viewport inset of an island drawer. Safe-area insets still apply.',
  ],
];

export function DrawerCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={drawerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}