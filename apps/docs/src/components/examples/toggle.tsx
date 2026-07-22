import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const toggleBasicCss = `
.favoriteToggle {
  --moduix-toggle-content-gap: var(--moduix-spacing-2);
}
`;

export const toggleRowCss = `
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--moduix-spacing-3);
}
`;

export const toggleStackCss = `
.stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--moduix-spacing-3);
}

.hint {
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-xs);
  line-height: var(--moduix-line-height-text-xs);
}
`;

const toggleOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-toggle-border-width',
    'var(--moduix-border-width-sm)',
    'Controls toggle border width.',
  ],
  [
    '--moduix-toggle-color',
    'var(--moduix-color-foreground)',
    'Controls base toggle text and icon color.',
  ],
  [
    '--moduix-toggle-content-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between text and icons.',
  ],
  [
    '--moduix-toggle-default-bg',
    'var(--moduix-color-secondary)',
    'Controls default variant background.',
  ],
  [
    '--moduix-toggle-default-bg-active',
    'var(--moduix-color-accent)',
    'Controls default active background.',
  ],
  [
    '--moduix-toggle-default-bg-hover',
    'var(--moduix-color-accent)',
    'Controls default hover background.',
  ],
  [
    '--moduix-toggle-default-bg-pressed',
    'var(--moduix-color-primary)',
    'Controls pressed background.',
  ],
  [
    '--moduix-toggle-default-border-color',
    'var(--moduix-color-secondary)',
    'Controls default variant border color.',
  ],
  [
    '--moduix-toggle-default-border-color-pressed',
    'var(--moduix-color-primary)',
    'Controls pressed border color.',
  ],
  [
    '--moduix-toggle-default-color',
    'var(--moduix-color-secondary-foreground)',
    'Controls default variant text color.',
  ],
  [
    '--moduix-toggle-default-color-pressed',
    'var(--moduix-color-primary-foreground)',
    'Controls pressed text and icon color.',
  ],
  [
    '--moduix-toggle-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-toggle-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-toggle-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-toggle-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  ['--moduix-toggle-font-size', 'var(--moduix-text-sm)', 'Controls base font size.'],
  ['--moduix-toggle-font-size-xs', 'var(--moduix-text-xs)', 'Controls extra-small font size.'],
  ['--moduix-toggle-font-size-lg', 'var(--moduix-text-md)', 'Controls large font size.'],
  ['--moduix-toggle-font-weight', 'var(--moduix-weight-medium)', 'Controls toggle font weight.'],
  ['--moduix-toggle-ghost-bg', 'transparent', 'Controls ghost variant background.'],
  [
    '--moduix-toggle-ghost-bg-active',
    'var(--moduix-color-accent)',
    'Controls ghost variant active background.',
  ],
  [
    '--moduix-toggle-ghost-bg-hover',
    'var(--moduix-color-accent)',
    'Controls ghost variant hover background.',
  ],
  [
    '--moduix-toggle-ghost-bg-pressed',
    'var(--moduix-color-accent)',
    'Controls ghost pressed background.',
  ],
  ['--moduix-toggle-ghost-border-color', 'transparent', 'Controls ghost variant border color.'],
  [
    '--moduix-toggle-ghost-color',
    'var(--moduix-color-foreground)',
    'Controls ghost variant text color.',
  ],
  [
    '--moduix-toggle-ghost-color-pressed',
    'var(--moduix-color-foreground)',
    'Controls ghost pressed text and icon color.',
  ],
  ['--moduix-toggle-icon-size', 'var(--moduix-spacing-4)', 'Controls nested SVG icon size.'],
  [
    '--moduix-toggle-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls base line height.',
  ],
  [
    '--moduix-toggle-line-height-xs',
    'var(--moduix-line-height-text-xs)',
    'Controls extra-small line height.',
  ],
  [
    '--moduix-toggle-line-height-lg',
    'var(--moduix-line-height-text-md)',
    'Controls large line height.',
  ],
  [
    '--moduix-toggle-outline-bg',
    'var(--moduix-color-background)',
    'Controls outline variant background.',
  ],
  [
    '--moduix-toggle-outline-bg-active',
    'var(--moduix-color-accent)',
    'Controls outline active background.',
  ],
  [
    '--moduix-toggle-outline-bg-hover',
    'var(--moduix-color-accent)',
    'Controls outline hover background.',
  ],
  [
    '--moduix-toggle-outline-bg-pressed',
    'var(--moduix-color-primary)',
    'Controls outline pressed background.',
  ],
  [
    '--moduix-toggle-outline-border-color',
    'var(--moduix-color-border)',
    'Controls outline border color.',
  ],
  [
    '--moduix-toggle-outline-border-color-pressed',
    'var(--moduix-color-primary)',
    'Controls outline pressed border color.',
  ],
  [
    '--moduix-toggle-outline-color',
    'var(--moduix-color-foreground)',
    'Controls outline text color.',
  ],
  [
    '--moduix-toggle-outline-color-pressed',
    'var(--moduix-color-primary-foreground)',
    'Controls outline pressed text color.',
  ],
  [
    '--moduix-toggle-padding-x-xs',
    'var(--moduix-spacing-2-5)',
    'Controls extra-small horizontal padding.',
  ],
  ['--moduix-toggle-padding-x-sm', 'var(--moduix-spacing-3)', 'Controls small horizontal padding.'],
  [
    '--moduix-toggle-padding-x-md',
    'var(--moduix-spacing-4)',
    'Controls medium horizontal padding.',
  ],
  ['--moduix-toggle-padding-x-lg', 'var(--moduix-spacing-5)', 'Controls large horizontal padding.'],
  [
    '--moduix-toggle-padding-y-xs',
    'var(--moduix-spacing-0-5)',
    'Controls extra-small vertical padding.',
  ],
  ['--moduix-toggle-padding-y-sm', 'var(--moduix-spacing-1)', 'Controls small vertical padding.'],
  ['--moduix-toggle-padding-y-md', 'var(--moduix-spacing-1)', 'Controls medium vertical padding.'],
  ['--moduix-toggle-padding-y-lg', 'var(--moduix-spacing-1-5)', 'Controls large vertical padding.'],
  ['--moduix-toggle-radius', 'var(--moduix-radius-md)', 'Controls toggle corner radius.'],
  [
    '--moduix-toggle-size-icon-sm',
    'var(--moduix-size-sm)',
    'Controls small icon-only toggle size.',
  ],
  [
    '--moduix-toggle-size-icon-md',
    'var(--moduix-size-md)',
    'Controls medium icon-only toggle size.',
  ],
  [
    '--moduix-toggle-size-icon-lg',
    'var(--moduix-size-lg)',
    'Controls large icon-only toggle size.',
  ],
  ['--moduix-toggle-size-xs', 'var(--moduix-size-xs)', 'Controls extra-small toggle height.'],
  ['--moduix-toggle-size-sm', 'var(--moduix-size-sm)', 'Controls small toggle height.'],
  ['--moduix-toggle-size-md', 'var(--moduix-size-md)', 'Controls medium toggle height.'],
  ['--moduix-toggle-size-lg', 'var(--moduix-size-lg)', 'Controls large toggle height.'],
  [
    '--moduix-toggle-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
];
const toggleCssPropertiesReference = toggleOverrideCssProperties.map(normalizeCssProperty);

export function ToggleCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={toggleCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}