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
  DatePickerMonthTable,
  DatePickerYearTable,
  DatePickerMonthSelect,
  DatePickerPresetTrigger,
  DatePickerYearSelect,
} from '@/components/date-picker/DatePicker';
import { Field, FieldErrorText } from '@/components/field';
import storyStyles from './DatePicker.stories.module.css';

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

function DatePickerViews() {
  return (
    <>
      <DatePickerView view="day">
        <DatePickerDayTable />
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

function DatePickerPopup() {
  return (
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViews />
      </DatePickerContent>
    </DatePickerPositioner>
  );
}

function InlineDatePickerContent() {
  return (
    <DatePickerContent>
      <DatePickerViews />
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
        <DatePickerDayTable class={storyStyles.multipleMonthsTable} showHeader={false} />
        <DatePickerDayTable class={storyStyles.multipleMonthsTable} offset={1} showHeader={false} />
      </div>
    </DatePickerContent>
  );
}

function MonthYearPickerSelects() {
  return (
    <div class={storyStyles.monthYearSelects}>
      <DatePickerMonthSelect />
      <DatePickerYearSelect />
    </div>
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
      <InlineDatePickerContent />
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