import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const tabsExampleCss = `
  .tabs-demo-selected {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-tabs-bg', 'var(--moduix-color-background)', 'Controls the content background color.'],
  [
    '--moduix-tabs-border-color',
    'var(--moduix-color-border)',
    'Controls the content border color.',
  ],
  [
    '--moduix-tabs-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the content border width.',
  ],
  ['--moduix-tabs-color', 'var(--moduix-color-foreground)', 'Controls the root text color.'],
  [
    '--moduix-tabs-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger and content focus ring color.',
  ],
  ['--moduix-tabs-focus-ring-offset', '0', 'Controls trigger focus ring offset.'],
  [
    '--moduix-tabs-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls trigger and content focus ring width.',
  ],
  [
    '--moduix-tabs-gap',
    'var(--moduix-spacing-3)',
    'Controls spacing between the tab list and content.',
  ],
  [
    '--moduix-tabs-indicator-bg',
    'var(--moduix-color-background)',
    'Controls the indicator background.',
  ],
  ['--moduix-tabs-indicator-radius', 'var(--moduix-radius-md)', 'Controls the indicator radius.'],
  [
    '--moduix-tabs-indicator-shadow',
    'var(--moduix-shadow-sm)',
    'Controls the filled indicator shadow.',
  ],
  [
    '--moduix-tabs-indicator-size',
    'var(--moduix-spacing-8)',
    'Controls the filled indicator thickness.',
  ],
  [
    '--moduix-tabs-indicator-transition',
    'var(--moduix-transition-default)',
    'Controls the filled indicator movement transition.',
  ],
  [
    '--moduix-tabs-line-indicator-bg',
    'var(--moduix-tabs-tab-color-active, var(--moduix-color-foreground))',
    'Controls the line indicator color.',
  ],
  [
    '--moduix-tabs-line-indicator-radius',
    'var(--moduix-radius-full)',
    'Controls the line indicator radius.',
  ],
  [
    '--moduix-tabs-line-indicator-size',
    'var(--moduix-spacing-0-5)',
    'Controls the line indicator thickness.',
  ],
  [
    '--moduix-tabs-line-indicator-transition',
    'var(--moduix-transition-default)',
    'Controls the line indicator movement transition.',
  ],
  ['--moduix-tabs-list-bg', 'var(--moduix-color-muted)', 'Controls the tab list background color.'],
  [
    '--moduix-tabs-list-border-color',
    'var(--moduix-color-border)',
    'Controls the tab list border color.',
  ],
  [
    '--moduix-tabs-list-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the tab list border width.',
  ],
  ['--moduix-tabs-list-gap', 'var(--moduix-spacing-1)', 'Controls spacing between triggers.'],
  ['--moduix-tabs-list-padding', 'var(--moduix-spacing-1)', 'Controls the tab list padding.'],
  [
    '--moduix-tabs-list-padding-x',
    'var(--moduix-tabs-list-padding, var(--moduix-spacing-1))',
    'Controls the tab list horizontal padding.',
  ],
  [
    '--moduix-tabs-list-padding-y',
    'var(--moduix-tabs-list-padding, var(--moduix-spacing-1))',
    'Controls the tab list vertical padding.',
  ],
  [
    '--moduix-tabs-panel-color',
    'var(--moduix-tabs-color, var(--moduix-color-foreground))',
    'Controls content text color.',
  ],
  ['--moduix-tabs-panel-font-size', 'var(--moduix-text-sm)', 'Controls content text font size.'],
  [
    '--moduix-tabs-panel-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls content line height.',
  ],
  [
    '--moduix-tabs-panel-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls content focus ring offset.',
  ],
  ['--moduix-tabs-panel-padding', 'var(--moduix-spacing-4)', 'Controls content padding.'],
  [
    '--moduix-tabs-radius',
    'var(--moduix-radius-lg)',
    'Controls the tab list and content border radius.',
  ],
  [
    '--moduix-tabs-tab-color',
    'var(--moduix-color-muted-foreground)',
    'Controls inactive trigger text color.',
  ],
  [
    '--moduix-tabs-tab-color-active',
    'var(--moduix-color-foreground)',
    'Controls selected trigger text color.',
  ],
  [
    '--moduix-tabs-tab-color-hover',
    'var(--moduix-tabs-tab-color-active, var(--moduix-color-foreground))',
    'Controls hovered trigger text color.',
  ],
  [
    '--moduix-tabs-tab-content-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between trigger icon and label.',
  ],
  [
    '--moduix-tabs-tab-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled trigger opacity.',
  ],
  ['--moduix-tabs-tab-font-size', 'var(--moduix-text-sm)', 'Controls trigger text font size.'],
  [
    '--moduix-tabs-tab-font-weight',
    'var(--moduix-weight-medium)',
    'Controls trigger text font weight.',
  ],
  ['--moduix-tabs-tab-height', 'var(--moduix-size-sm)', 'Controls each trigger height.'],
  ['--moduix-tabs-tab-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
  ['--moduix-tabs-tab-icon-color', 'currentColor', 'Controls trigger icon color.'],
  [
    '--moduix-tabs-tab-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger text line height.',
  ],
  [
    '--moduix-tabs-tab-padding-x',
    'var(--moduix-spacing-2-5)',
    'Controls each trigger horizontal padding.',
  ],
  ['--moduix-tabs-tab-radius', 'var(--moduix-radius-md)', 'Controls each trigger border radius.'],
  [
    '--moduix-tabs-tab-transition',
    'var(--moduix-transition-default)',
    'Controls trigger text color transition.',
  ],
  [
    '--moduix-tabs-vertical-list-width',
    '12rem',
    'Controls the list width in vertical orientation.',
  ],
];

export function TabsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={tabsOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}