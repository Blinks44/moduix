import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const toggleGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--toggle-group-bg', 'var(--color-muted)', 'Controls group background color.'],
  ['--toggle-group-border-color', 'var(--color-border)', 'Controls group border color.'],
  ['--toggle-group-border-width', 'var(--border-width-sm)', 'Controls group border width.'],
  ['--toggle-group-color', 'var(--color-foreground)', 'Controls group text color.'],
  ['--toggle-group-gap', 'var(--border-width-sm)', 'Controls spacing between items.'],
  ['--toggle-group-ghost-bg', 'transparent', 'Controls ghost variant group background.'],
  [
    '--toggle-group-ghost-border-color',
    'transparent',
    'Controls ghost variant group border color.',
  ],
  ['--toggle-group-ghost-padding', '0', 'Controls ghost variant group padding.'],
  ['--toggle-group-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  [
    '--toggle-group-outline-bg',
    'var(--color-background)',
    'Controls outline variant group background.',
  ],
  ['--toggle-group-padding', 'var(--border-width-md)', 'Controls group inner padding.'],
  ['--toggle-group-radius', 'var(--radius-lg)', 'Controls group corner radius.'],
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