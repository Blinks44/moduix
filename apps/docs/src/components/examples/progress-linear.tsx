import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const progressLinearExampleCss = `
  .progress-linear-stack {
    display: grid;
    gap: var(--spacing-4);
  }

  .progress-linear-slider {
    width: 12rem;
  }
`;

export const progressLinearVerticalCss = `
  .progress-linear-vertical {
    --progress-linear-height: 10rem;

    margin-inline: auto;
  }
`;

const progressLinearCssProperties: CssPropertyInput[] = [
  ['--progress-linear-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--progress-linear-gap', 'var(--spacing-2)', 'Controls spacing between label/value and track.'],
  ['--progress-linear-height', '12rem', 'Controls vertical root height.'],
  ['--progress-linear-label-color', 'currentColor', 'Controls label text color.'],
  ['--progress-linear-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--progress-linear-label-font-weight', 'var(--weight-regular)', 'Controls label weight.'],
  [
    '--progress-linear-label-line-height',
    'var(--line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--progress-linear-range-bg', 'var(--color-primary)', 'Controls filled range color.'],
  [
    '--progress-linear-range-indeterminate-animation',
    'progress-linear-indeterminate 1.5s ease-in-out infinite',
    'Controls indeterminate range animation.',
  ],
  [
    '--progress-linear-range-indeterminate-vertical-animation',
    'progress-linear-indeterminate-vertical 1.5s ease-in-out infinite',
    'Controls vertical indeterminate range animation.',
  ],
  ['--progress-linear-range-indeterminate-width', '35%', 'Controls indeterminate range length.'],
  ['--progress-linear-range-radius', 'inherit', 'Controls filled range radius.'],
  [
    '--progress-linear-range-transition',
    'var(--transition-default)',
    'Controls range size transition.',
  ],
  ['--progress-linear-track-bg', 'var(--color-muted)', 'Controls track background.'],
  [
    '--progress-linear-track-border-color',
    'var(--color-border)',
    'Controls track inset border color.',
  ],
  [
    '--progress-linear-track-border-width',
    'var(--border-width-sm)',
    'Controls track inset border width.',
  ],
  ['--progress-linear-track-height', '0.5rem', 'Controls track height.'],
  ['--progress-linear-track-radius', 'var(--radius-full)', 'Controls track radius.'],
  ['--progress-linear-track-width', '0.5rem', 'Controls vertical track width.'],
  ['--progress-linear-value-text-color', 'currentColor', 'Controls value text color.'],
  ['--progress-linear-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--progress-linear-value-text-font-weight',
    'var(--weight-regular)',
    'Controls value text weight.',
  ],
  [
    '--progress-linear-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--progress-linear-vertical-width', 'max-content', 'Controls vertical root width.'],
  ['--progress-linear-width', '12rem', 'Controls default root width.'],
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