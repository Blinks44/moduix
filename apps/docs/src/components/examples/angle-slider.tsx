import type { CssPropertyInput } from '../mdx/reference';

export const angleSliderBasicCss = `
  .docs-angle-slider-basic {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderWithMarksCss = `
  .docs-angle-slider-with-marks {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderControlledCss = `
  .docs-angle-slider-controlled {
    --moduix-angle-slider-indicator-bg: var(--moduix-color-chart-2);
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderFormCss = `
  .docs-angle-slider-form {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderInvalidCss = `
  .docs-angle-slider-invalid {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderStepCss = `
  .docs-angle-slider-step {
    --moduix-angle-slider-indicator-bg: var(--moduix-color-chart-3);
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderDisabledCss = `
  .docs-angle-slider-disabled {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderReadOnlyCss = `
  .docs-angle-slider-readonly {
    --moduix-angle-slider-size: 9rem;
  }
`;

export const angleSliderRootProviderCss = `
  .docs-angle-slider-provider-layout {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .docs-angle-slider-provider {
    --moduix-angle-slider-size: 9rem;
  }

  .docs-angle-slider-provider-button {
    min-height: 2.5rem;
    padding-inline: 1rem;
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-md);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font: inherit;
    cursor: pointer;
  }

  .docs-angle-slider-provider-button:hover {
    background: var(--moduix-color-muted);
  }

  .docs-angle-slider-provider-button:focus-visible {
    outline: var(--moduix-border-width-md) solid var(--moduix-color-ring);
    outline-offset: 2px;
  }
`;

const angleSliderOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-angle-slider-color',
    'var(--moduix-color-foreground)',
    'Controls the default dial text color.',
  ],
  [
    '--moduix-angle-slider-center-dot-color',
    'var(--moduix-angle-slider-color)',
    'Controls the center dot color.',
  ],
  [
    '--moduix-angle-slider-center-dot-size',
    'var(--moduix-spacing-1-5)',
    'Controls the center dot size.',
  ],
  [
    '--moduix-angle-slider-control-bg',
    'var(--moduix-color-background)',
    'Controls the inner dial fill color.',
  ],
  [
    '--moduix-angle-slider-control-border-color',
    'var(--moduix-color-border)',
    'Controls the inner dial border color.',
  ],
  [
    '--moduix-angle-slider-control-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the inner dial border width.',
  ],
  [
    '--moduix-angle-slider-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled dial opacity.',
  ],
  [
    '--moduix-angle-slider-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls the focus ring color.',
  ],
  ['--moduix-angle-slider-focus-ring-width', '0.1875rem', 'Controls the control focus ring width.'],
  [
    '--moduix-angle-slider-gap',
    'var(--moduix-spacing-3)',
    'Controls spacing between label, dial, and value text.',
  ],
  [
    '--moduix-angle-slider-indicator-bg',
    'var(--moduix-color-primary)',
    'Controls the thumb and active line color.',
  ],
  [
    '--moduix-angle-slider-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid-state thumb and border color.',
  ],
  [
    '--moduix-angle-slider-label-color',
    'var(--moduix-angle-slider-color)',
    'Controls label text color.',
  ],
  ['--moduix-angle-slider-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-angle-slider-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-angle-slider-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-angle-slider-marker-active-color',
    'var(--moduix-color-primary)',
    'Controls marker color below the current value.',
  ],
  [
    '--moduix-angle-slider-marker-color',
    'var(--moduix-color-muted-foreground)',
    'Controls inactive marker color.',
  ],
  [
    '--moduix-angle-slider-marker-current-color',
    'var(--moduix-color-foreground)',
    'Controls marker color at the current value.',
  ],
  ['--moduix-angle-slider-marker-height', '0.625rem', 'Controls marker height.'],
  ['--moduix-angle-slider-marker-width', '0.125rem', 'Controls marker width.'],
  ['--moduix-angle-slider-radius', 'var(--moduix-radius-full)', 'Controls dial corner radius.'],
  ['--moduix-angle-slider-ring-thickness', '0.875rem', 'Controls outer ring thickness.'],
  ['--moduix-angle-slider-shadow', 'none', 'Controls dial outer shadow.'],
  ['--moduix-angle-slider-size', '8rem', 'Controls the dial width and height.'],
  [
    '--moduix-angle-slider-thumb-bg',
    'var(--moduix-angle-slider-indicator-bg)',
    'Controls the thumb circle fill color.',
  ],
  [
    '--moduix-angle-slider-thumb-border-color',
    'var(--moduix-color-border)',
    'Controls the thumb border color.',
  ],
  [
    '--moduix-angle-slider-thumb-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the thumb border width.',
  ],
  ['--moduix-angle-slider-thumb-line-width', '0.1875rem', 'Controls the active line thickness.'],
  [
    '--moduix-angle-slider-thumb-radius',
    'var(--moduix-radius-full)',
    'Controls the thumb corner radius.',
  ],
  ['--moduix-angle-slider-thumb-shadow', 'var(--moduix-shadow-sm)', 'Controls the thumb shadow.'],
  [
    '--moduix-angle-slider-thumb-size',
    'var(--moduix-spacing-4)',
    'Controls the thumb circle size.',
  ],
  ['--moduix-angle-slider-track-bg', 'var(--moduix-color-muted)', 'Controls the outer ring color.'],
  [
    '--moduix-angle-slider-track-border-color',
    'var(--moduix-color-border)',
    'Controls the outer ring border color.',
  ],
  [
    '--moduix-angle-slider-track-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the outer ring border width.',
  ],
  [
    '--moduix-angle-slider-transition',
    'var(--moduix-transition-default)',
    'Controls thumb transition timing.',
  ],
  [
    '--moduix-angle-slider-value-text-color',
    'var(--moduix-angle-slider-color)',
    'Controls value text color.',
  ],
  [
    '--moduix-angle-slider-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-angle-slider-value-text-font-weight',
    'var(--moduix-weight-medium)',
    'Controls value text font weight.',
  ],
  [
    '--moduix-angle-slider-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls value text line height.',
  ],
];

export const angleSliderCssProperties = angleSliderOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}