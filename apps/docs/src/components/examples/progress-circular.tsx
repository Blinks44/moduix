import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const progressCircularCircleExampleCss = `
  .progress-circular-circle-container {
    position: relative;
    display: inline-grid;
    place-items: center;
  }

  .progress-circular-circle-container [data-slot="progress-circular-circle"] {
    grid-area: 1 / 1;
  }

  .progress-circular-circle-container [data-slot="progress-circular-value-text"] {
    grid-area: 1 / 1;
  }
`;

export const progressCircularBasicExampleCss = progressCircularCircleExampleCss;

export const progressCircularControlledExampleCss = `
  .progress-circular-stack {
    display: grid;
    justify-items: center;
    gap: var(--spacing-4);
  }

  .progress-circular-slider {
    width: 12rem;
  }

  ${progressCircularCircleExampleCss}
`;

export const progressCircularStateViewsExampleCss = `
  ${progressCircularCircleExampleCss}

  .progress-circular-state {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

const progressCircularCssProperties: CssPropertyInput[] = [
  ['--progress-circular-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--progress-circular-gap', 'var(--spacing-2)', 'Controls spacing between label and circle.'],
  ['--progress-circular-label-color', 'currentColor', 'Controls label text color.'],
  ['--progress-circular-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-circular-label-font-weight', 'var(--weight-regular)', 'Controls label weight.'],
  [
    '--progress-circular-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--progress-circular-range-bg', 'var(--color-primary)', 'Controls circle range color.'],
  [
    '--progress-circular-range-indeterminate-animation',
    'progress-circular-indeterminate 1.4s linear infinite',
    'Controls indeterminate circle animation.',
  ],
  [
    '--progress-circular-range-indeterminate-dasharray',
    '1 200',
    'Controls indeterminate dash pattern.',
  ],
  ['--progress-circular-range-linecap', 'round', 'Controls range stroke linecap.'],
  [
    '--progress-circular-range-transition',
    'var(--transition-default)',
    'Controls circle range transition.',
  ],
  ['--progress-circular-root-width', 'max-content', 'Controls root width.'],
  ['--progress-circular-size', 'var(--size-xl)', 'Controls SVG circle size.'],
  ['--progress-circular-thickness', '0.4rem', 'Controls SVG stroke thickness.'],
  ['--progress-circular-track-bg', 'var(--color-muted)', 'Controls circle track color.'],
  ['--progress-circular-value-text-color', 'currentColor', 'Controls value text color.'],
  ['--progress-circular-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--progress-circular-value-text-font-weight',
    'var(--weight-medium)',
    'Controls value text weight.',
  ],
  [
    '--progress-circular-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
];

const progressCircularCssPropertiesReference =
  progressCircularCssProperties.map(normalizeCssProperty);

export function ProgressCircularCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={progressCircularCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}