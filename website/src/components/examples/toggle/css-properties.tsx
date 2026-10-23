import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const toggleOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-toggle-bg',
    'var(--moduix-color-secondary)',
    'Controls the unpressed background. Outline uses the background color, ghost is transparent.',
  ],
  [
    '--moduix-toggle-bg-hover',
    'var(--moduix-color-accent)',
    'Controls the unpressed hover and active background.',
  ],
  [
    '--moduix-toggle-bg-pressed',
    'var(--moduix-color-primary)',
    'Controls the pressed background and border color. Ghost uses the accent color.',
  ],
  [
    '--moduix-toggle-border-color',
    'var(--moduix-color-secondary)',
    'Controls the unpressed border color. Outline uses the border color, ghost is transparent.',
  ],
  [
    '--moduix-toggle-color',
    'var(--moduix-color-secondary-foreground)',
    'Controls the unpressed text and icon color. Outline and ghost use the foreground color.',
  ],
  [
    '--moduix-toggle-color-pressed',
    'var(--moduix-color-primary-foreground)',
    'Controls the pressed text and icon color. Ghost uses the foreground color.',
  ],
];

export function ToggleCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={toggleOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}