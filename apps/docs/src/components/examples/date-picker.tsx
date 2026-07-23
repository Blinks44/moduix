import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const datePickerExampleCss = `
  .date-picker-state {
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

  .date-picker-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--moduix-spacing-2);
    margin-bottom: var(--moduix-spacing-3);
  }

  .date-picker-today-row {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--moduix-spacing-3);
  }

  .date-picker-time-field {
    display: grid;
    gap: var(--moduix-spacing-1);
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

  .date-picker-time-field input {
    height: var(--moduix-date-picker-select-height, 2rem);
    border: var(--moduix-date-picker-border-width, var(--moduix-border-width-sm)) solid
      var(--moduix-date-picker-border-color, var(--moduix-color-border));
    border-radius: var(--moduix-radius-sm);
    padding-inline: var(--moduix-spacing-2);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font: inherit;
  }

  .date-picker-selected-dates {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: var(--moduix-date-picker-control-height, var(--moduix-size-md));
    flex-wrap: wrap;
    align-items: center;
    gap: var(--moduix-spacing-1);
    border: var(--moduix-date-picker-border-width, var(--moduix-border-width-sm)) solid
      var(--moduix-date-picker-border-color, var(--moduix-color-border));
    border-radius: var(--moduix-date-picker-radius, var(--moduix-radius-md));
    padding-block: var(--moduix-spacing-1);
    padding-inline: var(--moduix-date-picker-input-padding-x-start, 0.875rem)
      var(--moduix-date-picker-input-padding-x-end, 4.25rem);
    background: var(--moduix-date-picker-bg, var(--moduix-color-background));
  }

  .date-picker-multiple-root {
    --moduix-date-picker-width: 20rem;
  }

  .date-picker-selected-date,
  .date-picker-selected-dates-placeholder {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: var(--moduix-spacing-1);
    border-radius: var(--moduix-radius-sm);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

  .date-picker-selected-date {
    padding: 0.125rem 0.375rem;
    background: var(--moduix-color-muted);
    color: var(--moduix-color-foreground);
  }

  .date-picker-selected-dates-placeholder {
    color: var(--moduix-date-picker-placeholder-color, var(--moduix-color-muted-foreground));
  }

  .date-picker-selected-date-remove {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: var(--moduix-radius-sm);
    padding: 0;
    background: transparent;
    color: var(--moduix-color-muted-foreground);
    cursor: pointer;
  }

  .date-picker-selected-date-remove:hover {
    background: var(--moduix-color-accent);
    color: var(--moduix-color-accent-foreground);
  }

  .date-picker-month-year-control {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--moduix-spacing-2);
  }

  .date-picker-month-year-selects,
  .date-picker-month-year-nav {
    align-items: center;
    gap: var(--moduix-spacing-1);
  }

  .date-picker-month-year-selects {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr) minmax(4.5rem, 0.7fr);
  }

  .date-picker-month-year-nav {
    display: inline-flex;
  }

  .date-picker-month-select {
    --moduix-select-width: 100%;
    --moduix-select-control-height: var(--moduix-date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-year-select {
    --moduix-select-width: 100%;
    --moduix-select-control-height: var(--moduix-date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-multiple-months {
    display: flex;
    gap: var(--moduix-spacing-3);
    overflow-x: auto;
  }

  .date-picker-multiple-months-content {
    --moduix-date-picker-content-width: 37.5rem;
    --moduix-date-picker-content-max-width: calc(100vw - 2rem);
  }

  .date-picker-multiple-months-table {
    width: max-content;
    flex: 0 0 auto;
  }

  .date-picker-field-preview {
    width: fit-content;
    margin-inline: auto;
  }

  .date-picker-inline-preview {
    width: fit-content;
    margin-inline: auto;
  }

  .date-picker-custom-root {
    --moduix-date-picker-bg: var(--moduix-color-muted);
    --moduix-date-picker-border-color: var(--moduix-color-primary);
    --moduix-date-picker-focus-ring-color: var(--moduix-color-primary);
    --moduix-date-picker-table-cell-selected-bg: var(--moduix-color-primary);
    --moduix-date-picker-table-cell-selected-color: var(--moduix-color-primary-foreground);
    --moduix-date-picker-table-cell-range-bg: color-mix(in oklab, var(--moduix-color-primary) 12%, transparent);
  }
`;

const datePickerOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-date-picker-action-bg', 'transparent', 'Controls action background.'],
  [
    '--moduix-date-picker-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls action hover background.',
  ],
  [
    '--moduix-date-picker-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls action hover color.',
  ],
  ['--moduix-date-picker-action-focus-ring-offset', '0', 'Controls action focus ring offset.'],
  [
    '--moduix-date-picker-action-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls action focus ring width.',
  ],
  [
    '--moduix-date-picker-action-gap',
    'var(--moduix-spacing-0-5)',
    'Controls gap between input actions.',
  ],
  [
    '--moduix-date-picker-action-radius',
    'var(--moduix-radius-sm)',
    'Controls action corner radius.',
  ],
  [
    '--moduix-date-picker-action-size',
    'var(--moduix-size-xs)',
    'Controls input action button size.',
  ],
  ['--moduix-date-picker-bg', 'var(--moduix-color-background)', 'Controls input background.'],
  ['--date-picker-bg-hover', 'var(--moduix-color-accent)', 'Controls input hover background.'],
  [
    '--moduix-date-picker-border-color',
    'var(--moduix-color-border)',
    'Controls input border color.',
  ],
  [
    '--moduix-date-picker-border-width',
    'var(--moduix-border-width-sm)',
    'Controls input border width.',
  ],
  ['--moduix-date-picker-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-date-picker-content-bg',
    'var(--moduix-color-popover)',
    'Controls calendar surface background.',
  ],
  [
    '--moduix-date-picker-content-border-color',
    'var(--moduix-color-border)',
    'Controls popup border color.',
  ],
  [
    '--moduix-date-picker-content-border-width',
    'var(--moduix-border-width-sm)',
    'Controls popup border width.',
  ],
  ['--moduix-date-picker-content-closed-opacity', '0', 'Controls closed popup opacity.'],
  [
    '--moduix-date-picker-content-closed-scale',
    'var(--moduix-scale-popup)',
    'Controls closed popup scale.',
  ],
  [
    '--moduix-date-picker-content-color',
    'var(--moduix-color-popover-foreground)',
    'Controls popup text color.',
  ],
  ['--moduix-date-picker-content-max-height', '32rem', 'Controls popup maximum height.'],
  ['--moduix-date-picker-content-max-width', 'calc(100vw - 2rem)', 'Controls popup maximum width.'],
  ['--moduix-date-picker-content-min-width', '18.75rem', 'Controls popup minimum width.'],
  ['--moduix-date-picker-content-padding', 'var(--moduix-spacing-3)', 'Controls popup padding.'],
  [
    '--moduix-date-picker-content-radius',
    'var(--moduix-radius-md)',
    'Controls popup corner radius.',
  ],
  ['--moduix-date-picker-content-shadow', 'var(--moduix-shadow-lg)', 'Controls popup shadow.'],
  ['--moduix-date-picker-content-width', '18.75rem', 'Controls default popup width.'],
  ['--moduix-date-picker-control-height', 'var(--moduix-size-md)', 'Controls input height.'],
  [
    '--moduix-date-picker-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-date-picker-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-date-picker-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--moduix-date-picker-font-size', 'var(--moduix-text-md)', 'Controls input font size.'],
  [
    '--moduix-date-picker-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls trigger icon color.',
  ],
  ['--moduix-date-picker-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
  [
    '--moduix-date-picker-inline-content-min-width',
    '18rem',
    'Controls inline calendar minimum width.',
  ],
  ['--moduix-date-picker-inline-content-shadow', 'none', 'Controls inline calendar shadow.'],
  ['--moduix-date-picker-input-min-width', '7.5rem', 'Controls the minimum width of each input.'],
  [
    '--moduix-date-picker-input-padding-x-end',
    '4.25rem',
    'Controls input end padding around actions.',
  ],
  [
    '--moduix-date-picker-input-padding-x-start',
    'var(--moduix-spacing-3-5)',
    'Controls input start padding.',
  ],
  [
    '--moduix-date-picker-input-padding-y',
    'var(--moduix-spacing-1)',
    'Controls input vertical padding.',
  ],
  [
    '--moduix-date-picker-input-gap',
    'var(--moduix-spacing-2)',
    'Controls gap between range inputs.',
  ],
  [
    '--moduix-date-picker-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid border and ring.',
  ],
  [
    '--moduix-date-picker-label-color',
    'var(--moduix-date-picker-color, var(--moduix-color-foreground))',
    'Controls label color.',
  ],
  ['--moduix-date-picker-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-date-picker-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label weight.',
  ],
  [
    '--moduix-date-picker-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  [
    '--moduix-date-picker-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls input line height.',
  ],
  ['--moduix-date-picker-max-width', '100%', 'Controls root maximum width.'],
  [
    '--moduix-date-picker-nav-trigger-size',
    'var(--moduix-size-sm)',
    'Controls calendar nav button size.',
  ],
  [
    '--moduix-date-picker-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls input placeholder color.',
  ],
  [
    '--moduix-date-picker-preset-trigger-bg',
    'var(--moduix-color-muted)',
    'Controls preset button background.',
  ],
  [
    '--moduix-date-picker-preset-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls preset button hover background.',
  ],
  [
    '--moduix-date-picker-preset-trigger-color',
    'var(--moduix-color-foreground)',
    'Controls preset text color.',
  ],
  [
    '--moduix-date-picker-preset-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls preset font size.',
  ],
  [
    '--moduix-date-picker-preset-trigger-height',
    'var(--moduix-size-sm)',
    'Controls preset button height.',
  ],
  [
    '--moduix-date-picker-preset-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls preset line height.',
  ],
  [
    '--moduix-date-picker-preset-trigger-padding-x',
    'var(--moduix-spacing-2)',
    'Controls preset horizontal padding.',
  ],
  [
    '--moduix-date-picker-preset-trigger-selected-bg',
    'var(--moduix-color-primary)',
    'Controls selected preset background.',
  ],
  [
    '--moduix-date-picker-preset-trigger-selected-color',
    'var(--moduix-color-primary-foreground)',
    'Controls selected preset text.',
  ],
  [
    '--moduix-date-picker-range-input-min-width',
    '7.5rem',
    'Controls each range input minimum width.',
  ],
  ['--moduix-date-picker-radius', 'var(--moduix-radius-md)', 'Controls input radius.'],
  ['--moduix-date-picker-root-gap', 'var(--moduix-spacing-1)', 'Controls root vertical gap.'],
  [
    '--moduix-date-picker-select-bg',
    'var(--moduix-color-background)',
    'Controls native select background.',
  ],
  [
    '--date-picker-select-bg-hover',
    'var(--moduix-color-accent)',
    'Controls native select hover background.',
  ],
  [
    '--moduix-date-picker-select-border-color',
    'var(--moduix-color-border)',
    'Controls native select border color.',
  ],
  [
    '--moduix-date-picker-select-border-width',
    'var(--moduix-border-width-sm)',
    'Controls native select border width.',
  ],
  [
    '--moduix-date-picker-select-color',
    'var(--moduix-color-foreground)',
    'Controls native select text.',
  ],
  [
    '--moduix-date-picker-select-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls native select focus ring width.',
  ],
  [
    '--moduix-date-picker-select-font-size',
    'var(--moduix-text-sm)',
    'Controls native select font size.',
  ],
  ['--moduix-date-picker-select-height', 'var(--moduix-size-sm)', 'Controls native select height.'],
  [
    '--moduix-date-picker-select-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls native select line height.',
  ],
  [
    '--moduix-date-picker-select-padding-x',
    'var(--moduix-spacing-2)',
    'Controls native select horizontal padding.',
  ],
  [
    '--moduix-date-picker-select-padding-y',
    'var(--moduix-spacing-1)',
    'Controls native select vertical padding.',
  ],
  [
    '--moduix-date-picker-select-radius',
    'var(--moduix-radius-sm)',
    'Controls native select radius.',
  ],
  ['--moduix-date-picker-table-cell-bg', 'transparent', 'Controls calendar cell background.'],
  [
    '--moduix-date-picker-table-cell-bg-hover',
    'var(--moduix-color-accent)',
    'Controls day cell hover background.',
  ],
  [
    '--moduix-date-picker-table-cell-border-color',
    'transparent',
    'Controls calendar cell border color.',
  ],
  ['--moduix-date-picker-table-cell-border-width', '0', 'Controls calendar cell border width.'],
  [
    '--moduix-date-picker-table-cell-color',
    'var(--moduix-date-picker-content-color, var(--moduix-color-foreground))',
    'Controls calendar cell text.',
  ],
  [
    '--moduix-date-picker-table-cell-color-hover',
    'var(--moduix-color-accent-foreground)',
    'Controls day cell hover text.',
  ],
  [
    '--moduix-date-picker-table-cell-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls day cell focus ring.',
  ],
  [
    '--moduix-date-picker-table-cell-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls calendar cell focus ring width.',
  ],
  [
    '--moduix-date-picker-table-cell-font-size',
    'var(--moduix-text-sm)',
    'Controls calendar cell font size.',
  ],
  [
    '--moduix-date-picker-table-cell-gap',
    'var(--moduix-spacing-0-5)',
    'Controls calendar cell spacing.',
  ],
  [
    '--moduix-date-picker-table-cell-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls calendar cell line height.',
  ],
  [
    '--moduix-date-picker-table-cell-muted-color',
    'var(--moduix-color-muted-foreground)',
    'Controls unavailable/outside dates.',
  ],
  [
    '--moduix-date-picker-table-cell-radius',
    'var(--moduix-radius-sm)',
    'Controls calendar cell radius.',
  ],
  [
    '--moduix-date-picker-table-cell-range-bg',
    'var(--moduix-color-muted)',
    'Controls range background.',
  ],
  [
    '--moduix-date-picker-table-cell-range-color',
    'var(--moduix-color-foreground)',
    'Controls range text color.',
  ],
  [
    '--moduix-date-picker-table-cell-selected-bg',
    'var(--moduix-color-primary)',
    'Controls selected cell background.',
  ],
  [
    '--moduix-date-picker-table-cell-selected-color',
    'var(--moduix-color-primary-foreground)',
    'Controls selected cell text.',
  ],
  ['--moduix-date-picker-table-cell-size', 'var(--moduix-size-sm)', 'Controls calendar cell size.'],
  [
    '--moduix-date-picker-table-cell-today-border-color',
    'var(--moduix-color-ring)',
    'Controls today marker color.',
  ],
  [
    '--moduix-date-picker-table-cell-today-color',
    'var(--moduix-date-picker-table-cell-color, var(--moduix-color-foreground))',
    'Controls today text color.',
  ],
  [
    '--moduix-date-picker-table-header-color',
    'var(--moduix-color-muted-foreground)',
    'Controls weekday header color.',
  ],
  [
    '--moduix-date-picker-table-header-font-size',
    'var(--moduix-text-xs)',
    'Controls weekday font size.',
  ],
  [
    '--moduix-date-picker-table-header-font-weight',
    'var(--moduix-weight-medium)',
    'Controls weekday font weight.',
  ],
  ['--moduix-date-picker-table-header-height', '1.75rem', 'Controls weekday header height.'],
  [
    '--moduix-date-picker-table-header-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls weekday header line height.',
  ],
  [
    '--moduix-date-picker-transition',
    'var(--moduix-transition-default)',
    'Controls interactive transition timing.',
  ],
  [
    '--moduix-date-picker-trigger-offset-right',
    'var(--moduix-spacing-2)',
    'Controls input action right offset.',
  ],
  [
    '--moduix-date-picker-view-control-gap',
    'var(--moduix-spacing-2)',
    'Controls calendar header control gap.',
  ],
  ['--moduix-date-picker-view-gap', 'var(--moduix-spacing-3)', 'Controls calendar view gap.'],
  [
    '--moduix-date-picker-view-trigger-color',
    'var(--moduix-color-foreground)',
    'Controls view trigger text color.',
  ],
  [
    '--moduix-date-picker-view-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls view trigger font size.',
  ],
  [
    '--moduix-date-picker-view-trigger-font-weight',
    'var(--moduix-weight-medium)',
    'Controls view trigger font weight.',
  ],
  [
    '--moduix-date-picker-view-trigger-gap',
    'var(--moduix-spacing-2)',
    'Controls view trigger content gap.',
  ],
  [
    '--moduix-date-picker-view-trigger-height',
    'var(--moduix-size-sm)',
    'Controls view trigger height.',
  ],
  [
    '--moduix-date-picker-view-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls view trigger line height.',
  ],
  [
    '--moduix-date-picker-view-trigger-padding-x',
    'var(--moduix-spacing-2)',
    'Controls view trigger horizontal padding.',
  ],
  [
    '--moduix-date-picker-week-number-color',
    'var(--moduix-color-muted-foreground)',
    'Controls week number text color.',
  ],
  ['--moduix-date-picker-width', '18.75rem', 'Controls root width.'],
];

export function DatePickerCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={datePickerOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}