import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const progressLinearExampleCss = `
  .progress-linear-stack {
    display: grid;
    gap: var(--moduix-spacing-4);
  }

  .progress-linear-slider {
    width: 12rem;
  }
`;

export const progressLinearVerticalCss = `
  .progress-linear-vertical {
    --moduix-progress-linear-height: 10rem;

    margin-inline: auto;
  }

  .progress-linear-vertical [data-slot='progress-linear-track'] {
    justify-self: center;
  }
`;

const progressLinearCssProperties: CssPropertyInput[] = [
  ['--moduix-progress-linear-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-progress-linear-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between label/value and track.',
  ],
  ['--moduix-progress-linear-height', '12rem', 'Controls vertical root height.'],
  ['--moduix-progress-linear-label-color', 'currentColor', 'Controls label text color.'],
  [
    '--moduix-progress-linear-label-font-size',
    'var(--moduix-text-sm)',
    'Controls label font size.',
  ],
  [
    '--moduix-progress-linear-label-font-weight',
    'var(--moduix-weight-regular)',
    'Controls label weight.',
  ],
  [
    '--moduix-progress-linear-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-progress-linear-range-bg',
    'var(--moduix-color-primary)',
    'Controls filled range color.',
  ],
  [
    '--moduix-progress-linear-range-indeterminate-animation',
    'progress-linear-indeterminate 1.5s ease-in-out infinite',
    'Controls indeterminate range animation.',
  ],
  [
    '--moduix-progress-linear-range-indeterminate-vertical-animation',
    'progress-linear-indeterminate-vertical 1.5s ease-in-out infinite',
    'Controls vertical indeterminate range animation.',
  ],
  [
    '--moduix-progress-linear-range-indeterminate-width',
    '35%',
    'Controls indeterminate range length.',
  ],
  ['--moduix-progress-linear-range-radius', 'inherit', 'Controls filled range radius.'],
  [
    '--moduix-progress-linear-range-transition',
    'var(--moduix-transition-default)',
    'Controls range size transition.',
  ],
  ['--moduix-progress-linear-track-bg', 'var(--moduix-color-muted)', 'Controls track background.'],
  [
    '--moduix-progress-linear-track-border-color',
    'var(--moduix-color-border)',
    'Controls track inset border color.',
  ],
  [
    '--moduix-progress-linear-track-border-width',
    'var(--moduix-border-width-sm)',
    'Controls track inset border width.',
  ],
  ['--moduix-progress-linear-track-height', '0.5rem', 'Controls track height.'],
  ['--moduix-progress-linear-track-radius', 'var(--moduix-radius-full)', 'Controls track radius.'],
  ['--moduix-progress-linear-track-width', '0.5rem', 'Controls vertical track width.'],
  ['--moduix-progress-linear-value-text-color', 'currentColor', 'Controls value text color.'],
  [
    '--moduix-progress-linear-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-progress-linear-value-text-font-weight',
    'var(--moduix-weight-regular)',
    'Controls value text weight.',
  ],
  [
    '--moduix-progress-linear-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--moduix-progress-linear-vertical-width', 'max-content', 'Controls vertical root width.'],
  ['--moduix-progress-linear-width', '12rem', 'Controls default root width.'],
];

const progressLinearCssPropertiesReference = progressLinearCssProperties.map(normalizeCssProperty);

export function ProgressLinearCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={progressLinearCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}