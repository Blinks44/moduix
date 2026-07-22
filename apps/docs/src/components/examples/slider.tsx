import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const sliderOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-slider-color',
    'var(--moduix-color-foreground)',
    'Controls the default slider text color.',
  ],
  [
    '--moduix-slider-control-size',
    'var(--moduix-spacing-5)',
    'Controls the control hit area thickness.',
  ],
  [
    '--moduix-slider-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled slider opacity.',
  ],
  [
    '--moduix-slider-dragging-indicator-bg',
    'var(--moduix-color-foreground)',
    'Controls dragging indicator background.',
  ],
  [
    '--moduix-slider-dragging-indicator-color',
    'var(--moduix-color-background)',
    'Controls dragging indicator text color.',
  ],
  [
    '--moduix-slider-dragging-indicator-font-size',
    'var(--moduix-text-xs)',
    'Controls dragging indicator font size.',
  ],
  [
    '--moduix-slider-dragging-indicator-font-weight',
    'var(--moduix-weight-medium)',
    'Controls dragging indicator font weight.',
  ],
  [
    '--moduix-slider-dragging-indicator-line-height',
    '1',
    'Controls dragging indicator line height.',
  ],
  [
    '--moduix-slider-dragging-indicator-radius',
    'var(--moduix-radius-sm)',
    'Controls dragging indicator corner radius.',
  ],
  [
    '--moduix-slider-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls thumb focus ring color.',
  ],
  ['--moduix-slider-gap', 'var(--moduix-spacing-2)', 'Controls spacing between slider slots.'],
  ['--moduix-slider-height', '12rem', 'Controls vertical slider height.'],
  ['--moduix-slider-label-color', 'var(--moduix-slider-color)', 'Controls label text color.'],
  ['--moduix-slider-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-slider-label-font-weight',
    'var(--moduix-weight-regular)',
    'Controls label font weight.',
  ],
  [
    '--moduix-slider-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-slider-marker-color',
    'var(--moduix-color-muted-foreground)',
    'Controls marker text color.',
  ],
  [
    '--moduix-slider-marker-dot-bg',
    'var(--moduix-color-border)',
    'Controls inactive marker dot color.',
  ],
  [
    '--moduix-slider-marker-dot-bg-active',
    'var(--moduix-slider-range-bg)',
    'Controls active marker dot color.',
  ],
  ['--moduix-slider-marker-dot-size', 'var(--moduix-spacing-1)', 'Controls marker dot size.'],
  ['--moduix-slider-marker-font-size', 'var(--moduix-text-xs)', 'Controls marker font size.'],
  [
    '--moduix-slider-marker-group-margin-inline-start',
    'var(--moduix-spacing-2)',
    'Controls vertical marker offset.',
  ],
  [
    '--moduix-slider-marker-group-margin-top',
    'var(--moduix-spacing-2)',
    'Controls horizontal marker offset.',
  ],
  [
    '--moduix-slider-marker-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls marker line height.',
  ],
  ['--moduix-slider-range-bg', 'var(--moduix-color-primary)', 'Controls filled range color.'],
  ['--moduix-slider-range-radius', 'inherit', 'Controls filled range corner radius.'],
  [
    '--moduix-slider-thumb-bg',
    'var(--moduix-color-background)',
    'Controls thumb background color.',
  ],
  [
    '--moduix-slider-thumb-border-color',
    'var(--moduix-color-border)',
    'Controls thumb border color.',
  ],
  [
    '--moduix-slider-thumb-border-width',
    'var(--moduix-border-width-sm)',
    'Controls thumb border width.',
  ],
  ['--moduix-slider-thumb-radius', 'var(--moduix-radius-full)', 'Controls thumb corner radius.'],
  ['--moduix-slider-thumb-shadow', 'var(--moduix-shadow-sm)', 'Controls thumb shadow.'],
  [
    '--moduix-slider-thumb-shadow-dragging',
    'var(--moduix-shadow-md)',
    'Controls thumb shadow while dragging.',
  ],
  ['--moduix-slider-thumb-size', 'var(--moduix-spacing-4)', 'Controls thumb width and height.'],
  ['--moduix-slider-track-bg', 'var(--moduix-color-muted)', 'Controls track background color.'],
  [
    '--moduix-slider-track-border-color',
    'var(--moduix-color-border)',
    'Controls track border color.',
  ],
  [
    '--moduix-slider-track-border-width',
    'var(--moduix-border-width-sm)',
    'Controls track border width.',
  ],
  ['--moduix-slider-track-radius', 'var(--moduix-radius-full)', 'Controls track corner radius.'],
  ['--moduix-slider-track-size', 'var(--moduix-spacing-1-5)', 'Controls track thickness.'],
  [
    '--moduix-slider-transition',
    'var(--moduix-transition-default)',
    'Controls thumb transition timing.',
  ],
  ['--moduix-slider-value-text-color', 'var(--moduix-slider-color)', 'Controls value text color.'],
  [
    '--moduix-slider-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-slider-value-text-font-weight',
    'var(--moduix-weight-regular)',
    'Controls value text font weight.',
  ],
  [
    '--moduix-slider-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--moduix-slider-width', '12rem', 'Controls horizontal slider width.'],
  ['--moduix-slider-width-vertical', 'max-content', 'Controls vertical slider width.'],
];

export const sliderNoCss = `No additional styles are required.`;

export const sliderHeaderCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--moduix-spacing-3);
}
`;

export const sliderStackCss = `
.slider-stack {
  display: grid;
  gap: var(--moduix-spacing-4);
}
`;

export const sliderEventsCss = `
.slider-stack {
  display: grid;
  gap: var(--moduix-spacing-4);
}

.slider-header,
.slider-status {
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-sm);
  line-height: var(--moduix-line-height-text-sm);
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--moduix-spacing-3);
}
`;

export const sliderVerticalCss = `
.slider-vertical {
  --moduix-slider-width-vertical: auto;
  --moduix-slider-height: 12rem;
}
`;

export const sliderContextCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--moduix-spacing-3);
}

.slider-value {
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-sm);
  line-height: var(--moduix-line-height-text-sm);
}
`;

export function SliderCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={sliderOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}