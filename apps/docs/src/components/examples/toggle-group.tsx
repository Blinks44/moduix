import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const toggleGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-toggle-group-bg', 'var(--moduix-color-muted)', 'Controls group background color.'],
  [
    '--moduix-toggle-group-border-color',
    'var(--moduix-color-border)',
    'Controls group border color.',
  ],
  [
    '--moduix-toggle-group-border-width',
    'var(--moduix-border-width-sm)',
    'Controls group border width.',
  ],
  ['--moduix-toggle-group-color', 'var(--moduix-color-foreground)', 'Controls group text color.'],
  ['--moduix-toggle-group-gap', 'var(--moduix-border-width-sm)', 'Controls spacing between items.'],
  ['--moduix-toggle-group-ghost-bg', 'transparent', 'Controls ghost variant group background.'],
  [
    '--moduix-toggle-group-ghost-border-color',
    'transparent',
    'Controls ghost variant group border color.',
  ],
  ['--moduix-toggle-group-ghost-padding', '0', 'Controls ghost variant group padding.'],
  ['--moduix-toggle-group-item-radius', 'var(--moduix-radius-md)', 'Controls item corner radius.'],
  [
    '--moduix-toggle-group-outline-bg',
    'var(--moduix-color-background)',
    'Controls outline variant group background.',
  ],
  [
    '--moduix-toggle-group-padding',
    'var(--moduix-border-width-md)',
    'Controls group inner padding.',
  ],
  ['--moduix-toggle-group-radius', 'var(--moduix-radius-lg)', 'Controls group corner radius.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

const toggleGroupCssPropertiesReference =
  toggleGroupOverrideCssProperties.map(normalizeCssProperty);

export function ToggleGroupCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={toggleGroupCssPropertiesReference} />;
}