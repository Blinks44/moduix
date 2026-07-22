import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const radioGroupExampleCss = `
.radio-stack {
  display: grid;
  gap: var(--moduix-spacing-2);
}

.radio-field,
.radio-fieldset {
  width: fit-content;
  max-width: min(20rem, 100%);
  margin-inline: auto;
}

.radio-button {
  width: fit-content;
  min-height: 2rem;
  border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
  border-radius: var(--moduix-radius-md);
  padding-inline: var(--moduix-spacing-3);
  background: var(--moduix-color-background);
  color: var(--moduix-color-foreground);
}

.radio-inline-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--moduix-radio-group-gap, var(--moduix-spacing-2));
}
`;

export const radioGroupAsChildCss = `
.radio-card-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  width: 14rem;
  border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
  border-radius: var(--moduix-radius-md);
  padding: var(--moduix-spacing-3);
  gap: var(--moduix-spacing-2);
}

.radio-card-item[data-state="checked"] {
  border-color: var(--moduix-color-primary);
  background-color: var(--moduix-color-accent);
}
`;

export const radioGroupIndicatorCss = `
.radio-indicator-stack {
  display: grid;
  gap: var(--moduix-spacing-2);
}

.radio-indicator-root {
  padding: var(--moduix-spacing-1);
}

.radio-group-indicator {
  border-radius: var(--moduix-radius-md);
}
`;

const radioGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-radio-bg',
    'var(--moduix-color-background)',
    'Controls unchecked item control background.',
  ],
  [
    '--moduix-radio-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked item control background.',
  ],
  ['--moduix-radio-bg-hover', 'var(--moduix-color-accent)', 'Controls unchecked hover background.'],
  [
    '--moduix-radio-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked item control border color.',
  ],
  [
    '--moduix-radio-border-color-checked',
    'var(--moduix-color-primary)',
    'Controls checked border color.',
  ],
  [
    '--moduix-radio-border-width',
    'var(--moduix-border-width-sm)',
    'Controls item control border width.',
  ],
  [
    '--moduix-radio-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  [
    '--moduix-radio-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls item control focus ring color.',
  ],
  [
    '--moduix-radio-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-radio-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-radio-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between item control and text.',
  ],
  [
    '--moduix-radio-group-color',
    'var(--moduix-color-foreground)',
    'Controls inherited group text color.',
  ],
  ['--moduix-radio-group-gap', 'var(--moduix-spacing-2)', 'Controls spacing inside the root.'],
  ['--moduix-radio-group-indicator-opacity', '0.12', 'Controls optional group indicator opacity.'],
  [
    '--moduix-radio-group-label-color',
    'var(--moduix-radio-group-color, var(--moduix-color-foreground))',
    'Controls group label text color.',
  ],
  [
    '--moduix-radio-group-label-font-size',
    'var(--moduix-text-sm)',
    'Controls group label font size.',
  ],
  [
    '--moduix-radio-group-label-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--moduix-radio-group-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls group label line height.',
  ],
  ['--moduix-radio-indicator-border-color', 'currentColor', 'Controls item dot border color.'],
  ['--moduix-radio-indicator-border-width', '0', 'Controls item dot border width.'],
  [
    '--moduix-radio-indicator-color',
    'var(--moduix-color-primary-foreground)',
    'Controls item dot color.',
  ],
  [
    '--moduix-radio-indicator-radius',
    'var(--moduix-radius-full)',
    'Controls item dot and indicator radius.',
  ],
  ['--moduix-radio-indicator-size-xs', 'var(--moduix-spacing-1)', 'Controls `xs` item dot size.'],
  ['--moduix-radio-indicator-size-sm', 'var(--moduix-spacing-1-5)', 'Controls `sm` item dot size.'],
  ['--moduix-radio-indicator-size-md', 'var(--moduix-spacing-2)', 'Controls `md` item dot size.'],
  ['--moduix-radio-indicator-size-lg', 'var(--moduix-spacing-2-5)', 'Controls `lg` item dot size.'],
  ['--moduix-radio-indicator-size-xl', 'var(--moduix-spacing-3)', 'Controls `xl` item dot size.'],
  ['--moduix-radio-label-color', 'var(--moduix-color-foreground)', 'Controls item text color.'],
  ['--moduix-radio-label-font-size', 'var(--moduix-text-sm)', 'Controls item text font size.'],
  [
    '--moduix-radio-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls item text font weight.',
  ],
  [
    '--moduix-radio-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls item text line height.',
  ],
  ['--moduix-radio-size-xs', 'var(--moduix-spacing-3-5)', 'Controls `xs` item control size.'],
  ['--moduix-radio-size-sm', 'var(--moduix-spacing-4)', 'Controls `sm` item control size.'],
  ['--moduix-radio-size-md', 'var(--moduix-spacing-5)', 'Controls `md` item control size.'],
  ['--moduix-radio-size-lg', 'var(--moduix-size-xs)', 'Controls `lg` item control size.'],
  ['--moduix-radio-size-xl', 'var(--moduix-spacing-7)', 'Controls `xl` item control size.'],
  [
    '--moduix-radio-transition',
    'var(--moduix-transition-default)',
    'Controls radio state transitions.',
  ],
];

export function RadioGroupCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={radioGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}