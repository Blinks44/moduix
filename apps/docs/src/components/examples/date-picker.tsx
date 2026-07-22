import { createListCollection } from '@ark-ui/react/collection';
import { parseDate } from '@ark-ui/react/date-picker';
import { DatePicker, Select } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

type DatePickerSelectItem = {
  label: string;
  value: string;
};

const monthSelectItems: DatePickerSelectItem[] = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const monthSelectCollection = createListCollection<DatePickerSelectItem>({
  items: monthSelectItems,
});

const DatePickerContext = DatePicker.Context;

export const datePickerExampleCss = `
  .date-picker-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
  }

  .date-picker-today-row {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacing-3);
  }

  .date-picker-time-field {
    display: grid;
    gap: var(--spacing-1);
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-time-field input {
    height: var(--date-picker-select-height, 2rem);
    border: var(--date-picker-border-width, var(--border-width-sm)) solid
      var(--date-picker-border-color, var(--color-border));
    border-radius: var(--radius-sm);
    padding-inline: var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
  }

  .date-picker-selected-dates {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: var(--date-picker-control-height, var(--size-md));
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-1);
    border: var(--date-picker-border-width, var(--border-width-sm)) solid
      var(--date-picker-border-color, var(--color-border));
    border-radius: var(--date-picker-radius, var(--radius-md));
    padding-block: var(--spacing-1);
    padding-inline: var(--date-picker-input-padding-x-start, 0.875rem)
      var(--date-picker-input-padding-x-end, 4.25rem);
    background: var(--date-picker-bg, var(--color-background));
  }

  .date-picker-multiple-root {
    --date-picker-width: 20rem;
  }

  .date-picker-selected-date,
  .date-picker-selected-dates-placeholder {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: var(--spacing-1);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .date-picker-selected-date {
    padding: 0.125rem 0.375rem;
    background: var(--color-muted);
    color: var(--color-foreground);
  }

  .date-picker-selected-dates-placeholder {
    color: var(--date-picker-placeholder-color, var(--color-muted-foreground));
  }

  .date-picker-selected-date-remove {
    display: inline-flex;
    width: 1rem;
    height: 1rem;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: var(--radius-sm);
    padding: 0;
    background: transparent;
    color: var(--color-muted-foreground);
    cursor: pointer;
  }

  .date-picker-selected-date-remove:hover {
    background: var(--color-accent);
    color: var(--color-accent-foreground);
  }

  .date-picker-month-year-control {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--spacing-2);
  }

  .date-picker-month-year-selects,
  .date-picker-month-year-nav {
    align-items: center;
    gap: var(--spacing-1);
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
    --select-width: 100%;
    --select-control-height: var(--date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-year-select {
    --select-width: 100%;
    --select-control-height: var(--date-picker-select-height, 2rem);
    min-width: 0;
  }

  .date-picker-multiple-months {
    display: flex;
    gap: var(--spacing-3);
    overflow-x: auto;
  }

  .date-picker-multiple-months-content {
    --date-picker-content-width: 37.5rem;
    --date-picker-content-max-width: calc(100vw - 2rem);
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
    --date-picker-bg: var(--color-muted);
    --date-picker-border-color: var(--color-primary);
    --date-picker-focus-ring-color: var(--color-primary);
    --date-picker-table-cell-selected-bg: var(--color-primary);
    --date-picker-table-cell-selected-color: var(--color-primary-foreground);
    --date-picker-table-cell-range-bg: color-mix(in oklab, var(--color-primary) 12%, transparent);
  }
`;

const datePickerOverrideCssProperties: CssPropertyInput[] = [
  ['--date-picker-action-bg', 'transparent', 'Controls action background.'],
  ['--date-picker-action-bg-hover', 'var(--color-muted)', 'Controls action hover background.'],
  ['--date-picker-action-color-hover', 'var(--color-foreground)', 'Controls action hover color.'],
  ['--date-picker-action-focus-ring-offset', '0', 'Controls action focus ring offset.'],
  [
    '--date-picker-action-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls action focus ring width.',
  ],
  ['--date-picker-action-gap', 'var(--spacing-0-5)', 'Controls gap between input actions.'],
  ['--date-picker-action-radius', 'var(--radius-sm)', 'Controls action corner radius.'],
  ['--date-picker-action-size', 'var(--size-xs)', 'Controls input action button size.'],
  ['--date-picker-bg', 'var(--color-background)', 'Controls input background.'],
  ['--date-picker-bg-hover', 'var(--color-accent)', 'Controls input hover background.'],
  ['--date-picker-border-color', 'var(--color-border)', 'Controls input border color.'],
  ['--date-picker-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--date-picker-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--date-picker-content-bg', 'var(--color-popover)', 'Controls calendar surface background.'],
  ['--date-picker-content-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--date-picker-content-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--date-picker-content-closed-opacity', '0', 'Controls closed popup opacity.'],
  ['--date-picker-content-closed-scale', 'var(--scale-popup)', 'Controls closed popup scale.'],
  ['--date-picker-content-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--date-picker-content-max-height', '32rem', 'Controls popup maximum height.'],
  ['--date-picker-content-max-width', 'calc(100vw - 2rem)', 'Controls popup maximum width.'],
  ['--date-picker-content-min-width', '18.75rem', 'Controls popup minimum width.'],
  ['--date-picker-content-padding', 'var(--spacing-3)', 'Controls popup padding.'],
  ['--date-picker-content-radius', 'var(--radius-md)', 'Controls popup corner radius.'],
  ['--date-picker-content-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--date-picker-content-width', '18.75rem', 'Controls default popup width.'],
  ['--date-picker-control-height', 'var(--size-md)', 'Controls input height.'],
  ['--date-picker-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--date-picker-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--date-picker-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--date-picker-font-size', 'var(--text-md)', 'Controls input font size.'],
  ['--date-picker-icon-color', 'var(--color-muted-foreground)', 'Controls trigger icon color.'],
  ['--date-picker-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--date-picker-inline-content-min-width', '18rem', 'Controls inline calendar minimum width.'],
  ['--date-picker-inline-content-shadow', 'none', 'Controls inline calendar shadow.'],
  ['--date-picker-input-min-width', '7.5rem', 'Controls the minimum width of each input.'],
  ['--date-picker-input-padding-x-end', '4.25rem', 'Controls input end padding around actions.'],
  ['--date-picker-input-padding-x-start', 'var(--spacing-3-5)', 'Controls input start padding.'],
  ['--date-picker-input-padding-y', 'var(--spacing-1)', 'Controls input vertical padding.'],
  ['--date-picker-input-gap', 'var(--spacing-2)', 'Controls gap between range inputs.'],
  ['--date-picker-invalid-color', 'var(--color-destructive)', 'Controls invalid border and ring.'],
  [
    '--date-picker-label-color',
    'var(--date-picker-color, var(--color-foreground))',
    'Controls label color.',
  ],
  ['--date-picker-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--date-picker-label-font-weight', 'var(--weight-medium)', 'Controls label weight.'],
  ['--date-picker-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--date-picker-line-height', 'var(--line-height-text-md)', 'Controls input line height.'],
  ['--date-picker-max-width', '100%', 'Controls root maximum width.'],
  ['--date-picker-nav-trigger-size', 'var(--size-sm)', 'Controls calendar nav button size.'],
  [
    '--date-picker-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls input placeholder color.',
  ],
  ['--date-picker-preset-trigger-bg', 'var(--color-muted)', 'Controls preset button background.'],
  [
    '--date-picker-preset-trigger-bg-hover',
    'var(--color-accent)',
    'Controls preset button hover background.',
  ],
  ['--date-picker-preset-trigger-color', 'var(--color-foreground)', 'Controls preset text color.'],
  ['--date-picker-preset-trigger-font-size', 'var(--text-sm)', 'Controls preset font size.'],
  ['--date-picker-preset-trigger-height', 'var(--size-sm)', 'Controls preset button height.'],
  [
    '--date-picker-preset-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls preset line height.',
  ],
  [
    '--date-picker-preset-trigger-padding-x',
    'var(--spacing-2)',
    'Controls preset horizontal padding.',
  ],
  [
    '--date-picker-preset-trigger-selected-bg',
    'var(--color-primary)',
    'Controls selected preset background.',
  ],
  [
    '--date-picker-preset-trigger-selected-color',
    'var(--color-primary-foreground)',
    'Controls selected preset text.',
  ],
  ['--date-picker-range-input-min-width', '7.5rem', 'Controls each range input minimum width.'],
  ['--date-picker-radius', 'var(--radius-md)', 'Controls input radius.'],
  ['--date-picker-root-gap', 'var(--spacing-1)', 'Controls root vertical gap.'],
  ['--date-picker-select-bg', 'var(--color-background)', 'Controls native select background.'],
  [
    '--date-picker-select-bg-hover',
    'var(--color-accent)',
    'Controls native select hover background.',
  ],
  [
    '--date-picker-select-border-color',
    'var(--color-border)',
    'Controls native select border color.',
  ],
  [
    '--date-picker-select-border-width',
    'var(--border-width-sm)',
    'Controls native select border width.',
  ],
  ['--date-picker-select-color', 'var(--color-foreground)', 'Controls native select text.'],
  [
    '--date-picker-select-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls native select focus ring width.',
  ],
  ['--date-picker-select-font-size', 'var(--text-sm)', 'Controls native select font size.'],
  ['--date-picker-select-height', 'var(--size-sm)', 'Controls native select height.'],
  [
    '--date-picker-select-line-height',
    'var(--line-height-text-sm)',
    'Controls native select line height.',
  ],
  [
    '--date-picker-select-padding-x',
    'var(--spacing-2)',
    'Controls native select horizontal padding.',
  ],
  [
    '--date-picker-select-padding-y',
    'var(--spacing-1)',
    'Controls native select vertical padding.',
  ],
  ['--date-picker-select-radius', 'var(--radius-sm)', 'Controls native select radius.'],
  ['--date-picker-table-cell-bg', 'transparent', 'Controls calendar cell background.'],
  [
    '--date-picker-table-cell-bg-hover',
    'var(--color-accent)',
    'Controls day cell hover background.',
  ],
  ['--date-picker-table-cell-border-color', 'transparent', 'Controls calendar cell border color.'],
  ['--date-picker-table-cell-border-width', '0', 'Controls calendar cell border width.'],
  [
    '--date-picker-table-cell-color',
    'var(--date-picker-content-color, var(--color-foreground))',
    'Controls calendar cell text.',
  ],
  [
    '--date-picker-table-cell-color-hover',
    'var(--color-accent-foreground)',
    'Controls day cell hover text.',
  ],
  [
    '--date-picker-table-cell-focus-ring-color',
    'var(--color-ring)',
    'Controls day cell focus ring.',
  ],
  [
    '--date-picker-table-cell-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls calendar cell focus ring width.',
  ],
  ['--date-picker-table-cell-font-size', 'var(--text-sm)', 'Controls calendar cell font size.'],
  ['--date-picker-table-cell-gap', 'var(--spacing-0-5)', 'Controls calendar cell spacing.'],
  [
    '--date-picker-table-cell-line-height',
    'var(--line-height-text-sm)',
    'Controls calendar cell line height.',
  ],
  [
    '--date-picker-table-cell-muted-color',
    'var(--color-muted-foreground)',
    'Controls unavailable/outside dates.',
  ],
  ['--date-picker-table-cell-radius', 'var(--radius-sm)', 'Controls calendar cell radius.'],
  ['--date-picker-table-cell-range-bg', 'var(--color-muted)', 'Controls range background.'],
  ['--date-picker-table-cell-range-color', 'var(--color-foreground)', 'Controls range text color.'],
  [
    '--date-picker-table-cell-selected-bg',
    'var(--color-primary)',
    'Controls selected cell background.',
  ],
  [
    '--date-picker-table-cell-selected-color',
    'var(--color-primary-foreground)',
    'Controls selected cell text.',
  ],
  ['--date-picker-table-cell-size', 'var(--size-sm)', 'Controls calendar cell size.'],
  [
    '--date-picker-table-cell-today-border-color',
    'var(--color-ring)',
    'Controls today marker color.',
  ],
  [
    '--date-picker-table-cell-today-color',
    'var(--date-picker-table-cell-color, var(--color-foreground))',
    'Controls today text color.',
  ],
  [
    '--date-picker-table-header-color',
    'var(--color-muted-foreground)',
    'Controls weekday header color.',
  ],
  ['--date-picker-table-header-font-size', 'var(--text-xs)', 'Controls weekday font size.'],
  [
    '--date-picker-table-header-font-weight',
    'var(--weight-medium)',
    'Controls weekday font weight.',
  ],
  ['--date-picker-table-header-height', '1.75rem', 'Controls weekday header height.'],
  [
    '--date-picker-table-header-line-height',
    'var(--line-height-text-xs)',
    'Controls weekday header line height.',
  ],
  [
    '--date-picker-transition',
    'var(--transition-default)',
    'Controls interactive transition timing.',
  ],
  ['--date-picker-trigger-offset-right', 'var(--spacing-2)', 'Controls input action right offset.'],
  ['--date-picker-view-control-gap', 'var(--spacing-2)', 'Controls calendar header control gap.'],
  ['--date-picker-view-gap', 'var(--spacing-3)', 'Controls calendar view gap.'],
  [
    '--date-picker-view-trigger-color',
    'var(--color-foreground)',
    'Controls view trigger text color.',
  ],
  ['--date-picker-view-trigger-font-size', 'var(--text-sm)', 'Controls view trigger font size.'],
  [
    '--date-picker-view-trigger-font-weight',
    'var(--weight-medium)',
    'Controls view trigger font weight.',
  ],
  ['--date-picker-view-trigger-gap', 'var(--spacing-2)', 'Controls view trigger content gap.'],
  ['--date-picker-view-trigger-height', 'var(--size-sm)', 'Controls view trigger height.'],
  [
    '--date-picker-view-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls view trigger line height.',
  ],
  [
    '--date-picker-view-trigger-padding-x',
    'var(--spacing-2)',
    'Controls view trigger horizontal padding.',
  ],
  [
    '--date-picker-week-number-color',
    'var(--color-muted-foreground)',
    'Controls week number text color.',
  ],
  ['--date-picker-width', '18.75rem', 'Controls root width.'],
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

function DatePickerSelectContent({ items }: { items: DatePickerSelectItem[] }) {
  return (
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.List>
      </Select.Content>
    </Select.Positioner>
  );
}

function DatePickerSelectControl() {
  return (
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText />
      </Select.Trigger>
      <Select.Indicators>
        <Select.Indicator />
      </Select.Indicators>
    </Select.Control>
  );
}

function MonthYearPickerSelects() {
  return (
    <DatePickerContext>
      {(datePicker) => {
        const focusedYear = datePicker.focusedValue.year;
        const yearItems = Array.from({ length: 12 }, (_, index) => {
          const year = focusedYear - 5 + index;
          return { label: String(year), value: String(year) };
        });
        const yearCollection = createListCollection<DatePickerSelectItem>({ items: yearItems });

        return (
          <div className="date-picker-month-year-selects">
            <Select
              className="date-picker-month-select"
              collection={monthSelectCollection}
              value={[String(datePicker.focusedValue.month)]}
              onValueChange={(details) => {
                const month = Number(details.value[0]);
                if (month) datePicker.setFocusedValue(datePicker.focusedValue.set({ month }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={monthSelectItems} />
            </Select>
            <Select
              className="date-picker-year-select"
              collection={yearCollection}
              value={[String(datePicker.focusedValue.year)]}
              onValueChange={(details) => {
                const year = Number(details.value[0]);
                if (year) datePicker.setFocusedValue(datePicker.focusedValue.set({ year }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={yearItems} />
            </Select>
          </div>
        );
      }}
    </DatePickerContext>
  );
}

export function MonthYearSelectDatePickerExample() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Report date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className="date-picker-month-year-control">
            <MonthYearPickerSelects />
            <div className="date-picker-month-year-nav">
              <DatePicker.PrevTrigger />
              <DatePicker.NextTrigger />
            </div>
          </DatePicker.ViewControl>
          <DatePicker.View view="day">
            <DatePicker.DayTable showHeader={false} />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  );
}