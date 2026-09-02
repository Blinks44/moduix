import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const treeViewOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tree-view-checkbox-bg',
    'var(--moduix-color-background)',
    'Customizes tree view checkbox bg.',
  ],
  [
    '--moduix-tree-view-checkbox-border-color',
    'var(--moduix-color-border)',
    'Customizes tree view checkbox border color.',
  ],
  [
    '--moduix-tree-view-checkbox-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view checkbox border width.',
  ],
  [
    '--moduix-tree-view-checkbox-checked-bg',
    'var(--moduix-color-primary)',
    'Customizes tree view checkbox checked bg.',
  ],
  [
    '--moduix-tree-view-checkbox-color',
    'var(--moduix-color-primary-foreground)',
    'Customizes tree view checkbox color.',
  ],
  [
    '--moduix-tree-view-checkbox-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Customizes tree view checkbox focus ring offset.',
  ],
  [
    '--moduix-tree-view-checkbox-icon-size',
    'var(--moduix-spacing-3)',
    'Customizes tree view checkbox icon size.',
  ],
  [
    '--moduix-tree-view-checkbox-radius',
    'var(--moduix-radius-xs)',
    'Customizes tree view checkbox radius.',
  ],
  ['--moduix-tree-view-checkbox-size', 'var(--moduix-spacing-4)', 'Controls node checkbox size.'],
  ['--moduix-tree-view-color', 'var(--moduix-color-foreground)', 'Controls text and icon color.'],
  [
    '--moduix-tree-view-content-transition-duration',
    '150ms',
    'Customizes tree view content transition duration.',
  ],
  [
    '--moduix-tree-view-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Customizes tree view disabled opacity.',
  ],
  [
    '--moduix-tree-view-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls row and checkbox focus rings.',
  ],
  [
    '--moduix-tree-view-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Customizes tree view focus ring width.',
  ],
  ['--moduix-tree-view-indent', '1rem', 'Controls nested row indentation.'],
  [
    '--moduix-tree-view-indent-guide-color',
    'var(--moduix-color-border)',
    'Controls branch guide color.',
  ],
  [
    '--moduix-tree-view-indent-guide-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view indent guide width.',
  ],
  ['--moduix-tree-view-indicator-color', 'currentColor', 'Customizes tree view indicator color.'],
  [
    '--moduix-tree-view-indicator-icon-size',
    'var(--moduix-spacing-3-5)',
    'Customizes tree view indicator icon size.',
  ],
  [
    '--moduix-tree-view-indicator-size',
    'var(--moduix-spacing-4)',
    'Customizes tree view indicator size.',
  ],
  ['--moduix-tree-view-item-bg', 'transparent', 'Customizes tree view item bg.'],
  [
    '--moduix-tree-view-item-border-color',
    'transparent',
    'Customizes tree view item border color.',
  ],
  ['--moduix-tree-view-item-border-width', '0', 'Customizes tree view item border width.'],
  [
    '--moduix-tree-view-item-color',
    'var(--moduix-tree-view-color, var(--moduix-color-foreground))',
    'Customizes tree view item color.',
  ],
  [
    '--moduix-tree-view-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes tree view item disabled color.',
  ],
  [
    '--moduix-tree-view-item-font-size',
    'var(--moduix-text-sm)',
    'Customizes tree view item font size.',
  ],
  ['--moduix-tree-view-item-gap', 'var(--moduix-spacing-2)', 'Customizes tree view item gap.'],
  [
    '--moduix-tree-view-item-hover-bg',
    'var(--moduix-color-accent)',
    'Controls row hover background.',
  ],
  [
    '--moduix-tree-view-item-hover-color',
    'var(--moduix-color-accent-foreground)',
    'Customizes tree view item hover color.',
  ],
  [
    '--moduix-tree-view-item-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes tree view item line height.',
  ],
  [
    '--moduix-tree-view-item-min-height',
    'var(--moduix-size-sm)',
    'Controls branch and item row height.',
  ],
  [
    '--moduix-tree-view-item-padding-x',
    'var(--moduix-spacing-2)',
    'Customizes tree view item padding x.',
  ],
  [
    '--moduix-tree-view-item-padding-y',
    'var(--moduix-spacing-1)',
    'Customizes tree view item padding y.',
  ],
  [
    '--moduix-tree-view-item-radius',
    'var(--moduix-radius-sm)',
    'Customizes tree view item radius.',
  ],
  [
    '--moduix-tree-view-item-selected-bg',
    'var(--moduix-color-accent)',
    'Controls selected row background.',
  ],
  [
    '--moduix-tree-view-item-selected-color',
    'var(--moduix-color-accent-foreground)',
    'Customizes tree view item selected color.',
  ],
  [
    '--moduix-tree-view-item-text-gap',
    'var(--moduix-spacing-2)',
    'Customizes tree view item text gap.',
  ],
  [
    '--moduix-tree-view-label-color',
    'var(--moduix-tree-view-color, var(--moduix-color-foreground))',
    'Customizes tree view label color.',
  ],
  [
    '--moduix-tree-view-label-font-size',
    'var(--moduix-text-sm)',
    'Customizes tree view label font size.',
  ],
  [
    '--moduix-tree-view-label-font-weight',
    'var(--moduix-weight-medium)',
    'Customizes tree view label font weight.',
  ],
  [
    '--moduix-tree-view-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes tree view label line height.',
  ],
  ['--moduix-tree-view-max-width', '100%', 'Customizes tree view max width.'],
  [
    '--moduix-tree-view-node-icon-size',
    'var(--moduix-spacing-4)',
    'Controls file and folder icon size.',
  ],
  [
    '--moduix-tree-view-rename-input-bg',
    'var(--moduix-color-background)',
    'Customizes tree view rename input bg.',
  ],
  [
    '--moduix-tree-view-rename-input-border-color',
    'var(--moduix-color-ring)',
    'Customizes tree view rename input border color.',
  ],
  [
    '--moduix-tree-view-rename-input-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view rename input border width.',
  ],
  [
    '--moduix-tree-view-rename-input-color',
    'var(--moduix-color-foreground)',
    'Customizes tree view rename input color.',
  ],
  [
    '--moduix-tree-view-rename-input-padding-x',
    'var(--moduix-spacing-1)',
    'Customizes tree view rename input padding x.',
  ],
  [
    '--moduix-tree-view-rename-input-padding-y',
    '0',
    'Customizes tree view rename input padding y.',
  ],
  [
    '--moduix-tree-view-rename-input-radius',
    'var(--moduix-radius-xs)',
    'Customizes tree view rename input radius.',
  ],
  ['--moduix-tree-view-root-gap', 'var(--moduix-spacing-2)', 'Customizes tree view root gap.'],
  ['--moduix-tree-view-row-gap', 'var(--moduix-spacing-1)', 'Controls the gap between tree rows.'],
  [
    '--moduix-tree-view-transition',
    'var(--moduix-transition-default)',
    'Customizes tree view transition.',
  ],
  ['--moduix-tree-view-width', '20rem', 'Controls the root width.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function TreeViewCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={treeViewOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}