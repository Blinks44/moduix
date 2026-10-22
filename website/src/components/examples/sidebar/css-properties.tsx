import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const sidebarOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-sidebar-width', '100%', 'Controls the width of the Sidebar root.'],
  ['--moduix-sidebar-height', '100dvh', 'Controls the height of the Sidebar root.'],
  [
    '--moduix-sidebar-trigger-offset-y',
    '40px',
    'Moves the floating SidebarTrigger down from the top edge.',
  ],
];

export function SidebarCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={sidebarOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}