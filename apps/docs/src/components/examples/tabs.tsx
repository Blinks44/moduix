import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const tabsExampleCss = `
  .rp-preview [data-scope='tabs'][data-part='root'] {
    width: min(32rem, 100%);
  }

  .tabs-demo {
    width: min(32rem, 100%);
  }
`;

const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--tabs-bg', 'var(--color-background)', 'Controls the content background color.'],
  ['--tabs-border-color', 'var(--color-border)', 'Controls the content border color.'],
  ['--tabs-border-width', 'var(--border-width-sm)', 'Controls the content border width.'],
  ['--tabs-color', 'var(--color-foreground)', 'Controls the root text color.'],
  [
    '--tabs-focus-ring-color',
    'var(--color-ring)',
    'Controls trigger and content focus ring color.',
  ],
  ['--tabs-focus-ring-offset', '0', 'Controls trigger focus ring offset.'],
  [
    '--tabs-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls trigger and content focus ring width.',
  ],
  ['--tabs-gap', 'var(--spacing-3)', 'Controls spacing between the tab list and content.'],
  ['--tabs-indicator-bg', 'var(--color-background)', 'Controls the indicator background.'],
  ['--tabs-indicator-radius', 'var(--radius-md)', 'Controls the indicator radius.'],
  ['--tabs-indicator-shadow', 'var(--shadow-sm)', 'Controls the filled indicator shadow.'],
  ['--tabs-indicator-size', 'var(--spacing-8)', 'Controls the filled indicator thickness.'],
  [
    '--tabs-indicator-transition',
    'var(--transition-default)',
    'Controls the filled indicator movement transition.',
  ],
  [
    '--tabs-line-indicator-bg',
    'var(--tabs-tab-color-active, var(--color-foreground))',
    'Controls the line indicator color.',
  ],
  ['--tabs-line-indicator-radius', 'var(--radius-full)', 'Controls the line indicator radius.'],
  ['--tabs-line-indicator-size', 'var(--spacing-0-5)', 'Controls the line indicator thickness.'],
  [
    '--tabs-line-indicator-transition',
    'var(--transition-default)',
    'Controls the line indicator movement transition.',
  ],
  ['--tabs-list-bg', 'var(--color-muted)', 'Controls the tab list background color.'],
  ['--tabs-list-border-color', 'var(--color-border)', 'Controls the tab list border color.'],
  ['--tabs-list-border-width', 'var(--border-width-sm)', 'Controls the tab list border width.'],
  ['--tabs-list-gap', 'var(--spacing-1)', 'Controls spacing between triggers.'],
  ['--tabs-list-padding', 'var(--spacing-1)', 'Controls the tab list padding.'],
  [
    '--tabs-list-padding-x',
    'var(--tabs-list-padding, var(--spacing-1))',
    'Controls the tab list horizontal padding.',
  ],
  [
    '--tabs-list-padding-y',
    'var(--tabs-list-padding, var(--spacing-1))',
    'Controls the tab list vertical padding.',
  ],
  [
    '--tabs-panel-color',
    'var(--tabs-color, var(--color-foreground))',
    'Controls content text color.',
  ],
  ['--tabs-panel-font-size', 'var(--text-sm)', 'Controls content text font size.'],
  ['--tabs-panel-line-height', 'var(--line-height-text-sm)', 'Controls content line height.'],
  [
    '--tabs-panel-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls content focus ring offset.',
  ],
  ['--tabs-panel-padding', 'var(--spacing-4)', 'Controls content padding.'],
  ['--tabs-radius', 'var(--radius-lg)', 'Controls the tab list and content border radius.'],
  ['--tabs-tab-color', 'var(--color-muted-foreground)', 'Controls inactive trigger text color.'],
  ['--tabs-tab-color-active', 'var(--color-foreground)', 'Controls selected trigger text color.'],
  [
    '--tabs-tab-color-hover',
    'var(--tabs-tab-color-active, var(--color-foreground))',
    'Controls hovered trigger text color.',
  ],
  [
    '--tabs-tab-content-gap',
    'var(--spacing-2)',
    'Controls spacing between trigger icon and label.',
  ],
  ['--tabs-tab-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--tabs-tab-font-size', 'var(--text-sm)', 'Controls trigger text font size.'],
  ['--tabs-tab-font-weight', 'var(--weight-medium)', 'Controls trigger text font weight.'],
  ['--tabs-tab-height', 'var(--size-sm)', 'Controls each trigger height.'],
  ['--tabs-tab-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--tabs-tab-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--tabs-tab-line-height', 'var(--line-height-text-sm)', 'Controls trigger text line height.'],
  ['--tabs-tab-padding-x', 'var(--spacing-2-5)', 'Controls each trigger horizontal padding.'],
  ['--tabs-tab-radius', 'var(--radius-md)', 'Controls each trigger border radius.'],
  ['--tabs-tab-transition', 'var(--transition-default)', 'Controls trigger text color transition.'],
  ['--tabs-vertical-list-width', '12rem', 'Controls the list width in vertical orientation.'],
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