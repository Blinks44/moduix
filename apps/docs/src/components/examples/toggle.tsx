import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const toggleBasicCss = `
.favoriteToggle {
  --toggle-content-gap: var(--spacing-2);
}
`;

export const toggleRowCss = `
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
}
`;

export const toggleStackCss = `
.stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.hint {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}
`;

const toggleOverrideCssProperties: CssPropertyInput[] = [
  ['--toggle-border-width', 'var(--border-width-sm)', 'Controls toggle border width.'],
  ['--toggle-color', 'var(--color-foreground)', 'Controls base toggle text and icon color.'],
  ['--toggle-content-gap', 'var(--spacing-2)', 'Controls spacing between text and icons.'],
  ['--toggle-default-bg', 'var(--color-secondary)', 'Controls default variant background.'],
  ['--toggle-default-bg-active', 'var(--color-accent)', 'Controls default active background.'],
  ['--toggle-default-bg-hover', 'var(--color-accent)', 'Controls default hover background.'],
  ['--toggle-default-bg-pressed', 'var(--color-primary)', 'Controls pressed background.'],
  [
    '--toggle-default-border-color',
    'var(--color-secondary)',
    'Controls default variant border color.',
  ],
  [
    '--toggle-default-border-color-pressed',
    'var(--color-primary)',
    'Controls pressed border color.',
  ],
  [
    '--toggle-default-color',
    'var(--color-secondary-foreground)',
    'Controls default variant text color.',
  ],
  [
    '--toggle-default-color-pressed',
    'var(--color-primary-foreground)',
    'Controls pressed text and icon color.',
  ],
  ['--toggle-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--toggle-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--toggle-focus-ring-offset', 'var(--focus-ring-inset-offset)', 'Controls focus ring offset.'],
  [
    '--toggle-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--toggle-font-size', 'var(--text-sm)', 'Controls base font size.'],
  ['--toggle-font-size-xs', 'var(--text-xs)', 'Controls extra-small font size.'],
  ['--toggle-font-size-lg', 'var(--text-md)', 'Controls large font size.'],
  ['--toggle-font-weight', 'var(--weight-medium)', 'Controls toggle font weight.'],
  ['--toggle-ghost-bg', 'transparent', 'Controls ghost variant background.'],
  ['--toggle-ghost-bg-active', 'var(--color-accent)', 'Controls ghost variant active background.'],
  ['--toggle-ghost-bg-hover', 'var(--color-accent)', 'Controls ghost variant hover background.'],
  ['--toggle-ghost-bg-pressed', 'var(--color-accent)', 'Controls ghost pressed background.'],
  ['--toggle-ghost-border-color', 'transparent', 'Controls ghost variant border color.'],
  ['--toggle-ghost-color', 'var(--color-foreground)', 'Controls ghost variant text color.'],
  [
    '--toggle-ghost-color-pressed',
    'var(--color-foreground)',
    'Controls ghost pressed text and icon color.',
  ],
  ['--toggle-icon-size', 'var(--spacing-4)', 'Controls nested SVG icon size.'],
  ['--toggle-line-height', 'var(--line-height-text-sm)', 'Controls base line height.'],
  ['--toggle-line-height-xs', 'var(--line-height-text-xs)', 'Controls extra-small line height.'],
  ['--toggle-line-height-lg', 'var(--line-height-text-md)', 'Controls large line height.'],
  ['--toggle-outline-bg', 'var(--color-background)', 'Controls outline variant background.'],
  ['--toggle-outline-bg-active', 'var(--color-accent)', 'Controls outline active background.'],
  ['--toggle-outline-bg-hover', 'var(--color-accent)', 'Controls outline hover background.'],
  ['--toggle-outline-bg-pressed', 'var(--color-primary)', 'Controls outline pressed background.'],
  ['--toggle-outline-border-color', 'var(--color-border)', 'Controls outline border color.'],
  [
    '--toggle-outline-border-color-pressed',
    'var(--color-primary)',
    'Controls outline pressed border color.',
  ],
  ['--toggle-outline-color', 'var(--color-foreground)', 'Controls outline text color.'],
  [
    '--toggle-outline-color-pressed',
    'var(--color-primary-foreground)',
    'Controls outline pressed text color.',
  ],
  ['--toggle-padding-x-xs', 'var(--spacing-2-5)', 'Controls extra-small horizontal padding.'],
  ['--toggle-padding-x-sm', 'var(--spacing-3)', 'Controls small horizontal padding.'],
  ['--toggle-padding-x-md', 'var(--spacing-4)', 'Controls medium horizontal padding.'],
  ['--toggle-padding-x-lg', 'var(--spacing-5)', 'Controls large horizontal padding.'],
  ['--toggle-padding-y-xs', 'var(--spacing-0-5)', 'Controls extra-small vertical padding.'],
  ['--toggle-padding-y-sm', 'var(--spacing-1)', 'Controls small vertical padding.'],
  ['--toggle-padding-y-md', 'var(--spacing-1)', 'Controls medium vertical padding.'],
  ['--toggle-padding-y-lg', 'var(--spacing-1-5)', 'Controls large vertical padding.'],
  ['--toggle-radius', 'var(--radius-md)', 'Controls toggle corner radius.'],
  ['--toggle-size-icon-sm', 'var(--size-sm)', 'Controls small icon-only toggle size.'],
  ['--toggle-size-icon-md', 'var(--size-md)', 'Controls medium icon-only toggle size.'],
  ['--toggle-size-icon-lg', 'var(--size-lg)', 'Controls large icon-only toggle size.'],
  ['--toggle-size-xs', 'var(--size-xs)', 'Controls extra-small toggle height.'],
  ['--toggle-size-sm', 'var(--size-sm)', 'Controls small toggle height.'],
  ['--toggle-size-md', 'var(--size-md)', 'Controls medium toggle height.'],
  ['--toggle-size-lg', 'var(--size-lg)', 'Controls large toggle height.'],
  ['--toggle-transition', 'var(--transition-default)', 'Controls state transition timing.'],
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