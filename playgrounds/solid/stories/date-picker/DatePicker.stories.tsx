import { createListCollection } from '@ark-ui/solid/collection';
import { parseDate, type DateValue } from '@ark-ui/solid/date-picker';
import { today } from '@internationalized/date';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import {
  DatePicker,
  useDatePicker,
  DatePickerRootProvider,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerField,
  DatePickerRangeField,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerDayTable,
  DatePickerPresetTrigger,
} from '@/components/date-picker/DatePicker';
import { Field, FieldErrorText } from '@/components/field';
import { Select } from '@/components/select/Select';
import storyStyles from './DatePicker.stories.module.css';

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

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

function formatSelectedDate(date: DateValue) {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function MultipleDatePickerField() {
  return (
    <DatePickerControl>
      <DatePickerContext>
        {(datePicker) => (
          <div class={storyStyles.selectedDates}>
            {datePicker().value.length === 0 ? (
              <span class={storyStyles.selectedDatesPlaceholder}>Select dates...</span>
            ) : (
              datePicker().value.map((date, index) => (
                <span class={storyStyles.selectedDate}>
                  {formatSelectedDate(date)}
                  <button
                    class={storyStyles.selectedDateRemove}
                    type="button"
                    aria-label={`Remove ${formatSelectedDate(date)}`}
                    onClick={() =>
                      datePicker().setValue(
                        datePicker().value.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        )}
      </DatePickerContext>
      <DatePickerClearTrigger aria-label="Clear dates" />
      <DatePickerTrigger aria-label="Open calendar" />
    </DatePickerControl>
  );
}

function AdvancedDatePickerDayTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable>
            <DatePickerTableHead>
              <DatePickerTableRow>
                {datePicker().weekDays.map((weekDay) => (
                  <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                ))}
              </DatePickerTableRow>
            </DatePickerTableHead>
            <DatePickerTableBody>
              {datePicker().weeks.map((week) => (
                <DatePickerTableRow>
                  {week.map((day) => (
                    <DatePickerTableCell value={day}>
                      <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  ))}
                </DatePickerTableRow>
              ))}
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerMonthTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable columns={4}>
            <DatePickerTableBody>
              {datePicker()
                .getMonthsGrid({ columns: 4, format: 'short' })
                .map((months) => (
                  <DatePickerTableRow>
                    {months.map((month) => (
                      <DatePickerTableCell value={month.value}>
                        <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerYearTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePickerViewControl>
            <DatePickerPrevTrigger />
            <DatePickerViewTrigger />
            <DatePickerNextTrigger />
          </DatePickerViewControl>
          <DatePickerTable columns={4}>
            <DatePickerTableBody>
              {datePicker()
                .getYearsGrid({ columns: 4 })
                .map((years) => (
                  <DatePickerTableRow>
                    {years.map((year) => (
                      <DatePickerTableCell value={year.value} disabled={year.disabled}>
                        <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
            </DatePickerTableBody>
          </DatePickerTable>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerViews(props: { showWeekNumbers?: boolean }) {
  return (
    <>
      <DatePickerView view="day">
        <DatePickerDayTable showWeekNumbers={props.showWeekNumbers ?? false} />
      </DatePickerView>
      <DatePickerView view="month">
        <DatePickerMonthTable />
      </DatePickerView>
      <DatePickerView view="year">
        <DatePickerYearTable />
      </DatePickerView>
    </>
  );
}

function DatePickerPopup(props: { showWeekNumbers?: boolean }) {
  return (
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViews showWeekNumbers={props.showWeekNumbers} />
      </DatePickerContent>
    </DatePickerPositioner>
  );
}

function InlineDatePickerContent(props: { showWeekNumbers?: boolean }) {
  return (
    <DatePickerContent>
      <DatePickerViews showWeekNumbers={props.showWeekNumbers} />
    </DatePickerContent>
  );
}

function MultipleMonthsDatePickerContent() {
  return (
    <DatePickerContent class={storyStyles.multipleMonthsContent}>
      <DatePickerViewControl>
        <DatePickerPrevTrigger />
        <DatePickerRangeText />
        <DatePickerNextTrigger />
      </DatePickerViewControl>
      <div class={storyStyles.multipleMonths}>
        <DatePickerContext>
          {(datePicker) => (
            <DatePickerTable class={storyStyles.multipleMonthsTable}>
              <DatePickerTableHead>
                <DatePickerTableRow>
                  {datePicker().weekDays.map((weekDay) => (
                    <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                  ))}
                </DatePickerTableRow>
              </DatePickerTableHead>
              <DatePickerTableBody>
                {datePicker().weeks.map((week) => (
                  <DatePickerTableRow>
                    {week.map((day) => (
                      <DatePickerTableCell value={day}>
                        <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
              </DatePickerTableBody>
            </DatePickerTable>
          )}
        </DatePickerContext>
        <DatePickerContext>
          {(datePicker) => {
            const offset = datePicker().getOffset({ months: 1 });

            return (
              <DatePickerTable class={storyStyles.multipleMonthsTable}>
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    {datePicker().weekDays.map((weekDay) => (
                      <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                    ))}
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  {offset.weeks.map((week) => (
                    <DatePickerTableRow>
                      {week.map((day) => (
                        <DatePickerTableCell value={day} visibleRange={offset.visibleRange}>
                          <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                        </DatePickerTableCell>
                      ))}
                    </DatePickerTableRow>
                  ))}
                </DatePickerTableBody>
              </DatePickerTable>
            );
          }}
        </DatePickerContext>
      </div>
    </DatePickerContent>
  );
}

function DatePickerSelectContent(props: { items: DatePickerSelectItem[] }) {
  return (
    <Select.Positioner>
      <Select.Content>
        <Select.List>
          {props.items.map((item) => (
            <Select.Item item={item}>
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
      <Select.Indicator />
    </Select.Control>
  );
}

function MonthYearPickerSelects() {
  return (
    <DatePickerContext>
      {(datePicker) => {
        const focusedYear = datePicker().focusedValue.year;
        const yearItems = Array.from({ length: 12 }, (_, index) => {
          const year = focusedYear - 5 + index;
          return { label: String(year), value: String(year) };
        });
        const yearCollection = createListCollection<DatePickerSelectItem>({ items: yearItems });

        return (
          <div class={storyStyles.monthYearSelects}>
            <Select
              class={storyStyles.monthSelect}
              collection={monthSelectCollection}
              value={[String(datePicker().focusedValue.month)]}
              onValueChange={(details) => {
                const month = Number(details.value[0]);
                if (month) datePicker().setFocusedValue(datePicker().focusedValue.set({ month }));
              }}
            >
              <DatePickerSelectControl />
              <DatePickerSelectContent items={monthSelectItems} />
            </Select>
            <Select
              class={storyStyles.yearSelect}
              collection={yearCollection}
              value={[String(datePicker().focusedValue.year)]}
              onValueChange={(details) => {
                const year = Number(details.value[0]);
                if (year) datePicker().setFocusedValue(datePicker().focusedValue.set({ year }));
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

export const Basic: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal([parseDate('2026-06-22')] as DateValue[]);

    return (
      <div class={storyStyles.stack}>
        <DatePicker value={value()} onValueChange={(details) => setValue(details.value)}>
          <DatePickerLabel>Controlled date</DatePickerLabel>
          <DatePickerField />
          <DatePickerPopup />
        </DatePicker>
        <span class={storyStyles.hint}>Current value: {value()[0]?.toString() ?? 'empty'}</span>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => (
    <DatePicker
      selectionMode="range"
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
    >
      <DatePickerLabel>Travel dates</DatePickerLabel>
      <DatePickerRangeField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Multiple: Story = {
  render: () => (
    <DatePicker
      class={storyStyles.multipleRoot}
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    >
      <DatePickerLabel>Meeting days</DatePickerLabel>
      <MultipleDatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const MultipleMonths: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePickerLabel>Planning window</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <MultipleMonthsDatePickerContent />
      </DatePickerPositioner>
    </DatePicker>
  ),
};

export const MonthAndYearSelect: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Report date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerViewControl class={storyStyles.monthYearControl}>
            <MonthYearPickerSelects />
            <div class={storyStyles.monthYearNav}>
              <DatePickerPrevTrigger />
              <DatePickerNextTrigger />
            </div>
          </DatePickerViewControl>
          <DatePickerView view="day">
            <DatePickerDayTable showHeader={false} />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ),
};

export const MinMaxAndUnavailable: Story = {
  render: () => (
    <DatePicker
      defaultValue={[parseDate('2026-06-24')]}
      min={parseDate('2026-06-22')}
      max={parseDate('2026-06-30')}
      isDateUnavailable={(date) => date.day === 25}
    >
      <DatePickerLabel>Booking date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const InlineMultipleWithWeekNumbers: Story = {
  render: () => (
    <DatePicker
      inline
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
      showWeekNumbers
    >
      <DatePickerLabel>Available days</DatePickerLabel>
      <InlineDatePickerContent showWeekNumbers />
    </DatePicker>
  ),
};

export const Presets: Story = {
  render: () => (
    <DatePicker selectionMode="range">
      <DatePickerLabel>Preset range</DatePickerLabel>
      <DatePickerRangeField />
      <DatePickerPositioner>
        <DatePickerContent>
          <div class={storyStyles.presets}>
            <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
            <DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger>
          </div>
          <DatePickerViews />
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required>
      <DatePicker>
        <DatePickerLabel>Deadline</DatePickerLabel>
        <DatePickerField />
        <DatePickerPopup />
      </DatePicker>
      <FieldErrorText>Choose a valid deadline.</FieldErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

    return (
      <div class={storyStyles.stack}>
        <DatePickerRootProvider value={datePicker}>
          <DatePickerLabel>Report date</DatePickerLabel>
          <DatePickerField />
          <DatePickerPopup />
        </DatePickerRootProvider>
        <Button size="sm" variant="secondary" onClick={() => datePicker().clearValue()}>
          Clear
        </Button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <DatePicker class={storyStyles.customRoot} defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Styled date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePickerLabel>Advanced date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput placeholder="Select date" />
        <DatePickerClearTrigger aria-label="Clear date" />
        <DatePickerTrigger aria-label="Open calendar" />
      </DatePickerControl>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <AdvancedDatePickerDayTable />
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  ),
};
