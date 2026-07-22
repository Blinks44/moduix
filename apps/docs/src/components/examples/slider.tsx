import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const sliderOverrideCssProperties: CssPropertyInput[] = [
  ['--slider-color', 'var(--color-foreground)', 'Controls the default slider text color.'],
  ['--slider-control-size', 'var(--spacing-5)', 'Controls the control hit area thickness.'],
  ['--slider-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled slider opacity.'],
  [
    '--slider-dragging-indicator-bg',
    'var(--color-foreground)',
    'Controls dragging indicator background.',
  ],
  [
    '--slider-dragging-indicator-color',
    'var(--color-background)',
    'Controls dragging indicator text color.',
  ],
  [
    '--slider-dragging-indicator-font-size',
    'var(--text-xs)',
    'Controls dragging indicator font size.',
  ],
  [
    '--slider-dragging-indicator-font-weight',
    'var(--weight-medium)',
    'Controls dragging indicator font weight.',
  ],
  ['--slider-dragging-indicator-line-height', '1', 'Controls dragging indicator line height.'],
  [
    '--slider-dragging-indicator-radius',
    'var(--radius-sm)',
    'Controls dragging indicator corner radius.',
  ],
  ['--slider-focus-ring-color', 'var(--color-ring)', 'Controls thumb focus ring color.'],
  ['--slider-gap', 'var(--spacing-2)', 'Controls spacing between slider slots.'],
  ['--slider-height', '12rem', 'Controls vertical slider height.'],
  ['--slider-label-color', 'var(--slider-color)', 'Controls label text color.'],
  ['--slider-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--slider-label-font-weight', 'var(--weight-regular)', 'Controls label font weight.'],
  ['--slider-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--slider-marker-color', 'var(--color-muted-foreground)', 'Controls marker text color.'],
  ['--slider-marker-dot-bg', 'var(--color-border)', 'Controls inactive marker dot color.'],
  ['--slider-marker-dot-bg-active', 'var(--slider-range-bg)', 'Controls active marker dot color.'],
  ['--slider-marker-dot-size', 'var(--spacing-1)', 'Controls marker dot size.'],
  ['--slider-marker-font-size', 'var(--text-xs)', 'Controls marker font size.'],
  [
    '--slider-marker-group-margin-inline-start',
    'var(--spacing-2)',
    'Controls vertical marker offset.',
  ],
  ['--slider-marker-group-margin-top', 'var(--spacing-2)', 'Controls horizontal marker offset.'],
  ['--slider-marker-line-height', 'var(--line-height-text-xs)', 'Controls marker line height.'],
  ['--slider-range-bg', 'var(--color-primary)', 'Controls filled range color.'],
  ['--slider-range-radius', 'inherit', 'Controls filled range corner radius.'],
  ['--slider-thumb-bg', 'var(--color-background)', 'Controls thumb background color.'],
  ['--slider-thumb-border-color', 'var(--color-border)', 'Controls thumb border color.'],
  ['--slider-thumb-border-width', 'var(--border-width-sm)', 'Controls thumb border width.'],
  ['--slider-thumb-radius', 'var(--radius-full)', 'Controls thumb corner radius.'],
  ['--slider-thumb-shadow', 'var(--shadow-sm)', 'Controls thumb shadow.'],
  ['--slider-thumb-shadow-dragging', 'var(--shadow-md)', 'Controls thumb shadow while dragging.'],
  ['--slider-thumb-size', 'var(--spacing-4)', 'Controls thumb width and height.'],
  ['--slider-track-bg', 'var(--color-muted)', 'Controls track background color.'],
  ['--slider-track-border-color', 'var(--color-border)', 'Controls track border color.'],
  ['--slider-track-border-width', 'var(--border-width-sm)', 'Controls track border width.'],
  ['--slider-track-radius', 'var(--radius-full)', 'Controls track corner radius.'],
  ['--slider-track-size', 'var(--spacing-1-5)', 'Controls track thickness.'],
  ['--slider-transition', 'var(--transition-default)', 'Controls thumb transition timing.'],
  ['--slider-value-text-color', 'var(--slider-color)', 'Controls value text color.'],
  ['--slider-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  ['--slider-value-text-font-weight', 'var(--weight-regular)', 'Controls value text font weight.'],
  [
    '--slider-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--slider-width', '12rem', 'Controls horizontal slider width.'],
  ['--slider-width-vertical', 'max-content', 'Controls vertical slider width.'],
];

export const sliderNoCss = `No additional styles are required.`;

export const sliderHeaderCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}
`;

export const sliderStackCss = `
.slider-stack {
  display: grid;
  gap: var(--spacing-4);
}
`;

export const sliderEventsCss = `
.slider-stack {
  display: grid;
  gap: var(--spacing-4);
}

.slider-header,
.slider-status {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}
`;

export const sliderVerticalCss = `
.slider-vertical {
  --slider-width-vertical: auto;
  --slider-height: 12rem;
}
`;

export const sliderContextCss = `
.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}

.slider-value {
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
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