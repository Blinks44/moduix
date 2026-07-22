import { createListCollection } from '@ark-ui/react/collection';
import { parseDate, type DateValue } from '@ark-ui/react/date-picker';
import { today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../src/components/button';
import { DatePicker, useDatePicker } from '../../../src/components/date-picker/DatePicker';
import { Field } from '../../../src/components/field';
import { Select } from '../../../src/components/select';
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

const DatePickerContext = DatePicker.Context;

function formatSelectedDate(date: DateValue) {
  return date.toDate('UTC').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function MultipleDatePickerField() {
  return (
    <DatePicker.Control>
      <DatePickerContext>
        {(datePicker) => (
          <div className={storyStyles.selectedDates}>
            {datePicker.value.length === 0 ? (
              <span className={storyStyles.selectedDatesPlaceholder}>Select dates...</span>
            ) : (
              datePicker.value.map((date, index) => (
                <span key={date.toString()} className={storyStyles.selectedDate}>
                  {formatSelectedDate(date)}
                  <button
                    className={storyStyles.selectedDateRemove}
                    type="button"
                    aria-label={`Remove ${formatSelectedDate(date)}`}
                    onClick={() =>
                      datePicker.setValue(
                        datePicker.value.filter((_, itemIndex) => itemIndex !== index),
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
      <DatePicker.ClearTrigger aria-label="Clear dates" />
      <DatePicker.Trigger aria-label="Open calendar" />
    </DatePicker.Control>
  );
}

function AdvancedDatePickerDayTable() {
  return (
    <DatePickerContext>
      {(datePicker) => (
        <>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {datePicker.weekDays.map((weekDay) => (
                  <DatePicker.TableHeader key={weekDay.value.toString()}>
                    {weekDay.short}
                  </DatePicker.TableHeader>
                ))}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {datePicker.weeks.map((week) => (
                <DatePicker.TableRow key={week[0]?.toString()}>
                  {week.map((day) => (
                    <DatePicker.TableCell key={day.toString()} value={day}>
                      <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
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
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {months.map((month) => (
                    <DatePicker.TableCell key={month.value} value={month.value}>
                      <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
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
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger />
            <DatePicker.ViewTrigger />
            <DatePicker.NextTrigger />
          </DatePicker.ViewControl>
          <DatePicker.Table columns={4}>
            <DatePicker.TableBody>
              {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                <DatePicker.TableRow key={rowIndex}>
                  {years.map((year) => (
                    <DatePicker.TableCell
                      key={year.value}
                      value={year.value}
                      disabled={year.disabled}
                    >
                      <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  ))}
                </DatePicker.TableRow>
              ))}
            </DatePicker.TableBody>
          </DatePicker.Table>
        </>
      )}
    </DatePickerContext>
  );
}

function DatePickerViews({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <>
      <DatePicker.View view="day">
        <DatePicker.DayTable showWeekNumbers={showWeekNumbers} />
      </DatePicker.View>
      <DatePicker.View view="month">
        <DatePickerMonthTable />
      </DatePicker.View>
      <DatePicker.View view="year">
        <DatePickerYearTable />
      </DatePicker.View>
    </>
  );
}

function DatePickerPopup({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePickerViews showWeekNumbers={showWeekNumbers} />
      </DatePicker.Content>
    </DatePicker.Positioner>
  );
}

function InlineDatePickerContent({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  return (
    <DatePicker.Content>
      <DatePickerViews showWeekNumbers={showWeekNumbers} />
    </DatePicker.Content>
  );
}

function MultipleMonthsDatePickerContent() {
  return (
    <DatePicker.Content className={storyStyles.multipleMonthsContent}>
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger />
        <DatePicker.RangeText />
        <DatePicker.NextTrigger />
      </DatePicker.ViewControl>
      <div className={storyStyles.multipleMonths}>
        <DatePickerContext>
          {(datePicker) => (
            <DatePicker.Table className={storyStyles.multipleMonthsTable}>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  {datePicker.weekDays.map((weekDay) => (
                    <DatePicker.TableHeader key={weekDay.value.toString()}>
                      {weekDay.short}
                    </DatePicker.TableHeader>
                  ))}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                {datePicker.weeks.map((week) => (
                  <DatePicker.TableRow key={week[0]?.toString()}>
                    {week.map((day) => (
                      <DatePicker.TableCell key={day.toString()} value={day}>
                        <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    ))}
                  </DatePicker.TableRow>
                ))}
              </DatePicker.TableBody>
            </DatePicker.Table>
          )}
        </DatePickerContext>
        <DatePickerContext>
          {(datePicker) => {
            const offset = datePicker.getOffset({ months: 1 });

            return (
              <DatePicker.Table className={storyStyles.multipleMonthsTable}>
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {datePicker.weekDays.map((weekDay) => (
                      <DatePicker.TableHeader key={weekDay.value.toString()}>
                        {weekDay.short}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {offset.weeks.map((week) => (
                    <DatePicker.TableRow key={week[0]?.toString()}>
                      {week.map((day) => (
                        <DatePicker.TableCell
                          key={day.toString()}
                          value={day}
                          visibleRange={offset.visibleRange}
                        >
                          <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            );
          }}
        </DatePickerContext>
      </div>
    </DatePicker.Content>
  );
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
        <Select.Indicator />
      </Select.Trigger>
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
          <div className={storyStyles.monthYearSelects}>
            <Select
              className={storyStyles.monthSelect}
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
              className={storyStyles.yearSelect}
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

export const Basic: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePicker.Label>Release date</DatePicker.Label>
      <DatePicker.Field />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([parseDate('2026-06-22')] as DateValue[]);

    return (
      <div className={storyStyles.stack}>
        <DatePicker value={value} onValueChange={(details) => setValue(details.value)}>
          <DatePicker.Label>Controlled date</DatePicker.Label>
          <DatePicker.Field />
          <DatePickerPopup />
        </DatePicker>
        <span className={storyStyles.hint}>Current value: {value[0]?.toString() ?? 'empty'}</span>
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
      <DatePicker.Label>Travel dates</DatePicker.Label>
      <DatePicker.RangeField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const Multiple: Story = {
  render: () => (
    <DatePicker
      className={storyStyles.multipleRoot}
      selectionMode="multiple"
      maxSelectedDates={3}
      defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    >
      <DatePicker.Label>Meeting days</DatePicker.Label>
      <MultipleDatePickerField />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const MultipleMonths: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
      <DatePicker.Label>Planning window</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <MultipleMonthsDatePickerContent />
      </DatePicker.Positioner>
    </DatePicker>
  ),
};

export const MonthAndYearSelect: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Report date</DatePicker.Label>
      <DatePicker.Field />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl className={storyStyles.monthYearControl}>
            <MonthYearPickerSelects />
            <div className={storyStyles.monthYearNav}>
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
      <DatePicker.Label>Booking date</DatePicker.Label>
      <DatePicker.Field />
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
      <DatePicker.Label>Available days</DatePicker.Label>
      <InlineDatePickerContent showWeekNumbers />
    </DatePicker>
  ),
};

export const Presets: Story = {
  render: () => (
    <DatePicker selectionMode="range">
      <DatePicker.Label>Preset range</DatePicker.Label>
      <DatePicker.RangeField />
      <DatePicker.Positioner>
        <DatePicker.Content>
          <div className={storyStyles.presets}>
            <DatePicker.PresetTrigger value="last7Days">Last 7 days</DatePicker.PresetTrigger>
            <DatePicker.PresetTrigger value="last30Days">Last 30 days</DatePicker.PresetTrigger>
          </div>
          <DatePickerViews />
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid>
      <DatePicker required invalid>
        <DatePicker.Label>Deadline</DatePicker.Label>
        <DatePicker.Field />
        <DatePickerPopup />
      </DatePicker>
      <Field.ErrorText>Choose a valid deadline.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const datePicker = useDatePicker({ defaultValue: [today('UTC')] });

    return (
      <div className={storyStyles.stack}>
        <DatePicker.RootProvider value={datePicker}>
          <DatePicker.Label>Report date</DatePicker.Label>
          <DatePicker.Field />
          <DatePickerPopup />
        </DatePicker.RootProvider>
        <Button size="sm" variant="secondary" onClick={() => datePicker.clearValue()}>
          Clear
        </Button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <DatePicker className={storyStyles.customRoot} defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Styled date</DatePicker.Label>
      <DatePicker.Field />
      <DatePickerPopup />
    </DatePicker>
  ),
};

export const AdvancedCustomization: Story = {
  render: () => (
    <DatePicker defaultValue={[parseDate('2026-06-22')]}>
      <DatePicker.Label>Advanced date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="Select date" />
        <DatePicker.ClearTrigger aria-label="Clear date" />
        <DatePicker.Trigger aria-label="Open calendar" />
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <AdvancedDatePickerDayTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker>
  ),
};