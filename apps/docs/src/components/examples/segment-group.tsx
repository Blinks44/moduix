import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const segmentGroupExampleCss = `
.segment-stack {
  display: grid;
  gap: var(--spacing-2);
  justify-items: start;
}

.segment-button {
  width: fit-content;
}

.segment-output {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}
`;

export const segmentGroupVerticalCss = `
.segment-vertical {
  min-width: 10rem;
}
`;

const segmentGroupFormCss = `
.segment-form {
  display: grid;
  gap: var(--spacing-3);
  justify-items: start;
}
`;

export const segmentGroupFormExampleCss = `${segmentGroupExampleCss}
${segmentGroupFormCss}`;

export const segmentGroupAsChildCss = `
.segment-card-item {
  display: grid;
  gap: 0.125rem;
  width: 9rem;
  min-height: 4.5rem;
  align-content: center;
  justify-items: start;
  padding: var(--spacing-3);
  white-space: normal;
}

.segment-card-title {
  font-weight: var(--weight-semibold);
}

.segment-card-description {
  position: relative;
  z-index: 1;
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
  line-height: var(--line-height-text-xs);
}

.segment-card-item[data-state="checked"] .segment-card-description {
  color: var(--segment-group-item-color-checked, var(--color-foreground));
}
`;

const segmentGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--segment-group-bg', 'var(--color-muted)', 'Controls the root background.'],
  ['--segment-group-border-color', 'var(--color-border)', 'Controls the root border color.'],
  [
    '--segment-group-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid root border color.',
  ],
  ['--segment-group-border-width', 'var(--border-width-sm)', 'Controls the root border width.'],
  ['--segment-group-color', 'var(--color-foreground)', 'Controls inherited group text color.'],
  [
    '--segment-group-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled root opacity.',
  ],
  ['--segment-group-focus-ring-color', 'var(--color-ring)', 'Controls item focus ring color.'],
  [
    '--segment-group-focus-ring-color-invalid',
    'var(--color-destructive)',
    'Controls invalid item focus ring color.',
  ],
  [
    '--segment-group-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls item focus ring offset.',
  ],
  [
    '--segment-group-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls item focus ring width.',
  ],
  ['--segment-group-gap', 'var(--spacing-1)', 'Controls spacing between segment items.'],
  ['--segment-group-indicator-bg', 'var(--color-background)', 'Controls indicator background.'],
  ['--segment-group-indicator-radius', 'var(--radius-md)', 'Controls indicator radius.'],
  ['--segment-group-indicator-shadow', 'var(--shadow-sm)', 'Controls indicator shadow.'],
  [
    '--segment-group-indicator-transition-duration',
    'var(--duration-normal)',
    'Controls indicator movement duration.',
  ],
  [
    '--segment-group-indicator-transition-timing-function',
    'var(--ease-in-out)',
    'Controls indicator movement easing.',
  ],
  ['--segment-group-item-color', 'var(--color-muted-foreground)', 'Controls unchecked item text.'],
  ['--segment-group-item-color-checked', 'var(--color-foreground)', 'Controls checked item text.'],
  ['--segment-group-item-color-hover', 'var(--color-foreground)', 'Controls item hover text.'],
  [
    '--segment-group-item-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  ['--segment-group-item-font-size', 'var(--text-sm)', 'Controls item font size.'],
  ['--segment-group-item-font-weight', 'var(--weight-medium)', 'Controls item font weight.'],
  ['--segment-group-item-gap', 'var(--spacing-2)', 'Controls spacing inside each item.'],
  ['--segment-group-item-height', 'var(--size-sm)', 'Controls item minimum height.'],
  ['--segment-group-item-line-height', 'var(--line-height-text-sm)', 'Controls item line height.'],
  ['--segment-group-item-padding-x', 'var(--spacing-3-5)', 'Controls horizontal item padding.'],
  ['--segment-group-item-radius', 'var(--radius-md)', 'Controls item radius.'],
  [
    '--segment-group-label-color',
    'var(--segment-group-color, var(--color-foreground))',
    'Controls label text color.',
  ],
  ['--segment-group-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--segment-group-label-font-weight', 'var(--weight-semibold)', 'Controls label font weight.'],
  [
    '--segment-group-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--segment-group-max-width', '100%', 'Controls root maximum width.'],
  ['--segment-group-padding', 'var(--spacing-1)', 'Controls root padding.'],
  ['--segment-group-radius', 'var(--radius-lg)', 'Controls root radius.'],
  ['--segment-group-transition', 'var(--transition-default)', 'Controls item transitions.'],
];

export function SegmentGroupCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={segmentGroupOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}