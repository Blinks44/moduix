import type { CssPropertyInput } from '../../mdx/reference';

const angleSliderOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-angle-slider-color',
    'var(--moduix-color-foreground)',
    'Controls the default dial text color.',
  ],
  [
    '--moduix-angle-slider-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled dial opacity.',
  ],
  [
    '--moduix-angle-slider-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls the thumb focus ring color.',
  ],
  [
    '--moduix-angle-slider-gap',
    'var(--moduix-spacing-3)',
    'Controls spacing between the label and the dial.',
  ],
  [
    '--moduix-angle-slider-indicator-bg',
    'var(--moduix-color-primary)',
    'Controls the filled arc color.',
  ],
  [
    '--moduix-angle-slider-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls the shared invalid-state color fallback.',
  ],
  [
    '--moduix-angle-slider-invalid-indicator-bg',
    'var(--moduix-angle-slider-invalid-color)',
    'Controls the invalid-state arc fill and thumb border color.',
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
  ['--moduix-angle-slider-marker-height', '0.5rem', 'Controls marker height.'],
  ['--moduix-angle-slider-marker-width', '0.125rem', 'Controls marker width.'],
  ['--moduix-angle-slider-ring-thickness', '0.5rem', 'Controls the circular track thickness.'],
  ['--moduix-angle-slider-size', '8rem', 'Controls the dial width and height.'],
  [
    '--moduix-angle-slider-thumb-bg',
    'var(--moduix-color-background)',
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
  [
    '--moduix-angle-slider-thumb-radius',
    'var(--moduix-radius-full)',
    'Controls the thumb corner radius.',
  ],
  ['--moduix-angle-slider-thumb-shadow', 'var(--moduix-shadow-sm)', 'Controls the thumb shadow.'],
  [
    '--moduix-angle-slider-thumb-shadow-dragging',
    'var(--moduix-shadow-md)',
    'Controls the thumb shadow while the dial is pressed.',
  ],
  [
    '--moduix-angle-slider-thumb-size',
    'var(--moduix-spacing-4)',
    'Controls the thumb circle size.',
  ],
  [
    '--moduix-angle-slider-track-bg',
    'var(--moduix-color-muted)',
    'Controls the unfilled track color.',
  ],
  [
    '--moduix-angle-slider-track-bg-active',
    'color-mix(in oklab, var(--moduix-color-muted) 84%, var(--moduix-color-foreground))',
    'Controls the unfilled track color while pressed.',
  ],
  [
    '--moduix-angle-slider-track-bg-hover',
    'color-mix(in oklab, var(--moduix-color-muted) 92%, var(--moduix-color-foreground))',
    'Controls the unfilled track color on hover.',
  ],
  [
    '--moduix-angle-slider-transition',
    'var(--moduix-transition-default)',
    'Controls thumb transition timing.',
  ],
  [
    '--moduix-angle-slider-value-text-color',
    'var(--moduix-angle-slider-color)',
    'Controls the centered value text color.',
  ],
  [
    '--moduix-angle-slider-value-text-font-size',
    'var(--moduix-text-lg)',
    'Controls the centered value text font size.',
  ],
  [
    '--moduix-angle-slider-value-text-font-weight',
    'var(--moduix-weight-medium)',
    'Controls the centered value text font weight.',
  ],
  [
    '--moduix-angle-slider-value-text-line-height',
    'var(--moduix-line-height-text-lg)',
    'Controls the centered value text line height.',
  ],
];

export const angleSliderCssProperties = angleSliderOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}