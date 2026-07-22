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
    gap: var(--moduix-spacing-4);
  }

  .progress-circular-slider {
    width: 12rem;
  }

  ${progressCircularCircleExampleCss}
`;

export const progressCircularStateViewsExampleCss = `
  ${progressCircularCircleExampleCss}

  .progress-circular-state {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

const progressCircularCssProperties: CssPropertyInput[] = [
  [
    '--moduix-progress-circular-color',
    'var(--moduix-color-foreground)',
    'Controls root text color.',
  ],
  [
    '--moduix-progress-circular-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between label and circle.',
  ],
  ['--moduix-progress-circular-label-color', 'currentColor', 'Controls label text color.'],
  [
    '--moduix-progress-circular-label-font-size',
    'var(--moduix-text-sm)',
    'Controls label font size.',
  ],
  [
    '--moduix-progress-circular-label-font-weight',
    'var(--moduix-weight-regular)',
    'Controls label weight.',
  ],
  [
    '--moduix-progress-circular-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-progress-circular-range-bg',
    'var(--moduix-color-primary)',
    'Controls circle range color.',
  ],
  [
    '--moduix-progress-circular-range-indeterminate-animation',
    'progress-circular-indeterminate 1.4s linear infinite',
    'Controls indeterminate circle animation.',
  ],
  [
    '--moduix-progress-circular-range-indeterminate-dasharray',
    '1 200',
    'Controls indeterminate dash pattern.',
  ],
  ['--moduix-progress-circular-range-linecap', 'round', 'Controls range stroke linecap.'],
  [
    '--moduix-progress-circular-range-transition',
    'var(--moduix-transition-default)',
    'Controls circle range transition.',
  ],
  ['--moduix-progress-circular-root-width', 'max-content', 'Controls root width.'],
  ['--moduix-progress-circular-size', 'var(--moduix-size-xl)', 'Controls SVG circle size.'],
  ['--moduix-progress-circular-thickness', '0.4rem', 'Controls SVG stroke thickness.'],
  [
    '--moduix-progress-circular-track-bg',
    'var(--moduix-color-muted)',
    'Controls circle track color.',
  ],
  ['--moduix-progress-circular-value-text-color', 'currentColor', 'Controls value text color.'],
  [
    '--moduix-progress-circular-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-progress-circular-value-text-font-weight',
    'var(--moduix-weight-medium)',
    'Controls value text weight.',
  ],
  [
    '--moduix-progress-circular-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
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