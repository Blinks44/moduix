import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const segmentGroupExampleCss = `
.segment-stack {
  display: grid;
  gap: var(--moduix-spacing-2);
  justify-items: start;
}

.segment-button {
  width: fit-content;
}

.segment-output {
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-xs);
  line-height: var(--moduix-line-height-text-xs);
}

.segment-root-provider {
  width: 100%;
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
  gap: var(--moduix-spacing-3);
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
  padding: var(--moduix-spacing-3);
  white-space: normal;
}

.segment-card-title {
  font-weight: var(--moduix-weight-semibold);
}

.segment-card-description {
  position: relative;
  z-index: 1;
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-xs);
  line-height: var(--moduix-line-height-text-xs);
}

.segment-card-item[data-state="checked"] .segment-card-description {
  color: var(--moduix-segment-group-item-color-checked, var(--moduix-color-foreground));
}
`;

const segmentGroupOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-segment-group-bg', 'var(--moduix-color-muted)', 'Controls the root background.'],
  [
    '--moduix-segment-group-border-color',
    'var(--moduix-color-border)',
    'Controls the root border color.',
  ],
  [
    '--moduix-segment-group-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid root border color.',
  ],
  [
    '--moduix-segment-group-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the root border width.',
  ],
  [
    '--moduix-segment-group-color',
    'var(--moduix-color-foreground)',
    'Controls inherited group text color.',
  ],
  [
    '--moduix-segment-group-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled root opacity.',
  ],
  [
    '--moduix-segment-group-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls item focus ring color.',
  ],
  [
    '--moduix-segment-group-focus-ring-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid item focus ring color.',
  ],
  [
    '--moduix-segment-group-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls item focus ring offset.',
  ],
  [
    '--moduix-segment-group-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls item focus ring width.',
  ],
  [
    '--moduix-segment-group-gap',
    'var(--moduix-spacing-1)',
    'Controls spacing between segment items.',
  ],
  [
    '--moduix-segment-group-indicator-bg',
    'var(--moduix-color-background)',
    'Controls indicator background.',
  ],
  [
    '--moduix-segment-group-indicator-radius',
    'var(--moduix-radius-md)',
    'Controls indicator radius.',
  ],
  [
    '--moduix-segment-group-indicator-shadow',
    'var(--moduix-shadow-sm)',
    'Controls indicator shadow.',
  ],
  [
    '--moduix-segment-group-indicator-transition-duration',
    'var(--moduix-duration-normal)',
    'Controls indicator movement duration.',
  ],
  [
    '--moduix-segment-group-indicator-transition-timing-function',
    'var(--moduix-ease-in-out)',
    'Controls indicator movement easing.',
  ],
  [
    '--moduix-segment-group-item-color',
    'var(--moduix-color-muted-foreground)',
    'Controls unchecked item text.',
  ],
  [
    '--moduix-segment-group-item-color-checked',
    'var(--moduix-color-foreground)',
    'Controls checked item text.',
  ],
  [
    '--moduix-segment-group-item-color-hover',
    'var(--moduix-color-foreground)',
    'Controls item hover text.',
  ],
  [
    '--moduix-segment-group-item-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  ['--moduix-segment-group-item-font-size', 'var(--moduix-text-sm)', 'Controls item font size.'],
  [
    '--moduix-segment-group-item-font-weight',
    'var(--moduix-weight-medium)',
    'Controls item font weight.',
  ],
  [
    '--moduix-segment-group-item-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing inside each item.',
  ],
  ['--moduix-segment-group-item-height', 'var(--moduix-size-sm)', 'Controls item minimum height.'],
  [
    '--moduix-segment-group-item-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls item line height.',
  ],
  [
    '--moduix-segment-group-item-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls horizontal item padding.',
  ],
  ['--moduix-segment-group-item-radius', 'var(--moduix-radius-md)', 'Controls item radius.'],
  [
    '--moduix-segment-group-label-color',
    'var(--moduix-segment-group-color, var(--moduix-color-foreground))',
    'Controls label text color.',
  ],
  ['--moduix-segment-group-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-segment-group-label-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls label font weight.',
  ],
  [
    '--moduix-segment-group-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-segment-group-max-width', '100%', 'Controls root maximum width.'],
  ['--moduix-segment-group-padding', 'var(--moduix-spacing-1)', 'Controls root padding.'],
  ['--moduix-segment-group-radius', 'var(--moduix-radius-lg)', 'Controls root radius.'],
  [
    '--moduix-segment-group-transition',
    'var(--moduix-transition-default)',
    'Controls item transitions.',
  ],
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